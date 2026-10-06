"""Visuels du mail de présentation (hébergés avec le site, dans /mail/) : logo, aperçu ordinateur + téléphone,
trois photos de l'élevage, vignette vidéo, page « Nos escargots » sur téléphone, page recettes.
Les captures viennent de captures.js (site en ligne, sans l'intro, vidéo lancée)."""
import io, json, os, re, subprocess
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, 'source', 'mail')
FONTS = os.path.join(ROOT, 'source', 'fonts')
os.makedirs(OUT, exist_ok=True)
CARD = (246, 241, 231)
MOSS = (27, 36, 27)
SOFT = (217, 184, 140)
IVORY = (244, 238, 227)
FF = os.environ.get('FFMPEG', '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')


def rounded(im, r, bg=None):
    im = im.convert('RGBA')
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    if bg is None:
        im.putalpha(m); return im
    base = Image.new('RGBA', im.size, bg + (255,))
    base.paste(im, (0, 0), m)
    return base


def arch(im, bg):
    """Forme d'arche (haut en demi-cercle), comme sur le site."""
    im = im.convert('RGBA')
    w, h = im.size
    m = Image.new('L', (w * 4, h * 4), 0)
    d = ImageDraw.Draw(m)
    d.ellipse((0, 0, w * 4 - 1, w * 4 - 1), fill=255)
    d.rectangle((0, w * 2, w * 4 - 1, h * 4 - 1), fill=255)
    m = m.resize((w, h), Image.LANCZOS)
    base = Image.new('RGBA', (w, h), bg + (255,))
    base.paste(im, (0, 0), m)
    return base


def shadow(canvas, box, r, blur=26, alpha=70, offset=(0, 18)):
    sh = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    x0, y0, x1, y1 = box
    ImageDraw.Draw(sh).rounded_rectangle((x0 + offset[0], y0 + offset[1], x1 + offset[0], y1 + offset[1]), r, fill=(27, 36, 27, alpha))
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)))


def font(name, size, weight=None):
    f = ImageFont.truetype(os.path.join(FONTS, name), size)
    if weight:
        try: f.set_variation_by_axes([weight])
        except Exception: pass
    return f


def jpg(im, name, q=84):
    im.convert('RGB').save(os.path.join(OUT, name), 'JPEG', quality=q, optimize=True, progressive=True)


def phone(img_path, width, crop_h=None):
    mob = Image.open(img_path).convert('RGB')
    if crop_h: mob = mob.crop((0, 0, mob.width, min(mob.height, crop_h)))
    ph = round(mob.height * width / mob.width)
    screen = rounded(mob.resize((width, ph), Image.LANCZOS), round(width * 0.12))
    bez = round(width * 0.048)
    p = Image.new('RGBA', (width + 2 * bez, ph + 2 * bez), (0, 0, 0, 0))
    ImageDraw.Draw(p).rounded_rectangle((0, 0, p.width - 1, p.height - 1), round(width * 0.165), fill=MOSS + (255,))
    p.alpha_composite(screen, (bez, bez))
    return p


# ------------------------------------------------------------------ 1. logo : emblème + « Héliciculture du / Garnoutey » (affiché en 300 px de large)
logo = json.load(open(os.path.join(ROOT, 'tools', 'logo', 'logo.json')))
vb = [float(x) for x in logo['viewBox'].split()]


def emblem(width, color, stroke=3.4, ss=4):
    W = width * ss; sc = W / vb[2]; H = round(vb[3] * sc)
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    lw = max(1, round(stroke * sc))
    for path in (logo['spiral'], logo['tail']):
        toks = re.findall(r'[MLC]|-?\d+(?:\.\d+)?', path)
        pts, cur, cmd, i = [], (0, 0), None, 0
        while i < len(toks):
            if toks[i] in 'MLC': cmd = toks[i]; i += 1; continue
            if cmd in ('M', 'L'):
                cur = (float(toks[i]), float(toks[i + 1])); i += 2; pts.append(cur)
            else:
                c1 = (float(toks[i]), float(toks[i + 1])); c2 = (float(toks[i + 2]), float(toks[i + 3])); p2 = (float(toks[i + 4]), float(toks[i + 5])); i += 6
                for k in range(1, 17):
                    t = k / 16
                    pts.append(((1 - t) ** 3 * cur[0] + 3 * (1 - t) ** 2 * t * c1[0] + 3 * (1 - t) * t * t * c2[0] + t ** 3 * p2[0],
                                (1 - t) ** 3 * cur[1] + 3 * (1 - t) ** 2 * t * c1[1] + 3 * (1 - t) * t * t * c2[1] + t ** 3 * p2[1]))
                cur = p2
        xy = [((x - vb[0]) * sc, (y - vb[1]) * sc) for x, y in pts]
        d.line(xy, fill=color, width=lw, joint='curve')
        for x, y in (xy[0], xy[-1]):
            d.ellipse((x - lw / 2, y - lw / 2, x + lw / 2, y + lw / 2), fill=color)
    return im.resize((width, round(H / ss)), Image.LANCZOS)


def logo_block(fg, kicker, bg=None, scale=2):
    e = emblem(96 * scale, fg)
    fk = font('manrope-latin.woff2', 13 * scale, 700)
    fw = font('instrument-serif-latin.woff2', 58 * scale)
    d0 = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    tw = max(d0.textlength('Garnoutey', font=fw), d0.textlength('HÉLICICULTURE DU', font=fk) * 1.25)
    W = round(e.width + 22 * scale + tw + 8 * scale); H = round(max(e.height, 82 * scale) + 8 * scale)
    im = Image.new('RGBA', (W, H), (bg + (255,)) if bg else (0, 0, 0, 0))
    im.alpha_composite(e, (0, (H - e.height) // 2 + 6 * scale))
    d = ImageDraw.Draw(im)
    x = e.width + 22 * scale
    # petites capitales espacées
    cx = x
    for ch in 'HÉLICICULTURE DU':
        d.text((cx, 6 * scale), ch, font=fk, fill=kicker)
        cx += d.textlength(ch, font=fk) + 3.2 * scale
    d.text((x, 16 * scale), 'Garnoutey', font=fw, fill=fg)
    return im


lg = logo_block(MOSS, (138, 90, 43), CARD)
lg.convert('RGB').save(os.path.join(OUT, 'logo.png'), optimize=True)
lgd = logo_block(IVORY, SOFT, MOSS)
lgd.convert('RGB').save(os.path.join(OUT, 'logo-sombre.png'), optimize=True)

# ------------------------------------------------------------------ 2. aperçu : navigateur + téléphone (1200 x 780, affiché en 600 x 390)
W, H = 1200, 780
cv = Image.new('RGBA', (W, H), CARD + (255,))
desk = Image.open(os.path.join(HERE, 'shots', 'accueil-desk.png')).convert('RGB')
desk = desk.crop((0, 0, desk.width - 15, desk.height))
sw = 930; sh_ = round(desk.height * sw / desk.width)
screen = desk.resize((sw, sh_), Image.LANCZOS)
bar_h = 44
win = Image.new('RGBA', (sw, sh_ + bar_h), (36, 48, 36, 255))
dw = ImageDraw.Draw(win)
for i, c in enumerate([(232, 106, 94), (232, 190, 94), (122, 170, 102)]):
    dw.ellipse((22 + i * 22, 16, 34 + i * 22, 28), fill=c)
dw.rounded_rectangle((sw // 2 - 190, 9, sw // 2 + 190, 35), 13, fill=MOSS)
f = font('manrope-latin.woff2', 16, 500)
t = 'heliciculture-garnoutey.vercel.app'
tw = dw.textlength(t, font=f)
dw.text((sw // 2 - tw / 2, 13), t, font=f, fill=SOFT)
win.paste(screen, (0, bar_h))
win = rounded(win, 16)
wx, wy = 34, 40
shadow(cv, (wx, wy, wx + win.width, wy + win.height), 16)
cv.alpha_composite(win, (wx, wy))
ph = phone(os.path.join(HERE, 'shots', 'accueil-mob.png'), 252)
px, py = W - ph.width - 34, H - ph.height - 26
shadow(cv, (px, py, px + ph.width, py + ph.height), 42, blur=22, alpha=95)
cv.alpha_composite(ph, (px, py))
jpg(cv, 'apercu.jpg', 86)

# ------------------------------------------------------------------ 3. trois photos de l'élevage en arche (360 x 480, affichées en 164 x 219)
def portrait(name, fx=0.5, fy=0.5, tw=360, th=480):
    im = Image.open(os.path.join(ROOT, 'source', 'img', name)).convert('RGB')
    r = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x0 = round((im.width - tw) * fx); y0 = round((im.height - th) * fy)
    return im.crop((x0, y0, x0 + tw, y0 + th))


jpg(arch(portrait('allee-720.webp', 0.5, 0.35), CARD), 'photo-serre.jpg', 84)
jpg(arch(portrait('auge-720.webp', 0.5, 0.55), CARD), 'photo-auge.jpg', 84)
jpg(arch(portrait('nuit-720.webp', 0.5, 0.6), CARD), 'photo-nuit.jpg', 84)

# ------------------------------------------------------------------ 4. vignette vidéo (portrait, bouton lecture, sur fond mousse)
def frame(video, t):
    png = subprocess.run([FF, '-v', 'error', '-ss', str(t), '-i', video, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
                         capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGB')


def play(im, cx, cy, r, ring=3):
    k = 4
    lay = Image.new('RGBA', (im.width * k, im.height * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    X, Y, R = cx * k, cy * k, r * k
    d.ellipse((X - R, Y - R, X + R, Y + R), fill=MOSS + (140,), outline=IVORY + (235,), width=ring * k)
    s = R * 0.42
    d.polygon([(X - s * 0.62, Y - s), (X - s * 0.62, Y + s), (X + s * 1.0, Y)], fill=IVORY + (245,))
    im.alpha_composite(lay.resize(im.size, Image.LANCZOS))


v = frame(os.path.join(ROOT, 'source', 'video', 'tunnel.mp4'), 1.2).resize((360, 640), Image.LANCZOS).convert('RGBA')
play(v, 180, 320, 46)
jpg(arch(v, MOSS), 'video-serre.jpg', 84)

# ------------------------------------------------------------------ 5. « Nos escargots » et commande sur téléphone (petits visuels)
for shot, name in (('escargots-mob.png', 'escargots-mobile.jpg'), ('contact-mob.png', 'commande-mobile.jpg')):
    p = phone(os.path.join(HERE, 'shots', shot), 300)
    c2 = Image.new('RGBA', (p.width + 60, p.height + 60), CARD + (255,))
    shadow(c2, (30, 30, 30 + p.width, 30 + p.height), 42, blur=16, alpha=80, offset=(0, 10))
    c2.alpha_composite(p, (30, 30))
    jpg(c2, name, 84)

# ------------------------------------------------------------------ 6. page recettes (haut de la méthode), coins arrondis sur fond mousse (1024 x 568)
rc = Image.open(os.path.join(HERE, 'shots', 'recette-desk.png')).convert('RGB')
rc = rc.crop((0, 0, rc.width - 15, 790)).resize((1024, 568), Image.LANCZOS)
jpg(rounded(rc, 14, MOSS), 'recettes.jpg', 84)

for n in sorted(os.listdir(OUT)):
    im = Image.open(os.path.join(OUT, n))
    print(n, im.size, os.path.getsize(os.path.join(OUT, n)) // 1024, 'Ko')
