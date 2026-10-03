"""Itinéraire à pied du Clos à la gare Saint-Jean (Dijkstra sur les rues OSM) -> chemin SVG + distance."""
import json, math, heapq, os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, 'carte.py')).read().split("data = json.load")[0]
exec(src)
data = json.load(open(os.path.join(HERE, 'osm.json')))
G = {}
def key(p): return (round(p['lat'], 7), round(p['lon'], 7))
WALK = {'primary', 'secondary', 'tertiary', 'unclassified', 'residential', 'living_street', 'pedestrian', 'primary_link', 'secondary_link', 'tertiary_link'}
for e in data['elements']:
    t = e.get('tags', {})
    if t.get('highway') in WALK and 'geometry' in e:
        g = e['geometry']
        for a, b in zip(g, g[1:]):
            ka, kb = key(a), key(b)
            xa, ya = proj(*ka); xb, yb = proj(*kb)
            d = math.hypot(xb - xa, yb - ya)
            G.setdefault(ka, []).append((kb, d)); G.setdefault(kb, []).append((ka, d))
def nearest(lat, lon):
    x0, y0 = proj(lat, lon)
    return min(G, key=lambda k: math.hypot(proj(*k)[0] - x0, proj(*k)[1] - y0))
start = nearest(*CLOS)
# entrée principale de la gare (hall 1, parvis Louis-Armand) : point de la rue Charles Domercq le plus proche du bâtiment principal
gare = None
for e in data['elements']:
    if e.get('tags', {}).get('name') == 'Gare de Bordeaux Saint-Jean' and 'geometry' in e:
        gare = (sum(p['lat'] for p in e['geometry']) / len(e['geometry']), sum(p['lon'] for p in e['geometry']) / len(e['geometry']))
dist = {start: 0}; prev = {}; pq = [(0, start)]
while pq:
    d, u = heapq.heappop(pq)
    if d > dist.get(u, 1e18): continue
    for v, w in G[u]:
        nd = d + w
        if nd < dist.get(v, 1e18):
            dist[v] = nd; prev[v] = u; heapq.heappush(pq, (nd, v))
gx0, gy0 = proj(*gare)
# entrée : le point des rues le plus vite atteint à pied parmi ceux à moins de 100 m du bâtiment voyageurs
cand = [k for k in dist if math.hypot(proj(*k)[0] - gx0, proj(*k)[1] - gy0) < 100]
goal = min(cand, key=lambda k: dist[k])
path = [goal]
while path[-1] != start: path.append(prev[path[-1]])
path.reverse()
pts = [proj(*CLOS)] + [proj(*k) for k in path]
L = dist[goal] + math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1])
d = 'M' + ' L'.join('%.0f %.0f' % p for p in simplify(pts, 1.0))
minutes = L / (4.8 * 1000 / 60)
gx, gy = proj(*goal)
out = {'d': d, 'metres': round(L), 'minutes': round(minutes, 1), 'goal_pct': (round(100 * gx / VW, 2), round(100 * gy / VH, 2))}
json.dump(out, open(os.path.join(HERE, 'itineraire.json'), 'w'))
print(out['metres'], 'm', out['minutes'], 'min', out['goal_pct'], len(path), 'noeuds')
