"""Icônes et écrans de démarrage de l'application installable (PWA).

Tout part du logo d'origine (logo/prisma-logo-original.jpg) : le P et le logo
complet sont détourés par « défusion » du fond noir (alpha = canal le plus
lumineux), puis posés sur le fond de l'application avec une légère lueur.
Écrit dans pwa-assets/icons et pwa-assets/splash.
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'pwa-assets')
BG = np.array([5, 5, 6], dtype=np.float32) / 255
LOGO = Image.open(os.path.join(HERE, 'logo', 'prisma-logo-original.jpg')).convert('RGB')


def unscreen(img, floor=0.02):
    """Image sur fond noir -> RGBA (couleur « défusionnée », alpha = canal max)."""
    a = np.asarray(img).astype(np.float32) / 255
    m = a.max(axis=2)
    alpha = np.clip((m - floor) / (1 - floor), 0, 1)
    col = np.clip(a / np.maximum(m, 1e-4)[..., None], 0, 1)
    return Image.fromarray(np.dstack([col * 255, alpha * 255]).round().astype(np.uint8), 'RGBA')


def background(w, h, glow=(0.5, 0.42), strength=0.075):
    """Fond de l'appli (#050506) avec un halo doux, comme l'intro."""
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = glow[0] * w, glow[1] * h
    r = np.sqrt(((x - cx) / (0.62 * max(w, h))) ** 2 + ((y - cy) / (0.62 * max(w, h))) ** 2)
    k = np.clip(1 - r, 0, 1) ** 2 * strength
    col = BG[None, None, :] + k[..., None] * np.array([0.72, 0.74, 0.8], dtype=np.float32)
    return Image.fromarray((np.clip(col, 0, 1) * 255).round().astype(np.uint8), 'RGB')


# Le P seul (avec toute sa lueur bleutée) et le logo complet ; on cadre sur le P lui-même
P_BOX = (384, 204, 675, 542)                            # le P dans le logo d'origine
P_CROP = (300, 120, 760, 570)                           # marge large : la lueur n'est pas coupée
P = unscreen(LOGO.crop(P_CROP))
FULL_BOX = (100, 204, 925, 836)                         # P, PRISMA AUTOMOBILE, filet, signature
FULL_CROP = (60, 120, 965, 870)
FULL = unscreen(LOGO.crop(FULL_CROP))


def place(canvas, art, crop, box, height, cy=0.5):
    """Pose « art » (découpé selon crop) pour que « box » mesure height px, centré sur le canevas."""
    k = height / (box[3] - box[1])
    art = art.resize((round(art.width * k), round(art.height * k)), Image.LANCZOS)
    bx, by = ((box[0] + box[2]) / 2 - crop[0]) * k, ((box[1] + box[3]) / 2 - crop[1]) * k
    canvas.paste(art, (round(canvas.width / 2 - bx), round(canvas.height * cy - by)), art)
    return canvas


def icon(size, p_ratio, name):
    c = background(size, size, glow=(0.5, 0.45), strength=0.11)
    place(c, P, P_CROP, P_BOX, size * p_ratio)
    c.save(os.path.join(OUT, 'icons', name), optimize=True)


# iPhone en portrait : (largeur, hauteur en points CSS, densité)
SPLASH = [(440, 956, 3), (402, 874, 3), (430, 932, 3), (393, 852, 3), (428, 926, 3), (390, 844, 3),
          (375, 812, 3), (414, 896, 3), (414, 896, 2), (414, 736, 3), (375, 667, 2)]


def splash(w, h, r):
    W, H = w * r, h * r
    c = background(W, H, glow=(0.5, 0.4), strength=0.09)
    place(c, FULL, FULL_CROP, FULL_BOX, W * 0.72 * (FULL_BOX[3] - FULL_BOX[1]) / (FULL_BOX[2] - FULL_BOX[0]), cy=0.46)
    name = f'splash-{W}x{H}.png'
    c.save(os.path.join(OUT, 'splash', name), optimize=True)
    return name


if __name__ == '__main__':
    os.makedirs(os.path.join(OUT, 'icons'), exist_ok=True)
    os.makedirs(os.path.join(OUT, 'splash'), exist_ok=True)
    # « any » : P bien visible ; « maskable » : P dans la zone sûre (cercle de 80 %)
    icon(512, 0.64, 'icon-512.png')
    icon(192, 0.64, 'icon-192.png')
    icon(512, 0.5, 'maskable-512.png')
    icon(180, 0.6, 'apple-touch-icon.png')
    icon(96, 0.66, 'icon-96.png')
    icon(32, 0.78, 'favicon-32.png')
    import json
    index = [{'file': splash(w, h, r), 'w': w, 'h': h, 'r': r} for w, h, r in SPLASH]
    json.dump(index, open(os.path.join(OUT, 'splash.json'), 'w', encoding='utf-8'), indent=1)
    print('icônes', sorted(os.listdir(os.path.join(OUT, 'icons'))))
    print('écrans de démarrage', len(os.listdir(os.path.join(OUT, 'splash'))))
