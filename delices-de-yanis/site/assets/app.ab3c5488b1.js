/* =====================================================================
   LES DÉLICES DE YANIS : données de départ (réglages, carte, options).
   La carte et les prix sont des exemples, à remplacer par ceux du
   restaurant : tout se modifie ensuite depuis l'espace gestion.
   ===================================================================== */
const DATA_VERSION = 2;   // à augmenter quand la carte ou les réglages de départ changent : les données sont recréées

const SETTINGS = {
  name: 'Les Délices de Yanis',
  short: 'Délices de Yanis',
  tagline: 'Pizzas, tacos et plats maison au cœur de Bordeaux',
  since: 2007,
  address: '26 rue du Palais Gallien',
  zip: '33000',
  city: 'Bordeaux',
  quarter: 'Palais Gallien, Jardin public, Chartrons',
  phone: '',              // à compléter dans Réglages : les boutons « Appeler » apparaissent alors
  email: '',
  legalName: 'LES DELICES DE YANIS',
  legalForm: 'SARL',
  siren: '499 121 226',
  rcs: 'RCS Bordeaux',
  vat: 10,                // TVA restauration à emporter et livraison (plats préparés)
  // horaires par jour (0 = dimanche) : plages ouvertes à la commande
  hours: {
    0: [['18:00', '23:00']],
    1: [['11:30', '14:30'], ['18:00', '23:00']],
    2: [['11:30', '14:30'], ['18:00', '23:00']],
    3: [['11:30', '14:30'], ['18:00', '23:00']],
    4: [['11:30', '14:30'], ['18:00', '23:00']],
    5: [['11:30', '14:30'], ['18:00', '23:59']],
    6: [['11:30', '14:30'], ['18:00', '23:59']],
  },
  delivery: false,        // livraison proposée ? (désactivée : le restaurant ne livre pas, tout est à emporter)
  prepMinutes: 20,        // délai pour une commande à emporter
  deliveryMinutes: 40,    // délai pour une livraison
  minDelivery: 15,        // montant minimum pour être livré
  freeDeliveryFrom: 35,   // livraison offerte à partir de ce montant
  // zones de livraison (codes postaux) et frais
  zones: [
    { zip: '33000', label: 'Bordeaux centre, Palais Gallien, Saint-Seurin, Jardin public', fee: 2.5 },
    { zip: '33300', label: 'Chartrons, Bacalan, Bassins à flot', fee: 3 },
    { zip: '33200', label: 'Caudéran, Saint-Augustin', fee: 3.5 },
    { zip: '33800', label: 'Saint-Jean, Nansouty, Saint-Michel', fee: 3.5 },
    { zip: '33100', label: 'La Bastide, rive droite', fee: 4 },
  ],
  promos: [{ code: 'YANIS10', pct: 10, label: '10 % sur votre première commande en ligne' }],
  paused: false,          // commandes en ligne mises en pause depuis l'écran cuisine
  pausedUntil: null,
  autoDemo: true,         // démonstration : le suivi de commande avance tout seul si la cuisine ne répond pas
};

const CATEGORIES = [
  ['pizzas', 'Pizzas', 'Pâte pétrie chaque matin, cuite minute'],
  ['tacos', 'Tacos', 'French tacos grillés, sauce fromagère maison'],
  ['sandwichs', 'Sandwichs et burgers', 'Servis avec frites maison'],
  ['plats', 'Plats maison', 'Cuisinés sur place chaque jour'],
  ['cote', 'À côté', 'Frites, nuggets, tenders'],
  ['desserts', 'Desserts', 'Pour finir en douceur'],
  ['boissons', 'Boissons', 'Bien fraîches'],
];

/* Groupes d'options : one = un seul choix, many = plusieurs (min, max). showIf : affiché seulement si un autre choix est fait. */
const OPTION_GROUPS = {
  'taille-pizza': { label: 'Taille', type: 'one', required: true, items: [['senior', 'Senior, 29 cm', 0], ['mega', 'Mega, 33 cm', 3.5]] },
  'base-pizza': { label: 'Base', type: 'one', required: true, items: [['tomate', 'Sauce tomate', 0], ['creme', 'Crème fraîche', 0]] },
  'supp-pizza': { label: 'Suppléments', type: 'many', max: 5, items: [['mozza', 'Mozzarella', 1.5], ['chevre', 'Chèvre', 1.5], ['poulet', 'Poulet', 2], ['merguez', 'Merguez', 2], ['kebab', 'Viande kebab', 2], ['oeuf', 'Œuf', 1], ['champi', 'Champignons', 1], ['olives', 'Olives', 1], ['jalapenos', 'Jalapeños', 1]] },
  'taille-tacos': { label: 'Taille', type: 'one', required: true, items: [['m', 'M, 1 viande', 0], ['l', 'L, 2 viandes', 2.5], ['xl', 'XL, 3 viandes', 5]] },
  'viandes': { label: 'Viandes', type: 'many', min: 1, maxFrom: { group: 'taille-tacos', m: 1, l: 2, xl: 3 }, items: [['poulet', 'Poulet mariné', 0], ['hache', 'Viande hachée', 0], ['cordon', 'Cordon bleu', 0], ['merguez', 'Merguez', 0], ['kebab', 'Kebab', 0], ['nuggets', 'Nuggets', 0], ['tenders', 'Tenders', 0]] },
  'sauces': { label: 'Sauces', type: 'many', min: 1, max: 2, items: [['blanche', 'Blanche', 0], ['algerienne', 'Algérienne', 0], ['samourai', 'Samouraï', 0], ['biggy', 'Biggy', 0], ['barbecue', 'Barbecue', 0], ['harissa', 'Harissa', 0], ['andalouse', 'Andalouse', 0], ['ketchup', 'Ketchup', 0], ['mayo', 'Mayonnaise', 0]] },
  'supp-tacos': { label: 'Suppléments', type: 'many', max: 3, items: [['fromage', 'Double fromage', 1], ['gratine', 'Gratiné au four', 1.5], ['bacon', 'Bacon de dinde', 1.5]] },
  'formule': { label: 'Formule', type: 'one', required: true, items: [['seul', 'Seul', 0], ['menu', 'En menu : frites + boisson', 3.5]] },
  'boisson-menu': { label: 'Boisson du menu', type: 'one', required: true, showIf: ['formule', 'menu'], items: [['cola', 'Cola', 0], ['cola-zero', 'Cola zéro', 0], ['orange', 'Soda orange', 0], ['the', 'Thé glacé pêche', 0], ['eau', 'Eau minérale', 0]] },
  'sans': { label: 'Retirer', type: 'many', max: 4, items: [['oignons', 'Sans oignons', 0], ['tomate', 'Sans tomate', 0], ['salade', 'Sans salade', 0], ['sauce', 'Sans sauce', 0]] },
  'cuisson-steak': { label: 'Cuisson du steak', type: 'one', required: true, items: [['apoint', 'À point', 0], ['bien', 'Bien cuit', 0]] },
  'parfum-shake': { label: 'Parfum', type: 'one', required: true, items: [['vanille', 'Vanille', 0], ['fraise', 'Fraise', 0], ['chocolat', 'Chocolat', 0], ['caramel', 'Caramel beurre salé', 0]] },
  'boisson': { label: 'Boisson', type: 'one', required: true, items: [['cola', 'Cola', 0], ['cola-zero', 'Cola zéro', 0], ['orange', 'Soda orange', 0], ['the', 'Thé glacé pêche', 0], ['tropical', 'Jus tropical', 0]] },
  'sauce-cote': { label: 'Sauce', type: 'one', required: true, items: [['barbecue', 'Barbecue', 0], ['blanche', 'Blanche', 0], ['ketchup', 'Ketchup', 0], ['biggy', 'Biggy', 0], ['sans', 'Sans sauce', 0]] },
};

/* Carte d'exemple. tags : halal, veggie, spicy, best (les plus commandés), new, maison */
const MENU = [
  // Pizzas
  { id: 'pizza-margherita', cat: 'pizzas', name: 'Margherita', desc: 'Sauce tomate, mozzarella fondante, basilic frais, huile d’olive.', price: 9, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-reine', cat: 'pizzas', name: 'Reine', desc: 'Sauce tomate, mozzarella, jambon de dinde, champignons de Paris.', price: 11, tags: ['halal', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-orientale', cat: 'pizzas', name: 'Orientale', desc: 'Sauce tomate, mozzarella, merguez, poivrons, oignons rouges, œuf.', price: 12.5, tags: ['halal', 'spicy'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-4-fromages', cat: 'pizzas', name: '4 fromages', desc: 'Crème fraîche, mozzarella, chèvre, bleu, emmental.', price: 12.5, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-chevre-miel', cat: 'pizzas', name: 'Chèvre miel', desc: 'Crème fraîche, mozzarella, chèvre, miel, noix.', price: 12.5, tags: ['veggie', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-kebab', cat: 'pizzas', name: 'Kebab', desc: 'Sauce tomate, mozzarella, viande kebab, oignons, sauce blanche.', price: 13, tags: ['halal'], options: ['taille-pizza', 'base-pizza', 'supp-pizza'] },
  { id: 'pizza-vegetarienne', cat: 'pizzas', name: 'Végétarienne', desc: 'Sauce tomate, mozzarella, poivrons, champignons, olives, oignons, tomates fraîches.', price: 11.5, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-poulet-curry', cat: 'pizzas', name: 'La Yanis', desc: 'Crème fraîche, mozzarella, poulet mariné au curry, oignons, poivrons. La recette de la maison.', price: 13, tags: ['halal', 'maison', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  // Tacos
  { id: 'tacos', cat: 'tacos', name: 'French tacos', desc: 'Galette grillée, frites, sauce fromagère maison, vos viandes et vos sauces.', price: 7.5, tags: ['halal', 'best'], options: ['taille-tacos', 'viandes', 'sauces', 'supp-tacos', 'formule', 'boisson-menu'] },
  // Sandwichs et burgers
  { id: 'sandwich-kebab', cat: 'sandwichs', name: 'Kebab', desc: 'Pain maison, viande kebab, salade, tomate, oignons, frites.', price: 7.5, tags: ['halal', 'best'], options: ['sauces', 'sans', 'formule', 'boisson-menu'] },
  { id: 'burger', cat: 'sandwichs', name: 'Burger Yanis', desc: 'Steak haché 150 g, cheddar, oignons caramélisés, sauce maison, frites.', price: 9.5, tags: ['halal', 'maison'], options: ['cuisson-steak', 'sans', 'formule', 'boisson-menu'] },
  { id: 'panini', cat: 'sandwichs', name: 'Panini poulet', desc: 'Poulet mariné, mozzarella, sauce au choix, frites.', price: 6.5, tags: ['halal'], options: ['sauces', 'formule', 'boisson-menu'] },
  { id: 'wrap', cat: 'sandwichs', name: 'Wrap poulet croustillant', desc: 'Tenders croustillants, cheddar, salade, tomate, sauce au choix, frites.', price: 8, tags: ['halal', 'new'], options: ['sauces', 'sans', 'formule', 'boisson-menu'] },
  // Plats maison
  { id: 'assiette-kebab', cat: 'plats', name: 'Assiette kebab', desc: 'Viande kebab, frites maison, salade fraîche, sauce au choix.', price: 12.5, tags: ['halal', 'best'], options: ['sauces', 'sans'] },
  { id: 'poulet-riz', cat: 'plats', name: 'Poulet grillé, riz et légumes', desc: 'Cuisse de poulet marinée et grillée, riz parfumé, légumes de saison.', price: 12, tags: ['halal', 'maison'], options: ['sauces'] },
  { id: 'salade-cesar', cat: 'plats', name: 'Salade César', desc: 'Romaine, poulet grillé, parmesan, croûtons, sauce César.', price: 10.5, tags: ['halal'], options: ['sans'] },
  // À côté
  { id: 'frites', cat: 'cote', name: 'Frites maison', desc: 'Coupées et cuites sur place.', price: 3, tags: ['veggie'], options: ['sauce-cote'] },
  { id: 'frites-cheddar', cat: 'cote', name: 'Frites cheddar', desc: 'Frites maison, sauce cheddar fondante.', price: 4.5, tags: ['veggie', 'new'], options: [] },
  { id: 'nuggets', cat: 'cote', name: 'Nuggets de poulet × 6', desc: 'Panure croustillante, sauce au choix.', price: 5, tags: ['halal'], options: ['sauce-cote'] },
  { id: 'tenders', cat: 'cote', name: 'Tenders × 4', desc: 'Filets de poulet croustillants, sauce au choix.', price: 6, tags: ['halal'], options: ['sauce-cote'] },
  { id: 'onion-rings', cat: 'cote', name: 'Onion rings × 8', desc: 'Rondelles d’oignon en beignet.', price: 4, tags: ['veggie'], options: ['sauce-cote'] },
  // Desserts
  { id: 'tiramisu', cat: 'desserts', name: 'Tiramisu maison', desc: 'Mascarpone, biscuit imbibé de café, cacao.', price: 4, tags: ['maison'], options: [] },
  { id: 'fondant', cat: 'desserts', name: 'Fondant au chocolat', desc: 'Cœur coulant, servi tiède.', price: 4, tags: [], options: [] },
  { id: 'milkshake', cat: 'desserts', name: 'Milkshake', desc: 'Glace et lait frais, mixés minute.', price: 4.5, tags: [], options: ['parfum-shake'] },
  { id: 'cookie', cat: 'desserts', name: 'Cookie pépites de chocolat', desc: 'Moelleux au centre, croustillant autour.', price: 2.5, tags: [], options: [] },
  // Boissons
  { id: 'canette', cat: 'boissons', name: 'Canette 33 cl', desc: 'Cola, cola zéro, soda orange, thé glacé, jus tropical.', price: 1.8, tags: [], options: ['boisson'] },
  { id: 'eau', cat: 'boissons', name: 'Eau minérale 50 cl', desc: 'Plate.', price: 1.2, tags: [], options: [] },
];

const TAGS = {
  halal: ['Halal', 't-halal'],
  veggie: ['Végétarien', 't-veggie'],
  spicy: ['Épicé', 't-spicy'],
  best: ['Le plus commandé', 't-best'],
  new: ['Nouveau', 't-new'],
  maison: ['Fait maison', 't-maison'],
};

/* =====================================================================
   CŒUR : outils, données enregistrées, horaires et créneaux, panier,
   prix des options, commandes et statuts, connexion de la cuisine.
   Sans serveur : tout reste dans le navigateur (démonstration).
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const round2 = (n) => Math.round(n * 100) / 100;
const eur = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0).replace(/ /g, ' ');
const plural = (n, w, pl) => `${n} ${n > 1 ? (pl || w + 's') : w}`;
const uid = (p = '') => p + Math.random().toString(36).slice(2, 9);
const FILE_MODE = location.protocol === 'file:';
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Dates ---------- */
const DAY = 86400000;
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const parse = (s) => (s instanceof Date ? s : new Date(s));
const dayStart = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const addMin = (d, m) => new Date(d.getTime() + m * 60000);
const hm = (d) => `${pad(d.getHours())}h${pad(d.getMinutes())}`;
const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
function dayLabel(d) {
  const t = dayStart(new Date());
  if (sameDay(d, t)) return 'aujourd’hui';
  if (sameDay(d, new Date(t.getTime() + DAY))) return 'demain';
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`;
}

/* ---------- Données enregistrées ---------- */
const STORE = 'yanis-demo-v1';
const CART_KEY = 'yanis-panier-v1';
const CLIENT_KEY = 'yanis-client-v1';
const ADMIN_KEY = 'yanis-cuisine-v1';
const lsGet = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage plein ou indisponible */ } };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch (e) { /* rien */ } };
let db = null;
const save = () => lsSet(STORE, db);
/** Relit les données enregistrées avant de les modifier : l'écran cuisine ou un autre onglet a pu les changer. */
function sync() { const f = lsGet(STORE); if (f && f.version === DATA_VERSION && Array.isArray(f.orders)) db = f; }

function seedDb() {
  const d = {
    version: DATA_VERSION,
    settings: JSON.parse(JSON.stringify(SETTINGS)),
    menu: MENU.map((p) => ({ ...p, available: true })),
    orders: seedOrders(),
    createdAt: new Date().toISOString(),
  };
  d.seq = Math.max(...d.orders.map((o) => +o.number));
  return d;
}
const product = (id) => db.menu.find((p) => p.id === id);
/** Livraison proposée par le restaurant (réglage) : sinon tout est à emporter. */
const deliveryOn = () => !!(db && db.settings && db.settings.delivery);
const group = (id) => OPTION_GROUPS[id];
const S = () => db.settings;

/* ---------- Horaires et créneaux ---------- */
function rangesFor(d) { return (S().hours[d.getDay()] || []).map(([a, b]) => [toMin(a), toMin(b)]); }
function isOpenAt(d) { const m = d.getHours() * 60 + d.getMinutes(); return rangesFor(d).some(([a, b]) => m >= a && m < b); }
function pausedNow() { const s = S(); return !!s.paused && (!s.pausedUntil || new Date(s.pausedUntil) > new Date()); }
const openNow = () => isOpenAt(new Date()) && !pausedNow();
/** Prochaine ouverture (dans les 7 jours). */
function nextOpening(from = new Date()) {
  for (let i = 0; i < 8; i++) {
    const d = dayStart(new Date(from.getTime() + i * DAY));
    for (const [a] of rangesFor(d)) { const t = new Date(d.getTime() + a * 60000); if (t > from) return t; }
  }
  return null;
}
function closingToday(now = new Date()) {
  const m = now.getHours() * 60 + now.getMinutes();
  const r = rangesFor(now).find(([a, b]) => m >= a && m < b);
  return r ? new Date(dayStart(now).getTime() + r[1] * 60000) : null;
}
const hhmm = (s) => (s === '23:59' || s === '24:00' ? 'minuit' : s.replace(/^0/, '').replace(/:00$/, 'h').replace(':', 'h'));
function hoursText(day) {
  const r = S().hours[day] || [];
  return r.length ? r.map(([a, b]) => `${hhmm(a)} à ${hhmm(b)}`).join(' et ') : 'fermé';
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** Horaires regroupés par jours identiques (du lundi au dimanche) : « Lundi au jeudi », « Vendredi et samedi »… */
function hoursGroups() {
  const groups = [];
  for (const d of [1, 2, 3, 4, 5, 6, 0]) { const txt = hoursText(d); const g = groups[groups.length - 1]; if (g && g.txt === txt) g.days.push(d); else groups.push({ days: [d], txt }); }
  return groups.map(({ days, txt }) => [days.length === 1 ? cap(JOURS[days[0]]) : days.length === 2 ? `${cap(JOURS[days[0]])} et ${JOURS[days[1]]}` : `${cap(JOURS[days[0]])} au ${JOURS[days[days.length - 1]]}`, cap(txt)]);
}
/** Créneaux proposés (toutes les 15 minutes), aujourd'hui et demain, au plus tôt après le délai de préparation. */
function slots(mode) {
  const lead = mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes;
  const now = new Date();
  const earliest = addMin(now, lead);
  const out = [];
  for (let i = 0; i < 2; i++) {
    const d = dayStart(new Date(now.getTime() + i * DAY));
    for (const [a, b] of rangesFor(d)) {
      for (let m = a + (mode === 'livraison' ? 30 : 15); m <= b; m += 15) {
        const t = new Date(d.getTime() + m * 60000);
        if (t >= earliest) out.push(t);
      }
    }
  }
  return out;
}

/* ---------- Prix d'un article avec ses options ---------- */
/** Nombre maximal de choix d'un groupe (les viandes suivent la taille du tacos). */
function groupMax(g, choice) {
  if (g.maxFrom) return g.maxFrom[(choice[g.maxFrom.group] || [])[0]] || 1;
  return g.type === 'one' ? 1 : g.max || 99;
}
const groupVisible = (g, choice) => !g.showIf || (choice[g.showIf[0]] || []).includes(g.showIf[1]);
function defaultChoice(p) {
  const c = {};
  for (const gid of p.options) { const g = group(gid); if (g.type === 'one' && g.required) c[gid] = [g.items[0][0]]; else c[gid] = []; }
  if (p.id === 'pizza-kebab') c['base-pizza'] = ['tomate'];
  return c;
}
function unitPrice(p, choice) {
  let t = p.price;
  for (const gid of p.options) {
    const g = group(gid);
    if (!groupVisible(g, choice)) continue;
    for (const id of choice[gid] || []) { const it = g.items.find((x) => x[0] === id); if (it) t += it[2]; }
  }
  return round2(t);
}
/** Choix incomplets : message pour le premier groupe à compléter. */
function missingChoice(p, choice) {
  for (const gid of p.options) {
    const g = group(gid);
    if (!groupVisible(g, choice)) continue;
    const n = (choice[gid] || []).length;
    const min = g.type === 'one' ? (g.required ? 1 : 0) : g.min || 0;
    if (n < min) return { gid, msg: g.type === 'one' ? `Choisissez : ${g.label.toLowerCase()}` : `Choisissez ${plural(min, g.label.toLowerCase().replace(/s$/, ''))}` };
  }
  return null;
}
/** Détail lisible des options choisies (ticket, panier, suivi). */
function choiceText(p, choice) {
  const parts = [];
  for (const gid of p.options) {
    const g = group(gid);
    if (!groupVisible(g, choice)) continue;
    const labels = (choice[gid] || []).map((id) => (g.items.find((x) => x[0] === id) || [])[1]).filter(Boolean);
    if (!labels.length) continue;
    if (gid === 'formule' && labels[0] === 'Seul') continue;
    parts.push(gid === 'sans' || gid.startsWith('taille') || gid === 'formule' ? labels.join(', ') : `${g.label} : ${labels.join(', ')}`);
  }
  return parts.join(' · ');
}

/* ---------- Panier ---------- */
let cart = null;
function loadCart() { cart = lsGet(CART_KEY) || { mode: 'emporter', zip: '', lines: [], promo: null, when: 'asap' }; if (!cart.lines) cart.lines = []; return cart; }
const saveCart = () => lsSet(CART_KEY, cart);
const cartCount = () => cart.lines.reduce((a, l) => a + l.qty, 0);
function addToCart(p, choice, qty = 1, note = '') {
  const key = p.id + '|' + JSON.stringify(choice) + '|' + note;
  const same = cart.lines.find((l) => l.key === key);
  if (same) same.qty += qty;
  else cart.lines.push({ key, id: uid('l'), productId: p.id, choice, qty, note, unit: unitPrice(p, choice) });
  saveCart();
}
function zoneFor(zip) { return S().zones.find((z) => z.zip === String(zip || '').trim()) || null; }
/** Totaux du panier : sous-total, remise, livraison, total, minimum de livraison. */
function totals(c = cart) {
  const sub = round2(c.lines.reduce((a, l) => a + l.unit * l.qty, 0));
  const promo = c.promo && S().promos.find((x) => x.code === c.promo);
  const discount = promo ? round2(sub * promo.pct / 100) : 0;
  const zone = c.mode === 'livraison' ? zoneFor(c.zip) : null;
  const afterDiscount = round2(sub - discount);
  const delivery = c.mode === 'livraison' && zone ? (afterDiscount >= S().freeDeliveryFrom ? 0 : zone.fee) : 0;
  const total = round2(afterDiscount + delivery);
  const missingMin = c.mode === 'livraison' ? Math.max(0, round2(S().minDelivery - afterDiscount)) : 0;
  return { sub, discount, promo, zone, delivery, total, missingMin, vat: round2(total - total / (1 + S().vat / 100)) };
}

/* ---------- Commandes ---------- */
const STATUS = {
  recue: ['Reçue', 'Le restaurant a bien reçu votre commande.'],
  preparation: ['En préparation', 'On prépare votre commande.'],
  prete: ['Prête', 'Votre commande vous attend au comptoir.'],
  livraison: ['En livraison', 'Votre livreur est en route.'],
  terminee: ['Terminée', 'Bon appétit !'],
  annulee: ['Annulée', 'Cette commande a été annulée.'],
};
const FLOW = (o) => (o.mode === 'livraison' ? ['recue', 'preparation', 'livraison', 'terminee'] : ['recue', 'preparation', 'prete', 'terminee']);
const orderById = (id) => db.orders.find((o) => o.id === id);
const orderNumber = () => { db.seq += 1; return String(db.seq); };
function orderLines(o) { return o.lines.map((l) => { const p = product(l.productId) || { name: l.name, options: [] }; return { ...l, name: p.name, detail: l.detail || choiceText(p, l.choice) }; }); }
function setStatus(o, st, byKitchen) {
  sync();
  const cur = orderById(o.id) || o;
  cur.status = st;
  cur.history = cur.history || [];
  cur.history.push({ st, at: new Date().toISOString() });
  if (byKitchen) cur.auto = false;
  save();
  return cur;
}
/** Démonstration : sans réponse de la cuisine, la commande avance toute seule (acceptée, préparée, prête ou livrée). */
function autoAdvance(o) {
  if (!S().autoDemo || !o.auto || ['terminee', 'annulee'].includes(o.status)) return false;
  const flow = FLOW(o);
  const i = flow.indexOf(o.status);
  const since = (Date.now() - new Date((o.history[o.history.length - 1] || {}).at || o.createdAt).getTime()) / 1000;
  const wait = [12, 40, o.mode === 'livraison' ? 45 : 60][i] || 9999;
  if (i >= 0 && i < flow.length - 1 && since > wait) { setStatus(o, flow[i + 1], false); return true; }
  return false;
}

/* ---------- Commandes d'exemple (écran cuisine vivant à toute heure) ---------- */
function seedOrders() {
  const r = mulberry(20260929);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const dishes = MENU.filter((x) => x.cat !== 'boissons').flatMap((x) => Array(x.tags.includes('best') ? 6 : x.cat === 'desserts' || x.cat === 'cote' ? 1 : 2).fill(x));
  const names = [['Inès', 'B.'], ['Karim', 'D.'], ['Sarah', 'M.'], ['Hugo', 'L.'], ['Nadia', 'K.'], ['Yanis', 'R.'], ['Léa', 'F.'], ['Mehdi', 'A.'], ['Camille', 'T.'], ['Moussa', 'S.'], ['Julie', 'P.'], ['Rayan', 'H.']];
  const orders = [];
  let seq = 1100;
  // numéros de téléphone réservés à la fiction par l'ARCEP (06 39 98 xx xx) : aucun abonné réel
  const phone = () => `06 39 98 ${pad(Math.floor(r() * 100))} ${pad(Math.floor(r() * 100))}`;
  const mk = (created, status, forceMode) => {
    const n = 1 + Math.floor(r() * 3);
    const lines = [];
    for (let i = 0; i < n; i++) {
      const p = pick(dishes);
      const choice = defaultChoiceSeed(p, r);
      lines.push({ id: uid('l'), productId: p.id, choice, qty: 1 + (r() < 0.2 ? 1 : 0), note: '', unit: unitPriceSeed(p, choice) });
    }
    if (r() < 0.5) { const c = MENU.find((x) => x.id === 'canette'); lines.push({ id: uid('l'), productId: c.id, choice: { boisson: [pick(['cola', 'cola-zero', 'orange', 'the'])] }, qty: 1 + Math.floor(r() * 2), note: '', unit: c.price }); }
    const mode = SETTINGS.delivery ? forceMode || (r() < 0.55 ? 'emporter' : 'livraison') : 'emporter';
    const sub = round2(lines.reduce((a, l) => a + l.unit * l.qty, 0));
    const fee = mode === 'livraison' ? (sub >= SETTINGS.freeDeliveryFrom ? 0 : 2.5) : 0;
    const [fn, ln] = pick(names);
    seq += 1;
    const at = (m) => new Date(created.getTime() + m * 60000).toISOString();
    const hist = [{ st: 'recue', at: at(0) }];
    if (['preparation', 'prete', 'livraison', 'terminee'].includes(status)) hist.push({ st: 'preparation', at: at(3) });
    if (['prete', 'livraison', 'terminee'].includes(status)) hist.push({ st: mode === 'livraison' ? 'livraison' : 'prete', at: at(17) });
    if (status === 'terminee') hist.push({ st: 'terminee', at: at(mode === 'livraison' ? 38 : 24) });
    orders.push({
      id: uid('o'), number: String(seq), createdAt: created.toISOString(), status: status === 'prete' && mode === 'livraison' ? 'livraison' : status, history: hist, auto: false,
      mode, when: 'asap', due: at(mode === 'livraison' ? SETTINGS.deliveryMinutes : SETTINGS.prepMinutes),
      customer: { firstName: fn, lastName: ln, phone: phone() },
      address: mode === 'livraison' ? { street: `${1 + Math.floor(r() * 80)} ${pick(['rue du Palais Gallien', 'rue Fondaudège', 'cours de Verdun', 'rue Judaïque', 'rue Notre-Dame', 'cours Portal'])}`, zip: pick(['33000', '33000', '33300']), city: 'Bordeaux', info: r() < 0.3 ? 'Code 1234B, 2e étage' : '' } : null,
      lines, promo: null, discount: 0, delivery: fee, total: round2(sub + fee), payment: r() < 0.7 ? 'carte' : 'sur-place', paid: r() < 0.7, channel: 'En ligne', demo: true,
    });
  };
  const now = new Date();
  // service en cours : quelques commandes récentes, à toute heure de la démonstration
  mk(addMin(now, -1), 'recue'); mk(addMin(now, -4), 'recue', 'livraison');
  mk(addMin(now, -9), 'preparation'); mk(addMin(now, -13), 'preparation', 'livraison');
  mk(addMin(now, -21), 'prete', 'emporter'); mk(addMin(now, -26), 'prete', 'livraison');
  // services passés (midi et soir), aujourd'hui avant maintenant et sur les 30 derniers jours
  const service = (d) => { const lunch = r() < 0.42; const m = lunch ? 11 * 60 + 45 + Math.floor(r() * 150) : 18 * 60 + 30 + Math.floor(r() * 255); return new Date(dayStart(d).getTime() + m * 60000); };
  for (let i = 0; i < 40; i++) { const t = service(now); if (t < addMin(now, -45)) mk(t, 'terminee'); if (orders.length > 20) break; }
  for (let d = 1; d <= 30; d++) {
    const day = new Date(now.getTime() - d * DAY);
    const n = 18 + Math.floor(r() * 16) + (day.getDay() >= 5 || day.getDay() === 0 ? 14 : 0);
    for (let i = 0; i < n; i++) mk(service(day), 'terminee');
  }
  orders.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)).forEach((o, i) => { o.number = String(2001 + i); });
  return orders.reverse();
}
function defaultChoiceSeed(p, r) {
  const c = {};
  for (const gid of p.options) {
    const g = OPTION_GROUPS[gid];
    if (g.type === 'one') c[gid] = g.required ? [g.items[Math.floor(r() * Math.min(2, g.items.length))][0]] : [];
    else {
      const n = g.maxFrom ? g.maxFrom[(c[g.maxFrom.group] || [])[0]] || 1 : Math.max(g.min || 0, r() < 0.25 ? 1 : 0);
      c[gid] = g.items.slice().sort(() => r() - 0.5).slice(0, n).map((x) => x[0]);
    }
  }
  if (c.formule && c.formule[0] === 'menu') c['boisson-menu'] = ['cola'];
  else if (c['boisson-menu']) c['boisson-menu'] = [];
  return c;
}
function unitPriceSeed(p, choice) {
  let t = p.price;
  for (const gid of p.options) {
    const g = OPTION_GROUPS[gid];
    if (g.showIf && !(choice[g.showIf[0]] || []).includes(g.showIf[1])) continue;
    for (const id of choice[gid] || []) { const it = g.items.find((x) => x[0] === id); if (it) t += it[2]; }
  }
  return round2(t);
}
function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/** Données de la démonstration recalées sur l'heure : les commandes « en cours » restent en cours à toute heure. */
function refreshDemo() {
  const anchor = db.anchor ? new Date(db.anchor) : new Date();
  const shift = Date.now() - anchor.getTime();
  if (shift > 10 * 60000) {
    for (const o of db.orders) {
      if (!o.demo) continue;
      const sh = (s) => new Date(new Date(s).getTime() + shift).toISOString();
      o.createdAt = sh(o.createdAt); o.due = sh(o.due);
      for (const h of o.history || []) h.at = sh(h.at);
    }
  }
  db.anchor = new Date().toISOString();
  save();
}

/* ---------- Connexion de l'espace cuisine ---------- */
function pwHash(s) {
  let a = 0x811c9dc5, b = 0x9e3779b9;
  for (const ch of 'yanis|' + s) { const c = ch.codePointAt(0); a = Math.imul(a ^ c, 16777619) >>> 0; b = Math.imul(b ^ c, 2246822519) >>> 0; b = ((b << 13) | (b >>> 19)) >>> 0; }
  return a.toString(36) + '.' + b.toString(36);
}
const ADMIN_LOGIN = 'yanis';
const ADMIN_PW = '1eyo20r.1uj6es7';  // empreinte du mot de passe (en minuscules), voir README
const adminSession = () => lsGet(ADMIN_KEY);
const setAdminSession = (v) => (v ? lsSet(ADMIN_KEY, v) : lsDel(ADMIN_KEY));
const checkAdmin = (login, pw) => String(login || '').trim().toLowerCase().replace(/\s+/g, '') === ADMIN_LOGIN && pwHash(String(pw || '').trim().toLowerCase()) === ADMIN_PW;

/* Icônes (traits de 24 × 24, style Lucide) */
const IC = {
  cart: '<path d="M6 7h13l-1.3 8.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.7L5.6 4.5A1.8 1.8 0 0 0 3.8 3H2.5"/><circle cx="9.5" cy="20.5" r="1.3"/><circle cx="16.5" cy="20.5" r="1.3"/>',
  bag: '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  bike: '<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M8.5 17h5l2.5-6h-5l-2 6"/><path d="M13 7h3l2.5 10"/><path d="M5.5 17 8 11h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  phone: '<path d="M5 3h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 5 5l1.4-2.3L19 13.5V17a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  chevR: '<path d="m9 5 7 7-7 7"/>',
  chevL: '<path d="m15 5-7 7 7 7"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  arrowR: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z"/>',
  flame: '<path d="M12 21c-3.9 0-7-2.7-7-6.6 0-3.1 2-5.3 3.6-7 .4 1.6 1.4 2.8 2.6 3.3C11 7.4 12.8 4.6 15.3 3c-.3 2.2.5 4.3 2 5.9 1.1 1.2 1.7 2.8 1.7 4.6 0 4.2-3 7.5-7 7.5z"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-6 10-8"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.2 3 7.8 7 9.5 4-1.7 7-5.3 7-9.5V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
  cash: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v5M18 9.5v5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  printer: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  play: '<path d="M7 5v14l12-7L7 5z"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17v.5"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8c-1.5-3-5-3.5-5-1.5S9 8 12 8zm0 0c1.5-3 5-3.5 5-1.5S15 8 12 8z"/>',
  chef: '<path d="M7 14h10v6H7z"/><path d="M7 14a4 4 0 0 1-1-7.9A4 4 0 0 1 12 4a4 4 0 0 1 6 2.1A4 4 0 0 1 17 14"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
  map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14M15 6v14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  whatsapp: '<path d="M4 20l1.2-3.8A8 8 0 1 1 8 19l-4 1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.2-1.8-1-1 .6a4 4 0 0 1-2.1-2.1l.6-1-1-1.8L9 9.5z"/>',
};
const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ''}</svg>`;

/* Logo : pastille aux couleurs de la maison (tomate, safran) et nom en toutes lettres */
function logoMark(size = 40) {
  return `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" fill="#E2432A"/><circle cx="32" cy="32" r="25.5" fill="none" stroke="#F6B73C" stroke-width="2.2" stroke-dasharray="3 3.6"/><path d="M20.5 20h7.2l4.4 9.4 4.4-9.4h7.2l-8.1 15.1V45h-7V35.1L20.5 20z" fill="#FFF7EA"/><path d="M44.5 13.5c1.2 1.9 1.2 3.6 0 5.2" fill="none" stroke="#F6B73C" stroke-width="2.2" stroke-linecap="round"/><path d="M48.5 12c1.8 2.9 1.8 5.6 0 8" fill="none" stroke="#F6B73C" stroke-width="2.2" stroke-linecap="round"/></svg>`;
}
function logoHTML(light) {
  return `<a class="logo ${light ? 'light' : ''}" href="/" aria-label="${esc(S().name)}, accueil">${logoMark(44)}<span class="logo-t"><small>Les Délices</small><b>de Yanis</b></span></a>`;
}
/* Petite étoile des bandeaux et flèche dessinée à la main (annotations) */
const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5l2.6 7.1 7.6.3-6 4.7 2.1 7.3L12 16.6l-6.3 4.3 2.1-7.3-6-4.7 7.6-.3z" fill="currentColor"/></svg>';
const SCRIBBLE_ARROW = '<svg class="scribble" viewBox="0 0 120 70" aria-hidden="true"><path d="M6 8c26 2 52 10 70 26 9 8 15 17 19 27" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M84 52l11 11 5-15" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* =====================================================================
   COMPOSANTS : typographie, photos, étiquettes, fiches produit,
   fenêtres (bas d'écran sur téléphone), messages, en-tête, pied de page.
   ===================================================================== */
/** Typographie française : espaces insécables avant : ; ? ! et dans les guillemets. */
const fr = (s) => String(s).replace(/ ([:;?!])/g, ' $1').replace(/« /g, '« ').replace(/ »/g, ' »');
const PHOTO_SET = new Set(window.YANIS_PHOTOS || []);
/** Photo d'un plat en WebP (deux tailles), sinon une vignette typographique aux couleurs de la catégorie. */
function photo(id, { size = 640, cls = '', alt = '', eager = false } = {}) {
  if (!PHOTO_SET.has(id)) {
    const p = db && db.menu ? db.menu.find((x) => x.id === id) : null;
    const name = p ? p.name.replace(/ ×.*$/, '') : '';
    return `<span class="ph-none ${cls}" data-cat="${esc(p ? p.cat : '')}" aria-hidden="true"><i>${esc(name.length > 14 ? name.split(' ')[0] : name)}</i></span>`;
  }
  const big = size > 700;
  return `<img class="${cls}" src="/img/${id}-${big ? 1200 : 640}.webp" srcset="/img/${id}-640.webp 640w, /img/${id}-1200.webp 1200w" sizes="${big ? '(max-width: 700px) 100vw, 900px' : '(max-width: 700px) 45vw, 360px'}" alt="${esc(alt)}" width="${big ? 1200 : 640}" height="${big ? 900 : 480}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
const tagHTML = (t) => (TAGS[t] ? `<span class="tag ${TAGS[t][1]}">${t === 'spicy' ? icon('flame') : t === 'veggie' ? icon('leaf') : t === 'best' ? icon('star') : ''}${esc(TAGS[t][0])}</span>` : '');
const fromPrice = (p) => (p.options.some((g) => group(g).type === 'one' && group(g).items.some((x) => x[2] > 0)) ? 'dès ' : '');

/** Fiche produit : ligne (téléphone) ou carte (ordinateur), selon la mise en page du parent. */
function productCard(p) {
  const off = !p.available;
  const badge = p.tags.includes('best') ? '<span class="pcard-best">Top vente</span>' : p.tags.includes('new') ? '<span class="pcard-best new">Nouveau</span>' : p.tags.includes('maison') ? '<span class="pcard-best maison">Recette maison</span>' : '';
  return `<article class="pcard ${off ? 'off' : ''}" data-p="${esc(p.id)}">
    <button type="button" class="pcard-hit" data-open="${esc(p.id)}" ${off ? 'disabled' : ''} aria-label="${esc(p.name)}, ${esc(eur(p.price))}"></button>
    <div class="pcard-img">${photo(p.id, { alt: p.name })}${badge}</div>
    <div class="pcard-body">
      <h3>${esc(p.name)}</h3>
      <p class="pcard-desc">${esc(fr(p.desc))}</p>
      <div class="pcard-foot"><b class="price">${fromPrice(p) ? '<small>dès</small>' : ''}${esc(eur(p.price))}</b><span class="pcard-tags">${p.tags.filter((t) => ['halal', 'veggie', 'spicy'].includes(t)).map(tagHTML).join('')}</span></div>
    </div>
    <span class="pcard-add" aria-hidden="true">${off ? 'Épuisé' : icon('plus')}</span>
  </article>`;
}

/* ---------- Fenêtres ---------- */
const OPEN = new Set();
function openSheet({ title = '', body = '', foot = '', cls = '', onMount, onClose, side = false }) {
  const el = document.createElement('div');
  el.className = `sheet-wrap ${side ? 'side' : ''} ${cls}`;
  el.innerHTML = `<div class="sheet-ov" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title || 'Fenêtre')}">
    ${title ? `<div class="sheet-hd"><h2>${esc(title)}</h2><button type="button" class="icon-btn" data-close aria-label="Fermer">${icon('x')}</button></div>` : `<button type="button" class="icon-btn sheet-x" data-close aria-label="Fermer">${icon('x')}</button>`}
    <div class="sheet-bd">${body}</div>${foot ? `<div class="sheet-ft">${foot}</div>` : ''}</div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('locked');
  const back = document.activeElement;
  requestAnimationFrame(() => {
    el.classList.add('open');
    // le clavier et les lecteurs d'écran passent dans la fenêtre
    const sh = $('.sheet', el); sh.tabIndex = -1;
    if (!el.contains(document.activeElement)) sh.focus({ preventScroll: true });
  });
  const close = () => {
    if (!OPEN.has(close)) return;
    OPEN.delete(close);
    el.classList.remove('open');
    if (!OPEN.size) document.documentElement.classList.remove('locked');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => el.remove(), 320);
    if (back && back.isConnected && typeof back.focus === 'function') try { back.focus({ preventScroll: true }); } catch (e) { /* rien */ }
    if (onClose) onClose();
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  el.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
  OPEN.add(close);
  if (onMount) onMount(el, close);
  return close;
}
const closeAll = () => [...OPEN].forEach((c) => c());

function toast(msg, kind = '') {
  let box = $('.toasts');
  if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast ' + kind;
  t.innerHTML = `${icon(kind === 'ok' ? 'check' : kind === 'warn' ? 'alert' : 'info')}<span>${esc(msg)}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---------- En-tête et pied de page ---------- */
function statusPill() {
  const now = new Date();
  if (pausedNow()) return `<span class="st-pill paused"><i></i>Commandes en pause</span>`;
  if (isOpenAt(now)) { const c = closingToday(now); return `<span class="st-pill open"><i></i>Ouvert${c ? `, jusqu’à ${hm(c)}` : ''}</span>`; }
  const n = nextOpening(now);
  return `<span class="st-pill closed"><i></i>Fermé${n ? `, ouvre ${sameDay(n, now) ? 'à' : dayLabel(n) + ' à'} ${hm(n)}` : ''}</span>`;
}
function siteHeader(active = '') {
  const n = cartCount();
  return `<header class="hd"><div class="wrap hd-in">
    ${logoHTML()}
    <nav class="hd-nav" aria-label="Navigation principale">
      <a href="/carte" class="${active === 'carte' ? 'on' : ''}">La carte</a>
      <a href="/infos" class="${active === 'infos' ? 'on' : ''}">Infos</a>
      <a href="/commandes" class="${active === 'commandes' ? 'on' : ''}">Mes commandes</a>
    </nav>
    <div class="hd-act">
      ${statusPill()}
      <a class="hd-order" href="/carte">Commander</a>
      <button type="button" class="hd-cart" data-cart aria-label="Voir le panier">${icon('bag')}<span class="hd-cart-n" ${n ? '' : 'hidden'}>${n}</span><span class="hd-cart-t">${n ? esc(eur(totals().sub)) : 'Panier'}</span></button>
      <button type="button" class="icon-btn hd-menu" data-menu aria-label="Menu">${icon('menu')}</button>
    </div>
  </div></header>`;
}
function siteFooter() {
  const s = S();
  return `<footer class="ft"><div class="wrap ft-big" aria-hidden="true"><span>Les Délices</span><span>de Yanis</span></div><div class="wrap ft-in">
    <div class="ft-brand">${logoHTML(true)}<p>${esc(fr(s.tagline))}. ${deliveryOn() ? 'À emporter ou livré' : 'À emporter'}, depuis ${s.since}.</p>
      <a class="btn btn-primary" href="/carte">${icon('bag')}Commander</a></div>
    <div><p class="ft-h">Nous trouver</p><p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p><a class="ft-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a>${s.phone ? `<a class="ft-link" href="tel:${esc(s.phone.replace(/\s/g, ''))}">${icon('phone')}${esc(s.phone)}</a>` : ''}</div>
    <div><p class="ft-h">Horaires</p><ul class="ft-hours">${hoursGroups().map(([d, h]) => `<li><span>${esc(d)}</span><span>${esc(h)}</span></li>`).join('')}</ul></div>
    <div><p class="ft-h">Commander</p><a href="/carte">La carte</a><a href="/pizza-bordeaux">Pizzas à emporter</a><a href="/tacos-bordeaux">Tacos</a><a href="/kebab-bordeaux">Kebab à Bordeaux</a><a href="/halal-bordeaux">Cuisine halal</a><a href="/commandes">Mes commandes</a></div>
  </div>
  <div class="wrap ft-bot"><span>© ${new Date().getFullYear()} ${esc(s.name)}. ${esc(s.legalForm)} ${esc(s.legalName)}, ${esc(s.siren)} ${esc(s.rcs)}.</span><span class="ft-bot-l"><a href="#" data-doc="mentions">Mentions légales</a><a href="#" data-doc="allergenes">Allergènes</a><a href="#" data-doc="credits">Crédits photos</a><a href="/cuisine">Espace restaurant</a><a href="#" data-install hidden>Installer l’application</a></span></div>
  <p class="wrap ft-demo">Site de démonstration réalisé par Groupe Amane Conseils : les commandes ne sont pas transmises au restaurant.</p>
  </footer>`;
}
function page(inner, { active = '', footer = true, bar = true, live = true } = {}) {
  const n = cartCount();
  return siteHeader(active) + `<main id="main">${inner}</main>` + (footer ? siteFooter() : '')
    + (live ? `<div class="live-wrap" data-live>${liveOrderHTML()}</div>` : '')
    + (bar && n ? `<button type="button" class="cartbar" data-cart><span class="cartbar-n">${n}</span><span>Voir le panier</span><b>${esc(eur(totals().sub))}</b></button>` : '');
}
/* ---------- Commande en cours : une barre la suit sur tout le site ---------- */
const myOrders = () => ((lsGet(CLIENT_KEY) || {}).orders || []).map(orderById).filter(Boolean);
const myLiveOrder = () => myOrders().find((o) => !['terminee', 'annulee'].includes(o.status));
function liveOrderHTML() {
  const o = myLiveOrder();
  if (!o) return '';
  const due = new Date(o.due);
  const what = o.status === 'prete' ? 'Prête : elle vous attend au comptoir' : o.status === 'livraison' ? 'Votre livreur est en route' : `${STATUS[o.status][0]} · ${o.mode === 'livraison' ? 'livrée' : 'prête'} vers ${hm(due)}`;
  return `<a class="live st-${o.status}" href="/suivi/${esc(o.id)}"><span class="live-dot" aria-hidden="true"></span><span class="live-t"><b>Commande n° ${esc(o.number)}</b><small>${esc(what)}</small></span><span class="live-go">Suivre${icon('chevR')}</span></a>`;
}
function refreshLive() { const w = $('[data-live]'); if (w) { const h = liveOrderHTML(); if (w.innerHTML !== h) w.innerHTML = h; } }
/** Met à jour l'en-tête et la barre du panier sans redessiner la page. */
function refreshCartUI() {
  const n = cartCount();
  $$('.hd-cart-n').forEach((e) => { e.hidden = !n; e.textContent = n; });
  $$('.hd-cart-t').forEach((e) => { e.textContent = n ? eur(totals().sub) : 'Panier'; });
  let bar = $('.cartbar');
  if (!n) { if (bar) bar.remove(); return; }
  if (!bar && $('#main') && !/^\/(commande|suivi|cuisine)/.test(curPath())) {
    bar = document.createElement('button'); bar.type = 'button'; bar.className = 'cartbar'; bar.dataset.cart = ''; document.body.appendChild(bar);
  }
  if (bar) bar.innerHTML = `<span class="cartbar-n">${n}</span><span>Voir le panier</span><b>${esc(eur(totals().sub))}</b>`;
  const b = $('.hd-cart'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  // le mode (à emporter ou livraison) choisi dans le panier se retrouve partout dans la page
  $$('[data-mode]').forEach((x) => { const on = x.dataset.mode === cart.mode; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
  $$('[data-zipbox]').forEach((z) => { z.hidden = cart.mode !== 'livraison'; });
  if (typeof renderCartPanel === 'function') renderCartPanel();
}
function openMenu() {
  openSheet({ cls: 'menu-sheet', side: true, title: 'Menu', body: `<nav class="mm">
    <a href="/">${icon('home')}Accueil</a><a href="/carte">${icon('grid')}La carte</a><a href="/infos">${icon('clock')}Infos et horaires</a><a href="/commandes">${icon('list')}Mes commandes</a>
    <p class="mm-h">Nos spécialités</p><a href="/pizza-bordeaux">Pizzas à emporter</a><a href="/tacos-bordeaux">French tacos</a><a href="/kebab-bordeaux">Kebab</a><a href="/halal-bordeaux">Cuisine halal</a>
    <p class="mm-h">Restaurant</p><a href="/cuisine">${icon('chef')}Espace restaurant</a>
    <button type="button" class="mm-install" data-install hidden>${icon('download')}<span><b>Installer l’application</b><small>Commandez depuis l’écran d’accueil</small></span></button></nav>`,
    onMount: (el, close) => { el.addEventListener('click', (e) => { if (e.target.closest('a[href],[data-install]')) close(); }); if (typeof updateInstallUI === 'function') updateInstallUI(); } });
}
function openDoc(kind) {
  const s = S();
  if (kind === 'mentions') openSheet({ title: 'Mentions légales', body: `<div class="doc"><p><b>${esc(s.legalName)}</b>, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}.</p><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}.</p><p>Site de démonstration réalisé par Groupe Amane Conseils (72 bis avenue des Tabernottes, 33370 Yvrac). Hébergement : Vercel Inc.</p><p>Les données saisies restent dans votre navigateur : aucune commande n’est transmise au restaurant et aucun paiement n’est débité.</p></div>` });
  if (kind === 'allergenes') openSheet({ title: 'Allergènes', body: `<div class="doc"><p>Nos plats peuvent contenir : gluten, lait, œufs, moutarde, sésame, fruits à coque, céleri, soja.</p><p>Une allergie ou une intolérance ? Indiquez-la dans la précision de votre commande et demandez conseil à l’équipe au comptoir.</p><p>Viandes halal : volaille, bœuf et agneau certifiés halal. Aucune viande de porc.</p></div>` });
  if (kind === 'credits') {
    const list = (window.YANIS_CREDITS || []).map((c) => `<li><b>${esc(c.titre || c.id)}</b><span>${esc(c.auteur || 'Auteur indiqué sur la page source')} · ${esc(c.licence)}${c.source ? ` · <a class="link" href="${esc(c.source)}" target="_blank" rel="noopener">source</a>` : ''}</span></li>`).join('');
    openSheet({ title: 'Crédits photos', body: `<div class="doc"><p>Photos d’illustration libres de droits (licences Creative Commons ou domaine public), recadrées. Elles seront remplacées par les photos des plats du restaurant.</p><ul class="credits">${list}</ul></div>` });
  }
}

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
/** Espace restaurant : c'est l'appli « Yanis Cuisine » (son manifeste, son icône, son nom sur l'écran d'accueil). */
function appIdentity(adm) {
  const set = (sel, attr, v) => { const e = document.head.querySelector(sel); if (e && e.getAttribute(attr) !== v) e.setAttribute(attr, v); };
  set('link[rel="manifest"]', 'href', adm ? '/cuisine.webmanifest' : '/manifest.webmanifest');
  set('link[rel="apple-touch-icon"]', 'href', adm ? '/icons/cuisine-apple-touch-icon.png' : '/icons/apple-touch-icon.png');
  set('meta[name="apple-mobile-web-app-title"]', 'content', adm ? 'Yanis Cuisine' : 'Délices Yanis');
}
function applyHead(path) {
  const m = routeMeta(path);
  const adm = isAdminPath(path);
  appIdentity(adm);
  // espace restaurant : le nombre de commandes à accepter apparaît dans l'onglet
  const waiting = adm && adminSession() ? db.orders.filter((o) => o.status === 'recue').length : 0;
  document.title = (waiting ? `(${waiting}) ` : '') + m.title;
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

/* =====================================================================
   SITE : accueil, carte, fiche produit (options), pages spécialités,
   infos et horaires, mes commandes, page introuvable.
   ===================================================================== */
const catName = (id) => (CATEGORIES.find((c) => c[0] === id) || [id, id])[1];
const live = () => db.menu.filter((p) => p.available !== false);
const bestSellers = () => db.menu.filter((p) => p.tags.includes('best'));

/* ---------- Choix du mode : à emporter ou livraison ---------- */
function modeSwitch(where = '') {
  if (!deliveryOn()) return `<div class="pickup-info ${where}">${icon('bag')}<span><b>À emporter</b><small>Prête en ${S().prepMinutes} min · ${esc(S().address)}</small></span></div>`;
  return `<div class="modesw ${where}" role="radiogroup" aria-label="Mode de commande">
    <button type="button" role="radio" data-mode="emporter" aria-checked="${cart.mode === 'emporter'}" class="${cart.mode === 'emporter' ? 'on' : ''}">${icon('bag')}<span><b>À emporter</b><small>Prête en ${S().prepMinutes} min</small></span></button>
    <button type="button" role="radio" data-mode="livraison" aria-checked="${cart.mode === 'livraison'}" class="${cart.mode === 'livraison' ? 'on' : ''}">${icon('bike')}<span><b>Livraison</b><small>En ${S().deliveryMinutes} min</small></span></button>
  </div>`;
}
function bindModeSwitch(root = document, after) {
  $$('[data-mode]', root).forEach((b) => (b.onclick = () => {
    cart.mode = b.dataset.mode; saveCart();
    $$('[data-mode]', root).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', String(x === b)); });
    $$('[data-zipbox]', root).forEach((z) => { z.hidden = cart.mode !== 'livraison'; });
    refreshCartUI();
    if (after) after();
  }));
}
function zipBox() {
  if (!deliveryOn()) return '';
  return `<div class="zipbox" data-zipbox ${cart.mode === 'livraison' ? '' : 'hidden'}>
    <label class="zip-f">${icon('pin')}<input name="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" placeholder="Votre code postal" value="${esc(cart.zip)}" aria-label="Code postal de livraison"></label>
    <p class="zip-msg" data-zipmsg>${zipMsg(cart.zip)}</p>
  </div>`;
}
function zipMsg(zip) {
  if (!zip) return `Nous livrons ${S().zones.map((z) => z.zip).join(', ')}.`;
  if (!/^\d{5}$/.test(zip)) return 'Code postal à 5 chiffres.';
  const z = zoneFor(zip);
  return z ? `<b class="ok">${icon('check')}Nous livrons ${esc(z.label)}</b>, frais ${esc(eur(z.fee))}, offerts dès ${esc(eur(S().freeDeliveryFrom))}.` : `<b class="ko">${icon('alert')}Pas encore de livraison au ${esc(zip)}</b> : commandez à emporter, c’est prêt en ${S().prepMinutes} min.`;
}
function bindZip(root = document) {
  $$('[data-zipbox] input', root).forEach((i) => (i.oninput = () => {
    cart.zip = i.value.replace(/\D/g, '').slice(0, 5); i.value = cart.zip; saveCart();
    $$('[data-zipmsg]', root).forEach((m) => { m.innerHTML = zipMsg(cart.zip); });
    if (typeof renderCartPanel === 'function') renderCartPanel();
  }));
}

/* ---------- Accueil ---------- */
const MARQUEE = ['Pizzas', 'French tacos', 'Kebab', 'Burgers', 'Plats maison', 'Viandes halal', 'À emporter'];
function marqueeHTML(cls = '') {
  const run = MARQUEE.map((w) => `<span>${esc(w)}</span>${STAR}`).join('');
  return `<div class="marquee ${cls}" aria-hidden="true"><div class="marquee-in">${run}${run}${run}</div></div>`;
}
function pageHome() {
  const s = S();
  const cats = CATEGORIES.filter(([c]) => live().some((p) => p.cat === c) && !['boissons'].includes(c));
  // photo de chaque catégorie : le plat prévu, sinon le premier plat de la catégorie qui a une photo
  const want = { pizzas: 'pizza-reine', tacos: 'tacos', sandwichs: 'burger', plats: 'assiette-kebab', cote: 'frites', desserts: 'tiramisu' };
  const catPhoto = Object.fromEntries(cats.map(([c]) => [c, PHOTO_SET.has(want[c]) ? want[c] : (db.menu.find((p) => p.cat === c && PHOTO_SET.has(p.id)) || { id: want[c] || '' }).id]));
  const count = (c) => db.menu.filter((p) => p.cat === c).length;
  const spin = PHOTO_SET.has('pizza-spin') ? `<img class="spin" src="/img/pizza-spin-900.webp" srcset="/img/pizza-spin-520.webp 520w, /img/pizza-spin-900.webp 900w" sizes="(max-width: 700px) 70vw, 620px" alt="Pizza Reine vue de dessus" width="900" height="900" fetchpriority="high" decoding="async">` : '';
  const html = `
  <section class="hero">
    <div class="wrap hero-in">
      <div class="hero-copy">
        <div class="mob-status">${statusPill()}</div>
        <p class="hand">Depuis ${s.since}, rue du Palais Gallien</p>
        <h1 class="hero-title"><span>Pizzas, tacos</span> <span class="hl">&amp; plats maison</span> <span class="ol">à Bordeaux</span></h1>
        <p class="hero-sub">${fr(deliveryOn() ? 'Pâte pétrie chaque matin, viandes halal, frites coupées sur place. À emporter en 20 minutes ou livré chez vous.' : 'Pâte pétrie chaque matin, viandes halal, frites coupées sur place. Commandez en ligne : c’est prêt en 20 minutes.')}</p>
        <div class="order-card">${modeSwitch()}${zipBox()}<a class="btn btn-primary btn-lg btn-block" href="/carte">Commander maintenant${icon('arrowR')}</a></div>
        <ul class="trust"><li>${icon('shield')}Viandes halal</li><li>${icon('chef')}Fait maison</li><li>${icon('timer')}Prête en ${s.prepMinutes} min</li><li>${icon('card')}Paiement sécurisé</li></ul>
      </div>
      <div class="hero-art">
        <div class="spin-ring" aria-hidden="true"></div>
        <div class="spin-wrap">${spin || photo('hero-pizza', { size: 1200, alt: 'Pizza sortant du four', eager: true })}</div>
        <span class="sticker s1" aria-hidden="true">100 %<br>halal</span>
        <span class="sticker s2" aria-hidden="true">Cuite<br>minute</span>
        <p class="hand-note" aria-hidden="true">La Reine, notre best-seller${SCRIBBLE_ARROW}</p>
      </div>
    </div>
  </section>
  ${marqueeHTML()}
  ${againHTML()}
  <section class="sec best"><div class="wrap">
    <div class="sec-hd"><div><p class="eyebrow">Les incontournables</p><h2 class="big-title">Les plus <span class="ol">commandés</span></h2></div><a class="more" href="/carte">Toute la carte${icon('arrowR')}</a></div>
    <div class="rail-wrap"><button type="button" class="rail-btn prev" data-rail-prev aria-label="Plats précédents" disabled>${icon('chevL')}</button><div class="rail" data-rail>${bestSellers().map(productCard).join('')}</div><button type="button" class="rail-btn next" data-rail-next aria-label="Plats suivants">${icon('chevR')}</button></div>
  </div></section>

  <section class="sec sec-cats dark"><div class="wrap">
    <div class="sec-hd"><div><p class="eyebrow">La carte</p><h2 class="big-title">Envie <span class="ol">de quoi ?</span></h2></div><a class="more light" href="/carte">Voir tout${icon('arrowR')}</a></div>
    <div class="cats">${cats.map(([c, name, sub], i) => `<a class="cat-tile ${i === 0 ? 'xl' : ''}" href="/carte#${c}">${photo(catPhoto[c] || '', { alt: '', size: i === 0 ? 1200 : 640 })}<span class="cat-t"><b>${esc(name)}</b><small>${esc(sub)}</small></span><em class="cat-n">${plural(count(c), 'recette')}${icon('arrowR')}</em></a>`).join('')}</div>
  </div></section>

  <section class="sec how"><div class="wrap">
    <div class="sec-hd center"><div><p class="eyebrow">Simple comme bonjour</p><h2 class="big-title">Commandez <span class="ol">en 2 minutes</span></h2></div></div>
    <ol class="steps">
      <li><span class="step-n">1</span><b>Choisissez</b><p>${fr('Votre pizza, votre tacos avec vos viandes et vos sauces, un menu pour le midi.')}</p></li>
      <li><span class="step-n">2</span><b>Payez en ligne</b><p>${fr('Carte bancaire, Apple Pay ou Google Pay. Ou réglez sur place si vous préférez.')}</p></li>
      <li><span class="step-n">3</span><b>Récupérez</b><p>${fr(deliveryOn() ? 'Suivez la préparation en direct : vous savez quand passer, ou quand le livreur arrive.' : 'Suivez la préparation en direct et passez au comptoir quand c’est prêt, sans attendre.')}</p></li>
    </ol>
  </div></section>

  <section class="deliv"><div class="deliv-photo">${photo('hero-pizza', { size: 1200, alt: '' })}</div><div class="wrap deliv-in">
    ${deliveryOn() ? `<div class="deliv-copy"><p class="eyebrow dark">Livraison</p><h2 class="big-title">Livré chaud,<br><span class="ol">chez vous</span></h2>
      <p>${fr(`En ${s.deliveryMinutes} minutes environ dans Bordeaux centre, les Chartrons, Caudéran, Saint-Jean et la Bastide. Offerte dès ${eur(s.freeDeliveryFrom)}, minimum ${eur(s.minDelivery)}.`)}</p>
      <ul class="zones">${s.zones.map((z) => `<li><b>${esc(z.zip)}</b><span>${esc(z.label)}</span><em>${esc(eur(z.fee))}</em></li>`).join('')}</ul>
      <a class="btn btn-dark btn-lg" href="/carte">${icon('bike')}Me faire livrer</a></div>`
    : `<div class="deliv-copy"><p class="eyebrow dark">À emporter</p><h2 class="big-title">Prête en ${s.prepMinutes} min,<br><span class="ol">sans attendre</span></h2>
      <p>${fr(`Commandez en ligne ou depuis l’application, choisissez l’heure : votre commande vous attend au comptoir, ${s.address}. Payez en ligne ou sur place.`)}</p>
      <ul class="zones perks"><li><b>${s.prepMinutes} min</b><span>Prête en ${s.prepMinutes} minutes environ, cuite minute</span></li><li><b>Horaire</b><span>Choisissez votre heure de retrait, même à l’avance</span></li><li><b>Suivi</b><span>Vous savez en direct quand c’est prêt</span></li><li><b>Comptoir</b><span>${esc(s.address)} : pas de file d’attente</span></li></ul>
      <a class="btn btn-dark btn-lg" href="/carte">${icon('bag')}Commander à emporter</a></div>`}
  </div></section>

  <section class="sec"><div class="wrap info-grid">
    <div class="info-card"><p class="eyebrow">Horaires</p><h2>On vous attend</h2><ul class="hours">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<li class="${new Date().getDay() === d ? 'today' : ''}"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><span>${esc(hoursText(d))}</span></li>`).join('')}</ul></div>
    <div class="info-card map-card"><p class="eyebrow">Adresse</p><h2>Au pied du Palais Gallien</h2><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p class="muted">${fr('À deux pas du Jardin public et des Chartrons, tram C arrêt Jardin public.')}</p>${mapArt()}<a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a></div>
  </div></section>

  ${seoHomeHTML()}
  <section class="cta-band"><div class="wrap cta-in"><h2 class="mega">Une petite <span>faim ?</span></h2><div class="cta-side"><p>${fr('Commandez maintenant : c’est prêt en 20 minutes.')}</p><a class="btn btn-primary btn-lg" href="/carte">${icon('bag')}Commander</a></div></div></section>`;
  return page(html, { active: 'accueil' });
}
function mapArt() {
  return `<svg class="map-art" viewBox="0 0 400 190" aria-hidden="true"><rect width="400" height="190" rx="18" fill="#F3E8DA"/><path d="M-10 150 C80 120 140 170 230 130 S360 90 420 110" stroke="#D9E4E8" stroke-width="26" fill="none"/><g stroke="#FFFFFF" stroke-width="9" fill="none" stroke-linecap="round"><path d="M20 40 L380 60"/><path d="M60 -10 L110 200"/><path d="M250 -10 L210 200"/><path d="M20 100 L380 90"/></g><circle cx="300" cy="44" r="26" fill="#DCE8C8"/><text x="300" y="48" font-size="10" text-anchor="middle" fill="#6d7f4f" font-family="Inter, sans-serif">Jardin public</text><g transform="translate(168 58)"><circle r="30" fill="#E2432A" opacity=".15"/><path d="M0 18s16-14 16-26a16 16 0 0 0-32 0c0 12 16 26 16 26z" fill="#E2432A"/><circle cy="-8" r="6" fill="#FFF7EA"/></g></svg>`;
}
function mountHome() {
  bindModeSwitch(); bindZip(); bindRails();
  const ag = $('[data-again-last]');
  if (ag) ag.onclick = () => { const o = orderById(ag.dataset.againLast); if (o) reorder(o); };
}
/** Dernière commande terminée de cet appareil : on propose de la refaire en un geste. */
function againHTML() {
  const last = myOrders().find((o) => o.status === 'terminee');
  if (!last || cart.lines.length) return '';
  const c = lsGet(CLIENT_KEY) || {};
  const names = orderLines(last).map((l) => (l.qty > 1 ? l.qty + ' × ' : '') + l.name).join(', ');
  return `<section class="again"><div class="wrap"><div class="again-card">
    <div class="again-img">${photo(last.lines[0].productId, { alt: '' })}</div>
    <div class="again-t"><b>${c.firstName ? `Bon retour, ${esc(c.firstName)} !` : 'Bon retour !'}</b><small>Votre dernière commande : ${esc(names)} · ${esc(eur(last.total))}</small></div>
    <button type="button" class="btn btn-dark" data-again-last="${esc(last.id)}">${icon('refresh')}Recommander</button>
  </div></div></section>`;
}
/** Remet dans le panier les plats d'une commande (sauf ceux en rupture) et ouvre le panier. */
function reorder(o) {
  let skipped = 0;
  for (const l of o.lines) { const p = product(l.productId); if (p && p.available !== false) addToCart(p, l.choice, l.qty, l.note); else skipped++; }
  refreshCartUI();
  toast(skipped ? 'Commande ajoutée au panier, sauf un plat épuisé.' : 'Commande ajoutée au panier.', skipped ? 'warn' : 'ok');
  openCart();
}
/** Flèches des bandeaux qui défilent (ordinateur) : elles disparaissent aux extrémités. */
function bindRails(root = document) {
  $$('.rail-wrap', root).forEach((w) => {
    const rail = $('[data-rail]', w); const prev = $('[data-rail-prev]', w); const next = $('[data-rail-next]', w);
    const upd = () => { prev.disabled = rail.scrollLeft < 30; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 30; };
    const step = () => Math.max(260, rail.clientWidth * 0.8);
    prev.onclick = () => rail.scrollBy({ left: -step(), behavior: REDUCED ? 'auto' : 'smooth' });
    next.onclick = () => rail.scrollBy({ left: step(), behavior: REDUCED ? 'auto' : 'smooth' });
    rail.addEventListener('scroll', upd, { passive: true });
    upd();
  });
}

/* ---------- La carte ---------- */
const menuUi = { q: '', f: '' };
let carteScroll = null;
function pageCarte() {
  const cats = CATEGORIES.filter(([c]) => db.menu.some((p) => p.cat === c));
  const html = `
  <div class="carte-top"><div class="wrap">
    <div class="carte-hd"><div><div class="mob-status">${statusPill()}</div><p class="eyebrow">Commande en ligne</p><h1>La carte</h1><p class="muted">${fr('Toutes nos viandes sont halal. Prix TTC, TVA incluse.')}</p></div>${modeSwitch('compact')}</div>
    ${zipBox()}
  </div></div>
  <nav class="catnav" aria-label="Catégories"><div class="wrap catnav-in" data-catnav>
    ${cats.map(([c, n], i) => `<a href="#${c}" data-cat="${c}" class="${i ? '' : 'on'}">${esc(n)}</a>`).join('')}
  </div></nav>
  <div class="wrap carte-layout"><div class="carte">
    <div class="carte-tools">
      <label class="search">${icon('search')}<input type="search" data-q placeholder="Rechercher un plat, une sauce…" value="${esc(menuUi.q)}" aria-label="Rechercher dans la carte"></label>
      <div class="chips" role="group" aria-label="Filtres">${[['', 'Tout'], ['veggie', 'Végétarien'], ['spicy', 'Épicé'], ['best', 'Les plus commandés']].map(([k, l]) => `<button type="button" class="chip ${menuUi.f === k ? 'on' : ''}" data-f="${k}">${esc(l)}</button>`).join('')}</div>
    </div>
    ${cats.map(([c, n, sub]) => `<section class="cat-sec" id="${c}" data-sec="${c}"><div class="cat-sec-hd"><h2>${esc(n)}</h2><p>${esc(sub)}</p></div><div class="pgrid">${db.menu.filter((p) => p.cat === c).map(productCard).join('')}</div></section>`).join('')}
    <p class="empty" data-empty hidden>${icon('search')}Aucun plat ne correspond. <button type="button" class="link" data-reset>Tout afficher</button></p>
  </div>${cartPanelHTML()}</div>`;
  return page(html, { active: 'carte' });
}
function mountCarte() {
  bindModeSwitch(); bindZip(); renderCartPanel();
  const apply = () => {
    const q = menuUi.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let n = 0;
    $$('.pcard').forEach((c) => {
      const p = product(c.dataset.p);
      const txt = (p.name + ' ' + p.desc + ' ' + catName(p.cat)).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const show = (!q || txt.includes(q)) && (!menuUi.f || p.tags.includes(menuUi.f));
      c.hidden = !show; if (show) n++;
    });
    $$('[data-sec]').forEach((s) => { s.hidden = !$$('.pcard', s).some((c) => !c.hidden); });
    $('[data-empty]').hidden = n > 0;
  };
  const qi = $('[data-q]');
  qi.oninput = () => { menuUi.q = qi.value; apply(); };
  $$('[data-f]').forEach((b) => (b.onclick = () => { menuUi.f = b.dataset.f; $$('[data-f]').forEach((x) => x.classList.toggle('on', x === b)); apply(); }));
  $('[data-reset]').onclick = () => { menuUi.q = ''; menuUi.f = ''; qi.value = ''; $$('[data-f]').forEach((x) => x.classList.toggle('on', !x.dataset.f)); apply(); };
  apply();
  // catégorie en cours, mise en avant dans la barre au fil du défilement
  const nav = $('[data-catnav]');
  const links = $$('[data-cat]', nav);
  links.forEach((a) => (a.onclick = (e) => { e.preventDefault(); const t = document.getElementById(a.dataset.cat); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130, behavior: REDUCED ? 'auto' : 'smooth' }); }));
  // catégorie en cours : la dernière dont le titre est passé sous la barre (la première en haut de page)
  const secs = $$('[data-sec]');
  let raf = 0, cur = null;
  const pick = () => {
    raf = 0;
    if (!nav.isConnected) { window.removeEventListener('scroll', onScroll); return; }
    let s = secs.find((x) => !x.hidden) || secs[0];
    for (const x of secs) if (!x.hidden && x.getBoundingClientRect().top <= 180) s = x;
    if (!s || s === cur) return;
    cur = s;
    links.forEach((a) => a.classList.toggle('on', a.dataset.cat === s.dataset.sec));
    const on = links.find((a) => a.classList.contains('on'));
    if (on) nav.scrollTo({ left: on.offsetLeft - 16, behavior: REDUCED ? 'auto' : 'smooth' });
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
  window.removeEventListener('scroll', carteScroll);
  carteScroll = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  pick();
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130 }), 60); }
}

/* ---------- Fiche produit : options, quantité, précision ---------- */
function openProduct(id, { editLine } = {}) {
  const p = product(id);
  if (!p) return;
  if (p.available === false) { toast(`${p.name} est épuisé pour le moment.`, 'warn'); return; }
  const line = editLine && cart.lines.find((l) => l.id === editLine);
  const choice = line ? JSON.parse(JSON.stringify(line.choice)) : defaultChoice(p);
  let qty = line ? line.qty : 1;
  const groupHTML = (gid) => {
    const g = group(gid);
    const max = groupMax(g, choice);
    const sel = choice[gid] || [];
    const hint = g.type === 'one' ? (g.required ? 'Obligatoire' : 'Facultatif') : g.min ? `${sel.length}/${max} · au moins ${g.min}` : `${sel.length}/${max} · facultatif`;
    return `<fieldset class="og ${groupVisible(g, choice) ? '' : 'hidden'}" data-g="${gid}"><legend><b>${esc(g.label)}</b><small data-hint>${esc(hint)}</small></legend>
      <div class="og-items">${g.items.map(([oid, label, price]) => `<button type="button" class="opt ${sel.includes(oid) ? 'on' : ''}" data-o="${oid}" aria-pressed="${sel.includes(oid)}"><span class="opt-box ${g.type === 'one' ? 'round' : ''}">${icon('check')}</span><span class="opt-l">${esc(label)}</span>${price ? `<span class="opt-p">+${esc(eur(price))}</span>` : ''}</button>`).join('')}</div></fieldset>`;
  };
  const body = `<div class="pd">
    <div class="pd-img ${PHOTO_SET.has(p.id) ? '' : 'noimg'}">${photo(p.id, { size: 1200, alt: p.name, eager: true })}</div>
    <div class="pd-in">
      <div class="pd-tags">${p.tags.map(tagHTML).join('')}</div>
      <h2>${esc(p.name)}</h2>
      <p class="pd-desc">${esc(fr(p.desc))}</p>
      <div data-groups>${p.options.map(groupHTML).join('')}</div>
      <label class="pd-note"><span>Une précision pour la cuisine ?</span><textarea rows="2" maxlength="140" data-note placeholder="Par exemple : bien cuite, sauce à part">${esc(line ? line.note : '')}</textarea></label>
    </div></div>`;
  const foot = `<div class="qty">${'<button type="button" data-qm aria-label="Retirer une unité">' + icon('minus') + '</button>'}<b data-qty>${qty}</b>${'<button type="button" data-qp aria-label="Ajouter une unité">' + icon('plus') + '</button>'}</div><button type="button" class="btn btn-primary btn-lg pd-add" data-add></button>`;
  openSheet({ cls: 'pd-sheet', body, foot, onMount: (el, close) => {
    const draw = () => {
      $('[data-qty]', el).textContent = qty;
      const miss = missingChoice(p, choice);
      const btn = $('[data-add]', el);
      btn.innerHTML = miss ? `<span>${esc(miss.msg)}</span>` : `<span>${line ? 'Mettre à jour' : 'Ajouter'}</span><b>${esc(eur(unitPrice(p, choice) * qty))}</b>`;
      btn.classList.toggle('muted', !!miss);
      $$('[data-g]', el).forEach((fs) => {
        const g = group(fs.dataset.g);
        fs.classList.toggle('hidden', !groupVisible(g, choice));
        const sel = choice[fs.dataset.g] || [];
        const max = groupMax(g, choice);
        $('[data-hint]', fs).textContent = g.type === 'one' ? (g.required ? 'Obligatoire' : 'Facultatif') : g.min ? `${sel.length}/${max} · au moins ${g.min}` : `${sel.length}/${max} · facultatif`;
        $$('[data-o]', fs).forEach((b) => { const on = sel.includes(b.dataset.o); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.classList.toggle('dim', g.type !== 'one' && !on && sel.length >= max); });
      });
    };
    $$('[data-g]', el).forEach((fs) => $$('[data-o]', fs).forEach((b) => (b.onclick = () => {
      const gid = fs.dataset.g; const g = group(gid); const oid = b.dataset.o;
      let sel = choice[gid] || [];
      if (g.type === 'one') sel = [oid];
      else if (sel.includes(oid)) sel = sel.filter((x) => x !== oid);
      else if (sel.length < groupMax(g, choice)) sel = sel.concat(oid);
      else if (groupMax(g, choice) === 1) sel = [oid];
      else { toast(`${g.label} : ${groupMax(g, choice)} au maximum.`, 'warn'); return; }
      choice[gid] = sel;
      // taille du tacos plus petite : on garde les premières viandes choisies
      for (const [k, gg] of Object.entries(OPTION_GROUPS)) if (gg.maxFrom && choice[k]) choice[k] = choice[k].slice(0, groupMax(gg, choice));
      draw();
    })));
    $('[data-qm]', el).onclick = () => { qty = Math.max(1, qty - 1); draw(); };
    $('[data-qp]', el).onclick = () => { qty = Math.min(20, qty + 1); draw(); };
    $('[data-add]', el).onclick = () => {
      const miss = missingChoice(p, choice);
      if (miss) { const fs = $(`[data-g="${miss.gid}"]`, el); if (fs) { fs.classList.remove('shake'); void fs.offsetWidth; fs.classList.add('shake'); fs.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return; }
      const note = $('[data-note]', el).value.trim();
      if (line) { cart.lines = cart.lines.filter((l) => l.id !== line.id); }
      addToCart(p, JSON.parse(JSON.stringify(choice)), qty, note);
      close();
      toast(line ? 'Panier mis à jour.' : `${p.name} ajouté au panier.`, 'ok');
      refreshCartUI();
      if (line) openCart();
    };
    draw();
  } });
}

/* ---------- Pages spécialités (rédigées pour Google) ---------- */
function pageSeo(p) {
  const items = db.menu.filter(p.filter);
  const html = `
  <section class="seo-hero"><div class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>${esc(p.crumb)}</b></nav>
    <h1>${esc(fr(p.h1))}</h1>
    <p class="lead">${esc(fr(p.lead))}</p>
    <div class="seo-facts">${p.facts.map((f) => `<span>${icon('check')}${esc(fr(f))}</span>`).join('')}</div>
  </div></section>
  ${items.length ? `<section class="sec"><div class="wrap"><div class="sec-hd"><h2>${esc(p.itemsTitle)}</h2><a class="more" href="/carte">Toute la carte${icon('arrowR')}</a></div><div class="pgrid">${items.map(productCard).join('')}</div></div></section>` : ''}
  <section class="sec"><div class="wrap prose">${p.sections.map(([h, t]) => `<h2>${esc(fr(h))}</h2>${t.map((x) => `<p>${fr(x)}</p>`).join('')}`).join('')}
    ${p.faq ? `<h2>Questions fréquentes</h2><div class="faq">${p.faq.map(([q, a]) => `<details><summary>${esc(fr(q))}</summary><p>${fr(a)}</p></details>`).join('')}</div>` : ''}
  </div></section>
  <section class="cta-band"><div class="wrap cta-in"><div><h2>${esc(fr(p.cta || 'On s’occupe de tout'))}</h2><p>${fr(deliveryOn() ? 'Commande en ligne en deux minutes, à emporter ou livrée.' : 'Commande en ligne en deux minutes, prête en 20 minutes.')}</p></div><a class="btn btn-light btn-lg" href="/carte">${icon('bag')}Commander</a></div></section>`;
  return page(html, { active: p.active || '' });
}

/* ---------- Infos et horaires ---------- */
function pageInfos() {
  const p = SEO_PAGES.find((x) => x.path === '/infos');
  const s = S();
  const html = `
  <section class="seo-hero"><div class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Infos et horaires</b></nav>
    <h1>Infos pratiques et horaires</h1>
    <p class="lead">${esc(fr(p.lead))}</p>
  </div></section>
  <section class="sec"><div class="wrap info-grid four">
    <div class="info-card"><h2>Horaires</h2><ul class="hours">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<li class="${new Date().getDay() === d ? 'today' : ''}"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><span>${esc(hoursText(d))}</span></li>`).join('')}</ul><p class="muted small">${fr('Commande en ligne possible à l’avance pour un créneau à venir.')}</p></div>
    <div class="info-card map-card"><h2>Adresse</h2><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p class="muted">${esc(fr(s.quarter))}</p>${mapArt()}<a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a></div>
    ${deliveryOn() ? '' : `<div class="info-card"><h2>À emporter</h2><p>${fr(`Commandez en ligne, votre commande est prête en ${s.prepMinutes} minutes environ. Vous pouvez aussi choisir l’heure de retrait, même pour le lendemain.`)}</p><p class="muted small">${fr('Donnez votre numéro de commande au comptoir : elle vous attend.')}</p><a class="btn btn-primary" href="/carte">${icon('bag')}Commander</a></div>`}
    <div class="info-card" ${deliveryOn() ? '' : 'hidden'}><h2>Livraison</h2><ul class="zones small">${s.zones.map((z) => `<li><b>${esc(z.zip)}</b><span>${esc(z.label)}</span><em>${esc(eur(z.fee))}</em></li>`).join('')}</ul><p class="muted small">${fr(`Minimum ${eur(s.minDelivery)} de commande, livraison offerte dès ${eur(s.freeDeliveryFrom)}.`)}</p></div>
    <div class="info-card"><h2>Paiement</h2><p>${fr(deliveryOn() ? 'En ligne par carte bancaire, Apple Pay ou Google Pay. Sur place ou à la livraison : espèces, carte, titres-restaurant.' : 'En ligne par carte bancaire, Apple Pay ou Google Pay. Au comptoir : espèces, carte, titres-restaurant.')}</p><h2 class="mt">Allergènes</h2><p>${fr('Une allergie ? Précisez-la dans votre commande et demandez conseil au comptoir.')}</p><button type="button" class="link" data-doc="allergenes">Voir les allergènes</button></div>
  </div></section>
  <section class="sec"><div class="wrap prose">${p.sections.map(([h, t]) => `<h2>${esc(fr(h))}</h2>${t.map((x) => `<p>${fr(x)}</p>`).join('')}`).join('')}
    <h2>Questions fréquentes</h2><div class="faq">${p.faq.map(([q, a]) => `<details><summary>${esc(fr(q))}</summary><p>${fr(a)}</p></details>`).join('')}</div></div></section>`;
  return page(html, { active: 'infos' });
}

/* ---------- Mes commandes (sur cet appareil) ---------- */
function pageMesCommandes() {
  const mine = (lsGet(CLIENT_KEY) || {}).orders || [];
  const list = mine.map(orderById).filter(Boolean);
  const html = `<div class="wrap narrow pagepad">
    <h1>Mes commandes</h1>
    <p class="muted">${fr('Les commandes passées depuis cet appareil. Suivez-les ou recommandez en un clic.')}</p>
    ${list.length ? `<div class="olist">${list.map((o) => `<a class="orow" href="/suivi/${esc(o.id)}"><span class="orow-n">N° ${esc(o.number)}</span><span class="orow-m"><b>${esc(orderLines(o).map((l) => (l.qty > 1 ? l.qty + ' × ' : '') + l.name).join(', '))}</b><small>${esc(dayLabel(new Date(o.createdAt)))} à ${esc(hm(new Date(o.createdAt)))} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'} · ${esc(eur(o.total))}</small></span><span class="badge b-${o.status}">${esc(STATUS[o.status][0])}</span>${icon('chevR')}</a>`).join('')}</div>`
      : `<div class="empty-card">${icon('bag')}<p>Aucune commande pour le moment.</p><a class="btn btn-primary" href="/carte">Voir la carte</a></div>`}
  </div>`;
  return page(html, { active: 'commandes' });
}

function pageNotFound() {
  return page(`<div class="wrap narrow pagepad nf"><p class="kicker">Erreur 404</p><h1>Cette page n’existe pas</h1><p class="muted">${fr('Mais la carte, elle, est bien là.')}</p><a class="btn btn-primary btn-lg" href="/carte">Voir la carte</a></div>`);
}

/* =====================================================================
   PANIER, COMMANDE ET SUIVI
   ===================================================================== */
function cartLinesHTML(editable = true) {
  return cart.lines.map((l) => {
    const p = product(l.productId);
    if (!p) return '';
    const detail = choiceText(p, l.choice);
    return `<div class="cline" data-line="${esc(l.id)}">
      <div class="cline-img">${photo(p.id, { alt: '' })}</div>
      <div class="cline-b"><b>${esc(p.name)}</b>${detail ? `<small>${esc(detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}
        ${editable ? `<div class="cline-act"><div class="qty sm"><button type="button" data-lm aria-label="Retirer une unité">${icon(l.qty > 1 ? 'minus' : 'trash')}</button><b>${l.qty}</b><button type="button" data-lp aria-label="Ajouter une unité">${icon('plus')}</button></div>${p.options.length ? `<button type="button" class="link sm" data-edit>Modifier</button>` : ''}</div>` : `<small>Quantité : ${l.qty}</small>`}
      </div>
      <b class="cline-p">${esc(eur(l.unit * l.qty))}</b>
    </div>`;
  }).join('');
}
function totalsHTML(t) {
  return `<div class="tots">
    <div><span>Sous-total</span><b>${esc(eur(t.sub))}</b></div>
    ${t.discount ? `<div class="disc"><span>Code ${esc(t.promo.code)} (−${t.promo.pct} %)</span><b>−${esc(eur(t.discount))}</b></div>` : ''}
    ${cart.mode === 'livraison' ? `<div><span>Livraison${t.zone ? ` (${esc(t.zone.zip)})` : ''}</span><b>${t.zone ? (t.delivery ? esc(eur(t.delivery)) : 'Offerte') : 'Code postal ?'}</b></div>` : ''}
    <div class="tot"><span>Total TTC</span><b>${esc(eur(t.total))}</b></div>
  </div>`;
}
function upsellHTML() {
  const inCart = new Set(cart.lines.map((l) => l.productId));
  const ideas = ['canette', 'frites', 'tiramisu', 'cookie', 'milkshake', 'nuggets'].map(product).filter((p) => p && p.available !== false && !inCart.has(p.id)).slice(0, 4);
  if (!ideas.length) return '';
  return `<div class="upsell"><p class="upsell-h">Avec ça ?</p><div class="upsell-row">${ideas.map((p) => `<button type="button" class="up" data-open="${esc(p.id)}">${photo(p.id, { alt: '' })}<span>${esc(p.name)}</span><b>+${esc(eur(p.price))}</b></button>`).join('')}</div></div>`;
}
/** Contenu du panier : fenêtre (téléphone, bouton du panier) ou colonne fixe à droite de la carte (ordinateur). */
function cartBodyHTML({ panel = false } = {}) {
  const t = totals();
  if (!cart.lines.length) {
    return panel
      ? `<div class="cp-empty">${icon('bag')}<b>Votre panier est vide</b><p>${fr('Choisissez un plat : il s’ajoute ici, avec le total de votre commande.')}</p></div>`
      : `<div class="empty-card">${icon('bag')}<p>Votre panier est vide.</p><a class="btn btn-primary" href="/carte">Voir la carte</a></div>`;
  }
  return `${panel ? '' : modeSwitch('compact') + zipBox()}<div class="clines">${cartLinesHTML()}</div>${panel ? '' : upsellHTML()}
    <details class="promo" ${cart.promo ? 'open' : ''}><summary>${icon('gift')}Un code promo ?</summary><form class="promo-f" data-promo><input name="code" placeholder="Votre code" value="${esc(cart.promo || '')}" autocapitalize="characters" aria-label="Code promo"><button type="submit" class="btn btn-ghost sm">Appliquer</button></form><p class="muted small">${fr('Première commande en ligne : YANIS10.')}</p></details>
    ${totalsHTML(t)}`;
}
function cartFootHTML() {
  if (!cart.lines.length) return '';
  const t = totals();
  const blocked = cart.mode === 'livraison' && (!t.zone || t.missingMin > 0);
  return `${t.missingMin > 0 && t.zone ? `<p class="warn-line">${icon('info')}Encore ${esc(eur(t.missingMin))} pour être livré (minimum ${esc(eur(S().minDelivery))}).</p>` : ''}${cart.mode === 'livraison' && !t.zone ? `<p class="warn-line">${icon('pin')}Indiquez un code postal livré, ou passez à emporter.</p>` : ''}
    <a class="btn btn-primary btn-lg btn-block ${blocked ? 'disabled' : ''}" href="/commande" ${blocked ? 'aria-disabled="true" tabindex="-1"' : ''} data-go-checkout><span>Commander</span><b>${esc(eur(t.total))}</b></a>`;
}
/** Boutons du panier (quantités, modifier, code promo, suggestions), communs à la fenêtre et à la colonne. */
function bindCart(root, redraw) {
  const changed = () => { saveCart(); refreshCartUI(); redraw(); };
  bindModeSwitch(root, redraw);
  bindZip(root);
  $$('[data-zipbox] input', root).forEach((i) => i.addEventListener('change', redraw));
  const later = (fn) => { if (OPEN.size) { closeAll(); setTimeout(fn, 330); } else fn(); };
  $$('[data-line]', root).forEach((row) => {
    const l = cart.lines.find((x) => x.id === row.dataset.line);
    if (!l) return;
    $('[data-lm]', row).onclick = () => { l.qty -= 1; if (l.qty <= 0) cart.lines = cart.lines.filter((x) => x !== l); changed(); };
    $('[data-lp]', row).onclick = () => { l.qty = Math.min(20, l.qty + 1); changed(); };
    const ed = $('[data-edit]', row); if (ed) ed.onclick = () => later(() => openProduct(l.productId, { editLine: l.id }));
  });
  const pf = $('[data-promo]', root);
  if (pf) pf.onsubmit = (e) => {
    e.preventDefault();
    const code = pf.code.value.trim().toUpperCase();
    if (!code) { cart.promo = null; changed(); return; }
    if (!S().promos.some((x) => x.code === code)) { toast('Ce code n’existe pas.', 'warn'); return; }
    cart.promo = code; toast('Code appliqué.', 'ok'); changed();
  };
  $$('.upsell [data-open]', root).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); later(() => openProduct(b.dataset.open)); }));
  const go = $('[data-go-checkout]', root);
  if (go) go.addEventListener('click', (e) => { if (go.classList.contains('disabled')) { e.preventDefault(); e.stopPropagation(); } });
}
function openCart() {
  openSheet({ title: 'Votre panier', side: true, cls: 'cart-sheet', body: '', foot: ' ', onMount: (el, close) => {
    const draw = () => {
      $('.sheet-bd', el).innerHTML = cartBodyHTML();
      const ft = $('.sheet-ft', el);
      ft.innerHTML = cartFootHTML();
      ft.hidden = !cart.lines.length;
      bindCart(el, draw);
    };
    draw();
    el.addEventListener('click', (e) => { const a = e.target.closest('a[href]'); if (a && !a.classList.contains('disabled')) close(); });
  } });
}
function cartPanelHTML() {
  return `<aside class="cpanel" data-cartpanel aria-label="Votre panier"><div class="cpanel-in">
    <div class="cpanel-hd"><h2>Votre commande</h2><span class="cpanel-mode" data-cpmode></span></div>
    <div class="cpanel-bd" data-cpbd></div><div class="cpanel-ft" data-cpft></div>
  </div></aside>`;
}
function renderCartPanel() {
  const p = $('[data-cartpanel]');
  if (!p) return;
  $('[data-cpmode]', p).innerHTML = cart.mode === 'livraison' ? `${icon('bike')}Livraison` : `${icon('bag')}À emporter`;
  $('[data-cpbd]', p).innerHTML = cartBodyHTML({ panel: true });
  $('[data-cpft]', p).innerHTML = cartFootHTML();
  bindCart(p, renderCartPanel);
}

/* ---------- Page de commande ---------- */
function pageCommande() {
  if (!cart.lines.length) { setTimeout(() => go('/carte'), 0); return page(''); }
  const t = totals();
  const client = lsGet(CLIENT_KEY) || {};
  const sl = slots(cart.mode);
  const asapOk = openNow() && sl.length;
  const slotOpts = sl.slice(0, 60).map((d) => `<option value="${toISO(d)}" ${cart.when === toISO(d) ? 'selected' : ''}>${esc(dayLabel(d))}, ${esc(hm(d))}</option>`).join('');
  const html = `<div class="wrap co">
    <div class="co-main">
      <a class="back" href="/carte">${icon('chevL')}Retour à la carte</a>
      <h1>Finaliser la commande</h1>
      <form data-co novalidate>
        <section class="co-sec"><h2><span>1</span>${deliveryOn() ? 'Retrait ou livraison' : 'Retrait au comptoir'}</h2>${deliveryOn() ? modeSwitch() : ''}
          <div data-addr ${cart.mode === 'livraison' ? '' : 'hidden'}>
            <div class="grid2"><label class="f"><span>Adresse</span><input name="street" autocomplete="street-address" placeholder="Numéro et rue" value="${esc((client.address || {}).street || '')}"><em class="err-m"></em></label>
            <label class="f"><span>Code postal</span><input name="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" value="${esc(cart.zip || (client.address || {}).zip || '')}"><em class="err-m"></em></label></div>
            <label class="f"><span>Précisions pour le livreur</span><input name="info" placeholder="Code, étage, interphone" value="${esc((client.address || {}).info || '')}"></label>
          </div>
          <p class="co-where" data-where ${cart.mode === 'emporter' ? '' : 'hidden'}>${icon('pin')}À récupérer au ${esc(S().address)}, ${esc(S().city)}</p>
        </section>
        <section class="co-sec"><h2><span>2</span>Quand ?</h2>
          <div class="when">
            <label class="when-o ${asapOk ? '' : 'disabled'}"><input type="radio" name="when" value="asap" ${asapOk && cart.when === 'asap' ? 'checked' : ''} ${asapOk ? '' : 'disabled'}><span><b>Dès que possible</b><small data-asap>${asapOk ? `Environ ${cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes} min` : pausedNow() ? 'Commandes immédiates en pause' : 'Le restaurant est fermé'}</small></span></label>
            <label class="when-o"><input type="radio" name="when" value="slot" ${!asapOk || cart.when !== 'asap' ? 'checked' : ''}><span><b>Programmer</b><select name="slot" aria-label="Créneau">${slotOpts || '<option value="">Aucun créneau</option>'}</select></span></label>
          </div>
        </section>
        <section class="co-sec"><h2><span>3</span>Vos coordonnées</h2>
          <div class="grid2"><label class="f"><span>Prénom</span><input name="firstName" autocomplete="given-name" value="${esc(client.firstName || '')}"><em class="err-m"></em></label><label class="f"><span>Nom</span><input name="lastName" autocomplete="family-name" value="${esc(client.lastName || '')}"><em class="err-m"></em></label></div>
          <div class="grid2"><label class="f"><span>Téléphone</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(client.phone || '')}"><em class="err-m"></em></label><label class="f"><span>Email (reçu et suivi)</span><input name="email" type="email" inputmode="email" autocomplete="email" value="${esc(client.email || '')}"><em class="err-m"></em></label></div>
        </section>
        <section class="co-sec"><h2><span>4</span>Paiement</h2>
          <div class="pay">
            <label class="pay-o"><input type="radio" name="pay" value="carte" checked><span>${icon('card')}<b>Carte bancaire en ligne</b><small>CB, Visa, Mastercard, Apple Pay, Google Pay</small></span></label>
            <label class="pay-o"><input type="radio" name="pay" value="sur-place"><span>${icon('cash')}<b data-paylbl>${cart.mode === 'livraison' ? 'À la livraison' : 'Sur place'}</b><small>Espèces, carte ou titres-restaurant</small></span></label>
          </div>
          <p class="demo-note">${icon('info')}Démonstration : la commande n’est pas transmise au restaurant et aucun paiement n’est débité.</p>
        </section>
      </form>
    </div>
    <aside class="co-side"><div class="co-card">
      <h2>Récapitulatif</h2>
      <div class="clines">${cartLinesHTML(false)}</div>
      <div data-tots>${totalsHTML(t)}</div>
      <button type="button" class="btn btn-primary btn-lg btn-block" data-pay><span>Commander et payer</span><b data-total>${esc(eur(t.total))}</b></button>
      <p class="muted small center">${icon('lock')}Paiement sécurisé</p>
    </div></aside>
  </div>`;
  return page(html, { footer: false, bar: false, live: false });
}
function mountCommande() {
  const f = $('[data-co]');
  if (!f) return;
  const redraw = () => {
    const t = totals();
    $('[data-tots]').innerHTML = totalsHTML(t);
    $('[data-total]').textContent = eur(t.total);
    $('[data-addr]').hidden = cart.mode !== 'livraison';
    $('[data-where]').hidden = cart.mode !== 'emporter';
    $('[data-paylbl]').textContent = cart.mode === 'livraison' ? 'À la livraison' : 'Sur place';
    const asap = $('[data-asap]'); if (asap && openNow()) asap.textContent = `Environ ${cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes} min`;
    const sl = slots(cart.mode);
    const sel = f.slot; const cur = sel.value;
    sel.innerHTML = sl.slice(0, 60).map((d) => `<option value="${toISO(d)}">${esc(dayLabel(d))}, ${esc(hm(d))}</option>`).join('') || '<option value="">Aucun créneau</option>';
    if ([...sel.options].some((o) => o.value === cur)) sel.value = cur;
  };
  bindModeSwitch(document, redraw);
  f.zip.addEventListener('input', () => { f.zip.value = f.zip.value.replace(/\D/g, '').slice(0, 5); cart.zip = f.zip.value; saveCart(); redraw(); });
  f.slot.addEventListener('change', () => { f.querySelector('[name=when][value=slot]').checked = true; });
  $('[data-pay]').onclick = () => {
    const v = (n) => (f[n] ? f[n].value.trim() : '');
    const errs = {};
    for (const n of ['firstName', 'phone']) if (!v(n)) errs[n] = 'Obligatoire.';
    if (v('phone') && v('phone').replace(/\D/g, '').length < 10) errs.phone = 'Numéro incomplet.';
    if (v('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errs.email = 'Email invalide.';
    const t = totals();
    if (cart.mode === 'livraison') {
      if (!v('street')) errs.street = 'Indiquez l’adresse.';
      if (!zoneFor(v('zip'))) errs.zip = 'Code postal non livré.';
      else if (t.missingMin > 0) { toast(`Minimum ${eur(S().minDelivery)} pour la livraison : il manque ${eur(t.missingMin)}.`, 'warn'); return; }
    }
    const whenSlot = f.querySelector('[name=when]:checked')?.value === 'slot' || !openNow();
    if (whenSlot && !f.slot.value) { toast('Aucun créneau disponible pour le moment.', 'warn'); return; }
    $$('.f', f).forEach((l) => l.classList.remove('err'));
    for (const [n, m] of Object.entries(errs)) { const i = f[n]; if (i) { const l = i.closest('.f'); l.classList.add('err'); $('.err-m', l).textContent = m; } }
    if (Object.keys(errs).length) { const first = $('.f.err', f); first.scrollIntoView({ behavior: 'smooth', block: 'center' }); toast('Vérifiez les champs signalés.', 'warn'); return; }
    const payment = f.querySelector('[name=pay]:checked').value;
    const client = { firstName: v('firstName'), lastName: v('lastName'), phone: v('phone'), email: v('email').toLowerCase(), address: cart.mode === 'livraison' ? { street: v('street'), zip: v('zip'), city: 'Bordeaux', info: v('info') } : (lsGet(CLIENT_KEY) || {}).address };
    const place = () => {
      sync();
      const due = whenSlot ? new Date(f.slot.value) : addMin(new Date(), cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes);
      const o = {
        id: uid('o'), number: orderNumber(), createdAt: new Date().toISOString(), status: 'recue', history: [{ st: 'recue', at: new Date().toISOString() }], auto: true,
        mode: cart.mode, when: whenSlot ? 'slot' : 'asap', due: due.toISOString(),
        customer: { firstName: client.firstName, lastName: client.lastName, phone: client.phone, email: client.email },
        address: cart.mode === 'livraison' ? client.address : null,
        lines: cart.lines.map((l) => ({ id: l.id, productId: l.productId, choice: l.choice, qty: l.qty, note: l.note, unit: l.unit, detail: choiceText(product(l.productId), l.choice) })),
        promo: t.promo ? t.promo.code : null, discount: t.discount, delivery: t.delivery, total: t.total, payment, paid: payment === 'carte', channel: 'En ligne', demo: false,
      };
      db.orders.unshift(o); save();
      const mine = lsGet(CLIENT_KEY) || {};
      lsSet(CLIENT_KEY, { ...mine, ...client, orders: [o.id].concat(mine.orders || []).slice(0, 30) });
      cart.lines = []; cart.promo = null; saveCart();
      go('/suivi/' + o.id);
    };
    if (payment === 'carte') {
      openSheet({ cls: 'paying', body: `<div class="pay-anim"><div class="spin"></div><b>Paiement sécurisé en cours…</b><p class="muted small">${eur(t.total)} · démonstration, rien n’est débité</p></div>`, onMount: (el, close) => setTimeout(() => { close(); place(); }, 1400) });
    } else place();
  };
}

/* ---------- Suivi de commande ---------- */
function pageSuivi(id) {
  const o = orderById(id);
  if (!o) return pageNotFound();
  const flow = FLOW(o);
  const i = o.status === 'annulee' ? -1 : flow.indexOf(o.status);
  const due = new Date(o.due);
  const lines = orderLines(o);
  const headline = o.status === 'annulee' ? 'Commande annulée' : o.status === 'terminee' ? (o.mode === 'livraison' ? 'Commande livrée' : 'Commande récupérée') : o.status === 'prete' ? 'Votre commande est prête !' : o.status === 'livraison' ? 'Votre livreur arrive' : o.status === 'preparation' ? 'On prépare votre commande' : 'Commande reçue, merci !';
  const html = `<div class="wrap narrow pagepad suivi" data-suivi="${esc(o.id)}">
    <div class="track-card st-${o.status}">
      <p class="kicker">Commande n° ${esc(o.number)} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'}</p>
      <h1>${esc(headline)}</h1>
      ${['terminee', 'annulee'].includes(o.status) ? '' : `<p class="eta">${icon('clock')}${o.mode === 'livraison' ? 'Livraison prévue vers' : 'Prête vers'} <b>${esc(hm(due))}</b>${sameDay(due, new Date()) ? '' : ` (${esc(dayLabel(due))})`}</p>`}
      ${o.status === 'annulee' ? '' : `<ol class="track">${flow.map((st, k) => `<li class="${k < i ? 'done' : k === i ? 'now' : ''}"><span class="dot">${k < i || o.status === 'terminee' ? icon('check') : ''}</span><b>${esc(STATUS[st][0])}</b>${k === i && st !== 'terminee' ? `<small>${esc(STATUS[st][1])}</small>` : ''}</li>`).join('')}</ol>`}
      ${o.status === 'prete' ? `<div class="pickup">${icon('pin')}<span>À récupérer au comptoir : <b>${esc(S().address)}</b>. Donnez le numéro <b>${esc(o.number)}</b>.</span></div>` : ''}
    </div>
    <div class="grid-2">
      <div class="box"><h2>Votre commande</h2>${lines.map((l) => `<div class="rl"><span><b>${l.qty} × ${esc(l.name)}</b>${l.detail ? `<small>${esc(l.detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}</span><b>${esc(eur(l.unit * l.qty))}</b></div>`).join('')}
        <div class="tots">${o.discount ? `<div class="disc"><span>Code ${esc(o.promo)}</span><b>−${esc(eur(o.discount))}</b></div>` : ''}${o.mode === 'livraison' ? `<div><span>Livraison</span><b>${o.delivery ? esc(eur(o.delivery)) : 'Offerte'}</b></div>` : ''}<div class="tot"><span>Total TTC</span><b>${esc(eur(o.total))}</b></div></div>
        <p class="muted small">${o.paid ? `${icon('check')}Payée en ligne` : `À régler ${o.mode === 'livraison' ? 'à la livraison' : 'sur place'}`}</p></div>
      <div class="box"><h2>${o.mode === 'livraison' ? 'Livraison' : 'Retrait'}</h2>
        ${o.mode === 'livraison' && o.address ? `<p>${esc(o.address.street)}<br>${esc(o.address.zip)} ${esc(o.address.city)}</p>${o.address.info ? `<p class="muted small">${esc(o.address.info)}</p>` : ''}` : `<p>${esc(S().name)}<br>${esc(S().address)}, ${esc(S().zip)} ${esc(S().city)}</p>`}
        <p class="muted small">Au nom de ${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')} · ${esc(o.customer.phone)}</p>
        ${S().phone ? `<a class="btn btn-ghost" href="tel:${esc(S().phone.replace(/\s/g, ''))}">${icon('phone')}Appeler le restaurant</a>` : ''}
        <button type="button" class="btn btn-ghost" data-again>${icon('refresh')}Recommander la même chose</button></div>
    </div>
    <div class="app-card" data-install hidden>${logoMark(44)}<span><b>Installez l’application</b><small>${fr('Vos commandes et leur suivi, à portée de pouce : ajoutez Les Délices de Yanis à votre écran d’accueil.')}</small></span><span class="btn btn-dark sm">Installer</span></div>
    <p class="center"><a class="link" href="/commandes">Toutes mes commandes</a></p>
  </div>`;
  return page(html, { active: 'commandes', bar: false, live: false });
}
let suiviTimer = null;
function mountSuivi(id) {
  clearInterval(suiviTimer);
  const o = orderById(id);
  if (!o) return;
  const again = $('[data-again]');
  if (again) again.onclick = () => reorder(orderById(id) || o);
  const last = o.status;
  suiviTimer = setInterval(() => {
    if (!$(`[data-suivi="${id}"]`)) { clearInterval(suiviTimer); return; }
    db = lsGet(STORE) || db;   // la cuisine a pu changer le statut depuis un autre onglet
    const cur = orderById(id);
    if (!cur) return;
    autoAdvance(cur);
    const now = orderById(id);   // relu : l'avancement enregistre une nouvelle copie des données
    if (now && now.status !== last) { render(true); if (navigator.vibrate) try { navigator.vibrate(120); } catch (e) { /* rien */ } }
  }, 2000);
}

/* =====================================================================
   ESPACE RESTAURANT : connexion, écran cuisine (commandes en direct),
   tableau de bord, carte (ruptures, prix), réglages.
   ===================================================================== */
const ADM_NAV = [['commandes', 'Commandes', 'bell', 'Commandes'], ['historique', 'Historique', 'list', 'Historique'], ['tableau', 'Tableau de bord', 'chart', 'Ventes'], ['carte', 'La carte', 'grid', 'Carte'], ['reglages', 'Réglages', 'sliders', 'Réglages']];
const isAdminPath = (p) => /^\/cuisine(\/|$)/.test(p);
const active = (o) => !['terminee', 'annulee'].includes(o.status);
const admUi = { sound: true, autoSim: false, seen: new Set() };

function adminLogin() {
  return `<div class="auth"><div class="auth-box">
    ${logoHTML(true)}
    <div class="auth-card">
      <p class="kicker">Espace restaurant</p>
      <h1>Connexion</h1>
      <p class="muted">Commandes en direct, carte, ruptures et réglages.</p>
      <form data-login novalidate>
        <label class="f"><span>Identifiant</span><input name="login" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false"></label>
        <label class="f"><span>Mot de passe</span><input name="pw" type="password" autocomplete="current-password"><em class="err-m"></em></label>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${icon('lock')}Se connecter</button>
      </form>
    </div>
    <a class="back light" href="/">${icon('chevL')}Retour au site</a>
  </div></div>`;
}
function mountAdminLogin() {
  const f = $('[data-login]');
  f.onsubmit = (e) => {
    e.preventDefault();
    if (!checkAdmin(f.login.value, f.pw.value)) { const l = f.pw.closest('.f'); l.classList.add('err'); $('.err-m', l).textContent = 'Identifiant ou mot de passe incorrect.'; f.pw.value = ''; return; }
    setAdminSession({ at: new Date().toISOString() });
    render();
  };
}

function adminShell(key, title, content, actions = '') {
  const waiting = db.orders.filter((o) => o.status === 'recue').length;
  const paused = pausedNow();
  return `<div class="adm">
    <header class="adm-hd"><div class="adm-hd-in">
      <a class="adm-logo" href="/cuisine">${logoMark(34)}<span>Délices de Yanis <small>restaurant</small></span></a>
      <nav class="adm-nav" aria-label="Espace restaurant">${ADM_NAV.map(([k, l, ic, sh]) => `<a href="/cuisine${k === 'commandes' ? '' : '/' + k}" class="${k === key ? 'on' : ''}" ${k === key ? 'aria-current="page"' : ''}>${icon(ic)}<span class="l-long">${esc(l)}</span><span class="l-short">${esc(sh)}</span>${k === 'commandes' && waiting ? `<i class="cnt">${waiting}</i>` : ''}</a>`).join('')}</nav>
      <div class="adm-act">
        <button type="button" class="pausebtn ${paused ? 'paused' : ''}" data-pause>${icon(paused ? 'play' : 'pause')}<span>${paused ? 'Commandes en pause' : 'Commandes ouvertes'}</span></button>
        <button type="button" class="icon-btn" data-install hidden title="Installer l’appli cuisine" aria-label="Installer l’appli cuisine">${icon('download')}</button>
        <a class="icon-btn" href="/" title="Voir le site" aria-label="Voir le site">${icon('home')}</a>
        <button type="button" class="icon-btn" data-logout title="Se déconnecter" aria-label="Se déconnecter">${icon('logout')}</button>
      </div>
    </div></header>
    <main class="adm-main" id="main"><div class="adm-top"><h1>${esc(title)}</h1><div class="adm-top-act">${actions}</div></div>${content}</main>
  </div>`;
}
function bindAdminShell() {
  const lo = $('[data-logout]'); if (lo) lo.onclick = () => { setAdminSession(null); toast('Vous êtes déconnecté.', 'ok'); render(); };
  const pb = $('[data-pause]');
  if (pb) pb.onclick = () => {
    if (pausedNow()) { sync(); S().paused = false; S().pausedUntil = null; save(); toast('Commandes en ligne rouvertes.', 'ok'); render(true); return; }
    openSheet({ title: 'Mettre les commandes en pause', body: `<p class="muted">Le site n’accepte plus de nouvelles commandes immédiates pendant ce temps. Les créneaux programmés restent possibles.</p><div class="pause-opts">${[15, 30, 60].map((m) => `<button type="button" class="btn btn-ghost" data-pm="${m}">${m} minutes</button>`).join('')}<button type="button" class="btn btn-ghost" data-pm="0">Jusqu’à réouverture</button></div>`, onMount: (el, close) => {
      $$('[data-pm]', el).forEach((b) => (b.onclick = () => { const m = +b.dataset.pm; sync(); S().paused = true; S().pausedUntil = m ? addMin(new Date(), m).toISOString() : null; save(); close(); toast(m ? `Pause de ${m} minutes.` : 'Commandes en pause.', 'ok'); render(true); }));
    } });
  };
}

/* ---------- Commandes en direct ---------- */
function ticketLines(o) {
  return orderLines(o).map((l) => `<li><b>${l.qty} ×</b><span><b>${esc(l.name)}</b>${l.detail ? `<small>${esc(l.detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}</span></li>`).join('');
}
function orderCard(o) {
  const created = new Date(o.createdAt);
  const mins = Math.max(0, Math.round((Date.now() - created) / 60000));
  const due = new Date(o.due);
  const late = active(o) && due < new Date();
  const next = { recue: ['preparation', 'Accepter et préparer'], preparation: [o.mode === 'livraison' ? 'livraison' : 'prete', o.mode === 'livraison' ? 'Confier au livreur' : 'Prête'], prete: ['terminee', 'Remise au client'], livraison: ['terminee', 'Livrée'] }[o.status];
  return `<article class="kcard ${o.status === 'recue' ? 'new' : ''} ${late ? 'late' : ''}" data-o="${esc(o.id)}">
    <div class="kcard-hd"><b class="kno">N° ${esc(o.number)}</b><span class="mode m-${o.mode}">${icon(o.mode === 'livraison' ? 'bike' : 'bag')}${o.mode === 'livraison' ? 'Livraison' : 'À emporter'}</span><span class="since">${mins < 1 ? 'à l’instant' : `il y a ${mins} min`}</span></div>
    <p class="kdue ${late ? 'late' : ''}">${icon('clock')}${o.when === 'slot' ? 'Programmée' : 'Au plus tôt'} : <b>${esc(hm(due))}</b>${sameDay(due, new Date()) ? '' : ` (${esc(dayLabel(due))})`}</p>
    <ul class="klines">${ticketLines(o)}</ul>
    <div class="kcust"><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b><a href="tel:${esc((o.customer.phone || '').replace(/\s/g, ''))}">${icon('phone')}${esc(o.customer.phone || '')}</a>${o.address ? `<span>${icon('pin')}${esc(o.address.street)}, ${esc(o.address.zip)}${o.address.info ? ` · ${esc(o.address.info)}` : ''}</span>` : ''}</div>
    <div class="kfoot"><b>${esc(eur(o.total))}</b><span class="paid ${o.paid ? 'yes' : ''}">${o.paid ? 'Payée en ligne' : o.mode === 'livraison' ? 'À encaisser à la livraison' : 'À encaisser sur place'}</span></div>
    <div class="kact">${next ? `<button type="button" class="btn btn-primary" data-next="${next[0]}">${esc(next[1])}</button>` : ''}<button type="button" class="icon-btn" data-print title="Imprimer le ticket" aria-label="Imprimer le ticket">${icon('printer')}</button>${o.status === 'recue' ? `<button type="button" class="icon-btn danger" data-cancel title="Refuser" aria-label="Refuser la commande">${icon('x')}</button>` : ''}</div>
  </article>`;
}
function pageCuisine() {
  const list = db.orders.filter(active).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  const cols = [['recue', 'Nouvelles'], ['preparation', 'En préparation'], ['prete', deliveryOn() ? 'Prêtes et en livraison' : 'Prêtes à récupérer']];
  const inCol = (c) => list.filter((o) => (c === 'prete' ? ['prete', 'livraison'].includes(o.status) : o.status === c));
  const today = db.orders.filter((o) => sameDay(new Date(o.createdAt), new Date()) && o.status !== 'annulee');
  const content = `<div class="kstats"><span><b>${today.length}</b> commandes aujourd’hui</span><span><b>${esc(eur(today.reduce((a, o) => a + o.total, 0)))}</b> de ventes</span><span><b>${list.length}</b> en cours</span></div>
  <p class="kdemo">${icon('info')}${fr('Démonstration : les commandes passées sur le site depuis cet appareil arrivent ici en direct, avec une sonnerie. « Simuler une commande » en ajoute une à tout moment.')}</p>
  <div class="kboard">${cols.map(([c, l]) => `<section class="kcol k-${c}"><h2>${esc(l)}<i>${inCol(c).length}</i></h2><div class="kcol-b">${inCol(c).map(orderCard).join('') || `<p class="kempty">Rien pour le moment.</p>`}</div></section>`).join('')}</div>`;
  const notif = 'Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied';
  const actions = `<button type="button" class="btn btn-ghost" data-sound>${icon('bell')}${admUi.sound ? 'Son activé' : 'Son coupé'}</button>${notif ? `<button type="button" class="btn btn-ghost" data-notif>${icon('info')}Activer les alertes</button>` : ''}<button type="button" class="btn btn-dark" data-sim>${icon('sparkle')}Simuler une commande</button>`;
  return adminShell('commandes', 'Commandes en direct', content, actions);
}
/* Son : les navigateurs ne l'autorisent qu'après un premier geste sur la page (le moindre toucher suffit). */
let actx = null;
function audio() {
  try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) { actx = null; }
  return actx;
}
document.addEventListener('pointerdown', () => { if (isAdminPath(curPath()) && admUi.sound) audio(); }, { passive: true });
function chime() {
  if (!admUi.sound) return;
  try {
    const ctx = audio();
    if (!ctx) return;
    [880, 1175, 1568].forEach((f, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.16); g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.16 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.16 + 0.5); o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + i * 0.16); o.stop(ctx.currentTime + i * 0.16 + 0.55); });
  } catch (e) { /* son indisponible */ }
}
function simulateOrder() {
  sync();
  const r = Math.random;
  const pool = db.menu.filter((p) => p.available !== false && p.cat !== 'boissons');
  const lines = [];
  for (let i = 0; i < 1 + Math.floor(r() * 3); i++) { const p = pool[Math.floor(r() * pool.length)]; const c = defaultChoiceSeed(p, r); lines.push({ id: uid('l'), productId: p.id, choice: c, qty: 1, note: r() < 0.2 ? 'Bien cuit s’il vous plaît' : '', unit: unitPrice(p, c) }); }
  const mode = deliveryOn() && r() < 0.5 ? 'livraison' : 'emporter';
  const sub = round2(lines.reduce((a, l) => a + l.unit * l.qty, 0));
  const fee = mode === 'livraison' ? (sub >= S().freeDeliveryFrom ? 0 : 2.5) : 0;
  const names = [['Lina', 'M.'], ['Adam', 'B.'], ['Chloé', 'R.'], ['Ilyes', 'T.'], ['Emma', 'D.'], ['Sofiane', 'K.']];
  const [fn, ln] = names[Math.floor(r() * names.length)];
  const now = new Date();
  db.orders.unshift({ id: uid('o'), number: orderNumber(), createdAt: now.toISOString(), status: 'recue', history: [{ st: 'recue', at: now.toISOString() }], auto: false, mode, when: 'asap', due: addMin(now, mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes).toISOString(), customer: { firstName: fn, lastName: ln, phone: `06 39 98 ${pad(Math.floor(r() * 100))} ${pad(Math.floor(r() * 100))}` }, address: mode === 'livraison' ? { street: `${1 + Math.floor(r() * 60)} rue Fondaudège`, zip: '33000', city: 'Bordeaux', info: '' } : null, lines, promo: null, discount: 0, delivery: fee, total: round2(sub + fee), payment: 'carte', paid: true, channel: 'En ligne', demo: true });
  save();
}
let cuisineTimer = null;
function mountCuisine() {
  bindAdminShell();
  clearInterval(cuisineTimer);
  db.orders.filter((o) => o.status === 'recue').forEach((o) => admUi.seen.add(o.id));
  const bind = () => {
    $$('[data-o]').forEach((card) => {
      const o = orderById(card.dataset.o);
      const nx = $('[data-next]', card); if (nx) nx.onclick = () => { setStatus(o, nx.dataset.next, true); toast(`Commande ${o.number} : ${STATUS[nx.dataset.next][0].toLowerCase()}.`, 'ok'); render(true); };
      const cc = $('[data-cancel]', card); if (cc) cc.onclick = () => { setStatus(o, 'annulee', true); toast(`Commande ${o.number} refusée.`, 'ok'); render(true); };
      $('[data-print]', card).onclick = () => printTicket(o);
    });
    const sim = $('[data-sim]'); if (sim) sim.onclick = () => { simulateOrder(); chime(); render(true); };
    const snd = $('[data-sound]'); if (snd) snd.onclick = () => { admUi.sound = !admUi.sound; render(true); };
    const nt = $('[data-notif]'); if (nt) nt.onclick = async () => { try { const r = await Notification.requestPermission(); toast(r === 'granted' ? 'Alertes activées : une notification arrive à chaque commande.' : 'Alertes refusées par le navigateur.', r === 'granted' ? 'ok' : 'warn'); } catch (e) { /* navigateur sans notifications */ } render(true); };
  };
  bind();
  // nouvelles commandes (site ouvert dans un autre onglet ou sur un autre écran du même appareil)
  cuisineTimer = setInterval(() => {
    if (curPath() !== '/cuisine') { clearInterval(cuisineTimer); return; }
    const fresh = lsGet(STORE);
    if (!fresh) return;
    const before = JSON.stringify(db.orders.filter(active).map((o) => o.id + o.status));
    db = fresh;
    const news = db.orders.filter((o) => o.status === 'recue' && !admUi.seen.has(o.id));
    news.forEach((o) => admUi.seen.add(o.id));
    if (news.length) alertNew(news);
    if (JSON.stringify(db.orders.filter(active).map((o) => o.id + o.status)) !== before) render(true);
    else $$('.since').forEach((s) => { const c = s.closest('[data-o]'); const o = c && orderById(c.dataset.o); if (o) { const m = Math.max(0, Math.round((Date.now() - new Date(o.createdAt)) / 60000)); s.textContent = m < 1 ? 'à l’instant' : `il y a ${m} min`; } });
  }, 3000);
}
/* ---------- Alertes de l'appli cuisine : son, vibration, notification, pastille sur l'icône ---------- */
function alertNew(news) {
  chime();
  try { if (navigator.vibrate) navigator.vibrate([220, 100, 220]); } catch (e) { /* rien */ }
  toast(news.length > 1 ? `${news.length} nouvelles commandes` : `Nouvelle commande n° ${news[0].number}`, 'ok');
  // appli en arrière-plan : notification du système (une par commande)
  if (document.visibilityState !== 'visible' && 'Notification' in window && Notification.permission === 'granted' && navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((reg) => news.forEach((o) => reg.showNotification(`Nouvelle commande n° ${o.number}`, {
      body: `${o.customer.firstName} · ${plural(o.lines.reduce((a, l) => a + l.qty, 0), 'article')} · ${eur(o.total)} · ${o.paid ? 'payée en ligne' : 'à encaisser'}`,
      tag: 'commande-' + o.id, icon: '/icons/cuisine-192.png', badge: '/icons/cuisine-96.png', vibrate: [220, 100, 220], data: { url: '/cuisine' },
    }))).catch(() => {});
  }
  updateBadge();
}
/** Pastille sur l'icône de l'appli installée : nombre de commandes à accepter. */
function updateBadge() {
  const n = db.orders.filter((o) => o.status === 'recue').length;
  try { if ('setAppBadge' in navigator) (n ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(() => {}); } catch (e) { /* rien */ }
}
/* Écran de la tablette toujours allumé tant que l'espace restaurant est ouvert */
let wake = null;
async function keepAwake() {
  try { if ('wakeLock' in navigator && !wake && document.visibilityState === 'visible') { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); } } catch (e) { wake = null; }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && isAdminPath(curPath()) && adminSession()) keepAwake(); });
/** Appelé à chaque changement de page : écran allumé et pastille dans l'espace restaurant, rien ailleurs. */
function adminRouteHook(path) {
  if (isAdminPath(path) && adminSession()) { keepAwake(); updateBadge(); }
  else if (wake) { wake.release().catch(() => {}); wake = null; }
}

/* ---------- Historique des commandes ---------- */
const histUi = { day: 0 };
function pageHistorique() {
  const today = dayStart(new Date());
  const day = new Date(today.getTime() - histUi.day * DAY);
  const list = db.orders.filter((o) => sameDay(new Date(o.createdAt), day)).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const ok = list.filter((o) => o.status !== 'annulee');
  const sum = round2(ok.reduce((a, o) => a + o.total, 0));
  const days = [...Array(7)].map((_, i) => new Date(today.getTime() - i * DAY));
  const content = `<div class="chips hist-days">${days.map((d, i) => `<button type="button" class="chip ${i === histUi.day ? 'on' : ''}" data-hday="${i}">${i === 0 ? 'Aujourd’hui' : i === 1 ? 'Hier' : `${cap(JOURS[d.getDay()])} ${d.getDate()}`}</button>`).join('')}</div>
  <div class="kstats"><span><b>${ok.length}</b> ${ok.length > 1 ? 'commandes' : 'commande'}</span><span><b>${esc(eur(sum))}</b> de ventes</span><span><b>${esc(eur(ok.length ? sum / ok.length : 0))}</b> panier moyen</span></div>
  <div class="hlist">${list.length ? list.map((o) => `<button type="button" class="hrow" data-h="${esc(o.id)}"><b class="kno">N° ${esc(o.number)}</b><span class="hrow-t">${esc(hm(new Date(o.createdAt)))}</span><span class="hrow-c"><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b><small>${esc(orderLines(o).map((l) => (l.qty > 1 ? l.qty + ' × ' : '') + l.name).join(', '))}</small></span><span class="badge b-${o.status}">${esc(STATUS[o.status][0])}</span><b class="hrow-p">${esc(eur(o.total))}</b></button>`).join('') : '<p class="kempty">Aucune commande ce jour-là.</p>'}</div>`;
  return adminShell('historique', 'Historique', content);
}
function mountHistorique() {
  bindAdminShell();
  $$('[data-hday]').forEach((b) => (b.onclick = () => { histUi.day = +b.dataset.hday; render(true); }));
  $$('[data-h]').forEach((b) => (b.onclick = () => openOrderSheet(orderById(b.dataset.h))));
}
/** Détail d'une commande : ce qui a été commandé, le client, le paiement et chaque étape avec son heure. */
function openOrderSheet(o) {
  if (!o) return;
  const steps = (o.history || []).map((h) => `<li><b>${esc(STATUS[h.st] ? STATUS[h.st][0] : h.st)}</b><span>${esc(hm(new Date(h.at)))}</span></li>`).join('');
  openSheet({ title: `Commande n° ${o.number}`, body: `<div class="odetail">
    <p class="muted">${esc(dayLabel(new Date(o.createdAt)))} à ${esc(hm(new Date(o.createdAt)))} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'} · ${o.when === 'slot' ? `programmée pour ${esc(hm(new Date(o.due)))}` : 'dès que possible'}</p>
    <ul class="klines">${ticketLines(o)}</ul>
    <div class="tots">${o.discount ? `<div class="disc"><span>Code ${esc(o.promo)}</span><b>−${esc(eur(o.discount))}</b></div>` : ''}<div class="tot"><span>Total TTC</span><b>${esc(eur(o.total))}</b></div></div>
    <p><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b> · <a class="link" href="tel:${esc((o.customer.phone || '').replace(/\s/g, ''))}">${esc(o.customer.phone || '')}</a></p>
    <p class="paid ${o.paid ? 'yes' : ''}">${o.paid ? 'Payée en ligne' : 'Réglée au comptoir'}</p>
    <ol class="steps-mini">${steps}</ol></div>`,
    foot: `<button type="button" class="btn btn-ghost" data-reprint>${icon('printer')}Réimprimer le ticket</button>`,
    onMount: (el) => { $('[data-reprint]', el).onclick = () => printTicket(o); } });
}
function printTicket(o) {
  const w = window.open('', '_blank', 'width=380,height=640');
  if (!w) { toast('Autorisez les fenêtres pour imprimer.', 'warn'); return; }
  const lines = orderLines(o).map((l) => `<tr><td>${l.qty} ×</td><td><b>${esc(l.name)}</b>${l.detail ? `<br><small>${esc(l.detail)}</small>` : ''}${l.note ? `<br><small>« ${esc(l.note)} »</small>` : ''}</td><td style="text-align:right">${esc(eur(l.unit * l.qty))}</td></tr>`).join('');
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Ticket ${esc(o.number)}</title><style>body{font:13px/1.35 monospace;margin:12px;color:#000}h1{font-size:18px;margin:0}table{width:100%;border-collapse:collapse}td{vertical-align:top;padding:3px 2px;border-bottom:1px dashed #999}small{font-size:11px}.big{font-size:22px;font-weight:bold}</style></head><body>
    <h1>${esc(S().name)}</h1><p>${esc(S().address)}, ${esc(S().city)}</p><p class="big">N° ${esc(o.number)} · ${o.mode === 'livraison' ? 'LIVRAISON' : 'À EMPORTER'}</p>
    <p>${esc(new Date(o.createdAt).toLocaleString('fr-FR'))}<br>Pour : ${esc(hm(new Date(o.due)))}<br>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')} · ${esc(o.customer.phone)}${o.address ? `<br>${esc(o.address.street)}, ${esc(o.address.zip)} ${esc(o.address.info || '')}` : ''}</p>
    <table>${lines}</table><p class="big">Total : ${esc(eur(o.total))}</p><p>${o.paid ? 'PAYÉE EN LIGNE' : 'À ENCAISSER'}</p><script>window.print()<\/script></body></html>`);
  w.document.close();
}

/* ---------- Tableau de bord ---------- */
function pageTableau() {
  const done = db.orders.filter((o) => o.status !== 'annulee');
  const today = dayStart(new Date());
  const inDay = (o, d) => sameDay(new Date(o.createdAt), d);
  const t = done.filter((o) => inDay(o, today));
  const sum = (a) => round2(a.reduce((x, o) => x + o.total, 0));
  const last7 = done.filter((o) => new Date(o.createdAt) > new Date(today.getTime() - 6 * DAY));
  const prev7 = done.filter((o) => { const d = new Date(o.createdAt); return d <= new Date(today.getTime() - 6 * DAY) && d > new Date(today.getTime() - 13 * DAY); });
  const delta = sum(prev7) ? Math.round(((sum(last7) - sum(prev7)) / sum(prev7)) * 100) : 0;
  const days = [...Array(14)].map((_, i) => new Date(today.getTime() - (13 - i) * DAY));
  const perDay = days.map((d) => sum(done.filter((o) => inDay(o, d))));
  const maxD = Math.max(1, ...perDay);
  const counts = {};
  // les plats (les boissons accompagnent presque chaque commande : elles fausseraient le classement)
  for (const o of done.filter((x) => new Date(x.createdAt) > new Date(today.getTime() - 29 * DAY))) for (const l of o.lines) { const p = product(l.productId); if (p && p.cat !== 'boissons') counts[l.productId] = (counts[l.productId] || 0) + l.qty; }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topMax = top.length ? top[0][1] : 1;
  const hours = [...Array(24)].map((_, h) => last7.filter((o) => new Date(o.createdAt).getHours() === h).length);
  const hMax = Math.max(1, ...hours);
  const deliv = last7.length ? Math.round((last7.filter((o) => o.mode === 'livraison').length / last7.length) * 100) : 0;
  const online = last7.length ? Math.round((last7.filter((o) => o.paid).length / last7.length) * 100) : 0;
  const content = `
  <div class="kpis">
    <div class="kpi"><small>Ventes du jour</small><b>${esc(eur(sum(t)))}</b><span>${plural(t.length, 'commande')}</span></div>
    <div class="kpi"><small>7 derniers jours</small><b>${esc(eur(sum(last7)))}</b><span class="${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} % sur la semaine d’avant</span></div>
    <div class="kpi"><small>Panier moyen</small><b>${esc(eur(last7.length ? sum(last7) / last7.length : 0))}</b><span>sur 7 jours</span></div>
    ${deliveryOn() ? `<div class="kpi"><small>Part livraison</small><b>${deliv} %</b><span>${100 - deliv} % à emporter</span></div>` : `<div class="kpi"><small>Payé en ligne</small><b>${online} %</b><span>${100 - online} % au comptoir</span></div>`}
  </div>
  <div class="dash">
    <section class="panel wide"><h2>Ventes des 14 derniers jours</h2><div class="bars">${perDay.map((v, i) => `<div class="bar" title="${esc(dayLabel(days[i]))} : ${esc(eur(v))}"><i style="height:${Math.round((v / maxD) * 100)}%"></i><small>${days[i].getDate()}</small></div>`).join('')}</div></section>
    <section class="panel"><h2>Les plus vendus, 30 jours</h2><ul class="toplist">${top.map(([id, n]) => `<li><span>${esc((product(id) || { name: id }).name)}</span><i style="width:${Math.round((n / topMax) * 100)}%"></i><b>${n}</b></li>`).join('')}</ul></section>
    <section class="panel"><h2>Heures de pointe, 7 jours</h2><div class="hbars">${hours.map((v, h) => (h >= 11 && h <= 23 ? `<div class="hb"><i style="height:${Math.round((v / hMax) * 100)}%"></i><small>${h}h</small></div>` : '')).join('')}</div></section>
  </div>`;
  return adminShell('tableau', 'Tableau de bord', content);
}

/* ---------- La carte ---------- */
function pageAdmCarte() {
  const content = `<p class="muted">Un plat en rupture disparaît de la commande en ligne jusqu’à ce que vous le remettiez. Les prix se changent directement.</p>
  ${CATEGORIES.map(([c, n]) => `<section class="panel"><h2>${esc(n)}</h2><div class="mlist">${db.menu.filter((p) => p.cat === c).map((p) => `<div class="mrow ${p.available === false ? 'off' : ''}" data-m="${esc(p.id)}"><div class="mrow-img">${photo(p.id, { alt: '' })}</div><span class="mrow-n"><b>${esc(p.name)}</b><small>${esc(p.desc)}</small></span><label class="mprice"><input inputmode="decimal" value="${esc(p.price.toFixed(2).replace('.', ','))}" aria-label="Prix de ${esc(p.name)}"><span>€</span></label><label class="switch" title="Disponible"><input type="checkbox" ${p.available === false ? '' : 'checked'} data-av><i></i><span>${p.available === false ? 'Rupture' : 'Disponible'}</span></label></div>`).join('')}</div></section>`).join('')}`;
  return adminShell('carte', 'La carte', content, `<button type="button" class="btn btn-ghost" data-resetmenu>${icon('refresh')}Carte d’origine</button>`);
}
function mountAdmCarte() {
  bindAdminShell();
  $$('[data-m]').forEach((row) => {
    const p = () => product(row.dataset.m);
    const pr = $('.mprice input', row);
    const show = () => { pr.value = p().price.toFixed(2).replace('.', ','); };
    pr.onchange = () => { const v = Math.round(parseFloat(pr.value.replace(/\s/g, '').replace(',', '.')) * 100) / 100; if (isNaN(v) || v < 0) { show(); toast('Prix invalide.', 'warn'); return; } sync(); p().price = v; show(); save(); toast(`${p().name} : ${eur(v)}.`, 'ok'); };
    pr.onkeydown = (e) => { if (e.key === 'Enter') pr.blur(); };
    const av = $('[data-av]', row);
    av.onchange = () => { sync(); p().available = av.checked; save(); row.classList.toggle('off', !av.checked); $('.switch span', row).textContent = av.checked ? 'Disponible' : 'Rupture'; toast(`${p().name} : ${av.checked ? 'de nouveau disponible' : 'en rupture'}.`, 'ok'); };
  });
  $('[data-resetmenu]').onclick = () => { sync(); db.menu = MENU.map((p) => ({ ...p, available: true })); save(); toast('Carte d’origine rétablie.', 'ok'); render(true); };
}

/* ---------- Réglages ---------- */
function pageReglages() {
  const s = S();
  const content = `<form class="panel form-grid" data-set>
    <h2>Le restaurant</h2>
    <label class="f"><span>Téléphone affiché sur le site</span><input name="phone" value="${esc(s.phone)}" placeholder="05 56 00 00 00"></label>
    <label class="f"><span>Email</span><input name="email" value="${esc(s.email)}"></label>
    <h2>Délais</h2>
    <label class="f"><span>Préparation à emporter (min)</span><input name="prepMinutes" type="number" min="5" value="${s.prepMinutes}"></label>
    <h2>Livraison</h2>
    <label class="check"><input type="checkbox" name="delivery" ${s.delivery ? 'checked' : ''}><span>Proposer aussi la livraison (sinon, tout est à emporter)</span></label>
    <div class="grid3"><label class="f"><span>Livraison (min)</span><input name="deliveryMinutes" type="number" min="10" value="${s.deliveryMinutes}"></label><label class="f"><span>Minimum livraison (€)</span><input name="minDelivery" type="number" min="0" step="0.5" value="${s.minDelivery}"></label><label class="f"><span>Offerte dès (€)</span><input name="freeDeliveryFrom" type="number" min="0" step="1" value="${s.freeDeliveryFrom}"></label></div>
    <div class="zones-edit">${s.zones.map((z, i) => `<label class="f"><span>${esc(z.zip)} · ${esc(z.label)}</span><input type="number" step="0.5" min="0" data-zone="${i}" value="${z.fee}"></label>`).join('')}</div>
    <h2>Horaires</h2>
    <div class="hours-edit">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<label class="f"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><input data-day="${d}" value="${esc((s.hours[d] || []).map(([a, b]) => `${a}-${b}`).join(', '))}" placeholder="11:30-14:30, 18:00-23:00 (vide = fermé)"></label>`).join('')}</div>
    <h2>Écran cuisine</h2>
    <p class="muted small">${fr('Installez l’appli « Yanis Cuisine » sur la tablette ou le téléphone du restaurant : elle s’ouvre directement sur les commandes, sonne et vibre à chaque nouvelle commande, affiche une notification quand elle est en arrière-plan et garde l’écran allumé pendant le service.')}</p>
    <button type="button" class="btn btn-dark" data-install hidden>${icon('download')}Installer l’appli sur cet appareil</button>
    <h2>Démonstration</h2>
    <label class="check"><input type="checkbox" name="autoDemo" ${s.autoDemo ? 'checked' : ''}><span>Le suivi de commande avance tout seul si la cuisine ne répond pas</span></label>
    <div class="form-act"><button type="submit" class="btn btn-primary">Enregistrer</button><button type="button" class="btn btn-ghost" data-resetall>${icon('refresh')}Remettre les données d’exemple</button></div>
  </form>`;
  return adminShell('reglages', 'Réglages', content);
}
function mountReglages() {
  bindAdminShell();
  const f = $('[data-set]');
  f.onsubmit = (e) => {
    e.preventDefault();
    sync();
    const s = S();
    s.phone = f.phone.value.trim(); s.email = f.email.value.trim();
    for (const k of ['prepMinutes', 'deliveryMinutes', 'minDelivery', 'freeDeliveryFrom']) { const v = parseFloat(f[k].value); if (!isNaN(v) && v >= 0) s[k] = v; }
    $$('[data-zone]', f).forEach((i) => { const v = parseFloat(i.value); if (!isNaN(v) && v >= 0) s.zones[+i.dataset.zone].fee = v; });
    let bad = false;
    $$('[data-day]', f).forEach((i) => {
      const txt = i.value.trim();
      if (!txt) { s.hours[i.dataset.day] = []; return; }
      const rs = txt.split(',').map((x) => x.trim().split('-').map((y) => y.trim().replace('h', ':')));
      if (rs.every((r) => r.length === 2 && r.every((t) => /^\d{1,2}:\d{2}$/.test(t)) && toMin(r[0]) < toMin(r[1]))) s.hours[i.dataset.day] = rs.map((r) => r.map((t) => t.padStart(5, '0')));
      else { bad = true; i.closest('.f').classList.add('err'); }
    });
    s.autoDemo = f.autoDemo.checked;
    s.delivery = f.delivery.checked;
    if (!s.delivery && cart.mode !== 'emporter') { cart.mode = 'emporter'; saveCart(); }
    save();
    toast(bad ? 'Enregistré, sauf les horaires signalés (format 11:30-14:30).' : 'Réglages enregistrés.', bad ? 'warn' : 'ok');
  };
  $('[data-resetall]').onclick = () => { if (!confirm('Remettre la carte, les réglages et les commandes d’exemple ?')) return; db = seedDb(); save(); toast('Données d’exemple rétablies.', 'ok'); render(true); };
}

/* =====================================================================
   APPLICATION INSTALLABLE : écran d'accueil du téléphone, hors connexion,
   mise à jour proposée quand une nouvelle version est publiée.
   ===================================================================== */
const PWA = { on: !!window.YANIS_PWA && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname)), prompt: null };
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const canInstall = () => PWA.on && !isStandalone() && (!!PWA.prompt || isIOS());
function updateInstallUI() { $$('[data-install]').forEach((b) => { b.hidden = !canInstall(); }); }
async function installApp() {
  if (PWA.prompt) { const p = PWA.prompt; PWA.prompt = null; try { p.prompt(); await p.userChoice; } catch (e) { /* refus */ } updateInstallUI(); return; }
  const adm = isAdminPath(curPath());
  openSheet({ title: adm ? 'Installer l’appli cuisine' : 'Installer l’application', body: `<div class="doc"><p>${adm ? 'Installez « Yanis Cuisine » sur la tablette ou le téléphone du restaurant : elle s’ouvre directement sur les commandes, en plein écran, et sonne à chaque nouvelle commande.' : 'Commandez en un geste depuis l’écran d’accueil de votre téléphone.'}</p><ol class="inst"><li>Touchez <b>Partager</b> (le carré avec une flèche) dans Safari.</li><li>Choisissez <b>Sur l’écran d’accueil</b>.</li><li>Touchez <b>Ajouter</b>.</li></ol></div>` });
}
function initPWA() {
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-install]'); if (b) { e.preventDefault(); installApp(); } });
  if (!PWA.on) return;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); PWA.prompt = e; updateInstallUI(); });
  window.addEventListener('appinstalled', () => { PWA.prompt = null; updateInstallUI(); toast('Application installée.', 'ok'); });
  if (!('serviceWorker' in navigator)) return;
  const had = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!had || reloading) return; reloading = true; location.reload(); });
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((reg) => {
    const offer = (w) => {
      if ($('.update-bar')) return;
      const bar = document.createElement('div');
      bar.className = 'update-bar';
      bar.innerHTML = '<span>Nouvelle version disponible.</span><button class="btn btn-light sm" type="button">Actualiser</button>';
      $('button', bar).onclick = () => { bar.remove(); w.postMessage('skipWaiting'); };
      document.body.appendChild(bar);
    };
    if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', () => { const w = reg.installing; if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w); }); });
    setInterval(() => reg.update().catch(() => {}), 30 * 60000);
  }).catch(() => {});
}

/* =====================================================================
   ROUTEUR ET DÉMARRAGE : vraies adresses, navigation instantanée.
   ===================================================================== */
const curPath = () => (FILE_MODE ? (location.hash.slice(1) || '/') : location.pathname).replace(/\/+$/, '') || '/';
const ROUTES = [
  [/^\/$/, () => [pageHome(), mountHome, 'accueil']],
  [/^\/carte$/, () => [pageCarte(), mountCarte]],
  [/^\/infos$/, () => [pageInfos()]],
  [/^\/commande$/, () => [pageCommande(), mountCommande]],
  [/^\/suivi\/([\w-]+)$/, (id) => [pageSuivi(id), () => mountSuivi(id)]],
  [/^\/commandes$/, () => [pageMesCommandes()]],
  [/^\/cuisine$/, () => [pageCuisine(), mountCuisine]],
  [/^\/cuisine\/tableau$/, () => [pageTableau(), bindAdminShell]],
  [/^\/cuisine\/historique$/, () => [pageHistorique(), mountHistorique]],
  [/^\/cuisine\/carte$/, () => [pageAdmCarte(), mountAdmCarte]],
  [/^\/cuisine\/reglages$/, () => [pageReglages(), mountReglages]],
];
function resolve(path) {
  if (isAdminPath(path) && !adminSession()) return [adminLogin(), mountAdminLogin];
  for (const [re, fn] of ROUTES) { const m = path.match(re); if (m) return fn(...m.slice(1)); }
  const p = SEO_BY_PATH[path];
  if (p && path !== '/infos') return [pageSeo(p)];
  return [pageNotFound()];
}
let lastPath = null;
let first = true;
function render(keepScroll) {
  const path = curPath();
  const out = resolve(path);
  const y = scrollY;
  $('#app').innerHTML = out[0];
  document.documentElement.classList.toggle('is-adm', isAdminPath(path));
  const pre = first && document.documentElement.hasAttribute('data-pre');
  document.documentElement.removeAttribute('data-pre');
  try { if (out[1]) out[1](); } catch (e) { console.error(e); }
  try { applyHead(path); } catch (e) { console.error(e); }
  if (keepScroll) scrollTo(0, y);
  else if (path !== lastPath && !first && !location.hash) scrollTo(0, 0);
  if (!pre && path !== lastPath && !keepScroll) { const m = $('#main'); if (m) { m.classList.remove('in'); void m.offsetWidth; m.classList.add('in'); } }
  lastPath = path;
  first = false;
  if (typeof updateInstallUI === 'function') updateInstallUI();
  if (typeof adminRouteHook === 'function') adminRouteHook(path);
}
function go(to) {
  if (!to) return;
  const [p, h] = to.split('#');
  if (FILE_MODE) { location.hash = p; return; }
  if (p === location.pathname && h) { history.pushState(null, '', to); const t = document.getElementById(h); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130, behavior: 'smooth' }); return; }
  history.pushState(null, '', to);
  closeAll();
  render();
  if (h) setTimeout(() => { const t = document.getElementById(h); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130 }); }, 60);
}
window.go = go;
window.addEventListener('popstate', () => { closeAll(); render(); });
window.addEventListener('hashchange', () => { if (FILE_MODE) render(); });

/* Actions communes (un seul écouteur pour toutes les pages) */
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const t = e.target.closest('[data-open],[data-cart],[data-menu],[data-doc]');
  if (t && !t.closest('.sheet-wrap') || (t && t.matches('[data-doc]'))) {
    e.preventDefault();
    if (t.matches('[data-open]')) openProduct(t.dataset.open);
    else if (t.matches('[data-cart]')) openCart();
    else if (t.matches('[data-menu]')) openMenu();
    else if (t.matches('[data-doc]')) openDoc(t.dataset.doc);
    return;
  }
  const a = e.target.closest('a[href]');
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
  const href = a.getAttribute('href');
  if (!href || href[0] !== '/' || href.startsWith('//')) return;
  e.preventDefault();
  go(href);
});
// une commande passée ou une rupture signalée dans un autre onglet : la page se met à jour
window.addEventListener('storage', (e) => {
  if (e.key === STORE && e.newValue) { db = JSON.parse(e.newValue); if (!isAdminPath(curPath()) && !OPEN.size && !/^\/commande$/.test(curPath())) render(true); }
  if (e.key === CART_KEY && e.newValue) { cart = JSON.parse(e.newValue); refreshCartUI(); }
});

/* Démonstration : la commande en cours avance aussi quand le client reste sur une autre page du site. */
setInterval(() => {
  const path = curPath();
  if (isAdminPath(path) || /^\/suivi\//.test(path)) return;
  const o = myLiveOrder();
  if (!o) return;
  sync();
  const cur = orderById(o.id);
  if (cur) autoAdvance(cur);
  refreshLive();
}, 4000);

function init() {
  db = lsGet(STORE);
  if (!db || db.version !== DATA_VERSION || !Array.isArray(db.orders)) { db = seedDb(); save(); }
  refreshDemo();
  loadCart();
  if (!deliveryOn() && cart.mode !== 'emporter') { cart.mode = 'emporter'; saveCart(); }
  // lignes du panier devenues invalides (plat retiré de la carte)
  cart.lines = cart.lines.filter((l) => product(l.productId));
  render();
  if (typeof initPWA === 'function') initPWA();
}
init();
