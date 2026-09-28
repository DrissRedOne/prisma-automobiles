// Capture de l'appli sur téléphone, affichée dans le téléphone de la carte « application » de l'accueil.
// Usage : node app-shot.js  (après python3 build.py), puis python3 build.py --publier
const { chromium } = require('playwright-core');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const OUT = path.resolve(__dirname, '../out/app-scroll.png');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true, locale: 'fr-FR', timezoneId: 'Europe/Paris', reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const p = await ctx.newPage();
  await p.goto(FILE);
  await p.waitForTimeout(1200);
  // l'appli telle qu'un client la voit : sans le bandeau de démonstration, ni boutons flottants, ni cartes promo
  await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}.demo-bar,.fab-wa,.fab-top,.install-card,.toasts{display:none!important}section:has(.promos),.tagline{display:none!important}' });
  await p.evaluate(() => { document.querySelectorAll('[data-reveal],[data-words]').forEach((e) => e.classList.add('in')); window.scrollTo(0, 0); });
  await p.waitForTimeout(1800);
  const h = await p.evaluate(() => { const c = document.querySelector('#vehicules .rgrid .rcard:nth-child(3)'); return Math.round(c.getBoundingClientRect().bottom + window.scrollY + 24); });
  await p.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 390, height: h }, fullPage: true });
  console.log('capture', OUT, '390 x', h);
  await browser.close();
})();
