/* =====================================================================
   PRÉ-RENDU DU SITE EN LIGNE (appelé par build.py)
   Chaque page publique devient un vrai fichier HTML, lisible par Google
   sans exécuter le JavaScript : contenu complet, title, description,
   canonical, balises de partage et données structurées. Chaque page reçoit
   aussi son image de partage (1200 x 630). Enfin : plan du site et robots.
   Usage : node prerender.js <dossier du site> <gabarit de page> <site_url> <indexable 0|1>
   ===================================================================== */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { chromium } = require(require.resolve('playwright-core', { paths: [path.join(__dirname, 'tests'), path.join(__dirname, 'video'), __dirname] }));

const [WEB, TEMPLATE, SITE_URL, INDEXABLE] = [path.resolve(process.argv[2]), fs.readFileSync(process.argv[3], 'utf8'), process.argv[4].replace(/\/+$/, ''), process.argv[5] === '1'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

/* Image de partage : la page est dessinée par le navigateur avec les polices et le logo du site. */
const OG_PAGE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><link rel="stylesheet" href="/__og.css"></head><body><div class="og">
  <div class="glow"></div><div class="floor"></div>
  <header><img class="mark" src="/img/marque/mark.png" alt=""><i></i><img class="word" src="/img/marque/word.webp" alt=""></header>
  <main><span class="k"></span><h1></h1><p class="d"></p></main>
  <img class="car" alt="">
  <footer><span>Yvrac · Bordeaux · Réservation en ligne</span><b></b></footer>
</div><script>
  const d = JSON.parse(decodeURIComponent(location.hash.slice(1)));
  document.querySelector('.k').textContent = d.k || 'Location de véhicules';
  document.querySelector('h1').textContent = d.t;
  document.querySelector('.d').textContent = d.d || '';
  document.querySelector('footer b').textContent = d.phone || '';
  const car = document.querySelector('.car');
  if (d.img) car.src = d.img; else { car.remove(); document.body.classList.add('nocar'); }
  if (d.t.length > 46) document.body.classList.add('long');
  window.ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))]);
</script></body></html>`;
const OG_CSS = `@font-face{font-family:"Inter";font-weight:300 900;src:url(/fonts/inter.woff2) format("woff2")}
@font-face{font-family:"Michroma";src:url(/fonts/michroma.woff2) format("woff2")}
html,body{margin:0;background:#050506}
.og{position:relative;width:1200px;height:630px;overflow:hidden;color:#f3f2ef;font-family:Inter,sans-serif;background:radial-gradient(ellipse 55% 60% at 80% 72%,rgba(255,255,255,.16),rgba(255,255,255,.03) 60%,transparent 76%),linear-gradient(180deg,#040405 0%,#0c0c0e 45%,#16171a 72%,#08080a 100%)}
.glow{position:absolute;left:-10%;top:-45%;width:120%;height:90%;background:conic-gradient(from 200deg at 50% 50%,rgba(202,218,233,0),rgba(202,218,233,.12),rgba(230,207,220,.1),rgba(227,197,143,.16),rgba(191,224,214,.08),rgba(202,218,233,0));filter:blur(60px)}
.floor{position:absolute;left:0;right:0;bottom:0;height:30%;background:linear-gradient(180deg,rgba(255,255,255,.05),transparent 60%);border-top:1px solid rgba(243,225,182,.22)}
header{position:absolute;left:64px;top:52px;display:flex;align-items:center;gap:22px}
header .mark{height:62px}
header i{width:1px;height:48px;background:rgba(255,255,255,.4)}
header .word{height:44px}
main{position:absolute;left:64px;top:170px;width:560px}
.nocar main{width:1000px}
.k{display:inline-flex;align-items:center;gap:14px;font-size:17px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:#e3c58f}
.k::before{content:"";width:40px;height:2px;background:linear-gradient(90deg,#cadae9,#e6cfdc,#e3c58f,#bfe0d6)}
h1{margin:22px 0 0;font-size:60px;line-height:1.06;font-weight:700;letter-spacing:-.025em}
.long h1{font-size:50px}
.nocar h1{font-size:64px}
.nocar.long h1{font-size:56px}
.d{margin:22px 0 0;font-size:22px;line-height:1.45;color:#cfd0d3;max-width:560px}
.nocar .d{max-width:900px}
.car{position:absolute;right:40px;bottom:100px;width:540px;max-height:330px;object-fit:contain;object-position:50% 100%;filter:drop-shadow(0 26px 26px rgba(0,0,0,.7))}
footer{position:absolute;left:64px;right:64px;bottom:40px;display:flex;justify-content:space-between;align-items:center;font-size:19px;color:#b9bbbf}
footer b{font-size:24px;color:#fff;font-weight:600;letter-spacing:.01em}`;

function serve() {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (u === '/__og.html') { res.writeHead(200, { 'Content-Type': TYPES['.html'] }); return res.end(OG_PAGE); }
    if (u === '/__og.css') { res.writeHead(200, { 'Content-Type': TYPES['.css'] }); return res.end(OG_CSS); }
    let file = path.join(WEB, u);
    if (!file.startsWith(WEB)) { res.writeHead(403); return res.end(); }
    // pendant le pré-rendu, toutes les adresses sans extension ouvrent l'application
    if (!path.extname(u) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(WEB, 'app.html');
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

const fileFor = (route) => (route === '/' ? 'index.html' : route.slice(1) + '.html');
const ogKey = (route) => (route === '/' ? 'prisma' : route.slice(1).replace(/\//g, '--'));
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
  // chaque page part d'un visiteur neuf : aucune donnée gardée d'une page à l'autre (la page Professionnels
  // passe le site en prix HT, ce qui ne doit pas se retrouver dans les autres pages)
  await ctx.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) { /* stockage indisponible */ } window.PRISMA_PRERENDER = true; });
  // aucune ressource extérieure pendant le pré-rendu (le site n'en a pas besoin)
  await ctx.route(/^(?!http:\/\/127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForSelector('#app main');
  // toutes les pages publiques : pages fixes, pages rédigées, fiches de la flotte en ligne
  const routes = await page.evaluate(() => [...new Set([...STATIC_PAGES, ...SEO_LIST.map((p) => p.path), ...liveFleet().map(vehicleHref)])].filter((p) => typeof p === 'string' && p[0] === '/'));
  const done = [];
  const info = [];
  const skipped = [];
  const og = [];
  for (const route of routes) {
    errors.length = 0;
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForSelector('#app main');
    await page.waitForTimeout(120);
    const cap = await page.evaluate(() => {
      document.querySelectorAll('.toast,.toasts,.install-card,.intro,.overlay,.mmenu,.update-bar').forEach((e) => e.remove());
      const head = [...document.head.querySelectorAll('title,meta[name="description"],link[rel="canonical"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],script#ld-json')].map((e) => e.outerHTML).join('\n');
      const h1 = document.querySelector('#app h1');
      const img = document.querySelector('.lp-art img, .vd-main .shot-car, .h2-car.on');
      const k = document.querySelector('#app .eyebrow, #app .vd-badge');
      return {
        head, app: document.getElementById('app').innerHTML, title: document.title,
        noindex: !document.querySelector('link[rel="canonical"]'),
        og: { t: h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : document.title, k: k ? k.textContent.trim() : '', img: img ? img.getAttribute('src') : '', phone: db.settings.phone },
        desc: (document.querySelector('meta[name="description"]') || {}).content || '',
        img: img ? img.getAttribute('src') : '',
      };
    });
    if (errors.length) throw new Error(`Erreur JavaScript sur ${route} : ${errors.join(' | ')}`);
    if (cap.noindex) { skipped.push(route); continue; } // page introuvable ou page de l'application
    const html = TEMPLATE.replace('__PRE__', ' data-pre').replace('__HEAD__', () => cap.head).replace('__APP__', () => cap.app);
    const out = path.join(WEB, fileFor(route));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    done.push(route);
    og.push({ route, ...cap.og });
    info.push({ route, title: cap.title, desc: cap.desc, img: cap.img });
  }
  // page introuvable (servie par l'hébergeur pour toute adresse inconnue)
  await page.goto(base + '/page-introuvable-404', { waitUntil: 'load' });
  await page.waitForSelector('#app main');
  const nf = await page.evaluate(() => ({ head: [...document.head.querySelectorAll('title,meta[name="description"],meta[name="robots"]')].map((e) => e.outerHTML).join('\n'), app: document.getElementById('app').innerHTML }));
  fs.writeFileSync(path.join(WEB, '404.html'), TEMPLATE.replace('__PRE__', ' data-pre').replace('__HEAD__', () => nf.head).replace('__APP__', () => nf.app));

  // images de partage
  const ogPage = await ctx.newPage();
  await ogPage.setViewportSize({ width: 1200, height: 630 });
  fs.mkdirSync(path.join(WEB, 'img', 'og'), { recursive: true });
  for (const o of og) {
    const d = { t: o.t, k: o.k, img: o.img, phone: o.phone, d: '' };
    if (o.route === '/') Object.assign(d, { t: 'Location de voitures et d’utilitaires à Bordeaux', k: 'PRISMA Automobiles', d: 'Citadines, SUV premium et utilitaires jusqu’à 20 m³, réservés en ligne.' });
    // adresse différente à chaque image (un simple changement de « # » ne recharge pas la page)
    await ogPage.goto(`${base}/__og.html?page=${encodeURIComponent(o.route)}#${encodeURIComponent(JSON.stringify(d))}`, { waitUntil: 'load' });
    await ogPage.evaluate(() => window.ready);
    await ogPage.screenshot({ path: path.join(WEB, 'img', 'og', ogKey(o.route) + '.jpg'), type: 'jpeg', quality: 84 });
  }

  // plan du site (pages indexables uniquement) et robots.txt
  const today = new Date().toISOString().slice(0, 10);
  // plan du site avec l'image principale de chaque page (photos des véhicules : recherche d'images)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${info.map((x) => `  <url><loc>${escAttr(SITE_URL + (x.route === '/' ? '/' : x.route))}</loc><lastmod>${today}</lastmod>${x.img && x.img[0] === '/' ? `<image:image><image:loc>${escAttr(SITE_URL + x.img)}</image:loc></image:image>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(WEB, 'sitemap.xml'), sitemap);
  // tant que le site n'est pas indexable, la balise « noindex » suffit : Google doit pouvoir la lire, donc pas de blocage ici
  const robots = INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /gestion\nDisallow: /compte\nDisallow: /options\nDisallow: /coordonnees\nDisallow: /paiement/\nDisallow: /reservation/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : 'User-agent: *\nAllow: /\n';
  fs.writeFileSync(path.join(WEB, 'robots.txt'), robots);
  const sec = (title, test) => { const xs = info.filter((x) => test(x.route)); return xs.length ? `\n## ${title}\n\n${xs.map((x) => `- [${x.title.replace(/ \| PRISMA$/, '')}](${SITE_URL}${x.route === '/' ? '/' : x.route}): ${x.desc}`).join('\n')}\n` : ''; };
  const s0 = await page.evaluate(() => ({ phone: db.settings.phone, address: `${db.settings.address}, ${db.settings.zip} ${db.settings.city}`, hours: weekHoursText() }));
  const llms = `# PRISMA Automobiles\n\n> Agence de location de voitures et d’utilitaires à Yvrac, près de Bordeaux (Gironde) : citadines, voitures premium, Tesla Model 3, SUV 7 places, minibus 9 places et utilitaires de 3 à 20 m³ conduits avec le permis B. Réservation en ligne, retrait à l’agence, à la gare Saint-Jean, à l’aéroport de Bordeaux-Mérignac ou livraison dans Bordeaux Métropole.\n\nAdresse : ${s0.address}. Téléphone et WhatsApp : ${s0.phone}. Horaires : ${s0.hours}.\n`
    + sec('Pages principales', (r) => ['/', '/vehicules', '/agences', '/professionnels', '/contact', '/faq', '/conditions-de-location', '/guides'].includes(r))
    + sec('Pages de location', (r) => /^\/location-/.test(r))
    + sec('Véhicules', (r) => /^\/vehicule\//.test(r))
    + sec('Guides pratiques', (r) => /^\/guides\//.test(r));
  fs.writeFileSync(path.join(WEB, 'llms.txt'), llms);
  fs.writeFileSync(path.join(WEB, '..', 'pages.json'), JSON.stringify({ pages: done, skipped }, null, 1));
  console.log(`${done.length} pages pré-rendues, ${og.length} images de partage${skipped.length ? `, ignorées : ${skipped.join(', ')}` : ''}`);
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
