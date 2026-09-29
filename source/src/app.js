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
  // espace loueur : écran de connexion tant que le loueur n'est pas connecté
  const out = isAdminPath(path) && !adminSession() ? [pageAdminLogin(), mountAdminLogin] : resolveRoute(path);
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
    confirmBox('Remettre les données d’exemple', 'Toutes les réservations, clients, annonces et réglages reviennent aux données de départ.', 'Remettre', () => {
      db = seedData(); save(); lsDel(DRAFT_KEY); lsDel(SESSION_KEY); draft = null; applyTheme(); toast('Données d’exemple rétablies.', 'ok'); render();
    }, true);
  }));
  $$('[data-adminlogout]').forEach((b) => (b.onclick = (e) => { e.preventDefault(); setAdminSession(null); toast('Vous êtes déconnecté de l’espace loueur.', 'ok'); render(); }));
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
