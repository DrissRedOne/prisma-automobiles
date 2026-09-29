/* =====================================================================
   RÉFÉRENCEMENT : balises de chaque page (title, description, canonical,
   partage, données structurées schema.org), pages de location, guides,
   FAQ, conditions de location, page 404 et maillage interne (menus,
   pied de page, fil d'Ariane, pages liées).
   Les textes viennent de seo/content/*.js (window.SEO_PAGES).
   ===================================================================== */
const SITE_URL = String(window.PRISMA_SITE_URL || 'https://prisma-automobiles.vercel.app').replace(/\/+$/, '');
/** Indexation par Google : désactivée tant que le site est une démonstration (réglage unique au build). */
const INDEXABLE = window.PRISMA_INDEXABLE === true;
/** Typographie française : espace insécable avant ? ! : ; », après «, entre un nombre et son unité ou ses milliers
    (jamais de « ? » ou de « m³ » seul en début de ligne). Les balises HTML ne sont pas touchées. */
function frTypo(html) {
  if (typeof html !== 'string') return html;
  return html.split(/(<[^>]+>)/).map((t) => (t[0] === '<' ? t : t
    .replace(/ ([?!:;»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0')
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0')
    .replace(/(\d) (?=(?:€|%|m³|m\b|km\b|kg\b|h\b|min\b|ans?\b|jours?\b|places?\b|valises?\b|tonnes?\b|pouces\b|fois\b))/g, '$1\u00a0'))).join('');
}
const typoPage = (p) => ({
  ...p,
  h1: frTypo(p.h1), lead: frTypo(p.lead), eyebrow: frTypo(p.eyebrow),
  sections: (p.sections || []).map((x) => ({ ...x, h2: frTypo(x.h2), html: frTypo(x.html) })),
  faq: p.faq && p.faq.map((f) => ({ q: frTypo(f.q), a: frTypo(f.a) })),
  groups: p.groups && p.groups.map((g) => ({ ...g, title: frTypo(g.title), items: g.items.map((f) => ({ q: frTypo(f.q), a: frTypo(f.a) })) })),
  ideal: p.ideal && p.ideal.map(frTypo),
});
const SEO_LIST = (Array.isArray(window.SEO_PAGES) ? window.SEO_PAGES : []).map(typoPage);
const SEO_BY_PATH = Object.fromEntries(SEO_LIST.map((p) => [p.path, p]));
const SEO_VEHICLE = Object.fromEntries(SEO_LIST.filter((p) => p.kind === 'vehicle').map((p) => [p.id, p]));
const GUIDES = SEO_LIST.filter((p) => p.kind === 'guide');
/** Page d'accueil de l'activité achat, vente et dépôt-vente. */
const SALE_HUB = '/achat-vente-voiture-bordeaux';
/** Page de location qui correspond à chaque catégorie du catalogue. */
const GROUP_LANDING = { voiture: '/location-voiture-bordeaux', citadine: '/location-voiture-bordeaux', berline: '/location-voiture-premium-bordeaux', suv: '/location-suv-bordeaux', utilitaire: '/location-utilitaire-bordeaux', minibus: '/location-minibus-9-places-bordeaux' };

/* ---------- Plan du site (menus et pied de page) ---------- */
const SEO_NAV = [
  { t: 'Voitures', items: [['/location-voiture-bordeaux', 'Location de voiture à Bordeaux'], ['/location-voiture-pas-chere-bordeaux', 'Voitures petits prix'], ['/location-voiture-automatique-bordeaux', 'Boîte automatique'], ['/location-suv-bordeaux', 'SUV'], ['/location-voiture-7-places-bordeaux', 'Voiture 7 places'], ['/location-voiture-electrique-bordeaux', 'Voiture électrique'], ['/location-voiture-premium-bordeaux', 'Voiture premium']] },
  { t: 'Utilitaires', items: [['/location-utilitaire-bordeaux', 'Location d’utilitaire'], ['/location-camion-demenagement-bordeaux', 'Camion de déménagement'], ['/location-minibus-9-places-bordeaux', 'Minibus 9 places'], ['/professionnels', 'Offre professionnels']] },
  { t: 'Formules', items: [['/location-voiture-week-end-bordeaux', 'Location week-end'], ['/location-voiture-au-mois-bordeaux', 'Location au mois'], ['/location-voiture-jeune-conducteur-bordeaux', 'Jeune conducteur'], ['/location-voiture-livraison-bordeaux', 'Livraison à domicile']] },
  { t: 'Où nous trouver', items: [['/location-voiture-yvrac', 'Agence d’Yvrac'], ['/location-voiture-gare-saint-jean', 'Gare Saint-Jean'], ['/location-voiture-aeroport-merignac', 'Aéroport de Mérignac'], ['/location-voiture-rive-droite-bordeaux', 'Rive droite'], ['/location-voiture-entre-deux-mers', 'Entre-deux-Mers']] },
  { t: 'Achat et vente', items: [['/achat-vente-voiture-bordeaux', 'Achat, vente, dépôt-vente'], ['/depot-vente-voiture-bordeaux', 'Dépôt-vente de voiture'], ['/rachat-voiture-bordeaux', 'Rachat de votre véhicule'], ['/guides/vendre-sa-voiture-demarches', 'Vendre sa voiture : démarches']] },
  { t: 'Infos pratiques', items: [['/vehicules', 'Tous nos véhicules'], ['/agences', 'Points de retrait'], ['/conditions-de-location', 'Conditions de location'], ['/faq', 'Questions fréquentes'], ['/guides', 'Guides pratiques'], ['/contact', 'Contact']] },
];
const STATIC_PAGES = ['/', '/vehicules', '/agences', '/contact', '/professionnels', '/faq', '/conditions-de-location', '/guides'];
/** Une page existe-t-elle ? (les pages rédigées absentes ne sont jamais liées : pas de lien mort) */
const pageExists = (path) => STATIC_PAGES.includes(path) || !!SEO_BY_PATH[path] || /^\/vehicule\//.test(path);
const navGroups = () => SEO_NAV.map((g) => ({ t: g.t, items: g.items.filter(([p]) => pageExists(p)) })).filter((g) => g.items.length);

/* ---------- Balises de la page (title, description, partage, données structurées) ---------- */
// les espaces insécables (typographie française) sont conservés
const stripTags = (h) => String(h || '').replace(/<[^>]+>/g, '').replace(/[^\S\u00a0]+/g, ' ').trim();
const clip = (t, n = 158) => (t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
const absUrl = (path) => SITE_URL + (path === '/' ? '/' : path);
function setMeta(key, content, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
  el.setAttribute('href', href);
}
function setJsonLd(graph) {
  let el = document.getElementById('ld-json');
  if (!graph || !graph.length) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'ld-json'; document.head.appendChild(el); }
  el.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}
function applyHead(path) {
  const m = routeMeta(path);
  document.title = m.title;
  setMeta('description', m.description);
  setLink('canonical', m.noindex ? null : m.canonical);
  // tant que le site n'est pas indexable : rien n'est indexé ; ensuite, les pages de l'application restent hors de Google
  setMeta('robots', !INDEXABLE ? 'noindex, nofollow' : m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  setMeta('og:type', m.ogType || 'website', 'property');
  setMeta('og:site_name', 'PRISMA Automobiles', 'property');
  setMeta('og:locale', 'fr_FR', 'property');
  setMeta('og:title', m.title, 'property');
  setMeta('og:description', m.description, 'property');
  setMeta('og:url', m.canonical, 'property');
  setMeta('og:image', m.image, 'property');
  setMeta('og:image:width', '1200', 'property');
  setMeta('og:image:height', '630', 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', m.title);
  setMeta('twitter:description', m.description);
  setMeta('twitter:image', m.image);
  setJsonLd(m.noindex ? null : m.jsonld);
}

/* Données structurées */
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function businessLd() {
  const s = db.settings;
  const groups = {};
  for (let d = 0; d < 7; d++) { const h = s.hours[d]; if (!h) continue; const k = `${h.open}-${h.close}`; (groups[k] = groups[k] || []).push(DAY_NAMES[d]); }
  const prices = liveFleet().map((v) => v.price);
  return {
    '@type': ['AutoRental', 'AutoDealer'], '@id': SITE_URL + '/#agence', name: 'PRISMA Automobiles', legalName: s.legalName,
    url: SITE_URL + '/', telephone: '+33' + s.phone.replace(/\s/g, '').replace(/^0/, ''),
    image: SITE_URL + '/img/og/prisma.jpg', logo: SITE_URL + '/icons/icon-512.png', slogan: s.tagline || undefined,
    address: { '@type': 'PostalAddress', streetAddress: s.address, postalCode: s.zip, addressLocality: s.city, addressRegion: 'Nouvelle-Aquitaine', addressCountry: 'FR' },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`),
    openingHoursSpecification: Object.entries(groups).map(([k, days]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: k.split('-')[0], closes: k.split('-')[1] })),
    priceRange: prices.length ? `${Math.min(...prices)} € à ${Math.max(...prices)} € par jour` : undefined,
    currenciesAccepted: 'EUR', paymentAccepted: 'Carte bancaire, Apple Pay, Google Pay',
    areaServed: [{ '@type': 'City', name: 'Bordeaux' }, { '@type': 'AdministrativeArea', name: 'Bordeaux Métropole' }, { '@type': 'AdministrativeArea', name: 'Gironde' }],
  };
}
const websiteLd = () => ({ '@type': 'WebSite', '@id': SITE_URL + '/#site', url: SITE_URL + '/', name: 'PRISMA Automobiles', inLanguage: 'fr-FR', publisher: { '@id': SITE_URL + '/#agence' } });
const breadcrumbLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absUrl(path) })) });
function faqLd(faq) {
  if (!faq || !faq.length) return null;
  return { '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: stripTags(f.q), acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) } })) };
}
function carLd(v) {
  const bm = brandModel(v);
  const url = absUrl(vehicleHref(v));
  const d = {
    '@type': ['Product', v.category === 'utilitaire' && v.shape !== 'minibus' ? 'Vehicle' : 'Car'], '@id': url + '#vehicule', name: v.name, url,
    description: stripTags((SEO_VEHICLE[v.id] && SEO_VEHICLE[v.id].lead) || v.description || ''),
    image: PHOTOS[v.id] && PHOTOS[v.id].src ? [absAsset(PHOTOS[v.id].src)] : undefined,
    brand: bm.brand && v.id !== 'v-master20' ? { '@type': 'Brand', name: bm.brand === 'Mercedes' ? 'Mercedes-Benz' : bm.brand } : undefined,
    model: bm.model || undefined, vehicleSeatingCapacity: v.seats, numberOfDoors: v.doors, vehicleTransmission: v.gearbox, fuelType: v.fuel,
    offers: {
      '@type': 'Offer', url, price: v.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', seller: { '@id': SITE_URL + '/#agence' },
      priceSpecification: { '@type': 'UnitPriceSpecification', price: v.price.toFixed(2), priceCurrency: 'EUR', unitCode: 'DAY', valueAddedTaxIncluded: true },
    },
  };
  if (v.volume) d.cargoVolume = { '@type': 'QuantitativeValue', value: v.volume, unitCode: 'MTQ' };
  if (v.payload) d.payload = { '@type': 'QuantitativeValue', value: v.payload, unitCode: 'KGM' };
  return d;
}
const absAsset = (u) => (/^https?:/.test(u) ? u : /^data:/.test(u) ? undefined : SITE_URL + (u[0] === '/' ? u : '/' + u));
function articleLd(p) {
  return {
    '@type': 'Article', '@id': absUrl(p.path) + '#article', headline: p.h1, description: p.description, inLanguage: 'fr-FR',
    datePublished: p.date, dateModified: p.date, mainEntityOfPage: absUrl(p.path), image: ogImage(p),
    author: { '@type': 'Organization', name: 'PRISMA Automobiles', url: SITE_URL + '/' }, publisher: { '@id': SITE_URL + '/#agence' },
  };
}
const itemListLd = (vs) => ({ '@type': 'ItemList', itemListElement: vs.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(vehicleHref(v)), name: v.name })) });

/** Nom de l'image de partage d'une page (générée à la construction du site en ligne). */
const ogKey = (path) => (!path || path === '/' ? 'prisma' : path.replace(/^\//, '').replace(/\//g, '--'));
/** Image de partage de la page (repli : image de la marque). */
function ogImage(p) {
  return SITE_URL + '/img/og/' + (window.PRISMA_OG === true && p && p.path ? ogKey(p.path) : 'prisma') + '.jpg';
}
const T_SUFFIX = ' | PRISMA';
function routeMeta(path) {
  const s = db.settings;
  const base = { canonical: absUrl(path), image: SITE_URL + '/img/og/prisma.jpg', noindex: false };
  const p = SEO_BY_PATH[path];
  const home = ['Accueil', '/'];
  // pages de l'application (réservation, espace client, logiciel) : jamais indexées
  if (/^\/(options|coordonnees|compte|reservation\/|paiement\/|gestion)/.test(path)) return { ...base, title: 'Réservation' + T_SUFFIX, description: 'Réservation en ligne PRISMA Automobiles.', noindex: true, jsonld: null };
  if (path === '/') {
    const h = SEO_BY_PATH['/'] || {};
    return { ...base, title: h.title || 'Location voiture et utilitaire à Bordeaux et Yvrac' + T_SUFFIX, description: h.description || `Location de voitures et d’utilitaires à Yvrac et Bordeaux dès ${fleetFrom()} € par jour : réservation en ligne, retrait en agence, en gare, à l’aéroport ou livraison.`, image: ogImage(h.path ? h : null), jsonld: [businessLd(), websiteLd(), faqLd(h.faq)].filter(Boolean) };
  }
  let m = /^\/vehicule\/([\w-]+)$/.exec(path);
  if (m) {
    const id = vehicleIdFromSlug(m[1]);
    const v = id && vehicle(id);
    if (!v) return notFoundMeta(base);
    const c = SEO_VEHICLE[v.id] || {};
    const canonical = absUrl(vehicleHref(v));
    return {
      ...base, canonical, ogType: 'product', image: ogImage({ path: vehicleHref(v) }),
      title: c.title || `Location ${v.name} Bordeaux dès ${v.price} €/jour` + T_SUFFIX,
      description: c.description || clip(`Louez ${v.name} à Bordeaux dès ${v.price} € par jour : ${v.segment.toLowerCase()}, ${v.seats} places, ${v.gearbox.toLowerCase()}. Réservation en ligne, retrait à Yvrac, en gare ou à l’aéroport.`),
      jsonld: [carLd(v), breadcrumbLd(vehicleCrumbs(v)), faqLd(c.faq)].filter(Boolean),
    };
  }
  m = /^\/vehicules(?:\/([\w-]+))?$/.exec(path);
  if (m) {
    const c = SEO_BY_PATH['/vehicules'] || {};
    if (m[1] && m[1] !== 'all') {
      const g = grp(m[1]);
      return { ...base, canonical: absUrl(GROUP_LANDING[g.id] && pageExists(GROUP_LANDING[g.id]) ? GROUP_LANDING[g.id] : '/vehicules'), title: `${g.title} en location à Bordeaux` + T_SUFFIX, description: clip(g.txt), noindex: true, jsonld: null };
    }
    return { ...base, canonical: absUrl('/vehicules'), title: c.title || 'Nos véhicules de location à Bordeaux' + T_SUFFIX, description: c.description || clip(GROUPS[0].txt), image: ogImage(c.path ? c : null), jsonld: [itemListLd(liveFleet()), breadcrumbLd([home, ['Véhicules', '/vehicules']]), faqLd(c.faq)].filter(Boolean) };
  }
  if (path === '/contact') {
    return { ...base, title: 'Contact et accès agence de location Yvrac' + T_SUFFIX, description: clip(`Contactez PRISMA Automobiles au ${s.phone}, sur WhatsApp ou par le formulaire. Agence au ${s.address}, ${s.zip} ${s.city}, à environ 15 minutes de Bordeaux.`), jsonld: [businessLd(), breadcrumbLd([home, ['Contact', '/contact']])] };
  }
  if (p) {
    const crumbs = pageCrumbs(p);
    const faq = p.groups ? p.groups.flatMap((g) => g.items) : p.faq;
    const ld = [breadcrumbLd(crumbs), faqLd(faq)];
    if (p.kind === 'guide') ld.unshift(articleLd(p));
    if (p.kind === 'landing' || p.kind === 'service' || p.path === '/agences') ld.unshift(businessLd());
    if (p.vehicles && p.vehicles.length) ld.push(itemListLd(p.vehicles.map(vehicle).filter(Boolean)));
    return { ...base, title: p.title, description: p.description, ogType: p.kind === 'guide' ? 'article' : 'website', image: ogImage(p), jsonld: ld.filter(Boolean) };
  }
  if (path === '/professionnels') return { ...base, title: 'Location de véhicules pour professionnels à Bordeaux' + T_SUFFIX, description: 'Utilitaires et voitures pour les professionnels à Bordeaux : prix HT, facture au nom de la société, devis sur mesure.', jsonld: [businessLd()] };
  if (path === '/agences') return { ...base, title: 'Points de retrait à Yvrac et Bordeaux' + T_SUFFIX, description: 'Retrait à l’agence d’Yvrac, en gare Saint-Jean, à l’aéroport de Mérignac ou livraison à domicile.', jsonld: [businessLd()] };
  return notFoundMeta(base);
}
const notFoundMeta = (base) => ({ ...base, title: 'Page introuvable' + T_SUFFIX, description: 'Cette page n’existe pas ou a été déplacée.', noindex: true, jsonld: null });

/** Fil d'Ariane d'une page rédigée (le même pour la page et pour Google). */
function pageCrumbs(p) {
  const home = ['Accueil', '/'];
  if (p.kind === 'guide') return [home, ['Guides', '/guides'], [p.h1, p.path]];
  if (p.kind === 'service' && p.path !== SALE_HUB && SEO_BY_PATH[SALE_HUB]) return [home, ['Achat et vente', SALE_HUB], [p.h1, p.path]];
  return [home, [p.h1 || p.title, p.path]];
}
/** Fil d'Ariane d'une fiche véhicule : accueil, catalogue, page de location de la catégorie, véhicule. */
function vehicleCrumbs(v) {
  const g = mainGroup(v);
  const land = GROUP_LANDING[g.id] && SEO_BY_PATH[GROUP_LANDING[g.id]] ? GROUP_LANDING[g.id] : null;
  return [['Accueil', '/'], ['Véhicules', '/vehicules'], [g.label, land || '/vehicules/' + g.id], [v.name, vehicleHref(v)]].filter((c, i) => i !== 2 || land);
}

/* ---------- Briques des pages ---------- */
function crumbsHTML(items) {
  return `<nav class="crumbs seo-crumbs" aria-label="Fil d’Ariane">${items.map(([l, p], i) => (i ? '<span>/</span>' : '') + (p ? `<a href="${p}">${esc(l)}</a>` : `<b aria-current="page">${esc(l)}</b>`)).join('')}</nav>`;
}
const secId = (i) => `partie-${i + 1}`;
function tocHTML(sections, title = 'Sommaire') {
  if (!sections || sections.length < 3) return '';
  return `<nav class="toc" aria-label="${esc(title)}"><b>${esc(title)}</b><ol>${sections.map((s, i) => `<li><a href="#${secId(i)}" data-jump="${secId(i)}">${esc(s.h2)}</a></li>`).join('')}</ol></nav>`;
}
function sectionsHTML(sections) {
  return (sections || []).map((s, i) => `<section class="seo-sec" id="${secId(i)}"><h2>${esc(s.h2)}</h2>${s.html}</section>`).join('');
}
function faqHTML(faq, title = 'Questions fréquentes') {
  if (!faq || !faq.length) return '';
  return `<section class="seo-faq" id="questions"><h2>${esc(title)}</h2><div class="faq">${faq.map((f) => `<details><summary>${esc(stripTags(f.q))}</summary><p>${f.a}</p></details>`).join('')}</div></section>`;
}
/** Titre court, catégorie et accroche d'une page, pour les cartes « À voir aussi ». */
function pageCard(path) {
  const p = SEO_BY_PATH[path];
  const vm = /^\/vehicule\/([\w-]+)$/.exec(path);
  if (vm) {
    const id = vehicleIdFromSlug(vm[1]); const v = id && vehicle(id);
    if (!v) return null;
    return { path, k: v.segment, t: v.name, d: `Dès ${money(v.price)}${taxTag()} par jour · ${v.seats} places · ${v.gearbox.toLowerCase()}` };
  }
  if (p) return { path, k: p.kind === 'guide' ? 'Guide' : (p.eyebrow || 'Location'), t: p.h1 || p.title, d: clip(stripTags(p.lead || p.description), 110) };
  if (path === '/contact') return { path, k: 'Nous contacter', t: 'Contact et accès à l’agence', d: `Téléphone, WhatsApp, formulaire et accès à l’agence d’Yvrac, ${db.settings.phone}.` };
  const nav = SEO_NAV.flatMap((g) => g.items).find(([x]) => x === path);
  if (nav) return { path, k: 'PRISMA Automobiles', t: nav[1], d: '' };
  return null;
}
function relatedHTML(paths, title = 'À voir aussi') {
  const cards = (paths || []).filter(pageExists).map(pageCard).filter(Boolean);
  if (!cards.length) return '';
  return `<section class="seo-rel"><h2>${esc(title)}</h2><div class="rel-grid">${cards.map((c) => `<a class="rel-c" href="${c.path}"><span class="rel-k">${esc(c.k)}</span><b>${esc(c.t)}</b>${c.d ? `<span class="rel-d">${esc(c.d)}</span>` : ''}<span class="rel-go">Découvrir ${icon('arrowR')}</span></a>`).join('')}</div></section>`;
}
function ctaBandHTML(title = 'Votre véhicule en quelques minutes', o = {}) {
  const s = db.settings;
  const text = o.text || `Réservation en ligne 24 h sur 24, confirmation immédiate. Une question ? Appelez-nous au ${s.phone} ou écrivez-nous sur WhatsApp.`;
  const [label, href] = o.primary || ['Voir les véhicules', '/vehicules'];
  const jump = href[0] === '#' ? ` data-jump="${href.slice(1)}"` : '';
  return `<section class="seo-cta"><div class="wrap"><div class="seo-cta-in">
    <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <div class="seo-cta-b"><a class="btn btn-primary btn-lg" href="${href}"${jump}>${esc(label)}</a><a class="btn btn-wa btn-lg" href="${waHref(o.wa || 'Bonjour, je souhaite louer un véhicule.')}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
  </div></div></section>`;
}
const activeFleet = (ids) => (ids || []).map(vehicle).filter((v) => v && !v.deleted && v.status === 'actif');
/** Plan du site en pied de page : chaque page de location est reliée depuis toutes les autres. */
function seoLinksHTML() {
  return `<div class="wrap seo-links">${navGroups().map((g) => `<div><p class="ft-h">${esc(g.t)}</p>${g.items.map(([p, l]) => `<a href="${p}">${esc(l)}</a>`).join('')}</div>`).join('')}</div>`;
}
/** Menu « Location » de l'en-tête (ordinateur). */
function megaMenuHTML(active) {
  const groups = navGroups().slice(0, 4);
  return `<div class="dd dd-mega"><a href="/location-voiture-bordeaux" class="${active === 'loc' ? 'on' : ''}">Location${icon('chevD')}</a><div class="dd-m mega">${groups.map((g) => `<div><b>${esc(g.t)}</b>${g.items.map(([p, l]) => `<a href="${p}">${esc(l)}</a>`).join('')}</div>`).join('')}</div></div>`;
}

/* ---------- Page de location ---------- */
function pageLanding(p) {
  ensureDraft();
  const pro = p.path === '/professionnels';
  if (pro && !draft.pro) { draft.pro = true; saveDraft(); }
  const cars = activeFleet(p.vehicles);
  const kind = cars.length && cars.every((v) => v.category === 'utilitaire') ? 'utilitaire' : 'voiture';
  const st = { ...homeSearchState(), kind };
  const from = cars.length ? Math.min(...cars.map((v) => v.price)) : null;
  const hero = cars.find((v) => PHOTOS[v.id] && PHOTOS[v.id].cut && !v.photo);
  const html = `
  <section class="lp-hero">
    <div class="lp-glow" aria-hidden="true"></div>
    <div class="wrap">
      ${crumbsHTML([['Accueil', '/'], [p.h1, null]])}
      <div class="lp-grid ${hero ? '' : 'solo'}">
        <div class="lp-copy">
          <span class="eyebrow">${esc(p.eyebrow || 'Location')}</span>
          <h1>${esc(p.h1)}</h1>
          <p class="lp-lead">${esc(p.lead)}</p>
          <ul class="lp-facts">
            ${from != null ? `<li>${icon('tag')}<span>Dès <b>${money(from)}${taxTag()}</b> par jour</span></li>` : ''}
            <li>${icon('pin')}<span>Agence d’Yvrac, gare, aéroport ou livraison</span></li>
            <li>${icon('check')}<span>Annulation gratuite jusqu’à ${db.settings.freeCancelHours} h avant</span></li>
          </ul>
          <div class="lp-cta">${cars.length ? '<a class="btn btn-primary btn-lg" href="#lp-vehicules" data-jump="lp-vehicules">Voir les véhicules</a>' : '<a class="btn btn-primary btn-lg" href="/vehicules">Voir les véhicules</a>'}<a class="btn btn-ghost btn-lg" href="${telHref()}">${icon('phone')}${esc(db.settings.phone)}</a></div>
        </div>
        ${hero ? `<div class="lp-art" aria-hidden="true"><div class="lp-ring"></div><img src="${PHOTOS[hero.id].cut}" alt="" width="1400" height="760" fetchpriority="high"></div>` : ''}
      </div>
      <div class="search-card lp-search">${searchFormHTML(st)}</div>
    </div>
  </section>
  ${cars.length ? `<section class="section lp-cars" id="lp-vehicules"><div class="wrap"><h2 class="sec-title">${pro ? 'Nos véhicules pour les professionnels' : 'Les véhicules proposés'}</h2><div class="rgrid">${cars.map((v) => rcard(v)).join('')}</div></div></section>` : ''}
  <div class="wrap seo-body">
    <article class="seo-article">${tocHTML(p.sections)}${sectionsHTML(p.sections)}</article>
    ${faqHTML(p.faq)}
    ${relatedHTML(p.related)}
  </div>
  ${ctaBandHTML()}`;
  return publicPage(html, { active: pro ? 'pro' : 'loc' });
}
function mountLanding(p) {
  const card = $('.lp-search');
  if (card) {
    const st = homeSearchState();
    bindSearchForm(card, st, (res) => {
      ui.grp = res.kind === 'utilitaire' ? 'utilitaire' : 'voiture';
      draft = { ...(draft || {}), from: res.from, to: res.to, agencyStart: res.agencyStart, agencyEnd: res.agencyEnd, pro: !!res.pro, vehicleId: null, options: {}, promo: null };
      if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
      saveDraft();
      go(catHref(ui.grp));
    });
  }
  mountSeo();
}
/** Sommaire et boutons internes : défilement doux sans changer l'adresse. */
function mountSeo() {
  $$('[data-jump]').forEach((a) => (a.onclick = (e) => {
    e.preventDefault();
    const el = document.getElementById(a.dataset.jump);
    if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  }));
}

/* ---------- Achat, vente et dépôt-vente ---------- */
const SALE_KINDS = [['depot', 'Dépôt-vente'], ['rachat', 'Rachat'], ['achat', 'Achat d’un véhicule']];
function pageService(p) {
  const hv = p.heroVehicle && vehicle(p.heroVehicle);
  const hero = hv && PHOTOS[hv.id] && PHOTOS[hv.id].cut && !hv.photo ? hv : null;
  const html = `
  <section class="lp-hero">
    <div class="lp-glow" aria-hidden="true"></div>
    <div class="wrap">
      ${crumbsHTML(pageCrumbs(p).map(([l, x], i, a) => [l, i === a.length - 1 ? null : x]))}
      <div class="lp-grid ${hero ? '' : 'solo'}">
        <div class="lp-copy">
          <span class="eyebrow">${esc(p.eyebrow || 'Achat et vente')}</span>
          <h1>${esc(p.h1)}</h1>
          <p class="lp-lead">${esc(p.lead)}</p>
          ${p.facts && p.facts.length ? `<ul class="lp-facts">${p.facts.map((f, i) => `<li>${icon(['check', 'tag', 'pin'][i] || 'check')}<span>${esc(f)}</span></li>`).join('')}</ul>` : ''}
          <div class="lp-cta"><a class="btn btn-primary btn-lg" href="#estimation" data-jump="estimation">${p.service === 'achat' ? 'Décrire ma recherche' : 'Demander une estimation'}</a><a class="btn btn-ghost btn-lg" href="${telHref()}">${icon('phone')}${esc(db.settings.phone)}</a></div>
        </div>
        ${hero ? `<div class="lp-art" aria-hidden="true"><div class="lp-ring"></div><img src="${PHOTOS[hero.id].cut}" alt="" width="1400" height="760" fetchpriority="high"></div>` : ''}
      </div>
    </div>
  </section>
  <div class="wrap seo-body"><article class="seo-article">${tocHTML(p.sections)}${sectionsHTML(p.sections)}</article></div>
  ${estimationHTML(p.service)}
  <div class="wrap seo-body">${faqHTML(p.faq)}${relatedHTML(p.related)}</div>
  ${ctaBandHTML('Un véhicule à vendre ou à trouver ?', { text: `Appelez-nous au ${db.settings.phone} ou écrivez-nous sur WhatsApp : nous vous répondons pendant les horaires de l’agence d’Yvrac.`, primary: ['Demander une estimation', '#estimation'], wa: 'Bonjour, je souhaite vendre ou acheter un véhicule.' })}`;
  return publicPage(html, { active: 'vente' });
}
/** Formulaire de demande : estimation (dépôt-vente, rachat) ou recherche d'un véhicule. La demande arrive dans le logiciel. */
function estimationHTML(service = 'depot') {
  const s = db.settings;
  const kind = SALE_KINDS.some(([k]) => k === service) ? service : 'depot';
  const fld = (name, label, attrs = '', req = false) => `<label class="field" data-f="${name}"><span class="lbl">${label}${req ? ' <span class="req">*</span>' : ''}</span><input class="input" name="${name}" ${attrs}><span class="msg">Champ obligatoire.</span></label>`;
  return `<section class="est" id="estimation"><div class="wrap"><div class="est-in">
    <div class="est-copy">
      <span class="eyebrow">Votre demande</span>
      <h2>Parlez-nous de votre projet</h2>
      <p>Quelques informations suffisent : nous vous rappelons pour en parler et, si besoin, convenir d’un rendez-vous à l’agence d’Yvrac.</p>
      <ul class="lp-facts"><li>${icon('phone')}<span>${esc(s.phone)}, aussi sur WhatsApp</span></li><li>${icon('clock')}<span>${esc(weekHoursText())}</span></li><li>${icon('pin')}<span>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</span></li></ul>
    </div>
    <form class="est-form" data-est novalidate>
      <div class="seg est-kind" role="group" aria-label="Votre projet">${SALE_KINDS.map(([k, l]) => `<button type="button" data-est-kind="${k}" class="${k === kind ? 'on' : ''}" aria-pressed="${k === kind}">${l}</button>`).join('')}</div>
      <input type="hidden" name="kind" value="${kind}">
      <p class="est-t" data-est-t>${kind === 'achat' ? 'Le véhicule que vous recherchez' : 'Votre véhicule'}</p>
      <div class="grid2">${fld('brand', 'Marque', 'autocomplete="off" placeholder="Peugeot, Renault…"', true)}${fld('model', 'Modèle', 'autocomplete="off" placeholder="3008, Clio…"', true)}</div>
      <div class="grid3">${fld('year', 'Année', 'inputmode="numeric" maxlength="4" placeholder="2019"', true)}${fld('km', 'Kilométrage', 'inputmode="numeric" placeholder="85 000"', true)}<label class="field"><span class="lbl">Énergie</span><select class="select" name="energy"><option value="">Choisir</option><option>Essence</option><option>Diesel</option><option>Hybride</option><option>Électrique</option><option>Autre</option></select></label></div>
      <label class="field" data-f="budget" ${kind === 'achat' ? '' : 'hidden'}><span class="lbl">Budget</span><input class="input" name="budget" inputmode="numeric" placeholder="15 000 €"></label>
      <div class="grid2">${fld('firstName', 'Prénom', 'autocomplete="given-name"', true)}${fld('lastName', 'Nom', 'autocomplete="family-name"', true)}</div>
      <div class="grid2">${fld('phone', 'Téléphone', 'type="tel" autocomplete="tel" inputmode="tel"', true)}${fld('email', 'Email', 'type="email" autocomplete="email" inputmode="email"')}</div>
      <label class="field"><span class="lbl">Précisions</span><textarea class="textarea" name="message" placeholder="État, entretien, options, délai souhaité…"></textarea></label>
      <button class="btn btn-primary btn-lg" type="submit">Envoyer ma demande</button>
      <p class="est-note">Vos informations servent uniquement à vous recontacter au sujet de cette demande.</p>
    </form>
  </div></div></section>`;
}
function mountEstimation() {
  const f = $('[data-est]');
  if (!f) return;
  const setKind = (k) => {
    f.kind.value = k;
    $$('[data-est-kind]', f).forEach((b) => { b.classList.toggle('on', b.dataset.estKind === k); b.setAttribute('aria-pressed', String(b.dataset.estKind === k)); });
    $('[data-est-t]', f).textContent = k === 'achat' ? 'Le véhicule que vous recherchez' : 'Votre véhicule';
    $('[data-f="budget"]', f).hidden = k !== 'achat';
  };
  $$('[data-est-kind]', f).forEach((b) => (b.onclick = () => setKind(b.dataset.estKind)));
  f.onsubmit = (e) => {
    e.preventDefault();
    const g = (n) => (f[n] ? f[n].value.trim() : '');
    const k = g('kind');
    // pour une recherche, le modèle n'est pas toujours arrêté : seules les coordonnées sont obligatoires
    const req = k === 'achat' ? ['firstName', 'lastName', 'phone'] : ['brand', 'model', 'year', 'km', 'firstName', 'lastName', 'phone'];
    const errs = req.filter((n) => !g(n));
    if (g('phone') && g('phone').replace(/\D/g, '').length < 10) errs.push('phone');
    if (g('year') && !/^(19|20)\d{2}$/.test(g('year'))) errs.push('year');
    if (g('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) errs.push('email');
    $$('[data-f]', f).forEach((el) => el.classList.toggle('err', errs.includes(el.dataset.f)));
    if (errs.length) { toast('Vérifiez les champs signalés.', 'warn'); $(`[data-f="${errs[0]}"] .input`, f)?.focus(); return; }
    const label = (SALE_KINDS.find(([x]) => x === k) || SALE_KINDS[0])[1];
    const car = [g('brand'), g('model')].filter(Boolean).join(' ');
    const details = [g('year'), g('km') && `${g('km')} km`, g('energy')].filter(Boolean).join(', ');
    const message = [`Projet : ${label}`, car && `Véhicule : ${car}${details ? ` (${details})` : ''}`, g('budget') && `Budget : ${g('budget')}`, g('message') && `Précisions : ${g('message')}`].filter(Boolean).join('\n');
    if (!db.messages) db.messages = [];
    db.messages.unshift({ id: uid('m'), at: toISO(new Date()), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'), subject: car ? `${label} : ${car}` : label, message, done: false });
    save();
    f.reset();
    setKind(k);
    toast('Demande envoyée : nous vous rappelons rapidement.', 'ok');
  };
}
function mountService() {
  mountEstimation();
  mountSeo();
}

/* ---------- Guides ---------- */
const longDate = (s) => { const d = new Date(s + 'T12:00'); return isNaN(d) ? '' : `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`; };
function pageGuide(p) {
  const cars = activeFleet(p.vehicles);
  const html = `<div class="wrap guide-page">
    ${crumbsHTML([['Accueil', '/'], ['Guides', '/guides'], [p.h1, null]])}
    <header class="guide-head">
      <span class="eyebrow">${esc(p.eyebrow || 'Guide')}</span>
      <h1>${esc(p.h1)}</h1>
      <p class="lp-lead">${esc(p.lead)}</p>
      <p class="guide-meta">${icon('clock')}<span>${p.minutes ? `${p.minutes} min de lecture · ` : ''}Mis à jour le ${esc(longDate(p.date))}</span></p>
    </header>
    <div class="guide-grid">
      <aside class="guide-side">${tocHTML(p.sections)}<div class="guide-help"><b>Besoin d’un conseil ?</b><p>Nous vous aidons à choisir le bon véhicule.</p><a class="btn btn-ghost btn-sm" href="${telHref()}">${icon('phone')}${esc(db.settings.phone)}</a></div></aside>
      <article class="seo-article">${sectionsHTML(p.sections)}${faqHTML(p.faq)}</article>
    </div>
    ${cars.length ? `<section class="guide-cars"><h2 class="sec-title">Les véhicules adaptés</h2><div class="rgrid">${cars.map((v) => rcard(v)).join('')}</div></section>` : ''}
    ${relatedHTML(p.related)}
  </div>${ctaBandHTML()}`;
  return publicPage(html, { active: 'guides' });
}
function pageGuides() {
  const p = SEO_BY_PATH['/guides'] || { h1: 'Nos guides pratiques', lead: 'Conseils pour choisir et louer le bon véhicule.', sections: [] };
  const html = `<div class="wrap guide-page">
    ${crumbsHTML([['Accueil', '/'], ['Guides', null]])}
    <header class="guide-head"><span class="eyebrow">${esc(p.eyebrow || 'Conseils')}</span><h1>${esc(p.h1)}</h1><p class="lp-lead">${esc(p.lead)}</p></header>
    ${(p.sections || []).length ? `<div class="seo-article guides-intro">${sectionsHTML(p.sections)}</div>` : ''}
    <div class="guides-grid">${GUIDES.map((g) => `<a class="guide-c" href="${g.path}"><span class="rel-k">${esc(g.eyebrow || 'Guide')}${g.minutes ? ` · ${g.minutes} min` : ''}</span><h2>${esc(g.h1)}</h2><p>${esc(clip(stripTags(g.description), 150))}</p><span class="rel-go">Lire le guide ${icon('arrowR')}</span></a>`).join('')}</div>
  </div>${ctaBandHTML()}`;
  return publicPage(html, { active: 'guides' });
}

/* ---------- FAQ, conditions, page introuvable ---------- */
function pageFaq() {
  const p = SEO_BY_PATH['/faq'] || { h1: 'Questions fréquentes', lead: '', groups: [] };
  const groups = p.groups || [];
  const html = `<div class="wrap guide-page">
    ${crumbsHTML([['Accueil', '/'], ['Questions fréquentes', null]])}
    <header class="guide-head"><span class="eyebrow">${esc(p.eyebrow || 'Aide')}</span><h1>${esc(p.h1)}</h1><p class="lp-lead">${esc(p.lead)}</p></header>
    ${groups.length > 2 ? `<nav class="faq-tabs" aria-label="Thèmes">${groups.map((g, i) => `<a href="#theme-${i + 1}" data-jump="theme-${i + 1}">${esc(g.title)}</a>`).join('')}</nav>` : ''}
    <div class="faq-page">${groups.map((g, i) => `<section class="seo-faq" id="theme-${i + 1}"><h2>${esc(g.title)}</h2><div class="faq">${g.items.map((f) => `<details><summary>${esc(stripTags(f.q))}</summary><p>${f.a}</p></details>`).join('')}</div></section>`).join('')}</div>
    ${relatedHTML(['/conditions-de-location', '/guides', '/agences', '/contact'])}
  </div>${ctaBandHTML('Vous ne trouvez pas votre réponse ?')}`;
  return publicPage(html, { active: 'faq' });
}
/** Tableau des conditions par véhicule, tiré directement de la flotte (toujours à jour). */
function conditionsTableHTML() {
  const s = db.settings;
  const rows = liveFleet().map((v) => `<tr><th scope="row"><a href="${vehicleHref(v)}">${esc(v.name)}</a></th><td>${eur(v.price)}</td><td>${v.kmDay ? `${v.kmDay} km` : 'Illimité'}</td><td>${v.kmDay ? eur(v.extraKm, true) : '-'}</td><td>${eur(v.deposit)}</td><td>${eur(v.franchise)}</td><td>${Math.max(v.minAge, s.minAge)} ans</td><td>${plural(v.minYears, 'an')}</td></tr>`).join('');
  return `<section class="seo-sec" id="tableau"><h2>Conditions véhicule par véhicule</h2><div class="tbl-wrap"><table class="cond-tbl"><thead><tr><th scope="col">Véhicule</th><th scope="col">Prix par jour</th><th scope="col">Km inclus par jour</th><th scope="col">Km supplémentaire</th><th scope="col">Caution</th><th scope="col">Franchise</th><th scope="col">Âge minimum</th><th scope="col">Permis depuis</th></tr></thead><tbody>${rows}</tbody></table></div><p class="tbl-note">Prix TTC par jour, avant tarifs dégressifs (${s.degressive.map((d) => `-${d.pct} % dès ${d.days} jours`).join(', ')}).</p></section>`;
}
function pageConditions() {
  const p = SEO_BY_PATH['/conditions-de-location'] || { h1: 'Conditions de location', lead: '', sections: [], faq: [] };
  const html = `<div class="wrap guide-page">
    ${crumbsHTML([['Accueil', '/'], ['Conditions de location', null]])}
    <header class="guide-head"><span class="eyebrow">${esc(p.eyebrow || 'Location')}</span><h1>${esc(p.h1)}</h1><p class="lp-lead">${esc(p.lead)}</p></header>
    <div class="guide-grid">
      <aside class="guide-side">${tocHTML(p.sections)}</aside>
      <article class="seo-article">${sectionsHTML(p.sections)}${faqHTML(p.faq)}</article>
    </div>
    <div class="seo-article cond-full">${conditionsTableHTML()}</div>
    ${relatedHTML(p.related && p.related.length ? p.related : ['/faq', '/agences', '/location-voiture-jeune-conducteur-bordeaux', '/guides/caution-franchise-protections-location'])}
  </div>${ctaBandHTML()}`;
  return publicPage(html, { active: 'faq' });
}
function pageNotFound() {
  const html = `<div class="wrap nf-page">
    <span class="eyebrow">Erreur 404</span>
    <h1>Cette page n’existe pas ou a été déplacée</h1>
    <p class="lp-lead">Retrouvez nos véhicules, nos pages de location et nos guides pratiques.</p>
    <div class="lp-cta"><a class="btn btn-primary btn-lg" href="/">Retour à l’accueil</a><a class="btn btn-ghost btn-lg" href="/vehicules">Voir les véhicules</a></div>
    ${relatedHTML(['/location-voiture-bordeaux', '/location-utilitaire-bordeaux', '/agences', '/faq'], 'Pages utiles')}
  </div>`;
  return publicPage(html, {});
}

/* ---------- Compléments des pages existantes ---------- */
/** Accueil : raccourcis vers toutes les pages de location, textes, guides. */
function homeSeoHTML() {
  const h = SEO_BY_PATH['/'];
  const hub = navGroups().slice(0, 4);
  const guides = GUIDES.slice(0, 3);
  return `
  <section class="section loc-hub"><div class="wrap">
    <h2 class="sec-title" data-reveal>Nos locations à Bordeaux</h2>
    <div class="hub-grid">${hub.map((g) => `<div class="hub-c" data-reveal><h3>${esc(g.t)}</h3>${g.items.map(([p, l]) => `<a href="${p}">${esc(l)}${icon('arrowR')}</a>`).join('')}</div>`).join('')}</div>
  </div></section>
  ${h && h.sections && h.sections.length ? `<section class="section home-seo"><div class="wrap"><div class="seo-article cols">${sectionsHTML(h.sections)}</div></div></section>` : ''}
  ${guides.length ? `<section class="section-sm"><div class="wrap"><div class="sec-row"><h2 class="sec-title" data-reveal>Nos guides pratiques</h2><a class="more-link" href="/guides">Tous les guides <i>${icon('plus')}</i></a></div><div class="guides-grid">${guides.map((g) => `<a class="guide-c" href="${g.path}"><span class="rel-k">${esc(g.eyebrow || 'Guide')}${g.minutes ? ` · ${g.minutes} min` : ''}</span><h3>${esc(g.h1)}</h3><p>${esc(clip(stripTags(g.description), 130))}</p><span class="rel-go">Lire ${icon('arrowR')}</span></a>`).join('')}</div></div></section>` : ''}`;
}
/** Accueil : l'activité achat, vente et dépôt-vente, en trois cartes. */
function homeSaleHTML() {
  if (!SEO_BY_PATH[SALE_HUB]) return '';
  const cards = [
    ['/depot-vente-voiture-bordeaux', 'key', 'Dépôt-vente', 'Nous vendons votre voiture pour vous : présentation aux acheteurs, visites, essais et papiers de la vente.'],
    ['/rachat-voiture-bordeaux', 'euro', 'Rachat', 'Vendez votre véhicule directement à PRISMA Automobiles, après examen à l’agence d’Yvrac.'],
    [SALE_HUB, 'car', 'Achat d’un véhicule', 'Neuf ou d’occasion : dites-nous ce que vous cherchez, nous vous présentons les véhicules disponibles.'],
  ].filter(([p]) => pageExists(p));
  return `<section class="section-sm sale-band"><div class="wrap">
    <div class="sec-row"><h2 data-reveal>Achat, vente et dépôt-vente</h2><a class="more-link" href="${SALE_HUB}">En savoir plus <i>${icon('plus')}</i></a></div>
    <div class="sale-grid" data-stagger>${cards.map(([p, ic, t, d]) => `<a class="sale-c" href="${p}"><span class="pl-ic">${icon(ic)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="rel-go">Découvrir ${icon('arrowR')}</span></a>`).join('')}</div>
  </div></section>`;
}
/** Questions de l'accueil : celles rédigées pour le référencement si elles existent. */
function homeFaqItems() {
  const h = SEO_BY_PATH['/'];
  return h && h.faq && h.faq.length ? h.faq : null;
}
/** Fiche véhicule : texte rédigé (usages, équipements, conditions, conseils, questions). */
function vehicleSeoHTML(v) {
  const c = SEO_VEHICLE[v.id];
  if (!c) return '';
  return `<div class="vd-seo">
    <div class="vd-seo-lead">
      <p class="lp-lead">${esc(c.lead)}</p>
      ${c.ideal && c.ideal.length ? `<div class="ideal"><b>Idéal pour</b><ul>${c.ideal.map((x) => `<li>${icon('check')}${esc(x)}</li>`).join('')}</ul></div>` : ''}
    </div>
    <article class="seo-article">${sectionsHTML(c.sections)}</article>
    ${faqHTML(c.faq)}
    ${relatedHTML(c.related)}
  </div>`;
}
/** Catalogue : présentation et questions (catalogue complet uniquement). */
function catalogueSeoHTML() {
  const c = SEO_BY_PATH['/vehicules'];
  if (!c) return '';
  return `<div class="seo-body cat-seo"><article class="seo-article">${sectionsHTML(c.sections)}</article>${faqHTML(c.faq)}${relatedHTML(c.related)}</div>`;
}
/** Points de retrait : textes rédigés sous les cartes. */
function agenciesSeoHTML() {
  const c = SEO_BY_PATH['/agences'];
  if (!c) return '';
  return `<div class="seo-body"><article class="seo-article">${tocHTML(c.sections)}${sectionsHTML(c.sections)}</article>${faqHTML(c.faq)}${relatedHTML(c.related)}</div>`;
}
