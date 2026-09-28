// Relecture rapide du film : une image toutes les N secondes, planches contact de 5 colonnes.
// Usage : node review.js [--step=0.5] [--from=0] [--to=50] [--out=dossier]
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? '1']; }));
const step = Number(opt.step || 0.5), from = Number(opt.from || 0), to = Number(opt.to || 50);
const OUT = path.resolve(opt.out || 'review');
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--lang=fr-FR'] });
  const vert = opt.format === 'vertical';
  const page = await browser.newPage({ viewport: vert ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(`http://127.0.0.1:8766/video/compo.html?mb=1${opt.cut ? '&cut=' + opt.cut : ''}${vert ? '&format=vertical' : ''}`);
  await page.evaluate(() => window.READY);
  const cdp = await page.context().newCDPSession(page);
  const files = [];
  for (let t = from; t < to - 1e-6; t += step) {
    const tt = Math.round(t * 1000) / 1000;
    await page.evaluate((x) => { window.seek(x); const gl = E.renderer.getContext(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4)); }, tt);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    const f = path.join(OUT, `r${String(Math.round(tt * 1000)).padStart(6, '0')}.jpg`);
    fs.writeFileSync(f, Buffer.from(data, 'base64'));
    files.push(f);
  }
  await browser.close();
  if (errs.length) console.log('erreurs :', errs.slice(0, 5));
  execFileSync('python3', ['-c', `
import sys, math
from PIL import Image, ImageDraw
fs=sys.argv[2:]; out=sys.argv[1]
vert=Image.open(fs[0]).height>Image.open(fs[0]).width
per=25 if not vert else 24; cols=5 if not vert else 8; w,h=(384,216) if not vert else (216,384)
for s in range(0, len(fs), per):
    grp=fs[s:s+per]; rows=math.ceil(len(grp)/cols)
    sheet=Image.new('RGB',(cols*(w+6)+6, rows*(h+6)+6),(40,40,40))
    for i,f in enumerate(grp):
        im=Image.open(f).resize((w,h)); x=6+(i%cols)*(w+6); y=6+(i//cols)*(h+6); sheet.paste(im,(x,y))
        t=int(f.split('/r')[-1].split('.')[0])/1000; ImageDraw.Draw(sheet).text((x+6,y+4),f'{t:.1f}s',fill=(255,90,90))
    sheet.save(out+f'/planche-{s//per+1}.jpg',quality=85)
print('ok')
`, OUT, ...files]);
})();
