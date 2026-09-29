// Captures d'écran du site (ordinateur et téléphone) pour la relecture visuelle.
// Usage : node tests/shots.js <dossier de sortie> [desktop|mobile|all] [noms de captures...]
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

const BASE = process.env.BASE || 'http://127.0.0.1:8791';
const OUT = path.resolve(process.argv[2] || 'shots');
const which = process.argv[3] || 'all';
const only = process.argv.slice(4);
fs.mkdirSync(OUT, { recursive: true });

const SCENES = [
  ['accueil', async (p) => { await p.goto(BASE + '/'); }],
  ['carte', async (p) => { await p.goto(BASE + '/carte'); }],
  ['produit-tacos', async (p) => { await p.goto(BASE + '/carte'); await p.click('[data-open="tacos"]'); await p.waitForTimeout(450); }, { viewport: true }],
  ['produit-pizza', async (p) => { await p.goto(BASE + '/carte'); await p.click('[data-open="pizza-reine"]'); await p.waitForTimeout(450); }, { viewport: true }],
  ['panier', async (p) => {
    await p.goto(BASE + '/carte');
    await p.click('[data-open="pizza-poulet-curry"]'); await p.waitForTimeout(350); await p.click('[data-add]'); await p.waitForTimeout(400);
    await p.click('[data-open="tacos"]'); await p.waitForTimeout(350); await p.click('.og[data-g="viandes"] [data-o="poulet"]'); await p.click('.og[data-g="sauces"] [data-o="algerienne"]'); await p.click('[data-add]'); await p.waitForTimeout(400);
    await p.click('.hd-cart'); await p.waitForTimeout(450);
  }, { viewport: true }],
  ['commande', async (p) => {
    await p.goto(BASE + '/carte');
    await p.click('[data-open="pizza-reine"]'); await p.waitForTimeout(350); await p.click('[data-add]'); await p.waitForTimeout(300);
    await p.goto(BASE + '/commande'); await p.waitForTimeout(300);
  }],
  ['suivi', async (p) => {
    await p.goto(BASE + '/carte');
    await p.click('[data-open="burger"]'); await p.waitForTimeout(350); await p.click('[data-add]'); await p.waitForTimeout(300);
    await p.goto(BASE + '/commande'); await p.waitForTimeout(300);
    await p.fill('[name=firstName]', 'Nora'); await p.fill('[name=lastName]', 'Test'); await p.fill('[name=phone]', '06 39 98 12 34');
    await p.check('[name=pay][value=sur-place]', { force: true });
    await p.click('[data-pay]'); await p.waitForURL(/\/suivi\//); await p.waitForTimeout(400);
  }],
  ['commandes', async (p) => { await p.goto(BASE + '/commandes'); }],
  ['infos', async (p) => { await p.goto(BASE + '/infos'); }],
  ['pizza-bordeaux', async (p) => { await p.goto(BASE + '/pizza-bordeaux'); }],
  ['kebab-bordeaux', async (p) => { await p.goto(BASE + '/kebab-bordeaux'); }],
  ['404', async (p) => { await p.goto(BASE + '/nimporte-quoi'); }],
  ['cuisine-connexion', async (p) => { await p.goto(BASE + '/cuisine'); }],
  ['cuisine', async (p) => { await login(p); }],
  ['cuisine-tableau', async (p) => { await login(p); await p.goto(BASE + '/cuisine/tableau'); }],
  ['cuisine-carte', async (p) => { await login(p); await p.goto(BASE + '/cuisine/carte'); }],
  ['cuisine-reglages', async (p) => { await login(p); await p.goto(BASE + '/cuisine/reglages'); }],
];
async function login(p) {
  await p.goto(BASE + '/cuisine');
  await p.fill('[name=login]', 'yanis'); await p.fill('[name=pw]', 'Palais2026'); await p.click('[data-login] button[type=submit]');
  await p.waitForSelector('.adm');
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const devices = { desktop: { viewport: { width: 1366, height: 900 }, deviceScaleFactor: 1 }, mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
  const errors = [];
  for (const [dname, dev] of Object.entries(devices)) {
    if (which !== 'all' && which !== dname) continue;
    for (const [name, fn, opt = {}] of SCENES) {
      if (only.length && !only.includes(name)) continue;
      const ctx = await browser.newContext({ ...dev, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
      const p = await ctx.newPage();
      p.on('pageerror', (e) => errors.push(`${dname}/${name}: ${e.message}`));
      p.on('console', (m) => { if (m.type() === 'error') errors.push(`${dname}/${name}: ${m.text()}`); });
      try {
        await fn(p);
        if (!opt.viewport) {
          // défilement jusqu'en bas puis retour : les images « lazy » se chargent
          await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
          await p.waitForTimeout(700);
        }
        await p.waitForTimeout(500);
        await p.screenshot({ path: path.join(OUT, `${dname}-${name}.jpg`), type: 'jpeg', quality: 80, fullPage: !opt.viewport });
      } catch (e) { errors.push(`${dname}/${name}: ${e.message.split('\n')[0]}`); }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(errors.length ? 'ERREURS\n' + errors.join('\n') : 'aucune erreur');
})();
