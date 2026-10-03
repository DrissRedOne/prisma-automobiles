"""Plan stylisé du quartier (données OpenStreetMap, © contributeurs OSM, ODbL) -> SVG léger + positions des repères."""
import json, math, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
CLOS = (44.821371, -0.560582)
C0 = (44.8232, -0.5582)          # centre du cadre (entre le Clos et la gare)
W_M, H_M = 1700.0, 1100.0        # emprise en mètres
VW, VH = 1700, 1100              # unités SVG (1 unité = 1 m)
KX = 111320.0 * math.cos(math.radians(C0[0])); KY = 110574.0
def proj(lat, lon):
    return ((lon - C0[1]) * KX + W_M / 2, (C0[0] - lat) * KY + H_M / 2)
def simplify(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / L
        if d > dmax: dmax, idx = d, i
    if dmax > eps:
        return simplify(pts[:idx + 1], eps)[:-1] + simplify(pts[idx:], eps)
    return [pts[0], pts[-1]]
def clip_ok(pts, m=150):
    return any(-m <= x <= VW + m and -m <= y <= VH + m for x, y in pts)
def d_of(pts, close=False):
    s = 'M' + ' L'.join('%d %d' % (round(x), round(y)) for x, y in pts)
    return s + ('Z' if close else '')
data = json.load(open(os.path.join(HERE, 'osm.json')))
layers = {k: [] for k in ('water', 'park', 'rail', 'tram', 'station', 'major', 'mid', 'minor', 'ped')}
labels = []
for e in data['elements']:
    t = e.get('tags', {})
    geoms = []
    if e['type'] == 'way' and 'geometry' in e:
        geoms = [[proj(p['lat'], p['lon']) for p in e['geometry']]]
    elif e['type'] == 'relation':
        for m in e.get('members', []):
            if m.get('geometry') and m.get('role') in ('outer', ''):
                geoms.append([proj(p['lat'], p['lon']) for p in m['geometry']])
    hw = t.get('highway'); rw = t.get('railway')
    for g in geoms:
        if not clip_ok(g): continue
        g2 = simplify(g, 1.2)
        if t.get('natural') == 'water' or t.get('waterway') == 'riverbank':
            layers['water'].append(d_of(g2, True))
        elif t.get('leisure') == 'park':
            layers['park'].append(d_of(g2, True))
        elif t.get('building') == 'train_station' or rw == 'station':
            layers['station'].append(d_of(g2, True))
        elif rw == 'rail':
            if t.get('service') in ('yard', 'siding', 'spur'): continue
            layers['rail'].append(d_of(g2))
        elif rw == 'tram':
            layers['tram'].append(d_of(g2))
        elif hw in ('motorway', 'trunk', 'primary', 'primary_link'):
            layers['major'].append(d_of(g2))
        elif hw in ('secondary', 'secondary_link', 'tertiary', 'tertiary_link'):
            layers['mid'].append(d_of(g2))
        elif hw in ('residential', 'unclassified', 'living_street'):
            layers['minor'].append(d_of(g2))
        elif hw == 'pedestrian':
            layers['ped'].append(d_of(g2))
style = {
    'water': 'fill="var(--map-water)"',
    'park': 'fill="var(--map-park)"',
    'station': 'fill="var(--map-station)"',
    'rail': 'fill="none" stroke="var(--map-rail)" stroke-width="1.6" stroke-dasharray="7 5"',
    'tram': 'fill="none" stroke="var(--map-tram)" stroke-width="2.2"',
    'major': 'fill="none" stroke="var(--map-major)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"',
    'mid': 'fill="none" stroke="var(--map-mid)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"',
    'minor': 'fill="none" stroke="var(--map-minor)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"',
    'ped': 'fill="none" stroke="var(--map-minor)" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"',
}
parts = []
for k in ('water', 'park', 'station', 'rail', 'tram', 'ped', 'minor', 'mid', 'major'):
    if layers[k]:
        parts.append('<path class="m-%s" %s d="%s"/>' % (k, style[k], ''.join(layers[k])))
svg_inner = ''.join(parts)
def pct(lat, lon):
    x, y = proj(lat, lon); return round(100 * x / VW, 2), round(100 * y / VH, 2)
marks = {
    'clos': pct(*CLOS),
    'gare': pct(44.8255227, -0.5556498),
    'tram_belcier': pct(44.8225525, -0.5521089),
}
# centre du hall 3 (Belcier)
for e in data['elements']:
    if e.get('tags', {}).get('name') == 'Hall 3 (Belcier)' and 'geometry' in e:
        la = sum(p['lat'] for p in e['geometry']) / len(e['geometry']); lo = sum(p['lon'] for p in e['geometry']) / len(e['geometry'])
        marks['hall3'] = pct(la, lo)
        dx = (lo - CLOS[1]) * KX; dy = (la - CLOS[0]) * KY
        marks['hall3_dist_m'] = round(math.hypot(dx, dy))
json.dump({'viewBox': [VW, VH], 'svg': svg_inner, 'marks': marks}, open(os.path.join(HERE, 'carte.json'), 'w'))
print('bytes', len(svg_inner), {k: len(v) for k, v in layers.items()}, marks)
