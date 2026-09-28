// Vérification de l'application installable : service worker, critères d'installation, hors connexion, mise à jour
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const URL = 'http://127.0.0.1:8765/';
const PWA_DIR = path.resolve(__dirname, '../out/pwa');
const SHOTS = path.resolve(__dirname, '../shots');
const checks = [];
const errors = [];
const ok = (label, cond, extra = '') => checks.push(`${cond ? 'OK ' : 'ÉCHEC'} ${label}${extra ? ' · ' + extra : ''}`);
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ARGS = ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--bypass-app-banner-engagement-checks'];
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, args: ARGS });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g|ERR_CERT|net::ERR_INTERNET_DISCONNECTED|Failed to load resource/.test(m.text())) errors.push('console: ' + m.text()); });
  await p.goto(URL);
  await p.waitForTimeout(1500);

  // 1. Service worker actif et contrôle de la page après rechargement
  const reg = await p.evaluate(async () => { const r = await navigator.serviceWorker.ready; return { scope: r.scope, active: !!r.active }; });
  ok('service worker enregistré et actif', reg.active, reg.scope);
  await p.reload();
  await p.waitForTimeout(1200);
  ok('la page est servie par le service worker', await p.evaluate(() => !!navigator.serviceWorker.controller));
  const cached = await p.evaluate(async () => { const keys = await caches.keys(); const c = await caches.open(keys.find((k) => k.startsWith('prisma-app-'))); return (await c.keys()).map((r) => new URL(r.url).pathname); });
  ok('coquille de l’application en cache', cached.includes('/index.html') && cached.includes('/manifest.webmanifest') && cached.includes('/icons/icon-512.png'), cached.join(' '));

  // 2. Manifeste et critères d'installation vus par Chrome
  const cdp = await ctx.newCDPSession(p);
  const man = await cdp.send('Page.getAppManifest');
  ok('manifeste lu sans erreur', man.errors.length === 0, man.errors.map((e) => e.message).join(' | '));
  const inst = await cdp.send('Page.getInstallabilityErrors');
  ok('Chrome considère l’application installable', inst.installabilityErrors.length === 0, inst.installabilityErrors.map((e) => e.errorId).join(', '));
  const m = JSON.parse(fs.readFileSync(path.join(PWA_DIR, 'manifest.webmanifest'), 'utf8'));
  for (const i of [...m.icons, ...(m.screenshots || [])]) {
    const r = await p.evaluate(async (src) => { const res = await fetch(src); const b = await res.blob(); const img = await createImageBitmap(b); return { st: res.status, w: img.width, h: img.height }; }, i.src);
    ok(`image du manifeste ${i.src}`, r.st === 200 && `${r.w}x${r.h}` === i.sizes, `${r.st} ${r.w}x${r.h}`);
  }
  // écrans de démarrage iPhone déclarés et présents
  const splash = await p.$$eval('link[rel="apple-touch-startup-image"]', (ls) => ls.map((l) => l.getAttribute('href')));
  let splashOk = splash.length >= 10;
  for (const s of splash) if (!fs.existsSync(path.join(PWA_DIR, s))) splashOk = false;
  ok('écrans de démarrage iPhone', splashOk, splash.length + ' fichiers');

  // 3. Bouton d'installation (Android : événement beforeinstallprompt)
  await p.waitForTimeout(800);
  const btn = await p.$('.demo-install');
  const visible = btn && await btn.isVisible();
  ok('bouton « Installer l’app » visible (Android)', !!visible);
  await p.screenshot({ path: path.join(SHOTS, 'pwa-android-accueil.png') });

  // 4. Hors connexion : l'application s'ouvre et fonctionne
  await ctx.setOffline(true);
  await p.reload();
  await p.waitForTimeout(1500);
  ok('ouverture hors connexion', await p.$('.hero2') !== null);
  await p.click('.search-card button[type=submit]');
  await p.waitForTimeout(700);
  ok('recherche de véhicules hors connexion', (await p.$$('.rcard')).length > 3);
  await p.goto(URL + '#/gestion');
  await p.waitForTimeout(1200);
  ok('logiciel du loueur hors connexion', await p.$('.admin') !== null);
  await p.screenshot({ path: path.join(SHOTS, 'pwa-horsligne-gestion.png') });
  await ctx.setOffline(false);

  // 5. Mise à jour : nouvelle version publiée -> bandeau « Actualiser » -> rechargement sur la nouvelle version
  const swPath = path.join(PWA_DIR, 'sw.js');
  const original = fs.readFileSync(swPath, 'utf8');
  fs.writeFileSync(swPath, original.replace(/const VERSION = '([^']+)'/, "const VERSION = '$1-test'"));
  await p.goto(URL);
  await p.waitForTimeout(1500);
  await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
  await p.waitForSelector('.update-bar', { timeout: 20000 }).catch(() => {});
  ok('bandeau de mise à jour affiché', await p.$('.update-bar') !== null);
  await p.screenshot({ path: path.join(SHOTS, 'pwa-mise-a-jour.png') });
  if (await p.$('.update-bar')) {
    await Promise.all([p.waitForEvent('load', { timeout: 20000 }).catch(() => null), p.click('.update-bar button')]);
    await p.waitForTimeout(1500);
    const keys = await p.evaluate(() => caches.keys());
    ok('nouvelle version active après « Actualiser »', keys.some((k) => k.endsWith('-test')) && !keys.some((k) => k.startsWith('prisma-app-') && !k.endsWith('-test')), keys.join(', '));
  }
  fs.writeFileSync(swPath, original);
  await ctx.close();

  // 6. iPhone : pas d'événement d'installation, le bouton ouvre le mode d'emploi
  const ios = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'fr-FR',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await ios.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const q = await ios.newPage();
  q.on('pageerror', (e) => errors.push('ios pageerror: ' + e.message));
  await q.goto(URL);
  // invitation discrète sur l'accueil après quelques secondes
  await q.waitForTimeout(10000);
  ok('iPhone : carte d’invitation sur l’accueil', await q.$('.install-card') !== null);
  await q.screenshot({ path: path.join(SHOTS, 'pwa-iphone-invitation.png') });
  if (await q.$('.install-card')) await q.click('.install-card [data-x]');
  await q.reload();
  await q.waitForTimeout(10500);
  ok('invitation non répétée après « Plus tard »', await q.$('.install-card') === null);
  ok('iPhone : bouton « Installer l’app » visible', await q.isVisible('.demo-install'));
  await q.click('.demo-install');
  await q.waitForTimeout(500);
  const txt = await q.$eval('.overlay', (e) => e.innerText).catch(() => '');
  ok('iPhone : mode d’emploi « Sur l’écran d’accueil »', /Sur l’écran d’accueil/.test(txt));
  await q.screenshot({ path: path.join(SHOTS, 'pwa-iphone-mode-emploi.png') });
  await q.click('.overlay [data-close]');
  await ios.close();

  // 7. Mode application (standalone) : plus de bouton d'installation
  const app = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, locale: 'fr-FR' });
  await app.addInitScript(() => {
    try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {}
    const mm = window.matchMedia.bind(window);
    window.matchMedia = (q) => (q.includes('display-mode: standalone') ? { matches: true, media: q, addEventListener() {}, removeEventListener() {} } : mm(q));
  });
  const s = await app.newPage();
  await s.goto(URL);
  await s.waitForTimeout(1000);
  ok('mode application : bouton d’installation masqué', !(await s.isVisible('.demo-install')));
  await app.close();

  // 8. Version fichier unique : aucune trace de PWA
  const file = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await file.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const f = await file.newPage();
  const ferr = [];
  f.on('pageerror', (e) => ferr.push(e.message));
  await f.goto('file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html'));
  await f.waitForTimeout(1200);
  ok('fichier unique : pas de bouton d’installation, pas d’erreur', !(await f.isVisible('.demo-install')) && ferr.length === 0 && !(await f.evaluate(() => !!navigator.serviceWorker && !!navigator.serviceWorker.controller)));
  await file.close();

  console.log(checks.join('\n'));
  console.log(errors.length ? 'ERREURS :\n' + errors.join('\n') : 'aucune erreur JS');
  await browser.close();
})();
