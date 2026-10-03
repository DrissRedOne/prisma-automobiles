// Débordements horizontaux et éléments hors écran sur plusieurs tailles.
const { chromium } = require('playwright-core');
const base = process.argv[2] || 'http://localhost:8811';
const out = '/tmp/clos-tailles';
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const sizes = [[320, 640, true], [375, 667, true], [768, 1024, true], [1024, 768, false], [1280, 720, false], [1920, 1080, false], [2560, 1440, false]];
  for (const [w, h, mob] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('clos-intro', '1'); } catch (e) {} });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    const lines = [];
    for (const p of ['/', '/la-carte', '/bar-a-vins', '/privatisation', '/infos']) {
      await page.goto(base + p); await page.waitForTimeout(900);
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } });
      await page.waitForTimeout(500);
      const r = await page.evaluate(() => {
        const W = document.documentElement.clientWidth, off = [];
        document.querySelectorAll('main *, header *, footer *').forEach(el => {
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          if (el.closest('.marquee, .gallery, .menu, .dish-preview, .wordmark, .sprite, .hero__media, .phero__bg, .lost__bg, .plan__map, .subnav__list')) return;
          if (b.right > W + 1 || b.left < -1) off.push((el.className && el.className.baseVal === undefined ? el.className : el.tagName).toString().slice(0, 40) + ' [' + Math.round(b.left) + ',' + Math.round(b.right) + ']');
        });
        return { sw: document.documentElement.scrollWidth - W, off: [...new Set(off)].slice(0, 6) };
      });
      lines.push(`${p} débord=${r.sw}${r.off.length ? ' hors-écran: ' + r.off.join(' ; ') : ''}`);
      if (p === '/') { await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(700); await page.screenshot({ path: `${out}/accueil-${w}.jpg`, type: 'jpeg', quality: 55 }); }
    }
    console.log(`${w}x${h} : ` + (errs.length ? 'ERREURS ' + errs.join(' | ') : 'sans erreur'));
    lines.forEach(l => console.log('   ' + l));
    await ctx.close();
  }
  await browser.close();
})();
