/* =====================================================================
   ROUTEUR ET DÉMARRAGE
   ===================================================================== */
const ROUTES = [
  [/^#?\/?$/, () => [pageHome(), mountHome]],
  [/^#\/vehicules(?:\/([\w-]+))?$/, (g) => [pageResults(g), mountResults]],
  [/^#\/contact$/, () => [pageContact(), mountContact]],
  [/^#\/professionnels$/, () => [pagePro(), mountPlaces]],
  [/^#\/vehicule\/([\w-]+)$/, (id) => [pageVehicle(id), () => mountVehicle(id)]],
  [/^#\/options$/, () => [pageOptions(), mountOptions]],
  [/^#\/coordonnees$/, () => [pageDetails(), mountDetails]],
  [/^#\/reservation\/([\w-]+)$/, (id) => [pageReservation(id), () => mountReservation(id)]],
  [/^#\/paiement\/([\w-]+)$/, (id) => [pagePayment(id), () => mountPayment(id)]],
  [/^#\/compte$/, () => [pageAccount(), mountAccount]],
  [/^#\/agences$/, () => [pageAgencies(), mountAgencies]],
  [/^#\/gestion(?:\/dashboard)?$/, () => [pageDashboard(), mountDashboard]],
  [/^#\/gestion\/reservations$/, () => [pageReservations(), mountReservations]],
  [/^#\/gestion\/planning$/, () => [pagePlanning(), mountPlanning]],
  [/^#\/gestion\/flotte$/, () => [pageFleet(), mountFleet]],
  [/^#\/gestion\/clients$/, () => [pageClients(), mountClients]],
  [/^#\/gestion\/tarifs$/, () => [pageTarifs(), mountTarifs]],
  [/^#\/gestion\/parametres$/, () => [pageSettings(), mountSettings]],
];
let lastHash = null;
function render(keepScroll) {
  const h = location.hash || '#/';
  const app = $('#app');
  let out = null;
  for (const [re, fn] of ROUTES) { const m = h.match(re); if (m) { out = fn(...m.slice(1)); break; } }
  if (!out) out = [pageHome(), mountHome];
  const y = window.scrollY;
  // la recherche garde le curseur pendant la frappe (la page est redessinée au fil de la saisie)
  const ae = document.activeElement;
  const typing = ae && ae.matches && ae.matches('#app input[data-q]') ? { start: ae.selectionStart, end: ae.selectionEnd } : null;
  app.innerHTML = out[0];
  try { if (out[1]) out[1](); } catch (e) { console.error(e); }
  bindGlobal();
  const main = $('#main') || $('.page');
  if (main && h !== lastHash && !keepScroll) { main.classList.remove('page-in'); void main.offsetWidth; main.classList.add('page-in'); }
  try { afterRender(); } catch (e) { console.error(e); }
  updateInstallUI();
  if (typing) { const q = $('#app input[data-q]'); if (q) { q.focus({ preventScroll: true }); try { q.setSelectionRange(typing.start, typing.end); } catch (e) { /* champ sans sélection */ } } }
  if (keepScroll) window.scrollTo(0, y);
  else if (h !== lastHash) window.scrollTo(0, 0);
  lastHash = h;
}
function rerender(keep = true) { render(keep); }
function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
window.addEventListener('hashchange', () => {
  if (closeDrawer) closeDrawer();
  [...MODALS].forEach((c) => c());
  render();
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
    if ((location.hash || '#/') === '#/' || location.hash === '') jump(); else { go('#/'); setTimeout(jump, 60); }
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
  db.anchor = dateKey(today);
  save();
}
function init() {
  db = lsGet(STORE_KEY);
  if (!db || db.version !== DATA_VERSION || !db.vehicles) { db = seedData(); save(); }
  refreshDemoDates();
  draft = lsGet(DRAFT_KEY);
  applyTheme();
  playIntro();
  render();
}
init();
