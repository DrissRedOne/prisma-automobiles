// Rendu image par image du film : node render.js [--from=0] [--to=1500] [--workers=2] [--mb=4] [--out=frames]
// Chaque image est écrite en PNG (f00000.png…) ; les images déjà présentes sont sautées (reprise possible).
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? '1']; }));
const FPS = 30;
const OUT = path.resolve(opt.out || 'frames');
fs.mkdirSync(OUT, { recursive: true });
const from = Number(opt.from || 0);
const to = Number(opt.to || 1500);
const name = (i) => path.join(OUT, `f${String(i).padStart(5, '0')}.png`);

async function worker(frames) {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--lang=fr-FR'] });
  const vert = opt.format === 'vertical';
  const page = await browser.newPage({ viewport: vert ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('pageerror', e.message));
  const qs = new URLSearchParams({ ...(opt.mb ? { mb: opt.mb } : {}), ...(opt.cut ? { cut: opt.cut } : {}), ...(vert ? { format: 'vertical' } : {}) }).toString();
  await page.goto(`http://127.0.0.1:8766/video/compo.html${qs ? '?' + qs : ''}`);
  await page.evaluate(() => window.READY);
  const cdp = await page.context().newCDPSession(page);
  for (const i of frames) {
    if (fs.existsSync(name(i))) continue;
    const t0 = Date.now();
    await page.evaluate((t) => { window.seek(t); const gl = E.renderer.getContext(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4)); }, i / FPS);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true });
    fs.writeFileSync(name(i) + '.tmp', Buffer.from(data, 'base64'));
    fs.renameSync(name(i) + '.tmp', name(i));
    process.stdout.write(`${i} ${Date.now() - t0}ms\n`);
  }
  await browser.close();
}

if (opt.worker) {
  const list = opt.list.split(',').map(Number);
  worker(list).then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
} else {
  const n = Number(opt.workers || 2);
  const todo = [];
  for (let i = from; i < to; i++) if (!fs.existsSync(name(i))) todo.push(i);
  console.log(`${todo.length} images à rendre avec ${n} processus`);
  const t0 = Date.now();
  let done = 0;
  const procs = [];
  for (let w = 0; w < n; w++) {
    const mine = todo.filter((_, k) => k % n === w);   // entrelacé : chaque processus avance sur tout le film
    if (!mine.length) continue;
    const pass = ['mb', 'cut', 'format'].filter((k) => opt[k]).map((k) => `--${k}=${opt[k]}`);
    const p = spawn(process.execPath, [__filename, '--worker', `--list=${mine.join(',')}`, `--out=${OUT}`, ...pass], { stdio: ['ignore', 'pipe', 'inherit'] });
    p.stdout.on('data', (d) => {
      done += String(d).trim().split('\n').length;
      if (done % 10 === 0 || done === todo.length) {
        const el = (Date.now() - t0) / 1000;
        console.log(`${done}/${todo.length}  ${(el / done).toFixed(2)} s/image  reste ~${Math.round((todo.length - done) * el / done / 60)} min`);
      }
    });
    procs.push(new Promise((res) => p.on('exit', res)));
  }
  Promise.all(procs).then(() => console.log(`terminé en ${Math.round((Date.now() - t0) / 1000)} s`));
}
