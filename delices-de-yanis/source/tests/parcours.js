// Parcours complet du site : carte, options, panier, code promo, livraison, commande, suivi en direct,
// écran cuisine (connexion, statuts, rupture, pause), mes commandes, pages sans défilement horizontal.
// Usage : node tests/parcours.js [desktop|mobile|all]   (serveur : node tests/serve.js out/web 8791)
const { chromium } = require('playwright-core');

const BASE = process.env.BASE || 'http://127.0.0.1:8791';
const which = process.argv[2] || 'all';
const OPEN_TIME = new Date('2026-09-29T19:30:00+02:00'); // mardi soir : restaurant ouvert
let fails = 0, passes = 0;
const ok = (cond, msg) => { if (cond) passes++; else { fails++; console.log('  ÉCHEC :', msg); } };
const num = (s) => parseFloat(String(s).replace(/[^\d,.-]/g, '').replace(',', '.'));

async function journey(browser, dname, dev) {
  console.log(`— ${dname}`);
  const ctx = await browser.newContext({ ...dev, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
  await ctx.clock.install({ time: OPEN_TIME });
  const errors = [];
  const watch = (p, tag) => { p.on('pageerror', (e) => errors.push(`${tag}: ${e.message}`)); p.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(`${tag}: ${m.text()}`); }); };
  const p = await ctx.newPage(); watch(p, 'client');
  const mobile = dev.viewport.width < 700;

  // accueil
  await p.goto(BASE + '/');
  ok(await p.title() === 'Les Délices de Yanis : pizzas, tacos et plats maison à Bordeaux', 'titre de l’accueil');
  ok(await p.locator('.st-pill.open').count() >= 1, 'restaurant affiché ouvert à 19h30');
  ok(await p.locator('.hd-cart-n').isHidden(), 'pastille du panier cachée quand il est vide');
  ok(await p.locator('[data-mode="livraison"]').count() === 0, 'pas de livraison proposée (réglage par défaut)');
  ok((await p.textContent('.hero .pickup-info')).includes('À emporter'), 'accueil : commande à emporter');
  ok(!/livr/i.test(await p.textContent('#main')), 'aucune mention de livraison sur l’accueil');

  // carte : recherche et filtres
  await p.click('a.btn-primary[href="/carte"]');
  await p.waitForURL(/\/carte$/);
  ok(await p.locator('[data-empty]').isHidden(), 'message « aucun plat » caché');
  await p.fill('[data-q]', 'chevre');
  ok(await p.locator('.pcard:visible').count() >= 2, 'recherche sans accent « chevre »');
  await p.fill('[data-q]', 'zzzz');
  ok(await p.locator('[data-empty]').isVisible(), 'message « aucun plat » quand rien ne correspond');
  await p.click('[data-reset]');
  const all = await p.locator('.pcard:visible').count();
  ok(all === 27, `27 plats affichés (${all})`);
  await p.click('[data-f="veggie"]');
  ok((await p.locator('.pcard:visible').count()) < all, 'filtre végétarien');
  await p.click('[data-f=""]');

  // tacos : taille L (2 viandes), menu avec boisson
  await p.click('.pcard [data-open="tacos"]');
  await p.waitForSelector('.pd-sheet.open');
  ok((await p.textContent('[data-add]')).includes('Choisissez 1 viande'), 'bouton bloqué sans viande');
  ok(await p.locator('[data-g="boisson-menu"]').evaluate((e) => e.classList.contains('hidden')), 'boisson du menu cachée tant que « seul »');
  await p.click('[data-g="taille-tacos"] [data-o="l"]');
  await p.click('[data-g="viandes"] [data-o="poulet"]');
  await p.click('[data-g="viandes"] [data-o="cordon"]');
  await p.click('[data-g="viandes"] [data-o="merguez"]'); // 3e viande refusée en taille L
  ok(await p.locator('[data-g="viandes"] .opt.on').count() === 2, 'taille L : 2 viandes au maximum');
  await p.click('[data-g="sauces"] [data-o="algerienne"]');
  await p.click('[data-g="formule"] [data-o="menu"]');
  ok(await p.locator('[data-g="boisson-menu"]').evaluate((e) => !e.classList.contains('hidden')), 'boisson du menu affichée en formule menu');
  ok(num(await p.textContent('[data-add] b')) === 13.5, 'prix tacos L en menu : 13,50 €');
  await p.click('[data-qp]');
  ok(num(await p.textContent('[data-add] b')) === 27, 'quantité 2 : 27,00 €');
  await p.click('[data-add]');
  await p.waitForSelector('.pd-sheet', { state: 'detached' });
  ok((await p.textContent('.hd-cart-n')).trim() === '2', 'panier : 2 articles');

  // pizza Mega avec supplément
  await p.click('.pcard [data-open="pizza-poulet-curry"]');
  await p.waitForSelector('.pd-sheet.open');
  await p.click('[data-g="taille-pizza"] [data-o="mega"]');
  await p.click('[data-g="supp-pizza"] [data-o="chevre"]');
  ok(num(await p.textContent('[data-add] b')) === 18, 'La Yanis Mega + chèvre : 18,00 €');
  await p.fill('[data-note]', 'Bien cuite');
  await p.click('[data-add]');
  await p.waitForSelector('.pd-sheet', { state: 'detached' });
  if (!mobile) ok((await p.locator('[data-cartpanel] .cline').count()) === 2, 'panier fixe à droite : 2 lignes');

  // panier : retrait au comptoir, code promo
  await p.click(mobile ? '.cartbar' : '.hd-cart');
  await p.waitForSelector('.cart-sheet.open');
  const sheet = p.locator('.cart-sheet');
  ok(await sheet.evaluate((el) => el.querySelector('.sheet').scrollWidth <= el.querySelector('.sheet').clientWidth + 1), 'panier sans débordement horizontal');
  ok(await sheet.locator('.pickup-info').count() === 1, 'panier : retrait au comptoir indiqué');
  await sheet.locator('.promo summary').click();
  await sheet.locator('[data-promo] input').fill('yanis10');
  await sheet.locator('[data-promo] button').click();
  const tot = num(await sheet.locator('.tots .tot b').textContent());
  ok(tot === 40.5, `total avec YANIS10 : 40,50 € (${tot})`);
  await sheet.locator('[data-go-checkout]').click();
  await p.waitForURL(/\/commande$/);

  // commande : champs obligatoires, puis paiement
  ok((await p.textContent('.co-sec h2')).includes('Retrait au comptoir'), 'commande : retrait au comptoir');
  await p.click('[data-pay]');
  ok(await p.locator('.f.err').count() >= 2, 'champs obligatoires signalés');
  await p.fill('[name=firstName]', 'Nora');
  await p.fill('[name=lastName]', 'Test');
  await p.fill('[name=phone]', '06 39 98 12 34');
  await p.fill('[name=email]', 'nora@example.com');
  ok(num(await p.textContent('[data-total]')) === 40.5, 'total repris sur la page de commande');
  await p.click('[data-pay]');
  await p.waitForURL(/\/suivi\//, { timeout: 8000 });
  const orderNo = (await p.textContent('.track-card .kicker')).match(/n° (\d+)/)[1];
  ok(/Commande reçue/.test(await p.textContent('.track-card h1')), 'suivi : commande reçue');
  ok((await p.locator('.track li.now b').textContent()) === 'Reçue', 'suivi : étape « Reçue »');
  const suiviUrl = p.url();
  await p.goto(BASE + '/');
  ok((await p.locator('.live').textContent()).includes(`n° ${orderNo}`), 'barre « commande en cours » sur l’accueil');
  await p.goto(suiviUrl);

  // écran cuisine dans un second onglet
  const k = await ctx.newPage(); watch(k, 'cuisine');
  await k.goto(BASE + '/cuisine');
  await k.fill('[name=login]', 'yanis'); await k.fill('[name=pw]', 'mauvais');
  await k.click('[data-login] button[type=submit]');
  ok(await k.locator('.err-m').first().textContent() === 'Identifiant ou mot de passe incorrect.', 'mauvais mot de passe refusé');
  await k.fill('[name=login]', ' Yanis '); await k.fill('[name=pw]', 'Palais2026');
  await k.click('[data-login] button[type=submit]');
  await k.waitForSelector('.kboard');
  const card = k.locator(`.kcard:has(.kno:text-is("N° ${orderNo}"))`);
  ok(await card.count() === 1, `cuisine : commande n° ${orderNo} reçue`);
  ok((await card.locator('.klines').textContent()).includes('Bien cuite'), 'cuisine : précision du client affichée');
  ok((await card.locator('.klines').textContent()).includes('Cordon bleu'), 'cuisine : viandes du tacos affichées');
  ok((await card.locator('.mode').textContent()).includes('À emporter'), 'cuisine : commande à emporter');
  await card.locator('[data-next]').click();
  await p.waitForFunction(() => document.querySelector('.track li.now b')?.textContent === 'En préparation', null, { timeout: 8000 }).catch(() => {});
  ok((await p.locator('.track li.now b').textContent()) === 'En préparation', 'suivi mis à jour : en préparation');
  await k.locator(`.kcard:has(.kno:text-is("N° ${orderNo}")) [data-next]`).click();
  await p.waitForFunction(() => document.querySelector('.track li.now b')?.textContent === 'Prête', null, { timeout: 8000 }).catch(() => {});
  ok((await p.locator('.track li.now b').textContent()) === 'Prête', 'suivi mis à jour : prête');
  ok(await p.locator('.pickup').count() === 1, 'suivi : rappel du comptoir quand c’est prêt');
  await k.locator(`.kcard:has(.kno:text-is("N° ${orderNo}")) [data-next]`).click();
  await p.waitForFunction(() => /récupérée/.test(document.querySelector('.track-card h1')?.textContent || ''), null, { timeout: 8000 }).catch(() => {});
  ok(/Commande récupérée/.test(await p.textContent('.track-card h1')), 'suivi mis à jour : récupérée');
  ok(await k.locator(`.kcard:has(.kno:text-is("N° ${orderNo}"))`).count() === 0, 'cuisine : commande terminée retirée du tableau');

  // simulation d'une commande (son, pastille)
  const before = await k.locator('.k-recue .kcard').count();
  await k.click('[data-sim]');
  ok(await k.locator('.k-recue .kcard').count() === before + 1, 'cuisine : commande simulée ajoutée');

  // rupture d'un plat
  await k.click('.adm-nav a[href="/cuisine/carte"]');
  await k.waitForSelector('[data-m="pizza-reine"]');
  await k.locator('[data-m="pizza-reine"] .switch').click();
  await p.goto(BASE + '/carte');
  ok(await p.locator('.pcard[data-p="pizza-reine"].off').count() === 1, 'plat en rupture grisé sur la carte');
  ok(await p.locator('.pcard[data-p="pizza-reine"] .pcard-hit').isDisabled(), 'plat en rupture non commandable');
  // prix modifié
  await k.locator('[data-m="pizza-margherita"] .mprice input').fill('9,90');
  await k.locator('[data-m="pizza-margherita"] .mprice input').press('Enter');
  await p.goto(BASE + '/carte');
  ok((await p.locator('.pcard[data-p="pizza-margherita"] .price').textContent()).includes('9,90'), 'nouveau prix affiché sur la carte');

  // pause des commandes
  await k.click('.adm-nav a[href="/cuisine"]');
  await k.waitForSelector('.kboard');
  await k.click('[data-pause]');
  await k.click('[data-pm="30"]');
  await p.goto(BASE + '/');
  ok(await p.locator('.st-pill.paused').count() >= 1, 'site : commandes en pause affichées');
  await k.click('[data-pause]');
  await p.goto(BASE + '/');
  ok(await p.locator('.st-pill.open').count() >= 1, 'site : commandes rouvertes');

  // tableau de bord et réglages
  await k.click('.adm-nav a[href="/cuisine/tableau"]');
  ok(await k.locator('.kpi').count() === 4, 'tableau de bord : 4 indicateurs');
  await k.click('.adm-nav a[href="/cuisine/reglages"]');
  await k.fill('[name=phone]', '05 56 00 00 00');
  await k.click('[data-set] button[type=submit]');
  await p.goto(BASE + '/infos');
  ok((await p.locator('.ft').textContent()).includes('05 56 00 00 00'), 'téléphone affiché après réglage');
  // la livraison se réactive d'une case, puis se coupe de nouveau
  await k.check('[name=delivery]');
  await k.click('[data-set] button[type=submit]');
  await p.goto(BASE + '/');
  ok(await p.locator('[data-mode="livraison"]').count() >= 1, 'livraison réactivée : choix proposé sur l’accueil');
  await k.uncheck('[name=delivery]');
  await k.click('[data-set] button[type=submit]');
  await p.goto(BASE + '/');
  ok(await p.locator('[data-mode="livraison"]').count() === 0, 'livraison coupée de nouveau');
  await k.click('[data-logout]');
  ok(await k.locator('[data-login]').count() === 1, 'déconnexion de l’espace restaurant');

  // mes commandes
  await p.goto(BASE + '/commandes');
  ok(await p.locator('.orow').count() === 1, 'mes commandes : 1 commande');
  ok((await p.locator('.orow .badge').textContent()) === 'Terminée', 'mes commandes : statut terminé');

  // client qui revient : recommander en un geste
  await p.goto(BASE + '/');
  ok(await p.locator('.again-card').count() === 1, 'accueil : proposition de recommander');
  ok(await p.locator('.live').count() === 0, 'plus de barre « commande en cours » une fois livrée');
  await p.click('[data-again-last]');
  await p.waitForSelector('.cart-sheet.open');
  ok((await p.textContent('.hd-cart-n')).trim() === '3', 'recommander : 3 articles remis au panier');
  await p.keyboard.press('Escape');

  // aucune page ne défile horizontalement
  for (const u of ['/', '/carte', '/infos', '/pizza-bordeaux', '/tacos-bordeaux', '/kebab-bordeaux', '/halal-bordeaux', '/commandes', '/cuisine', '/page-inconnue']) {
    await p.goto(BASE + u);
    const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(over <= 0, `pas de défilement horizontal sur ${u} (${over}px)`);
  }
  ok(errors.length === 0, 'aucune erreur JavaScript' + (errors.length ? ' : ' + errors.join(' | ') : ''));
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const devices = { desktop: { viewport: { width: 1366, height: 900 } }, mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
  for (const [n, d] of Object.entries(devices)) if (which === 'all' || which === n) await journey(browser, n, d);
  await browser.close();
  console.log(`${passes} OK, ${fails} échec(s)`);
  process.exit(fails ? 1 : 0);
})();
