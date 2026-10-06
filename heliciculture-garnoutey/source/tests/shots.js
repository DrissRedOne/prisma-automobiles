// Captures écran par écran (bureau et mobile) + erreurs de console, requêtes en échec.
// Usage : node shots.js <base> <dossier-sortie> [pages...]
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const base = process.argv[2] || 'http://localhost:8811';
const outDir = process.argv[3] || '/tmp/garnoutey-shots';
const pages = process.argv.slice(4).length ? process.argv.slice(4) : ['/', '/l-elevage', '/nos-escargots', '/recettes', '/contact', '/mentions-legales', '/404'];
const VIEWS = { desk: { width: 1440, height: 900, isMobile: false, hasTouch: false }, mob: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };
fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const report = [];
  for (const [vname, v] of Object.entries(VIEWS)) {
    for (const p of pages) {
      const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: v.deviceScaleFactor || 1, locale: 'fr-FR' });
      const page = await ctx.newPage();
      const errs = [];
      page.on('console', m => { if (['error', 'warning'].includes(m.type())) errs.push(m.type() + ': ' + m.text()); });
      page.on('pageerror', e => errs.push('pageerror: ' + e.message));
      page.on('requestfailed', r => errs.push('failed: ' + r.url() + ' ' + (r.failure() && r.failure().errorText)));
      page.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('/404')) errs.push('http ' + r.status() + ': ' + r.url()); });
      await page.goto(base + p, { waitUntil: 'load' });
      await page.waitForTimeout(p === '/' ? 3600 : 1600);
      const slug = (p === '/' ? 'accueil' : p.slice(1).replace(/\//g, '_')) + '-' + vname;
      const H = await page.evaluate(() => document.documentElement.scrollHeight);
      let y = 0, i = 0;
      const files = [];
      while (true) {
        await page.evaluate(yy => window.scrollTo(0, yy), y);
        await page.waitForTimeout(1300);
        const f = path.join(outDir, `${slug}-${String(i).padStart(2, '0')}.jpg`);
        await page.screenshot({ path: f, type: 'jpeg', quality: 70 });
        files.push(f);
        const H2 = await page.evaluate(() => document.documentElement.scrollHeight);
        if (y + v.height >= H2 || i > 40) break;
        y += Math.round(v.height * 0.85); i++;
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      report.push({ page: p, view: vname, height: H, shots: files.length, overflowX: overflow, errors: errs });
      await ctx.close();
    }
  }
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 1));
  for (const r of report) console.log(r.view, r.page, 'h=' + r.height, 'shots=' + r.shots, 'overflowX=' + r.overflowX, r.errors.length ? '\n   ' + r.errors.join('\n   ') : '');
  await browser.close();
})();
