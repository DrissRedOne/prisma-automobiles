"""Prépare les photos du stock (démonstration) à partir de photos/raw (libres de droits, credits.json) :
1. plaque d'immatriculation remplacée par une plaque « BM33 » (plaques.json : quadrilatère « q » en % de la photo,
   coins haut-gauche, haut-droit, bas-droit, bas-gauche ; « t » = plaque seule ou « cadre » avec son support) ;
   plaques d'autres voitures à l'arrière-plan floutées (« flou » : x0, x1, y0, y1 en %) ; « gomme » efface du
   détourage un morceau d'une autre voiture (polygone en % du détourage) ;
2. version détourée de la vue avant (rembg), recadrée au plus près, pour les cartes et la vitrine ;
3. tailles WebP (480 à 1600 px) et aperçu flou minuscule (LQIP) ; écrit build/photos.json.
Usage : python3 photos.py [identifiant...]   (sans argument : toutes les photos)"""
import base64, io, json, os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
RAW = os.path.join(ROOT, 'photos', 'raw')
OUT = os.path.join(ROOT, 'source', 'img')
BUILD = os.path.join(ROOT, 'build')
os.makedirs(OUT, exist_ok=True); os.makedirs(BUILD, exist_ok=True)
SIZES_PHOTO = [480, 800, 1200, 1600]
SIZES_CUT = [480, 800, 1200, 1600]


def plate_texture(kind='plaque'):
    """Plaque « BM33 » noire, liseré chrome, lettres blanches ; « cadre » ajoute le support noir et son bandeau."""
    W = 520
    H = 150 if kind == 'cadre' else 110
    im = Image.new('RGB', (W, H), (8, 8, 9))
    d = ImageDraw.Draw(im)
    if kind == 'cadre':
        d.rounded_rectangle((0, 0, W - 1, H - 1), radius=14, fill=(9, 9, 10))
        box = (12, 9, W - 13, 112)
    else:
        box = (0, 0, W - 1, H - 1)
    d.rounded_rectangle(box, radius=10, fill=(14, 15, 17))
    # liseré chrome : dégradé vertical clair, sombre, clair
    for i, col in enumerate([(236, 238, 241), (168, 172, 178), (214, 217, 221)]):
        b = (box[0] + i, box[1] + i, box[2] - i, box[3] - i)
        d.rounded_rectangle(b, radius=10 - i, outline=col, width=1)
    x0, y0, x1, y1 = box
    f = ImageFont.truetype(os.path.join(ROOT, 'tools', 'ttf', 'Michroma.ttf'), 46)
    t = 'BM33'
    tw = d.textlength(t, font=f)
    d.text(((x0 + x1 - tw) / 2, y0 + 13), t, font=f, fill=(246, 247, 249))
    f2 = ImageFont.truetype(os.path.join(ROOT, 'tools', 'ttf', 'Inter-VF.ttf'), 15)
    try: f2.set_variation_by_axes([14, 500])
    except Exception: pass
    t2 = 'A U T O M O B I L E S'
    tw2 = d.textlength(t2, font=f2)
    d.text(((x0 + x1 - tw2) / 2, y0 + 75), t2, font=f2, fill=(178, 182, 188))
    if kind == 'cadre':
        f3 = ImageFont.truetype(os.path.join(ROOT, 'tools', 'ttf', 'Inter-VF.ttf'), 14)
        try: f3.set_variation_by_axes([14, 500])
        except Exception: pass
        t3 = 'B M 3 3   A U T O M O B I L E S   ·   Y V R A C'
        tw3 = d.textlength(t3, font=f3)
        d.text(((W - tw3) / 2, 123), t3, font=f3, fill=(150, 154, 160))
    return im


def find_coeffs(dst, src):
    """Coefficients de Image.transform(PERSPECTIVE) qui envoient le rectangle src sur le quadrilatère dst."""
    import numpy as np
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


def put_plate(img, quad, kind='plaque'):
    """Pose la plaque BM33 sur le quadrilatère (coordonnées en % de la photo), avec un léger flou de mise au point."""
    W, H = img.size
    q = [(x * W / 100, y * H / 100) for x, y in quad]
    tex = plate_texture(kind)
    tw, th = tex.size
    coeffs = find_coeffs(q, [(0, 0), (tw, 0), (tw, th), (0, th)])
    warped = tex.transform((W, H), Image.PERSPECTIVE, coeffs, Image.BICUBIC)
    mask = Image.new('L', (W, H), 0)
    ImageDraw.Draw(mask).polygon(q, fill=255)
    width = max(x for x, _ in q) - min(x for x, _ in q)
    warped = warped.filter(ImageFilter.GaussianBlur(max(0.5, width / 700)))
    mask = mask.filter(ImageFilter.GaussianBlur(max(0.8, width / 500)))
    out = img.copy(); out.paste(warped, (0, 0), mask)
    return out


def blur_box(img, box):
    """Floute une zone (x0, x1, y0, y1 en %) : plaque d'une autre voiture à l'arrière-plan."""
    W, H = img.size
    x0, x1, y0, y1 = box
    b = (round(W * x0 / 100), round(H * y0 / 100), round(W * x1 / 100), round(H * y1 / 100))
    region = img.crop(b)
    region = region.filter(ImageFilter.GaussianBlur(max(6, (b[2] - b[0]) / 10)))
    out = img.copy(); out.paste(region, b[:2])
    return out


def lqip(img):
    sm = img.copy(); sm.thumbnail((24, 24))
    b = io.BytesIO()
    sm.save(b, 'WEBP' if sm.mode == 'RGBA' else 'JPEG', quality=40)
    return f"data:image/{'webp' if sm.mode == 'RGBA' else 'jpeg'};base64," + base64.b64encode(b.getvalue()).decode()


def save_sizes(img, name, sizes, quality=82):
    done = []
    for s in sizes:
        if s > img.width and done: break
        w = min(s, img.width); h = round(img.height * w / img.width)
        im = img.resize((w, h), Image.LANCZOS)
        im.save(os.path.join(OUT, f'{name}-{w}.webp'), 'WEBP', quality=quality, method=6)
        done.append(w)
    return done


def cutout(img, session):
    from rembg import remove
    cut = remove(img, session=session, alpha_matting=False, post_process_mask=True)
    a = cut.split()[-1]
    a = a.point(lambda v: 0 if v < 24 else v)  # retire les halos très faibles
    cut.putalpha(a)
    box = a.getbbox()
    m = 0.02
    if box:
        x0, y0, x1, y1 = box
        dx, dy = round((x1 - x0) * m), round((y1 - y0) * m)
        cut = cut.crop((max(0, x0 - dx), max(0, y0 - dy), min(cut.width, x1 + dx), min(cut.height, y1 + dy)))
    return cut


def main():
    credits = json.load(open(os.path.join(RAW, 'credits.json'), encoding='utf-8'))
    plates = json.load(open(os.path.join(ROOT, 'photos', 'plaques.json'), encoding='utf-8'))
    only = set(sys.argv[1:])
    db_path = os.path.join(BUILD, 'photos.json')
    db = json.load(open(db_path, encoding='utf-8')) if os.path.exists(db_path) else {}
    session = None
    for c in credits:
        cid, vue = c['id'], c['vue']
        if only and cid not in only: continue
        key = f'{cid}-{vue}'
        src = os.path.join(RAW, key + '.jpg')
        if not os.path.exists(src): continue
        img = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        if img.width > 2400:
            img = img.resize((2400, round(img.height * 2400 / img.width)), Image.LANCZOS)
        for p in plates.get(key, []):
            if 'flou' in p: img = blur_box(img, p['flou'])
            elif 'q' in p: img = put_plate(img, p['q'], p.get('t', 'plaque'))
        entry = {'sizes': save_sizes(img, key, SIZES_PHOTO), 'w': img.width, 'h': img.height, 'lqip': lqip(img),
                 'credit': {k: c.get(k) for k in ('titre', 'auteur', 'licence', 'source')}}
        if vue == 'avant':
            if session is None:
                from rembg import new_session
                session = new_session('isnet-general-use')
            cut = cutout(img, session)
            for p in plates.get(key, []):
                if 'gomme' in p:  # morceau d'une autre voiture resté collé au détourage : effacé (polygone en % du détourage)
                    a = cut.split()[-1]
                    ImageDraw.Draw(a).polygon([(x * cut.width / 100, y * cut.height / 100) for x, y in p['gomme']], fill=0)
                    cut.putalpha(a)
                    cut = cut.crop(a.getbbox())
            cut.save(os.path.join(ROOT, 'photos', f'cut-{cid}.png'))
            entry['cut'] = {'sizes': save_sizes(cut, key + '-cut', SIZES_CUT, quality=86), 'w': cut.width, 'h': cut.height}
        db[key] = entry
        print(key, entry['sizes'], 'détourée' if 'cut' in entry else '')
    json.dump(db, open(db_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
