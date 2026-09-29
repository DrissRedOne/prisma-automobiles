// Aperçus pour présenter le site (écrans nets, sans défilement)
const { chromium } = require('playwright-core');
const BASE = 'http://127.0.0.1:8791'; const OUT = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const shot = async (name, dev, fn) => {
    const ctx = await b.newContext({ ...dev, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
    await ctx.clock.install({ time: new Date('2026-09-29T19:30:00+02:00') });
    const p = await ctx.newPage(); await fn(p); await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}/${name}.png` }); await ctx.close();
  };
  const D = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
  const M = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
  await shot('d-accueil', D, (p) => p.goto(BASE + '/'));
  await shot('d-carte', D, async (p) => { await p.goto(BASE + '/carte'); await p.evaluate(() => window.scrollTo(0, 330)); await p.waitForTimeout(400); });
  await shot('d-cuisine', D, async (p) => { await p.goto(BASE + '/cuisine'); await p.fill('[name=login]', 'yanis'); await p.fill('[name=pw]', 'Palais2026'); await p.click('[data-login] button[type=submit]'); });
  await shot('m-accueil', M, (p) => p.goto(BASE + '/'));
  await shot('m-carte', M, async (p) => { await p.goto(BASE + '/carte'); await p.evaluate(() => window.scrollTo(0, 560)); await p.waitForTimeout(400); });
  await shot('m-fiche', M, async (p) => { await p.goto(BASE + '/carte'); await p.click('.pcard [data-open="pizza-reine"]'); await p.waitForTimeout(500); });
  await shot('m-suivi', M, async (p) => {
    await p.goto(BASE + '/carte'); await p.click('.pcard [data-open="burger"]'); await p.waitForTimeout(300); await p.click('[data-add]'); await p.waitForTimeout(300);
    await p.goto(BASE + '/commande'); await p.fill('[name=firstName]', 'Nora'); await p.fill('[name=phone]', '06 39 98 12 34');
    await p.check('[name=pay][value=sur-place]', { force: true }); await p.click('[data-pay]'); await p.waitForURL(/suivi/);
    await p.evaluate(() => { const o = myLiveOrder(); setStatus(o, 'preparation', true); }); await p.reload();
  });
  await b.close();
})();
