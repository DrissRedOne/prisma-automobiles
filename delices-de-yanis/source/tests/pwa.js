// Appli du restaurant « Yanis Cuisine » : page d'entrée et manifeste propres, service worker, hors connexion,
// notification d'une nouvelle commande quand l'appli est en arrière-plan. Appli client : manifeste distinct.
// Usage : node tests/pwa.js   (serveur : node tests/serve.js out/web 8791)
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://127.0.0.1:8791';
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log('  ÉCHEC :', m); } };
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'], channel: 'chromium' }); // navigateur complet : les notifications y fonctionnent
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, locale: 'fr-FR', timezoneId: 'Europe/Paris' });
  await ctx.grantPermissions(['notifications'], { origin: BASE });
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', (e) => errors.push(e.message));

  // manifestes
  const mc = await (await p.request.get(BASE + '/cuisine.webmanifest')).json();
  ok(mc.id === '/cuisine' && mc.start_url === '/cuisine' && mc.scope === '/cuisine' && mc.short_name === 'Yanis Cuisine', 'manifeste cuisine : identité propre');
  for (const i of mc.icons) ok((await p.request.get(BASE + i.src)).status() === 200, `icône cuisine ${i.src}`);
  const mclient = await (await p.request.get(BASE + '/manifest.webmanifest')).json();
  ok(mclient.id === '/' && !JSON.stringify(mclient).includes('/cuisine'), 'manifeste client : sans espace restaurant');

  // page d'entrée de l'appli cuisine
  await p.goto(BASE + '/cuisine');
  ok(await p.getAttribute('link[rel="manifest"]', 'href') === '/cuisine.webmanifest', 'page cuisine : manifeste cuisine');
  ok(await p.getAttribute('meta[name="apple-mobile-web-app-title"]', 'content') === 'Yanis Cuisine', 'page cuisine : nom sur l’écran d’accueil (iPhone)');
  ok(await p.getAttribute('link[rel="apple-touch-icon"]', 'href') === '/icons/cuisine-apple-touch-icon.png', 'page cuisine : icône iPhone');
  // en venant du site client, l'identité bascule aussi
  await p.goto(BASE + '/');
  ok(await p.getAttribute('link[rel="manifest"]', 'href') === '/manifest.webmanifest', 'site client : manifeste client');
  await p.evaluate(() => go('/cuisine'));
  ok(await p.getAttribute('link[rel="manifest"]', 'href') === '/cuisine.webmanifest', 'navigation vers la cuisine : manifeste cuisine');

  // connexion, service worker actif
  await p.fill('[name=login]', 'yanis'); await p.fill('[name=pw]', 'Palais2026'); await p.click('[data-login] button[type=submit]');
  await p.waitForSelector('.kboard');
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.reload(); await p.waitForSelector('.kboard');
  ok(await p.evaluate(() => !!navigator.serviceWorker.controller), 'service worker actif sur l’appli cuisine');

  // notification quand l'appli est en arrière-plan
  const n = await p.evaluate(async () => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
    simulateOrder();
    alertNew([db.orders[0]]);
    await new Promise((r) => setTimeout(r, 800));
    const list = await (await navigator.serviceWorker.ready).getNotifications();
    return list.map((x) => x.title);
  });
  ok(n.length === 1 && /^Nouvelle commande n° \d+$/.test(n[0]), `notification de nouvelle commande (${n.join(', ')})`);

  // hors connexion : l'appli cuisine s'ouvre quand même
  await ctx.setOffline(true);
  await p.goto(BASE + '/cuisine/historique').catch(() => {});
  await p.waitForSelector('.adm', { timeout: 8000 }).catch(() => {});
  ok(await p.locator('.hlist').count() === 1, 'hors connexion : historique affiché');
  await ctx.setOffline(false);

  ok(errors.length === 0, 'aucune erreur JavaScript' + (errors.length ? ' : ' + errors.join(' | ') : ''));
  await b.close();
  console.log(`${passes} OK, ${fails} échec(s)`);
  process.exit(fails ? 1 : 0);
})();
