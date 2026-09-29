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
