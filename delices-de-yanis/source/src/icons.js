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
  return `<a class="logo ${light ? 'light' : ''}" href="/" aria-label="${esc(S().name)}, accueil">${logoMark(42)}<span class="logo-t"><small>Les Délices</small><b>de Yanis</b></span></a>`;
}
