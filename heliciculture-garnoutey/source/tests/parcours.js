// Parcours de test : intro, vidéos, en-tête, cycle épinglé, menu mobile, ancres, formulaire, clavier,
// sans JavaScript, mouvement réduit, liens internes et page 404.
const { chromium } = require('playwright-core');
const fs = require('fs');
const base = process.argv[2] || 'http://localhost:8844';
const out = process.argv[3] || '/tmp/garnoutey-parcours';
fs.mkdirSync(out, { recursive: true });
const results = [];
const ok = (name, cond, info) => { results.push((cond ? 'OK   ' : 'ÉCHEC') + ' ' + name + (info ? ' : ' + info : '')); };
const PAGES = ['/', '/l-elevage', '/nos-escargots', '/recettes', '/contact', '/mentions-legales'];
const noIntro = () => { try { sessionStorage.setItem('garnoutey-intro', '1'); } catch (e) {} };
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
  const errors = [];
  const watch = (page, label) => {
    page.on('pageerror', e => errors.push(label + ' pageerror ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(label + ' console ' + m.text()); });
  };

  // 1. intro (première visite, bureau), vidéo du haut de page
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage(); watch(page, 'intro');
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    for (const t of [200, 900, 1600, 2300, 3000, 3800]) {
      await page.waitForTimeout(t === 200 ? 200 : 700);
      await page.screenshot({ path: `${out}/intro-${t}.jpg`, type: 'jpeg', quality: 60 });
    }
    const st = await page.evaluate(() => ({ introGone: !document.querySelector('div.intro'), cls: document.documentElement.className, overflow: document.documentElement.style.overflow }));
    ok('intro terminée et retirée', st.introGone && !/intro-on/.test(st.cls) && st.overflow === '', JSON.stringify(st));
    await page.waitForTimeout(1500);
    const v = await page.evaluate(() => { const box = document.querySelector('.hero [data-video]'); const vid = box && box.querySelector('video'); return { playing: box && box.classList.contains('is-playing'), t: vid ? vid.currentTime : -1, src: vid && vid.currentSrc.replace(location.origin, '') }; });
    await page.waitForTimeout(1000);
    const t2 = await page.evaluate(() => document.querySelector('.hero [data-video] video').currentTime);
    ok('vidéo du haut de page lancée', v.playing && t2 > v.t && /^\/video\/tunnel\.(mp4|webm)$/.test(v.src), JSON.stringify(v) + ' -> ' + t2.toFixed(2));
    await page.click('.hero [data-video-btn]'); await page.waitForTimeout(300);
    const paused = await page.evaluate(() => ({ p: document.querySelector('.hero [data-video] video').paused, label: document.querySelector('.hero [data-video-label]').textContent }));
    ok('bouton pause de la vidéo', paused.p && /Lancer/.test(paused.label), JSON.stringify(paused));
    await page.click('.hero [data-video-btn]'); await page.waitForTimeout(400);
    const replay = await page.evaluate(() => !document.querySelector('.hero [data-video] video').paused);
    ok('reprise de la vidéo', replay);
    await page.goto(base + '/recettes'); await page.goto(base + '/');
    await page.waitForTimeout(300);
    const again = await page.evaluate(() => ({ has: !!document.querySelector('div.intro'), cls: document.documentElement.className }));
    ok('pas d’intro à la deuxième visite', !again.has && !/intro-on/.test(again.cls), JSON.stringify(again));
    // en-tête : caché en descendant, réaffiché en remontant
    await page.waitForTimeout(800);
    await page.mouse.move(700, 500);
    await page.mouse.wheel(0, 1200); await page.waitForTimeout(1200);
    const hid = await page.$eval('[data-hdr]', e => e.classList.contains('is-hidden'));
    await page.mouse.wheel(0, -300); await page.waitForTimeout(1000);
    const shown = await page.$eval('[data-hdr]', e => !e.classList.contains('is-hidden') && e.classList.contains('is-solid'));
    ok('en-tête masqué en descendant puis réaffiché', hid && shown);
    // cycle de l'année : défilement horizontal épinglé
    const isH = await page.$eval('[data-cycle]', e => e.classList.contains('is-h'));
    const top = await page.$eval('[data-cycle]', e => e.getBoundingClientRect().top + window.scrollY);
    await page.evaluate(y => window.scrollTo(0, y + 30), top); await page.waitForTimeout(1200);
    const x1 = await page.$eval('[data-cycle-track]', e => e.getBoundingClientRect().left);
    await page.evaluate(y => window.scrollTo(0, y + 1400), top); await page.waitForTimeout(1500);
    const x2 = await page.$eval('[data-cycle-track]', e => e.getBoundingClientRect().left);
    const pinTop = await page.$eval('.cycle__pin', e => Math.round(e.getBoundingClientRect().top));
    await page.screenshot({ path: `${out}/cycle-bureau.jpg`, type: 'jpeg', quality: 60 });
    ok('cycle : piste horizontale épinglée qui défile', isH && x2 < x1 - 300 && Math.abs(pinTop) < 4, `is-h=${isH} x ${Math.round(x1)} -> ${Math.round(x2)}, haut ${pinTop}`);
    // vidéo de la galerie : chargée seulement à l'approche
    const gal0 = await page.$eval('.farm [data-video] video', v => v.getAttribute('data-loaded'));
    await page.$eval('.farm [data-video]', e => e.scrollIntoView({ block: 'center' })); await page.waitForTimeout(2500);
    const gal1 = await page.$eval('.farm [data-video]', e => ({ src: e.querySelector('video').currentSrc.replace(location.origin, ''), playing: e.classList.contains('is-playing') }));
    ok('vidéo de la galerie chargée à l’approche', !gal0 && /^\/video\/auge\.(mp4|webm)$/.test(gal1.src) && gal1.playing, JSON.stringify(gal1));
    const heroPaused = await page.$eval('.hero [data-video] video', v => v.paused);
    ok('vidéo du haut mise en pause hors de l’écran', heroPaused);
    await ctx.close();
  }

  // 2. menu mobile, clavier, barre de commande
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await ctx.addInitScript(noIntro);
    const page = await ctx.newPage(); watch(page, 'mobile');
    await page.goto(base + '/nos-escargots'); await page.waitForTimeout(1500);
    await page.click('[data-burger]'); await page.waitForTimeout(1400);
    const m = await page.evaluate(() => ({ open: document.documentElement.classList.contains('menu-open'), hidden: document.getElementById('menu').hidden, exp: document.querySelector('[data-burger]').getAttribute('aria-expanded'), focus: document.activeElement && document.activeElement.className, mainInert: document.getElementById('contenu').inert }));
    ok('menu ouvert (aria-expanded, focus, contenu inerte)', m.open && !m.hidden && m.exp === 'true' && /menu__link/.test(m.focus) && m.mainInert, JSON.stringify(m));
    await page.screenshot({ path: `${out}/menu-mobile.jpg`, type: 'jpeg', quality: 60 });
    for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
    const inMenu = await page.evaluate(() => !!(document.activeElement.closest('#menu') || document.activeElement.matches('[data-burger]')));
    ok('le focus reste dans le menu', inMenu);
    await page.keyboard.press('Escape'); await page.waitForTimeout(1200);
    const c = await page.evaluate(() => ({ open: document.documentElement.classList.contains('menu-open'), hidden: document.getElementById('menu').hidden, exp: document.querySelector('[data-burger]').getAttribute('aria-expanded'), inert: document.getElementById('contenu').inert, ov: document.documentElement.style.overflow }));
    ok('menu fermé par Échap', !c.open && c.hidden && c.exp === 'false' && !c.inert && c.ov === '', JSON.stringify(c));
    await page.click('[data-burger]'); await page.waitForTimeout(1200);
    await Promise.all([page.waitForNavigation(), page.click('.menu__link[href="/recettes"]')]);
    ok('lien du menu vers les recettes', page.url().endsWith('/recettes'), page.url());
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => ({ hidden: document.getElementById('menu').hidden, open: document.documentElement.classList.contains('menu-open') }));
    ok('menu fermé sur la nouvelle page', after.hidden && !after.open);
    const bookOff = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    await page.evaluate(() => window.scrollTo(0, 1600)); await page.waitForTimeout(900);
    const bookOn = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(900);
    const bookFooter = await page.$eval('[data-book]', e => e.classList.contains('is-on'));
    ok('barre « Commander » : cachée en haut, visible ensuite, cachée sur le pied de page', !bookOff && bookOn && !bookFooter, [bookOff, bookOn, bookFooter].join('/'));
    // vidéo plein écran du haut de page sur mobile
    await page.goto(base + '/'); await page.waitForTimeout(2500);
    const mv = await page.evaluate(() => { const b = document.querySelector('.hero [data-video]'); const r = b.getBoundingClientRect(); return { playing: b.classList.contains('is-playing'), w: Math.round(r.width), h: Math.round(r.height) }; });
    ok('mobile : vidéo plein écran en haut de l’accueil', mv.playing && mv.w >= 390 && mv.h >= 800, JSON.stringify(mv));
    await page.screenshot({ path: `${out}/accueil-mobile.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 3. ancres et produit présélectionné
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(noIntro);
    const page = await ctx.newPage(); watch(page, 'ancres');
    await page.goto(base + '/nos-escargots'); await page.waitForTimeout(1500);
    await page.click('.phero__chips a[href="#restaurants"]'); await page.waitForTimeout(2200);
    const r = await page.evaluate(() => { const t = document.querySelector('#restaurants').getBoundingClientRect(); const h = document.querySelector('[data-hdr]').getBoundingClientRect(); return { top: Math.round(t.top), hdr: Math.round(h.bottom) }; });
    ok('ancre « Restaurants et traiteurs » visible sous l’en-tête', r.top >= r.hdr - 2 && r.top < 260, JSON.stringify(r));
    await Promise.all([page.waitForNavigation(), page.click('#restaurants a.btn')]);
    await page.waitForTimeout(1500);
    const sel = await page.evaluate(() => ({ url: location.pathname + location.search + location.hash, qui: document.querySelector('[data-qui]').value, type: document.getElementById('f-type').value, top: Math.round(document.getElementById('commande').getBoundingClientRect().top) }));
    ok('« Devenir acheteur » ouvre le formulaire avec le bon profil', sel.qui === 'Restaurant ou traiteur' && sel.type === 'Acheteur professionnel' && sel.top < 260 && sel.top > 0, JSON.stringify(sel));
    await page.goto(base + '/recettes#bordelaise'); await page.waitForTimeout(1800);
    const rb = await page.evaluate(() => Math.round(document.getElementById('bordelaise').getBoundingClientRect().top));
    ok('arrivée directe sur une recette (#bordelaise)', rb >= -2 && rb < 140, '' + rb);
    await ctx.close();
  }

  // 4. formulaire de commande
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base });
    await ctx.addInitScript(noIntro);
    const page = await ctx.newPage(); watch(page, 'form');
    await page.goto(base + '/contact'); await page.waitForTimeout(1200);
    await page.click('.form button[type=submit]'); await page.waitForTimeout(300);
    const e1 = await page.evaluate(() => ({ err: !document.querySelector('[data-form-err]').hidden, inval: document.querySelectorAll('.form [aria-invalid="true"]').length, focus: document.activeElement.id }));
    ok('formulaire vide refusé (nom, téléphone)', e1.err && e1.inval === 2 && e1.focus === 'f-nom', JSON.stringify(e1));
    await page.fill('#f-nom', 'Jeanne Test'); await page.fill('#f-tel', '06 00 00 00 00'); await page.fill('#f-mail', 'jeanne@');
    await page.click('.form button[type=submit]'); await page.waitForTimeout(300);
    const e2 = await page.evaluate(() => ({ err: document.querySelector('[data-form-err]').textContent, focus: document.activeElement.id }));
    ok('adresse e-mail incomplète signalée', /incomplète/.test(e2.err) && e2.focus === 'f-mail', JSON.stringify(e2));
    await page.fill('#f-mail', 'jeanne@example.com');
    await page.selectOption('#f-type', { label: 'Commande pour les fêtes' });
    await page.selectOption('#f-qui', { label: 'Particulier' });
    await page.selectOption('#f-retrait', { label: 'Livraison avec la remorque' });
    await page.fill('#f-ville', 'Libourne');
    await page.fill('#f-qte', '4 douzaines'); await page.fill('#f-date', '2026-12-23'); await page.fill('#f-msg', 'Retrait le matin si possible.');
    await page.click('.form button[type=submit]'); await page.waitForTimeout(800);
    const done = await page.evaluate(() => !document.querySelector('[data-form-done]').hidden && document.querySelector('[data-form-err]').hidden);
    ok('confirmation affichée après envoi', done);
    await page.click('[data-form-copy]'); await page.waitForTimeout(400);
    const clip = await page.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e));
    ok('demande copiée (objet, livraison, commune, date)', /Objet : Commande pour les fêtes, Jeanne Test/.test(clip) && /Retrait ou livraison : Livraison avec la remorque/.test(clip) && /Commune de livraison : Libourne/.test(clip) && /Date souhaitée : 23\/12\/2026/.test(clip), clip.slice(0, 220).replace(/\n/g, ' | '));
    await page.screenshot({ path: `${out}/form-done.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 5. clavier : lien d'évitement
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await ctx.addInitScript(noIntro);
    const page = await ctx.newPage();
    await page.goto(base + '/'); await page.waitForTimeout(800);
    await page.keyboard.press('Tab');
    const skip = await page.evaluate(() => document.activeElement.className);
    await page.keyboard.press('Enter'); await page.waitForTimeout(300);
    const foc = await page.evaluate(() => document.activeElement.id);
    ok('lien « Aller au contenu » puis focus sur le contenu', skip === 'skip' && foc === 'contenu', skip + ' -> ' + foc);
    await ctx.close();
  }

  // 6. sans JavaScript
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      await page.goto(base + p); await page.waitForTimeout(2600);
      const vis = await page.evaluate(() => {
        const hidden = [];
        document.querySelectorAll('h1, h2, h3, p, .btn, .arch, .vid__poster').forEach(el => { if (el.closest('.menu, .intro, .sprite, .sr-only, [hidden]')) return; const cs = getComputedStyle(el); if (parseFloat(cs.opacity) < 0.95 || cs.visibility === 'hidden') hidden.push(el.className || el.tagName); });
        return hidden;
      });
      ok('sans JavaScript, tout est visible sur ' + p, vis.length === 0, vis.slice(0, 5).join(', '));
    }
    await page.goto(base + '/'); await page.waitForTimeout(2600); await page.screenshot({ path: `${out}/sans-js.jpg`, type: 'jpeg', quality: 60 });
    await ctx.close();
  }

  // 7. mouvement réduit : ni intro ni vidéo, tout est affiché
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage(); watch(page, 'reduce');
    await page.goto(base + '/'); await page.waitForTimeout(1500);
    const st = await page.evaluate(() => ({ intro: !!document.querySelector('div.intro'), lenis: document.documentElement.classList.contains('lenis'), op: getComputedStyle(document.querySelector('.hero__lead')).opacity, src: document.querySelector('.hero video').getAttribute('data-loaded') }));
    ok('mouvement réduit : pas d’intro, pas de vidéo, contenu visible', !st.intro && !st.lenis && parseFloat(st.op) > 0.95 && !st.src, JSON.stringify(st));
    await page.evaluate(() => window.scrollTo(0, 1400)); await page.waitForTimeout(600);
    const lit = await page.evaluate(() => getComputedStyle(document.querySelector('.manifesto__text')).opacity);
    ok('mouvement réduit : textes affichés', parseFloat(lit) > 0.95);
    await ctx.close();
  }

  // 8. liens internes, redirections, 404, données structurées
  {
    const ctx = await browser.newContext();
    await ctx.addInitScript(noIntro);
    const page = await ctx.newPage();
    const seen = new Set(), bad = [], ld = [];
    for (const p of PAGES) {
      await page.goto(base + p);
      const hrefs = await page.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href')));
      for (const h of hrefs) { const u = h.split('#')[0]; if (seen.has(u)) continue; seen.add(u); const r = await page.request.get(base + u); if (r.status() !== 200) bad.push(u + ' ' + r.status()); }
      const blocks = await page.$$eval('script[type="application/ld+json"]', s => s.map(x => x.textContent));
      for (const b of blocks) { try { const j = JSON.parse(b); (Array.isArray(j) ? j : [j]).forEach(x => ld.push(p + ':' + x['@type'])); } catch (e) { bad.push('JSON-LD invalide sur ' + p); } }
    }
    ok('liens internes valides', bad.length === 0, seen.size + ' liens ' + bad.join(', '));
    ok('données structurées (entreprise, FAQ, 3 recettes)', ld.includes('/:LocalBusiness') && ld.includes('/nos-escargots:FAQPage') && ld.filter(x => x === '/recettes:Recipe').length === 3, ld.join(' '));
    const r404 = await page.request.get(base + '/une-page-qui-nexiste-pas');
    ok('page inconnue : statut 404', r404.status() === 404, '' + r404.status());
    const red = await page.request.get(base + '/commander', { maxRedirects: 0 });
    ok('redirection /commander vers /contact', [301, 308].includes(red.status()) && /\/contact$/.test(red.headers()['location'] || ''), red.status() + ' ' + red.headers()['location']);
    await ctx.close();
  }

  console.log(results.join('\n'));
  console.log(errors.length ? 'ERREURS :\n' + errors.join('\n') : 'aucune erreur de console');
  await browser.close();
})();
