// Captures haute définition de l'appli pour la vidéo (téléphone 1170 px de large, ordinateur 2880 px).
// Usage : node capture.js (après python3 ../build.py). Écrit dans assets/app/.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const OUT = path.resolve(__dirname, 'assets/app');
fs.mkdirSync(OUT, { recursive: true });
const HIDE = 'html{scroll-behavior:auto!important}.demo-bar,.fab-wa,.fab-top,.install-card,.toasts{display:none!important}';
async function prep(p, hash) {
  await p.goto(FILE + hash);
  await p.waitForTimeout(700);
  await p.addStyleTag({ content: HIDE });
  await p.evaluate(() => { document.querySelectorAll('[data-reveal],[data-words]').forEach((e) => e.classList.add('in')); window.scrollTo(0, 0); });
  await p.waitForTimeout(900);
}
async function slot(p, days, hhmm = '10:00') {
  return p.evaluate(([d, t]) => { let x = addDays(dayStart(new Date()), d); while (!openingFor(x)) x = addDays(x, 1); const [h, m] = t.split(':').map(Number); x.setHours(h, m, 0, 0); return toISO(x); }, [days, hhmm]);
}
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--lang=fr-FR'] });
  // ---------- Téléphone ----------
  const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'fr-FR', timezoneId: 'Europe/Paris', reducedMotion: 'reduce' });
  await m.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const p = await m.newPage();
  await prep(p, '#/');
  await p.screenshot({ path: `${OUT}/m-accueil.png` });
  // défilement de l'accueil dans le téléphone : en-tête capturé à part (il reste fixe),
  // puis la page capturée écran par écran et recollée (scripts/stitch.py)
  await p.addStyleTag({ content: 'section:has(.promos),.tagline{display:none!important}' });
  await p.waitForTimeout(400);
  await (await p.$('.site-header')).screenshot({ path: `${OUT}/m-header.png` });
  await p.addStyleTag({ content: '.site-header{visibility:hidden!important}' });
  const endY = await p.evaluate(() => { const c = document.querySelector('#vehicules .rgrid .rcard:nth-child(4)'); return Math.round(c.getBoundingClientRect().bottom + window.scrollY + 24); });
  fs.mkdirSync(`${OUT}/scroll`, { recursive: true });
  const parts = [];
  for (let y = 0; ; y += 560) {
    const yy = Math.min(y, endY - 844);
    await p.evaluate((v) => window.scrollTo(0, v), yy);
    await p.waitForTimeout(500);
    const real = await p.evaluate(() => Math.round(window.scrollY));
    const f = `${OUT}/scroll/${String(parts.length).padStart(2, '0')}.png`;
    await p.screenshot({ path: f });
    parts.push({ f, y: real });
    if (yy >= endY - 844) break;
  }
  fs.writeFileSync(`${OUT}/scroll/parts.json`, JSON.stringify({ endY, parts }));
  await p.evaluate(() => window.scrollTo(0, 0));
  // réservation : dates, catalogue, fiche, options, coordonnées, paiement, confirmation
  const from = await slot(p, 3, '10:00'), to = await slot(p, 6, '10:00');
  await p.evaluate(([f, t]) => { draft = { ...defaultSearch(), from: f, to: t, agencyStart: 'yvrac', agencyEnd: 'yvrac', vehicleId: null, options: {}, promo: null, customer: null, pro: false }; saveDraft(); ui.grp = 'all'; }, [from, to]);
  await prep(p, '#/vehicules/all');
  await p.screenshot({ path: `${OUT}/m-vehicules.png` });
  await prep(p, '#/vehicule/v-glc');
  await p.screenshot({ path: `${OUT}/m-fiche.png` });
  await p.evaluate(() => { draft.vehicleId = 'v-glc'; draft.options = { 'o-zero': 1, 'o-driver': 1 }; saveDraft(); });
  await prep(p, '#/options');
  await p.evaluate(() => window.scrollTo(0, 470)); await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/m-options.png` });
  await prep(p, '#/coordonnees');
  const fill = async (n, v) => p.fill(`[data-details] [name=${n}]`, v);
  await fill('firstName', 'Camille'); await fill('lastName', 'Durand'); await fill('email', 'camille.durand@exemple.fr'); await fill('phone', '06 21 43 65 87');
  await fill('address', '18 cours de l’Intendance'); await fill('zip', '33000'); await fill('city', 'Bordeaux'); await fill('birth', '1990-05-14');
  await fill('licNumber', 'CD1234567'); await fill('licDate', '2011-06-01'); await p.dispatchEvent('[data-details] [name=licDate]', 'change'); await p.waitForTimeout(300);
  await p.check('[data-details] [name=cgv]');
  await p.evaluate(() => window.scrollTo(0, 280)); await p.waitForTimeout(300);
  // affichage d'un téléphone réglé en français (le navigateur de capture affiche les dates à l'américaine)
  const birthShot = await p.evaluateHandle(() => { const i = document.querySelector('[data-details] [name=birth]'); const c = i.cloneNode(); c.type = 'text'; c.value = '14/05/1990'; c.removeAttribute('name'); i.style.display = 'none'; i.after(c); return c; });
  await p.screenshot({ path: `${OUT}/m-coordonnees.png` });
  await birthShot.evaluate((c) => { c.previousElementSibling.style.display = ''; c.remove(); });
  await p.click('[data-details] button[type=submit]'); await p.waitForTimeout(800);
  const rid = await p.evaluate(() => location.hash.split('/')[2]);
  await prep(p, '#/paiement/' + rid);
  await p.click('[data-m="4x"]'); await p.waitForTimeout(300);
  await p.addStyleTag({ content: '.alert.info{display:none!important}' });
  await p.screenshot({ path: `${OUT}/m-paiement.png` });
  await p.click('[data-pay]'); await p.waitForTimeout(2200);
  await prep(p, '#/reservation/' + rid);
  await p.screenshot({ path: `${OUT}/m-confirmee.png` });
  await prep(p, '#/compte');
  await p.screenshot({ path: `${OUT}/m-compte.png` });
  await m.close();
  // ---------- Ordinateur ----------
  const d = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'fr-FR', timezoneId: 'Europe/Paris', reducedMotion: 'reduce' });
  await d.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const q = await d.newPage();
  await prep(q, '#/');
  await q.screenshot({ path: `${OUT}/d-accueil.png` });
  await prep(q, '#/gestion');
  await q.addStyleTag({ content: '.dash-grid{align-items:start!important}' });
  await q.waitForTimeout(300);
  await q.screenshot({ path: `${OUT}/d-tableau.png` });
  // éléments du tableau de bord, pour les faire sortir de l'écran en 3D
  await q.addStyleTag({ content: '.dash-grid{align-items:start!important}' });
  await q.waitForTimeout(300);
  // positions des éléments dans la capture du tableau de bord (pour les faire sortir de l'écran au bon endroit)
  const rects = await q.evaluate(() => {
    const r = (e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.width, b.height].map((v) => Math.round(v * 10) / 10); };
    return { kpi: [...document.querySelectorAll('.kpi')].map(r), today: r(document.querySelectorAll('.dash-grid .panel')[0]), chart: r(document.querySelector('.panel:has(.chart)')), view: [innerWidth, innerHeight] };
  });
  fs.writeFileSync(`${OUT}/d-rects.json`, JSON.stringify(rects));
  const kpis = await q.$$('.kpi');
  for (let i = 0; i < kpis.length; i++) await kpis[i].screenshot({ path: `${OUT}/d-kpi-${i + 1}.png` });
  const panels = await q.$$('.dash-grid .panel');
  if (panels[0]) await panels[0].screenshot({ path: `${OUT}/d-aujourdhui.png` });
  const chart = await q.$('.panel:has(.chart)');
  if (chart) await chart.screenshot({ path: `${OUT}/d-graphique.png` });
  await prep(q, '#/gestion/planning');
  await q.screenshot({ path: `${OUT}/d-planning.png` });
  await prep(q, '#/gestion/flotte');
  await q.screenshot({ path: `${OUT}/d-flotte.png` });
  await prep(q, '#/gestion/reservations');
  const r = await q.evaluate(() => db.reservations.find((x) => x.status === 'en_cours' || x.status === 'confirmee').id);
  await q.evaluate((id) => openResDrawer(id), r); await q.waitForTimeout(500);
  await q.screenshot({ path: `${OUT}/d-fiche-reservation.png` });
  await q.keyboard.press('Escape'); await q.waitForTimeout(300);
  await q.evaluate((id) => openDocument(db.reservations.find((x) => x.id === id), 'facture'), r); await q.waitForTimeout(500);
  await q.addStyleTag({ content: '.overlay .m-ft{display:none!important}.overlay .modal,.overlay .m-bd{max-height:none!important;overflow:visible!important}.overlay{overflow:auto!important;align-items:flex-start!important}' });
  await q.waitForTimeout(300);
  const doc = await q.$('.overlay .doc');
  if (doc) await doc.screenshot({ path: `${OUT}/d-facture.png` });
  await d.close();
  await browser.close();
  console.log(fs.readdirSync(OUT).join('\n'));
})();
