"""Emblème de l'Héliciculture du Garnoutey : une spirale logarithmique (la coquille) qui se prolonge en une ligne
horizontale (le pied de l'escargot). Tracé calculé, courbes de Bézier cubiques, dans un carré de 100 x 100.
Sortie : tools/logo/logo.json (chemins SVG), tools/logo/apercu.png (contrôle visuel)."""
import json, math, os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'logo')

CX, CY = 46.0, 44.0      # centre de la spirale
R_END = 27.0             # rayon extérieur (au point bas, là où naît le pied)
TURNS = 2.6              # nombre de tours
GROWTH = 2.45            # le rayon est multiplié par GROWTH à chaque tour
K = math.log(GROWTH) / (2 * math.pi)
T_END = -math.pi / 2 + 2 * math.pi * math.ceil(TURNS)   # fin au point bas (angle -90° modulo 2 pi)
T_START = T_END - 2 * math.pi * TURNS
R0 = R_END / math.exp(K * (T_END - T_START))


def P(t):
    r = R0 * math.exp(K * (t - T_START))
    return (CX + r * math.cos(t), CY - r * math.sin(t))


def dP(t):
    r = R0 * math.exp(K * (t - T_START))
    return (r * (K * math.cos(t) - math.sin(t)), -r * (K * math.sin(t) + math.cos(t)))


def spiral_path(step=math.pi / 4):
    n = int(round((T_END - T_START) / step))
    h = (T_END - T_START) / n
    x, y = P(T_START)
    d = [f'M{x:.2f} {y:.2f}']
    for i in range(n):
        a, b = T_START + i * h, T_START + (i + 1) * h
        pa, pb, da, db = P(a), P(b), dP(a), dP(b)
        c1 = (pa[0] + da[0] * h / 3, pa[1] + da[1] * h / 3)
        c2 = (pb[0] - db[0] * h / 3, pb[1] - db[1] * h / 3)
        d.append(f'C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {pb[0]:.2f} {pb[1]:.2f}')
    return ' '.join(d)


def main():
    os.makedirs(OUT, exist_ok=True)
    ex, ey = P(T_END)          # point bas de la spirale
    foot_end = ex + 1.42 * R_END
    tail = ex - 0.92 * R_END
    # pied : la ligne part du bas de la coquille vers la droite et se relève à peine (la tête)
    spiral = spiral_path() + f' L{foot_end - 6:.2f} {ey:.2f} C{foot_end - 2.5:.2f} {ey:.2f} {foot_end:.2f} {ey - 1.2:.2f} {foot_end + 1.5:.2f} {ey - 3.6:.2f}'
    tail_d = f'M{tail:.2f} {ey:.2f} L{ex - 2:.2f} {ey:.2f}'
    # cadre serré autour du tracé (marge = demi-épaisseur du trait + 1)
    m = 3.2
    top = CY - max(R0 * math.exp(K * (t - T_START)) * math.sin(t) for t in [T_START + (T_END - T_START) * i / 2000 for i in range(2001)])
    x0, y0, x1, y1 = tail - m, top - m, foot_end + 1.5 + m, ey + m
    data = {'viewBox': f'{x0:.2f} {y0:.2f} {x1 - x0:.2f} {y1 - y0:.2f}', 'spiral': spiral, 'tail': tail_d, 'stroke': 3.2,
            'center': [CX, CY], 'ratio': round((x1 - x0) / (y1 - y0), 4)}
    json.dump(data, open(os.path.join(OUT, 'logo.json'), 'w'), indent=1)
    # aperçu
    S = 8
    im = Image.new('RGB', (100 * S, 100 * S), (244, 238, 227))
    dr = ImageDraw.Draw(im)
    ts = [T_START + (T_END - T_START) * i / 900 for i in range(901)]
    pts = [(P(t)[0] * S, P(t)[1] * S) for t in ts] + [(foot_end * S, ey * S)]
    dr.line(pts, fill=(27, 36, 27), width=int(3.2 * S), joint='curve')
    dr.line([(tail * S, ey * S), (ex * S, ey * S)], fill=(27, 36, 27), width=int(3.2 * S))
    im.resize((400, 400), Image.LANCZOS).save(os.path.join(OUT, 'apercu.png'))
    print(json.dumps(data)[:300])


if __name__ == '__main__':
    main()
