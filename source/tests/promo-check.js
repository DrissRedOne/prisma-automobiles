const { chromium } = require('playwright-core');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const errs = [];
  for (const [dev, opts] of [['d', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const ctx = await browser.newContext({ ...opts, locale: 'fr-FR' });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(FILE); await p.waitForTimeout(800);
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    const promos = await p.$('.promos');
    await promos.scrollIntoViewIfNeeded();
    await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('in')));
    await p.waitForTimeout(1500);
    await promos.screenshot({ path: path.resolve(__dirname, `../out/_promo-${dev}-a.png`) });
    await p.waitForTimeout(9000);   // le téléphone a défilé
    await promos.screenshot({ path: path.resolve(__dirname, `../out/_promo-${dev}-b.png`) });
    const gap = await p.evaluate(() => { const c = document.querySelector('.promo-app'); const ph = c.querySelector('.phone').getBoundingClientRect(); const h3 = c.querySelector('h2').getBoundingClientRect(); const pp = c.querySelector('.promo-copy p').getBoundingClientRect(); const b = c.querySelector('.btn-line').getBoundingClientRect(); return { phoneBas: Math.round(ph.bottom), titreHaut: Math.round(h3.top), texteBas: Math.round(pp.bottom), boutonHaut: Math.round(b.top) }; });
    console.log(dev, JSON.stringify(gap), 'écart téléphone/titre', gap.titreHaut - gap.phoneBas, 'px, écart texte/bouton', gap.boutonHaut - gap.texteBas, 'px');
    await ctx.close();
  }
  console.log(errs.length ? errs.join('\n') : 'aucune erreur JS');
  await browser.close();
})();
