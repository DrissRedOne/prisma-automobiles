// Aperçu : rend quelques instants du film et les assemble en planche contact.
// Usage : node preview.js 1.5 4 6.2 [--mb=1] [--out=planche.jpg] [--full]
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const opt = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => { const [k, v] = a.slice(2).split('='); return [k, v ?? '1']; }));
const times = args.filter((a) => !a.startsWith('--')).map(Number);
const OUT = opt.out || path.join(process.env.PREVIEW_DIR || '/tmp', 'planche.jpg');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--lang=fr-FR'] });
  const vert = opt.format === 'vertical';
  const page = await browser.newPage({ viewport: vert ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const logs = [];
  page.on('console', (m) => logs.push(m.type() + ': ' + m.text()));
  page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
  const qs = new URLSearchParams({ ...(opt.mb ? { mb: opt.mb } : {}), ...(opt.cut ? { cut: opt.cut } : {}), ...(vert ? { format: 'vertical' } : {}) }).toString();
  const url = `http://127.0.0.1:8766/video/compo.html${qs ? '?' + qs : ''}`;
  const t0 = Date.now();
  await page.goto(url);
  try { await page.evaluate(() => window.READY); } catch (e) { console.log('READY a échoué', e.message); }
  console.log('chargement', Date.now() - t0, 'ms');
  const shots = [];
  for (const t of times) {
    const ms = await page.evaluate((tt) => window.seek(tt), t);
    const s0 = Date.now();
    const buf = await page.screenshot({ type: 'png' });
    console.log(`t=${t} rendu ${Math.round(ms)} ms, capture ${Date.now() - s0} ms`);
    const f = OUT.replace(/\.jpg$/, `-${t}.png`);
    fs.writeFileSync(f, buf);
    shots.push(f);
  }
  if (logs.length) console.log(logs.slice(0, 30).join('\n'));
  await browser.close();
  // planche contact (Python/PIL)
  const { execFileSync } = require('child_process');
  execFileSync('python3', ['-c', `
import sys
from PIL import Image, ImageDraw
fs=sys.argv[2:]; out=sys.argv[1]; full=${opt.full ? 'True' : 'False'}
ims=[Image.open(f).convert('RGB') for f in fs]
if full:
    for f,im in zip(fs,ims): im.save(f.replace('.png','.jpg'),quality=90)
vert=ims[0].height>ims[0].width
if vert:
    w=360; h=640; cols=min(5,len(ims))
else:
    w=960 if len(ims)>1 else 1920; h=w*9//16; cols=2 if len(ims)>1 else 1
rows=(len(ims)+cols-1)//cols
sheet=Image.new('RGB',(cols*w+(cols+1)*8, rows*h+(rows+1)*8),(40,40,40))
for i,im in enumerate(ims):
    im=im.resize((w,h),Image.LANCZOS); x=8+(i%cols)*(w+8); y=8+(i//cols)*(h+8); sheet.paste(im,(x,y))
    ImageDraw.Draw(sheet).text((x+10,y+10),fs[i].split('-')[-1].replace('.png','s'),fill=(255,80,80))
sheet.save(out,quality=88)
`, OUT, ...shots]);
  console.log('planche :', OUT);
})();
