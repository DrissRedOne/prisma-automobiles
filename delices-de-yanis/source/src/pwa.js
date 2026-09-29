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
