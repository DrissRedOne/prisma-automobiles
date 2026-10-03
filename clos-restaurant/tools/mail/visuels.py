"""Visuels du mail de présentation (hébergés avec le site, dans /mail/) : logo, aperçu ordinateur + téléphone,
trois photos, bloc bar à vins. Les captures viennent de captures.js (site en ligne, sans l'intro)."""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, 'source', 'mail')
os.makedirs(OUT, exist_ok=True)
PAPER = (250, 244, 233)
NIGHT = (21, 22, 15)
INK = (29, 30, 22)

def rounded(im, r, bg=None):
    """Coins arrondis : transparence, ou fond uni si bg est donné (JPEG)."""
    im = im.convert('RGBA')
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    if bg is None:
        im.putalpha(m); return im
    base = Image.new('RGBA', im.size, bg + (255,))
    base.paste(im, (0, 0), m)
    return base

def shadow(canvas, box, r, blur=26, alpha=70, offset=(0, 18)):
    sh = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(sh)
    x0, y0, x1, y1 = box
    d.rounded_rectangle((x0 + offset[0], y0 + offset[1], x1 + offset[0], y1 + offset[1]), r, fill=(29, 30, 22, alpha))
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)))

def font(size, weight=400):
    f = ImageFont.truetype(os.path.join(ROOT, 'tools', 'ttf', 'Outfit.ttf'), size)
    try: f.set_variation_by_axes([weight])
    except Exception: pass
    return f

def jpg(im, name, q=84):
    im.convert('RGB').save(os.path.join(OUT, name), 'JPEG', quality=q, optimize=True, progressive=True)

# 1. logo (affiché en 120 px, fourni en 240 px pour les écrans haute définition)
logo = Image.open(os.path.join(ROOT, 'tools', 'logo', 'logo_clos.png')).convert('RGBA')
logo.resize((240, 240), Image.LANCZOS).save(os.path.join(OUT, 'logo.png'), optimize=True)

# 2. aperçu : fenêtre de navigateur + téléphone (1200 x 780, affiché en 600 x 390)
W, H = 1200, 780
cv = Image.new('RGBA', (W, H), PAPER + (255,))
desk = Image.open(os.path.join(HERE, 'shots', 'accueil-desk.png')).convert('RGB')
desk = desk.crop((0, 0, desk.width - 15, desk.height))  # bande réservée à la barre de défilement
sw = 930; sh_ = round(desk.height * sw / desk.width)
screen = desk.resize((sw, sh_), Image.LANCZOS)
bar_h = 44
win = Image.new('RGBA', (sw, sh_ + bar_h), (42, 43, 34, 255))
dw = ImageDraw.Draw(win)
for i, c in enumerate([(232, 106, 94), (232, 190, 94), (122, 170, 102)]):
    dw.ellipse((22 + i * 22, 16, 34 + i * 22, 28), fill=c)
dw.rounded_rectangle((sw // 2 - 170, 9, sw // 2 + 170, 35), 13, fill=(29, 30, 22))
f = font(17, 400)
t = 'clos.reydenweb.fr'
tw = dw.textlength(t, font=f)
dw.text((sw // 2 - tw / 2, 12), t, font=f, fill=(217, 196, 156))
win.paste(screen, (0, bar_h))
win = rounded(win, 16)
wx, wy = 34, 40
shadow(cv, (wx, wy, wx + win.width, wy + win.height), 16)
cv.alpha_composite(win, (wx, wy))
mob = Image.open(os.path.join(HERE, 'shots', 'accueil-mob.png')).convert('RGB')
pw = 252; ph = round(mob.height * pw / mob.width)
phone_screen = rounded(mob.resize((pw, ph), Image.LANCZOS), 30)
bez = 12
phone = Image.new('RGBA', (pw + 2 * bez, ph + 2 * bez), (0, 0, 0, 0))
ImageDraw.Draw(phone).rounded_rectangle((0, 0, phone.width - 1, phone.height - 1), 42, fill=NIGHT + (255,))
phone.alpha_composite(phone_screen, (bez, bez))
px, py = W - phone.width - 34, H - phone.height - 26
shadow(cv, (px, py, px + phone.width, py + phone.height), 42, blur=22, alpha=95)
cv.alpha_composite(phone, (px, py))
jpg(cv, 'apercu.jpg', 86)

# 3. trois photos (portrait 4:5, 360 x 450, affichées en 164 x 205)
def portrait(name, fx=0.5, fy=0.5):
    im = Image.open(os.path.join(ROOT, 'source', 'img', name)).convert('RGB')
    tw, th = 360, 450
    r = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x0 = round((im.width - tw) * fx); y0 = round((im.height - th) * fy)
    return im.crop((x0, y0, x0 + tw, y0 + th))
jpg(portrait('poulpe-1200.webp', 0.42, 0.5), 'photo-cuisine.jpg', 84)
jpg(portrait('comptoir-lampe-1200.webp', 0.55, 0.5), 'photo-comptoir.jpg', 84)
jpg(portrait('vins-verres-1200.webp', 0.5, 0.3), 'photo-vins.jpg', 84)

# 4. bloc bar à vins : capture de la page, coins arrondis sur fond nuit (1024 x 640, affichée en 512 x 320)
bar = Image.open(os.path.join(HERE, 'shots', 'bar-desk.png')).convert('RGB')
bar = bar.crop((0, 0, bar.width - 15, 790)).resize((1024, 568), Image.LANCZOS)  # le haut de page seul
jpg(rounded(bar, 14, NIGHT), 'bar.jpg', 84)

# 5. carte sur téléphone (petit visuel pour la section II)
carte = Image.open(os.path.join(HERE, 'shots', 'carte-mob.png')).convert('RGB')
cw = 300; ch = round(carte.height * cw / carte.width)
cs = rounded(carte.resize((cw, ch), Image.LANCZOS), 30)
ph2 = Image.new('RGBA', (cw + 24, ch + 24), (0, 0, 0, 0))
ImageDraw.Draw(ph2).rounded_rectangle((0, 0, ph2.width - 1, ph2.height - 1), 42, fill=NIGHT + (255,))
ph2.alpha_composite(cs, (12, 12))
c2 = Image.new('RGBA', (ph2.width + 60, ph2.height + 60), PAPER + (255,))
shadow(c2, (30, 30, 30 + ph2.width, 30 + ph2.height), 42, blur=16, alpha=80, offset=(0, 10))
c2.alpha_composite(ph2, (30, 30))
jpg(c2, 'carte-mobile.jpg', 84)

for n in sorted(os.listdir(OUT)):
    im = Image.open(os.path.join(OUT, n))
    print(n, im.size, os.path.getsize(os.path.join(OUT, n)) // 1024, 'Ko')
