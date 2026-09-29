const APP_SHOT = "/img/app-scroll.jpg";
/* Logo PRISMA */
const ASSETS = {"mark": "/img/marque/mark.png", "word": "/img/marque/word.webp", "wordmark": "/img/marque/wordmark.webp", "full": "/img/marque/full.webp", "doc": "/img/marque/doc.jpg"};
/* Photos des véhicules */
const EMBEDDED_PHOTOS = {"v-clio": {"credit": {"title": "Renault Clio V 1X7A0393.jpg", "author": "Alexander Migl", "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:Renault_Clio_V_1X7A0393.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/renault-clio-v.jpg", "cut": "/img/vehicules/renault-clio-v-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/renault-clio-v-detoure-700.webp", "smW": 700}, "v-208": {"credit": {"title": "Peugeot 208 II 1.2 PureTech 100 (2021) (52075685626).jpg", "author": "Charles from Port Chester, New York", "license": "CC BY 2.0", "source": "https://commons.wikimedia.org/wiki/File:Peugeot_208_II_1.2_PureTech_100_(2021)_(52075685626).jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/peugeot-208-automatique.jpg", "cut": "/img/vehicules/peugeot-208-automatique-detoure.webp", "w": 1360, "cutSm": "/img/vehicules/peugeot-208-automatique-detoure-700.webp", "smW": 700}, "v-classea": {"credit": {"title": "Mercedes-Benz A 180 AMG Line (W177, 2022) (54858992108).jpg", "author": "Charles from Port Chester, New York", "license": "CC0", "source": "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_A_180_AMG_Line_(W177,_2022)_(54858992108).jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/mercedes-classe-a-180.jpg", "cut": "/img/vehicules/mercedes-classe-a-180-detoure.webp", "w": 1052, "cutSm": "/img/vehicules/mercedes-classe-a-180-detoure-700.webp", "smW": 700}, "v-tesla": {"credit": {"title": "2024 Tesla Model 3 Highland Performance AWD.jpg", "author": "Chanokchon", "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:2024_Tesla_Model_3_Highland_Performance_AWD.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/tesla-model-3.jpg", "cut": "/img/vehicules/tesla-model-3-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/tesla-model-3-detoure-700.webp", "smW": 700}, "v-5008": {"credit": {"title": "Peugeot 5008 BlueHDi 180 EAT8 GT (II) – f 01092019.jpg", "author": "© M 93", "license": "CC BY-SA 3.0 de", "source": "https://commons.wikimedia.org/wiki/File:Peugeot_5008_BlueHDi_180_EAT8_GT_(II)_%E2%80%93_f_01092019.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/peugeot-5008-7-places.jpg", "cut": "/img/vehicules/peugeot-5008-7-places-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/peugeot-5008-7-places-detoure-700.webp", "smW": 700}, "v-glc": {"credit": {"title": "Mercedes-Benz X254 1X7A6137.jpg", "author": "Alexander Migl", "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_X254_1X7A6137.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/mercedes-glc-amg-line.jpg", "cut": "/img/vehicules/mercedes-glc-amg-line-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/mercedes-glc-amg-line-detoure-700.webp", "smW": 700}, "v-kangoo": {"credit": {"title": "2024 Renault Kangoo in Mineral White, front left, 06-12-2025.jpg", "author": "Cutlass", "license": "CC0", "source": "https://commons.wikimedia.org/wiki/File:2024_Renault_Kangoo_in_Mineral_White,_front_left,_06-12-2025.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/renault-kangoo-van-3m3.jpg", "cut": "/img/vehicules/renault-kangoo-van-3m3-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/renault-kangoo-van-3m3-detoure-700.webp", "smW": 700}, "v-trafic": {"credit": {"title": "2024 Renault Trafic LWB Premium front.jpg", "author": "LuvsMG481", "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:2024_Renault_Trafic_LWB_Premium_front.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/renault-trafic-6m3.jpg", "cut": "/img/vehicules/renault-trafic-6m3-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/renault-trafic-6m3-detoure-700.webp", "smW": 700}, "v-master12": {"credit": {"title": "Renault-Master.jpg", "author": "ГП", "license": "CC BY-SA 4.0", "source": "https://commons.wikimedia.org/wiki/File:Renault-Master.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/renault-master-12m3.jpg", "cut": "/img/vehicules/renault-master-12m3-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/renault-master-12m3-detoure-700.webp", "smW": 700}, "v-master20": {"credit": {"title": "Fiat 120 multijet.jpg", "author": "Jebulon", "license": "CC0", "source": "https://commons.wikimedia.org/wiki/File:Fiat_120_multijet.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/utilitaire-20m3-hayon.jpg", "cut": "/img/vehicules/utilitaire-20m3-hayon-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/utilitaire-20m3-hayon-detoure-700.webp", "smW": 700}, "v-bus": {"credit": {"title": "Renault Trafic 191311935.jpg", "author": "Trop86", "license": "CC0", "source": "https://commons.wikimedia.org/wiki/File:Renault_Trafic_191311935.jpg", "site": "Photo libre de droits"}, "src": "/img/vehicules/renault-trafic-9-places.jpg", "cut": "/img/vehicules/renault-trafic-9-places-detoure.webp", "w": 1400, "cutSm": "/img/vehicules/renault-trafic-9-places-detoure-700.webp", "smW": 700}};
/* Photos des véhicules à vendre */
const EMBEDDED_SALE_PHOTOS = {"vo-3008": {"credit": {"title": "Peugeot 3008 GT-Line 1.5 Diesel Auto (2020)", "author": "andreboeni", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/65344061@N06/50322441606", "site": "Photo libre de droits"}, "src": "/img/occasion/peugeot-3008.jpg", "cut": "/img/occasion/peugeot-3008-detoure.webp", "w": 913, "cutSm": "/img/occasion/peugeot-3008-detoure-700.webp", "smW": 700}, "vo-500": {"credit": {"title": "2016 Fiat 500 - First Drive", "author": "The National Roads and Motorists' Association", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/54731423@N04/25348263113", "site": "Photo libre de droits"}, "src": "/img/occasion/fiat-500.jpg", "cut": "/img/occasion/fiat-500-detoure.webp", "w": 838, "cutSm": "/img/occasion/fiat-500-detoure-700.webp", "smW": 700}, "vo-a3": {"credit": {"title": "Audi A3 Limousine (8Y) 35 TFSI (2022)", "author": "usf1fan2", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/43494963@N03/52199175538", "site": "Photo libre de droits"}, "src": "/img/occasion/audi-a3-berline.jpg", "cut": "/img/occasion/audi-a3-berline-detoure.webp", "w": 575}, "vo-c3": {"credit": {"title": "Citroen C3 PureTech 82 Shine 2017", "author": "RL GNZLZ", "license": "CC BY-SA 2.0", "source": "https://www.flickr.com/photos/37691369@N08/36468580172", "site": "Photo libre de droits"}, "src": "/img/occasion/citroen-c3.jpg", "cut": "/img/occasion/citroen-c3-detoure.webp", "w": 998, "cutSm": "/img/occasion/citroen-c3-detoure-700.webp", "smW": 700}, "vo-captur": {"credit": {"title": "2021 Renault Captur Intense", "author": "TuRbO_J", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/30474136@N07/52755447873", "site": "Photo libre de droits"}, "src": "/img/occasion/renault-captur.jpg", "cut": "/img/occasion/renault-captur-detoure.webp", "w": 739}, "vo-golf": {"credit": {"title": "Volkswagen Golf VIII GTI (2021)", "author": "usf1fan2", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/43494963@N03/52197086612", "site": "Photo libre de droits"}, "src": "/img/occasion/volkswagen-golf.jpg", "cut": "/img/occasion/volkswagen-golf-detoure.webp", "w": 532}, "vo-modely": {"credit": {"title": "Tesla Model Y Dual Motor 2024", "author": "RL GNZLZ", "license": "CC BY-SA 2.0", "source": "https://www.flickr.com/photos/37691369@N08/53971462174", "site": "Photo libre de droits"}, "src": "/img/occasion/tesla-model-y.jpg", "cut": "/img/occasion/tesla-model-y-detoure.webp", "w": 936, "cutSm": "/img/occasion/tesla-model-y-detoure-700.webp", "smW": 700}, "vo-partner": {"credit": {"title": "Peugeot Partner HDi Cargo 2020", "author": "RL GNZLZ", "license": "CC BY-SA 2.0", "source": "https://www.flickr.com/photos/37691369@N08/49721103952", "site": "Photo libre de droits"}, "src": "/img/occasion/peugeot-partner.jpg", "cut": "/img/occasion/peugeot-partner-detoure.webp", "w": 966, "cutSm": "/img/occasion/peugeot-partner-detoure-700.webp", "smW": 700}, "vo-sandero": {"credit": {"title": "Dacia Sandero Stepway TCe 90 (2021)", "author": "usf1fan2", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/43494963@N03/52577968379", "site": "Photo libre de droits"}, "src": "/img/occasion/dacia-sandero-stepway.jpg", "cut": "/img/occasion/dacia-sandero-stepway-detoure.webp", "w": 900, "cutSm": "/img/occasion/dacia-sandero-stepway-detoure-700.webp", "smW": 700}, "vo-serie3": {"credit": {"title": "BMW 3-Series (G20) 330i xDrive (2024)", "author": "usf1fan2", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/43494963@N03/54017667620", "site": "Photo libre de droits"}, "src": "/img/occasion/bmw-serie-3.jpg", "cut": "/img/occasion/bmw-serie-3-detoure.webp", "w": 961, "cutSm": "/img/occasion/bmw-serie-3-detoure-700.webp", "smW": 700}, "vo-transit": {"credit": {"title": "Ford Transit Custom 2.0 TDCi (2018)", "author": "usf1fan2", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/43494963@N03/52182103709", "site": "Photo libre de droits"}, "src": "/img/occasion/ford-transit-custom-kombi.jpg", "cut": "/img/occasion/ford-transit-custom-kombi-detoure.webp", "w": 696}, "vo-yaris": {"credit": {"title": "Toyota Yaris Foto 2020 Free image", "author": "Autobilder Gratis", "license": "CC BY 2.0", "source": "https://www.flickr.com/photos/187386712@N03/49675988472", "site": "Photo libre de droits"}, "src": "/img/occasion/toyota-yaris.jpg", "cut": "/img/occasion/toyota-yaris-detoure.webp", "w": 975, "cutSm": "/img/occasion/toyota-yaris-detoure-700.webp", "smW": 700}};
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
const DATA_VERSION = 2;   // à augmenter quand la flotte de démonstration change : les données sont recréées
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
  customers.push({ id: 'c19', type: 'professionnel', company: 'BTP Garonne', siret: '812 345 678 00021', firstName: 'Olivier', lastName: 'Duprat', email: 'o.duprat@btp-garonne.exemple.fr', phone: '06 71 42 18 90', address: '14 rue des Artisans', zip: '33150', city: 'Cenon', birth: '1979-05-12', license: { number: '79CD12345', date: '1998-03-02', country: 'France' }, createdAt: toISO(addDays(today, -150)), account: true, blacklist: false, notes: 'Client régulier : Master 12 m³ le lundi.' });
  customers.push({ id: 'c20', type: 'professionnel', company: 'Déménagements Rive Droite', siret: '899 112 334 00018', firstName: 'Samia', lastName: 'Belkacem', email: 'contact@drd.exemple.fr', phone: '06 12 55 78 30', address: '3 allée des Lilas', zip: '33270', city: 'Floirac', birth: '1986-09-21', license: { number: '86EF54321', date: '2006-06-15', country: 'France' }, createdAt: toISO(addDays(today, -120)), account: true, blacklist: false, notes: '' });

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

/* =====================================================================
   ANIMATIONS : intro 3D, apparitions au défilement, cartes en relief,
   showroom, compteurs, confettis. Tout respecte « réduire les animations ».
   ===================================================================== */
const FINE = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Le « P » en 3D (three.js) : intégré au fichier unique, chargé à la demande sur le site en ligne ---------- */
let prismLoading = null;
function loadPrism3D() {
  if (typeof createPrism === 'function') return Promise.resolve(true);
  const url = window.PRISMA_THREE_URL;
  if (!url) return Promise.resolve(false);
  return prismLoading || (prismLoading = new Promise((res) => {
    const sc = document.createElement('script');
    sc.src = url;
    sc.async = true;
    sc.onload = () => res(typeof createPrism === 'function');
    sc.onerror = () => { prismLoading = null; res(false); };
    document.head.appendChild(sc);
  }));
}

/* ---------- Intro : le prisme PRISMA en 3D, puis le logo ---------- */
function playIntro() {
  if (window.PRISMA_PRERENDER) return;
  let seen = false;
  try { seen = sessionStorage.getItem('prisma-intro') === '1'; sessionStorage.setItem('prisma-intro', '1'); } catch (e) { /* navigation privée */ }
  // uniquement sur l'accueil : un visiteur qui arrive sur une page de location voit tout de suite son contenu
  if (seen || REDUCED || curPath() !== '/') return;
  const el = document.createElement('div');
  el.className = 'intro';
  el.innerHTML = `<canvas class="intro-canvas"></canvas><div class="intro-brand"><img class="blend" src="${ASSETS.word}" alt="${esc(db.settings.brand)}"><i class="intro-line"></i><p>${esc(db.settings.tagline)}</p></div><button class="intro-skip" type="button">Passer</button>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-on');
  let prism = null;
  let t0 = performance.now();
  const D = 3300;
  let done = false;
  const tick = (now) => {
    if (done) return;
    const p = Math.min(1, (now - t0) / 2400);
    if (prism) prism.setProgress(p);
    if (now - t0 > 1500) el.classList.add('brand');
    if (now - t0 > D) finish(); else requestAnimationFrame(tick);
  };
  const finish = () => {
    if (done) return;
    done = true;
    el.classList.add('out');
    document.documentElement.classList.remove('intro-on');
    initReveal();
    revealAll();
    setTimeout(() => { if (prism) prism.dispose(); el.remove(); }, 1000);
  };
  el.querySelector('.intro-skip').onclick = finish;
  el.addEventListener('click', (e) => { if (!e.target.closest('.intro-skip')) finish(); });
  // la 3D ne fait jamais attendre : sans elle au bout de 1,2 s, le logo s'affiche en image
  const late = new Promise((res) => setTimeout(() => res(false), 1200));
  Promise.race([loadPrism3D(), late]).then((ok) => {
    if (done) return;
    prism = ok ? createPrism(el.querySelector('canvas'), { mode: 'intro' }) : null;
    t0 = performance.now();
    if (prism) { prism.onFirstFrame(() => { t0 = performance.now(); el.classList.add('ready'); }); prism.start(); }
    else { el.classList.add('no3d'); el.insertAdjacentHTML('afterbegin', `<img class="intro-mark blend" src="${ASSETS.mark}" alt="">`); }
    requestAnimationFrame(tick);
  });
}

/* ---------- Apparition au défilement ---------- */
let revealObs = null;
function splitWords(root) {
  $$('[data-words]', root).forEach((h) => {
    if (h.dataset.split) return;
    h.dataset.split = '1';
    let i = 0;
    const walk = (node) => {
      for (const n of Array.from(node.childNodes)) {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          for (const part of parts) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); continue; }
            const w = document.createElement('span'); w.className = 'rw';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--d', `${0.05 + i++ * 0.07}s`);
            w.appendChild(s); frag.appendChild(w);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          if (n.classList.contains('gold-text')) { const w = document.createElement('span'); w.className = 'rw'; n.replaceWith(w); w.appendChild(n); n.style.setProperty('--d', `${0.05 + i++ * 0.07}s`); n.classList.add('rw-in'); }
          else walk(n);
        }
      }
    };
    walk(h);
  });
}
function initReveal(root = document) {
  splitWords(root);
  $$('[data-stagger]', root).forEach((p) => { Array.from(p.children).forEach((c, i) => { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--d', `${Math.min(i, 8) * 0.08}s`); }); });
  const els = $$('[data-reveal]:not(.in), [data-words]:not(.in)', root);
  if (REDUCED || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); $$('[data-count]', root).forEach(countUp); return; }
  if (document.documentElement.classList.contains('intro-on')) return;
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); if (en.target.hasAttribute('data-count')) countUp(en.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e) => revealObs.observe(e));
  $$('[data-count]:not([data-reveal])', root).forEach((e) => countUp(e));
}
function revealAll() { $$('[data-reveal],[data-words]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < window.innerHeight) e.classList.add('in'); }); }

/* ---------- Compteurs ---------- */
function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const to = Number(el.dataset.count) || 0;
  const fmt = el.dataset.fmt || 'int';
  const out = (v) => (fmt === 'eur' ? eur(Math.round(v)) : fmt === 'pct' ? `${Math.round(v)} %` : Math.round(v).toLocaleString('fr-FR'));
  if (REDUCED) { el.textContent = out(to); return; }
  const t0 = performance.now(), D = 1300;
  const step = (now) => { const p = Math.min(1, (now - t0) / D); const e = 1 - Math.pow(1 - p, 4); el.textContent = out(to * e); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- Cartes en relief (souris) ---------- */
function initTilt(root = document) {
  if (!FINE || REDUCED) return;
  $$('[data-tilt]', root).forEach((card) => {
    if (card.dataset.tiltOn) return;
    card.dataset.tiltOn = '1';
    const max = Number(card.dataset.tilt) || 6;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
}

/* ---------- Showroom : plateau lumineux, reflets, carrousel ---------- */
function carArt(v) {
  const cut = PHOTOS[v.id]?.cut;
  if (cut) return `<img class="sr-img" src="${cut}" alt="${esc(v.name)}">`;
  return carSVG(v.shape, v.color, { label: v.name });
}
function showroomHTML(list, { carousel = false, big = false } = {}) {
  const cars = list.map((v, i) => `<div class="sr-car ${i === 0 ? 'on' : ''}${PHOTOS[v.id]?.cut ? ' photo' : ''}" data-i="${i}"><div class="sr-body">${carArt(v)}</div><div class="sr-refl" aria-hidden="true">${carArt(v)}</div></div>`).join('');
  const meta = carousel ? `<div class="sr-meta">
      <div class="sr-info" aria-live="polite"><span class="sr-seg">${esc(list[0].segment)}</span><b class="sr-name">${esc(list[0].name)}</b><span class="sr-price">À partir de <b>${eur(list[0].price)}</b> par jour</span></div>
      <div class="sr-nav"><button type="button" class="icon-btn" data-sr-prev aria-label="Véhicule précédent">${icon('chevL')}</button><div class="sr-dots">${list.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div><button type="button" class="icon-btn" data-sr-next aria-label="Véhicule suivant">${icon('chevR')}</button></div>
    </div>` : '';
  return `<div class="showroom ${big ? 'big' : ''}" data-showroom data-ids="${list.map((v) => esc(v.id)).join(',')}">
    <div class="sr-scene">
      <div class="sr-spot"></div>
      <div class="sr-floor"><i class="sr-ring"></i><i class="sr-ring r2"></i><i class="sr-grid"></i></div>
      <canvas class="sr-dust" aria-hidden="true"></canvas>
      <div class="sr-cars">${cars}</div>
      <div class="sr-sweep" aria-hidden="true"></div>
    </div>${meta}</div>`;
}
const showrooms = new Set();
function mountShowrooms(root = document) {
  $$('[data-showroom]', root).forEach((sr) => {
    if (sr.dataset.on) return;
    sr.dataset.on = '1';
    const ids = sr.dataset.ids.split(',');
    const cars = $$('.sr-car', sr);
    const scene = $('.sr-scene', sr);
    let i = 0, timer = null;
    let moved = 0;
    const show = (n) => {
      if (!sr.isConnected) { clearInterval(timer); return; }
      if (cars.length < 2) return;
      const next = (n + cars.length) % cars.length;
      if (next === i) return;
      const cur = cars[i];
      cur.classList.remove('on'); cur.classList.add('off');
      setTimeout(() => cur.classList.remove('off'), 900);
      cars[next].classList.add('on');
      i = next;
      const v = vehicle(ids[i]);
      const info = $('.sr-info', sr);
      if (info && v) {
        info.classList.remove('swap'); void info.offsetWidth; info.classList.add('swap');
        $('.sr-seg', info).textContent = v.segment; $('.sr-name', info).textContent = v.name; $('.sr-price b', info).textContent = eur(v.price);
      }
      $$('.sr-dots i', sr).forEach((d, k) => d.classList.toggle('on', k === i));
    };
    const auto = () => { clearInterval(timer); if (!REDUCED && cars.length > 1) timer = setInterval(() => show(i + 1), 5200); };
    const prev = $('[data-sr-prev]', sr), next = $('[data-sr-next]', sr);
    if (prev) prev.onclick = () => { show(i - 1); auto(); };
    if (next) next.onclick = () => { show(i + 1); auto(); };
    $$('.sr-dots i', sr).forEach((d, k) => (d.onclick = () => { show(k); auto(); }));
    const link = $('.sr-cars', sr);
    if (link && sr.closest('.hero')) link.addEventListener('click', () => { if (moved > 6) return; const v = vehicle(ids[i]); if (v) go(vehicleHref(v)); });
    auto();
    // Relief : la scène suit la souris, ou le doigt quand on fait glisser
    let rx = 0, ry = 0, tx = 0, ty = 0, dragging = false, sx = 0, base = 0;
    const loop = () => { rx += (tx - rx) * 0.08; ry += (ty - ry) * 0.08; scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; if (sr.isConnected) requestAnimationFrame(loop); };
    if (!REDUCED) {
      requestAnimationFrame(loop);
      sr.addEventListener('pointermove', (e) => {
        const r = sr.getBoundingClientRect();
        if (dragging) { moved = Math.max(moved, Math.abs(e.clientX - sx)); ty = Math.max(-18, Math.min(18, base + ((e.clientX - sx) / r.width) * 40)); return; }
        if (!FINE) return;
        ty = ((e.clientX - r.left) / r.width - 0.5) * 12;
        tx = (0.5 - (e.clientY - r.top) / r.height) * 6;
      });
      sr.addEventListener('pointerleave', () => { if (!dragging) { tx = 0; ty = 0; } });
      sr.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; dragging = true; moved = 0; sx = e.clientX; base = ty; });
      const up = () => { dragging = false; setTimeout(() => { tx = 0; ty = 0; }, 1200); };
      sr.addEventListener('pointerup', up); sr.addEventListener('pointercancel', up);
    }
    // Poussière de lumière
    const cv = $('.sr-dust', sr);
    if (cv && !REDUCED) dust(cv, sr);
    showrooms.add(sr);
    const stop = () => clearInterval(timer);
    sr._stop = stop;
  });
}
function dust(cv, host) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const P = [];
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
  size();
  for (let k = 0; k < 42; k++) P.push({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.4, s: 0.02 + Math.random() * 0.05, a: Math.random() * Math.PI * 2, g: Math.random() < 0.6 });
  let last = performance.now();
  const frame = (now) => {
    if (!host.isConnected) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (cv.width !== cv.clientWidth * dpr) size();
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) {
      p.y -= p.s * dt; p.a += dt * 1.6;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      const alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(p.a));
      ctx.beginPath();
      ctx.fillStyle = p.g ? `rgba(243,225,182,${alpha})` : `rgba(202,218,233,${alpha})`;
      ctx.arc(p.x * cv.width, p.y * cv.height, p.r * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- Prisme du bandeau de marque (rendu seulement quand il est visible) ---------- */
let bandPrism = null;
let bandIO = null;
function mountBandPrism() {
  disposeBandPrism();
  const cv = $('.band-canvas');
  if (!cv) return;
  // three.js n'est chargé que lorsque le bandeau approche de l'écran
  let visible = false;
  let asked = false;
  const io = new IntersectionObserver((en) => {
    visible = en[0].isIntersecting;
    if (visible && !asked) {
      asked = true;
      loadPrism3D().then((ok) => {
        if (bandIO !== io || !cv.isConnected) return;
        bandPrism = ok ? createPrism(cv, { mode: 'band' }) : null;
        if (!bandPrism) { cv.closest('.brand-3d')?.classList.add('no3d'); io.disconnect(); return; }
        if (visible) bandPrism.start();
      });
    }
    if (bandPrism) { if (visible) bandPrism.start(); else bandPrism.stop(); }
  }, { rootMargin: '300px 0px' });
  io.observe(cv);
  bandIO = io;
}
function disposeBandPrism() {
  if (bandIO) { bandIO.disconnect(); bandIO = null; }
  if (bandPrism) { bandPrism.dispose(); bandPrism = null; }
}

/* ---------- Confettis dorés (paiement accepté) ---------- */
function celebrate(x = window.innerWidth / 2, y = window.innerHeight / 3) {
  if (REDUCED) return;
  const cv = document.createElement('canvas');
  cv.className = 'confetti';
  document.body.appendChild(cv);
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = window.innerWidth * dpr; cv.height = window.innerHeight * dpr;
  const ctx = cv.getContext('2d');
  const cols = ['#f6e7c2', '#e3c58f', '#c39a61', '#ffffff', '#cadae9', '#e6cfdc'];
  const P = Array.from({ length: 140 }, () => ({ x: x * dpr, y: y * dpr, vx: (Math.random() - 0.5) * 14 * dpr, vy: (-Math.random() * 13 - 4) * dpr, w: (4 + Math.random() * 6) * dpr, h: (2 + Math.random() * 3) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[Math.floor(Math.random() * cols.length)] }));
  const t0 = performance.now();
  const frame = (now) => {
    const t = now - t0;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) {
      p.vy += 0.38 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - t / 2600); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    }
    if (t < 2700) requestAnimationFrame(frame); else cv.remove();
  };
  requestAnimationFrame(frame);
}

/* ---------- En-tête qui se densifie au défilement ---------- */
function onScrollHeader() {
  const h = $('.site-header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScrollHeader, { passive: true });

/* ---------- Accueil : véhicules qui défilent sur la scène ---------- */
function mountHero() {
  const hero = $('.hero2');
  if (!hero || hero.dataset.on) return;
  hero.dataset.on = '1';
  const cars = $$('.h2-car', hero);
  const dots = $$('.h2-dots button', hero);
  const cap = $('[data-cap]', hero);
  let i = 0;
  let timer = null;
  const show = (n) => {
    if (!hero.isConnected) { clearInterval(timer); return; }
    if (cars.length < 2) return;
    const next = (n + cars.length) % cars.length;
    if (next === i) return;
    const prev = cars[i];
    prev.classList.remove('on'); prev.classList.add('off');
    setTimeout(() => prev.classList.remove('off'), 1100);
    cars[next].classList.add('on');
    dots.forEach((d, k) => d.classList.toggle('on', k === next));
    i = next;
    const v = vehicle(cars[i].dataset.v);
    if (cap && v) {
      cap.href = vehicleHref(v);
      $('[data-cap-seg]', cap).textContent = v.segment;
      $('[data-cap-name]', cap).textContent = nameDash(v);
      $('[data-cap-price]', cap).textContent = money(v.price) + taxTag();
      cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
    }
  };
  const auto = () => { clearInterval(timer); if (!REDUCED && cars.length > 1) timer = setInterval(() => { if (!document.hidden) show(i + 1); }, 5200); };
  dots.forEach((d, k) => (d.onclick = () => { show(k); auto(); }));
  const stage = $('.h2-cars', hero);
  if (stage) stage.onclick = () => { const id = cars[i]?.dataset.v; if (id) go(vehicleHref(vehicle(id))); };
  auto();
  const cv = $('.sr-dust', hero);
  if (cv && !REDUCED) dust(cv, hero);
}
/* ---------- Témoignages : défilement par page, points, rotation douce ---------- */
function mountTestimonials() {
  const box = $('[data-tst]');
  if (!box || box.dataset.on) return;
  box.dataset.on = '1';
  const track = $('.tst-track', box);
  const cards = $$('.tst-c', box);
  const dotsBox = box.parentElement.querySelector('.tst-dots');
  const per = () => (window.innerWidth < 760 ? 1 : 2);
  const pages = () => Math.max(1, Math.ceil(cards.length / per()));
  let page = 0;
  let timer = null;
  const mark = () => $$('button', dotsBox).forEach((b, j) => b.classList.toggle('on', j === page));
  const goTo = (k) => {
    page = (k + pages()) % pages();
    const c = cards[Math.min(cards.length - 1, page * per())];
    track.scrollTo({ left: c.offsetLeft - cards[0].offsetLeft, behavior: REDUCED ? 'auto' : 'smooth' });
    mark();
  };
  const draw = () => {
    if (!dotsBox) return;
    dotsBox.innerHTML = Array.from({ length: pages() }, (_, k) => `<button type="button" class="${k === page ? 'on' : ''}" aria-label="Avis, page ${k + 1}"></button>`).join('');
    $$('button', dotsBox).forEach((b, k) => (b.onclick = () => { goTo(k); restart(); }));
  };
  const restart = () => { clearInterval(timer); if (!REDUCED && pages() > 1) timer = setInterval(() => { if (!box.isConnected) { clearInterval(timer); return; } if (!document.hidden) goTo(page + 1); }, 6500); };
  track.addEventListener('scroll', () => { const w = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth; const k = Math.round(track.scrollLeft / (w * per())); if (k !== page && k < pages()) { page = k; mark(); } }, { passive: true });
  draw();
  restart();
}
/* ---------- Bouton « revenir en haut » ---------- */
function onScrollFab() { const b = $('.fab-top'); if (b) b.classList.toggle('show', window.scrollY > 700); }
window.addEventListener('scroll', onScrollFab, { passive: true });

/** À appeler après chaque rendu de page. */
function afterRender() {
  initReveal();
  initTilt();
  mountShowrooms();
  mountHero();
  mountTestimonials();
  onScrollFab();
  onScrollHeader();
  if ($('.band-canvas')) mountBandPrism(); else disposeBandPrism();
  if (document.documentElement.classList.contains('intro-on')) return;
  requestAnimationFrame(revealAll);
}

/* =====================================================================
   APPLICATION INSTALLABLE (PWA) : installation sur l'écran d'accueil,
   ouverture instantanée et fonctionnement hors connexion, mise à jour.
   Actif seulement dans la version en ligne (dossier « pwa ») : la version
   « fichier unique » ouverte depuis l'ordinateur ne s'installe pas.
   ===================================================================== */
const PWA = {
  on: !!window.PRISMA_PWA && !window.PRISMA_PRERENDER && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname)),
  prompt: null,
};
const INVITE_KEY = 'prisma-install-invite';
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const canInstall = () => PWA.on && !isStandalone() && (!!PWA.prompt || isIOS());

function updateInstallUI() {
  const ok = canInstall();
  $$('[data-install]').forEach((b) => { b.hidden = !ok; });
  if (!ok) $('.install-card')?.remove();
}
function installSteps() {
  const ios = isIOS(), android = /android/i.test(navigator.userAgent);
  const share = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const add = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const iconSrc = PWA.on ? '/icons/icon-192.png' : ASSETS.mark;
  const head = `<div class="install-app"><img src="${iconSrc}" alt=""><div><b>${esc(db.settings.brand)}</b><span>Réservez et suivez vos locations en un geste, même hors connexion.</span></div></div>`;
  const andr = `<ol class="install-steps">
      <li><span class="n">1</span><span>Ouvrez le site dans <b>Chrome</b>, puis le menu <b>⋮</b> en haut à droite.</span></li>
      <li><span class="n">2</span><span>Touchez <b>Installer l’application</b> (ou <b>Ajouter à l’écran d’accueil</b>).</span></li>
      <li><span class="n">3</span><span>Confirmez : l’icône PRISMA apparaît avec vos applications.</span></li>
    </ol>`;
  // fichier ouvert depuis l'appareil (file:// ou content://) : aucun navigateur ne propose l'installation
  const warn = PWA.on ? '' : `<div class="alert warn" style="margin-top:14px">${icon('info')}<span>Vous avez ouvert le <b>fichier</b> enregistré sur l’appareil : un fichier ne peut pas s’installer, le menu du navigateur ne le propose pas. L’installation se fait depuis la <b>version en ligne</b> de l’application (adresse en https).</span></div><h4 class="inst-h">Une fois sur la version en ligne</h4>`;
  if (!ios && !android) return head + warn + `<h4 class="inst-h">Sur iPhone</h4>` + iosSteps(share, add) + `<h4 class="inst-h">Sur Android</h4>` + andr;
  return head + warn + (ios ? iosSteps(share, add) : andr);
}
function iosSteps(share, add) {
  return `<ol class="install-steps">
      <li><span class="n">1</span><span>Touchez <b>Partager</b> ${share} (en bas dans Safari, en haut à droite dans Chrome).</span></li>
      <li><span class="n">2</span><span>Choisissez <b>Sur l’écran d’accueil</b> ${add}</span></li>
      <li><span class="n">3</span><span>Touchez <b>Ajouter</b> : l’icône PRISMA apparaît avec vos applications.</span></li>
    </ol>`;
}
async function installApp() {
  lsSet(INVITE_KEY, 1);
  $('.install-card')?.remove();
  if (PWA.prompt) {
    const p = PWA.prompt;
    PWA.prompt = null;
    try {
      p.prompt();
      const choice = await p.userChoice;
      if (choice && choice.outcome === 'dismissed') toast('Installation annulée. Le bouton reste disponible en haut de page.');
    } catch (e) { /* fenêtre d'installation refusée par le navigateur */ }
    updateInstallUI();
    return;
  }
  openModal({ title: 'Installer l’application', body: installSteps(), foot: '<button class="btn btn-primary" data-close>J’ai compris</button>' });
}
/** Invitation discrète, une seule fois, sur téléphone et sur l'accueil. */
function inviteInstall() {
  if (!canInstall() || lsGet(INVITE_KEY) || FINE) return;
  setTimeout(() => {
    if (!canInstall() || lsGet(INVITE_KEY) || $('.install-card') || $('.overlay') || $('.intro') || curPath() !== '/') return;
    const card = document.createElement('div');
    card.className = 'install-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Installer l’application');
    card.innerHTML = `<img src="/icons/icon-96.png" alt=""><div class="t"><b>Installez l’application ${esc(db.settings.brand.split(' ')[0])}</b><span>Ouverture instantanée, même hors connexion.</span></div><button class="btn btn-primary btn-sm" data-install>Installer</button><button class="icon-btn" data-x aria-label="Plus tard">${icon('x')}</button>`;
    $('[data-x]', card).onclick = () => { lsSet(INVITE_KEY, 1); card.classList.add('out'); setTimeout(() => card.remove(), 400); };
    document.body.appendChild(card);
  }, 9000);
}
function showUpdate(worker) {
  if ($('.update-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'update-bar';
  bar.setAttribute('role', 'status');
  bar.innerHTML = '<span>Une nouvelle version de l’application est prête.</span><button class="btn btn-primary btn-sm" type="button">Actualiser</button>';
  $('button', bar).onclick = () => { bar.remove(); worker.postMessage('skipWaiting'); };
  document.body.appendChild(bar);
}
function initPWA() {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-install]');
    if (!b) return;
    e.preventDefault();
    installApp();
  });
  if (!PWA.on) return;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); PWA.prompt = e; updateInstallUI(); inviteInstall(); });
  window.addEventListener('appinstalled', () => { PWA.prompt = null; lsSet(INVITE_KEY, 1); updateInstallUI(); toast('Application installée : retrouvez PRISMA sur votre écran d’accueil.', 'ok'); });
  window.addEventListener('offline', () => toast('Vous êtes hors connexion : l’application reste utilisable.'));
  window.addEventListener('online', () => toast('Connexion rétablie.', 'ok'));
  if (isIOS()) inviteInstall();
  if (!('serviceWorker' in navigator)) return;
  // rechargement seulement pour une mise à jour (pas lors de la toute première installation)
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!hadController || reloading) return; reloading = true; location.reload(); });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((reg) => {
      if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) showUpdate(w); });
      });
      // vérifie les mises à jour quand l'application revient au premier plan
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch(() => { /* hébergement sans service worker : l'application fonctionne en ligne */ });
  });
}
initPWA();

/* =====================================================================
   SITE CLIENT : recherche, véhicules, options, coordonnées, paiement
   ===================================================================== */
const ui = { grp: 'all', auto: false, sort: 'prix' };
/* Particulier : prix TTC. Professionnel : prix HT, TVA indiquée, facture au nom de la société. */
const isPro = () => !!(draft && draft.pro);
const ht = (ttc) => round2(ttc / (1 + db.settings.vat / 100));
const money = (ttc, dec) => eur(isPro() ? ht(ttc) : ttc, dec);
const taxTag = () => (isPro() ? ' HT' : '');
function taxSwitch() {
  return `<div class="tax-switch"><span>Vous êtes</span><div class="seg" role="group" aria-label="Type de client"><button type="button" class="${isPro() ? '' : 'on'}" data-pro-set="0">Particulier</button><button type="button" class="${isPro() ? 'on' : ''}" data-pro-set="1">Professionnel</button></div></div>`;
}
function bindTaxSwitch() {
  $$('[data-pro-set]').forEach((b) => (b.onclick = () => {
    draft.pro = b.dataset.proSet === '1';
    if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
    saveDraft();
    rerender();
  }));
}

/* ---------- Catégories de la flotte (filtres, menus, pages catégories) ---------- */
const GROUPS = [
  { id: 'all', label: 'Tous', title: 'Nos véhicules', test: () => true, txt: 'Citadines, compactes premium, berline électrique, SUV 7 places et utilitaires jusqu’à 20 m³ : toute la flotte, entretenue et préparée avant chaque départ.' },
  { id: 'voiture', label: 'Voitures', title: 'Voitures', test: (v) => v.category === 'voiture', txt: 'De la citadine au SUV premium, des voitures récentes pour la ville, les week-ends et les vacances.' },
  { id: 'citadine', label: 'Citadines', title: 'Citadines', test: (v) => v.category === 'voiture' && v.shape === 'citadine', txt: 'Compactes, sobres et faciles à garer : idéales pour Bordeaux et les trajets du quotidien.' },
  { id: 'berline', label: 'Berlines', title: 'Berlines et compactes premium', test: (v) => v.category === 'voiture' && v.shape === 'berline', txt: 'Le confort d’une compacte premium ou le silence d’une berline électrique, pour vos rendez-vous comme pour la route.' },
  { id: 'suv', label: 'SUV', title: 'SUV', test: (v) => v.category === 'voiture' && v.shape === 'suv', txt: 'De la place pour toute la famille avec le SUV 7 places, ou le prestige d’un SUV premium.' },
  { id: 'utilitaire', label: 'Utilitaires', title: 'Utilitaires', test: (v) => v.category === 'utilitaire', txt: 'Du petit fourgon de 3 m³ au 20 m³ avec hayon, tous conduits avec le permis B. Kit déménagement disponible.' },
  { id: 'minibus', label: 'Minibus', title: 'Minibus', test: (v) => v.shape === 'minibus', txt: 'Neuf places pour les sorties en groupe, les équipes et les événements.' },
];
const grp = (id) => GROUPS.find((g) => g.id === id) || GROUPS[0];
/** Adresse du catalogue d'une catégorie (« /vehicules » pour toute la flotte). */
const catHref = (id) => (!id || id === 'all' ? '/vehicules' : '/vehicules/' + id);
const groupsOf = (v) => GROUPS.filter((g) => g.id !== 'all' && g.test(v)).map((g) => g.id);
const liveFleet = () => db.vehicles.filter((v) => v.status === 'actif' && !v.deleted);
/** Catégorie principale d'un véhicule (fil d'Ariane, suggestions). */
const mainGroup = (v) => (v.shape === 'minibus' ? grp('minibus') : v.category === 'utilitaire' ? grp('utilitaire') : grp(['citadine', 'berline', 'suv'].find((k) => grp(k).test(v)) || 'voiture'));
const BRANDS = ['Renault', 'Peugeot', 'Mercedes', 'Mercedes-Benz', 'Tesla', 'Fiat', 'Citroën', 'Volkswagen', 'BMW', 'Audi', 'Toyota', 'Ford', 'Opel', 'Nissan', 'Dacia', 'Kia', 'Hyundai', 'Skoda', 'Seat', 'Iveco', 'Cupra', 'Volvo'];
function brandModel(v) {
  const [b, ...rest] = String(v.name || '').split(' ');
  return BRANDS.includes(b) && rest.length ? { brand: b, model: rest.join(' ') } : { brand: '', model: v.name };
}
const nameDash = (v) => { const x = brandModel(v); return x.brand ? `${x.brand} - ${x.model}` : x.model; };
const intlPhone = () => { const d = String(db.settings.phone || '').replace(/\D/g, ''); return d.startsWith('0') ? '33' + d.slice(1) : d; };
const waHref = (text) => `https://wa.me/${intlPhone()}${text ? '?text=' + encodeURIComponent(text) : ''}`;
const telHref = () => `tel:${String(db.settings.phone || '').replace(/\s/g, '')}`;
const fleetFrom = () => Math.min(...liveFleet().map((v) => v.price));

/** Photo « studio » façon catalogue : mur sombre avec le logo, sol clair, véhicule détouré. */
function studioShot(v, { big = false } = {}) {
  const ph = PHOTOS[v.id];
  const cut = !v.photo && ph?.cut;
  const s = db.settings;
  const logo = s.logo ? `<img src="${s.logo}" alt="">` : `<img src="${ASSETS.mark}" alt=""><i></i><img src="${ASSETS.word}" alt="">`;
  if (!cut && v.photo) return `<div class="shot own ${big ? 'big' : ''}"><img class="shot-photo" src="${esc(v.photo)}" alt="${esc(v.name)}" decoding="async"></div>`;
  // site en ligne : image réduite pour les cartes, pleine taille pour la fiche (écrans haute définition)
  const set = cut && ph.cutSm ? ` srcset="${ph.cutSm} ${ph.smW}w, ${cut} ${ph.w}w" sizes="${big ? '(max-width: 960px) 92vw, 780px' : '(max-width: 540px) 82vw, (max-width: 1180px) 45vw, 420px'}"` : '';
  const car = cut ? `<img class="shot-car" src="${cut}"${set} alt="${esc(v.name)}"${big ? '' : ' loading="lazy"'} decoding="async">` : `<div class="shot-svg">${carSVG(v.shape, v.color, { label: v.name })}</div>`;
  return `<div class="shot ${big ? 'big' : ''}"><span class="shot-logo" aria-hidden="true">${logo}</span>${car}</div>`;
}
/** Carte véhicule (catalogue) : photo studio, prix, modèle, trois caractéristiques. */
function rcard(v, { search = false } = {}) {
  const ok = search ? isAvailable(v.id, draft.from, draft.to) : true;
  let price;
  if (search) {
    const q = quoteSearch(v);
    price = `<span class="rc-tot">${money(q.total)}${taxTag()}</span> pour ${plural(q.days, 'jour')}${q.pct ? `<span class="rc-off">−${q.pct} %</span>` : ''}`;
  } else price = `À partir de <b>${money(v.price)}${taxTag()}</b>/jour`;
  const nf = ok ? null : nextFree(v.id, draft.from, draft.to);
  const first = v.category === 'utilitaire' && v.volume ? [icon('box'), `${String(v.volume).replace('.', ',')} m³`] : [icon('seats'), `${v.seats} places`];
  return `<a class="rcard ${ok ? '' : 'unavail'}" href="${vehicleHref(v)}" data-grp="${groupsOf(v).join(' ')}" data-v="${esc(v.id)}">
    ${studioShot(v)}
    <div class="rc-b">
      <div class="rc-p">${price}</div>
      <div class="rc-n">${esc(nameDash(v))}${v.similar ? '<small> ou similaire</small>' : ''}</div>
      <div class="rc-s"><span>${first[0]}${esc(first[1])}</span><span>${icon('fuel')}${esc(v.fuel)}</span><span>${icon('gear')}${v.gearbox === 'Automatique' ? 'Auto' : 'Manuelle'}</span></div>
      ${ok ? '' : `<div class="rc-na">${nf ? `Libre à partir du ${esc(fmtDay(nf))} à ${hm(nf).replace(':', 'h')}` : 'Indisponible sur vos dates'}</div>`}
    </div>
  </a>`;
}
/** Lieux de départ (accueil et page agences). */
function placeCard(a, tag = 'h3') {
  return `<div class="place">
    <div class="pl-ic">${icon(a.id === 'livraison' ? 'route' : a.id === 'aeroport' ? 'globe' : a.id === 'gare' ? 'clock' : 'pin')}</div>
    <${tag}>${esc(a.name)}</${tag}>
    <p>${esc(a.address)}</p>
    <p class="muted">${esc(a.note || '')}</p>
    <div class="pl-fee">${a.fee ? `Frais de remise : <b>${eur(a.fee)}</b>` : '<b>Sans frais</b>'}</div>
    <button type="button" class="btn-line" data-ag="${esc(a.id)}">Réserver ici</button>
  </div>`;
}

function demoBar(mode) {
  if (typeof INDEXABLE !== 'undefined' && INDEXABLE) return '';
  return `<div class="demo-bar"><div class="demo-bar-in">
    <span><b>Démonstration</b> · ${esc(db.settings.brand)} · les données restent dans ce navigateur</span>
    <nav class="demo-switch" aria-label="Changer de vue"><a href="/" class="${mode === 'site' ? 'on' : ''}">Site client</a><a href="/gestion" class="${mode === 'admin' ? 'on' : ''}">Logiciel du loueur</a></nav>
    <button type="button" class="demo-install" data-install hidden>${icon('download')}Installer l’app</button>
    <a href="#" class="demo-reset" data-reset>Réinitialiser</a>
  </div></div>`;
}
function siteHeader(active) {
  const s = db.settings;
  const sess = session();
  const c = sess && customer(sess.customerId);
  const fleet = liveFleet();
  const dd = GROUPS.filter((g) => g.id !== 'all' && fleet.some(g.test)).map((g) => `<a href="/vehicules/${g.id}">${esc(g.label)}</a>`).join('') + '<a href="/vehicules" class="dd-all">Tous les véhicules</a>';
  return `<div class="topline"><div class="wrap">
      <a href="${telHref()}">${icon('phone')}<span>${esc(s.phone)}</span></a>
      <span>${icon('pin')}<span>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</span></span>
      <span class="tl-right"><span>${icon('clock')}<span>${esc(weekHoursText())}</span></span><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a></span>
    </div></div>
    <header class="site-header"><div class="wrap">
      ${logoHTML(false)}
      <nav class="site-nav" aria-label="Navigation principale">
        ${megaMenuHTML(active)}
        <div class="dd"><a href="/vehicules" class="${active === 'vehicules' ? 'on' : ''}">Véhicules${icon('chevD')}</a><div class="dd-m">${dd}</div></div>
        ${SEO_BY_PATH[SALE_HUB] ? `<div class="dd"><a href="${SALE_HUB}" class="${active === 'vente' ? 'on' : ''}">Achat-vente${icon('chevD')}</a><div class="dd-m"><a href="/vehicules-occasion">Véhicules à vendre</a><a href="/depot-vente-voiture-bordeaux">Dépôt-vente</a><a href="/rachat-voiture-bordeaux">Rachat de votre véhicule</a><a href="${SALE_HUB}" class="dd-all">Achat, vente, dépôt-vente</a></div></div>` : ''}
        <a href="/agences" class="${active === 'agences' ? 'on' : ''}">Agences</a>
        <a href="/professionnels" class="${active === 'pro' ? 'on' : ''}">Professionnels</a>
        ${GUIDES.length ? `<a href="/guides" class="${active === 'guides' ? 'on' : ''}">Guides</a>` : ''}
      </nav>
      <div class="actions">
        <a class="btn-pill" href="/contact">${icon('plus')}Contact</a>
        <a class="hd-user" href="/compte" aria-label="Mon espace client">${icon('user')}<span>${c ? esc(c.firstName) : 'Mon espace'}</span></a>
        <button type="button" class="menu-btn" data-menu aria-label="Ouvrir le menu"><span>Menu</span><i></i></button>
      </div>
    </div></header>`;
}
function siteFooter() {
  const s = db.settings;
  return `<footer class="site-footer">
    <div class="wrap ft-top">${logoHTML(false)}<nav class="ft-nav" aria-label="Pied de page"><a href="/vehicules">Nos véhicules</a><a href="/agences">Agences</a><a href="/professionnels">Professionnels</a><a href="/contact">Contact</a></nav></div>
    <div class="ft-line"></div>
    <nav aria-label="Plan du site">${seoLinksHTML()}</nav>
    <div class="ft-line"></div>
    <div class="wrap ft-grid">
      <div><p class="ft-h">Notre agence</p><p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p><p class="ft-hours">${esc(weekHoursText())}</p></div>
      <div><p class="ft-h">Contact</p><a class="ft-phone" href="${telHref()}">${esc(s.phone)}</a>${s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : ''}<a href="${waHref()}" target="_blank" rel="noopener">Écrire sur WhatsApp</a></div>
      <div><p class="ft-h">Informations</p><a href="/conditions-de-location">Conditions de location</a><a href="#" data-doc="cgv">Conditions générales de location</a><a href="#" data-doc="mentions">Mentions légales</a><a href="#" data-doc="credits">Crédits photos</a><a href="/compte">Mon espace client</a><a href="#" data-app>Installer l’application</a></div>
    </div>
    <div class="wrap ft-bottom"><span>${esc(s.brand)} © ${new Date().getFullYear()}. Tous droits réservés.</span><span class="ft-legal">${esc(s.legalName)}, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}</span><span class="ft-social"><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a><a href="${telHref()}" aria-label="Appeler">${icon('phone')}</a></span></div>
  </footer>`;
}
function publicPage(inner, { active = '', footer = true } = {}) {
  return demoBar('site') + siteHeader(active) + `<main id="main">${inner}</main>` + (footer ? siteFooter() : '')
    + `<a class="fab-wa" href="${waHref('Bonjour, je souhaite louer un véhicule.')}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${icon('wa')}</a><button type="button" class="fab-top" data-top aria-label="Revenir en haut de la page">${icon('chevU')}</button>`;
}
/** Menu du téléphone (et de l'ordinateur via l'icône ☰). */
function openMenu() {
  if ($('.mmenu')) return;
  const s = db.settings;
  const fleet = liveFleet();
  const el = document.createElement('div');
  el.className = 'mmenu';
  el.innerHTML = `<div class="mm-ov" data-mclose></div><aside class="mm-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="mm-hd">${logoHTML(false)}<button type="button" class="icon-btn" data-mclose aria-label="Fermer le menu">${icon('x')}</button></div>
    <nav class="mm-nav">
      <a href="/">Accueil</a>
      <a href="/vehicules">Nos véhicules</a>
      <div class="mm-sub">${GROUPS.filter((g) => g.id !== 'all' && fleet.some(g.test)).map((g) => `<a href="/vehicules/${g.id}">${esc(g.label)}</a>`).join('')}</div>
      ${navGroups().filter((g) => g.t !== 'Infos pratiques').map((g) => `<details class="mm-acc"><summary>${esc(g.t)}${icon('chevD')}</summary><div class="mm-sub">${g.items.map(([p, l]) => `<a href="${p}">${esc(l)}</a>`).join('')}</div></details>`).join('')}
      <a href="/agences">Agences et horaires</a>
      <a href="/professionnels">Professionnels</a>
      ${GUIDES.length ? '<a href="/guides">Guides pratiques</a>' : ''}
      ${pageExists('/faq') && SEO_BY_PATH['/faq'] ? '<a href="/faq">Questions fréquentes</a>' : ''}
      <a href="/contact">Contact</a>
      <a href="/compte">Mon espace client</a>
    </nav>
    <div class="mm-ct">
      <a class="mm-phone" href="${telHref()}">${esc(s.phone)}</a>
      <a class="btn btn-wa btn-block" href="${waHref()}" target="_blank" rel="noopener">${icon('wa')}Écrire sur WhatsApp</a>
      <button type="button" class="btn btn-ghost btn-block" data-app>${icon('download')}Installer l’application</button>
      <p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p>
      <p>${esc(weekHoursText())}</p>
    </div>
  </aside>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('menu-on');
  requestAnimationFrame(() => el.classList.add('open'));
  const close = () => { el.classList.remove('open'); document.documentElement.classList.remove('menu-on'); document.removeEventListener('keydown', onKey); setTimeout(() => el.remove(), 380); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  el.addEventListener('click', (e) => { if (e.target.closest('[data-mclose]') || e.target.closest('a[href]') || e.target.closest('[data-app]')) close(); });
  setTimeout(() => $('.mm-nav a', el)?.focus({ preventScroll: true }), 60);
}
/* Actions communes du site (délégation : un seul écouteur pour toutes les pages). */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-top],[data-menu],[data-app]');
  if (!t) return;
  e.preventDefault();
  if (t.matches('[data-top]')) window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  else if (t.matches('[data-menu]')) openMenu();
  else installApp();
});

/* ---------- Présentation des véhicules ---------- */
function specsHTML(v) {
  const items = [[icon('seats'), `${v.seats} places`], [icon('gear'), v.gearbox], [icon('fuel'), v.fuel]];
  if (v.category === 'utilitaire' && v.volume) items.push([icon('box'), `${String(v.volume).replace('.', ',')} m³`]);
  else items.push([icon('door'), `${v.doors} portes`]);
  if (v.category === 'utilitaire' && v.payload) items.push([icon('weight'), `${v.payload} kg de charge`]);
  else if (v.ac) items.push([icon('snow'), 'Climatisation']);
  return items.map(([i, t]) => `<span>${i}${esc(t)}</span>`).join('');
}
function kmText(v, q) {
  if (q.kmIncluded == null) return 'Kilométrage illimité';
  return `${q.kmIncluded.toLocaleString('fr-FR')} km inclus, puis ${eur(v.extraKm, true)} par km`;
}
function quoteSearch(v, extra = {}) {
  return quote({ vehicleId: v.id, from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, ...extra });
}
function tripBar(step) {
  const aS = agency(draft.agencyStart);
  const aE = agency(draft.agencyEnd);
  const steps = ['Véhicule', 'Options', 'Coordonnées', 'Paiement'];
  return `<div class="book-top"><div class="wrap">
    <div class="trip">
      <div class="pt"><b>${esc(aS.short)}</b><span>${esc(fmtDay(draft.from))} · ${hm(parse(draft.from)).replace(':', 'h')}</span></div>
      <span class="arrow">${icon('arrowR')}</span>
      <div class="pt"><b>${esc(aE.short)}</b><span>${esc(fmtDay(draft.to))} · ${hm(parse(draft.to)).replace(':', 'h')}</span></div>
      <button class="btn btn-ghost btn-sm" data-edit-search>${icon('edit')}Modifier</button>
    </div>
    <div class="stepper" aria-label="Étapes">${steps.map((s, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i + 1 === step ? 'on' : i + 1 < step ? 'done' : ''}"><i>${i + 1 < step ? '✓' : i + 1}</i><span>${s}</span></span>`).join('')}</div>
  </div></div>`;
}

/* ---------- Formulaire de recherche (accueil et « Modifier ») ---------- */
function agencyOptions(sel) {
  return db.agencies.map((a) => `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.name)}${a.fee ? ` (+${eur(a.fee)})` : ''}</option>`).join('');
}
function searchFormHTML(st) {
  const kind = st.kind || (['utilitaire', 'minibus'].includes(ui.grp) ? 'utilitaire' : 'voiture');
  const f = dateBits(st.from), t = dateBits(st.to);
  const diff = st.sameAgency === false;
  const pro = st.pro != null ? st.pro : isPro();
  return `<form class="sx" novalidate>
    <div class="sx-top">
      <div class="sx-tabs" role="group" aria-label="Type de véhicule">
        <button type="button" class="sx-tab ${kind === 'voiture' ? 'on' : ''}" data-kind="voiture" aria-pressed="${kind === 'voiture'}">${icon('car')}Voitures</button>
        <button type="button" class="sx-tab ${kind === 'utilitaire' ? 'on' : ''}" data-kind="utilitaire" aria-pressed="${kind === 'utilitaire'}">${icon('van')}Utilitaires</button>
      </div>
      <a class="sx-link" href="/compte">Voir / modifier ma réservation</a>
    </div>
    <div class="sx-row ${diff ? 'diff' : ''}">
      <div class="sx-f sx-place"><span class="sx-l" data-start-l>${diff ? 'Retrait' : 'Retrait et retour'}</span><label class="sx-box">${icon('pin')}<select name="agencyStart" aria-label="Lieu de retrait">${agencyOptions(st.agencyStart)}</select></label></div>
      <div class="sx-f sx-place" data-end ${diff ? '' : 'hidden'}><span class="sx-l">Retour</span><label class="sx-box">${icon('pin')}<select name="agencyEnd" aria-label="Lieu de retour">${agencyOptions(st.agencyEnd)}</select><button type="button" class="sx-x" data-same aria-label="Rendre le véhicule au même endroit">${icon('x')}</button></label></div>
      <button type="button" class="sx-add" data-other ${diff ? 'hidden' : ''}>${icon('plus')}Lieu de retour différent</button>
      <div class="sx-f"><span class="sx-l">Date de départ</span><button type="button" class="sx-box sx-date" data-dates>${icon('cal')}<b data-from>${esc(f.d)}</b><i></i><b data-from-t>${f.t}</b></button></div>
      <div class="sx-f"><span class="sx-l">Date de retour</span><button type="button" class="sx-box sx-date" data-dates>${icon('cal')}<b data-to>${esc(t.d)}</b><i></i><b data-to-t>${t.t}</b></button></div>
      <button class="sx-go" type="submit">Voir les véhicules</button>
    </div>
    <div class="sx-bottom">
      <label class="sx-mini">${icon('user')}<select name="pro" aria-label="Type de client"><option value="0" ${pro ? '' : 'selected'}>Particulier</option><option value="1" ${pro ? 'selected' : ''}>Professionnel (prix HT)</option></select>${icon('chevD')}</label>
      <span class="sx-hours">${icon('clock')}${esc(weekHoursText())}</span>
    </div>
  </form>`;
}
function dateBits(iso) { const d = parse(iso); return d ? { d: `${d.getDate()} ${MOIS_C[d.getMonth()]}`, t: hm(d) } : { d: 'à choisir', t: '' }; }
function bindSearchForm(root, st, onSubmit) {
  const form = $('.sx', root);
  if (!form) return;
  if (st.pro == null) st.pro = isPro();
  const refresh = () => {
    const f = dateBits(st.from), t = dateBits(st.to);
    $('[data-from]', form).textContent = f.d; $('[data-from-t]', form).textContent = f.t;
    $('[data-to]', form).textContent = t.d; $('[data-to-t]', form).textContent = t.t;
  };
  $$('[data-kind]', form).forEach((b) => (b.onclick = () => { st.kind = b.dataset.kind; $$('[data-kind]', form).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); }); }));
  $$('[data-dates]', form).forEach((b) => (b.onclick = () => openDatePicker(st, (f, t) => { st.from = f; st.to = t; refresh(); })));
  const setDiff = (on) => {
    st.sameAgency = !on;
    $('[data-end]', form).hidden = !on;
    $('[data-other]', form).hidden = on;
    $('.sx-row', form).classList.toggle('diff', on);
    $('[data-start-l]', form).textContent = on ? 'Retrait' : 'Retrait et retour';
    st.agencyEnd = on ? form.agencyEnd.value : st.agencyStart;
  };
  form.agencyStart.onchange = () => { st.agencyStart = form.agencyStart.value; if (st.sameAgency !== false) st.agencyEnd = st.agencyStart; };
  form.agencyEnd.onchange = () => { st.agencyEnd = form.agencyEnd.value; };
  $('[data-other]', form).onclick = () => setDiff(true);
  $('[data-same]', form).onclick = (e) => { e.preventDefault(); setDiff(false); };
  form.pro.onchange = () => { st.pro = form.pro.value === '1'; };
  form.onsubmit = (e) => {
    e.preventDefault();
    if (st.sameAgency !== false) st.agencyEnd = st.agencyStart;
    const err = searchError(st);
    if (err) { toast(err, 'warn'); return; }
    onSubmit(st);
  };
}
function openSearchModal() {
  const fam = ['utilitaire', 'minibus'].includes(ui.grp) ? 'utilitaire' : 'voiture';
  const st = { from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, sameAgency: draft.agencyStart === draft.agencyEnd, kind: fam, pro: isPro() };
  openModal({
    title: 'Modifier la recherche',
    wide: true,
    body: `<div class="sx-modal">${searchFormHTML(st)}</div>`,
    onMount: (m, close) => {
      bindSearchForm(m, st, (res) => {
        draft.from = res.from; draft.to = res.to; draft.agencyStart = res.agencyStart; draft.agencyEnd = res.agencyEnd; draft.pro = !!res.pro;
        if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
        if (res.kind !== fam) ui.grp = res.kind;
        if (draft.vehicleId && !isAvailable(draft.vehicleId, draft.from, draft.to)) { toast('Ce véhicule n’est plus libre sur ces dates : choisissez-en un autre.', 'warn'); draft.vehicleId = null; saveDraft(); close(); go(catHref(ui.grp)); return; }
        saveDraft(); close();
        if (curPath().startsWith('/vehicules') && res.kind !== fam) go(catHref(ui.grp)); else render();
      });
    },
  });
}

/* ---------- Accueil ---------- */
function homeSearchState() {
  return { ...defaultSearch(), ...(draft && draft.from && !searchError(draft) ? { from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, sameAgency: draft.agencyStart === draft.agencyEnd } : {}), pro: isPro() };
}
const TESTIMONIALS = [
  { name: 'Sophie L.', text: 'Réservation faite en cinq minutes sur mon téléphone, et la Clio m’attendait à l’heure devant chez moi. Véhicule impeccable, je recommande.', meta: 'Citadine livrée à domicile · Bordeaux' },
  { name: 'Karim B.', text: 'Master 12 m³ pour notre déménagement : véhicule propre, kit de déménagement prêt dans le coffre et un accueil très professionnel à Yvrac.', meta: 'Utilitaire · Cenon' },
  { name: 'Élodie M.', text: 'Le 5008 sept places était parfait pour nos vacances en famille. L’annulation gratuite et la caution non débitée nous ont rassurés.', meta: 'SUV 7 places · Lormont' },
  { name: 'Thomas R.', text: 'Nous louons régulièrement des utilitaires pour nos chantiers : prix hors taxes, facture au nom de la société et paiement par virement, c’est exactement ce qu’il nous fallait.', meta: 'Client professionnel · bâtiment' },
];
function phoneMock() {
  if (typeof APP_SHOT === 'string' && APP_SHOT) {
    return `<div class="phone" aria-hidden="true"><div class="ph-scr ph-real"><img class="ph-shot" src="${APP_SHOT}" alt=""><div class="ph-bar"><b>9:41</b><span><i></i><i></i><i></i></span></div></div></div>`;
  }
  const glc = vehicle('v-glc') || liveFleet()[0];
  return `<div class="phone" aria-hidden="true"><div class="ph-scr">
    <div class="ph-status"><b>9:41</b><span><i></i><i></i><i></i></span></div>
    <div class="ph-hd"><img src="${ASSETS.mark}" alt=""><img src="${ASSETS.word}" alt=""></div>
    <div class="ph-h1">Location de voitures et d’utilitaires</div>
    <div class="ph-search"><div class="ph-tabs"><i class="on">Voitures</i><i>Utilitaires</i></div><div class="ph-f">${icon('pin')}Agence d’Yvrac</div><div class="ph-2"><div class="ph-f">${icon('cal')}30 sept.</div><div class="ph-f">${icon('cal')}3 oct.</div></div><div class="ph-go">Voir les véhicules</div></div>
    ${glc ? `<div class="ph-card">${studioShot(glc)}<b>${esc(nameDash(glc))}</b><span>À partir de ${eur(glc.price)}/jour</span></div>` : ''}
    <div class="ph-nav"><i class="on"></i><i></i><i></i><i></i></div>
  </div></div>`;
}
function pageHome() {
  const s = db.settings;
  const st = homeSearchState();
  const fleet = liveFleet();
  const withCut = (v) => v && v.status === 'actif' && !v.deleted && PHOTOS[v.id]?.cut && !v.photo;
  let stage = ['v-glc', 'v-tesla', 'v-classea', 'v-5008', 'v-master12'].map(vehicle).filter(withCut);
  if (!stage.length) stage = fleet.filter(withCut).slice(0, 5);
  const vans = fleet.filter((v) => v.category === 'utilitaire');
  const van = vehicle('v-master12') && withCut(vehicle('v-master12')) ? vehicle('v-master12') : vans.find(withCut);
  const minVan = vans.length ? Math.min(...vans.map((v) => v.price)) : null;
  const brands = [...new Set(fleet.map((v) => brandModel(v).brand).filter(Boolean).map((b) => (b === 'Mercedes' ? 'Mercedes-Benz' : b)))];
  const pills = GROUPS.filter((g) => fleet.some(g.test)).map((g) => `<button type="button" class="pill ${g.id === 'all' ? 'on' : ''}" data-hg="${g.id}" aria-pressed="${g.id === 'all'}">${esc(g.label)}</button>`).join('');
  const why = [
    ['Une flotte récente et soignée', 'Des véhicules récents, entretenus dans les règles et préparés avant chaque départ : nettoyés, vérifiés, le plein fait. Vous prenez la route l’esprit tranquille, que ce soit pour la journée ou pour un mois.'],
    ['Un service sur mesure', `Retrait à l’agence d’Yvrac, remise en gare Saint-Jean, à l’aéroport de Mérignac ou livraison à votre adresse. Une question avant de réserver ? Nous répondons par téléphone au ${s.phone} ou sur WhatsApp.`],
    ['Tout se fait en ligne', `Réservez en quelques minutes et payez par carte, en 3 ou 4 fois, ou par virement pour les professionnels. La caution n’est jamais débitée et l’annulation reste gratuite jusqu’à ${s.freeCancelHours} h avant le départ.`],
  ];
  const html = `
  <section class="hero2">
    <div class="h2-stage" aria-hidden="true"><div class="h2-glow"></div><canvas class="sr-dust"></canvas></div>
    <div class="wrap h2-in">
      <h1 data-words>Location de voitures et d’utilitaires à <span class="gold-text">Bordeaux</span></h1>
      <p class="h2-sub" data-reveal style="--d:.35s">Entrez dans l’univers ${esc(s.brand)} : citadines, SUV premium et utilitaires jusqu’à 20 m³, réservés et payés en ligne en quelques minutes.</p>
      <div class="search-card" data-reveal style="--d:.5s">${searchFormHTML(st)}</div>
    </div>
    ${stage.length ? `<div class="h2-cars">${stage.map((v, i) => `<img class="h2-car ${i === 0 ? 'on' : ''}" src="${PHOTOS[v.id].cut}" alt="${esc(v.name)}" data-v="${esc(v.id)}">`).join('')}</div>
    <div class="wrap h2-foot">
      <a class="h2-cap" href="${vehicleHref(stage[0])}" data-cap><span data-cap-seg>${esc(stage[0].segment)}</span><b data-cap-name>${esc(nameDash(stage[0]))}</b><span>À partir de <b data-cap-price>${money(stage[0].price)}${taxTag()}</b> par jour</span></a>
      <div class="h2-dots">${stage.map((v, i) => `<button type="button" class="${i ? '' : 'on'}" aria-label="${esc(v.name)}"></button>`).join('')}</div>
    </div>` : ''}
  </section>

  <section class="section-sm"><div class="wrap"><div class="promos">
    <article class="promo promo-app" data-reveal>
      <div class="promo-art">${phoneMock()}</div>
      <div class="promo-copy">
        <h2>Réservez et gérez vos locations, tout au même endroit</h2>
        <p>L’application ${esc(s.brand.split(' ')[0])} : réservation, documents et suivi de vos locations, même hors connexion.</p>
        <button type="button" class="btn-line" data-app>Installer l’application</button>
      </div>
    </article>
    <article class="promo promo-pro" data-reveal style="--d:.12s">
      <div class="promo-art">${van ? `<img class="promo-van" src="${PHOTOS[van.id].cut}" alt="">` : ''}${minVan != null ? `<span class="ptag"><small>À partir de</small><b>${eur(Math.floor(ht(minVan)))}</b><small>HT par jour</small></span>` : ''}</div>
      <div class="promo-copy">
        <h2>Louez un utilitaire pour votre activité</h2>
        <p>Profitez des tarifs professionnels : prix hors taxes, facture au nom de votre société et paiement par virement.</p>
        <a class="btn-line" href="/professionnels">Découvrir l’offre pro</a>
      </div>
    </article>
  </div></div></section>

  <section class="tagline"><div class="wrap"><p data-reveal>Que vous ayez besoin d’une voiture pour le week-end, d’un SUV pour les vacances ou d’un utilitaire pour déménager, ${esc(s.brand)} vous offre une location simple, rapide et soignée, adaptée à vos besoins.</p></div></section>

  <section class="section" id="vehicules"><div class="wrap">
    <h2 class="sec-title" data-reveal>Nos véhicules</h2>
    <div class="pillbar" role="group" aria-label="Catégories de véhicules">${pills}</div>
    <div class="rgrid" data-stagger>${fleet.map((v) => rcard(v)).join('')}</div>
  </div></section>

  <section class="section why"><div class="wrap">
    <h2 class="sec-title" data-reveal>Pourquoi nous choisir ?</h2>
    <div class="why-grid">${why.map(([h, p], i) => `<div class="why-i" data-reveal style="--d:${i * 0.15}s"><span class="why-n">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div></section>

  <section class="section-sm"><div class="wrap duo">
    <a class="duo-c light" href="/vehicules" data-reveal><h3>Vous recherchez un véhicule ?</h3><p>Citadine, berline électrique, SUV 7 places ou utilitaire jusqu’à 20 m³ : trouvez le véhicule qu’il vous faut à partir de ${eur(fleetFrom())} par jour et réservez-le en ligne.</p><span class="duo-go">Voir les véhicules ${icon('arrowR')}</span></a>
    <a class="duo-c gold" href="/professionnels" data-reveal style="--d:.12s"><h3>Vous êtes un professionnel ?</h3><p>Artisans, entreprises, déménageurs : tarifs hors taxes, facture au nom de votre société, paiement par virement et utilitaires disponibles toute l’année.</p><span class="duo-go">L’offre professionnels ${icon('arrowR')}</span></a>
  </div></section>

  ${homeSaleHTML()}

  <section class="places-band"><div class="wrap">
    <h2 class="sec-title" data-reveal>Où récupérer votre véhicule ?</h2>
    <p class="sec-sub" data-reveal>${esc(weekHoursText())}</p>
    <div class="places" data-stagger>${db.agencies.map(placeCard).join('')}</div>
  </div></section>

  ${INDEXABLE ? '' : `<section class="section"><div class="wrap">
    <h2 class="sec-title" data-reveal>Témoignages</h2>
    <div class="tst" data-tst><div class="tst-track">${TESTIMONIALS.map((t) => `<figure class="tst-c"><div class="tst-hd"><b>${esc(t.name)}</b><span class="tst-q" aria-hidden="true">“</span></div><div class="tst-st" aria-label="5 étoiles sur 5">★★★★★</div><blockquote>${esc(t.text)}</blockquote><figcaption>${esc(t.meta)}</figcaption></figure>`).join('')}</div></div>
    <div class="tst-dots"></div>
    <p class="tst-note">Avis d’exemple pour la démonstration : ils seront remplacés par vos avis clients.</p>
  </div></section>`}

  <section class="section-sm"><div class="wrap"><div class="brand-3d" data-reveal><canvas class="band-canvas" aria-label="Le P de PRISMA en trois dimensions"></canvas><div class="copy"><img src="${ASSETS.wordmark}" alt="${esc(s.brand)}, ${esc(s.tagline)}"><p>Une flotte entretenue, préparée avant chaque départ et livrée où vous le souhaitez. La lumière d’un prisme : un seul faisceau, toutes les nuances.</p></div></div></div></section>

  ${brands.length ? `<section class="section brands"><div class="wrap"><h2 class="sec-title" data-reveal>Nos marques</h2></div><div class="marquee" aria-label="${esc(brands.join(', '))}"><div class="mq-track">${brands.concat(brands, brands, brands).map((b) => `<span>${esc(b.toUpperCase())}</span>`).join('')}</div></div></section>` : ''}

  ${homeSeoHTML()}

  <section class="section" id="faq" style="padding-top:0"><div class="wrap" style="max-width:860px">
    <h2 class="sec-title" data-reveal>Questions fréquentes</h2>
    <div class="faq" data-stagger>${(homeFaqItems() || [
      { q: 'Quels documents faut-il présenter au départ ?', a: 'Votre permis de conduire, une pièce d’identité et une carte bancaire à votre nom pour la caution. Les professionnels ajoutent un extrait Kbis de moins de trois mois.' },
      { q: 'Comment fonctionne la caution ?', a: 'C’est une empreinte bancaire prise au départ : elle n’est pas débitée. Elle est libérée au retour du véhicule, déduction faite d’éventuels frais (carburant, kilomètres supplémentaires, dommages).' },
      { q: 'Quel âge et quelle ancienneté de permis ?', a: `${s.minAge} ans minimum et deux ans de permis pour la plupart des véhicules. Certains modèles demandent davantage : c’est indiqué sur leur fiche. Un supplément jeune conducteur s’applique aux permis de moins de ${s.youngYears} ans.` },
      { q: 'Puis-je annuler ou modifier ma réservation ?', a: `Oui, gratuitement jusqu’à ${s.freeCancelHours} heures avant le départ, depuis votre espace client ou par téléphone.` },
      { q: 'Faut-il un permis spécial pour les utilitaires ?', a: 'Non. Tous nos utilitaires, y compris le 20 m³ avec hayon, pèsent moins de 3,5 tonnes et se conduisent avec le permis B.' },
    ]).map((f) => `<details><summary>${esc(stripTags(f.q))}</summary><p>${f.a}</p></details>`).join('')}</div>
    ${SEO_BY_PATH['/faq'] ? '<p class="faq-more"><a class="more-link" href="/faq">Toutes les questions <i>' + icon('plus') + '</i></a></p>' : ''}
  </div></section>`;
  return publicPage(html, { active: 'home' });
}
function mountHome() {
  const card = $('.search-card');
  if (!card) return;
  const st = homeSearchState();
  bindSearchForm(card, st, (res) => {
    ui.grp = res.kind === 'utilitaire' ? 'utilitaire' : 'voiture';
    draft = { ...(draft || {}), from: res.from, to: res.to, agencyStart: res.agencyStart, agencyEnd: res.agencyEnd, pro: !!res.pro, vehicleId: null, options: {}, promo: null };
    if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
    saveDraft();
    go(catHref(ui.grp));
  });
  // filtre du catalogue, sans recharger la page
  $$('[data-hg]').forEach((b) => (b.onclick = () => {
    const g = b.dataset.hg;
    $$('[data-hg]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    $$('#vehicules .rcard').forEach((c) => {
      const show = g === 'all' || c.dataset.grp.split(' ').includes(g);
      c.hidden = !show;
      if (show && !REDUCED) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    });
  }));
  mountPlaces();
}
function mountPlaces() {
  $$('[data-ag]').forEach((b) => (b.onclick = () => { ensureDraft(); draft.agencyStart = b.dataset.ag; draft.agencyEnd = b.dataset.ag; saveDraft(); toast(`Départ : ${agency(b.dataset.ag).name}. Choisissez votre véhicule.`); go('/vehicules'); }));
}

window.catFail = (img, shape, color) => { img.replaceWith(document.createRange().createContextualFragment(`<div class="cat-fb">${carSVG(shape, color)}</div>`)); };

/* ---------- Résultats ---------- */
function ensureDraft() {
  if (!draft || !draft.from || searchError(draft)) {
    const keep = draft || {};
    draft = { ...defaultSearch(), options: keep.options || {}, promo: keep.promo || null, vehicleId: keep.vehicleId || null, customer: keep.customer || null, pro: !!keep.pro };
    saveDraft();
  }
}
function pageResults(gid) {
  ensureDraft();
  if (gid) ui.grp = grp(gid).id;
  const g = grp(ui.grp);
  const fleet = liveFleet();
  let list = fleet.filter(g.test);
  if (ui.auto) list = list.filter((v) => v.gearbox === 'Automatique');
  const rows = list.map((v) => ({ v, q: quoteSearch(v), ok: isAvailable(v.id, draft.from, draft.to) }));
  const cmp = { prix: (a, b) => a.q.total - b.q.total, prixd: (a, b) => b.q.total - a.q.total, places: (a, b) => b.v.seats - a.v.seats }[ui.sort];
  rows.sort((a, b) => (a.ok === b.ok ? cmp(a, b) : a.ok ? -1 : 1));
  const nOk = rows.filter((r) => r.ok).length;
  const inG = fleet.filter(g.test);
  const span = (arr, unit) => { const u = [...new Set(arr)].sort((x, y) => x - y); return !u.length ? '' : u.length === 1 ? `${u[0]}${unit}` : `${u[0]} à ${u[u.length - 1]}${unit}`; };
  const deps = inG.map((v) => v.deposit);
  const seo = g.id === 'all' ? SEO_BY_PATH['/vehicules'] : null;
  const land = g.id !== 'all' && GROUP_LANDING[g.id] && SEO_BY_PATH[GROUP_LANDING[g.id]];
  const html = tripBar(1) + `<div class="wrap cat-page">
    <div class="cat-head">
      <div><h1 class="cat-title">${esc((seo && seo.h1) || g.title)}</h1><p>${esc((seo && seo.lead) || g.txt)}</p>${land ? `<a class="cat-land" href="${land.path}">${esc(land.h1)}${icon('arrowR')}</a>` : ''}</div>
      <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span>${g.id === 'all' ? '<b>Véhicules</b>' : `<a href="/vehicules">Véhicules</a><span>/</span><b>${esc(g.label)}</b>`}</nav>
    </div>
    <p class="cat-also"><span>Découvrez également :</span>${GROUPS.filter((x) => x.id !== g.id && x.id !== 'all' && fleet.some(x.test)).map((x) => `<a href="/vehicules/${x.id}">${esc(x.title)}</a>`).join('')}</p>
    ${inG.length ? `<div class="conds"><b>Conditions générales de location</b><span>Âge minimum : <em>${span(inG.map((v) => Math.max(v.minAge, db.settings.minAge)), ' ans')}</em></span><span>Années de permis : <em>${span(inG.map((v) => v.minYears), ' ans')}</em></span><span>Caution entre : <em>${eur(Math.min(...deps))} et ${eur(Math.max(...deps))}</em>, par empreinte bancaire non débitée</span></div>` : ''}
    <div class="pillbar" role="group" aria-label="Catégories de véhicules">${GROUPS.filter((x) => fleet.some(x.test)).map((x) => `<a class="pill ${x.id === g.id ? 'on' : ''}" href="${x.id === 'all' ? '/vehicules' : '/vehicules/' + x.id}" ${x.id === g.id ? 'aria-current="page"' : ''}>${esc(x.label)}</a>`).join('')}</div>
    <div class="res-tools">
      <p class="res-count">Il y a <b>${nOk}</b> ${nOk > 1 ? 'véhicules disponibles' : 'véhicule disponible'} sur vos dates.${isPro() ? ' <span class="pro-note">Prix hors taxes</span>' : ''}</p>
      <div class="res-ctl">${taxSwitch()}<button type="button" class="chip ${ui.auto ? 'on' : ''}" data-auto aria-pressed="${ui.auto}">Boîte automatique</button><label class="field"><span class="sr-only">Trier</span><select class="select" data-sort><option value="prix" ${ui.sort === 'prix' ? 'selected' : ''}>Prix croissant</option><option value="prixd" ${ui.sort === 'prixd' ? 'selected' : ''}>Prix décroissant</option><option value="places" ${ui.sort === 'places' ? 'selected' : ''}>Nombre de places</option></select></label></div>
    </div>
    ${rows.length ? `<div class="rgrid" data-stagger>${rows.map((r) => rcard(r.v, { search: true })).join('')}</div>` : `<div class="empty">${icon('search')}Aucun véhicule ne correspond à ces filtres.<br><br><a class="btn btn-ghost" href="/vehicules">Voir tous les véhicules</a></div>`}
    ${g.id === 'all' ? catalogueSeoHTML() : ''}
  </div>`;
  return publicPage(html, { active: 'vehicules' });
}
function mountResults() {
  bindTaxSwitch();
  mountSeo();
  const a = $('[data-auto]'); if (a) a.onclick = () => { ui.auto = !ui.auto; rerender(); };
  const s = $('[data-sort]'); if (s) s.onchange = () => { ui.sort = s.value; rerender(); };
}

/* ---------- Fiche véhicule ---------- */
function pageVehicle(id) {
  ensureDraft();
  const v = vehicle(id);
  if (!v || v.deleted) return publicPage(`<div class="wrap empty">${icon('car')}Ce véhicule n’existe plus.<br><br><a class="btn btn-primary" href="/vehicules">Voir les véhicules</a></div>`);
  const q = quoteSearch(v);
  const ok = isAvailable(v.id, draft.from, draft.to);
  const s = db.settings;
  const g = mainGroup(v);
  const bm = brandModel(v);
  const photo = photoOf(v);
  const crd = creditOf(v);
  const f = parse(draft.from), t = parse(draft.to);
  const sameGroup = liveFleet().filter((x) => x.id !== v.id && g.test(x));
  const more = sameGroup.length ? sameGroup : liveFleet().filter((x) => x.id !== v.id && x.category === v.category);
  const waTxt = `Bonjour, je souhaite réserver le véhicule ${v.name} du ${fmtD(f)} à ${hm(f).replace(':', 'h')} au ${fmtD(t)} à ${hm(t).replace(':', 'h')}, départ ${agency(draft.agencyStart).name}.`;
  const html = tripBar(1) + `<div class="wrap vd">
    ${crumbsHTML(vehicleCrumbs(v).map(([l, p], i, a) => [l, i === a.length - 1 ? null : p]))}
    <div class="vd-head">
      <div><span class="vd-badge">${esc(bm.brand || v.segment)}</span><h1>${esc((SEO_VEHICLE[v.id] && SEO_VEHICLE[v.id].h1) || `Location ${v.name}`)}</h1><p class="vd-sub">${esc(v.segment)}${v.similar ? ' · ou similaire' : ''} · véhicule sans chauffeur</p></div>
      <div class="vd-contact"><a href="${telHref()}">${icon('phone')}Appeler</a><a href="${waHref(waTxt)}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
    </div>
    <div class="vd-grid">
      <div class="vd-gal">
        <div class="vd-main" data-vmain>${studioShot(v, { big: true })}</div>
        <div class="vd-thumbs">
          <button type="button" class="on" data-view="studio" aria-label="Vue studio">${studioShot(v)}</button>
          ${photo && !v.photo ? `<button type="button" data-view="photo" aria-label="Photo du modèle"><img src="${esc(photo)}" alt=""></button>` : ''}
          ${v.photo ? '' : `<button type="button" class="t3d" data-view="3d" aria-label="Vue en relief">${icon('refresh')}<span>Vue 3D</span></button>`}
        </div>
        ${crd ? `<p class="credit">Photo : ${esc(crd.author || crd.site || 'libre de droits')}${crd.license ? `, ${esc(crd.license)}` : ''}. Photo non contractuelle.</p>` : ''}
      </div>
      <aside class="vd-book">
        <div class="vd-price"><span class="vd-pl">Prix pour ${plural(q.days, 'jour')}</span><b class="num">${money(q.total)}${taxTag()}</b><span class="vd-km">${q.kmIncluded == null ? 'Kilométrage illimité' : `${q.kmIncluded.toLocaleString('fr-FR')} km inclus`} · ${isPro() ? 'prix hors taxes' : 'prix TTC'}${q.pct ? ` · tarif dégressif ${q.pct} %` : ''}</span></div>
        <div class="vd-dates"><span class="sx-l">Vos dates</span><button type="button" class="sx-box vd-when" data-edit-search>${icon('cal')}<span>${esc(fmtDay(f))} ${hm(f)} <em>→</em> ${esc(fmtDay(t))} ${hm(t)}</span>${icon('edit')}</button><span class="vd-ag">${icon('pin')}${esc(agency(draft.agencyStart).name)}${draft.agencyEnd !== draft.agencyStart ? ` → ${esc(agency(draft.agencyEnd).name)}` : ''}</span></div>
        ${ok ? '<button type="button" class="btn btn-primary btn-lg btn-block" data-continue>Réserver ce véhicule</button>' : `<div class="alert warn">${icon('alert')}<span>Ce véhicule n’est pas libre sur vos dates. Modifiez-les ou choisissez un autre véhicule.</span></div>`}
        <a class="btn btn-wa btn-block" href="${waHref(waTxt)}" target="_blank" rel="noopener">${icon('wa')}Réserver par WhatsApp</a>
        ${summaryCard(q, v, { title: 'Détail du prix' })}
      </aside>
    </div>
    <div class="vd-info">
      <div>
        <h2>Présentation</h2>
        <p class="vd-desc">${esc(v.description || '')}</p>
        <div class="specs vd-specs">${specsHTML(v)}</div>
        ${v.equipment?.length ? `<h3>Équipements</h3><ul class="vd-eq">${v.equipment.map((e) => `<li>${icon('check')}${esc(e)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="conds-card">
        <h3>Conditions de location</h3>
        <div class="kv"><span>Caution (empreinte bancaire, non débitée)</span><b>${eur(v.deposit)}</b></div>
        <div class="kv"><span>Franchise en cas de dommage</span><b>${eur(v.franchise)}</b></div>
        <div class="kv"><span>Kilométrage</span><b>${q.kmIncluded == null ? 'Illimité' : `${q.kmIncluded.toLocaleString('fr-FR')} km inclus`}</b></div>
        ${q.kmIncluded == null ? '' : `<div class="kv"><span>Kilomètre supplémentaire</span><b>${eur(v.extraKm, true)}</b></div>`}
        <div class="kv"><span>Âge minimum du conducteur</span><b>${Math.max(v.minAge, s.minAge)} ans</b></div>
        <div class="kv"><span>Permis de conduire depuis</span><b>${plural(v.minYears, 'an')} au moins</b></div>
      </div>
    </div>
    ${vehicleSeoHTML(v)}
    ${more.length ? `<section class="vd-more"><div class="sec-row"><h2>Autres modèles de la catégorie ${esc(g.label)}</h2><a class="more-link" href="${catHref(g.id)}">Voir tous les véhicules <i>${icon('plus')}</i></a></div><div class="hscroll">${more.map((x) => rcard(x, { search: true })).join('')}</div></section>` : ''}
  </div>
  <div class="sticky-cta vd-sticky"><div class="in"><div class="tot"><small>${plural(q.days, 'jour')}, hors options${isPro() ? ', hors taxes' : ''}</small><b>${money(q.total)}${taxTag()}</b></div>${ok ? `<button type="button" class="btn btn-primary btn-lg" data-continue>Réserver ${icon('arrowR')}</button>` : '<a class="btn btn-ghost btn-lg" href="/vehicules">Voir les véhicules libres</a>'}</div></div>`;
  return publicPage(html, { active: 'vehicules' });
}
function mountVehicle(id) {
  const v = vehicle(id);
  mountSeo();
  $$('[data-continue]').forEach((b) => (b.onclick = () => {
    if (draft.vehicleId !== id) { draft.options = {}; }
    draft.vehicleId = id;
    saveDraft();
    go('/options');
  }));
  const main = $('[data-vmain]');
  if (!main || !v) return;
  $$('[data-view]').forEach((b) => (b.onclick = () => {
    $$('[data-view]').forEach((x) => x.classList.toggle('on', x === b));
    const view = b.dataset.view;
    main.classList.remove('swap'); void main.offsetWidth; main.classList.add('swap');
    if (view === 'photo') main.innerHTML = `<img class="vd-photo" src="${esc(photoOf(v))}" alt="${esc(v.name)}">`;
    else if (view === '3d') { main.innerHTML = showroomHTML([v], { big: true }) + `<div class="drag-hint">${icon('arrowL')}Faites glisser pour faire pivoter${icon('arrowR')}</div>`; mountShowrooms(main); }
    else main.innerHTML = studioShot(v, { big: true });
  }));
}
function summaryCard(q, v, { title = 'Récapitulatif', showDetails = false, open = false } = {}) {
  const lines = q.lines.map((l0) => (isPro() ? { ...l0, amount: ht(l0.amount), label: l0.unit ? `Location ${plural(l0.days, 'jour')} (${eur(ht(l0.unit))} HT par jour)` : l0.label } : l0)).map((l) => `<div class="kv ${l.amount < 0 ? 'neg' : ''}"><span>${esc(l.label)}</span><b class="num">${l.amount < 0 ? '− ' + eur(-l.amount) : eur(l.amount)}</b></div>`).join('');
  return `<div class="sum-card">
    <div class="hd"><h2>${esc(title)}</h2>${isPro() ? '<span class="badge b-gold plain">Tarif professionnel</span>' : ''}</div>
    <div class="bd">
      ${lines}
      ${isPro()
        ? `<div class="kv total"><span>Total HT</span><b class="num">${eur(q.ht)}</b></div>
      <div class="kv" style="font-size:13px"><span>TVA ${db.settings.vat} %</span><span class="num">${eur(q.tva)}</span></div>
      <div class="kv" style="font-size:13px"><span>Total TTC</span><span class="num">${eur(q.total)}</span></div>`
        : `<div class="kv total"><span>Total TTC</span><b class="num">${eur(q.total)}</b></div>
      <div class="kv" style="font-size:13px"><span>dont TVA ${db.settings.vat} %</span><span class="num">${eur(q.tva)}</span></div>`}
      ${showDetails ? `<details ${open ? 'open' : ''} style="margin-top:10px"><summary class="link" style="cursor:pointer;list-style:none;display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:13.5px">${icon('info')}<span>Caution, franchise, kilométrage</span></summary>
        <div style="margin-top:8px">
          <div class="kv"><span>Durée</span><b>${plural(q.days, 'jour')}</b></div>
          <div class="kv"><span>Franchise maximale</span><b>${eur(q.franchise)}</b></div>
          <div class="kv"><span>Montant de la caution</span><b>${eur(q.deposit)}</b></div>
          <div class="kv"><span>Kilométrage inclus</span><b>${q.kmIncluded == null ? 'Illimité' : q.kmIncluded.toLocaleString('fr-FR') + ' km'}</b></div>
          <div class="kv"><span>Location hors options</span><b>${money(q.base)}${taxTag()}</b></div>
        </div></details>` : ''}
    </div>
  </div>`;
}
const statusIcon = () => '';

/* ---------- Options et garanties ---------- */
function pageOptions() {
  ensureDraft();
  const v = vehicle(draft.vehicleId);
  if (!v) { setTimeout(() => go('/vehicules'), 0); return publicPage(''); }
  const q = quoteSearch(v, { options: draft.options, promo: draft.promo });
  const aS = agency(draft.agencyStart);
  const aE = agency(draft.agencyEnd);
  const opts = db.options.filter((o) => o.active && o.cats.includes(v.category) && !(o.unlimited && v.kmDay === 0));
  const optRow = (o) => {
    const qty = draft.options[o.id] || 0;
    const price = o.unit === 'jour' ? `${money(o.price)}${taxTag()} par jour${o.max ? `, ${money(o.max)}${taxTag()} maximum` : ''}` : `${money(o.price)}${taxTag()} par location`;
    const act = o.maxQty > 1 && qty
      ? `<div class="qty"><button type="button" data-dec="${o.id}" aria-label="Retirer un">−</button><b>${qty}</b><button type="button" data-inc="${o.id}" aria-label="Ajouter un" ${qty >= o.maxQty ? 'disabled' : ''}>+</button></div>`
      : `<button type="button" class="btn ${qty ? 'btn-ghost' : 'btn-silver'} btn-sm" data-toggle="${o.id}">${qty ? `${icon('check')}Ajoutée` : `${icon('plus')}Ajouter`}</button>`;
    return `<div class="opt ${qty ? 'on' : ''}"><div class="ic">${icon(o.icon || 'plus')}</div><div><h4>${esc(o.name)}</h4><p>${esc(o.desc)}</p><div class="pr">${price}</div></div><div class="act">${act}</div></div>`;
  };
  const html = tripBar(2) + `<div class="wrap"><div class="book-layout">
    <div>
      <div class="sum-card"><div class="hd"><h3>Récapitulatif de votre réservation</h3><button class="btn btn-ghost btn-sm" data-edit-search>${icon('edit')}Modifier</button></div><div class="bd">
        <div class="ico-line">${icon('pin')}<span>Départ : <em>${esc(aS.name)}</em></span></div>
        <div class="ico-line">${icon('pin')}<span>Retour : <em>${esc(aE.name)}</em></span></div>
        <div class="ico-line">${icon('cal')}<span>Du ${esc(fmtDT(draft.from))}</span></div>
        <div class="ico-line">${icon('cal')}<span>Au ${esc(fmtDT(draft.to))}</span></div>
        <div style="display:flex;gap:14px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--line-2)">${vehicleThumb(v)}<div><b>${esc(v.name)}</b> <span class="muted" style="font-style:italic">${v.similar ? 'ou similaire' : ''}</span><br><a class="link" href="/vehicules" style="font-size:13px">Changer de véhicule</a></div></div>
      </div></div>
      <div style="margin:26px 0 14px"><span class="eyebrow">Étape 2</span><h2 class="page-title" style="margin-top:10px">Options et garanties</h2></div>
      <div style="display:grid;gap:12px">${opts.map(optRow).join('')}</div>
      <div class="card card-pad" style="margin-top:16px">
        <form data-promo style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap">
          <label class="field" style="flex:1;min-width:200px"><span class="lbl">Code promo</span><input class="input" name="code" value="${esc(draft.promo || '')}" placeholder="Par exemple BIENVENUE10" autocomplete="off"><span class="msg">Ce code n’est pas valable.</span></label>
          <button class="btn btn-ghost" type="submit">Appliquer</button>
          ${draft.promo ? '<button class="btn btn-danger btn-sm" type="button" data-unpromo>Retirer</button>' : ''}
        </form>
      </div>
    </div>
    <aside class="book-side">${summaryCard(q, v, { title: 'Montant total', showDetails: true, open: true })}</aside>
  </div></div>
  <div class="sticky-cta"><div class="in"><div class="tot"><small>Total ${isPro() ? 'HT' : 'TTC'}, options comprises</small><b>${money(q.total)}${taxTag()}</b></div><button class="btn btn-primary btn-lg" data-continue>Continuer pour ${money(q.total)}${taxTag()}</button></div></div>`;
  return publicPage(html, { active: 'vehicules', footer: false });
}
function mountOptions() {
  const setOpt = (id, qty) => {
    const o = option(id);
    if (qty > 0) { draft.options[id] = Math.min(qty, o.maxQty || 1); if (o.excl) delete draft.options[o.excl]; } else delete draft.options[id];
    saveDraft(); rerender();
  };
  $$('[data-toggle]').forEach((b) => (b.onclick = () => setOpt(b.dataset.toggle, draft.options[b.dataset.toggle] ? 0 : 1)));
  $$('[data-inc]').forEach((b) => (b.onclick = () => setOpt(b.dataset.inc, (draft.options[b.dataset.inc] || 0) + 1)));
  $$('[data-dec]').forEach((b) => (b.onclick = () => setOpt(b.dataset.dec, (draft.options[b.dataset.dec] || 0) - 1)));
  const f = $('[data-promo]');
  if (f) f.onsubmit = (e) => {
    e.preventDefault();
    const code = f.code.value.trim().toUpperCase();
    const p = db.promos.find((x) => x.active && x.code === code);
    if (!p) { f.querySelector('.field').classList.add('err'); return; }
    draft.promo = p.code; saveDraft(); toast(`Code ${p.code} appliqué : ${p.pct} % de remise.`, 'ok'); rerender();
  };
  const u = $('[data-unpromo]'); if (u) u.onclick = () => { draft.promo = null; saveDraft(); rerender(); };
  $('[data-continue]').onclick = () => go('/coordonnees');
}

/* ---------- Coordonnées et permis ---------- */
const COUNTRIES = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Espagne', 'Portugal', 'Italie', 'Allemagne', 'Royaume-Uni', 'Maroc', 'Algérie', 'Tunisie', 'Sénégal', 'Autre pays'];
function pageDetails() {
  ensureDraft();
  const v = vehicle(draft.vehicleId);
  if (!v) { setTimeout(() => go('/vehicules'), 0); return publicPage(''); }
  const sess = session();
  const known = sess && customer(sess.customerId);
  if (!draft.customer && known) draft.pro = known.type === 'professionnel';
  const c = draft.customer || (known ? { ...known } : { type: isPro() ? 'professionnel' : 'particulier', license: { country: 'France' } });
  const pro = isPro();
  const needsAddr = draft.agencyStart === 'livraison' || draft.agencyEnd === 'livraison';
  const q = quoteSearch(v, { options: draft.options, promo: draft.promo, youngDriver: isYoung(c) });
  const f = (name, label, val, attrs = '', hint = '') => `<label class="field" data-f="${name}"><span class="lbl">${label} <span class="req">*</span></span><input class="input" name="${name}" value="${esc(val || '')}" ${attrs}><span class="msg"></span>${hint ? `<span class="hint">${hint}</span>` : ''}</label>`;
  const html = tripBar(3) + `<div class="wrap"><div class="book-layout">
    <form data-details novalidate>
      <div style="margin-bottom:14px"><span class="eyebrow">Étape 3</span><h2 class="page-title" style="margin-top:10px">Vos informations</h2>
        <p class="muted" style="margin-top:8px">${known ? `Connecté en tant que <b style="color:var(--text)">${esc(known.firstName)} ${esc(known.lastName)}</b>. <a href="#" class="link" data-logout>Ce n’est pas vous ?</a>` : 'Vous avez déjà un compte ? <a href="#" class="link" data-login>Connectez-vous</a>'}</p></div>
      <div class="card card-pad" style="display:grid;gap:14px">
        <div class="seg" role="tablist" aria-label="Type de client"><button type="button" class="${pro ? '' : 'on'}" data-type="particulier">Particulier</button><button type="button" class="${pro ? 'on' : ''}" data-type="professionnel">Professionnel</button></div>
        ${pro ? `<div class="alert info">${icon('file')}<span>Tarif professionnel : prix hors taxes, facture au nom de la société avec la TVA indiquée, et paiement par virement possible.</span></div>` : ''}
        <div class="form-sec" data-pro ${pro ? '' : 'hidden'}>
          <div class="sub-title">Votre société</div>
          <div class="grid2">${f('company', 'Raison sociale', c.company, 'autocomplete="organization"')}${f('siret', 'SIRET', c.siret, 'inputmode="numeric"', '14 chiffres, sur votre Kbis.')}</div>
          <label class="field" data-f="vatNum"><span class="lbl">N° de TVA intracommunautaire</span><input class="input" name="vatNum" value="${esc(c.vatNum || '')}" placeholder="FR12 345678901" autocomplete="off"><span class="hint">Facultatif : il figurera sur vos factures.</span></label>
        </div>
        <div class="form-sec">
          <div class="sub-title">${pro ? 'Conducteur principal' : 'Vos coordonnées'}</div>
          <div class="grid2">${f('firstName', 'Prénom', c.firstName, 'autocomplete="given-name"')}${f('lastName', 'Nom', c.lastName, 'autocomplete="family-name"')}</div>
          <div class="grid2">${f('email', pro ? 'Email (factures et confirmations)' : 'Adresse email', c.email, 'type="email" autocomplete="email" inputmode="email"')}${f('phone', 'Téléphone mobile', c.phone, 'type="tel" autocomplete="tel" inputmode="tel"')}</div>
          ${f('birth', 'Date de naissance du conducteur', c.birth, 'type="date" max="' + dateKey(new Date()) + '"')}
        </div>
        <div class="form-sec">
          <div class="sub-title">${pro ? 'Adresse de facturation de la société' : 'Votre adresse'}</div>
          ${f('address', pro ? 'Adresse du siège ou de l’établissement' : 'Adresse', c.address, 'autocomplete="street-address"')}
          <div class="grid2">${f('zip', 'Code postal', c.zip, 'inputmode="numeric" autocomplete="postal-code"')}${f('city', 'Ville', c.city, 'autocomplete="address-level2"')}</div>
        </div>
        ${needsAddr ? `<label class="field" data-f="delivery"><span class="lbl">Adresse de livraison ou de reprise <span class="req">*</span></span><textarea class="textarea" name="delivery" placeholder="Numéro, rue, code postal, ville, et un détail utile (portail, étage)">${esc(draft.delivery || '')}</textarea><span class="msg"></span></label>` : ''}
      </div>
      <div class="card card-pad" style="display:grid;gap:14px;margin-top:14px">
        <div><span class="eyebrow">Permis de conduire</span></div>
        ${f('licNumber', 'Numéro de permis', c.license?.number, 'autocomplete="off"')}
        <div class="grid2">${f('licDate', 'Date d’obtention', c.license?.date, 'type="date" max="' + dateKey(new Date()) + '"')}<label class="field" data-f="licCountry"><span class="lbl">Pays de délivrance <span class="req">*</span></span><select class="select" name="licCountry">${COUNTRIES.map((x) => `<option ${x === (c.license?.country || 'France') ? 'selected' : ''}>${x}</option>`).join('')}</select><span class="msg"></span></label></div>
        <div data-young>${youngAlert(c, v)}</div>
      </div>
      <div class="card card-pad" style="display:grid;gap:12px;margin-top:14px">
        <label class="check" data-f="cgv"><input type="checkbox" name="cgv" ${draft.cgv ? 'checked' : ''}><span>J’accepte les <a href="#" class="link" data-doc="cgv">conditions générales de location</a>. <span class="req">*</span></span></label>
        <label class="check"><input type="checkbox" name="account" ${known || draft.account !== false ? 'checked' : ''}><span>Je crée mon espace client pour suivre mes locations et retrouver mes documents.</span></label>
        <div class="field msg-cgv" hidden><span class="msg" style="display:block">Merci d’accepter les conditions générales.</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:18px;flex-wrap:wrap">
        <a class="link" href="/options" style="text-decoration:none;display:inline-flex;gap:6px;align-items:center">${icon('arrowL')}<span>Retour à l’étape précédente</span></a>
        <button class="btn btn-primary btn-lg" type="submit">Confirmer ma réservation</button>
      </div>
    </form>
    <aside class="book-side">${summaryCard(q, v, { title: 'Montant total', showDetails: true })}</aside>
  </div></div>`;
  return publicPage(html, { active: 'vehicules', footer: false });
}
function isYoung(c) {
  const d = c?.license?.date;
  if (!d || !draft?.from) return false;
  return yearsBetween(parse(d + 'T00:00'), parse(draft.from)) < db.settings.youngYears;
}
function youngAlert(c, v) {
  if (!isYoung(c)) return '';
  const s = db.settings;
  const days = rentalDays(draft.from, draft.to);
  return `<div class="alert warn">${icon('info')}<span>Permis de moins de ${s.youngYears} ans : un supplément jeune conducteur de ${eur(s.youngFee)} par jour (${eur(Math.min(s.youngFee * days, s.youngFeeMax))} pour votre location) s’ajoute, et la caution est augmentée de ${eur(s.youngDeposit)}.</span></div>`;
}
function readDetails(form) {
  const g = (n) => (form[n] ? form[n].value.trim() : '');
  const type = $('.seg .on', form)?.dataset.type || 'particulier';
  return {
    type, company: g('company'), siret: g('siret'), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'),
    address: g('address'), zip: g('zip'), city: g('city'), birth: g('birth'), vatNum: g('vatNum').toUpperCase(),
    license: { number: g('licNumber').toUpperCase(), date: g('licDate'), country: g('licCountry') },
  };
}
function mountDetails() {
  const form = $('[data-details]');
  if (!form) return;
  const v = vehicle(draft.vehicleId);
  const keep = () => { draft.customer = readDetails(form); draft.delivery = form.delivery ? form.delivery.value : draft.delivery; draft.cgv = form.cgv.checked; draft.account = form.account.checked; saveDraft(); };
  // Particulier ou professionnel : on garde la saisie et on réaffiche (champs, libellés, prix HT ou TTC)
  $$('.seg button', form).forEach((b) => (b.onclick = () => {
    $$('.seg button', form).forEach((x) => x.classList.toggle('on', x === b));
    draft.pro = b.dataset.type === 'professionnel';
    keep();
    rerender();
  }));
  // Date d'obtention : l'alerte « jeune conducteur » et le montant se mettent à jour sur place. Redessiner tout le
  // formulaire à chaque « change » coupait la saisie de l'année au premier chiffre (« 0020 » au lieu de « 2020 »).
  const refreshYoung = () => {
    const d = form.licDate.value;
    if (d && +d.slice(0, 4) < 1900) return; // année en cours de saisie
    const c = readDetails(form);
    draft.customer = c;
    saveDraft();
    const box = $('[data-young]', form);
    if (box) box.innerHTML = youngAlert(c, v);
    const side = $('.book-side');
    if (side) {
      const open = !!side.querySelector('details[open]');
      side.innerHTML = summaryCard(quoteSearch(v, { options: draft.options, promo: draft.promo, youngDriver: isYoung(c) }), v, { title: 'Montant total', showDetails: true, open });
    }
  };
  form.licDate.addEventListener('change', refreshYoung);
  form.licDate.addEventListener('blur', refreshYoung);
  form.addEventListener('input', () => { draft.customer = readDetails(form); saveDraft(); });
  const login = $('[data-login]'); if (login) login.onclick = (e) => { e.preventDefault(); keep(); openLogin(() => { draft.customer = null; rerender(); }); };
  const lo = $('[data-logout]'); if (lo) lo.onclick = (e) => { e.preventDefault(); setSession(null); draft.customer = null; saveDraft(); rerender(); };
  form.onsubmit = (e) => {
    e.preventDefault();
    keep();
    const c = readDetails(form);
    const errs = {};
    const req = ['firstName', 'lastName', 'email', 'phone', 'address', 'zip', 'city', 'birth', 'licNumber', 'licDate'];
    if (c.type === 'professionnel') req.push('company', 'siret');
    const val = { ...c, licNumber: c.license.number, licDate: c.license.date };
    for (const k of req) if (!val[k]) errs[k] = 'Champ obligatoire.';
    if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) errs.email = 'Adresse email invalide.';
    if (c.phone && c.phone.replace(/\D/g, '').length < 10) errs.phone = 'Numéro de téléphone incomplet.';
    if (c.siret && c.type === 'professionnel' && c.siret.replace(/\D/g, '').length !== 14) errs.siret = 'Le SIRET compte 14 chiffres.';
    if (form.delivery && !form.delivery.value.trim()) errs.delivery = 'Indiquez l’adresse de livraison.';
    const from = parse(draft.from);
    if (c.birth) {
      const age = yearsBetween(parse(c.birth + 'T00:00'), from);
      const min = Math.max(v.minAge, db.settings.minAge);
      if (age < min) errs.birth = `Ce véhicule est réservé aux conducteurs de ${min} ans et plus.`;
    }
    if (c.license.date) {
      const yrs = yearsBetween(parse(c.license.date + 'T00:00'), from);
      if (parse(c.license.date + 'T00:00') > new Date()) errs.licDate = 'Date d’obtention dans le futur.';
      else if (yrs < v.minYears) errs.licDate = `Ce véhicule demande ${plural(v.minYears, 'an')} de permis. Choisissez un autre véhicule ou appelez-nous.`;
    }
    $$('[data-f]', form).forEach((el) => el.classList.remove('err'));
    for (const [k, m] of Object.entries(errs)) { const el = $(`[data-f="${k}"]`, form); if (el) { el.classList.add('err'); const ms = $('.msg', el); if (ms) ms.textContent = m; } }
    $('.msg-cgv', form).hidden = form.cgv.checked;
    if (Object.keys(errs).length || !form.cgv.checked) {
      const first = $('.field.err', form) || (!form.cgv.checked && $('.msg-cgv', form));
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Vérifiez les champs signalés.', 'warn');
      return;
    }
    const existing = db.customers.find((x) => x.email === c.email);
    if (existing?.blacklist) { toast('Nous ne pouvons pas finaliser cette réservation en ligne. Appelez-nous, nous trouverons une solution.', 'warn'); return; }
    if (!isAvailable(v.id, draft.from, draft.to)) { toast('Ce véhicule vient d’être réservé sur ces dates. Choisissez-en un autre.', 'warn'); go('/vehicules'); return; }
    if (c.type !== 'professionnel') Object.assign(c, { company: '', siret: '', vatNum: '' });
    let cust = existing;
    if (cust) Object.assign(cust, c, { account: cust.account || form.account.checked });
    else { cust = { id: uid('c'), ...c, createdAt: toISO(new Date()), account: form.account.checked, blacklist: false, notes: '' }; db.customers.push(cust); }
    const res = {
      id: uid('r'), number: '', createdAt: toISO(new Date()), status: 'attente_paiement', vehicleId: v.id, customerId: cust.id,
      from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, options: { ...draft.options }, promo: draft.promo,
      youngDriver: isYoung(c), channel: 'En ligne', payments: [], checkout: null, checkin: null, notes: '', delivery: form.delivery ? form.delivery.value.trim() : '',
    };
    res.quote = quoteFor(res);
    db.seq++; res.number = resNumber(new Date(), db.seq);
    db.reservations.push(res);
    save();
    if (form.account.checked) setSession({ customerId: cust.id });
    draft = { ...draft, vehicleId: null, options: {}, promo: null, customer: null, delivery: '', cgv: false };
    saveDraft();
    go('/reservation/' + res.id);
  };
}
function openLogin(after) {
  openModal({
    title: 'Connexion',
    body: `<form data-login-form novalidate style="display:grid;gap:14px"><p class="muted">Recevez un lien de connexion par email, sans mot de passe à retenir.</p><label class="field"><span class="lbl">Adresse email</span><input class="input" name="email" type="email" autocomplete="email" placeholder="vous@exemple.fr"><span class="msg">Aucun compte avec cette adresse.</span></label><button class="btn btn-primary" type="submit">Recevoir mon lien</button><button class="btn btn-ghost" type="button" data-demo>Utiliser le compte de démonstration</button></form>`,
    onMount: (m, close) => {
      const f = $('[data-login-form]', m);
      const done = (c) => { setSession({ customerId: c.id }); close(); toast(`Démonstration : connecté en tant que ${c.firstName} ${c.lastName}.`, 'ok'); after && after(); };
      f.onsubmit = (e) => { e.preventDefault(); const c = db.customers.find((x) => x.email === f.email.value.trim().toLowerCase()); if (!c) { f.querySelector('.field').classList.add('err'); return; } done(c); };
      $('[data-demo]', m).onclick = () => done(db.customers[0]);
    },
  });
}

/* ---------- Réservation : récapitulatif, paiement, confirmation ---------- */
function resLines(res) {
  if (res.status === 'annulee') return res.cancelFee ? [{ label: 'Frais d’annulation (50 % du prix de la location)', amount: res.cancelFee }] : [];
  const q = res.quote;
  const extras = res.checkin?.extras || [];
  return q.lines.concat(extras.map((e) => ({ label: e.label, amount: e.amount })));
}
function billingHTML(res) {
  const q = res.quote;
  const lines = resLines(res);
  const total = totalDue(res);
  const ht = round2(total / (1 + db.settings.vat / 100));
  const p = paid(res);
  if (res.status === 'annulee') {
    const inP = round2(sum(res.payments || [], (x) => (x.amount > 0 ? x.amount : 0)));
    const outP = round2(-sum(res.payments || [], (x) => (x.amount < 0 ? x.amount : 0)));
    return `<div class="kv"><span>Location annulée</span><b class="num muted"><s>${eur(q.total, true)}</s></b></div>
    <div class="kv"><span>${res.cancelFee ? 'Frais d’annulation (50 %)' : 'Annulation sans frais'}</span><b class="num">${eur(res.cancelFee || 0, true)}</b></div>
    ${inP ? `<div class="kv"><span>Réglé</span><b class="num">${eur(inP, true)}</b></div>` : ''}
    ${outP ? `<div class="kv neg"><span>Remboursé</span><b class="num">${eur(outP, true)}</b></div>` : ''}
    <div class="kv total"><span>Reste à payer</span><b class="num">${eur(Math.max(0, balance(res)), true)}</b></div>`;
  }
  return lines.map((l) => `<div class="kv ${l.amount < 0 ? 'neg' : ''}"><span>${esc(l.label)}</span><b class="num">${l.amount < 0 ? '− ' + eur(-l.amount) : eur(l.amount)}</b></div>`).join('') + `
    <div class="kv" style="border-top:1px solid var(--line);margin-top:6px;padding-top:10px"><span>Montant HT</span><b class="num">${eur(ht, true)}</b></div>
    <div class="kv"><span>TVA ${db.settings.vat} %</span><b class="num">${eur(round2(total - ht), true)}</b></div>
    <div class="kv total"><span>Montant total TTC</span><b class="num">${eur(total, true)}</b></div>
    ${p ? `<div class="kv"><span>Déjà réglé</span><b class="num">${eur(p, true)}</b></div>` : ''}
    <div class="kv" style="font-size:16px"><span style="color:var(--text);font-weight:600">Reste à payer</span><b class="num gold-text">${eur(Math.max(0, balance(res)), true)}</b></div>
    <p class="muted" style="font-size:12.5px;margin-top:8px">Caution de ${eur(q.deposit)} par empreinte bancaire au départ, non débitée. Franchise : ${eur(q.franchise)}.</p>`;
}
function pageReservation(id) {
  const res = byId(db.reservations, id);
  if (!res) return publicPage(`<div class="wrap empty">${icon('file')}Réservation introuvable.<br><br><a class="btn btn-primary" href="/">Retour à l’accueil</a></div>`);
  const v = vehicle(res.vehicleId);
  const c = customer(res.customerId);
  const aS = agency(res.agencyStart);
  const aE = agency(res.agencyEnd);
  const waiting = res.status === 'attente_paiement';
  const cancelled = res.status === 'annulee';
  const s = db.settings;
  const canCancel = ['attente_paiement', 'confirmee'].includes(res.status);
  const head = cancelled
    ? `<div class="success-head"><div class="ck wait" style="box-shadow:inset 0 0 0 2px var(--danger);color:var(--danger)">${icon('x')}</div><div><h1 class="page-title">Réservation annulée</h1><p class="muted" style="margin-top:6px">${esc(res.number)}</p></div></div>`
    : waiting
      ? `<div class="success-head"><div class="ck wait">${icon('clock')}</div><div><h1 style="font-size:19px;font-weight:600">${res.transfer ? `${esc(c.firstName)}, votre véhicule est réservé : nous attendons votre virement` : `${esc(c.firstName)}, votre réservation ${esc(res.number)} est en attente de paiement`}</h1>${res.transfer ? `<p class="muted" style="margin-top:6px">Facture et RIB envoyés à ${esc(c.email)}. Référence à indiquer : ${esc(res.number)}.</p>` : ''}<p class="page-title" style="margin-top:12px;font-size:17px">Du ${esc(fmtD(res.from))} au ${esc(fmtD(res.to))}</p></div></div>`
      : `<div class="success-head"><div class="ck ok">${icon('check')}</div><div><h1 style="font-size:19px;font-weight:600">C’est confirmé, ${esc(c.firstName)} : votre véhicule vous attend</h1><p class="muted" style="margin-top:6px">Réservation ${esc(res.number)} · un email de confirmation vient de partir à ${esc(c.email)}</p><p class="page-title" style="margin-top:12px;font-size:17px">Du ${esc(fmtD(res.from))} au ${esc(fmtD(res.to))}</p></div></div>`;
  const html = (waiting ? `<div class="book-top"><div class="wrap"><div class="stepper" style="margin-left:0">${['Véhicule', 'Options', 'Coordonnées', 'Paiement'].map((x, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i === 3 ? 'on' : 'done'}"><i>${i === 3 ? 4 : '✓'}</i><span>${x}</span></span>`).join('')}</div></div></div>` : '') + `<div class="wrap" style="max-width:980px;padding-top:26px;padding-bottom:120px">
    ${head}
    <div class="grid2" style="margin-top:22px;align-items:start">
      <div style="display:grid;gap:14px">
        <div class="sum-card"><div class="hd"><h3>Détails de la location</h3></div><div class="bd">
          <div style="display:flex;gap:14px;align-items:center;margin-bottom:10px">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><br><span class="muted" style="font-size:13px">${esc(v.segment)} · ${plural(res.quote.days, 'jour')}</span></div></div>
          <div class="ico-line">${icon('pin')}<span>Départ : <em>${esc(aS.name)}</em><br><span class="muted" style="font-size:13px">${esc(res.agencyStart === 'livraison' && res.delivery ? res.delivery : aS.address)}</span></span></div>
          <div class="ico-line">${icon('cal')}<span>${esc(fmtDay(res.from, true))} à ${hm(parse(res.from)).replace(':', 'h')}</span></div>
          <div class="ico-line">${icon('pin')}<span>Retour : <em>${esc(aE.name)}</em><br><span class="muted" style="font-size:13px">${esc(res.agencyEnd === 'livraison' && res.delivery ? res.delivery : aE.address)}</span></span></div>
          <div class="ico-line">${icon('cal')}<span>${esc(fmtDay(res.to, true))} à ${hm(parse(res.to)).replace(':', 'h')}</span></div>
        </div></div>
        ${cancelled ? '' : `<div class="sum-card"><div class="hd"><h3>Au départ, apportez</h3></div><div class="bd">
          <div class="ico-line">${icon('key')}<span>Votre permis de conduire (${esc(c.license?.country || 'France')})</span></div>
          <div class="ico-line">${icon('user')}<span>Une pièce d’identité à votre nom</span></div>
          <div class="ico-line">${icon('card')}<span>Une carte bancaire pour la caution de ${eur(res.quote.deposit)}</span></div>
          ${c.type === 'professionnel' ? `<div class="ico-line">${icon('file')}<span>Un extrait Kbis de moins de trois mois</span></div>` : ''}
        </div></div>`}
        <div class="sum-card"><div class="hd"><h3>Vos informations</h3></div><div class="bd">
          <div style="display:flex;gap:12px;align-items:center"><span class="avatar">${esc(initials(c.firstName + ' ' + c.lastName))}</span><div><b>${esc(custName(c))}</b><br><span class="muted" style="font-size:13px">${esc(c.type === 'professionnel' ? 'Professionnel' : 'Particulier')}</span></div></div>
          <div class="kv" style="margin-top:8px"><span>Adresse</span><b>${esc(c.address)}, ${esc(c.zip)} ${esc(c.city)}</b></div>
          <div class="kv"><span>Email</span><b>${esc(c.email)}</b></div>
          <div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div>
        </div></div>
      </div>
      <div style="display:grid;gap:14px">
        <div class="sum-card"><div class="hd"><h3>Détails de la facturation</h3>${statusBadge(res.status)}</div><div class="bd">${billingHTML(res)}</div></div>
        ${cancelled ? '' : `<div class="doc-row" style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" data-ics>${icon('cal')}Ajouter à mon agenda</button>
          <button class="btn btn-ghost btn-sm" data-bon>${icon('file')}Bon de réservation</button>
          ${canCancel ? `<button class="btn btn-danger btn-sm" data-cancel>${icon('x')}Annuler</button>` : ''}
        </div>`}
        <p class="muted" style="font-size:13px">Une question ? Appelez-nous au <a class="link" href="tel:${esc(s.phone.replace(/\s/g, ''))}">${esc(s.phone)}</a>.</p>
      </div>
    </div>
  </div>
  ${waiting ? `<div class="sticky-cta"><div class="in"><div class="tot"><small>Reste à payer</small><b>${eur(balance(res), true)}</b></div><a class="btn btn-primary btn-lg" href="/paiement/${esc(res.id)}">${icon('lock')}Payer la location</a></div></div>` : ''}`;
  return publicPage(html, { footer: !waiting });
}
function mountReservation(id) {
  const res = byId(db.reservations, id);
  if (!res) return;
  let cel = null;
  try { cel = sessionStorage.getItem('prisma-celebrate'); if (cel === id) sessionStorage.removeItem('prisma-celebrate'); } catch (e) { /* navigation privée */ }
  if (cel === id) { const ck = $('.ck.ok'); const r = ck ? ck.getBoundingClientRect() : null; setTimeout(() => celebrate(r ? r.left + r.width / 2 : undefined, r ? r.top + r.height / 2 : undefined), 350); }
  const b1 = $('[data-ics]'); if (b1) b1.onclick = () => downloadICS(res);
  const b2 = $('[data-bon]'); if (b2) b2.onclick = () => openDocument(res, 'bon');
  const b3 = $('[data-cancel]');
  if (b3) b3.onclick = () => {
    const free = parse(res.from) - new Date() > db.settings.freeCancelHours * 3600000;
    const p = paid(res);
    const fee = free ? 0 : round2(res.quote.base * 0.5);
    const refund = round2(p - fee);
    confirmBox('Annuler la réservation', free ? `L’annulation est gratuite : ${p ? `vous serez remboursé de ${eur(p, true)} sous quelques jours.` : 'rien ne vous sera facturé.'}` : `Le départ est dans moins de ${db.settings.freeCancelHours} heures : 50 % du prix de la location reste dû. ${p ? `Remboursement : ${eur(Math.max(0, refund), true)}.` : ''}`, 'Confirmer l’annulation', () => {
      res.status = 'annulee';
      res.cancelFee = fee;
      res.cancelledAt = toISO(new Date());
      if (refund > 0) res.payments.push({ id: uid('p'), amount: -refund, method: 'Remboursement', at: toISO(new Date()) });
      save(); toast(fee ? `Réservation annulée. Frais d’annulation : ${eur(fee, true)}.` : 'Réservation annulée, sans frais.', 'ok'); rerender();
    }, true);
  };
}
function pagePayment(id) {
  const res = byId(db.reservations, id);
  if (!res) return publicPage(`<div class="wrap empty">Réservation introuvable.</div>`);
  if (balance(res) <= 0) { setTimeout(() => go('/reservation/' + id), 0); return publicPage(''); }
  const amount = balance(res);
  const s = db.settings;
  const multi = amount >= s.installmentsMin;
  const pro = customer(res.customerId)?.type === 'professionnel';
  const m = (key, title, sub, logos = '') => `<button type="button" class="pay-m ${key === 'carte' ? 'on' : ''}" data-m="${key}"><span class="rd"></span><span><b>${title}</b><small>${sub}</small></span>${logos}</button>`;
  const html = `<div class="book-top"><div class="wrap"><div class="stepper" style="margin-left:0">${['Véhicule', 'Options', 'Coordonnées', 'Paiement'].map((x, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i === 3 ? 'on' : 'done'}"><i>${i === 3 ? 4 : '✓'}</i><span>${x}</span></span>`).join('')}</div></div></div>
  <div class="wrap" style="max-width:560px;padding-top:28px;padding-bottom:60px">
    <div style="text-align:center"><span class="eyebrow">Paiement sécurisé</span><p class="muted" style="margin-top:14px">Payer ${esc(s.brand)}</p><p style="font-size:38px;font-weight:600;letter-spacing:-.01em;margin-top:4px" class="num">${eur(amount, true)}</p><p class="muted" style="font-size:13px">Réservation ${esc(res.number)}${pro ? ` · soit ${eur(ht(amount), true)} HT, TVA ${eur(round2(amount - ht(amount)), true)}` : ''}</p></div>
    <div class="alert info" style="margin-top:20px">${icon('info')}<span><b style="color:var(--text)">Démonstration :</b> aucun paiement réel et aucun numéro de carte demandé. En production, le paiement passe par Stripe : carte bancaire, Apple Pay, Google Pay et paiement en plusieurs fois.</span></div>
    <div class="pay-methods" style="margin-top:16px">
      ${m('carte', 'Carte bancaire', 'Débit immédiat, 3D Secure', '<span class="logos"><i>CB</i><i>VISA</i><i>MC</i><i>AMEX</i></span>')}
      ${m('wallet', 'Apple Pay ou Google Pay', 'Validation sur votre téléphone')}
      ${multi ? m('3x', 'Payer en 3 fois', `3 × ${eur(round2(amount / 3), true)}, sans frais`) : ''}
      ${multi ? m('4x', 'Payer en 4 fois', `4 × ${eur(round2(amount / 4), true)}, sans frais`) : ''}
      ${pro ? m('virement', 'Virement bancaire', 'Réservé aux professionnels : facture envoyée par email, à régler avant le départ') : ''}
    </div>
    ${pro ? `<div class="pay-transfer" data-transfer hidden>Vous recevez la facture et notre RIB par email. Indiquez la référence <b>${esc(res.number)}</b> dans le libellé du virement. Le véhicule est bloqué pour vous et vous est remis dès réception du virement.</div>` : ''}
    <p class="muted" style="font-size:13px;margin-top:14px">${icon('shield').replace('<svg ', '<svg style="width:15px;height:15px;display:inline;vertical-align:-3px;margin-right:5px;color:var(--gold)" ')}La caution de ${eur(res.quote.deposit)} sera prise par empreinte bancaire au départ du véhicule : elle n’est pas débitée.</p>
    <button class="btn btn-primary btn-lg btn-block" style="margin-top:18px" data-pay>${icon('lock')}Payer ${eur(amount, true)}</button>
    <p style="text-align:center;margin-top:12px"><a class="link" href="/reservation/${esc(res.id)}">Retour au récapitulatif</a></p>
  </div>`;
  return publicPage(html, { footer: false });
}
function mountPayment(id) {
  const res = byId(db.reservations, id);
  let method = 'carte';
  const btn = $('[data-pay]');
  const payLabel = btn ? btn.innerHTML : '';
  $$('[data-m]').forEach((b) => (b.onclick = () => {
    method = b.dataset.m;
    $$('[data-m]').forEach((x) => x.classList.toggle('on', x === b));
    const tr = $('[data-transfer]');
    if (tr) tr.hidden = method !== 'virement';
    if (btn) btn.innerHTML = method === 'virement' ? `${icon('file')}Recevoir la facture et le RIB` : payLabel;
  }));
  if (btn) btn.onclick = () => {
    if (method === 'virement') {
      res.transfer = { at: toISO(new Date()) };
      save();
      toast(`Facture et RIB envoyés à ${customer(res.customerId)?.email || 'votre adresse'}. Le véhicule vous est réservé.`, 'ok');
      go('/reservation/' + res.id);
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Paiement en cours…';
    setTimeout(() => {
      const label = { carte: 'Carte bancaire', wallet: 'Apple Pay', '3x': 'Paiement en 3 fois', '4x': 'Paiement en 4 fois' }[method];
      res.payments.push({ id: uid('p'), amount: balance(res), method: label, at: toISO(new Date()) });
      if (res.status === 'attente_paiement') res.status = 'confirmee';
      save();
      try { sessionStorage.setItem('prisma-celebrate', res.id); } catch (e) { /* navigation privée */ }
      toast('Paiement accepté. Votre réservation est confirmée.', 'ok');
      go('/reservation/' + res.id);
    }, 1400);
  };
}

/* ---------- Espace client ---------- */
function pageAccount() {
  const sess = session();
  const c = sess && customer(sess.customerId);
  if (!c) {
    const html = `<div class="wrap" style="max-width:520px;padding-top:44px;padding-bottom:60px">
      <span class="eyebrow">Espace client</span><h1 class="page-title" style="margin-top:12px">Vos locations, vos documents</h1>
      <p class="muted" style="margin-top:10px">Suivez vos réservations, téléchargez vos bons et vos factures, annulez sans appeler.</p>
      <div class="card card-pad" style="margin-top:20px"><button class="btn btn-primary btn-block" data-login>Se connecter</button></div>
    </div>`;
    return publicPage(html);
  }
  const list = db.reservations.filter((r) => r.customerId === c.id).sort((a, b) => (a.from < b.from ? 1 : -1));
  const now = new Date();
  const up = list.filter((r) => parse(r.to) >= now && r.status !== 'annulee' && r.status !== 'terminee');
  const past = list.filter((r) => !up.includes(r));
  const row = (r) => { const v = vehicle(r.vehicleId); return `<a class="list-row" href="/reservation/${esc(r.id)}" style="text-decoration:none">${vehicleThumb(v)}<div><div class="t">${esc(v.name)}</div><div class="s">${esc(fmtD(r.from))} au ${esc(fmtD(r.to))} · ${esc(r.number)}</div></div><div class="r">${statusBadge(r.status)}${icon('chevR').replace('<svg ', '<svg style="width:18px;height:18px;color:var(--faint)" ')}</div></a>`; };
  const html = `<div class="wrap" style="max-width:880px;padding-top:36px;padding-bottom:60px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap"><div><span class="eyebrow">Espace client</span><h1 class="page-title" style="margin-top:12px">Bonjour ${esc(c.firstName)}</h1></div><div style="display:flex;gap:8px"><a class="btn btn-primary" href="/vehicules">${icon('plus')}Nouvelle location</a><button class="btn btn-ghost" data-logout>Se déconnecter</button></div></div>
    <div class="panel" style="margin-top:22px"><div class="p-hd"><h2>À venir et en cours</h2></div><div class="p-bd">${up.length ? up.map(row).join('') : '<p class="muted">Aucune location à venir.</p>'}</div></div>
    <div class="panel" style="margin-top:14px"><div class="p-hd"><h2>Historique</h2></div><div class="p-bd">${past.length ? past.map(row).join('') : '<p class="muted">Pas encore d’historique.</p>'}</div></div>
    <div class="panel" style="margin-top:14px"><div class="p-hd"><h2>Mes informations</h2></div><div class="p-bd">
      <div class="kv"><span>Nom</span><b>${esc(custName(c))}</b></div><div class="kv"><span>Email</span><b>${esc(c.email)}</b></div><div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div><div class="kv"><span>Permis</span><b>${esc(licText(c))}</b></div>
    </div></div>
  </div>`;
  return publicPage(html);
}
function mountAccount() {
  const l = $('[data-login]'); if (l) l.onclick = () => openLogin(() => rerender());
  const o = $('[data-logout]'); if (o) o.onclick = () => { setSession(null); rerender(); };
}

/* ---------- Agences ---------- */
function pageAgencies() {
  const c = SEO_BY_PATH['/agences'] || {};
  const html = `<div class="wrap cat-page">
    <div class="cat-head"><div><h1 class="cat-title">${esc(c.h1 || 'Agences et horaires')}</h1><p>${esc(c.lead || 'Retirez votre véhicule à l’agence d’Yvrac, en gare, à l’aéroport, ou faites-le livrer chez vous dans toute la métropole bordelaise.')}</p></div><nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Agences</b></nav></div>
    <div class="conds"><b>Horaires d’ouverture</b><span>${esc(weekHoursText())}</span><span>Remise et restitution sur rendez-vous pendant ces horaires, y compris en gare, à l’aéroport et à domicile.</span></div>
    <div class="places" data-stagger>${db.agencies.map((a) => placeCard(a, 'h2')).join('')}</div>
    ${agenciesSeoHTML()}
  </div>${ctaBandHTML()}`;
  return publicPage(html, { active: 'agences' });
}
function mountAgencies() {
  mountPlaces();
  mountSeo();
}

/* ---------- Contact ---------- */
function mapArt() {
  return `<svg class="map-svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1200" height="380" fill="#0f1012"/>
    <path d="M-20 300 C180 250 260 330 430 290 S720 170 880 210 S1110 330 1230 280" fill="none" stroke="#1d2a33" stroke-width="46"/>
    <g fill="none" stroke="#24262b" stroke-linecap="round">
      <path d="M-10 120 L1210 60" stroke-width="16"/><path d="M60 -10 L240 390" stroke-width="12"/><path d="M520 -10 C540 120 600 220 560 390" stroke-width="18"/>
      <path d="M-10 210 C300 190 520 150 1210 170" stroke-width="10"/><path d="M820 -10 L760 390" stroke-width="10"/><path d="M1000 -10 C1030 150 980 260 1080 390" stroke-width="12"/>
    </g>
    <g fill="none" stroke="#1a1b1f" stroke-width="5">
      <path d="M140 0 L180 380M320 0 L300 380M420 0 L470 380M680 0 L650 380M920 0 L900 380M1100 0 L1150 380M0 40 L1200 20M0 170 L1200 120M0 250 L1200 240M0 340 L1200 330"/>
    </g>
    <g fill="#16171a"><rect x="190" y="40" width="90" height="60" rx="6"/><rect x="330" y="140" width="120" height="50" rx="6"/><rect x="640" y="60" width="100" height="70" rx="6"/><rect x="860" y="250" width="110" height="60" rx="6"/><rect x="1040" y="90" width="90" height="50" rx="6"/></g>
    <circle cx="600" cy="176" r="120" fill="url(#mapGlow)"/>
    <defs><radialGradient id="mapGlow"><stop offset="0" stop-color="#d9b878" stop-opacity=".18"/><stop offset="1" stop-color="#d9b878" stop-opacity="0"/></radialGradient></defs>
  </svg>`;
}
function pageContact() {
  const s = db.settings;
  const q = encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`);
  const html = `<div class="map-band">${mapArt()}<div class="map-pin"><span class="mp-dot" aria-hidden="true"></span><div class="mp-card"><b>${esc(s.brand)}</b><span>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</span><a class="link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Itinéraire</a></div></div></div>
  <div class="wrap contact-grid">
    <div class="ct-info">
      <h1 class="cat-title">Contact</h1>
      <p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p>
      <a class="ct-phone" href="${telHref()}">${esc(s.phone)}</a>
      ${s.email ? `<a class="ct-mail" href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : ''}
      <p class="muted">${esc(weekHoursText())}</p>
      <div class="ct-social"><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a><a href="${telHref()}" aria-label="Appeler">${icon('phone')}</a><a href="/agences" aria-label="Agences">${icon('pin')}</a></div>
    </div>
    <form class="ct-form" data-contact novalidate>
      <h2>Formulaire de contact</h2>
      <div class="grid2">
        <label class="field" data-f="firstName"><span class="lbl">Prénom <span class="req">*</span></span><input class="input" name="firstName" autocomplete="given-name"><span class="msg">Champ obligatoire.</span></label>
        <label class="field" data-f="lastName"><span class="lbl">Nom <span class="req">*</span></span><input class="input" name="lastName" autocomplete="family-name"><span class="msg">Champ obligatoire.</span></label>
      </div>
      <div class="grid2">
        <label class="field" data-f="email"><span class="lbl">Email <span class="req">*</span></span><input class="input" name="email" type="email" autocomplete="email" inputmode="email"><span class="msg">Adresse email invalide.</span></label>
        <label class="field" data-f="phone"><span class="lbl">Téléphone</span><input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
      </div>
      <label class="field"><span class="lbl">Objet</span><select class="select" name="subject"><option>Réservation</option><option>Devis professionnel</option><option>Location longue durée</option><option>Dépôt-vente ou rachat de mon véhicule</option><option>Achat d’un véhicule</option><option>Autre demande</option></select></label>
      <label class="field" data-f="message"><span class="lbl">Message <span class="req">*</span></span><textarea class="textarea" name="message" placeholder="Dates, véhicule souhaité, nombre de jours…"></textarea><span class="msg">Écrivez votre message.</span></label>
      <button class="btn btn-primary" type="submit">Envoyer</button>
    </form>
  </div>
  <div class="wrap seo-body contact-more">
    <div class="seo-article cols">
      <section class="seo-sec"><h2>Nous trouver</h2><p>L’agence ${esc(s.brand === 'PRISMA AUTOMOBILES' ? 'PRISMA Automobiles' : s.brand)} vous accueille au ${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}, à environ 15 minutes de Bordeaux par la rocade, avec un parking gratuit.</p><p>Horaires d’ouverture : ${esc(weekHoursText())}. Vous pouvez aussi récupérer votre véhicule à la gare Saint-Jean, à l’aéroport de Bordeaux-Mérignac ou le faire livrer à votre adresse : retrouvez tous nos <a href="/agences">points de retrait</a>.</p></section>
      <section class="seo-sec"><h2>Réserver ou demander un devis</h2><p>La réservation en ligne est ouverte 24 h sur 24 et la confirmation arrive immédiatement par email. Vous préférez parler à quelqu’un ? Appelez le ${esc(s.phone)} ou écrivez-nous sur WhatsApp au même numéro.</p><p>Professionnels : pour plusieurs véhicules ou une longue durée, nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à ${Math.max(...s.degressive.map((d) => d.pct))} %. Découvrez <a href="/professionnels">l’offre professionnels</a>.</p></section>
    </div>
    ${relatedHTML(['/agences', '/faq', '/conditions-de-location', '/location-voiture-yvrac'], 'Pour préparer votre location')}
  </div>`;
  return publicPage(html, { active: 'contact' });
}
function mountContact() {
  mountSeo();
  const f = $('[data-contact]');
  if (!f) return;
  f.onsubmit = (e) => {
    e.preventDefault();
    const g = (n) => f[n].value.trim();
    const errs = [];
    for (const k of ['firstName', 'lastName', 'message']) if (!g(k)) errs.push(k);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) errs.push('email');
    $$('[data-f]', f).forEach((el) => el.classList.toggle('err', errs.includes(el.dataset.f)));
    if (errs.length) { toast('Vérifiez les champs signalés.', 'warn'); $(`[data-f="${errs[0]}"] .input, [data-f="${errs[0]}"] .textarea`, f)?.focus(); return; }
    if (!db.messages) db.messages = [];
    db.messages.unshift({ id: uid('m'), at: toISO(new Date()), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'), subject: f.subject.value, message: g('message'), done: false });
    save();
    f.reset();
    toast('Message envoyé : nous vous répondons rapidement.', 'ok');
  };
}
/* ---------- Professionnels ---------- */
function pagePro() {
  ensureDraft();
  if (!draft.pro) { draft.pro = true; if (draft.customer) draft.customer.type = 'professionnel'; saveDraft(); }
  const fleet = liveFleet();
  const vans = fleet.filter((v) => v.category === 'utilitaire');
  const cars = fleet.filter((v) => v.category === 'voiture');
  const pts = [
    ['euro', 'Tarifs hors taxes', 'Tous les prix sont affichés hors taxes ; la TVA de 20 % se récupère sur les utilitaires loués pour votre activité.'],
    ['file', 'Facture au nom de la société', 'Raison sociale, SIRET et numéro de TVA intracommunautaire sur chaque facture.'],
    ['card', 'Paiement par virement', 'Réglez par carte ou par virement : le véhicule est bloqué pour vous dès la réservation.'],
    ['van', 'Utilitaires jusqu’à 20 m³', 'Du petit fourgon au 20 m³ avec hayon, tous conduits avec le permis B.'],
  ];
  const c = SEO_BY_PATH['/professionnels'] || {};
  const html = `<div class="wrap cat-page">
    <div class="cat-head"><div><h1 class="cat-title">${esc(c.h1 || 'Professionnels')}</h1><p>${esc(c.lead || 'Artisans, entreprises du bâtiment, déménageurs, commerçants, équipes en déplacement : des utilitaires et des voitures récents, avec une gestion pensée pour les entreprises.')}</p></div><nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Professionnels</b></nav></div>
    <div class="pro-grid" data-stagger>${pts.map(([ic, h, p]) => `<div class="pro-i"><div class="pl-ic">${icon(ic)}</div><h2>${esc(h)}</h2><p>${esc(p)}</p></div>`).join('')}</div>
    <div class="sec-row"><h2>Nos utilitaires</h2><a class="more-link" href="/vehicules/utilitaire">Réserver un utilitaire <i>${icon('plus')}</i></a></div>
    <div class="rgrid" data-stagger>${vans.map((v) => rcard(v)).join('')}</div>
    <div class="sec-row"><h2>Voitures pour vos déplacements</h2><a class="more-link" href="/vehicules/voiture">Réserver une voiture <i>${icon('plus')}</i></a></div>
    <div class="rgrid" data-stagger>${cars.map((v) => rcard(v)).join('')}</div>
    <div class="pro-cta"><div><h3>Plusieurs véhicules ou une longue durée ?</h3><p>Nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à ${Math.max(...db.settings.degressive.map((d) => d.pct))} %.</p></div><div class="pro-cta-b"><a class="btn btn-primary" href="/contact">Demander un devis</a><a class="btn btn-wa" href="${waHref('Bonjour, je souhaite un devis professionnel.')}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div></div>
    ${c.sections ? `<div class="seo-body"><article class="seo-article">${tocHTML(c.sections)}${sectionsHTML(c.sections)}</article>${faqHTML(c.faq)}${relatedHTML(c.related)}</div>` : ''}
  </div>`;
  return publicPage(html, { active: 'pro' });
}

/* ---------- Documents : CGV, mentions, crédits, bon, contrat, facture ---------- */
function openInfoDoc(kind) {
  const s = db.settings;
  if (kind === 'cgv') openModal({ title: 'Conditions générales de location', wide: true, body: `<div style="white-space:pre-line;color:var(--text-2)">${esc(s.cgv)}</div>` });
  if (kind === 'mentions') openModal({ title: 'Mentions légales', body: `<div style="display:grid;gap:8px;color:var(--text-2)"><p><b style="color:var(--text)">${esc(s.legalName)}</b>, ${esc(s.legalForm)}</p><p>Siège social : ${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p>${esc(s.siren)} ${esc(s.rcs)}</p><p>Téléphone : ${esc(s.phone)}${s.email ? ` · ${esc(s.email)}` : ''}</p><p>Nom commercial et logo : ${esc(s.brand)}.</p></div>` });
  if (kind === 'credits') {
    const extra = ['hero', 'cat-voitures', 'cat-utilitaires'].map((k) => PHOTOS[k]?.credit).filter(Boolean);
    const sales = typeof SALE_PHOTOS === 'object' ? liveSales().filter((x) => !x.photo && SALE_PHOTOS[x.id] && SALE_PHOTOS[x.id].credit).map((x) => SALE_PHOTOS[x.id].credit) : [];
    const list = db.vehicles.map(creditOf).filter(Boolean).concat(extra, sales);
    const rows = list.map((c) => `<div class="list-row"><div><div class="t">${esc(c.title || 'Photo')}</div><div class="s">${esc(c.author || 'Auteur indiqué sur la page source')}${c.license ? ` · ${esc(c.license)}` : ''}${c.source ? ` · <a class="link" href="${esc(c.source)}" target="_blank" rel="noopener">source</a>` : ''}</div></div></div>`).join('');
    openModal({ title: 'Crédits photos', body: `<p class="muted">Photos libres de droits utilisées pour la démonstration, sous licence Creative Commons ou équivalente. Elles ont été recadrées, détourées et leurs plaques floutées, et seront remplacées par les photos de la flotte.</p><div style="margin-top:10px">${rows || '<p class="muted">Toutes les photos appartiennent au loueur.</p>'}</div>` });
  }
}
function downloadICS(res) {
  const v = vehicle(res.vehicleId);
  const a = agency(res.agencyStart);
  const f = (s) => s.replace(/[-:]/g, '') + '00';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PRISMA//Location//FR', 'BEGIN:VEVENT', `UID:${res.id}@prisma`, `DTSTAMP:${f(toISO(new Date()))}`, `DTSTART:${f(res.from)}`, `DTEND:${f(res.to)}`, `SUMMARY:Location ${v.name} (${res.number})`, `LOCATION:${a.name}, ${a.address}`, `DESCRIPTION:Départ ${a.name}. Pensez au permis, à une pièce d'identité et à une carte bancaire pour la caution.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  downloadFile(`${res.number}.ics`, ics, 'text/calendar');
}
function docHead(title, res) {
  const s = db.settings;
  return `<div class="dochead"><div style="display:flex;gap:12px;align-items:center"><img src="${ASSETS.doc}" alt=""><div><b style="font-size:15px">${esc(s.brand)}</b><br><span class="muted">${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}<br>${esc(s.phone)}${s.email ? ' · ' + esc(s.email) : ''}</span></div></div><div style="text-align:right"><h2>${esc(title)}</h2><span class="muted">N° ${esc(res.number)}<br>Émis le ${esc(fmtD(new Date()))}</span></div></div>`;
}
function openDocument(res, kind) {
  const s = db.settings;
  const v = vehicle(res.vehicleId);
  const c = customer(res.customerId);
  const q = res.quote;
  const lines = resLines(res);
  const total = totalDue(res);
  const ht = round2(total / (1 + s.vat / 100));
  const title = { bon: 'Bon de réservation', contrat: 'Contrat de location', facture: 'Facture' }[kind];
  const table = `<table><thead><tr><th>Désignation</th><th style="text-align:right">Montant TTC</th></tr></thead><tbody>${lines.map((l) => `<tr><td>${esc(l.label)}</td><td style="text-align:right">${l.amount < 0 ? '− ' + eur(-l.amount, true) : eur(l.amount, true)}</td></tr>`).join('')}
    <tr><td style="text-align:right">Total HT</td><td style="text-align:right">${eur(ht, true)}</td></tr><tr><td style="text-align:right">TVA ${s.vat} %</td><td style="text-align:right">${eur(round2(total - ht), true)}</td></tr><tr><td style="text-align:right"><b>Total TTC</b></td><td style="text-align:right"><b>${eur(total, true)}</b></td></tr><tr><td style="text-align:right">Réglé</td><td style="text-align:right">${eur(paid(res), true)}</td></tr></tbody></table>`;
  const body = `<div class="print-area"><div class="doc">${docHead(title, res)}
    <table><tbody>
      <tr><th>Client</th><td>${esc(custName(c))}<br>${esc(c.address)}, ${esc(c.zip)} ${esc(c.city)}<br>${esc(c.email)} · ${esc(c.phone)}${c.siret ? `<br>SIRET ${esc(c.siret)}` : ''}${c.vatNum ? ` · N° TVA ${esc(c.vatNum)}` : ''}</td></tr>
      <tr><th>Véhicule</th><td>${esc(v.name)}${v.similar ? ' ou similaire' : ''}${kind !== 'bon' ? ` · ${esc(v.plate)}` : ''}</td></tr>
      <tr><th>Départ</th><td>${esc(fmtDT(res.from))} · ${esc(agency(res.agencyStart).name)}</td></tr>
      <tr><th>Retour</th><td>${esc(fmtDT(res.to))} · ${esc(agency(res.agencyEnd).name)}</td></tr>
      <tr><th>Conducteur</th><td>Permis ${esc(licText(c))}</td></tr>
      <tr><th>Conditions</th><td>Caution ${eur(q.deposit)} · franchise ${eur(q.franchise)} · ${q.kmIncluded == null ? 'kilométrage illimité' : `${q.kmIncluded} km inclus puis ${eur(v.extraKm, true)} par km`}</td></tr>
      ${kind === 'contrat' && res.checkout ? `<tr><th>État au départ</th><td>${res.checkout.km.toLocaleString('fr-FR')} km · carburant ${res.checkout.fuel}/8${res.checkout.notes ? ' · ' + esc(res.checkout.notes) : ''}</td></tr>` : ''}
      ${res.checkin ? `<tr><th>État au retour</th><td>${res.checkin.km.toLocaleString('fr-FR')} km · carburant ${res.checkin.fuel}/8${res.checkin.notes ? ' · ' + esc(res.checkin.notes) : ''}</td></tr>` : ''}
    </tbody></table>
    ${table}
    ${kind === 'contrat' ? `<p class="muted" style="margin-top:12px;font-size:12px;white-space:pre-line">${esc(s.cgv)}</p><div class="sig"><div>Signature du loueur</div><div>Signature du client, précédée de « Lu et approuvé »</div></div>` : ''}
    ${kind === 'facture' ? `<p class="muted" style="margin-top:12px;font-size:12px">${esc(s.legalName)}, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}. ${balance(res) <= 0 ? (paid(res) > 0 ? 'Paiement reçu, facture acquittée.' : 'Aucune somme due.') : `Reste à payer : ${eur(balance(res), true)}, à régler avant le départ du véhicule.`} Pénalités de retard : trois fois le taux d’intérêt légal. Indemnité forfaitaire pour frais de recouvrement : 40 €.</p>` : ''}
  </div></div>`;
  openModal({ title, wide: true, body, foot: `<button class="btn btn-ghost" data-close>Fermer</button><button class="btn btn-primary" data-print>${icon('print')}Imprimer ou enregistrer en PDF</button>`, onMount: (m) => { $('[data-print]', m).onclick = () => window.print(); } });
}

/* Contenu SEO : achat, vente et dépôt-vente de véhicules (pages « service » et guide des démarches).
   Faits : PRISMA Automobiles achète et vend des véhicules neufs et d’occasion (objet social) et propose le
   dépôt-vente. Aucun chiffre commercial n’est avancé (rémunération, durée, délais) : ils figurent dans le
   contrat remis au client. Les règles de vente citées sont celles en vigueur en France. */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/achat-vente-voiture-bordeaux',
    kind: 'service',
    title: 'Achat, vente et dépôt-vente de voiture à Bordeaux | PRISMA',
    description: 'Achat, vente et dépôt-vente de voitures à Bordeaux : PRISMA Automobiles rachète votre véhicule, le vend pour vous ou vous aide à trouver le vôtre.',
    h1: 'Achat, vente et dépôt-vente de voitures à Bordeaux',
    eyebrow: 'Achat et vente',
    lead: 'Au-delà de la location, PRISMA Automobiles achète et vend des véhicules neufs et d’occasion, et propose le dépôt-vente. Vous voulez vendre votre voiture sans vous occuper des annonces, la céder directement à un professionnel ou trouver votre prochain véhicule ? Notre agence d’Yvrac, à environ 15 minutes de Bordeaux, vous accompagne.',
    facts: ['Achat et vente de véhicules neufs et d’occasion', 'Dépôt-vente : nous vendons votre voiture pour vous', 'Agence d’Yvrac, à environ 15 minutes de Bordeaux'],
    heroVehicle: 'v-glc',
    service: 'depot',
    vehicles: [],
    sections: [
      { h2: 'Achat, vente, dépôt-vente : trois façons de faire avec nous', html:
        '<ul><li><strong>Le dépôt-vente</strong> : vous nous confiez votre voiture, nous la présentons aux acheteurs et nous vous accompagnons jusqu’aux papiers de la vente. Vous restez propriétaire jusqu’au jour de la vente. Tout est expliqué sur la page <a href="/depot-vente-voiture-bordeaux">dépôt-vente de voiture</a>.</li>' +
        '<li><strong>Le rachat</strong> : vous vendez votre véhicule directement à PRISMA Automobiles, sans annonce ni visite. Nous l’examinons à l’agence et nous vous faisons une proposition. Voir le <a href="/rachat-voiture-bordeaux">rachat de voiture</a>.</li>' +
        '<li><strong>L’achat d’un véhicule</strong> : vous cherchez une voiture neuve ou d’occasion ? Dites-nous le modèle, le budget et l’usage prévus, nous vous présentons les véhicules disponibles.</li></ul>' },
      { h2: 'Vendre sa voiture à Bordeaux : dépôt-vente ou rachat ?', html:
        '<p>Les deux solutions vous évitent les annonces, les appels et les visites d’inconnus. Elles ne répondent pourtant pas au même besoin.</p>' +
        '<ul><li><strong>Le dépôt-vente</strong> vise le prix d’une vente à un particulier : le prix de vente est fixé ensemble, et la vente se fait quand un acheteur se présente. C’est la bonne solution si vous n’êtes pas pressé.</li>' +
        '<li><strong>Le rachat</strong> est la solution la plus simple : un seul interlocuteur, une proposition après examen du véhicule, puis les papiers. Le prix tient compte de la remise en état et de la revente du véhicule.</li></ul>' +
        '<p>Vous hésitez ? Présentez-nous votre voiture : nous vous expliquons ce que chaque formule peut vous apporter pour votre véhicule.</p>' },
      { h2: 'Acheter un véhicule neuf ou d’occasion', html:
        '<p>Pour vous proposer le bon véhicule, nous partons de votre besoin :</p>' +
        '<ul><li>le type de véhicule : citadine, berline, SUV, voiture 7 places, utilitaire ;</li><li>la boîte de vitesses et l’énergie : manuelle ou automatique, essence, diesel, hybride ou électrique ;</li><li>votre budget et le kilométrage souhaité ;</li><li>l’usage : trajets en ville, longs trajets, famille, activité professionnelle.</li></ul>' +
        '<p>Chaque véhicule vous est présenté avec ses documents. Pour un véhicule de plus de 4 ans, le contrôle technique remis à l’acheteur doit dater de moins de 6 mois : c’est la règle pour toute vente à un particulier.</p>' },
      { h2: 'Essayer un modèle en location avant de l’acheter', html:
        '<p>Un doute entre deux modèles ? Notre flotte de location vous permet de vivre avec une voiture quelques jours avant de décider : la <a href="/vehicule/tesla-model-3">Tesla Model 3</a> pour découvrir l’électrique, le <a href="/vehicule/peugeot-5008-7-places">Peugeot 5008 7 places</a> pour une famille nombreuse, ou la Peugeot 208 automatique pour tester la boîte automatique en ville.</p>' +
        '<p>Un week-end suffit souvent pour savoir si un modèle vous convient vraiment : autonomie, place à bord, confort sur la rocade et dans les rues de Bordeaux.</p>' },
      { h2: 'Les démarches, simplement', html:
        '<p>Vendre un véhicule en France demande quelques documents précis :</p>' +
        '<ul><li>le certificat d’immatriculation (carte grise) au nom du vendeur ;</li><li>un contrôle technique de moins de 6 mois pour un véhicule de plus de 4 ans vendu à un particulier ;</li><li>un certificat de situation administrative de moins de 15 jours (anciennement « certificat de non-gage ») ;</li><li>le certificat de cession (formulaire Cerfa n° 15776), signé par le vendeur et l’acheteur.</li></ul>' +
        '<p>Après la vente, la cession se déclare en ligne sur le site de l’ANTS dans les 15 jours. Notre guide <a href="/guides/vendre-sa-voiture-demarches">vendre sa voiture : les démarches</a> détaille chaque étape.</p>' },
      { h2: 'Nous rencontrer à l’agence d’Yvrac', html:
        '<p>L’agence PRISMA Automobiles se trouve au 72 bis avenue des Tabernottes, à Yvrac, sur la rive droite, à environ 15 minutes de Bordeaux par la rocade, avec un parking gratuit. Elle est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.</p>' +
        '<p>Pour préparer votre visite, envoyez-nous les informations de votre véhicule avec le formulaire ci-dessous, ou appelez le 07 49 58 81 44, aussi joignable sur WhatsApp.</p>' },
    ],
    faq: [
      { q: 'Proposez-vous le dépôt-vente de voiture ?', a: 'Oui. Vous nous confiez votre véhicule, nous le présentons aux acheteurs et nous vous accompagnons jusqu’aux papiers de la vente. Les conditions sont fixées dans un contrat de dépôt-vente.' },
      { q: 'Rachetez-vous les voitures des particuliers ?', a: 'Oui, PRISMA Automobiles peut racheter votre véhicule. Nous l’examinons à l’agence d’Yvrac, puis nous vous faisons une proposition.' },
      { q: 'Vendez-vous des voitures neuves et d’occasion ?', a: 'Oui. Indiquez-nous le modèle, le budget et l’usage prévus : nous vous présentons les véhicules disponibles.' },
      { q: 'Quels documents préparer pour vendre ma voiture ?', a: 'La carte grise à votre nom, un contrôle technique de moins de 6 mois si le véhicule a plus de 4 ans, un certificat de situation administrative de moins de 15 jours et, si possible, le carnet d’entretien et les factures.' },
      { q: 'Puis-je essayer un modèle avant de l’acheter ?', a: 'Vous pouvez le louer quelques jours : notre flotte compte notamment une Tesla Model 3, un Peugeot 5008 7 places et une Peugeot 208 automatique.' },
      { q: 'Où se trouve l’agence ?', a: 'Au 72 bis avenue des Tabernottes, 33370 Yvrac, à environ 15 minutes de Bordeaux. Ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.' },
    ],
    related: ['/depot-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches', '/location-voiture-bordeaux', '/contact'],
  },
  {
    path: '/depot-vente-voiture-bordeaux',
    kind: 'service',
    title: 'Dépôt-vente de voiture à Bordeaux et Yvrac | PRISMA',
    description: 'Dépôt-vente de voiture à Bordeaux : confiez votre véhicule à PRISMA Automobiles, qui le présente aux acheteurs et vous accompagne jusqu’à la vente.',
    h1: 'Dépôt-vente de voiture à Bordeaux',
    eyebrow: 'Dépôt-vente',
    lead: 'Le dépôt-vente de voiture vous permet de vendre votre véhicule sans gérer vous-même les annonces, les appels et les visites. Vous le confiez à PRISMA Automobiles, dans notre agence d’Yvrac près de Bordeaux : nous le présentons aux acheteurs et nous vous accompagnons jusqu’aux papiers de la vente.',
    facts: ['Vous restez propriétaire jusqu’à la vente', 'Un prix de vente fixé ensemble', 'Agence d’Yvrac, à environ 15 minutes de Bordeaux'],
    heroVehicle: 'v-5008',
    service: 'depot',
    vehicles: [],
    sections: [
      { h2: 'Le dépôt-vente de voiture, comment ça marche ?', html:
        '<ol><li><strong>Votre demande</strong> : envoyez-nous la marque, le modèle, l’année et le kilométrage de votre véhicule avec le formulaire de cette page, ou appelez-nous.</li>' +
        '<li><strong>Le rendez-vous</strong> : vous présentez la voiture et ses documents à l’agence d’Yvrac. Nous l’examinons avec vous.</li>' +
        '<li><strong>Le contrat</strong> : le prix de vente, la durée du dépôt et notre rémunération sont fixés par écrit dans un contrat de dépôt-vente, avant tout dépôt.</li>' +
        '<li><strong>La présentation aux acheteurs</strong> : nous répondons aux demandes, organisons les visites et les essais.</li>' +
        '<li><strong>La vente</strong> : nous vous accompagnons pour les documents de cession, puis vous êtes payé selon les modalités prévues au contrat.</li></ol>' },
      { h2: 'Pourquoi confier la vente de votre voiture ?', html:
        '<p>Vendre seul une voiture prend du temps : photos, annonces, appels à toute heure, rendez-vous qui ne viennent pas, essais avec des inconnus, négociation. Avec le dépôt-vente :</p>' +
        '<ul><li>vous n’avez plus à recevoir d’inconnus chez vous ni à confier vos clés pour un essai ;</li><li>votre véhicule est présenté dans une agence, par des professionnels de l’automobile ;</li><li>les acheteurs sérieux sont reçus, les autres filtrés ;</li><li>les documents de la vente sont préparés avec vous.</li></ul>' +
        '<p>Vous restez propriétaire de la voiture jusqu’au jour de la vente.</p>' },
      { h2: 'Ce que précise le contrat de dépôt-vente', html:
        '<p>Tout est écrit avant le dépôt, pour que chacun sache à quoi s’en tenir :</p>' +
        '<ul><li>le prix de vente convenu et la marge de négociation éventuelle ;</li><li>la rémunération du professionnel et la façon dont elle est calculée ;</li><li>la durée du dépôt et les conditions pour reprendre votre véhicule ;</li><li>l’assurance et la garde du véhicule pendant le dépôt ;</li><li>les modalités et le délai de votre paiement après la vente.</li></ul>' +
        '<p>Prenez le temps de le lire avant de signer, et posez-nous toutes vos questions.</p>' },
      { h2: 'Les documents à préparer', html:
        '<ul><li>le certificat d’immatriculation (carte grise) à votre nom ;</li><li>une pièce d’identité ;</li><li>le contrôle technique : pour une vente à un particulier, il doit dater de moins de 6 mois si le véhicule a plus de 4 ans ;</li><li>un certificat de situation administrative de moins de 15 jours, qui s’obtient gratuitement en ligne ;</li><li>le carnet d’entretien, les factures et le double des clés, qui rassurent les acheteurs.</li></ul>' +
        '<p>Le détail de ces documents, et de la déclaration de cession après la vente, est dans notre guide <a href="/guides/vendre-sa-voiture-demarches">vendre sa voiture : les démarches</a>.</p>' },
      { h2: 'Dépôt-vente ou rachat : que choisir ?', html:
        '<p>Le dépôt-vente vise le prix d’une vente à un particulier, mais la vente dépend de l’arrivée d’un acheteur. Si vous préférez une solution plus directe, PRISMA Automobiles peut aussi racheter votre véhicule après l’avoir examiné : c’est le <a href="/rachat-voiture-bordeaux">rachat de voiture</a>.</p>' +
        '<p>Et si vous avez besoin d’un véhicule en attendant la vente ou votre prochaine voiture, pensez à la <a href="/location-voiture-au-mois-bordeaux">location au mois</a> : les tarifs dégressifs vont jusqu’à 30 % dès 28 jours.</p>' },
      { h2: 'Bien préparer sa voiture pour la vente', html:
        '<ul><li><strong>Propreté</strong> : un intérieur et une carrosserie nets donnent tout de suite confiance ;</li><li><strong>Entretien à jour</strong> : réunissez les factures, et faites la vidange si elle arrive à échéance ;</li><li><strong>Petits défauts</strong> : signalez-les franchement, ils seront de toute façon vus lors de l’essai ;</li><li><strong>Documents prêts</strong> : un dossier complet rassure l’acheteur et accélère la vente.</li></ul>' },
    ],
    faq: [
      { q: 'Suis-je toujours propriétaire pendant le dépôt-vente ?', a: 'Oui, vous restez propriétaire de votre véhicule jusqu’au jour de la vente.' },
      { q: 'Qui fixe le prix de vente ?', a: 'Il est fixé ensemble, à partir de l’état du véhicule, de son kilométrage et des prix constatés pour ce modèle, puis inscrit dans le contrat de dépôt-vente.' },
      { q: 'Combien de temps dure un dépôt-vente ?', a: 'La durée du dépôt est fixée dans le contrat, avec les conditions pour reprendre votre véhicule si vous changez d’avis.' },
      { q: 'Faut-il un contrôle technique pour vendre en dépôt-vente ?', a: 'Oui pour une vente à un particulier si le véhicule a plus de 4 ans : le contrôle technique doit dater de moins de 6 mois au moment de la vente.' },
      { q: 'Où déposer ma voiture ?', a: 'À l’agence d’Yvrac, 72 bis avenue des Tabernottes, sur rendez-vous pendant les horaires d’ouverture : du lundi au vendredi de 8 h 30 à 19 h, le samedi de 9 h à 18 h.' },
    ],
    related: ['/achat-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches', '/location-voiture-yvrac', '/contact'],
  },
  {
    path: '/rachat-voiture-bordeaux',
    kind: 'service',
    title: 'Rachat de voiture à Bordeaux, vendez à un pro | PRISMA',
    description: 'Rachat de voiture à Bordeaux : vendez votre véhicule à PRISMA Automobiles, sans annonce ni visite. Examen à l’agence d’Yvrac, puis proposition de prix.',
    h1: 'Rachat de voiture à Bordeaux : vendez votre véhicule à un professionnel',
    eyebrow: 'Rachat',
    lead: 'Vous voulez vendre votre voiture sans passer par les annonces ? PRISMA Automobiles peut la racheter. Vous nous présentez le véhicule à l’agence d’Yvrac, près de Bordeaux, nous l’examinons et nous vous faisons une proposition. Si elle vous convient, nous préparons avec vous les documents de la vente.',
    facts: ['Vente directe à un professionnel', 'Aucune annonce, aucune visite d’inconnus', 'Agence d’Yvrac, à environ 15 minutes de Bordeaux'],
    heroVehicle: 'v-classea',
    service: 'rachat',
    vehicles: [],
    sections: [
      { h2: 'Comment se passe le rachat de votre voiture ?', html:
        '<ol><li><strong>Votre demande</strong> : indiquez la marque, le modèle, l’année et le kilométrage avec le formulaire de cette page, ou appelez le 07 49 58 81 44.</li>' +
        '<li><strong>Le rendez-vous</strong> : vous venez à l’agence d’Yvrac avec le véhicule et ses documents.</li>' +
        '<li><strong>L’examen</strong> : état de la carrosserie et de l’intérieur, essai, entretien et historique.</li>' +
        '<li><strong>La proposition</strong> : nous vous faisons une offre de rachat. Vous êtes libre de l’accepter ou non.</li>' +
        '<li><strong>La vente</strong> : certificat de cession signé, carte grise barrée, puis paiement selon les modalités convenues.</li></ol>' },
      { h2: 'Ce qui compte dans l’estimation de votre voiture', html:
        '<ul><li>l’année, le kilométrage et la motorisation ;</li><li>l’état de la carrosserie, des pneus et de l’intérieur ;</li><li>un entretien suivi, prouvé par le carnet et les factures ;</li><li>l’historique du véhicule : nombre de propriétaires, sinistres éventuels ;</li><li>la demande pour ce modèle au moment de la vente.</li></ul>' +
        '<p>Un dossier complet et une voiture propre facilitent l’examen et vous évitent les mauvaises surprises.</p>' },
      { h2: 'Rachat ou dépôt-vente : que choisir ?', html:
        '<p>Le rachat est la solution la plus directe : un seul interlocuteur, pas d’attente d’un acheteur, pas de visites. Le prix proposé par un professionnel tient compte de la remise en état et de la revente du véhicule.</p>' +
        '<p>Si vous visez plutôt le prix d’une vente à un particulier et que vous n’êtes pas pressé, le <a href="/depot-vente-voiture-bordeaux">dépôt-vente</a> peut vous convenir : nous vendons la voiture pour vous, et vous restez propriétaire jusqu’à la vente.</p>' },
      { h2: 'Les documents à apporter', html:
        '<ul><li>le certificat d’immatriculation (carte grise) à votre nom ;</li><li>une pièce d’identité ;</li><li>un certificat de situation administrative de moins de 15 jours, qui s’obtient gratuitement en ligne ;</li><li>le carnet d’entretien, les factures et le double des clés ;</li><li>le dernier procès-verbal de contrôle technique.</li></ul>' +
        '<p>Le véhicule doit être libre de tout gage ou opposition : c’est ce qu’indique le certificat de situation administrative.</p>' },
      { h2: 'Après la vente : les dernières démarches', html:
        '<p>Une fois la vente conclue, la cession se déclare en ligne sur le site de l’ANTS, dans les 15 jours. Pensez aussi à prévenir votre assureur pour mettre fin au contrat du véhicule vendu.</p>' +
        '<p>Toutes les étapes sont reprises dans notre guide <a href="/guides/vendre-sa-voiture-demarches">vendre sa voiture : les démarches</a>.</p>' },
      { h2: 'Besoin d’un véhicule en attendant le prochain ?', html:
        '<p>Entre la vente de votre voiture et l’arrivée de la suivante, PRISMA Automobiles vous loue un véhicule pour quelques jours ou quelques semaines, de la <a href="/vehicule/renault-clio-v">Renault Clio V</a> à 39 € par jour au SUV 7 places. Pour un mois ou plus, la <a href="/location-voiture-au-mois-bordeaux">location au mois</a> profite de tarifs dégressifs jusqu’à 30 % dès 28 jours.</p>' },
    ],
    faq: [
      { q: 'Rachetez-vous toutes les voitures ?', a: 'Chaque véhicule est étudié. Envoyez-nous ses caractéristiques ou appelez-nous : nous vous disons rapidement si un rendez-vous est utile.' },
      { q: 'Comment est fixé le prix de rachat ?', a: 'Après examen du véhicule à l’agence : année, kilométrage, état, entretien, historique et demande pour ce modèle.' },
      { q: 'Suis-je obligé d’accepter la proposition ?', a: 'Non. La proposition vous est faite après l’examen, et vous êtes libre de la refuser.' },
      { q: 'Quels documents apporter ?', a: 'La carte grise à votre nom, une pièce d’identité, un certificat de situation administrative de moins de 15 jours, le carnet d’entretien, les factures et le double des clés.' },
      { q: 'Puis-je louer une voiture en attendant ma prochaine ?', a: 'Oui, pour quelques jours ou au mois, avec des tarifs dégressifs jusqu’à 30 % dès 28 jours.' },
    ],
    related: ['/depot-vente-voiture-bordeaux', '/achat-vente-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches', '/location-voiture-au-mois-bordeaux', '/contact'],
  },
  {
    path: '/guides/vendre-sa-voiture-demarches',
    kind: 'guide',
    title: 'Vendre sa voiture : démarches et documents | PRISMA',
    description: 'Vendre sa voiture : contrôle technique, certificat de cession, non-gage, déclaration à l’ANTS. Les démarches pas à pas, et le dépôt-vente ou le rachat.',
    h1: 'Vendre sa voiture : les démarches et les documents, étape par étape',
    eyebrow: 'Guide vente',
    lead: 'Vendre sa voiture demande de réunir quelques documents et de respecter des étapes précises, que vous vendiez à un particulier ou à un professionnel. Voici la liste complète, dans l’ordre, avec les points à ne pas oublier après la vente.',
    date: '2026-09-29',
    minutes: 6,
    vehicles: [],
    sections: [
      { h2: 'Avant de vendre sa voiture : les documents à réunir', html:
        '<ul><li><strong>Le certificat d’immatriculation</strong> (la carte grise), à votre nom ;</li>' +
        '<li><strong>Le contrôle technique</strong> : pour une vente à un particulier, il doit dater de moins de 6 mois si le véhicule a plus de 4 ans. Si une contre-visite a été demandée, elle doit dater de moins de 2 mois ;</li>' +
        '<li><strong>Le certificat de situation administrative</strong>, anciennement « certificat de non-gage » : il indique si le véhicule fait l’objet d’un gage ou d’une opposition. Il doit dater de moins de 15 jours et s’obtient gratuitement en ligne ;</li>' +
        '<li><strong>Le carnet d’entretien et les factures</strong> : ils ne sont pas obligatoires, mais ils rassurent l’acheteur et soutiennent votre prix.</li></ul>' },
      { h2: 'Fixer le bon prix de vente', html:
        '<p>Regardez les annonces de modèles comparables : même version, même motorisation, année et kilométrage proches. Tenez compte honnêtement de l’état de votre voiture, des frais à prévoir (pneus, freins, entretien) et de la saison : une décapotable se vend mieux au printemps, un SUV à quatre roues motrices avant l’hiver.</p>' +
        '<p>Un prix juste dès le départ attire des acheteurs sérieux ; un prix trop élevé fait durer la vente et finit souvent par une baisse.</p>' },
      { h2: 'Le jour de la vente : cession et carte grise', html:
        '<ol><li>Remplissez avec l’acheteur le <strong>certificat de cession</strong> (formulaire Cerfa n° 15776), en deux exemplaires : un pour chacun.</li>' +
        '<li>Barrez la carte grise en inscrivant « Vendu le », suivi de la date et de l’heure de la vente, puis signez-la. Remplissez le coupon détachable et remettez-le à l’acheteur avec la carte grise.</li>' +
        '<li>Remettez à l’acheteur le procès-verbal de contrôle technique et le certificat de situation administrative.</li>' +
        '<li>Pour le paiement, privilégiez le virement ou le chèque de banque, et vérifiez l’authenticité d’un chèque de banque auprès de la banque émettrice avant de remettre les clés.</li></ol>' },
      { h2: 'Après la vente : la déclaration de cession', html:
        '<p>Le vendeur doit déclarer la cession en ligne sur le site de l’ANTS dans les 15 jours qui suivent la vente. Cette déclaration vous dégage de toute responsabilité pour les infractions commises ensuite avec le véhicule. Elle fournit un code de cession, à transmettre à l’acheteur.</p>' +
        '<p>De son côté, l’acheteur dispose d’un mois pour faire immatriculer le véhicule à son nom. Pensez enfin à prévenir votre assureur pour mettre fin au contrat du véhicule vendu.</p>' },
      { h2: 'Vendre à un particulier ou à un professionnel ?', html:
        '<ul><li><strong>À un particulier</strong> : le prix obtenu est souvent le plus élevé, mais il faut gérer les annonces, les appels, les visites, les essais et la négociation, avec les risques d’arnaque au paiement.</li>' +
        '<li><strong>À un professionnel</strong>, en rachat : la vente est plus simple et plus directe. Le prix tient compte de la remise en état et de la revente.</li>' +
        '<li><strong>En dépôt-vente</strong> : un professionnel vend la voiture pour vous, au prix fixé ensemble. Vous restez propriétaire jusqu’à la vente, sans gérer les visites.</li></ul>' },
      { h2: 'Confier la vente de sa voiture à PRISMA Automobiles', html:
        '<p>À Yvrac, à environ 15 minutes de Bordeaux, PRISMA Automobiles propose le <a href="/depot-vente-voiture-bordeaux">dépôt-vente de voiture</a> et le <a href="/rachat-voiture-bordeaux">rachat de votre véhicule</a>. Nous vous indiquons les documents à apporter et nous vous accompagnons pour la cession.</p>' +
        '<p>Toutes nos solutions d’achat et de vente sont réunies sur la page <a href="/achat-vente-voiture-bordeaux">achat, vente et dépôt-vente</a>.</p>' },
    ],
    faq: [
      { q: 'Le contrôle technique est-il obligatoire pour vendre sa voiture ?', a: 'Oui pour une vente à un particulier si le véhicule a plus de 4 ans : il doit dater de moins de 6 mois, et la contre-visite éventuelle de moins de 2 mois.' },
      { q: 'Qu’est-ce que le certificat de situation administrative ?', a: 'Anciennement « certificat de non-gage », il indique si le véhicule fait l’objet d’un gage ou d’une opposition. Il doit dater de moins de 15 jours et s’obtient gratuitement en ligne.' },
      { q: 'Combien de temps pour déclarer la vente ?', a: '15 jours, en ligne sur le site de l’ANTS. La déclaration fournit un code de cession à transmettre à l’acheteur.' },
      { q: 'Quel moyen de paiement accepter ?', a: 'Le virement ou le chèque de banque, en vérifiant l’authenticité du chèque auprès de la banque émettrice avant de remettre les clés.' },
      { q: 'Le dépôt-vente change-t-il ces démarches ?', a: 'Les documents restent les mêmes, mais le professionnel vous accompagne pour les réunir et pour préparer la cession.' },
    ],
    related: ['/depot-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/achat-vente-voiture-bordeaux', '/contact'],
  },
]);

/* Contenu SEO : guides pratiques, FAQ et conditions de location */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/guides/quel-utilitaire-pour-demenager',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Quel utilitaire pour déménager ? Guide des volumes | PRISMA',
    description: 'Quel utilitaire pour déménager ? Volumes de 3 à 20 m³, charge utile, hayon élévateur et permis B : nos repères pour choisir le bon camion et tout charger.',
    h1: 'Quel utilitaire pour déménager ? Le bon volume selon votre logement',
    eyebrow: 'Guide déménagement',
    lead: 'Quel utilitaire pour déménager sans vous tromper de taille ? Tout se joue sur trois critères : le volume, la charge utile et la facilité de chargement. Voici comment choisir entre nos utilitaires de 3, 6, 12 et 20 m³, tous accessibles avec le permis B.',
    vehicles: ['v-kangoo', 'v-trafic', 'v-master12', 'v-master20'],
    sections: [
      {
        h2: 'Quel utilitaire pour déménager : partez du volume',
        html: `<p>Le volume de chargement, exprimé en mètres cubes (m³), est le premier critère. Avant de réserver, faites l’inventaire pièce par pièce : gros meubles, électroménager, literie, vélos, puis nombre de cartons. Cette liste est bien plus fiable que la surface du logement, car deux appartements identiques peuvent contenir des quantités d’affaires très différentes.</p>
<p>Mesurez aussi les meubles les plus encombrants, comme le canapé, l’armoire ou le buffet, surtout s’ils ne se désassemblent pas : ce sont souvent eux qui décident du format. Les cartons s’empilent, les meubles beaucoup moins.</p>
<p>Voici des correspondances à titre indicatif, pour vous donner un ordre d’idée :</p>
<ul>
<li><strong>3 m³</strong>, avec le <a href="/vehicule/renault-kangoo-van-3m3">Renault Kangoo Van</a> (3,3 m³ exactement) : quelques meubles et des cartons, par exemple pour vider une chambre ou transporter un canapé ;</li>
<li><strong>6 m³</strong>, avec le <a href="/vehicule/renault-trafic-6m3">Renault Trafic</a> : un studio peu meublé ;</li>
<li><strong>12 m³</strong>, avec le <a href="/vehicule/renault-master-12m3">Renault Master</a> : un studio meublé ou un petit deux-pièces ;</li>
<li><strong>20 m³</strong>, avec notre <a href="/vehicule/utilitaire-20m3-hayon">utilitaire à hayon</a> : un deux à trois pièces ou une petite maison.</li>
</ul>
<p>Une bibliothèque bien remplie, un grand dressing ou une cave encombrée changent vite la donne. En cas de doute, appelez l’agence au 07 49 58 81 44 avec votre liste : nous vous aidons à choisir le bon format.</p>`,
      },
      {
        h2: 'Charge utile : le poids compte autant que le volume',
        html: `<p>La charge utile correspond au poids que vous pouvez embarquer sans dépasser le poids total autorisé du véhicule. Tout compte, y compris les passagers assis à l’avant. Voici celle de nos utilitaires :</p>
<ul>
<li>Renault Kangoo Van 3 m³ : 650 kg ;</li>
<li>Renault Trafic 6 m³ : 1 100 kg ;</li>
<li>Renault Master 12 m³ : 1 300 kg ;</li>
<li>utilitaire 20 m³ avec hayon : 950 kg.</li>
</ul>
<p>Le 20 m³ offre le plus grand volume, mais sa charge utile est inférieure à celle du Master 12 m³. Il convient parfaitement aux objets encombrants et plutôt légers : canapés, matelas, armoires vidées, cartons de linge. Pour des charges denses, comme des cartons de livres en nombre, de la vaisselle ou de l’outillage, le Master 12 m³ est plus adapté.</p>
<p>Au chargement, placez les objets lourds en bas et répartissez-les sur toute la largeur : un utilitaire bien équilibré freine et tourne plus sereinement.</p>`,
      },
      {
        h2: 'Le hayon élévateur, un vrai confort pour les charges lourdes',
        html: `<p>Notre utilitaire 20 m³ est équipé d’un <strong>hayon élévateur de 500 kg</strong> : une plateforme à l’arrière qui monte les charges du sol jusqu’au plancher de la caisse. Réfrigérateur, lave-linge, buffet ou canapé montent ainsi sans être portés à bout de bras, ce qui ménage le dos comme les meubles.</p>
<p>Il dispose aussi d’une rampe, pratique pour faire rouler un diable chargé, et de barres d’arrimage pour caler chaque rangée. Quelques règles simples s’appliquent au hayon :</p>
<ul>
<li>ne dépassez jamais sa capacité de 500 kg ;</li>
<li>centrez la charge sur la plateforme et stabilisez-la avant de l’actionner ;</li>
<li>gardez les mains et les pieds hors de la zone de mouvement.</li>
</ul>
<p>Sans hayon, le Master 12 m³ compense par une hauteur intérieure de 1,90 m, pratique pour charger des meubles hauts et circuler dans le fourgon, et par une caméra de recul bien utile pour se placer devant l’immeuble.</p>`,
      },
      {
        h2: 'Permis B : tous nos utilitaires sont accessibles',
        html: `<p>Le permis B permet de conduire un véhicule dont le poids total autorisé en charge (PTAC) ne dépasse pas 3,5 tonnes, avec 9 places au maximum, conducteur compris. Tous les utilitaires de PRISMA Automobiles respectent cette limite, y compris le 20 m³ avec hayon, qui reste sous les 3,5 tonnes.</p>
<p>Les conditions de location varient selon le modèle :</p>
<ul>
<li>Kangoo Van, Trafic 6 m³ et Master 12 m³ : 21 ans et 2 ans de permis ;</li>
<li>20 m³ avec hayon : 21 ans et 3 ans de permis.</li>
</ul>
<p>Si vous conduisez un grand utilitaire pour la première fois, réglez les rétroviseurs avant de partir, pensez à la hauteur du véhicule avant d’entrer dans un parking et gardez plus de distance qu’en voiture : chargé, un utilitaire met plus de temps à s’arrêter.</p>`,
      },
      {
        h2: 'Un peu plus grand plutôt qu’un deuxième voyage',
        html: `<p>Quand vous hésitez entre deux tailles, prenez la plus grande. Un second aller-retour coûte du temps, de la fatigue, du carburant et des kilomètres, et il mobilise vos proches plus longtemps. Un fourgon un peu trop grand, lui, se charge simplement avec plus d’aisance.</p>
<p>Comparez l’écart de prix au temps gagné :</p>
<ul>
<li>Kangoo 3 m³ à 45 € par jour, Trafic 6 m³ à 65 € : 20 € d’écart ;</li>
<li>Trafic 6 m³ à 65 €, Master 12 m³ à 79 € : 14 € d’écart ;</li>
<li>Master 12 m³ à 79 €, 20 m³ avec hayon à 109 € : 30 € d’écart.</li>
</ul>
<p>Pensez aussi aux kilomètres : 150 km par jour sont inclus sur tous nos utilitaires, puis chaque kilomètre est facturé de 0,30 € à 0,40 € selon le modèle. Pour un déménagement lointain, l’option kilométrage illimité coûte 12 € par jour.</p>`,
      },
      {
        h2: 'Durée de location et équipage : bien s’organiser',
        html: `<p>Pour un petit déménagement en ville, une journée peut suffire. Pour un logement complet, un trajet plus long ou des accès difficiles, réservez plutôt deux jours : vous chargerez sans vous presser, et vous éviterez la journée supplémentaire facturée au-delà de 59 minutes de retard. Dès 3 jours de location, un tarif dégressif s’applique automatiquement, avec 5 % de remise.</p>
<p>Pensez aussi au nombre de places en cabine : le Kangoo Van en compte 2, le Trafic 6 m³, le Master 12 m³ et le 20 m³ en comptent 3. Deux proches peuvent ainsi voyager avec le chargement, sans seconde voiture à organiser. Personne, en revanche, ne doit s’installer dans l’espace de chargement.</p>`,
      },
      {
        h2: 'Kit déménagement et bons réflexes de chargement',
        html: `<p>Pour gagner du temps le jour J, ajoutez le <strong>kit déménagement</strong> à votre réservation : 19 € le forfait pour un diable, des sangles et six couvertures de protection. Le diable soulage les allers-retours entre le logement et le camion, les couvertures évitent les rayures.</p>
<p>Pour un chargement stable :</p>
<ol>
<li>commencez par les meubles lourds et volumineux, à l’avant de l’espace de chargement, côté cabine ;</li>
<li>placez ensuite les cartons lourds, puis les plus légers par-dessus ;</li>
<li>comblez les vides avec des sacs souples, des coussins ou des couettes ;</li>
<li>sanglez chaque rangée, aux anneaux d’arrimage du Kangoo Van et du Master 12 m³ ou aux barres d’arrimage du 20 m³.</li>
</ol>
<p>Réservez dès que votre date est connue, surtout pour un samedi ou une fin de mois. Toute la gamme est présentée sur notre page <a href="/location-camion-demenagement-bordeaux">location de camion de déménagement à Bordeaux</a>.</p>`,
      },
    ],
    faq: [
      { q: 'Quel utilitaire pour déménager un studio ?', a: 'À titre indicatif, un studio peu meublé tient dans un 6 m³ comme le Renault Trafic. S’il est bien meublé, visez plutôt un 12 m³.' },
      { q: 'Faut-il un permis spécial pour conduire le 20 m³ ?', a: 'Non, il reste sous les 3,5 tonnes et se conduit avec le permis B. Il faut avoir 21 ans et 3 ans de permis.' },
      { q: 'Le kit déménagement est-il inclus dans le prix ?', a: 'C’est une option à 19 € le forfait pour toute la location, avec un diable, des sangles et six couvertures de protection.' },
      { q: 'Combien de kilomètres sont inclus avec un utilitaire ?', a: '150 km par jour. Au-delà, le kilomètre est facturé de 0,30 € à 0,40 € selon le modèle, sauf avec l’option kilométrage illimité à 12 € par jour.' },
      { q: 'Peut-on récupérer l’utilitaire ailleurs qu’à Yvrac ?', a: 'Oui : à la gare Saint-Jean (25 €), à l’aéroport de Bordeaux-Mérignac (35 €) ou livré chez vous dans Bordeaux Métropole, dans un rayon de 25 km (40 €). Le retrait à l’agence d’Yvrac est gratuit.' },
    ],
    related: ['/location-camion-demenagement-bordeaux', '/location-utilitaire-bordeaux', '/guides/demenager-a-bordeaux-conseils', '/guides/permis-b-utilitaire-3-5-tonnes'],
  },
  {
    path: '/guides/permis-b-utilitaire-3-5-tonnes',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Quel utilitaire avec le permis B ? La règle des 3,5 tonnes',
    description: 'Quel utilitaire avec le permis B ? PTAC de 3,5 tonnes, 9 places, carte grise, charge utile et remorque : les règles à connaître avant de louer un utilitaire.',
    h1: 'Quel utilitaire avec le permis B ? La règle des 3,5 tonnes expliquée',
    eyebrow: 'Guide permis B',
    lead: 'Quel utilitaire avec le permis B pouvez-vous conduire ? La réponse tient en une règle : un poids total autorisé en charge de 3,5 tonnes au maximum et 9 places au plus, conducteur compris. Voici comment la vérifier sur la carte grise et l’appliquer quand vous louez un fourgon ou un minibus.',
    vehicles: ['v-master12', 'v-master20', 'v-bus'],
    sections: [
      {
        h2: 'La règle du permis B : 3,5 tonnes et 9 places',
        html: `<p>Le permis B autorise la conduite des véhicules dont le PTAC, le poids total autorisé en charge, ne dépasse pas 3,5 tonnes, et qui comptent 9 places au maximum, conducteur compris. Ce ne sont donc ni la longueur, ni le volume, ni l’allure de « camion » qui comptent, mais le poids maximal autorisé et le nombre de places.</p>
<p>Concrètement, un grand fourgon ou un utilitaire à caisse se conduit avec le permis B s’il respecte ces deux limites. Au-delà de 3,5 tonnes, il faut un permis poids lourd (catégories C1 ou C) ; au-delà de 9 places, un permis de transport en commun (catégories D1 ou D).</p>
<p>Cette règle vaut pour la conduite du véhicule seul. Dès qu’une remorque entre en jeu, d’autres conditions s’ajoutent, que nous détaillons plus bas.</p>`,
      },
      {
        h2: 'Où lire le PTAC ? Sur la carte grise, rubrique F.2',
        html: `<p>Le PTAC figure sur le certificat d’immatriculation, la carte grise, à la <strong>rubrique F.2</strong>. C’est lui, avec le nombre de places, qui détermine le permis nécessaire. Deux autres rubriques sont utiles :</p>
<ul>
<li><strong>S.1</strong> : le nombre de places assises, conducteur compris ;</li>
<li><strong>F.3</strong> : le poids total roulant autorisé (PTRA), qui concerne la conduite avec une remorque.</li>
</ul>
<p>Ne vous fiez pas à l’apparence : deux fourgons de taille voisine peuvent avoir des PTAC différents selon leur version. En location, posez donc simplement la question : ce véhicule se conduit-il avec le permis B ? Chez PRISMA Automobiles, la réponse est toujours oui, pour nos utilitaires comme pour notre minibus.</p>`,
      },
      {
        h2: 'PTAC et charge utile : ne pas confondre',
        html: `<p>Trois notions reviennent souvent :</p>
<ul>
<li><strong>le poids à vide</strong> : le poids du véhicule sans chargement ;</li>
<li><strong>le PTAC</strong> : le poids maximal autorisé du véhicule chargé, avec les passagers, les bagages et la marchandise ;</li>
<li><strong>la charge utile</strong> : la différence entre les deux, c’est-à-dire ce que vous pouvez réellement embarquer.</li>
</ul>
<p>Un utilitaire de 3,5 tonnes ne transporte donc pas 3,5 tonnes de marchandises. Nos charges utiles le montrent : 650 kg pour le Kangoo Van 3 m³, 1 100 kg pour le Trafic 6 m³, 1 300 kg pour le Master 12 m³ et 950 kg pour l’utilitaire 20 m³ avec hayon. Plus un véhicule est lourd à vide, plus sa charge utile diminue : c’est pourquoi le 20 m³, avec sa grande caisse et son hayon, emporte moins de poids que le Master 12 m³ tout en offrant davantage de volume.</p>
<p>Dépasser le PTAC est interdit, même avec le bon permis. Une surcharge allonge le freinage, dégrade la tenue de route et sollicite fortement les freins et les suspensions. Estimez le poids de vos charges les plus denses, comme les cartons de livres, l’outillage ou les matériaux, avant de remplir la caisse.</p>`,
      },
      {
        h2: 'Passagers : le nombre de places compte aussi',
        html: `<p>La limite de 9 places, conducteur compris, concerne les places assises prévues par le constructeur, inscrites à la rubrique S.1 de la carte grise. Dans un utilitaire, les passagers voyagent uniquement en cabine, sur des sièges équipés de ceintures : personne ne doit s’installer dans l’espace de chargement, même pour un court trajet.</p>
<p>Nos fourgons comptent 2 places (Kangoo Van) ou 3 places (Trafic 6 m³, Master 12 m³ et 20 m³ avec hayon). Pour transporter une équipe ou un groupe, le minibus 9 places reste accessible avec le permis B : il accueille le conducteur et huit passagers, chacun sur son siège.</p>`,
      },
      {
        h2: 'Et avec une remorque ?',
        html: `<p>Le permis B permet aussi de tracter une remorque, mais sous des conditions précises. Elles dépendent du poids de la remorque et du poids de l’ensemble formé avec le véhicule qui la tracte. Selon les cas, le permis B suffit, une formation complémentaire (dite B96) est nécessaire, ou le permis BE est exigé.</p>
<p>Ces seuils sont fixés par la réglementation et peuvent évoluer : vérifiez-les sur le site officiel de l’administration, service-public.fr, avant d’atteler quoi que ce soit. Le véhicule tracteur doit aussi être équipé et autorisé pour cela : sa carte grise indique le poids total roulant autorisé à la rubrique F.3. Si votre projet implique une remorque, posez la question à l’agence avant de réserver.</p>`,
      },
      {
        h2: 'Quel utilitaire avec le permis B chez PRISMA Automobiles ?',
        html: `<p>Toute notre gamme d’utilitaires se conduit avec le permis B. Seules les conditions d’âge et d’ancienneté de permis changent d’un modèle à l’autre :</p>
<ul>
<li><a href="/vehicule/renault-kangoo-van-3m3">Renault Kangoo Van 3 m³</a> : 2 places, 45 € par jour, 21 ans et 2 ans de permis ;</li>
<li>Renault Trafic 6 m³ : 3 places, 65 € par jour, 21 ans et 2 ans de permis ;</li>
<li><a href="/vehicule/renault-master-12m3">Renault Master 12 m³</a> : 3 places, 79 € par jour, 21 ans et 2 ans de permis ;</li>
<li><a href="/vehicule/utilitaire-20m3-hayon">utilitaire 20 m³ avec hayon</a> : moins de 3,5 tonnes, hayon élévateur de 500 kg, 109 € par jour, 21 ans et 3 ans de permis ;</li>
<li><a href="/vehicule/renault-trafic-9-places">Renault Trafic 9 places</a> : minibus de 9 places conducteur compris, 115 € par jour, 23 ans et 3 ans de permis.</li>
</ul>
<p>Les prix sont TTC, avec 150 km inclus par jour pour les utilitaires et 250 km pour le minibus. Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution. Retrouvez la gamme complète sur notre page <a href="/location-utilitaire-bordeaux">location d’utilitaire à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Conduire un grand utilitaire avec le permis B : nos conseils',
        html: `<p>Le permis B suffit, mais un fourgon de 12 ou 20 m³ ne se conduit pas tout à fait comme une voiture. Prenez quelques minutes pour vous installer et repérer les commandes avant de partir, puis gardez en tête ces réflexes :</p>
<ul>
<li><strong>la hauteur</strong> : renseignez-vous sur celle du véhicule avant de partir et méfiez-vous des parkings souterrains, des porches et des branches basses ;</li>
<li><strong>la vision arrière</strong> : sur un utilitaire fermé, elle passe surtout par les rétroviseurs extérieurs, à régler avant de démarrer ;</li>
<li><strong>le freinage</strong> : chargé, le véhicule s’arrête sur une plus longue distance, gardez de la marge ;</li>
<li><strong>le vent latéral</strong> : il se ressent davantage sur un grand fourgon, surtout à vide et sur les ponts ;</li>
<li><strong>les manœuvres</strong> : faites-vous guider par un proche, et utilisez la caméra de recul quand le véhicule en a une, comme le Master 12 m³ ;</li>
<li><strong>le carburant</strong> : chargé, un utilitaire consomme davantage ; refaites le niveau avant de le rendre, sinon le carburant manquant est facturé 14 € le huitième de réservoir.</li>
</ul>`,
      },
    ],
    faq: [
      { q: 'Peut-on conduire un camion de 20 m³ avec le permis B ?', a: 'Oui, si son PTAC ne dépasse pas 3,5 tonnes, ce qui est le cas de notre utilitaire 20 m³ avec hayon. Il est accessible dès 21 ans avec 3 ans de permis.' },
      { q: 'Où trouver le PTAC d’un utilitaire ?', a: 'Sur le certificat d’immatriculation, la carte grise, à la rubrique F.2.' },
      { q: 'La charge utile est-elle la même chose que le PTAC ?', a: 'Non. Le PTAC est le poids maximal du véhicule chargé ; la charge utile est ce que vous pouvez embarquer, passagers compris, sans le dépasser.' },
      { q: 'Le permis B suffit-il pour un minibus ?', a: 'Oui, jusqu’à 9 places conducteur compris et 3,5 tonnes de PTAC, comme notre Renault Trafic 9 places.' },
      { q: 'Peut-on louer un utilitaire avec moins de 3 ans de permis ?', a: 'Oui, le Kangoo Van, le Trafic 6 m³ et le Master 12 m³ sont accessibles dès 2 ans de permis, avec un supplément jeune conducteur de 15 € par jour (150 € au maximum) et une caution augmentée de 500 €.' },
    ],
    related: ['/location-utilitaire-bordeaux', '/location-camion-demenagement-bordeaux', '/guides/quel-utilitaire-pour-demenager', '/guides/location-minibus-9-places-permis-b'],
  },
  {
    path: '/guides/location-minibus-9-places-permis-b',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Location minibus 9 places permis B : le guide | PRISMA',
    description: 'Minibus 9 places avec le permis B : la règle, nos conditions (23 ans, 3 ans de permis), les bagages, la conduite et les usages. Le guide avant de réserver.',
    h1: 'Louer un minibus 9 places avec le permis B : le guide pratique',
    eyebrow: 'Guide minibus',
    lead: 'Louer un minibus 9 places avec le permis B, c’est possible : pas besoin d’un permis de transport en commun pour emmener votre groupe. Encore faut-il connaître les conditions de location et les bons réflexes au volant d’un véhicule plus long et plus haut qu’une voiture. Voici l’essentiel avant de réserver.',
    vehicles: ['v-bus', 'v-5008'],
    sections: [
      {
        h2: 'Minibus 9 places et permis B : ce que dit la règle',
        html: `<p>Le permis B permet de conduire un véhicule de 9 places au maximum, conducteur compris, dont le poids total autorisé en charge (PTAC) ne dépasse pas 3,5 tonnes. Un minibus 9 places accueille donc le conducteur et huit passagers, sans autre permis ni formation particulière : la conduite reste celle d’un grand véhicule.</p>
<p>Au-delà de 9 places, on change de catégorie : il faut un permis de transport en commun (D1 ou D). Le nombre de places figure sur la carte grise, à la rubrique S.1, et le PTAC à la rubrique F.2.</p>
<p>À bord, chaque passager doit disposer d’une place assise et boucler sa ceinture. Si vous transportez de jeunes enfants, prévoyez des dispositifs de retenue adaptés à leur âge et à leur taille, comme l’exige le Code de la route.</p>`,
      },
      {
        h2: 'Nos conditions pour louer le Renault Trafic 9 places',
        html: `<p>Notre <a href="/vehicule/renault-trafic-9-places">Renault Trafic 9 places</a> se loue aux conditions suivantes :</p>
<ul>
<li><strong>115 € par jour</strong> TTC, avec 250 km inclus par jour, puis 0,35 € par kilomètre supplémentaire ;</li>
<li><strong>23 ans minimum et 3 ans de permis</strong> ;</li>
<li>une caution de 2 000 € par empreinte bancaire, non débitée et libérée au retour ;</li>
<li>une franchise de 2 200 €, ramenée à 1 100 € avec la Protection Confort (12 € par jour) ou à zéro avec la Protection Sérénité (22 € par jour) ;</li>
<li>une boîte manuelle, un moteur diesel, la climatisation avant et arrière et un régulateur de vitesse.</li>
</ul>
<p>Comme il faut 3 ans de permis, le supplément jeune conducteur ne concerne pas ce véhicule. Les tarifs dégressifs s’appliquent automatiquement : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, et jusqu’à 30 % dès 28 jours.</p>
<p>Partagé entre neuf personnes, le tarif de 115 € par jour revient à moins de 13 € par personne, hors carburant et options. Avec un groupe à bord, la Protection Sérénité, qui supprime la franchise en cas de dommage ou de vol, apporte en plus une vraie tranquillité d’esprit.</p>`,
      },
      {
        h2: 'Passagers et bagages : bien charger le minibus',
        html: `<p>L’espace arrière accueille l’équivalent de 6 valises. Avec neuf personnes à bord, la place se gère : privilégiez les sacs souples, plus faciles à caser que les valises rigides, et convenez à l’avance de ce que chacun emporte. À bord, quelques règles simples :</p>
<ul>
<li>ne laissez aucun bagage libre dans l’habitacle : au freinage, un objet non calé devient dangereux ;</li>
<li>placez les sacs les plus lourds en bas ;</li>
<li>gardez à portée de main l’eau, les papiers du véhicule et de quoi patienter pendant le trajet.</li>
</ul>
<p>Souvenez-vous que passagers et bagages s’additionnent : neuf adultes et leurs affaires représentent un poids important, qui allonge les distances de freinage. Pour un groupe très chargé, mieux vaut alléger les bagages que de remplir chaque recoin.</p>
<p>Pour le matériel volumineux, comme les sacs de sport, une poussette ou l’équipement d’une association, faites la liste à l’avance : l’espace arrière se partage entre les bagages de tous.</p>`,
      },
      {
        h2: 'Conduire un minibus : gabarit, freinage et pauses',
        html: `<p>Le Trafic 9 places se conduit comme une grande voiture, avec quelques différences à garder en tête :</p>
<ul>
<li><strong>le gabarit</strong> : plus long et plus haut qu’une berline, il demande des virages plus larges et de l’attention à l’entrée des parkings souterrains, souvent limités en hauteur ;</li>
<li><strong>la boîte manuelle</strong> : si vous roulez d’habitude en automatique, prenez le temps de vous familiariser avec le véhicule avant de faire monter le groupe ;</li>
<li><strong>le freinage</strong> : à pleine charge, anticipez et gardez davantage de distance avec le véhicule qui précède ;</li>
<li><strong>le stationnement</strong> : privilégiez les places en bout de rangée, plus faciles d’accès, et faites-vous guider en marche arrière ;</li>
<li><strong>les pauses</strong> : sur un long trajet, arrêtez-vous régulièrement et relayez-vous au volant.</li>
</ul>
<p>Pour partager la conduite, déclarez jusqu’à deux conducteurs supplémentaires : 6 € par jour et par conducteur, avec un plafond de 60 € chacun. Seuls les conducteurs déclarés peuvent prendre le volant. Le régulateur de vitesse et la climatisation avant et arrière rendent les longs trajets plus agréables pour tout le monde.</p>`,
      },
      {
        h2: 'Pour quels usages louer un minibus 9 places ?',
        html: `<p>Le minibus permet de déplacer tout un groupe dans un seul véhicule, avec un seul plein et une seule place de stationnement à trouver. Il se prête notamment :</p>
<ul>
<li>aux équipes sportives et aux déplacements de club ;</li>
<li>aux mariages, anniversaires et fêtes de famille ;</li>
<li>aux sorties associatives ou culturelles ;</li>
<li>aux équipes en déplacement professionnel, séminaires et chantiers ;</li>
<li>aux vacances entre amis ou en famille nombreuse.</li>
</ul>
<p>Pour un groupe de sept personnes au plus, le <a href="/vehicule/peugeot-5008-7-places">Peugeot 5008 (7 places)</a> est une alternative confortable : boîte automatique, grand coffre de 5 valises, 89 € par jour, accessible dès 23 ans et 2 ans de permis. Plus de détails sur notre page <a href="/location-minibus-9-places-bordeaux">location de minibus 9 places à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Réserver, retirer et rendre le minibus',
        html: `<p>La réservation se fait en ligne 24 h sur 24, avec confirmation immédiate par email, ou par téléphone et WhatsApp au 07 49 58 81 44. Le jour du départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.</p>
<p>Le retrait est gratuit à l’agence d’Yvrac, à environ 15 minutes de Bordeaux par la rocade, avec parking gratuit. Vous pouvez aussi récupérer le minibus à l’<a href="/location-voiture-aeroport-merignac">aéroport de Bordeaux-Mérignac</a> (35 €) pour accueillir un groupe, à la gare Saint-Jean (25 €), ou le faire livrer à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km (40 €). Le retour peut se faire dans un autre point que le départ, par exemple à l’aéroport après y avoir déposé votre groupe.</p>
<p>Au retour, rendez le minibus avec le même niveau de carburant qu’au départ, sinon le carburant est facturé 14 € le huitième de réservoir. Prévoyez de la marge : au-delà de 59 minutes de retard, une journée supplémentaire est facturée.</p>`,
      },
      {
        h2: 'Préparer le trajet de groupe',
        html: `<p>Un déplacement à neuf se prépare un peu plus qu’un trajet en voiture. Quelques conseils simples :</p>
<ul>
<li>fixez un point et une heure de rendez-vous, avec une marge pour les retardataires ;</li>
<li>repérez à l’avance le stationnement à l’arrivée, en vérifiant les hauteurs autorisées ;</li>
<li>pour un mariage ou une visite de vignobles, désignez un conducteur qui ne boira pas d’alcool ;</li>
<li>gardez le numéro de l’agence à portée de main : 07 49 58 81 44, par téléphone ou WhatsApp.</li>
</ul>
<p>Pour un séminaire ou une sortie d’équipe, les professionnels bénéficient de prix HT et d’une facture au nom de la société.</p>`,
      },
    ],
    faq: [
      { q: 'Faut-il un permis spécial pour conduire un minibus 9 places ?', a: 'Non, le permis B suffit tant que le véhicule compte 9 places au maximum, conducteur compris, et ne dépasse pas 3,5 tonnes de PTAC.' },
      { q: 'Quel âge faut-il pour louer le minibus ?', a: 'Il faut avoir 23 ans et 3 ans de permis pour louer notre Renault Trafic 9 places.' },
      { q: 'Combien de bagages peut-on emporter ?', a: 'L’espace arrière accueille l’équivalent de 6 valises. Avec un groupe complet, privilégiez les sacs souples.' },
      { q: 'Peut-on partager la conduite ?', a: 'Oui, en déclarant jusqu’à deux conducteurs supplémentaires, à 6 € par jour et par conducteur, avec un plafond de 60 € chacun.' },
      { q: 'Le minibus a-t-il une boîte automatique ?', a: 'Non, il a une boîte manuelle. Pour sept personnes au plus avec une boîte automatique, pensez au Peugeot 5008.' },
    ],
    related: ['/location-minibus-9-places-bordeaux', '/location-voiture-7-places-bordeaux', '/guides/permis-b-utilitaire-3-5-tonnes', '/professionnels'],
  },
  {
    path: '/guides/louer-voiture-electrique-bordeaux',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Louer une voiture électrique à Bordeaux : le guide | PRISMA',
    description: 'Louer une voiture électrique à Bordeaux : autonomie de la Tesla Model 3, recharge aux Superchargeurs et sur bornes, retour à 70 % et conseils de conduite.',
    h1: 'Louer une voiture électrique à Bordeaux : le guide pour bien rouler',
    eyebrow: 'Guide électrique',
    lead: 'Louer une voiture électrique à Bordeaux, c’est l’occasion de découvrir une conduite silencieuse et souple, le temps d’un week-end ou d’un long trajet. Pour en profiter pleinement, il suffit de préparer ses recharges et de connaître quelques règles simples. Voici nos conseils pour la Tesla Model 3 de PRISMA Automobiles.',
    vehicles: ['v-tesla'],
    sections: [
      {
        h2: 'Pourquoi louer une voiture électrique à Bordeaux ?',
        html: `<p>Louer permet d’essayer l’électrique en conditions réelles avant un éventuel achat, ou simplement de profiter d’une berline confortable pour quelques jours. La <a href="/vehicule/tesla-model-3">Tesla Model 3</a> offre des accélérations immédiates, un grand silence de fonctionnement et un habitacle lumineux sous son toit panoramique.</p>
<ul>
<li>95 € par jour TTC, 300 km inclus par jour, puis 0,30 € par kilomètre supplémentaire ;</li>
<li>jusqu’à 500 km d’autonomie annoncée et l’accès aux Superchargeurs ;</li>
<li>Autopilot, écran de 15 pouces et coffre de 3 valises ;</li>
<li>dès 25 ans et 3 ans de permis, avec une caution de 2 000 € par empreinte bancaire non débitée.</li>
</ul>
<p>Côté formalités, rien ne change par rapport à une voiture thermique : permis de conduire, pièce d’identité au nom du conducteur et carte bancaire pour la caution au départ. Seule la règle de restitution diffère : la voiture se rend avec au moins 70 % de charge, et non avec le plein.</p>
<p>La Model 3 fait partie de notre gamme de <a href="/location-voiture-premium-bordeaux">location de voiture premium</a>, et notre offre électrique est détaillée sur la page <a href="/location-voiture-electrique-bordeaux">location de voiture électrique à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Autonomie : bien comprendre les 500 km annoncés',
        html: `<p>L’autonomie annoncée de la Tesla Model 3 va jusqu’à 500 km. Comme pour toute voiture électrique, l’autonomie réelle dépend de votre façon de rouler et des conditions du trajet :</p>
<ul>
<li><strong>la vitesse</strong> : sur autoroute, la consommation augmente nettement ;</li>
<li><strong>la température</strong> : le froid réduit l’autonomie, tout comme un usage soutenu du chauffage ;</li>
<li><strong>la climatisation, la charge transportée et le relief</strong> jouent aussi.</li>
</ul>
<p>Le bon réflexe consiste à raisonner avec une marge, sans chercher à arriver à destination avec une batterie presque vide. L’écran indique en permanence l’autonomie restante, et la navigation intégrée de la voiture peut ajouter des arrêts de recharge à votre itinéraire. Sur un long trajet, surveillez le niveau de charge estimé à l’arrivée plutôt que le seul chiffre d’autonomie.</p>
<p>En hiver, lancez le chauffage pendant que la voiture est encore branchée : l’habitacle se réchauffe avec l’énergie de la borne plutôt qu’avec celle de la batterie.</p>`,
      },
      {
        h2: 'Planifier ses recharges : Superchargeurs, bornes et applications',
        html: `<p>Trois solutions complémentaires s’offrent à vous pour recharger pendant la location :</p>
<ul>
<li><strong>les Superchargeurs</strong> : le réseau de recharge rapide de Tesla, accessible avec notre Model 3 et intégré à la navigation de la voiture, très pratique sur les longs trajets ;</li>
<li><strong>les bornes publiques</strong> : sur les parkings, dans certaines rues ou dans les centres commerciaux, avec des moyens d’accès et de paiement qui varient d’un réseau à l’autre ;</li>
<li><strong>les applications de navigation</strong> : elles localisent les bornes sur votre trajet et indiquent souvent leur disponibilité.</li>
</ul>
<p>Au départ, demandez à l’agence quels câbles se trouvent à bord, et vérifiez la compatibilité d’une borne avant de vous y arrêter. Sur une borne rapide, la recharge ralentit à l’approche du plein : plusieurs arrêts courts sont souvent plus efficaces qu’une longue attente jusqu’à la batterie pleine. Si votre hébergement dispose d’une borne, profitez-en pour recharger la nuit. Pour un trajet de plusieurs centaines de kilomètres, repérez vos arrêts la veille et gardez une solution de secours à proximité de chacun.</p>`,
      },
      {
        h2: 'Rendre la voiture avec au moins 70 % de charge',
        html: `<p>La Tesla Model 3 se rend avec au moins 70 % de charge. Intégrez donc une dernière recharge à votre programme, la veille du retour ou sur la route qui vous ramène vers Bordeaux, pour ne pas vous presser le jour J.</p>
<p>Cette règle vaut quel que soit le point de retour : agence d’Yvrac (gratuit), gare Saint-Jean (25 €), aéroport de Bordeaux-Mérignac (35 €) ou reprise à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km (40 €). Pensez aussi à l’heure : au-delà de 59 minutes de retard, une journée supplémentaire est facturée. Si vous rendez la voiture à la gare ou à l’aéroport, faites la dernière recharge en chemin : vous n’aurez pas à chercher une borne à la dernière minute.</p>
<p>Avant de rendre les clés, vérifiez le pourcentage de batterie affiché à l’écran et gardez-en une photo avec le compteur kilométrique : c’est la façon la plus simple de lever tout doute.</p>`,
      },
      {
        h2: 'Conduire une Tesla : freinage régénératif et aides à la conduite',
        html: `<p>La première surprise, c’est le <strong>freinage régénératif</strong> : dès que vous relâchez l’accélérateur, la voiture ralentit nettement en récupérant de l’énergie dans la batterie. En ville, vous utilisez beaucoup moins la pédale de frein. Il faut un petit temps d’adaptation, puis la conduite devient très fluide.</p>
<ul>
<li>avant de partir, prenez le temps de découvrir l’écran de 15 pouces, qui regroupe la plupart des commandes, et de régler rétroviseurs et position de conduite ;</li>
<li>l’Autopilot est une aide à la conduite : gardez les mains sur le volant et l’attention sur la route ;</li>
<li>les accélérations sont très franches : dosez-les, car une allure régulière consomme moins d’énergie que des relances répétées ;</li>
<li>la voiture est très silencieuse : redoublez de vigilance près des piétons et des cyclistes, qui l’entendent moins arriver.</li>
</ul>`,
      },
      {
        h2: 'Idées de trajets en électrique au départ de Bordeaux',
        html: `<p>La Model 3 se prête aussi bien aux sorties à la journée qu’aux longs trajets :</p>
<ul>
<li><strong>le bassin d’Arcachon</strong>, à environ 1 h de route, pour la dune du Pilat et les ports ostréicoles ;</li>
<li><strong>Saint-Émilion</strong>, à environ 40 minutes, pour son village médiéval et ses vignobles ;</li>
<li><strong>l’Entre-deux-Mers</strong>, tout proche de l’agence d’Yvrac, pour ses petites routes au milieu des vignes ;</li>
<li><strong>le Médoc</strong>, au nord de Bordeaux, pour ses châteaux viticoles le long de l’estuaire ;</li>
<li><strong>les grands voyages</strong> vers l’Espagne, le Portugal ou l’Italie, avec l’option circulation en Europe à 7 € par jour (70 € au maximum).</li>
</ul>
<p>Pour un long voyage, l’option kilométrage illimité à 12 € par jour vous évite de compter. Et pour un séjour court, voyez notre page <a href="/location-voiture-week-end-bordeaux">location de voiture pour le week-end à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Électrique ou thermique : choisir selon votre programme',
        html: `<p>La Tesla Model 3 se prête particulièrement bien à la ville, à la rocade et aux escapades de la journée, où les recharges se glissent facilement dans le programme. Pour un très long trajet à faire d’une traite, ou si vous préférez ne pas penser à la recharge, un modèle thermique peut être plus simple :</p>
<ul>
<li>le Mercedes GLC (AMG Line), diesel, avec kilométrage illimité, pour les longs voyages en tout confort ;</li>
<li>le Peugeot 5008, diesel et 7 places, pour les familles ;</li>
<li>la Mercedes Classe A 180, essence et automatique, pour une conduite premium au format compact.</li>
</ul>
<p>Quel que soit votre choix, la réservation se fait en ligne 24 h sur 24, avec confirmation immédiate par email.</p>`,
      },
    ],
    faq: [
      { q: 'Quelle est l’autonomie de la Tesla Model 3 de location ?', a: 'Jusqu’à 500 km d’autonomie annoncée. En pratique, elle varie selon la vitesse, la température et l’usage du chauffage ou de la climatisation.' },
      { q: 'Où recharger la voiture pendant la location ?', a: 'Aux Superchargeurs, accessibles avec notre Tesla, et sur les bornes publiques compatibles, que les applications de navigation vous aident à repérer.' },
      { q: 'Faut-il rendre la voiture chargée à 100 % ?', a: 'Non, elle doit être rendue avec au moins 70 % de charge.' },
      { q: 'Quelles sont les conditions pour louer la Tesla ?', a: 'Il faut avoir 25 ans et 3 ans de permis. La caution de 2 000 € est prise par empreinte bancaire, sans débit.' },
      { q: 'Combien de kilomètres sont inclus ?', a: '300 km par jour, puis 0,30 € par kilomètre supplémentaire. L’option kilométrage illimité coûte 12 € par jour.' },
    ],
    related: ['/location-voiture-electrique-bordeaux', '/location-voiture-premium-bordeaux', '/guides/escapades-week-end-depuis-bordeaux', '/guides/caution-franchise-protections-location'],
  },
  {
    path: '/guides/caution-franchise-protections-location',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Caution et franchise en location de voiture | PRISMA',
    description: 'Caution et franchise en location de voiture : quelle différence ? Empreinte bancaire, montants par véhicule, Protection Confort ou Sérénité et nos conseils.',
    h1: 'Caution et franchise en location de voiture : tout comprendre',
    eyebrow: 'Caution et franchise',
    lead: 'Caution et franchise en location de voiture : deux mots souvent confondus, qui ne désignent pourtant pas la même chose. La caution est une garantie prise au départ, la franchise est la somme qui reste à votre charge en cas de dommage ou de vol. Voici comment elles fonctionnent chez PRISMA Automobiles, et comment réduire votre part de risque.',
    vehicles: ['v-clio', 'v-classea', 'v-glc'],
    sections: [
      {
        h2: 'Caution et franchise en location de voiture : quelle différence ?',
        html: `<p>La <strong>caution</strong> est une garantie. Chez PRISMA Automobiles, elle prend la forme d’une empreinte bancaire au départ : le montant n’est pas débité, et l’empreinte est libérée au retour du véhicule, déduction faite d’éventuels frais.</p>
<p>La <strong>franchise</strong> est la somme qui reste à votre charge si le véhicule est endommagé ou volé pendant la location. Son montant dépend du véhicule, et vous pouvez la réduire, voire la supprimer, avec une protection.</p>
<p>Les deux fonctionnent ensemble : la franchise fixe votre part en cas de sinistre, la caution garantit le règlement des sommes éventuellement dues au retour.</p>
<p>Autrement dit, la caution ne vous coûte rien si tout se passe bien, tandis que la franchise n’intervient qu’en cas de sinistre. Leurs montants sont fixés pour chaque véhicule, et vous les connaissez avant de réserver.</p>`,
      },
      {
        h2: 'Montants de caution et de franchise par véhicule',
        html: `<p>Voici les montants appliqués à chaque modèle de la flotte :</p>
<ul>
<li><a href="/vehicule/renault-clio-v">Renault Clio V</a> : caution 800 €, franchise 1 000 € ;</li>
<li>Peugeot 208 automatique : caution 900 €, franchise 1 000 € ;</li>
<li><a href="/vehicule/mercedes-classe-a-180">Mercedes Classe A 180</a> : caution 1 500 €, franchise 1 800 € ;</li>
<li>Tesla Model 3 : caution 2 000 €, franchise 2 500 € ;</li>
<li>Peugeot 5008 (7 places) : caution 1 500 €, franchise 1 800 € ;</li>
<li><a href="/vehicule/mercedes-glc-amg-line">Mercedes GLC (AMG Line)</a> : caution 3 000 €, franchise 3 500 € ;</li>
<li>Renault Kangoo Van 3 m³ : caution 1 000 €, franchise 1 200 € ;</li>
<li>Renault Trafic 6 m³ : caution 1 500 €, franchise 1 800 € ;</li>
<li>Renault Master 12 m³ : caution 2 000 €, franchise 2 200 € ;</li>
<li>utilitaire 20 m³ avec hayon : caution 2 500 €, franchise 2 800 € ;</li>
<li>Renault Trafic 9 places : caution 2 000 €, franchise 2 200 €.</li>
</ul>
<p>Plus le véhicule est haut de gamme ou volumineux, plus ces montants augmentent : de 800 € à 3 000 € pour la caution, de 1 000 € à 3 500 € pour la franchise. Ils sont rappelés sur chaque fiche véhicule.</p>`,
      },
      {
        h2: 'Comment fonctionne la caution par empreinte bancaire',
        html: `<p>Au départ, la caution est prise sur la carte bancaire que vous présentez avec votre permis de conduire et une pièce d’identité au nom du conducteur. Rien n’est débité : l’empreinte sert uniquement de garantie.</p>
<p>Au retour, l’empreinte est libérée, déduction faite d’éventuels frais, par exemple :</p>
<ul>
<li>le carburant manquant, facturé 14 € le huitième de réservoir ;</li>
<li>les kilomètres parcourus au-delà du forfait inclus, au tarif du véhicule ;</li>
<li>une journée supplémentaire en cas de retard de plus de 59 minutes ;</li>
<li>les dommages éventuels constatés au retour.</li>
</ul>
<p>Selon votre banque, une empreinte peut réduire temporairement le plafond disponible de votre carte : vérifiez-le avant le départ, surtout pour les montants élevés, comme les 3 000 € du Mercedes GLC ou les 2 500 € de l’utilitaire 20 m³.</p>`,
      },
      {
        h2: 'Protection Confort ou Sérénité : réduire la franchise',
        html: `<p>Deux protections, au choix, réduisent votre part en cas de sinistre :</p>
<ul>
<li><strong>Protection Confort, 12 € par jour</strong> : la franchise est divisée par deux ;</li>
<li><strong>Protection Sérénité, 22 € par jour</strong> : zéro franchise en cas de dommage ou de vol.</li>
</ul>
<p>Quelques exemples avec la Protection Confort : la franchise de la Clio V passe de 1 000 € à 500 €, celle de la Classe A de 1 800 € à 900 €, celle du GLC de 3 500 € à 1 750 €. Avec la Protection Sérénité, elle tombe à zéro pour tous les modèles.</p>
<p>Pour une location de 3 jours, comptez 36 € pour la Protection Confort et 66 € pour la Protection Sérénité ; sur 7 jours, 84 € et 154 €. En utilitaire, la Protection Confort ramène par exemple la franchise du Master 12 m³ de 2 200 € à 1 100 €. Certaines cartes bancaires incluent aussi une garantie pour la location de véhicule : les conditions varient beaucoup, vérifiez-les auprès de votre banque avant de décider.</p>`,
      },
      {
        h2: 'Jeune conducteur : une caution augmentée de 500 €',
        html: `<p>Si votre permis a moins de 3 ans, la caution est augmentée de 500 € et un supplément jeune conducteur de 15 € par jour s’applique, plafonné à 150 € par location. Quelques exemples de caution :</p>
<ul>
<li>Renault Clio V : 1 300 € au lieu de 800 € ;</li>
<li>Peugeot 208 automatique : 1 400 € au lieu de 900 € ;</li>
<li>Renault Kangoo Van 3 m³ : 1 500 € au lieu de 1 000 €.</li>
</ul>
<p>Les véhicules qui demandent 3 ans de permis, comme la Tesla Model 3 ou le Mercedes GLC, ne sont pas accessibles aux jeunes conducteurs. Quand on débute, une protection est d’autant plus rassurante : avec la Protection Sérénité, vous n’avez aucune franchise à payer en cas de dommage ou de vol.</p>`,
      },
      {
        h2: 'L’état des lieux, au départ comme au retour',
        html: `<p>L’état des lieux protège les deux parties. Au départ, faites le tour du véhicule avec la personne qui vous remet les clés et signalez chaque rayure, bosse ou impact, même minime, pour qu’il soit noté. Vérifiez aussi les jantes, le pare-brise, l’intérieur, le niveau de carburant et le kilométrage. Quelques réflexes utiles :</p>
<ul>
<li>prenez des photos datées, à la lumière du jour et sous plusieurs angles ;</li>
<li>signalez tout voyant allumé au tableau de bord avant de partir ;</li>
<li>au retour, refaites le tour ensemble et conservez une copie du document.</li>
</ul>
<p>En cas de dommage pendant la location, prévenez l’agence sans attendre au 07 49 58 81 44. Si un autre véhicule est en cause, remplissez un constat amiable avec l’autre conducteur ; en cas de vol, déposez plainte auprès de la police ou de la gendarmerie. Ces documents facilitent le traitement du dossier.</p>`,
      },
      {
        h2: 'Nos conseils pour une location sans mauvaise surprise',
        html: `<p>Quelques habitudes simples évitent les frais inutiles :</p>
<ul>
<li>choisissez la protection selon votre programme : stationnement en ville, long voyage, déménagement en utilitaire ;</li>
<li>rendez le véhicule avec le même niveau de carburant qu’au départ, ou avec au moins 70 % de charge pour la Tesla ;</li>
<li>surveillez l’heure de retour, car au-delà de 59 minutes de retard une journée supplémentaire est facturée ;</li>
<li>anticipez vos kilomètres, ou prenez l’option kilométrage illimité à 12 € par jour ;</li>
<li>en utilitaire, sanglez le chargement : un meuble qui bouge peut abîmer les parois ;</li>
<li>pour rouler hors de France, ajoutez l’option circulation en Europe, à 7 € par jour et 70 € au maximum ;</li>
<li>gardez votre confirmation de réservation, reçue par email, et suivez votre location depuis votre espace client.</li>
</ul>
<p>Pour comparer les modèles et leurs montants, parcourez notre offre de <a href="/location-voiture-bordeaux">location de voiture à Bordeaux</a>. Pour une question précise, l’agence vous répond au 07 49 58 81 44.</p>`,
      },
    ],
    faq: [
      { q: 'La caution est-elle débitée ?', a: 'Non. C’est une empreinte bancaire : elle n’est pas débitée et elle est libérée au retour, déduction faite d’éventuels frais.' },
      { q: 'Quelle est la différence entre caution et franchise ?', a: 'La caution est une garantie prise au départ ; la franchise est la somme qui reste à votre charge en cas de dommage ou de vol.' },
      { q: 'Comment supprimer la franchise ?', a: 'Avec la Protection Sérénité, à 22 € par jour, la franchise passe à zéro en cas de dommage ou de vol.' },
      { q: 'La caution est-elle plus élevée pour un jeune conducteur ?', a: 'Oui, elle augmente de 500 € quand le permis a moins de 3 ans : 1 300 € au lieu de 800 € pour une Clio V, par exemple.' },
      { q: 'Quand la caution est-elle libérée ?', a: 'Au retour du véhicule, déduction faite d’éventuels frais, comme du carburant manquant ou des kilomètres supplémentaires.' },
    ],
    related: ['/conditions-de-location', '/guides/location-voiture-jeune-conducteur', '/location-voiture-premium-bordeaux', '/faq'],
  },
  {
    path: '/guides/location-voiture-jeune-conducteur',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Location voiture jeune conducteur : le guide | PRISMA',
    description: 'Location voiture jeune conducteur : âge minimum, ancienneté de permis, supplément de 15 € par jour plafonné à 150 €, caution et conseils pour bien louer.',
    h1: 'Location de voiture jeune conducteur : conditions, coût et conseils',
    eyebrow: 'Guide jeune conducteur',
    lead: 'La location de voiture jeune conducteur n’a rien d’un parcours du combattant, à condition de connaître les règles avant de réserver. Âge minimum, ancienneté du permis, supplément et caution : voici ce qui s’applique chez PRISMA Automobiles, avec des exemples chiffrés et nos conseils pour louer l’esprit tranquille.',
    vehicles: ['v-clio', 'v-208', 'v-kangoo'],
    sections: [
      {
        h2: 'Location de voiture jeune conducteur : ce que prévoient les loueurs',
        html: `<p>Dans le secteur de la location, chaque loueur fixe ses propres règles pour les conducteurs récents : un âge minimum, une ancienneté de permis minimale, et souvent un supplément par jour de location. Ces conditions varient d’une agence à l’autre et, chez un même loueur, d’une catégorie de véhicule à l’autre.</p>
<p>Attention à ne pas confondre avec le permis probatoire : celui-ci relève du Code de la route, alors que la notion de jeune conducteur en location est définie par les conditions de chaque loueur. Chez PRISMA Automobiles, vous êtes considéré comme jeune conducteur si votre permis a <strong>moins de 3 ans</strong>.</p>
<p>Avant de comparer des prix, vérifiez donc toujours trois points : l’âge demandé, l’ancienneté de permis exigée pour le modèle choisi, et le montant exact du supplément. Le coût réel d’une location dépend ensuite du prix du véhicule, du supplément et, le cas échéant, de la protection choisie : comparez le total, pas seulement le prix affiché à la journée.</p>`,
      },
      {
        h2: 'Nos conditions d’âge et de permis, modèle par modèle',
        html: `<p>Tous nos véhicules demandent au moins 2 ans de permis. Voici les conditions exactes :</p>
<ul>
<li><strong>21 ans et 2 ans de permis</strong> : <a href="/vehicule/renault-clio-v">Renault Clio V</a>, <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a>, <a href="/vehicule/renault-kangoo-van-3m3">Renault Kangoo Van 3 m³</a>, Renault Trafic 6 m³ et Renault Master 12 m³ ;</li>
<li><strong>21 ans et 3 ans de permis</strong> : utilitaire 20 m³ avec hayon ;</li>
<li><strong>23 ans et 2 ans de permis</strong> : Mercedes Classe A 180 et Peugeot 5008 (7 places) ;</li>
<li><strong>23 ans et 3 ans de permis</strong> : Renault Trafic 9 places ;</li>
<li><strong>25 ans et 3 ans de permis</strong> : Tesla Model 3 et Mercedes GLC (AMG Line).</li>
</ul>
<p>En pratique, un jeune conducteur qui a entre 2 et 3 ans de permis peut louer la Clio V, la 208 automatique, le Kangoo Van, le Trafic 6 m³ et le Master 12 m³ dès 21 ans, puis la Classe A et le 5008 dès 23 ans.</p>`,
      },
      {
        h2: 'Le supplément jeune conducteur : combien ça coûte ?',
        html: `<p>Le supplément est de <strong>15 € par jour</strong>, plafonné à <strong>150 € par location</strong>. Le plafond est atteint à 10 jours : au-delà, le supplément ne bouge plus, quelle que soit la durée. Quelques exemples :</p>
<ul>
<li>2 jours : 30 € ;</li>
<li>3 jours : 45 € ;</li>
<li>5 jours : 75 € ;</li>
<li>10 jours : 150 € ;</li>
<li>12 jours : 150 €, grâce au plafond, au lieu de 180 €.</li>
</ul>
<p>Exemple : une Clio V louée 2 jours au départ de l’agence d’Yvrac coûte 78 € de location, plus 30 € de supplément, soit 108 € hors options. Pour une journée de Kangoo Van, comptez 45 € de location et 15 € de supplément, soit 60 €. Pour les locations plus longues, le prix de location bénéficie en outre des tarifs dégressifs automatiques : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</p>`,
      },
      {
        h2: 'Une caution augmentée de 500 €',
        html: `<p>Pour un jeune conducteur, la caution est augmentée de 500 €. Elle reste une empreinte bancaire : non débitée, elle est libérée au retour, déduction faite d’éventuels frais. Pour connaître votre montant, ajoutez simplement 500 € à la caution indiquée sur la fiche du véhicule :</p>
<ul>
<li>Renault Clio V : 1 300 € ;</li>
<li>Peugeot 208 automatique : 1 400 € ;</li>
<li>Renault Kangoo Van 3 m³ : 1 500 € ;</li>
<li>Renault Trafic 6 m³, Mercedes Classe A 180 et Peugeot 5008 : 2 000 € ;</li>
<li>Renault Master 12 m³ : 2 500 €.</li>
</ul>
<p>Vérifiez le plafond de votre carte bancaire avant le départ, et préparez vos pièces : permis de conduire, pièce d’identité au nom du conducteur et carte bancaire pour la caution.</p>`,
      },
      {
        h2: 'Quel véhicule choisir quand on débute ?',
        html: `<p>Parmi les modèles accessibles avec un permis récent, voici nos repères :</p>
<ul>
<li><strong>Renault Clio V</strong>, 39 € par jour : une citadine facile à garer, en boîte manuelle, avec 250 km inclus par jour, climatisation et régulateur de vitesse ;</li>
<li><strong>Peugeot 208 automatique</strong>, 49 € par jour : si vous préférez l’automatique ou si votre permis est limité à la boîte automatique, avec en prime une caméra de recul ;</li>
<li><strong>Renault Kangoo Van 3 m³</strong>, 45 € par jour : pour un petit déménagement étudiant ou le transport de quelques meubles, avec 150 km inclus par jour ;</li>
<li><strong>Mercedes Classe A 180</strong>, 69 € par jour, dès 23 ans : une compacte premium à boîte automatique, avec 300 km inclus par jour ;</li>
<li><strong>Peugeot 5008 (7 places)</strong>, 89 € par jour, dès 23 ans : pour partir à sept, avec un grand coffre.</li>
</ul>
<p>La Clio V, la 208 automatique et le Kangoo Van sont aussi les modèles dont la franchise est la plus basse de leur catégorie : 1 000 € pour la Clio et la 208, 1 200 € pour le Kangoo. Pour comparer les prix, consultez notre sélection de <a href="/location-voiture-pas-chere-bordeaux">location de voiture pas chère à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Jeune conducteur et utilitaire : le cas du déménagement',
        html: `<p>Un premier appartement, un changement de colocation, une rentrée étudiante : un jeune conducteur a souvent besoin d’un utilitaire. Trois de nos fourgons sont accessibles dès 21 ans et 2 ans de permis, avec ces repères de volume donnés à titre indicatif :</p>
<ul>
<li>le Renault Kangoo Van 3 m³, à 45 € par jour, pour quelques meubles et des cartons ;</li>
<li>le Renault Trafic 6 m³, à 65 € par jour, pour un studio peu meublé ;</li>
<li>le Renault Master 12 m³, à 79 € par jour, pour un studio meublé ou un petit deux-pièces.</li>
</ul>
<p>Tous se conduisent avec le permis B, avec 150 km inclus par jour. L’utilitaire 20 m³ avec hayon demande en revanche 3 ans de permis. Ajoutez si besoin le kit déménagement à 19 € le forfait : un diable, des sangles et six couvertures de protection.</p>`,
      },
      {
        h2: 'Nos conseils pour louer sereinement',
        html: `<p>Quelques habitudes simples pour une première location réussie :</p>
<ul>
<li><strong>choisissez une protection</strong> : la Protection Confort, à 12 € par jour, divise la franchise par deux, et la Protection Sérénité, à 22 € par jour, la ramène à zéro en cas de dommage ou de vol ;</li>
<li><strong>soignez l’état des lieux</strong> : photos datées au départ et au retour, chaque rayure signalée ;</li>
<li><strong>respectez le niveau de carburant</strong> : le carburant manquant est facturé 14 € le huitième de réservoir ;</li>
<li><strong>rentrez à l’heure</strong> : au-delà de 59 minutes de retard, une journée supplémentaire est facturée ;</li>
<li><strong>surveillez vos kilomètres</strong> : 250 km par jour sont inclus avec la Clio V et la 208, puis 0,25 € par kilomètre ;</li>
<li><strong>déclarez un second conducteur</strong> si vous partagez le volant : 6 € par jour, 60 € au maximum par conducteur ;</li>
<li><strong>réservez tôt</strong> : en ligne 24 h sur 24, avec un paiement en 3 ou 4 fois sans frais à partir de 150 €.</li>
</ul>
<p>Retrouvez les véhicules accessibles aux permis récents sur la page <a href="/location-voiture-jeune-conducteur-bordeaux">location de voiture jeune conducteur à Bordeaux</a>.</p>`,
      },
    ],
    faq: [
      { q: 'À partir de quel âge peut-on louer une voiture chez PRISMA Automobiles ?', a: 'Dès 21 ans pour la Clio V, la Peugeot 208 automatique et les utilitaires, avec au moins 2 ans de permis (3 ans pour le 20 m³).' },
      { q: 'Combien coûte le supplément jeune conducteur ?', a: '15 € par jour, plafonné à 150 € par location : 45 € pour 3 jours, 150 € pour 12 jours.' },
      { q: 'Peut-on louer avec moins de 2 ans de permis ?', a: 'Non, tous nos véhicules demandent au moins 2 ans de permis, et 3 ans pour certains modèles.' },
      { q: 'La caution est-elle plus élevée pour un jeune conducteur ?', a: 'Oui, elle est augmentée de 500 €, toujours par empreinte bancaire non débitée.' },
      { q: 'Un jeune conducteur peut-il louer un utilitaire ?', a: 'Oui, le Kangoo Van, le Trafic 6 m³ et le Master 12 m³ sont accessibles dès 21 ans et 2 ans de permis, avec le supplément et la caution majorée.' },
    ],
    related: ['/location-voiture-jeune-conducteur-bordeaux', '/location-voiture-pas-chere-bordeaux', '/guides/caution-franchise-protections-location', '/conditions-de-location'],
  },
  {
    path: '/guides/demenager-a-bordeaux-conseils',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Déménager à Bordeaux : planning, camion, conseils | PRISMA',
    description: 'Déménager à Bordeaux sans stress : planning, autorisation de stationnement en mairie, chargement, protection des meubles et utilitaire à retirer à Yvrac.',
    h1: 'Déménager à Bordeaux : le guide pratique, du planning au camion',
    eyebrow: 'Conseils déménagement',
    lead: 'Déménager à Bordeaux demande un peu d’organisation : stationnement en ville, rues parfois étroites, escaliers d’immeubles anciens et planning serré. Avec une bonne préparation et le bon utilitaire, la journée se déroule bien plus sereinement. Voici nos conseils concrets, de la préparation au retour du véhicule.',
    vehicles: ['v-master12', 'v-master20', 'v-trafic'],
    sections: [
      {
        h2: 'Déménager à Bordeaux : le planning pas à pas',
        html: `<ol>
<li><strong>Dès que la date est connue</strong> : réservez l’utilitaire et renseignez-vous auprès de la mairie sur l’autorisation de stationnement, au départ comme à l’arrivée.</li>
<li><strong>Les semaines précédentes</strong> : triez, donnez ou vendez ce que vous n’emportez pas, puis faites l’inventaire pour confirmer le volume.</li>
<li><strong>Au fil des jours</strong> : remplissez les cartons pièce par pièce, en notant sur chacun son contenu et sa pièce d’arrivée.</li>
<li><strong>La semaine précédente</strong> : effectuez vos changements d’adresse, confirmez l’aide de vos proches et vérifiez l’accès aux deux logements.</li>
<li><strong>La veille</strong> : désassemblez les grands meubles, videz et dégivrez le réfrigérateur, préparez un sac avec l’essentiel des premiers jours.</li>
<li><strong>Le jour J</strong> : retirez l’utilitaire tôt, chargez, roulez, déchargez, puis rendez le véhicule à l’heure prévue.</li>
</ol>
<p>Réserver l’utilitaire et lancer les démarches tôt vous laisse le choix du véhicule et de l’horaire. La réservation en ligne est ouverte 24 h sur 24, et la confirmation arrive immédiatement par email.</p>`,
      },
      {
        h2: 'L’autorisation de stationnement : à demander à la mairie',
        html: `<p>Dans les grandes agglomérations, stationner un véhicule de déménagement sur la voie publique demande souvent une autorisation de la mairie. Elle permet de réserver l’emplacement devant votre immeuble le jour J, au lieu de tourner à la recherche d’une place ou de stationner en double file.</p>
<ul>
<li>faites la demande <strong>à l’avance</strong>, auprès de la mairie de la commune concernée ;</li>
<li>si vous quittez une commune de la métropole pour une autre, renseignez-vous dans chacune ;</li>
<li>respectez ensuite les conditions indiquées : emplacement, horaires, signalisation éventuelle.</li>
</ul>
<p>Les modalités et les délais varient d’une commune à l’autre : consultez le site de votre mairie ou contactez ses services dès que votre date est fixée. Prévenez aussi votre syndic ou vos voisins, surtout s’il faut réserver l’ascenseur ou dégager un accès.</p>
<p>Le jour J, gardez l’autorisation à portée de main et installez-vous uniquement sur l’emplacement prévu, sans empiéter sur le passage des piétons.</p>`,
      },
      {
        h2: 'Rues étroites et centre-ville : anticiper la circulation',
        html: `<p>Le centre de Bordeaux mêle rues étroites, secteurs piétons et lignes de tramway. Un utilitaire y circule, mais chaque manœuvre se prépare :</p>
<ul>
<li>faites un repérage la veille : largeur de la rue, porches, arbres, balcons, endroit où décharger ;</li>
<li>renseignez-vous sur les règles d’accès du quartier, certaines rues étant piétonnes ou à accès limité ;</li>
<li>ne stationnez jamais sur les voies du tramway ni sur les pistes cyclables, même quelques minutes ;</li>
<li>ne bloquez ni les carrefours, ni les entrées de garage, ni les arrêts de bus ;</li>
<li>évitez les heures de pointe et prévoyez une personne pour vous guider en marche arrière.</li>
</ul>
<p>Dans le centre historique, un <a href="/vehicule/renault-trafic-6m3">Renault Trafic 6 m³</a> ou un <a href="/vehicule/renault-master-12m3">Renault Master 12 m³</a> se manœuvre plus facilement qu’une caisse de 20 m³, et la caméra de recul du Master aide à se placer au plus près de l’entrée. Pour une maison en périphérie, en revanche, l’<a href="/vehicule/utilitaire-20m3-hayon">utilitaire 20 m³ avec hayon</a> permet souvent de tout transporter en un seul trajet.</p>`,
      },
      {
        h2: 'Charger et protéger vos meubles',
        html: `<p>Le <strong>kit déménagement</strong>, à 19 € le forfait, réunit un diable, des sangles et six couvertures de protection. Complétez-le avec des cartons solides, du ruban adhésif, du film étirable et quelques sachets pour la visserie.</p>
<ul>
<li>enveloppez les meubles dans les couvertures et protégez les angles ;</li>
<li>gardez des cartons d’un poids raisonnable : les livres dans les petits, le linge dans les grands ;</li>
<li>désassemblez les grands meubles et gardez les vis dans un sachet fixé sur l’une des pièces ;</li>
<li>transportez le réfrigérateur debout si possible, et suivez les consignes du fabricant avant de le rebrancher ;</li>
<li>chargez d’abord les meubles lourds côté cabine, puis les cartons, en finissant par les objets fragiles ;</li>
<li>sanglez chaque rangée, aux anneaux d’arrimage du Master 12 m³ ou aux barres du 20 m³, pour que rien ne bouge.</li>
</ul>
<p>Le Master 12 m³ offre une hauteur intérieure de 1,90 m et le 20 m³ un hayon élévateur de 500 kg : de quoi charger armoires, électroménager et literie sans acrobatie.</p>`,
      },
      {
        h2: 'Portage et accès : ménager son dos et l’immeuble',
        html: `<p>Dans un immeuble ancien, le portage représente souvent l’essentiel de l’effort. Quelques réflexes rendent la journée plus sûre :</p>
<ul>
<li>portez avec les jambes, le dos droit, et à deux pour les meubles lourds ;</li>
<li>utilisez le diable du kit déménagement pour les cartons et l’électroménager, sur les paliers comme sur le trottoir ;</li>
<li>protégez les parties communes, rampes et angles de murs, avec des couvertures ou du carton ;</li>
<li>mesurez portes, escaliers et ascenseur avant de descendre un grand meuble : mieux vaut le désassembler que le forcer ;</li>
<li>prévoyez de l’eau et des pauses pour toute l’équipe.</li>
</ul>`,
      },
      {
        h2: 'Retrait à Yvrac ou livraison à votre adresse',
        html: `<p>L’agence d’Yvrac, au 72 bis avenue des Tabernottes, se trouve à environ 15 minutes de Bordeaux par la rocade, avec un parking gratuit. Le retrait du véhicule y est gratuit.</p>
<ul>
<li>horaires : du lundi au vendredi de 8 h 30 à 19 h, le samedi de 9 h à 18 h, fermé le dimanche ;</li>
<li>livraison à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km : 40 € à la remise, et 40 € de plus si vous faites reprendre l’utilitaire à votre nouvelle adresse, située elle aussi dans la zone ;</li>
<li>retour possible dans un autre point que le départ, avec le supplément du point choisi.</li>
</ul>
<p>Pour un déménagement vers une autre région, pensez au trajet retour : l’utilitaire se rend dans l’un de nos points, c’est-à-dire à Yvrac, à la gare Saint-Jean, à l’aéroport de Bordeaux-Mérignac ou à une adresse de Bordeaux Métropole, dans un rayon de 25 km.</p>
<p>Réservez en ligne 24 h sur 24, par téléphone ou par WhatsApp au 07 49 58 81 44, et consultez toute la gamme sur notre page <a href="/location-camion-demenagement-bordeaux">location de camion de déménagement à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Le jour J et le retour du véhicule',
        html: `<p>Commencez tôt : l’agence ouvre à 8 h 30 en semaine et à 9 h le samedi. Gardez un carton « premier soir » bien identifié (papiers, chargeurs, draps, nécessaire de toilette), et chargez-le en dernier pour le récupérer en premier.</p>
<p>Avant de rendre l’utilitaire :</p>
<ul>
<li>refaites le niveau de carburant, sinon le carburant manquant est facturé 14 € le huitième de réservoir ;</li>
<li>videz entièrement la caisse ; pour la rendre sans la nettoyer, choisissez l’option retour sans lavage à 25 € le forfait ;</li>
<li>surveillez l’heure, car au-delà de 59 minutes de retard une journée supplémentaire est facturée ;</li>
<li>vérifiez vos kilomètres : 150 km sont inclus par jour, puis de 0,30 € à 0,40 € le kilomètre selon le modèle.</li>
</ul>
<p>Au moment de rendre les clés, faites le tour du véhicule avec l’agence, comme au départ, et gardez une copie de l’état des lieux.</p>`,
      },
    ],
    faq: [
      { q: 'Faut-il une autorisation pour garer un camion de déménagement à Bordeaux ?', a: 'Dans les grandes villes, une autorisation de stationnement est souvent exigée pour occuper la voie publique : demandez-la à la mairie concernée, à l’avance.' },
      { q: 'Peut-on se faire livrer l’utilitaire ?', a: 'Oui, à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 €. Le retrait à l’agence d’Yvrac est gratuit.' },
      { q: 'Quel utilitaire pour un deux-pièces ?', a: 'À titre indicatif, un 12 m³ convient à un studio meublé ou à un petit deux-pièces ; pour un deux à trois pièces, prévoyez le 20 m³ avec hayon.' },
      { q: 'Quels jours l’agence est-elle ouverte ?', a: 'Du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h. Elle est fermée le dimanche.' },
      { q: 'Que contient le kit déménagement ?', a: 'Un diable, des sangles et six couvertures de protection, pour 19 € le forfait.' },
    ],
    related: ['/location-camion-demenagement-bordeaux', '/location-utilitaire-bordeaux', '/agences', '/guides/quel-utilitaire-pour-demenager', '/location-voiture-livraison-bordeaux'],
  },
  {
    path: '/guides/location-vehicule-professionnel-tva',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Location véhicule professionnel : TVA et prix HT | PRISMA',
    description: 'Location véhicule professionnel : prix HT, TVA à 20 %, facture au nom de la société, principe de récupération de la TVA, location ou achat, devis sur mesure.',
    h1: 'Location de véhicule professionnel : prix HT, TVA et facture',
    eyebrow: 'Guide professionnels',
    lead: 'La location de véhicule professionnel soulève toujours les mêmes questions : quel prix HT, quelle TVA, quelle facture, et que peut-on récupérer ? Voici comment fonctionne le mode Professionnel de PRISMA Automobiles, et les grands principes à connaître pour les artisans, les entreprises du BTP, les commerçants et les équipes en déplacement.',
    vehicles: ['v-kangoo', 'v-trafic', 'v-master12', 'v-208'],
    sections: [
      {
        h2: 'Location de véhicule professionnel : prix HT et TVA à 20 %',
        html: `<p>Sur le site, le mode « Professionnel » affiche tous les prix hors taxes. La TVA s’ajoute au taux normal de 20 % : le prix TTC est égal au prix HT multiplié par 1,2. Quelques exemples, par jour :</p>
<ul>
<li><a href="/vehicule/renault-kangoo-van-3m3">Renault Kangoo Van 3 m³</a> : 37,50 € HT, soit 45 € TTC ;</li>
<li><a href="/vehicule/renault-trafic-6m3">Renault Trafic 6 m³</a> : 54,17 € HT, soit 65 € TTC ;</li>
<li><a href="/vehicule/renault-master-12m3">Renault Master 12 m³</a> : 65,83 € HT, soit 79 € TTC ;</li>
<li>Peugeot 208 automatique : 40,83 € HT, soit 49 € TTC.</li>
</ul>
<p>Le montant réglé est le même pour tous : le mode Professionnel change l’affichage et la facturation, pas le prix. Sur un Kangoo Van, la TVA représente ainsi 7,50 € par jour ; loué 2 jours, il revient à 90 € TTC, soit 75 € HT et 15 € de TVA.</p>
<p>Activez le mode Professionnel dès votre recherche : tous les prix s’affichent alors hors taxes. Et quand vous comparez plusieurs offres, comparez toujours des prix de même nature, HT avec HT ou TTC avec TTC.</p>`,
      },
      {
        h2: 'Une facture au nom de votre société',
        html: `<p>En mode Professionnel, la facture est établie au nom de votre société, avec la TVA indiquée séparément. C’est la base de toute déduction : une facture établie au nom d’un particulier ne permet pas à l’entreprise de récupérer la TVA.</p>
<p>Au moment de réserver, renseignez avec soin la raison sociale et les coordonnées de l’entreprise, et vérifiez-les avant de valider. La confirmation arrive immédiatement par email, et vous suivez ensuite vos réservations depuis votre espace client.</p>
<p>Si plusieurs salariés réservent pour la même entreprise, convenez d’une seule façon de libeller la société : vos factures seront plus simples à classer et à rapprocher de vos dépenses.</p>`,
      },
      {
        h2: 'Récupérer la TVA : le principe et ses limites',
        html: `<p>En principe, une entreprise assujettie à la TVA peut déduire la TVA payée sur les dépenses nécessaires à son activité, à condition de disposer d’une facture en règle. Pour les véhicules, deux critères entrent en jeu :</p>
<ul>
<li><strong>le type de véhicule</strong> : la TVA sur un utilitaire affecté à l’activité est en règle générale déductible, alors que celle qui porte sur une voiture particulière est le plus souvent exclue, sauf pour certaines activités ;</li>
<li><strong>l’usage</strong> : le véhicule doit servir aux besoins de l’entreprise.</li>
</ul>
<p>Le carburant obéit lui aussi à des règles propres, qui varient selon le type de véhicule.</p>
<p>Attention aussi à votre régime : une entreprise qui ne facture pas de TVA, par exemple en franchise en base, ne peut pas la récupérer. Ces règles comportent des exceptions et peuvent évoluer : avant de compter sur une récupération, faites valider votre situation par votre conseil habituel ou par votre service des impôts des entreprises.</p>`,
      },
      {
        h2: 'Louer ou acheter un utilitaire : que choisir ?',
        html: `<p>L’achat se conçoit pour un véhicule utilisé tous les jours, sur toute l’année. Pour des besoins ponctuels, saisonniers ou variables, la location apporte de la souplesse :</p>
<ul>
<li>aucun achat à financer ni revente à organiser ;</li>
<li>le bon volume pour chaque mission : 3 m³ pour une intervention en ville, 20 m³ avec hayon pour une livraison de mobilier ;</li>
<li>un véhicule de remplacement pendant l’immobilisation du vôtre ;</li>
<li>un renfort pour absorber un pic d’activité ou un chantier supplémentaire.</li>
</ul>
<p>Au prix d’achat d’un utilitaire s’ajoutent l’assurance, l’entretien, les pneumatiques, le contrôle technique et la perte de valeur à la revente. En location, vous payez l’usage, pour la durée dont vous avez besoin.</p>
<p>Pour un besoin de plusieurs semaines, la location longue durée devient intéressante grâce aux tarifs dégressifs automatiques, jusqu’à 30 % de remise dès 28 jours. Voyez aussi notre offre de <a href="/location-voiture-au-mois-bordeaux">location au mois à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Plusieurs véhicules ou longue durée : le devis sur mesure',
        html: `<p>Pour équiper une équipe, un chantier ou une saison, PRISMA Automobiles établit un devis sur mesure, pour plusieurs véhicules ou une longue durée. Les tarifs dégressifs s’appliquent automatiquement à chaque location :</p>
<ul>
<li>5 % de remise dès 3 jours ;</li>
<li>10 % dès 5 jours ;</li>
<li>15 % dès 7 jours ;</li>
<li>20 % dès 14 jours ;</li>
<li>30 % dès 28 jours.</li>
</ul>
<p>Pour une demande de devis, précisez les véhicules souhaités, les dates et le lieu de remise : l’agence vous répond au 07 49 58 81 44, par téléphone ou par WhatsApp. Pensez aussi aux protections pour une équipe ou un chantier : avec la Protection Confort, la franchise du Master 12 m³ passe par exemple de 2 200 € à 1 100 €.</p>`,
      },
      {
        h2: 'Quel véhicule pour quel métier ?',
        html: `<p>Chaque métier a ses contraintes ; voici nos repères :</p>
<ul>
<li><strong>artisans et interventions en ville</strong> : le Kangoo Van 3 m³, avec cloison de séparation, porte latérale coulissante et anneaux d’arrimage ;</li>
<li><strong>BTP et second œuvre</strong> : le Trafic 6 m³, trois places pour l’équipe, portes arrière à 180° et 1 100 kg de charge utile, ou le Master 12 m³ et ses 1 300 kg pour les chantiers plus lourds, avec une hauteur intérieure de 1,90 m ;</li>
<li><strong>déménageurs, commerçants, livraison de mobilier</strong> : l’utilitaire 20 m³, son hayon élévateur de 500 kg, sa rampe et ses barres d’arrimage ;</li>
<li><strong>équipes en déplacement</strong> : le Renault Trafic 9 places ;</li>
<li><strong>rendez-vous clients</strong> : la Peugeot 208 automatique ou la Mercedes Classe A 180 ;</li>
<li><strong>déplacements de direction</strong> : la Tesla Model 3 ou le Mercedes GLC (AMG Line).</li>
</ul>
<p>Tous nos utilitaires se conduisent avec le permis B. Retrouvez la gamme sur notre page <a href="/location-utilitaire-bordeaux">location d’utilitaire à Bordeaux</a>.</p>`,
      },
      {
        h2: 'Artisans et chantiers : simplifier vos locations',
        html: `<p>Pour gagner du temps au quotidien :</p>
<ul>
<li>réservez en ligne 24 h sur 24 ou par WhatsApp, même depuis le chantier ;</li>
<li>retirez le véhicule gratuitement à l’agence d’Yvrac, avec parking gratuit, ou faites-le livrer à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 € ;</li>
<li>après un chantier poussiéreux, l’option retour sans lavage, à 25 € le forfait, vous évite le nettoyage ;</li>
<li>pour les longues tournées, l’option kilométrage illimité coûte 12 € par jour ;</li>
<li>déclarez les conducteurs supplémentaires de l’équipe, jusqu’à deux, à 6 € par jour chacun et 60 € au maximum par conducteur.</li>
</ul>
<p>En mode Professionnel, chaque location donne lieu à une facture au nom de votre société, pour un suivi simple de vos frais de déplacement.</p>`,
      },
    ],
    faq: [
      { q: 'Les prix sont-ils affichés HT pour les professionnels ?', a: 'Oui, en mode Professionnel, les prix sont affichés hors taxes et la facture est établie au nom de votre société.' },
      { q: 'Quel taux de TVA s’applique à une location de véhicule ?', a: 'Le taux normal de 20 %. Par exemple, un Kangoo Van à 37,50 € HT par jour revient à 45 € TTC.' },
      { q: 'Peut-on récupérer la TVA sur toutes les locations ?', a: 'Non, cela dépend du type de véhicule et de son usage : en règle générale, elle se récupère sur un utilitaire affecté à l’activité, rarement sur une voiture particulière. Faites valider votre cas par votre conseil ou par l’administration fiscale.' },
      { q: 'Proposez-vous des tarifs pour plusieurs véhicules ?', a: 'Oui, un devis sur mesure pour plusieurs véhicules ou une longue durée, avec des tarifs dégressifs jusqu’à 30 %.' },
      { q: 'Comment payer une location professionnelle ?', a: 'En ligne par carte bancaire, Apple Pay ou Google Pay, en 3 ou 4 fois sans frais à partir de 150 €, ou par virement bancaire : la facture et le RIB sont envoyés par email, et le véhicule est remis dès réception du virement.' },
    ],
    related: ['/professionnels', '/location-utilitaire-bordeaux', '/location-voiture-au-mois-bordeaux', '/guides/permis-b-utilitaire-3-5-tonnes'],
  },
  {
    path: '/guides/escapades-week-end-depuis-bordeaux',
    kind: 'guide',
    date: '2026-09-29',
    minutes: 6,
    title: 'Week-end au départ de Bordeaux en voiture | PRISMA',
    description: 'Week-end au départ de Bordeaux en voiture : bassin d’Arcachon, dune du Pilat, Saint-Émilion, Médoc, Cap Ferret, Entre-deux-Mers. Idées et véhicule à louer.',
    h1: 'Week-end au départ de Bordeaux en voiture : cinq idées d’escapades',
    eyebrow: 'Guide escapades',
    lead: 'Un week-end au départ de Bordeaux en voiture ouvre la porte à des paysages très variés : océan, dunes, vignobles et villages de pierre. Voici cinq idées d’escapades faciles à organiser, puis nos conseils pour choisir le véhicule et bien gérer kilomètres et horaires.',
    vehicles: ['v-clio', 'v-tesla', 'v-glc', 'v-5008'],
    sections: [
      {
        h2: 'Le bassin d’Arcachon et la dune du Pilat',
        html: `<p>À environ 1 h de route de Bordeaux, le bassin d’Arcachon est l’escapade classique. Montez au sommet de la dune du Pilat, la plus haute dune d’Europe, pour sa vue sur le bassin, le banc d’Arguin et l’océan. Prévoyez des chaussures adaptées au sable, de l’eau et de quoi vous protéger du soleil et du vent.</p>
<p>À Arcachon, flânez dans la Ville d’Hiver et ses villas, le long du front de mer, puis goûtez les huîtres du bassin dans l’un des ports ostréicoles. Depuis l’eau, on aperçoit l’île aux Oiseaux et ses cabanes tchanquées, perchées sur pilotis.</p>
<p>En été, arrivez tôt à la dune, très fréquentée. Hors saison, le bassin se découvre au calme, en longeant ses petits ports et ses plages.</p>`,
      },
      {
        h2: 'Saint-Émilion, village médiéval au cœur des vignes',
        html: `<p>À environ 40 minutes de Bordeaux, Saint-Émilion est un village médiéval entouré de vignobles, dont le paysage est inscrit au patrimoine mondial de l’Unesco. Ses ruelles pavées et pentues, appelées tertres, mènent à l’église monolithe, creusée dans la roche.</p>
<p>Laissez la voiture et découvrez le village à pied, avec des chaussures confortables. La tour du Roy offre une belle vue sur les toits et les vignes, et les macarons, spécialité du village, font un joli souvenir. De nombreux châteaux viticoles des environs proposent des visites et des dégustations, souvent sur réservation : renseignez-vous avant de partir.</p>`,
      },
      {
        h2: 'Le Médoc et ses châteaux',
        html: `<p>Au nord de Bordeaux, le long de l’estuaire de la Gironde, le Médoc aligne des domaines viticoles de renom. La route des Châteaux traverse notamment Margaux, Saint-Julien, Pauillac et Saint-Estèphe, entre vignes, chais et demeures élégantes.</p>
<p>De nombreux châteaux se visitent sur réservation : prévoyez votre programme à l’avance. Si vous faites des dégustations, désignez un conducteur qui ne boit pas, ou utilisez le crachoir : la route du retour doit rester un plaisir. Côté océan, le Médoc offre aussi de grandes plages et les lacs de Lacanau et d’Hourtin-Carcans pour prolonger le week-end.</p>
<p>Tout au nord, la pointe de Grave fait face à Royan, de l’autre côté de l’estuaire, et le phare de Cordouan, inscrit au patrimoine mondial de l’Unesco, se dresse au large.</p>`,
      },
      {
        h2: 'Le Cap Ferret, entre bassin et océan',
        html: `<p>Face à la dune du Pilat, de l’autre côté de la passe, la presqu’île du Cap Ferret sépare le bassin de l’océan. Côté bassin, ses villages ostréicoles, comme L’Herbe ou Le Canon, gardent leurs cabanes de bois ; côté océan, s’étendent de longues plages sauvages. Le phare du Cap Ferret offre une vue sur l’ensemble.</p>
<p>En voiture, la presqu’île se rejoint en contournant le bassin par le nord. En été, la circulation peut y être dense : partez tôt, et gardez de la marge pour le retour. Sur place, des pistes cyclables relient les villages : une bonne façon de laisser la voiture garée le temps d’une journée.</p>`,
      },
      {
        h2: 'L’Entre-deux-Mers, aux portes de l’agence',
        html: `<p>Entre la Garonne et la Dordogne, l’Entre-deux-Mers commence tout près de l’agence d’Yvrac. Ses petites routes vallonnées traversent les vignes et mènent à des bastides comme Créon ou Sauveterre-de-Guyenne, et à l’abbaye de La Sauve-Majeure, étape des chemins de Saint-Jacques-de-Compostelle.</p>
<p>Au sud, la bastide de Cadillac et son château des ducs d’Épernon bordent la Garonne. Pour une sortie plus sportive, la voie verte Roger-Lapébie, aménagée sur une ancienne voie ferrée, se parcourt à vélo au milieu des coteaux.</p>
<p>Pour un week-end de deux jours, associez par exemple Saint-Émilion et l’Entre-deux-Mers, à l’est de Bordeaux, puis le bassin d’Arcachon le lendemain. Ces petites routes conviennent parfaitement à une citadine : voyez notre page <a href="/location-voiture-entre-deux-mers">location de voiture dans l’Entre-deux-Mers</a>.</p>`,
      },
      {
        h2: 'Week-end au départ de Bordeaux en voiture : quel modèle choisir ?',
        html: `<p>Le bon véhicule dépend du nombre de passagers, des bagages et du programme :</p>
<ul>
<li><strong>à deux, en toute simplicité</strong> : la <a href="/vehicule/renault-clio-v">Renault Clio V</a>, 39 € par jour, 250 km inclus par jour, coffre de 2 valises ;</li>
<li><strong>en famille ou entre amis</strong> : le <a href="/vehicule/peugeot-5008-7-places">Peugeot 5008 (7 places)</a>, 89 € par jour, 300 km inclus par jour, coffre de 5 valises ;</li>
<li><strong>pour le confort premium</strong> : le Mercedes GLC (AMG Line), 139 € par jour, kilométrage illimité, sellerie cuir, sièges chauffants et audio premium ;</li>
<li><strong>en électrique</strong> : la <a href="/vehicule/tesla-model-3">Tesla Model 3</a>, 95 € par jour, 300 km inclus par jour et jusqu’à 500 km d’autonomie annoncée, à rendre avec au moins 70 % de charge.</li>
</ul>
<p>Avec de jeunes enfants, ajoutez un siège enfant ou un rehausseur : 5 € par jour, 40 € au maximum, jusqu’à trois. Le GLC, avec son kilométrage illimité, permet d’enchaîner le Médoc et le bassin sans compter.</p>
<p>Estimez vos kilomètres avant de partir : au-delà du forfait inclus, chaque kilomètre est facturé au tarif du véhicule, de 0,25 € pour la Clio à 0,30 € pour la Tesla et le 5008. Pour un programme chargé, l’option kilométrage illimité coûte 12 € par jour. Pour aller plus loin, voyez notre page <a href="/location-voiture-week-end-bordeaux">location de voiture pour le week-end</a>.</p>`,
      },
      {
        h2: 'Horaires, retrait et retour : organiser le week-end',
        html: `<p>L’agence d’Yvrac est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h. Elle est <strong>fermée le dimanche</strong> : organisez le départ et le retour en conséquence, par exemple un retrait le vendredi en fin de journée ou le samedi matin, et un retour le samedi avant 18 h ou le lundi matin.</p>
<ul>
<li>arrivée en train : récupérez la voiture à la gare Saint-Jean pour 25 €, clés remises en main propre à la sortie Belcier ;</li>
<li>arrivée en avion : rendez-vous au Hall B de l’aéroport de Bordeaux-Mérignac, au point de rendez-vous des loueurs, pour 35 € ;</li>
<li>la voiture peut aussi vous être livrée à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 € ;</li>
<li>le retour peut se faire dans un autre point : par exemple un retrait à la gare Saint-Jean et un retour gratuit à l’agence d’Yvrac, qui dispose d’un parking gratuit.</li>
</ul>
<p>Rendez la voiture avec le même niveau de carburant qu’au départ, et gardez de la marge sur l’horaire : au-delà de 59 minutes de retard, une journée supplémentaire est facturée. La réservation en ligne est ouverte 24 h sur 24, avec confirmation immédiate par email.</p>`,
      },
    ],
    faq: [
      { q: 'Combien de kilomètres sont inclus pour un week-end ?', a: '250 km par jour pour la Clio V, 300 km pour la Tesla Model 3 et le Peugeot 5008, et un kilométrage illimité pour le Mercedes GLC. L’option kilométrage illimité coûte 12 € par jour.' },
      { q: 'Peut-on rendre la voiture le dimanche ?', a: 'Non, l’agence est fermée le dimanche. Prévoyez un retour le samedi avant 18 h ou le lundi à partir de 8 h 30.' },
      { q: 'Peut-on partir à l’étranger pour un week-end prolongé ?', a: 'Oui, avec l’option circulation en Europe à 7 € par jour, plafonnée à 70 €, par exemple pour l’Espagne, le Portugal ou l’Italie.' },
      { q: 'Peut-on récupérer la voiture à la gare Saint-Jean ?', a: 'Oui, pour 25 € : les clés vous sont remises en main propre à la sortie Belcier.' },
      { q: 'Faut-il réserver à l’avance ?', a: 'C’est conseillé pour les week-ends. La réservation en ligne est ouverte 24 h sur 24, avec confirmation immédiate par email.' },
    ],
    related: ['/location-voiture-week-end-bordeaux', '/location-voiture-entre-deux-mers', '/location-suv-bordeaux', '/guides/louer-voiture-electrique-bordeaux'],
  },
  {
    path: '/guides',
    kind: 'page',
    title: 'Guides location voiture et utilitaire | PRISMA',
    description: 'Nos guides pratiques pour louer une voiture ou un utilitaire à Bordeaux : déménagement, permis B, minibus, électrique, caution, jeune conducteur, TVA.',
    h1: 'Nos guides pratiques',
    eyebrow: 'Conseils pratiques',
    lead: 'Nos guides pratiques de location de voiture et d’utilitaire répondent aux questions concrètes que l’on se pose avant de réserver. Choisir le bon volume, comprendre la caution, louer avec un permis récent ou préparer un week-end : l’agence PRISMA Automobiles d’Yvrac vous donne des repères clairs.',
    vehicles: [],
    sections: [
      {
        h2: 'Des repères concrets pour bien louer à Bordeaux',
        html: `<p>Chaque guide traite une question précise, avec les règles générales à connaître et les conditions exactes de PRISMA Automobiles : prix, cautions, kilomètres inclus, âge et permis requis. Vous déménagez ? Commencez par <a href="/guides/quel-utilitaire-pour-demenager">choisir le bon volume d’utilitaire</a>, puis préparez la journée avec nos <a href="/guides/demenager-a-bordeaux-conseils">conseils pour déménager à Bordeaux</a>.</p>
<p>Un doute sur votre permis ? Nos guides expliquent la règle des 3,5 tonnes et la conduite d’un minibus 9 places. Vous louez pour la première fois, avec un permis récent ou pour votre entreprise ? Caution, franchise, supplément jeune conducteur, prix HT et TVA n’auront plus de secret pour vous. Et pour souffler, nos idées d’escapades au départ de Bordeaux vous attendent. Vous vendez votre voiture ? Notre guide <a href="/guides/vendre-sa-voiture-demarches">vendre sa voiture</a> liste les documents et les démarches, du contrôle technique à la déclaration de cession. Chaque guide vous oriente ensuite vers les véhicules et les pages de location qui correspondent à votre projet.</p>`,
      },
    ],
    faq: [],
    related: [],
  },
  {
    path: '/faq',
    kind: 'page',
    title: 'FAQ location voiture et utilitaire Bordeaux | PRISMA',
    description: 'FAQ location voiture et utilitaire à Bordeaux : réservation, paiement, caution, franchise, horaires, retrait et déménagement. Les réponses de l’agence.',
    h1: 'Questions fréquentes',
    eyebrow: 'Vos questions, nos réponses',
    lead: 'Vous préparez une location de voiture ou d’utilitaire à Bordeaux ? Voici les réponses aux questions les plus courantes, classées par thème. Pour un cas particulier, l’agence d’Yvrac vous répond au 07 49 58 81 44, par téléphone ou sur WhatsApp.',
    vehicles: [],
    sections: [],
    groups: [
      {
        title: 'Réservation et paiement',
        items: [
          { q: 'Comment réserver un véhicule ?', a: 'En ligne, 24 h sur 24, sur le site ou depuis l’application à installer sur votre téléphone. Vous pouvez aussi réserver par téléphone ou par WhatsApp au 07 49 58 81 44.' },
          { q: 'Quand ma réservation est-elle confirmée ?', a: 'Immédiatement : la confirmation vous est envoyée par email. Vous suivez ensuite vos réservations depuis votre espace client.' },
          { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Le paiement se fait en ligne, par carte bancaire, Apple Pay ou Google Pay.' },
          { q: 'Peut-on payer en plusieurs fois ?', a: 'Oui, en 3 ou 4 fois sans frais, à partir de 150 €.' },
          { q: 'Les prix sont-ils affichés TTC ou HT ?', a: 'Les prix sont affichés TTC pour les particuliers. En mode Professionnel, ils sont affichés HT et la facture est établie au nom de la société : voir notre <a href="/professionnels">offre pour les professionnels</a>.' },
          { q: 'Puis-je annuler ma réservation ?', a: 'Oui, l’annulation est gratuite jusqu’à 48 h avant le départ. Au-delà, 50 % du montant reste dû.' },
        ],
      },
      {
        title: 'Conditions et documents',
        items: [
          { q: 'Quel âge faut-il avoir pour louer ?', a: 'Cela dépend du véhicule : 21 ans pour la Clio V, la Peugeot 208 automatique et les utilitaires, 23 ans pour la Mercedes Classe A, le Peugeot 5008 et le minibus 9 places, 25 ans pour la Tesla Model 3 et le Mercedes GLC.' },
          { q: 'Combien d’années de permis faut-il ?', a: 'Au moins 2 ans de permis, et 3 ans pour la Tesla Model 3, le Mercedes GLC, l’utilitaire 20 m³ avec hayon et le minibus 9 places.' },
          { q: 'Quels documents présenter au départ ?', a: 'Votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.' },
          { q: 'Qu’est-ce qu’un jeune conducteur chez PRISMA Automobiles ?', a: 'Un conducteur dont le permis a moins de 3 ans. Un supplément de 15 € par jour s’applique, plafonné à 150 € par location, et la caution est augmentée de 500 € : voir la <a href="/location-voiture-jeune-conducteur-bordeaux">location jeune conducteur</a>.' },
          { q: 'Peut-on ajouter un second conducteur ?', a: 'Oui, jusqu’à deux conducteurs supplémentaires, à 6 € par jour chacun, avec un plafond de 60 € par conducteur.' },
          { q: 'Le permis B suffit-il pour les utilitaires et le minibus ?', a: 'Oui, tous nos utilitaires et notre minibus 9 places se conduisent avec le permis B. Notre <a href="/guides/permis-b-utilitaire-3-5-tonnes">guide sur le permis B</a> explique la règle des 3,5 tonnes.' },
        ],
      },
      {
        title: 'Tarifs, caution et franchise',
        items: [
          { q: 'Comment fonctionne la caution ?', a: 'C’est une empreinte bancaire prise au départ : elle n’est pas débitée et elle est libérée au retour, déduction faite d’éventuels frais.' },
          { q: 'Quel est le montant de la caution ?', a: 'Il dépend du véhicule, de 800 € pour la Renault Clio V à 3 000 € pour le Mercedes GLC. Chaque fiche du <a href="/vehicules">catalogue</a> indique le montant exact.' },
          { q: 'Qu’est-ce que la franchise ?', a: 'C’est la somme qui reste à votre charge en cas de dommage ou de vol. Elle va de 1 000 € à 3 500 € selon le véhicule.' },
          { q: 'Comment réduire la franchise ?', a: 'La Protection Confort, à 12 € par jour, divise la franchise par deux. La Protection Sérénité, à 22 € par jour, la ramène à zéro en cas de dommage ou de vol : tout est détaillé dans notre <a href="/guides/caution-franchise-protections-location">guide caution et franchise</a>.' },
          { q: 'Existe-t-il des tarifs dégressifs ?', a: 'Oui, ils s’appliquent automatiquement : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.' },
          { q: 'Combien de kilomètres sont inclus ?', a: 'De 150 à 300 km par jour selon le véhicule, et un kilométrage illimité pour le Mercedes GLC. Au-delà, chaque kilomètre est facturé au tarif du véhicule, sauf si vous prenez l’option kilométrage illimité à 12 € par jour.' },
        ],
      },
      {
        title: 'Retrait, retour et horaires',
        items: [
          { q: 'Quels sont les horaires de l’agence ?', a: 'Du lundi au vendredi de 8 h 30 à 19 h, et le samedi de 9 h à 18 h. L’agence est fermée le dimanche.' },
          { q: 'Où se trouve l’agence ?', a: 'Au 72 bis avenue des Tabernottes, 33370 Yvrac, à environ 15 minutes de Bordeaux par la rocade. Le parking est gratuit.' },
          { q: 'Peut-on retirer le véhicule à la gare ou à l’aéroport ?', a: 'Oui : à la gare Saint-Jean pour 25 €, avec remise des clés en main propre à la sortie Belcier, et à l’aéroport de Bordeaux-Mérignac pour 35 €, au point de rendez-vous des loueurs du Hall B. Tous les détails sur la page <a href="/agences">points de retrait</a>.' },
          { q: 'Livrez-vous le véhicule à domicile ?', a: 'Oui, à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 €. Le supplément s’applique à la remise et, séparément, à la restitution : voir la <a href="/location-voiture-livraison-bordeaux">location avec livraison</a>.' },
          { q: 'Peut-on rendre le véhicule dans un autre point ?', a: 'Oui, le retour peut se faire dans un autre point que le départ. Il est gratuit à l’agence d’Yvrac ; ailleurs, le supplément du point de retour s’applique.' },
          { q: 'Que se passe-t-il en cas de retard ou de carburant manquant ?', a: 'Au-delà de 59 minutes de retard, une journée supplémentaire est facturée. Le véhicule, remis avec le plein, se rend avec le même niveau, sinon le carburant est facturé 14 € le huitième de réservoir ; la Tesla Model 3 se rend avec au moins 70 % de charge.' },
        ],
      },
      {
        title: 'Utilitaires et déménagement',
        items: [
          { q: 'Quel utilitaire choisir pour déménager ?', a: 'À titre indicatif : 3 m³ pour quelques meubles et cartons, 6 m³ pour un studio peu meublé, 12 m³ pour un studio meublé ou un petit deux-pièces, 20 m³ pour un deux à trois pièces ou une petite maison. Notre <a href="/guides/quel-utilitaire-pour-demenager">guide des volumes</a> vous aide à choisir.' },
          { q: 'Faut-il un permis spécial pour le 20 m³ ?', a: 'Non, il reste sous les 3,5 tonnes et se conduit avec le permis B, dès 21 ans et avec 3 ans de permis.' },
          { q: 'Quelle charge peut-on transporter ?', a: 'La charge utile est de 650 kg pour le Kangoo Van, 1 100 kg pour le Trafic 6 m³, 1 300 kg pour le Master 12 m³ et 950 kg pour le 20 m³, équipé d’un hayon élévateur de 500 kg. Comparez-les sur la page <a href="/location-utilitaire-bordeaux">location d’utilitaire</a>.' },
          { q: 'Que contient le kit déménagement ?', a: 'Un diable, des sangles et six couvertures de protection, pour 19 € le forfait. Pour rendre l’utilitaire sans le nettoyer, ajoutez l’option retour sans lavage à 25 €.' },
          { q: 'Combien de kilomètres sont inclus avec un utilitaire ?', a: '150 km par jour. Au-delà, le kilomètre est facturé de 0,30 € à 0,40 € selon le modèle, ou vous choisissez le kilométrage illimité à 12 € par jour.' },
          { q: 'Faut-il une autorisation de stationnement pour déménager ?', a: 'Dans les grandes agglomérations, elle est souvent exigée pour stationner sur la voie publique : demandez-la à la mairie, à l’avance. Nos <a href="/guides/demenager-a-bordeaux-conseils">conseils pour déménager à Bordeaux</a> détaillent la démarche.' },
        ],
      },
      {
        title: 'Achat, vente et dépôt-vente',
        items: [
          { q: 'Vendez-vous des voitures d’occasion ?', a: 'Oui, PRISMA Automobiles vend des véhicules neufs et d’occasion : retrouvez les annonces sur la page <a href="/vehicules-occasion">véhicules à vendre</a>.' },
          { q: 'Peut-on voir un véhicule avant de l’acheter ?', a: 'Oui, sur rendez-vous à l’agence d’Yvrac, pendant les horaires d’ouverture.' },
          { q: 'Rachetez-vous les voitures des particuliers ?', a: 'Oui : présentez-nous votre véhicule à l’agence, nous l’examinons et nous vous faisons une proposition. Voir le <a href="/rachat-voiture-bordeaux">rachat de voiture</a>.' },
          { q: 'Proposez-vous le dépôt-vente ?', a: 'Oui : nous vendons votre véhicule pour vous, et vous restez propriétaire jusqu’à la vente. Voir le <a href="/depot-vente-voiture-bordeaux">dépôt-vente de voiture</a>.' },
          { q: 'Que veut dire « dépôt-vente » sur une annonce ?', a: 'Le véhicule est vendu par l’agence pour le compte de son propriétaire. Les documents remis à l’achat sont les mêmes.' },
          { q: 'Quels documents sont remis à l’achat ?', a: 'Le certificat de cession, la carte grise barrée avec son coupon, un certificat de situation administrative de moins de 15 jours et, pour un véhicule de plus de 4 ans, un contrôle technique de moins de 6 mois.' },
        ],
      },
    ],
    faq: [],
    related: ['/conditions-de-location', '/agences', '/professionnels', '/guides'],
  },
  {
    path: '/conditions-de-location',
    kind: 'page',
    title: 'Conditions de location voiture et utilitaire | PRISMA',
    description: 'Conditions de location de voiture et d’utilitaire chez PRISMA Automobiles : âge, permis, documents, caution, franchise, carburant, kilométrage, annulation.',
    h1: 'Conditions de location',
    eyebrow: 'Avant de réserver',
    lead: 'Voici nos conditions de location de voiture et d’utilitaire, présentées simplement. Elles s’appliquent à toute réservation, en ligne, par téléphone ou par WhatsApp, et chaque fiche véhicule rappelle les montants propres au modèle choisi. Pour toute question, l’agence d’Yvrac vous répond au 07 49 58 81 44.',
    vehicles: [],
    sections: [
      {
        h2: 'Conducteur, permis et documents',
        html: `<p>Le conducteur doit avoir l’âge minimum et l’ancienneté de permis indiqués pour chaque véhicule :</p>
<ul>
<li><strong>21 ans et 2 ans de permis</strong> : Renault Clio V, Peugeot 208 automatique, Renault Kangoo Van 3 m³, Renault Trafic 6 m³, Renault Master 12 m³ ;</li>
<li><strong>21 ans et 3 ans de permis</strong> : utilitaire 20 m³ avec hayon ;</li>
<li><strong>23 ans et 2 ans de permis</strong> : Mercedes Classe A 180, Peugeot 5008 (7 places) ;</li>
<li><strong>23 ans et 3 ans de permis</strong> : Renault Trafic 9 places ;</li>
<li><strong>25 ans et 3 ans de permis</strong> : Tesla Model 3, Mercedes GLC (AMG Line).</li>
</ul>
<p>Tous nos utilitaires et le minibus se conduisent avec le permis B. Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.</p>`,
      },
      {
        h2: 'Jeune conducteur',
        html: `<p>Si votre permis a moins de 3 ans, deux conditions s’ajoutent :</p>
<ul>
<li>un supplément de <strong>15 € par jour</strong>, plafonné à <strong>150 € par location</strong> : 45 € pour 3 jours, 150 € pour 12 jours ;</li>
<li>une caution augmentée de <strong>500 €</strong>.</li>
</ul>
<p>Les véhicules qui demandent 3 ans de permis ne sont donc pas accessibles aux jeunes conducteurs. Plus de détails sur la page <a href="/location-voiture-jeune-conducteur-bordeaux">location de voiture jeune conducteur</a>.</p>`,
      },
      {
        h2: 'Caution par empreinte bancaire',
        html: `<p>La caution est prise au départ par empreinte bancaire. Elle n’est pas débitée et elle est libérée au retour du véhicule, déduction faite d’éventuels frais. Son montant dépend du véhicule :</p>
<ul>
<li>800 € : Renault Clio V ;</li>
<li>900 € : Peugeot 208 automatique ;</li>
<li>1 000 € : Renault Kangoo Van 3 m³ ;</li>
<li>1 500 € : Mercedes Classe A 180, Peugeot 5008, Renault Trafic 6 m³ ;</li>
<li>2 000 € : Tesla Model 3, Renault Master 12 m³, Renault Trafic 9 places ;</li>
<li>2 500 € : utilitaire 20 m³ avec hayon ;</li>
<li>3 000 € : Mercedes GLC.</li>
</ul>`,
      },
      {
        h2: 'Franchise et protections',
        html: `<p>La franchise est la somme qui reste à votre charge en cas de dommage ou de vol. Elle s’élève à 1 000 € pour la Clio V et la 208, 1 200 € pour le Kangoo Van, 1 800 € pour la Classe A, le 5008 et le Trafic 6 m³, 2 200 € pour le Master 12 m³ et le minibus, 2 500 € pour la Tesla, 2 800 € pour le 20 m³ et 3 500 € pour le GLC.</p>
<p>Deux protections, au choix, la réduisent :</p>
<ul>
<li><strong>Protection Confort</strong>, 12 € par jour : franchise divisée par deux ;</li>
<li><strong>Protection Sérénité</strong>, 22 € par jour : zéro franchise en cas de dommage ou de vol.</li>
</ul>`,
      },
      {
        h2: 'Carburant et recharge',
        html: `<p>Le véhicule vous est remis avec le plein et se rend avec le même niveau de carburant. À défaut, le carburant manquant est facturé 14 € le huitième de réservoir. La Tesla Model 3, électrique, se rend avec au moins 70 % de charge.</p>`,
      },
      {
        h2: 'Kilométrage',
        html: `<p>Chaque location inclut un nombre de kilomètres par jour, selon le véhicule :</p>
<ul>
<li>150 km par jour : Renault Kangoo Van 3 m³, Renault Trafic 6 m³, Renault Master 12 m³, utilitaire 20 m³ avec hayon ;</li>
<li>250 km par jour : Renault Clio V, Peugeot 208 automatique, Renault Trafic 9 places ;</li>
<li>300 km par jour : Mercedes Classe A 180, Tesla Model 3, Peugeot 5008 ;</li>
<li>kilométrage illimité : Mercedes GLC.</li>
</ul>
<p>Au-delà, chaque kilomètre est facturé au tarif du véhicule : 0,25 € pour la Clio V et la 208 ; 0,30 € pour la Tesla, le 5008 et le Kangoo Van ; 0,35 € pour la Classe A, le Trafic 6 m³, le Master 12 m³ et le minibus ; 0,40 € pour le 20 m³. L’option kilométrage illimité coûte 12 € par jour.</p>`,
      },
      {
        h2: 'Annulation et retard',
        html: `<p>L’annulation est gratuite jusqu’à 48 h avant le départ. Au-delà, 50 % du montant reste dû.</p>
<p>Le véhicule se rend à l’heure prévue : en cas de retard de plus de 59 minutes, une journée supplémentaire est facturée. Si vous êtes retardé, prévenez l’agence au 07 49 58 81 44.</p>`,
      },
      {
        h2: 'Retrait et retour',
        html: `<p>Le véhicule se retire et se rend dans l’un des points suivants. Le supplément s’applique à la remise du véhicule et, séparément, à sa restitution :</p>
<ul>
<li><strong>agence d’Yvrac</strong>, 72 bis avenue des Tabernottes, 33370 Yvrac : gratuit, avec parking gratuit ;</li>
<li><strong>gare Saint-Jean</strong>, Parvis Louis-Armand, 33800 Bordeaux : 25 €, clés remises en main propre à la sortie Belcier ;</li>
<li><strong>aéroport de Bordeaux-Mérignac</strong>, Hall B, 33700 Mérignac : 35 €, accueil au point de rendez-vous des loueurs ;</li>
<li><strong>livraison à votre adresse</strong> dans Bordeaux Métropole, dans un rayon de 25 km : 40 €.</li>
</ul>
<p>Le retour peut se faire dans un autre point que le départ : un retrait à la gare Saint-Jean et un retour à l’aéroport coûtent par exemple 25 € puis 35 €, soit 60 €. L’agence est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h ; elle est fermée le dimanche. Tous les détails sur la page <a href="/agences">points de retrait</a>.</p>`,
      },
      {
        h2: 'Réservation, paiement et tarifs dégressifs',
        html: `<p>Vous réservez en ligne 24 h sur 24, sur le site ou depuis l’application installable sur votre téléphone, avec confirmation immédiate par email et un espace client pour suivre vos réservations. La réservation est aussi possible par téléphone et par WhatsApp.</p>
<ul>
<li>paiement en ligne par carte bancaire, Apple Pay ou Google Pay ;</li>
<li>paiement en 3 ou 4 fois sans frais à partir de 150 € ;</li>
<li>prix affichés TTC pour les particuliers ; en mode Professionnel, prix HT et facture au nom de la société ;</li>
<li>tarifs dégressifs automatiques : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</li>
</ul>
<p>Les professionnels peuvent aussi demander un devis sur mesure pour plusieurs véhicules ou une longue durée : voir la page <a href="/professionnels">professionnels</a>.</p>`,
      },
      {
        h2: 'Options',
        html: `<p>Selon le véhicule choisi, les options suivantes peuvent compléter votre location :</p>
<ul>
<li>conducteur supplémentaire : 6 € par jour, 60 € au maximum par conducteur, jusqu’à deux conducteurs ;</li>
<li>Protection Confort : 12 € par jour, franchise divisée par deux ;</li>
<li>Protection Sérénité : 22 € par jour, zéro franchise en cas de dommage ou de vol ;</li>
<li>kilométrage illimité : 12 € par jour ;</li>
<li>siège enfant ou rehausseur : 5 € par jour, 40 € au maximum, jusqu’à trois sièges ;</li>
<li>kit déménagement : 19 € le forfait, avec un diable, des sangles et six couvertures de protection ;</li>
<li>retour sans lavage : 25 € le forfait ;</li>
<li>circulation en Europe : 7 € par jour, 70 € au maximum, pour rouler par exemple en Espagne, au Portugal ou en Italie.</li>
</ul>`,
      },
    ],
    faq: [
      { q: 'La caution est-elle encaissée ?', a: 'Non, c’est une empreinte bancaire non débitée, libérée au retour du véhicule, déduction faite d’éventuels frais.' },
      { q: 'Puis-je annuler sans frais ?', a: 'Oui, jusqu’à 48 h avant le départ. Au-delà, 50 % du montant reste dû.' },
      { q: 'Que se passe-t-il si je rends le véhicule sans avoir refait le plein ?', a: 'Le carburant manquant est facturé 14 € le huitième de réservoir.' },
      { q: 'Le supplément jeune conducteur est-il plafonné ?', a: 'Oui, il est de 15 € par jour dans la limite de 150 € par location, et la caution est augmentée de 500 €.' },
    ],
    related: ['/faq', '/agences', '/vehicules', '/guides/caution-franchise-protections-location'],
  },
]);

/* Contenu SEO : pages de location par catégorie de véhicule */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/location-voiture-bordeaux',
    kind: 'landing',
    title: 'Location voiture Bordeaux dès 39 € par jour | PRISMA',
    description: 'Location de voiture à Bordeaux dès 39 € par jour : citadine, SUV 7 places, Tesla ou Mercedes. Réservation en ligne 24 h sur 24 et retrait gratuit à Yvrac.',
    h1: 'Location de voiture à Bordeaux, de la citadine au SUV premium',
    eyebrow: 'Location à Bordeaux',
    lead: 'Besoin d’une location de voiture à Bordeaux ? PRISMA Automobiles vous propose une gamme qui va de la Renault Clio V à 39 € par jour au Mercedes GLC à 139 € par jour. Vous réservez en ligne 24 h sur 24, puis vous récupérez la voiture gratuitement à notre agence d’Yvrac, ou contre supplément à la gare Saint-Jean, à l’aéroport de Mérignac ou à votre adresse.',
    vehicles: ['v-clio', 'v-208', 'v-classea', 'v-tesla', 'v-5008', 'v-glc'],
    sections: [
      {
        h2: 'Location de voiture à Bordeaux : quel modèle choisir ?',
        html:
          '<p>Notre flotte répond aux besoins les plus courants, du trajet quotidien en ville au départ en vacances en famille. Prix TTC, par jour :</p>' +
          '<ul>' +
          '<li><strong>Renault Clio V, 39 €</strong> : citadine à boîte manuelle, avec climatisation, régulateur, Apple CarPlay et Android Auto.</li>' +
          '<li><strong>Peugeot 208 automatique, 49 €</strong> : le format citadin sans embrayage, avec caméra de recul.</li>' +
          '<li><strong>Mercedes Classe A 180, 69 €</strong> : compacte premium, écran MBUX et sièges chauffants.</li>' +
          '<li><strong>Peugeot 5008, 89 €</strong> : SUV 7 places à boîte automatique, coffre de 5 valises.</li>' +
          '<li><strong>Tesla Model 3, 95 €</strong> : berline électrique, jusqu’à 500 km d’autonomie annoncée.</li>' +
          '<li><strong>Mercedes GLC AMG Line, 139 €</strong> : SUV premium, sellerie cuir et kilométrage illimité.</li>' +
          '</ul>' +
          '<p>Chaque modèle est présenté en détail dans notre <a href="/vehicules">catalogue de véhicules</a>.</p>',
      },
      {
        h2: 'Réserver en ligne, par téléphone ou sur WhatsApp',
        html:
          '<p>La réservation en ligne est ouverte 24 h sur 24, sur notre site comme sur l’application installable sur votre téléphone. Vous choisissez vos dates, votre point de retrait et vos options, puis vous payez par carte bancaire, Apple Pay ou Google Pay.</p>' +
          '<p>La confirmation arrive immédiatement par email, et votre espace client vous permet de suivre vos réservations. Vous préférez passer par l’agence ? Appelez le 07 49 58 81 44 ou écrivez sur WhatsApp au même numéro. À partir de 150 €, le paiement en 3 ou 4 fois sans frais est possible.</p>',
      },
      {
        h2: 'Où récupérer votre voiture de location ?',
        html:
          '<p>Le départ et le retour peuvent se faire dans deux points différents. Le supplément s’applique à la remise et, séparément, à la restitution :</p>' +
          '<ul>' +
          '<li><strong>Agence d’Yvrac</strong>, 72 bis avenue des Tabernottes : gratuit, avec parking gratuit, à environ 15 minutes de Bordeaux par la rocade.</li>' +
          '<li><strong>Gare Saint-Jean</strong> : 25 €, clés remises en main propre à la sortie Belcier.</li>' +
          '<li><strong>Aéroport de Bordeaux-Mérignac</strong> : 35 €, accueil au point de rendez-vous des loueurs, Hall B.</li>' +
          '<li><strong>Livraison à votre adresse</strong> dans Bordeaux Métropole, dans un rayon de 25 km : 40 €.</li>' +
          '</ul>' +
          '<p>L’agence vous accueille du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h. Toutes les adresses sont réunies sur la page <a href="/agences">points de retrait</a>.</p>',
      },
      {
        h2: 'Les conditions essentielles avant de partir',
        html:
          '<ul>' +
          '<li><strong>Âge et permis</strong> : 21 ans et 2 ans de permis pour la Clio et la 208 ; 23 ans et 2 ans de permis pour la Classe A et le 5008 ; 25 ans et 3 ans de permis pour la Tesla et le GLC.</li>' +
          '<li><strong>Jeune conducteur</strong> : avec un permis de moins de 3 ans, supplément de 15 € par jour (150 € maximum par location) et caution augmentée de 500 €.</li>' +
          '<li><strong>Caution</strong> : empreinte bancaire non débitée, de 800 € pour la Clio à 3 000 € pour le GLC, libérée au retour, déduction faite d’éventuels frais.</li>' +
          '<li><strong>Carburant</strong> : plein au départ, même niveau au retour, sinon 14 € le huitième de réservoir. La Tesla se rend avec au moins 70 % de charge.</li>' +
          '<li><strong>Documents</strong> : permis de conduire, pièce d’identité au nom du conducteur et carte bancaire pour la caution.</li>' +
          '</ul>' +
          '<p>L’annulation est gratuite jusqu’à 48 h avant le départ. Tout le détail figure dans nos <a href="/conditions-de-location">conditions de location</a>.</p>',
      },
      {
        h2: 'Kilométrage inclus et tarifs dégressifs',
        html:
          '<p>Le forfait kilométrique dépend du modèle : 250 km par jour avec la Clio et la 208, 300 km avec la Classe A, la Tesla et le Peugeot 5008, kilométrage illimité avec le GLC. Au-delà, chaque kilomètre est facturé au tarif du véhicule, de 0,25 € à 0,35 €, sauf si vous prenez l’option kilométrage illimité à 12 € par jour.</p>' +
          '<p>Le prix par jour baisse aussi avec la durée, sans aucune démarche : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours. Pour plusieurs semaines, consultez notre page <a href="/location-voiture-au-mois-bordeaux">location de voiture au mois</a>.</p>',
      },
      {
        h2: 'Les options à ajouter selon votre trajet',
        html:
          '<ul>' +
          '<li><strong>Conducteur supplémentaire</strong> : 6 € par jour (60 € maximum), jusqu’à 2 conducteurs.</li>' +
          '<li><strong>Siège enfant ou rehausseur</strong> : 5 € par jour (40 € maximum), jusqu’à 3.</li>' +
          '<li><strong>Protection Confort</strong> : 12 € par jour, franchise divisée par deux.</li>' +
          '<li><strong>Protection Sérénité</strong> : 22 € par jour, zéro franchise en cas de dommage ou de vol.</li>' +
          '<li><strong>Circulation en Europe</strong> : 7 € par jour (70 € maximum), pour rouler en Espagne, au Portugal ou en Italie.</li>' +
          '</ul>' +
          '<p>Pour une escapade depuis Bordeaux, Saint-Émilion est à environ 40 minutes de route et le bassin d’Arcachon à environ 1 h.</p>',
      },
    ],
    faq: [
      { q: 'Quel est le prix d’une location de voiture à Bordeaux ?', a: 'Chez PRISMA Automobiles, comptez de 39 € par jour pour la Renault Clio V à 139 € par jour pour le Mercedes GLC, TTC. Le prix par jour baisse automatiquement dès 3 jours de location.' },
      { q: 'Où rendre la voiture en fin de location ?', a: 'À l’agence d’Yvrac, à la gare Saint-Jean, à l’aéroport de Mérignac ou à votre adresse dans Bordeaux Métropole. Le retour peut se faire ailleurs qu’au départ, avec le supplément du point choisi.' },
      { q: 'Quels documents présenter au départ ?', a: 'Votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour l’empreinte de caution, qui n’est pas débitée.' },
      { q: 'Quelles sont les conditions d’annulation ?', a: 'L’annulation est gratuite jusqu’à 48 h avant le départ. Au-delà, 50 % du montant de la location reste dû.' },
      { q: 'Quels sont les horaires de l’agence d’Yvrac ?', a: 'Du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h ; l’agence est fermée le dimanche. La réservation en ligne, elle, reste ouverte 24 h sur 24.' },
      { q: 'Quelle tolérance en cas de retard au retour ?', a: 'Au-delà de 59 minutes de retard, une journée supplémentaire est facturée. Prévoyez une marge, surtout aux heures de pointe sur la rocade.' },
    ],
    related: ['/location-voiture-pas-chere-bordeaux', '/location-voiture-automatique-bordeaux', '/location-voiture-gare-saint-jean', '/location-voiture-aeroport-merignac', '/location-utilitaire-bordeaux'],
  },
  {
    path: '/location-utilitaire-bordeaux',
    kind: 'landing',
    title: 'Location utilitaire Bordeaux : 3 à 20 m³ dès 45 € | PRISMA',
    description: 'Location d’utilitaire à Bordeaux dès 45 € par jour : Kangoo 3 m³, Trafic 6 m³, Master 12 m³ ou 20 m³ avec hayon, tous en permis B. Réservation en ligne.',
    h1: 'Location d’utilitaire à Bordeaux, du 3 au 20 m³',
    eyebrow: 'Utilitaires permis B',
    lead: 'Déménagement, chantier ou livraisons : chez PRISMA Automobiles, la location d’utilitaire à Bordeaux couvre quatre volumes, du Renault Kangoo Van 3 m³ à 45 € par jour à l’utilitaire 20 m³ avec hayon à 109 € par jour. Tous se conduisent avec le permis B et se réservent en ligne 24 h sur 24.',
    vehicles: ['v-kangoo', 'v-trafic', 'v-master12', 'v-master20'],
    sections: [
      {
        h2: 'Quel volume choisir pour votre location d’utilitaire à Bordeaux ?',
        html:
          '<p>Le bon utilitaire dépend de ce que vous transportez, mais aussi de la place dont vous disposez pour manœuvrer et stationner. Nos quatre modèles, du plus compact au plus grand :</p>' +
          '<ul>' +
          '<li><strong>Renault Kangoo Van 3 m³, 45 € par jour</strong> : 3,3 m³ de chargement, 650 kg de charge utile et 2 places. Porte latérale coulissante, cloison et anneaux d’arrimage, pour des cartons, un petit meuble ou des livraisons en ville.</li>' +
          '<li><strong>Renault Trafic 6 m³, 65 € par jour</strong> : 1 100 kg de charge utile et 3 places, porte latérale et portes arrière ouvrant à 180°. Le format polyvalent pour l’outillage ou quelques meubles.</li>' +
          '<li><strong>Renault Master 12 m³, 79 € par jour</strong> : 1 300 kg de charge utile, hauteur intérieure de 1,90 m et caméra de recul, pour un petit déménagement ou du matériel volumineux.</li>' +
          '<li><strong>Utilitaire 20 m³ avec hayon, 109 € par jour</strong> : le plus grand volume de la gamme, avec hayon élévateur de 500 kg, rampe et barres d’arrimage.</li>' +
          '</ul>' +
          '<p>Pour un déménagement complet, notre page <a href="/location-camion-demenagement-bordeaux">location de camion de déménagement</a> vous aide à estimer le volume.</p>',
      },
      {
        h2: 'Volume ou charge utile : le point à vérifier',
        html:
          '<p>Le volume indique la place disponible ; la charge utile, le poids que vous pouvez embarquer. Les deux ne vont pas toujours ensemble : notre 20 m³ offre le plus grand volume, mais sa charge utile est de 950 kg, quand le Master 12 m³ accepte 1 300 kg.</p>' +
          '<p>Pour des meubles, des matelas ou des cartons, raisonnez d’abord en volume. Pour des matériaux lourds (carrelage, sacs de ciment, gravats), regardez d’abord la charge utile, répartissez le poids sur le plancher et arrimez la charge avant de rouler.</p>',
      },
      {
        h2: 'Le permis B suffit pour tous nos utilitaires',
        html:
          '<p>Le permis B permet de conduire un véhicule de 3,5 tonnes maximum (PTAC). Tous nos utilitaires restent sous cette limite, y compris le 20 m³ avec hayon : aucun autre permis n’est nécessaire. Ils sont tous à boîte manuelle et roulent au diesel.</p>' +
          '<p>Il faut avoir 21 ans minimum et 2 ans de permis, ou 3 ans de permis pour le 20 m³. Avec un permis de moins de 3 ans, un supplément de 15 € par jour s’applique (150 € maximum par location) et la caution augmente de 500 €. Pour tout comprendre, lisez notre guide <a href="/guides/permis-b-utilitaire-3-5-tonnes">permis B et utilitaire de 3,5 tonnes</a>.</p>',
      },
      {
        h2: 'Kilomètres, carburant et options pratiques',
        html:
          '<p>Chaque utilitaire inclut 150 km par jour. Au-delà, le kilomètre coûte 0,30 € avec le Kangoo, 0,35 € avec le Trafic et le Master, 0,40 € avec le 20 m³ ; l’option kilométrage illimité, à 12 € par jour, évite de compter. Le véhicule est remis avec le plein et se rend au même niveau, sinon le carburant est facturé 14 € le huitième de réservoir.</p>' +
          '<ul>' +
          '<li><strong>Kit déménagement</strong>, 19 € le forfait : un diable, des sangles et six couvertures de protection.</li>' +
          '<li><strong>Retour sans lavage</strong>, 25 € le forfait : vous rendez l’utilitaire tel quel.</li>' +
          '<li><strong>Conducteur supplémentaire</strong>, 6 € par jour (60 € maximum), jusqu’à 2 : pour vous relayer au volant.</li>' +
          '</ul>',
      },
      {
        h2: 'Un utilitaire pour votre activité professionnelle',
        html:
          '<p>Artisans, entreprises du BTP, commerçants, déménageurs ou équipes en déplacement : activez le mode « Professionnel » pour afficher les prix HT et recevoir une facture au nom de votre société, avec TVA récupérable.</p>' +
          '<p>Pour plusieurs véhicules ou une longue durée, nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à 30 %. Réservez en ligne ou par WhatsApp au 07 49 58 81 44, et retrouvez nos solutions dédiées sur la page <a href="/professionnels">professionnels</a>.</p>',
      },
      {
        h2: 'Retrait, caution et documents',
        html:
          '<p>Le retrait est gratuit à l’agence d’Yvrac, où le parking est gratuit, à environ 15 minutes de Bordeaux par la rocade : pratique pour prendre en main un grand utilitaire loin du centre-ville. L’utilitaire peut aussi vous attendre à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou être livré à votre adresse dans Bordeaux Métropole (40 €).</p>' +
          '<p>La caution, par empreinte bancaire non débitée, va de 1 000 € pour le Kangoo à 2 500 € pour le 20 m³. Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.</p>',
      },
    ],
    faq: [
      { q: 'Quel permis pour louer un utilitaire à Bordeaux ?', a: 'Le permis B suffit pour tous nos utilitaires, du Kangoo 3 m³ au 20 m³ avec hayon, qui restent sous 3,5 tonnes. Il faut 21 ans et 2 ans de permis, ou 3 ans de permis pour le 20 m³.' },
      { q: 'Combien coûte la location d’un utilitaire ?', a: 'De 45 € par jour pour le Kangoo Van 3 m³ à 109 € par jour pour le 20 m³ avec hayon, TTC, avec 150 km inclus par jour. La remise est de 5 % dès 3 jours et monte jusqu’à 30 % dès 28 jours.' },
      { q: 'Quel utilitaire pour transporter des charges lourdes ?', a: 'Le Renault Master 12 m³, avec 1 300 kg de charge utile, puis le Trafic 6 m³ avec 1 100 kg. Le 20 m³ privilégie le volume : sa charge utile est de 950 kg.' },
      { q: 'Que contient le kit déménagement ?', a: 'Un diable, des sangles et six couvertures de protection, pour 19 € le forfait. Il se réserve en option avec l’utilitaire.' },
      { q: 'Comment obtenir une facture au nom de ma société ?', a: 'Choisissez le mode « Professionnel » lors de la réservation : les prix s’affichent HT et la facture est établie au nom de votre société, avec TVA récupérable.' },
      { q: 'Combien de kilomètres sont inclus avec un utilitaire ?', a: '150 km par jour, quel que soit le modèle. Au-delà, comptez de 0,30 € à 0,40 € par kilomètre, ou prenez l’option kilométrage illimité à 12 € par jour.' },
    ],
    related: ['/location-camion-demenagement-bordeaux', '/professionnels', '/guides/quel-utilitaire-pour-demenager', '/guides/location-vehicule-professionnel-tva'],
  },
  {
    path: '/location-camion-demenagement-bordeaux',
    kind: 'landing',
    title: 'Location camion déménagement Bordeaux : 6 à 20 m³ | PRISMA',
    description: 'Location de camion de déménagement à Bordeaux : 20 m³ avec hayon dès 109 € par jour, 12 m³ dès 79 €, permis B. Kit déménagement à 19 €, réservation en ligne.',
    h1: 'Location de camion de déménagement à Bordeaux, jusqu’à 20 m³',
    eyebrow: 'Spécial déménagement',
    lead: 'La location d’un camion de déménagement à Bordeaux se prépare avec soin : PRISMA Automobiles propose le Renault Trafic 6 m³, le Master 12 m³ et un camion 20 m³ avec hayon élévateur, tous conduits avec le permis B. Voici comment choisir le bon volume, anticiper le stationnement et charger vos meubles sans les abîmer.',
    vehicles: ['v-master20', 'v-master12', 'v-trafic'],
    sections: [
      {
        h2: 'Quel camion de déménagement pour votre logement ?',
        html:
          '<p>À titre indicatif, et selon la quantité de meubles, voici des repères pour choisir :</p>' +
          '<ul>' +
          '<li><strong>Trafic 6 m³</strong>, 65 € par jour : une chambre d’étudiant, un studio peu meublé ou quelques meubles à déplacer.</li>' +
          '<li><strong>Master 12 m³</strong>, 79 € par jour : un studio, voire un petit deux-pièces peu meublé.</li>' +
          '<li><strong>Camion 20 m³ avec hayon</strong>, 109 € par jour : un deux-pièces ; pour un logement plus grand, prévoyez souvent deux trajets.</li>' +
          '</ul>' +
          '<p>Le plus fiable reste de lister vos meubles et vos cartons. En cas d’hésitation, prenez le volume au-dessus : un aller-retour de plus fait perdre du temps et consomme des kilomètres. Notre guide <a href="/guides/quel-utilitaire-pour-demenager">quel utilitaire pour déménager</a> détaille la méthode.</p>',
      },
      {
        h2: 'Location de camion de déménagement 20 m³ avec hayon à Bordeaux',
        html:
          '<p>Notre camion 20 m³ est pensé pour le déménagement. Son hayon élévateur, d’une capacité de 500 kg, hisse jusqu’au plancher de la caisse le réfrigérateur, le lave-linge ou l’armoire, sans les porter à bout de bras. Une rampe et des barres d’arrimage complètent l’équipement.</p>' +
          '<p>Il reste sous 3,5 tonnes : le permis B suffit, avec 21 ans minimum et 3 ans de permis. Avec 950 kg de charge utile, c’est un camion de volume, adapté aux meubles et aux cartons plutôt qu’aux matériaux lourds. Toutes ses caractéristiques figurent sur la <a href="/vehicule/utilitaire-20m3-hayon">fiche du camion 20 m³</a>.</p>',
      },
      {
        h2: 'Le kit déménagement et les options utiles',
        html:
          '<p>Le kit déménagement, à 19 € le forfait, réunit un diable, des sangles et six couvertures de protection : de quoi rouler les cartons, maintenir la charge et éviter les rayures. D’autres options facilitent la journée :</p>' +
          '<ul>' +
          '<li><strong>Conducteur supplémentaire</strong> : 6 € par jour (60 € maximum), pour vous relayer entre deux trajets.</li>' +
          '<li><strong>Retour sans lavage</strong> : 25 € le forfait, pour rendre le camion tel quel après une longue journée.</li>' +
          '<li><strong>Kilométrage illimité</strong> : 12 € par jour, si votre nouveau logement est loin de Bordeaux.</li>' +
          '<li><strong>Protections</strong> : Confort à 12 € par jour (franchise divisée par deux) ou Sérénité à 22 € par jour (zéro franchise en cas de dommage ou de vol).</li>' +
          '</ul>',
      },
      {
        h2: 'Stationnement : pensez à l’autorisation de la mairie',
        html:
          '<p>Dans une grande agglomération comme Bordeaux, garer un camion sur la voie publique pendant un déménagement demande souvent une autorisation de stationnement. Adressez la demande à la mairie concernée, bien à l’avance, au départ comme à l’arrivée si nécessaire.</p>' +
          '<p>Repérez aussi l’accès : rue étroite, porche, portail, cour intérieure. En cas de doute sur le gabarit, l’agence vous conseille par téléphone ou WhatsApp au 07 49 58 81 44. Nos <a href="/guides/demenager-a-bordeaux-conseils">conseils pour déménager à Bordeaux</a> complètent cette préparation.</p>',
      },
      {
        h2: 'Bien charger votre camion',
        html:
          '<ul>' +
          '<li>Chargez d’abord les meubles lourds et volumineux, au fond de la caisse, puis les cartons.</li>' +
          '<li>Répartissez le poids sur toute la largeur et ne dépassez jamais la charge utile du véhicule.</li>' +
          '<li>Sanglez chaque rangée aux barres ou aux anneaux d’arrimage pour que rien ne bouge au freinage.</li>' +
          '<li>Protégez les meubles avec les couvertures ; retirez pieds, plateaux et étagères quand c’est possible.</li>' +
          '<li>Gardez à portée de main un carton avec l’essentiel de la première nuit.</li>' +
          '</ul>' +
          '<p>Au volant, anticipez les freinages et les virages : un camion chargé met plus de temps à s’arrêter qu’une voiture.</p>',
      },
      {
        h2: 'Kilomètres, carburant et retour du camion',
        html:
          '<p>Chaque camion inclut 150 km par jour. Au-delà, le kilomètre coûte 0,35 € pour le Trafic et le Master 12 m³, 0,40 € pour le 20 m³. Le camion se rend avec le même niveau de carburant qu’au départ, sinon 14 € sont facturés par huitième de réservoir.</p>' +
          '<p>Surveillez aussi l’heure : au-delà de 59 minutes de retard, une journée supplémentaire est facturée. L’agence d’Yvrac, où le retrait est gratuit, ouvre du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h ; elle est fermée le dimanche, un point à prendre en compte pour fixer vos dates.</p>',
      },
    ],
    faq: [
      { q: 'Quel permis pour conduire un camion de déménagement de 20 m³ ?', a: 'Le permis B suffit : notre camion 20 m³ avec hayon reste sous 3,5 tonnes. Il faut toutefois 21 ans minimum et 3 ans de permis.' },
      { q: 'Quel volume pour déménager un studio ?', a: 'À titre indicatif, le Master 12 m³ convient généralement à un studio, et un studio peu meublé peut tenir dans le Trafic 6 m³. En cas de doute, prenez le volume au-dessus.' },
      { q: 'À quoi sert le hayon élévateur ?', a: 'Il monte les charges lourdes jusqu’au plancher de la caisse, dans la limite de 500 kg, pour éviter de porter réfrigérateur ou lave-linge. Il équipe notre camion 20 m³.' },
      { q: 'Quelle autorisation pour garer le camion devant chez soi ?', a: 'Dans une grande agglomération, une autorisation de stationnement est souvent nécessaire pour un déménagement sur la voie publique. La demande se fait auprès de la mairie, bien à l’avance.' },
      { q: 'Combien coûte la location d’un camion de déménagement ?', a: 'Comptez 65 € par jour pour le Trafic 6 m³, 79 € pour le Master 12 m³ et 109 € pour le 20 m³ avec hayon, TTC, avec 150 km inclus par jour. Le kit déménagement coûte 19 € le forfait.' },
      { q: 'Comment payer un déménagement en plusieurs fois ?', a: 'À partir de 150 €, le paiement en ligne peut se faire en 3 ou 4 fois sans frais. L’annulation reste gratuite jusqu’à 48 h avant le départ.' },
    ],
    related: ['/location-utilitaire-bordeaux', '/guides/quel-utilitaire-pour-demenager', '/guides/demenager-a-bordeaux-conseils', '/guides/permis-b-utilitaire-3-5-tonnes'],
  },
  {
    path: '/location-minibus-9-places-bordeaux',
    kind: 'landing',
    title: 'Location minibus 9 places Bordeaux, permis B | PRISMA',
    description: 'Location de minibus 9 places à Bordeaux dès 115 € par jour : Renault Trafic climatisé à l’arrière, conduit avec le permis B. Idéal pour clubs et mariages.',
    h1: 'Location de minibus 9 places à Bordeaux',
    eyebrow: 'Minibus 9 places',
    lead: 'Club de sport, mariage ou sortie associative : la location de minibus 9 places à Bordeaux se fait chez PRISMA Automobiles avec le Renault Trafic 9 places, à 115 € par jour, climatisé à l’avant comme à l’arrière. Il se conduit avec le permis B et emmène jusqu’à neuf personnes, conducteur compris, avec de la place pour 6 valises.',
    vehicles: ['v-bus', 'v-5008'],
    sections: [
      {
        h2: 'Location de minibus 9 places à Bordeaux : le Trafic en détail',
        html:
          '<ul>' +
          '<li>9 places, conducteur compris, boîte manuelle et moteur diesel.</li>' +
          '<li>Climatisation avant et arrière, appréciable l’été pour les passagers du fond.</li>' +
          '<li>Régulateur de vitesse pour les longs trajets sur autoroute.</li>' +
          '<li>De la place pour 6 valises.</li>' +
          '<li>250 km inclus par jour, puis 0,35 € le kilomètre.</li>' +
          '</ul>' +
          '<p>Le tarif est de 115 € par jour TTC, avec une caution de 2 000 € par empreinte bancaire non débitée et une franchise de 2 200 €. Toutes ses caractéristiques sont sur la <a href="/vehicule/renault-trafic-9-places">fiche du Trafic 9 places</a>.</p>',
      },
      {
        h2: 'Minibus et permis B : ce qu’il faut savoir',
        html:
          '<p>Le permis B autorise la conduite d’un véhicule de 9 places au maximum, conducteur compris, et de 3,5 tonnes maximum. Notre minibus entre dans ce cadre : aucun autre permis n’est nécessaire. Attention toutefois : il est à boîte manuelle, et un permis limité à la boîte automatique ne permet pas de le conduire.</p>' +
          '<p>Nos conditions sont plus strictes que pour une citadine : 23 ans minimum et au moins 3 ans de permis, ce qui exclut les jeunes conducteurs, même avec supplément. Pour un long trajet, déclarez un conducteur supplémentaire (6 € par jour, 60 € maximum, jusqu’à 2). Notre guide <a href="/guides/location-minibus-9-places-permis-b">minibus 9 places et permis B</a> répond aux questions les plus fréquentes.</p>',
      },
      {
        h2: 'Clubs, mariages, associations : pour qui ?',
        html:
          '<ul>' +
          '<li><strong>Clubs et équipes sportives</strong> : un seul véhicule pour aller au match ou au tournoi, sacs de sport compris.</li>' +
          '<li><strong>Mariages et fêtes de famille</strong> : conduire les invités de la cérémonie à la réception sans multiplier les voitures.</li>' +
          '<li><strong>Associations</strong> : sorties, séjours, déplacements de bénévoles.</li>' +
          '<li><strong>Entreprises</strong> : emmener une équipe sur un chantier, un salon ou un séminaire.</li>' +
          '<li><strong>Groupes d’amis</strong> : une journée à Saint-Émilion, à environ 40 minutes, ou sur le bassin d’Arcachon, à environ 1 h de route.</li>' +
          '</ul>' +
          '<p>Voyager ensemble simplifie l’organisation : un seul plein, une seule place de stationnement, et tout le monde arrive en même temps. Pour un mariage, le minibus peut aussi faire les allers-retours entre la gare Saint-Jean et le lieu de réception pour les invités venus en train.</p>',
      },
      {
        h2: 'Bagages et confort à bord',
        html:
          '<p>Le Trafic 9 places accueille jusqu’à 6 valises. À neuf, privilégiez les sacs souples, plus faciles à caser que les valises rigides, et gardez les affaires du trajet à portée de main.</p>' +
          '<p>Si vous êtes sept au plus, le Peugeot 5008 est une autre option : boîte automatique, coffre de 5 valises, 89 € par jour. Comparez sur notre page <a href="/location-voiture-7-places-bordeaux">location de voiture 7 places</a>.</p>',
      },
      {
        h2: 'Réserver le minibus pour une date précise',
        html:
          '<p>Pour un mariage ou un tournoi, réservez dès que la date est fixée : la réservation en ligne est ouverte 24 h sur 24, la confirmation arrive immédiatement par email et l’annulation reste gratuite jusqu’à 48 h avant le départ.</p>' +
          '<p>Le minibus se récupère gratuitement à l’agence d’Yvrac, avec parking gratuit, ou contre supplément à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou à votre adresse dans Bordeaux Métropole (40 €). Au départ, le conducteur présente son permis, une pièce d’identité et une carte bancaire pour la caution.</p>',
      },
      {
        h2: 'Le budget d’une location de minibus',
        html:
          '<p>Le tarif de 115 € par jour baisse automatiquement avec la durée : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours. Le coût se partage facilement entre les passagers, et à partir de 150 € le paiement en 3 ou 4 fois sans frais est possible.</p>' +
          '<p>Pour un tournoi loin de Bordeaux, l’option kilométrage illimité, à 12 € par jour, évite de surveiller le compteur. Le minibus est remis avec le plein et se rend au même niveau, sinon le carburant est facturé 14 € le huitième de réservoir.</p>' +
          '<p>Pour une entreprise, le mode « Professionnel » affiche les prix HT et établit la facture au nom de la société, avec la TVA indiquée. Sa récupération dépend du véhicule et de votre activité : voir notre <a href="/guides/location-vehicule-professionnel-tva">guide sur la TVA</a>.</p>',
      },
    ],
    faq: [
      { q: 'Quel permis pour conduire un minibus 9 places ?', a: 'Le permis B, car le véhicule compte 9 places conducteur compris et reste sous 3,5 tonnes. Chez PRISMA Automobiles, il faut aussi 23 ans minimum et 3 ans de permis.' },
      { q: 'Combien coûte la location d’un minibus 9 places à Bordeaux ?', a: '115 € par jour TTC, avec 250 km inclus par jour et 0,35 € par kilomètre supplémentaire. Le prix par jour baisse automatiquement dès 3 jours.' },
      { q: 'Combien de bagages dans le minibus ?', a: 'Le Renault Trafic 9 places accueille jusqu’à 6 valises. Avec neuf passagers, les sacs souples se rangent plus facilement.' },
      { q: 'Quel confort pour les passagers à l’arrière ?', a: 'Le Trafic 9 places dispose d’une climatisation avant et arrière, et d’un régulateur de vitesse pour les longs trajets.' },
      { q: 'Comment ajouter un deuxième conducteur ?', a: 'Ajoutez l’option conducteur supplémentaire lors de la réservation : 6 € par jour (60 € maximum), jusqu’à 2 conducteurs en plus.' },
      { q: 'Où récupérer le minibus ?', a: 'Gratuitement à notre agence d’Yvrac, 72 bis avenue des Tabernottes, du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h. La gare, l’aéroport et la livraison sont possibles contre supplément.' },
    ],
    related: ['/location-voiture-7-places-bordeaux', '/guides/location-minibus-9-places-permis-b', '/location-voiture-week-end-bordeaux', '/professionnels'],
  },
  {
    path: '/location-voiture-7-places-bordeaux',
    kind: 'landing',
    title: 'Location voiture 7 places Bordeaux dès 89 € | PRISMA',
    description: 'Location de voiture 7 places à Bordeaux dès 89 € par jour : Peugeot 5008 automatique, grand coffre, sièges enfants en option. Réservez en ligne 24 h sur 24.',
    h1: 'Location de voiture 7 places à Bordeaux',
    eyebrow: 'Familles et groupes',
    lead: 'Vacances en famille, week-end entre amis : pour votre location de voiture 7 places à Bordeaux, PRISMA Automobiles propose le Peugeot 5008, un SUV familial à boîte automatique, à 89 € par jour. Si vous êtes plus nombreux, le Renault Trafic 9 places prend le relais à 115 € par jour, toujours avec le permis B.',
    vehicles: ['v-5008', 'v-bus'],
    sections: [
      {
        h2: 'Le Peugeot 5008, la voiture 7 places des familles',
        html:
          '<p>Le 5008 accueille sept personnes et dispose d’un grand coffre, prévu pour 5 valises. Sa boîte automatique et sa caméra de recul rendent la conduite simple, dans les rues de Bordeaux comme sur le parking d’une plage.</p>' +
          '<ul>' +
          '<li>89 € par jour TTC, 300 km inclus par jour, puis 0,30 € le kilomètre.</li>' +
          '<li>Moteur diesel et boîte automatique.</li>' +
          '<li>Caution de 1 500 € par empreinte bancaire, franchise de 1 800 €.</li>' +
          '<li>Conducteur de 23 ans minimum, avec 2 ans de permis.</li>' +
          '<li>Remis avec le plein, à rendre au même niveau (sinon 14 € le huitième de réservoir).</li>' +
          '</ul>' +
          '<p>Tous ses équipements sont détaillés sur la <a href="/vehicule/peugeot-5008-7-places">fiche du Peugeot 5008</a>.</p>',
      },
      {
        h2: 'Coffre et bagages : bien s’organiser à sept',
        html:
          '<p>Quand les sept places sont occupées, la troisième rangée réduit l’espace de chargement. Pour un départ en vacances à sept, préférez les sacs souples aux valises rigides et gardez le nécessaire du trajet dans l’habitacle.</p>' +
          '<p>À cinq, rabattez la dernière rangée pour retrouver tout le volume du coffre : une poussette, une glacière ou des sacs de plage y trouvent alors leur place bien plus facilement. Si vous êtes sept avec beaucoup de bagages, ou huit ou neuf, le Trafic 9 places emporte jusqu’à 6 valises.</p>',
      },
      {
        h2: 'Sièges enfants et confort de route',
        html:
          '<p>Le 5008 peut être équipé de sièges enfants ou de rehausseurs, en option à 5 € par jour (40 € maximum), jusqu’à 3. Réservez l’option en même temps que la voiture pour partir l’esprit tranquille.</p>' +
          '<p>Pour partager la route, l’option conducteur supplémentaire coûte 6 € par jour (60 € maximum), jusqu’à 2 conducteurs. Sur un long trajet, se relayer rend le voyage plus sûr et plus agréable pour tous.</p>',
      },
      {
        h2: 'Location de voiture 7 places à Bordeaux pour les vacances',
        html:
          '<p>Pour une semaine au bord de l’océan ou un séjour en Espagne, deux postes comptent : les kilomètres et la durée. Le 5008 inclut 300 km par jour ; pour aller plus loin, l’option kilométrage illimité coûte 12 € par jour. Hors de France, ajoutez la circulation en Europe (7 € par jour, 70 € maximum) pour l’Espagne, le Portugal ou l’Italie.</p>' +
          '<p>La remise atteint automatiquement 15 % dès 7 jours et 20 % dès 14 jours. Pour une sortie plus courte, le bassin d’Arcachon est à environ 1 h de route et Saint-Émilion à environ 40 minutes : piochez dans nos <a href="/guides/escapades-week-end-depuis-bordeaux">idées d’escapades depuis Bordeaux</a>.</p>',
      },
      {
        h2: '7 ou 9 places : que choisir ?',
        html:
          '<ul>' +
          '<li><strong>Peugeot 5008</strong> : 7 places, boîte automatique, coffre de 5 valises, 89 € par jour, dès 23 ans avec 2 ans de permis.</li>' +
          '<li><strong>Renault Trafic 9 places</strong> : 9 places, boîte manuelle, climatisation avant et arrière, 6 valises, 115 € par jour, dès 23 ans avec 3 ans de permis.</li>' +
          '</ul>' +
          '<p>Les deux se conduisent avec le permis B. Pour un club, une association ou un mariage, voyez notre page <a href="/location-minibus-9-places-bordeaux">location de minibus 9 places</a>. Pour une équipe en déplacement, le mode « Professionnel » affiche les prix HT et établit la facture au nom de la société.</p>',
      },
      {
        h2: 'Où récupérer votre voiture 7 places ?',
        html:
          '<p>Le retrait est gratuit à l’agence d’Yvrac, avec parking gratuit, à environ 15 minutes de Bordeaux par la rocade. Vous arrivez en train ? Les clés vous sont remises en main propre à la gare Saint-Jean, sortie Belcier (25 €). En avion, rendez-vous au Hall B de l’aéroport de Mérignac (35 €).</p>' +
          '<p>Avec la livraison à votre adresse dans Bordeaux Métropole (40 €), vous chargez les bagages devant chez vous, sans trajet supplémentaire. Le retour peut aussi se faire ailleurs qu’au départ : par exemple, un retrait à Yvrac et un retour à l’aéroport avant votre vol.</p>' +
          '<p>L’agence d’Yvrac vous accueille du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.</p>',
      },
    ],
    faq: [
      { q: 'Quel est le prix d’une voiture 7 places à Bordeaux ?', a: 'Le Peugeot 5008 7 places coûte 89 € par jour TTC, avec 300 km inclus par jour. La remise est de 5 % dès 3 jours et atteint 30 % dès 28 jours.' },
      { q: 'Quel âge pour louer le Peugeot 5008 ?', a: '23 ans minimum et 2 ans de permis. Avec un permis de moins de 3 ans, un supplément de 15 € par jour s’applique (150 € maximum par location) et la caution augmente de 500 €.' },
      { q: 'Quels sièges enfants en option ?', a: 'Des sièges enfants et des rehausseurs, à 5 € par jour (40 € maximum), jusqu’à 3 par location. Ils se réservent en même temps que la voiture.' },
      { q: 'Combien de valises dans une voiture 7 places ?', a: 'Le coffre du 5008 accueille jusqu’à 5 valises, moins lorsque la troisième rangée est utilisée. Pour plus de bagages, le Trafic 9 places en emporte jusqu’à 6.' },
      { q: 'Quelle boîte de vitesses pour le Peugeot 5008 ?', a: 'Le 5008 est en boîte automatique, pratique en ville comme sur la route des vacances. Le Trafic 9 places, lui, est en boîte manuelle.' },
      { q: 'Où récupérer la voiture en arrivant en train ?', a: 'À la gare Saint-Jean, pour 25 € : les clés vous sont remises en main propre à la sortie Belcier. Le retrait est gratuit à notre agence d’Yvrac.' },
    ],
    related: ['/location-minibus-9-places-bordeaux', '/location-suv-bordeaux', '/location-voiture-week-end-bordeaux', '/location-voiture-gare-saint-jean'],
  },
  {
    path: '/location-suv-bordeaux',
    kind: 'landing',
    title: 'Location SUV Bordeaux : familial ou premium | PRISMA',
    description: 'Location de SUV à Bordeaux dès 89 € par jour : Peugeot 5008 7 places ou Mercedes GLC AMG Line en kilométrage illimité. Boîte automatique, retrait à Yvrac.',
    h1: 'Location de SUV à Bordeaux : familial ou premium',
    eyebrow: 'SUV à Bordeaux',
    lead: 'Chez PRISMA Automobiles, la location de SUV à Bordeaux se décline en deux modèles très différents : le Peugeot 5008, SUV familial 7 places à 89 € par jour, et le Mercedes GLC AMG Line, SUV premium à 139 € par jour avec kilométrage illimité. Tous deux sont en boîte automatique et en motorisation diesel.',
    vehicles: ['v-5008', 'v-glc'],
    sections: [
      {
        h2: 'Location de SUV à Bordeaux : deux modèles, deux usages',
        html:
          '<p>Le choix se fait d’abord sur le nombre de passagers, puis sur le niveau de confort recherché.</p>' +
          '<ul>' +
          '<li><strong>Peugeot 5008</strong> : 7 places, coffre de 5 valises, caméra de recul. Le SUV des familles nombreuses et des départs en vacances.</li>' +
          '<li><strong>Mercedes GLC AMG Line</strong> : 5 places, coffre de 4 valises, sellerie cuir, sièges chauffants et système audio premium. Le SUV des longs trajets et des déplacements d’affaires.</li>' +
          '</ul>' +
          '<p>Tous deux offrent une position de conduite surélevée et une boîte automatique, appréciables sur la rocade comme sur les petites routes de l’Entre-deux-Mers.</p>',
      },
      {
        h2: 'Le Peugeot 5008 : l’espace avant tout',
        html:
          '<p>À 89 € par jour, le 5008 est le SUV le plus accessible de notre gamme. Il inclut 300 km par jour, puis 0,30 € le kilomètre, avec une caution de 1 500 € et une franchise de 1 800 €. Sa caméra de recul et sa boîte automatique facilitent les manœuvres d’un SUV de ce gabarit.</p>' +
          '<p>Il se loue dès 23 ans avec 2 ans de permis. Si votre permis a moins de 3 ans, comptez 15 € de plus par jour (150 € maximum par location) et une caution augmentée de 500 €. Pour voyager à sept, voyez aussi notre page <a href="/location-voiture-7-places-bordeaux">location de voiture 7 places</a>.</p>',
      },
      {
        h2: 'Le Mercedes GLC : kilométrage illimité et finition AMG Line',
        html:
          '<p>Le GLC est le seul modèle de notre flotte à inclure d’office le kilométrage illimité. Pour une tournée de plusieurs jours dans le Sud-Ouest ou un long trajet vers une autre région, vous roulez sans compter. Pour un aller-retour en Espagne, ajoutez simplement l’option circulation en Europe, à 7 € par jour (70 € maximum).</p>' +
          '<p>Sa finition AMG Line associe sellerie cuir, sièges chauffants et système audio premium. Il coûte 139 € par jour, avec une caution de 3 000 € et une franchise de 3 500 €, et se loue dès 25 ans avec 3 ans de permis. Voir la <a href="/vehicule/mercedes-glc-amg-line">fiche du Mercedes GLC</a>.</p>',
      },
      {
        h2: 'Quel SUV pour quel trajet ?',
        html:
          '<ul>' +
          '<li><strong>Vacances à six ou sept</strong> : le 5008, pour ses trois rangées de sièges et son coffre.</li>' +
          '<li><strong>Grands trajets à cinq</strong> : le GLC, dont le kilométrage illimité évite toute surprise au retour.</li>' +
          '<li><strong>Rendez-vous d’affaires ou arrivée à l’aéroport</strong> : le GLC, pour son confort et sa présentation soignée.</li>' +
          '<li><strong>Budget maîtrisé</strong> : le 5008, avec l’option kilométrage illimité à 12 € par jour si vous prévoyez de longues distances.</li>' +
          '</ul>' +
          '<p>Pour une journée dans les vignes de Saint-Émilion, à environ 40 minutes de Bordeaux, l’un comme l’autre fera parfaitement l’affaire. Pour une location plus longue, la remise s’applique automatiquement aux deux : 15 % dès 7 jours, 20 % dès 14 jours.</p>',
      },
      {
        h2: 'Caution, franchise et protections',
        html:
          '<p>La caution prend la forme d’une empreinte bancaire, non débitée et libérée au retour, déduction faite d’éventuels frais. Vérifiez que le plafond de votre carte le permet, surtout pour le GLC. Avec un permis de moins de 3 ans, seul le 5008 reste accessible, avec une caution augmentée de 500 € : le GLC exige 3 ans de permis.</p>' +
          '<p>Pour réduire la franchise, deux protections sont proposées : la Protection Confort, à 12 € par jour, la divise par deux ; la Protection Sérénité, à 22 € par jour, la ramène à zéro en cas de dommage ou de vol. Notre guide <a href="/guides/caution-franchise-protections-location">caution, franchise et protections</a> vous aide à choisir.</p>',
      },
      {
        h2: 'Réserver et récupérer votre SUV',
        html:
          '<p>Réservez en ligne 24 h sur 24, avec confirmation immédiate par email, ou par téléphone et WhatsApp au 07 49 58 81 44. Le retrait est gratuit à l’agence d’Yvrac, avec parking gratuit ; la gare Saint-Jean (25 €), l’aéroport de Mérignac (35 €) et la livraison dans Bordeaux Métropole (40 €) sont également possibles.</p>' +
          '<p>Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution. Le paiement se fait en ligne par carte bancaire, Apple Pay ou Google Pay, et en 3 ou 4 fois sans frais à partir de 150 €.</p>',
      },
    ],
    faq: [
      { q: 'Quel est le prix d’une location de SUV à Bordeaux ?', a: '89 € par jour pour le Peugeot 5008 7 places et 139 € par jour pour le Mercedes GLC AMG Line, TTC. Les remises dégressives s’appliquent automatiquement dès 3 jours.' },
      { q: 'Quel SUV inclut le kilométrage illimité ?', a: 'Le Mercedes GLC. Le Peugeot 5008 inclut 300 km par jour, avec une option kilométrage illimité à 12 € par jour.' },
      { q: 'Quel âge pour louer un SUV premium ?', a: '25 ans et 3 ans de permis pour le Mercedes GLC. Le Peugeot 5008 se loue dès 23 ans avec 2 ans de permis.' },
      { q: 'Quelle boîte de vitesses sur vos SUV ?', a: 'Le Peugeot 5008 et le Mercedes GLC sont tous deux en boîte automatique, avec une motorisation diesel.' },
      { q: 'Combien de places dans vos SUV ?', a: 'Sept dans le Peugeot 5008, cinq dans le Mercedes GLC. Pour neuf personnes, le Renault Trafic 9 places se conduit aussi avec le permis B.' },
      { q: 'Quel est le montant de la caution pour un SUV ?', a: '1 500 € pour le Peugeot 5008 et 3 000 € pour le Mercedes GLC, par empreinte bancaire non débitée. Pour le 5008, elle augmente de 500 € si votre permis a moins de 3 ans.' },
    ],
    related: ['/location-voiture-7-places-bordeaux', '/location-voiture-premium-bordeaux', '/location-voiture-automatique-bordeaux', '/location-voiture-aeroport-merignac'],
  },
  {
    path: '/location-voiture-electrique-bordeaux',
    kind: 'landing',
    title: 'Location voiture électrique Bordeaux en Tesla | PRISMA',
    description: 'Location de voiture électrique à Bordeaux : Tesla Model 3 dès 95 € par jour, jusqu’à 500 km d’autonomie annoncée et accès aux Superchargeurs Tesla.',
    h1: 'Location de voiture électrique à Bordeaux : la Tesla Model 3',
    eyebrow: 'Voiture électrique',
    lead: 'Chez PRISMA Automobiles, la location de voiture électrique à Bordeaux se fait en Tesla Model 3, à 95 € par jour, avec jusqu’à 500 km d’autonomie annoncée et l’accès aux Superchargeurs. Recharge, restitution, conditions : voici l’essentiel avant de réserver.',
    vehicles: ['v-tesla'],
    sections: [
      {
        h2: 'Location de Tesla à Bordeaux : la Model 3 en détail',
        html:
          '<p>La Model 3 est une berline électrique de 5 places, à boîte automatique, avec un coffre pour 3 valises. À bord, vous profitez de l’Autopilot, d’un toit panoramique et d’un écran central de 15 pouces qui regroupe la navigation et les principaux réglages.</p>' +
          '<ul>' +
          '<li>95 € par jour TTC, 300 km inclus par jour, puis 0,30 € le kilomètre.</li>' +
          '<li>Caution de 2 000 € par empreinte bancaire, franchise de 2 500 €.</li>' +
          '<li>Conducteur de 25 ans minimum, avec 3 ans de permis.</li>' +
          '<li>Remise automatique de 5 % dès 3 jours, 10 % dès 5 jours et 15 % dès 7 jours.</li>' +
          '</ul>' +
          '<p>Retrouvez tous les détails sur la <a href="/vehicule/tesla-model-3">fiche de la Tesla Model 3</a>.</p>',
      },
      {
        h2: 'Autonomie : jusqu’à 500 km annoncés',
        html:
          '<p>L’autonomie annoncée atteint 500 km. Sur la route, elle varie selon la vitesse, la température extérieure, le relief et l’usage du chauffage ou de la climatisation : elle diminue sur autoroute et par temps froid. L’écran central affiche la charge restante et l’autonomie estimée, ce qui aide à ajuster vos arrêts.</p>' +
          '<p>Pour une escapade à Saint-Émilion, à environ 40 minutes, ou sur le bassin d’Arcachon, à environ 1 h de route, partez avec une batterie bien chargée et gardez une marge pour le retour. Sur un long voyage, planifiez vos arrêts de recharge avant de partir.</p>',
      },
      {
        h2: 'Recharger pendant la location : nos conseils',
        html:
          '<ul>' +
          '<li><strong>Superchargeurs</strong> : la voiture a accès au réseau des Superchargeurs Tesla, que sa navigation vous aide à repérer sur votre itinéraire.</li>' +
          '<li><strong>Anticipation</strong> : n’attendez pas la réserve ; une recharge partielle est souvent plus rapide qu’une recharge complète.</li>' +
          '<li><strong>Conduite souple</strong> : des accélérations douces et des freinages anticipés préservent l’autonomie, car la voiture récupère de l’énergie à la décélération.</li>' +
          '<li><strong>Vitesse</strong> : sur autoroute, rouler un peu moins vite allonge sensiblement l’autonomie.</li>' +
          '<li><strong>Confort thermique</strong> : chauffage et climatisation puisent dans la batterie ; choisissez une température raisonnable.</li>' +
          '</ul>' +
          '<p>Notre guide <a href="/guides/louer-voiture-electrique-bordeaux">louer une voiture électrique à Bordeaux</a> détaille ces bonnes pratiques.</p>',
      },
      {
        h2: 'Restitution : au moins 70 % de charge',
        html:
          '<p>La Tesla se rend avec au moins 70 % de charge. Prévoyez un passage au Superchargeur avant le retour, en tenant compte du trajet jusqu’au point de restitution. Si vous la rendez à la gare ou à l’aéroport, repérez à l’avance un Superchargeur proche de votre itinéraire.</p>' +
          '<p>Intégrez ce temps de recharge à votre planning : au-delà de 59 minutes de retard, une journée supplémentaire est facturée. Le retour peut se faire à l’agence d’Yvrac (gratuit), à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou à votre adresse dans Bordeaux Métropole (40 €).</p>',
      },
      {
        h2: 'Les conditions pour louer la Tesla',
        html:
          '<p>La Tesla se loue à partir de 25 ans, avec au moins 3 ans de permis. Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour l’empreinte de caution de 2 000 €, non débitée et libérée au retour.</p>' +
          '<p>Pour limiter la franchise de 2 500 €, la Protection Confort (12 € par jour) la divise par deux et la Protection Sérénité (22 € par jour) la ramène à zéro en cas de dommage ou de vol. Les options conducteur supplémentaire (6 € par jour, 60 € maximum) et kilométrage illimité (12 € par jour) restent disponibles. L’ensemble des règles figure dans nos <a href="/conditions-de-location">conditions de location</a>.</p>',
      },
      {
        h2: 'Location de voiture électrique à Bordeaux : pour qui ?',
        html:
          '<p>La Model 3 convient à ceux qui veulent essayer l’électrique avant d’acheter, aux professionnels en rendez-vous dans la métropole et aux voyageurs qui apprécient le silence de roulement. En mode « Professionnel », les prix s’affichent HT, avec une facture au nom de votre société.</p>' +
          '<p>Pour une première prise en main, prenez quelques minutes au départ pour régler le siège, les rétroviseurs et l’écran. Vous avez moins de 25 ans ? La Peugeot 208 automatique, accessible dès 21 ans, offre elle aussi une conduite sans embrayage : voyez notre page <a href="/location-voiture-automatique-bordeaux">location de voiture automatique</a>.</p>',
      },
    ],
    faq: [
      { q: 'Quelle autonomie pour la Tesla Model 3 de location ?', a: 'Jusqu’à 500 km d’autonomie annoncée. L’autonomie réelle dépend de la vitesse, de la température et de l’usage du chauffage ou de la climatisation.' },
      { q: 'Combien coûte la location d’une Tesla à Bordeaux ?', a: '95 € par jour TTC, avec 300 km inclus par jour et 0,30 € par kilomètre supplémentaire. La remise atteint 10 % dès 5 jours de location.' },
      { q: 'Avec quel niveau de charge rendre la voiture ?', a: 'Avec au moins 70 % de charge. Prévoyez une recharge avant le retour, en tenant compte du trajet jusqu’au point de restitution.' },
      { q: 'Quelles conditions pour louer la Tesla ?', a: 'Avoir 25 ans minimum et 3 ans de permis, puis présenter un permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution de 2 000 €.' },
      { q: 'Où recharger la Tesla pendant la location ?', a: 'Sur le réseau des Superchargeurs Tesla, auquel la voiture a accès ; sa navigation vous aide à les repérer sur votre trajet.' },
      { q: 'Quelles options pour un long voyage en Tesla ?', a: 'L’option kilométrage illimité, à 12 € par jour, et, hors de France, la circulation en Europe, à 7 € par jour (70 € maximum), pour l’Espagne, le Portugal ou l’Italie.' },
    ],
    related: ['/guides/louer-voiture-electrique-bordeaux', '/location-voiture-premium-bordeaux', '/location-voiture-automatique-bordeaux', '/location-voiture-week-end-bordeaux'],
  },
  {
    path: '/location-voiture-premium-bordeaux',
    kind: 'landing',
    title: 'Location voiture premium Bordeaux : Mercedes | PRISMA',
    description: 'Location de voiture premium à Bordeaux dès 69 € par jour : Mercedes Classe A, Mercedes GLC AMG Line ou Tesla Model 3, pour vos rendez-vous et vos événements.',
    h1: 'Location de voiture premium à Bordeaux : Mercedes et Tesla',
    eyebrow: 'Gamme premium',
    lead: 'Rendez-vous d’affaires, mariage ou simple envie de confort : pour une location de voiture premium à Bordeaux, PRISMA Automobiles réunit la Mercedes Classe A 180 à 69 € par jour, la Tesla Model 3 à 95 € et le Mercedes GLC AMG Line à 139 €. Voici comment choisir, et ce que changent la caution et la franchise sur ces modèles.',
    vehicles: ['v-glc', 'v-classea', 'v-tesla'],
    sections: [
      {
        h2: 'Location de voiture premium à Bordeaux : trois modèles',
        html:
          '<ul>' +
          '<li><strong>Mercedes Classe A 180, 69 € par jour</strong> : compacte premium maniable en ville, avec écran MBUX, sièges chauffants et aide au stationnement. Essence, 3 valises.</li>' +
          '<li><strong>Tesla Model 3, 95 € par jour</strong> : berline électrique silencieuse, avec Autopilot, toit panoramique, écran de 15 pouces et jusqu’à 500 km d’autonomie annoncée.</li>' +
          '<li><strong>Mercedes GLC AMG Line, 139 € par jour</strong> : SUV premium avec sellerie cuir, sièges chauffants, système audio premium et kilométrage illimité. Diesel, 4 valises.</li>' +
          '</ul>' +
          '<p>Tous trois sont en boîte automatique. Vous cherchez une location de voiture de luxe à Bordeaux pour une grande occasion ? Le GLC est le modèle le plus haut de gamme de notre flotte.</p>',
      },
      {
        h2: 'Location de Mercedes à Bordeaux : Classe A ou GLC ?',
        html:
          '<p>La <a href="/vehicule/mercedes-classe-a-180">Mercedes Classe A 180</a> convient aux trajets urbains et aux déplacements professionnels : compacte et facile à garer, elle roule à l’essence et inclut 300 km par jour, puis 0,35 € le kilomètre. Elle se loue dès 23 ans avec 2 ans de permis.</p>' +
          '<p>Le <a href="/vehicule/mercedes-glc-amg-line">Mercedes GLC AMG Line</a> privilégie l’espace et le confort sur longue distance : cinq places, coffre de 4 valises, kilométrage illimité. Il roule au diesel, et sa sellerie cuir comme ses sièges chauffants soignent le confort des passagers. Il se loue dès 25 ans avec 3 ans de permis.</p>',
      },
      {
        h2: 'Pour vos rendez-vous d’affaires et vos événements',
        html:
          '<p>Pour accueillir un client ou rejoindre un séminaire, récupérez la voiture à l’aéroport de Mérignac, au Hall B (35 €), ou à la gare Saint-Jean, sortie Belcier (25 €). Nous pouvons aussi la livrer à votre hôtel ou à votre bureau, dans Bordeaux Métropole et dans un rayon de 25 km (40 €). Le retour peut se faire ailleurs qu’au départ : vous pouvez très bien la prendre à la gare Saint-Jean et la laisser à l’aéroport en repartant.</p>' +
          '<p>En mode « Professionnel », les prix s’affichent HT et la facture est établie au nom de votre société, avec la TVA indiquée : détails sur notre page <a href="/professionnels">professionnels</a>. Pour un mariage ou une soirée, réservez dès que la date est fixée ; l’annulation reste gratuite jusqu’à 48 h avant le départ.</p>',
      },
      {
        h2: 'Caution et franchise : ce qui change en premium',
        html:
          '<p>Sur ces modèles, la caution et la franchise sont plus élevées que sur une citadine :</p>' +
          '<ul>' +
          '<li>Mercedes Classe A : caution de 1 500 €, franchise de 1 800 €.</li>' +
          '<li>Tesla Model 3 : caution de 2 000 €, franchise de 2 500 €.</li>' +
          '<li>Mercedes GLC : caution de 3 000 €, franchise de 3 500 €.</li>' +
          '</ul>' +
          '<p>La caution est une empreinte bancaire, non débitée et libérée au retour, déduction faite d’éventuels frais. Vérifiez que le plafond de votre carte permet ce montant.</p>',
      },
      {
        h2: 'Protections : partir l’esprit tranquille',
        html:
          '<p>Deux protections réduisent la franchise en cas de dommage. La Protection Confort, à 12 € par jour, la divise par deux. La Protection Sérénité, à 22 € par jour, la ramène à zéro en cas de dommage ou de vol.</p>' +
          '<p>Sur un véhicule premium, la question mérite d’être posée avant le départ : le GLC porte la franchise la plus élevée de notre gamme. Notre guide <a href="/guides/caution-franchise-protections-location">caution, franchise et protections</a> vous aide à trancher.</p>',
      },
      {
        h2: 'Réservation et paiement',
        html:
          '<p>La réservation en ligne est ouverte 24 h sur 24, avec confirmation immédiate par email et espace client pour suivre vos réservations. Vous payez par carte bancaire, Apple Pay ou Google Pay, et en 3 ou 4 fois sans frais à partir de 150 €. Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.</p>' +
          '<p>Les tarifs dégressifs s’appliquent automatiquement : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours. Pour partager le volant lors d’un événement, l’option conducteur supplémentaire coûte 6 € par jour (60 € maximum).</p>',
      },
    ],
    faq: [
      { q: 'Quel est le prix d’une location de Mercedes à Bordeaux ?', a: '69 € par jour pour la Mercedes Classe A 180 et 139 € par jour pour le Mercedes GLC AMG Line, TTC. Le GLC inclut le kilométrage illimité.' },
      { q: 'Quel âge pour louer une voiture premium ?', a: '23 ans et 2 ans de permis pour la Classe A ; 25 ans et 3 ans de permis pour la Tesla Model 3 et le Mercedes GLC.' },
      { q: 'Quel est le montant de la caution sur une voiture premium ?', a: '1 500 € pour la Classe A, 2 000 € pour la Tesla et 3 000 € pour le GLC, par empreinte bancaire non débitée et libérée au retour.' },
      { q: 'Comment réduire la franchise ?', a: 'Avec la Protection Confort, à 12 € par jour, qui divise la franchise par deux, ou la Protection Sérénité, à 22 € par jour, qui la supprime en cas de dommage ou de vol.' },
      { q: 'Où récupérer une voiture premium à Bordeaux ?', a: 'Gratuitement à notre agence d’Yvrac, ou contre supplément à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou à votre adresse dans Bordeaux Métropole (40 €).' },
      { q: 'Comment louer une voiture premium pour mon entreprise ?', a: 'Activez le mode « Professionnel » : prix HT et facture au nom de votre société, avec la TVA indiquée. Pour plusieurs véhicules, nous établissons un devis sur mesure.' },
    ],
    related: ['/location-suv-bordeaux', '/location-voiture-electrique-bordeaux', '/location-voiture-aeroport-merignac', '/guides/location-vehicule-professionnel-tva'],
  },
  {
    path: '/location-voiture-automatique-bordeaux',
    kind: 'landing',
    title: 'Location voiture automatique Bordeaux dès 49 € | PRISMA',
    description: 'Location de voiture automatique à Bordeaux dès 49 € par jour : Peugeot 208, Mercedes Classe A, Tesla, 5008 7 places ou GLC. Réservez en ligne 24 h sur 24.',
    h1: 'Location de voiture automatique à Bordeaux',
    eyebrow: 'Boîte automatique',
    lead: 'Aux heures de pointe comme en centre-ville, une location de voiture automatique à Bordeaux rend la conduite plus sereine. PRISMA Automobiles propose cinq modèles à boîte automatique, de la Peugeot 208 à 49 € par jour au Mercedes GLC à 139 € par jour.',
    vehicles: ['v-208', 'v-classea', 'v-tesla', 'v-5008', 'v-glc'],
    sections: [
      {
        h2: 'Pourquoi choisir une boîte automatique à Bordeaux ?',
        html:
          '<p>Dans les embouteillages, la boîte automatique supprime l’embrayage et les changements de rapport : la conduite devient plus reposante, sur la rocade comme dans les rues du centre. Elle simplifie aussi les démarrages en côte et les manœuvres de stationnement, et réduit la fatigue sur les longs trajets.</p>' +
          '<p>Elle convient aux conducteurs habitués à l’automatique, à ceux dont le permis est limité à la boîte automatique et aux visiteurs qui découvrent la circulation bordelaise. Bon à savoir : la Renault Clio V et tous nos utilitaires, minibus compris, sont en boîte manuelle.</p>',
      },
      {
        h2: 'Location de voiture automatique à Bordeaux : de 49 € à 139 €',
        html:
          '<ul>' +
          '<li><strong>Peugeot 208 automatique, 49 €</strong> : citadine avec climatisation automatique, caméra de recul, CarPlay et Android Auto.</li>' +
          '<li><strong>Mercedes Classe A 180, 69 €</strong> : compacte premium, écran MBUX, sièges chauffants, aide au stationnement.</li>' +
          '<li><strong>Peugeot 5008, 89 €</strong> : SUV 7 places, coffre de 5 valises.</li>' +
          '<li><strong>Tesla Model 3, 95 €</strong> : berline électrique, jusqu’à 500 km d’autonomie annoncée.</li>' +
          '<li><strong>Mercedes GLC AMG Line, 139 €</strong> : SUV premium à kilométrage illimité.</li>' +
          '</ul>' +
          '<p>Les prix s’entendent TTC, par jour, et toutes ces voitures acceptent les mêmes options : conducteur supplémentaire, protections, siège enfant. Chaque modèle est présenté en détail dans notre <a href="/vehicules">catalogue de véhicules</a>.</p>',
      },
      {
        h2: 'La Peugeot 208 automatique, la solution citadine',
        html:
          '<p>Compacte et facile à garer, la <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a> est notre voiture automatique la plus accessible : 49 € par jour, 250 km inclus par jour, puis 0,25 € le kilomètre. Sa climatisation automatique maintient la température choisie, et CarPlay ou Android Auto affichent votre navigation sur l’écran de bord. Sa caution est de 900 € et sa franchise de 1 000 €.</p>' +
          '<p>Elle se loue dès 21 ans avec 2 ans de permis. Avec un permis de moins de 3 ans, un supplément de 15 € par jour s’applique (150 € maximum par location) et la caution augmente de 500 € : tous les détails sur notre page <a href="/location-voiture-jeune-conducteur-bordeaux">location de voiture jeune conducteur</a>.</p>',
      },
      {
        h2: 'Plus d’espace, plus de confort ou l’électrique',
        html:
          '<ul>' +
          '<li><strong>En famille</strong> : le Peugeot 5008 et ses 7 places, dès 23 ans avec 2 ans de permis.</li>' +
          '<li><strong>Pour le confort</strong> : la Mercedes Classe A, dès 23 ans avec 2 ans de permis, ou le Mercedes GLC, dès 25 ans avec 3 ans de permis.</li>' +
          '<li><strong>En électrique</strong> : la Tesla Model 3, dès 25 ans avec 3 ans de permis, à rendre avec au moins 70 % de charge.</li>' +
          '</ul>' +
          '<p>La Classe A, le 5008 et la Tesla incluent 300 km par jour ; le GLC, un kilométrage illimité. Sur une voiture électrique, aucun rapport ne se passe : l’accélération est continue et silencieuse. Découvrez notre page <a href="/location-voiture-electrique-bordeaux">location de voiture électrique</a>.</p>',
      },
      {
        h2: 'Réserver votre voiture automatique',
        html:
          '<p>Réservez en ligne 24 h sur 24, sur le site ou l’application installable sur votre téléphone ; la confirmation arrive immédiatement par email. L’annulation est gratuite jusqu’à 48 h avant le départ, et le paiement en 3 ou 4 fois sans frais est possible à partir de 150 €.</p>' +
          '<p>Le retrait est gratuit à l’agence d’Yvrac, à environ 15 minutes de Bordeaux par la rocade. Vous pouvez aussi récupérer la voiture à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou vous la faire livrer dans Bordeaux Métropole (40 €). Au départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution, qui n’est pas débitée.</p>',
      },
      {
        h2: 'Premiers kilomètres en automatique : quelques repères',
        html:
          '<ul>' +
          '<li>Conduisez avec le seul pied droit, qui passe de l’accélérateur au frein ; le pied gauche reste au repos.</li>' +
          '<li>Pied sur le frein, sélectionnez D pour avancer ou R pour reculer.</li>' +
          '<li>Pour stationner, passez en position P avant de quitter la voiture.</li>' +
          '<li>Dans les bouchons, laissez la boîte travailler : il suffit de doser l’accélérateur et le frein.</li>' +
          '</ul>' +
          '<p>Avant de quitter le parking, prenez un moment pour régler le siège et les rétroviseurs, puis pour repérer les commandes de la voiture.</p>',
      },
    ],
    faq: [
      { q: 'Quel est le prix d’une voiture automatique à Bordeaux ?', a: 'De 49 € par jour pour la Peugeot 208 automatique à 139 € par jour pour le Mercedes GLC, TTC. La remise atteint 10 % dès 5 jours de location.' },
      { q: 'Quelle voiture automatique pour un jeune conducteur ?', a: 'La Peugeot 208 automatique, accessible dès 21 ans avec 2 ans de permis. Avec moins de 3 ans de permis, comptez 15 € de supplément par jour, plafonné à 150 € par location.' },
      { q: 'Quels modèles sont en boîte manuelle ?', a: 'La Renault Clio V, nos utilitaires et le Trafic 9 places. Toutes nos autres voitures sont en boîte automatique.' },
      { q: 'Quelle voiture automatique pour une famille ?', a: 'Le Peugeot 5008, SUV 7 places à boîte automatique, à 89 € par jour, avec un coffre de 5 valises et une caméra de recul.' },
      { q: 'Comment réserver une voiture automatique ?', a: 'En ligne 24 h sur 24, avec confirmation immédiate par email, ou par téléphone et WhatsApp au 07 49 58 81 44.' },
      { q: 'Quelle voiture automatique pour de longs trajets ?', a: 'Le Mercedes GLC, en kilométrage illimité, ou un autre modèle avec l’option kilométrage illimité à 12 € par jour. La Tesla offre jusqu’à 500 km d’autonomie annoncée.' },
    ],
    related: ['/location-voiture-premium-bordeaux', '/location-voiture-7-places-bordeaux', '/location-suv-bordeaux', '/location-voiture-bordeaux'],
  },
  {
    path: '/location-voiture-pas-chere-bordeaux',
    kind: 'landing',
    title: 'Location voiture pas chère Bordeaux dès 39 € | PRISMA',
    description: 'Location de voiture pas chère à Bordeaux : Clio V dès 39 € par jour TTC, kilomètres inclus, retrait gratuit à Yvrac et annulation gratuite jusqu’à 48 h.',
    h1: 'Location de voiture pas chère à Bordeaux',
    eyebrow: 'Petit budget',
    lead: 'Une location de voiture pas chère à Bordeaux commence par un prix clair : chez PRISMA Automobiles, la Renault Clio V coûte 39 € par jour TTC, avec 250 km inclus. Comptez 49 € pour la Peugeot 208 automatique et, pour transporter, 45 € pour le Renault Kangoo Van. Voici comment garder la maîtrise de votre budget, du point de retrait aux options.',
    vehicles: ['v-clio', 'v-208', 'v-kangoo'],
    sections: [
      {
        h2: 'Location de voiture pas chère à Bordeaux : trois modèles économiques',
        html:
          '<ul>' +
          '<li><strong>Renault Clio V, 39 € par jour</strong> : citadine à boîte manuelle avec climatisation, Bluetooth, Apple CarPlay, Android Auto et régulateur. 250 km inclus par jour, caution de 800 €.</li>' +
          '<li><strong>Peugeot 208 automatique, 49 € par jour</strong> : notre voiture automatique la plus accessible, avec caméra de recul. 250 km inclus par jour, caution de 900 €.</li>' +
          '<li><strong>Renault Kangoo Van 3 m³, 45 € par jour</strong> : le petit utilitaire pour des cartons ou un meuble, avec 650 kg de charge utile. 150 km inclus par jour, caution de 1 000 €.</li>' +
          '</ul>' +
          '<p>Les trois se louent dès 21 ans avec 2 ans de permis. Les équipements de la citadine sont détaillés sur la <a href="/vehicule/renault-clio-v">fiche de la Renault Clio V</a>.</p>',
      },
      {
        h2: 'Des prix affichés sans surprise',
        html:
          '<p>Pour les particuliers, le prix affiché est TTC et comprend les kilomètres inclus du véhicule. Ce qui peut s’y ajouter est défini à l’avance :</p>' +
          '<ul>' +
          '<li>le supplément du point de retrait ou de retour, hors agence d’Yvrac ;</li>' +
          '<li>les options que vous choisissez ;</li>' +
          '<li>les kilomètres au-delà du forfait, de 0,25 € à 0,30 € selon ces modèles ;</li>' +
          '<li>le carburant manquant au retour, à 14 € le huitième de réservoir ;</li>' +
          '<li>le supplément jeune conducteur si votre permis a moins de 3 ans : 15 € par jour, 150 € maximum par location.</li>' +
          '</ul>',
      },
      {
        h2: 'Retrait gratuit à Yvrac : l’économie la plus simple',
        html:
          '<p>Récupérer et rendre la voiture à notre agence d’Yvrac, 72 bis avenue des Tabernottes, ne coûte rien, et le parking y est gratuit. L’agence se trouve sur la rive droite, à environ 15 minutes de Bordeaux par la rocade, et vous accueille du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.</p>' +
          '<p>Les autres points sont facturés à la remise et, séparément, à la restitution : 25 € à la gare Saint-Jean, 35 € à l’aéroport de Mérignac, 40 € pour une livraison à votre adresse. Un départ et un retour en gare représentent donc 25 € à l’aller et 25 € au retour. Plus d’informations sur la page <a href="/location-voiture-yvrac">location de voiture à Yvrac</a>.</p>',
      },
      {
        h2: 'Plus la location est longue, plus le prix par jour baisse',
        html:
          '<p>Les tarifs dégressifs s’appliquent automatiquement : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</p>' +
          '<p>Si vous hésitez sur la durée, comparez le total juste avant et juste après un palier de remise. Pour un besoin de plusieurs semaines, voyez notre page <a href="/location-voiture-au-mois-bordeaux">location de voiture au mois</a>.</p>',
      },
      {
        h2: 'Les options : lesquelles valent le coup ?',
        html:
          '<ul>' +
          '<li><strong>Utiles selon votre trajet</strong> : le conducteur supplémentaire (6 € par jour, 60 € maximum) si vous partagez le volant ; le siège enfant ou rehausseur (5 € par jour, 40 € maximum) si vous voyagez avec de jeunes enfants.</li>' +
          '<li><strong>À calculer</strong> : le kilométrage illimité (12 € par jour) ne se justifie que si vous dépassez nettement le forfait, à comparer au prix du kilomètre supplémentaire.</li>' +
          '<li><strong>À peser</strong> : la Protection Confort (12 € par jour) divise la franchise par deux, la Protection Sérénité (22 € par jour) la ramène à zéro. Mettez ce coût en regard de la franchise, 1 000 € sur la Clio.</li>' +
          '<li><strong>Souvent évitables</strong> : le retour sans lavage (25 €) si vous avez le temps de nettoyer, la circulation en Europe (7 € par jour) si vous restez en France.</li>' +
          '</ul>' +
          '<p>Notre guide <a href="/guides/caution-franchise-protections-location">caution, franchise et protections</a> vous aide à décider.</p>',
      },
      {
        h2: 'Annulation, paiement, retour : les bons réflexes',
        html:
          '<ul>' +
          '<li>Réservez sans risque : l’annulation est gratuite jusqu’à 48 h avant le départ ; au-delà, 50 % du montant reste dû.</li>' +
          '<li>Étalez la dépense : à partir de 150 €, le paiement en 3 ou 4 fois sans frais est possible.</li>' +
          '<li>Faites le plein avant le retour, pour éviter la facturation de 14 € par huitième de réservoir.</li>' +
          '<li>Soyez à l’heure : au-delà de 59 minutes de retard, une journée supplémentaire est facturée.</li>' +
          '</ul>',
      },
    ],
    faq: [
      { q: 'Quel est le prix de départ d’une location chez PRISMA Automobiles ?', a: '39 € par jour TTC pour la Renault Clio V, avec 250 km inclus par jour. Le prix par jour baisse ensuite automatiquement, dès 3 jours de location.' },
      { q: 'Où récupérer la voiture sans supplément ?', a: 'À notre agence d’Yvrac, 72 bis avenue des Tabernottes, où le retrait et le parking sont gratuits. La gare Saint-Jean, l’aéroport et la livraison coûtent respectivement 25 €, 35 € et 40 €.' },
      { q: 'Jusqu’à quand annuler gratuitement ?', a: 'Jusqu’à 48 h avant le départ. Au-delà, 50 % du montant de la location reste dû.' },
      { q: 'Comment payer en plusieurs fois ?', a: 'À partir de 150 €, vous pouvez régler votre location en 3 ou 4 fois sans frais, directement lors du paiement en ligne.' },
      { q: 'Comment fonctionne la caution ?', a: 'C’est une empreinte bancaire, non débitée : 800 € pour la Clio, 900 € pour la 208 et 1 000 € pour le Kangoo, plus 500 € si votre permis a moins de 3 ans. Elle est libérée au retour, déduction faite d’éventuels frais.' },
      { q: 'Quelles options sont vraiment utiles ?', a: 'Celles qui répondent à votre trajet : siège enfant si vous voyagez avec de jeunes enfants, conducteur supplémentaire si vous partagez le volant. Le kilométrage illimité ne se justifie que pour de longues distances.' },
    ],
    related: ['/location-voiture-yvrac', '/location-voiture-jeune-conducteur-bordeaux', '/location-voiture-week-end-bordeaux', '/location-voiture-bordeaux'],
  },
]);

/* Contenu SEO : landings locales (Yvrac, rive droite, Entre-deux-Mers, gare, aéroport, livraison, jeune conducteur, au mois, week-end) et page professionnels */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/location-voiture-yvrac',
    kind: 'landing',
    title: 'Location voiture Yvrac et utilitaires | PRISMA',
    description: 'Location voiture Yvrac et location utilitaire : agence PRISMA avec parking gratuit, retrait sans supplément, à environ 15 min de Bordeaux. Réservez en ligne.',
    h1: 'Location de voiture et d’utilitaire à Yvrac',
    eyebrow: 'Notre agence d’Yvrac',
    lead: 'Pour une location de voiture à Yvrac ou la location d’un utilitaire, l’agence PRISMA Automobiles vous accueille au 72 bis avenue des Tabernottes, avec un parking gratuit. Le retrait et le retour y sont sans supplément, à environ 15 minutes de Bordeaux par la rocade. Citadine, SUV 7 places ou utilitaire de 20 m³ : vous réservez en ligne et vous repartez les clés en main.',
    vehicles: ['v-clio', 'v-208', 'v-5008', 'v-kangoo', 'v-master12', 'v-master20'],
    sections: [
      {
        h2: 'Votre agence de location de voiture à Yvrac',
        html: '<p>L’agence PRISMA Automobiles se trouve au <strong>72 bis avenue des Tabernottes, 33370 Yvrac</strong>, à environ 15 minutes de Bordeaux par la rocade. Le parking est gratuit : vous vous garez sans chercher de place, le temps de récupérer ou de rendre votre véhicule.</p>' +
          '<p>C’est aussi le seul point de retrait sans supplément. La remise à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou à votre adresse (40 €) est facturée, puis de nouveau la restitution si vous y rendez le véhicule. En partant d’Yvrac et en y revenant, vous ne payez que la location et vos options.</p>',
      },
      {
        h2: 'Horaires d’ouverture et retours du week-end',
        html: '<ul><li><strong>Du lundi au vendredi</strong> : de 8 h 30 à 19 h</li><li><strong>Le samedi</strong> : de 9 h à 18 h</li><li><strong>Le dimanche</strong> : fermé</li></ul>' +
          '<p>Les départs et les retours ont lieu pendant ces horaires. La réservation, elle, reste ouverte 24 h sur 24, sur le site ou depuis l’application installable sur votre téléphone, avec une confirmation immédiate par email.</p>' +
          '<p>Pour un week-end, prévoyez le retour le samedi avant 18 h ou le lundi dès 8 h 30. Notre page <a href="/location-voiture-week-end-bordeaux">location de voiture pour le week-end</a> explique comment les jours sont alors comptés.</p>',
      },
      {
        h2: 'Location utilitaire à Yvrac : du Kangoo au 20 m³',
        html: '<p>Pour un déménagement, un achat encombrant ou un chantier, l’agence propose des utilitaires qui se conduisent tous avec le <strong>permis B</strong> :</p>' +
          '<ul><li><strong>Renault Kangoo Van</strong> : 3,3 m³ et 650 kg de charge, porte latérale coulissante, 45 € par jour ;</li><li><strong>Renault Trafic 6 m³</strong> : 1 100 kg de charge, 3 places et portes arrière à 180°, 65 € par jour ;</li><li><strong>Renault Master 12 m³</strong> : 1 300 kg de charge, 1,90 m de hauteur intérieure, caméra de recul, 79 € par jour ;</li><li><strong>Utilitaire 20 m³ avec hayon</strong> : hayon élévateur de 500 kg, rampe et barres d’arrimage, 109 € par jour, avec 3 ans de permis.</li></ul>' +
          '<p>Chaque utilitaire inclut 150 km par jour. Le kit déménagement (diable, sangles, six couvertures de protection) coûte 19 € le forfait. Pour comparer tous les volumes, consultez la page <a href="/location-utilitaire-bordeaux">location d’utilitaire à Bordeaux</a>.</p>',
      },
      {
        h2: 'Quelle voiture louer à l’agence ?',
        html: '<ul><li><strong>Renault Clio V</strong> (39 € par jour) : la citadine à boîte manuelle pour la ville et les trajets du quotidien, avec 250 km inclus par jour.</li><li><strong>Peugeot 208 automatique</strong> (49 € par jour) : le même format avec une boîte automatique et une caméra de recul, reposante en circulation dense.</li><li><strong>Peugeot 5008</strong> (89 € par jour) : 7 places et 5 valises pour les sorties en famille, dès 23 ans et 2 ans de permis.</li></ul>' +
          '<p>Tous les équipements du SUV sont détaillés sur la fiche du <a href="/vehicule/peugeot-5008-7-places">Peugeot 5008 7 places</a>.</p>',
      },
      {
        h2: 'Remise des clés : ce qu’il faut apporter',
        html: '<p>Au départ, présentez trois documents :</p>' +
          '<ol><li>votre <strong>permis de conduire</strong>, obtenu depuis au moins 2 ans (3 ans pour certains véhicules) ;</li><li>une <strong>pièce d’identité</strong> au nom du conducteur ;</li><li>une <strong>carte bancaire</strong> pour la caution.</li></ol>' +
          '<p>La caution est prise par empreinte bancaire : elle n’est pas débitée et elle est libérée au retour, déduction faite d’éventuels frais. Le véhicule est remis avec le plein et se rend avec le même niveau, sinon le carburant est facturé 14 € le huitième de réservoir. Tout est précisé dans nos <a href="/conditions-de-location">conditions de location</a>.</p>' +
          '<p>Au retour, deux règles à garder en tête : un retard de plus de 59 minutes entraîne la facturation d’une journée supplémentaire, et les kilomètres au-delà du forfait sont facturés au tarif du véhicule (0,25 € pour la Clio V, 0,40 € pour le 20 m³). Après un chantier, l’option retour sans lavage (25 € le forfait) vous évite de nettoyer l’utilitaire.</p>',
      },
      {
        h2: 'Réserver et payer votre location',
        html: '<p>Choisissez vos dates, votre véhicule et l’agence d’Yvrac comme lieu de départ, puis réglez en ligne par carte bancaire, Apple Pay ou Google Pay. À partir de 150 €, le paiement en 3 ou 4 fois sans frais est possible. Vous suivez ensuite vos réservations depuis votre espace client.</p>' +
          '<p>Vous préférez parler à quelqu’un ? Appelez-nous ou écrivez-nous sur WhatsApp au <strong>07 49 58 81 44</strong>. L’annulation est gratuite jusqu’à 48 h avant le départ, et les tarifs baissent dès 3 jours de location (5 % de remise).</p>' +
          '<p>Artisan ou entreprise des environs ? Le mode « Professionnel » affiche les prix HT et établit la facture au nom de votre société.</p>',
      },
    ],
    faq: [
      { q: 'Où se trouve l’agence de location d’Yvrac ?', a: 'Au 72 bis avenue des Tabernottes, 33370 Yvrac, à environ 15 minutes de Bordeaux par la rocade. Un parking gratuit est à votre disposition.' },
      { q: 'Le retrait à l’agence est-il payant ?', a: 'Non, la remise et la restitution à Yvrac sont gratuites. Un supplément ne s’applique qu’à la gare Saint-Jean (25 €), à l’aéroport (35 €) ou pour une livraison (40 €), à chaque passage.' },
      { q: 'Peut-on rendre le véhicule le dimanche ?', a: 'Non, l’agence est fermée le dimanche. Prévoyez un retour le samedi avant 18 h ou le lundi à partir de 8 h 30.' },
      { q: 'Faut-il un permis spécial pour louer un utilitaire à Yvrac ?', a: 'Non, tous nos utilitaires se conduisent avec le permis B, y compris le 20 m³ avec hayon, qui reste sous les 3,5 tonnes. Ce modèle demande toutefois 3 ans de permis.' },
      { q: 'Peut-on rendre le véhicule ailleurs qu’à Yvrac ?', a: 'Oui, le retour peut se faire dans un autre point que le départ : gare Saint-Jean, aéroport de Mérignac ou reprise à votre adresse dans Bordeaux Métropole, avec le supplément du point choisi.' },
      { q: 'Combien de kilomètres sont inclus ?', a: '250 km par jour pour la Clio V et la 208, 300 km pour le 5008 et 150 km pour les utilitaires. Au-delà, chaque kilomètre est facturé au tarif du véhicule.' },
    ],
    related: ['/location-voiture-bordeaux', '/location-utilitaire-bordeaux', '/location-voiture-entre-deux-mers', '/location-voiture-rive-droite-bordeaux', '/agences'],
  },

  {
    path: '/location-voiture-rive-droite-bordeaux',
    kind: 'landing',
    title: 'Location voiture rive droite Bordeaux | PRISMA',
    description: 'Location voiture rive droite Bordeaux : agence PRISMA à Yvrac avec parking gratuit, ou livraison à Cenon, Lormont, Floirac pour 40 €. Réservez en ligne.',
    h1: 'Location de voiture sur la rive droite de Bordeaux',
    eyebrow: 'Rive droite bordelaise',
    lead: 'Vous habitez Cenon, Lormont, Floirac, Bassens, Carbon-Blanc ou Artigues-près-Bordeaux et vous cherchez une location de voiture sur la rive droite de Bordeaux ? L’agence PRISMA Automobiles d’Yvrac se trouve à l’est de Bordeaux, du même côté de la Garonne que vous. Et si vous préférez rester chez vous, le véhicule peut vous être livré.',
    vehicles: ['v-clio', 'v-208', 'v-trafic', 'v-master12'],
    sections: [
      {
        h2: 'Louer une voiture sur la rive droite de Bordeaux',
        html: '<p>Pour les habitants de la rive droite, l’agence d’Yvrac a un avantage simple : elle se trouve du même côté de la Garonne. Pas besoin de traverser le fleuve, ni de rejoindre l’aéroport de Mérignac, de l’autre côté de l’agglomération, pour récupérer un véhicule.</p>' +
          '<p>Sur place, le <strong>parking est gratuit</strong> et le retrait se fait <strong>sans supplément</strong>. L’agence est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h ; elle est fermée le dimanche.</p>',
      },
      {
        h2: 'Livraison à domicile dans les communes de la rive droite',
        html: '<p>Vous ne souhaitez pas vous déplacer ? PRISMA Automobiles livre votre véhicule à votre adresse dans <strong>Bordeaux Métropole, dans un rayon de 25 km</strong>. Cenon, Lormont, Floirac, Bassens, Carbon-Blanc et Artigues-près-Bordeaux font partie de la métropole.</p>' +
          '<ul><li><strong>40 €</strong> à la remise, à l’adresse indiquée lors de la réservation ;</li><li><strong>40 €</strong> à la restitution si le véhicule est repris chez vous ;</li><li><strong>aucun frais</strong> si vous le rendez vous-même à l’agence d’Yvrac.</li></ul>' +
          '<p>Tous les détails sont sur la page <a href="/location-voiture-livraison-bordeaux">location de voiture livrée à domicile</a>.</p>',
      },
      {
        h2: 'Citadine ou utilitaire : que louer pour vos trajets ?',
        html: '<p>Pour les rendez-vous, les courses ou une voiture immobilisée au garage, la <strong>Renault Clio V</strong> (39 € par jour) convient à la plupart des trajets du quotidien. Si vous préférez ne pas passer les vitesses, la <strong>Peugeot 208 automatique</strong> (49 € par jour) ajoute une caméra de recul, appréciable pour se garer.</p>' +
          '<p>Pour transporter des meubles, le <strong>Renault Trafic 6 m³</strong> (65 € par jour, 3 places, 1 100 kg de charge) et le <strong>Renault Master 12 m³</strong> (79 € par jour, 1 300 kg, 1,90 m de hauteur intérieure) se conduisent avec le permis B. Ils incluent 150 km par jour, contre 250 km pour les deux citadines.</p>' +
          '<p>Ces quatre véhicules sont accessibles dès 21 ans avec 2 ans de permis. Si votre permis a moins de 3 ans, comptez un supplément jeune conducteur de 15 € par jour, plafonné à 150 € par location, et une caution augmentée de 500 €.</p>',
      },
      {
        h2: 'Déménager sur la rive droite : les bons réflexes',
        html: '<p>Un déménagement dans la métropole se prépare à l’avance :</p>' +
          '<ul><li>demandez à votre mairie une <strong>autorisation de stationnement</strong> si le camion doit rester sur la voie publique ;</li><li>choisissez le volume à l’aide de notre guide <a href="/guides/quel-utilitaire-pour-demenager">quel utilitaire pour déménager</a> ;</li><li>ajoutez le <strong>kit déménagement</strong> (19 € : diable, sangles, six couvertures de protection).</li></ul>' +
          '<p>Les utilitaires incluent 150 km par jour, de quoi enchaîner les allers-retours d’un déménagement local. Pour un grand volume, l’utilitaire 20 m³ avec hayon élévateur est aussi proposé, dès 3 ans de permis. Retrouvez nos conseils sur la page <a href="/location-camion-demenagement-bordeaux">location de camion de déménagement</a>.</p>',
      },
      {
        h2: 'Combiner les points de départ et de retour',
        html: '<p>Le retour peut se faire dans un autre point que le départ. Quelques combinaisons utiles quand on habite la rive droite :</p>' +
          '<ul><li>départ et retour à Yvrac : aucun supplément ;</li><li>livraison chez vous, retour à Yvrac : 40 € ;</li><li>départ d’Yvrac, retour à la gare Saint-Jean avant de prendre un train : 25 € ;</li><li>départ d’Yvrac, retour à l’aéroport de Mérignac avant un vol : 35 €.</li></ul>' +
          '<p>Chaque supplément est facturé une fois à la remise et, séparément, une fois à la restitution, selon le point choisi.</p>' +
          '<p>Au retour d’un voyage, la formule inverse fonctionne aussi : récupérez le véhicule à l’aéroport de Mérignac (35 €) ou à la gare Saint-Jean (25 €), rentrez chez vous avec vos bagages, puis rendez-le à Yvrac sans supplément.</p>',
      },
      {
        h2: 'Réserver en ligne ou par WhatsApp',
        html: '<p>La réservation est ouverte 24 h sur 24 sur le site et sur l’application installable sur votre téléphone, avec une confirmation immédiate par email. Vous pouvez aussi appeler ou écrire sur WhatsApp au <strong>07 49 58 81 44</strong>, puis suivre vos réservations depuis votre espace client.</p>' +
          '<p>Au départ, munissez-vous de votre permis de conduire, d’une pièce d’identité au nom du conducteur et d’une carte bancaire pour la caution, prise par empreinte et non débitée. L’annulation reste gratuite jusqu’à 48 h avant le départ.</p>',
      },
    ],
    faq: [
      { q: 'Où retirer une voiture de location quand on habite la rive droite ?', a: 'À l’agence PRISMA Automobiles d’Yvrac, à l’est de Bordeaux, sur la même rive de la Garonne. Le retrait y est gratuit, tout comme le parking.' },
      { q: 'La livraison est-elle possible à Cenon, Lormont ou Floirac ?', a: 'Oui, la livraison est proposée à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km : 40 € à la remise et 40 € à la restitution si le véhicule est repris chez vous.' },
      { q: 'Peut-on louer un utilitaire avec le permis B ?', a: 'Oui, le Trafic 6 m³, le Master 12 m³ et l’utilitaire 20 m³ avec hayon se conduisent avec le permis B, dès 21 ans. Le 20 m³ demande 3 ans de permis, les deux autres 2 ans.' },
      { q: 'Faut-il une autorisation pour garer un camion de déménagement ?', a: 'C’est souvent le cas dans les grandes agglomérations pour un déménagement sur la voie publique. Demandez l’autorisation de stationnement à la mairie, à l’avance.' },
      { q: 'Quels sont les horaires de l’agence d’Yvrac ?', a: 'Du lundi au vendredi de 8 h 30 à 19 h, et le samedi de 9 h à 18 h. L’agence est fermée le dimanche.' },
      { q: 'Peut-on payer en plusieurs fois ?', a: 'Oui, le paiement en 3 ou 4 fois sans frais est proposé à partir de 150 €. Vous pouvez aussi régler par carte bancaire, Apple Pay ou Google Pay.' },
    ],
    related: ['/location-voiture-yvrac', '/location-voiture-livraison-bordeaux', '/location-utilitaire-bordeaux', '/location-camion-demenagement-bordeaux', '/guides/demenager-a-bordeaux-conseils'],
  },

  {
    path: '/location-voiture-entre-deux-mers',
    kind: 'landing',
    title: 'Location voiture Entre-deux-Mers, agence à Yvrac | PRISMA',
    description: 'Location voiture Entre-deux-Mers à l’agence PRISMA d’Yvrac, retrait gratuit : citadine, SUV 7 places ou utilitaire pour vignobles, mariages et déménagements.',
    h1: 'Location de voiture dans l’Entre-deux-Mers',
    eyebrow: 'Entre Garonne et Dordogne',
    lead: 'Pour une location de voiture dans l’Entre-deux-Mers, l’agence PRISMA Automobiles vous accueille à Yvrac, avec un parking gratuit et un retrait sans supplément. Habitants de Tresses, Pompignac ou Saint-Loubès, amateurs de vignobles, familles qui préparent un mariage : chaque usage a son véhicule.',
    vehicles: ['v-clio', 'v-5008', 'v-kangoo', 'v-master20'],
    sections: [
      {
        h2: 'Location de voiture dans l’Entre-deux-Mers : partir d’Yvrac',
        html: '<p>L’agence est installée à Yvrac, au 72 bis avenue des Tabernottes, à environ 15 minutes de Bordeaux par la rocade. Pour les habitants de Tresses, Pompignac, Sainte-Eulalie, Saint-Loubès, Montussan, Beychac-et-Caillau ou Saint-Sulpice-et-Cameyrac, c’est une agence de proximité : inutile de passer par le centre de Bordeaux pour louer un véhicule.</p>' +
          '<p>Le parking est gratuit, le retrait et le retour se font sans supplément. L’agence vous accueille du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h ; elle est fermée le dimanche.</p>',
      },
      {
        h2: 'Vignobles et Saint-Émilion : vos sorties en voiture',
        html: '<p>L’Entre-deux-Mers est une terre de vignes, de châteaux et de petites routes. Avec une voiture de location, vous organisez librement une journée de visites ou de dégustations, puis vous poussez jusqu’à <strong>Saint-Émilion</strong>, à environ 40 minutes de Bordeaux.</p>' +
          '<ul><li>La <strong>Renault Clio V</strong> (39 € par jour, 250 km inclus par jour) convient bien à une sortie à deux.</li><li>Désignez un conducteur qui ne boit pas. Pour vous relayer au volant, un <strong>conducteur supplémentaire</strong> coûte 6 € par jour (60 € au maximum).</li></ul>' +
          '<p>D’autres idées vous attendent dans notre guide des <a href="/guides/escapades-week-end-depuis-bordeaux">escapades de week-end depuis Bordeaux</a>.</p>',
      },
      {
        h2: 'Mariages et fêtes de famille : transporter tout le monde',
        html: '<p>Un mariage, un anniversaire ou une réunion de famille dans un domaine de la région demande souvent plusieurs allers-retours. Le <strong>Peugeot 5008</strong> accueille <strong>7 personnes</strong> et 5 valises, avec une boîte automatique et 300 km inclus par jour (89 € par jour, dès 23 ans et 2 ans de permis).</p>' +
          '<p>Pour un groupe plus nombreux, le <a href="/location-minibus-9-places-bordeaux">minibus 9 places</a> se conduit avec le permis B. Pour la décoration, les boissons ou le matériel de réception, le <strong>Renault Kangoo Van</strong> (3,3 m³, 650 kg, 45 € par jour) se charge facilement par sa porte latérale coulissante. Des enfants à bord ? Le siège enfant ou le rehausseur coûte 5 € par jour (40 € au maximum par siège, jusqu’à 3).</p>' +
          '<p>Des invités arrivent en train ou en avion ? Le véhicule peut leur être remis à la gare Saint-Jean (25 €) ou à l’aéroport de Mérignac (35 €), puis rendu à Yvrac sans supplément après la fête.</p>',
      },
      {
        h2: 'Déménager dans l’Entre-deux-Mers',
        html: '<p>Pour vider une maison, l’<strong>utilitaire 20 m³ avec hayon</strong> (109 € par jour) simplifie le chargement : le hayon élévateur soulève jusqu’à 500 kg, la rampe et les barres d’arrimage font le reste. Il emporte 950 kg de charge utile et 3 personnes à bord, reste sous les 3,5 tonnes et se conduit avec le permis B, dès 21 ans et 3 ans de permis.</p>' +
          '<p>Pour quelques meubles ou des cartons, le Kangoo Van suffit : ses anneaux d’arrimage permettent de caler le chargement, et une cloison le sépare de la cabine. Les utilitaires incluent 150 km par jour, et le kit déménagement (diable, sangles, six couvertures) coûte 19 € le forfait. Si le camion doit stationner sur la voie publique, renseignez-vous à l’avance auprès de la mairie. Plus de conseils sur la page <a href="/location-camion-demenagement-bordeaux">location de camion de déménagement</a>.</p>',
      },
      {
        h2: 'Voiture au garage : louer à la journée ou à la semaine',
        html: '<p>Votre voiture est immobilisée au garage, ou vous attendez la livraison d’un véhicule neuf ? Louer quelques jours vous évite de dépendre des autres pour aller travailler ou faire les trajets de l’école. Plus la location dure, plus le prix par jour baisse, automatiquement :</p>' +
          '<ul><li>5 % de remise dès 3 jours ;</li><li>10 % dès 5 jours ;</li><li>15 % dès 7 jours ;</li><li>20 % dès 14 jours ;</li><li>30 % dès 28 jours.</li></ul>' +
          '<p>Ces remises portent sur le prix de location du véhicule et s’ajoutent au retrait gratuit à Yvrac. Si l’immobilisation se prolonge, découvrez notre <a href="/location-voiture-au-mois-bordeaux">location de voiture au mois</a>.</p>',
      },
      {
        h2: 'Réserver et récupérer les clés',
        html: '<p>Réservez en ligne 24 h sur 24, sur le site ou depuis l’application installable sur votre téléphone : la confirmation arrive immédiatement par email. Vous pouvez aussi appeler ou écrire sur WhatsApp au <strong>07 49 58 81 44</strong>.</p>' +
          '<p>Le jour du départ, présentez votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution. Celle-ci est prise par empreinte, sans débit, et libérée au retour, déduction faite d’éventuels frais.</p>',
      },
    ],
    faq: [
      { q: 'Où retirer une voiture de location dans l’Entre-deux-Mers ?', a: 'À l’agence PRISMA Automobiles, 72 bis avenue des Tabernottes à Yvrac. Le retrait et le retour y sont gratuits, et le parking aussi.' },
      { q: 'Peut-on partir à Saint-Émilion pour la journée ?', a: 'Bien sûr : Saint-Émilion est à environ 40 minutes de Bordeaux. La Clio V inclut 250 km par jour, et chaque kilomètre au-delà est facturé 0,25 €.' },
      { q: 'Quel véhicule pour conduire la famille à un mariage ?', a: 'Le Peugeot 5008 transporte 7 personnes et 5 valises. Pour 9 personnes, choisissez le minibus Renault Trafic 9 places, accessible dès 23 ans avec 3 ans de permis.' },
      { q: 'Le 20 m³ se conduit-il avec le permis B ?', a: 'Oui, il reste sous les 3,5 tonnes. Il faut avoir au moins 21 ans et 3 ans de permis.' },
      { q: 'Faut-il rendre le véhicule avec le plein ?', a: 'Oui, il est remis avec le plein et se rend avec le même niveau. À défaut, le carburant est facturé 14 € le huitième de réservoir.' },
      { q: 'L’agence est-elle ouverte le week-end ?', a: 'Le samedi, de 9 h à 18 h, mais pas le dimanche. Un véhicule loué pour le week-end se rend donc le samedi avant 18 h ou le lundi dès 8 h 30.' },
    ],
    related: ['/location-voiture-yvrac', '/location-voiture-7-places-bordeaux', '/location-camion-demenagement-bordeaux', '/location-minibus-9-places-bordeaux', '/guides/escapades-week-end-depuis-bordeaux'],
  },

  {
    path: '/location-voiture-gare-saint-jean',
    kind: 'landing',
    title: 'Location voiture gare Saint-Jean Bordeaux | PRISMA',
    description: 'Location voiture gare Saint-Jean Bordeaux : clés remises en main propre à la sortie Belcier, 25 € la remise. Citadine, premium ou Tesla, réservez en ligne.',
    h1: 'Location de voiture à la gare Saint-Jean de Bordeaux',
    eyebrow: 'Arrivée en train',
    lead: 'Vous arrivez en train et vous cherchez une location de voiture à la gare Saint-Jean de Bordeaux ? PRISMA Automobiles vous remet les clés en main propre à la sortie Belcier, à l’heure choisie lors de la réservation. Le supplément est de 25 € à la remise, et de 25 € à la restitution si vous rendez le véhicule à la gare.',
    vehicles: ['v-clio', 'v-208', 'v-classea', 'v-tesla'],
    sections: [
      {
        h2: 'Remise des clés à la sortie Belcier : comment ça se passe',
        html: '<ol><li><strong>Réservez en ligne</strong> en choisissant « Gare Saint-Jean » comme lieu de départ, avec un horaire qui suit l’arrivée prévue de votre train.</li><li><strong>Recevez la confirmation</strong> immédiatement par email ; la réservation apparaît aussi dans votre espace client.</li><li><strong>Rendez-vous à la sortie Belcier</strong> de la gare (Parvis Louis-Armand, 33800 Bordeaux) : les clés vous sont remises en main propre.</li><li><strong>Présentez vos documents</strong> : permis de conduire, pièce d’identité au nom du conducteur et carte bancaire pour la caution.</li></ol>' +
          '<p>La caution est une empreinte bancaire : elle n’est pas débitée et elle est libérée au retour du véhicule, déduction faite d’éventuels frais. Le véhicule vous est remis avec le plein.</p>',
      },
      {
        h2: 'Location voiture gare Saint-Jean Bordeaux : ce que coûte la remise',
        html: '<p>Le supplément gare s’applique à chaque passage : <strong>25 € à la remise</strong>, puis <strong>25 € à la restitution</strong> si vous rendez le véhicule à la gare. Il s’ajoute au prix de location, affiché TTC pour les particuliers.</p>' +
          '<p>Exemple : une Renault Clio V pendant 2 jours, prise et rendue à la gare, revient à 78 € de location plus 50 € de remise et de restitution, soit <strong>128 € TTC</strong>. À partir de 150 €, vous pouvez régler en 3 ou 4 fois sans frais.</p>' +
          '<p>Autre exemple : une Mercedes Classe A 180 pendant 2 jours, remise à la gare puis rendue à l’agence d’Yvrac, revient à 138 € de location plus 25 €, soit <strong>163 € TTC</strong>. Le retour à Yvrac ne coûte rien.</p>',
      },
      {
        h2: 'L’alternative gratuite : l’agence d’Yvrac',
        html: '<p>Le retrait et le retour à l’agence d’Yvrac, 72 bis avenue des Tabernottes, sont <strong>gratuits</strong>, avec un parking gratuit. L’agence se trouve à environ 15 minutes de Bordeaux par la rocade.</p>' +
          '<p>Comme le retour peut se faire dans un autre point que le départ, vous pouvez aussi combiner :</p>' +
          '<ul><li>remise à la gare et retour à Yvrac : 25 € au total ;</li><li>départ d’Yvrac et retour à la gare pour reprendre votre train : 25 € au total ;</li><li>remise à la gare et retour à l’<a href="/location-voiture-aeroport-merignac">aéroport de Mérignac</a> : 25 € plus 35 €, soit 60 €.</li></ul>' +
          '<p>Tous les lieux sont présentés sur la page <a href="/agences">agences et points de retrait</a>.</p>',
      },
      {
        h2: 'Horaires : organiser votre arrivée en train',
        html: '<p>Les remises et les restitutions ont lieu pendant les horaires d’ouverture : du lundi au vendredi de 8 h 30 à 19 h, et le samedi de 9 h à 18 h. Aucune remise n’a lieu le dimanche.</p>' +
          '<ul><li>Votre train arrive après la fermeture (19 h en semaine, 18 h le samedi) ? Prévoyez la remise à l’ouverture suivante.</li><li>Vous arrivez un dimanche ? La remise se fera au plus tôt le lundi à 8 h 30.</li><li>Au retour, gardez une marge avant votre train : un retard de plus de 59 minutes entraîne la facturation d’une journée supplémentaire.</li></ul>',
      },
      {
        h2: 'Quelle voiture choisir en descendant du train ?',
        html: '<ul><li><strong>Renault Clio V</strong> (39 € par jour) : citadine à boîte manuelle, coffre pour 2 valises, parfaite pour un séjour en ville.</li><li><strong>Peugeot 208 automatique</strong> (49 € par jour) : même gabarit, avec boîte automatique et caméra de recul.</li><li><strong>Mercedes Classe A 180</strong> (69 € par jour) : compacte premium, 3 valises, écran MBUX, sièges chauffants et aide au stationnement, dès 23 ans.</li><li><strong>Tesla Model 3</strong> (95 € par jour) : berline électrique avec Autopilot et toit panoramique, jusqu’à 500 km d’autonomie annoncée et accès aux Superchargeurs, dès 25 ans et 3 ans de permis.</li></ul>' +
          '<p>La Tesla se rend avec au moins 70 % de charge. Pour une première expérience de l’électrique, consultez notre page <a href="/location-voiture-electrique-bordeaux">location de voiture électrique</a>. Pour un déplacement professionnel, le mode « Professionnel » affiche les prix HT et établit la facture au nom de votre société.</p>',
      },
      {
        h2: 'Réserver à l’avance et annuler gratuitement jusqu’à 48 h',
        html: '<p>Réserver avant votre voyage vous assure le véhicule et l’horaire de remise à la gare. La réservation se fait en ligne 24 h sur 24, sur le site ou l’application installable sur votre téléphone, ou par téléphone et WhatsApp au <strong>07 49 58 81 44</strong>.</p>' +
          '<p>Si vos plans changent, l’annulation est gratuite jusqu’à 48 h avant le départ ; au-delà, 50 % du montant reste dû. Votre train a du retard le jour J ? Prévenez-nous par téléphone ou sur WhatsApp. Le paiement se fait par carte bancaire, Apple Pay ou Google Pay.</p>',
      },
    ],
    faq: [
      { q: 'Où me remet-on les clés à la gare Saint-Jean ?', a: 'À la sortie Belcier de la gare (Parvis Louis-Armand, 33800 Bordeaux), en main propre, à l’heure choisie lors de la réservation.' },
      { q: 'Combien coûte la remise à la gare ?', a: '25 € à la remise, et 25 € de plus à la restitution si vous rendez le véhicule à la gare. Le retour à l’agence d’Yvrac est gratuit.' },
      { q: 'Mon train arrive un dimanche : comment faire ?', a: 'L’agence est fermée le dimanche et aucune remise n’a lieu ce jour-là. La remise peut se faire le lundi à partir de 8 h 30.' },
      { q: 'Puis-je rendre la voiture ailleurs qu’à la gare ?', a: 'Oui : à l’agence d’Yvrac sans supplément, à l’aéroport de Mérignac pour 35 € ou à votre adresse dans Bordeaux Métropole pour 40 €.' },
      { q: 'Quels documents faut-il présenter ?', a: 'Votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution, prise par empreinte et non débitée.' },
      { q: 'Peut-on louer la Tesla Model 3 à la gare ?', a: 'Oui, à partir de 25 ans et avec 3 ans de permis. Elle se rend avec au moins 70 % de charge.' },
    ],
    related: ['/location-voiture-bordeaux', '/location-voiture-aeroport-merignac', '/location-voiture-yvrac', '/location-voiture-premium-bordeaux', '/agences'],
  },

  {
    path: '/location-voiture-aeroport-merignac',
    kind: 'landing',
    title: 'Location voiture aéroport Bordeaux Mérignac | PRISMA',
    description: 'Location voiture aéroport Bordeaux Mérignac : accueil au Hall B, au point de rendez-vous des loueurs, pour 35 €. SUV, premium ou Tesla : réservez en ligne.',
    h1: 'Location de voiture à l’aéroport de Bordeaux-Mérignac',
    eyebrow: 'Arrivée en avion',
    lead: 'Pour une location de voiture à l’aéroport de Bordeaux-Mérignac, PRISMA Automobiles vous accueille au Hall B, au point de rendez-vous des loueurs. Le supplément est de 35 € à la remise et de 35 € à la restitution si vous rendez le véhicule à l’aéroport. Voyage d’affaires ou vacances en famille, choisissez votre véhicule selon vos bagages.',
    vehicles: ['v-208', 'v-classea', 'v-tesla', 'v-5008', 'v-glc'],
    sections: [
      {
        h2: 'Accueil au Hall B, au point de rendez-vous des loueurs',
        html: '<p>À votre arrivée à l’aéroport de Bordeaux-Mérignac (Hall B, 33700 Mérignac), rejoignez le <strong>point de rendez-vous des loueurs</strong> à l’heure indiquée dans votre réservation. Les clés vous sont remises après présentation de trois documents :</p>' +
          '<ul><li>votre permis de conduire ;</li><li>une pièce d’identité au nom du conducteur ;</li><li>une carte bancaire pour la caution, prise par empreinte et non débitée.</li></ul>' +
          '<p>Le véhicule est remis avec le plein et se rend avec le même niveau. Pour la Tesla Model 3, prévoyez au moins 70 % de charge au retour. Et pour voyager l’esprit tranquille, la Protection Sérénité (22 € par jour) ramène la franchise à zéro en cas de dommage ou de vol.</p>',
      },
      {
        h2: 'Vols et horaires : bien choisir votre créneau',
        html: '<p>Les remises et les restitutions à l’aéroport ont lieu pendant les horaires d’ouverture : du lundi au vendredi de 8 h 30 à 19 h, et le samedi de 9 h à 18 h. Aucune remise n’a lieu le dimanche.</p>' +
          '<ul><li><strong>À l’arrivée</strong>, choisissez un horaire qui vous laisse le temps de récupérer vos bagages.</li><li><strong>En cas de retard de vol</strong>, prévenez-nous dès que possible par téléphone ou WhatsApp au 07 49 58 81 44.</li><li><strong>Au départ</strong>, rendez le véhicule avec une marge confortable avant l’enregistrement : un retard de plus de 59 minutes entraîne la facturation d’une journée supplémentaire.</li></ul>',
      },
      {
        h2: 'Location voiture aéroport Bordeaux Mérignac : le prix du service',
        html: '<p>Le supplément aéroport est de <strong>35 € à la remise</strong> et de <strong>35 € à la restitution</strong> si vous rendez le véhicule sur place. Exemple : un Peugeot 5008 pendant 2 jours, pris et rendu à l’aéroport, revient à 178 € de location plus 70 € de remise et de restitution, soit <strong>248 € TTC</strong>, payables en 3 ou 4 fois sans frais.</p>' +
          '<p>Le retour peut aussi se faire ailleurs : à la gare Saint-Jean pour 25 € si vous repartez en train, ou à l’agence d’Yvrac sans supplément. Le détail de la remise en gare est sur la page <a href="/location-voiture-gare-saint-jean">location de voiture à la gare Saint-Jean</a>.</p>',
      },
      {
        h2: 'Bagages et passagers : quel véhicule choisir ?',
        html: '<ul><li><strong>Peugeot 208 automatique</strong> (49 € par jour) : 2 valises, pour un court séjour à deux.</li><li><strong>Mercedes Classe A 180</strong> (69 € par jour) : 3 valises et le confort d’une compacte premium.</li><li><strong>Peugeot 5008</strong> (89 € par jour) : 7 places et 5 valises, avec caméra de recul, pour les familles.</li><li><strong>Mercedes GLC AMG Line</strong> (139 € par jour) : 4 valises, sellerie cuir et kilométrage illimité.</li></ul>' +
          '<p>Côté kilométrage, la 208 inclut 250 km par jour, la Classe A, la Tesla et le 5008 en incluent 300, et le GLC roule sans limite. Pour un long circuit, l’option kilométrage illimité coûte 12 € par jour.</p>' +
          '<p>Vous voyagez avec des enfants ? Le siège enfant ou le rehausseur coûte 5 € par jour (40 € au maximum par siège, jusqu’à 3). Comparez les grands volumes sur la page <a href="/location-voiture-7-places-bordeaux">location de voiture 7 places</a>.</p>',
      },
      {
        h2: 'Voyage d’affaires : premium, électrique et facture pro',
        html: '<p>Pour un rendez-vous client ou un séminaire, la <strong>Tesla Model 3</strong> (95 € par jour) réunit Autopilot, toit panoramique, jusqu’à 500 km d’autonomie annoncée et accès aux Superchargeurs. Le <strong>Mercedes GLC</strong> (sellerie cuir, sièges chauffants, audio premium) et la <strong>Classe A</strong> (écran MBUX, sièges chauffants) jouent la carte du confort.</p>' +
          '<p>En mode « Professionnel », les prix sont affichés HT et la facture est établie au nom de votre société. La Classe A est accessible dès 23 ans, la Tesla et le GLC dès 25 ans avec 3 ans de permis. Voir aussi notre offre de <a href="/professionnels">location de véhicules pour les professionnels</a>.</p>',
      },
      {
        h2: 'Réserver avant votre vol',
        html: '<p>Réservez en ligne 24 h sur 24, sur le site ou depuis l’application installable sur votre téléphone : la confirmation arrive immédiatement par email et votre espace client vous permet de suivre la réservation. Le paiement se fait par carte bancaire, Apple Pay ou Google Pay.</p>' +
          '<p>Votre voyage est décalé ? L’annulation est gratuite jusqu’à 48 h avant le départ ; au-delà, 50 % du montant reste dû.</p>' +
          '<p>Vous prévoyez de passer la frontière ? L’option circulation en Europe coûte 7 € par jour, plafonnée à 70 €, pour rouler notamment en Espagne, au Portugal ou en Italie.</p>',
      },
    ],
    faq: [
      { q: 'Où récupérer la voiture à l’aéroport de Mérignac ?', a: 'Au Hall B de l’aéroport de Bordeaux-Mérignac, au point de rendez-vous des loueurs, à l’heure choisie lors de la réservation.' },
      { q: 'Combien coûte la remise à l’aéroport ?', a: '35 € à la remise, puis 35 € à la restitution si vous rendez le véhicule à l’aéroport. Le retour à la gare Saint-Jean coûte 25 €, à l’agence d’Yvrac il est gratuit.' },
      { q: 'Que faire si mon vol a du retard ?', a: 'Prévenez-nous au plus vite par téléphone ou WhatsApp au 07 49 58 81 44. Les remises ont lieu pendant les horaires d’ouverture, d’où l’intérêt de prévoir une marge après l’atterrissage.' },
      { q: 'Peut-on récupérer une voiture à l’aéroport le dimanche ?', a: 'Non, aucune remise n’a lieu le dimanche. Elles se font du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.' },
      { q: 'Quelle voiture pour une famille avec beaucoup de bagages ?', a: 'Le Peugeot 5008, avec 7 places et 5 valises. Pour 5 personnes, le Mercedes GLC emporte 4 valises avec le kilométrage illimité.' },
      { q: 'Peut-on obtenir une facture au nom de son entreprise ?', a: 'Oui : en mode « Professionnel », les prix sont affichés HT et la facture est établie au nom de la société.' },
    ],
    related: ['/location-voiture-gare-saint-jean', '/location-voiture-premium-bordeaux', '/location-suv-bordeaux', '/location-voiture-electrique-bordeaux', '/agences'],
  },

  {
    path: '/location-voiture-livraison-bordeaux',
    kind: 'landing',
    title: 'Location voiture livrée à domicile Bordeaux | PRISMA',
    description: 'Location voiture livrée à domicile à Bordeaux et dans la métropole, dans un rayon de 25 km, pour 40 €. Citadine ou camion de déménagement, réservez en ligne.',
    h1: 'Location de voiture livrée à domicile à Bordeaux',
    eyebrow: 'Livraison à domicile',
    lead: 'Avec la location de voiture livrée à domicile à Bordeaux, PRISMA Automobiles vous remet le véhicule à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km. La livraison coûte 40 €, et la reprise chez vous 40 € de plus si vous la choisissez. Voiture pour la semaine ou camion pour déménager, vous n’avez pas à vous déplacer.',
    vehicles: ['v-clio', 'v-208', 'v-master12', 'v-master20'],
    sections: [
      {
        h2: 'Comment fonctionne la livraison à domicile',
        html: '<ol><li>Lors de la réservation, choisissez <strong>« Livraison à votre adresse »</strong> comme lieu de départ.</li><li>Précisez l’adresse de livraison à l’étape suivante, puis réglez en ligne : la confirmation arrive immédiatement par email.</li><li>À l’heure choisie, le véhicule vous est remis chez vous. Le conducteur présente son permis, une pièce d’identité à son nom et une carte bancaire pour la caution.</li><li>En fin de location, le véhicule est repris à votre adresse, ou vous le rendez dans un autre point, selon votre choix.</li></ol>' +
          '<p>Livraisons et reprises ont lieu pendant les horaires d’ouverture : du lundi au vendredi de 8 h 30 à 19 h, et le samedi de 9 h à 18 h. Rendez le véhicule avec le même niveau de carburant qu’à la livraison : à défaut, le carburant manquant est facturé 14 € le huitième de réservoir.</p>',
      },
      {
        h2: 'Tarifs de la location de voiture livrée à domicile à Bordeaux',
        html: '<p>La livraison est facturée <strong>40 € à la remise</strong>. Pour la fin de location, vous avez le choix :</p>' +
          '<ul><li>reprise à votre adresse : 40 € ;</li><li>retour à l’agence d’Yvrac : gratuit ;</li><li>retour à la gare Saint-Jean (25 €) ou à l’aéroport de Mérignac (35 €).</li></ul>' +
          '<p>Exemple : une Renault Clio V pendant 2 jours, livrée puis reprise chez vous, revient à 78 € de location plus 80 € de livraison et de reprise, soit <strong>158 € TTC</strong>. À partir de 150 €, le paiement en 3 ou 4 fois sans frais est possible.</p>',
      },
      {
        h2: 'Zone de livraison : Bordeaux Métropole, dans un rayon de 25 km',
        html: '<p>La livraison est proposée à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km. Au-delà, elle n’est pas possible : vous retirez alors le véhicule gratuitement à l’agence d’Yvrac, ou à la gare Saint-Jean et à l’aéroport de Mérignac avec le supplément prévu.</p>' +
          '<p>Pour faciliter la remise des clés, signalez tout détail utile (digicode, portail, accès à la résidence) par WhatsApp au 07 49 58 81 44. Livraison ou retrait en agence, le prix de location du véhicule reste le même : seul le supplément du point choisi change.</p>',
      },
      {
        h2: 'Déménagement : l’utilitaire livré devant chez vous',
        html: '<p>Faire livrer le camion vous évite un aller-retour à l’agence le jour du déménagement. Deux modèles s’y prêtent particulièrement, tous deux accessibles avec le permis B :</p>' +
          '<ul><li><strong>Renault Master 12 m³</strong> (79 € par jour) : 1 300 kg de charge, 1,90 m de hauteur intérieure, caméra de recul et anneaux d’arrimage ;</li><li><strong>Utilitaire 20 m³ avec hayon</strong> (109 € par jour) : hayon élévateur de 500 kg, rampe et barres d’arrimage, dès 3 ans de permis.</li></ul>' +
          '<p>Ajoutez le kit déménagement (19 € : diable, sangles, six couvertures) et demandez à la mairie une autorisation de stationnement si le camion doit rester sur la voie publique. Nos <a href="/guides/demenager-a-bordeaux-conseils">conseils pour déménager à Bordeaux</a> vous aident à tout préparer.</p>' +
          '<p>Exemple : un Master 12 m³ pour une journée, livré le matin et repris le soir, revient à 79 € plus 80 € de livraison et de reprise, soit <strong>159 € TTC</strong>, ou 178 € avec le kit déménagement. Retiré et rendu à Yvrac, il coûte 79 €, ou 98 € avec le kit.</p>',
      },
      {
        h2: 'Entreprises : un véhicule livré à vos bureaux',
        html: '<p>Un collaborateur arrive, un véhicule de service est immobilisé, un chantier démarre : la livraison vous fait gagner du temps. En mode « Professionnel », les prix sont affichés HT et la facture est établie au nom de la société.</p>' +
          '<p>Pour un utilitaire de chantier, l’option retour sans lavage (25 € le forfait) vous évite de le nettoyer avant la reprise. Pour plusieurs véhicules ou une longue durée, demandez un devis sur mesure, avec des tarifs dégressifs jusqu’à 30 %. Toutes les solutions sont réunies sur la page <a href="/professionnels">location de véhicules pour les professionnels</a>.</p>',
      },
      {
        h2: 'Citadine livrée : Clio V ou 208 automatique',
        html: '<p>Pour remplacer une voiture immobilisée au garage ou recevoir de la famille, la <strong>Renault Clio V</strong> (39 € par jour, boîte manuelle) et la <strong>Peugeot 208 automatique</strong> (49 € par jour) incluent 250 km par jour, avec Apple CarPlay et Android Auto.</p>' +
          '<p>Les tarifs baissent avec la durée : 5 % de remise dès 3 jours, 15 % dès 7 jours et jusqu’à 30 % dès 28 jours. Tous les détails de la citadine automatique sont sur la fiche de la <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a>.</p>',
      },
    ],
    faq: [
      { q: 'Où livrez-vous les véhicules de location ?', a: 'À votre adresse dans Bordeaux Métropole, dans un rayon de 25 km. Au-delà, le retrait se fait à l’agence d’Yvrac, à la gare Saint-Jean ou à l’aéroport de Mérignac.' },
      { q: 'Combien coûte la livraison ?', a: '40 € à la remise. Si le véhicule est aussi repris chez vous, la restitution coûte 40 € de plus ; le retour à l’agence d’Yvrac reste gratuit.' },
      { q: 'Quand dois-je indiquer mon adresse ?', a: 'Pendant la réservation : après avoir choisi « Livraison à votre adresse », vous la précisez à l’étape suivante.' },
      { q: 'Peut-on se faire livrer un camion de déménagement ?', a: 'Oui, le Master 12 m³ et l’utilitaire 20 m³ avec hayon peuvent être livrés, comme les voitures. Ajoutez le kit déménagement pour 19 €.' },
      { q: 'Faut-il être présent à la livraison ?', a: 'Oui, le conducteur présente son permis, une pièce d’identité à son nom et la carte bancaire servant à la caution au moment de la remise des clés.' },
      { q: 'La livraison est-elle possible le dimanche ?', a: 'Non, les livraisons ont lieu du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h.' },
    ],
    related: ['/location-voiture-bordeaux', '/location-camion-demenagement-bordeaux', '/location-voiture-rive-droite-bordeaux', '/professionnels', '/agences'],
  },

  {
    path: '/location-voiture-jeune-conducteur-bordeaux',
    kind: 'landing',
    title: 'Location voiture jeune conducteur Bordeaux | PRISMA',
    description: 'Location voiture jeune conducteur à Bordeaux dès 21 ans et 2 ans de permis : supplément de 15 € par jour, plafonné à 150 €. Tarifs clairs, réservez en ligne.',
    h1: 'Location de voiture jeune conducteur à Bordeaux',
    eyebrow: 'Dès 21 ans',
    lead: 'Votre permis a moins de 3 ans et vous cherchez une location de voiture jeune conducteur à Bordeaux ? Chez PRISMA Automobiles, c’est possible dès 21 ans et 2 ans de permis, avec la Renault Clio V, la Peugeot 208 automatique et plusieurs utilitaires. Voici les conditions exactes, pour réserver sans mauvaise surprise.',
    vehicles: ['v-clio', 'v-208', 'v-kangoo', 'v-trafic'],
    sections: [
      {
        h2: 'Location voiture jeune conducteur à Bordeaux : les conditions',
        html: '<p>Vous êtes considéré comme <strong>jeune conducteur</strong> tant que votre permis a moins de 3 ans, quel que soit votre âge. Pour louer la Clio V, la 208 automatique, le Kangoo Van, le Trafic 6 m³ ou le Master 12 m³, il faut :</p>' +
          '<ul><li>avoir au moins <strong>21 ans</strong> ;</li><li>avoir le permis depuis au moins <strong>2 ans</strong>.</li></ul>' +
          '<p>Tant que votre permis a moins de 3 ans, deux conditions s’ajoutent : un <strong>supplément de 15 € par jour</strong>, plafonné à 150 € par location, et une <strong>caution augmentée de 500 €</strong>. Les deux disparaissent dès que votre permis atteint 3 ans : vérifiez sa date d’obtention avant de réserver.</p>',
      },
      {
        h2: 'Quels véhicules pouvez-vous louer ?',
        html: '<p><strong>Accessibles dès 21 ans et 2 ans de permis</strong> : Renault Clio V, Peugeot 208 automatique, Renault Kangoo Van, Renault Trafic 6 m³ et Renault Master 12 m³. Les utilitaires se conduisent tous avec le permis B.</p>' +
          '<p><strong>Non accessibles à 21 ans avec 2 ans de permis</strong> :</p>' +
          '<ul><li>Mercedes Classe A 180 et Peugeot 5008 : 23 ans minimum ;</li><li>minibus Renault Trafic 9 places : 23 ans et 3 ans de permis ;</li><li>Tesla Model 3 et Mercedes GLC : 25 ans et 3 ans de permis ;</li><li>utilitaire 20 m³ avec hayon : 3 ans de permis.</li></ul>' +
          '<p>Dès 23 ans, la Classe A et le 5008 vous sont ouverts, avec le supplément jeune conducteur tant que votre permis a moins de 3 ans.</p>',
      },
      {
        h2: 'Combien coûte le supplément jeune conducteur ?',
        html: '<p>Le supplément est de 15 € par jour et ne dépasse jamais 150 € par location : au-delà de 10 jours, il n’augmente plus. Exemples avec la Renault Clio V à 39 € par jour :</p>' +
          '<ul><li>2 jours : 78 € de location et 30 € de supplément, soit <strong>108 € TTC</strong> ;</li><li>14 jours : le supplément est plafonné à <strong>150 €</strong> au lieu de 210 €.</li></ul>' +
          '<p>La caution, prise par empreinte bancaire et non débitée, passe de 800 € à <strong>1 300 €</strong> pour la Clio V, de 900 € à 1 400 € pour la 208 et de 1 000 € à 1 500 € pour le Kangoo Van. Pour les plus grands utilitaires, elle passe de 1 500 € à 2 000 € pour le Trafic 6 m³ et de 2 000 € à 2 500 € pour le Master 12 m³. Vérifiez que le plafond de votre carte le permet.</p>',
      },
      {
        h2: 'Protections : réduire la franchise',
        html: '<p>En cas de dommage, la franchise reste à votre charge : 1 000 € pour la Clio V et la 208, 1 200 € pour le Kangoo Van, 1 800 € pour le Trafic 6 m³. Deux options la réduisent :</p>' +
          '<ul><li><strong>Protection Confort</strong> (12 € par jour) : franchise divisée par deux, soit 500 € pour la Clio V ;</li><li><strong>Protection Sérénité</strong> (22 € par jour) : zéro franchise en cas de dommage ou de vol.</li></ul>' +
          '<p>Pour bien comprendre la différence entre caution et franchise, lisez notre guide <a href="/guides/caution-franchise-protections-location">caution, franchise et protections</a>.</p>',
      },
      {
        h2: 'Nos conseils pour une première location',
        html: '<ul><li><strong>Vous avez appris sur boîte automatique ?</strong> Choisissez la Peugeot 208 automatique.</li><li><strong>Long trajet ?</strong> Déclarez un conducteur supplémentaire pour vous relayer : 6 € par jour, 60 € au maximum, jusqu’à 2 conducteurs.</li><li><strong>Kilométrage</strong> : 250 km inclus par jour pour les citadines, 150 km pour les utilitaires ; l’option kilométrage illimité coûte 12 € par jour.</li><li><strong>Carburant</strong> : rendez le véhicule avec le même niveau qu’au départ, sinon le carburant manquant est facturé 14 € le huitième de réservoir.</li><li><strong>Retour</strong> : au-delà de 59 minutes de retard, une journée supplémentaire est facturée.</li><li><strong>Annulation</strong> : gratuite jusqu’à 48 h avant le départ ; au-delà, 50 % du montant reste dû.</li></ul>' +
          '<p>D’autres astuces vous attendent dans notre guide <a href="/guides/location-voiture-jeune-conducteur">location de voiture jeune conducteur</a>.</p>',
      },
      {
        h2: 'Réserver votre location jeune conducteur',
        html: '<p>La réservation se fait en ligne 24 h sur 24, avec une confirmation immédiate par email, ou par téléphone et WhatsApp au 07 49 58 81 44. Le paiement est possible par carte bancaire, Apple Pay ou Google Pay, et en 3 ou 4 fois sans frais à partir de 150 €.</p>' +
          '<p>Au départ, à l’agence d’Yvrac (parking gratuit, retrait sans supplément), présentez votre permis, une pièce d’identité à votre nom et votre carte bancaire. Toutes les règles figurent dans nos <a href="/conditions-de-location">conditions de location</a>.</p>',
      },
    ],
    faq: [
      { q: 'À partir de quel âge peut-on louer une voiture chez PRISMA Automobiles ?', a: 'Dès 21 ans, avec au moins 2 ans de permis, pour la Clio V, la Peugeot 208 automatique et les utilitaires Kangoo, Trafic et Master 12 m³.' },
      { q: 'Qu’est-ce qu’un jeune conducteur ?', a: 'Un conducteur dont le permis a moins de 3 ans, quel que soit son âge. Il paie un supplément de 15 € par jour, 150 € au maximum par location.' },
      { q: 'La caution est-elle débitée ?', a: 'Non, c’est une empreinte bancaire, libérée au retour du véhicule, déduction faite d’éventuels frais. Pour un jeune conducteur, elle est augmentée de 500 €.' },
      { q: 'Puis-je louer la Tesla Model 3 ou le Mercedes GLC ?', a: 'Pas encore : ces deux modèles demandent 25 ans et 3 ans de permis. La Classe A et le 5008 sont accessibles dès 23 ans.' },
      { q: 'Peut-on louer un utilitaire en étant jeune conducteur ?', a: 'Oui, le Kangoo Van, le Trafic 6 m³ et le Master 12 m³ sont accessibles dès 21 ans et 2 ans de permis, avec le permis B. Le 20 m³ demande 3 ans de permis.' },
      { q: 'Le supplément s’applique-t-il aussi aux utilitaires ?', a: 'Oui, il dépend de l’ancienneté de votre permis, pas du véhicule loué : 15 € par jour, plafonné à 150 € par location.' },
    ],
    related: ['/guides/location-voiture-jeune-conducteur', '/location-voiture-pas-chere-bordeaux', '/location-utilitaire-bordeaux', '/location-voiture-automatique-bordeaux', '/conditions-de-location'],
  },

  {
    path: '/location-voiture-au-mois-bordeaux',
    kind: 'landing',
    title: 'Location voiture au mois Bordeaux : 30 % de remise | PRISMA',
    description: 'Location voiture au mois à Bordeaux : 30 % de remise automatique dès 28 jours. Clio V, 208, Kangoo ou Trafic, paiement en 3 ou 4 fois sans frais.',
    h1: 'Location de voiture au mois à Bordeaux',
    eyebrow: 'Dès 28 jours',
    lead: 'La location de voiture au mois à Bordeaux devient avantageuse dès 28 jours : PRISMA Automobiles applique alors automatiquement 30 % de remise sur le prix de location. Mission, période d’essai ou voiture immobilisée, vous gardez un véhicule le temps nécessaire, sans contrat de plusieurs années.',
    vehicles: ['v-clio', 'v-208', 'v-kangoo', 'v-trafic'],
    sections: [
      {
        h2: 'Location voiture au mois à Bordeaux : comment ça marche',
        html: '<p>Vous réservez comme pour une location classique, en choisissant vos dates de départ et de retour. Dès que la durée atteint <strong>28 jours</strong>, la remise de <strong>30 %</strong> s’applique automatiquement au prix de location du véhicule.</p>' +
          '<p>Le kilométrage inclus se cumule sur toute la durée : 250 km par jour pour la Clio V et la 208, soit 7 000 km sur 28 jours, et 150 km par jour pour les utilitaires, soit 4 200 km. Au-delà, chaque kilomètre est facturé au tarif du véhicule, et l’option kilométrage illimité coûte 12 € par jour.</p>' +
          '<p>Le véhicule se retire gratuitement à l’agence d’Yvrac, à environ 15 minutes de Bordeaux par la rocade. Il peut aussi vous être livré à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 € : sur un mois de location, ce service pèse peu.</p>',
      },
      {
        h2: 'Les paliers de remise selon la durée',
        html: '<p>Les tarifs dégressifs s’appliquent à toutes les locations, sans démarche de votre part :</p>' +
          '<ul><li>dès 3 jours : 5 % de remise ;</li><li>dès 5 jours : 10 % ;</li><li>dès 7 jours : 15 % ;</li><li>dès 14 jours : 20 % ;</li><li>dès 28 jours : <strong>30 %</strong>.</li></ul>' +
          '<p>Au-delà de 28 jours, la remise reste de 30 % : une location d’un mois complet en profite donc aussi. Pour un besoin plus court, les paliers intermédiaires comptent déjà : sur 14 jours, le Kangoo Van passe de 630 € à 504 € grâce aux 20 % de remise.</p>',
      },
      {
        h2: 'Exemples de prix pour un mois de location',
        html: '<ul><li><strong>Renault Clio V, 28 jours</strong> : 39 € × 28 jours = 1 092 € avant remise, soit <strong>764 €</strong> après 30 % de remise (environ 27,30 € par jour).</li><li><strong>Renault Clio V, 30 jours</strong> : 1 170 € avant remise, soit <strong>819 €</strong>.</li><li><strong>Renault Kangoo Van, 28 jours</strong> : 45 € × 28 jours = 1 260 €, soit <strong>882 €</strong> après remise.</li><li><strong>Renault Trafic 6 m³, 28 jours</strong> : 65 € × 28 jours = 1 820 €, soit <strong>1 274 €</strong> après remise.</li></ul>' +
          '<p>Ces montants sont TTC et dépassent 150 € : ils peuvent donc être réglés en 3 ou 4 fois sans frais. Pour les petits budgets, voyez aussi notre <a href="/location-voiture-pas-chere-bordeaux">location de voiture pas chère</a>.</p>' +
          '<p>Sur une longue période, les options plafonnées deviennent avantageuses : le conducteur supplémentaire coûte 6 € par jour mais 60 € au maximum, le siège enfant 40 € au maximum par siège et la circulation en Europe 70 € au maximum. L’option kilométrage illimité, elle, n’a pas de plafond : 12 € par jour, soit 336 € sur 28 jours.</p>',
      },
      {
        h2: 'Location longue durée à Bordeaux : au mois ou en LLD ?',
        html: '<p>La <strong>location longue durée (LLD)</strong> repose sur un contrat de plusieurs mois ou plusieurs années, avec un engagement sur toute la période. Ce n’est pas l’offre présentée ici.</p>' +
          '<p>La location au mois est une location classique, simplement plus longue : vous réservez de date à date, pour 28 jours, un mois ou davantage, sans vous engager sur des années. C’est la bonne formule pour un besoin temporaire, quand acheter une voiture ou signer une LLD serait disproportionné.</p>',
      },
      {
        h2: 'Pour quels besoins louer une voiture au mois ?',
        html: '<ul><li><strong>Mission ou contrat court</strong> dans la région bordelaise, sans vouloir acheter de véhicule.</li><li><strong>Période d’essai</strong> dans un nouvel emploi, avant de choisir votre future voiture.</li><li><strong>Véhicule en réparation</strong> ou en attente de livraison : vous restez mobile.</li><li><strong>Installation à Bordeaux</strong>, le temps de trouver vos repères.</li><li><strong>Travaux chez vous</strong> : un Kangoo Van pour les allers-retours au magasin de bricolage et à la déchetterie.</li></ul>' +
          '<p>Pour la ville et les trajets domicile-travail, la <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a> offre le confort de la boîte automatique ; la Clio V reste la solution la plus économique de la flotte.</p>',
      },
      {
        h2: 'Professionnels : utilitaires au mois et devis sur mesure',
        html: '<p>Pour un chantier de plusieurs semaines, le <strong>Kangoo Van</strong> (3,3 m³, 650 kg) et le <strong>Trafic 6 m³</strong> (1 100 kg, 3 places) se louent au mois avec la même remise de 30 %. En mode « Professionnel », les prix sont affichés HT et la facture est établie au nom de la société.</p>' +
          '<p>Pour plusieurs véhicules ou une durée plus longue, demandez un devis sur mesure par WhatsApp au 07 49 58 81 44. Tout est détaillé sur la page <a href="/professionnels">location de véhicules pour les professionnels</a>.</p>',
      },
    ],
    faq: [
      { q: 'À partir de combien de jours la remise de 30 % s’applique-t-elle ?', a: 'Dès 28 jours de location. Elle est calculée automatiquement sur le prix de location du véhicule.' },
      { q: 'Combien coûte une Clio V pendant 28 jours ?', a: '39 € × 28 jours = 1 092 € avant remise, soit 764 € TTC après la remise de 30 %, avec 7 000 km inclus.' },
      { q: 'Proposez-vous la location longue durée (LLD) ?', a: 'Ce n’est pas l’offre présentée ici : la LLD engage sur plusieurs mois ou années, alors que la location au mois se réserve de date à date.' },
      { q: 'Peut-on payer une location au mois en plusieurs fois ?', a: 'Oui, le paiement en 3 ou 4 fois sans frais est proposé à partir de 150 €.' },
      { q: 'La caution est-elle plus élevée pour un mois ?', a: 'Non, elle dépend du véhicule et non de la durée : 800 € pour la Clio V (500 € de plus pour un permis de moins de 3 ans), par empreinte bancaire non débitée.' },
      { q: 'Et si je roule beaucoup ?', a: 'Au-delà du kilométrage inclus, chaque kilomètre est facturé au tarif du véhicule, soit 0,25 € pour la Clio V. L’option kilométrage illimité coûte 12 € par jour.' },
    ],
    related: ['/location-voiture-pas-chere-bordeaux', '/professionnels', '/location-utilitaire-bordeaux', '/conditions-de-location', '/location-voiture-bordeaux'],
  },

  {
    path: '/location-voiture-week-end-bordeaux',
    kind: 'landing',
    title: 'Location voiture week-end Bordeaux, dès vendredi | PRISMA',
    description: 'Location voiture week-end à Bordeaux : départ vendredi soir ou samedi, retour lundi matin. Clio, Classe A, Tesla ou GLC pour Arcachon ou Saint-Émilion.',
    h1: 'Location de voiture pour le week-end à Bordeaux',
    eyebrow: 'Escapades du week-end',
    lead: 'Pour une location de voiture le week-end à Bordeaux, partez le vendredi soir ou le samedi matin depuis l’agence PRISMA Automobiles d’Yvrac. Bassin d’Arcachon, Saint-Émilion ou Médoc : choisissez la citadine économique, la Mercedes ou la Tesla, et profitez de la route.',
    vehicles: ['v-clio', 'v-classea', 'v-tesla', 'v-glc'],
    sections: [
      {
        h2: 'Location voiture week-end Bordeaux : départ vendredi soir ou samedi',
        html: '<p>L’<a href="/location-voiture-yvrac">agence d’Yvrac</a> est ouverte le <strong>vendredi jusqu’à 19 h</strong> et le <strong>samedi de 9 h à 18 h</strong>. Vous pouvez donc récupérer votre véhicule en fin de journée le vendredi, ou le samedi matin pour un départ plus tranquille.</p>' +
          '<p>L’agence est <strong>fermée le dimanche</strong> : aucun retour n’est possible ce jour-là. Pour un week-end complet, le véhicule se rend le <strong>lundi à partir de 8 h 30</strong> ; pour une sortie d’une journée, le samedi avant 18 h.</p>',
      },
      {
        h2: 'Retour le lundi : comment les jours sont comptés',
        html: '<p>La location se compte en jours, par tranches de 24 heures à partir de l’heure de départ, avec 59 minutes de tolérance au retour. Quelques exemples :</p>' +
          '<ul><li>départ le samedi à 10 h, retour le lundi à 10 h : <strong>2 jours</strong> ;</li><li>départ le vendredi à 18 h, retour le lundi matin : <strong>3 jours</strong>, et la remise de 5 % s’applique dès 3 jours ;</li><li>départ le samedi à 9 h, retour le samedi à 18 h : <strong>1 jour</strong>.</li></ul>' +
          '<p>Avec une Renault Clio V à 39 € par jour, le week-end du samedi 10 h au lundi 10 h revient ainsi à 78 € TTC, avec 500 km inclus.</p>',
      },
      {
        h2: 'Trois idées d’escapade depuis Bordeaux',
        html: '<ul><li><strong>Le bassin d’Arcachon</strong>, à environ 1 h de route de Bordeaux : plages, cabanes ostréicoles et balades au bord de l’eau.</li><li><strong>Saint-Émilion</strong>, à environ 40 minutes : la cité médiévale et ses vignobles, parfaits pour une journée.</li><li><strong>Le Médoc</strong> : la route des châteaux viticoles, le long de l’estuaire de la Gironde.</li></ul>' +
          '<p>Pour une journée de dégustations à Saint-Émilion ou dans le Médoc, désignez un conducteur qui ne boit pas, ou déclarez un conducteur supplémentaire (6 € par jour, 60 € au maximum) pour vous relayer au volant. Pour préparer votre itinéraire, lisez notre guide des <a href="/guides/escapades-week-end-depuis-bordeaux">escapades de week-end depuis Bordeaux</a>.</p>',
      },
      {
        h2: 'Quelle voiture pour votre week-end ?',
        html: '<ul><li><strong>Renault Clio V</strong> (39 € par jour, 250 km inclus par jour) : économique et agréable, avec Apple CarPlay et Android Auto.</li><li><strong>Mercedes Classe A 180</strong> (69 € par jour, 300 km par jour) : écran MBUX et sièges chauffants, dès 23 ans.</li><li><strong>Tesla Model 3</strong> (95 € par jour, 300 km par jour) : toit panoramique, Autopilot, jusqu’à 500 km d’autonomie annoncée et accès aux Superchargeurs.</li><li><strong>Mercedes GLC AMG Line</strong> (139 € par jour) : SUV premium, sellerie cuir, audio premium et <strong>kilométrage illimité</strong>.</li></ul>' +
          '<p>La Tesla et le GLC sont accessibles dès 25 ans avec 3 ans de permis, et la Tesla se rend avec au moins 70 % de charge. Comparez les modèles haut de gamme sur la page <a href="/location-voiture-premium-bordeaux">location de voiture premium</a>.</p>' +
          '<p>Les franchises de ces modèles sont plus élevées (2 500 € pour la Tesla, 3 500 € pour le GLC) : la Protection Sérénité, à 22 € par jour, les ramène à zéro en cas de dommage ou de vol. La Protection Confort (12 € par jour) les divise par deux.</p>',
      },
      {
        h2: 'Kilomètres inclus et option illimitée',
        html: '<p>Les kilomètres inclus se cumulent sur la durée de location : 500 km pour une Clio V louée 2 jours, 600 km pour une Classe A ou une Tesla. Au-delà, chaque kilomètre est facturé 0,25 € avec la Clio V, 0,30 € avec la Tesla et 0,35 € avec la Classe A.</p>' +
          '<p>L’option <strong>kilométrage illimité</strong> coûte 12 € par jour. Avec la Clio V, elle équivaut à 48 km supplémentaires par jour : si votre programme dépasse nettement le forfait, elle devient vite intéressante. Le GLC, lui, roule toujours en kilométrage illimité.</p>',
      },
      {
        h2: 'Réserver votre week-end',
        html: '<p>Réservez en ligne 24 h sur 24 : la confirmation arrive immédiatement par email. L’annulation est gratuite jusqu’à 48 h avant le départ, pratique si la météo change vos plans.</p>' +
          '<p>Le paiement se fait par carte bancaire, Apple Pay ou Google Pay, et en 3 ou 4 fois sans frais à partir de 150 € : un week-end de 2 jours en Tesla Model 3, à 190 €, peut ainsi être étalé.</p>' +
          '<p>Pensez aux options utiles : siège enfant ou rehausseur (5 € par jour), et circulation en Europe si vous passez la frontière vers l’Espagne (7 € par jour, 70 € au maximum).</p>',
      },
    ],
    faq: [
      { q: 'Peut-on rendre la voiture le dimanche soir ?', a: 'Non, l’agence est fermée le dimanche. Le retour se fait le lundi à partir de 8 h 30, ou le samedi avant 18 h pour une sortie à la journée.' },
      { q: 'Combien de jours sont facturés pour un week-end ?', a: 'La location se compte par tranches de 24 heures : du samedi 10 h au lundi 10 h, 2 jours ; du vendredi 18 h au lundi matin, 3 jours, avec 5 % de remise.' },
      { q: 'Le kilométrage est-il illimité ?', a: 'Il l’est d’office sur le Mercedes GLC. Les autres modèles incluent 250 ou 300 km par jour, et l’option kilométrage illimité coûte 12 € par jour.' },
      { q: 'Peut-on aller au bassin d’Arcachon avec la Tesla ?', a: 'Oui, le bassin est à environ 1 h de Bordeaux et la Model 3 annonce jusqu’à 500 km d’autonomie. Rendez-la avec au moins 70 % de charge.' },
      { q: 'Quel âge faut-il pour louer une voiture premium le week-end ?', a: '23 ans et 2 ans de permis pour la Mercedes Classe A ; 25 ans et 3 ans de permis pour la Tesla Model 3 et le Mercedes GLC.' },
      { q: 'Peut-on récupérer la voiture à la gare Saint-Jean ?', a: 'Oui, pour 25 € à la remise, et 25 € à la restitution si vous la rendez à la gare. Le retrait à l’agence d’Yvrac est gratuit.' },
    ],
    related: ['/guides/escapades-week-end-depuis-bordeaux', '/location-voiture-premium-bordeaux', '/location-voiture-electrique-bordeaux', '/location-suv-bordeaux', '/location-voiture-gare-saint-jean'],
  },

  {
    path: '/professionnels',
    kind: 'landing',
    title: 'Location véhicule professionnel Bordeaux | PRISMA',
    description: 'Location véhicule professionnel à Bordeaux : utilitaires et voitures d’entreprise à prix HT, facture au nom de votre société. Devis sur mesure par WhatsApp.',
    h1: 'Location de véhicule professionnel à Bordeaux',
    eyebrow: 'Artisans et entreprises',
    lead: 'La location de véhicule professionnel à Bordeaux doit rester simple : chez PRISMA Automobiles, le mode « Professionnel » affiche les prix HT et chaque facture est établie au nom de votre société. Utilitaires du Kangoo au 20 m³, citadines pour vos équipes : réservez en ligne ou par WhatsApp, et demandez un devis sur mesure pour plusieurs véhicules ou une longue durée.',
    vehicles: ['v-kangoo', 'v-trafic', 'v-master12', 'v-master20', 'v-clio', 'v-208'],
    sections: [
      {
        h2: 'Location de véhicule professionnel à Bordeaux : prix HT et facture société',
        html: '<p>Activez le mode <strong>« Professionnel »</strong> lors de la réservation : les prix s’affichent <strong>HT</strong> et la facture est établie <strong>au nom de votre société</strong>, avec une TVA récupérable dans les conditions prévues pour votre activité. Notre guide <a href="/guides/location-vehicule-professionnel-tva">location de véhicule professionnel et TVA</a> détaille les règles.</p>' +
          '<p>Le paiement se fait en ligne par carte bancaire, Apple Pay ou Google Pay, en 3 ou 4 fois sans frais à partir de 150 €, ou par virement bancaire : la facture et le RIB vous sont envoyés par email, et le véhicule vous est remis dès réception du virement. Votre espace client regroupe toutes vos réservations.</p>',
      },
      {
        h2: 'Location utilitaire professionnel : du Kangoo au 20 m³',
        html: '<ul><li><strong>Renault Kangoo Van</strong> (45 € TTC par jour) : 3,3 m³, 650 kg, cloison et porte latérale coulissante, pour l’outillage et les livraisons.</li><li><strong>Renault Trafic 6 m³</strong> (65 € TTC par jour) : 1 100 kg, 3 places, porte latérale et portes arrière à 180°, pour une équipe et son matériel.</li><li><strong>Renault Master 12 m³</strong> (79 € TTC par jour) : 1 300 kg, 1,90 m de hauteur intérieure, caméra de recul et anneaux d’arrimage.</li><li><strong>Utilitaire 20 m³ avec hayon</strong> (109 € TTC par jour) : 950 kg, 3 places, hayon élévateur de 500 kg, rampe et barres d’arrimage, sous les 3,5 tonnes.</li></ul>' +
          '<p>Tous se conduisent avec le <strong>permis B</strong> et incluent 150 km par jour. Comparez les volumes sur la page <a href="/location-utilitaire-bordeaux">location d’utilitaire à Bordeaux</a>.</p>',
      },
      {
        h2: 'Artisans, BTP, déménageurs, commerçants : à chaque métier son véhicule',
        html: '<ul><li><strong>Artisans et BTP</strong> : le Kangoo ou le Trafic pour les chantiers, avec l’option retour sans lavage (25 € le forfait) quand le véhicule revient poussiéreux.</li><li><strong>Déménageurs</strong> : le 20 m³ avec hayon et le kit déménagement (19 € : diable, sangles, six couvertures de protection).</li><li><strong>Commerçants</strong> : le Kangoo Van pour les livraisons et les achats chez les fournisseurs, le Master 12 m³ pour un salon ou un gros réassort.</li><li><strong>Équipes en déplacement</strong> : la Clio V ou la 208 automatique, avec 250 km inclus par jour.</li></ul>' +
          '<p>Pour limiter les imprévus, la Protection Sérénité (22 € par jour) ramène la franchise à zéro en cas de dommage ou de vol.</p>',
      },
      {
        h2: 'Location voiture entreprise : Clio V et 208 pour vos équipes',
        html: '<p>Pour un commercial en tournée, un technicien en mission ou un collaborateur de passage, la <strong>Renault Clio V</strong> (39 € TTC par jour) et la <strong>Peugeot 208 automatique</strong> (49 € TTC par jour) offrent climatisation, Apple CarPlay et Android Auto. Pour recevoir un client ou un dirigeant, la Mercedes Classe A 180 (69 € TTC par jour) ou la Tesla Model 3 (95 € TTC par jour) apportent une touche premium.</p>' +
          '<p>Plusieurs salariés se relaient au volant ? Déclarez jusqu’à 2 conducteurs supplémentaires, pour 6 € par jour (60 € au maximum). Un collègue arrive en train ou en avion : le véhicule peut lui être remis à la gare Saint-Jean (25 €) ou à l’aéroport de Mérignac (35 €).</p>',
      },
      {
        h2: 'Devis sur mesure : plusieurs véhicules ou longue durée',
        html: '<p>Vous avez besoin de plusieurs utilitaires pour un chantier, ou d’un véhicule pendant plusieurs semaines ? Nous établissons un <strong>devis sur mesure</strong>, avec des tarifs dégressifs jusqu’à 30 %. Pour le préparer, indiquez le nombre et le type de véhicules, les dates, le lieu de remise et le kilométrage prévu.</p>' +
          '<p>En réservation directe, les remises s’appliquent déjà automatiquement : 5 % dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours. Voir aussi notre offre de <a href="/location-voiture-au-mois-bordeaux">location au mois</a>.</p>',
      },
      {
        h2: 'Réservation en ligne et devis sur WhatsApp',
        html: '<p>Réservez en ligne 24 h sur 24, sur le site ou depuis l’application installable sur votre téléphone, avec une confirmation immédiate par email. Pour un devis ou une question, écrivez-nous sur WhatsApp ou appelez le <strong>07 49 58 81 44</strong>. Au départ, le conducteur présente son permis et une pièce d’identité à son nom ; la caution est prise par empreinte sur une carte bancaire, sans débit.</p>' +
          '<p>Les véhicules se retirent à l’agence d’Yvrac, 72 bis avenue des Tabernottes, à environ 15 minutes de Bordeaux par la rocade, avec parking gratuit et retrait sans supplément. Ils peuvent aussi être livrés à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 €.</p>',
      },
    ],
    faq: [
      { q: 'Les prix sont-ils affichés HT pour les professionnels ?', a: 'Oui, en mode « Professionnel », les prix sont affichés HT et la facture est établie au nom de votre société.' },
      { q: 'La TVA est-elle récupérable ?', a: 'En règle générale oui sur un utilitaire affecté à votre activité, le plus souvent non sur une voiture particulière. Notre <a href="/guides/location-vehicule-professionnel-tva">guide sur la TVA</a> détaille les règles.' },
      { q: 'Pouvez-vous établir un devis pour plusieurs véhicules ?', a: 'Oui, un devis sur mesure est proposé pour plusieurs véhicules ou une longue durée, avec des tarifs dégressifs jusqu’à 30 %. Demandez-le par WhatsApp au 07 49 58 81 44.' },
      { q: 'Plusieurs salariés peuvent-ils conduire le même véhicule ?', a: 'Oui, jusqu’à 2 conducteurs supplémentaires peuvent être déclarés, pour 6 € par jour et 60 € au maximum.' },
      { q: 'Faut-il un permis poids lourd pour le 20 m³ ?', a: 'Non, il reste sous les 3,5 tonnes et se conduit avec le permis B, dès 21 ans et avec au moins 3 ans de permis.' },
      { q: 'Livrez-vous les véhicules sur un chantier ?', a: 'Oui, à une adresse dans Bordeaux Métropole, dans un rayon de 25 km : 40 € à la remise, et 40 € si le véhicule est repris sur place.' },
    ],
    related: ['/location-utilitaire-bordeaux', '/location-camion-demenagement-bordeaux', '/location-voiture-au-mois-bordeaux', '/guides/location-vehicule-professionnel-tva', '/location-voiture-livraison-bordeaux'],
  },
]);

/* Contenu SEO : fiches véhicules, accueil, catalogue et points de retrait */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([

  /* ---------- Fiches véhicules ---------- */

  {
    path: '/vehicule/renault-clio-v',
    kind: 'vehicle',
    id: 'v-clio',
    title: 'Location Renault Clio V Bordeaux dès 39 €/jour | PRISMA',
    description: 'Location Renault Clio V à Bordeaux dès 39 € par jour : 250 km inclus, caution 800 € non débitée, dès 21 ans. Retrait à Yvrac, en gare ou à l’aéroport.',
    h1: 'Location Renault Clio V à Bordeaux',
    eyebrow: 'Citadine',
    lead: 'La location d’une Renault Clio V à Bordeaux est proposée à 39 € par jour, avec 250 km inclus chaque jour : c’est le modèle le plus accessible de notre flotte. Cinq places, boîte manuelle et moteur essence, pour circuler en ville comme pour sortir en Gironde.',
    ideal: ['Trajets en ville', 'Petits budgets', 'Week-ends en Gironde', 'Jeunes conducteurs'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer une Renault Clio V à Bordeaux : pour qui ?',
        html: '<p>La Clio V est une citadine au gabarit compact, simple à garer dans le centre de Bordeaux comme sur la rive droite. Elle se prête aux trajets du quotidien, aux rendez-vous en ville et aux escapades du week-end, par exemple vers Saint-Émilion, à environ 40 minutes de Bordeaux.</p>' +
          '<p>Accessible dès 21 ans avec 2 ans de permis, c’est aussi une première location rassurante pour un jeune conducteur. Vous préférez ne pas passer les vitesses ? La <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a> est l’alternative directe.</p>',
      },
      {
        h2: 'À bord de la Clio V : équipements et espace',
        html: '<p>La Clio V accueille 5 personnes et 2 valises dans son coffre. Son équipement couvre l’essentiel :</p>' +
          '<ul><li>climatisation ;</li><li>Bluetooth ;</li><li>Apple CarPlay et Android Auto pour la navigation et la musique ;</li><li>régulateur de vitesse, pratique sur la rocade et l’autoroute.</li></ul>' +
          '<p>Elle est proposée « ou similaire » : selon les disponibilités, une citadine équivalente de la même catégorie peut vous être remise.</p>',
      },
      {
        h2: 'Tarif et conditions de location de la Clio V',
        html: '<ul><li><strong>Prix :</strong> 39 € TTC par jour.</li><li><strong>Kilométrage :</strong> 250 km inclus par jour, puis 0,25 € par kilomètre supplémentaire.</li><li><strong>Caution :</strong> 800 €, par empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 1 000 € en cas de dommage.</li><li><strong>Conducteur :</strong> 21 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>Les tarifs dégressifs s’appliquent automatiquement : 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours. Avec un permis de moins de 3 ans, ajoutez 15 € par jour (150 € maximum par location) ; la caution augmente alors de 500 €.</p>',
      },
      {
        h2: 'Conseils pratiques avant de partir',
        html: '<p>Le retrait est gratuit à l’agence d’Yvrac. La Clio V peut aussi vous être remise à la gare Saint-Jean (25 €), à l’aéroport de Mérignac (35 €) ou livrée à votre adresse dans Bordeaux Métropole (40 €).</p>' +
          '<p>Elle part avec le plein : rendez-la au même niveau, sinon le carburant manquant est facturé 14 € le huitième de réservoir. Pour un enfant, ajoutez un siège ou un rehausseur (5 € par jour, 40 € maximum).</p>',
      },
    ],
    faq: [
      { q: 'Combien de kilomètres puis-je parcourir avec la Clio V ?', a: '250 km sont inclus par jour de location. Au-delà, chaque kilomètre coûte 0,25 €, sauf si vous choisissez l’option kilométrage illimité à 12 € par jour.' },
      { q: 'Puis-je louer la Clio V avec un permis récent ?', a: 'Oui, dès 21 ans et 2 ans de permis. Notre <a href="/guides/location-voiture-jeune-conducteur">guide jeune conducteur</a> détaille le supplément appliqué aux permis de moins de 3 ans.' },
      { q: 'Puis-je annuler ma réservation ?', a: 'Oui, sans frais jusqu’à 48 h avant le départ. Au-delà, 50 % du montant de la location reste dû.' },
    ],
    related: ['/location-voiture-bordeaux', '/location-voiture-pas-chere-bordeaux', '/vehicule/peugeot-208-automatique', '/location-voiture-week-end-bordeaux', '/guides/location-voiture-jeune-conducteur'],
  },

  {
    path: '/vehicule/peugeot-208-automatique',
    kind: 'vehicle',
    id: 'v-208',
    title: 'Location Peugeot 208 automatique Bordeaux dès 49 € | PRISMA',
    description: 'Location Peugeot 208 automatique à Bordeaux dès 49 € par jour : boîte auto, caméra de recul, 250 km inclus par jour. Retrait à Yvrac, en gare ou livraison.',
    h1: 'Location Peugeot 208 automatique à Bordeaux',
    eyebrow: 'Citadine automatique',
    lead: 'La location d’une Peugeot 208 automatique à Bordeaux vous offre une citadine sans pédale d’embrayage, à 49 € par jour avec 250 km inclus chaque jour. Cinq places, moteur essence, climatisation automatique et caméra de recul : la conduite en ville devient reposante.',
    ideal: ['Conduite en ville', 'Heures de pointe', 'Adeptes de la boîte automatique', 'Trajets du quotidien'],
    vehicles: [],
    sections: [
      {
        h2: 'Pourquoi louer une Peugeot 208 automatique à Bordeaux ?',
        html: '<p>Aux heures de pointe, sur la rocade ou dans le centre de Bordeaux, la boîte automatique vous évite de jongler avec l’embrayage à chaque arrêt. C’est le bon choix si vous avez l’habitude de ce type de boîte ou si vous roulez surtout en ville.</p>' +
          '<p>La 208 garde les atouts d’une citadine : un gabarit compact, facile à garer, et un coffre pour 2 valises. D’autres modèles sans embrayage vous attendent sur notre page <a href="/location-voiture-automatique-bordeaux">location de voiture automatique</a>.</p>',
      },
      {
        h2: 'Équipements de la 208 automatique',
        html: '<ul><li>boîte automatique ;</li><li>climatisation automatique ;</li><li>caméra de recul, précieuse pour les créneaux ;</li><li>Apple CarPlay et Android Auto.</li></ul>' +
          '<p>La 208 est proposée « ou similaire » : selon les disponibilités, vous pouvez recevoir une autre citadine de la même catégorie, donc toujours en boîte automatique.</p>',
      },
      {
        h2: 'Prix et conditions de location de la 208',
        html: '<p>La 208 automatique est louée 49 € TTC par jour, avec 250 km inclus par jour et 0,25 € par kilomètre supplémentaire. La caution de 900 € est prise par empreinte bancaire, sans débit, puis libérée au retour, déduction faite d’éventuels frais. La franchise en cas de dommage est de 1 000 €.</p>' +
          '<p>Il faut avoir 21 ans et 2 ans de permis. Les tarifs dégressifs réduisent le prix de 5 % dès 3 jours et jusqu’à 30 % dès 28 jours. Un permis de moins de 3 ans entraîne un supplément de 15 € par jour, plafonné à 150 € par location, et une caution augmentée de 500 €.</p>',
      },
      {
        h2: 'Nos conseils pour votre location',
        html: '<p>Vous arrivez en train ? Les clés vous sont remises en main propre à la gare Saint-Jean, sortie Belcier (25 €). Le retrait reste gratuit à l’agence d’Yvrac, à environ 15 minutes de Bordeaux par la rocade.</p>' +
          '<p>Pour alléger la franchise, la Protection Confort (12 € par jour) la divise par deux ; la Protection Sérénité (22 € par jour) la ramène à zéro en cas de dommage ou de vol.</p>',
      },
    ],
    faq: [
      { q: 'Quelle différence avec la Renault Clio V ?', a: 'La <a href="/vehicule/renault-clio-v">Clio V</a>, à 39 € par jour, a une boîte manuelle. La 208 ajoute la boîte automatique, la climatisation automatique et la caméra de recul, avec les mêmes 5 places et 250 km inclus par jour.' },
      { q: 'Puis-je payer en plusieurs fois ?', a: 'Oui, en 3 ou 4 fois sans frais à partir de 150 €. Le paiement se fait en ligne par carte bancaire, Apple Pay ou Google Pay.' },
      { q: 'Puis-je rendre la voiture dans un autre point ?', a: 'Oui, le retour peut se faire ailleurs qu’au départ ; le supplément du point de retour s’applique alors. Consultez nos <a href="/agences">points de retrait</a>.' },
    ],
    related: ['/location-voiture-automatique-bordeaux', '/vehicule/renault-clio-v', '/vehicule/mercedes-classe-a-180', '/location-voiture-gare-saint-jean', '/location-voiture-bordeaux'],
  },

  {
    path: '/vehicule/mercedes-classe-a-180',
    kind: 'vehicle',
    id: 'v-classea',
    title: 'Location Mercedes Classe A Bordeaux dès 69 €/jour | PRISMA',
    description: 'Location Mercedes Classe A 180 à Bordeaux dès 69 € par jour : boîte automatique, écran MBUX, sièges chauffants, 300 km inclus par jour. Réservez en ligne.',
    h1: 'Location Mercedes Classe A 180 à Bordeaux',
    eyebrow: 'Compacte premium',
    lead: 'La location d’une Mercedes Classe A 180 à Bordeaux associe le confort d’une Mercedes à un format compact, à 69 € par jour avec 300 km inclus chaque jour. Boîte automatique, écran MBUX et sièges chauffants : un choix élégant pour vos rendez-vous comme pour vos week-ends.',
    ideal: ['Rendez-vous professionnels', 'Week-ends confort', 'Occasions spéciales', 'Trajets en ville'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer une Mercedes Classe A à Bordeaux : pour quels usages ?',
        html: '<p>La Classe A 180 s’adresse à ceux qui veulent l’image et le confort d’une Mercedes sans le gabarit d’une grande berline. Compacte, elle reste simple à garer en ville et vous accompagne aussi bien pour une journée de rendez-vous que pour un week-end.</p>' +
          '<p>Les entreprises la réservent en mode « Professionnel » : prix hors taxes et facture au nom de la société, avec la TVA indiquée. Découvrez l’offre <a href="/professionnels">professionnels</a>.</p>',
      },
      {
        h2: 'À bord de la Classe A 180',
        html: '<ul><li>boîte automatique et moteur essence ;</li><li>écran MBUX ;</li><li>sièges chauffants, appréciables l’hiver ;</li><li>aide au stationnement.</li></ul>' +
          '<p>Elle accueille 5 personnes et 3 valises. La Classe A est proposée « ou similaire » : une compacte premium équivalente peut vous être remise selon les disponibilités.</p>',
      },
      {
        h2: 'Tarif et conditions de location',
        html: '<ul><li><strong>Prix :</strong> 69 € TTC par jour, avec 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</li><li><strong>Kilométrage :</strong> 300 km inclus par jour, puis 0,35 € par kilomètre.</li><li><strong>Caution :</strong> 1 500 €, par empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 1 800 € en cas de dommage.</li><li><strong>Conducteur :</strong> 23 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>Si votre permis a moins de 3 ans, un supplément jeune conducteur de 15 € par jour s’applique, plafonné à 150 € par location, et la caution augmente de 500 €.</p>',
      },
      {
        h2: 'Conseils pratiques',
        html: '<p>Pour un rendez-vous d’affaires, la livraison à votre adresse dans Bordeaux Métropole (40 €, dans un rayon de 25 km) vous évite le trajet jusqu’à l’agence. Le retrait reste gratuit à Yvrac, avec parking gratuit sur place.</p>' +
          '<p>La Classe A part avec le plein et se rend au même niveau. Avec une franchise de 1 800 €, la Protection Sérénité (22 € par jour) peut rassurer : zéro franchise en cas de dommage ou de vol.</p>',
      },
    ],
    faq: [
      { q: 'Quelle différence avec le Mercedes GLC ?', a: 'Le <a href="/vehicule/mercedes-glc-amg-line">GLC AMG Line</a> est un SUV premium diesel, avec kilométrage illimité et 4 valises, à 139 € par jour. Il demande 25 ans et 3 ans de permis, contre 23 ans et 2 ans pour la Classe A.' },
      { q: 'Comment fonctionne la caution ?', a: 'La caution de 1 500 € est une empreinte bancaire : elle n’est pas débitée et elle est libérée au retour, déduction faite d’éventuels frais.' },
      { q: 'Puis-je partager le volant ?', a: 'Oui, avec l’option conducteur supplémentaire : 6 € par jour (60 € maximum), jusqu’à 2 conducteurs en plus.' },
    ],
    related: ['/location-voiture-premium-bordeaux', '/location-voiture-automatique-bordeaux', '/vehicule/mercedes-glc-amg-line', '/vehicule/tesla-model-3', '/guides/location-vehicule-professionnel-tva'],
  },

  {
    path: '/vehicule/tesla-model-3',
    kind: 'vehicle',
    id: 'v-tesla',
    title: 'Location Tesla Model 3 Bordeaux dès 95 €/jour | PRISMA',
    description: 'Location Tesla Model 3 à Bordeaux dès 95 € par jour : jusqu’à 500 km d’autonomie annoncée, accès Superchargeurs, 300 km inclus par jour. Réservez en ligne.',
    h1: 'Location Tesla Model 3 à Bordeaux',
    eyebrow: 'Berline électrique',
    lead: 'La location d’une Tesla Model 3 à Bordeaux vous fait découvrir la conduite électrique le temps d’un déplacement ou d’un week-end, à 95 € par jour avec 300 km inclus chaque jour. Autonomie annoncée jusqu’à 500 km, accès aux Superchargeurs et écran de 15 pouces : une berline à l’aise en ville comme sur la route.',
    ideal: ['Découvrir l’électrique', 'Longs trajets', 'Déplacements professionnels', 'Escapades au bassin d’Arcachon'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer une Tesla Model 3 à Bordeaux : pour qui ?',
        html: '<p>La Model 3 plaît aux conducteurs curieux de l’électrique, aux professionnels qui enchaînent les rendez-vous et aux voyageurs qui préparent une escapade. Le bassin d’Arcachon, à environ 1 h de route de Bordeaux, ou Saint-Émilion, à environ 40 minutes, restent largement dans son autonomie annoncée.</p>' +
          '<p>Elle est réservée aux conducteurs de 25 ans et plus, titulaires du permis depuis au moins 3 ans. Les entreprises la réservent en mode « Professionnel », avec prix hors taxes et facture au nom de la société.</p>',
      },
      {
        h2: 'Équipements et autonomie',
        html: '<ul><li>Autopilot ;</li><li>toit panoramique ;</li><li>écran de 15 pouces ;</li><li>accès au réseau de Superchargeurs.</li></ul>' +
          '<p>L’autonomie annoncée atteint jusqu’à 500 km. La Model 3 accueille 5 personnes et 3 valises, avec une boîte automatique.</p>',
      },
      {
        h2: 'Prix et conditions de location de la Tesla Model 3',
        html: '<ul><li><strong>Prix :</strong> 95 € TTC par jour, avec 5 % de remise dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</li><li><strong>Kilométrage :</strong> 300 km inclus par jour, puis 0,30 € par kilomètre.</li><li><strong>Caution :</strong> 2 000 €, par empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 2 500 € en cas de dommage.</li><li><strong>Conducteur :</strong> 25 ans minimum et 3 ans de permis.</li></ul>' +
          '<p>La Tesla Model 3 est proposée « ou similaire », dans la même catégorie de berline électrique, selon les disponibilités.</p>',
      },
      {
        h2: 'Conseils pour rouler en électrique',
        html: '<p>La voiture se rend avec au moins 70 % de charge : si vous avez beaucoup roulé, prévoyez un arrêt sur un Superchargeur avant le retour. Pour un long voyage, l’option kilométrage illimité (12 € par jour) vous évite les kilomètres supplémentaires.</p>' +
          '<p>Retrait gratuit à Yvrac, ou remise à l’aéroport de Mérignac (35 €) si vous arrivez en avion. Notre guide <a href="/guides/louer-voiture-electrique-bordeaux">louer une voiture électrique à Bordeaux</a> répond à vos autres questions.</p>',
      },
    ],
    faq: [
      { q: 'Faut-il rendre la Tesla complètement rechargée ?', a: 'Non : elle doit revenir avec au moins 70 % de charge. Vous pouvez recharger sur les Superchargeurs, accessibles avec ce véhicule.' },
      { q: 'Un jeune conducteur peut-il louer la Tesla ?', a: 'Non, il faut 25 ans et au moins 3 ans de permis. Dès 21 ans et 2 ans de permis, la <a href="/vehicule/renault-clio-v">Renault Clio V</a> et la <a href="/vehicule/peugeot-208-automatique">Peugeot 208 automatique</a> sont accessibles.' },
      { q: 'Puis-je partir à l’étranger avec la Tesla ?', a: 'Oui, avec l’option circulation en Europe à 7 € par jour (70 € maximum), par exemple pour l’Espagne, le Portugal ou l’Italie.' },
    ],
    related: ['/location-voiture-electrique-bordeaux', '/guides/louer-voiture-electrique-bordeaux', '/location-voiture-premium-bordeaux', '/vehicule/mercedes-classe-a-180', '/guides/escapades-week-end-depuis-bordeaux'],
  },

  {
    path: '/vehicule/peugeot-5008-7-places',
    kind: 'vehicle',
    id: 'v-5008',
    title: 'Location Peugeot 5008 7 places Bordeaux dès 89 € | PRISMA',
    description: 'Location Peugeot 5008 7 places à Bordeaux dès 89 € par jour : SUV automatique, 5 valises, 300 km inclus par jour, siège enfant en option. Réservez en ligne.',
    h1: 'Location Peugeot 5008 7 places à Bordeaux',
    eyebrow: 'SUV 7 places',
    lead: 'La location d’un Peugeot 5008 7 places à Bordeaux permet d’emmener toute la famille ou un petit groupe dans un seul véhicule, à 89 € par jour avec 300 km inclus chaque jour. Boîte automatique, moteur diesel et coffre pour 5 valises.',
    ideal: ['Vacances en famille', 'Groupes jusqu’à 7 personnes', 'Mariages et fêtes', 'Transferts vers l’aéroport'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer le Peugeot 5008 7 places à Bordeaux : pour qui ?',
        html: '<p>Le 5008 s’adresse aux familles nombreuses, aux groupes d’amis et aux invités d’un mariage qui préfèrent voyager ensemble. Avec 7 places, une seule voiture suffit pour tout le monde, ce qui simplifie le trajet et le stationnement.</p>' +
          '<p>Pour un groupe plus important, le <a href="/vehicule/renault-trafic-9-places">Renault Trafic 9 places</a> prend le relais, toujours avec le permis B. Si 5 places suffisent, le <a href="/vehicule/mercedes-glc-amg-line">Mercedes GLC</a> apporte la finition AMG Line.</p>',
      },
      {
        h2: 'Équipements du Peugeot 5008',
        html: '<ul><li>7 places ;</li><li>grand coffre, pour 5 valises ;</li><li>boîte automatique ;</li><li>caméra de recul, utile pour manœuvrer ce grand gabarit.</li></ul>' +
          '<p>Le 5008 est proposé « ou similaire » : un SUV 7 places équivalent peut vous être remis selon les disponibilités.</p>',
      },
      {
        h2: 'Tarif et conditions de location du 5008',
        html: '<ul><li><strong>Prix :</strong> 89 € TTC par jour.</li><li><strong>Kilométrage :</strong> 300 km inclus par jour, puis 0,30 € par kilomètre supplémentaire.</li><li><strong>Caution :</strong> 1 500 €, non débitée.</li><li><strong>Franchise :</strong> 1 800 € en cas de dommage.</li><li><strong>Conducteur :</strong> 23 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>Pour une semaine de vacances, la remise atteint 15 % dès 7 jours (5 % dès 3 jours, 10 % dès 5 jours, 20 % dès 14 jours, 30 % dès 28 jours). Un permis de moins de 3 ans ajoute 15 € par jour, dans la limite de 150 € par location, et 500 € de caution.</p>',
      },
      {
        h2: 'Conseils pour partir en famille',
        html: '<p>Ajoutez jusqu’à 3 sièges enfant ou rehausseurs (5 € par jour, 40 € maximum) et un conducteur supplémentaire pour vous relayer (6 € par jour). Pour l’Espagne, le Portugal ou l’Italie, l’option circulation en Europe coûte 7 € par jour, plafonnée à 70 €.</p>' +
          '<p>Vous partez de l’aéroport de Mérignac ? Le 5008 peut vous y être remis (35 €). Idées de sorties dans notre guide des <a href="/guides/escapades-week-end-depuis-bordeaux">escapades depuis Bordeaux</a>.</p>',
      },
    ],
    faq: [
      { q: 'Combien de bagages peut-on emporter ?', a: 'Le coffre du 5008 accueille 5 valises. Pour un groupe avec davantage de bagages, le Trafic 9 places en prend 6.' },
      { q: 'Le kilométrage suffit-il pour partir en vacances ?', a: '300 km sont inclus par jour de location, puis 0,30 € par kilomètre. Pour un long trajet, l’option kilométrage illimité coûte 12 € par jour.' },
      { q: 'Puis-je réserver le 5008 par WhatsApp ?', a: 'Oui, par WhatsApp ou par téléphone au 07 49 58 81 44, ou en ligne 24 h sur 24 avec confirmation immédiate par email.' },
    ],
    related: ['/location-voiture-7-places-bordeaux', '/location-suv-bordeaux', '/vehicule/renault-trafic-9-places', '/vehicule/mercedes-glc-amg-line', '/guides/escapades-week-end-depuis-bordeaux'],
  },

  {
    path: '/vehicule/mercedes-glc-amg-line',
    kind: 'vehicle',
    id: 'v-glc',
    title: 'Location Mercedes GLC AMG Line Bordeaux dès 139 € | PRISMA',
    description: 'Location Mercedes GLC AMG Line à Bordeaux dès 139 € par jour : SUV premium, kilométrage illimité, cuir et sièges chauffants. Dès 25 ans. Réservez en ligne.',
    h1: 'Location Mercedes GLC AMG Line à Bordeaux',
    eyebrow: 'SUV premium',
    lead: 'La location d’un Mercedes GLC AMG Line à Bordeaux vous installe au volant du haut de notre gamme : un SUV premium à 139 € par jour, avec kilométrage illimité. Sellerie cuir, sièges chauffants et audio premium, pour vos longs trajets comme pour vos grandes occasions.',
    ideal: ['Longs trajets', 'Rendez-vous d’affaires', 'Mariages et événements', 'Voyages en Europe'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer un Mercedes GLC à Bordeaux : pour qui ?',
        html: '<p>Le GLC réunit la présence d’un SUV Mercedes et la finition AMG Line. Il convient aux dirigeants qui reçoivent des clients, aux mariés et à leurs proches, ou aux voyageurs qui prévoient de longs trajets : avec le kilométrage illimité, inutile de compter les kilomètres.</p>' +
          '<p>Les entreprises le réservent en mode « Professionnel », avec prix hors taxes et facture au nom de la société, TVA indiquée. Nos autres modèles haut de gamme sont réunis sur la page <a href="/location-voiture-premium-bordeaux">location de voiture premium</a>.</p>',
      },
      {
        h2: 'À bord du Mercedes GLC AMG Line',
        html: '<ul><li>finition AMG Line ;</li><li>sellerie cuir ;</li><li>sièges chauffants ;</li><li>système audio premium ;</li><li>boîte automatique et moteur diesel.</li></ul>' +
          '<p>Il accueille 5 personnes et 4 valises. Le GLC est proposé « ou similaire » : un SUV premium équivalent peut vous être remis selon les disponibilités.</p>',
      },
      {
        h2: 'Prix et conditions de location du GLC',
        html: '<p>Le GLC est loué 139 € TTC par jour, kilométrage illimité compris : aucun kilomètre supplémentaire n’est facturé. Les tarifs dégressifs s’appliquent dès 3 jours (5 %), puis 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours.</p>' +
          '<ul><li><strong>Caution :</strong> 3 000 €, par empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 3 500 € en cas de dommage.</li><li><strong>Conducteur :</strong> 25 ans minimum et 3 ans de permis.</li></ul>',
      },
      {
        h2: 'Nos conseils pour votre location',
        html: '<p>Avec une franchise de 3 500 €, la Protection Sérénité (22 € par jour) la ramène à zéro en cas de dommage ou de vol ; la Protection Confort (12 € par jour) la divise par deux. Notre guide <a href="/guides/caution-franchise-protections-location">caution, franchise et protections</a> vous aide à choisir.</p>' +
          '<p>Le GLC part avec le plein et se rend au même niveau. Pour rouler en Espagne ou en Italie, ajoutez l’option circulation en Europe (7 € par jour, 70 € maximum).</p>',
      },
    ],
    faq: [
      { q: 'Le kilométrage est-il vraiment illimité ?', a: 'Oui, il est inclus dans le prix du GLC : vous ne payez aucun kilomètre supplémentaire, quelle que soit la distance parcourue.' },
      { q: 'Peut-on louer le GLC avec 2 ans de permis ?', a: 'Non, il faut au moins 3 ans de permis et 25 ans. La <a href="/vehicule/mercedes-classe-a-180">Mercedes Classe A 180</a> est accessible dès 23 ans avec 2 ans de permis.' },
      { q: 'Peut-on se faire livrer le GLC ?', a: 'Oui, à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 €. Il peut aussi vous être remis à la gare Saint-Jean ou à l’aéroport de Mérignac.' },
    ],
    related: ['/location-suv-bordeaux', '/location-voiture-premium-bordeaux', '/vehicule/peugeot-5008-7-places', '/vehicule/mercedes-classe-a-180', '/guides/caution-franchise-protections-location'],
  },

  {
    path: '/vehicule/renault-kangoo-van-3m3',
    kind: 'vehicle',
    id: 'v-kangoo',
    title: 'Location Kangoo Van 3 m³ Bordeaux dès 45 €/jour | PRISMA',
    description: 'Location Renault Kangoo Van 3 m³ à Bordeaux dès 45 € par jour : 3,3 m³, 650 kg de charge utile, permis B, prix HT pour les pros. Retrait à Yvrac ou livraison.',
    h1: 'Location Renault Kangoo Van 3 m³ à Bordeaux',
    eyebrow: 'Petit utilitaire',
    lead: 'La location d’un Renault Kangoo Van à Bordeaux est l’option la plus économique de nos utilitaires : 45 € par jour, 150 km inclus chaque jour. Avec 3,3 m³ de volume et 650 kg de charge utile, il transporte meubles, cartons ou matériel tout en restant maniable en ville.',
    ideal: ['Livraisons en ville', 'Achat de meubles', 'Artisans et commerçants', 'Petits déménagements'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer un Kangoo Van à Bordeaux : pour quels besoins ?',
        html: '<p>Le Kangoo Van sert à rapporter un meuble acheté en magasin, à livrer des clients, à transporter l’outillage d’un chantier ou à vider une cave. Compact, il se faufile dans les rues étroites et se gare facilement, un vrai avantage dans le centre de Bordeaux.</p>' +
          '<p>Artisans, commerçants et entreprises du BTP le réservent en mode « Professionnel » : prix hors taxes, TVA récupérable et facture au nom de la société. Voir l’offre <a href="/professionnels">professionnels</a>.</p>',
      },
      {
        h2: 'Volume, charge et équipements',
        html: '<ul><li>3,3 m³ de volume de chargement ;</li><li>650 kg de charge utile ;</li><li>porte latérale coulissante, pratique le long d’un trottoir ;</li><li>cloison entre la cabine et le chargement ;</li><li>anneaux d’arrimage pour sangler la marchandise.</li></ul>' +
          '<p>La cabine compte 2 places, avec boîte manuelle et moteur diesel. Comme tous nos utilitaires, il se conduit avec le permis B.</p>',
      },
      {
        h2: 'Tarif et conditions de location du Kangoo',
        html: '<ul><li><strong>Prix :</strong> 45 € TTC par jour, hors taxes en mode Professionnel.</li><li><strong>Kilométrage :</strong> 150 km inclus par jour, puis 0,30 € par kilomètre supplémentaire.</li><li><strong>Caution :</strong> 1 000 €, non débitée.</li><li><strong>Franchise :</strong> 1 200 € en cas de dommage.</li><li><strong>Conducteur :</strong> 21 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>La remise est automatique : 5 % dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours. Pour plusieurs véhicules ou une longue durée, les professionnels peuvent demander un devis sur mesure. Permis de moins de 3 ans : 15 € de plus par jour (150 € maximum) et 500 € de caution supplémentaire.</p>',
      },
      {
        h2: 'Conseils pratiques',
        html: '<p>Le kit déménagement (19 € le forfait) ajoute un diable, des sangles et six couvertures de protection. Le Kangoo est remis avec le plein et se rend au même niveau, sinon le carburant est facturé 14 € le huitième de réservoir.</p>' +
          '<p>Retrait gratuit à Yvrac, ou livraison à votre adresse dans Bordeaux Métropole (40 €). Le Kangoo Van est proposé « ou similaire », dans la même catégorie de petit utilitaire.</p>',
      },
    ],
    faq: [
      { q: 'Quelle charge peut-on transporter ?', a: 'La charge utile du Kangoo Van est de 650 kg. Pour des charges plus lourdes, le <a href="/vehicule/renault-trafic-6m3">Trafic 6 m³</a> accepte 1 100 kg.' },
      { q: 'Le Kangoo suffit-il pour un déménagement ?', a: 'Pour quelques meubles et des cartons, oui. Pour un logement complet, voyez plutôt le <a href="/vehicule/renault-master-12m3">Master 12 m³</a> et notre guide <a href="/guides/quel-utilitaire-pour-demenager">quel utilitaire pour déménager</a>.' },
      { q: 'Que se passe-t-il en cas de retour en retard ?', a: 'Au-delà de 59 minutes de retard, une journée supplémentaire est facturée. En cas d’imprévu, prévenez-nous par téléphone ou WhatsApp au 07 49 58 81 44.' },
    ],
    related: ['/location-utilitaire-bordeaux', '/vehicule/renault-trafic-6m3', '/professionnels', '/guides/quel-utilitaire-pour-demenager', '/guides/location-vehicule-professionnel-tva'],
  },

  {
    path: '/vehicule/renault-trafic-6m3',
    kind: 'vehicle',
    id: 'v-trafic',
    title: 'Location Renault Trafic 6 m³ Bordeaux dès 65 € | PRISMA',
    description: 'Location Renault Trafic 6 m³ à Bordeaux dès 65 € par jour : 3 places, 1 100 kg de charge utile, permis B, kit déménagement en option. Réservez en ligne.',
    h1: 'Location Renault Trafic 6 m³ à Bordeaux',
    eyebrow: 'Utilitaire moyen',
    lead: 'La location d’un Renault Trafic 6 m³ à Bordeaux offre un bon compromis entre volume et maniabilité, à 65 € par jour avec 150 km inclus chaque jour. Ses 3 places permettent d’emmener vos aides pour charger, et il se conduit avec le permis B.',
    ideal: ['Petits déménagements', 'Chantiers', 'Transport de matériel', 'Déménagement étudiant'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer un Trafic 6 m³ à Bordeaux : pour quels usages ?',
        html: '<p>Le Trafic 6 m³ est taillé pour un petit déménagement, l’équipement d’un chantier ou l’approvisionnement d’un commerce. Avec 1 100 kg de charge utile, il accepte des charges nettement plus lourdes que le <a href="/vehicule/renault-kangoo-van-3m3">Kangoo Van</a>, tout en restant plus compact que le <a href="/vehicule/renault-master-12m3">Master 12 m³</a>.</p>' +
          '<p>Il est accessible dès 21 ans avec 2 ans de permis. Les professionnels le réservent en mode « Professionnel », avec prix hors taxes et facture au nom de la société.</p>',
      },
      {
        h2: 'Équipements et chargement',
        html: '<ul><li>6 m³ de volume de chargement ;</li><li>1 100 kg de charge utile ;</li><li>3 places ;</li><li>porte latérale pour charger depuis le trottoir ;</li><li>portes arrière ouvrant à 180° pour les objets encombrants.</li></ul>' +
          '<p>Boîte manuelle et moteur diesel. Le Trafic 6 m³ est proposé « ou similaire », dans la même catégorie d’utilitaire moyen.</p>',
      },
      {
        h2: 'Tarif et conditions de location du Trafic',
        html: '<ul><li><strong>Prix :</strong> 65 € TTC par jour.</li><li><strong>Kilométrage :</strong> 150 km inclus par jour, puis 0,35 € par kilomètre.</li><li><strong>Caution :</strong> 1 500 €, empreinte bancaire non débitée, libérée au retour.</li><li><strong>Franchise :</strong> 1 800 € en cas de dommage.</li><li><strong>Conducteur :</strong> 21 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>Tarifs dégressifs : 5 % dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours, 30 % dès 28 jours. Avec un permis de moins de 3 ans, comptez 15 € de plus par jour (150 € maximum) et 500 € de caution en plus.</p>',
      },
      {
        h2: 'Conseils pour votre déménagement',
        html: '<p>Dans les grandes agglomérations comme Bordeaux, stationner un utilitaire sur la voie publique pour déménager demande souvent une autorisation : faites la demande à la mairie à l’avance. Ajoutez le kit déménagement (19 € le forfait) : diable, sangles et six couvertures de protection.</p>' +
          '<p>Retrait gratuit à Yvrac, sur la rive droite, ou livraison à votre adresse dans Bordeaux Métropole (40 €). Plus de conseils dans notre guide <a href="/guides/demenager-a-bordeaux-conseils">déménager à Bordeaux</a>.</p>',
      },
    ],
    faq: [
      { q: 'Le Trafic 6 m³ suffit-il pour déménager ?', a: 'Pour un petit logement ou quelques meubles, il suffit souvent. Pour un appartement plus grand, le <a href="/vehicule/renault-master-12m3">Master 12 m³</a> évite plusieurs allers-retours.' },
      { q: 'Puis-je louer plusieurs utilitaires pour mon entreprise ?', a: 'Oui : pour plusieurs véhicules ou une longue durée, nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à 30 %. Voir l’offre <a href="/professionnels">professionnels</a>.' },
      { q: 'Puis-je rendre le Trafic sans le laver ?', a: 'Oui, avec l’option retour sans lavage à 25 € le forfait, pratique après un chantier ou un déménagement.' },
    ],
    related: ['/location-utilitaire-bordeaux', '/location-camion-demenagement-bordeaux', '/vehicule/renault-kangoo-van-3m3', '/vehicule/renault-master-12m3', '/guides/quel-utilitaire-pour-demenager'],
  },

  {
    path: '/vehicule/renault-master-12m3',
    kind: 'vehicle',
    id: 'v-master12',
    title: 'Location Renault Master 12 m³ Bordeaux dès 79 € | PRISMA',
    description: 'Location Renault Master 12 m³ à Bordeaux dès 79 € par jour : 1 300 kg de charge utile, caméra de recul, permis B. Idéal pour déménager. Réservez en ligne.',
    h1: 'Location Renault Master 12 m³ à Bordeaux',
    eyebrow: 'Grand utilitaire',
    lead: 'La location d’un Renault Master 12 m³ à Bordeaux est le choix classique pour déménager un appartement ou transporter un gros volume, à 79 € par jour avec 150 km inclus chaque jour. Avec 1 300 kg, il offre la charge utile la plus élevée de nos utilitaires.',
    ideal: ['Déménagement d’appartement', 'Gros volumes', 'Chantiers et BTP', 'Transport de mobilier'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer un Master 12 m³ à Bordeaux : pour quels besoins ?',
        html: '<p>Avec 12 m³ de volume et 1 300 kg de charge utile, le Master transporte le mobilier d’un appartement, l’électroménager ou les matériaux d’un chantier. Sa hauteur intérieure de 1,90 m facilite le chargement des meubles hauts.</p>' +
          '<p>Il est accessible dès 21 ans avec 2 ans de permis. Artisans, entreprises du BTP et déménageurs peuvent le réserver en mode « Professionnel », avec prix hors taxes.</p>',
      },
      {
        h2: 'Équipements du Master 12 m³',
        html: '<ul><li>hauteur intérieure de 1,90 m ;</li><li>caméra de recul, précieuse pour manœuvrer en ville ;</li><li>anneaux d’arrimage pour sangler le chargement ;</li><li>3 places, boîte manuelle et moteur diesel.</li></ul>' +
          '<p>Le Master 12 m³ est proposé « ou similaire » : un grand utilitaire équivalent peut vous être remis selon les disponibilités.</p>',
      },
      {
        h2: 'Tarif et conditions de location du Master',
        html: '<ul><li><strong>Prix :</strong> 79 € TTC par jour.</li><li><strong>Kilométrage :</strong> 150 km inclus par jour, puis 0,35 € par kilomètre.</li><li><strong>Caution :</strong> 2 000 €, empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 2 200 € en cas de dommage.</li><li><strong>Conducteur :</strong> 21 ans minimum et 2 ans de permis.</li></ul>' +
          '<p>Les remises dégressives démarrent à 5 % dès 3 jours et montent jusqu’à 30 % dès 28 jours. Jeune conducteur (permis de moins de 3 ans) : 15 € par jour, plafonnés à 150 € par location, et caution augmentée de 500 €.</p>',
      },
      {
        h2: 'Conseils pour un déménagement réussi',
        html: '<p>Réservez le kit déménagement (19 € le forfait), avec un diable, des sangles et six couvertures de protection. Pensez aussi à l’autorisation de stationnement, souvent exigée dans les grandes agglomérations : demandez-la à la mairie à l’avance.</p>' +
          '<p>Pour lever les objets lourds sans effort, préférez l’<a href="/vehicule/utilitaire-20m3-hayon">utilitaire 20 m³</a> et son hayon élévateur. Tous nos conseils : <a href="/guides/demenager-a-bordeaux-conseils">déménager à Bordeaux</a>.</p>',
      },
    ],
    faq: [
      { q: 'Faut-il un permis spécial pour le Master 12 m³ ?', a: 'Non, le permis B suffit : il autorise les véhicules jusqu’à 3,5 tonnes, ce qui est le cas de tous nos utilitaires. Détails dans notre guide <a href="/guides/permis-b-utilitaire-3-5-tonnes">permis B et utilitaires</a>.' },
      { q: 'Master 12 m³ ou utilitaire 20 m³ : lequel choisir ?', a: 'Le Master offre plus de charge utile (1 300 kg contre 950 kg), le 20 m³ plus de volume et un hayon élévateur. Pour des matériaux lourds, préférez le Master ; pour un grand volume de meubles, le 20 m³.' },
      { q: 'Combien de kilomètres sont inclus ?', a: '150 km par jour, puis 0,35 € par kilomètre. Pour un déménagement longue distance, l’option kilométrage illimité coûte 12 € par jour.' },
    ],
    related: ['/location-camion-demenagement-bordeaux', '/location-utilitaire-bordeaux', '/vehicule/utilitaire-20m3-hayon', '/vehicule/renault-trafic-6m3', '/guides/demenager-a-bordeaux-conseils'],
  },

  {
    path: '/vehicule/utilitaire-20m3-hayon',
    kind: 'vehicle',
    id: 'v-master20',
    title: 'Location utilitaire 20 m³ hayon Bordeaux dès 109 € | PRISMA',
    description: 'Location utilitaire 20 m³ avec hayon à Bordeaux dès 109 € par jour : hayon élévateur 500 kg, rampe, permis B. Pour vos grands déménagements. Réservez.',
    h1: 'Location utilitaire 20 m³ avec hayon à Bordeaux',
    eyebrow: 'Caisse avec hayon',
    lead: 'La location d’un utilitaire 20 m³ avec hayon à Bordeaux est la solution des grands déménagements : 109 € par jour, 150 km inclus chaque jour. Son hayon élévateur de 500 kg soulève pour vous les meubles lourds et l’électroménager, et il se conduit avec le permis B.',
    ideal: ['Grands déménagements', 'Meubles volumineux', 'Électroménager', 'Déménageurs professionnels'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer un 20 m³ avec hayon à Bordeaux : pour quels besoins ?',
        html: '<p>Le 20 m³ offre le plus grand volume de notre flotte. Il s’adresse aux déménagements de grands logements, aux déménageurs professionnels et aux commerçants qui transportent du mobilier volumineux. Le hayon élévateur et la rampe évitent de hisser les charges à bout de bras.</p>' +
          '<p>Attention au poids : sa charge utile est de 950 kg. Pour des matériaux denses, le <a href="/vehicule/renault-master-12m3">Master 12 m³</a> et ses 1 300 kg conviennent mieux.</p>',
      },
      {
        h2: 'Équipements et permis',
        html: '<ul><li>hayon élévateur d’une capacité de 500 kg ;</li><li>rampe ;</li><li>barres d’arrimage ;</li><li>3 places, boîte manuelle et moteur diesel.</li></ul>' +
          '<p>Avec moins de 3,5 tonnes, il se conduit avec le permis B, qui autorise les véhicules jusqu’à 3,5 tonnes de PTAC. Plus de détails dans notre guide <a href="/guides/permis-b-utilitaire-3-5-tonnes">permis B et utilitaire 3,5 tonnes</a>.</p>',
      },
      {
        h2: 'Tarif et conditions de location du 20 m³',
        html: '<ul><li><strong>Prix :</strong> 109 € TTC par jour, hors taxes en mode Professionnel.</li><li><strong>Kilométrage :</strong> 150 km inclus par jour, puis 0,40 € par kilomètre.</li><li><strong>Caution :</strong> 2 500 €, par empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 2 800 € en cas de dommage.</li><li><strong>Conducteur :</strong> 21 ans minimum et 3 ans de permis.</li></ul>' +
          '<p>Les tarifs dégressifs s’appliquent dès 3 jours (5 %) et vont jusqu’à 30 % dès 28 jours. Le 20 m³ est proposé « ou similaire », dans la même catégorie de caisse avec hayon.</p>',
      },
      {
        h2: 'Conseils pour votre déménagement',
        html: '<p>Prenez le kit déménagement (19 € le forfait) : diable, sangles et six couvertures de protection. Dans les grandes agglomérations, une autorisation de stationnement est souvent nécessaire pour déménager : demandez-la à la mairie à l’avance.</p>' +
          '<p>Le véhicule part avec le plein et se rend au même niveau. Retrait gratuit à Yvrac, ou livraison à votre adresse dans Bordeaux Métropole (40 €).</p>',
      },
    ],
    faq: [
      { q: 'Le 20 m³ est-il accessible avec 2 ans de permis ?', a: 'Non, il demande 3 ans de permis. Avec 2 ans de permis, le <a href="/vehicule/renault-master-12m3">Master 12 m³</a> est accessible dès 21 ans.' },
      { q: 'Quelle charge le hayon peut-il soulever ?', a: 'Le hayon élévateur a une capacité de 500 kg. La charge utile totale du véhicule est de 950 kg.' },
      { q: 'Combien de personnes peuvent voyager à bord ?', a: '3 personnes, conducteur compris : de quoi emmener de l’aide pour le chargement.' },
    ],
    related: ['/location-camion-demenagement-bordeaux', '/vehicule/renault-master-12m3', '/guides/permis-b-utilitaire-3-5-tonnes', '/guides/demenager-a-bordeaux-conseils', '/location-utilitaire-bordeaux'],
  },

  {
    path: '/vehicule/renault-trafic-9-places',
    kind: 'vehicle',
    id: 'v-bus',
    title: 'Location Trafic 9 places Bordeaux dès 115 €/jour | PRISMA',
    description: 'Location Renault Trafic 9 places à Bordeaux dès 115 € par jour : minibus avec permis B, climatisation avant et arrière, 250 km inclus par jour. Réservez.',
    h1: 'Location Renault Trafic 9 places à Bordeaux',
    eyebrow: 'Minibus',
    lead: 'La location d’un Renault Trafic 9 places à Bordeaux permet de transporter jusqu’à 9 personnes, conducteur compris, avec un simple permis B. À 115 € par jour avec 250 km inclus chaque jour, ce minibus climatisé à l’avant et à l’arrière emporte aussi 6 valises.',
    ideal: ['Équipes sportives', 'Mariages et événements', 'Sorties associatives', 'Séminaires d’entreprise', 'Transferts vers l’aéroport'],
    vehicles: [],
    sections: [
      {
        h2: 'Louer le minibus Trafic 9 places à Bordeaux : pour qui ?',
        html: '<p>Le Trafic 9 places réunit tout un groupe dans un seul véhicule : club sportif en déplacement, invités d’un mariage, association, équipe en séminaire ou famille élargie. Personne ne conduit de son côté et tout le monde arrive en même temps.</p>' +
          '<p>Pour une sortie au bassin d’Arcachon, à environ 1 h de route de Bordeaux, ou une visite à Saint-Émilion, à environ 40 minutes, c’est une façon simple de voyager ensemble.</p>',
      },
      {
        h2: 'Permis B et équipements',
        html: '<p>Le permis B autorise la conduite des véhicules de 9 places au maximum, conducteur compris : le Trafic 9 places entre dans ce cadre. Le conducteur doit toutefois avoir 23 ans et 3 ans de permis. Détails dans notre guide <a href="/guides/location-minibus-9-places-permis-b">minibus 9 places et permis B</a>.</p>' +
          '<ul><li>climatisation avant et arrière ;</li><li>régulateur de vitesse ;</li><li>espace pour 6 valises ;</li><li>boîte manuelle et moteur diesel.</li></ul>',
      },
      {
        h2: 'Tarif et conditions de location du minibus',
        html: '<ul><li><strong>Prix :</strong> 115 € TTC par jour.</li><li><strong>Kilométrage :</strong> 250 km inclus par jour, puis 0,35 € par kilomètre supplémentaire.</li><li><strong>Caution :</strong> 2 000 €, empreinte bancaire non débitée.</li><li><strong>Franchise :</strong> 2 200 € en cas de dommage.</li><li><strong>Conducteur :</strong> 23 ans minimum et 3 ans de permis.</li></ul>' +
          '<p>Remise automatique de 5 % dès 3 jours, 10 % dès 5 jours, 15 % dès 7 jours, 20 % dès 14 jours et 30 % dès 28 jours. Le minibus est proposé « ou similaire », dans la même catégorie.</p>',
      },
      {
        h2: 'Conseils pour voyager en groupe',
        html: '<p>Sur un long trajet, déclarez un conducteur supplémentaire (6 € par jour, jusqu’à 2) pour vous relayer. Si le groupe arrive en avion, le minibus peut vous être remis à l’aéroport de Mérignac (35 €) ; en train, à la gare Saint-Jean (25 €).</p>' +
          '<p>Entreprises et équipes en déplacement : un devis sur mesure est possible pour plusieurs véhicules ou une longue durée. Voir notre page <a href="/professionnels">professionnels</a>.</p>',
      },
    ],
    faq: [
      { q: 'Combien de bagages peut-on emporter ?', a: 'Le Trafic 9 places accueille 6 valises. Pour 7 personnes au plus, le <a href="/vehicule/peugeot-5008-7-places">Peugeot 5008</a> en prend 5, avec une boîte automatique.' },
      { q: 'Un jeune conducteur peut-il louer le minibus ?', a: 'Non, il faut au moins 23 ans et 3 ans de permis pour le conduire.' },
      { q: 'Peut-on rendre le minibus dans un autre point ?', a: 'Oui, le retour peut se faire ailleurs qu’au départ, avec le supplément du point de retour. Voir nos <a href="/agences">points de retrait</a>.' },
    ],
    related: ['/location-minibus-9-places-bordeaux', '/guides/location-minibus-9-places-permis-b', '/vehicule/peugeot-5008-7-places', '/location-voiture-7-places-bordeaux', '/professionnels'],
  },

  /* ---------- Pages ---------- */

  {
    path: '/',
    kind: 'page',
    title: 'Location voiture et utilitaire à Bordeaux et Yvrac | PRISMA',
    description: 'Location de voiture et d’utilitaire à Bordeaux : citadines dès 39 €, SUV, minibus 9 places, utilitaires jusqu’à 20 m³. Agence à Yvrac, réservation en ligne.',
    h1: '',
    eyebrow: 'Location à Bordeaux',
    lead: '',
    vehicles: [],
    sections: [
      {
        h2: 'PRISMA Automobiles, votre agence de location près de Bordeaux',
        html: '<p>PRISMA Automobiles est une agence de location de voitures et d’utilitaires installée à Yvrac, au 72 bis avenue des Tabernottes, à environ 15 minutes de Bordeaux par la rocade, avec parking gratuit.</p>' +
          '<p>Notre slogan, « Un autre regard sur l’automobile », résume notre approche : une agence locale qui vous aide à choisir le bon véhicule, avec des prix et des conditions clairs. Particuliers et professionnels de la rive droite et de toute la Gironde, découvrez notre <a href="/location-voiture-yvrac">agence de location à Yvrac</a>.</p>',
      },
      {
        h2: 'Location de voitures et d’utilitaires à Bordeaux : notre gamme',
        html: '<p>La <a href="/location-voiture-bordeaux">location de voiture à Bordeaux</a> commence avec la Renault Clio V à 39 € par jour et la Peugeot 208 automatique à 49 €. La Mercedes Classe A 180 et le Mercedes GLC AMG Line forment notre gamme <a href="/location-voiture-premium-bordeaux">premium</a>, la Tesla Model 3 ouvre la <a href="/location-voiture-electrique-bordeaux">location de voiture électrique</a> et le Peugeot 5008 accueille les familles en <a href="/location-voiture-7-places-bordeaux">7 places</a>.</p>' +
          '<p>Côté <a href="/location-utilitaire-bordeaux">location d’utilitaire</a>, le Kangoo Van (45 € par jour) et le Trafic 6 m³ couvrent les petits volumes ; le Master 12 m³ et le 20 m³ avec hayon servent de <a href="/location-camion-demenagement-bordeaux">camion de déménagement</a>. Le <a href="/location-minibus-9-places-bordeaux">minibus 9 places</a> se conduit, comme tous nos utilitaires, avec le permis B.</p>',
      },
      {
        h2: 'Où récupérer votre véhicule de location ?',
        html: '<ul><li><strong>Agence d’Yvrac</strong> : retrait gratuit.</li><li><strong>Gare Saint-Jean</strong> : 25 €, clés remises en main propre à la sortie Belcier.</li><li><strong>Aéroport de Bordeaux-Mérignac</strong> : 35 €, accueil au point de rendez-vous des loueurs, Hall B.</li><li><strong>Livraison à votre adresse</strong> dans Bordeaux Métropole, dans un rayon de 25 km : 40 €.</li></ul>' +
          '<p>Le supplément s’applique à la remise et, séparément, à la restitution ; le retour peut se faire dans un autre point. Remises et retours ont lieu du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h. Détails sur nos <a href="/agences">points de retrait</a>.</p>',
      },
      {
        h2: 'Comment réserver votre location ?',
        html: '<ol><li>Indiquez vos dates et vos points de départ et de retour.</li><li>Choisissez votre véhicule selon le prix et le kilométrage inclus.</li><li>Ajoutez vos options : protection, conducteur supplémentaire, siège enfant ou kit déménagement.</li><li>Payez en ligne par carte bancaire, Apple Pay ou Google Pay.</li></ol>' +
          '<p>La confirmation arrive immédiatement par email et votre espace client suit vos réservations. Vous pouvez aussi réserver par téléphone ou WhatsApp au 07 49 58 81 44.</p>',
      },
      {
        h2: 'Pourquoi réserver en ligne ?',
        html: '<ul><li><strong>24 h sur 24</strong>, depuis le site ou l’application installable sur votre téléphone ;</li><li><strong>des prix clairs</strong> : TTC pour les particuliers, hors taxes en mode « Professionnel », facture au nom de la société ;</li><li><strong>des tarifs dégressifs automatiques</strong>, de 5 % dès 3 jours à 30 % dès 28 jours ;</li><li><strong>un paiement souple</strong>, en 3 ou 4 fois sans frais à partir de 150 € ;</li><li><strong>une annulation gratuite</strong> jusqu’à 48 h avant le départ.</li></ul>',
      },
    ],
    faq: [
      { q: 'Quels documents faut-il présenter au départ ?', a: 'Le permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.' },
      { q: 'La caution est-elle débitée ?', a: 'Non, c’est une empreinte bancaire non débitée, libérée au retour, déduction faite d’éventuels frais.' },
      { q: 'Quel âge faut-il avoir pour louer ?', a: 'Dès 21 ans et 2 ans de permis, davantage pour certains modèles. Permis de moins de 3 ans : 15 € de plus par jour, 150 € maximum.' },
      { q: 'Le kilométrage est-il limité ?', a: 'Chaque véhicule inclut 150, 250 ou 300 km par jour, sauf le GLC, en kilométrage illimité. Sinon, l’option kilométrage illimité coûte 12 € par jour.' },
      { q: 'Faut-il refaire le plein ?', a: 'Oui, au niveau du départ, sinon le carburant est facturé 14 € le huitième de réservoir ; la Tesla se rend avec au moins 70 % de charge.' },
      { q: 'Et en cas de retard au retour ?', a: 'Au-delà de 59 minutes de retard, une journée supplémentaire est facturée.' },
    ],
    related: [],
  },

  {
    path: '/vehicules',
    kind: 'page',
    title: 'Nos véhicules de location à Bordeaux et Yvrac | PRISMA',
    description: 'Nos véhicules de location à Bordeaux : citadines dès 39 €, Mercedes, Tesla, SUV 7 places, utilitaires jusqu’à 20 m³ et minibus 9 places. Réservez en ligne.',
    h1: 'Nos véhicules de location à Bordeaux',
    eyebrow: 'Voitures et utilitaires',
    lead: 'Nos véhicules de location à Bordeaux vont de la citadine à 39 € par jour à l’utilitaire de 20 m³ avec hayon. Chaque fiche affiche prix, kilométrage inclus, caution et âge requis : vous choisissez en connaissance de cause.',
    vehicles: [],
    sections: [
      {
        h2: 'Comment choisir votre véhicule de location à Bordeaux ?',
        html: '<p>Pour une <a href="/location-voiture-bordeaux">location de voiture à Bordeaux</a> comme pour un utilitaire, partez de votre usage :</p>' +
          '<ul>' +
          '<li><strong>Citadine</strong> : Renault Clio V à 39 € par jour (<a href="/location-voiture-pas-chere-bordeaux">location pas chère</a>) ou Peugeot 208 à 49 € (<a href="/location-voiture-automatique-bordeaux">boîte automatique</a>).</li>' +
          '<li><strong>Compacte premium</strong> : Mercedes Classe A 180 à 69 € (<a href="/location-voiture-premium-bordeaux">gamme premium</a>).</li>' +
          '<li><strong>Électrique</strong> : Tesla Model 3 à 95 €, jusqu’à 500 km d’autonomie annoncée (<a href="/location-voiture-electrique-bordeaux">voiture électrique</a>).</li>' +
          '<li><strong>SUV</strong> : Mercedes GLC AMG Line à 139 €, kilométrage illimité (<a href="/location-suv-bordeaux">location de SUV</a>).</li>' +
          '<li><strong>7 places</strong> : Peugeot 5008 à 89 €, pour les familles (<a href="/location-voiture-7-places-bordeaux">location 7 places</a>).</li>' +
          '<li><strong>Utilitaires</strong> : de 3,3 m³ à 20 m³, de 45 € à 109 € par jour (<a href="/location-utilitaire-bordeaux">location d’utilitaire</a>, <a href="/location-camion-demenagement-bordeaux">camion de déménagement</a>).</li>' +
          '<li><strong>Minibus</strong> : Renault Trafic 9 places à 115 € (<a href="/location-minibus-9-places-bordeaux">minibus 9 places</a>).</li>' +
          '</ul>' +
          '<p>Prix TTC par jour pour les particuliers. Utilitaires et minibus se conduisent avec le permis B.</p>',
      },
      {
        h2: 'Ce qui est inclus dans le prix',
        html: '<ul><li>le kilométrage : 150 km par jour pour les utilitaires, 250 km pour les citadines et le minibus, 300 km pour la Classe A, la Tesla et le 5008, illimité pour le GLC ;</li><li>le plein au départ, à rendre au même niveau (la Tesla, elle, se rend avec au moins 70 % de charge) ;</li><li>les tarifs dégressifs, de 5 % dès 3 jours à 30 % dès 28 jours ;</li><li>le retrait et le retour gratuits à Yvrac.</li></ul>' +
          '<p>Le reste est à la carte : protections, kilométrage illimité (12 € par jour), conducteur supplémentaire, siège enfant, kit déménagement ou retour sans lavage.</p>',
      },
      {
        h2: 'Conditions de location',
        html: '<p>Comptez 21 ans et 2 ans de permis au minimum. La Classe A, le 5008 et le minibus demandent 23 ans, la Tesla et le GLC 25 ans ; la Tesla, le GLC, le 20 m³ et le minibus exigent 3 ans de permis. Un permis de moins de 3 ans entraîne un supplément de 15 € par jour (150 € maximum) et 500 € de caution en plus.</p>' +
          '<p>La caution, de 800 € à 3 000 € selon le véhicule, est une empreinte bancaire non débitée. Au départ, présentez votre permis, une pièce d’identité au nom du conducteur et une carte bancaire. Le détail figure dans nos <a href="/conditions-de-location">conditions de location</a>.</p>',
      },
      {
        h2: 'Où récupérer votre véhicule ?',
        html: '<p>Le retrait est gratuit à l’agence d’Yvrac. Nous remettons aussi les véhicules à la gare Saint-Jean (25 €), à l’aéroport de Bordeaux-Mérignac (35 €) ou à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km (40 €). Le retour peut se faire dans un autre point : détails sur nos <a href="/agences">points de retrait</a>.</p>',
      },
    ],
    faq: [
      { q: 'Le modèle réservé est-il garanti ?', a: 'Nos véhicules sont proposés « ou similaire » : un modèle équivalent, de même catégorie, peut vous être remis.' },
      { q: 'Quel est le véhicule le plus économique ?', a: 'La <a href="/vehicule/renault-clio-v">Renault Clio V</a>, à 39 € par jour ; côté utilitaires, le <a href="/vehicule/renault-kangoo-van-3m3">Kangoo Van</a>, à 45 €.' },
      { q: 'Quel utilitaire choisir pour déménager ?', a: 'Tout dépend du volume à transporter : notre guide <a href="/guides/quel-utilitaire-pour-demenager">quel utilitaire pour déménager</a> vous aide à trancher.' },
      { q: 'Les prix sont-ils TTC ?', a: 'Oui pour les particuliers ; en mode « Professionnel », ils s’affichent hors taxes, avec facture au nom de la société.' },
    ],
    related: ['/location-voiture-bordeaux', '/location-utilitaire-bordeaux', '/agences', '/conditions-de-location', '/professionnels'],
  },

  {
    path: '/agences',
    kind: 'page',
    title: 'Points de retrait location voiture Bordeaux | PRISMA',
    description: 'Points de retrait pour votre location de voiture à Bordeaux : Yvrac gratuit, gare Saint-Jean 25 €, aéroport de Mérignac 35 €, livraison à domicile 40 €.',
    h1: 'Nos points de retrait à Yvrac et Bordeaux',
    eyebrow: 'Retrait et retour',
    lead: 'Nos points de retrait vous permettent de récupérer votre véhicule de location à Yvrac, à la gare Saint-Jean, à l’aéroport de Mérignac ou à votre adresse dans Bordeaux Métropole. Chaque point a son propre supplément, et le retour peut se faire dans un autre point que le départ.',
    vehicles: [],
    sections: [
      {
        h2: 'Agence d’Yvrac : retrait gratuit',
        html: '<p>Notre agence se trouve au 72 bis avenue des Tabernottes, 33370 Yvrac, sur la rive droite, à environ 15 minutes de Bordeaux par la rocade. Le retrait et le retour y sont gratuits, et un parking gratuit vous accueille sur place.</p>' +
          '<p>C’est le point le plus économique, pratique si vous habitez la rive droite ou l’Entre-deux-Mers. En savoir plus sur la <a href="/location-voiture-yvrac">location de voiture à Yvrac</a>.</p>',
      },
      {
        h2: 'Gare Saint-Jean : clés remises en main propre',
        html: '<p>Vous arrivez en train à Bordeaux ? Nous vous remettons les clés en main propre à la sortie Belcier de la gare Saint-Jean, Parvis Louis-Armand, 33800 Bordeaux. Le supplément est de 25 € pour la remise, et de 25 € pour la restitution si vous rendez le véhicule à la gare.</p>' +
          '<p>Choisissez un horaire de remise compatible avec l’arrivée de votre train. Détails sur la page <a href="/location-voiture-gare-saint-jean">location de voiture à la gare Saint-Jean</a>.</p>',
      },
      {
        h2: 'Aéroport de Bordeaux-Mérignac',
        html: '<p>À l’aéroport, l’accueil se fait au point de rendez-vous des loueurs, Hall B, 33700 Mérignac. Le supplément est de 35 € à la remise, et de 35 € à la restitution si vous y rendez le véhicule.</p>' +
          '<p>Prévoyez une marge entre l’atterrissage et l’horaire de remise. Tout savoir sur la <a href="/location-voiture-aeroport-merignac">location de voiture à l’aéroport de Mérignac</a>.</p>',
      },
      {
        h2: 'Livraison à votre adresse dans Bordeaux Métropole',
        html: '<p>Nous livrons votre véhicule à votre adresse dans Bordeaux Métropole, dans un rayon de 25 km, pour 40 €. Si vous le rendez aussi à votre adresse, le supplément de 40 € s’applique une seconde fois, pour la restitution. Au-delà de ce rayon, choisissez l’un de nos autres points.</p>' +
          '<p>Cette formule vous évite tout déplacement, par exemple pour recevoir un utilitaire le matin d’un déménagement. Précisez l’adresse au moment de réserver. Voir la <a href="/location-voiture-livraison-bordeaux">location de voiture avec livraison</a>.</p>',
      },
      {
        h2: 'Horaires de nos points de retrait',
        html: '<ul><li>du lundi au vendredi : 8 h 30 à 19 h ;</li><li>le samedi : 9 h à 18 h ;</li><li>le dimanche : fermé.</li></ul>' +
          '<p>Ces horaires valent pour tous les points, y compris la gare, l’aéroport et la livraison à domicile : la première remise a lieu à 8 h 30 en semaine et à 9 h le samedi. La réservation en ligne, elle, reste ouverte 24 h sur 24. Tout retard de plus de 59 minutes au retour entraîne la facturation d’une journée supplémentaire.</p>',
      },
      {
        h2: 'Rendre le véhicule dans un autre point',
        html: '<p>Le retour peut se faire dans un autre point que le départ (« lieu de retour différent »). Chaque supplément s’applique séparément : partir de la gare Saint-Jean et rendre le véhicule à Yvrac ne coûte que les 25 € de la gare, au départ. À l’inverse, un départ d’Yvrac et un retour à l’aéroport entraînent uniquement 35 € au retour. Il suffit d’indiquer le point de retour en réservant.</p>',
      },
    ],
    faq: [
      { q: 'Le retrait à l’agence d’Yvrac est-il payant ?', a: 'Non, le retrait et le retour à Yvrac sont gratuits, avec parking gratuit sur place.' },
      { q: 'Livrez-vous en dehors de Bordeaux Métropole ?', a: 'Non, la livraison est proposée dans Bordeaux Métropole, dans un rayon de 25 km. Au-delà, rendez-vous à Yvrac, à la gare Saint-Jean ou à l’aéroport de Mérignac.' },
      { q: 'Peut-on récupérer un véhicule le dimanche ?', a: 'Non, nous sommes fermés le dimanche. Prévoyez un retrait le samedi avant 18 h ou le lundi dès 8 h 30.' },
      { q: 'Quels documents apporter au point de retrait ?', a: 'Votre permis de conduire, une pièce d’identité au nom du conducteur et une carte bancaire pour la caution.' },
    ],
    related: ['/location-voiture-yvrac', '/location-voiture-gare-saint-jean', '/location-voiture-aeroport-merignac', '/location-voiture-livraison-bordeaux', '/contact'],
  },
]);

/* Contenu SEO : vitrine des véhicules à vendre (page /vehicules-occasion, affichée par sales.js).
   Les annonces elles-mêmes viennent des données de l'agence (logiciel, rubrique Ventes). */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/vehicules-occasion',
    kind: 'page',
    title: 'Voitures d’occasion à vendre près de Bordeaux | PRISMA',
    description: 'Voitures et utilitaires d’occasion à vendre à Yvrac, près de Bordeaux : annonces avec photos, kilométrage et prix. Reprise de votre véhicule possible.',
    h1: 'Voitures d’occasion à vendre près de Bordeaux',
    eyebrow: 'Véhicules à vendre',
    lead: 'Citadines, compactes, SUV, berlines et utilitaires : retrouvez les véhicules à vendre à l’agence PRISMA Automobiles d’Yvrac, à environ 15 minutes de Bordeaux. Chaque annonce détaille l’année, le kilométrage, l’énergie, les équipements et le prix.',
    vehicles: [],
    sections: [
      { h2: 'Acheter une voiture d’occasion à Bordeaux avec PRISMA Automobiles', html:
        '<p>Les annonces réunissent les véhicules vendus par l’agence et ceux qu’elle vend en dépôt-vente pour le compte de leur propriétaire : la mention « Dépôt-vente » l’indique sur chaque annonce. Dans les deux cas, vous traitez avec un professionnel de l’automobile, à l’agence d’Yvrac.</p>' +
        '<p>Filtrez par catégorie, énergie, boîte de vitesses, budget ou kilométrage, puis ouvrez l’annonce pour voir les caractéristiques complètes : mise en circulation, puissance, vignette Crit’Air, nombre de propriétaires et équipements.</p>' },
      { h2: 'Voir le véhicule avant de vous décider', html:
        '<p>Un véhicule vous intéresse ? Envoyez votre demande depuis l’annonce ou appelez le 07 49 58 81 44 : nous convenons d’un rendez-vous à l’agence pour le voir, poser vos questions et consulter ses documents.</p>' +
        '<p>L’agence est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h, avec un parking gratuit, à environ 15 minutes de Bordeaux par la rocade.</p>' },
      { h2: 'Les documents remis à l’achat', html:
        '<ul><li>le certificat de cession (formulaire Cerfa n° 15776), signé par le vendeur et par vous ;</li><li>la carte grise barrée, datée et signée, avec son coupon détachable ;</li><li>un certificat de situation administrative de moins de 15 jours ;</li><li>pour un véhicule de plus de 4 ans, un contrôle technique de moins de 6 mois.</li></ul>' +
        '<p>Vous disposez ensuite d’un mois pour faire immatriculer le véhicule à votre nom, en ligne sur le site de l’ANTS.</p>' },
      { h2: 'Et votre véhicule actuel ?', html:
        '<p>Vous changez de voiture ? Indiquez-le dans votre demande : nous pouvons étudier sa reprise. Vous pouvez aussi le vendre directement grâce au <a href="/rachat-voiture-bordeaux">rachat de voiture</a>, ou le confier en <a href="/depot-vente-voiture-bordeaux">dépôt-vente</a>.</p>' +
        '<p>Besoin d’un véhicule entre les deux ? La <a href="/location-voiture-au-mois-bordeaux">location au mois</a> bénéficie de tarifs dégressifs jusqu’à 30 % dès 28 jours.</p>' },
      { h2: 'Vous ne trouvez pas le bon modèle ?', html:
        '<p>Les annonces changent au fil des ventes. Décrivez-nous le véhicule que vous cherchez, votre budget et votre usage avec le formulaire de cette page : nous vous recontactons quand un modèle correspond.</p>' },
    ],
    faq: [
      { q: 'Peut-on voir un véhicule avant de l’acheter ?', a: 'Oui, sur rendez-vous à l’agence d’Yvrac, pendant les horaires d’ouverture.' },
      { q: 'Reprenez-vous mon ancien véhicule ?', a: 'Nous pouvons étudier sa reprise : indiquez-le dans votre demande, ou faites-le estimer depuis la page <a href="/rachat-voiture-bordeaux">rachat de voiture</a>.' },
      { q: 'Que veut dire « dépôt-vente » sur une annonce ?', a: 'Le véhicule est vendu par l’agence pour le compte de son propriétaire. Les documents remis à l’achat sont les mêmes.' },
      { q: 'Comment réserver un véhicule ?', a: 'Depuis l’annonce, choisissez « Réserver ce véhicule » dans le formulaire, ou appelez-nous : nous confirmons avec vous les conditions de la réservation.' },
      { q: 'Quels documents me seront remis ?', a: 'Le certificat de cession, la carte grise barrée avec son coupon, un certificat de situation administrative de moins de 15 jours et, pour un véhicule de plus de 4 ans, un contrôle technique de moins de 6 mois.' },
      { q: 'Dans quel délai immatriculer le véhicule à mon nom ?', a: 'Dans un délai d’un mois après l’achat, en ligne sur le site de l’ANTS, avec le code de cession remis par le vendeur.' },
    ],
    related: ['/achat-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/depot-vente-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches', '/location-voiture-au-mois-bordeaux'],
  },
]);

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
  { t: 'Achat et vente', items: [['/vehicules-occasion', 'Véhicules à vendre'], ['/achat-vente-voiture-bordeaux', 'Achat, vente, dépôt-vente'], ['/depot-vente-voiture-bordeaux', 'Dépôt-vente de voiture'], ['/rachat-voiture-bordeaux', 'Rachat de votre véhicule'], ['/guides/vendre-sa-voiture-demarches', 'Vendre sa voiture : démarches']] },
  { t: 'Infos pratiques', items: [['/vehicules', 'Tous nos véhicules'], ['/agences', 'Points de retrait'], ['/conditions-de-location', 'Conditions de location'], ['/faq', 'Questions fréquentes'], ['/guides', 'Guides pratiques'], ['/contact', 'Contact']] },
];
const STATIC_PAGES = ['/', '/vehicules', '/vehicules-occasion', '/agences', '/contact', '/professionnels', '/faq', '/conditions-de-location', '/guides'];
/** Une page existe-t-elle ? (les pages rédigées absentes ne sont jamais liées : pas de lien mort) */
const pageExists = (path) => STATIC_PAGES.includes(path) || !!SEO_BY_PATH[path] || /^\/vehicule(-occasion)?\//.test(path);
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
  // véhicules à vendre : vitrine et annonces (une annonce vendue sort de Google)
  if (path === '/vehicules-occasion') {
    const c = SEO_BY_PATH[path] || {};
    return { ...base, title: c.title || 'Voitures d’occasion à vendre près de Bordeaux' + T_SUFFIX, description: c.description || 'Voitures et utilitaires d’occasion à vendre à Yvrac, près de Bordeaux : annonces détaillées, rachat et dépôt-vente de votre véhicule.', image: ogImage({ path }), jsonld: [businessLd(), breadcrumbLd([home, [c.h1 || 'Véhicules à vendre', path]]), { '@type': 'ItemList', itemListElement: onSale().map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(saleHref(s)), name: saleFull(s) })) }, faqLd(c.faq)].filter(Boolean) };
  }
  m = /^\/vehicule-occasion\/([\w-]+)$/.exec(path);
  if (m) {
    const s = saleBySlug(m[1]);
    if (!s) return notFoundMeta(base);
    return {
      ...base, canonical: absUrl(saleHref(s)), ogType: 'product', image: ogImage({ path: saleHref(s) }), noindex: s.status === 'vendu',
      title: `${saleName(s)} d’occasion ${s.year}, ${eur(s.price)}` + T_SUFFIX,
      description: clip(`${saleFull(s)} d’occasion : ${s.year}, ${kmFmt(s.km)}, ${s.energy.toLowerCase()}, boîte ${s.gearbox.toLowerCase()}, ${eur(s.price)}. À voir à l’agence PRISMA Automobiles d’Yvrac, près de Bordeaux.`),
      jsonld: [saleLd(s), breadcrumbLd([home, ['Véhicules à vendre', '/vehicules-occasion'], [saleName(s), saleHref(s)]])],
    };
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
  ${p.path === SALE_HUB ? `<section class="section-sm vo-teaser"><div class="wrap">${saleTeaserHTML()}${demoSalesNote()}</div></section>` : ''}
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
    ['/vehicules-occasion', 'car', 'Véhicules à vendre', 'Neufs et d’occasion : découvrez les annonces de l’agence, ou dites-nous ce que vous cherchez.'],
  ].filter(([p]) => pageExists(p));
  return `<section class="section-sm sale-band"><div class="wrap">
    <div class="sec-row"><h2 data-reveal>Achat, vente et dépôt-vente</h2><a class="more-link" href="${SALE_HUB}">En savoir plus <i>${icon('plus')}</i></a></div>
    <div class="sale-grid" data-stagger>${cards.map(([p, ic, t, d]) => `<a class="sale-c" href="${p}"><span class="pl-ic">${icon(ic)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="rel-go">Découvrir ${icon('arrowR')}</span></a>`).join('')}</div>
    ${saleTeaserHTML('Les dernières annonces')}
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

/* =====================================================================
   VÉHICULES À VENDRE : annonces (stock de l'agence ou dépôt-vente),
   vitrine avec filtres et tri, fiche annonce, demande d'information,
   de rendez-vous ou de réservation, avec reprise éventuelle.
   Les annonces se gèrent dans le logiciel du loueur (rubrique Ventes).
   ===================================================================== */
const SALE_PHOTOS = typeof EMBEDDED_SALE_PHOTOS === 'object' ? EMBEDDED_SALE_PHOTOS : {};
const SALE_LIST = '/vehicules-occasion';
const SALE_CATS = [['all', 'Tous'], ['citadine', 'Citadines'], ['compacte', 'Compactes'], ['suv', 'SUV'], ['berline', 'Berlines'], ['utilitaire', 'Utilitaires']];
const SALE_STATUS = { disponible: ['Disponible', 'b-ok'], reserve: ['Réservé', 'b-warn'], vendu: ['Vendu', 'b-sold'] };
const SALE_ENERGIES = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const SALES_SEED = 2;   // à augmenter quand les annonces de démonstration changent : elles sont remplacées chez les visiteurs
const saleName = (s) => `${s.brand} ${s.model}`;
const saleFull = (s) => `${s.brand} ${s.model}${s.version ? ' ' + s.version : ''}`;
const saleHref = (s) => '/vehicule-occasion/' + s.slug;
const sale = (id) => (db.sales || []).find((x) => x.id === id);
const saleBySlug = (slug) => (db.sales || []).find((x) => !x.deleted && (x.slug === slug || x.id === slug));
const liveSales = () => (db.sales || []).filter((s) => !s.deleted);
const onSale = () => liveSales().filter((s) => s.status !== 'vendu');
const kmFmt = (n) => `${Number(n || 0).toLocaleString('fr-FR')} km`;
const saleSlug = (s) => slugify(`${s.brand} ${s.model} ${s.version || ''} ${s.year || ''}`).slice(0, 80);
/** Vignette Crit'Air d'un véhicule récent (normes Euro 5 et 6) : 0 électrique, 1 essence ou hybride, 2 diesel. */
const saleCritair = (s) => (s.energy === 'Électrique' ? 0 : s.energy === 'Diesel' ? 2 : 1);
/** Mise en circulation lisible (« mars 2020 »). */
function saleReg(s) {
  const [y, m] = String(s.firstReg || '').split('-').map(Number);
  return y ? `${m ? MOIS[m - 1] + ' ' : ''}${y}` : String(s.year || '');
}
/** Contrôle technique : obligatoire (moins de 6 mois) pour vendre à un particulier un véhicule de plus de 4 ans. */
function saleCT(s) {
  const [y, m] = String(s.firstReg || s.year || '').split('-').map(Number);
  if (!y) return '';
  const age = yearsBetween(new Date(y, (m || 1) - 1, 1), new Date());
  return age >= 4 ? 'Contrôle technique de moins de 6 mois remis à la vente' : 'Moins de 4 ans : pas encore de contrôle technique';
}
const daysOnline = (s) => Math.max(0, Math.round((dayStart(new Date()) - dayStart(parse(s.listedAt) || new Date())) / DAY));
const isNewSale = (s) => s.status === 'disponible' && daysOnline(s) <= 10;

/* ---------- Annonces d'exemple (démonstration) ---------- */
function seedSales() {
  const today = dayStart(new Date());
  const at = (n) => toISO(addDays(today, -n));
  const S = (o) => ({ status: 'disponible', mode: 'stock', owners: 1, doors: 5, seats: 5, deleted: false, photo: null, ...o, slug: o.slug || saleSlug(o) });
  return [
    S({ id: 'vo-3008', ref: 'VO-2601', brand: 'Peugeot', model: '3008', version: 'GT Line 1.5 BlueHDi 130 EAT8', category: 'suv', shape: 'suv', color: '#6e747b', colorName: 'Gris Platinium', year: 2020, firstReg: '2020-03', km: 68400, price: 21900, energy: 'Diesel', gearbox: 'Automatique', power: 130, listedAt: at(12),
      equipment: ['i-Cockpit et écran tactile 10 pouces', 'Navigation connectée', 'Apple CarPlay et Android Auto', 'Caméra de recul', 'Aide au stationnement avant et arrière', 'Climatisation automatique bizone', 'Régulateur et limiteur de vitesse'],
      description: 'SUV familial en première main, entretien suivi. Boîte automatique à 8 rapports, grand coffre et position de conduite haute : à l’aise en famille comme sur les longs trajets.' }),
    S({ id: 'vo-captur', ref: 'VO-2602', brand: 'Renault', model: 'Captur', version: 'TCe 100 Intens', category: 'suv', shape: 'suv', color: '#c8202a', colorName: 'Rouge Flamme, toit noir', year: 2021, firstReg: '2021-06', km: 41200, price: 16490, energy: 'Essence', gearbox: 'Manuelle', power: 100, mode: 'depot', owners: 1, listedAt: at(3),
      equipment: ['Écran tactile 9,3 pouces et navigation', 'Apple CarPlay et Android Auto', 'Banquette arrière coulissante', 'Caméra de recul', 'Climatisation automatique', 'Jantes alliage 18 pouces'],
      description: 'Petit SUV bicolore vendu en dépôt-vente pour le compte de son propriétaire. Banquette arrière coulissante pour moduler le coffre, idéal en ville comme pour les week-ends.' }),
    S({ id: 'vo-golf', ref: 'VO-2603', brand: 'Volkswagen', model: 'Golf', version: 'GTI 2.0 TSI 245 DSG7', category: 'compacte', shape: 'berline', color: '#f1f2f3', colorName: 'Blanc Pur', year: 2021, firstReg: '2021-05', km: 42300, price: 33900, energy: 'Essence', gearbox: 'Automatique', power: 245, owners: 1, listedAt: at(21),
      equipment: ['Digital Cockpit Pro', 'Navigation et écran 10 pouces', 'Apple CarPlay et Android Auto sans fil', 'Sièges sport GTI', 'Régulateur de vitesse adaptatif', 'Phares LED matriciels'],
      description: 'La compacte sportive de référence, boîte DSG à 7 rapports et 245 ch. Première main, carnet d’entretien à jour.' }),
    S({ id: 'vo-yaris', ref: 'VO-2604', brand: 'Toyota', model: 'Yaris', version: 'Hybride 100h Dynamic', category: 'citadine', shape: 'citadine', color: '#2742a8', colorName: 'Bleu Nébula', year: 2019, firstReg: '2019-06', km: 52300, price: 14490, energy: 'Hybride', gearbox: 'Automatique', power: 100, listedAt: at(6),
      equipment: ['Motorisation hybride et boîte automatique', 'Écran tactile Toyota Touch 2', 'Caméra de recul', 'Climatisation automatique', 'Régulateur de vitesse', 'Aide au maintien de voie'],
      description: 'Citadine hybride très sobre en ville, boîte automatique de série. Parfaite pour les trajets quotidiens dans Bordeaux Métropole.' }),
    S({ id: 'vo-sandero', ref: 'VO-2605', brand: 'Dacia', model: 'Sandero Stepway', version: 'TCe 90 Confort', category: 'citadine', shape: 'citadine', color: '#c86b2a', colorName: 'Orange Atacama', year: 2022, firstReg: '2022-09', km: 23500, price: 13490, energy: 'Essence', gearbox: 'Manuelle', power: 90, status: 'reserve', listedAt: at(18),
      equipment: ['Barres de toit modulables', 'Écran multimédia et smartphone connecté', 'Aide au stationnement arrière', 'Climatisation', 'Régulateur de vitesse'],
      description: 'Citadine surélevée au look baroudeur, économique à l’usage. Véhicule réservé : contactez-nous pour être prévenu s’il se libère.' }),
    S({ id: 'vo-c3', ref: 'VO-2606', brand: 'Citroën', model: 'C3', version: 'PureTech 83 Shine', category: 'citadine', shape: 'citadine', color: '#eef0f2', colorName: 'Blanc Banquise, toit rouge', year: 2019, firstReg: '2019-04', km: 61300, price: 9990, energy: 'Essence', gearbox: 'Manuelle', power: 83, owners: 2, listedAt: at(33),
      equipment: ['Écran tactile 7 pouces', 'Apple CarPlay et Android Auto', 'Caméra de recul', 'Climatisation automatique', 'Régulateur de vitesse', 'Airbump latéraux'],
      description: 'Citadine confortable à petit prix, idéale pour un premier véhicule ou un second véhicule du foyer.' }),
    S({ id: 'vo-a3', ref: 'VO-2607', brand: 'Audi', model: 'A3 Berline', version: '35 TFSI 150 S tronic S line', category: 'compacte', shape: 'berline', color: '#1b1d21', colorName: 'Noir Mythic', year: 2022, firstReg: '2022-03', km: 38700, price: 28900, energy: 'Essence', gearbox: 'Automatique', power: 150, mode: 'depot', owners: 1, listedAt: at(9),
      equipment: ['Virtual Cockpit', 'Navigation MMI et écran 10,1 pouces', 'Apple CarPlay et Android Auto', 'Sièges avant chauffants', 'Radar de stationnement avant et arrière', 'Éclairage d’ambiance'],
      description: 'Berline compacte premium à boîte automatique S tronic, finition S line, vendue en dépôt-vente pour le compte de son propriétaire. Intérieur très bien conservé.' }),
    S({ id: 'vo-serie3', ref: 'VO-2608', brand: 'BMW', model: 'Série 3', version: '320d xDrive 190 Luxury', category: 'berline', shape: 'berline', color: '#15171b', colorName: 'Noir Saphir', year: 2022, firstReg: '2022-10', km: 48500, price: 36500, energy: 'Diesel', gearbox: 'Automatique', power: 190, owners: 1, status: 'vendu', listedAt: at(40), soldAt: at(4),
      equipment: ['Transmission intégrale xDrive', 'Boîte automatique à 8 rapports', 'Navigation professionnelle', 'Sièges chauffants', 'Caméra de recul', 'Accès et démarrage sans clé'],
      description: 'Berline routière vendue récemment. D’autres berlines et compactes premium sont régulièrement proposées : contactez-nous pour votre recherche.' }),
    S({ id: 'vo-modely', ref: 'VO-2609', brand: 'Tesla', model: 'Model Y', version: 'Grande Autonomie transmission intégrale', category: 'suv', shape: 'suv', color: '#a9adb3', colorName: 'Gris argent', year: 2022, firstReg: '2022-08', km: 51900, price: 31900, energy: 'Électrique', gearbox: 'Automatique', power: null, owners: 1, listedAt: at(2),
      equipment: ['Autopilot', 'Toit en verre panoramique', 'Écran central 15 pouces', 'Sièges chauffants avant et arrière', 'Hayon électrique', 'Accès au réseau de Superchargeurs'],
      description: 'SUV électrique spacieux, transmission intégrale et grande autonomie. Recharge rapide sur le réseau de Superchargeurs pour les longs trajets.' }),
    S({ id: 'vo-500', ref: 'VO-2610', brand: 'Fiat', model: '500', version: '1.0 Hybrid 70 Dolcevita', category: 'citadine', shape: 'citadine', color: '#f05a4a', colorName: 'Rouge Corallo', year: 2021, firstReg: '2021-07', km: 30800, price: 11490, energy: 'Hybride', gearbox: 'Manuelle', power: 70, doors: 3, seats: 4, mode: 'depot', owners: 1, listedAt: at(14),
      equipment: ['Motorisation hybride légère', 'Toit panoramique en verre', 'Écran tactile 7 pouces', 'Apple CarPlay et Android Auto', 'Radar de recul', 'Climatisation'],
      description: 'Citadine chic et facile à garer, vendue en dépôt-vente pour le compte de son propriétaire. Toit en verre, finition Dolcevita et teinte Rouge Corallo.' }),
    S({ id: 'vo-partner', ref: 'VO-2611', brand: 'Peugeot', model: 'Partner', version: 'Standard 1.5 BlueHDi 100 Asphalt', category: 'utilitaire', shape: 'fourgonnette', color: '#f4f5f6', colorName: 'Blanc Banquise', year: 2020, firstReg: '2020-10', km: 79200, price: 13900, energy: 'Diesel', gearbox: 'Manuelle', power: 100, doors: 4, seats: 3, owners: 1, listedAt: at(25),
      equipment: ['Cabine 3 places', 'Porte latérale coulissante', 'Cloison de séparation', 'Écran tactile et navigation', 'Aide au stationnement arrière', 'Anneaux d’arrimage'],
      description: 'Petit utilitaire pratique pour les artisans et les livraisons en ville. Cabine trois places et chargement protégé par une cloison.' }),
    S({ id: 'vo-transit', ref: 'VO-2612', brand: 'Ford', model: 'Transit Custom Kombi', version: '2.0 EcoBlue 130 Trend, 9 places', category: 'utilitaire', shape: 'minibus', color: '#c9ccd1', colorName: 'Gris Moondust', year: 2019, firstReg: '2019-05', km: 98600, price: 24900, energy: 'Diesel', gearbox: 'Manuelle', power: 130, doors: 4, seats: 9, owners: 1, listedAt: at(29),
      equipment: ['9 places', 'Climatisation avant et arrière', 'Portes latérales coulissantes', 'Régulateur de vitesse', 'Caméra de recul', 'Radar de stationnement'],
      description: 'Minibus 9 places polyvalent, pour les équipes, les associations et les familles nombreuses. Il se conduit avec le permis B.' }),
  ];
}

/* ---------- Briques d'affichage ---------- */
function saleShot(s, { big = false } = {}) {
  const ph = SALE_PHOTOS[s.id];
  const cut = !s.photo && ph && ph.cut;
  const st = db.settings;
  const logo = st.logo ? `<img src="${st.logo}" alt="">` : `<img src="${ASSETS.mark}" alt=""><i></i><img src="${ASSETS.word}" alt="">`;
  if (!cut && s.photo) return `<div class="shot own ${big ? 'big' : ''}"><img class="shot-photo" src="${esc(s.photo)}" alt="${esc(saleFull(s))}" decoding="async"></div>`;
  const set = cut && ph.cutSm ? ` srcset="${ph.cutSm} ${ph.smW}w, ${cut} ${ph.w}w" sizes="${big ? '(max-width: 960px) 92vw, 780px' : '(max-width: 540px) 82vw, (max-width: 1180px) 45vw, 420px'}"` : '';
  const car = cut ? `<img class="shot-car" src="${cut}"${set} alt="${esc(saleFull(s))} d’occasion"${big ? '' : ' loading="lazy"'} decoding="async">` : `<div class="shot-svg">${carSVG(s.shape || 'citadine', s.color || '#8a929c', { label: saleName(s) })}</div>`;
  return `<div class="shot ${big ? 'big' : ''}"><span class="shot-logo" aria-hidden="true">${logo}</span>${car}</div>`;
}
function saleTags(s) {
  const t = [];
  if (s.status !== 'disponible') t.push(`<span class="vo-tag ${s.status}">${SALE_STATUS[s.status][0]}</span>`);
  else if (isNewSale(s)) t.push('<span class="vo-tag new">Nouveau</span>');
  if (s.mode === 'depot') t.push('<span class="vo-tag depot">Dépôt-vente</span>');
  return t.length ? `<span class="vo-tags">${t.join('')}</span>` : '';
}
/** Carte d'annonce (vitrine, accueil, suggestions). */
function saleCard(s) {
  // un véhicule vendu reste visible dans la vitrine, sans lien : son annonce n'est plus en ligne
  const tag = s.status === 'vendu' ? 'div' : 'a';
  return `<${tag} class="rcard vo-card ${s.status}"${tag === 'a' ? ` href="${saleHref(s)}"` : ''} data-vo="${esc(s.id)}" data-cat="${esc(s.category)}" data-energy="${esc(s.energy)}" data-gear="${esc(s.gearbox)}" data-price="${s.price}" data-km="${s.km}" data-year="${s.year}" data-listed="${esc(s.listedAt || '')}">
    <div class="vo-shot">${saleShot(s)}${saleTags(s)}</div>
    <div class="rc-b">
      <div class="rc-p"><b>${eur(s.price)}</b>${s.status === 'vendu' ? '<span class="vo-sold">Vendu</span>' : ''}</div>
      <div class="rc-n">${esc(`${s.brand} - ${s.model}`)}<small> ${esc(s.version || '')}</small></div>
      <div class="rc-s"><span>${icon('cal')}${esc(String(s.year))}</span><span>${icon('gauge')}${esc(kmFmt(s.km))}</span><span>${icon('fuel')}${esc(s.energy)}</span><span>${icon('gear')}${s.gearbox === 'Automatique' ? 'Auto' : 'Manuelle'}</span></div>
    </div>
  </${tag}>`;
}
/** Quelques annonces (accueil, page achat-vente) : les plus récentes encore en vente. */
function saleTeaserHTML(title = 'Nos véhicules à vendre', n = 8) {
  const list = onSale().sort((a, b) => (a.listedAt < b.listedAt ? 1 : -1)).slice(0, n);
  if (!list.length) return '';
  return `<div class="sec-row vo-teaser-hd"><h2>${esc(title)}</h2><a class="more-link" href="${SALE_LIST}">Voir les ${onSale().length} véhicules <i>${icon('plus')}</i></a></div>
    <div class="hscroll vo-hscroll">${list.map(saleCard).join('')}</div>`;
}
const demoSalesNote = () => (INDEXABLE ? '' : '<p class="tst-note">Annonces d’exemple pour la démonstration : elles seront remplacées par les véhicules de PRISMA Automobiles, gérés depuis le logiciel.</p>');

/* ---------- Vitrine ---------- */
const voUi = { cat: 'all', energy: '', gear: '', pmax: '', kmax: '', sort: 'recent' };
function pageSales() {
  const c = SEO_BY_PATH[SALE_LIST] || {};
  const all = liveSales();
  const avail = onSale();
  const hero = avail.find((s) => SALE_PHOTOS[s.id] && SALE_PHOTOS[s.id].cut && !s.photo);
  const from = avail.length ? Math.min(...avail.map((s) => s.price)) : null;
  const opt = (v, l, cur) => `<option value="${esc(v)}" ${String(v) === String(cur) ? 'selected' : ''}>${esc(l)}</option>`;
  const cats = SALE_CATS.filter(([k]) => k === 'all' || all.some((s) => s.category === k));
  const html = `
  <section class="lp-hero">
    <div class="lp-glow" aria-hidden="true"></div>
    <div class="wrap">
      ${crumbsHTML([['Accueil', '/'], [c.h1 || 'Véhicules à vendre', null]])}
      <div class="lp-grid ${hero ? '' : 'solo'}">
        <div class="lp-copy">
          <span class="eyebrow">${esc(c.eyebrow || 'Véhicules à vendre')}</span>
          <h1>${esc(c.h1 || 'Voitures d’occasion à vendre près de Bordeaux')}</h1>
          <p class="lp-lead">${esc(c.lead || 'Découvrez les véhicules à vendre à l’agence PRISMA Automobiles d’Yvrac.')}</p>
          <ul class="lp-facts">
            <li>${icon('car')}<span><b>${plural(avail.length, 'véhicule')}</b> à vendre${from != null ? `, dès <b>${eur(from)}</b>` : ''}</span></li>
            <li>${icon('key')}<span>Rachat et dépôt-vente de votre véhicule</span></li>
            <li>${icon('pin')}<span>Agence d’Yvrac, à environ 15 minutes de Bordeaux</span></li>
          </ul>
          <div class="lp-cta"><a class="btn btn-primary btn-lg" href="#vitrine" data-jump="vitrine">Voir les véhicules</a><a class="btn btn-ghost btn-lg" href="${telHref()}">${icon('phone')}${esc(db.settings.phone)}</a></div>
        </div>
        ${hero ? `<div class="lp-art" aria-hidden="true"><div class="lp-ring"></div><img src="${SALE_PHOTOS[hero.id].cut}" alt="" width="1400" height="760" fetchpriority="high"></div>` : ''}
      </div>
    </div>
  </section>
  <section class="section vo-list" id="vitrine"><div class="wrap">
    <div class="pillbar vo-cats" role="group" aria-label="Catégories">${cats.map(([k, l]) => `<button type="button" class="pill ${voUi.cat === k ? 'on' : ''}" data-vocat="${k}" aria-pressed="${voUi.cat === k}">${esc(l)}</button>`).join('')}</div>
    <form class="vo-filters" data-vofilters onsubmit="return false">
      <label class="field"><span class="lbl">Énergie</span><select class="select" name="energy">${opt('', 'Toutes', voUi.energy)}${SALE_ENERGIES.filter((e) => all.some((s) => s.energy === e)).map((e) => opt(e, e, voUi.energy)).join('')}</select></label>
      <label class="field"><span class="lbl">Boîte</span><select class="select" name="gear">${opt('', 'Toutes', voUi.gear)}${opt('Automatique', 'Automatique', voUi.gear)}${opt('Manuelle', 'Manuelle', voUi.gear)}</select></label>
      <label class="field"><span class="lbl">Budget maximum</span><select class="select" name="pmax">${opt('', 'Sans limite', voUi.pmax)}${[10000, 15000, 20000, 25000, 30000].map((p) => opt(p, eur(p), voUi.pmax)).join('')}</select></label>
      <label class="field"><span class="lbl">Kilométrage maximum</span><select class="select" name="kmax">${opt('', 'Sans limite', voUi.kmax)}${[30000, 50000, 75000, 100000].map((k) => opt(k, kmFmt(k), voUi.kmax)).join('')}</select></label>
      <label class="field"><span class="lbl">Trier par</span><select class="select" name="sort">${opt('recent', 'Nouveautés', voUi.sort)}${opt('prix', 'Prix croissant', voUi.sort)}${opt('prixd', 'Prix décroissant', voUi.sort)}${opt('km', 'Kilométrage', voUi.sort)}${opt('annee', 'Année la plus récente', voUi.sort)}</select></label>
    </form>
    <p class="res-count" data-vocount></p>
    <div class="rgrid vo-grid" data-vogrid>${all.map(saleCard).join('')}</div>
    <div class="empty" data-voempty hidden>${icon('search')}Aucun véhicule ne correspond à ces critères pour le moment.<br><br><a class="btn btn-ghost" href="#estimation" data-jump="estimation">Décrire ma recherche</a></div>
    ${demoSalesNote()}
  </div></section>
  ${c.sections && c.sections.length ? `<div class="wrap seo-body"><article class="seo-article">${sectionsHTML(c.sections)}</article></div>` : ''}
  ${estimationHTML('achat')}
  <div class="wrap seo-body">${faqHTML(c.faq)}${relatedHTML(c.related || ['/achat-vente-voiture-bordeaux', '/depot-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches'])}</div>
  ${ctaBandHTML('Un véhicule vous intéresse ?', { text: `Appelez-nous au ${db.settings.phone} ou écrivez-nous sur WhatsApp pour le voir à l’agence d’Yvrac.`, primary: ['Voir les véhicules', '#vitrine'], wa: 'Bonjour, je suis intéressé par un véhicule à vendre sur votre site.' })}`;
  return publicPage(html, { active: 'vente' });
}
function mountSales() {
  const grid = $('[data-vogrid]');
  if (!grid) return;
  const f = $('[data-vofilters]');
  const cards = $$('.vo-card', grid);
  const apply = () => {
    const { cat, energy, gear, pmax, kmax, sort } = voUi;
    let n = 0;
    for (const c of cards) {
      const d = c.dataset;
      const show = (cat === 'all' || d.cat === cat) && (!energy || d.energy === energy) && (!gear || d.gear === gear) && (!pmax || +d.price <= +pmax) && (!kmax || +d.km <= +kmax);
      c.hidden = !show;
      if (show) n++;
    }
    // vendus en fin de liste, puis le tri choisi
    const key = { recent: (c) => -Date.parse(c.dataset.listed || 0), prix: (c) => +c.dataset.price, prixd: (c) => -c.dataset.price, km: (c) => +c.dataset.km, annee: (c) => -c.dataset.year }[sort];
    cards.slice().sort((a, b) => (a.classList.contains('vendu') - b.classList.contains('vendu')) || (key(a) - key(b))).forEach((c) => grid.appendChild(c));
    const avail = cards.filter((c) => !c.hidden && !c.classList.contains('vendu')).length;
    $('[data-vocount]').innerHTML = n ? `<b>${avail}</b> ${avail > 1 ? 'véhicules à vendre' : 'véhicule à vendre'}${n > avail ? ` et ${plural(n - avail, 'vente')} récente${n - avail > 1 ? 's' : ''}` : ''}` : '';
    $('[data-voempty]').hidden = n > 0;
  };
  $$('[data-vocat]').forEach((b) => (b.onclick = () => {
    voUi.cat = b.dataset.vocat;
    $$('[data-vocat]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    apply();
  }));
  f.onchange = () => { voUi.energy = f.energy.value; voUi.gear = f.gear.value; voUi.pmax = f.pmax.value; voUi.kmax = f.kmax.value; voUi.sort = f.sort.value; apply(); };
  apply();
  mountEstimation();
  mountSeo();
}

/* ---------- Fiche annonce ---------- */
function pageSale(id) {
  const s = sale(id);
  if (!s || s.deleted) return pageNotFound();
  const st = SALE_STATUS[s.status] || SALE_STATUS.disponible;
  const ph = SALE_PHOTOS[s.id];
  const photo = s.photo || (ph && ph.src);
  const others = onSale().filter((x) => x.id !== s.id).sort((a, b) => (Math.abs(a.price - s.price) - Math.abs(b.price - s.price))).slice(0, 8);
  const wa = `Bonjour, je suis intéressé par le véhicule ${saleFull(s)} (réf. ${s.ref}) vu sur votre site.`;
  const specs = [
    ['Marque', s.brand], ['Modèle', s.model], ['Version', s.version], ['Année', s.year], ['Mise en circulation', saleReg(s)], ['Kilométrage', kmFmt(s.km)],
    ['Énergie', s.energy], ['Boîte de vitesses', s.gearbox], ['Puissance', s.power ? `${s.power} ch` : ''], ['Portes', s.doors], ['Places', s.seats],
    ['Couleur', s.colorName], ['Vignette Crit’Air', String(saleCritair(s))], ['Propriétaires', s.owners === 1 ? 'Première main' : s.owners ? String(s.owners) : ''],
    ['Contrôle technique', saleCT(s)], ['Référence', s.ref],
  ].filter(([, v]) => v !== '' && v != null);
  const html = `<div class="wrap vd vo-page" data-og-d="${esc(`${s.year} · ${kmFmt(s.km)} · ${s.energy} · ${eur(s.price)}`)}">
    ${crumbsHTML([['Accueil', '/'], ['Véhicules à vendre', SALE_LIST], [saleName(s), null]])}
    <div class="vd-head">
      <div><span class="vd-badge">${esc(s.brand)}</span><h1>${esc(saleFull(s))} d’occasion</h1><p class="vd-sub">${esc(String(s.year))} · ${esc(kmFmt(s.km))} · ${esc(s.energy)} · ${esc(s.gearbox)}${s.mode === 'depot' ? ' · dépôt-vente' : ''}</p></div>
      <div class="vd-contact"><a href="${telHref()}">${icon('phone')}Appeler</a><a href="${waHref(wa)}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
    </div>
    <div class="vd-grid">
      <div class="vd-gal">
        <div class="vd-main vo-main" data-vomain>${saleShot(s, { big: true })}${saleTags(s)}</div>
        <div class="vd-thumbs">
          <button type="button" class="on" data-voview="studio" aria-label="Vue studio">${saleShot(s)}</button>
          ${photo && !s.photo ? `<button type="button" data-voview="photo" aria-label="Photo du véhicule"><img src="${esc(photo)}" alt="" loading="lazy"></button>` : ''}
        </div>
        ${ph && ph.credit && !s.photo ? `<p class="credit">Photo : ${esc(ph.credit.author || 'libre de droits')}${ph.credit.license ? `, ${esc(ph.credit.license)}` : ''}. Photo d’illustration.</p>` : ''}
      </div>
      <aside class="vd-book vo-buy">
        <div class="vd-price"><span class="vd-pl">Prix</span><b class="num">${eur(s.price)}</b><span class="vd-km">Réf. ${esc(s.ref)} · <span class="badge ${st[1]}">${st[0]}</span></span></div>
        ${s.status === 'reserve' ? `<div class="alert warn">${icon('info')}<span>Ce véhicule est réservé. Laissez vos coordonnées : nous vous prévenons s’il se libère.</span></div>` : ''}
        ${s.status === 'vendu' ? `<div class="alert info">${icon('info')}<span>Ce véhicule est vendu. Décrivez-nous votre recherche : nous vous proposerons des modèles proches.</span></div>` : ''}
        <a class="btn btn-primary btn-lg btn-block" href="#contact-annonce" data-jump="contact-annonce">${s.status === 'vendu' ? 'Décrire ma recherche' : 'Je suis intéressé'}</a>
        <a class="btn btn-wa btn-block" href="${waHref(wa)}" target="_blank" rel="noopener">${icon('wa')}Écrire sur WhatsApp</a>
        <ul class="vo-perks">
          <li>${icon('pin')}<span>À voir à l’agence d’Yvrac, sur rendez-vous</span></li>
          <li>${icon('key')}<span>Votre véhicule actuel : <a href="/rachat-voiture-bordeaux">faites estimer sa reprise</a></span></li>
          ${s.mode === 'depot' ? `<li>${icon('users')}<span>Vendu en dépôt-vente pour le compte de son propriétaire</span></li>` : `<li>${icon('check')}<span>Vendu par PRISMA Automobiles</span></li>`}
        </ul>
      </aside>
    </div>
    <div class="vd-info vo-info">
      <div>
        <h2>Caractéristiques</h2>
        <div class="vo-specs">${specs.map(([k, v]) => `<div class="kv"><span>${esc(k)}</span><b>${esc(String(v))}</b></div>`).join('')}</div>
        ${s.equipment && s.equipment.length ? `<h3>Équipements</h3><ul class="vd-eq">${s.equipment.map((e) => `<li>${icon('check')}${esc(e)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="conds-card">
        <h3>Le mot du vendeur</h3>
        <p class="vd-desc">${esc(s.description || '')}</p>
        <div class="kv"><span>Prix</span><b>${eur(s.price)}</b></div>
        <div class="kv"><span>Disponibilité</span><b>${st[0]}</b></div>
        <div class="kv"><span>Lieu</span><b>Agence d’Yvrac</b></div>
        <p class="muted vo-docs">À la vente : certificat de cession, carte grise barrée, certificat de situation administrative de moins de 15 jours et, pour un véhicule de plus de 4 ans, contrôle technique de moins de 6 mois. <a class="link" href="/guides/vendre-sa-voiture-demarches">Les démarches en détail</a>.</p>
      </div>
    </div>
    <section class="est vo-contact" id="contact-annonce"><div class="est-in">
      <div class="est-copy">
        <span class="eyebrow">Réf. ${esc(s.ref)}</span>
        <h2>${s.status === 'vendu' ? 'Décrivez-nous votre recherche' : 'Ce véhicule vous intéresse ?'}</h2>
        <p>Posez vos questions, demandez un rendez-vous pour le voir à l’agence d’Yvrac ou réservez-le : nous vous rappelons rapidement.</p>
        <ul class="lp-facts"><li>${icon('phone')}<span>${esc(db.settings.phone)}, aussi sur WhatsApp</span></li><li>${icon('clock')}<span>${esc(weekHoursText())}</span></li></ul>
      </div>
      <form class="est-form" data-vocontact novalidate>
        <label class="field"><span class="lbl">Votre demande</span><select class="select" name="kind"><option>Plus d’informations</option><option>Rendez-vous pour voir le véhicule</option>${s.status === 'disponible' ? '<option>Réserver ce véhicule</option>' : ''}</select></label>
        <div class="grid2"><label class="field" data-f="firstName"><span class="lbl">Prénom <span class="req">*</span></span><input class="input" name="firstName" autocomplete="given-name"><span class="msg">Champ obligatoire.</span></label><label class="field" data-f="lastName"><span class="lbl">Nom <span class="req">*</span></span><input class="input" name="lastName" autocomplete="family-name"><span class="msg">Champ obligatoire.</span></label></div>
        <div class="grid2"><label class="field" data-f="phone"><span class="lbl">Téléphone <span class="req">*</span></span><input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel"><span class="msg">Numéro de téléphone incomplet.</span></label><label class="field" data-f="email"><span class="lbl">Email</span><input class="input" name="email" type="email" autocomplete="email" inputmode="email"><span class="msg">Adresse email invalide.</span></label></div>
        <label class="check"><input type="checkbox" name="trade" data-trade><span>J’ai un véhicule à faire reprendre</span></label>
        <div class="grid3" data-tradef hidden><label class="field"><span class="lbl">Marque et modèle</span><input class="input" name="tModel" placeholder="Renault Clio"></label><label class="field"><span class="lbl">Année</span><input class="input" name="tYear" inputmode="numeric" maxlength="4" placeholder="2017"></label><label class="field"><span class="lbl">Kilométrage</span><input class="input" name="tKm" inputmode="numeric" placeholder="95 000"></label></div>
        <label class="field"><span class="lbl">Message</span><textarea class="textarea" name="message" placeholder="Vos questions, vos disponibilités pour un rendez-vous…"></textarea></label>
        <button class="btn btn-primary btn-lg" type="submit">Envoyer ma demande</button>
        <p class="est-note">Vos informations servent uniquement à vous recontacter au sujet de ce véhicule.</p>
      </form>
    </div></section>
    ${others.length ? `<section class="vd-more"><div class="sec-row"><h2>D’autres véhicules à vendre</h2><a class="more-link" href="${SALE_LIST}">Tous les véhicules <i>${icon('plus')}</i></a></div><div class="hscroll">${others.map(saleCard).join('')}</div></section>` : ''}
  </div>`;
  return publicPage(html, { active: 'vente' });
}
function mountSale(id) {
  const s = sale(id);
  const main = $('[data-vomain]');
  if (!s || !main) return;
  const tags = saleTags(s);
  $$('[data-voview]').forEach((b) => (b.onclick = () => {
    $$('[data-voview]').forEach((x) => x.classList.toggle('on', x === b));
    main.classList.remove('swap'); void main.offsetWidth; main.classList.add('swap');
    main.innerHTML = (b.dataset.voview === 'photo' ? `<img class="vd-photo" src="${esc(s.photo || SALE_PHOTOS[s.id].src)}" alt="${esc(saleFull(s))}">` : saleShot(s, { big: true })) + tags;
  }));
  const f = $('[data-vocontact]');
  if (f) {
    const tr = $('[data-tradef]', f);
    f.trade.onchange = () => { tr.hidden = !f.trade.checked; };
    f.onsubmit = (e) => {
      e.preventDefault();
      const g = (n) => (f[n] ? f[n].value.trim() : '');
      const errs = ['firstName', 'lastName', 'phone'].filter((n) => !g(n));
      if (g('phone') && g('phone').replace(/\D/g, '').length < 10) errs.push('phone');
      if (g('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) errs.push('email');
      $$('[data-f]', f).forEach((el) => el.classList.toggle('err', errs.includes(el.dataset.f)));
      if (errs.length) { toast('Vérifiez les champs signalés.', 'warn'); $(`[data-f="${errs[0]}"] .input`, f)?.focus(); return; }
      const trade = f.trade.checked ? [g('tModel'), g('tYear'), g('tKm') && `${g('tKm')} km`].filter(Boolean).join(', ') : '';
      const message = [`Demande : ${g('kind')}`, `Véhicule : ${saleFull(s)} (réf. ${s.ref}, ${eur(s.price)})`, trade && `Reprise souhaitée : ${trade}`, g('message') && `Message : ${g('message')}`].filter(Boolean).join('\n');
      if (!db.messages) db.messages = [];
      db.messages.unshift({ id: uid('m'), at: toISO(new Date()), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'), subject: `Annonce ${s.ref} : ${saleName(s)}`, message, saleId: s.id, done: false });
      save();
      f.reset();
      tr.hidden = true;
      toast('Demande envoyée : nous vous rappelons rapidement.', 'ok');
    };
  }
  mountSeo();
}

/* ---------- Données structurées d'une annonce ---------- */
function saleLd(s) {
  const url = absUrl(saleHref(s));
  const ph = SALE_PHOTOS[s.id];
  const img = ph && ph.src && !s.photo ? absAsset(ph.src) : undefined;
  return {
    '@type': ['Product', s.category === 'utilitaire' ? 'Vehicle' : 'Car'], '@id': url + '#vehicule', name: `${saleFull(s)} d’occasion`, url,
    description: stripTags(s.description || ''), image: img ? [img] : undefined, sku: s.ref,
    brand: { '@type': 'Brand', name: s.brand }, model: s.model, vehicleModelDate: String(s.year), dateVehicleFirstRegistered: s.firstReg || undefined,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: s.km, unitCode: 'KMT' }, fuelType: s.energy, vehicleTransmission: s.gearbox, color: s.colorName || undefined,
    numberOfDoors: s.doors, vehicleSeatingCapacity: s.seats, vehicleEngine: s.power ? { '@type': 'EngineSpecification', enginePower: { '@type': 'QuantitativeValue', value: s.power, unitText: 'ch' } } : undefined,
    itemCondition: 'https://schema.org/UsedCondition',
    offers: { '@type': 'Offer', url, price: Number(s.price).toFixed(2), priceCurrency: 'EUR', itemCondition: 'https://schema.org/UsedCondition', availability: s.status === 'vendu' ? 'https://schema.org/SoldOut' : s.status === 'reserve' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock', seller: { '@id': SITE_URL + '/#agence' } },
  };
}

/* =====================================================================
   LOGICIEL DU LOUEUR : tableau de bord, réservations, planning, flotte,
   clients, options et tarifs, paramètres
   ===================================================================== */
const adm = { resFilter: 'all', resQuery: '', planStart: null, clientQuery: '', chartTable: false, saleFilter: 'all' };
const NAV = [
  ['dashboard', 'Tableau de bord', 'grid'],
  ['reservations', 'Réservations', 'list'],
  ['planning', 'Planning', 'gantt'],
  ['flotte', 'Véhicules', 'car'],
  ['ventes', 'Ventes', 'euro'],
  ['clients', 'Clients', 'users'],
  ['tarifs', 'Options et tarifs', 'tag'],
  ['parametres', 'Paramètres', 'sliders'],
];
function adminPage(key, title, sub, actions, content) {
  const waiting = db.reservations.filter((r) => r.status === 'attente_paiement').length;
  const leads = (db.messages || []).filter((m) => m.saleId && !m.done).length;
  const nav = NAV.map(([k, label, ic]) => `<a class="nav ${k === key ? 'on' : ''}" href="/gestion/${k}">${icon(ic)}<span>${label}</span>${k === 'reservations' && waiting ? `<span class="cnt">${waiting}</span>` : ''}${k === 'ventes' && leads ? `<span class="cnt">${leads}</span>` : ''}</a>`).join('');
  const mnav = NAV.filter(([k]) => ['dashboard', 'reservations', 'planning', 'flotte', 'ventes', 'parametres'].includes(k)).map(([k, label, ic]) => `<a class="${k === key ? 'on' : ''}" href="/gestion/${k}">${icon(ic)}<span>${label.split(' ')[0]}</span></a>`).join('');
  return demoBar('admin') + `<div class="admin">
    <aside class="side">${logoHTML(true)}${nav}<div class="side-foot">${esc(db.settings.legalName)}<br>${esc(db.settings.city)} · ${esc(db.settings.phone)}</div></aside>
    <div class="main">
      <header class="topbar"><div class="topbar-in"><div><h1>${esc(title)}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div><div class="actions">${actions || ''}</div></div></header>
      <div class="page">${content}</div>
    </div>
  </div><nav class="mnav" aria-label="Navigation du logiciel">${mnav}</nav>`;
}

/* ---------- Calculs ---------- */
const active = (r) => r.status !== 'annulee';
function monthKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; }
function revenueBetween(a, b) {
  let t = 0;
  for (const r of db.reservations) for (const p of r.payments || []) { const d = parse(p.at); if (d >= a && d < b) t += p.amount; }
  return round2(t);
}
function occupancy(from, days) {
  const to = addDays(from, days);
  const fleet = db.vehicles.filter((v) => v.status === 'actif');
  const total = fleet.length * days * DAY;
  let used = 0;
  for (const r of db.reservations) {
    if (!active(r) || !fleet.some((v) => v.id === r.vehicleId)) continue;
    const a = Math.max(parse(r.from).getTime(), from.getTime());
    const b = Math.min(parse(r.to).getTime(), to.getTime());
    if (b > a) used += b - a;
  }
  return total ? Math.round((used / total) * 100) : 0;
}
function vehicleState(v, when = new Date()) {
  if (v.status !== 'actif') return { label: 'Hors service', cls: 'b-grey' };
  const t = when.getTime();
  if (db.blocks.some((b) => b.vehicleId === v.id && parse(b.from).getTime() <= t && parse(b.to).getTime() > t)) return { label: 'Entretien', cls: 'b-warn' };
  if (db.reservations.some((r) => r.vehicleId === v.id && r.status === 'en_cours')) return { label: 'En location', cls: 'b-violet' };
  return { label: 'Disponible', cls: 'b-ok' };
}

/* ---------- Tableau de bord ---------- */
function pageDashboard() {
  const now = new Date();
  const m0 = new Date(now.getFullYear(), now.getMonth(), 1);
  const lm0 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lmSame = new Date(now.getFullYear(), now.getMonth() - 1, Math.min(now.getDate(), new Date(now.getFullYear(), now.getMonth(), 0).getDate()), now.getHours(), now.getMinutes());
  const ca = revenueBetween(m0, addDays(now, 1));
  const caPrev = revenueBetween(lm0, lmSame);
  const delta = caPrev ? Math.round(((ca - caPrev) / caPrev) * 100) : null;
  const in30 = addDays(now, 30);
  const upcoming = db.reservations.filter((r) => active(r) && parse(r.from) >= now && parse(r.from) < in30);
  const occ = occupancy(dayStart(now), 30);
  const recent = db.reservations.filter((r) => active(r) && parse(r.createdAt) > addDays(now, -90));
  const avg = recent.length ? round2(sum(recent, (r) => r.quote.total) / recent.length) : 0;
  const today = dayStart(now);
  const deps = db.reservations.filter((r) => ['confirmee', 'attente_paiement'].includes(r.status) && sameDay(parse(r.from), today)).sort((a, b) => (a.from < b.from ? -1 : 1));
  const rets = db.reservations.filter((r) => r.status === 'en_cours' && parse(r.to) < addDays(today, 1)).sort((a, b) => (a.to < b.to ? -1 : 1));
  const waiting = db.reservations.filter((r) => r.status === 'attente_paiement').sort((a, b) => (a.from < b.from ? -1 : 1));
  const msgs = (db.messages || []).filter((m) => !m.done);
  const service = db.vehicles.filter((v) => !v.deleted && v.nextService && parse(v.nextService + 'T00:00') < addDays(now, 30)).sort((a, b) => (a.nextService < b.nextService ? -1 : 1));
  const resRow = (r, kind) => { const v = vehicle(r.vehicleId); const c = customer(r.customerId); const t = kind === 'dep' ? r.from : r.to; return `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer">${vehicleThumb(v)}<div><div class="t">${hm(parse(t)).replace(':', 'h')} · ${esc(custName(c))}</div><div class="s">${esc(v.name)} · ${esc(agency(kind === 'dep' ? r.agencyStart : r.agencyEnd).short)}</div></div><div class="r">${kind === 'dep' ? `<button class="btn btn-silver btn-sm" data-act="checkout" data-id="${esc(r.id)}">Remettre</button>` : `<button class="btn btn-silver btn-sm" data-act="checkin" data-id="${esc(r.id)}">Réceptionner</button>`}</div></div>`; };
  const content = `
    <div class="kpis">
      <div class="kpi" data-reveal><div class="l">Encaissé ce mois-ci</div><div class="v" data-count="${Math.round(ca)}" data-fmt="eur">${eur(Math.round(ca))}</div><div class="d">${delta == null ? '' : `<span class="${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} %</span>`} par rapport à la même période du mois dernier</div></div>
      <div class="kpi" data-reveal style="--d:.08s"><div class="l">Départs dans les 30 jours</div><div class="v" data-count="${upcoming.length}">${upcoming.length}</div><div class="d">${plural(waiting.length, 'réservation')} en attente de paiement</div></div>
      <div class="kpi" data-reveal style="--d:.16s"><div class="l">Occupation, 30 prochains jours</div><div class="v" data-count="${occ}" data-fmt="pct">${occ} %</div><div class="meter" role="img" aria-label="Taux d’occupation ${occ} %"><i style="width:${occ}%"></i></div></div>
      <div class="kpi" data-reveal style="--d:.24s"><div class="l">Panier moyen, 90 jours</div><div class="v" data-count="${Math.round(avg)}" data-fmt="eur">${eur(Math.round(avg))}</div><div class="d">sur ${plural(recent.length, 'réservation')}</div></div>
    </div>
    <div class="dash-grid">
      <div class="panel"><div class="p-hd"><h2>Aujourd’hui, ${esc(fmtDay(now, true))}</h2><div class="actions"><button class="btn btn-primary btn-sm" data-new>${icon('plus')}Nouvelle réservation</button></div></div><div class="p-bd">
        <div class="block-title" style="margin-top:0">Départs (${deps.length})</div>${deps.length ? deps.map((r) => resRow(r, 'dep')).join('') : '<p class="muted">Aucun départ prévu aujourd’hui.</p>'}
        <div class="block-title">Retours (${rets.length})</div>${rets.length ? rets.map((r) => resRow(r, 'ret')).join('') : '<p class="muted">Aucun retour prévu aujourd’hui.</p>'}
      </div></div>
      <div class="panel"><div class="p-hd"><h2>À traiter</h2></div><div class="p-bd">
        ${msgs.map((m) => `<div class="list-row" data-msg="${esc(m.id)}" style="cursor:pointer"><span class="avatar">${icon('mail').replace('<svg ', '<svg style="width:18px;height:18px" ')}</span><div><div class="t">Message de ${esc(m.firstName)} ${esc(m.lastName)}</div><div class="s">${esc(m.subject)} · ${esc(fmtDT(m.at))}</div></div><div class="r"><button class="btn btn-ghost btn-sm" data-msg-open="${esc(m.id)}">Lire</button></div></div>`).join('')}
        ${waiting.length ? waiting.slice(0, 5).map((r) => { const c = customer(r.customerId); return `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer"><span class="avatar">${esc(initials(custName(c)))}</span><div><div class="t">${esc(custName(c))}</div><div class="s">${esc(r.number)} · départ ${esc(fmtDay(r.from))} · ${eur(balance(r))}</div></div><div class="r"><button class="btn btn-ghost btn-sm" data-act="remind" data-id="${esc(r.id)}">Relancer</button></div></div>`; }).join('') : '<p class="muted">Aucun paiement en attente.</p>'}${waiting.length > 5 ? `<a class="link" href="/gestion/reservations" data-waitall style="display:inline-block;margin:10px 0 6px">Voir les ${waiting.length} paiements en attente</a>` : ''}
        ${service.map((v) => `<div class="list-row">${vehicleThumb(v)}<div><div class="t">${esc(v.name)}</div><div class="s">Entretien ou contrôle prévu le ${esc(fmtD(v.nextService + 'T00:00'))}</div></div><div class="r"><span class="badge b-warn plain">${icon('wrench').replace('<svg ', '<svg style="width:12px;height:12px" ')}Entretien</span></div></div>`).join('')}
      </div></div>
    </div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Chiffre d’affaires encaissé, 6 derniers mois</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-chart-table>${adm.chartTable ? 'Voir le graphique' : 'Voir en tableau'}</button></div></div><div class="p-bd">${revenueChart()}</div></div>`;
  return adminPage('dashboard', 'Tableau de bord', esc(db.settings.brand), `<a class="btn btn-ghost btn-sm" href="/" target="_blank">${icon('ext')}<span>Voir le site</span></a>`, content);
}
function revenueChart() {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const a = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const b = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    months.push({ label: MOIS[a.getMonth()], short: MOIS_C[a.getMonth()], value: revenueBetween(a, b), current: i === 0 });
  }
  if (adm.chartTable) return `<table class="tbl"><thead><tr><th>Mois</th><th class="r">Encaissé</th></tr></thead><tbody>${months.map((m) => `<tr style="cursor:default"><td style="text-transform:capitalize">${esc(m.label)}${m.current ? ' (en cours)' : ''}</td><td class="r num">${eur(m.value)}</td></tr>`).join('')}</tbody></table>`;
  const W = 720, H = 240, padL = 56, padB = 28, padT = 16;
  const max = Math.max(...months.map((m) => m.value), 1);
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const nice = Math.ceil(max / step) * step;
  const ticks = [0, nice / 2, nice];
  const slot = (W - padL) / months.length;
  const bw = Math.min(28, slot * 0.4);
  const y = (v) => padT + (H - padT - padB) * (1 - v / nice);
  let g = '';
  for (const t of ticks) g += `<line x1="${padL}" x2="${W}" y1="${y(t)}" y2="${y(t)}" stroke="rgba(255,255,255,.08)" stroke-width="1"/><text x="${padL - 10}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#8a8f97" class="num">${Math.round(t).toLocaleString('fr-FR')} €</text>`;
  months.forEach((m, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(m.value);
    const h = Math.max(0, H - padB - top);
    const r = Math.min(4, h);
    const x0 = cx - bw / 2;
    const path = h > 0 ? `M${x0} ${H - padB}V${top + r}Q${x0} ${top} ${x0 + r} ${top}H${x0 + bw - r}Q${x0 + bw} ${top} ${x0 + bw} ${top + r}V${H - padB}Z` : '';
    g += `<g class="bar-hit" tabindex="0" data-tip="${esc(m.label)}|${esc(eur(m.value))}" data-x="${cx}" data-y="${top}"><rect x="${cx - slot / 2}" y="${padT}" width="${slot}" height="${H - padT}" fill="transparent"/>${path ? `<path class="m" style="--d:${i * 0.08}s" d="${path}" fill="${m.current ? 'url(#goldBar)' : '#4b5058'}"/>` : ''}</g>`;
    g += `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11.5" fill="#a0a4ab">${esc(m.short)}</text>`;
    if (m.current) g += `<text x="${cx}" y="${top - 8}" text-anchor="middle" font-size="12" font-weight="600" fill="#f3e1b6">${esc(eur(m.value))}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Chiffre d’affaires encaissé par mois"><defs><linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e7c2"/><stop offset="1" stop-color="#c39a61"/></linearGradient></defs>${g}</svg><div class="tip"></div></div>`;
}
function mountDashboard() {
  bindResLinks();
  const wa = $('[data-waitall]'); if (wa) wa.onclick = () => { adm.resFilter = 'attente_paiement'; };
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
  $$('[data-msg]').forEach((r) => (r.onclick = () => openMessage(r.dataset.msg)));
  const t = $('[data-chart-table]'); if (t) t.onclick = () => { adm.chartTable = !adm.chartTable; rerender(); };
  const chart = $('.chart');
  if (chart) {
    const tip = $('.tip', chart);
    const show = (el) => { const [l, v] = el.dataset.tip.split('|'); const svg = $('svg', chart); const k = svg.getBoundingClientRect().width / 720; tip.innerHTML = `<b>${esc(v)}</b><span style="text-transform:capitalize">${esc(l)}</span>`; tip.style.left = Number(el.dataset.x) * k + 'px'; tip.style.top = Number(el.dataset.y) * k + 'px'; tip.style.display = 'block'; };
    $$('.bar-hit', chart).forEach((el) => { el.addEventListener('pointerenter', () => show(el)); el.addEventListener('focus', () => show(el)); el.addEventListener('pointerleave', () => (tip.style.display = 'none')); el.addEventListener('blur', () => (tip.style.display = 'none')); });
  }
}
/** Message reçu par le formulaire de contact du site. */
function openMessage(id) {
  const m = (db.messages || []).find((x) => x.id === id);
  if (!m) return;
  const reply = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`${db.settings.brand} : ${m.subject}`)}`;
  openModal({
    title: `Message de ${m.firstName} ${m.lastName}`,
    body: `<div class="kv"><span>Objet</span><b>${esc(m.subject)}</b></div><div class="kv"><span>Reçu le</span><b>${esc(fmtDT(m.at))}</b></div>${m.email ? `<div class="kv"><span>Email</span><b>${esc(m.email)}</b></div>` : ''}${m.phone ? `<div class="kv"><span>Téléphone</span><b>${esc(m.phone)}</b></div>` : ''}<p style="margin-top:14px;white-space:pre-line;color:var(--text-2)">${esc(m.message)}</p>`,
    foot: `${m.email ? `<a class="btn btn-ghost" href="${reply}">${icon('mail')}Répondre</a>` : ''}${m.phone ? `<a class="btn btn-ghost" href="tel:${esc(m.phone.replace(/\s/g, ''))}">${icon('phone')}Appeler</a>` : ''}<button class="btn btn-primary" data-done>Marquer comme traité</button>`,
    onMount: (el, close) => { $('[data-done]', el).onclick = () => { m.done = true; save(); close(); toast('Message traité.', 'ok'); rerender(true); }; },
  });
}
function bindResLinks() {
  $$('[data-res]').forEach((el) => el.addEventListener('click', (e) => { if (e.target.closest('[data-act]')) return; openResDrawer(el.dataset.res); }));
  $$('[data-act]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); resAction(b.dataset.act, b.dataset.id); }));
}

/* ---------- Réservations ---------- */
function pageReservations() {
  const q = adm.resQuery.toLowerCase();
  let list = db.reservations.slice();
  if (adm.resFilter === 'upcoming') list = list.filter((r) => ['confirmee', 'attente_paiement'].includes(r.status));
  else if (adm.resFilter !== 'all') list = list.filter((r) => r.status === adm.resFilter);
  if (q) list = list.filter((r) => { const c = customer(r.customerId); const v = vehicle(r.vehicleId); return [r.number, custName(c), c?.email, c?.phone, v?.name, v?.plate].join(' ').toLowerCase().includes(q); });
  list.sort((a, b) => (adm.resFilter === 'terminee' || adm.resFilter === 'annulee' ? (a.from < b.from ? 1 : -1) : Math.abs(parse(a.from) - new Date()) - Math.abs(parse(b.from) - new Date())));
  const counts = (s) => db.reservations.filter((r) => r.status === s).length;
  const chip = (k, label, n) => `<button class="chip ${adm.resFilter === k ? 'on' : ''}" data-f="${k}">${label}${n != null ? ` · ${n}` : ''}</button>`;
  const rows = list.slice(0, 150).map((r) => { const c = customer(r.customerId); const v = vehicle(r.vehicleId); return `<tr data-res="${esc(r.id)}"><td><b>${esc(r.number)}</b><br><span class="muted" style="font-size:12.5px">${esc(r.channel || '')}</span></td><td>${esc(custName(c))}<br><span class="muted" style="font-size:12.5px">${esc(c?.phone || '')}</span></td><td><div style="display:flex;gap:10px;align-items:center">${vehicleThumb(v)}<span>${esc(v?.name || '')}<br><span class="plate">${esc(v?.plate || '')}</span></span></div></td><td class="nowrap">${esc(fmtDay(r.from))} ${hm(parse(r.from)).replace(':', 'h')}<br><span class="muted">${esc(fmtDay(r.to))} ${hm(parse(r.to)).replace(':', 'h')}</span></td><td class="r num">${active(r) ? eur(totalDue(r)) : `<s class="muted">${eur(r.quote.total)}</s>${r.cancelFee ? `<br><span style="font-size:12.5px">frais ${eur(r.cancelFee)}</span>` : ''}`}${balance(r) > 0 ? `<br><span style="color:var(--warn);font-size:12.5px">reste ${eur(balance(r))}</span>` : ''}</td><td>${statusBadge(r.status)}</td></tr>`; }).join('');
  const content = `
    <div class="toolbar">
      <input class="input" type="search" placeholder="Rechercher : n°, client, véhicule, plaque" value="${esc(adm.resQuery)}" data-q>
      <div class="chips">${chip('all', 'Toutes')}${chip('upcoming', 'À venir')}${chip('attente_paiement', 'En attente', counts('attente_paiement'))}${chip('en_cours', 'En cours', counts('en_cours'))}${chip('terminee', 'Terminées')}${chip('annulee', 'Annulées')}</div>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>N°</th><th>Client</th><th>Véhicule</th><th>Départ / retour</th><th class="r">Montant</th><th>Statut</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="muted" style="cursor:default">Aucune réservation.</td></tr>'}</tbody></table></div>
    ${list.length > 150 ? `<p class="muted" style="margin-top:10px">150 premières réservations affichées sur ${list.length}. Affinez la recherche.</p>` : ''}`;
  return adminPage('reservations', 'Réservations', plural(list.length, 'réservation'), `<button class="btn btn-primary btn-sm" data-new>${icon('plus')}<span>Nouvelle réservation</span></button>`, content);
}
function mountReservations() {
  bindResLinks();
  $$('[data-f]').forEach((b) => (b.onclick = () => { adm.resFilter = b.dataset.f; rerender(); }));
  const q = $('[data-q]');
  if (q) q.oninput = debounce(() => { adm.resQuery = q.value; rerender(true); }, 250);
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

/* ---------- Fiche réservation (panneau latéral) ---------- */
let closeDrawer = null;
function openResDrawer(id) {
  if (closeDrawer) closeDrawer();
  const r = byId(db.reservations, id);
  if (!r) return;
  const v = vehicle(r.vehicleId);
  const c = customer(r.customerId);
  const steps = [
    ['Réservation créée', r.createdAt, true],
    ['Paiement reçu', r.payments.find((p) => p.amount > 0)?.at, r.payments.some((p) => p.amount > 0)],
    ['Véhicule remis', r.checkout?.at, !!r.checkout],
    ['Véhicule restitué', r.checkin?.at, !!r.checkin],
  ];
  const acts = [];
  if (r.status === 'attente_paiement') acts.push(['pay', 'Encaisser', 'btn-primary'], ['remind', 'Envoyer le lien de paiement', 'btn-ghost']);
  if (r.status === 'confirmee') acts.push(['checkout', 'Remettre le véhicule', 'btn-primary']);
  if (r.status === 'en_cours') acts.push(['checkin', 'Réceptionner le véhicule', 'btn-primary']);
  if (balance(r) > 0 && r.status !== 'attente_paiement') acts.push(['pay', active(r) ? 'Encaisser le solde' : 'Encaisser les frais d’annulation', 'btn-silver']);
  acts.push(['contrat', 'Contrat', 'btn-ghost'], ['facture', 'Facture', 'btn-ghost']);
  if (['attente_paiement', 'confirmee'].includes(r.status)) acts.push(['cancel', 'Annuler', 'btn-danger']);
  const ov = document.createElement('div');
  ov.innerHTML = `<div class="drawer-ov"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Réservation ${esc(r.number)}">
    <div class="d-hd"><div><h3>${esc(r.number)}</h3><div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap">${statusBadge(r.status)}<span class="badge b-grey plain">${esc(r.channel || 'En ligne')}</span>${r.youngDriver ? '<span class="badge b-warn plain">Jeune conducteur</span>' : ''}${c.type === 'professionnel' ? '<span class="badge b-gold plain">Professionnel</span>' : ''}${r.transfer && r.status === 'attente_paiement' ? '<span class="badge b-gold plain">Virement annoncé</span>' : ''}</div></div><button class="icon-btn" data-x style="margin-left:auto" aria-label="Fermer">${icon('x')}</button></div>
    <div class="d-bd">
      <div style="display:flex;gap:14px;align-items:center">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><br><span class="plate">${esc(v.plate)}</span> <span class="muted" style="font-size:13px">${v.odo ? v.odo.toLocaleString('fr-FR') + ' km' : ''}</span></div></div>
      <div class="block-title">Location</div>
      <div class="ico-line">${icon('cal')}<span>${esc(fmtDT(r.from))} · ${esc(agency(r.agencyStart).name)}</span></div>
      <div class="ico-line">${icon('cal')}<span>${esc(fmtDT(r.to))} · ${esc(agency(r.agencyEnd).name)}</span></div>
      ${r.delivery ? `<div class="ico-line">${icon('route')}<span>${esc(r.delivery)}</span></div>` : ''}
      <div class="block-title">Client</div>
      <div class="list-row" style="padding-top:0"><span class="avatar">${esc(initials(custName(c)))}</span><div><div class="t">${esc(custName(c))}</div><div class="s">${esc(c.phone)} · ${esc(c.email)}</div></div><div class="r"><a class="btn btn-ghost btn-sm" href="tel:${esc((c.phone || '').replace(/\s/g, ''))}">${icon('phone')}</a></div></div>
      ${c.type === 'professionnel' ? `<div class="kv"><span>Société</span><b>${esc(c.company || '')}${c.siret ? ` · SIRET ${esc(c.siret)}` : ''}</b></div>${c.vatNum ? `<div class="kv"><span>N° TVA</span><b>${esc(c.vatNum)}</b></div>` : ''}` : ''}
      ${r.transfer && r.status === 'attente_paiement' ? `<div class="kv"><span>Virement annoncé</span><b>${esc(fmtDT(r.transfer.at))} · à rapprocher du relevé</b></div>` : ''}
      <div class="kv"><span>Permis</span><b>${esc(licText(c))}</b></div>
      <div class="block-title">Suivi</div>
      <ul class="timeline">${steps.map(([l, at, done]) => `<li class="${done ? 'done' : ''}"><i></i><span>${l}${done && at ? ` <span class="muted">· ${esc(fmtDT(at))}</span>` : ''}</span></li>`).join('')}</ul>
      ${r.checkout ? `<div class="kv"><span>Départ</span><b>${r.checkout.km.toLocaleString('fr-FR')} km · carburant ${r.checkout.fuel}/8</b></div>` : ''}
      ${r.checkin ? `<div class="kv"><span>Retour</span><b>${r.checkin.km.toLocaleString('fr-FR')} km · carburant ${r.checkin.fuel}/8</b></div>` : ''}
      <div class="block-title">Facturation</div>
      ${billingHTML(r)}
      ${r.payments.length ? `<div class="block-title">Paiements</div>${r.payments.map((p) => `<div class="kv"><span>${esc(fmtD(p.at))} · ${esc(p.method)}</span><b class="num" style="color:${p.amount < 0 ? 'var(--danger)' : 'var(--text)'}">${p.amount < 0 ? '− ' + eur(-p.amount, true) : eur(p.amount, true)}</b></div>`).join('')}` : ''}
      <div class="block-title">Notes internes</div>
      <textarea class="textarea" data-notes placeholder="Visible uniquement dans le logiciel">${esc(r.notes || '')}</textarea>
    </div>
    <div class="d-ft">${acts.map(([k, l, cls]) => `<button class="btn ${cls} btn-sm" data-act="${k}" data-id="${esc(r.id)}">${l}</button>`).join('')}</div>
  </aside>`;
  document.body.appendChild(ov);
  const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); closeDrawer = null; };
  const onKey = (e) => { if (e.key === 'Escape' && !$('.overlay')) close(); };
  document.addEventListener('keydown', onKey);
  $('.drawer-ov', ov).onclick = close;
  $('[data-x]', ov).onclick = close;
  $('[data-notes]', ov).onchange = (e) => { r.notes = e.target.value; save(); toast('Note enregistrée.'); };
  $$('[data-act]', ov).forEach((b) => (b.onclick = () => resAction(b.dataset.act, r.id)));
  closeDrawer = close;
  setTimeout(() => $('[data-x]', ov).focus(), 30);
}
function refreshAfter(id) { rerender(true); if (closeDrawer && id) openResDrawer(id); }
function resAction(act, id) {
  const r = byId(db.reservations, id);
  if (!r) return;
  const v = vehicle(r.vehicleId);
  const s = db.settings;
  if (act === 'remind') { toast(`Démonstration : lien de paiement envoyé par SMS et email à ${custName(customer(r.customerId))}.`, 'ok'); return; }
  if (act === 'contrat' || act === 'facture') { openDocument(r, act); return; }
  if (act === 'pay') {
    openModal({
      title: 'Encaisser un paiement',
      body: `<form data-f style="display:grid;gap:12px"><label class="field"><span class="lbl">Montant</span><input class="input" name="amount" type="number" step="0.01" min="0.01" value="${Math.max(0, balance(r))}"></label><label class="field"><span class="lbl">Moyen de paiement</span><select class="select" name="method"><option>Carte bancaire</option><option>Espèces</option><option ${r.transfer ? 'selected' : ''}>Virement</option><option>Chèque</option><option>Lien de paiement</option></select></label></form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Encaisser</button>',
      onMount: (m, close) => { $('[data-ok]', m).onclick = () => { const f = $('[data-f]', m); const a = round2(f.amount.value); if (!(a > 0)) { toast('Montant invalide.', 'warn'); return; } r.payments.push({ id: uid('p'), amount: a, method: f.method.value, at: toISO(new Date()) }); if (r.status === 'attente_paiement' && balance(r) <= 0) r.status = 'confirmee'; save(); close(); toast(`${eur(a, true)} encaissés.`, 'ok'); refreshAfter(r.id); }; },
    });
    return;
  }
  if (act === 'cancel') {
    const p = paid(r);
    confirmBox('Annuler la réservation', `${esc(r.number)} sera annulée et le véhicule libéré.${p ? ` ${eur(p, true)} ont été réglés : un remboursement sera enregistré.` : ''}`, 'Annuler la réservation', () => {
      r.status = 'annulee';
      r.cancelFee = 0;
      r.cancelledAt = toISO(new Date());
      if (p > 0) r.payments.push({ id: uid('p'), amount: -p, method: 'Remboursement', at: toISO(new Date()) });
      save(); toast('Réservation annulée.', 'ok'); refreshAfter(r.id);
    }, true);
    return;
  }
  if (act === 'checkout') {
    const fuelOpts = (sel) => Array.from({ length: 9 }, (_, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>${i === 8 ? 'Plein (8/8)' : i === 0 ? 'Réserve (0/8)' : i + '/8'}</option>`).join('');
    openModal({
      title: 'Remise du véhicule',
      body: `<form data-f style="display:grid;gap:12px">
        <p class="muted">${esc(v.name)} · <span class="plate">${esc(v.plate)}</span> · ${esc(custName(customer(r.customerId)))}</p>
        ${balance(r) > 0 ? `<div class="alert warn">${icon('alert')}<span>Il reste ${eur(balance(r), true)} à encaisser avant la remise des clés.</span></div>` : ''}
        <div class="grid2"><label class="field"><span class="lbl">Kilométrage au départ</span><input class="input" name="km" type="number" value="${v.odo || 0}"></label><label class="field"><span class="lbl">Carburant ou charge</span><select class="select" name="fuel">${fuelOpts(8)}</select></label></div>
        <label class="field"><span class="lbl">État du véhicule, dommages existants</span><textarea class="textarea" name="notes" placeholder="Rayure pare-choc arrière droit, jante avant gauche frottée…"></textarea></label>
        <label class="check"><input type="checkbox" name="docs"> Permis et pièce d’identité vérifiés</label>
        <label class="check"><input type="checkbox" name="deposit"> Caution de ${eur(r.quote.deposit)} prise par empreinte bancaire</label>
        <button type="button" class="btn btn-ghost btn-sm" style="justify-self:start" data-photo>${icon('camera')}Ajouter des photos de l’état des lieux</button>
      </form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Remettre les clés</button>',
      onMount: (m, close) => {
        $('[data-photo]', m).onclick = () => toast('Démonstration : les photos prises au téléphone seront jointes au contrat.');
        $('[data-ok]', m).onclick = () => {
          const f = $('[data-f]', m);
          if (!f.docs.checked || !f.deposit.checked) { toast('Cochez la vérification des papiers et la caution.', 'warn'); return; }
          r.checkout = { km: Number(f.km.value) || v.odo || 0, fuel: Number(f.fuel.value), notes: f.notes.value.trim(), docs: true, deposit: true, at: toISO(new Date()) };
          r.status = 'en_cours';
          save(); close(); toast('Véhicule remis. Bonne route au client.', 'ok'); refreshAfter(r.id);
        };
      },
    });
    return;
  }
  if (act === 'checkin') {
    const out = r.checkout || { km: v.odo || 0, fuel: 8 };
    const fuelOpts = (sel) => Array.from({ length: 9 }, (_, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>${i === 8 ? 'Plein (8/8)' : i === 0 ? 'Réserve (0/8)' : i + '/8'}</option>`).join('');
    const cleanTaken = !!r.options['o-clean'];
    openModal({
      title: 'Retour du véhicule',
      body: `<form data-f style="display:grid;gap:12px">
        <p class="muted">Départ : ${out.km.toLocaleString('fr-FR')} km, carburant ${out.fuel}/8. ${r.quote.kmIncluded == null ? 'Kilométrage illimité.' : `${r.quote.kmIncluded.toLocaleString('fr-FR')} km inclus, puis ${eur(r.quote.extraKm, true)} par km.`}</p>
        <div class="grid2"><label class="field"><span class="lbl">Kilométrage au retour</span><input class="input" name="km" type="number" value="${out.km + 320}"></label><label class="field"><span class="lbl">Carburant ou charge</span><select class="select" name="fuel">${fuelOpts(out.fuel)}</select></label></div>
        <label class="field"><span class="lbl">Nouveaux dommages : montant retenu sur la caution</span><input class="input" name="damages" type="number" min="0" step="1" value="0"><span class="hint">Plafonné à la franchise, soit ${eur(r.quote.franchise)}.</span></label>
        ${cleanTaken ? '<p class="muted">Option « retour sans lavage » souscrite : pas de frais de nettoyage.</p>' : `<label class="check"><input type="checkbox" name="cleaning"> Nettoyage nécessaire (${eur(s.cleaningFee)})</label>`}
        <label class="field"><span class="lbl">Remarques</span><textarea class="textarea" name="notes"></textarea></label>
        <div class="alert info" data-sum></div>
      </form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Clôturer la location</button>',
      onMount: (m, close) => {
        const f = $('[data-f]', m);
        const compute = () => {
          const km = Number(f.km.value) || out.km;
          const driven = Math.max(0, km - out.km);
          const extras = [];
          if (r.quote.kmIncluded != null && driven > r.quote.kmIncluded) extras.push({ label: `Kilomètres supplémentaires (${driven - r.quote.kmIncluded} km)`, amount: round2((driven - r.quote.kmIncluded) * r.quote.extraKm) });
          const miss = out.fuel - Number(f.fuel.value);
          if (miss > 0) extras.push({ label: `Carburant manquant (${miss}/8)`, amount: round2(miss * s.fuelEighth) });
          const dmg = Math.min(Math.max(0, Number(f.damages.value) || 0), r.quote.franchise);
          if (dmg > 0) extras.push({ label: 'Dommages constatés au retour', amount: dmg });
          if (!cleanTaken && f.cleaning?.checked) extras.push({ label: 'Nettoyage', amount: s.cleaningFee });
          return { km, driven, extras };
        };
        const draw = () => { const x = compute(); const t = round2(sum(x.extras, (e) => e.amount)); $('[data-sum]', m).innerHTML = `${icon('info')}<span>${x.driven.toLocaleString('fr-FR')} km parcourus. ${x.extras.length ? `À facturer : <b style="color:var(--text)">${eur(t, true)}</b> (${x.extras.map((e) => esc(e.label)).join(', ')}), prélevés sur la caution. Libération du reste de la caution.` : 'Rien à facturer : la caution est entièrement libérée.'}</span>`; };
        f.addEventListener('input', draw); f.addEventListener('change', draw); draw();
        $('[data-ok]', m).onclick = () => {
          const x = compute();
          if (x.km < out.km) { toast('Le kilométrage de retour est inférieur au départ.', 'warn'); return; }
          r.checkin = { km: x.km, fuel: Number(f.fuel.value), damages: Number(f.damages.value) || 0, cleaning: !!f.cleaning?.checked, notes: f.notes.value.trim(), extras: x.extras, at: toISO(new Date()) };
          const t = round2(sum(x.extras, (e) => e.amount));
          if (t > 0) r.payments.push({ id: uid('p'), amount: t, method: 'Prélevé sur la caution', at: toISO(new Date()) });
          r.status = 'terminee';
          v.odo = x.km;
          save(); close(); toast('Location clôturée. La facture est prête.', 'ok'); refreshAfter(r.id);
        };
      },
    });
  }
}

/* ---------- Nouvelle réservation (téléphone ou agence) ---------- */
function openQuickBooking({ vehicleId, date }) {
  const start = date ? firstSlot(date) : firstSlot(addDays(new Date(), 1));
  if (!date) start.setHours(10, 0, 0, 0);
  let end = addDays(start, 1);
  if (!openingFor(end)) end = addDays(end, 1);
  const st = { vehicleId: vehicleId || db.vehicles[0].id, from: toISO(start), to: toISO(end), agencyStart: 'yvrac', agencyEnd: 'yvrac', options: {}, customerId: '', paid: true };
  const custOpts = db.customers.slice().sort((a, b) => custName(a).localeCompare(custName(b))).map((c) => `<option value="${esc(c.id)}">${esc(custName(c))}</option>`).join('');
  openModal({
    title: 'Nouvelle réservation',
    wide: true,
    body: `<form data-f style="display:grid;gap:12px">
      <div class="grid2"><label class="field"><span class="lbl">Véhicule</span><select class="select" name="vehicleId">${db.vehicles.filter((v) => v.status === 'actif').map((v) => `<option value="${esc(v.id)}" ${v.id === st.vehicleId ? 'selected' : ''}>${esc(v.name)} · ${esc(v.plate)}</option>`).join('')}</select></label>
      <label class="field"><span class="lbl">Client</span><select class="select" name="customerId"><option value="">Nouveau client…</option>${custOpts}</select></label></div>
      <div class="grid3" data-newc><label class="field"><span class="lbl">Prénom et nom</span><input class="input" name="name" placeholder="Jean Dupont"></label><label class="field"><span class="lbl">Téléphone</span><input class="input" name="phone" type="tel"></label><label class="field"><span class="lbl">Email</span><input class="input" name="email" type="email"></label></div>
      <div class="grid2"><label class="field"><span class="lbl">Départ</span><input class="input" name="from" type="datetime-local" step="1800" value="${st.from}"></label><label class="field"><span class="lbl">Retour</span><input class="input" name="to" type="datetime-local" step="1800" value="${st.to}"></label></div>
      <div class="grid2"><label class="field"><span class="lbl">Lieu de départ</span><select class="select" name="agencyStart">${agencyOptions('yvrac')}</select></label><label class="field"><span class="lbl">Lieu de retour</span><select class="select" name="agencyEnd">${agencyOptions('yvrac')}</select></label></div>
      <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Options</span><div data-opts style="display:flex;flex-wrap:wrap;gap:8px"></div></div>
      <label class="check"><input type="checkbox" name="paid" checked> Paiement reçu (sinon la réservation reste en attente de paiement)</label>
      <div class="alert info" data-sum></div>
    </form>`,
    foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Créer la réservation</button>',
    onMount: (m, close) => {
      const f = $('[data-f]', m);
      const read = () => { st.vehicleId = f.vehicleId.value; st.from = f.from.value; st.to = f.to.value; st.agencyStart = f.agencyStart.value; st.agencyEnd = f.agencyEnd.value; st.customerId = f.customerId.value; st.paid = f.paid.checked; };
      const drawOpts = () => { const v = vehicle(st.vehicleId); $('[data-opts]', m).innerHTML = db.options.filter((o) => o.active && o.cats.includes(v.category) && !(o.unlimited && v.kmDay === 0)).map((o) => `<button type="button" class="chip ${st.options[o.id] ? 'on' : ''}" data-o="${esc(o.id)}">${esc(o.name)}</button>`).join(''); $$('[data-o]', m).forEach((b) => (b.onclick = () => { const o = option(b.dataset.o); if (st.options[o.id]) delete st.options[o.id]; else { st.options[o.id] = 1; if (o.excl) delete st.options[o.excl]; } drawOpts(); draw(); })); };
      const draw = () => {
        read();
        $('[data-newc]', m).hidden = !!st.customerId;
        const box = $('[data-sum]', m);
        if (!st.from || !st.to || parse(st.to) <= parse(st.from)) { box.innerHTML = `${icon('alert')}<span>Vérifiez les dates : le retour doit suivre le départ.</span>`; return; }
        const ok = isAvailable(st.vehicleId, st.from, st.to);
        const q = quote({ ...st, options: st.options });
        box.innerHTML = `${icon(ok ? 'info' : 'alert')}<span>${ok ? `${plural(q.days, 'jour')} · <b style="color:var(--text)">${eur(q.total, true)}</b> TTC · caution ${eur(q.deposit)}` : 'Ce véhicule n’est pas libre sur ces dates : il est déjà réservé ou en entretien.'}</span>`;
      };
      f.addEventListener('change', (e) => { if (e.target.name === 'vehicleId') { st.options = {}; read(); drawOpts(); } draw(); });
      f.addEventListener('input', draw);
      drawOpts(); draw();
      $('[data-ok]', m).onclick = () => {
        read();
        if (!st.from || !st.to || parse(st.to) <= parse(st.from)) { toast('Dates invalides.', 'warn'); return; }
        if (!isAvailable(st.vehicleId, st.from, st.to)) { toast('Véhicule indisponible sur ces dates.', 'warn'); return; }
        let cid = st.customerId;
        if (!cid) {
          const name = f.name.value.trim();
          if (!name || !f.phone.value.trim()) { toast('Indiquez au moins le nom et le téléphone du client.', 'warn'); return; }
          const [first, ...rest] = name.split(/\s+/);
          const c = { id: uid('c'), type: 'particulier', firstName: first, lastName: rest.join(' ') || '', email: f.email.value.trim().toLowerCase(), phone: f.phone.value.trim(), address: '', zip: '', city: '', birth: '', license: { number: '', date: '', country: 'France' }, createdAt: toISO(new Date()), account: false, blacklist: false, notes: 'Créé depuis le logiciel.' };
          db.customers.push(c); cid = c.id;
        }
        const res = { id: uid('r'), number: '', createdAt: toISO(new Date()), status: st.paid ? 'confirmee' : 'attente_paiement', vehicleId: st.vehicleId, customerId: cid, from: st.from, to: st.to, agencyStart: st.agencyStart, agencyEnd: st.agencyEnd, options: { ...st.options }, promo: null, youngDriver: false, channel: 'Téléphone', payments: [], checkout: null, checkin: null, notes: '' };
        res.quote = quoteFor(res);
        if (st.paid) res.payments.push({ id: uid('p'), amount: res.quote.total, method: 'Carte bancaire', at: toISO(new Date()) });
        db.seq++; res.number = resNumber(new Date(), db.seq);
        db.reservations.push(res);
        save(); close(); toast(`Réservation ${res.number} créée.`, 'ok'); rerender(true);
      };
    },
  });
}

/* ---------- Planning de la flotte ---------- */
function pagePlanning() {
  const days = window.innerWidth < 700 ? 14 : 21;
  if (!adm.planStart) adm.planStart = addDays(dayStart(new Date()), -1);
  const start = adm.planStart;
  const end = addDays(start, days);
  const col = window.innerWidth < 600 ? 40 : 48;
  const today = dayStart(new Date());
  let head = `<div class="plan-h"><div class="corner">Véhicule</div>`;
  for (let i = 0; i < days; i++) { const d = addDays(start, i); head += `<div class="d ${d.getDay() === 0 || d.getDay() === 6 ? 'we' : ''} ${sameDay(d, today) ? 'td' : ''}">${JOURS_C[d.getDay()].replace('.', '')}<b>${d.getDate()}</b></div>`; }
  head += '</div>';
  const groups = [['voiture', 'Voitures'], ['utilitaire', 'Utilitaires']];
  let body = '';
  const nowX = ((Date.now() - start.getTime()) / DAY) * col;
  for (const [cat, label] of groups) {
    const vs = db.vehicles.filter((v) => v.category === cat && v.status === 'actif');
    if (!vs.length) continue;
    body += `<div class="plan-group">${label}</div>`;
    for (const v of vs) {
      let cells = '';
      for (let i = 0; i < days; i++) { const d = addDays(start, i); cells += `<div class="cell ${d.getDay() === 0 || d.getDay() === 6 ? 'we' : ''}" data-cell="${esc(v.id)}|${dateKey(d)}"></div>`; }
      let bars = '';
      for (const r of db.reservations) {
        if (r.vehicleId !== v.id || !active(r)) continue;
        const a = parse(r.from), b = parse(r.to);
        if (b <= start || a >= end) continue;
        const x = ((Math.max(a, start) - start) / DAY) * col;
        const w = Math.max(20, ((Math.min(b, end) - Math.max(a, start)) / DAY) * col - 2);
        const c = customer(r.customerId);
        bars += `<div class="bar s-${r.status}" style="left:${x + 1}px;width:${w}px;--d:${Math.min(0.9, x / 900).toFixed(2)}s" data-res="${esc(r.id)}" title="${esc(r.number)} · ${esc(custName(c))} · ${esc(fmtDT(r.from))} au ${esc(fmtDT(r.to))}">${esc(c?.lastName || c?.company || '')}<small>${hm(a).replace(':', 'h')} → ${esc(fmtDay(r.to))}</small></div>`;
      }
      for (const bl of db.blocks) {
        if (bl.vehicleId !== v.id) continue;
        const a = parse(bl.from), b = parse(bl.to);
        if (b <= start || a >= end) continue;
        const x = ((Math.max(a, start) - start) / DAY) * col;
        const w = Math.max(20, ((Math.min(b, end) - Math.max(a, start)) / DAY) * col - 2);
        bars += `<div class="bar blk" style="left:${x + 1}px;width:${w}px" title="${esc(bl.reason)}">${icon('wrench').replace('<svg ', '<svg style="width:12px;height:12px;display:inline;vertical-align:-2px" ')} ${esc(bl.reason)}</div>`;
      }
      body += `<div class="plan-r"><div class="lab" data-veh="${esc(v.id)}" title="${esc(v.name)} · ${esc(v.plate)}">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><span>${esc(v.plate)}</span></div></div><div class="cells">${cells}${bars}${nowX > 0 && nowX < days * col ? `<div class="now-line" style="left:${nowX}px"></div>` : ''}</div></div>`;
    }
  }
  const content = `
    <div class="toolbar" style="justify-content:space-between">
      <div style="display:flex;gap:8px;align-items:center"><button class="btn btn-ghost btn-sm" data-shift="-7" aria-label="Semaine précédente">${icon('chevL')}</button><button class="btn btn-ghost btn-sm" data-today>Aujourd’hui</button><button class="btn btn-ghost btn-sm" data-shift="7" aria-label="Semaine suivante">${icon('chevR')}</button><b style="margin-left:6px">${esc(fmtDay(start))} au ${esc(fmtDay(addDays(end, -1)))}</b></div>
      <div class="legend"><span><i style="background:#f0b54e"></i>En attente de paiement</span><span><i style="background:#86a8ff"></i>Confirmée</span><span><i style="background:linear-gradient(135deg,#f6e7c2,#d9b878)"></i>En cours</span><span><i style="background:#4d5259"></i>Terminée</span><span><i style="background:repeating-linear-gradient(135deg,#1f2126 0 3px,#2a2d33 3px 6px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)"></i>Entretien</span></div>
    </div>
    <div class="plan" style="--col:${col}px"><div class="plan-grid">${head}${body}</div></div>
    <p class="muted" style="margin-top:10px;font-size:13px">Touchez une case vide pour créer une réservation, une barre pour ouvrir la fiche.</p>`;
  return adminPage('planning', 'Planning de la flotte', `${db.vehicles.filter((v) => v.status === 'actif').length} véhicules`, `<button class="btn btn-primary btn-sm" data-new>${icon('plus')}<span>Nouvelle réservation</span></button>`, content);
}
function mountPlanning() {
  bindResLinks();
  $$('[data-shift]').forEach((b) => (b.onclick = () => { adm.planStart = addDays(adm.planStart, Number(b.dataset.shift)); rerender(true); }));
  const t = $('[data-today]'); if (t) t.onclick = () => { adm.planStart = null; rerender(true); };
  $$('[data-cell]').forEach((c) => (c.onclick = () => { const [vid, d] = c.dataset.cell.split('|'); openQuickBooking({ vehicleId: vid, date: parse(d + 'T00:00') }); }));
  $$('[data-veh]').forEach((l) => (l.onclick = () => openVehicleEditor(l.dataset.veh)));
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
  const plan = $('.plan');
  if (plan && !adm.planScrolled) { plan.scrollLeft = 0; }
}

/* ---------- Véhicules ---------- */
function pageFleet() {
  const cards = db.vehicles.filter((v) => !v.deleted).map((v) => { const st = vehicleState(v); return `<button class="fcard" data-veh="${esc(v.id)}">${vehicleVisual(v)}<div class="b"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><h3>${esc(v.name)}</h3><span class="badge ${st.cls}">${st.label}</span></div><div class="meta"><span class="plate">${esc(v.plate)}</span><span>${(v.odo || 0).toLocaleString('fr-FR')} km</span></div><div class="meta"><span>${esc(v.segment)}</span><b style="color:var(--text)">${eur(v.price)} / jour</b></div></div></button>`; }).join('');
  return adminPage('flotte', 'Véhicules', plural(db.vehicles.filter((v) => !v.deleted).length, 'véhicule'), `<button class="btn btn-primary btn-sm" data-add>${icon('plus')}<span>Ajouter un véhicule</span></button>`, `<div class="fleet">${cards}</div>`);
}
function mountFleet() {
  $$('[data-veh]').forEach((b) => (b.onclick = () => openVehicleEditor(b.dataset.veh)));
  const a = $('[data-add]'); if (a) a.onclick = () => openVehicleEditor(null);
}
function openVehicleEditor(id) {
  const isNew = !id;
  const v = isNew ? { id: uid('v'), name: '', category: 'voiture', segment: '', shape: 'citadine', color: '#8d949c', plate: '', seats: 5, doors: 5, gearbox: 'Manuelle', fuel: 'Essence', price: 50, kmDay: 250, extraKm: 0.3, deposit: 1000, franchise: 1200, odo: 0, status: 'actif', similar: true, ac: true, minAge: 21, minYears: 2, description: '', equipment: [], photo: null, photoUrl: null } : { ...vehicle(id) };
  const sel = (name, opts, cur) => `<select class="select" name="${name}">${opts.map(([k, l]) => `<option value="${esc(k)}" ${String(k) === String(cur) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  const inp = (name, label, val, attrs = '') => `<label class="field"><span class="lbl">${label}</span><input class="input" name="${name}" value="${esc(val ?? '')}" ${attrs}></label>`;
  const blocks = db.blocks.filter((b) => b.vehicleId === v.id);
  openModal({
    title: isNew ? 'Ajouter un véhicule' : v.name,
    wide: true,
    body: `<form data-f style="display:grid;gap:14px">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px" class="veh-edit">
        <div><div data-visual>${vehicleVisual(v)}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><label class="btn btn-silver btn-sm" style="cursor:pointer">${icon('upload')}Changer la photo<input type="file" accept="image/*" data-file hidden></label>${v.photo ? '<button type="button" class="btn btn-ghost btn-sm" data-unphoto>Photo d’origine</button>' : ''}</div>
          <p class="muted" style="font-size:12.5px;margin-top:8px">Prenez la photo au téléphone, de trois quarts avant, sur fond dégagé. Elle est réduite automatiquement.</p>
        </div>
        <div style="display:grid;gap:12px">
          ${inp('name', 'Modèle', v.name, 'placeholder="Renault Clio V"')}
          <div class="grid2">${inp('plate', 'Immatriculation', v.plate, 'placeholder="AB-123-CD"')}${inp('segment', 'Catégorie affichée', v.segment, 'placeholder="Citadine"')}</div>
          <div class="grid2"><label class="field"><span class="lbl">Type</span>${sel('category', [['voiture', 'Voiture'], ['utilitaire', 'Utilitaire']], v.category)}</label><label class="field"><span class="lbl">État</span>${sel('status', [['actif', 'En service'], ['inactif', 'Hors service']], v.status)}</label></div>
        </div>
      </div>
      <div class="grid3">${inp('seats', 'Places', v.seats, 'type="number" min="1"')}${inp('doors', 'Portes', v.doors, 'type="number" min="2"')}<label class="field"><span class="lbl">Boîte</span>${sel('gearbox', [['Manuelle', 'Manuelle'], ['Automatique', 'Automatique']], v.gearbox)}</label></div>
      <div class="grid3"><label class="field"><span class="lbl">Énergie</span>${sel('fuel', [['Essence', 'Essence'], ['Diesel', 'Diesel'], ['Hybride', 'Hybride'], ['Électrique', 'Électrique']], v.fuel)}</label>${inp('volume', 'Volume utile (m³)', v.volume || '', 'type="number" step="0.1"')}${inp('payload', 'Charge utile (kg)', v.payload || '', 'type="number"')}</div>
      <div class="block-title" style="margin:6px 0 0">Tarif et conditions</div>
      <div class="grid3">${inp('price', 'Prix par jour (€ TTC)', v.price, 'type="number" min="1"')}${inp('kmDay', 'Km inclus par jour (0 = illimité)', v.kmDay, 'type="number" min="0"')}${inp('extraKm', 'Km supplémentaire (€)', v.extraKm, 'type="number" step="0.01" min="0"')}</div>
      <div class="grid3">${inp('deposit', 'Caution (€)', v.deposit, 'type="number" min="0"')}${inp('franchise', 'Franchise (€)', v.franchise, 'type="number" min="0"')}${inp('odo', 'Kilométrage actuel', v.odo, 'type="number" min="0"')}</div>
      <div class="grid3">${inp('minAge', 'Âge minimum', v.minAge, 'type="number" min="18"')}${inp('minYears', 'Années de permis minimum', v.minYears, 'type="number" min="0"')}${inp('nextService', 'Prochain entretien ou contrôle', v.nextService || '', 'type="date"')}</div>
      <label class="field"><span class="lbl">Description</span><textarea class="textarea" name="description">${esc(v.description)}</textarea></label>
      <label class="field"><span class="lbl">Équipements (un par ligne)</span><textarea class="textarea" name="equipment">${esc((v.equipment || []).join('\n'))}</textarea></label>
      ${isNew ? '' : `<div class="block-title" style="margin:6px 0 0">Indisponibilités (entretien, réparation)</div>
        <div data-blocks>${blocks.length ? blocks.map((b) => `<div class="list-row"><div><div class="t">${esc(b.reason)}</div><div class="s">${esc(fmtDT(b.from))} au ${esc(fmtDT(b.to))}</div></div><div class="r"><button type="button" class="btn btn-danger btn-sm" data-delblock="${esc(b.id)}">Supprimer</button></div></div>`).join('') : '<p class="muted">Aucune.</p>'}</div>
        <div class="grid3" style="align-items:end">${inp('bFrom', 'Du', '', 'type="datetime-local" step="1800"')}${inp('bTo', 'Au', '', 'type="datetime-local" step="1800"')}<button type="button" class="btn btn-ghost" data-addblock>${icon('wrench')}Bloquer</button></div>
        ${inp('bReason', 'Motif', 'Entretien')}`}
    </form>`,
    foot: `${isNew ? '' : '<button class="btn btn-danger" data-del style="margin-right:auto">Supprimer</button>'}<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Enregistrer</button>`,
    onMount: (m, close) => {
      if (window.innerWidth < 700) $('.veh-edit', m).style.gridTemplateColumns = '1fr';
      const f = $('[data-f]', m);
      $('[data-file]', m).onchange = async (e) => {
        try { v.photo = await readImage(e.target.files[0], 1100); $('[data-visual]', m).innerHTML = vehicleVisual(v); toast('Photo prête : pensez à enregistrer.'); } catch (err) { toast(err.message, 'warn'); }
      };
      const up = $('[data-unphoto]', m); if (up) up.onclick = () => { v.photo = null; $('[data-visual]', m).innerHTML = vehicleVisual(v); };
      const ab = $('[data-addblock]', m);
      if (ab) ab.onclick = () => {
        if (!f.bFrom.value || !f.bTo.value || parse(f.bTo.value) <= parse(f.bFrom.value)) { toast('Indiquez les deux dates de l’indisponibilité.', 'warn'); return; }
        const clash = db.reservations.find((r) => r.vehicleId === v.id && ['confirmee', 'attente_paiement', 'en_cours'].includes(r.status) && overlap(parse(f.bFrom.value), parse(f.bTo.value), parse(r.from), parse(r.to)));
        if (clash) { toast(`Conflit avec la réservation ${clash.number} : déplacez-la d’abord.`, 'warn'); return; }
        db.blocks.push({ id: uid('b'), vehicleId: v.id, from: f.bFrom.value, to: f.bTo.value, reason: f.bReason.value.trim() || 'Indisponible' });
        save(); close(); toast('Indisponibilité enregistrée.', 'ok'); rerender(true); openVehicleEditor(v.id);
      };
      $$('[data-delblock]', m).forEach((b) => (b.onclick = () => { db.blocks = db.blocks.filter((x) => x.id !== b.dataset.delblock); save(); close(); rerender(true); openVehicleEditor(v.id); }));
      const del = $('[data-del]', m);
      if (del) del.onclick = () => {
        const fut = db.reservations.filter((r) => r.vehicleId === v.id && ['confirmee', 'attente_paiement', 'en_cours'].includes(r.status));
        if (fut.length) { toast(`Impossible : ${plural(fut.length, 'réservation')} en cours ou à venir. Passez plutôt le véhicule hors service.`, 'warn'); return; }
        confirmBox('Supprimer le véhicule', `${esc(v.name)} (${esc(v.plate)}) sera retiré de la flotte. L’historique est conservé.`, 'Supprimer', () => { const orig = vehicle(v.id); orig.status = 'inactif'; orig.deleted = true; db.vehicles = db.vehicles.filter((x) => x.id !== v.id || db.reservations.some((r) => r.vehicleId === v.id)); save(); close(); toast('Véhicule retiré.', 'ok'); rerender(true); }, true);
      };
      $('[data-ok]', m).onclick = () => {
        const num = (n) => (f[n].value === '' ? null : Number(f[n].value));
        const upd = {
          name: f.name.value.trim(), plate: f.plate.value.trim().toUpperCase(), segment: f.segment.value.trim(), category: f.category.value, status: f.status.value,
          seats: num('seats') || 1, doors: num('doors') || 2, gearbox: f.gearbox.value, fuel: f.fuel.value, volume: num('volume'), payload: num('payload'),
          price: num('price') || 1, kmDay: num('kmDay') || 0, extraKm: num('extraKm') || 0, deposit: num('deposit') || 0, franchise: num('franchise') || 0, odo: num('odo') || 0,
          minAge: num('minAge') || 18, minYears: num('minYears') || 0, nextService: f.nextService.value || null,
          description: f.description.value.trim(), equipment: f.equipment.value.split('\n').map((x) => x.trim()).filter(Boolean), photo: v.photo || null,
        };
        if (!upd.name || !upd.plate) { toast('Le modèle et l’immatriculation sont obligatoires.', 'warn'); return; }
        if (isNew) {
          upd.shape = upd.category === 'utilitaire' ? 'fourgon' : 'citadine';
          db.vehicles.push({ ...v, ...upd });
        } else Object.assign(vehicle(v.id), upd);
        save(); close(); toast('Véhicule enregistré.', 'ok'); rerender(true);
      };
    },
  });
}

/* ---------- Ventes : véhicules à vendre (stock et dépôt-vente) ---------- */
const SALE_FILTERS = [['all', 'Toutes'], ['disponible', 'Disponibles'], ['reserve', 'Réservées'], ['vendu', 'Vendues'], ['depot', 'Dépôt-vente']];
const saleLeads = (id) => (db.messages || []).filter((m) => m.saleId === id);
function pageVentes() {
  const all = liveSales();
  const f = adm.saleFilter;
  const list = all.filter((s) => f === 'all' || (f === 'depot' ? s.mode === 'depot' : s.status === f))
    .sort((a, b) => ((a.status === 'vendu') - (b.status === 'vendu')) || (a.listedAt < b.listedAt ? 1 : -1));
  const stock = all.filter((s) => s.status !== 'vendu');
  const open = (db.messages || []).filter((m) => m.saleId && !m.done).length;
  const month = monthKey(new Date());
  const soldMonth = all.filter((s) => s.status === 'vendu' && s.soldAt && monthKey(parse(s.soldAt)) === month).length;
  const card = (s) => {
    const [label, cls] = SALE_STATUS[s.status] || SALE_STATUS.disponible;
    const n = saleLeads(s.id).length;
    return `<button class="fcard sale-fc ${s.status}" data-sale="${esc(s.id)}"><div class="fc-shot">${saleShot(s)}</div><div class="b">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><h3>${esc(saleName(s))}</h3><span class="badge ${cls}">${label}</span></div>
      <div class="meta"><span>${esc(s.ref)} · ${esc(String(s.year))} · ${esc(kmFmt(s.km))}</span><b style="color:var(--text)">${eur(s.price)}</b></div>
      <div class="meta"><span>${s.mode === 'depot' ? 'Dépôt-vente' : 'Stock de l’agence'} · en ligne depuis ${plural(daysOnline(s), 'jour')}</span><span>${n ? `${icon('mail').replace('<svg ', '<svg style="width:14px;height:14px;vertical-align:-2px" ')} ${plural(n, 'demande')}` : ''}</span></div>
    </div></button>`;
  };
  const content = `
    <div class="kpis">
      <div class="kpi"><div class="l">En vente</div><div class="v">${all.filter((s) => s.status === 'disponible').length}</div><div class="d">${plural(all.filter((s) => s.status === 'reserve').length, 'véhicule')} réservé${all.filter((s) => s.status === 'reserve').length > 1 ? 's' : ''}</div></div>
      <div class="kpi"><div class="l">Valeur des annonces</div><div class="v">${eur(sum(stock, (s) => s.price))}</div><div class="d">prix affichés, hors véhicules vendus</div></div>
      <div class="kpi"><div class="l">Dépôt-vente</div><div class="v">${stock.filter((s) => s.mode === 'depot').length}</div><div class="d">véhicules confiés par leur propriétaire</div></div>
      <div class="kpi"><div class="l">Demandes à traiter</div><div class="v">${open}</div><div class="d">${plural(soldMonth, 'vente')} ce mois-ci</div></div>
    </div>
    <div class="chips sale-chips" style="margin:18px 0 14px">${SALE_FILTERS.map(([k, l]) => `<button type="button" class="chip ${f === k ? 'on' : ''}" data-sfilter="${k}">${l}</button>`).join('')}</div>
    ${list.length ? `<div class="fleet">${list.map(card).join('')}</div>` : `<div class="empty">${icon('search')}Aucune annonce dans cette catégorie.</div>`}`;
  return adminPage('ventes', 'Véhicules à vendre', `${plural(stock.length, 'annonce')} en ligne`, `<a class="btn btn-ghost btn-sm" href="${SALE_LIST}" target="_blank">${icon('ext')}<span>Voir la vitrine</span></a><button class="btn btn-primary btn-sm" data-addsale>${icon('plus')}<span>Ajouter une annonce</span></button>`, content);
}
function mountVentes() {
  $$('[data-sfilter]').forEach((b) => (b.onclick = () => { adm.saleFilter = b.dataset.sfilter; rerender(true); }));
  $$('[data-sale]').forEach((b) => (b.onclick = () => openSaleEditor(b.dataset.sale)));
  const a = $('[data-addsale]'); if (a) a.onclick = () => openSaleEditor(null);
}
function openSaleEditor(id) {
  const isNew = !id;
  const orig = id && sale(id);
  const s = orig ? { ...orig } : { id: uid('vo'), brand: '', model: '', version: '', category: 'citadine', shape: 'citadine', color: '#8a929c', colorName: '', year: new Date().getFullYear() - 3, firstReg: '', km: '', price: '', energy: 'Essence', gearbox: 'Manuelle', power: '', doors: 5, seats: 5, owners: 1, mode: 'stock', status: 'disponible', equipment: [], description: '', photo: null, deleted: false };
  const sel = (name, opts, cur) => `<select class="select" name="${name}">${opts.map(([k, l]) => `<option value="${esc(k)}" ${String(k) === String(cur) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  const inp = (name, label, val, attrs = '') => `<label class="field"><span class="lbl">${label}</span><input class="input" name="${name}" value="${esc(val ?? '')}" ${attrs}></label>`;
  const leads = orig ? saleLeads(s.id) : [];
  openModal({
    title: isNew ? 'Ajouter une annonce' : `${saleName(s)} · ${s.ref}`,
    wide: true,
    body: `<form data-sf style="display:grid;gap:14px">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px" class="veh-edit">
        <div><div class="fc-shot" data-svisual>${saleShot(s)}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><label class="btn btn-silver btn-sm" style="cursor:pointer">${icon('upload')}${s.photo ? 'Changer la photo' : 'Ajouter une photo'}<input type="file" accept="image/*" data-sfile hidden></label>${s.photo ? '<button type="button" class="btn btn-ghost btn-sm" data-sunphoto>Retirer la photo</button>' : ''}</div>
          <p class="muted" style="font-size:12.5px;margin-top:8px">Photo de trois quarts avant, sur fond dégagé, plaque masquée. Elle est réduite automatiquement.</p>
        </div>
        <div style="display:grid;gap:12px">
          <div class="grid2">${inp('brand', 'Marque', s.brand, 'placeholder="Peugeot"')}${inp('model', 'Modèle', s.model, 'placeholder="3008"')}</div>
          ${inp('version', 'Version', s.version, 'placeholder="1.5 BlueHDi 130 EAT8 Allure"')}
          <div class="grid2"><label class="field"><span class="lbl">Catégorie</span>${sel('category', SALE_CATS.filter(([k]) => k !== 'all').map(([k, l]) => [k, l.replace(/s$/, '')]), s.category)}</label><label class="field"><span class="lbl">Statut</span>${sel('status', [['disponible', 'Disponible'], ['reserve', 'Réservé'], ['vendu', 'Vendu']], s.status)}</label></div>
          <div class="grid2"><label class="field"><span class="lbl">Vente</span>${sel('mode', [['stock', 'Stock de l’agence'], ['depot', 'Dépôt-vente']], s.mode)}</label>${inp('price', 'Prix (€)', s.price, 'type="number" min="0" step="10"')}</div>
        </div>
      </div>
      <div class="grid3">${inp('year', 'Année', s.year, 'type="number" min="1990" max="2100"')}${inp('firstReg', 'Mise en circulation', s.firstReg, 'type="month"')}${inp('km', 'Kilométrage', s.km, 'type="number" min="0" step="100"')}</div>
      <div class="grid3"><label class="field"><span class="lbl">Énergie</span>${sel('energy', SALE_ENERGIES.map((e) => [e, e]), s.energy)}</label><label class="field"><span class="lbl">Boîte</span>${sel('gearbox', [['Manuelle', 'Manuelle'], ['Automatique', 'Automatique']], s.gearbox)}</label>${inp('power', 'Puissance (ch)', s.power ?? '', 'type="number" min="0"')}</div>
      <div class="grid3">${inp('doors', 'Portes', s.doors, 'type="number" min="2" max="6"')}${inp('seats', 'Places', s.seats, 'type="number" min="1" max="9"')}${inp('owners', 'Propriétaires', s.owners, 'type="number" min="1"')}</div>
      <div class="grid2">${inp('colorName', 'Couleur', s.colorName, 'placeholder="Gris Platinium"')}<label class="field"><span class="lbl">Teinte de la silhouette (sans photo)</span><input class="input" name="color" type="color" value="${esc(s.color || '#8a929c')}" style="padding:4px;height:46px"></label></div>
      <label class="field"><span class="lbl">Description</span><textarea class="textarea" name="description" placeholder="État, entretien, points forts…">${esc(s.description || '')}</textarea></label>
      <label class="field"><span class="lbl">Équipements (un par ligne)</span><textarea class="textarea" name="equipment">${esc((s.equipment || []).join('\n'))}</textarea></label>
      ${orig ? `<div class="block-title" style="margin:6px 0 0">Demandes reçues pour cette annonce (${leads.length})</div>
        ${leads.length ? leads.map((m) => `<div class="list-row" data-slead="${esc(m.id)}" style="cursor:pointer"><span class="avatar">${esc(initials(`${m.firstName} ${m.lastName}`))}</span><div><div class="t">${esc(m.firstName)} ${esc(m.lastName)}${m.done ? ' · traitée' : ''}</div><div class="s">${esc((m.message || '').split('\n')[0])} · ${esc(fmtDT(m.at))}</div></div><div class="r">${m.phone ? `<a class="btn btn-ghost btn-sm" href="tel:${esc(m.phone.replace(/\s/g, ''))}">${icon('phone')}Appeler</a>` : ''}</div></div>`).join('') : '<p class="muted">Aucune demande pour le moment.</p>'}` : ''}
    </form>`,
    foot: `${orig ? `<button class="btn btn-danger" data-sdel style="margin-right:auto">Supprimer</button><a class="btn btn-ghost" href="${saleHref(orig)}" target="_blank">${icon('ext')}Voir l’annonce</a>` : ''}<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-sok>Enregistrer</button>`,
    onMount: (m, close) => {
      if (window.innerWidth < 700) $('.veh-edit', m).style.gridTemplateColumns = '1fr';
      const f = $('[data-sf]', m);
      $('[data-sfile]', m).onchange = async (e) => {
        try { s.photo = await readImage(e.target.files[0], 1100); $('[data-svisual]', m).innerHTML = saleShot(s); toast('Photo prête : pensez à enregistrer.'); } catch (err) { toast(err.message, 'warn'); }
      };
      const up = $('[data-sunphoto]', m); if (up) up.onclick = () => { s.photo = null; $('[data-svisual]', m).innerHTML = saleShot(s); };
      $$('[data-slead]', m).forEach((r) => (r.onclick = (e) => { if (e.target.closest('a')) return; close(); openMessage(r.dataset.slead); }));
      const del = $('[data-sdel]', m);
      if (del) del.onclick = () => confirmBox('Supprimer l’annonce', `${esc(saleFull(orig))} (${esc(orig.ref)}) sera retirée du site.`, 'Supprimer', () => { orig.deleted = true; save(); close(); toast('Annonce supprimée.', 'ok'); rerender(true); }, true);
      $('[data-sok]', m).onclick = () => {
        const num = (n) => (f[n].value === '' ? null : Number(f[n].value));
        const cat = f.category.value;
        const upd = {
          brand: f.brand.value.trim(), model: f.model.value.trim(), version: f.version.value.trim(), category: cat,
          shape: { citadine: 'citadine', compacte: 'berline', berline: 'berline', suv: 'suv', utilitaire: 'fourgonnette' }[cat] || 'citadine',
          status: f.status.value, mode: f.mode.value, price: num('price'), year: num('year'), firstReg: f.firstReg.value || '', km: num('km'),
          energy: f.energy.value, gearbox: f.gearbox.value, power: num('power'), doors: num('doors') || 5, seats: num('seats') || 5, owners: num('owners') || 1,
          colorName: f.colorName.value.trim(), color: f.color.value, description: f.description.value.trim(),
          equipment: f.equipment.value.split('\n').map((x) => x.trim()).filter(Boolean), photo: s.photo || null,
        };
        if (!upd.brand || !upd.model || !upd.price || !upd.year || upd.km == null) { toast('Marque, modèle, prix, année et kilométrage sont obligatoires.', 'warn'); return; }
        if (upd.status === 'vendu' && (!orig || orig.status !== 'vendu')) upd.soldAt = toISO(new Date());
        if (orig) Object.assign(orig, upd);
        else {
          const nums = liveSales().concat(db.sales.filter((x) => x.deleted)).map((x) => Number(String(x.ref || '').replace(/\D/g, '')) || 0);
          let slug = saleSlug(upd);
          while (db.sales.some((x) => x.slug === slug)) slug += '-' + Math.random().toString(36).slice(2, 5);
          db.sales.push({ ...s, ...upd, ref: `VO-${Math.max(2600, ...nums) + 1}`, slug, listedAt: toISO(new Date()), deleted: false });
        }
        save(); close(); toast('Annonce enregistrée.', 'ok'); rerender(true);
      };
    },
  });
}

/* ---------- Clients ---------- */
function pageClients() {
  const q = adm.clientQuery.toLowerCase();
  const rows = db.customers.filter((c) => !q || [custName(c), c.email, c.phone, c.city].join(' ').toLowerCase().includes(q)).map((c) => {
    const rs = db.reservations.filter((r) => r.customerId === c.id && active(r));
    const tot = round2(sum(rs, (r) => paid(r)));
    return { c, n: rs.length, tot };
  }).sort((a, b) => b.tot - a.tot);
  const html = `<div class="toolbar"><input class="input" type="search" placeholder="Rechercher un client" value="${esc(adm.clientQuery)}" data-q></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Contact</th><th>Permis</th><th class="r">Locations</th><th class="r">Total réglé</th><th></th></tr></thead><tbody>
    ${rows.map(({ c, n, tot }) => `<tr data-client="${esc(c.id)}"><td><div style="display:flex;gap:10px;align-items:center"><span class="avatar">${esc(initials(custName(c)))}</span><div><b>${esc(custName(c))}</b><br><span class="muted" style="font-size:12.5px">${esc(c.type === 'professionnel' ? 'Professionnel' : 'Particulier')}${c.city ? ' · ' + esc(c.city) : ''}</span></div></div></td><td>${esc(c.phone)}<br><span class="muted" style="font-size:12.5px">${esc(c.email)}</span></td><td>${c.license?.date ? `depuis ${esc(fmtD(c.license.date + 'T00:00'))}` : '<span class="muted">à compléter</span>'}</td><td class="r num">${n}</td><td class="r num">${eur(tot)}</td><td>${c.blacklist ? '<span class="badge b-danger">Liste noire</span>' : ''}</td></tr>`).join('')}
    </tbody></table></div>`;
  return adminPage('clients', 'Clients', plural(db.customers.length, 'client'), `<button class="btn btn-ghost btn-sm" data-csv>${icon('download')}<span>Exporter</span></button>`, html);
}
function mountClients() {
  const q = $('[data-q]'); if (q) q.oninput = debounce(() => { adm.clientQuery = q.value; rerender(true); }, 250);
  $$('[data-client]').forEach((r) => (r.onclick = () => openClient(r.dataset.client)));
  const csv = $('[data-csv]');
  if (csv) csv.onclick = () => {
    const cell = (x) => `"${String(x ?? '').replace(/"/g, '""')}"`;
    const lines = [['Nom', 'Société', 'Email', 'Téléphone', 'Adresse', 'Code postal', 'Ville', 'Permis', 'Obtenu le', 'Locations', 'Total réglé'].map(cell).join(';')];
    for (const c of db.customers) { const rs = db.reservations.filter((r) => r.customerId === c.id && active(r)); lines.push([`${c.firstName} ${c.lastName}`, c.company || '', c.email, c.phone, c.address, c.zip, c.city, c.license?.number, c.license?.date, rs.length, String(round2(sum(rs, (r) => paid(r)))).replace('.', ',')].map(cell).join(';')); }
    downloadFile('clients.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
  };
}
function openClient(id) {
  const c = customer(id);
  const rs = db.reservations.filter((r) => r.customerId === c.id).sort((a, b) => (a.from < b.from ? 1 : -1));
  openModal({
    title: custName(c),
    wide: true,
    body: `<div class="grid2" style="align-items:start">
      <div>
        <div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div><div class="kv"><span>Email</span><b>${esc(c.email)}</b></div>
        <div class="kv"><span>Adresse</span><b>${esc([c.address, c.zip, c.city].filter(Boolean).join(', ')) || '<span class="muted">à compléter</span>'}</b></div>
        <div class="kv"><span>Né(e) le</span><b>${c.birth ? esc(fmtD(c.birth + 'T00:00')) : 'non renseigné'}</b></div>
        <div class="kv"><span>Permis</span><b>${esc(c.license?.number || 'non renseigné')}${c.license?.date ? `, ${esc(fmtD(c.license.date + 'T00:00'))}` : ''}</b></div>
        ${c.siret ? `<div class="kv"><span>SIRET</span><b>${esc(c.siret)}</b></div>` : ''}
        <label class="check" style="margin-top:12px"><input type="checkbox" data-bl ${c.blacklist ? 'checked' : ''}> Liste noire : refuser les réservations en ligne</label>
        <label class="field" style="margin-top:12px"><span class="lbl">Notes</span><textarea class="textarea" data-cn>${esc(c.notes || '')}</textarea></label>
      </div>
      <div><div class="block-title" style="margin-top:0">Historique (${rs.length})</div>${rs.map((r) => `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer">${vehicleThumb(vehicle(r.vehicleId))}<div><div class="t">${esc(vehicle(r.vehicleId).name)}</div><div class="s">${esc(fmtD(r.from))} au ${esc(fmtD(r.to))} · ${eur(totalDue(r))}</div></div><div class="r">${statusBadge(r.status)}</div></div>`).join('') || '<p class="muted">Aucune location.</p>'}</div>
    </div>`,
    foot: `<button class="btn btn-ghost" data-close>Fermer</button><button class="btn btn-primary" data-book>${icon('plus')}Nouvelle réservation</button>`,
    onMount: (m, close) => {
      $('[data-bl]', m).onchange = (e) => { c.blacklist = e.target.checked; save(); toast(c.blacklist ? 'Client ajouté à la liste noire.' : 'Client retiré de la liste noire.'); rerender(true); };
      $('[data-cn]', m).onchange = (e) => { c.notes = e.target.value; save(); toast('Note enregistrée.'); };
      $$('[data-res]', m).forEach((el) => (el.onclick = () => { close(); openResDrawer(el.dataset.res); }));
      $('[data-book]', m).onclick = () => { close(); openQuickBooking({}); setTimeout(() => { const s = $('.overlay [name="customerId"]'); if (s) { s.value = c.id; s.dispatchEvent(new Event('change', { bubbles: true })); } }, 60); };
    },
  });
}

/* ---------- Options et tarifs ---------- */
function pageTarifs() {
  const s = db.settings;
  const content = `
    <div class="panel"><div class="p-hd"><h2>Tarifs des véhicules</h2><div class="actions"><span class="muted" style="font-size:13px">Modifiez une case, c’est enregistré.</span></div></div><div class="p-bd" style="overflow:auto">
      <table class="tbl"><thead><tr><th>Véhicule</th><th class="r">Prix / jour</th><th class="r">Km inclus / jour</th><th class="r">Km sup.</th><th class="r">Caution</th><th class="r">Franchise</th></tr></thead><tbody>
      ${db.vehicles.filter((v) => !v.deleted).map((v) => `<tr style="cursor:default"><td><div style="display:flex;gap:10px;align-items:center">${vehicleThumb(v)}<b>${esc(v.name)}</b></div></td>${[['price', 1], ['kmDay', 1], ['extraKm', 0.01], ['deposit', 1], ['franchise', 1]].map(([k, st]) => `<td class="r"><input class="input num" style="width:100px;min-height:38px;text-align:right" type="number" step="${st}" min="0" value="${v[k]}" data-vp="${esc(v.id)}|${k}"></td>`).join('')}</tr>`).join('')}
      </tbody></table><p class="muted" style="font-size:12.5px;margin-top:8px">0 km inclus = kilométrage illimité. Les réservations déjà faites gardent leur prix.</p></div></div>
    <div class="dash-grid">
      <div class="panel"><div class="p-hd"><h2>Options proposées au client</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-addopt>${icon('plus')}Ajouter</button></div></div><div class="p-bd">
        ${db.options.map((o) => `<div class="list-row"><div class="avatar" style="border-radius:12px">${icon(o.icon || 'plus').replace('<svg ', '<svg style="width:18px;height:18px" ')}</div><div><div class="t">${esc(o.name)}</div><div class="s">${eur(o.price)} ${o.unit === 'jour' ? 'par jour' : 'par location'}${o.max ? `, ${eur(o.max)} max` : ''} · ${o.cats.map((c) => (c === 'voiture' ? 'voitures' : 'utilitaires')).join(' et ')}</div></div><div class="r"><label class="check"><input type="checkbox" data-optact="${esc(o.id)}" ${o.active ? 'checked' : ''}>Active</label><button class="icon-btn" data-optedit="${esc(o.id)}" aria-label="Modifier">${icon('edit')}</button></div></div>`).join('')}
      </div></div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="panel"><div class="p-hd"><h2>Tarif dégressif</h2></div><div class="p-bd">
          ${s.degressive.map((d, i) => `<div class="grid2" style="margin-bottom:8px;align-items:end"><label class="field"><span class="lbl">À partir de (jours)</span><input class="input" type="number" min="2" value="${d.days}" data-deg="${i}|days"></label><label class="field"><span class="lbl">Remise (%)</span><input class="input" type="number" min="0" max="80" value="${d.pct}" data-deg="${i}|pct"></label></div>`).join('')}
        </div></div>
        <div class="panel"><div class="p-hd"><h2>Codes promo</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-addpromo>${icon('plus')}Ajouter</button></div></div><div class="p-bd">
          ${db.promos.map((p, i) => `<div class="list-row"><div><div class="t">${esc(p.code)} · ${p.pct} %</div><div class="s">${esc(p.note || '')}</div></div><div class="r"><label class="check"><input type="checkbox" data-pact="${i}" ${p.active ? 'checked' : ''}>Actif</label><button class="icon-btn" data-pdel="${i}" aria-label="Supprimer">${icon('trash')}</button></div></div>`).join('')}
        </div></div>
        <div class="panel"><div class="p-hd"><h2>Lieux de départ et de retour</h2></div><div class="p-bd">
          ${db.agencies.map((a) => `<div class="list-row"><div><div class="t">${esc(a.name)}</div><div class="s">${esc(a.address)}</div></div><div class="r"><input class="input num" style="width:96px;min-height:38px;text-align:right" type="number" min="0" value="${a.fee}" data-afee="${esc(a.id)}" aria-label="Frais"> €</div></div>`).join('')}
        </div></div>
      </div>
    </div>`;
  return adminPage('tarifs', 'Options et tarifs', 'Prix, options, remises', '', content);
}
function mountTarifs() {
  $$('[data-vp]').forEach((i) => (i.onchange = () => { const [id, k] = i.dataset.vp.split('|'); vehicle(id)[k] = Number(i.value) || 0; save(); toast('Tarif enregistré.'); }));
  $$('[data-deg]').forEach((i) => (i.onchange = () => { const [n, k] = i.dataset.deg.split('|'); db.settings.degressive[n][k] = Number(i.value) || 0; db.settings.degressive.sort((a, b) => a.days - b.days); save(); toast('Remise enregistrée.'); }));
  $$('[data-afee]').forEach((i) => (i.onchange = () => { agency(i.dataset.afee).fee = Number(i.value) || 0; save(); toast('Frais enregistrés.'); }));
  $$('[data-optact]').forEach((i) => (i.onchange = () => { option(i.dataset.optact).active = i.checked; save(); }));
  $$('[data-pact]').forEach((i) => (i.onchange = () => { db.promos[i.dataset.pact].active = i.checked; save(); }));
  $$('[data-pdel]').forEach((b) => (b.onclick = () => { db.promos.splice(Number(b.dataset.pdel), 1); save(); rerender(true); }));
  const ap = $('[data-addpromo]');
  if (ap) ap.onclick = () => openModal({
    title: 'Nouveau code promo',
    body: `<form data-f style="display:grid;gap:12px"><label class="field"><span class="lbl">Code</span><input class="input" name="code" placeholder="ETE2026"></label><label class="field"><span class="lbl">Remise (%)</span><input class="input" name="pct" type="number" min="1" max="80" value="10"></label><label class="field"><span class="lbl">Note interne</span><input class="input" name="note"></label></form>`,
    foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Créer</button>',
    onMount: (m, close) => { $('[data-ok]', m).onclick = () => { const f = $('[data-f]', m); const code = f.code.value.trim().toUpperCase().replace(/\s+/g, ''); if (!code || db.promos.some((p) => p.code === code)) { toast('Code vide ou déjà existant.', 'warn'); return; } db.promos.push({ code, pct: Number(f.pct.value) || 10, active: true, note: f.note.value.trim() }); save(); close(); rerender(true); }; },
  });
  const edit = (o) => {
    const isNew = !o;
    const x = o || { id: uid('o'), name: '', desc: '', price: 5, unit: 'jour', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true, icon: 'plus' };
    openModal({
      title: isNew ? 'Nouvelle option' : x.name,
      body: `<form data-f style="display:grid;gap:12px">
        <label class="field"><span class="lbl">Nom</span><input class="input" name="name" value="${esc(x.name)}"></label>
        <label class="field"><span class="lbl">Description affichée au client</span><textarea class="textarea" name="desc">${esc(x.desc)}</textarea></label>
        <div class="grid3"><label class="field"><span class="lbl">Prix (€)</span><input class="input" name="price" type="number" min="0" step="0.5" value="${x.price}"></label><label class="field"><span class="lbl">Facturé</span><select class="select" name="unit"><option value="jour" ${x.unit === 'jour' ? 'selected' : ''}>par jour</option><option value="forfait" ${x.unit === 'forfait' ? 'selected' : ''}>par location</option></select></label><label class="field"><span class="lbl">Plafond (€)</span><input class="input" name="max" type="number" min="0" value="${x.max ?? ''}"></label></div>
        <div style="display:flex;gap:16px"><label class="check"><input type="checkbox" name="car" ${x.cats.includes('voiture') ? 'checked' : ''}> Voitures</label><label class="check"><input type="checkbox" name="van" ${x.cats.includes('utilitaire') ? 'checked' : ''}> Utilitaires</label></div>
      </form>`,
      foot: `${isNew ? '' : '<button class="btn btn-danger" data-del style="margin-right:auto">Supprimer</button>'}<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Enregistrer</button>`,
      onMount: (m, close) => {
        const f = $('[data-f]', m);
        const d = $('[data-del]', m); if (d) d.onclick = () => { db.options = db.options.filter((y) => y.id !== x.id); save(); close(); rerender(true); };
        $('[data-ok]', m).onclick = () => {
          const cats = [f.car.checked && 'voiture', f.van.checked && 'utilitaire'].filter(Boolean);
          if (!f.name.value.trim() || !cats.length) { toast('Nom et type de véhicule obligatoires.', 'warn'); return; }
          Object.assign(x, { name: f.name.value.trim(), desc: f.desc.value.trim(), price: Number(f.price.value) || 0, unit: f.unit.value, max: f.max.value === '' ? null : Number(f.max.value), cats });
          if (isNew) db.options.push(x);
          save(); close(); rerender(true);
        };
      },
    });
  };
  const ao = $('[data-addopt]'); if (ao) ao.onclick = () => edit(null);
  $$('[data-optedit]').forEach((b) => (b.onclick = () => edit(option(b.dataset.optedit))));
}

/* ---------- Paramètres ---------- */
const ACCENTS = [['#d9b878', 'Or champagne'], ['#c9ccd1', 'Argent'], ['#cadae9', 'Reflet bleuté'], ['#e6cfdc', 'Reflet rosé'], ['#f3f2ef', 'Blanc nacré']];
function pageSettings() {
  const s = db.settings;
  const inp = (name, label, val, attrs = '') => `<label class="field"><span class="lbl">${label}</span><input class="input" name="${name}" value="${esc(val ?? '')}" ${attrs}></label>`;
  const day = (d) => { const h = s.hours[d]; return `<b>${JOURS[d][0].toUpperCase() + JOURS[d].slice(1)}</b><input class="input" type="time" step="1800" data-h="${d}|open" value="${h ? h.open : '09:00'}" ${h ? '' : 'disabled'}><input class="input" type="time" step="1800" data-h="${d}|close" value="${h ? h.close : '18:00'}" ${h ? '' : 'disabled'}><label class="check cl"><input type="checkbox" data-closed="${d}" ${h ? '' : 'checked'}> Fermé</label>`; };
  const content = `
    <div class="dash-grid" style="margin-top:0">
      <div class="panel"><div class="p-hd"><h2>Identité</h2></div><div class="p-bd"><form data-id style="display:grid;gap:12px">
        <div class="grid2">${inp('brand', 'Nom affiché', s.brand)}${inp('tagline', 'Signature', s.tagline)}</div>
        <div class="grid2">${inp('legalName', 'Raison sociale', s.legalName)}${inp('legalForm', 'Forme et capital', s.legalForm)}</div>
        <div class="grid2">${inp('siren', 'SIREN', s.siren)}${inp('rcs', 'Greffe', s.rcs)}</div>
        ${inp('address', 'Adresse', s.address)}
        <div class="grid2">${inp('zip', 'Code postal', s.zip)}${inp('city', 'Ville', s.city)}</div>
        <div class="grid2">${inp('phone', 'Téléphone', s.phone)}${inp('email', 'Email', s.email, 'type="email" placeholder="contact@votre-domaine.fr"')}</div>
        <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Couleur d’accent</span><div class="swatches">${ACCENTS.map(([c, l]) => `<button type="button" class="swatch ${s.accent === c ? 'on' : ''}" style="background:${c}" data-accent="${c}" title="${l}" aria-label="${l}"></button>`).join('')}<label class="swatch" style="display:grid;place-items:center;cursor:pointer;background:var(--surface-2)" title="Autre couleur">${icon('plus').replace('<svg ', '<svg style="width:16px;height:16px" ')}<input type="color" data-accent-custom value="${esc(s.accent)}" style="position:absolute;opacity:0;width:0;height:0"></label></div></div>
        <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Logo</span><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${logoMark('logo-mark')}<label class="btn btn-ghost btn-sm" style="cursor:pointer">${icon('upload')}Remplacer<input type="file" accept="image/*" data-logo hidden></label>${s.logo ? '<button type="button" class="btn btn-ghost btn-sm" data-unlogo>Logo PRISMA d’origine</button>' : ''}</div></div>
        <button class="btn btn-primary" type="submit" style="justify-self:start">Enregistrer l’identité</button>
      </form></div></div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="panel"><div class="p-hd"><h2>Horaires d’ouverture</h2></div><div class="p-bd"><div class="hours-tbl">${[1, 2, 3, 4, 5, 6, 0].map(day).join('')}</div></div></div>
        <div class="panel"><div class="p-hd"><h2>Règles de location</h2></div><div class="p-bd"><form data-rules style="display:grid;gap:12px">
          <div class="grid3">${inp('minAge', 'Âge minimum', s.minAge, 'type="number" min="18"')}${inp('youngYears', 'Jeune conducteur si permis de moins de (ans)', s.youngYears, 'type="number" min="0"')}${inp('youngFee', 'Supplément par jour (€)', s.youngFee, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('youngFeeMax', 'Plafond du supplément (€)', s.youngFeeMax, 'type="number" min="0"')}${inp('youngDeposit', 'Caution en plus (€)', s.youngDeposit, 'type="number" min="0"')}${inp('prepHours', 'Préparation entre deux locations (h)', s.prepHours, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('leadHours', 'Délai minimum avant départ (h)', s.leadHours, 'type="number" min="0"')}${inp('freeCancelHours', 'Annulation gratuite jusqu’à (h avant)', s.freeCancelHours, 'type="number" min="0"')}${inp('installmentsMin', 'Paiement en plusieurs fois dès (€)', s.installmentsMin, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('fuelEighth', 'Carburant manquant, par huitième (€)', s.fuelEighth, 'type="number" min="0"')}${inp('cleaningFee', 'Forfait nettoyage (€)', s.cleaningFee, 'type="number" min="0"')}${inp('vat', 'TVA (%)', s.vat, 'type="number" min="0"')}</div>
          <button class="btn btn-primary" type="submit" style="justify-self:start">Enregistrer les règles</button>
        </form></div></div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Conditions générales de location</h2></div><div class="p-bd"><textarea class="textarea" style="min-height:220px" data-cgv>${esc(s.cgv)}</textarea><button class="btn btn-primary btn-sm" style="margin-top:10px" data-savecgv>Enregistrer les conditions</button></div></div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Démonstration</h2></div><div class="p-bd" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn btn-ghost btn-sm" data-export>${icon('download')}Exporter les données</button><button class="btn btn-danger btn-sm" data-reset>${icon('refresh')}Réinitialiser la démonstration</button><span class="muted" style="font-size:13px">Les données restent dans ce navigateur. En production, elles sont hébergées sur un serveur sécurisé, avec sauvegardes.</span></div></div>`;
  return adminPage('parametres', 'Paramètres', 'Identité, horaires, règles', '', content);
}
function mountSettings() {
  const s = db.settings;
  const fid = $('[data-id]');
  if (fid) fid.onsubmit = (e) => { e.preventDefault(); for (const k of ['brand', 'tagline', 'legalName', 'legalForm', 'siren', 'rcs', 'address', 'zip', 'city', 'phone', 'email']) s[k] = fid[k].value.trim(); save(); applyTheme(); toast('Identité enregistrée.', 'ok'); rerender(true); };
  $$('[data-accent]').forEach((b) => (b.onclick = () => { s.accent = b.dataset.accent; save(); applyTheme(); rerender(true); }));
  const cc = $('[data-accent-custom]'); if (cc) cc.onchange = () => { s.accent = cc.value; save(); applyTheme(); rerender(true); };
  const lg = $('[data-logo]'); if (lg) lg.onchange = async (e) => { try { s.logo = await readImage(e.target.files[0], 400); save(); rerender(true); toast('Logo remplacé.', 'ok'); } catch (err) { toast(err.message, 'warn'); } };
  const ul = $('[data-unlogo]'); if (ul) ul.onclick = () => { s.logo = null; save(); rerender(true); };
  $$('[data-closed]').forEach((c) => (c.onchange = () => { const d = c.dataset.closed; s.hours[d] = c.checked ? null : { open: '09:00', close: '18:00' }; save(); rerender(true); }));
  $$('[data-h]').forEach((i) => (i.onchange = () => {
    const [d, k] = i.dataset.h.split('|');
    if (!s.hours[d] || !i.value) return;
    const [hh, mm] = i.value.split(':').map(Number);
    const next = { ...s.hours[d], [k]: `${pad(hh)}:${mm < 30 ? '00' : '30'}` };
    if (next.open >= next.close) { toast('L’ouverture doit précéder la fermeture.', 'warn'); i.value = s.hours[d][k]; return; }
    s.hours[d] = next; save(); toast('Horaires enregistrés.');
  }));
  const fr = $('[data-rules]'); if (fr) fr.onsubmit = (e) => { e.preventDefault(); for (const k of ['minAge', 'youngYears', 'youngFee', 'youngFeeMax', 'youngDeposit', 'prepHours', 'leadHours', 'freeCancelHours', 'installmentsMin', 'fuelEighth', 'cleaningFee', 'vat']) s[k] = Number(fr[k].value) || 0; save(); toast('Règles enregistrées.', 'ok'); };
  const cg = $('[data-savecgv]'); if (cg) cg.onclick = () => { s.cgv = $('[data-cgv]').value; save(); toast('Conditions enregistrées.', 'ok'); };
  const ex = $('[data-export]'); if (ex) ex.onclick = () => downloadFile('prisma-donnees.json', JSON.stringify(db, null, 2), 'application/json');
}

/* =====================================================================
   ROUTEUR ET DÉMARRAGE : vraies adresses (/location-voiture-bordeaux,
   /vehicule/renault-clio-v…), navigation instantanée entre les pages.
   Le fichier unique ouvert depuis l'ordinateur garde des adresses en « # ».
   ===================================================================== */
const ROUTES = [
  [/^\/$/, () => [pageHome(), mountHome]],
  [/^\/vehicules$/, () => [pageResults('all'), mountResults]],
  [/^\/vehicules\/([\w-]+)$/, (g) => [pageResults(g), mountResults]],
  [/^\/contact$/, () => [pageContact(), mountContact]],
  [/^\/vehicule\/([\w-]+)$/, (slug) => { const id = vehicleIdFromSlug(slug); return id ? [pageVehicle(id), () => mountVehicle(id)] : null; }],
  [/^\/options$/, () => [pageOptions(), mountOptions]],
  [/^\/coordonnees$/, () => [pageDetails(), mountDetails]],
  [/^\/reservation\/([\w-]+)$/, (id) => [pageReservation(id), () => mountReservation(id)]],
  [/^\/paiement\/([\w-]+)$/, (id) => [pagePayment(id), () => mountPayment(id)]],
  [/^\/compte$/, () => [pageAccount(), mountAccount]],
  [/^\/agences$/, () => [pageAgencies(), mountAgencies]],
  [/^\/professionnels$/, () => [pagePro(), mountSeo]],
  [/^\/vehicules-occasion$/, () => [pageSales(), mountSales]],
  [/^\/vehicule-occasion\/([\w-]+)$/, (slug) => { const s = saleBySlug(slug); return s ? [pageSale(s.id), () => mountSale(s.id)] : null; }],
  [/^\/guides$/, () => [pageGuides(), mountSeo]],
  [/^\/faq$/, () => [pageFaq(), mountSeo]],
  [/^\/conditions-de-location$/, () => [pageConditions(), mountSeo]],
  [/^\/gestion(?:\/dashboard)?$/, () => [pageDashboard(), mountDashboard]],
  [/^\/gestion\/reservations$/, () => [pageReservations(), mountReservations]],
  [/^\/gestion\/planning$/, () => [pagePlanning(), mountPlanning]],
  [/^\/gestion\/flotte$/, () => [pageFleet(), mountFleet]],
  [/^\/gestion\/ventes$/, () => [pageVentes(), mountVentes]],
  [/^\/gestion\/clients$/, () => [pageClients(), mountClients]],
  [/^\/gestion\/tarifs$/, () => [pageTarifs(), mountTarifs]],
  [/^\/gestion\/parametres$/, () => [pageSettings(), mountSettings]],
];
function resolveRoute(path) {
  for (const [re, fn] of ROUTES) { const m = path.match(re); if (m) { const out = fn(...m.slice(1)); if (out) return out; } }
  // pages de location, guides et page « Professionnels » : contenus rédigés (dossier seo/content)
  const p = SEO_BY_PATH[path];
  if (p && p.kind === 'guide') return [pageGuide(p), mountSeo];
  if (p && p.kind === 'landing') return [pageLanding(p), () => mountLanding(p)];
  if (p && p.kind === 'service') return [pageService(p), mountService];
  return [pageNotFound(), mountSeo];
}
let lastPath = null;
let firstRender = true;
/** Anciennes adresses devenues des pages : on les remplace sans recharger. */
const ALIASES = { '/vehicules/all': '/vehicules', '/index': '/', '/accueil': '/' };
function render(keepScroll) {
  let path = curPath();
  if (ALIASES[path]) {
    path = ALIASES[path];
    if (FILE_MODE) history.replaceState(null, '', '#' + path); else history.replaceState(null, '', path + location.search);
  }
  const app = $('#app');
  const out = resolveRoute(path);
  const y = window.scrollY;
  // la recherche garde le curseur pendant la frappe (la page est redessinée au fil de la saisie)
  const ae = document.activeElement;
  const typing = ae && ae.matches && ae.matches('#app input[data-q]') ? { start: ae.selectionStart, end: ae.selectionEnd } : null;
  app.innerHTML = out[0];
  // page déjà dessinée lors de la construction du site (pré-rendu) : pas de seconde animation d'apparition
  const pre = firstRender && (document.documentElement.hasAttribute('data-pre') || !!window.PRISMA_PRERENDER);
  if (pre) { $$('[data-reveal],[data-words]', app).forEach((e) => e.classList.add('in')); document.documentElement.removeAttribute('data-pre'); }
  try { if (out[1]) out[1](); } catch (e) { console.error(e); }
  bindGlobal();
  try { applyHead(path); } catch (e) { console.error(e); }
  const main = $('#main') || $('.page');
  if (main && path !== lastPath && !keepScroll && !pre) { main.classList.remove('page-in'); void main.offsetWidth; main.classList.add('page-in'); }
  try { afterRender(); } catch (e) { console.error(e); }
  updateInstallUI();
  if (typing) { const q = $('#app input[data-q]'); if (q) { q.focus({ preventScroll: true }); try { q.setSelectionRange(typing.start, typing.end); } catch (e) { /* champ sans sélection */ } } }
  if (keepScroll) window.scrollTo(0, y);
  else if (path !== lastPath && !firstRender) window.scrollTo(0, 0);
  lastPath = path;
  firstRender = false;
}
function rerender(keep = true) { render(keep); }
function closeOverlays() {
  if (typeof closeDrawer === 'function') closeDrawer();
  [...MODALS].forEach((c) => c());
}
/** Navigation vers une page du site (sans rechargement). Accepte aussi les anciennes adresses en « #/… ». */
function go(to) {
  if (!to) return;
  if (to[0] === '#') to = to.slice(1) || '/';
  if (FILE_MODE) { if (location.hash === '#' + to) render(); else location.hash = to; return; }
  if (to === location.pathname + location.search) { render(); return; }
  history.pushState(null, '', to);
  closeOverlays();
  render();
}
window.addEventListener('popstate', () => { closeOverlays(); render(); });
window.addEventListener('hashchange', () => { if (FILE_MODE) { closeOverlays(); render(); } });
// liens internes : on reste dans l'application (pas de rechargement), les autres liens gardent leur comportement
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest('a[href]');
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
  const href = a.getAttribute('href');
  if (!href || href[0] !== '/' || href.startsWith('//')) return;
  e.preventDefault();
  go(href);
});
function bindGlobal() {
  $$('[data-reset]').forEach((b) => (b.onclick = (e) => {
    e.preventDefault();
    confirmBox('Réinitialiser la démonstration', 'Toutes les réservations, clients et réglages reviennent au jeu d’essai de départ.', 'Réinitialiser', () => {
      db = seedData(); save(); lsDel(DRAFT_KEY); lsDel(SESSION_KEY); draft = null; applyTheme(); toast('Démonstration réinitialisée.', 'ok'); render();
    }, true);
  }));
  $$('[data-doc]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); openInfoDoc(a.dataset.doc); }));
  $$('[data-scroll]').forEach((a) => (a.onclick = (e) => {
    e.preventDefault();
    const target = a.dataset.scroll;
    const jump = () => { const el = document.getElementById(target); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (curPath() === '/') jump(); else { go('/'); setTimeout(jump, 60); }
  }));
  $$('[data-edit-search]').forEach((b) => (b.onclick = () => openSearchModal()));
}
/** Les dates du jeu d'essai suivent le calendrier : la démonstration reste « vivante » d'un jour à l'autre. */
function refreshDemoDates() {
  const today = dayStart(new Date());
  const anchor = db.anchor ? parse(db.anchor + 'T00:00') : today;
  const n = Math.round((today - anchor) / DAY);
  if (!n) return;
  const sh = (s) => (s ? toISO(addDays(parse(s), n)) : s);
  const shD = (s) => (s ? dateKey(addDays(parse(s + 'T00:00'), n)) : s);
  for (const r of db.reservations) {
    r.from = sh(r.from); r.to = sh(r.to); r.createdAt = sh(r.createdAt);
    for (const p of r.payments || []) p.at = sh(p.at);
    if (r.checkout) r.checkout.at = sh(r.checkout.at);
    if (r.checkin) r.checkin.at = sh(r.checkin.at);
  }
  for (const b of db.blocks) { b.from = sh(b.from); b.to = sh(b.to); }
  for (const v of db.vehicles) if (v.nextService) v.nextService = shD(v.nextService);
  for (const c of db.customers) c.createdAt = sh(c.createdAt);
  for (const s of db.sales || []) { s.listedAt = sh(s.listedAt); if (s.soldAt) s.soldAt = sh(s.soldAt); }
  db.anchor = dateKey(today);
  save();
}
function init() {
  // anciens liens en « #/… » (partagés avant les vraies adresses) : convertis sans recharger
  if (!FILE_MODE && location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));
  db = lsGet(STORE_KEY);
  if (!db || db.version !== DATA_VERSION || !db.vehicles) { db = seedData(); save(); }
  refreshDemoDates();
  // véhicules à vendre : ajoutés aux données existantes sans effacer les réservations déjà faites ;
  // annonces de démonstration remplacées quand elles changent, annonces ajoutées dans le logiciel gardées
  if (!Array.isArray(db.sales) || db.salesSeed !== SALES_SEED) {
    const seed = seedSales(), ids = new Set(seed.map((s) => s.id));
    db.sales = seed.concat((db.sales || []).filter((s) => !ids.has(s.id)));
    db.salesSeed = SALES_SEED; save();
  }
  draft = lsGet(DRAFT_KEY);
  applyTheme();
  playIntro();
  render();
}
init();
