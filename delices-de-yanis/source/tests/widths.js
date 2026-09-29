// Contrôle des largeurs extrêmes : aucun défilement horizontal de 320 à 1920 px, captures de l'accueil et de la carte.
const { chromium } = require('playwright-core');
const BASE = process.env.BASE || 'http://127.0.0.1:8791';
const OUT = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const bad = [];
  for (const w of [320, 360, 414, 768, 1024, 1180, 1440, 1920]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
    const p = await ctx.newPage();
    for (const u of ['/', '/carte', '/infos', '/pizza-bordeaux', '/cuisine']) {
      await p.goto(BASE + u); await p.waitForTimeout(150);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 0) bad.push(`${w}px ${u} : ${over}px`);
      // contenu rogné : élément visible qui dépasse la fenêtre sans être dans une zone qui défile exprès
      const clipped = await p.evaluate(() => {
        const W = document.documentElement.clientWidth; const out = [];
        const scrolls = (el) => { for (let e = el.parentElement; e; e = e.parentElement) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowX)) return true; } return false; };
        for (const el of document.querySelectorAll('#app *')) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || r.right <= W + 1 || r.left >= W) continue;
          const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.position === 'fixed') continue;
          if (el.closest('.float, .cta-band, .hero-art')) continue; // décor volontairement débordant
          if (scrolls(el)) continue;
          out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} (${Math.round(r.right - W)}px)`);
        }
        return [...new Set(out)].slice(0, 5);
      });
      if (clipped.length) bad.push(`${w}px ${u} rogné : ${clipped.join(', ')}`);
      if (OUT && [320, 768, 1920].includes(w) && ['/', '/carte'].includes(u)) await p.screenshot({ path: `${OUT}/w${w}${u === '/' ? '-accueil' : '-carte'}.jpg`, type: 'jpeg', quality: 70 });
    }
    await ctx.close();
  }
  await b.close();
  console.log(bad.length ? 'DÉBORDEMENTS\n' + bad.join('\n') : 'aucun débordement de 320 à 1920 px');
})();
