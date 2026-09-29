"""Détourage des visuels de l'en-tête : la pizza « Reine » vue de dessus devient un disque parfait
(fond transparent) qui tourne lentement sur l'accueil. Le cercle est trouvé automatiquement grâce au
bord rouge du plat. Écrit cutouts/pizza-spin.png (utilisé par build.py)."""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance

here = os.path.dirname(os.path.abspath(__file__))
im = Image.open(os.path.join(here, 'photos', 'pizza-reine.jpg')).convert('RGB')
a = np.asarray(im).astype(int)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
red = (R > 100) & (R > G * 1.6) & (R > B * 1.6)
cols = np.where(red.sum(axis=0) > 6)[0]
rows = np.where(red.sum(axis=1) > 6)[0]
x0, x1, y0, y1 = cols.min(), cols.max(), rows.min(), rows.max()
cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
# bord extérieur du plat rouge : sur 360 rayons, le dernier pixel rouge ; puis cercle ajusté (moindres carrés)
pts = []
for ang in np.linspace(0, 2 * np.pi, 360, endpoint=False):
    last = None
    for d in range(200, 480):
        x, y = int(round(cx + d * np.cos(ang))), int(round(cy + d * np.sin(ang)))
        if not (0 <= x < a.shape[1] and 0 <= y < a.shape[0]): break
        if red[y, x]: last = (x, y)
    if last: pts.append(last)
P = np.array(pts, dtype=float)
A = np.c_[2 * P[:, 0], 2 * P[:, 1], np.ones(len(P))]
b = (P ** 2).sum(axis=1)
(cx, cy, c), *_ = np.linalg.lstsq(A, b, rcond=None)
r_rim = np.sqrt(c + cx ** 2 + cy ** 2)
r = r_rim - 5   # juste à l'intérieur du bord : un liseré rouge régulier tout autour
print('cercle ajusté', round(cx, 1), round(cy, 1), 'rayon', round(r_rim, 1), 'points', len(P))
box = (round(cx - r), round(cy - r), round(cx + r), round(cy + r))
disc = im.crop(box)
disc = ImageEnhance.Color(disc).enhance(1.12)
disc = ImageEnhance.Contrast(disc).enhance(1.05)
S = disc.size[0]
k = 4
mask = Image.new('L', (S * k, S * k), 0)
ImageDraw.Draw(mask).ellipse((0, 0, S * k - 1, S * k - 1), fill=255)
mask = mask.resize((S, S), Image.LANCZOS)
disc.putalpha(mask)
out = disc.resize((1000, 1000), Image.LANCZOS) if S > 1000 else disc
out.save(os.path.join(here, 'cutouts', 'pizza-spin.png'), optimize=True)
print('cutouts/pizza-spin.png', out.size)
