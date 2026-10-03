// Captures du site en ligne pour les visuels du mail (sans l'intro, animations terminées).
const { chromium } = require('playwright-core');
const base = process.argv[2] || 'https://clos.reydenweb.fr';
const out = __dirname + '/shots';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const shots = [
    ['accueil-desk', '/', { width: 1440, height: 900 }, 1, false],
    ['accueil-mob', '/', { width: 390, height: 844 }, 3, true],
    ['bar-desk', '/bar-a-vins', { width: 1440, height: 900 }, 1, false],
    ['carte-mob', '/la-carte', { width: 390, height: 844 }, 3, true],
  ];
  for (const [name, path, vp, dpr, mob] of shots) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dpr, isMobile: mob, hasTouch: mob });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('clos-intro', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(3200);
    await p.screenshot({ path: `${out}/${name}.png` });
    await ctx.close();
  }
  await b.close();
})();
