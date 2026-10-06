"""Prépare les photos du site : recadrage, étalonnage commun (grade.py), WebP en plusieurs largeurs, aperçu flou.
Entrées : photos/films/*.jpg (images tirées des films de l'élevage, tools/images_films.py),
          photos/originaux/nuit.jpg (photo de l'élevage la nuit), photos/wikimedia/hd/*.jpg (photos libres).
Sortie : source/img/<nom>-<largeur>.webp + build/photos.json"""
import base64, io, json, os, sys
import numpy as np
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from grade import grade

SRC = {'film': os.path.join(ROOT, 'photos/films'), 'orig': os.path.join(ROOT, 'photos/originaux'), 'wm': os.path.join(ROOT, 'photos/wikimedia/hd')}
OUT = os.path.join(ROOT, 'source/img')
os.makedirs(OUT, exist_ok=True)

# nom public -> (source, recadrage relatif (x0, y0, x1, y1) ou None, force de l'étalonnage, texte alternatif)
PHOTOS = {
    # l'élevage (images de l'Héliciculture du Garnoutey)
    'tunnel':      ('film/tunnel.jpg', None, 1.0, "Allée d'un parc d'élevage sous filet d'ombrage, planches couvertes d'escargots, champ au loin"),
    'allee':       ('film/allee.jpg', None, 1.0, "Rangées de planches en bois couvertes d'escargots, sous le filet d'ombrage"),
    'auge':        ('film/auge.jpg', None, 1.0, "Escargots petits-gris rassemblés au bord d'une auge, végétation au premier plan"),
    'planches':    ('film/planches.jpg', None, 1.0, "Planches dressées dans un parc, couvertes d'escargots au repos"),
    'repos':       ('film/repos.jpg', (0.0, 0.17, 1.0, 1.0), 1.0, "Escargots au repos sur une planche en bois, dans l'herbe du parc"),
    'detail':      ('film/detail.jpg', (0.16, 0.27, 1.0, 1.0), 1.0, "Gros plan sur une planche couverte de jeunes escargots"),
    'nuit':        ('orig/nuit.jpg', (0.17, 0.2, 0.83, 1.0), 0.9, "La nuit, des escargots sortent sur le filet et la planche de bois"),
    'nuit-large':  ('orig/nuit.jpg', (0.0, 0.5, 1.0, 1.0), 0.9, "Escargots petits-gris sur une planche de bois, la nuit"),
    # photos libres (Wikimedia Commons), crédits dans les mentions légales
    'coquille':    ('wm/coquille.jpg', None, 0.5, "Coquille d'escargot gros-gris, spirale dorée sur fond noir"),
    'coquilles':   ('wm/coquilles.jpg', None, 0.5, "Cinq coquilles d'escargot petit-gris vues sous plusieurs angles"),
    'macro':       ('wm/macro.jpg', None, 0.6, "Escargot petit-gris en gros plan, cornes sorties"),
    'nocturne':    ('wm/nocturne.jpg', None, 0.5, "Escargot accroché à une tige, sur fond sombre"),
    'tige':        ('wm/tige.jpg', None, 0.6, "Escargot petit-gris grimpant le long d'une tige verte"),
    'gros-gris':   ('wm/gros-gris.jpg', None, 0.6, "Escargot gros-gris sur une planche, dans un élevage"),
    'plat-staub':  ('wm/plat-staub.jpg', None, 0.45, "Escargots au beurre persillé servis dans un plat en fonte"),
    'plat-assiette': ('wm/plat-assiette.jpg', None, 0.45, "Assiette d'escargots au beurre persillé, vue de dessus"),
    'plat-sombre': ('wm/plat-sombre.jpg', None, 0.45, "Escargots cuits au beurre d'ail et de persil, dans un plat"),
    'cassolette':  ('wm/cassolette.jpg', None, 0.45, "Cassolette d'escargots gratinée, croûte dorée"),
    'plat-pince':  ('wm/plat-pince.jpg', None, 0.45, "Escargots en coquille au beurre persillé, avec la pince de service"),
    'sauce':       ('wm/sauce.jpg', None, 0.45, "Escargots cuisinés en sauce, servis dans un plat en terre cuite"),
}
WIDTHS = [360, 480, 720, 960, 1280, 1600, 2400]


def main(only=None):
    path = os.path.join(ROOT, 'build/photos.json')
    manifest = json.load(open(path, encoding='utf-8')) if os.path.exists(path) else {}
    for name, (src, crop, strength, alt) in PHOTOS.items():
        if only and name not in only:
            continue
        kind, fn = src.split('/')
        fp = os.path.join(SRC[kind], fn)
        if not os.path.exists(fp):
            print('absente :', fp); continue
        im = ImageOps.exif_transpose(Image.open(fp)).convert('RGB')
        if crop:
            W, H = im.size
            im = im.crop((int(crop[0] * W), int(crop[1] * H), int(crop[2] * W), int(crop[3] * H)))
        a = np.asarray(im, np.float32) / 255.0
        im = Image.fromarray((grade(a, strength) * 255 + 0.5).astype(np.uint8))
        W, H = im.size
        sizes = []
        for ww in [w for w in WIDTHS if w < W - 60] + [W]:
            hh = round(H * ww / W)
            out = im.resize((ww, hh), Image.LANCZOS) if ww != W else im
            out.save(os.path.join(OUT, '%s-%d.webp' % (name, ww)), 'WEBP', quality=72 if ww >= 1200 else 76, method=6)
            sizes.append(ww)
        tiny = im.resize((24, max(1, round(H * 24 / W))), Image.LANCZOS)
        buf = io.BytesIO(); tiny.save(buf, 'WEBP', quality=40)
        manifest[name] = {'w': W, 'h': H, 'sizes': sizes, 'alt': alt, 'src': src,
                          'lqip': 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()}
        print(name, W, H, sizes)
    manifest = {k: manifest[k] for k in PHOTOS if k in manifest}
    os.makedirs(os.path.join(ROOT, 'build'), exist_ok=True)
    json.dump(manifest, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main(sys.argv[1:] or None)
