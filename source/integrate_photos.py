"""Intègre les vraies photos dans l'application PRISMA.

Usage : python3 integrate_photos.py <dossier des photos> [--mirror v-clio,v-208]

Le dossier contient des JPEG nommés par identifiant (v-clio.jpg, v-208.jpg…),
éventuellement hero.jpg, cat-voitures.jpg, cat-utilitaires.jpg et credits.json.
Pour chaque véhicule : une photo « couverture » (JPEG 1280 px) et une version
détourée (WebP transparent) pour le showroom 3D. Écrit src/photos.js.
"""
import base64, io, json, os, sys
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
VEHICLES = ['v-clio', 'v-208', 'v-classea', 'v-tesla', 'v-5008', 'v-glc', 'v-kangoo', 'v-trafic', 'v-master12', 'v-master20', 'v-bus']
EXTRAS = ['hero', 'cat-voitures', 'cat-utilitaires']


def data_uri(img, fmt, **kw):
    buf = io.BytesIO()
    img.save(buf, fmt, **kw)
    mime = {'JPEG': 'image/jpeg', 'WEBP': 'image/webp', 'PNG': 'image/png'}[fmt]
    return f'data:{mime};base64,' + base64.b64encode(buf.getvalue()).decode()


def cover(img, width):
    img = img.convert('RGB')
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    return img


# Zones à effacer du détourage (coordonnées des photos de 1920 px) : éléments du décor collés au véhicule
ERASE = {
    'v-5008': [[(832, 85), (882, 85), (882, 107), (832, 107)]],                    # panneau routier derrière le toit
    'v-master20': [[(228, 250), (565, 250), (565, 300), (240, 416), (228, 420)]],  # feuillage au-dessus de la caisse
}


def cutout(img, session, vid=None):
    from rembg import remove
    from PIL import ImageDraw
    out = remove(img.convert('RGB'), session=session, post_process_mask=True)
    a = out.split()[-1]
    for poly in ERASE.get(vid, []):
        ImageDraw.Draw(a).polygon(poly, fill=0)
    # bords propres : on durcit légèrement le masque et on supprime les poussières
    a = a.point(lambda v: 0 if v < 24 else (255 if v > 232 else v)).filter(ImageFilter.MedianFilter(3))
    # on ne garde que le véhicule : les débris détachés (panneau, feuillage, reflet au sol) disparaissent
    import numpy as np
    from scipy import ndimage
    arr = np.asarray(a).copy()
    lab, n = ndimage.label(arr > 24)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(arr), lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, sz in enumerate(sizes) if sz >= sizes.max() * 0.02])
        arr[~keep] = 0
        a = Image.fromarray(arr)
    out.putalpha(a)
    bbox = a.getbbox()
    if not bbox:
        return None
    out = out.crop(bbox)
    pad = int(out.width * 0.02)
    canvas = Image.new('RGBA', (out.width + 2 * pad, out.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(out, (pad, pad))
    if canvas.width > 1400:
        canvas = canvas.resize((1400, round(canvas.height * 1400 / canvas.width)), Image.LANCZOS)
    return canvas


def main():
    folder = sys.argv[1]
    mirror = set()
    if '--mirror' in sys.argv:
        mirror = set(sys.argv[sys.argv.index('--mirror') + 1].split(','))
    credits = {}
    cpath = os.path.join(folder, 'credits.json')
    if os.path.exists(cpath):
        for c in json.load(open(cpath, encoding='utf-8')):
            credits[c.get('id')] = {'title': c.get('titre'), 'author': c.get('auteur'), 'license': c.get('licence'), 'source': c.get('source'), 'site': 'Photo libre de droits'}
    from rembg import new_session
    session = new_session('isnet-general-use')
    out, report = {}, []
    for vid in VEHICLES + EXTRAS:
        src = next((os.path.join(folder, vid + ext) for ext in ('.jpg', '.jpeg', '.png', '.webp') if os.path.exists(os.path.join(folder, vid + ext))), None)
        if not src:
            report.append(f'{vid} : absente')
            continue
        img = Image.open(src)
        if vid in mirror:
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
        entry = {'src': data_uri(cover(img, 1600 if vid == 'hero' else 960), 'JPEG', quality=78, optimize=True, progressive=True)}
        if vid in VEHICLES:
            cut = cutout(img, session, vid)
            if cut:
                entry['cut'] = data_uri(cut, 'WEBP', quality=86, method=6)
                cut.save(os.path.join(HERE, 'shots', f'cut-{vid}.png'))
        if vid in credits:
            entry['credit'] = credits[vid]
        out[vid] = entry
        report.append(f"{vid} : photo {len(entry['src']) // 1024} Ko" + (f", détourée {len(entry['cut']) // 1024} Ko" if 'cut' in entry else ''))
    with open(os.path.join(HERE, 'src', 'photos.js'), 'w', encoding='utf-8') as f:
        f.write('/* Photos des véhicules intégrées (photo et version détourée pour le showroom) */\nconst EMBEDDED_PHOTOS = ' + json.dumps(out) + ';\n')
    print('\n'.join(report))


if __name__ == '__main__':
    main()
