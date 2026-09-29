// Aperçus de l'appli restaurant « Yanis Cuisine » (téléphone et tablette)
const { chromium } = require('playwright-core');
const BASE = 'http://127.0.0.1:8791'; const OUT = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const M = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
  const T = { viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true };
  const ctxFor = async (dev) => { const c = await b.newContext({ ...dev, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' }); await c.clock.install({ time: new Date('2026-09-29T19:30:00+02:00') }); return c; };
  const login = async (p) => { await p.goto(BASE + '/cuisine'); await p.fill('[name=login]', 'yanis'); await p.fill('[name=pw]', 'Palais2026'); await p.click('[data-login] button[type=submit]'); await p.waitForSelector('.adm'); };
  const m = await ctxFor(M); const p = await m.newPage();
  await p.goto(BASE + '/cuisine'); await p.waitForTimeout(500); await p.screenshot({ path: `${OUT}/k-connexion.png` });
  await login(p); await p.waitForTimeout(700); await p.screenshot({ path: `${OUT}/k-commandes.png` });
  await p.click('.adm-nav a[href="/cuisine/historique"]'); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/k-historique.png` });
  await p.click('.hrow >> nth=2'); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/k-detail.png` });
  await m.close();
  const t = await ctxFor(T); const q = await t.newPage();
  await login(q); await q.waitForTimeout(700); await q.screenshot({ path: `${OUT}/k-tablette.png` });
  await t.close();
  await b.close();
})();
