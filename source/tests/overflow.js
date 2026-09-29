// Débordement horizontal : aucune page ne doit dépasser la largeur de l'écran (téléphone 360 et 390 px)
const { chromium } = require('playwright-core');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '../out/PRISMA-AUTOMOBILES-application.html');
const pages = ['#/', '#/vehicules', '#/location-voiture-bordeaux', '#/location-camion-demenagement-bordeaux', '#/location-voiture-au-mois-bordeaux', '#/guides', '#/guides/quel-utilitaire-pour-demenager', '#/faq', '#/conditions-de-location', '#/vehicule/renault-clio-v', '#/page-inexistante', '#/vehicules-occasion', '#/vehicule-occasion/peugeot-3008-1-5-bluehdi-130-eat8-allure-2020', '#/achat-vente-voiture-bordeaux', '#/gestion/ventes', '#/vehicules/utilitaire', '#/vehicule/v-glc', '#/vehicule/v-master20', '#/professionnels', '#/contact', '#/agences', '#/compte', '#/gestion', '#/gestion/reservations', '#/gestion/planning', '#/gestion/flotte', '#/gestion/clients', '#/gestion/tarifs', '#/gestion/parametres'];
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  let bad = 0;
  for (const w of [360, 390, 768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 800, hasTouch: w < 800 });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('prisma-intro', '1'); } catch (e) {} });
    const p = await ctx.newPage();
    for (const h of pages) {
      await p.goto(FILE + h); await p.waitForTimeout(500);
      const r = await p.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const culprits = [];
        if (sw > W + 1) for (const el of document.querySelectorAll('#app *')) { const b = el.getBoundingClientRect(); if (b.right > W + 1 && b.width > 0 && !el.closest('.hscroll,.tst-track,.marquee,.chips,.plan,.tbl-wrap,.h2-cars')) culprits.push((el.className && el.className.baseVal === undefined ? el.className : el.tagName).toString().slice(0, 40) + ' ' + Math.round(b.right)); }
        return { W, sw, culprits: culprits.slice(0, 4) };
      });
      if (r.sw > r.W + 1) { bad++; console.log(`DÉBORDE ${w}px ${h} : ${r.sw} > ${r.W}`, r.culprits.join(' | ')); }
    }
    await ctx.close();
  }
  console.log(bad ? `${bad} page(s) débordent` : 'aucun débordement horizontal');
  await browser.close();
})();
