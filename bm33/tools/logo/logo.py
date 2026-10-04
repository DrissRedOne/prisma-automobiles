"""Logo BM 33 vectorisé (polices libres OFL converties en tracés : aucun fichier de police requis à l'affichage).
- « BM33 » en Michroma (large, esprit automobile), filet bordeaux, « AUTOMOBILES » en Inter espacé.
Écrit logo.json (tracés et dimensions, lus par build.py) et des aperçus SVG/PNG."""
import json, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib.instancer import instantiateVariableFont

HERE = os.path.dirname(os.path.abspath(__file__))
TTF = os.path.join(os.path.dirname(HERE), 'ttf')


def text_path(font, text, size, tracking=0.0, x0=0.0, y0=0.0):
    """Tracé SVG d'un texte (axe y vers le bas), retourne (d, largeur, ascent)."""
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    upm = font['head'].unitsPerEm
    k = size / upm
    pen = SVGPathPen(gs)
    x = 0.0
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        t = TransformPen(pen, (k, 0, 0, -k, x0 + x, y0))
        gs[g].draw(t)
        x += hmtx[g][0] * k + (tracking * size if i < len(text) - 1 else 0)
    return pen.getCommands(), x


def bounds(font, text, size, tracking=0.0):
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    k = size / font['head'].unitsPerEm
    bp = BoundsPen(gs)
    x = 0.0
    xmin = ymin = 1e9; xmax = ymax = -1e9
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        b = BoundsPen(gs); gs[g].draw(b)
        if b.bounds:
            x0, y0, x1, y1 = b.bounds
            xmin = min(xmin, x + x0 * k); xmax = max(xmax, x + x1 * k)
            ymin = min(ymin, y0 * k); ymax = max(ymax, y1 * k)
        x += hmtx[g][0] * k + (tracking * size if i < len(text) - 1 else 0)
    return xmin, ymin, xmax, ymax


mich = TTFont(os.path.join(TTF, 'Michroma.ttf'))
inter = instantiateVariableFont(TTFont(os.path.join(TTF, 'Inter-VF.ttf')), {'wght': 500, 'opsz': 14})

# marque : BM33 (capitales de 100 px de haut environ)
S = 140
bx0, by0, bx1, by1 = bounds(mich, 'BM33', S)
mark_d, mark_w = text_path(mich, 'BM33', S, x0=-bx0, y0=by1)
mark_h = by1 - by0
mark_w = bx1 - bx0

# sous-titre AUTOMOBILES, espacé, justifié sur la largeur de la marque
sub = 'AUTOMOBILES'
SS = 26
sx0, sy0, sx1, sy1 = bounds(inter, sub, SS)
natural = sx1 - sx0
track = (mark_w - natural) / (len(sub) - 1) / SS
sx0, sy0, sx1, sy1 = bounds(inter, sub, SS, track)
gap_rule, rule_h, gap_sub = 18, 3, 16
y_rule = mark_h + gap_rule
y_sub = y_rule + rule_h + gap_sub + (sy1 - sy0)
sub_d, _ = text_path(inter, sub, SS, track, x0=-sx0, y0=y_sub)
full_h = y_sub - sy0 * 0 + 2

data = {
    'mark': {'d': mark_d, 'w': round(mark_w, 2), 'h': round(mark_h, 2)},
    'full': {'d_mark': mark_d, 'd_sub': sub_d, 'rule': [0, round(y_rule, 2), round(mark_w, 2), rule_h], 'w': round(mark_w, 2), 'h': round(y_sub + 2, 2)},
}
json.dump(data, open(os.path.join(HERE, 'logo.json'), 'w'), indent=1)

INK, PAPER, RED = '#0d0e10', '#f3f1ec', '#8a1c2b'
def svg_full(fg, rule):
    w, h = data['full']['w'], data['full']['h']
    r = data['full']['rule']
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
            f'<path fill="{fg}" d="{mark_d}"/><rect x="{r[0]}" y="{r[1]}" width="{r[2]}" height="{r[3]}" fill="{rule}"/>'
            f'<path fill="{fg}" d="{sub_d}"/></svg>')
open(os.path.join(HERE, 'logo-clair.svg'), 'w').write(svg_full(INK, RED))
open(os.path.join(HERE, 'logo-sombre.svg'), 'w').write(svg_full(PAPER, RED))
print('marque', round(mark_w), 'x', round(mark_h), '| logo complet', data['full']['w'], 'x', data['full']['h'])
