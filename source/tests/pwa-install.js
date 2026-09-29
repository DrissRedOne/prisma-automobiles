// Installabilité dans un profil normal (hors navigation privée) : critères Chrome + bouton + fenêtre d'installation
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const os = require('os');
// le site construit, servi comme sur Vercel
const server = require('child_process').spawn('node', [path.join(__dirname, 'serve.js'), path.resolve(__dirname, '../out/web'), '8765'], { stdio: 'ignore' });
(async () => {
  await new Promise((r) => setTimeout(r, 600));
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'prisma-profile-'));
  const ctx = await chromium.launchPersistentContext(dir, {
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--bypass-app-banner-engagement-checks'],
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
  });
  await ctx.addInitScript(() => {
    try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {}
    window.__bip = 0; window.__prompts = 0;
    window.addEventListener('beforeinstallprompt', () => { window.__bip++; });
    const P = window.BeforeInstallPromptEvent && BeforeInstallPromptEvent.prototype;
    if (P) { const orig = P.prompt; P.prompt = function () { window.__prompts++; return orig.call(this); }; }
  });
  const p = ctx.pages()[0] || await ctx.newPage();
  await p.goto('http://127.0.0.1:8765/');
  await p.waitForTimeout(2500);
  const cdp = await ctx.newCDPSession(p);
  const inst = await cdp.send('Page.getInstallabilityErrors');
  console.log(inst.installabilityErrors.length ? 'ÉCHEC installable : ' + inst.installabilityErrors.map((e) => e.errorId).join(', ') : 'OK  Chrome considère l’application installable');
  await p.reload();
  await p.waitForTimeout(2500);
  const vis = await p.isVisible('.demo-install');
  console.log((vis ? 'OK ' : 'ÉCHEC') + ' bouton « Installer l’app » visible (Android)');
  const fired = await p.evaluate(() => !!PWA.prompt);
  console.log((fired ? 'OK ' : 'ÉCHEC') + ' événement d’installation capté');
  await p.screenshot({ path: path.resolve(__dirname, '../shots/pwa-android-accueil.png') });
  if (vis) {
    await p.click('.demo-install');
    await p.waitForTimeout(1500);
    console.log('après clic :', JSON.stringify(await p.evaluate(() => ({ prompts: window.__prompts, events: window.__bip, card: !!document.querySelector('.install-card'), invite: localStorage.getItem('prisma-install-invite') }))));
  }
  await ctx.close();
  server.kill();
})();
