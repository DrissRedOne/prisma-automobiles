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
