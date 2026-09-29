/* Service worker des Délices de Yanis : chaque page est un vrai fichier HTML, toujours demandé
   au réseau pour rester à jour ; hors connexion, la page déjà vue ou l'application prend le relais.
   Chaque nouvelle version change VERSION : l'application propose alors « Actualiser ». */
const VERSION = '56b448aef881';
const CACHE = 'yanis-' + VERSION;
const RUNTIME = 'yanis-pages';
const SHELL = ["/app", "/assets/app.dcf0629cbd.js", "/assets/style.b1897034a0.css", "/fonts/bricolage-latin.woff2", "/fonts/inter-latin.woff2", "/manifest.webmanifest", "/icons/apple-touch-icon.png", "/icons/favicon-32.png", "/icons/favicon-48.png", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-96.png", "/icons/maskable-192.png", "/icons/maskable-512.png"];
// l'application seule, à son adresse propre (sans « .html » : une réponse redirigée ne peut pas servir une page)
const APP = '/app';

self.addEventListener('install', (e) => {
  // « no-cache » : le serveur confirme la version (304 si inchangée), sans tout retélécharger
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'no-cache' })))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== RUNTIME && k.startsWith('yanis-')).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });

const keep = (cacheName, req, res) => { if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(cacheName).then((c) => c.put(req, copy)); } return res; };

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // pages : réseau d'abord ; hors connexion, la page déjà visitée, sinon l'application (elle affiche la bonne page)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => keep(RUNTIME, req, res)).catch(() =>
      caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match(APP))));
    return;
  }
  // scripts, styles et polices versionnés : cache d'abord
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/')) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => keep(CACHE, req, res))));
    return;
  }
  // photos, icônes, manifeste : réponse immédiate depuis le cache, rafraîchie en arrière-plan
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => {
    const net = fetch(req).then((res) => keep(RUNTIME, req, res)).catch(() => hit);
    return hit || net;
  }));
});
