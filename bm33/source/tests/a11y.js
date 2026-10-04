// Audit d'accessibilité (axe-core, règles WCAG 2.1 A/AA) + poids du premier chargement.
const { chromium } = require('playwright-core');
const fs = require('fs');
const base = process.argv[2] || 'http://localhost:8833';
const axe = fs.readFileSync('/home/user/clos-restaurant/tools/node_modules/axe-core/axe.min.js', 'utf8');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844, isMobile: true }]) {
    for (const p of ['/', '/vehicules', '/vehicules/porsche-macan-2-0-pdk-2022', '/vehicules/volkswagen-golf-8-r-line-1-5-etsi-2021', '/vehicules/tesla-model-3-propulsion-2022', '/vendre-ma-voiture', '/recherche', '/contact', '/mentions-legales', '/404']) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, reducedMotion: 'reduce', bypassCSP: true });
      const page = await ctx.newPage();
      let bytes = 0; const byType = {};
      page.on('response', async r => { try { const b = (await r.body()).length; bytes += b; const t = r.request().resourceType(); byType[t] = (byType[t] || 0) + b; } catch (e) {} });
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const first = bytes;
      // révéler tout le contenu avant l'audit (défilement complet)
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(600);
      await page.addScriptTag({ content: axe });
      const res = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } }));
      const v = res.violations.map(x => `${x.impact} ${x.id} (${x.nodes.length}) ${x.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
      console.log(`${vp.width}px ${p} : premier chargement ${(first / 1024).toFixed(0)} Ko [${Object.entries(byType).map(([k, b]) => k + ' ' + (b / 1024).toFixed(0)).join(', ')}] ; ${v.length} problème(s)`);
      v.forEach(x => console.log('   ' + x));
      await ctx.close();
    }
  }
  await browser.close();
})();
