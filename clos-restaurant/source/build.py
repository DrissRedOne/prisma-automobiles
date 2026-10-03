"""Construit le site du Clos (out/web) :
- pages HTML pré-rendues (Jinja2), lisibles sans JavaScript, avec balises SEO et données structurées ;
- styles et scripts versionnés (empreinte dans le nom), polices et photos hébergées avec le site ;
- icônes, image de partage, manifeste, plan du site, robots.txt, vercel.json (en-têtes, cache, sécurité) ;
- contrôles : liens internes, images, identifiants, règles de rédaction (ni tiret long ni tiret moyen).

Options :
  --publier   remplace ../site et ../vercel.json par le résultat (dossier publié par Vercel) ;
  --indexer   ouvre le site à Google : à n'utiliser qu'une fois le contenu validé par le restaurant.
Adresse du site : variable d'environnement CLOS_SITE_URL (défaut : https://clos-restaurant.vercel.app).
Les photos se préparent avant, avec ../tools/photos.py (étalonnage commun et tailles WebP).
"""
import base64, datetime, glob, hashlib, html as htmlmod, io, json, os, re, shutil, sys
from html.parser import HTMLParser
from jinja2 import Environment, FileSystemLoader, StrictUndefined
from PIL import Image, ImageDraw, ImageFilter, ImageFont

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
sys.path.insert(0, here)
import content as C

SITE_URL = os.environ.get('CLOS_SITE_URL', 'https://clos-restaurant.vercel.app').rstrip('/')
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
    assert '—' not in txt and '–' not in txt, f'tiret long ou moyen dans {f}'

# ---------------------------------------------------------------- données
photos = json.load(open(os.path.join(root, 'build', 'photos.json'), encoding='utf-8'))
for k, p in photos.items():
    p['default'] = max([s for s in p['sizes'] if s <= 1200] or [min(p['sizes'])])
for k, p in photos.items():
    p['alt'] = p['alt'].replace("'", '\u2019')
for pg in C.PAGES.values():
    pg['title'] = pg['title'].replace("'", '\u2019'); pg['description'] = pg['description'].replace("'", '\u2019')
logo = json.load(open(os.path.join(root, 'tools', 'logo', 'logo_paths.json'), encoding='utf-8'))
carte = json.load(open(os.path.join(root, 'tools', 'carte', 'carte.json'), encoding='utf-8'))
route = json.load(open(os.path.join(root, 'tools', 'carte', 'itineraire.json'), encoding='utf-8'))
credits_raw = json.load(open(os.path.join(root, 'photos', 'originaux', 'credits.json'), encoding='utf-8'))
wm_index = {it['code']: it for it in json.load(open(os.path.join(root, 'photos', 'wikimedia', 'index.json'), encoding='utf-8'))}

for s_ in C.MENU:
    for d_ in s_['items']:
        d_.setdefault('desc', ''); d_.setdefault('photo', None); d_.setdefault('note', '')
dishes = {d['name']: d for s in C.MENU for d in s['items']}
signatures = [dishes[n] for n in C.SIGNATURES]

# crédits photos (uniquement les photos utilisées)
LICENSES = {'cc0': 'domaine public (CC0 1.0)', 'by': 'licence CC BY', 'by-sa': 'licence CC BY-SA'}
credits = []
for name, p in sorted(photos.items(), key=lambda kv: kv[1]['alt']):
    kind, fn = p['src'].split('/')
    code = fn.rsplit('.', 1)[0]
    if kind == 'wm':
        it = wm_index[code]
        lic = (LICENSES.get(it['license'], it['license']) + ' ' + it.get('license_version', '')).strip()
        credits.append({'label': p['alt'], 'author': it['creator'] or 'auteur inconnu', 'source': 'Wikimedia Commons', 'url': it['foreign_landing_url'], 'license': lic + ', photo modifiée (recadrage, étalonnage)'})
    else:
        c = credits_raw.get(code, {})
        src = c.get('source', '')
        if src == 'unsplash':
            author = 'Photographe ' + c['creator'].lstrip('/') if c.get('creator') else 'Photographe Unsplash'
            credits.append({'label': p['alt'], 'author': author, 'source': 'Unsplash', 'url': c.get('page') or c.get('url'), 'license': 'licence Unsplash'})
        else:
            credits.append({'label': p['alt'], 'author': c.get('creator') or 'auteur non renseigné', 'source': {'stocksnap': 'StockSnap', 'rawpixel': 'rawpixel'}.get(src, src or 'source libre'), 'url': c.get('page'), 'license': 'domaine public (CC0 1.0)'})

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

# polices
os.makedirs(os.path.join(out, 'fonts'), exist_ok=True)
for f in glob.glob(os.path.join(here, 'fonts', '*.woff2')):
    shutil.copy(f, os.path.join(out, 'fonts', os.path.basename(f)))

# photos (préparées par tools/photos.py)
os.makedirs(os.path.join(out, 'img'), exist_ok=True)
for name, p in photos.items():
    for s in p['sizes']:
        shutil.copy(os.path.join(here, 'img', f'{name}-{s}.webp'), os.path.join(out, 'img', f'{name}-{s}.webp'))

# visuels du mail de présentation (tools/mail/visuels.py), servis en /mail/
os.makedirs(os.path.join(out, 'mail'), exist_ok=True)
for f in glob.glob(os.path.join(here, 'mail', '*')):
    if f.lower().endswith(('.jpg', '.png')):
        shutil.copy(f, os.path.join(out, 'mail', os.path.basename(f)))

# grain (bruit léger, tuile 180 px)
import random
rnd = random.Random(7)
g = Image.new('L', (180, 180))
g.putdata([rnd.randint(70, 255) for _ in range(180 * 180)])
buf = io.BytesIO(); g.save(buf, 'PNG', optimize=True); write('img/grain.png', buf.getvalue())

# ---------------------------------------------------------------- icônes, manifeste, image de partage
logo_png = Image.open(os.path.join(root, 'tools', 'logo', 'logo_clos.png')).convert('RGBA')
OLIVE = (102, 109, 69, 255)
def square_icon(size, pad=0.0):
    bg = Image.new('RGBA', (size, size), OLIVE)
    s = int(size * (1 + pad))
    lg = logo_png.resize((s, s), Image.LANCZOS)
    bg.alpha_composite(lg, ((size - s) // 2, (size - s) // 2))
    return bg.convert('RGB')
def png(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return b.getvalue()
write('apple-touch-icon.png', png(square_icon(180, 0.1)))
write('icon-192.png', png(square_icon(192, 0.1)))
write('icon-512.png', png(square_icon(512, 0.1)))
ico_im = logo_png.resize((64, 64), Image.LANCZOS)
b = io.BytesIO(); ico_im.save(b, 'ICO', sizes=[(16, 16), (32, 32), (48, 48)]); write('favicon.ico', b.getvalue())
letters_svg = ''.join(f'<path fill="#f5ead8" fill-rule="evenodd" d="{logo["letters"][l]}"/>' for l in 'CLOS')
write('icon.svg', f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="300" fill="#666d45"/><g transform="translate(300 300) scale(1.12) translate(-298 -256)">{letters_svg}</g></svg>')
write('manifest.webmanifest', json.dumps({
    'name': 'Clos, restaurant, bar et wine bar', 'short_name': 'Clos', 'lang': 'fr', 'start_url': '/', 'display': 'browser',
    'background_color': '#f5ead8', 'theme_color': '#15160f',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}],
}, ensure_ascii=False, indent=1))

def og_image():
    W, H = 1200, 630
    base = Image.open(os.path.join(here, 'img', 'salle-bar-1600.webp')).convert('RGB')
    r = max(W / base.width, H / base.height)
    base = base.resize((round(base.width * r), round(base.height * r)), Image.LANCZOS)
    x0, y0 = (base.width - W) // 2, (base.height - H) // 2
    im = base.crop((x0, y0, x0 + W, y0 + H)).filter(ImageFilter.GaussianBlur(1.2))
    shade = Image.new('RGBA', (W, H), (21, 22, 15, 150))
    im = Image.alpha_composite(im.convert('RGBA'), shade)
    lg = logo_png.resize((300, 300), Image.LANCZOS)
    im.alpha_composite(lg, ((W - 300) // 2, 92))
    dr = ImageDraw.Draw(im)
    f = ImageFont.truetype(os.path.join(root, 'tools', 'ttf', 'Outfit.ttf'), 30)
    try: f.set_variation_by_axes([400])
    except Exception: pass
    for txt, y, col in (('RESTAURANT  ·  BAR  ·  WINE BAR', 440, (245, 234, 216)), ('Bordeaux Saint-Jean  ·  78 rue Amédée Saint-Germain', 492, (217, 196, 156))):
        f2 = f if y == 440 else ImageFont.truetype(os.path.join(root, 'tools', 'ttf', 'Outfit.ttf'), 26)
        if y != 440:
            try: f2.set_variation_by_axes([300])
            except Exception: pass
        tw = dr.textlength(txt, font=f2)
        dr.text(((W - tw) / 2, y), txt, font=f2, fill=col)
    b = io.BytesIO(); im.convert('RGB').save(b, 'JPEG', quality=86, optimize=True, progressive=True)
    return b.getvalue()
write('og.jpg', og_image())

# ---------------------------------------------------------------- données structurées
S = C.SITE
restaurant = {
    '@context': 'https://schema.org', '@type': 'Restaurant', '@id': SITE_URL + '/#restaurant',
    'name': 'Clos', 'alternateName': 'CLOS Restaurant, Bar & Wine Bar', 'url': SITE_URL + '/',
    'image': [SITE_URL + '/og.jpg'], 'logo': SITE_URL + '/icon-512.png',
    'description': C.PAGES['index']['description'],
    'telephone': S['phone_e164'], 'email': S['email'],
    'address': {'@type': 'PostalAddress', 'streetAddress': S['street'], 'postalCode': S['zip'], 'addressLocality': S['city'], 'addressRegion': 'Nouvelle-Aquitaine', 'addressCountry': 'FR'},
    'geo': {'@type': 'GeoCoordinates', 'latitude': S['lat'], 'longitude': S['lon']},
    'servesCuisine': ['Française', 'Cuisine du monde', 'Fait maison'], 'priceRange': '€€',
    'hasMenu': SITE_URL + '/la-carte', 'acceptsReservations': S['thefork'],
    'sameAs': [S['instagram'], S['thefork']],
    'amenityFeature': [{'@type': 'LocationFeatureSpecification', 'name': n, 'value': True} for n in ('Climatisation', 'Wi-Fi', 'Bar', 'Vins nature', 'Cocktails')],
    'knowsLanguage': ['fr', 'en', 'es', 'de'],
}
def crumbs(page):
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': SITE_URL + '/'},
        {'@type': 'ListItem', 'position': 2, 'name': page['crumb'], 'item': SITE_URL + page['path']}]}
menu_ld = {'@context': 'https://schema.org', '@type': 'Menu', 'name': 'La carte du Clos', 'inLanguage': 'fr', 'url': SITE_URL + '/la-carte',
           'hasMenuSection': [{'@type': 'MenuSection', 'name': s['title'], 'hasMenuItem': [
               dict({'@type': 'MenuItem', 'name': d['name'], 'offers': {'@type': 'Offer', 'price': f"{d['price']:.2f}", 'priceCurrency': 'EUR'}}, **({'description': d['desc']} if d.get('desc') else {}))
               for d in s['items']]} for s in C.MENU]}
faq_items = [(q, a.format(phone=S['phone'])) for q, a in C.FAQ]
faq_ld = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faq_items]}
website_ld = {'@context': 'https://schema.org', '@type': 'WebSite', 'name': 'Clos', 'url': SITE_URL + '/', 'inLanguage': 'fr'}

def jsonld_for(key, page):
    blocks = [restaurant]
    if key == 'index': blocks.append(website_ld)
    if page.get('crumb') and key != '404': blocks.append(crumbs(page))
    if key == 'carte': blocks.append(menu_ld)
    if key == 'infos': blocks.append(faq_ld)
    txt = json.dumps(blocks if len(blocks) > 1 else blocks[0], ensure_ascii=False, separators=(',', ':'))
    return txt.replace('</', '<\\/')

# ---------------------------------------------------------------- typographie française
NB, NNB = ' ', ' '
def typo(text):
    text = re.sub(r' ([;!?])', NNB + r'\1', text)
    text = re.sub(r' (:)(?=\s|$)', NB + r'\1', text)
    text = re.sub(r'« ', '«' + NB, text)
    text = re.sub(r' »', NB + '»', text)
    text = re.sub(r'(\d) (%|€|h\b)', r'\1' + NB + r'\2', text)
    text = re.sub(r"(\w)(?:'|&#39;)(\w)", '\\1\u2019\\2', text)
    return text
def typo_html(doc):
    parts = re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', doc, flags=re.S)
    return ''.join(p if (p.startswith('<')) else typo(p) for p in parts)

# ---------------------------------------------------------------- pages
env = Environment(loader=FileSystemLoader(os.path.join(here, 'templates')), autoescape=True, undefined=StrictUndefined, trim_blocks=True, lstrip_blocks=True)
env.globals.update(site=S, maps=C.MAPS, legal=C.LEGAL, menu=C.MENU, nav=C.NAV, faq=faq_items, reviews=C.REVIEWS, signatures=signatures,
                   photos=photos, logo=logo, carte=carte, route=route, credits=credits, assets=assets, site_url=SITE_URL,
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
urls = ''.join(f'<url><loc>{SITE_URL}{p["path"] if p["path"] != "/" else "/"}</loc><lastmod>{TODAY}</lastmod></url>' for k, p in C.PAGES.items() if p.get('sitemap', True))
write('sitemap.xml', f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')

hashes = ' '.join("'sha256-" + base64.b64encode(hashlib.sha256(s.encode('utf-8')).digest()).decode() + "'" for s in sorted(INLINE_SCRIPTS))
CSP = ("default-src 'self'; script-src 'self' " + hashes + "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; "
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
        {'source': '/carte', 'destination': '/la-carte', 'permanent': True},
        {'source': '/menu', 'destination': '/la-carte', 'permanent': True},
        {'source': '/bar', 'destination': '/bar-a-vins', 'permanent': True},
        {'source': '/contact', 'destination': '/infos', 'permanent': True},
        {'source': '/reservation', 'destination': '/infos', 'permanent': True},
    ],
    'headers': [
        {'source': '/(.*)', 'headers': headers_all},
        {'source': '/assets/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/img/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=604800, stale-while-revalidate=86400'}]},
    ],
}
open(os.path.join(here, 'out', 'vercel.json'), 'w', encoding='utf-8').write(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')

# ---------------------------------------------------------------- configuration nginx (hébergement sur un VPS)
# mêmes règles que vercel.json : adresses sans « .html », 404, redirections, en-têtes de sécurité, cache.
# « expires » (et non add_header) pour le cache : les en-têtes du bloc server restent ainsi hérités partout.
nginx_headers = '\n'.join(f'    add_header {h["key"]} "{h["value"]}" always;' for h in headers_all)
nginx_redirects = '\n'.join(f'    location = {r["source"]} {{ return {301 if r["permanent"] else 302} {r["destination"]}; }}' for r in vercel['redirects'])
NGINX = f"""# CLOS : site statique, généré par build.py (ne pas modifier à la main : relancer la construction).
# Installation : copier ce fichier dans /etc/nginx/sites-available/clos-restaurant, remplacer DOMAINE et le
# chemin du dossier « site », activer (ln -s vers sites-enabled), vérifier avec « nginx -t », recharger nginx,
# puis HTTPS avec « certbot --nginx -d DOMAINE ».
server {{
    listen 80;
    listen [::]:80;
    server_name DOMAINE;
    root /var/www/clos-restaurant/site;
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
    location ~ \\.webmanifest$ {{ types {{ application/manifest+json webmanifest; }} try_files $uri =404; }}

    # adresses sans « .html » (/la-carte sert la-carte.html)
    location / {{ try_files $uri $uri.html $uri/ =404; }}
}}
"""
open(os.path.join(here, 'out', 'nginx-clos-restaurant.conf'), 'w', encoding='utf-8').write(NGINX)

# ---------------------------------------------------------------- contrôles
class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.imgs, self.errors, self.text = [], [], [], [], []
        self.stack, self.skip = [], 0
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
        if tag == 'link' and a.get('rel') in ('preload',) and a.get('imagesrcset'):
            for s in a['imagesrcset'].split(','):
                self.imgs.append(s.strip().split(' ')[0])
        if tag in ('script', 'style'): self.skip += 1
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip -= 1
    def handle_data(self, data):
        if not self.skip: self.text.append(data)

files = {p['path']: p['file'] for p in C.PAGES.values()}
problems = []
for key, page in C.PAGES.items():
    doc = read(out, page['file'])
    c = Check(); c.feed(doc)
    problems += [f'{page["file"]} : {e}' for e in c.errors]
    dup = {i for i in c.ids if c.ids.count(i) > 1}
    if dup: problems.append(f'{page["file"]} : identifiants en double {sorted(dup)}')
    for h in c.links:
        if h.startswith('#'):
            if h[1:] and h[1:] not in c.ids: problems.append(f'{page["file"]} : ancre absente {h}')
        elif h.startswith('/') and not h.startswith('//'):
            path = h.split('#')[0]
            if path not in files: problems.append(f'{page["file"]} : lien interne inconnu {h}')
    for s in c.imgs:
        if s and s.startswith('/') and not os.path.exists(os.path.join(out, s.lstrip('/'))): problems.append(f'{page["file"]} : image absente {s}')
    txt = ' '.join(c.text)
    for bad in ('—', '–'):
        if bad in doc: problems.append(f'{page["file"]} : tiret long ou moyen')
    if re.search(r'comptab', doc, re.I): problems.append(f'{page["file"]} : mot interdit (comptab)')
    if re.search(r'samuel', doc, re.I): problems.append(f'{page["file"]} : prénom interdit')
    if doc.count('<h1') != 1: problems.append(f'{page["file"]} : {doc.count("<h1")} titres h1')
if problems:
    print('\n'.join(problems)); sys.exit(1)

size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(out, '**', '*'), recursive=True) if os.path.isfile(f))
print(f'construit : {len(C.PAGES)} pages, {len(photos)} photos, {size / 1e6:.1f} Mo, {"indexable" if INDEXABLE else "noindex"}, {SITE_URL}')

if '--publier' in sys.argv:
    site = os.path.join(root, 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(out, site)
    shutil.copy(os.path.join(here, 'out', 'vercel.json'), os.path.join(root, 'vercel.json'))
    shutil.copy(os.path.join(here, 'out', 'nginx-clos-restaurant.conf'), os.path.join(root, 'nginx-clos-restaurant.conf'))
    print('publié dans', site)
