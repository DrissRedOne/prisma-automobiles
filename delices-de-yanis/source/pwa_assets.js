/* =====================================================================
   ICÔNES ET ÉCRANS DE DÉMARRAGE DE L'APPLICATION INSTALLABLE
   Tout part de la pastille du logo (src/icons.js, logoMark) dessinée
   par le navigateur : icônes « any » (fond transparent), « maskable »
   et Apple (fond plein), favicon, écrans de démarrage de l'iPhone.
   Écrit dans pwa-assets/icons, pwa-assets/splash et pwa-assets/splash.json.
   Usage : node pwa_assets.js
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { chromium } = require(require.resolve('playwright-core', { paths: [path.join(__dirname, 'tests')] }));

const OUT = path.join(__dirname, 'pwa-assets');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'src', 'icons.js'), 'utf8'), ctx);
const mark = (size) => ctx.logoMark(size);
const font = (f) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(__dirname, 'fonts', f)).toString('base64');
const FONTS = `@font-face{font-family:"Anton";src:url(${font('anton-latin.woff2')}) format("woff2")}
@font-face{font-family:"Inter";font-weight:400 800;src:url(${font('inter-latin.woff2')}) format("woff2")}`;

// iPhone en portrait : (largeur, hauteur en points CSS, densité)
const SPLASH = [[440, 956, 3], [402, 874, 3], [430, 932, 3], [393, 852, 3], [428, 926, 3], [390, 844, 3], [375, 812, 3], [414, 896, 3], [414, 896, 2], [414, 736, 3], [375, 667, 2]];

(async () => {
  fs.mkdirSync(path.join(OUT, 'icons'), { recursive: true });
  fs.rmSync(path.join(OUT, 'splash'), { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'splash'), { recursive: true });
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const shot = async (html, w, h, file, { dpr = 1, transparent = false, jpeg = false } = {}) => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;${transparent ? 'background:transparent' : ''}}svg{display:block}</style></head><body>${html}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot(jpeg ? { path: file, type: 'jpeg', quality: 88 } : { path: file, omitBackground: transparent });
    await page.close();
  };
  const center = (inner, bg = 'transparent') => `<div style="width:100%;height:100%;display:grid;place-items:center;background:${bg}">${inner}</div>`;
  const icons = path.join(OUT, 'icons');
  // « any » : la pastille ronde, fond transparent, légère marge
  for (const [s, file, k] of [[512, 'icon-512.png', 0.94], [192, 'icon-192.png', 0.94], [96, 'icon-96.png', 0.94], [32, 'favicon-32.png', 1], [48, 'favicon-48.png', 1]]) {
    await shot(center(mark(Math.round(s * k))), s, s, path.join(icons, file), { transparent: true });
  }
  // « maskable » et Apple : fond plein couleur tomate, la pastille se fond dans le fond, l'anneau reste dans la zone sûre
  await shot(center(mark(Math.round(512 * 0.8)), '#E2432A'), 512, 512, path.join(icons, 'maskable-512.png'));
  await shot(center(mark(Math.round(192 * 0.8)), '#E2432A'), 192, 192, path.join(icons, 'maskable-192.png'));
  await shot(center(mark(Math.round(180 * 0.9)), '#E2432A'), 180, 180, path.join(icons, 'apple-touch-icon.png'));

  // écrans de démarrage (iPhone) : crème, halo safran, pastille et nom
  const index = [];
  for (const [w, h, r] of SPLASH) {
    const m = Math.round(w * 0.3);
    const html = `<div style="position:relative;width:100%;height:100%;background:radial-gradient(${w * 1.1}px ${h * 0.55}px at 50% 42%,rgba(255,90,31,.34),transparent 62%),#1a0c06;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(w * 0.05)}px;font-family:'Anton',sans-serif;color:#fff3e2">
      ${mark(m)}
      <div style="text-align:center;line-height:1"><div style="font:800 ${Math.round(w * 0.03)}px Inter,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#ffc21a">Les Délices</div><div style="margin-top:${Math.round(w * 0.015)}px;font-size:${Math.round(w * 0.13)}px;text-transform:uppercase;letter-spacing:.01em">de Yanis</div></div>
    </div>`;
    const file = `splash-${w * r}x${h * r}.jpg`;
    await shot(html, w, h, path.join(OUT, 'splash', file), { dpr: r, jpeg: true });
    index.push({ file, w, h, r });
  }
  fs.writeFileSync(path.join(OUT, 'splash.json'), JSON.stringify(index, null, 1));
  await browser.close();
  console.log('icônes', fs.readdirSync(icons).sort().join(', '));
  console.log('écrans de démarrage', index.length);
})().catch((e) => { console.error(e); process.exit(1); });
