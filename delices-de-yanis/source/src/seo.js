/* =====================================================================
   RÉFÉRENCEMENT : pages rédigées, balises de chaque page, données
   structurées (Restaurant, Menu, FAQ, fil d'Ariane). Site en
   démonstration : noindex tant que le restaurant n'a pas validé.
   ===================================================================== */
const SITE_URL = (window.YANIS_SITE_URL || location.origin).replace(/\/$/, '');
const INDEXABLE = window.YANIS_INDEXABLE === true;
const T_SUFFIX = ' | Les Délices de Yanis, Bordeaux';

const SEO_PAGES = [
  {
    path: '/pizza-bordeaux', crumb: 'Pizza à emporter', active: 'carte',
    title: 'Pizza à emporter à Bordeaux, Palais Gallien' + T_SUFFIX,
    description: 'Pizzas à emporter à Bordeaux centre : Margherita, Reine, 4 fromages, Chèvre miel, La Yanis. Commande en ligne, prête en 20 minutes, rue du Palais Gallien.',
    h1: 'Pizza à emporter à Bordeaux, rue du Palais Gallien',
    lead: 'Des pizzas généreuses, cuites minute et prêtes en 20 minutes : commandez en ligne et passez les récupérer rue du Palais Gallien.',
    facts: ['Prête en 20 minutes', 'Senior 29 cm ou Mega 33 cm', 'Viandes halal', 'Commande en ligne'],
    itemsTitle: 'Nos pizzas', filter: (p) => p.cat === 'pizzas',
    sections: [
      ['Nos pizzas, de la Margherita à La Yanis', ['Base sauce tomate ou crème fraîche, mozzarella fondante et garnitures généreuses : Margherita, Reine au jambon de dinde, Orientale à la merguez, 4 fromages, Chèvre miel, Végétarienne, Kebab et La Yanis, notre recette au poulet mariné au curry.', 'Chaque pizza existe en taille Senior (29 cm) ou Mega (33 cm), avec des suppléments au choix : mozzarella, chèvre, poulet, merguez, œuf, champignons, olives, jalapeños.']],
      ['À emporter en 20 minutes', ['Votre pizza est prête en 20 minutes environ : vous choisissez « dès que possible » ou un créneau précis, et le suivi en ligne vous prévient quand elle est prête. Il ne reste qu’à passer au comptoir.']],
      ['Pizza halal à Bordeaux', ['Toutes nos viandes sont halal : jambon de dinde, merguez, poulet, viande kebab. Aucune viande de porc.']],
    ],
    faq: [
      ['Combien de temps pour une pizza à emporter ?', 'Environ 20 minutes après la commande. Vous pouvez aussi programmer l’heure de retrait.'],
      ['Puis-je commander pour plus tard ?', 'Oui, choisissez « Programmer » et l’heure de retrait qui vous arrange pendant nos horaires.'],
      ['Vos pizzas sont-elles halal ?', 'Oui, toutes les viandes sont halal, sans porc.'],
    ],
  },
  {
    path: '/tacos-bordeaux', crumb: 'French tacos', active: 'carte',
    title: 'French tacos à Bordeaux, à emporter' + T_SUFFIX,
    description: 'French tacos à Bordeaux : M, L ou XL, jusqu’à 3 viandes halal, sauces au choix, sauce fromagère maison. Commande en ligne, à emporter en 20 minutes.',
    h1: 'French tacos à Bordeaux, composé comme vous voulez',
    lead: 'Galette grillée, frites, sauce fromagère maison : choisissez la taille, jusqu’à trois viandes et deux sauces, en menu avec frites et boisson si vous voulez.',
    facts: ['M, L ou XL', 'Jusqu’à 3 viandes', '9 sauces au choix', 'Viandes halal'],
    itemsTitle: 'Tacos et menus', filter: (p) => p.cat === 'tacos' || p.id === 'wrap',
    sections: [
      ['Composez votre tacos', ['Taille M avec une viande, L avec deux viandes, XL avec trois viandes : poulet mariné, viande hachée, cordon bleu, merguez, kebab, nuggets ou tenders.', 'Deux sauces au choix : blanche, algérienne, samouraï, biggy, barbecue, harissa, andalouse, ketchup ou mayonnaise. En supplément : double fromage, gratiné au four ou bacon de dinde.']],
      ['En menu pour le midi', ['Ajoutez frites et boisson pour 3,50 € : la formule idéale pour la pause déjeuner près du Jardin public et des Chartrons.']],
    ],
    faq: [
      ['Quelle taille choisir ?', 'M pour une petite faim, L pour un repas complet, XL pour les grosses faims.'],
      ['Les viandes sont-elles halal ?', 'Oui, toutes nos viandes sont halal.'],
    ],
  },
  {
    path: '/kebab-bordeaux', crumb: 'Kebab', active: 'carte',
    title: 'Kebab à Bordeaux, rue du Palais Gallien' + T_SUFFIX,
    description: 'Kebab à Bordeaux : sandwich kebab, assiette kebab, pizza kebab. Viande halal, frites maison, neuf sauces au choix. Commande en ligne, à emporter en 20 minutes.',
    h1: 'Kebab à Bordeaux, rue du Palais Gallien',
    lead: 'Sandwich kebab, assiette kebab avec frites et salade, pizza kebab : une viande halal bien assaisonnée, des frites coupées sur place et neuf sauces au choix.',
    facts: ['Viande halal', 'Frites maison', '9 sauces au choix', 'Prêt en 20 minutes'],
    itemsTitle: 'Nos kebabs', filter: (p) => /kebab/i.test(p.name),
    sections: [
      ['Le kebab, notre classique', ['Pain garni de viande kebab, salade, tomate, oignons et frites, avec la sauce de votre choix : blanche, algérienne, samouraï, biggy, harissa, andalouse. En menu, ajoutez frites et boisson.']],
      ['En assiette ou en pizza', ['Plus copieuse, l’assiette kebab réunit viande, frites maison, salade fraîche et sauce. Et pour les amateurs, la pizza kebab à la sauce blanche.']],
      ['À emporter en 20 minutes', ['Commandez en ligne, choisissez l’heure de retrait et passez au 26 rue du Palais Gallien : votre commande est prête à votre arrivée.']],
    ],
    faq: [
      ['La viande est-elle halal ?', 'Oui, toutes nos viandes sont halal.'],
      ['Quelles sauces pour le kebab ?', 'Blanche, algérienne, samouraï, biggy, barbecue, harissa, andalouse, ketchup ou mayonnaise : jusqu’à deux au choix.'],
      ['Peut-on commander à l’avance ?', 'Oui : choisissez « Programmer » et l’heure qui vous arrange pendant nos horaires.'],
    ],
  },
  {
    path: '/halal-bordeaux', crumb: 'Cuisine halal', active: 'carte',
    title: 'Restaurant halal à Bordeaux centre, rapide et fait maison' + T_SUFFIX,
    description: 'Restauration rapide halal à Bordeaux, rue du Palais Gallien : pizzas, tacos, kebab, burgers et plats maison. Commande en ligne, à emporter.',
    h1: 'Restaurant halal à Bordeaux centre',
    lead: 'Toutes nos viandes sont halal : pizzas, tacos, kebab, burgers et plats maison, à emporter rue du Palais Gallien.',
    facts: ['Viandes halal', 'Sans porc', 'Plats maison', 'Depuis 2007'],
    itemsTitle: 'Nos incontournables', filter: (p) => p.tags.includes('halal') && ['pizzas', 'sandwichs', 'plats'].includes(p.cat),
    sections: [
      ['Une cuisine halal, du kebab à la pizza', ['Poulet, bœuf et agneau halal, jambon et bacon de dinde : toute la carte est préparée sans porc, des pizzas aux tacos en passant par l’assiette kebab et le poulet grillé.']],
      ['Rue du Palais Gallien, depuis 2007', ['Le restaurant est installé au 26 rue du Palais Gallien, entre le Jardin public et les Chartrons.']],
    ],
    faq: [
      ['Toute la viande est-elle halal ?', 'Oui, toutes les viandes de la carte sont halal et il n’y a pas de porc.'],
      ['Avez-vous des plats végétariens ?', 'Oui : Margherita, 4 fromages, Chèvre miel, Végétarienne, frites et desserts.'],
    ],
  },
  {
    path: '/infos', crumb: 'Infos et horaires',
    title: 'Horaires, adresse et commande à emporter' + T_SUFFIX,
    description: 'Les Délices de Yanis, 26 rue du Palais Gallien à Bordeaux : horaires, adresse, commande à emporter, paiement, allergènes.',
    lead: 'Retrouvez nos horaires, notre adresse près du Jardin public, la commande à emporter et les moyens de paiement.',
    sections: [
      ['Venir au restaurant', ['Au 26 rue du Palais Gallien, dans le quartier du Palais Gallien, à quelques minutes à pied du Jardin public et de la place Gambetta. Tram C, arrêt Jardin public.']],
    ],
    faq: [
      ['Puis-je commander quand le restaurant est fermé ?', 'Oui, pour un créneau pendant la prochaine ouverture.'],
      ['Acceptez-vous les titres-restaurant ?', 'Oui, au comptoir.'],
    ],
  },
];
const SEO_BY_PATH = Object.fromEntries(SEO_PAGES.map((p) => [p.path, p]));
const STATIC_PAGES = ['/', '/carte', '/infos', '/pizza-bordeaux', '/tacos-bordeaux', '/kebab-bordeaux', '/halal-bordeaux'];

function seoHomeHTML() {
  return `<section class="sec seo-home"><div class="wrap prose">
    <h2>Pizzas, tacos et plats maison à Bordeaux</h2>
    <p>${fr(`Depuis ${S().since}, Les Délices de Yanis vous accueille au 26 rue du Palais Gallien, entre le Jardin public et les Chartrons. Au menu : pizzas cuites minute, French tacos composés à votre goût, kebab, burgers, wraps et plats maison, avec des viandes halal.`)}</p>
    <p>${fr('Commandez en ligne et récupérez votre commande en 20 minutes au comptoir, ou programmez l’heure de retrait qui vous arrange.')}</p>
    <p class="seo-links"><a href="/pizza-bordeaux">Pizza à emporter</a><a href="/tacos-bordeaux">French tacos</a><a href="/kebab-bordeaux">Kebab à Bordeaux</a><a href="/halal-bordeaux">Restaurant halal</a></p>
  </div></section>`;
}

/* ---------- Balises de la page ---------- */
function setMeta(key, content, attr = 'name') {
  let m = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
  m.setAttribute('content', content);
}
function setLink(rel, href) {
  let l = document.head.querySelector(`link[rel="${rel}"]`);
  if (!l) { l = document.createElement('link'); l.rel = rel; document.head.appendChild(l); }
  l.href = href;
}
function restaurantLd() {
  const s = S();
  const spec = [];
  for (const [d, ranges] of Object.entries(s.hours)) for (const [a, b] of ranges) spec.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d], opens: a, closes: b === '23:59' ? '23:59' : b });
  const ld = { '@type': ['Restaurant', 'FastFoodRestaurant'], '@id': SITE_URL + '/#restaurant', name: s.name, url: SITE_URL + '/', image: SITE_URL + '/img/og.jpg', servesCuisine: ['Pizza', 'Tacos', 'Kebab', 'Burgers', 'Halal'], priceRange: '€', address: { '@type': 'PostalAddress', streetAddress: s.address, postalCode: s.zip, addressLocality: s.city, addressCountry: 'FR' }, openingHoursSpecification: spec, hasMenu: SITE_URL + '/carte', acceptsReservations: false, currenciesAccepted: 'EUR', paymentAccepted: 'Cash, Credit Card, Titres-restaurant' };
  if (s.phone) ld.telephone = s.phone;
  return ld;
}
function menuLd() {
  return { '@type': 'Menu', '@id': SITE_URL + '/carte#menu', name: 'La carte', hasMenuSection: CATEGORIES.map(([c, n]) => ({ '@type': 'MenuSection', name: n, hasMenuItem: db.menu.filter((p) => p.cat === c).map((p) => ({ '@type': 'MenuItem', name: p.name, description: p.desc, offers: { '@type': 'Offer', price: p.price.toFixed(2), priceCurrency: 'EUR' }, ...(p.tags.includes('veggie') ? { suitableForDiet: 'https://schema.org/VegetarianDiet' } : p.tags.includes('halal') ? { suitableForDiet: 'https://schema.org/HalalDiet' } : {}) })) })) };
}
const crumbLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE_URL + p })) });
const faqLd = (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

function routeMeta(path) {
  const home = { title: 'Les Délices de Yanis : pizzas, tacos et plats maison à Bordeaux', description: 'Pizzas, French tacos, kebab, burgers et plats maison halal, rue du Palais Gallien à Bordeaux. Commande en ligne à emporter, prête en 20 minutes.', graph: [restaurantLd()] };
  if (path === '/') return home;
  if (path === '/carte') return { title: 'La carte : pizzas, tacos, burgers, plats maison' + T_SUFFIX, description: 'Toute la carte des Délices de Yanis à Bordeaux : pizzas, French tacos, kebab, burgers, plats maison, desserts. Prix et commande en ligne, à emporter en 20 minutes.', graph: [restaurantLd(), menuLd(), crumbLd([['Accueil', '/'], ['La carte', '/carte']])] };
  const p = SEO_BY_PATH[path];
  if (p) return { title: p.title, description: p.description, graph: [restaurantLd(), crumbLd([['Accueil', '/'], [p.crumb, p.path]]), ...(p.faq ? [faqLd(p.faq)] : [])] };
  if (path === '/commandes') return { title: 'Mes commandes' + T_SUFFIX, description: 'Vos commandes aux Délices de Yanis.', noindex: true };
  if (/^\/(commande|suivi|cuisine)/.test(path)) return { title: (/^\/cuisine/.test(path) ? 'Espace restaurant' : 'Votre commande') + T_SUFFIX, description: 'Commande en ligne, Les Délices de Yanis.', noindex: true };
  return { title: 'Page introuvable' + T_SUFFIX, description: 'Cette page n’existe pas.', noindex: true };
}
function applyHead(path) {
  const m = routeMeta(path);
  document.title = m.title;
  setMeta('description', m.description);
  setMeta('robots', !INDEXABLE || m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  const url = SITE_URL + (path === '/' ? '/' : path);
  if (!m.noindex) setLink('canonical', url); else { const c = document.head.querySelector('link[rel="canonical"]'); if (c) c.remove(); }
  setMeta('og:type', 'website', 'property'); setMeta('og:site_name', S().name, 'property'); setMeta('og:locale', 'fr_FR', 'property');
  setMeta('og:title', m.title, 'property'); setMeta('og:description', m.description, 'property'); setMeta('og:url', url, 'property');
  setMeta('og:image', SITE_URL + '/img/og.jpg', 'property'); setMeta('twitter:card', 'summary_large_image');
  let s = document.getElementById('ld-json');
  if (m.graph) {
    if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld-json'; document.head.appendChild(s); }
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': m.graph });
  } else if (s) s.remove();
}
