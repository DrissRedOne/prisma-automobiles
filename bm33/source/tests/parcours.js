// Parcours utilisateur : menu, filtres du stock, galerie et visionneuse, formulaires (WhatsApp, e-mail), redirections.
// Usage : node parcours.js [base]
const { chromium } = require('playwright-core');
const base = process.argv[2] || 'http://localhost:8833';
let ok = 0, ko = 0;
const check = (cond, label) => { if (cond) { ok++; console.log('  ok  ' + label); } else { ko++; console.log('  ÉCHEC ' + label); } };

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const newPage = async (mob) => {
    const ctx = await browser.newContext(mob ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
    // window.open est remplacé : on lit l'adresse WhatsApp préparée sans ouvrir d'onglet
    await ctx.addInitScript(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return {}; }; });
    const page = await ctx.newPage();
    page.__errors = [];
    page.on('pageerror', e => page.__errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') page.__errors.push(m.text()); });
    return page;
  };

  console.log('Menu (téléphone)');
  let p = await newPage(true);
  await p.goto(base + '/');
  await p.click('[data-burger]');
  check(await p.isVisible('#menu'), 'le menu s’ouvre');
  check(await p.evaluate(() => document.activeElement && document.activeElement.classList.contains('menu__link')), 'le focus va dans le menu');
  check(await p.evaluate(() => document.querySelector('#contenu').inert === true), 'le reste de la page est inerte');
  await p.keyboard.press('Escape');
  check(!(await p.isVisible('#menu')), 'Échap ferme le menu');
  check(await p.evaluate(() => document.activeElement && document.activeElement.hasAttribute('data-burger')), 'le focus revient sur le bouton');
  check(p.__errors.length === 0, 'aucune erreur de script' + (p.__errors.length ? ' : ' + p.__errors.join(' | ') : ''));
  await p.context().close();

  console.log('Stock : filtres et tri');
  p = await newPage(false);
  await p.goto(base + '/vehicules');
  const total = await p.$$eval('[data-item]', els => els.length);
  check(total === +(await p.textContent('[data-count]')), `compteur initial (${total})`);
  await p.click('label.chip:has-text("SUV")');
  const nSuv = await p.$$eval('[data-item]:not([hidden]) [data-card]', els => els.filter(e => e.dataset.body === 'SUV').length);
  const nShown = await p.$$eval('[data-item]:not([hidden])', els => els.length);
  check(nSuv === nShown && nShown > 0, `filtre SUV (${nShown} affichés, tous SUV)`);
  check(+(await p.textContent('[data-count]')) === nShown, 'compteur mis à jour');
  check(p.url().includes('carrosserie=SUV'), 'filtre gardé dans l’adresse');
  await p.selectOption('select[name="sort"]', 'price-asc');
  const prices = await p.$$eval('[data-item]:not([hidden]) [data-card]', els => els.map(e => +e.dataset.price));
  check(prices.every((v, i) => !i || prices[i - 1] <= v), 'tri par prix croissant');
  await p.reload();
  check(await p.isChecked('input[name="body"][value="SUV"]'), 'filtre restauré au rechargement');
  await p.click('label.chip:has-text("Citadine")');
  await p.selectOption('select[name="fuel"]', 'Diesel');
  check(await p.isVisible('[data-empty]'), 'aucun résultat : message et solutions affichés');
  check(!(await p.isVisible('[data-promo]')), 'bandeau d’appel masqué sans résultat');
  await p.click('[data-reset]');
  check(+(await p.textContent('[data-count]')) === total, 'Voir tout le stock remet tout');
  check(p.__errors.length === 0, 'aucune erreur de script' + (p.__errors.length ? ' : ' + p.__errors.join(' | ') : ''));
  await p.context().close();

  console.log('Fiche : galerie et visionneuse (bureau)');
  p = await newPage(false);
  await p.goto(base + '/vehicules/porsche-macan-2-0-pdk-2022');
  const nPh = await p.$$eval('[data-lb-fig]', els => els.length);
  await p.click('.gal__all');
  check(await p.evaluate(() => document.querySelector('[data-lb]').open), 'la visionneuse s’ouvre');
  if (nPh > 1) {
    await p.keyboard.press('ArrowRight');
    check((await p.textContent('[data-lb-index]')).trim() === '2', 'flèche droite : photo suivante');
    await p.click('[data-lb-prev]');
    check((await p.textContent('[data-lb-index]')).trim() === '1', 'bouton précédent');
  }
  const visibleImgOk = await p.evaluate(() => { const f = [...document.querySelectorAll('[data-lb-fig]')].find(x => !x.hidden); const im = f && f.querySelector('img'); return !!im && im.complete && im.naturalWidth > 0; });
  await p.waitForTimeout(400);
  check(visibleImgOk || await p.evaluate(() => { const f = [...document.querySelectorAll('[data-lb-fig]')].find(x => !x.hidden); const im = f && f.querySelector('img'); return !!im && im.naturalWidth > 0; }), 'la photo agrandie se charge');
  await p.keyboard.press('Escape');
  check(!(await p.evaluate(() => document.querySelector('[data-lb]').open)), 'Échap ferme la visionneuse');
  check(await p.evaluate(() => document.activeElement && document.activeElement.classList.contains('gal__all')), 'le focus revient au bouton');
  const wa = await p.getAttribute('.vbuy__duo a[href^="https://wa.me"]', 'href');
  check(wa && decodeURIComponent(wa).includes('BM-01'), 'WhatsApp prérempli avec la référence');
  const rdv = await p.getAttribute('.vbuy__ctas a.btn--chrome', 'href');
  check(rdv === '/contact?vehicule=BM-01#rendez-vous', 'Réserver un essai mène au formulaire prérempli');
  check(p.__errors.length === 0, 'aucune erreur de script' + (p.__errors.length ? ' : ' + p.__errors.join(' | ') : ''));
  await p.context().close();

  console.log('Fiche : galerie (téléphone)');
  p = await newPage(true);
  await p.goto(base + '/vehicules/porsche-macan-2-0-pdk-2022');
  if (await p.isVisible('[data-gal-next]')) {
    await p.click('[data-gal-next]');
    await p.waitForTimeout(900);
    check((await p.textContent('[data-gal-index]')).trim() === '2', 'bouton suivant : photo 2');
  }
  const dockWa = await p.getAttribute('.dock a[href^="https://wa.me"]', 'href');
  check(dockWa && decodeURIComponent(dockWa).includes('BM-01'), 'barre de contact : WhatsApp prérempli');
  check((await p.textContent('.dock')).includes('Essai'), 'barre de contact : bouton Essai');
  check(await p.evaluate(() => innerWidth === 390 && document.documentElement.scrollWidth === 390), 'aucun débordement horizontal');
  await p.context().close();

  console.log('Contact : rendez-vous');
  p = await newPage(false);
  await p.goto(base + '/contact?vehicule=BM-03#rendez-vous');
  check((await p.inputValue('[data-vehicule-select]')).includes('BM-03'), 'véhicule présélectionné depuis la fiche');
  await p.click('label.pill:has-text("Autre question")');
  check(!(await p.isVisible('[data-field-vehicule]')), 'champ véhicule masqué hors essai');
  await p.click('label.pill:has-text("Essai")');
  await p.click('form[data-form="rendez-vous"] [data-send="whatsapp"]');
  check((await p.evaluate(() => window.__opened.length)) === 0, 'formulaire incomplet : rien n’est envoyé');
  await p.fill('form[data-form="rendez-vous"] input[name="Nom"]', 'Jean Test');
  await p.fill('form[data-form="rendez-vous"] input[name="Téléphone"]', '06 12 34 56 78');
  await p.click('form[data-form="rendez-vous"] [data-send="whatsapp"]');
  const u = await p.evaluate(() => window.__opened[0] || '');
  const txt = decodeURIComponent(u.split('text=')[1] || '');
  check(u.startsWith('https://wa.me/33784952067?text='), 'WhatsApp ouvert vers le bon numéro');
  check(txt.includes('Jean Test') && txt.includes('BM-03') && txt.includes('Essai'), 'message complet (nom, véhicule, objet)');
  check(await p.isVisible('form[data-form="rendez-vous"] [data-form-done]'), 'confirmation affichée');
  check(p.__errors.length === 0, 'aucune erreur de script' + (p.__errors.length ? ' : ' + p.__errors.join(' | ') : ''));
  await p.context().close();

  console.log('Vendre : estimation en trois étapes');
  p = await newPage(true);
  await p.goto(base + '/vendre-ma-voiture#estimation');
  const steps = '[data-steps-form] [data-step]';
  const visibleStep = () => p.$$eval(steps, els => els.findIndex(e => !e.hidden));
  check(await visibleStep() === 0, 'étape 1 affichée seule');
  await p.click('[data-steps-form] [data-step]:not([hidden]) [data-next]');
  check(await visibleStep() === 0, 'étape 1 incomplète : on reste');
  await p.fill('input[name="Marque"]', 'Peugeot');
  await p.fill('input[name="Modèle"]', '308 PureTech 130');
  await p.selectOption('select[name="Année"]', '2019');
  await p.fill('input[name="Kilométrage"]', '84 000');
  await p.click('[data-steps-form] [data-step]:not([hidden]) [data-next]');
  check(await visibleStep() === 1, 'étape 2');
  await p.click('[data-steps-form] [data-step]:not([hidden]) [data-next]');
  check(await visibleStep() === 2, 'étape 3');
  await p.fill('form[data-form="estimation"] input[name="Nom"]', 'Marie Test');
  await p.fill('form[data-form="estimation"] input[name="Téléphone"]', '0612345678');
  await p.click('form[data-form="estimation"] [data-send="whatsapp"]');
  const t2 = decodeURIComponent((await p.evaluate(() => window.__opened[0] || '')).split('text=')[1] || '');
  check(t2.startsWith('Estimation : Peugeot 308 PureTech 130 (2019, 84 000 km)'), 'objet de l’estimation');
  check(t2.includes('Marie Test') && t2.includes('État : Bon'), 'message complet');
  check(p.__errors.length === 0, 'aucune erreur de script' + (p.__errors.length ? ' : ' + p.__errors.join(' | ') : ''));
  await p.context().close();

  console.log('Recherche sur mesure');
  p = await newPage(false);
  await p.goto(base + '/recherche');
  await p.fill('form[data-form="recherche"] input[name="Recherche"]', 'Audi Q5 Sportback');
  await p.selectOption('form[data-form="recherche"] select[name="Budget"]', { index: 4 });
  await p.fill('form[data-form="recherche"] input[name="Nom"]', 'Paul Test');
  await p.fill('form[data-form="recherche"] input[name="Téléphone"]', '0612345678');
  await p.click('form[data-form="recherche"] [data-send="whatsapp"]');
  const t3 = decodeURIComponent((await p.evaluate(() => window.__opened[0] || '')).split('text=')[1] || '');
  check(t3.startsWith('Recherche sur mesure : Audi Q5 Sportback, budget'), 'message de recherche');
  await p.context().close();

  console.log('Adresses');
  p = await newPage(false);
  let r = await p.goto(base + '/page-qui-n-existe-pas');
  check(r.status() === 404 && (await p.textContent('h1')).includes('la route'), 'page 404');
  r = await p.goto(base + '/stock');
  check(p.url().endsWith('/vehicules'), 'redirection /stock vers /vehicules');
  r = await p.goto(base + '/vehicules.html');
  check(p.url().endsWith('/vehicules'), 'adresse sans .html');
  await p.context().close();

  await browser.close();
  console.log(`\n${ok} vérifications réussies, ${ko} en échec`);
  process.exit(ko ? 1 : 0);
})();
