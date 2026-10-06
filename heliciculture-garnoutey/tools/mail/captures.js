// Captures du site en ligne pour les visuels du mail (sans l'intro, animations terminées, vidéo lancée).
const { chromium } = require('/home/user/heliciculture-garnoutey/source/tests/node_modules/playwright-core');
const base = process.argv[2] || 'https://heliciculture-garnoutey.vercel.app';
const out = __dirname + '/shots';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
  const shots = [
    ['accueil-desk', '/', { width: 1440, height: 900 }, 1, false, 0],
    ['accueil-mob', '/', { width: 390, height: 844 }, 3, true, 0],
    ['escargots-mob', '/nos-escargots#particuliers', { width: 390, height: 844 }, 3, true, 0],
    ['recette-desk', '/recettes#preparer', { width: 1440, height: 900 }, 1, false, 0],
    ['contact-mob', '/contact#commande', { width: 390, height: 844 }, 3, true, 0],
  ];
  for (const [name, path, vp, dpr, mob] of shots) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dpr, isMobile: mob, hasTouch: mob });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('garnoutey-intro', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(4200);
    // masquer la barre « Commander » du mobile et le bouton pause : inutiles sur une image
    await p.addStyleTag({ content: '.book{display:none!important}.vid__btn{display:none!important}' });
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${out}/${name}.png` });
    await ctx.close();
  }
  await b.close();
})();
