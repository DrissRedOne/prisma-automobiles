/* Service worker PRISMA : l'application s'ouvre instantanément et fonctionne hors connexion.
   Chaque nouvelle version change VERSION : l'application propose alors « Actualiser ». */
const VERSION = '__VERSION__';
const CACHE = 'prisma-app-' + VERSION;
const FONTS = 'prisma-fonts';
const SHELL = __SHELL__;

self.addEventListener('install', (e) => {
  // « no-cache » : le serveur confirme la version (304 si inchangée), sans tout retélécharger
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'no-cache' })))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('prisma-app-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // pages : l'application en cache, sinon le réseau
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith(caches.match('./index.html', { cacheName: CACHE }).then((hit) => hit || fetch(req)));
    return;
  }
  // polices Google : servies depuis le cache, rafraîchies en arrière-plan
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // icônes, manifeste, écrans de démarrage : cache d'abord
  if (url.origin === location.origin) e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
