"""Construit l'application PRISMA en deux versions (option --publier : copie la PWA dans ../site) :
- out/PRISMA-AUTOMOBILES-application.html : fichier unique, s'ouvre d'un double-clic ;
- out/pwa/ (et le zip) : application installable (PWA) à mettre en ligne en https.
"""
import hashlib, json, os, re, shutil, zipfile
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, 'src')
read = lambda *p: open(os.path.join(*p), encoding='utf-8').read()
css = read(src, 'style.css') + '\n' + read(src, 'premium.css') + '\n' + read(src, 'site.css')
parts = ['assets.js']
if os.path.exists(os.path.join(src, 'photos.js')): parts.append('photos.js')
parts += ['room-env.js', 'logo3d-data.js', 'core.js', 'prism3d.js', 'motion.js', 'pwa.js', 'public.js', 'admin.js', 'app.js']
js = '\n'.join(read(src, p) for p in parts)
# capture de l'appli montrée dans le téléphone de la carte « application » (tests/app-shot.js)
import base64
shot = os.path.join(here, 'pwa-assets', 'app-scroll.jpg')
app_shot = 'data:image/jpeg;base64,' + base64.b64encode(open(shot, 'rb').read()).decode() if os.path.exists(shot) else ''
js = 'const APP_SHOT = ' + json.dumps(app_shot) + ';\n' + js
tpl = read(src, 'index.template.html')
fav = re.search(r'"mark": "([^"]+)"', read(src, 'assets.js')).group(1)
assert '</script>' not in js, 'balise script dans le JS'
three = read(src, 'three.min.js')
assert '</script' not in three
page = lambda icons: tpl.replace('__CSS__', css).replace('__THREE__', three).replace('__JS__', js).replace('__ICONS__', icons)
os.makedirs(os.path.join(here, 'out'), exist_ok=True)

# 1. Fichier unique
single = page(f'<link rel="icon" href="{fav}">')
out = os.path.join(here, 'out', 'PRISMA-AUTOMOBILES-application.html')
open(out, 'w', encoding='utf-8').write(single)
print(out, round(len(single.encode('utf-8')) / 1024), 'Ko')

# 2. Application installable
assets = os.path.join(here, 'pwa-assets')
pwa = os.path.join(here, 'out', 'pwa')
shutil.rmtree(pwa, ignore_errors=True)
for d in ('icons', 'splash', 'screenshots'):
    if os.path.isdir(os.path.join(assets, d)): shutil.copytree(os.path.join(assets, d), os.path.join(pwa, d))
splash = [f'<link rel="apple-touch-startup-image" media="(device-width: {e["w"]}px) and (device-height: {e["h"]}px) and (-webkit-device-pixel-ratio: {e["r"]}) and (orientation: portrait)" href="splash/{e["file"]}">'
          for e in json.load(open(os.path.join(assets, 'splash.json'), encoding='utf-8'))]
head = '\n'.join([
    '<link rel="manifest" href="manifest.webmanifest">',
    '<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png">',
    '<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">',
    '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">',
    '<meta name="application-name" content="PRISMA">',
    '<meta name="mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-title" content="PRISMA">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black">',
    '<meta name="robots" content="noindex, nofollow">',
    *splash,
    '<script>window.PRISMA_PWA = true;</script>',
])
index = page(head)
open(os.path.join(pwa, 'index.html'), 'w', encoding='utf-8').write(index)
icon = lambda f, s, purpose='any': {'src': f'icons/{f}', 'sizes': s, 'type': 'image/png', 'purpose': purpose}
shortcut_icon = [{'src': 'icons/icon-96.png', 'sizes': '96x96', 'type': 'image/png'}]
manifest = {
    'id': './', 'name': 'PRISMA AUTOMOBILES', 'short_name': 'PRISMA',
    'description': 'Location de voitures et d’utilitaires à Yvrac et Bordeaux : réservation, paiement et suivi de vos locations.',
    'lang': 'fr', 'dir': 'ltr', 'start_url': './', 'scope': './', 'display': 'standalone',
    'background_color': '#050506', 'theme_color': '#050506', 'categories': ['travel', 'business'],
    'icons': [icon('icon-192.png', '192x192'), icon('icon-512.png', '512x512'), icon('maskable-512.png', '512x512', 'maskable')],
    'shortcuts': [
        {'name': 'Réserver un véhicule', 'short_name': 'Réserver', 'url': './#/vehicules', 'icons': shortcut_icon},
        {'name': 'Mon espace client', 'short_name': 'Mon espace', 'url': './#/compte', 'icons': shortcut_icon},
        {'name': 'Logiciel du loueur', 'short_name': 'Logiciel', 'url': './#/gestion', 'icons': shortcut_icon},
    ],
}
shots = os.path.join(pwa, 'screenshots')
if os.path.isdir(shots):
    from PIL import Image
    manifest['screenshots'] = []
    for fn in sorted(os.listdir(shots)):
        w, h = Image.open(os.path.join(shots, fn)).size
        label = json.load(open(os.path.join(assets, 'screenshots.json'), encoding='utf-8')).get(fn, 'PRISMA AUTOMOBILES')
        manifest['screenshots'].append({'src': f'screenshots/{fn}', 'sizes': f'{w}x{h}', 'type': 'image/jpeg', 'form_factor': 'wide' if w > h else 'narrow', 'label': label})
open(os.path.join(pwa, 'manifest.webmanifest'), 'w', encoding='utf-8').write(json.dumps(manifest, ensure_ascii=False, indent=1))
shell = ['./index.html', './manifest.webmanifest'] + [f'./icons/{f}' for f in sorted(os.listdir(os.path.join(pwa, 'icons')))]
version = hashlib.sha256((index + json.dumps(manifest)).encode('utf-8')).hexdigest()[:12]
sw = read(src, 'sw.template.js').replace('__VERSION__', version).replace('__SHELL__', json.dumps(shell))
open(os.path.join(pwa, 'sw.js'), 'w', encoding='utf-8').write(sw)
json.dump({'headers': [
    {'source': '/sw.js', 'headers': [{'key': 'Cache-Control', 'value': 'no-cache'}]},
    {'source': '/manifest.webmanifest', 'headers': [{'key': 'Content-Type', 'value': 'application/manifest+json'}]},
]}, open(os.path.join(pwa, 'vercel.json'), 'w', encoding='utf-8'), indent=1)
open(os.path.join(pwa, 'LISEZ-MOI.txt'), 'w', encoding='utf-8').write(read(here, 'pwa-lisez-moi.txt'))
zpath = os.path.join(here, 'out', 'PRISMA-AUTOMOBILES-pwa.zip')
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, _, files in os.walk(pwa):
        for f in files:
            full = os.path.join(root, f)
            z.write(full, os.path.relpath(full, pwa))
print(pwa, 'version', version, '·', round(os.path.getsize(zpath) / 1024), 'Ko zippé')

# Publication : la PWA construite remplace le dossier ../site servi par Vercel
import sys as _sys
if '--publier' in _sys.argv:
    site = os.path.join(here, '..', 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(pwa, site, ignore=shutil.ignore_patterns('vercel.json', 'LISEZ-MOI.txt'))
    print('publié dans', os.path.normpath(site))
