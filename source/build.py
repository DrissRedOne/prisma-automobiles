"""Construit PRISMA AUTOMOBILES en deux versions :
- out/PRISMA-AUTOMOBILES-application.html : fichier unique, s'ouvre d'un double-clic (adresses en « # ») ;
- out/web/ : le site en ligne. Chaque page publique est un vrai fichier HTML pré-rendu (lisible par Google),
  avec ses balises, ses données structurées et son image de partage ; scripts, styles, images et polices en
  fichiers séparés mis en cache ; three.js chargé seulement quand la 3D s'affiche ; application installable.

Options :
  --publier   remplace ../site (publié par Vercel) et ../vercel.json par le résultat ;
  --indexer   ouvre le site à Google (balises « index », robots.txt avec le plan du site).
              À n'utiliser qu'une fois le site validé, les réservations réelles et le nom de domaine en place.
Adresse du site : variable d'environnement PRISMA_SITE_URL (défaut : https://prisma-automobiles.vercel.app).
"""
import base64, glob, hashlib, io, json, os, re, shutil, subprocess, sys
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, 'src')
read = lambda *p: open(os.path.join(*p), encoding='utf-8').read()
SITE_URL = os.environ.get('PRISMA_SITE_URL', 'https://prisma-automobiles.vercel.app').rstrip('/')
INDEXABLE = '--indexer' in sys.argv

# ---------------------------------------------------------------- sources
content = sorted(glob.glob(os.path.join(here, 'seo', 'content', '*.js')))
css = '\n'.join(read(src, f) for f in ('style.css', 'premium.css', 'site.css', 'seo.css'))
code = {p: read(src, p) for p in ('assets.js', 'photos.js', 'room-env.js', 'logo3d-data.js', 'core.js', 'prism3d.js', 'motion.js', 'pwa.js', 'public.js', 'seo.js', 'sales.js', 'admin.js', 'app.js')}
# photos des véhicules à vendre (facultatives : sans elles, les annonces montrent une silhouette)
sale_photos_js = read(src, 'sale-photos.js') if os.path.exists(os.path.join(src, 'sale-photos.js')) else 'const EMBEDDED_SALE_PHOTOS = {};'
seo_content = '\n'.join(open(f, encoding='utf-8').read() for f in content)
three = read(src, 'three.min.js')
for name, txt in list(code.items()) + [('contenu SEO', seo_content), ('three.js', three)]:
    assert '</script' not in txt, f'balise script dans {name}'
# textes du site : ni tiret long ni tiret moyen (règle de rédaction)
for f in content:
    t = open(f, encoding='utf-8').read()
    assert '—' not in t and '–' not in t, f'tiret long ou moyen dans {os.path.basename(f)}'
os.makedirs(os.path.join(here, 'out'), exist_ok=True)
app_parts = lambda: [code['core.js'], code['motion.js'], code['pwa.js'], code['public.js'], seo_content, code['seo.js'], code['sales.js'], code['admin.js'], code['app.js']]

# ---------------------------------------------------------------- 1. fichier unique
shot = os.path.join(here, 'pwa-assets', 'app-scroll.jpg')
app_shot = 'data:image/jpeg;base64,' + base64.b64encode(open(shot, 'rb').read()).decode() if os.path.exists(shot) else ''
js_single = '\n'.join(['const APP_SHOT = ' + json.dumps(app_shot) + ';', code['assets.js'], code['photos.js'], sale_photos_js, code['room-env.js'], code['logo3d-data.js'], code['prism3d.js']] + app_parts())
fav = re.search(r'"mark": "([^"]+)"', code['assets.js']).group(1)
single = (read(src, 'index.template.html').replace('__CSS__', css).replace('__THREE__', three)
          .replace('__JS__', js_single).replace('__ICONS__', f'<link rel="icon" href="{fav}">'))
out_single = os.path.join(here, 'out', 'PRISMA-AUTOMOBILES-application.html')
open(out_single, 'w', encoding='utf-8').write(single)
print(out_single, round(len(single.encode('utf-8')) / 1024), 'Ko')

# ---------------------------------------------------------------- 2. site en ligne
web = os.path.join(here, 'out', 'web')
shutil.rmtree(web, ignore_errors=True)
os.makedirs(web)
def write(rel, data):
    p = os.path.join(web, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode('utf-8'))
    return '/' + rel.replace(os.sep, '/')
def data_uri(u):
    head, b64 = u.split(',', 1)
    return head[5:].split(';')[0], base64.b64decode(b64)
EXT = {'image/png': 'png', 'image/webp': 'webp', 'image/jpeg': 'jpg'}

# logo et images de la marque
assets = json.loads(re.search(r'const ASSETS = (\{.*?\});', code['assets.js'], re.S).group(1))
assets_web = {}
for k, u in assets.items():
    mime, b = data_uri(u)
    assets_web[k] = write(f'img/marque/{k}.{EXT[mime]}', b)
logo3d = write('img/marque/prisma-p-3d.webp', data_uri(re.search(r"const LOGO3D_TEX = '([^']+)'", code['logo3d-data.js']).group(1))[1])
app_shot_web = write('img/app-scroll.jpg', open(shot, 'rb').read()) if os.path.exists(shot) else ''

# photos des véhicules : fichiers nommés comme les fiches, version réduite pour les cartes
SLUGS = dict(re.findall(r"'(v-[\w-]+)': '([\w-]+)'", re.search(r'const VEHICLE_SLUGS = \{([^}]*)\}', code['core.js']).group(1)))
photos = json.loads(re.search(r'const EMBEDDED_PHOTOS = (\{.*?\});\n', code['photos.js'], re.S).group(1))
photos_web = {}
for vid, ph in photos.items():
    slug = SLUGS.get(vid, vid)
    entry = {k: v for k, v in ph.items() if k not in ('src', 'cut')}
    if ph.get('src'):
        entry['src'] = write(f'img/vehicules/{slug}.jpg', data_uri(ph['src'])[1])
    if ph.get('cut'):
        b = data_uri(ph['cut'])[1]
        im = Image.open(io.BytesIO(b))
        entry['cut'] = write(f'img/vehicules/{slug}-detoure.webp', b)
        entry['w'] = im.size[0]
        if im.size[0] > 760:
            sm = im.resize((700, round(im.size[1] * 700 / im.size[0])), Image.LANCZOS)
            buf = io.BytesIO(); sm.save(buf, 'WEBP', quality=86, method=6)
            entry['cutSm'] = write(f'img/vehicules/{slug}-detoure-700.webp', buf.getvalue())
            entry['smW'] = 700
    photos_web[vid] = entry

# photos des véhicules à vendre : mêmes traitements, fichiers nommés comme les annonces
sale_web = {}
import unicodedata
slug = lambda t: re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()).strip('-')
SALE_NAMES = {i: slug(f'{b} {mo}') for i, b, mo in re.findall(r"id: '(vo-[\w-]+)', ref: '[^']*', brand: '([^']*)', model: '([^']*)'", code['sales.js'])}
m = re.search(r'const EMBEDDED_SALE_PHOTOS = (\{.*?\});', sale_photos_js, re.S)
for sid, ph in (json.loads(m.group(1)) if m else {}).items():
    entry = {k: v for k, v in ph.items() if k not in ('src', 'cut')}
    if ph.get('src'):
        entry['src'] = write(f'img/occasion/{SALE_NAMES.get(sid, sid)}.jpg', data_uri(ph['src'])[1])
    if ph.get('cut'):
        b = data_uri(ph['cut'])[1]
        im = Image.open(io.BytesIO(b))
        entry['cut'] = write(f'img/occasion/{SALE_NAMES.get(sid, sid)}-detoure.webp', b)
        entry['w'] = im.size[0]
        if im.size[0] > 760:
            sm = im.resize((700, round(im.size[1] * 700 / im.size[0])), Image.LANCZOS)
            buf = io.BytesIO(); sm.save(buf, 'WEBP', quality=86, method=6)
            entry['cutSm'] = write(f'img/occasion/{SALE_NAMES.get(sid, sid)}-detoure-700.webp', buf.getvalue())
            entry['smW'] = 700
    sale_web[sid] = entry

# polices du site (hébergées avec le site : aucun appel à un service extérieur)
fonts = os.path.join(here, 'video', 'assets', 'fonts')
write('fonts/inter.woff2', open(os.path.join(fonts, 'Inter.woff2'), 'rb').read())
write('fonts/michroma.woff2', open(os.path.join(fonts, 'Michroma.woff2'), 'rb').read())
font_css = ('@font-face{font-family:"Inter";font-style:normal;font-weight:300 900;font-display:swap;src:url(/fonts/inter.woff2) format("woff2")}\n'
            '@font-face{font-family:"Michroma";font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/michroma.woff2) format("woff2")}\n')

def hashed(name, ext, text):
    h = hashlib.sha256(text.encode('utf-8')).hexdigest()[:10]
    return write(f'assets/{name}.{h}.{ext}', text)

# scripts : l'application (sans three.js) et la 3D, chargée à la demande
js_web = '\n'.join(['const APP_SHOT = ' + json.dumps(app_shot_web) + ';',
                    '/* Logo PRISMA */\nconst ASSETS = ' + json.dumps(assets_web) + ';',
                    '/* Photos des véhicules */\nconst EMBEDDED_PHOTOS = ' + json.dumps(photos_web, ensure_ascii=False) + ';',
                    '/* Photos des véhicules à vendre */\nconst EMBEDDED_SALE_PHOTOS = ' + json.dumps(sale_web, ensure_ascii=False) + ';'] + app_parts())
js_url = hashed('app', 'js', js_web)
prism_url = hashed('prism3d', 'js', '/* three.js r158, licence MIT, https://threejs.org */\n' + three + '\n' + code['room-env.js'] + '\nconst LOGO3D_TEX = ' + json.dumps(logo3d) + ';\n' + code['prism3d.js'])
css_url = hashed('style', 'css', font_css + css)

# icônes, écrans de démarrage, captures du manifeste
assets_dir = os.path.join(here, 'pwa-assets')
for d in ('icons', 'splash', 'screenshots'):
    if os.path.isdir(os.path.join(assets_dir, d)): shutil.copytree(os.path.join(assets_dir, d), os.path.join(web, d))
# favicon.ico à la racine (demandé par les navigateurs et les moteurs de recherche)
Image.open(os.path.join(assets_dir, 'icons', 'icon-192.png')).save(os.path.join(web, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
splash = '\n'.join(f'<link rel="apple-touch-startup-image" media="(device-width: {e["w"]}px) and (device-height: {e["h"]}px) and (-webkit-device-pixel-ratio: {e["r"]}) and (orientation: portrait)" href="/splash/{e["file"]}">'
                   for e in json.load(open(os.path.join(assets_dir, 'splash.json'), encoding='utf-8')))
config = f'window.PRISMA_PWA=true;window.PRISMA_OG=true;window.PRISMA_SITE_URL={json.dumps(SITE_URL)};window.PRISMA_INDEXABLE={"true" if INDEXABLE else "false"};window.PRISMA_THREE_URL={json.dumps(prism_url)};'
template = (read(src, 'web.template.html').replace('__CSS_URL__', css_url).replace('__JS_URL__', js_url)
            .replace('__SPLASH__', splash).replace('__CONFIG__', config))
page_tpl = os.path.join(here, 'out', 'page.template.html')
open(page_tpl, 'w', encoding='utf-8').write(template)
# l'application seule (réservation, espace client, logiciel du loueur, pages hors connexion) : jamais indexée
shell_head = ('<title>PRISMA Automobiles · location de voitures et d’utilitaires</title>\n'
              '<meta name="description" content="Location de voitures et d’utilitaires à Yvrac et Bordeaux : réservation et paiement en ligne.">\n'
              '<meta name="robots" content="noindex, nofollow">')
write('app.html', template.replace('__PRE__', '').replace('__HEAD__', shell_head).replace('__APP__', ''))

icon = lambda f, s, purpose='any': {'src': f'/icons/{f}', 'sizes': s, 'type': 'image/png', 'purpose': purpose}
shortcut_icon = [{'src': '/icons/icon-96.png', 'sizes': '96x96', 'type': 'image/png'}]
manifest = {
    'id': '/', 'name': 'PRISMA AUTOMOBILES', 'short_name': 'PRISMA',
    'description': 'Location de voitures et d’utilitaires à Yvrac et Bordeaux : réservation, paiement et suivi de vos locations.',
    'lang': 'fr', 'dir': 'ltr', 'start_url': '/', 'scope': '/', 'display': 'standalone',
    'background_color': '#050506', 'theme_color': '#050506', 'categories': ['travel', 'business'],
    'icons': [icon('icon-192.png', '192x192'), icon('icon-512.png', '512x512'), icon('maskable-512.png', '512x512', 'maskable')],
    'shortcuts': [
        {'name': 'Réserver un véhicule', 'short_name': 'Réserver', 'url': '/vehicules', 'icons': shortcut_icon},
        {'name': 'Mon espace client', 'short_name': 'Mon espace', 'url': '/compte', 'icons': shortcut_icon},
        {'name': 'Logiciel du loueur', 'short_name': 'Logiciel', 'url': '/gestion', 'icons': shortcut_icon},
    ],
}
shots_dir = os.path.join(web, 'screenshots')
if os.path.isdir(shots_dir):
    labels = json.load(open(os.path.join(assets_dir, 'screenshots.json'), encoding='utf-8'))
    manifest['screenshots'] = []
    for fn in sorted(os.listdir(shots_dir)):
        w, h = Image.open(os.path.join(shots_dir, fn)).size
        manifest['screenshots'].append({'src': f'/screenshots/{fn}', 'sizes': f'{w}x{h}', 'type': 'image/jpeg', 'form_factor': 'wide' if w > h else 'narrow', 'label': labels.get(fn, 'PRISMA AUTOMOBILES')})
write('manifest.webmanifest', json.dumps(manifest, ensure_ascii=False, indent=1))

# pré-rendu de chaque page publique, images de partage, plan du site, robots.txt
subprocess.run(['node', os.path.join(here, 'prerender.js'), web, page_tpl, SITE_URL, '1' if INDEXABLE else '0'], check=True)
pages = json.load(open(os.path.join(here, 'out', 'pages.json'), encoding='utf-8'))['pages']

# service worker : l'application, ses scripts, styles, polices et icônes sont gardés pour le hors connexion
shell = ['/app', js_url, css_url, '/fonts/inter.woff2', '/fonts/michroma.woff2', '/manifest.webmanifest'] + [f'/icons/{f}' for f in sorted(os.listdir(os.path.join(web, 'icons')))]
digest = hashlib.sha256()
for root, dirs, files in os.walk(web):
    dirs.sort()
    for f in sorted(files):
        if f != 'sw.js': digest.update(f.encode()); digest.update(open(os.path.join(root, f), 'rb').read())
version = digest.hexdigest()[:12]
write('sw.js', read(src, 'sw.web.template.js').replace('__VERSION__', version).replace('__SHELL__', json.dumps(shell)))

# hébergement (Vercel) : adresses sans « .html », application pour les pages de réservation, cache des fichiers
APP_ROUTES = ['/vehicule-occasion/:annonce', '/vehicules/:categorie', '/options', '/coordonnees', '/compte', '/reservation/:id', '/paiement/:id', '/gestion', '/gestion/:page*']
immutable = [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]
noindex = [{'key': 'X-Robots-Tag', 'value': 'noindex, nofollow'}]
vercel = {
    '$schema': 'https://openapi.vercel.sh/vercel.json',
    'outputDirectory': 'site',
    'cleanUrls': True,
    'trailingSlash': False,
    'redirects': [{'source': '/vehicules/all', 'destination': '/vehicules', 'permanent': True}],
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
print('  app', round(len(js_web.encode()) / 1024), 'Ko · 3D', round(os.path.getsize(os.path.join(web, prism_url[1:])) / 1024), 'Ko · styles', round(os.path.getsize(os.path.join(web, css_url[1:])) / 1024), 'Ko')

# ---------------------------------------------------------------- publication
vercel_json = json.dumps(vercel, ensure_ascii=False, indent=2) + '\n'
if '--publier' in sys.argv:
    site = os.path.join(here, '..', 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(web, site)
    open(os.path.join(here, '..', 'vercel.json'), 'w', encoding='utf-8').write(vercel_json)
    print('publié dans', os.path.normpath(site))
else:
    open(os.path.join(here, 'out', 'vercel.json'), 'w', encoding='utf-8').write(vercel_json)
