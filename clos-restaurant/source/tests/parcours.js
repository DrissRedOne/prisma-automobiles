// Parcours de test : intro, menu, survols, formulaire, ancres, clavier, sans JS, mouvement réduit, liens.
const { chromium } = require('playwright-core');
const fs = require('fs');
const base = process.argv[2] || 'http://localhost:8811';
const out = process.argv[3] || '/tmp/clos-parcours';
fs.mkdirSync(out, { recursive: true });
const results = [];
const ok = (name, cond, info) => { results.push((cond ? 'OK   ' : 'ÉCHEC') + ' ' + name + (info ? ' : ' + info : '')); };
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const errors = [];
  const watch = (page, label) => {
    page.on('pageerror', e => errors.push(label + ' pageerror ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(label + ' console ' + m.text()); });
  };

  // 1. intro (première visite, bureau)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); watch(page, 'intro');
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    for (const t of [150, 600, 1100, 1600, 2100, 2700, 3400]) {
      await page.waitForTimeout(t === 150 ? 150 : 500 + (t === 2700 ? 100 : 0) + (t === 3400 ? 200 : 0));
      await page.screenshot({ path: `${out}/intro-${t}.jpg`, type: 'jpeg', quality: 60 });
    }
    const st = await page.evaluate(() => ({ introGone: !document.querySelector('div.intro'), cls: document.documentElement.className, ss: sessionStorage.getItem('clos-intro'), overflow: document.documentElement.style.overflow }));
    ok('intro terminée et retirée', st.introGone && !/intro-on/.test(st.cls), JSON.stringify(st));
    // deuxième visite : pas d'intro
    await page.goto(base + '/la-carte'); await page.goto(base + '/');
    await page.waitForTimeout(300);
    const again = await page.evaluate(() => ({ has: !!document.querySelector('div.intro'), cls: document.documentElement.className }));
    ok('pas d’intro à la deuxième visite', !again.has && !/intro-on/.test(again.cls), JSON.stringify(again));

    // 2. survol des piliers et des plats
    await page.waitForTimeout(1500);
    const pil = await page.$$('.pillar');
    await pil[1].scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
    const b1 = await pil[1].boundingBox();
    await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2); await page.waitForTimeout(1300);
    const widths = await page.$$eval('.pillar', els => els.map(e => Math.round(e.getBoundingClientRect().width)));
    ok('le pilier survolé s’élargit', widths[1] > widths[0] * 1.5, widths.join('/'));
    await page.screenshot({ path: `${out}/piliers-survol.jpg`, type: 'jpeg', quality: 60 });
    const dish = await page.$$('.dish');
    await dish[2].scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
    const db = await dish[2].boundingBox();
    await page.mouse.move(db.x + db.width * 0.4, db.y + db.height / 2, { steps: 8 }); await page.waitForTimeout(900);
    const prev = await page.$eval('[data-dish-preview]', e => ({ op: getComputedStyle(e).opacity, r: e.getBoundingClientRect().toJSON() }));
    ok('aperçu du plat visible au survol', parseFloat(prev.op) > 0.9, 'opacité ' + prev.op);
    await page.screenshot({ path: `${out}/plats-survol.jpg`, type: 'jpeg', quality: 60 });
    await page.mouse.move(5, 5, { steps: 5 }); await page.waitForTimeout(700);
    const prev2 = await page.$eval('[data-dish-preview]', e => getComputedStyle(e).opacity);
    ok('aperçu masqué en quittant la liste', parseFloat(prev2) < 0.1, 'opacité ' + prev2);
    // en-tête : caché en descendant, réaffiché en remontant
    await page.mouse.wheel(0, 900); await page.waitForTimeout(900);
    const hid = await page.$eval('[data-hdr]', e => e.classList.contains('is-hidden'));
    await page.mouse.wheel(0, -300); await page.waitForTimeout(900);
    const shown = await page.$eval('[data-hdr]', e => !e.classList.contains('is-hidden') && e.classList.contains('is-solid'));
    ok('en-tête masqué en descendant puis réaffiché', hid && shown);
    await ctx.close();
  }

  // 3. menu mobile, clavier, barre de réservation
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('clos-intro', '1'); } catch (e) {} });
    const page = await ctx.newPage(); watch(page, 'mobile');
    await page.goto(base + '/la-carte'); await page.waitForTimeout(1500);
    await page.click('[data-burger]'); await page.waitForTimeout(1400);
    const m = await page.evaluate(() => ({ open: document.documentElement.classList.contains('menu-open'), hidden: document.getElementById('menu').hidden, exp: document.querySelector('[data-burger]').getAttribute('aria-expanded'), focus: document.activeElement && document.activeElement.className, mainInert: document.getElementById('contenu').inert }));
    ok('menu ouvert (aria-expanded, focus, contenu inerte)', m.open && !m.hidden && m.exp === 'true' && /menu__link/.test(m.focus) && m.mainInert, JSON.stringify(m));
    await page.screenshot({ path: `${out}/menu-mobile.jpg`, type: 'jpeg', quality: 60 });
    for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
    const inMenu = await page.evaluate(() => !!(document.activeElement.closest('#menu') || document.activeElement.matches('[data-burger]')));
    ok('le focus reste dans le menu', inMenu);
    await page.keyboard.press('Escape'); await page.waitForTimeout(1200);
    const c = await page.evaluate(() => ({ open: document.documentElement.classList.contains('menu-open'), hidden: document.getElementById('menu').hidden, exp: document.querySelector('[data-burger]').getAttribute('aria-expanded'), inert: document.getElementById('contenu').inert, ov: document.documentElement.style.overflow }));
    ok('menu fermé par Échap', !c.open && c.hidden && c.exp === 'false' && !c.inert && c.ov === '', JSON.stringify(c));
    // navigation depuis le menu
    await page.click('[data-burger]'); await page.waitForTimeout(1200);
    await Promise.all([page.waitForNavigation(), page.click('.menu__link[href="/bar-a-vins"]')]);
    ok('lien du menu vers le bar', page.url().endsWith('/bar-a-vins'), page.url());
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => ({ hidden: document.getElementById('menu').hidden, open: document.documentElement.classList.contains('menu-open') }));
    ok('menu fermé sur la nouvelle page', after.hidden && !after.open);
    // barre de réservation
    const bookOff = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    await page.evaluate(() => window.scrollTo(0, 1600)); await page.waitForTimeout(800);
    const bookOn = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(900);
    const bookFooter = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    ok('barre « Réserver » : cachée en haut, visible ensuite, cachée sur le pied de page', !bookOff && bookOn && !bookFooter, [bookOff, bookOn, bookFooter].join('/'));
    await ctx.close();
  }

  // 4. carte : ancres du sous-menu
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); watch(page, 'carte');
    await page.goto(base + '/la-carte'); await page.waitForTimeout(1500);
    await page.click('[data-subnav-link][href="#desserts"]'); await page.waitForTimeout(2200);
    const r = await page.evaluate(() => { const t = document.querySelector('#desserts .msec__title').getBoundingClientRect(); const s = document.querySelector('[data-subnav]').getBoundingClientRect(); return { titleTop: Math.round(t.top), subBottom: Math.round(s.bottom), active: document.querySelector('.subnav__link.is-active') && document.querySelector('.subnav__link.is-active').textContent }; });
    ok('ancre « Desserts » visible sous le sous-menu, lien actif', r.titleTop > r.subBottom && r.titleTop < 450 && r.active === 'Desserts', JSON.stringify(r));
    await page.screenshot({ path: `${out}/carte-desserts.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 5. formulaire de privatisation
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base });
    const page = await ctx.newPage(); watch(page, 'form');
    await page.goto(base + '/privatisation'); await page.waitForTimeout(1200);
    await page.click('.form button[type=submit]'); await page.waitForTimeout(300);
    const inval = await page.evaluate(() => document.querySelectorAll('.form :invalid').length);
    ok('formulaire vide refusé (champs requis)', inval >= 6, inval + ' champs invalides');
    await page.fill('#f-nom', 'Jeanne Test'); await page.fill('#f-societe', 'Société Test'); await page.fill('#f-email', 'jeanne@example.com'); await page.fill('#f-tel', '0600000000');
    await page.fill('#f-date', '2026-11-20'); await page.fill('#f-nb', '24'); await page.selectOption('#f-type', { label: 'Repas d’équipe' }); await page.fill('#f-msg', 'Dîner, budget 45 € par personne.');
    let navTo = null;
    page.on('framenavigated', f => { navTo = f.url(); });
    await page.click('.form button[type=submit]'); await page.waitForTimeout(800);
    const done = await page.evaluate(() => !document.querySelector('[data-form-done]').hidden);
    ok('confirmation affichée après envoi', done);
    await page.click('[data-form-copy]'); await page.waitForTimeout(400);
    const clip = await page.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e));
    ok('demande copiée (objet, date, convives)', /Repas d’équipe, le 20\/11\/2026 \(24 personnes\)/.test(clip) && /jeanne@example.com/.test(clip), clip.slice(0, 120).replace(/\n/g, ' | '));
    await page.screenshot({ path: `${out}/form-done.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 6. clavier : lien d'évitement
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(() => { try { sessionStorage.setItem('clos-intro', '1'); } catch (e) {} });
    const page = await ctx.newPage();
    await page.goto(base + '/'); await page.waitForTimeout(800);
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => document.activeElement.className);
    await page.keyboard.press('Enter'); await page.waitForTimeout(300);
    const foc = await page.evaluate(() => document.activeElement.id);
    ok('lien « Aller au contenu » puis focus sur le contenu', skip === 'skip' && foc === 'contenu', skip + ' -> ' + foc);
    await ctx.close();
  }

  // 7. sans JavaScript
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    for (const p of ['/', '/la-carte', '/privatisation']) {
      await page.goto(base + p); await page.waitForTimeout(2200);
      const vis = await page.evaluate(() => {
        const hidden = [];
        document.querySelectorAll('h1, h2, .hero__lead, .mitem__name, .dish__name, .btn').forEach(el => { const cs = getComputedStyle(el); if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') hidden.push(el.className || el.tagName); });
        return hidden;
      });
      ok('sans JavaScript, tout est visible sur ' + p, vis.length === 0, vis.slice(0, 5).join(', '));
    }
    await page.goto(base + '/'); await page.screenshot({ path: `${out}/sans-js.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 8. mouvement réduit
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage(); watch(page, 'reduce');
    await page.goto(base + '/'); await page.waitForTimeout(1500);
    const st = await page.evaluate(() => ({ intro: !!document.querySelector('div.intro'), lenis: document.documentElement.classList.contains('lenis'), op: getComputedStyle(document.querySelector('.hero__lead')).opacity }));
    ok('mouvement réduit : pas d’intro ni de défilement doux, contenu visible', !st.intro && !st.lenis && parseFloat(st.op) > 0.95, JSON.stringify(st));
    await page.evaluate(() => window.scrollTo(0, 3000)); await page.waitForTimeout(600);
    const lit = await page.evaluate(() => getComputedStyle(document.querySelector('.manifesto__text')).opacity);
    ok('mouvement réduit : textes affichés', parseFloat(lit) > 0.95);
    await ctx.close();
  }

  // 9. liens internes et statut 404
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const seen = new Set(), bad = [];
    for (const p of ['/', '/la-carte', '/bar-a-vins', '/privatisation', '/infos', '/mentions-legales']) {
      await page.goto(base + p);
      const hrefs = await page.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href')));
      for (const h of hrefs) { const u = h.split('#')[0]; if (seen.has(u)) continue; seen.add(u); const r = await page.request.get(base + u); if (r.status() !== 200) bad.push(u + ' ' + r.status()); }
    }
    ok('liens internes valides', bad.length === 0, seen.size + ' liens, ' + bad.join(', '));
    const r404 = await page.request.get(base + '/une-page-qui-nexiste-pas');
    ok('page inconnue : statut 404', r404.status() === 404, '' + r404.status());
    await ctx.close();
  }

  console.log(results.join('\n'));
  console.log(errors.length ? 'ERREURS :\n' + errors.join('\n') : 'aucune erreur de console');
  await browser.close();
})();
