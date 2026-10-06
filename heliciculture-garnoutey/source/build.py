"""Construit le site de l'Héliciculture du Garnoutey (out/web) :
- pages HTML pré-rendues (Jinja2), lisibles sans JavaScript, avec balises SEO et données structurées ;
- styles et scripts versionnés (empreinte dans le nom), polices, photos et vidéos hébergées avec le site ;
- icônes, image de partage, manifeste, plan du site, robots.txt, vercel.json et configuration nginx ;
- contrôles : liens internes, ancres, images, identifiants, règles de rédaction (ni tiret long ni tiret moyen).

Options :
  --publier   remplace ../site, ../vercel.json et ../nginx-garnoutey.conf par le résultat ;
  --indexer   ouvre le site à Google : seulement une fois le contenu validé par l'éleveur.
Adresse du site : variable d'environnement GARNOUTEY_SITE_URL (défaut : l'adresse de démonstration sur Vercel).
Les photos se préparent avant avec ../tools/photos.py, les vidéos avec ../tools/videos.py, le logo avec ../tools/logo.py.
"""
import base64, datetime, glob, hashlib, io, json, math, os, re, shutil, sys
from html.parser import HTMLParser
from jinja2 import Environment, FileSystemLoader, StrictUndefined
from PIL import Image, ImageDraw, ImageFilter, ImageFont

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
sys.path.insert(0, here)
import content as C

SITE_URL = os.environ.get('GARNOUTEY_SITE_URL', 'https://heliciculture-garnoutey.vercel.app').rstrip('/')
INDEXABLE = '--indexer' in sys.argv
TODAY = datetime.date.today().isoformat()
read = lambda *p: open(os.path.join(*p), encoding='utf-8').read()

out = os.path.join(here, 'out', 'web')
shutil.rmtree(out, ignore_errors=True)
os.makedirs(out)


def write(rel, data):
    p = os.path.join(out, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode('utf-8'))
    return '/' + rel.replace(os.sep, '/')


def hashed(name, ext, text):
    h = hashlib.sha256(text.encode('utf-8')).hexdigest()[:10]
    return write(f'assets/{name}.{h}.{ext}', text)


# ---------------------------------------------------------------- règles de rédaction sur les sources
SOURCES = [os.path.join(here, 'content.py')] + glob.glob(os.path.join(here, 'templates', '*.html')) + [os.path.join(here, 'assets', 'main.js'), os.path.join(here, 'assets', 'style.css')]
for f in SOURCES:
    txt = read(f)
    assert '\u2014' not in txt and '\u2013' not in txt, f'tiret long ou moyen dans {f}'

# ---------------------------------------------------------------- données
photos = json.load(open(os.path.join(root, 'build', 'photos.json'), encoding='utf-8'))
videos = json.load(open(os.path.join(root, 'build', 'videos.json'), encoding='utf-8')) if os.path.exists(os.path.join(root, 'build', 'videos.json')) else {}
for name, v in videos.items():   # images d'attente des vidéos, servies comme les photos
    photos[name + '-poster'] = {'w': v['w'], 'h': v['h'], 'sizes': v['poster_sizes'], 'alt': v['alt'], 'lqip': v['lqip'], 'src': 'video/' + name}
for k, p in photos.items():
    p['default'] = max([s for s in p['sizes'] if s <= 1200] or [min(p['sizes'])])
    p['alt'] = p['alt'].replace("'", '\u2019')
for pg in C.PAGES.values():
    pg['title'] = pg['title'].replace("'", '\u2019'); pg['description'] = pg['description'].replace("'", '\u2019')
logo = json.load(open(os.path.join(root, 'tools', 'logo', 'logo.json'), encoding='utf-8'))
wm_index = {it['code']: it for it in json.load(open(os.path.join(root, 'photos', 'wikimedia', 'index.json'), encoding='utf-8'))}

# crédits des photos libres effectivement utilisées
LICENSE_FR = {'Public domain': 'domaine public'}
credits = []
for name, p in sorted(photos.items(), key=lambda kv: kv[1]['alt']):
    kind, fn = p['src'].split('/')
    if kind != 'wm':
        continue
    it = wm_index[fn.rsplit('.', 1)[0]]
    lic = LICENSE_FR.get(it['license'], 'licence ' + it['license'])
    credits.append({'label': p['alt'], 'author': it['creator'] or 'auteur inconnu', 'source': 'Wikimedia Commons', 'url': it['foreign_landing_url'], 'license': lic})

# ---------------------------------------------------------------- styles et scripts
css = read(here, 'fonts', 'fonts.css') + '\n' + read(here, 'assets', 'style.css')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{};])\s*', r'\1', css).strip()
VENDOR = ['gsap.min.js', 'ScrollTrigger.min.js', 'SplitText.min.js', 'lenis.min.js']
js_parts = []
for v in VENDOR:
    t = read(here, 'vendor', v)
    t = re.sub(r'//# sourceMappingURL=.*$', '', t, flags=re.M)
    js_parts.append(f'/* {v} */\n' + t.strip() + ';\n')
js_parts.append(read(here, 'assets', 'main.js'))
assets = {'css': hashed('style', 'css', css), 'js': hashed('app', 'js', '\n'.join(js_parts))}

# polices, photos, vidéos
for f in glob.glob(os.path.join(here, 'fonts', '*.woff2')):
    os.makedirs(os.path.join(out, 'fonts'), exist_ok=True)
    shutil.copy(f, os.path.join(out, 'fonts', os.path.basename(f)))
os.makedirs(os.path.join(out, 'img'), exist_ok=True)
for name, p in photos.items():
    for s in p['sizes']:
        shutil.copy(os.path.join(here, 'img', f'{name}-{s}.webp'), os.path.join(out, 'img', f'{name}-{s}.webp'))
for name in videos:
    os.makedirs(os.path.join(out, 'video'), exist_ok=True)
    for ext in ('mp4', 'webm'):
        shutil.copy(os.path.join(here, 'video', f'{name}.{ext}'), os.path.join(out, 'video', f'{name}.{ext}'))

# grain (bruit léger, tuile 180 px)
import random
rnd = random.Random(7)
g = Image.new('L', (180, 180))
g.putdata([rnd.randint(70, 255) for _ in range(180 * 180)])
buf = io.BytesIO(); g.save(buf, 'PNG', optimize=True); write('img/grain.png', buf.getvalue())

# ---------------------------------------------------------------- emblème en image (icônes, partage)
vb = [float(x) for x in logo['viewBox'].split()]


def bezier_points(d):
    """Points du tracé SVG (M, L, C absolus) pour le dessiner avec Pillow."""
    toks = re.findall(r'[MLC]|-?\d+(?:\.\d+)?', d)
    pts, i, cur, cmd = [], 0, (0, 0), None
    polys = []
    while i < len(toks):
        if toks[i] in 'MLC':
            cmd = toks[i]; i += 1
            if cmd == 'M' and pts: polys.append(pts); pts = []
            continue
        if cmd in ('M', 'L'):
            cur = (float(toks[i]), float(toks[i + 1])); i += 2; pts.append(cur)
        elif cmd == 'C':
            c1 = (float(toks[i]), float(toks[i + 1])); c2 = (float(toks[i + 2]), float(toks[i + 3])); p2 = (float(toks[i + 4]), float(toks[i + 5])); i += 6
            for k in range(1, 17):
                t = k / 16
                x = (1 - t) ** 3 * cur[0] + 3 * (1 - t) ** 2 * t * c1[0] + 3 * (1 - t) * t * t * c2[0] + t ** 3 * p2[0]
                y = (1 - t) ** 3 * cur[1] + 3 * (1 - t) ** 2 * t * c1[1] + 3 * (1 - t) * t * t * c2[1] + t ** 3 * p2[1]
                pts.append((x, y))
            cur = p2
    if pts: polys.append(pts)
    return polys


def emblem_image(width, color, stroke=3.2, ss=4):
    """Emblème en RGBA, largeur donnée (hauteur selon les proportions), dessiné en suréchantillonnage."""
    W = width * ss; scale = W / vb[2]; H = int(round(vb[3] * scale))
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dr = ImageDraw.Draw(im)
    lw = max(1, int(round(stroke * scale)))
    for d in (logo['spiral'], logo['tail']):
        for poly in bezier_points(d):
            pts = [((x - vb[0]) * scale, (y - vb[1]) * scale) for x, y in poly]
            dr.line(pts, fill=color, width=lw, joint='curve')
            for x, y in (pts[0], pts[-1]):   # extrémités arrondies
                dr.ellipse((x - lw / 2, y - lw / 2, x + lw / 2, y + lw / 2), fill=color)
    return im.resize((width, int(round(H / ss))), Image.LANCZOS)


MOSS = (27, 36, 27, 255); SOFT = (217, 184, 140, 255); IVORY = (244, 238, 227, 255)


def square_icon(size, pad=0.2):
    bg = Image.new('RGBA', (size, size), MOSS)
    e = emblem_image(int(size * (1 - 2 * pad)), SOFT, stroke=4.2)
    bg.alpha_composite(e, ((size - e.width) // 2, (size - e.height) // 2 + int(size * 0.02)))
    return bg.convert('RGB')


def png(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return b.getvalue()


write('apple-touch-icon.png', png(square_icon(180)))
write('icon-192.png', png(square_icon(192)))
write('icon-512.png', png(square_icon(512, 0.24)))
b = io.BytesIO(); square_icon(64, 0.14).save(b, 'ICO', sizes=[(16, 16), (32, 32), (48, 48)]); write('favicon.ico', b.getvalue())
cx = vb[0] + vb[2] / 2; cy = vb[1] + vb[3] / 2; side = max(vb[2], vb[3]) * 1.5
write('icon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cx - side / 2:.2f} {cy - side / 2:.2f} {side:.2f} {side:.2f}"><rect x="{cx - side / 2:.2f}" y="{cy - side / 2:.2f}" width="{side:.2f}" height="{side:.2f}" rx="{side * 0.22:.2f}" fill="#1b241b"/><g fill="none" stroke="#d9b88c" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"><path d="{logo["spiral"]}"/><path d="{logo["tail"]}"/></g></svg>')
write('manifest.webmanifest', json.dumps({
    'name': C.SITE['name'], 'short_name': C.SITE['short'], 'lang': 'fr', 'start_url': '/', 'display': 'browser',
    'background_color': '#f4eee3', 'theme_color': '#1b241b',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}],
}, ensure_ascii=False, indent=1))


def og_image():
    W, H = 1200, 630
    base = Image.open(os.path.join(here, 'img', 'nuit-large-1600.webp')).convert('RGB')
    r = max(W / base.width, H / base.height)
    base = base.resize((round(base.width * r), round(base.height * r)), Image.LANCZOS)
    x0, y0 = (base.width - W) // 2, (base.height - H) // 2
    im = base.crop((x0, y0, x0 + W, y0 + H)).filter(ImageFilter.GaussianBlur(1.4)).convert('RGBA')
    im = Image.alpha_composite(im, Image.new('RGBA', (W, H), (16, 22, 16, 170)))
    e = emblem_image(230, SOFT, stroke=3.4)
    im.alpha_composite(e, ((W - e.width) // 2, 120))
    dr = ImageDraw.Draw(im)
    serif = ImageFont.truetype(os.path.join(here, 'fonts', 'instrument-serif-latin.woff2'), 96)
    sans = ImageFont.truetype(os.path.join(here, 'fonts', 'manrope-latin.woff2'), 24)
    try: sans.set_variation_by_axes([600])
    except Exception: pass
    for txt, f, y, col in (('Garnoutey', serif, 300, IVORY), ('HÉLICICULTURE  ·  ESCARGOTS ÉLEVÉS SOUS SERRE', sans, 436, SOFT),
                           ("Lugon-et-l'Île-du-Carnay, Gironde".replace("'", '\u2019'), sans, 480, (244, 238, 227, 200))):
        tw = dr.textlength(txt, font=f)
        dr.text(((W - tw) / 2, y), txt, font=f, fill=col)
    b = io.BytesIO(); im.convert('RGB').save(b, 'JPEG', quality=86, optimize=True, progressive=True)
    return b.getvalue()


write('og.jpg', og_image())

# ---------------------------------------------------------------- données structurées
S = C.SITE
business = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': SITE_URL + '/#elevage',
    'name': S['name'], 'url': SITE_URL + '/', 'image': [SITE_URL + '/og.jpg'], 'logo': SITE_URL + '/icon-512.png',
    'description': C.PAGES['index']['description'].replace('\u2019', "'"),
    'telephone': S['phone_e164'], 'email': S['email'],
    'address': {'@type': 'PostalAddress', 'streetAddress': S['street'], 'postalCode': S['zip'], 'addressLocality': S['city'], 'addressRegion': 'Nouvelle-Aquitaine', 'addressCountry': 'FR'},
    'geo': {'@type': 'GeoCoordinates', 'latitude': S['lat'], 'longitude': S['lon']},
    'areaServed': {'@type': 'AdministrativeArea', 'name': 'Gironde'},
    'knowsAbout': ['Héliciculture', 'Escargots petits-gris', 'Escargots au beurre persillé'],
}


def crumbs_ld(page):
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': SITE_URL + '/'},
        {'@type': 'ListItem', 'position': 2, 'name': page['crumb'], 'item': SITE_URL + page['path']}]}


faq_ld = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in C.FAQ]}
website_ld = {'@context': 'https://schema.org', '@type': 'WebSite', 'name': S['name'], 'url': SITE_URL + '/', 'inLanguage': 'fr'}
recipes_ld = [{
    '@context': 'https://schema.org', '@type': 'Recipe', 'name': r['name'], 'description': r['intro'],
    'image': [f"{SITE_URL}/img/{r['photo']}-{photos[r['photo']]['default']}.webp"],
    'author': {'@type': 'Organization', 'name': S['name']}, 'recipeYield': f"{r['serves']} personnes",
    'prepTime': f"PT{r['prep']}M", 'cookTime': f"PT{r['cook']}M", 'totalTime': f"PT{r['prep'] + r['cook']}M",
    'recipeCategory': 'Entrée', 'recipeCuisine': 'Française', 'keywords': 'escargots, ' + r['name'].lower(),
    'recipeIngredient': r['ingredients'],
    'recipeInstructions': [{'@type': 'HowToStep', 'position': i + 1, 'text': s} for i, s in enumerate(r['steps'])],
} for r in C.RECIPES]


def jsonld_for(key, page):
    blocks = [business]
    if key == 'index': blocks.append(website_ld)
    if page.get('crumb') and key != '404': blocks.append(crumbs_ld(page))
    if key == 'escargots': blocks.append(faq_ld)
    if key == 'recettes': blocks += recipes_ld
    txt = json.dumps(blocks if len(blocks) > 1 else blocks[0], ensure_ascii=False, separators=(',', ':'))
    return txt.replace('</', '<\\/')


# ---------------------------------------------------------------- typographie française
NB, NNB = '\u00a0', '\u202f'


def typo(text):
    text = re.sub(r' ([;!?])', NNB + r'\1', text)
    text = re.sub(r' (:)(?=\s|$)', NB + r'\1', text)
    text = re.sub(r'« ', '«' + NB, text)
    text = re.sub(r' »', NB + '»', text)
    text = re.sub(r'(\d) (%|€|°C|°|h\b|min\b|g\b|cl\b|kg\b)', r'\1' + NB + r'\2', text)
    text = re.sub(r"(\w)(?:'|&#39;)(\w)", '\\1\u2019\\2', text)
    return text


def typo_html(doc):
    parts = re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', doc, flags=re.S)
    return ''.join(p if p.startswith('<') else typo(p) for p in parts)


# ---------------------------------------------------------------- pages
env = Environment(loader=FileSystemLoader(os.path.join(here, 'templates')), autoescape=True, undefined=StrictUndefined, trim_blocks=True, lstrip_blocks=True)
env.globals.update(site=S, maps=C.MAPS, legal=C.LEGAL, nav=C.NAV, home=C.HOME, cycle_steps=C.CYCLE, elevage=C.ELEVAGE,
                   products=C.PRODUCTS, order_steps=C.ORDER_STEPS, faq=C.FAQ, season=C.SEASON, recipes=C.RECIPES, preparation=C.PREPARATION,
                   photos=photos, videos=videos, logo=logo, credits=credits, assets=assets, site_url=SITE_URL,
                   indexable=INDEXABLE, year=datetime.date.today().year)
INLINE_SCRIPTS = set()
for key, page in C.PAGES.items():
    page = dict(page, key=key)
    doc = env.get_template(page['template']).render(page=page, jsonld=jsonld_for(key, page))
    doc = typo_html(doc)
    for m in re.finditer(r'<script>(.*?)</script>', doc, flags=re.S):
        INLINE_SCRIPTS.add(m.group(1))
    write(page['file'], doc)

# ---------------------------------------------------------------- robots, plan du site, vercel.json
if INDEXABLE:
    write('robots.txt', f'User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n')
else:
    write('robots.txt', 'User-agent: *\nAllow: /\n')
urls = ''.join(f'<url><loc>{SITE_URL}{p["path"]}</loc><lastmod>{TODAY}</lastmod></url>' for k, p in C.PAGES.items() if p.get('sitemap', True))
write('sitemap.xml', f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')

hashes = ' '.join("'sha256-" + base64.b64encode(hashlib.sha256(s.encode('utf-8')).digest()).decode() + "'" for s in sorted(INLINE_SCRIPTS))
CSP = ("default-src 'self'; script-src 'self' " + hashes + "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self'; "
       "connect-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'")
headers_all = [
    {'key': 'Content-Security-Policy', 'value': CSP},
    {'key': 'X-Content-Type-Options', 'value': 'nosniff'},
    {'key': 'Referrer-Policy', 'value': 'strict-origin-when-cross-origin'},
    {'key': 'Permissions-Policy', 'value': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()'},
    {'key': 'X-Frame-Options', 'value': 'DENY'},
]
if not INDEXABLE:
    headers_all.append({'key': 'X-Robots-Tag', 'value': 'noindex, nofollow'})
vercel = {
    '$schema': 'https://openapi.vercel.sh/vercel.json',
    'outputDirectory': 'site', 'cleanUrls': True, 'trailingSlash': False,
    'redirects': [
        {'source': '/elevage', 'destination': '/l-elevage', 'permanent': True},
        {'source': '/escargots', 'destination': '/nos-escargots', 'permanent': True},
        {'source': '/produits', 'destination': '/nos-escargots', 'permanent': True},
        {'source': '/commander', 'destination': '/contact', 'permanent': True},
        {'source': '/commande', 'destination': '/contact', 'permanent': True},
        {'source': '/recette', 'destination': '/recettes', 'permanent': True},
    ],
    'headers': [
        {'source': '/(.*)', 'headers': headers_all},
        {'source': '/assets/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/img/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=604800, stale-while-revalidate=86400'}]},
        {'source': '/video/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=604800, stale-while-revalidate=86400'}]},
    ],
}
open(os.path.join(here, 'out', 'vercel.json'), 'w', encoding='utf-8').write(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')

# ---------------------------------------------------------------- configuration nginx (hébergement sur un VPS)
# mêmes règles que vercel.json : adresses sans « .html », 404, redirections, en-têtes de sécurité, cache.
nginx_headers = '\n'.join(f'    add_header {h["key"]} "{h["value"]}" always;' for h in headers_all)
nginx_redirects = '\n'.join(f'    location = {r["source"]} {{ return {301 if r["permanent"] else 302} {r["destination"]}; }}' for r in vercel['redirects'])
NGINX = f"""# Héliciculture du Garnoutey : site statique, généré par build.py (ne pas modifier à la main : relancer la construction).
# Installation : copier ce fichier dans /etc/nginx/sites-available/garnoutey, remplacer DOMAINE et le chemin du
# dossier « site », activer (ln -s vers sites-enabled), vérifier avec « nginx -t », recharger nginx,
# puis HTTPS avec « certbot --nginx -d DOMAINE ».
server {{
    listen 80;
    listen [::]:80;
    server_name DOMAINE;
    root /var/www/garnoutey/site;
    index index.html;
    charset utf-8;
    absolute_redirect off;

    gzip on;
    gzip_types text/css application/javascript text/javascript application/json application/manifest+json image/svg+xml text/plain application/xml;

{nginx_headers}

    error_page 404 /404.html;

{nginx_redirects}

    location ^~ /assets/ {{ expires 1y; try_files $uri =404; }}
    location ^~ /fonts/  {{ expires 1y; try_files $uri =404; }}
    location ^~ /img/    {{ expires 7d; try_files $uri =404; }}
    location ^~ /video/  {{ expires 7d; try_files $uri =404; }}
    location ~ \\.webmanifest$ {{ types {{ application/manifest+json webmanifest; }} try_files $uri =404; }}

    # adresses sans « .html » (/contact sert contact.html)
    location / {{ try_files $uri $uri.html $uri/ =404; }}
}}
"""
open(os.path.join(here, 'out', 'nginx-garnoutey.conf'), 'w', encoding='utf-8').write(NGINX)


# ---------------------------------------------------------------- contrôles
class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.imgs, self.media, self.errors = [], [], [], [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'a' and 'href' in a: self.links.append(a['href'])
        if tag == 'img':
            self.imgs.append(a.get('src'))
            if 'alt' not in a: self.errors.append('image sans alt : ' + str(a.get('src')))
            for s in (a.get('srcset') or '').split(','):
                s = s.strip().split(' ')[0]
                if s: self.imgs.append(s)
        if tag == 'link' and a.get('rel') == 'preload' and a.get('imagesrcset'):
            for s in a['imagesrcset'].split(','):
                self.imgs.append(s.strip().split(' ')[0])
        if tag in ('video', 'source'):
            self.media.append(a.get('data-src') or a.get('src'))


files = {p['path']: p['file'] for p in C.PAGES.values()}
all_ids = {}
problems = []
docs = {}
for key, page in C.PAGES.items():
    doc = read(out, page['file']); docs[key] = doc
    c = Check(); c.feed(doc)
    all_ids[page['path']] = set(c.ids)
    problems += [f'{page["file"]} : {e}' for e in c.errors]
    dup = {i for i in c.ids if c.ids.count(i) > 1}
    if dup: problems.append(f'{page["file"]} : identifiants en double {sorted(dup)}')
    for s in c.imgs + c.media:
        if s and s.startswith('/') and not os.path.exists(os.path.join(out, s.lstrip('/'))): problems.append(f'{page["file"]} : fichier absent {s}')
    for bad in ('\u2014', '\u2013'):
        if bad in doc: problems.append(f'{page["file"]} : tiret long ou moyen')
    if re.search(r'comptab', doc, re.I): problems.append(f'{page["file"]} : mot interdit (comptab)')
    if re.search(r'samuel', doc, re.I): problems.append(f'{page["file"]} : prénom interdit')
    if doc.count('<h1') != 1: problems.append(f'{page["file"]} : {doc.count("<h1")} titres h1')
    if len(page['title']) > 60: problems.append(f'{page["file"]} : titre de {len(page["title"])} caractères')
    if len(page['description']) > 155: problems.append(f'{page["file"]} : description de {len(page["description"])} caractères')
    page['_links'] = c.links
for key, page in C.PAGES.items():
    for h in page['_links']:
        if h.startswith(('tel:', 'mailto:', 'http')): continue
        path, _, frag = h.partition('#')
        path = path.split('?')[0]
        target = page['path'] if path == '' else path
        if target not in files:
            problems.append(f'{page["file"]} : lien interne inconnu {h}'); continue
        if frag and frag not in all_ids[target]: problems.append(f'{page["file"]} : ancre absente {h}')
if problems:
    print('\n'.join(problems)); sys.exit(1)

# empreinte du contenu publié (change seulement si le site change) : https://.../version.txt
hv = hashlib.sha256()
for f in sorted(glob.glob(os.path.join(out, '**', '*'), recursive=True)):
    if os.path.isfile(f) and os.path.basename(f) != 'version.txt':
        hv.update(os.path.relpath(f, out).encode()); hv.update(open(f, 'rb').read())
write('version.txt', f'Garnoutey, version {hv.hexdigest()[:12]}\n')
size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(out, '**', '*'), recursive=True) if os.path.isfile(f))
print(f'construit : {len(C.PAGES)} pages, {len(photos)} images, {len(videos)} vidéos, {size / 1e6:.1f} Mo, {"indexable" if INDEXABLE else "noindex"}, {SITE_URL}')

if '--publier' in sys.argv:
    site = os.path.join(root, 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(out, site)
    shutil.copy(os.path.join(here, 'out', 'vercel.json'), os.path.join(root, 'vercel.json'))
    shutil.copy(os.path.join(here, 'out', 'nginx-garnoutey.conf'), os.path.join(root, 'nginx-garnoutey.conf'))
    print('publié dans', site)
