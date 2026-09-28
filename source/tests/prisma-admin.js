const { chromium } = require('playwright-core');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const SHOTS = path.resolve(__dirname, '../shots');
const errors = [];
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const d = await ctx.newPage();
  d.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  d.on('console', (m) => { if (m.type() === 'error' && !/ERR_|net::|Failed to load resource|GPU stall|WebGL/.test(m.text())) errors.push('console: ' + m.text()); });
  await d.goto(FILE + '#/gestion');
  await d.waitForTimeout(500);
  // Remise des clés depuis le tableau de bord
  const dep = await d.$('[data-act="checkout"]');
  if (dep) {
    const id = await dep.getAttribute('data-id');
    await dep.click(); await d.waitForTimeout(300);
    await d.check('.overlay input[name=docs]'); await d.check('.overlay input[name=deposit]');
    await d.click('.overlay [data-ok]'); await d.waitForTimeout(400);
    const st = await d.evaluate((i) => db.reservations.find((r) => r.id === i).status, id);
    console.log('après remise :', st);
  } else console.log('pas de départ aujourd’hui');
  // Retour d'un véhicule avec kilomètres et carburant manquant
  const ret = await d.$('[data-act="checkin"]');
  const rid = await ret.getAttribute('data-id');
  await ret.click(); await d.waitForTimeout(300);
  const out = await d.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { km: (r.checkout || {}).km, inc: r.quote.kmIncluded }; }, rid);
  await d.fill('.overlay input[name=km]', String(out.km + (out.inc || 500) + 120));
  await d.selectOption('.overlay select[name=fuel]', '5');
  await d.waitForTimeout(200);
  await d.screenshot({ path: path.join(SHOTS, 'a01-retour.png') });
  await d.click('.overlay [data-ok]'); await d.waitForTimeout(400);
  const res = await d.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { st: r.status, extras: r.checkin.extras, bal: balance(r) }; }, rid);
  console.log('après retour :', JSON.stringify(res));
  await d.evaluate((i) => openDocument(db.reservations.find((x) => x.id === i), 'facture'), rid);
  await d.waitForTimeout(300);
  await d.screenshot({ path: path.join(SHOTS, 'a02-facture.png') });
  // Logiciel sur téléphone
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR' });
  const p = await m.newPage();
  p.on('pageerror', (e) => errors.push('pageerror(m): ' + e.message));
  await p.goto(FILE + '#/gestion'); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(SHOTS, 'a03-mobile-tableau.png') });
  await p.evaluate(() => { location.hash = '#/gestion/planning'; }); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(SHOTS, 'a04-mobile-planning.png') });
  console.log(errors.length ? errors.join('\n') : 'aucune erreur JavaScript');
  await browser.close();
})().catch((e) => { console.error('ÉCHEC', e.message); process.exit(1); });
