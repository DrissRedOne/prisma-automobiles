'use strict';
/* =====================================================================
   PRISMA RENT : application de location (démonstration autonome)
   Un seul fichier, aucune dépendance. Les données vivent dans le
   navigateur (localStorage) ; « Réinitialiser » recrée le jeu d'essai.
   ===================================================================== */

/* ---------- Outils ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
/** Préférence « réduire les animations » du système. */
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = (p = 'id') => p + '_' + Math.random().toString(36).slice(2, 10);
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const sum = (arr, f = (x) => x) => arr.reduce((a, x) => a + (Number(f(x)) || 0), 0);
function eur(n, forceDec) {
  const v = round2(n);
  const dec = forceDec ? 2 : Number.isInteger(v) ? 0 : 2;
  return v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + ' €';
}
const plural = (n, one, many) => `${n} ${n > 1 ? many || one + 's' : one}`;
const initials = (name) => String(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

/* ---------- Dates (heure locale, format AAAA-MM-JJTHH:MM) ---------- */
const DAY = 86400000;
const pad = (n) => String(n).padStart(2, '0');
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const JOURS_C = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_C = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
function toISO(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function parse(s) {
  if (!s || !/^\d{4}-\d{2}-\d{2}/.test(String(s))) return null;
  const [dp, tp = '00:00'] = String(s).split('T');
  const [y, m, d] = dp.split('-').map(Number);
  const [hh, mm] = tp.split(':').map(Number);
  return new Date(y, m - 1, d, hh || 0, mm || 0);
}
const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
function fmtDay(s, long) {
  const d = typeof s === 'string' ? parse(s) : s;
  if (!d) return '';
  return long ? `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}` : `${JOURS_C[d.getDay()]} ${d.getDate()} ${MOIS_C[d.getMonth()]}`;
}
function fmtDT(s) { const d = typeof s === 'string' ? parse(s) : s; return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} à ${pad(d.getHours())}h${pad(d.getMinutes())}` : ''; }
function fmtD(s) { const d = typeof s === 'string' ? parse(s) : s; return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : ''; }
/** Jours facturés : tranches de 24 h, avec 59 minutes de tolérance au retour. */
function rentalDays(from, to) {
  const h = (parse(to) - parse(from)) / 3600000;
  return Math.max(1, Math.ceil((h - 1) / 24));
}
function yearsBetween(a, b) {
  let y = b.getFullYear() - a.getFullYear();
  if (b.getMonth() < a.getMonth() || (b.getMonth() === a.getMonth() && b.getDate() < a.getDate())) y--;
  return y;
}

/* ---------- Icônes (traits, 24 × 24) ---------- */
const IC = {
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  seats: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  gear: '<circle cx="5" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v8M12 8v8M19 8v4H5"/>',
  fuel: '<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  snow: '<path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
  door: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M15 12h.01"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  weight: '<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.9 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.93-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  chevU: '<path d="m18 15-6-6-6 6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  van: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  grid: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  gantt: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 7h8M11 12h7M9 17h4"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  baby: '<path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  arrowR: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowL: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  euro: '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 13h4M10 17h4"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  infinity: '<path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  wheel: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="M12 14v8M10.2 11.2 2.5 9.5M13.8 11.2l7.7-1.7"/>',
  apple: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
  split: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M8 5v14M15 5v14"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
  wa: '<path d="M3.6 20.4l1.25-4.1A8.4 8.4 0 1 1 7.9 19.2Z"/><path d="M9.1 8.5c.3 3 3.2 5.9 6.3 6.3l1.2-1.6-1.9-1-1 .8a3.9 3.9 0 0 1-2.5-2.5l.8-1-1-1.9Z"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-2.2 3.3"/><path d="M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 5.4-1.4"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="m2 2 20 20"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
};
const icon = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ''}</svg>`;

/* ---------- Logo PRISMA (fourni par le client) ---------- */
function logoMark(cls = 'logo-mark') {
  const custom = db.settings.logo;
  return `<img class="${cls}${custom ? '' : ' blend'}" src="${custom || ASSETS.mark}" alt="">`;
}
function logoHTML(admin) {
  const s = db.settings;
  const href = admin ? '/gestion' : '/';
  if (s.logo) return `<a class="logo" href="${href}" aria-label="${esc(s.brand)}, accueil">${logoMark()}<span class="logo-text"><b>${esc(s.brand)}</b></span></a>`;
  return `<a class="logo" href="${href}" aria-label="${esc(s.brand)}, accueil">${logoMark()}<img class="logo-word blend" src="${ASSETS.word}" alt="${esc(s.brand)}"></a>`;
}

/* ---------- Silhouettes de véhicules (dessin vectoriel) ---------- */
let svgSeq = 0;
function wheel(cx, cy, r) {
  let spokes = '';
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    spokes += `<path d="M${cx} ${cy}L${round2(cx + Math.cos(a) * r * 0.55)} ${round2(cy + Math.sin(a) * r * 0.55)}" stroke="#7d8793" stroke-width="${round2(r * 0.16)}" stroke-linecap="round"/>`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#15181d"/><circle cx="${cx}" cy="${cy}" r="${round2(r * 0.64)}" fill="#c9cfd6"/><circle cx="${cx}" cy="${cy}" r="${round2(r * 0.64)}" fill="none" stroke="#8e97a2" stroke-width="1.2"/>${spokes}<circle cx="${cx}" cy="${cy}" r="${round2(r * 0.17)}" fill="#3b424c"/>`;
}
const SHAPES = {
  citadine: {
    body: 'M46 128L42 106C42 94 48 86 60 82L84 56C90 50 98 48 108 47L204 46C218 46 228 52 238 62L260 84C290 88 318 94 328 104C334 110 334 120 332 128L298 128A26 26 0 0 0 246 128L128 128A26 26 0 0 0 76 128Z',
    glass: ['M88 84L104 60C108 55 113 53 120 53L202 52C212 52 220 56 227 64L246 86Z'],
    pillars: [[160, 50, 8, 38]],
    wheels: [[102, 128, 22], [272, 128, 22]],
    tail: 'M44 92L60 88L60 98L44 101Z', head: 'M306 94C316 96 324 100 328 106L312 104Z',
    lines: 'M166 90L166 126M240 90L238 124M112 88C110 100 114 112 126 120', handles: [[176, 96], [122, 96]], mirror: 'M244 80L256 76L258 84L246 86Z',
  },
  berline: {
    body: 'M34 126L32 108C32 98 38 92 50 90L82 86C94 76 104 62 120 56C132 51 146 49 160 49L208 49C224 49 238 56 252 68L272 86C302 88 324 94 334 104C340 110 340 120 338 126L302 126A26 26 0 0 0 250 126L122 126A26 26 0 0 0 70 126Z',
    glass: ['M104 86L124 64C132 57 142 55 154 55L206 55C218 55 228 61 238 70L254 88Z'],
    pillars: [[178, 53, 8, 38]],
    wheels: [[96, 126, 22], [276, 126, 22]],
    tail: 'M34 98L50 94L52 102L34 106Z', head: 'M312 96C322 98 330 102 334 108L316 106Z',
    lines: 'M184 90L184 124M252 92L250 122M50 90L84 86', handles: [[196, 98], [136, 98]], mirror: 'M256 82L268 78L270 86L258 88Z',
  },
  suv: {
    body: 'M36 124L34 96C34 84 40 76 52 72L70 46C74 40 82 38 92 38L214 36C228 36 238 42 248 52L272 76C302 80 322 86 332 96C338 104 338 116 336 124L301 124A29 29 0 0 0 243 124L125 124A29 29 0 0 0 67 124Z',
    glass: ['M66 76L82 50C85 46 90 44 96 44L212 43C222 43 230 48 238 56L256 78Z'],
    pillars: [[102, 42, 10, 38], [168, 42, 9, 38]],
    wheels: [[96, 124, 25], [272, 124, 25]],
    tail: 'M36 82L54 78L54 90L36 94Z', head: 'M308 88C318 90 328 94 332 100L312 98Z',
    lines: 'M172 82L172 120M244 82L242 118M92 34L214 32', handles: [[184, 90], [120, 90]], mirror: 'M252 70L264 66L266 74L254 76Z', rails: true,
  },
  minibus: {
    body: 'M24 126L24 38C24 28 30 24 40 24L246 24C258 24 266 30 272 40L294 76C316 80 330 88 336 98C340 106 340 118 338 126L307 126A27 27 0 0 0 253 126L111 126A27 27 0 0 0 57 126Z',
    glass: ['M36 36H86V68H36Z', 'M94 36H150V68H94Z', 'M158 36H214V68H158Z', 'M222 36L248 36C254 36 258 40 262 46L276 72L222 72Z'],
    pillars: [],
    wheels: [[84, 126, 23], [280, 126, 23]],
    tail: 'M24 60L30 60L30 90L24 90Z', head: 'M316 88C324 90 330 94 334 100L318 98Z',
    lines: 'M94 78L216 78M218 30L218 122', handles: [[196, 84], [102, 84]], mirror: 'M272 64L284 60L286 68L274 70Z',
  },
  fourgonnette: {
    body: 'M30 126L30 44C30 34 36 30 46 30L212 30C224 30 232 36 238 46L258 78C288 82 310 90 320 100C326 108 326 118 324 126L294 126A26 26 0 0 0 242 126L110 126A26 26 0 0 0 58 126Z',
    glass: ['M196 40L222 40C228 40 232 44 236 50L250 76L196 76Z'],
    pillars: [],
    wheels: [[84, 126, 22], [268, 126, 22]],
    tail: 'M30 56L36 56L36 84L30 84Z', head: 'M296 92C306 94 316 98 320 104L300 102Z',
    lines: 'M190 36L190 122M112 36L112 118M112 80L188 80', handles: [[176, 88], [120, 88]], mirror: 'M244 66L256 62L258 70L246 72Z',
  },
  fourgon: {
    body: 'M18 126L18 26C18 16 24 12 34 12L240 12C252 12 260 18 266 28L292 70C316 74 332 84 338 96C342 104 342 118 340 126L310 126A28 28 0 0 0 254 126L104 126A28 28 0 0 0 48 126Z',
    glass: ['M222 26L248 26C256 26 262 32 266 40L282 68L222 68Z'],
    pillars: [],
    wheels: [[76, 126, 24], [282, 126, 24]],
    tail: 'M18 70L24 70L24 100L18 100Z', head: 'M312 86C322 88 332 94 336 100L316 98Z',
    lines: 'M216 20L216 120M122 22L122 118M122 74L214 74', handles: [[200, 80], [130, 80]], mirror: 'M268 54L280 50L282 58L270 60Z',
  },
  caisse: {
    box: true,
    body: 'M240 126L240 40C240 34 244 30 250 30L270 30C280 30 286 34 290 42L310 74C324 78 334 86 338 96C342 104 342 118 340 126L314 126A28 28 0 0 0 258 126Z',
    glass: ['M254 40L272 40C280 40 284 44 288 50L302 72L254 72Z'],
    pillars: [],
    wheels: [[70, 126, 24], [286, 126, 24]],
    tail: 'M12 76L18 76L18 96L12 96Z', head: 'M316 90L334 96L332 102L314 98Z',
    lines: '', handles: [[262, 84]], mirror: 'M292 58L302 54L304 62L294 64Z',
  },
};
function carSVG(shape, color = '#8a929c', opts = {}) {
  const S = SHAPES[shape] || SHAPES.citadine;
  const id = 'c' + ++svgSeq;
  const light = isLight(color);
  const stroke = light ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.26)';
  let out = `<svg viewBox="0 0 360 160" role="img" aria-label="${esc(opts.label || 'Véhicule')}"><defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4654"/><stop offset=".55" stop-color="#1b222b"/><stop offset="1" stop-color="#0f141a"/></linearGradient>
    <filter id="${id}b" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
    <ellipse cx="182" cy="151" rx="158" ry="7" fill="#000" opacity=".22" filter="url(#${id}b)"/>`;
  if (S.box) {
    out += `<rect x="12" y="6" width="234" height="96" rx="5" fill="${color}" stroke="${stroke}"/><rect x="12" y="6" width="234" height="96" rx="5" fill="url(#${id}s)"/>
      <path d="M12 38H246M12 70H246" stroke="${stroke}" stroke-width=".8" opacity=".6"/><rect x="10" y="100" width="252" height="10" rx="2" fill="#2a2f37"/><rect x="2" y="96" width="12" height="22" rx="2" fill="#3a4048"/>`;
  }
  out += `<path d="${S.body}" fill="${color}" stroke="${stroke}" stroke-width="1"/><path d="${S.body}" fill="url(#${id}s)"/>`;
  if (S.rails) out += '';
  for (const g of S.glass) out += `<path d="${g}" fill="url(#${id}g)"/>`;
  for (const [x, y, w, h] of S.pillars) out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}s)"/>`;
  if (S.lines) out += `<path d="${S.lines}" fill="none" stroke="${stroke}" stroke-width="1.1" stroke-linecap="round"/>`;
  for (const [x, y] of S.handles) out += `<rect x="${x}" y="${y}" width="15" height="4" rx="2" fill="${light ? 'rgba(20,24,30,.35)' : 'rgba(0,0,0,.35)'}"/>`;
  out += `<path d="${S.mirror}" fill="${shade(color, -0.25)}"/>`;
  out += `<path d="${S.tail}" fill="#c63a2f"/><path d="${S.head}" fill="#eef3f8" stroke="rgba(0,0,0,.28)" stroke-width=".8"/>`;
  for (const [cx, cy, r] of S.wheels) out += wheel(cx, cy, r);
  return out + '</svg>';
}
function hexToRgb(h) {
  const m = String(h).replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [138, 146, 156];
}
function isLight(h) { const [r, g, b] = hexToRgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62; }
function shade(h, k) {
  const [r, g, b] = hexToRgb(h);
  const f = (c) => Math.round(Math.max(0, Math.min(255, k < 0 ? c * (1 + k) : c + (255 - c) * k)));
  return `#${[f(r), f(g), f(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
/** Photo du véhicule : photo déposée par le loueur, sinon photo libre de droits, sinon silhouette. */
const photoOf = (v) => v.photo || PHOTOS[v.id]?.src || v.photoUrl || null;
const creditOf = (v) => (v.photo ? null : PHOTOS[v.id]?.credit || v.credit || null);
function vehicleVisual(v, extraClass = '') {
  const cut = !v.photo && PHOTOS[v.id]?.cut;
  if (cut) return `<div class="car-stage studio ${extraClass}"><img class="cut" src="${cut}" alt="${esc(v.name)}" loading="lazy"></div>`;
  const src = photoOf(v);
  if (src) return `<div class="car-stage has-photo ${extraClass}"><img class="photo" src="${esc(src)}" alt="${esc(v.name)}" loading="lazy" referrerpolicy="no-referrer" data-vid="${esc(v.id)}" onerror="imgFail(this)"></div>`;
  return `<div class="car-stage ${extraClass}">${carSVG(v.shape, v.color, { label: v.name })}</div>`;
}
function vehicleThumb(v) {
  const src = photoOf(v);
  return `<span class="thumb">${src ? `<img src="${esc(src)}" alt="" loading="lazy" referrerpolicy="no-referrer" data-vid="${esc(v.id)}" onerror="imgFail(this)">` : carSVG(v.shape, v.color)}</span>`;
}
/** Hors connexion ou photo introuvable : la silhouette prend le relais. */
window.imgFail = (img) => {
  const v = vehicle(img.dataset.vid);
  const box = img.parentElement;
  if (!v || !box) return;
  box.classList.remove('has-photo');
  img.replaceWith(document.createRange().createContextualFragment(carSVG(v.shape, v.color, { label: v.name })));
};
/** Photos libres de droits (Wikimedia Commons), en attendant les photos de la flotte réelle. */
const commons = (file, w = 1280) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;
const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
const PHOTOS = typeof EMBEDDED_PHOTOS === 'object' ? EMBEDDED_PHOTOS : {};

/* Adresse de la page courante : le site en ligne utilise de vraies adresses (/location-voiture-bordeaux) ;
   le fichier unique ouvert depuis l'ordinateur (file://) les garde derrière un « # ». */
const FILE_MODE = location.protocol === 'file:';
function curPath() {
  let p = FILE_MODE ? (location.hash.replace(/^#/, '') || '/') : location.pathname;
  p = p.split('?')[0].replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p || '/';
}

/* Adresses des fiches véhicules (référencement) : un nom lisible plutôt que l'identifiant interne */
const VEHICLE_SLUGS = {
  'v-clio': 'renault-clio-v', 'v-208': 'peugeot-208-automatique', 'v-classea': 'mercedes-classe-a-180', 'v-tesla': 'tesla-model-3',
  'v-5008': 'peugeot-5008-7-places', 'v-glc': 'mercedes-glc-amg-line', 'v-kangoo': 'renault-kangoo-van-3m3', 'v-trafic': 'renault-trafic-6m3',
  'v-master12': 'renault-master-12m3', 'v-master20': 'utilitaire-20m3-hayon', 'v-bus': 'renault-trafic-9-places',
};
const slugify = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/³/g, '3').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
/** Adresse d'une fiche : nom lisible ; un véhicule ajouté dans le logiciel reçoit un nom construit sur son modèle. */
const vehicleSlug = (v) => VEHICLE_SLUGS[v.id] || `${slugify(v.name)}-${String(v.id).replace(/^v-/, '')}`;
const vehicleHref = (v) => '/vehicule/' + vehicleSlug(v);
/** Retrouve un véhicule à partir de l'adresse (accepte aussi l'identifiant interne des anciens liens). */
function vehicleIdFromSlug(s) {
  const v = db.vehicles.find((x) => !x.deleted && (x.id === s || vehicleSlug(x) === s));
  return v ? v.id : null;
}

/* ---------- Stockage ---------- */
const STORE_KEY = 'prisma-rent-demo-v1';
const DATA_VERSION = 3;   // à augmenter quand la flotte de démonstration change : les données sont recréées
const DRAFT_KEY = 'prisma-rent-draft-v1';
const SESSION_KEY = 'prisma-rent-session-v1';
function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { /* stockage indisponible */ } }
let db = null;
function save() {
  if (!lsSet(STORE_KEY, db)) toast('Le navigateur refuse d’enregistrer : photo trop lourde ou navigation privée.', 'warn');
}

/* ---------- Jeu d'essai ---------- */
function rng(seed) {
  let t = seed >>> 0;
  return () => { t += 0x6d2b79f5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
}
function seedData() {
  const settings = {
    brand: 'PRISMA AUTOMOBILES',
    tagline: 'Un autre regard sur l’automobile',
    legalName: 'PRISMA AUTOMOBILES',
    legalForm: 'SAS au capital de 1 000 €',
    siren: '938 530 425',
    rcs: 'RCS Bordeaux',
    address: '72 bis avenue des Tabernottes',
    zip: '33370',
    city: 'Yvrac',
    phone: '07 49 58 81 44',
    email: '',
    accent: '#d9b878',
    logo: null,
    vat: 20,
    prepHours: 2,
    leadHours: 2,
    minAge: 21,
    youngYears: 3,
    youngFee: 15,
    youngFeeMax: 150,
    youngDeposit: 500,
    freeCancelHours: 48,
    installmentsMin: 150,
    fuelEighth: 14,
    cleaningFee: 35,
    hours: {
      1: { open: '08:30', close: '19:00' }, 2: { open: '08:30', close: '19:00' }, 3: { open: '08:30', close: '19:00' },
      4: { open: '08:30', close: '19:00' }, 5: { open: '08:30', close: '19:00' }, 6: { open: '09:00', close: '18:00' }, 0: null,
    },
    degressive: [{ days: 3, pct: 5 }, { days: 5, pct: 10 }, { days: 7, pct: 15 }, { days: 14, pct: 20 }, { days: 28, pct: 30 }],
    cgv: "1. Le locataire doit être titulaire d'un permis de conduire valide depuis au moins deux ans (trois ans pour certains véhicules) et avoir l'âge minimum indiqué sur la fiche du véhicule.\n2. Une caution est demandée au départ, par empreinte bancaire : elle n'est pas débitée et elle est libérée au retour du véhicule, déduction faite des éventuels frais.\n3. Le véhicule est remis avec le plein et doit être rendu avec le même niveau de carburant. À défaut, le carburant manquant est facturé.\n4. Le kilométrage inclus figure sur la réservation. Chaque kilomètre supplémentaire est facturé au tarif indiqué sur la fiche du véhicule.\n5. En cas de dommage, la franchise indiquée reste à la charge du locataire, sauf souscription d'une protection qui la réduit.\n6. Annulation gratuite jusqu'à 48 heures avant le départ. Au-delà, 50 % du montant de la location reste dû.\n7. Tout retard de plus de 59 minutes entraîne la facturation d'une journée supplémentaire.",
  };
  const agencies = [
    { id: 'yvrac', name: "Agence d'Yvrac", short: 'Yvrac', address: '72 bis avenue des Tabernottes, 33370 Yvrac', fee: 0, note: 'Parking gratuit, à 15 minutes de Bordeaux par la rocade.' },
    { id: 'gare', name: 'Gare Saint-Jean', short: 'Gare Saint-Jean', address: 'Parvis Louis-Armand, 33800 Bordeaux', fee: 25, note: 'Remise des clés en main propre à la sortie Belcier.' },
    { id: 'aeroport', name: 'Aéroport de Mérignac', short: 'Aéroport', address: 'Hall B, 33700 Mérignac', fee: 35, note: 'Accueil au point de rendez-vous des loueurs.' },
    { id: 'livraison', name: 'Livraison à votre adresse', short: 'Livraison', address: 'Bordeaux Métropole (25 km)', fee: 40, note: 'Adresse à préciser à l’étape suivante.' },
  ];
  const V = (o) => ({ status: 'actif', similar: true, ac: true, extraKm: 0.3, minAge: 21, minYears: 2, photo: null, equipment: [], ...o });
  const vehicles = [
    V({ id: 'v-clio', name: 'Renault Clio V', category: 'voiture', segment: 'Citadine', shape: 'citadine', color: '#e0592a', plate: 'GH-218-PR', seats: 5, doors: 5, gearbox: 'Manuelle', fuel: 'Essence', luggage: 2, price: 39, kmDay: 250, extraKm: 0.25, deposit: 800, franchise: 1000, odo: 28450, year: 2023,
      description: 'La citadine idéale pour Bordeaux : compacte, sobre, facile à garer. Parfaite pour les trajets du quotidien et les week-ends à deux.', equipment: ['Climatisation', 'Bluetooth', 'Apple CarPlay et Android Auto', 'Régulateur de vitesse'] }),
    V({ id: 'v-208', name: 'Peugeot 208 automatique', category: 'voiture', segment: 'Citadine automatique', shape: 'citadine', color: '#1d2a44', plate: 'GK-409-PR', seats: 5, doors: 5, gearbox: 'Automatique', fuel: 'Essence', luggage: 2, price: 49, kmDay: 250, extraKm: 0.25, deposit: 900, franchise: 1000, odo: 19870, year: 2024,
      description: 'Boîte automatique et écran tactile : la 208 rend la conduite en ville reposante, même aux heures de pointe.', equipment: ['Boîte automatique', 'Climatisation automatique', 'Caméra de recul', 'Apple CarPlay et Android Auto'] }),
    V({ id: 'v-classea', name: 'Mercedes Classe A 180', category: 'voiture', segment: 'Compacte premium', shape: 'berline', color: '#9e1b2c', plate: 'GL-733-PR', seats: 5, doors: 5, gearbox: 'Automatique', fuel: 'Essence', luggage: 3, price: 69, kmDay: 300, extraKm: 0.35, deposit: 1500, franchise: 1800, odo: 31200, year: 2023, minAge: 23,
      description: 'Le confort Mercedes au format compact : finitions soignées, grand écran MBUX et conduite très silencieuse.', equipment: ['Boîte automatique', 'Écran MBUX', 'Sièges chauffants', 'Aide au stationnement'] }),
    V({ id: 'v-tesla', name: 'Tesla Model 3', category: 'voiture', segment: 'Berline électrique', shape: 'berline', color: '#eef0f2', plate: 'GM-120-PR', seats: 5, doors: 4, gearbox: 'Automatique', fuel: 'Électrique', luggage: 3, price: 95, kmDay: 300, extraKm: 0.3, deposit: 2000, franchise: 2500, odo: 22300, year: 2024, minAge: 25, minYears: 3,
      description: '100 % électrique, jusqu’à 500 km d’autonomie et accès aux superchargeurs. Rendue avec au moins 70 % de charge.', equipment: ['Autopilot', 'Toit panoramique', 'Recharge Superchargeur', 'Écran 15 pouces'] }),
    V({ id: 'v-5008', name: 'Peugeot 5008 (7 places)', category: 'voiture', segment: 'SUV 7 places', shape: 'suv', color: '#f1f2f4', plate: 'GP-558-PR', seats: 7, doors: 5, gearbox: 'Automatique', fuel: 'Diesel', luggage: 5, price: 89, kmDay: 300, extraKm: 0.3, deposit: 1500, franchise: 1800, odo: 40210, year: 2023, minAge: 23,
      description: 'Sept vraies places et un grand coffre : le choix des familles et des groupes pour les vacances ou les événements.', equipment: ['7 places', 'Boîte automatique', 'Grand coffre', 'Caméra de recul'] }),
    V({ id: 'v-glc', name: 'Mercedes GLC (AMG Line)', category: 'voiture', segment: 'SUV premium', shape: 'suv', color: '#1c1f24', plate: 'GR-901-PR', seats: 5, doors: 5, gearbox: 'Automatique', fuel: 'Diesel', luggage: 4, price: 139, kmDay: 0, extraKm: 0, deposit: 3000, franchise: 3500, odo: 26640, year: 2024, minAge: 25, minYears: 3,
      description: 'SUV premium en finition AMG Line : sellerie cuir, sièges chauffants, grand écran tactile et kilométrage illimité. Élégant pour vos rendez-vous comme pour les longs trajets.', equipment: ['Kilométrage illimité', 'Sellerie cuir', 'Sièges chauffants', 'Apple CarPlay et Android Auto', 'Système audio premium'] }),
    V({ id: 'v-kangoo', name: 'Renault Kangoo Van 3 m³', category: 'utilitaire', segment: 'Petit utilitaire', shape: 'fourgonnette', color: '#f3f4f6', plate: 'GS-307-PR', seats: 2, doors: 4, gearbox: 'Manuelle', fuel: 'Diesel', volume: 3.3, payload: 650, price: 45, kmDay: 150, extraKm: 0.3, deposit: 1000, franchise: 1200, odo: 61200, year: 2022,
      description: 'Le petit utilitaire qui passe partout : idéal pour un canapé, des cartons ou vos chantiers en ville.', equipment: ['Porte latérale coulissante', 'Cloison de séparation', 'Anneaux d’arrimage'] }),
    V({ id: 'v-trafic', name: 'Renault Trafic 6 m³', category: 'utilitaire', segment: 'Utilitaire moyen', shape: 'fourgon', color: '#eceef1', plate: 'GT-642-PR', seats: 3, doors: 4, gearbox: 'Manuelle', fuel: 'Diesel', volume: 6, payload: 1100, price: 65, kmDay: 150, extraKm: 0.35, deposit: 1500, franchise: 1800, odo: 48900, year: 2023,
      description: 'Un studio ou un chantier : 6 m³ de chargement, trois places à l’avant et une conduite de voiture.', equipment: ['3 places', 'Porte latérale coulissante', 'Portes arrière 180°', 'Bluetooth'] }),
    V({ id: 'v-master12', name: 'Renault Master 12 m³', category: 'utilitaire', segment: 'Grand utilitaire', shape: 'fourgon', color: '#f5f6f8', plate: 'GV-128-PR', seats: 3, doors: 4, gearbox: 'Manuelle', fuel: 'Diesel', volume: 12, payload: 1300, price: 79, kmDay: 150, extraKm: 0.35, deposit: 2000, franchise: 2200, odo: 18400, year: 2024,
      description: 'Le format déménagement : un appartement de deux pièces tient en un voyage. Se conduit avec le permis B.', equipment: ['Permis B', 'Hauteur intérieure 1,90 m', 'Anneaux d’arrimage', 'Caméra de recul'] }),
    V({ id: 'v-master20', name: 'Utilitaire 20 m³ avec hayon', category: 'utilitaire', segment: 'Caisse avec hayon', shape: 'caisse', color: '#f7f7f5', plate: 'GW-520-PR', seats: 3, doors: 2, gearbox: 'Manuelle', fuel: 'Diesel', volume: 20, payload: 950, price: 109, kmDay: 150, extraKm: 0.4, deposit: 2500, franchise: 2800, odo: 55300, year: 2023, minYears: 3,
      description: 'Caisse de 20 m³ et hayon élévateur de 500 kg : le déménagement complet d’une maison, sans porter à bout de bras. Moins de 3,5 tonnes, permis B.', equipment: ['Hayon élévateur 500 kg', 'Permis B', 'Barres d’arrimage', 'Rampe de chargement'] }),
    V({ id: 'v-bus', name: 'Renault Trafic 9 places', category: 'utilitaire', segment: 'Minibus', shape: 'minibus', color: '#f1f2f4', plate: 'GX-903-PR', seats: 9, doors: 4, gearbox: 'Manuelle', fuel: 'Diesel', luggage: 6, price: 115, kmDay: 250, extraKm: 0.35, deposit: 2000, franchise: 2200, odo: 38800, year: 2023, minAge: 23, minYears: 3,
      description: 'Neuf places et de la place pour les bagages : équipes sportives, mariages, sorties associatives.', equipment: ['9 places', 'Climatisation avant et arrière', 'Bluetooth', 'Régulateur de vitesse'] }),
  ];
  // Photos : celles de la flotte si elles ont été intégrées, sinon photos libres de Wikimedia Commons
  const PH = {
    'v-clio': { file: 'Renault_Clio_V_1X7A0392.jpg', license: 'CC BY-SA 4.0' },
    'v-208': { file: 'Peugeot_e-208_Allure_(II)_–_f_26122020.jpg' },
    'v-classea': { file: 'Mercedes-Benz_A_180_(W177)_front.jpg' },
    'v-tesla': { file: 'Tesla_Model_3_(2023)_1X7A1678.jpg' },
    'v-5008': { file: 'Peugeot_5008_BlueHDi_130_Allure_(II,_Facelift)_–_f_20052021.jpg' },
    'v-glc': { file: 'Mercedes-Benz_X254_1X7A6346.jpg' },
    'v-kangoo': { file: 'Renault_Kangoo_III_Express_IMG_4218.jpg', author: 'Alexander Migl', license: 'CC BY-SA 4.0' },
    'v-trafic': { file: '2024_Renault_Trafic_Start_Blue_dCi_-_1997cc_2.0_(130PS)_Diesel_-_Silver_-_05-2024,_Front.jpg' },
    'v-master12': { file: 'Renault_Master_III_(2019)_IMG_4211.jpg', license: 'CC BY-SA 4.0' },
    'v-bus': { file: 'Renault_Trafic_Combi_(III)_–_f_29062016.jpg' },
  };
  for (const v of vehicles) {
    const ph = PH[v.id];
    if (ph) v.photoUrl = commons(ph.file), v.credit = { title: v.name, source: commonsPage(ph.file), author: ph.author || null, license: ph.license || null, site: 'Wikimedia Commons' };
  }
  const options = [
    { id: 'o-driver', name: 'Conducteur supplémentaire', icon: 'users', desc: 'Partagez le volant en toute légalité : un second conducteur déclaré et assuré.', price: 6, unit: 'jour', max: 60, maxQty: 2, cats: ['voiture', 'utilitaire'], active: true },
    { id: 'o-half', name: 'Protection Confort', icon: 'shield', desc: 'Votre franchise en cas de dommage est divisée par deux.', price: 12, unit: 'jour', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true, protect: 'half', excl: 'o-zero' },
    { id: 'o-zero', name: 'Protection Sérénité', icon: 'shield', desc: 'Zéro franchise en cas de dommage ou de vol. Vous repartez l’esprit tranquille.', price: 22, unit: 'jour', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true, protect: 'zero', excl: 'o-half' },
    { id: 'o-km', name: 'Kilométrage illimité', icon: 'infinity', desc: 'Roulez autant que vous voulez, sans aucun supplément au retour.', price: 12, unit: 'jour', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true, unlimited: true },
    { id: 'o-child', name: 'Siège enfant ou rehausseur', icon: 'baby', desc: 'Installé et vérifié avant votre départ. Précisez l’âge de l’enfant au comptoir.', price: 5, unit: 'jour', max: 40, maxQty: 3, cats: ['voiture'], active: true },
    { id: 'o-kit', name: 'Kit déménagement', icon: 'box', desc: 'Diable, sangles et six couvertures de protection, prêts dans le véhicule.', price: 19, unit: 'forfait', max: null, maxQty: 1, cats: ['utilitaire'], active: true },
    { id: 'o-clean', name: 'Retour sans lavage', icon: 'sparkle', desc: 'Rendez le véhicule tel quel : nous nous occupons du nettoyage intérieur et extérieur.', price: 25, unit: 'forfait', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true },
    { id: 'o-europe', name: 'Circulation en Europe', icon: 'globe', desc: 'Autorisation et assistance pour rouler hors de France (Espagne, Portugal, Italie…).', price: 7, unit: 'jour', max: 70, maxQty: 1, cats: ['voiture'], active: true },
  ];
  const promos = [
    { code: 'BIENVENUE10', pct: 10, active: true, note: 'Première location' },
    { code: 'PRO15', pct: 15, active: true, note: 'Partenaires professionnels' },
  ];
  const people = [
    ['Julien', 'Moreau'], ['Nadia', 'Benali'], ['Karim', 'Diallo'], ['Sophie', 'Martin'], ['Thomas', 'Laurent'], ['Inès', 'Haddad'],
    ['Mamadou', 'Sow'], ['Claire', 'Dubois'], ['Yanis', 'Cherif'], ['Léa', 'Fontaine'], ['Hugo', 'Garnier'], ['Sarah', 'Kaci'],
    ['Antoine', 'Roux'], ['Fatou', 'Ndiaye'], ['Mehdi', 'Amrani'], ['Camille', 'Lefèvre'], ['Rayan', 'Bensaïd'], ['Manon', 'Girard'],
  ];
  const r = rng(20260928);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const today = dayStart(new Date());
  const customers = people.map(([fn, ln], i) => ({
    id: 'c' + (i + 1), type: 'particulier', firstName: fn, lastName: ln,
    email: `${fn}.${ln}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z.]/g, '') + '@exemple.fr',
    phone: `06 ${pad(10 + Math.floor(r() * 89))} ${pad(10 + Math.floor(r() * 89))} ${pad(10 + Math.floor(r() * 89))} ${pad(10 + Math.floor(r() * 89))}`,
    address: `${1 + Math.floor(r() * 90)} ${pick(['rue Sainte-Catherine', 'cours de l’Yser', 'avenue Thiers', 'rue du Palais Gallien', 'quai des Chartrons', 'avenue de la Libération', 'rue Judaïque'])}`,
    zip: pick(['33000', '33100', '33800', '33150', '33270', '33370', '33700']), city: pick(['Bordeaux', 'Cenon', 'Floirac', 'Lormont', 'Yvrac', 'Mérignac']),
    birth: toISO(new Date(1975 + Math.floor(r() * 25), Math.floor(r() * 12), 1 + Math.floor(r() * 27))).slice(0, 10),
    license: { number: String(10 + Math.floor(r() * 89)) + 'AB' + String(10000 + Math.floor(r() * 89999)), date: toISO(new Date(1995 + Math.floor(r() * 22), Math.floor(r() * 12), 1 + Math.floor(r() * 27))).slice(0, 10), country: 'France' },
    createdAt: toISO(addDays(today, -200 + i * 7)), account: i % 2 === 0, blacklist: false, notes: '',
  }));
  for (const c of customers) if (c.account) c.pw = CLIENT_PW;
  customers.push({ id: 'c19', type: 'professionnel', company: 'BTP Garonne', siret: '812 345 678 00021', firstName: 'Olivier', lastName: 'Duprat', email: 'o.duprat@btp-garonne.exemple.fr', phone: '06 71 42 18 90', address: '14 rue des Artisans', zip: '33150', city: 'Cenon', birth: '1979-05-12', license: { number: '79CD12345', date: '1998-03-02', country: 'France' }, createdAt: toISO(addDays(today, -150)), account: true, pw: CLIENT_PW, blacklist: false, notes: 'Client régulier : Master 12 m³ le lundi.' });
  customers.push({ id: 'c20', type: 'professionnel', company: 'Déménagements Rive Droite', siret: '899 112 334 00018', firstName: 'Samia', lastName: 'Belkacem', email: 'contact@drd.exemple.fr', phone: '06 12 55 78 30', address: '3 allée des Lilas', zip: '33270', city: 'Floirac', birth: '1986-09-21', license: { number: '86EF54321', date: '2006-06-15', country: 'France' }, createdAt: toISO(addDays(today, -120)), account: true, pw: CLIENT_PW, blacklist: false, notes: '' });

  const data = { version: DATA_VERSION, seq: 0, settings, agencies, vehicles, options, promos, customers, reservations: [], blocks: [], sales: seedSales(), salesSeed: SALES_SEED, createdAt: toISO(new Date()), anchor: dateKey(today) };
  db = data; // le calcul des prix lit db

  const at = (d, h, m = 0) => { const x = new Date(d); x.setHours(h, m, 0, 0); return x; };
  const notSunday = (d) => (d.getDay() === 0 ? addDays(d, 1) : d);
  const custFor = (v) => (v.category === 'utilitaire' && r() < 0.35 ? pick(customers.slice(-2)) : pick(customers.slice(0, 18)));
  // Date de réservation : quelques jours avant le départ, et jamais dans le futur
  const bookedAt = (from) => { let d = addDays(from, -1 - Math.floor(r() * 10)); const now = new Date(); if (d > now) { d = addDays(now, -Math.floor(r() * 18)); d.setHours(8 + Math.floor(r() * 12), Math.floor(r() * 60), 0, 0); if (d > now) d = addDays(now, -1); } return d; };
  const mk = (v, from, to, status, extra = {}) => {
    const c = extra.customer || custFor(v);
    const opts = {};
    for (const o of options) if (o.cats.includes(v.category) && r() < (o.id === 'o-half' || o.id === 'o-driver' ? 0.3 : 0.12)) opts[o.id] = 1;
    if (opts['o-half'] && opts['o-zero']) delete opts['o-half'];
    if (v.kmDay === 0) delete opts['o-km'];
    const agencyStart = r() < 0.72 ? 'yvrac' : pick(['gare', 'aeroport', 'livraison']);
    const res = {
      id: uid('r'), number: '', createdAt: toISO(bookedAt(from)), status,
      vehicleId: v.id, customerId: c.id, from: toISO(from), to: toISO(to), agencyStart, agencyEnd: r() < 0.85 ? agencyStart : 'yvrac',
      options: opts, promo: r() < 0.08 ? 'BIENVENUE10' : null, youngDriver: false, channel: r() < 0.7 ? 'En ligne' : pick(['Téléphone', 'Agence']),
      payments: [], checkout: null, checkin: null, notes: '', ...extra,
    };
    delete res.customer;
    res.quote = quoteFor(res);
    const paidAt = toISO(parse(res.createdAt));
    if (status !== 'attente_paiement' && status !== 'annulee') res.payments.push({ id: uid('p'), amount: res.quote.total, method: pick(['Carte bancaire', 'Carte bancaire', 'Carte bancaire', 'Paiement en 3 fois', 'Apple Pay']), at: paidAt });
    if (status === 'en_cours' || status === 'terminee') {
      res.checkout = { km: v.odo, fuel: 8, docs: true, deposit: true, notes: '', at: res.from };
    }
    if (status === 'terminee') {
      const driven = Math.round((res.quote.days * (v.category === 'utilitaire' ? 110 : 160)) * (0.6 + r() * 0.8));
      const extras = [];
      if (res.quote.kmIncluded != null && driven > res.quote.kmIncluded) extras.push({ label: `Kilomètres supplémentaires (${driven - res.quote.kmIncluded} km)`, amount: round2((driven - res.quote.kmIncluded) * v.extraKm) });
      res.checkin = { km: v.odo + driven, fuel: 8, damages: 0, cleaning: false, notes: '', extras, at: res.to };
      if (extras.length) res.payments.push({ id: uid('p'), amount: round2(sum(extras, (e) => e.amount)), method: 'Carte bancaire', at: res.to });
    }
    data.reservations.push(res);
    return res;
  };

  // Historique : six mois de locations terminées
  for (const v of vehicles) {
    let cur = addDays(today, -186 + Math.floor(r() * 5));
    const limit = addDays(today, -3);
    while (true) {
      // activité en progression : les trous entre deux locations se resserrent au fil des mois
      const prog = (cur - addDays(today, -186)) / (180 * DAY);
      cur = notSunday(addDays(cur, Math.floor(r() * ((v.category === 'utilitaire' ? 4 : 5) - 3 * prog))));
      const len = v.category === 'utilitaire' ? 1 + Math.floor(r() * 3) : 2 + Math.floor(r() * 6);
      const from = at(cur, 9 + Math.floor(r() * 3), r() < 0.5 ? 0 : 30);
      let end = notSunday(addDays(cur, len));
      const to = at(end, 9 + Math.floor(r() * 8), r() < 0.5 ? 0 : 30);
      if (to > limit) break;
      mk(v, from, to, r() < 0.04 ? 'annulee' : 'terminee');
      cur = end;
    }
  }
  // Aujourd'hui et les semaines à venir : un planning vivant et lisible
  const T = (n) => addDays(today, n);
  const plan = [
    ['v-clio', T(-2), 10, 0, T(0), 17, 30, 'en_cours'], ['v-clio', T(6), 9, 0, T(9), 18, 0, 'confirmee'],
    ['v-208', T(0), 14, 0, T(4), 10, 0, 'confirmee'], ['v-208', T(9), 9, 30, T(12), 9, 30, 'confirmee'],
    ['v-classea', T(-1), 9, 0, T(2), 18, 0, 'en_cours'], ['v-classea', T(13), 10, 0, T(16), 10, 0, 'confirmee'],
    ['v-tesla', T(5), 11, 0, T(8), 11, 0, 'attente_paiement'], ['v-tesla', T(11), 9, 0, T(18), 9, 0, 'confirmee'],
    ['v-5008', T(7), 9, 0, T(14), 18, 0, 'confirmee'],
    ['v-glc', T(8), 9, 0, T(11), 9, 0, 'confirmee'], ['v-glc', T(16), 10, 0, T(19), 10, 0, 'attente_paiement'],
    ['v-kangoo', T(-3), 8, 30, T(0), 17, 0, 'en_cours'], ['v-kangoo', T(6), 9, 0, T(7), 18, 0, 'confirmee'],
    ['v-trafic', T(0), 9, 30, T(1), 18, 0, 'en_cours'], ['v-trafic', T(8), 8, 30, T(10), 18, 0, 'confirmee'],
    ['v-master12', T(-1), 8, 30, T(0), 18, 0, 'en_cours'], ['v-master12', T(5), 8, 30, T(6), 18, 0, 'confirmee'], ['v-master12', T(10), 8, 30, T(11), 12, 0, 'attente_paiement'],
    ['v-master20', T(5), 8, 30, T(6), 18, 0, 'confirmee'], ['v-master20', T(12), 9, 0, T(13), 17, 0, 'confirmee'],
    ['v-bus', T(9), 9, 0, T(11), 19, 0, 'confirmee'],
  ];
  for (const [vid, d1, h1, m1, d2, h2, m2, st] of plan) {
    const v = vehicles.find((x) => x.id === vid);
    const from = at(notSunday(d1), h1, m1);
    const to = at(notSunday(d2), h2, m2);
    mk(v, from, to, st);
  }
  // Au-delà : un carnet de commandes crédible, sans toucher aux dates proposées par défaut
  for (const v of vehicles) {
    const mine = () => data.reservations.filter((x) => x.vehicleId === v.id && x.status !== 'annulee');
    let cur = T(14 + Math.floor(r() * 3));
    while (cur < T(45)) {
      const len = v.category === 'utilitaire' ? 1 + Math.floor(r() * 2) : 2 + Math.floor(r() * 5);
      const from = at(notSunday(cur), 9 + Math.floor(r() * 2), r() < 0.5 ? 0 : 30);
      const to = at(notSunday(addDays(from, len)), 10 + Math.floor(r() * 7), 0);
      const free = !mine().some((x) => overlap(from.getTime() - 3 * 3600000, to.getTime() + 3 * 3600000, parse(x.from).getTime(), parse(x.to).getTime()));
      if (free && r() < 0.8) mk(v, from, to, r() < 0.18 ? 'attente_paiement' : 'confirmee');
      cur = addDays(to, 1 + Math.floor(r() * 3));
    }
  }
  const bus = vehicles.find((x) => x.id === 'v-bus');
  data.blocks.push({ id: uid('b'), vehicleId: bus.id, from: toISO(at(T(0), 8, 30)), to: toISO(at(T(2), 18, 0)), reason: 'Entretien et contrôle technique' });
  bus.nextService = dateKey(T(2));
  vehicles.find((x) => x.id === 'v-kangoo').nextService = dateKey(T(24));
  vehicles.find((x) => x.id === 'v-master12').nextService = dateKey(T(18));

  // Numérotation chronologique : PR-AAAA-MM-0001
  data.reservations.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  for (const res of data.reservations) { data.seq++; res.number = resNumber(parse(res.createdAt), data.seq); }
  return data;
}
function resNumber(d, n) { return `PR-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${String(n).padStart(4, '0')}`; }

/* ---------- Accès aux données ---------- */
const byId = (arr, id) => arr.find((x) => x.id === id);
const vehicle = (id) => byId(db.vehicles, id);
const customer = (id) => byId(db.customers, id);
const agency = (id) => byId(db.agencies, id) || db.agencies[0];
const option = (id) => byId(db.options, id);
const custName = (c) => (c ? (c.type === 'professionnel' && c.company ? `${c.company} (${c.firstName} ${c.lastName})` : `${c.firstName} ${c.lastName}`) : 'Client inconnu');
const STATUS = {
  attente_paiement: { label: 'En attente de paiement', cls: 'b-warn' },
  confirmee: { label: 'Confirmée', cls: 'b-info' },
  en_cours: { label: 'En cours', cls: 'b-violet' },
  terminee: { label: 'Terminée', cls: 'b-ok' },
  annulee: { label: 'Annulée', cls: 'b-danger' },
};
const statusBadge = (s) => `<span class="badge ${STATUS[s]?.cls || 'b-grey'}">${esc(STATUS[s]?.label || s)}</span>`;
const paid = (res) => round2(sum(res.payments || [], (p) => p.amount));
function balance(res) { return round2(totalDue(res) - paid(res)); }
/** Montant dû : le prix de la location (et les frais constatés au retour) ; après annulation, seuls les frais d'annulation. */
function totalDue(res) {
  if (res.status === 'annulee') return round2(res.cancelFee || 0);
  return round2((res.quote?.total || 0) + sum(res.checkin?.extras || [], (e) => e.amount));
}
/** Permis : « AB12345 (France), obtenu le 01/06/2010 », ou « à compléter » s'il n'est pas renseigné. */
function licText(c) {
  const l = c?.license || {};
  if (!l.number && !l.date) return 'à compléter';
  return [l.number, l.country ? `(${l.country})` : ''].filter(Boolean).join(' ') + (l.date && parse(l.date) ? `, obtenu le ${fmtD(l.date)}` : '');
}

/* ---------- Tarifs ---------- */
function degressivePct(days) {
  let pct = 0;
  for (const t of db.settings.degressive || []) if (days >= t.days) pct = Math.max(pct, t.pct);
  return pct;
}
function fromPrice(v) { return v.price; }
/** Devis complet d'une réservation (ou d'un brouillon). */
function quote({ vehicleId, from, to, agencyStart, agencyEnd, options = {}, promo = null, youngDriver = false }) {
  const v = vehicle(vehicleId);
  const s = db.settings;
  const days = rentalDays(from, to);
  const pct = degressivePct(days);
  const full = v.price * days;
  const deg = Math.round((full * pct) / 100);
  const lines = [{ label: `Location ${plural(days, 'jour')} (${eur(v.price)} par jour)`, amount: full, kind: 'base', unit: v.price, days }];
  if (deg) lines.push({ label: `Tarif dégressif (${pct} %)`, amount: -deg, kind: 'base' });
  const aS = agency(agencyStart);
  const aE = agency(agencyEnd || agencyStart);
  if (aS.fee) lines.push({ label: `Remise du véhicule : ${aS.name}`, amount: aS.fee, kind: 'lieu' });
  if (aE.fee) lines.push({ label: `Restitution : ${aE.name}`, amount: aE.fee, kind: 'lieu' });
  let protect = null;
  let unlimited = v.kmDay === 0;
  for (const o of db.options) {
    const qty = Math.min(options[o.id] || 0, o.maxQty || 1);
    if (!qty || !o.cats.includes(v.category)) continue;
    if (o.unlimited && v.kmDay === 0) continue;
    let amt = o.unit === 'jour' ? o.price * days : o.price;
    if (o.max) amt = Math.min(amt, o.max);
    amt *= qty;
    lines.push({ label: o.name + (qty > 1 ? ` × ${qty}` : ''), amount: round2(amt), kind: 'option', optionId: o.id });
    if (o.protect) protect = o.protect;
    if (o.unlimited) unlimited = true;
  }
  if (youngDriver) lines.push({ label: `Jeune conducteur (permis de moins de ${s.youngYears} ans)`, amount: Math.min(s.youngFee * days, s.youngFeeMax), kind: 'jeune' });
  let promoOk = null;
  if (promo) {
    const p = db.promos.find((x) => x.active && x.code === String(promo).toUpperCase());
    if (p) {
      const base = sum(lines, (l) => l.amount);
      lines.push({ label: `Code ${p.code} (${p.pct} %)`, amount: -Math.round((base * p.pct) / 100), kind: 'promo' });
      promoOk = p.code;
    }
  }
  const total = round2(sum(lines, (l) => l.amount));
  const ht = round2(total / (1 + s.vat / 100));
  const franchise = protect === 'zero' ? 0 : protect === 'half' ? round2(v.franchise / 2) : v.franchise;
  return {
    days, pct, lines, total, ht, tva: round2(total - ht),
    base: round2(full - deg),
    deposit: v.deposit + (youngDriver ? s.youngDeposit : 0),
    franchise, franchiseBase: v.franchise,
    kmIncluded: unlimited ? null : v.kmDay * days, extraKm: v.extraKm, promo: promoOk,
  };
}
const quoteFor = (res) => quote(res);

/* ---------- Disponibilités ---------- */
const overlap = (a1, a2, b1, b2) => a1 < b2 && b1 < a2;
function conflicts(vehicleId, from, to, ignoreId) {
  const prep = (db.settings.prepHours || 0) * 3600000;
  const f = parse(from).getTime() - prep;
  const t = parse(to).getTime() + prep;
  const out = [];
  for (const r of db.reservations) {
    if (r.vehicleId !== vehicleId || r.status === 'annulee' || r.status === 'terminee' && parse(r.to) < new Date() || r.id === ignoreId) continue;
    if (overlap(f, t, parse(r.from).getTime(), parse(r.to).getTime())) out.push({ kind: 'res', item: r, to: r.to });
  }
  for (const b of db.blocks) {
    if (b.vehicleId !== vehicleId) continue;
    if (overlap(f, t, parse(b.from).getTime(), parse(b.to).getTime())) out.push({ kind: 'block', item: b, to: b.to });
  }
  return out;
}
function isAvailable(vehicleId, from, to, ignoreId) {
  const v = vehicle(vehicleId);
  if (!v || v.status !== 'actif') return false;
  return conflicts(vehicleId, from, to, ignoreId).length === 0;
}
/** Première date à laquelle le véhicule est de nouveau libre pour une durée identique. */
function nextFree(vehicleId, from, to) {
  const dur = parse(to) - parse(from);
  let start = parse(from);
  for (let i = 0; i < 60; i++) {
    const c = conflicts(vehicleId, toISO(start), toISO(new Date(start.getTime() + dur)));
    if (!c.length) return start;
    const latest = c.map((x) => parse(x.to)).sort((a, b) => b - a)[0];
    start = new Date(latest.getTime() + (db.settings.prepHours || 0) * 3600000);
    const oh = openingFor(start);
    if (!oh) { start = dayStart(addDays(start, 1)); start = firstSlot(start); }
    else if (hm(start) > oh.close) { start = firstSlot(dayStart(addDays(start, 1))); }
    else if (hm(start) < oh.open) { const [h, m] = oh.open.split(':').map(Number); start.setHours(h, m, 0, 0); }
    else { const mm = start.getMinutes(); start.setMinutes(mm <= 30 ? 30 : 60, 0, 0); if (mm === 0) start.setMinutes(0); }
  }
  return null;
}

/* ---------- Horaires d'ouverture ---------- */
function openingFor(d) { return db.settings.hours[d.getDay()] || null; }
function slotsFor(d) {
  const oh = openingFor(d);
  if (!oh) return [];
  const [h1, m1] = oh.open.split(':').map(Number);
  const [h2, m2] = oh.close.split(':').map(Number);
  const out = [];
  for (let t = h1 * 60 + m1; t <= h2 * 60 + m2; t += 30) out.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`);
  return out;
}
function firstSlot(d) {
  let x = dayStart(d);
  for (let i = 0; i < 8; i++) {
    const sl = slotsFor(x);
    if (sl.length) { const [h, m] = sl[0].split(':').map(Number); x.setHours(h, m, 0, 0); return x; }
    x = addDays(x, 1);
  }
  return x;
}
function hoursLabel(d) {
  const oh = openingFor(d);
  return oh ? `${oh.open.replace(':', 'h')} à ${oh.close.replace(':', 'h')}` : 'fermé';
}
function weekHoursText() {
  const H = db.settings.hours;
  const fmt = (h) => (h ? `${h.open.replace(':', 'h')}-${h.close.replace(':', 'h')}` : 'fermé');
  const groups = [];
  for (const d of [1, 2, 3, 4, 5, 6, 0]) {
    const txt = fmt(H[d]);
    const g = groups[groups.length - 1];
    if (g && g.txt === txt) g.days.push(d); else groups.push({ txt, days: [d] });
  }
  const name = (d) => JOURS[d].slice(0, 1).toUpperCase() + JOURS[d].slice(1);
  return groups.map((g) => (g.days.length > 1 ? `${name(g.days[0])} au ${JOURS[g.days[g.days.length - 1]]}` : name(g.days[0])) + ' : ' + g.txt).join(' · ');
}
/** Contrôle d'une recherche (dates, horaires, délai). Renvoie un message ou null. */
function searchError(s) {
  if (!s || !s.from || !s.to) return 'Choisissez vos dates de départ et de retour.';
  const f = parse(s.from);
  const t = parse(s.to);
  const now = new Date();
  if (f < new Date(now.getTime() + (db.settings.leadHours || 0) * 3600000)) return `Le départ doit être prévu au moins ${db.settings.leadHours} heures à l'avance.`;
  if (t <= f) return 'Le retour doit être après le départ.';
  if (!openingFor(f)) return `L'agence est fermée le ${JOURS[f.getDay()]} : choisissez un autre jour de départ.`;
  if (!openingFor(t)) return `L'agence est fermée le ${JOURS[t.getDay()]} : choisissez un autre jour de retour.`;
  if (!slotsFor(f).includes(hm(f))) return `Départ possible de ${hoursLabel(f)} ce jour-là.`;
  if (!slotsFor(t).includes(hm(t))) return `Retour possible de ${hoursLabel(t)} ce jour-là.`;
  if (t - f > 90 * DAY) return 'Pour une location de plus de 90 jours, appelez-nous : nous établissons un devis.';
  return null;
}

/* ---------- Brouillon de réservation et session client ---------- */
let draft = null;
function saveDraft() { lsSet(DRAFT_KEY, draft); }
function defaultSearch() {
  const start = firstSlot(addDays(new Date(), 1));
  start.setHours(10, 0, 0, 0);
  if (!slotsFor(start).includes('10:00')) { const f = firstSlot(start); start.setTime(f.getTime()); }
  let end = addDays(start, 3);
  if (!openingFor(end)) end = addDays(end, 1);
  end.setHours(10, 0, 0, 0);
  return { from: toISO(start), to: toISO(end), agencyStart: 'yvrac', agencyEnd: 'yvrac', sameAgency: true, vehicleId: null, options: {}, promo: null, customer: null };
}
const session = () => lsGet(SESSION_KEY);
const setSession = (v) => (v ? lsSet(SESSION_KEY, v) : lsDel(SESSION_KEY));

/* ---------- Accès : espace client et espace loueur ----------
   L'application n'a pas encore de serveur : les mots de passe sont vérifiés dans le navigateur, sur une empreinte.
   Sur le site définitif, la connexion passe par le serveur (comptes, sessions, réinitialisation par email). */
const ADMIN_KEY = 'prisma-rent-admin-v1';
function pwHash(s) {
  let a = 0x811c9dc5, b = 0x9e3779b9;
  for (const ch of 'prisma|' + s) { const c = ch.codePointAt(0); a = Math.imul(a ^ c, 16777619) >>> 0; b = Math.imul(b ^ c, 2246822519) >>> 0; b = ((b << 13) | (b >>> 19)) >>> 0; }
  return a.toString(36) + '.' + b.toString(36);
}
const ADMIN_LOGIN = 'prisma';
const ADMIN_PW = 'bxu4u4.13vemlu';     // mot de passe de l'espace loueur
const CLIENT_PW = '6oo80i.n0bkyu';     // mot de passe des comptes clients livrés avec l'application
const PW_MIN = 8;
const adminSession = () => lsGet(ADMIN_KEY);
const setAdminSession = (v) => (v ? lsSet(ADMIN_KEY, v) : lsDel(ADMIN_KEY));
const checkAdmin = (login, pw) => login.trim().toLowerCase() === ADMIN_LOGIN && pwHash(pw) === ADMIN_PW;
/** Client qui a un espace (compte avec mot de passe) pour cet email, s'il existe. */
const accountFor = (email) => db.customers.find((x) => x.email === email.trim().toLowerCase() && x.account && x.pw);

/* ---------- Composants d'interface ---------- */
function toast(msg, kind = '') {
  let box = $('.toasts');
  if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast ' + kind;
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => t.remove(), 3600);
}
const MODALS = new Set();
function openModal({ title, body, foot = '', wide = false, onMount }) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="m-hd"><h3>${esc(title)}</h3><button class="icon-btn" data-close aria-label="Fermer">${icon('x')}</button></div><div class="m-bd">${body}</div>${foot ? `<div class="m-ft">${foot}</div>` : ''}</div>`;
  const prev = document.activeElement;
  const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); MODALS.delete(close); if (prev && prev.focus) prev.focus(); };
  MODALS.add(close);
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(ov);
  const first = ov.querySelector('input,select,textarea,button:not([data-close])');
  if (first) setTimeout(() => first.focus({ preventScroll: true }), 30);
  if (onMount) onMount(ov.querySelector('.modal'), close);
  return close;
}
function confirmBox(title, text, okLabel, onOk, danger) {
  openModal({
    title,
    body: `<p>${text}</p>`,
    foot: `<button class="btn btn-ghost" data-close>Retour</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-ok>${esc(okLabel)}</button>`,
    onMount: (m, close) => { m.querySelector('[data-ok]').onclick = () => { close(); onOk(); }; },
  });
}
function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
/** Réduit une image choisie par l'utilisateur (photo, logo) pour tenir dans le navigateur. */
function readImage(file, max = 900) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\//.test(file.type)) { reject(new Error('Choisissez une image (JPG ou PNG).')); return; }
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('Lecture impossible.'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Image illisible.'));
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.82));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}
function applyTheme() {
  const a = db.settings.accent || '#d9b878';
  document.documentElement.style.setProperty('--accent', a);
  document.documentElement.style.setProperty('--accent-ink', isLight(a) ? '#10131a' : '#ffffff');
  document.title = `${db.settings.brand} · location de voitures et d’utilitaires`;
}

/* ---------- Sélecteur de dates (départ et retour) ---------- */
function openDatePicker(state, onDone) {
  let from = parse(state.from);
  let to = parse(state.to);
  let picking = 'from';
  let month = new Date(from.getFullYear(), from.getMonth(), 1);
  const today0 = dayStart(new Date());
  const ag = agency(state.agencyStart);
  const close = openModal({
    title: 'Vos dates',
    body: '<div class="dp"></div>',
    foot: '<button class="btn btn-primary btn-block" data-ok>Valider ces dates</button>',
    onMount: (m, closeFn) => {
      const box = m.querySelector('.dp');
      const draw = () => {
        const monthHTML = (base) => {
          const first = new Date(base.getFullYear(), base.getMonth(), 1);
          const offset = (first.getDay() + 6) % 7;
          const nDays = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
          let cells = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'].map((d) => `<div class="dow">${d}</div>`).join('');
          for (let i = 0; i < offset; i++) cells += '<div></div>';
          for (let d = 1; d <= nDays; d++) {
            const day = new Date(base.getFullYear(), base.getMonth(), d);
            const closed = !openingFor(day);
            const past = day < today0;
            const cls = ['cal-day'];
            if (sameDay(day, today0)) cls.push('today');
            if (sameDay(day, from)) cls.push('start');
            if (to && sameDay(day, to)) cls.push('end');
            if (to && day > dayStart(from) && day < dayStart(to)) cls.push('in');
            cells += `<button type="button" class="${cls.join(' ')}" data-day="${dateKey(day)}" ${closed || past ? 'disabled' : ''} aria-label="${fmtDay(day, true)}${closed ? ', fermé' : ''}">${d}</button>`;
          }
          return `<div class="cal-month"><h4>${MOIS[base.getMonth()]} ${base.getFullYear()}</h4><div class="cal-grid">${cells}</div></div>`;
        };
        const next = new Date(month.getFullYear(), month.getMonth() + 1, 1);
        const canPrev = month > new Date(today0.getFullYear(), today0.getMonth(), 1);
        const opt = (d, cur) => slotsFor(d).map((t) => `<option ${t === cur ? 'selected' : ''}>${t}</option>`).join('');
        box.innerHTML = `
          <div class="cal-head">
            <button type="button" class="pt ${picking === 'from' ? 'on' : ''}" data-pick="from"><small>Départ</small><b>${fmtDay(from)} · ${hm(from).replace(':', 'h')}</b></button>
            <button type="button" class="pt ${picking === 'to' ? 'on' : ''}" data-pick="to"><small>Retour</small><b>${to ? fmtDay(to) + ' · ' + hm(to).replace(':', 'h') : 'à choisir'}</b></button>
          </div>
          <div class="cal-nav"><button type="button" class="icon-btn" data-nav="-1" ${canPrev ? '' : 'disabled'} aria-label="Mois précédent">${icon('chevL')}</button><span class="muted" style="font-size:13px">${picking === 'from' ? 'Touchez le jour de départ' : 'Touchez le jour de retour'}</span><button type="button" class="icon-btn" data-nav="1" aria-label="Mois suivant">${icon('chevR')}</button></div>
          ${monthHTML(month)}${monthHTML(next)}
          <div class="time-row">
            <label class="field"><span class="lbl">Heure de départ</span><select class="select" data-time="from">${opt(from, hm(from))}</select></label>
            <label class="field"><span class="lbl">Heure de retour</span><select class="select" data-time="to" ${to ? '' : 'disabled'}>${to ? opt(to, hm(to)) : ''}</select></label>
          </div>
          <p class="hours-note">${icon('clock', 'ic-inline')} ${esc(ag.name)} : ${esc(weekHoursText())}</p>`;
        $$('.hours-note svg', box).forEach((s) => { s.style.cssText = 'width:15px;height:15px;display:inline;vertical-align:-3px;margin-right:4px'; });
      };
      const setTime = (d, t) => { const [h, mm] = t.split(':').map(Number); d.setHours(h, mm, 0, 0); };
      const fitTime = (d, prefer) => { const sl = slotsFor(d); if (!sl.length) return; const cur = prefer || hm(d); setTime(d, sl.includes(cur) ? cur : sl.find((t) => t >= cur) || sl[sl.length - 1]); };
      box.addEventListener('click', (e) => {
        const nav = e.target.closest('[data-nav]');
        if (nav) { month = new Date(month.getFullYear(), month.getMonth() + Number(nav.dataset.nav), 1); draw(); return; }
        const pk = e.target.closest('[data-pick]');
        if (pk) { picking = pk.dataset.pick; draw(); return; }
        const b = e.target.closest('[data-day]');
        if (!b) return;
        const d = parse(b.dataset.day + 'T00:00');
        if (picking === 'from') {
          const keep = hm(from);
          from = d; fitTime(from, keep);
          if (!to || dayStart(to) <= dayStart(from)) { to = null; }
          picking = 'to';
        } else {
          if (d < dayStart(from)) { const keep = hm(from); from = d; fitTime(from, keep); to = null; picking = 'to'; draw(); return; }
          const keep = to ? hm(to) : hm(from);
          to = d; fitTime(to, keep);
          if (to <= from) { to = new Date(from.getTime() + 3600000); fitTime(to); if (to <= from) to = null; }
          picking = 'from';
        }
        draw();
      });
      box.addEventListener('change', (e) => {
        const s = e.target.closest('[data-time]');
        if (!s) return;
        if (s.dataset.time === 'from') setTime(from, s.value); else if (to) setTime(to, s.value);
        draw();
      });
      m.querySelector('[data-ok]').onclick = () => {
        if (!to) { toast('Choisissez aussi le jour de retour.', 'warn'); picking = 'to'; draw(); return; }
        const err = searchError({ from: toISO(from), to: toISO(to) });
        if (err) { toast(err, 'warn'); return; }
        closeFn();
        onDone(toISO(from), toISO(to));
      };
      draw();
    },
  });
  return close;
}
