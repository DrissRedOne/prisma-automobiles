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

function init() {
  db = lsGet(STORE);
  if (!db || db.version !== DATA_VERSION || !Array.isArray(db.orders)) { db = seedDb(); save(); }
  refreshDemo();
  loadCart();
  // lignes du panier devenues invalides (plat retiré de la carte)
  cart.lines = cart.lines.filter((l) => product(l.productId));
  render();
  if (typeof initPWA === 'function') initPWA();
}
init();
