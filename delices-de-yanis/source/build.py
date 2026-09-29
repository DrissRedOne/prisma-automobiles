"""Construit le site des Délices de Yanis (out/web) :
- chaque page publique est un vrai fichier HTML pré-rendu (lisible par Google), avec ses balises et ses données structurées ;
- scripts et styles en fichiers versionnés, photos des plats en WebP (deux tailles), polices hébergées avec le site ;
- application installable (manifeste, icônes, écrans de démarrage, service worker) ;
- commande, suivi et espace restaurant servis par l'application seule (jamais indexés).

Options :
  --publier   remplace ../site (publié par Vercel) et ../vercel.json par le résultat ;
  --indexer   ouvre le site à Google (balises « index », robots.txt avec le plan du site).
              À n'utiliser qu'une fois le site validé par le restaurant.
Adresse du site : variable d'environnement YANIS_SITE_URL (défaut : https://delices-de-yanis.vercel.app).
"""
import glob, hashlib, io, json, os, re, shutil, subprocess, sys
from PIL import Image, ImageOps, ImageEnhance

here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, 'src')
read = lambda *p: open(os.path.join(*p), encoding='utf-8').read()
SITE_URL = os.environ.get('YANIS_SITE_URL', 'https://delices-de-yanis.vercel.app').rstrip('/')
INDEXABLE = '--indexer' in sys.argv

# ---------------------------------------------------------------- sources
ORDER = ('data.js', 'core.js', 'icons.js', 'ui.js', 'seo.js', 'site.js', 'checkout.js', 'admin.js', 'pwa.js', 'app.js')
code = {f: read(src, f) for f in ORDER}
css = read(here, 'fonts', 'fonts.css') + '\n' + read(src, 'style.css')
for name, txt in list(code.items()) + [('style.css', css)]:
    assert '</script' not in txt, f'balise script dans {name}'
    # règle de rédaction : ni tiret long ni tiret moyen
    assert '—' not in txt and '–' not in txt, f'tiret long ou moyen dans {name}'

web = os.path.join(here, 'out', 'web')
shutil.rmtree(web, ignore_errors=True)
os.makedirs(web)
def write(rel, data):
    p = os.path.join(web, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode('utf-8'))
    return '/' + rel.replace(os.sep, '/')
def hashed(name, ext, text):
    h = hashlib.sha256(text.encode('utf-8')).hexdigest()[:10]
    return write(f'assets/{name}.{h}.{ext}', text)

# ---------------------------------------------------------------- photos des plats
# photos/<id>.(jpg|png|webp) : recadrées en 4:3 (centre ou point d'intérêt de credits.json), deux tailles WebP
photos_dir = os.path.join(here, 'photos')
credits_raw = json.load(open(os.path.join(photos_dir, 'credits.json'), encoding='utf-8')) if os.path.exists(os.path.join(photos_dir, 'credits.json')) else []
if isinstance(credits_raw, dict):
    credits_raw = [dict(v, id=k) if isinstance(v, dict) else {'id': k} for k, v in credits_raw.items()]
pick = lambda d, *keys: next((d[k] for k in keys if d.get(k)), '')
credit_by_id = {c.get('id') or c.get('file', '').rsplit('.', 1)[0]: c for c in credits_raw}
photo_ids, credits = [], []
for f in sorted(glob.glob(os.path.join(photos_dir, '*'))):
    stem, ext = os.path.splitext(os.path.basename(f))
    if ext.lower() not in ('.jpg', '.jpeg', '.png', '.webp') or stem.startswith('_'):
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    c = credit_by_id.get(stem, {})
    fx, fy = (c.get('focus') or [0.5, 0.5])[:2] if isinstance(c.get('focus'), (list, tuple)) else (0.5, 0.5)
    w, h = im.size
    if w / h > 4 / 3:
        cw = round(h * 4 / 3); x0 = min(max(0, round(fx * w - cw / 2)), w - cw); im = im.crop((x0, 0, x0 + cw, h))
    elif w / h < 4 / 3:
        ch = round(w * 3 / 4); y0 = min(max(0, round(fy * h - ch / 2)), h - ch); im = im.crop((0, y0, w, y0 + ch))
    # même rendu pour toutes les photos (sources variées) : un peu plus de couleur, de contraste et de chaleur
    im = ImageEnhance.Color(im).enhance(1.1)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    r_, g_, b_ = im.split()
    im = Image.merge('RGB', (r_.point(lambda v: min(255, round(v * 1.03))), g_, b_.point(lambda v: round(v * .96))))
    for size in (640, 1200):
        buf = io.BytesIO()
        im.resize((size, size * 3 // 4), Image.LANCZOS).save(buf, 'WEBP', quality=82 if size == 1200 else 80, method=6)
        write(f'img/{stem}-{size}.webp', buf.getvalue())
    photo_ids.append(stem)
    if c:
        lic = pick(c, 'licence', 'license', 'license_name')
        ver = pick(c, 'license_version', 'licence_version')
        if lic and ver and ver not in lic: lic = f'{lic} {ver}'
        credits.append({'id': stem, 'titre': pick(c, 'titre', 'title', 'name'), 'auteur': pick(c, 'auteur', 'author', 'creator', 'artist'),
                        'licence': lic.upper() if lic.lower() in ('cc0', 'pdm') else lic, 'source': pick(c, 'source', 'foreign_landing_url', 'landing', 'url', 'page')})
# visuels détourés (fond transparent) : cutouts/<nom>.png, deux tailles WebP avec transparence
for f in sorted(glob.glob(os.path.join(here, 'cutouts', '*.png'))):
    stem = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f).convert('RGBA')
    for size in (520, 900):
        buf = io.BytesIO()
        im.resize((size, round(im.size[1] * size / im.size[0])), Image.LANCZOS).save(buf, 'WEBP', quality=84, method=6)
        write(f'img/{stem}-{size}.webp', buf.getvalue())
    photo_ids.append(stem)
print(len(photo_ids), 'photos', f'({len(credits)} crédits)')

# ---------------------------------------------------------------- scripts, styles, polices
for f in ('anton-latin.woff2', 'anton-latin-ext.woff2', 'caveat-latin.woff2', 'inter-latin.woff2', 'inter-latin-ext.woff2'):
    write(f'fonts/{f}', open(os.path.join(here, 'fonts', f), 'rb').read())
js = '\n'.join(code[f] for f in ORDER)
js_url = hashed('app', 'js', js)
css_url = hashed('style', 'css', css)

# icônes, écrans de démarrage
assets_dir = os.path.join(here, 'pwa-assets')
for d in ('icons', 'splash', 'screenshots'):
    if os.path.isdir(os.path.join(assets_dir, d)): shutil.copytree(os.path.join(assets_dir, d), os.path.join(web, d))
Image.open(os.path.join(assets_dir, 'icons', 'icon-192.png')).save(os.path.join(web, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
splash = '\n'.join(f'<link rel="apple-touch-startup-image" media="(device-width: {e["w"]}px) and (device-height: {e["h"]}px) and (-webkit-device-pixel-ratio: {e["r"]}) and (orientation: portrait)" href="/splash/{e["file"]}">'
                   for e in json.load(open(os.path.join(assets_dir, 'splash.json'), encoding='utf-8')))
config = (f'window.YANIS_PWA=true;window.YANIS_SITE_URL={json.dumps(SITE_URL)};window.YANIS_INDEXABLE={"true" if INDEXABLE else "false"};'
          f'window.YANIS_PHOTOS={json.dumps(photo_ids)};window.YANIS_CREDITS={json.dumps(credits, ensure_ascii=False)};')
template = (read(src, 'web.template.html').replace('__CSS_URL__', css_url).replace('__JS_URL__', js_url)
            .replace('__SPLASH__', splash).replace('__CONFIG__', config))
page_tpl = os.path.join(here, 'out', 'page.template.html')
open(page_tpl, 'w', encoding='utf-8').write(template)
# l'application seule (commande, suivi, mes commandes, espace restaurant, pages hors connexion) : jamais indexée
shell_head = ('<title>Les Délices de Yanis · commande en ligne</title>\n'
              '<meta name="description" content="Pizzas, tacos et plats maison rue du Palais Gallien à Bordeaux : commande en ligne à emporter ou en livraison.">\n'
              '<meta name="robots" content="noindex, nofollow">')
write('app.html', template.replace('__PRE__', '').replace('__HEAD__', shell_head).replace('__APP__', ''))

icon = lambda f, s, purpose='any': {'src': f'/icons/{f}', 'sizes': s, 'type': 'image/png', 'purpose': purpose}
shortcut_icon = [{'src': '/icons/icon-96.png', 'sizes': '96x96', 'type': 'image/png'}]
manifest = {
    'id': '/', 'name': 'Les Délices de Yanis', 'short_name': 'Délices Yanis',
    'description': 'Pizzas, tacos et plats maison à Bordeaux : commandez à emporter ou en livraison et suivez votre commande.',
    'lang': 'fr', 'dir': 'ltr', 'start_url': '/', 'scope': '/', 'display': 'standalone', 'orientation': 'any',
    'background_color': '#1a0c06', 'theme_color': '#1a0c06', 'categories': ['food', 'shopping'],
    'icons': [icon('icon-192.png', '192x192'), icon('icon-512.png', '512x512'), icon('maskable-192.png', '192x192', 'maskable'), icon('maskable-512.png', '512x512', 'maskable')],
    'shortcuts': [
        {'name': 'Commander', 'short_name': 'Commander', 'url': '/carte', 'icons': shortcut_icon},
        {'name': 'Mes commandes', 'short_name': 'Mes commandes', 'url': '/commandes', 'icons': shortcut_icon},
        {'name': 'Espace restaurant', 'short_name': 'Cuisine', 'url': '/cuisine', 'icons': shortcut_icon},
    ],
}
shots_dir = os.path.join(web, 'screenshots')
if os.path.isdir(shots_dir):
    labels = json.load(open(os.path.join(assets_dir, 'screenshots.json'), encoding='utf-8'))
    manifest['screenshots'] = []
    for fn in sorted(os.listdir(shots_dir)):
        w, h = Image.open(os.path.join(shots_dir, fn)).size
        manifest['screenshots'].append({'src': f'/screenshots/{fn}', 'sizes': f'{w}x{h}', 'type': 'image/jpeg', 'form_factor': 'wide' if w > h else 'narrow', 'label': labels.get(fn, 'Les Délices de Yanis')})
write('manifest.webmanifest', json.dumps(manifest, ensure_ascii=False, indent=1))

# ---------------------------------------------------------------- pré-rendu, image de partage, plan du site, robots.txt
subprocess.run(['node', os.path.join(here, 'prerender.js'), web, page_tpl, SITE_URL, '1' if INDEXABLE else '0'], check=True)
pages = json.load(open(os.path.join(here, 'out', 'pages.json'), encoding='utf-8'))['pages']

# service worker : l'application, ses scripts, styles, polices et icônes sont gardés pour le hors connexion
shell = ['/app', js_url, css_url, '/fonts/anton-latin.woff2', '/fonts/inter-latin.woff2', '/fonts/caveat-latin.woff2', '/manifest.webmanifest'] + [f'/icons/{f}' for f in sorted(os.listdir(os.path.join(web, 'icons')))]
digest = hashlib.sha256()
for root, dirs, files in os.walk(web):
    dirs.sort()
    for f in sorted(files):
        if f != 'sw.js': digest.update(f.encode()); digest.update(open(os.path.join(root, f), 'rb').read())
version = digest.hexdigest()[:12]
write('sw.js', read(src, 'sw.web.template.js').replace('__VERSION__', version).replace('__SHELL__', json.dumps(shell)))

# ---------------------------------------------------------------- hébergement (Vercel)
APP_ROUTES = ['/commande', '/commandes', '/suivi/:id', '/cuisine', '/cuisine/:page*']
immutable = [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]
noindex = [{'key': 'X-Robots-Tag', 'value': 'noindex, nofollow'}]
vercel = {
    '$schema': 'https://openapi.vercel.sh/vercel.json',
    'outputDirectory': 'site',
    'cleanUrls': True,
    'trailingSlash': False,
    'redirects': [{'source': '/menu', 'destination': '/carte', 'permanent': True}, {'source': '/admin', 'destination': '/cuisine', 'permanent': False}],
    # avec cleanUrls, le fichier app.html est servi à l'adresse /app (jamais /app.html, qui redirige)
    'rewrites': [{'source': r, 'destination': '/app'} for r in APP_ROUTES],
    # tant que le site n'est pas indexable, aucune page ; ensuite, seulement les pages de l'application
    'headers': ([{'source': r, 'headers': noindex} for r in APP_ROUTES + ['/app']] if INDEXABLE else [{'source': '/(.*)', 'headers': noindex}]) + [
        {'source': '/assets/(.*)', 'headers': immutable},
        {'source': '/fonts/(.*)', 'headers': immutable},
        {'source': '/img/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=604800, stale-while-revalidate=86400'}]},
        {'source': '/sw.js', 'headers': [{'key': 'Cache-Control', 'value': 'no-cache'}]},
        {'source': '/manifest.webmanifest', 'headers': [{'key': 'Content-Type', 'value': 'application/manifest+json'}]},
    ],
}
size = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(web) for f in fs)
print(web, f'{len(pages)} pages', f'version {version}', f'{round(size / 1024 / 1024, 1)} Mo', 'INDEXABLE' if INDEXABLE else 'non indexé (noindex)')
print('  app', round(len(js.encode()) / 1024), 'Ko · styles', round(len(css.encode()) / 1024), 'Ko')

vercel_json = json.dumps(vercel, ensure_ascii=False, indent=2) + '\n'
if '--publier' in sys.argv:
    site = os.path.join(here, '..', 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(web, site)
    open(os.path.join(here, '..', 'vercel.json'), 'w', encoding='utf-8').write(vercel_json)
    print('publié dans', os.path.normpath(site))
else:
    open(os.path.join(here, 'out', 'vercel.json'), 'w', encoding='utf-8').write(vercel_json)
