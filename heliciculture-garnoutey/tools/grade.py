"""Étalonnage commun des photos et des vidéos de l'Héliciculture du Garnoutey.

Une seule fonction, grade(), appliquée aux photos (tools/photos.py) et convertie en table 3D (.cube) pour les
vidéos (tools/videos.py, filtre lut3d de ffmpeg) : mêmes couleurs partout.
Intention : ombres mousse profonde, lumières ivoire chaudes, le cyan des filets d'ombrage ramené vers un vert
sauge, le bleu du ciel éteint, les coquilles caramel mises en valeur, noirs légèrement relevés (rendu mat).
"""
import numpy as np


def rgb_to_hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx = a.max(-1); mn = a.min(-1); d = mx - mn
    h = np.zeros_like(mx)
    m = d > 1e-6
    rr = m & (mx == r); gg = m & (mx == g) & ~rr; bb = m & ~rr & ~gg
    h[rr] = ((g - b)[rr] / d[rr]) % 6
    h[gg] = (b - r)[gg] / d[gg] + 2
    h[bb] = (r - g)[bb] / d[bb] + 4
    h = h * 60.0
    s = np.where(mx > 1e-6, d / np.maximum(mx, 1e-6), 0)
    return np.stack([h, s, mx], -1)


def hsv_to_rgb(x):
    h, s, v = x[..., 0] % 360.0, x[..., 1], x[..., 2]
    c = v * s; hp = h / 60.0; xx = c * (1 - np.abs(hp % 2 - 1)); m = v - c
    z = np.zeros_like(h)
    i = np.floor(hp).astype(int) % 6
    r = np.choose(i, [c, xx, z, z, xx, c]); g = np.choose(i, [xx, c, c, xx, z, z]); b = np.choose(i, [z, z, xx, c, c, xx])
    return np.stack([r + m, g + m, b + m], -1)


def band(h, center, width):
    """Poids 1 au centre de la plage de teinte, 0 au-delà de « width » degrés (teinte circulaire)."""
    dist = np.abs((h - center + 180.0) % 360.0 - 180.0)
    return np.clip(1 - dist / width, 0, 1) ** 1.2


def grade(a, strength=1.0):
    """a : tableau float (…, 3) en 0..1 (RGB). Renvoie le tableau étalonné, même forme."""
    a = np.clip(np.asarray(a, np.float32), 0, 1)
    src = a
    hsv = rgb_to_hsv(a)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    cyan = band(h, 185.0, 38.0)          # filets d'ombrage (cyan, turquoise)
    sky = band(h, 218.0, 40.0)           # ciel, reflets bleus
    green = band(h, 100.0, 45.0)         # herbe
    shell = band(h, 32.0, 22.0)          # coquilles, bois (caramel)
    h = h - 42.0 * cyan + 6.0 * green * (h < 100) - 4.0 * green * (h >= 100) - 8.0 * sky
    s = s * (1 - 0.68 * cyan) * (1 - 0.72 * sky) * (1 - 0.18 * green) * (1 + 0.10 * shell)
    v = v * (1 - 0.22 * cyan * s) * (1 - 0.08 * sky)          # filets et ciel un peu plus sombres
    a = hsv_to_rgb(np.stack([h, np.clip(s, 0, 1), v], -1))
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    a = lum[..., None] + (a - lum[..., None]) * 0.9            # désaturation générale légère
    a = 0.035 + a * 0.93                                       # noirs relevés, blancs adoucis
    sc = a * a * (3 - 2 * a)
    a = a * 0.6 + sc * 0.4                                     # courbe en S (contraste des tons moyens)
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    shadow = np.array([0.16, 0.22, 0.15], np.float32)          # mousse profonde
    light = np.array([1.00, 0.93, 0.80], np.float32)           # ivoire chaud
    ws = np.clip(1 - lum / 0.5, 0, 1)[..., None] ** 1.6 * 0.30
    wl = np.clip((lum - 0.5) / 0.5, 0, 1)[..., None] ** 1.2 * 0.16
    a = a * (1 - ws) + shadow * ws * (0.45 + a)
    a = a * (1 - wl) + light * wl * np.maximum(a, 0.7)
    wm = np.exp(-((lum - 0.45) / 0.22) ** 2)[..., None]       # tons moyens dorés
    a = a + wm * np.array([0.018, 0.006, -0.026], np.float32)
    a[..., 0] *= 1.03; a[..., 1] *= 1.005; a[..., 2] *= 0.92     # chaleur
    a = np.clip(a, 0, 1)
    return src + (a - src) * strength if strength != 1.0 else a


def write_cube(path, size=33, strength=1.0):
    """Table 3D au format .cube (ordre : rouge varie le plus vite), pour lut3d de ffmpeg."""
    t = np.linspace(0, 1, size, dtype=np.float32)
    b, g, r = np.meshgrid(t, t, t, indexing='ij')
    lattice = np.stack([r, g, b], -1).reshape(-1, 3)
    out = grade(lattice, strength)
    with open(path, 'w') as f:
        f.write('TITLE "Garnoutey"\nLUT_3D_SIZE %d\nDOMAIN_MIN 0 0 0\nDOMAIN_MAX 1 1 1\n' % size)
        for x in out:
            f.write('%.6f %.6f %.6f\n' % tuple(x))
