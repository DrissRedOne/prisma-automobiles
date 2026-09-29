const { chromium } = require('playwright-core');
const BASE = 'http://127.0.0.1:8791'; const OUT = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  for (const [name, dev] of [['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }], ['desktop', { viewport: { width: 1366, height: 900 } }]]) {
    const ctx = await b.newContext({ ...dev, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
    await ctx.clock.install({ time: new Date('2026-09-29T19:30:00+02:00') });
    const p = await ctx.newPage();
    await p.goto(BASE + '/carte');
    await p.click('.pcard [data-open="burger"]'); await p.waitForTimeout(300); await p.click('[data-add]'); await p.waitForTimeout(300);
    await p.goto(BASE + '/commande');
    await p.fill('[name=firstName]', 'Nora'); await p.fill('[name=phone]', '06 39 98 12 34');
    await p.check('[name=pay][value=sur-place]', { force: true }); await p.click('[data-pay]'); await p.waitForURL(/suivi/);
    await p.goto(BASE + '/'); await p.waitForTimeout(600);
    await p.screenshot({ path: `${OUT}/${name}-live.jpg`, type: 'jpeg', quality: 80 });
    // la cuisine termine la commande
    await p.evaluate(() => { const o = myLiveOrder(); for (const st of ['preparation', 'prete', 'terminee']) setStatus(o, st, true); });
    await p.goto(BASE + '/'); await p.waitForTimeout(600);
    await p.screenshot({ path: `${OUT}/${name}-again.jpg`, type: 'jpeg', quality: 80 });
    await p.goto(BASE + '/cuisine'); await p.fill('[name=login]', 'yanis'); await p.fill('[name=pw]', 'Palais2026'); await p.click('[data-login] button[type=submit]'); await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/${name}-cuisine.jpg`, type: 'jpeg', quality: 80 });
    await ctx.close();
  }
  await b.close();
})();
