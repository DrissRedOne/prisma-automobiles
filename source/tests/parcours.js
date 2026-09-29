// Parcours complet PRISMA : site client et logiciel du loueur, ordinateur et téléphone.
// Chaque scénario est indépendant : un échec est noté et le test continue.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
// PRISMA_URL=http://… : teste le site en ligne (vraies adresses) au lieu du fichier unique (adresses en « # »)
const WEB = (process.env.PRISMA_URL || '').replace(/\/+$/, '');
const FILE = WEB ? WEB + '/' : 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const SHOTS = path.resolve(__dirname, '../shots/parcours');
fs.mkdirSync(SHOTS, { recursive: true });
const results = [];
const anomalies = [];
const errors = [];
const ok = (label, cond, extra = '') => { results.push(`${cond ? 'OK ' : 'ÉCHEC'} ${label}${extra ? ' · ' + extra : ''}`); return cond; };
const wait = (p, ms = 450) => p.waitForTimeout(ms);
const BAD = [/Invalid Date/, /\bNaN\b/, /\bundefined\b/, /\[object Object\]/, /\bnull\b/, /Infinity/];
async function scan(p, where) {
  const t = await p.evaluate(() => document.body.innerText);
  for (const re of BAD) if (re.test(t)) anomalies.push(`${where} : ${re}`);
}
async function shot(p, name, full = false) { await wait(p, 300); await p.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: full }); }
async function go(p, hash) { await p.evaluate((h) => { if (location.protocol === 'file:') location.hash = h; else window.go(h); }, hash); await wait(p, 550); }
async function scenario(name, fn) {
  try { await fn(); } catch (e) { const m = String(e.message).split('\n'); results.push(`ÉCHEC ${name} : exception ${m[0]} ${(m.find((l) => /waiting for|locator/.test(l)) || '').trim()}`); }
}
// Dates : jour ouvré à N jours, à hh:mm (heure de Paris)
const slot = (p, days, hhmm = '10:00') => p.evaluate(([d, t]) => { let x = addDays(dayStart(new Date()), d); while (!openingFor(x)) x = addDays(x, 1); const [h, m] = t.split(':').map(Number); x.setHours(h, m, 0, 0); return toISO(x); }, [days, hhmm]);
async function setSearch(p, from, to, agencyStart = 'yvrac', agencyEnd = agencyStart, extra = {}) {
  await p.evaluate(([f, t, a, b, x]) => { draft = { ...defaultSearch(), ...(draft || {}), from: f, to: t, agencyStart: a, agencyEnd: b, vehicleId: null, options: {}, promo: null, customer: null, ...x }; saveDraft(); }, [from, to, agencyStart, agencyEnd, extra]);
}
async function fillPerson(p, o) {
  const set = async (n, v) => { if (v != null) await p.fill(`[data-details] [name=${n}]`, v); };
  await set('firstName', o.firstName); await set('lastName', o.lastName); await set('email', o.email); await set('phone', o.phone);
  await set('address', o.address || '12 rue Sainte-Catherine'); await set('zip', o.zip || '33000'); await set('city', o.city || 'Bordeaux');
  await set('birth', o.birth || '1988-04-12'); await set('licNumber', o.licNumber || 'AB12345');
  await set('licDate', o.licDate || '2010-06-01');
  await p.dispatchEvent('[data-details] [name=licDate]', 'change'); await wait(p, 300);
  if (await p.isVisible('[data-details] [name=password]')) await p.fill('[data-details] [name=password]', o.password || 'Location2026');
  if (o.cgv !== false) await p.check('[data-details] [name=cgv]');
}
// Réservation complète par l'interface depuis la fiche véhicule
async function book(p, { vehicleId, from, to, agencyStart = 'yvrac', agencyEnd, person, options = [], promo }) {
  await setSearch(p, from, to, agencyStart, agencyEnd || agencyStart);
  await go(p, '#/vehicule/' + vehicleId);
  await p.click('[data-continue]'); await wait(p);
  for (const o of options) { await p.click(`[data-toggle="${o}"]`); await wait(p, 300); }
  if (promo) { await p.fill('[data-promo] [name=code]', promo); await p.click('[data-promo] button[type=submit]'); await wait(p, 300); }
  await p.click('[data-continue]'); await wait(p);
  await fillPerson(p, person);
  if (await p.$('[data-details] [name=delivery]')) await p.fill('[data-details] [name=delivery]', '5 cours de l’Intendance, 33000 Bordeaux');
  await p.click('[data-details] button[type=submit]'); await wait(p, 700);
  return p.evaluate(() => { const m = (location.protocol === 'file:' ? location.hash.slice(1) : location.pathname).match(/reservation\/([\w-]+)/); return m ? m[1] : null; });
}
const JEAN = { firstName: 'Jean', lastName: 'Martin', email: 'jean.martin@exemple.fr', phone: '06 12 34 56 78' };

async function run(browser, device) {
  const mobile = device === 'mobile';
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'fr-FR', timezoneId: 'Europe/Paris', acceptDownloads: true }
    : { viewport: { width: 1366, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris', acceptDownloads: true });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(`${device} pageerror : ${e.message}`));
  p.on('console', (m) => { if (m.type() === 'error' && !/ERR_|net::|Failed to load resource|WebGL|GPU stall/.test(m.text())) errors.push(`${device} console : ${m.text()}`); });
  p.on('dialog', (d) => d.accept());
  const D = mobile ? 'mobile' : 'ordi';
  await p.goto(FILE);
  await wait(p, 900);

  const adminLogin = async (login, pw) => {
    await p.fill('[data-admin-login] [name=login]', login); await p.fill('[data-admin-login] [name=password]', pw);
    await p.click('[data-admin-login] button[type=submit]'); await wait(p, 500);
  };
  await scenario(`${D} espace loueur : connexion`, async () => {
    ok(`${D} plus de bandeau de démonstration`, !(await p.$('.demo-bar')) && !/Démonstration/.test(await p.textContent('body')));
    await go(p, '#/gestion');
    ok(`${D} espace loueur : écran de connexion`, !!(await p.$('[data-admin-login]')) && !(await p.$('.admin')));
    await scan(p, `${D} connexion loueur`); await shot(p, `${D}-19-connexion-loueur`);
    await adminLogin('prisma', 'mauvais');
    ok(`${D} espace loueur : mauvais mot de passe refusé`, (await p.$eval('[data-admin-login] [data-f="password"]', (f) => f.classList.contains('err'))) && !(await p.$('.admin')));
    await p.click('[data-admin-login] [data-pweye]');
    ok(`${D} mot de passe affichable`, (await p.getAttribute('[data-admin-login] [name=password]', 'type')) === 'text');
    await adminLogin(' PRISMA ', 'Yvrac2026');
    ok(`${D} espace loueur : connecté, tableau de bord`, (await p.$$('.kpi')).length === 4);
    await go(p, '#/');
  });

  /* ================= SITE CLIENT ================= */
  if (!process.env.ADMIN_ONLY) {
  await scenario(`${D} accueil`, async () => {
    ok(`${D} accueil : scène des véhicules et recherche`, (await p.$$('.hero2 .h2-car')).length >= 3 && !!(await p.$('.search-card .sx')));
    const n1 = await p.textContent('[data-cap-name]');
    await p.click('.h2-dots button:nth-child(3)'); await wait(p, 700);
    ok(`${D} accueil : véhicule suivant sur la scène`, (await p.textContent('[data-cap-name]')) !== n1);
    await p.click('.pillbar [data-hg="utilitaire"]'); await wait(p, 400);
    const vis = await p.$$eval('#vehicules .rcard', (c) => c.filter((x) => !x.hidden).map((x) => x.dataset.v));
    ok(`${D} accueil : filtre Utilitaires du catalogue`, vis.length > 0 && vis.every((id) => /kangoo|trafic|master|bus/.test(id)), vis.join(','));
    await p.click('.pillbar [data-hg="all"]'); await wait(p, 300);
    ok(`${D} accueil : filtre Tous`, (await p.$$eval('#vehicules .rcard', (c) => c.filter((x) => !x.hidden).length)) === 11);
    await p.click('.promo-app [data-app]'); await wait(p, 400);
    ok(`${D} carte application : mode d’installation`, /écran d’accueil|Installer/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.keyboard.press('Escape'); await wait(p, 200);
    ok(`${D} liens WhatsApp vers le numéro du loueur`, (await p.$eval('.fab-wa', (a) => a.href)).startsWith('https://wa.me/33749588144'));
    await p.evaluate(() => window.scrollTo(0, 3000)); await wait(p, 500);
    ok(`${D} bouton « revenir en haut » visible après défilement`, await p.$eval('.fab-top', (b) => b.classList.contains('show')));
    await p.evaluate(() => window.scrollTo(0, 0)); await wait(p, 300);
    await p.click('.faq details summary'); await wait(p, 200);
    ok(`${D} accueil : FAQ dépliable`, await p.$eval('.faq details', (d) => d.open));
    await p.evaluate(() => openInfoDoc('cgv')); await wait(p, 300);
    ok(`${D} CGV`, (await p.$eval('.overlay', (e) => e.innerText)).length > 400); await p.keyboard.press('Escape');
    await p.evaluate(() => openInfoDoc('mentions')); await wait(p, 300);
    ok(`${D} mentions légales (SIREN)`, (await p.$eval('.overlay', (e) => e.innerText)).includes('938 530 425')); await p.keyboard.press('Escape');
    await p.evaluate(() => openInfoDoc('credits')); await wait(p, 300);
    ok(`${D} crédits photos (flotte et véhicules à vendre)`, (await p.$$('.overlay .list-row')).length >= 11); await p.keyboard.press('Escape');
    await scan(p, `${D} accueil`);
    await shot(p, `${D}-01-accueil`);
  });

  await scenario(`${D} contrôle des dates`, async () => {
    const e = await p.evaluate(() => {
      const d = (n, t) => { let x = addDays(dayStart(new Date()), n); x.setHours(...t.split(':').map(Number), 0, 0); return x; };
      let sun = addDays(dayStart(new Date()), 1); while (sun.getDay() !== 0) sun = addDays(sun, 1); sun.setHours(10, 0, 0, 0);
      let mon = addDays(sun, 1); mon.setHours(10, 0, 0, 0);
      const f = d(10, '10:00');
      return {
        dimanche: searchError({ from: toISO(sun), to: toISO(addDays(mon, 2)) }),
        retourAvant: searchError({ from: toISO(addDays(mon, 3)), to: toISO(addDays(mon, 2)) }),
        horsHoraires: searchError({ from: toISO(new Date(addDays(mon, 2).setHours(20, 0))), to: toISO(addDays(mon, 4)) }),
        tropLong: searchError({ from: toISO(addDays(mon, 1)), to: toISO(addDays(mon, 120)) }),
        passe: searchError({ from: toISO(addDays(dayStart(new Date()), -2)), to: toISO(addDays(mon, 2)) }),
        valide: searchError({ from: toISO(addDays(mon, 1)), to: toISO(addDays(mon, 3)) }),
      };
    });
    ok(`${D} dates : dimanche refusé`, /fermée le dimanche/.test(e.dimanche || ''), e.dimanche);
    ok(`${D} dates : retour avant départ refusé`, /après le départ/.test(e.retourAvant || ''));
    ok(`${D} dates : hors horaires refusé`, /Départ possible/.test(e.horsHoraires || ''), e.horsHoraires);
    ok(`${D} dates : plus de 90 jours refusé`, /90 jours/.test(e.tropLong || ''));
    ok(`${D} dates : passé refusé`, /à l'avance/.test(e.passe || ''));
    ok(`${D} dates : recherche valide`, e.valide === null, String(e.valide));
    // Sélecteur de dates : dimanches et jours passés désactivés, choix de deux jours
    await go(p, '#/');
    await p.click('.search-card [data-dates]'); await wait(p, 400);
    const st = await p.evaluate(() => { const b = [...document.querySelectorAll('.overlay [data-day]')]; const sun = b.filter((x) => parse(x.dataset.day + 'T00:00').getDay() === 0); const past = b.filter((x) => parse(x.dataset.day + 'T00:00') < dayStart(new Date())); return { sunOff: sun.every((x) => x.disabled), pastOff: past.every((x) => x.disabled), n: b.length }; });
    ok(`${D} calendrier : dimanches et jours passés grisés`, st.sunOff && st.pastOff, JSON.stringify(st));
    await p.click('.overlay [data-nav="1"]'); await wait(p, 200);
    const days = await p.$$eval('.overlay [data-day]:not([disabled])', (b) => b.map((x) => x.dataset.day));
    await p.click(`.overlay [data-day="${days[3]}"]`); await wait(p, 150);
    await p.click(`.overlay [data-day="${days[6]}"]`); await wait(p, 150);
    await p.selectOption('.overlay [data-time="to"]', '17:00').catch(() => {});
    await shot(p, `${D}-02-calendrier`);
    await p.click('.overlay [data-ok]'); await wait(p, 300);
    const label = await p.textContent('.search-card [data-to]');
    const tt = await p.textContent('.search-card [data-to-t]');
    ok(`${D} calendrier : dates reportées dans la recherche`, tt === '17:00', `${label} ${tt}`);
    await p.click('.search-card [data-kind="utilitaire"]');
    await p.click('.search-card [data-other]'); await wait(p, 200);
    await p.selectOption('.search-card [name=agencyEnd]', 'gare');
    await p.selectOption('.search-card [name=pro]', '1');
    await p.click('.search-card button[type=submit]'); await wait(p, 800);
    const dr = await p.evaluate(() => ({ a: draft.agencyStart, b: draft.agencyEnd, pro: draft.pro }));
    ok(`${D} recherche Utilitaires, retour en gare, prix pro → page Utilitaires`, /(?:#|\d)\/vehicules\/utilitaire$/.test(await p.url()) && dr.b === 'gare' && dr.a === 'yvrac' && dr.pro === true, JSON.stringify(dr));
    ok(`${D} résultats en prix hors taxes`, /HT/.test(await p.$eval('.rcard .rc-p', (e) => e.textContent)));
    await p.click('[data-pro-set="0"]'); await wait(p, 400);
  });

  await scenario(`${D} résultats`, async () => {
    const from = await slot(p, 70), to = await slot(p, 73);
    await setSearch(p, from, to); await go(p, '#/vehicules/all');
    const total = (await p.$$('.rcard')).length;
    await p.click('a.pill[href="/vehicules/voiture"]'); await wait(p);
    const cats = await p.$$eval('.rcard', (c) => c.map((x) => x.dataset.v));
    ok(`${D} filtre Voitures`, cats.length > 0 && cats.length < total && !cats.some((n) => /kangoo|trafic|master|bus/.test(n)), cats.length + ' voitures');
    ok(`${D} page catégorie : titre, fil d’Ariane, conditions`, (await p.textContent('.cat-title')) === 'Voitures' && /Conditions générales de location/.test(await p.textContent('.conds')));
    await p.click('a.pill[href="/vehicules/utilitaire"]'); await wait(p);
    const vans = await p.$$eval('.rcard', (c) => c.map((x) => x.dataset.v));
    ok(`${D} filtre Utilitaires`, vans.length > 0 && vans.every((n) => /kangoo|trafic|master|bus/.test(n)), vans.length + ' utilitaires');
    await p.click('a.pill[href="/vehicules/suv"]'); await wait(p);
    ok(`${D} filtre SUV`, (await p.$$eval('.rcard', (c) => c.map((x) => x.dataset.v).join(','))) === 'v-5008,v-glc' || (await p.$$('.rcard')).length === 2);
    await p.click('a.pill[href="/vehicules"]'); await wait(p);
    await p.click('.chip[data-auto]'); await wait(p);
    const autos = await p.$$eval('.rcard', (c) => c.map((x) => x.dataset.v));
    const allAuto = await p.evaluate((ids) => ids.every((id) => vehicle(id).gearbox === 'Automatique'), autos);
    ok(`${D} filtre boîte automatique`, autos.length > 0 && allAuto, autos.join(', '));
    await p.click('.chip[data-auto]'); await wait(p);
    await p.selectOption('[data-sort]', 'prixd'); await wait(p);
    const prices = await p.$$eval('.rcard:not(.unavail) .rc-tot', (b) => b.map((x) => Number(x.textContent.replace(/[^\d,]/g, '').replace(',', '.'))));
    ok(`${D} tri prix décroissant`, prices.every((v, i) => !i || prices[i - 1] >= v), prices.join(' > '));
    await p.selectOption('[data-sort]', 'prix'); await wait(p);
    await scan(p, `${D} résultats`);
    await shot(p, `${D}-03-resultats`);
  });

  await scenario(`${D} fiche, options, code promo`, async () => {
    const from = await slot(p, 70), to = await slot(p, 73);
    await setSearch(p, from, to); await go(p, '#/vehicule/v-5008');
    ok(`${D} fiche : caution et franchise`, /Caution/.test(await p.textContent('main')) && /Franchise/.test(await p.textContent('main')));
    await p.click('[data-view="photo"]'); await wait(p, 400);
    ok(`${D} fiche : photo du modèle`, !!(await p.$('[data-vmain] .vd-photo')));
    await p.click('[data-view="3d"]'); await wait(p, 600);
    ok(`${D} fiche : vue 3D`, !!(await p.$('[data-vmain] .showroom')));
    await p.click('[data-view="studio"]'); await wait(p, 300);
    ok(`${D} fiche : autres modèles de la catégorie`, (await p.$$('.vd-more .rcard')).length >= 1);
    ok(`${D} fiche : réservation par WhatsApp avec le véhicule et les dates`, decodeURIComponent(await p.$eval('.vd-book .btn-wa', (a) => a.href)).includes('Peugeot 5008'));
    await scan(p, `${D} fiche`); await shot(p, `${D}-04-fiche`);
    await p.click('[data-continue]'); await wait(p);
    const tot = () => p.evaluate(() => quoteSearch(vehicle(draft.vehicleId), { options: draft.options, promo: draft.promo }).total);
    const t0 = await tot();
    await p.click('[data-toggle="o-driver"]'); await wait(p);
    const t1 = await tot();
    ok(`${D} option conducteur supplémentaire (+18 € sur 3 jours)`, t1 - t0 === 18, `${t0} → ${t1}`);
    await p.click('[data-inc="o-driver"]'); await wait(p);
    ok(`${D} option en quantité (×2)`, (await tot()) - t0 === 36);
    await p.click('[data-dec="o-driver"]'); await wait(p); await p.click('[data-dec="o-driver"]'); await wait(p);
    await p.click('[data-toggle="o-zero"]'); await wait(p); await p.click('[data-toggle="o-half"]'); await wait(p);
    const prot = await p.evaluate(() => Object.keys(draft.options));
    ok(`${D} protections exclusives l’une de l’autre`, prot.includes('o-half') && !prot.includes('o-zero'), prot.join(','));
    await p.fill('[data-promo] [name=code]', 'FAUX2026'); await p.click('[data-promo] button[type=submit]'); await wait(p, 300);
    ok(`${D} code promo invalide refusé`, await p.$eval('[data-promo] .field', (f) => f.classList.contains('err')));
    await p.fill('[data-promo] [name=code]', 'bienvenue10'); await p.click('[data-promo] button[type=submit]'); await wait(p);
    ok(`${D} code promo BIENVENUE10 appliqué`, /Code BIENVENUE10/.test(await p.textContent('.book-side')));
    await p.click('[data-unpromo]'); await wait(p);
    ok(`${D} code promo retiré`, !/Code BIENVENUE10/.test(await p.textContent('.book-side')));
    await scan(p, `${D} options`); await shot(p, `${D}-05-options`);
  });

  await scenario(`${D} coordonnées : contrôles`, async () => {
    const from = await slot(p, 75), to = await slot(p, 77);
    await setSearch(p, from, to); await go(p, '#/vehicule/v-glc');
    await p.click('[data-continue]'); await wait(p); await p.click('[data-continue]'); await wait(p);
    await p.click('[data-details] button[type=submit]'); await wait(p, 300);
    ok(`${D} formulaire vide : champs signalés`, (await p.$$('[data-details] .field.err')).length >= 10);
    ok(`${D} CGV non cochées signalées`, await p.isVisible('.msg-cgv'));
    await fillPerson(p, { ...JEAN, email: 'pas-un-email', phone: '0612', birth: '2006-01-10', licDate: '2024-01-10', cgv: false });
    await p.click('[data-details] button[type=submit]'); await wait(p, 300);
    const errs = await p.$$eval('[data-details] .field.err', (f) => f.map((x) => x.dataset.f));
    ok(`${D} email, téléphone, âge et permis contrôlés (GLC : 25 ans, 3 ans de permis)`, ['email', 'phone', 'birth', 'licDate'].every((k) => errs.includes(k)), errs.join(','));
    await p.click('[data-details] [data-doc="cgv"]'); await wait(p, 300);
    ok(`${D} lien CGV depuis le formulaire`, await p.isVisible('.overlay')); await p.keyboard.press('Escape');
    await scan(p, `${D} coordonnées`); await shot(p, `${D}-06-coordonnees-erreurs`);
  });

  await scenario(`${D} jeune conducteur`, async () => {
    const from = await slot(p, 80), to = await slot(p, 82);
    await setSearch(p, from, to); await go(p, '#/vehicule/v-clio');
    await p.click('[data-continue]'); await wait(p); await p.click('[data-continue]'); await wait(p);
    await fillPerson(p, { ...JEAN, email: 'lea.jeune@exemple.fr', firstName: 'Léa', birth: '2002-03-03', licDate: '2024-06-01' });
    ok(`${D} jeune conducteur : alerte et supplément`, /supplément jeune conducteur/.test(await p.textContent('[data-young]')) && /Jeune conducteur/.test(await p.textContent('.book-side')));
    await p.click('[data-details] button[type=submit]'); await wait(p, 700);
    const r = await p.evaluate(() => { const id = (location.protocol === 'file:' ? location.hash.slice(1) : location.pathname).split('/')[2]; const x = db.reservations.find((y) => y.id === id); return x && { young: x.youngDriver, dep: x.quote.deposit, base: vehicle(x.vehicleId).deposit }; });
    ok(`${D} jeune conducteur : réservation avec caution majorée`, r && r.young && r.dep === r.base + 500, JSON.stringify(r));
  });

  let resId = null;
  await scenario(`${D} réservation, bon, agenda, paiement en 4 fois`, async () => {
    const from = await slot(p, 90), to = await slot(p, 93);
    resId = await book(p, { vehicleId: 'v-5008', from, to, person: JEAN, options: ['o-driver'] });
    ok(`${D} réservation créée (en attente de paiement)`, !!resId && /en attente de paiement/.test(await p.textContent('main')));
    await scan(p, `${D} réservation en attente`); await shot(p, `${D}-07-reservation-attente`);
    await p.click('[data-bon]'); await wait(p, 300);
    const bon = await p.$eval('.overlay', (e) => e.innerText);
    ok(`${D} bon de réservation`, /Bon de réservation/.test(bon) && /Jean Martin/.test(bon) && /Peugeot 5008/.test(bon));
    await p.keyboard.press('Escape');
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click('[data-ics]')]);
    const ics = fs.readFileSync(await dl.path(), 'utf8');
    ok(`${D} ajout à l’agenda (.ics)`, /BEGIN:VCALENDAR/.test(ics) && /DTSTART:\d{8}T\d{6}/.test(ics), dl.suggestedFilename());
    await p.click('a[href^="/paiement/"]'); await wait(p);
    ok(`${D} paiement : 3 et 4 fois proposés au-delà de 150 €`, !!(await p.$('[data-m="3x"]')) && !!(await p.$('[data-m="4x"]')));
    ok(`${D} paiement : pas de virement pour un particulier`, !(await p.$('[data-m="virement"]')));
    await p.click('[data-m="4x"]'); await shot(p, `${D}-08-paiement`);
    await p.click('[data-pay]'); await wait(p, 2200);
    const st = await p.evaluate((id) => { const r = db.reservations.find((x) => x.id === id); return { s: r.status, m: r.payments.map((x) => x.method).join(','), b: balance(r) }; }, resId);
    ok(`${D} paiement en 4 fois : réservation confirmée, soldée`, st.s === 'confirmee' && /4 fois/.test(st.m) && st.b === 0, JSON.stringify(st));
    ok(`${D} page de confirmation`, /C’est confirmé/.test(await p.textContent('main')));
    await scan(p, `${D} confirmation`); await shot(p, `${D}-09-confirmee`);
  });

  await scenario(`${D} véhicule déjà réservé`, async () => {
    const r = await p.evaluate((id) => { const x = db.reservations.find((y) => y.id === id); return { from: x.from, to: x.to }; }, resId);
    await setSearch(p, r.from, r.to); await go(p, '#/vehicules');
    const card = await p.evaluate(() => { const c = document.querySelector('.rcard[data-v="v-5008"]'); return c && { unavail: c.classList.contains('unavail'), txt: c.innerText }; });
    ok(`${D} 5008 affiché indisponible sur ces dates`, card && card.unavail, card && card.txt.split('\n').slice(-3).join(' | '));
  });

  await scenario(`${D} espace client`, async () => {
    await go(p, '#/compte');
    ok(`${D} espace client connecté`, /Bonjour Jean/.test(await p.textContent('main')));
    ok(`${D} espace client : réservation listée`, (await p.$$('main .list-row')).length >= 1);
    await scan(p, `${D} espace client`); await shot(p, `${D}-10-espace-client`);
    await p.click('[data-logout]'); await wait(p);
    const F = 'main [data-login-form]';
    const login = async (email, pw) => { await p.fill(`${F} [name=email]`, email); await p.fill(`${F} [name=password]`, pw); await p.click(`${F} button[type=submit]`); await wait(p, 400); };
    const refused = () => p.$eval(`${F} [data-f="password"]`, (f) => f.classList.contains('err'));
    ok(`${D} espace client : connexion sur la page`, !!(await p.$(F)));
    await scan(p, `${D} connexion client`); await shot(p, `${D}-10b-connexion-client`);
    await login('inconnu@exemple.fr', 'Location2026');
    ok(`${D} connexion : email inconnu refusé`, await refused());
    await login('jean.martin@exemple.fr', 'mauvais-mot');
    ok(`${D} connexion : mauvais mot de passe refusé`, (await refused()) && !/Bonjour/.test(await p.textContent('main')));
    await login('Jean.Martin@exemple.fr ', 'Location2026');
    ok(`${D} connexion par email et mot de passe (choisi à la réservation)`, /Bonjour Jean/.test(await p.textContent('main')));
    await p.click('[data-logout]'); await wait(p);
    await login('julien.moreau@exemple.fr', 'Client2026');
    ok(`${D} compte client livré avec l’application`, /Bonjour Julien/.test(await p.textContent('main')) && (await p.$$('main .list-row')).length >= 1);
    await p.click('[data-logout]'); await wait(p);
    await p.click(`${F} [data-forgot]`); await wait(p, 300);
    await p.fill('[data-forgot-form] [name=email]', 'jean.martin@exemple.fr'); await p.click('[data-forgot-form] button[type=submit]'); await wait(p, 200);
    ok(`${D} mot de passe oublié : demande de lien`, /nouveau mot de passe/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.keyboard.press('Escape'); await wait(p, 200);
    await login('jean.martin@exemple.fr', 'Location2026');
  });

  await scenario(`${D} annulation gratuite`, async () => {
    await go(p, '#/reservation/' + resId);
    await p.click('[data-cancel]'); await wait(p, 300);
    ok(`${D} annulation : gratuite à plus de 48 h`, /gratuite/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.click('.overlay [data-ok]'); await wait(p);
    const st = await p.evaluate((id) => { const r = db.reservations.find((x) => x.id === id); return { s: r.status, paid: paid(r), bal: balance(r) }; }, resId);
    ok(`${D} annulation : remboursée intégralement, plus rien à payer`, st.s === 'annulee' && st.paid === 0 && st.bal === 0, JSON.stringify(st));
    const txt = await p.textContent('main');
    const reste = (txt.match(/Reste à payer\s*([\d\s ,]+€)/) || [])[1];
    ok(`${D} réservation annulée : affichage « reste à payer » à 0`, !reste || /^0,00/.test(reste.trim()), reste);
    await scan(p, `${D} annulée`); await shot(p, `${D}-11-annulee`, true);
  });

  await scenario(`${D} annulation tardive`, async () => {
    const from = await slot(p, 1, '15:00'), to = await slot(p, 3);
    const id = await book(p, { vehicleId: 'v-kangoo', from, to, person: JEAN });
    await p.click('a[href^="/paiement/"]'); await wait(p);
    await p.click('[data-pay]'); await wait(p, 2200);
    await go(p, '#/reservation/' + id);
    await p.click('[data-cancel]'); await wait(p, 300);
    ok(`${D} annulation à moins de 48 h : 50 % retenus`, /50 %/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.click('.overlay [data-ok]'); await wait(p);
    const st = await p.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { paid: paid(r), base: r.quote.base, bal: balance(r) }; }, id);
    ok(`${D} annulation tardive : frais conservés, rien à rembourser en trop`, Math.abs(st.paid - st.base * 0.5) < 0.01 && st.bal === 0, JSON.stringify(st));
    await scan(p, `${D} annulation tardive`);
  });

  await scenario(`${D} agences et livraison`, async () => {
    await go(p, '#/agences');
    ok(`${D} agences : 4 lieux`, (await p.$$('[data-ag]')).length === 4);
    await scan(p, `${D} agences`); await shot(p, `${D}-12-agences`);
    await p.click('[data-ag="gare"]'); await wait(p);
    const from = await slot(p, 100), to = await slot(p, 102);
    await p.evaluate(([f, t]) => { draft.from = f; draft.to = t; saveDraft(); }, [from, to]);
    await go(p, '#/vehicule/v-clio');
    ok(`${D} gare : frais de remise ajoutés`, /Remise du véhicule : Gare Saint-Jean/.test(await p.textContent('.vd-book')));
    await setSearch(p, from, to, 'livraison');
    await go(p, '#/vehicule/v-clio'); await p.click('[data-continue]'); await wait(p); await p.click('[data-continue]'); await wait(p);
    await fillPerson(p, { ...JEAN });
    await p.click('[data-details] button[type=submit]'); await wait(p, 300);
    ok(`${D} livraison : adresse de livraison obligatoire`, await p.$eval('[data-f="delivery"]', (f) => f.classList.contains('err')));
  });

  await scenario(`${D} client en liste noire`, async () => {
    await p.evaluate(() => { const c = db.customers.find((x) => x.id === 'c3'); c.blacklist = true; save(); });
    const em = await p.evaluate(() => db.customers.find((x) => x.id === 'c3').email);
    const n0 = await p.evaluate(() => db.reservations.length);
    const from = await slot(p, 110), to = await slot(p, 112);
    await book(p, { vehicleId: 'v-208', from, to, person: { ...JEAN, email: em } });
    ok(`${D} liste noire : réservation en ligne refusée`, (await p.evaluate(() => db.reservations.length)) === n0);
    await p.evaluate(() => { db.customers.find((x) => x.id === 'c3').blacklist = false; save(); });
  });

  await scenario(`${D} véhicules à vendre`, async () => {
    await go(p, '#/vehicules-occasion');
    const n = await p.$$eval('[data-vogrid] .vo-card', (c) => c.length);
    ok(`${D} vitrine : annonces affichées`, n >= 10, String(n));
    await p.click('[data-vocat="suv"]'); await wait(p, 300);
    const cats = await p.$$eval('[data-vogrid] .vo-card', (c) => c.filter((x) => !x.hidden).map((x) => x.dataset.cat));
    ok(`${D} vitrine : filtre SUV`, cats.length > 0 && cats.every((c) => c === 'suv'), cats.join(','));
    await p.click('[data-vocat="all"]'); await wait(p, 200);
    await p.selectOption('[data-vofilters] [name=energy]', 'Électrique'); await wait(p, 300);
    const el = await p.$$eval('[data-vogrid] .vo-card', (c) => c.filter((x) => !x.hidden).map((x) => x.dataset.energy));
    ok(`${D} vitrine : filtre électrique`, el.length > 0 && el.every((e) => e === 'Électrique'), el.join(','));
    await p.selectOption('[data-vofilters] [name=energy]', ''); await p.selectOption('[data-vofilters] [name=sort]', 'prix'); await wait(p, 300);
    const prices = await p.$$eval('[data-vogrid] .vo-card:not(.vendu)', (c) => c.filter((x) => !x.hidden).map((x) => +x.dataset.price));
    ok(`${D} vitrine : tri par prix croissant`, prices.every((v, i) => !i || v >= prices[i - 1]), prices.join(','));
    await scan(p, `${D} vitrine`); await shot(p, `${D}-15-vitrine`);
    await p.click('[data-vogrid] a.vo-card >> nth=0'); await wait(p, 700);
    ok(`${D} annonce : titre « d’occasion »`, /d’occasion/.test(await p.textContent('h1')));
    await p.fill('[data-vocontact] [name=firstName]', 'Nadia'); await p.fill('[data-vocontact] [name=lastName]', 'Benali'); await p.fill('[data-vocontact] [name=phone]', '06 11 22 33 44');
    await p.check('[data-vocontact] [name=trade]'); await wait(p, 150);
    ok(`${D} annonce : champs de reprise affichés`, await p.isVisible('[data-tradef]'));
    await p.fill('[data-vocontact] [name=tModel]', 'Renault Clio'); await p.fill('[data-vocontact] [name=tYear]', '2016');
    await p.click('[data-vocontact] button[type=submit]'); await wait(p, 400);
    const lead = await p.evaluate(() => (db.messages || []).find((m) => m.saleId && m.lastName === 'Benali'));
    ok(`${D} annonce : demande enregistrée avec la reprise`, !!lead && /Reprise souhaitée : Renault Clio, 2016/.test(lead.message), lead && lead.subject);
    await scan(p, `${D} annonce`); await shot(p, `${D}-16-annonce`);
    await go(p, '#/gestion/ventes'); await wait(p, 500);
    ok(`${D} logiciel : rubrique Ventes`, (await p.$$('.sale-fc')).length >= 10);
    const sid = await p.evaluate(() => db.messages.find((m) => m.lastName === 'Benali').saleId);
    await p.click(`[data-sale="${sid}"]`); await wait(p, 400);
    ok(`${D} logiciel : demande visible dans l’annonce`, /Nadia Benali/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.fill('.overlay [name=price]', '19990'); await p.selectOption('.overlay [name=status]', 'reserve');
    await p.click('.overlay [data-sok]'); await wait(p, 400);
    const upd = await p.evaluate((id) => { const x = db.sales.find((y) => y.id === id); return { price: x.price, status: x.status }; }, sid);
    ok(`${D} logiciel : annonce modifiée`, upd.price === 19990 && upd.status === 'reserve', JSON.stringify(upd));
    await p.click('[data-addsale]'); await wait(p, 400);
    await p.fill('.overlay [name=brand]', 'Renault'); await p.fill('.overlay [name=model]', 'Clio'); await p.fill('.overlay [name=price]', '12490');
    await p.fill('.overlay [name=year]', '2020'); await p.fill('.overlay [name=km]', '54000');
    await p.click('.overlay [data-sok]'); await wait(p, 400);
    const added = await p.evaluate(() => db.sales.find((x) => x.brand === 'Renault' && x.model === 'Clio' && x.price === 12490));
    ok(`${D} logiciel : annonce ajoutée`, !!added && /^VO-\d+$/.test(added.ref), added && added.ref);
    await go(p, '#/vehicules-occasion'); await wait(p, 400);
    ok(`${D} vitrine : nouvelle annonce en ligne`, await p.$$eval('[data-vogrid] .vo-card', (c, ref) => c.some((x) => /Renault - Clio/.test(x.innerText)), added && added.ref));
    await p.evaluate((ids) => { db.sales = db.sales.filter((x) => x.id !== ids[1]); const x = db.sales.find((y) => y.id === ids[0]); x.status = 'disponible'; save(); }, [sid, added && added.id]);
  });

  await scenario(`${D} menu et navigation`, async () => {
    await go(p, '#/');
    await p.click('[data-menu]'); await wait(p, 500);
    ok(`${D} menu ouvert`, await p.isVisible('.mm-panel'));
    await p.click('.mm-sub a[href="/vehicules/minibus"]'); await wait(p, 700);
    ok(`${D} menu → catégorie Minibus`, /(?:#|\d)\/vehicules\/minibus$/.test(await p.url()) && !(await p.$('.mmenu')) && (await p.textContent('.cat-title')) === 'Minibus');
    if (!mobile) {
      await p.hover('.dd:not(.dd-mega) > a'); await wait(p, 400);
      await p.click('.dd-m a[href="/vehicules/suv"]'); await wait(p, 600);
      ok(`${D} menu déroulant Véhicules → SUV`, (await p.textContent('.cat-title')) === 'SUV');
      // menu « Location » : les pages de location
      await p.hover('.dd-mega > a'); await wait(p, 400);
      await p.click('.mega a[href="/location-utilitaire-bordeaux"]'); await wait(p, 700);
      ok(`${D} menu Location → page de location d’utilitaire`, /location-utilitaire-bordeaux$/.test(await p.url()) && /utilitaire/i.test(await p.textContent('h1')) && (await p.$$('.lp-cars .rcard')).length === 4);
      ok(`${D} page de location : titre et description de la page`, /utilitaire/i.test(await p.title()) && /utilitaire/i.test(await p.$eval('meta[name="description"]', (m) => m.content)));
    }
    await go(p, '#/professionnels');
    ok(`${D} page Professionnels : prix HT`, /HT/.test(await p.textContent('.rgrid .rc-p')) && await p.evaluate(() => draft.pro === true));
    await scan(p, `${D} professionnels`); await shot(p, `${D}-13-pro`);
    await p.evaluate(() => { draft.pro = false; saveDraft(); });
  });

  await scenario(`${D} formulaire de contact`, async () => {
    await go(p, '#/contact');
    await p.click('[data-contact] button[type=submit]'); await wait(p, 300);
    const errs = await p.$$eval('[data-contact] .field.err', (f) => f.map((x) => x.dataset.f));
    ok(`${D} contact : champs obligatoires signalés`, ['firstName', 'lastName', 'email', 'message'].every((k) => errs.includes(k)), errs.join(','));
    await p.fill('[data-contact] [name=firstName]', 'Nadia'); await p.fill('[data-contact] [name=lastName]', 'Rahmani');
    await p.fill('[data-contact] [name=email]', 'nadia.rahmani@exemple.fr'); await p.fill('[data-contact] [name=phone]', '06 44 55 66 77');
    await p.selectOption('[data-contact] [name=subject]', 'Devis professionnel');
    await p.fill('[data-contact] [name=message]', 'Bonjour, il me faudrait deux utilitaires 12 m³ pendant trois semaines en novembre.');
    await p.click('[data-contact] button[type=submit]'); await wait(p, 400);
    ok(`${D} contact : message enregistré`, await p.evaluate(() => (db.messages || []).some((m) => m.lastName === 'Rahmani' && !m.done)));
    await scan(p, `${D} contact`); await shot(p, `${D}-14-contact`);
    await go(p, '#/gestion');
    ok(`${D} logiciel : message reçu dans « À traiter »`, /Message de Nadia Rahmani/.test(await p.textContent('.dash-grid')));
    await p.click('[data-msg]'); await wait(p, 400);
    ok(`${D} logiciel : lecture du message`, /deux utilitaires 12 m³/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.click('.overlay [data-done]'); await wait(p, 400);
    ok(`${D} logiciel : message traité`, !/Message de Nadia Rahmani/.test(await p.textContent('.dash-grid')));
  });
  }
  /* ================= LOGICIEL DU LOUEUR ================= */
  await go(p, '#/gestion'); await wait(p, 600);
  await scenario(`${D} tableau de bord`, async () => {
    ok(`${D} tableau de bord : 4 indicateurs`, (await p.$$('.kpi')).length === 4);
    await scan(p, `${D} tableau de bord`); await shot(p, `${D}-20-tableau-de-bord`);
    await p.click('[data-chart-table]'); await wait(p);
    ok(`${D} chiffre d’affaires en tableau`, (await p.$$('.chart, table.tbl')).length >= 1 && !!(await p.$('table.tbl')));
    await p.click('[data-chart-table]'); await wait(p);
  });

  await scenario(`${D} réservation rapide`, async () => {
    const n0 = await p.evaluate(() => db.reservations.length);
    await p.click('[data-new]'); await wait(p, 400);
    await p.selectOption('.overlay [name=vehicleId]', 'v-trafic');
    const f = await slot(p, 120, '09:00'), t = await slot(p, 121, '18:00');
    await p.fill('.overlay [name=from]', f); await p.fill('.overlay [name=to]', t);
    await p.fill('.overlay [name=name]', 'Paul Lefèvre'); await p.fill('.overlay [name=phone]', '06 55 44 33 22');
    await p.click('.overlay [data-o="o-kit"]'); await wait(p, 200);
    const sum1 = await p.textContent('.overlay [data-sum]');
    ok(`${D} réservation rapide : devis affiché`, /jour/.test(sum1) && /€/.test(sum1), sum1.trim());
    await shot(p, `${D}-21-reservation-rapide`);
    await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} réservation rapide créée (client créé)`, (await p.evaluate(() => db.reservations.length)) === n0 + 1 && (await p.evaluate(() => db.customers.some((c) => c.lastName === 'Lefèvre'))));
    // conflit : même véhicule, mêmes dates
    await p.click('[data-new]'); await wait(p, 400);
    await p.selectOption('.overlay [name=vehicleId]', 'v-trafic');
    await p.fill('.overlay [name=from]', f); await p.fill('.overlay [name=to]', t); await p.dispatchEvent('.overlay [name=to]', 'input'); await wait(p, 200);
    ok(`${D} réservation rapide : conflit signalé`, /pas libre/.test(await p.textContent('.overlay [data-sum]')));
    await p.keyboard.press('Escape');
  });

  await scenario(`${D} liste des réservations et recherche`, async () => {
    await go(p, '#/gestion/reservations');
    await p.click('[data-q]'); await p.keyboard.type('Dup', { delay: 40 }); await wait(p, 500); await p.keyboard.type('rat', { delay: 40 }); await wait(p, 600);
    const v = await p.$eval('[data-q]', (i) => i.value);
    const focused = await p.evaluate(() => document.activeElement?.matches('[data-q]'));
    ok(`${D} recherche : la saisie continue sans perdre le curseur`, v === 'Duprat' && focused, `valeur « ${v} », focus ${focused}`);
    const rows = await p.$$eval('tbody tr[data-res]', (r) => r.map((x) => x.innerText));
    ok(`${D} recherche : résultats filtrés`, rows.length > 0 && rows.every((t) => /Duprat|BTP Garonne/.test(t)), rows.length + ' lignes');
    await p.fill('[data-q]', ''); await wait(p, 600);
    await p.click('button.chip[data-f="annulee"]'); await wait(p);
    const st = await p.$$eval('tbody tr[data-res] .badge', (b) => b.map((x) => x.textContent));
    ok(`${D} filtre Annulées`, st.length > 0 && st.every((s) => s === 'Annulée'));
    const amounts = await p.$$eval('tbody tr[data-res]', (r) => r.map((x) => x.children[4].innerText.trim()));
    await scan(p, `${D} réservations`); await shot(p, `${D}-22-reservations-annulees`);
    await p.click('button.chip[data-f="all"]'); await wait(p);
    results.push(`INFO ${D} montants des annulées : ${amounts.slice(0, 5).join(' | ')}`);
  });

  await scenario(`${D} fiche réservation : encaissement, remise, retour, documents`, async () => {
    const id = await p.evaluate(() => db.reservations.find((r) => r.status === 'attente_paiement' && parse(r.from) > new Date()).id);
    await p.evaluate((i) => openResDrawer(i), id); await wait(p, 400);
    await scan(p, `${D} fiche réservation`); await shot(p, `${D}-23-fiche-reservation`);
    await p.click('.drawer [data-act="pay"]'); await wait(p, 300);
    await p.fill('.overlay [name=amount]', '10'); await p.click('.overlay [data-ok]'); await wait(p);
    const b1 = await p.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { s: r.status, bal: balance(r), p: paid(r) }; }, id);
    ok(`${D} acompte de 10 € : reste en attente`, b1.s === 'attente_paiement' && b1.p === 10, JSON.stringify(b1));
    await p.click('.drawer [data-act="pay"]'); await wait(p, 300); await p.click('.overlay [data-ok]'); await wait(p);
    const b2 = await p.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { s: r.status, bal: balance(r) }; }, id);
    ok(`${D} solde encaissé : confirmée`, b2.s === 'confirmee' && b2.bal === 0, JSON.stringify(b2));
    await p.click('.drawer [data-act="checkout"]'); await wait(p, 300);
    await p.click('.overlay [data-ok]'); await wait(p, 300);
    ok(`${D} remise : papiers et caution obligatoires`, await p.isVisible('.overlay [name=docs]'));
    await p.check('.overlay [name=docs]'); await p.check('.overlay [name=deposit]'); await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} véhicule remis : en cours`, (await p.evaluate((i) => db.reservations.find((x) => x.id === i).status, id)) === 'en_cours');
    await p.click('.drawer [data-act="contrat"]'); await wait(p, 300);
    const ct = await p.$eval('.overlay', (e) => e.innerText);
    ok(`${D} contrat : état au départ et signatures`, /État au départ/.test(ct) && /Lu et approuvé/.test(ct));
    await scan(p, `${D} contrat`); await p.keyboard.press('Escape');
    await p.click('.drawer [data-act="checkin"]'); await wait(p, 300);
    await p.check('.overlay [name=cleaning]').catch(() => {});
    await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} retour : location terminée`, (await p.evaluate((i) => db.reservations.find((x) => x.id === i).status, id)) === 'terminee');
    await p.click('.drawer [data-act="facture"]'); await wait(p, 300);
    const fa = await p.$eval('.overlay', (e) => e.innerText);
    ok(`${D} facture finale`, /Facture/.test(fa) && /Total TTC/.test(fa));
    await scan(p, `${D} facture`); await shot(p, `${D}-24-facture`); await p.keyboard.press('Escape');
    await p.fill('.drawer [data-notes]', 'Client ponctuel'); await p.dispatchEvent('.drawer [data-notes]', 'change'); await wait(p, 200);
    ok(`${D} note interne enregistrée`, (await p.evaluate((i) => db.reservations.find((x) => x.id === i).notes, id)) === 'Client ponctuel');
    await p.keyboard.press('Escape'); await wait(p, 200);
  });

  await scenario(`${D} facture d’une réservation non réglée`, async () => {
    const id = await p.evaluate(() => db.reservations.find((r) => r.status === 'attente_paiement').id);
    await p.evaluate((i) => openDocument(db.reservations.find((x) => x.id === i), 'facture'), id); await wait(p, 300);
    const fa = await p.$eval('.overlay', (e) => e.innerText);
    ok(`${D} facture non réglée : pas de mention « acquittée »`, !/acquittée/.test(fa));
    await p.keyboard.press('Escape');
  });

  await scenario(`${D} annulation par le loueur`, async () => {
    const id = await p.evaluate(() => db.reservations.find((r) => r.status === 'confirmee' && parse(r.from) > addDays(new Date(), 5)).id);
    await p.evaluate((i) => openResDrawer(i), id); await wait(p, 300);
    await p.click('.drawer [data-act="cancel"]'); await wait(p, 300); await p.click('.overlay [data-ok]'); await wait(p);
    const st = await p.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { s: r.status, paid: paid(r), bal: balance(r), due: totalDue(r) }; }, id);
    ok(`${D} annulation loueur : remboursé, plus rien dû`, st.s === 'annulee' && st.paid === 0 && st.bal === 0, JSON.stringify(st));
    await p.keyboard.press('Escape'); await wait(p, 200);
  });

  await scenario(`${D} planning`, async () => {
    await go(p, '#/gestion/planning');
    const b0 = await p.textContent('.toolbar b');
    await p.click('[data-shift="7"]'); await wait(p);
    ok(`${D} planning : semaine suivante`, (await p.textContent('.toolbar b')) !== b0);
    await p.click('[data-today]'); await wait(p);
    ok(`${D} planning : retour à aujourd’hui`, (await p.textContent('.toolbar b')) === b0);
    const cell = await p.evaluate(() => { const cs = [...document.querySelectorAll('[data-cell]')]; const free = cs.find((c) => { const [vid, d] = c.dataset.cell.split('|'); const day = parse(d + 'T00:00'); return day > addDays(new Date(), 2) && openingFor(day) && isAvailable(vid, toISO(firstSlot(day)), toISO(addDays(firstSlot(day), 1))); }); return free && free.dataset.cell; });
    await p.click(`[data-cell="${cell}"]`, { force: true }); await wait(p, 400);
    ok(`${D} planning : case vide → nouvelle réservation pré-remplie`, (await p.$eval('.overlay [name=vehicleId]', (s) => s.value)) === cell.split('|')[0]);
    await p.keyboard.press('Escape'); await wait(p, 200);
    await p.click('.bar[data-res]', { force: true }); await wait(p, 400);
    ok(`${D} planning : barre → fiche réservation`, await p.isVisible('.drawer'));
    await p.keyboard.press('Escape'); await wait(p, 200);
    await scan(p, `${D} planning`); await shot(p, `${D}-25-planning`);
  });

  await scenario(`${D} flotte`, async () => {
    await go(p, '#/gestion/flotte');
    results.push(`INFO ${D} avant flotte : ${await p.$$eval('.overlay', (o) => o.length)} fenêtre(s) ouverte(s), tiroir ${!!(await p.$('.drawer'))}`);
    await p.click('.fcard[data-veh="v-clio"]'); await wait(p, 400);
    await shot(p, `${D}-26a-editeur`);
    await p.fill('.overlay [name=price]', '41'); await p.click('.overlay [data-ok]'); await wait(p);
    results.push(`INFO ${D} après enregistrement : prix ${await p.evaluate(() => vehicle('v-clio').price)}, ${await p.$$eval('.overlay', (o) => o.length)} fenêtre(s), carte ${JSON.stringify(await p.textContent('.fcard[data-veh="v-clio"]').catch(() => 'absente'))}`);
    await shot(p, `${D}-26b-apres-enregistrement`);
    ok(`${D} flotte : prix modifié`, (await p.evaluate(() => vehicle('v-clio').price)) === 41 && /41\s€\s\/\s*jour/.test(await p.textContent('.fcard[data-veh="v-clio"]')));
    await p.click('.fcard[data-veh="v-clio"]'); await wait(p, 400);
    const bf = await slot(p, 130, '09:00'), bt = await slot(p, 131, '18:00');
    await p.fill('.overlay [name=bFrom]', bf); await p.fill('.overlay [name=bTo]', bt); await p.fill('.overlay [name=bReason]', 'Vidange');
    await p.click('.overlay [data-addblock]'); await wait(p, 500);
    ok(`${D} flotte : indisponibilité enregistrée`, (await p.evaluate(() => db.blocks.some((b) => b.reason === 'Vidange'))) && !(await p.evaluate(([f, t]) => isAvailable('v-clio', f, t), [bf, bt])));
    // photo déposée par le loueur
    const png = path.join(SHOTS, '_photo-test.png');
    fs.copyFileSync(path.resolve(__dirname, '../pwa-assets/icons/icon-512.png'), png);
    await p.setInputFiles('.overlay [data-file]', png); await wait(p, 1200);
    ok(`${D} flotte : photo du loueur en aperçu`, !!(await p.$('.overlay [data-visual] img.photo')));
    await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} flotte : photo enregistrée`, await p.evaluate(() => !!vehicle('v-clio').photo));
    await p.click('.fcard[data-veh="v-clio"]'); await wait(p, 400);
    await p.click('.overlay [data-unphoto]'); await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} flotte : photo d’origine rétablie`, await p.evaluate(() => !vehicle('v-clio').photo));
    await p.click('[data-add]'); await wait(p, 400);
    await p.click('.overlay [data-ok]'); await wait(p, 300);
    ok(`${D} ajout de véhicule : modèle et immatriculation obligatoires`, await p.isVisible('.overlay'));
    await p.fill('.overlay [name=name]', 'Fiat 500'); await p.fill('.overlay [name=plate]', 'hh-500-pr'); await p.fill('.overlay [name=segment]', 'Citadine');
    await p.click('.overlay [data-ok]'); await wait(p);
    const nv = await p.evaluate(() => db.vehicles.find((v) => v.name === 'Fiat 500'));
    ok(`${D} véhicule ajouté (plaque en majuscules)`, nv && nv.plate === 'HH-500-PR');
    await p.click(`.fcard[data-veh="${nv.id}"]`); await wait(p, 400);
    await p.click('.overlay [data-del]'); await wait(p, 300); await p.locator('.overlay').last().locator('[data-ok]').click(); await wait(p);
    ok(`${D} véhicule supprimé : retiré de la liste`, !(await p.$(`.fcard[data-veh="${nv.id}"]`)));
    await scan(p, `${D} flotte`); await shot(p, `${D}-26-flotte`);
  });

  await scenario(`${D} clients`, async () => {
    await go(p, '#/gestion/clients');
    await p.click('[data-q]'); await p.keyboard.type('Bel', { delay: 40 }); await wait(p, 500); await p.keyboard.type('kacem', { delay: 40 }); await wait(p, 600);
    ok(`${D} clients : recherche sans perte du curseur`, (await p.$eval('[data-q]', (i) => i.value)) === 'Belkacem' && (await p.evaluate(() => document.activeElement?.matches('[data-q]'))));
    await p.fill('[data-q]', ''); await wait(p, 600);
    await p.click('tr[data-client="c1"]'); await wait(p, 400);
    await scan(p, `${D} fiche client`); await shot(p, `${D}-27-fiche-client`);
    await p.check('.overlay [data-bl]'); await wait(p, 300);
    ok(`${D} client mis en liste noire`, await p.evaluate(() => customer('c1').blacklist));
    await p.keyboard.press('Escape'); await wait(p, 300);
    await p.click('tr[data-client="c1"]'); await wait(p, 400);
    await p.uncheck('.overlay [data-bl]'); await wait(p, 300);
    await p.click('.overlay [data-book]'); await wait(p, 500);
    ok(`${D} réservation depuis la fiche client : client présélectionné`, (await p.$eval('.overlay [name=customerId]', (s) => s.value)) === 'c1');
    await p.keyboard.press('Escape'); await wait(p, 200);
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click('[data-csv]')]);
    const csv = fs.readFileSync(await dl.path(), 'utf8');
    ok(`${D} export CSV des clients`, csv.charCodeAt(0) === 0xfeff && /"Nom";"Société";"Email"/.test(csv) && csv.split('\r\n').length > 20);
    // client créé par téléphone, sans permis ni adresse : pas de « Invalid Date »
    const id = await p.evaluate(() => db.reservations.find((r) => customer(r.customerId)?.lastName === 'Lefèvre').id);
    await p.evaluate((i) => openResDrawer(i), id); await wait(p, 300);
    await scan(p, `${D} fiche réservation client téléphone`); await p.keyboard.press('Escape');
    await p.evaluate((i) => openDocument(db.reservations.find((x) => x.id === i), 'contrat'), id); await wait(p, 300);
    await scan(p, `${D} contrat client téléphone`); await p.keyboard.press('Escape');
    await p.evaluate(() => openClient(db.customers.find((c) => c.lastName === 'Lefèvre').id)); await wait(p, 300);
    await scan(p, `${D} fiche client téléphone`); await p.keyboard.press('Escape');
  });

  await scenario(`${D} options et tarifs`, async () => {
    await go(p, '#/gestion/tarifs');
    await p.fill('[data-vp="v-208|price"]', '52'); await p.dispatchEvent('[data-vp="v-208|price"]', 'change'); await wait(p, 200);
    ok(`${D} tarif modifié depuis le tableau`, (await p.evaluate(() => vehicle('v-208').price)) === 52);
    await p.uncheck('[data-optact="o-europe"]'); await wait(p, 200);
    await p.click('[data-addpromo]'); await wait(p, 300);
    await p.fill('.overlay [name=code]', 'ete 2026'); await p.fill('.overlay [name=pct]', '20'); await p.click('.overlay [data-ok]'); await wait(p);
    ok(`${D} code promo créé`, await p.evaluate(() => db.promos.some((x) => x.code === 'ETE2026' && x.pct === 20)));
    await scan(p, `${D} tarifs`); await shot(p, `${D}-28-tarifs`);
    const from = await slot(p, 140), to = await slot(p, 142);
    await setSearch(p, from, to); await go(p, '#/vehicule/v-clio'); await p.click('[data-continue]'); await wait(p);
    ok(`${D} option désactivée absente du site`, !(await p.$('[data-toggle="o-europe"]')));
    await p.fill('[data-promo] [name=code]', 'ETE2026'); await p.click('[data-promo] button[type=submit]'); await wait(p);
    ok(`${D} nouveau code promo utilisable`, /Code ETE2026 \(20 %\)/.test(await p.textContent('.book-side')));
    await go(p, '#/gestion/tarifs');
    await p.check('[data-optact="o-europe"]'); await wait(p, 200);
    const i = await p.evaluate(() => db.promos.findIndex((x) => x.code === 'ETE2026'));
    await p.click(`[data-pdel="${i}"]`); await wait(p);
    ok(`${D} code promo supprimé`, !(await p.evaluate(() => db.promos.some((x) => x.code === 'ETE2026'))));
  });

  await scenario(`${D} paramètres`, async () => {
    await go(p, '#/gestion/parametres');
    await p.click('[data-accent="#cadae9"]'); await wait(p);
    ok(`${D} couleur d’accent`, (await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim())) === '#cadae9');
    await p.click('[data-accent="#d9b878"]'); await wait(p);
    const before = await p.evaluate(() => JSON.stringify(db.settings.hours[1]));
    await p.fill('[data-h="1|open"]', '20:00'); await p.dispatchEvent('[data-h="1|open"]', 'change'); await wait(p, 300);
    const after = await p.evaluate(() => JSON.stringify(db.settings.hours[1]));
    ok(`${D} horaires incohérents refusés et non conservés`, before === after, `${before} → ${after}`);
    await p.evaluate((b) => { db.settings.hours[1] = JSON.parse(b); save(); }, before);
    await go(p, '#/gestion/parametres');
    await p.check('[data-closed="6"]'); await wait(p);
    ok(`${D} samedi fermé`, await p.evaluate(() => db.settings.hours[6] === null));
    await go(p, '#/'); await p.click('.search-card [data-dates]'); await wait(p, 400);
    const satOff = await p.evaluate(() => [...document.querySelectorAll('.overlay [data-day]')].filter((x) => parse(x.dataset.day + 'T00:00').getDay() === 6).every((x) => x.disabled));
    ok(`${D} samedi grisé dans le calendrier client`, satOff);
    await p.keyboard.press('Escape');
    await go(p, '#/gestion/parametres');
    await p.uncheck('[data-closed="6"]'); await wait(p);
    await p.fill('[data-cgv]', 'Conditions de test PRISMA.'); await p.click('[data-savecgv]'); await wait(p, 200);
    await p.evaluate(() => openInfoDoc('cgv')); await wait(p, 300);
    ok(`${D} CGV modifiées visibles côté client`, /Conditions de test PRISMA/.test(await p.$eval('.overlay', (e) => e.innerText)));
    await p.keyboard.press('Escape');
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click('[data-export]')]);
    const js = JSON.parse(fs.readFileSync(await dl.path(), 'utf8'));
    ok(`${D} export des données (JSON)`, Array.isArray(js.reservations) && js.version >= 2);
    await scan(p, `${D} paramètres`); await shot(p, `${D}-29-parametres`);
    await p.click('main [data-reset], .page [data-reset]'); await wait(p, 300); await p.click('.overlay [data-ok]'); await wait(p, 800);
    ok(`${D} réinitialisation de la démonstration`, await p.evaluate(() => !db.vehicles.some((v) => v.name === 'Fiat 500') && vehicle('v-clio').price === 39 && db.settings.cgv !== 'Conditions de test PRISMA.'));
  });

  await scenario(`${D} espace loueur : déconnexion`, async () => {
    await go(p, '#/gestion/parametres');
    await p.click('.page [data-adminlogout]'); await wait(p, 400);
    ok(`${D} déconnexion : écran de connexion`, !!(await p.$('[data-admin-login]')) && !(await p.$('.admin')));
    await go(p, '#/gestion/planning');
    ok(`${D} déconnecté : les pages du logiciel restent fermées`, !(await p.$('.admin')));
    await adminLogin('prisma', 'Yvrac2026');
    ok(`${D} reconnexion : retour sur la page demandée`, !!(await p.$('.admin')) && (await p.url()).endsWith('/gestion/planning'));
  });

  if (mobile) await scenario('mobile navigation du logiciel', async () => {
    await go(p, '#/gestion');
    for (const k of ['reservations', 'planning', 'flotte', 'parametres']) {
      await p.click(`.mnav a[href="/gestion/${k}"]`); await wait(p, 500);
      ok(`mobile barre de navigation → ${k}`, (await p.url()).endsWith('/gestion/' + k));
    }
  });
  await ctx.close();
}
function location_is(url, hash) { return url.endsWith(hash); }

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const only = process.argv[2];
  if (!only || only === 'ordi') await run(browser, 'ordi');
  if (!only || only === 'mobile') await run(browser, 'mobile');
  await browser.close();
  const fails = results.filter((r) => r.startsWith('ÉCHEC'));
  console.log(results.join('\n'));
  console.log(`\n${results.filter((r) => r.startsWith('OK')).length} OK, ${fails.length} échecs`);
  console.log(anomalies.length ? 'VALEURS CASSÉES :\n' + [...new Set(anomalies)].join('\n') : 'aucune valeur cassée à l’écran');
  console.log(errors.length ? 'ERREURS JS :\n' + [...new Set(errors)].join('\n') : 'aucune erreur JS');
})();
