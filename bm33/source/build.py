"""Construit le site de BM33 Automobiles (out/web) :
- pages HTML pré-rendues (Jinja2), lisibles sans JavaScript, avec balises SEO et données structurées ;
- une fiche par véhicule (/vehicules/{slug}) avec son image de partage ;
- styles et script versionnés (empreinte dans le nom), polices et photos hébergées avec le site ;
- icônes, manifeste, plan du site, robots.txt, vercel.json et configuration nginx (en-têtes, cache, sécurité) ;
- contrôles : liens et ancres internes, images, identifiants, règles de rédaction (ni tiret long ni tiret moyen).

Options :
  --publier   remplace ../site, ../vercel.json et ../nginx-bm33.conf par le résultat ;
  --indexer   ouvre le site aux moteurs de recherche : seulement une fois le contenu validé par M. Baghdad.
Adresse du site : variable d'environnement BM33_SITE_URL (défaut : https://bm33-automobiles.vercel.app ; le VPS remplace cette adresse par son domaine).
Les photos se préparent avant, avec ../tools/photos.py (plaques, détourage, tailles WebP).
"""
import base64, copy, datetime, glob, hashlib, io, json, os, re, shutil, sys, urllib.parse
from html.parser import HTMLParser
from jinja2 import Environment, FileSystemLoader, StrictUndefined
from PIL import Image, ImageDraw, ImageFilter, ImageFont

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
sys.path.insert(0, here)
import content as C

SITE_URL = os.environ.get('BM33_SITE_URL', 'https://bm33-automobiles.vercel.app').rstrip('/')
INDEXABLE = '--indexer' in sys.argv
TODAY = datetime.date.today()
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


# ---------------------------------------------------------------- typographie française
APOS = re.compile(r"(\w)'(\w)")


def curly(x):
    """Apostrophes typographiques dans toutes les chaînes des contenus (les adresses n'en contiennent pas)."""
    if isinstance(x, str): return APOS.sub('\\1\u2019\\2', x)
    if isinstance(x, list): return [curly(i) for i in x]
    if isinstance(x, tuple): return tuple(curly(i) for i in x)
    if isinstance(x, dict): return {k: curly(v) for k, v in x.items()}
    return x


NB, NNB = '\u00a0', '\u202f'


def typo(text):
    text = re.sub(r' ([;!?])', NNB + r'\1', text)
    text = re.sub(r' (:)(?=\s|$)', NB + r'\1', text)
    text = re.sub(r'« ', '«' + NB, text)
    text = re.sub(r' »', NB + '»', text)
    text = re.sub(r'(\d) (%|€|h\b|km\b|ch\b)', r'\1' + NB + r'\2', text)
    text = re.sub(r"(\w)(?:'|&#39;)(\w)", '\\1\u2019\\2', text)
    return text


def typo_html(doc):
    parts = re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<textarea\b.*?</textarea>|<[^>]+>)', doc, flags=re.S)
    return ''.join(p if p.startswith('<') else typo(p) for p in parts)


# ---------------------------------------------------------------- données
S = C.SITE
photos = json.load(open(os.path.join(root, 'build', 'photos.json'), encoding='utf-8'))
logo = json.load(open(os.path.join(root, 'tools', 'logo', 'logo.json'), encoding='utf-8'))
placeholders = sorted(k for k, p in photos.items() if p.get('placeholder'))

FUEL_GROUP = {'Essence': 'Essence', 'Essence hybride légère': 'Hybride', 'Diesel': 'Diesel', 'Électrique': 'Électrique'}
FUEL_SHORT = {'Essence': 'Essence', 'Essence hybride légère': 'Hybride léger', 'Diesel': 'Diesel', 'Électrique': 'Électrique'}
STATUS = {'nouveau': 'Nouveau', 'reserve': 'Réservé', 'vendu': 'Vendu'}
VIEWS = [('avant', 'vue avant'), ('arriere', 'vue arrière'), ('interieur', 'intérieur')]
fmt_int = lambda n: '{:,}'.format(n).replace(',', ' ')
wa = lambda text: S['whatsapp'] + '?text=' + urllib.parse.quote(text, safe='')

vehicles = curly(copy.deepcopy(C.VEHICLES))
stories = curly(C.STORIES)
for v in vehicles:
    v['photo'] = f"{v['id']}-avant"
    v['photo_back'] = f"{v['id']}-arriere"
    assert v['photo'] in photos and 'cut' in photos[v['photo']], f"photo avant détourée manquante : {v['id']}"
    v['gallery'] = [{'key': f"{v['id']}-{k}", 'label': lab} for k, lab in VIEWS if f"{v['id']}-{k}" in photos]
    v['fuel_group'] = FUEL_GROUP[v['fuel']]
    v['fuel_short'] = FUEL_SHORT[v['fuel']]
    v['gearbox_short'] = v['gearbox']
    v['status_label'] = STATUS.get(v['status'], '')
    v.setdefault('featured', False)
    v['story'] = stories[v['id']]
    name = f"{v['make']} {v['model']} {v['version']}"
    if v['status'] == 'reserve':
        v['wa_link'] = wa(f"Bonjour, la {name} (réf. {v['ref']}) est réservée : pouvez-vous me prévenir si elle se libère ?")
    else:
        v['wa_link'] = wa(f"Bonjour, je suis intéressé par la {name} ({v['year']}, réf. {v['ref']}) vue sur votre site. Est-elle toujours disponible ?")
    specs = [('Marque', v['make']), ('Modèle', v['model']), ('Version', v['version']), ('Année', str(v['year'])),
             ('Kilométrage', fmt_int(v['km']) + ' km'), ('Énergie', v['fuel']), ('Boîte de vitesses', v['gearbox']),
             ('Puissance', f"{v['power']} ch")]
    if v.get('range'): specs.append(('Autonomie', f"{v['range']} km (cycle WLTP)"))
    specs += [('Carrosserie', v['body']), ('Portes', str(v['doors'])), ('Places', str(v['seats'])), ('Couleur', v['color']),
              ('Vignette Crit’Air', '0 (électrique)' if v['crit_air'] == 0 else str(v['crit_air'])), ('Référence', v['ref'])]
    v['specs'] = specs

available = [v for v in vehicles if v['status'] != 'vendu']
sold = [v for v in vehicles if v['status'] == 'vendu']
featured = next(v for v in vehicles if v['featured'])
arrivals = [v for v in available if v is not featured][:6]
for v in vehicles:
    others = [o for o in available if o is not v]
    others.sort(key=lambda o: (o['body'] != v['body'], abs(o['price'] - v['price'])))
    v['similar'] = others[:3]
soon = curly(C.SOON)


def ordered(seq):
    seen = []
    for x in seq:
        if x not in seen: seen.append(x)
    return seen


makes = sorted(ordered([v['make'] for v in vehicles] + [s['make'] for s in soon]))
bodies = ordered([v['body'] for v in available])
fuels = [f for f in ['Essence', 'Hybride', 'Diesel', 'Électrique'] if f in {v['fuel_group'] for v in available}]
budgets = [b for b in [20000, 25000, 30000, 40000, 60000] if any(v['price'] <= b for v in available)]
years = list(range(TODAY.year, TODAY.year - 21, -1))
faq_items = [(q, a.format(phone=S['phone'])) for q, a in curly(C.FAQ)]

# crédits photos (uniquement les photos publiées)
label_of = {}
for v in vehicles:
    for g in v['gallery']:
        label_of[g['key']] = f"{v['make']} {v['model']}, {g['label']}"
credits = []
for key in sorted(label_of, key=lambda k: label_of[k]):
    c = photos[key].get('credit') or {}
    credits.append({'label': label_of[key], 'author': c.get('auteur') or 'auteur non renseigné', 'url': c.get('source') or '#',
                    'source': 'Wikimedia Commons' if 'wikimedia' in (c.get('source') or '') else ('Flickr' if 'flickr' in (c.get('source') or '') else 'source libre'),
                    'license': (c.get('licence') or 'licence libre') + ', photo modifiée'})

# ---------------------------------------------------------------- styles et script
css = read(here, 'fonts', 'fonts.css') + '\n' + read(here, 'assets', 'style.css')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s+', ' ', css)
css = re.sub(r'\s*([{};])\s*', r'\1', css).strip()
assets = {'css': hashed('style', 'css', css), 'js': hashed('app', 'js', read(here, 'assets', 'main.js'))}

for f in glob.glob(os.path.join(here, 'fonts', '*.woff2')):
    os.makedirs(os.path.join(out, 'fonts'), exist_ok=True)
    shutil.copy(f, os.path.join(out, 'fonts', os.path.basename(f)))

os.makedirs(os.path.join(out, 'img'), exist_ok=True)
for name, p in photos.items():
    if name not in label_of: continue
    for s in p['sizes']:
        shutil.copy(os.path.join(here, 'img', f'{name}-{s}.webp'), os.path.join(out, 'img', f'{name}-{s}.webp'))
    for s in (p.get('cut') or {}).get('sizes', []):
        shutil.copy(os.path.join(here, 'img', f'{name}-cut-{s}.webp'), os.path.join(out, 'img', f'{name}-cut-{s}.webp'))

# ---------------------------------------------------------------- icônes, manifeste, images de partage
INK, PAPER, RED, CHAMP = (6, 6, 7), (246, 247, 249), (200, 203, 208), (178, 182, 188)
TTF = lambda n: os.path.join(root, 'tools', 'ttf', n)
mark_d, mw, mh = logo['mark']['d'], logo['mark']['w'], logo['mark']['h']
icon_svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#060607"/>'
            f'<g transform="translate(64 214) scale({384 / mw:.5f})"><path fill="#f6f7f9" d="{mark_d}"/></g>'
            f'<rect x="64" y="{214 + mh * 384 / mw + 26:.1f}" width="384" height="10" fill="#c8cbd0"/></svg>')
write('icon.svg', icon_svg)


def square_icon(size):
    """Icône carrée : « BM33 » en Michroma (même dessin que le logo) et filet bordeaux."""
    im = Image.new('RGB', (size, size), INK)
    dr = ImageDraw.Draw(im)
    f = ImageFont.truetype(TTF('Michroma.ttf'), int(size * 0.2))
    t = 'BM33'
    bb = dr.textbbox((0, 0), t, font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    x, y = (size - tw) / 2 - bb[0], size * 0.43 - th / 2 - bb[1]
    dr.text((x, y), t, font=f, fill=PAPER)
    ry = size * 0.43 + th / 2 + size * 0.07
    dr.rectangle((size * 0.5 - tw / 2, ry, size * 0.5 + tw / 2, ry + max(2, size * 0.02)), fill=RED)
    return im


def png(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return b.getvalue()


write('apple-touch-icon.png', png(square_icon(180)))
write('icon-192.png', png(square_icon(192)))
write('icon-512.png', png(square_icon(512)))
b = io.BytesIO(); square_icon(256).save(b, 'ICO', sizes=[(16, 16), (32, 32), (48, 48)]); write('favicon.ico', b.getvalue())
write('manifest.webmanifest', json.dumps({
    'name': S['brand'], 'short_name': S['name'], 'lang': 'fr', 'start_url': '/', 'display': 'browser',
    'background_color': '#060607', 'theme_color': '#060607',
    'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}],
}, ensure_ascii=False, indent=1))


def font(name, size, axes=None):
    f = ImageFont.truetype(TTF(name), size)
    if axes:
        try: f.set_variation_by_axes(axes)
        except Exception: pass
    return f


def stage(W, H):
    """Fond « studio » : dégradé radial graphite, comme les cartes du site."""
    im = Image.new('RGB', (W, H), (8, 8, 9))
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((W * 0.1, -H * 0.35, W * 1.1, H * 1.05), fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(W * 0.08))
    im.paste(Image.new('RGB', (W, H), (46, 48, 52)), (0, 0), glow)
    return im


def og_image(v=None):
    W, H = 1200, 630
    im = stage(W, H).convert('RGBA')
    car_key = (v or featured)['photo']
    cut = Image.open(os.path.join(here, 'img', f"{car_key}-cut-{max(photos[car_key]['cut']['sizes'])}.webp")).convert('RGBA')
    cw = 760 if v else 590
    cut = cut.resize((cw, round(cut.height * cw / cut.width)), Image.LANCZOS)
    cx, cy = W - cw - (30 if v else 24), H - cut.height - 70
    sh = Image.new('L', (W, H), 0)
    ImageDraw.Draw(sh).ellipse((cx + cw * 0.06, cy + cut.height - 26, cx + cw * 0.94, cy + cut.height + 22), fill=200)
    sh = sh.filter(ImageFilter.GaussianBlur(18))
    im.paste(Image.new('RGBA', (W, H), (0, 0, 0, 255)), (0, 0), sh)
    im.alpha_composite(cut, (cx, cy))
    dr = ImageDraw.Draw(im)
    # logo
    fl = font('Michroma.ttf', 30)
    dr.text((64, 56), 'BM33', font=fl, fill=PAPER)
    lw = dr.textlength('BM33', font=fl)
    dr.rectangle((64, 104, 64 + lw, 107), fill=RED)
    fs = font('Inter-VF.ttf', 13, [14, 500])
    dr.text((64, 116), 'A U T O M O B I L E S', font=fs, fill=CHAMP)
    if v:
        fm = font('Archivo-VF.ttf', 22, [600, 125])
        dr.text((64, 226), v['make'].upper(), font=fm, fill=(163, 168, 174))
        ft = font('Archivo-VF.ttf', 58, [500, 125])
        dr.text((64, 258), v['model'], font=ft, fill=PAPER)
        fv = font('Inter-VF.ttf', 24, [24, 400])
        dr.text((64, 336), f"{v['version']} · {v['year']} · {fmt_int(v['km'])} km", font=fv, fill=(163, 168, 174))
        fp = font('Archivo-VF.ttf', 44, [500, 125])
        price = 'Vendu' if v['status'] == 'vendu' else fmt_int(v['price']) + ' €'
        dr.text((64, 396), price, font=fp, fill=CHAMP)
    else:
        ft = font('Archivo-VF.ttf', 44, [500, 125])
        dr.text((64, 236), 'La bonne voiture,', font=ft, fill=PAPER)
        ft2 = font('Archivo-VF.ttf', 44, [300, 125])
        dr.text((64, 290), 'sans mauvaise', font=ft2, fill=CHAMP)
        dr.text((64, 344), 'surprise.', font=ft2, fill=CHAMP)
    fa = font('Inter-VF.ttf', 20, [20, 500])
    dr.text((64, H - 70), 'Négociant automobile  ·  Yvrac, Bordeaux Métropole', font=fa, fill=(163, 168, 174))
    b = io.BytesIO(); im.convert('RGB').save(b, 'JPEG', quality=86, optimize=True, progressive=True)
    return b.getvalue()


write('og.jpg', og_image())
for v in vehicles:
    write(f"og/{v['slug']}.jpg", og_image(v))

# ---------------------------------------------------------------- pages
pages = {}
for key, pg in curly(C.PAGES).items():
    pages[key] = dict({'og': None, 'og_alt': None, 'vehicle': None, 'dark_top': True, 'section': pg['path'], 'wa': None, 'rdv': None}, **pg, key=key)
for v in vehicles:
    name = f"{v['make']} {v['model']} {v['version']}"
    price = 'vendu' if v['status'] == 'vendu' else fmt_int(v['price']) + ' €'
    pages['v-' + v['slug']] = {
        'key': 'vehicule', 'template': 'vehicule.html', 'file': f"vehicules/{v['slug']}.html", 'path': f"/vehicules/{v['slug']}",
        'section': '/vehicules', 'crumb': f"{v['make']} {v['model']}", 'vehicle': v, 'dark_top': True,
        'title': next(t for t in (f"{name} ({v['year']}) | {S['brand']}", f"{v['make']} {v['model']} ({v['year']}, {fmt_int(v['km'])} km) | {S['brand']}") if len(t) <= 70 or 'km)' in t),
        'description': f"{name}, {v['year']}, {fmt_int(v['km'])} km : vendue. Nous pouvons en trouver une semblable pour vous, à Bordeaux et en Gironde." if v['status'] == 'vendu' else next(t for t in (
            f"{name}, {v['year']}, {fmt_int(v['km'])} km, {v['fuel'].lower()}, {price}. {v['tagline']}. Essai sur rendez-vous à Yvrac, près de Bordeaux.",
            f"{name}, {v['year']}, {fmt_int(v['km'])} km, {v['fuel'].lower()}, {price}. {v['tagline']}. Essai sur rendez-vous près de Bordeaux.",
            f"{name}, {v['year']}, {fmt_int(v['km'])} km, {v['fuel'].lower()}, {price}. Essai sur rendez-vous à Yvrac, près de Bordeaux.",
            f"{v['make']} {v['model']}, {v['year']}, {fmt_int(v['km'])} km, {price}. Essai sur rendez-vous à Yvrac, près de Bordeaux.") if len(t) <= 158),
        'og': f"/og/{v['slug']}.jpg", 'og_alt': f"{name}, {v['year']}, chez {S['brand']}",
        'wa': v['wa_link'], 'rdv': None if v['status'] == 'vendu' else f"/contact?vehicule={v['ref']}#rendez-vous",
    }

# ---------------------------------------------------------------- données structurées
dealer = {
    '@context': 'https://schema.org', '@type': 'AutoDealer', '@id': SITE_URL + '/#dealer',
    'name': S['brand'], 'legalName': C.LEGAL['company'], 'url': SITE_URL + '/', 'logo': SITE_URL + '/icon-512.png',
    'image': SITE_URL + '/og.jpg', 'description': C.PAGES['index']['description'],
    'telephone': S['phone_e164'], 'email': S['email'],
    'address': {'@type': 'PostalAddress', 'postalCode': S['zip'], 'addressLocality': S['city'], 'addressRegion': 'Nouvelle-Aquitaine', 'addressCountry': 'FR'},
    'geo': {'@type': 'GeoCoordinates', 'latitude': S['lat'], 'longitude': S['lon']},
    'areaServed': [{'@type': 'City', 'name': 'Bordeaux'}, {'@type': 'AdministrativeArea', 'name': 'Gironde'}],
    'priceRange': '€€€', 'vatID': None,
}
dealer = {k: v for k, v in dealer.items() if v is not None}
website_ld = {'@context': 'https://schema.org', '@type': 'WebSite', 'name': S['brand'], 'url': SITE_URL + '/', 'inLanguage': 'fr'}
AVAIL = {'': 'https://schema.org/InStock', 'nouveau': 'https://schema.org/InStock', 'reserve': 'https://schema.org/LimitedAvailability', 'vendu': 'https://schema.org/SoldOut'}
FUEL_LD = {'Essence': 'Essence', 'Essence hybride légère': 'Hybride essence', 'Diesel': 'Diesel', 'Électrique': 'Électrique'}


def car_ld(v):
    d = {
        '@context': 'https://schema.org', '@type': 'Car', 'name': f"{v['make']} {v['model']} {v['version']}",
        'url': f"{SITE_URL}/vehicules/{v['slug']}", 'image': [f"{SITE_URL}/img/{g['key']}-{max(photos[g['key']]['sizes'])}.webp" for g in v['gallery']],
        'description': v['tagline'], 'brand': {'@type': 'Brand', 'name': v['make']}, 'model': v['model'],
        'vehicleConfiguration': v['version'], 'modelDate': str(v['year']), 'vehicleModelDate': str(v['year']), 'itemCondition': 'https://schema.org/UsedCondition',
        'mileageFromOdometer': {'@type': 'QuantitativeValue', 'value': v['km'], 'unitCode': 'KMT'},
        'fuelType': FUEL_LD.get(v['fuel'], v['fuel']), 'vehicleTransmission': v['gearbox'],
        'color': v['color'], 'bodyType': v['body'], 'numberOfDoors': v['doors'], 'seatingCapacity': v['seats'],
        'vehicleEngine': {'@type': 'EngineSpecification', 'enginePower': {'@type': 'QuantitativeValue', 'value': v['power'], 'unitText': 'ch'}},
        'sku': v['ref'],
        'offers': {'@type': 'Offer', 'price': v['price'], 'priceCurrency': 'EUR', 'availability': AVAIL[v['status']],
                   'itemCondition': 'https://schema.org/UsedCondition', 'url': f"{SITE_URL}/vehicules/{v['slug']}", 'seller': {'@id': SITE_URL + '/#dealer'}},
    }
    return d


def crumbs_ld(items):
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': SITE_URL + p} for i, (n, p) in enumerate(items)]}


def faq_ld(items):
    return {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in items]}


itemlist_ld = {'@context': 'https://schema.org', '@type': 'ItemList', 'name': 'Véhicules disponibles', 'itemListElement': [
    {'@type': 'ListItem', 'position': i + 1, 'url': f"{SITE_URL}/vehicules/{v['slug']}", 'name': f"{v['make']} {v['model']} {v['version']}"} for i, v in enumerate(available)]}
sell_faq = curly(C.SELL_FAQ)


def jsonld_for(page):
    blocks = [dealer]
    k = page['key']
    if k == 'index': blocks.append(website_ld)
    if k == 'vehicule':
        v = page['vehicle']
        blocks.append(car_ld(v))
        blocks.append(crumbs_ld([('Accueil', '/'), ('Véhicules', '/vehicules'), (page['crumb'], page['path'])]))
    elif page.get('crumb') and k != '404':
        blocks.append(crumbs_ld([('Accueil', '/'), (page['crumb'], page['path'])]))
    if k == 'vehicules': blocks.append(itemlist_ld)
    if k == 'contact': blocks.append(faq_ld(faq_items))
    if k == 'vendre': blocks.append(faq_ld(sell_faq))
    txt = json.dumps(blocks if len(blocks) > 1 else blocks[0], ensure_ascii=False, separators=(',', ':'))
    return txt.replace('</', '<\\/')


env = Environment(loader=FileSystemLoader(os.path.join(here, 'templates')), autoescape=True, undefined=StrictUndefined, trim_blocks=True, lstrip_blocks=True)
env.globals.update(
    site=curly(S), legal=curly(C.LEGAL), nav=C.NAV, faq=faq_items, photos=photos, logo_data=logo, assets=assets,
    site_url=SITE_URL, indexable=INDEXABLE, year=TODAY.year, vehicles=vehicles, available=available, sold=sold,
    featured=featured, arrivals=arrivals, soon=soon, makes=makes, bodies=bodies, fuels=fuels, budgets=budgets, years=years,
    method=curly(C.METHOD), included=curly(C.INCLUDED), services=curly(C.SERVICES), legal_note=curly(C.LEGAL_NOTE),
    sell_ways=curly(C.SELL_WAYS), sell_docs=curly(C.SELL_DOCS), sell_faq=sell_faq, search_steps=curly(C.SEARCH_STEPS),
    search_budgets=C.SEARCH_BUDGETS, credits=credits)
INLINE_SCRIPTS = set()
for pid, page in pages.items():
    doc = env.get_template(page['template']).render(page=page, jsonld=jsonld_for(page))
    doc = typo_html(doc)
    for m in re.finditer(r'<script>(.*?)</script>', doc, flags=re.S):
        INLINE_SCRIPTS.add(m.group(1))
    write(page['file'], doc)

# ---------------------------------------------------------------- robots, plan du site, vercel.json, nginx
write('robots.txt', f'User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n' if INDEXABLE else 'User-agent: *\nAllow: /\n')
urls = ''.join(f'<url><loc>{SITE_URL}{p["path"]}</loc><lastmod>{TODAY.isoformat()}</lastmod></url>' for p in pages.values() if p.get('sitemap', True))
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
REDIRECTS = [('/stock', '/vehicules'), ('/voitures', '/vehicules'), ('/occasions', '/vehicules'), ('/vendre', '/vendre-ma-voiture'),
             ('/reprise', '/vendre-ma-voiture'), ('/depot-vente', '/vendre-ma-voiture#depot-vente'), ('/rendez-vous', '/contact#rendez-vous')]
vercel = {
    '$schema': 'https://openapi.vercel.sh/vercel.json', 'outputDirectory': 'site', 'cleanUrls': True, 'trailingSlash': False,
    'redirects': [{'source': s, 'destination': d, 'permanent': True} for s, d in REDIRECTS],
    'headers': [
        {'source': '/(.*)', 'headers': headers_all},
        {'source': '/assets/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/img/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=604800, stale-while-revalidate=86400'}]},
    ],
}
open(os.path.join(here, 'out', 'vercel.json'), 'w', encoding='utf-8').write(json.dumps(vercel, ensure_ascii=False, indent=2) + '\n')

nginx_headers = '\n'.join(f'    add_header {h["key"]} "{h["value"]}" always;' for h in headers_all)
nginx_redirects = '\n'.join(f'    location = {s} {{ return 301 {d}; }}' for s, d in REDIRECTS)
NGINX = f"""# BM33 Automobiles : site statique, généré par build.py (ne pas modifier à la main : relancer la construction).
# Installation : copier ce fichier dans /etc/nginx/sites-available/bm33, remplacer DOMAINE et le chemin du dossier
# « site », activer (ln -s vers sites-enabled), vérifier avec « nginx -t », recharger nginx, puis HTTPS avec
# « certbot --nginx -d DOMAINE ». Le script deploy/installer-vps.sh fait tout cela.
server {{
    listen 80;
    listen [::]:80;
    server_name DOMAINE;
    root /var/www/bm33/site;
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
    location ^~ /og/     {{ expires 7d; try_files $uri =404; }}
    location ~ \\.webmanifest$ {{ types {{ application/manifest+json webmanifest; }} try_files $uri =404; }}

    # adresses sans « .html » (/vehicules sert vehicules.html, /vehicules/x sert vehicules/x.html)
    location / {{ try_files $uri $uri.html $uri/ =404; }}
}}
"""
open(os.path.join(here, 'out', 'nginx-bm33.conf'), 'w', encoding='utf-8').write(NGINX)


# ---------------------------------------------------------------- contrôles
class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.imgs, self.errors = [], [], [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'a' and 'href' in a: self.links.append(a['href'])
        if tag == 'img':
            self.imgs.append(a.get('src'))
            if 'alt' not in a: self.errors.append('image sans alt : ' + str(a.get('src')))
            if not a.get('src'): self.errors.append('image sans src')
            for s in (a.get('srcset') or '').split(','):
                s = s.strip().split(' ')[0]
                if s: self.imgs.append(s)
        if tag == 'link' and a.get('rel') == 'preload' and a.get('imagesrcset'):
            for s in a['imagesrcset'].split(','):
                self.imgs.append(s.strip().split(' ')[0])
        if tag == 'meta' and a.get('property') == 'og:image':
            self.imgs.append(a['content'].replace(SITE_URL, ''))


parsed, problems = {}, []
for pid, page in pages.items():
    doc = read(out, page['file'])
    c = Check(); c.feed(doc)
    parsed[page['path']] = (page, doc, c)
paths = set(parsed)
for path, (page, doc, c) in parsed.items():
    f = page['file']
    problems += [f'{f} : {e}' for e in c.errors]
    dup = {i for i in c.ids if c.ids.count(i) > 1}
    if dup: problems.append(f'{f} : identifiants en double {sorted(dup)}')
    for h in c.links:
        if h.startswith('#'):
            if h[1:] and h[1:] not in c.ids: problems.append(f'{f} : ancre absente {h}')
        elif h.startswith('/') and not h.startswith('//'):
            target, _, frag = h.partition('#')
            target = target.split('?')[0]
            if target not in paths: problems.append(f'{f} : lien interne inconnu {h}')
            elif frag and frag not in parsed[target][2].ids: problems.append(f'{f} : ancre absente {h}')
    for s in c.imgs:
        if s and s.startswith('/') and not os.path.exists(os.path.join(out, s.lstrip('/'))): problems.append(f'{f} : image absente {s}')
    if '\u2014' in doc or '\u2013' in doc: problems.append(f'{f} : tiret long ou moyen')
    if re.search(r'comptab', doc, re.I): problems.append(f'{f} : mot interdit (comptab)')
    if re.search(r'samuel', doc, re.I): problems.append(f'{f} : prénom interdit')
    if doc.count('<h1') != 1: problems.append(f'{f} : {doc.count("<h1")} titres h1')
    if len(page['description']) > 165: problems.append(f'{f} : description trop longue ({len(page["description"])})')
if problems:
    print('\n'.join(problems)); sys.exit(1)

hv = hashlib.sha256()
for f in sorted(glob.glob(os.path.join(out, '**', '*'), recursive=True)):
    if os.path.isfile(f) and os.path.basename(f) != 'version.txt':
        hv.update(os.path.relpath(f, out).encode()); hv.update(open(f, 'rb').read())
write('version.txt', f'BM33, version {hv.hexdigest()[:12]}\n')
size = sum(os.path.getsize(f) for f in glob.glob(os.path.join(out, '**', '*'), recursive=True) if os.path.isfile(f))
print(f'construit : {len(pages)} pages, {len(label_of)} photos, {size / 1e6:.1f} Mo, {"indexable" if INDEXABLE else "noindex"}, {SITE_URL}')
if placeholders:
    print(f'ATTENTION : {len(placeholders)} photos provisoires ({", ".join(placeholders[:6])}{"..." if len(placeholders) > 6 else ""})')

if '--publier' in sys.argv:
    if placeholders:
        sys.exit('publication refusée : il reste des photos provisoires (tools/photos.py)')
    site = os.path.join(root, 'site')
    shutil.rmtree(site, ignore_errors=True)
    shutil.copytree(out, site)
    shutil.copy(os.path.join(here, 'out', 'vercel.json'), os.path.join(root, 'vercel.json'))
    shutil.copy(os.path.join(here, 'out', 'nginx-bm33.conf'), os.path.join(root, 'nginx-bm33.conf'))
    print('publié dans', site)
