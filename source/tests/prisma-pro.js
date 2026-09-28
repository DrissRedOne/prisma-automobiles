const { chromium } = require('playwright-core');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const SHOTS = path.resolve(__dirname, '../shots');
const errors = [];
const checks = [];
const ok = (label, cond, extra = '') => { checks.push(`${cond ? 'OK ' : 'ÉCHEC'} ${label}${extra ? ' · ' + extra : ''}`); };
async function shot(page, name, full = true) { await page.waitForTimeout(250); await page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: full }); }
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris' });
  await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/ERR_|net::|Failed to load resource|GPU stall|WebGL/.test(m.text())) errors.push('console: ' + m.text()); });
  await p.goto(FILE);
  await p.waitForTimeout(600);
  await p.click('.search-card button[type=submit]');
  await p.waitForTimeout(500);

  // 1. Résultats : bascule particulier -> professionnel, prix HT
  const priceOf = () => p.$eval('.rcard .rc-p', (e) => e.textContent.replace(/\s+/g, ' ').trim()).catch(() => '');
  const ttc = await priceOf();
  await p.click('[data-pro-set="1"]');
  await p.waitForTimeout(500);
  const htp = await priceOf();
  ok('prix des résultats passent en HT', /HT/.test(htp) && htp !== ttc, `${ttc} -> ${htp}`);
  await shot(p, 'pro01-resultats', false);

  // 2. Fiche véhicule + options : prix HT
  const first = await p.$('a.rcard:not(.unavail)');
  await first.click();
  await p.waitForTimeout(500);
  const cta = await p.$eval('body', (b) => b.innerText);
  ok('fiche véhicule affiche du HT', /HT/.test(cta));
  await p.click('[data-continue]');
  await p.waitForTimeout(500);
  const sum = await p.$eval('body', (b) => b.innerText);
  ok('récapitulatif options : Total HT + TVA récupérable', /TVA 20 %, récupérable/i.test(sum) && /HT par jour/.test(sum) && /HT/.test(sum));
  await shot(p, 'pro02-options', false);
  await p.click('[data-continue]');
  await p.waitForTimeout(500);

  // 3. Coordonnées : bloc société visible en pro, masqué en particulier
  ok('bloc société visible en professionnel', await p.isVisible('[data-pro] input[name=company]'));
  await shot(p, 'pro03-coordonnees-pro');
  await p.click('.seg button[data-type="particulier"]');
  await p.waitForTimeout(500);
  ok('bloc société masqué en particulier', !(await p.isVisible('input[name=company]')));
  ok('libellé « Vos coordonnées » en particulier', (await p.$eval("[data-details]", (f) => f.textContent)).includes("Vos coordonnées"));
  await shot(p, 'pro04-coordonnees-particulier');
  await p.click('.seg button[data-type="professionnel"]');
  await p.waitForTimeout(500);
  ok('retour en pro : bloc société de nouveau visible', await p.isVisible('input[name=company]'));
  // SIRET invalide puis valide
  await p.fill('input[name=company]', 'Transports Garonne Express');
  await p.fill('input[name=siret]', '123 456 789');
  await p.fill('input[name=vatNum]', 'fr12123456789');
  await p.fill('input[name=firstName]', 'Karim');
  await p.fill('input[name=lastName]', 'Benali');
  await p.fill('input[name=email]', 'karim@tge.exemple.fr');
  await p.fill('input[name=phone]', '06 11 22 33 44');
  await p.fill('input[name=address]', '12 quai de Queyries');
  await p.fill('input[name=zip]', '33100');
  await p.fill('input[name=city]', 'Bordeaux');
  await p.fill('input[name=birth]', '1985-03-02');
  await p.fill('input[name=licNumber]', 'KB8503021');
  await p.fill('input[name=licDate]', '2004-06-10');
  await p.dispatchEvent('input[name=licDate]', 'change');
  await p.waitForTimeout(400);
  await p.check('input[name=cgv]');
  await p.click('[data-details] button[type=submit]');
  await p.waitForTimeout(400);
  ok('SIRET incomplet refusé', await p.$eval('[data-f="siret"]', (e) => e.classList.contains('err')));
  await p.fill('input[name=siret]', '812 345 678 00021');
  await p.click('[data-details] button[type=submit]');
  await p.waitForTimeout(600);
  const url = p.url().split('#')[1];
  ok('réservation créée', /\/reservation\//.test(url), url);
  const saved = await p.evaluate(() => { const r = db.reservations[db.reservations.length - 1]; const c = db.customers.find((x) => x.id === r.customerId); return { type: c.type, company: c.company, siret: c.siret, vat: c.vatNum, id: r.id }; });
  ok('client enregistré en professionnel', saved.type === 'professionnel' && saved.company === 'Transports Garonne Express' && saved.vat === 'FR12123456789', JSON.stringify(saved));
  await shot(p, 'pro05-recap');

  // 4. Paiement : virement
  await p.goto(FILE + '#/paiement/' + saved.id);
  await p.waitForTimeout(500);
  ok('option virement proposée', await p.isVisible('[data-m="virement"]'));
  ok('montant HT affiché au paiement', /HT/.test(await p.$eval('body', (b) => b.innerText)));
  await p.click('[data-m="virement"]');
  await p.waitForTimeout(300);
  ok('bloc virement affiché', await p.isVisible('[data-transfer]'));
  await shot(p, 'pro06-paiement-virement', false);
  await p.click('[data-pay]');
  await p.waitForTimeout(700);
  const after = await p.evaluate((i) => { const r = db.reservations.find((x) => x.id === i); return { st: r.status, tr: !!r.transfer, paid: r.payments.length }; }, saved.id);
  ok('virement annoncé, pas de paiement enregistré', after.tr && after.paid === 0 && after.st === 'attente_paiement', JSON.stringify(after));
  ok('page réservation : attente du virement', /attendons votre virement/i.test(await p.$eval('body', (b) => b.innerText)));
  await shot(p, 'pro07-attente-virement');

  // 5. Facture au nom de la société
  await p.evaluate((i) => openDocument(db.reservations.find((x) => x.id === i), 'facture'), saved.id);
  await p.waitForTimeout(400);
  const inv = await p.$eval('.overlay', (e) => e.innerText).catch(() => '');
  ok('facture : société, SIRET et n° TVA', inv.includes('Transports Garonne Express') && inv.includes('812 345 678 00021') && inv.includes('FR12123456789'));
  await shot(p, 'pro08-facture', false);
  await p.keyboard.press('Escape');

  // 6. Logiciel : badges dans le tiroir de la réservation, encaissement du virement
  await p.goto(FILE + '#/gestion/reservations');
  await p.waitForTimeout(500);
  await p.evaluate((i) => openResDrawer(i), saved.id);
  await p.waitForTimeout(400);
  const dr = await p.$eval('.drawer', (e) => e.innerText);
  ok('tiroir : badges Professionnel et Virement annoncé', dr.includes('Professionnel') && dr.includes('Virement annoncé'));
  ok('tiroir : société et N° TVA', dr.includes('Transports Garonne Express') && dr.includes('FR12123456789'));
  await shot(p, 'pro09-tiroir', false);
  await p.click('.drawer [data-act="pay"]');
  await p.waitForTimeout(300);
  ok('encaissement : Virement présélectionné', (await p.$eval('.overlay select[name=method]', (s) => s.value)) === 'Virement');
  await p.click('.overlay [data-ok]');
  await p.waitForTimeout(400);
  const fin = await p.evaluate((i) => db.reservations.find((x) => x.id === i).status, saved.id);
  ok('après encaissement du virement : confirmée', fin === 'confirmee', fin);

  // 7. Particulier : aucune trace des champs société
  const p2 = await ctx.newPage();
  await p2.goto(FILE);
  await p2.evaluate(() => { localStorage.clear(); });
  await p2.reload();
  await p2.waitForTimeout(500);
  await p2.click('.search-card button[type=submit]');
  await p2.waitForTimeout(400);
  const t2 = await p2.$eval('body', (b) => b.innerText);
  ok('particulier par défaut : prix TTC (sans HT)', !/\d\s?€\s?HT/.test(t2));
  await (await p2.$('a.rcard:not(.unavail)')).click();
  await p2.waitForTimeout(400);
  await p2.click('[data-continue]'); await p2.waitForTimeout(400);
  await p2.click('[data-continue]'); await p2.waitForTimeout(400);
  ok('particulier : champs société invisibles', !(await p2.isVisible('input[name=company]')) && !(await p2.isVisible('input[name=siret]')));

  console.log(checks.join('\n'));
  console.log(errors.length ? 'ERREURS JS :\n' + errors.join('\n') : 'aucune erreur JS');
  await browser.close();
})();
