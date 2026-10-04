"""Vignettes des vidéos pour le mail (servies avec le site, dans /mail/) : une image de chaque format,
prise sur la carte « Poulpe snacké », avec un bouton de lecture. Le mail ne peut pas lire une vidéo :
la vignette renvoie vers le fichier MP4, que le navigateur lit directement.
Usage : python3 video.py   (vidéos : source/mail/clos-video-16x9.mp4 et clos-video-9x16.mp4)"""
import os, subprocess, io
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
OUT = os.path.join(ROOT, 'source', 'mail')
FF = imageio_ffmpeg.get_ffmpeg_exe()
NIGHT = (21, 22, 15)
CREAM = (245, 234, 216)
T = 10.6          # carte « Poulpe snacké », texte entièrement affiché
DUREE = '0:36'


def frame(video, t):
    png = subprocess.run([FF, '-v', 'error', '-ss', str(t), '-i', video, '-frames:v', '1', '-f', 'image2pipe',
                          '-vcodec', 'png', '-'], capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(png)).convert('RGB')


def font(size, weight=400):
    f = ImageFont.truetype(os.path.join(ROOT, 'tools', 'ttf', 'Outfit.ttf'), size)
    try: f.set_variation_by_axes([weight])
    except Exception: pass
    return f


def play(im, cx, cy, r, ring=3):
    """Bouton de lecture : disque nuit translucide, anneau et triangle crème (suréchantillonné x4)."""
    k = 4
    lay = Image.new('RGBA', (im.width * k, im.height * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    X, Y, R = cx * k, cy * k, r * k
    d.ellipse((X - R, Y - R, X + R, Y + R), fill=NIGHT + (150,), outline=CREAM + (235,), width=ring * k)
    s = R * 0.42   # triangle légèrement décalé à droite pour paraître centré
    d.polygon([(X - s * 0.62, Y - s), (X - s * 0.62, Y + s), (X + s * 1.0, Y)], fill=CREAM + (245,))
    lay = lay.resize(im.size, Image.LANCZOS)
    base = im.convert('RGBA'); base.alpha_composite(lay)
    return base


def pill(im, text, right, bottom, size):
    """Durée en bas à droite."""
    f = font(size, 500)
    d0 = ImageDraw.Draw(im)
    tw = d0.textlength(text, font=f)
    padx, h = size * 0.75, size * 1.9
    x1, y1 = im.width - right, im.height - bottom
    x0, y0 = x1 - tw - 2 * padx, y1 - h
    lay = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    d.rounded_rectangle((x0, y0, x1, y1), radius=h / 2, fill=NIGHT + (170,))
    d.text((x0 + padx, y0 + (h - size) / 2 - size * 0.12), text, font=f, fill=CREAM + (255,))
    im.alpha_composite(lay)
    return im


def jpg(im, name, q=86):
    im.convert('RGB').save(os.path.join(OUT, name), 'JPEG', quality=q, optimize=True, progressive=True)


# 16:9 : 1024 x 576, affichée en 512 x 288 dans le mail
h = frame(os.path.join(OUT, 'clos-video-16x9.mp4'), T).resize((1024, 576), Image.LANCZOS)
h = play(h, 512, 282, 48)
h = pill(h, DUREE, 22, 22, 22)
jpg(h, 'video-16x9.jpg')

# 9:16 : 300 x 533, affichée en 150 x 267
v = frame(os.path.join(OUT, 'clos-video-9x16.mp4'), T).resize((300, 533), Image.LANCZOS)
v = play(v, 150, 250, 30, ring=2)
v = pill(v, DUREE, 12, 12, 15)
jpg(v, 'video-9x16.jpg')

for n in ('video-16x9.jpg', 'video-9x16.jpg'):
    p = os.path.join(OUT, n)
    print(n, Image.open(p).size, os.path.getsize(p) // 1024, 'Ko')
