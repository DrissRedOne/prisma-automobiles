"""Prépare les photos du site CLOS : recadrage, étalonnage commun, WebP multi-tailles, aperçu flou.
Entrée : photos/originaux/*.jpg et photos/wikimedia/hd/*.jpg ; sortie : source/img/<nom>-<largeur>.webp + build/photos.json"""
import json, os, base64, io
import numpy as np
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = {'orig': os.path.join(ROOT, 'photos/originaux'), 'wm': os.path.join(ROOT, 'photos/wikimedia/hd')}
OUT = os.path.join(ROOT, 'source/img')
os.makedirs(OUT, exist_ok=True)

# nom public -> (fichier source, recadrage relatif (x0, y0, x1, y1) ou None, texte alternatif)
PHOTOS = {
    'salle-bar':        ('orig/U13.jpg', None, "Comptoir en bois sombre et tabourets sous une lumière tamisée"),
    'comptoir-lampe':   ('orig/U21.jpg', None, "Comptoir de bar éclairé par une lampe, bouteilles en arrière-plan"),
    'vins-verres':      ('orig/U18.jpg', None, "Bouteilles de vin et verres alignés derrière le bar"),
    'cave':             ('orig/U12.jpg', None, "Étagères de bouteilles de vin dans une cave à la lumière douce"),
    'etageres-bar':     ('orig/U23.jpg', None, "Bouteilles sur deux étagères dans un bar tamisé"),
    'poulpe':           ('orig/U03.jpg', None, "Poulpe snacké dressé sur une assiette blanche avec sa crème"),
    'poulpe-ardoise':   ('orig/U05.jpg', None, "Tentacule de poulpe grillé sur une assiette noire"),
    'gravlax':          ('wm/W12.jpg', (0.08, 0.0, 0.92, 1.0), "Bœuf cru finement taillé, dressé au centre d'une assiette"),
    'ceviche':          ('orig/C06.jpg', None, "Assiette de poisson cru mariné, légumes et sauce aux agrumes"),
    'foie-gras':        ('orig/C41.jpg', None, "Foie gras et viande dressés sur une assiette blanche"),
    'agneau':           ('orig/C39.jpg', None, "Côte d'agneau grillée et légumes sur une planche en bois"),
    'picanha':          ('orig/E52.jpg', None, "Bœuf grillé tranché, frites maison et petite salade"),
    'fromages':         ('orig/D14.jpg', None, "Planche de fromages affinés, raisin et verre de vin rouge"),
    'mousse':           ('orig/C44.jpg', None, "Mousse au chocolat servie dans des coupes sur un plateau en laiton"),
    'grill':            ('orig/E53.jpg', None, "Pièce de bœuf saisie sur les flammes du grill"),
    'cuisine':          ('orig/H39.jpg', None, "Le chef au passe, dans la cuisine ouverte"),
    'dressage':         ('orig/C21.jpg', None, "Mains du chef dressant les assiettes au passe"),
    'service':          ('orig/C16.jpg', None, "Serveur portant deux assiettes en salle"),
    'tablee':           ('orig/B37.jpg', None, "Grande tablée dressée avec plats et verres"),
    'table-dressee':    ('orig/B32.jpg', None, "Table dressée aux chandelles pour un dîner privé"),
    'table-soir':       ('wm/W87.jpg', None, "Verre à vin sur une table en bois, lumière chaude du soir"),
    'vin-verse':        ('orig/G24.jpg', None, "Vin versé dans une rangée de verres sur le comptoir"),
    'verre-blanc':      ('orig/A21.jpg', None, "Verre de vin blanc dans la lumière du soir"),
    'cocktail':         ('orig/G40.jpg', None, "Cocktail servi sur le comptoir par le barman"),
    'terrasse-nuit':    ('orig/G54.jpg', None, "Façade éclairée d'un restaurant à la tombée de la nuit"),
}
WIDTHS = [480, 800, 1200, 1600, 2400]

def grade(im):
    """Étalonnage commun : couleurs chaudes, bleus éteints, ombres légèrement olive, noirs relevés."""
    hsv = np.asarray(im.convert('RGB').convert('HSV')).astype(np.float32)
    h = hsv[..., 0] * 360.0 / 255.0
    # bleus et cyans fortement désaturés (les nappes et reflets bleus jurent avec l'olive)
    blue = np.clip(1 - np.abs(h - 215.0) / 55.0, 0, 1)
    hsv[..., 1] *= (1 - 0.62 * blue)
    a = np.asarray(Image.fromarray(hsv.astype(np.uint8), 'HSV').convert('RGB')).astype(np.float32) / 255.0
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    a = lum[..., None] + (a - lum[..., None]) * 0.84          # désaturation générale
    a = 0.03 + a * 0.94                                        # noirs relevés
    s = a * a * (3 - 2 * a)
    a = a * 0.75 + s * 0.25                                    # légère courbe en S
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    shadow = np.array([0.30, 0.33, 0.17], np.float32)          # olive profond
    light = np.array([1.00, 0.92, 0.78], np.float32)           # crème chaude
    ws = np.clip(1 - lum / 0.55, 0, 1)[..., None] ** 1.5 * 0.20
    wl = np.clip((lum - 0.55) / 0.45, 0, 1)[..., None] ** 1.3 * 0.10
    a = a * (1 - ws) + shadow * ws * (0.35 + a)
    a = a * (1 - wl) + light * wl * np.maximum(a, 0.65)
    a[..., 0] *= 1.02; a[..., 2] *= 0.95                       # chaleur
    return Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))

manifest = {}
for name, (src, crop, alt) in PHOTOS.items():
    kind, fn = src.split('/')
    im = Image.open(os.path.join(SRC[kind], fn))
    im = ImageOps.exif_transpose(im).convert('RGB')
    if crop:
        W, H = im.size
        im = im.crop((int(crop[0] * W), int(crop[1] * H), int(crop[2] * W), int(crop[3] * H)))
    im = grade(im)
    W, H = im.size
    sizes = []
    targets = [w for w in WIDTHS if w < W - 120] + [W]
    for ww in targets:
        hh = round(H * ww / W)
        out = im.resize((ww, hh), Image.LANCZOS) if ww != W else im
        path = os.path.join(OUT, '%s-%d.webp' % (name, ww))
        out.save(path, 'WEBP', quality=74 if ww >= 1200 else 78, method=6)
        sizes.append(ww)
    tiny = im.resize((24, max(1, round(H * 24 / W))), Image.LANCZOS)
    buf = io.BytesIO(); tiny.save(buf, 'WEBP', quality=40)
    manifest[name] = {'w': W, 'h': H, 'sizes': sizes, 'alt': alt, 'src': src,
                      'lqip': 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()}
    print(name, W, H, sizes)
os.makedirs(os.path.join(ROOT, 'build'), exist_ok=True)
json.dump(manifest, open(os.path.join(ROOT, 'build/photos.json'), 'w'), ensure_ascii=False, indent=1)
