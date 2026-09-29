/* =====================================================================
   PRÉ-RENDU DU SITE EN LIGNE (appelé par build.py)
   Chaque page publique devient un vrai fichier HTML, lisible par Google
   sans exécuter le JavaScript : contenu complet, title, description,
   canonical, balises de partage et données structurées. Puis : image de
   partage (1200 x 630), page 404, plan du site, robots.txt, llms.txt.
   Usage : node prerender.js <dossier du site> <gabarit de page> <site_url> <indexable 0|1>
   ===================================================================== */
const path = require('path');
const fs = require('fs');
const http = require('http');
const { chromium } = require(require.resolve('playwright-core', { paths: [path.join(__dirname, 'tests'), __dirname] }));

const [WEB, TEMPLATE, SITE_URL, INDEXABLE] = [path.resolve(process.argv[2]), fs.readFileSync(process.argv[3], 'utf8'), process.argv[4].replace(/\/+$/, ''), process.argv[5] === '1'];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

/* Image de partage : dessinée par le navigateur avec les polices, le logo et une photo du site. */
const OG_PAGE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:"Anton";src:url(/fonts/anton-latin.woff2) format("woff2")}
@font-face{font-family:"Inter";font-weight:400 800;src:url(/fonts/inter-latin.woff2) format("woff2")}
@font-face{font-family:"Caveat";font-weight:700;src:url(/fonts/caveat-latin.woff2) format("woff2")}
html,body{margin:0}
.og{position:relative;width:1200px;height:630px;overflow:hidden;background:radial-gradient(620px 480px at 82% 50%,rgba(255,90,31,.42),transparent 62%),#1a0c06;font-family:Inter,sans-serif;color:#fff3e2}
.pz{position:absolute;right:-90px;top:25px;width:600px;height:600px;filter:drop-shadow(0 40px 40px rgba(0,0,0,.6))}
.ring{position:absolute;right:-110px;top:5px;width:640px;height:640px;border-radius:50%;border:2px dashed rgba(255,194,26,.45)}
.nopz .pz,.nopz .ring{display:none}
.l{position:absolute;left:64px;top:52px;display:flex;align-items:center;gap:14px}
.l small{display:block;font-size:12px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:#ffc21a}
.l b{display:block;font-family:Anton;font-weight:400;font-size:30px;text-transform:uppercase;margin-top:3px}
.hand{position:absolute;left:64px;top:170px;font-family:Caveat;font-weight:700;font-size:34px;color:#ffc21a;transform:rotate(-2deg)}
h1{position:absolute;left:64px;top:214px;margin:0;font-family:Anton;font-weight:400;font-size:96px;line-height:.88;text-transform:uppercase}
h1 span{display:block}.hl{color:#ff5a1f}.ol{color:transparent;-webkit-text-stroke:2px #fff3e2}
.bar{position:absolute;left:0;right:0;bottom:0;height:58px;background:#ff5a1f;color:#1a0c06;display:flex;align-items:center;gap:26px;padding:0 64px;font-family:Anton;font-size:28px;text-transform:uppercase;white-space:nowrap}
</style></head><body><div class="og"><div class="ring"></div><img class="pz" alt=""><div class="l"></div><p class="hand">Rue du Palais Gallien, depuis 2007</p><h1><span>Pizzas, tacos</span><span class="hl">&amp; plats maison</span><span class="ol">à Bordeaux</span></h1><div class="bar">Commande en ligne ✦ À emporter en 20 min ✦ Viandes halal ✦ Fait maison</div></div><script>
  const d = JSON.parse(decodeURIComponent(location.hash.slice(1)));
  document.querySelector('.l').innerHTML = d.mark + '<span><small>Les Délices</small><b>de Yanis</b></span>';
  const img = document.querySelector('.pz');
  if (d.img) img.src = d.img; else document.body.classList.add('nopz');
  window.ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))]);
</script></body></html>`;

function serve() {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (u === '/__og.html') { res.writeHead(200, { 'Content-Type': TYPES['.html'] }); return res.end(OG_PAGE); }
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
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'fr-FR', timezoneId: 'Europe/Paris', serviceWorkers: 'block' });
  // chaque page part d'un visiteur neuf : aucune donnée gardée d'une page à l'autre
  await ctx.addInitScript(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) { /* stockage indisponible */ } window.YANIS_PRERENDER = true; });
  // aucune ressource extérieure pendant le pré-rendu (le site n'en a pas besoin)
  await ctx.route(/^(?!http:\/\/127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForSelector('#app main');
  const routes = await page.evaluate(() => [...new Set([...STATIC_PAGES, ...SEO_PAGES.map((p) => p.path)])]);
  const done = [];
  const info = [];
  const skipped = [];
  // l'état « ouvert / fermé » et le jour en cours dépendent de l'heure : l'application les ajoute au chargement
  const clean = () => {
    document.querySelectorAll('.toast,.toasts,.sheet-wrap,.update-bar,.cartbar').forEach((e) => e.remove());
    document.querySelectorAll('#app .st-pill').forEach((e) => { e.textContent = ''; e.className = 'st-pill'; e.style.visibility = 'hidden'; });
    document.querySelectorAll('#app .today').forEach((e) => e.classList.remove('today'));
  };
  for (const route of routes) {
    errors.length = 0;
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForSelector('#app main');
    await page.waitForTimeout(120);
    const cap = await page.evaluate((cleanSrc) => {
      (0, eval)(`(${cleanSrc})`)();
      const head = [...document.head.querySelectorAll('title,meta[name="description"],link[rel="canonical"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],script#ld-json')].map((e) => e.outerHTML).join('\n');
      return {
        head, app: document.getElementById('app').innerHTML, title: document.title,
        noindex: !document.querySelector('link[rel="canonical"]'),
        desc: (document.querySelector('meta[name="description"]') || {}).content || '',
        img: (document.querySelector('#app main img') || { getAttribute: () => '' }).getAttribute('src') || '',
      };
    }, clean.toString());
    if (errors.length) throw new Error(`Erreur JavaScript sur ${route} : ${errors.join(' | ')}`);
    if (cap.noindex) { skipped.push(route); continue; }
    const html = TEMPLATE.replace('__PRE__', ' data-pre').replace('__HEAD__', () => cap.head).replace('__APP__', () => cap.app);
    const out = path.join(WEB, fileFor(route));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    done.push(route);
    info.push({ route, title: cap.title, desc: cap.desc, img: cap.img });
  }
  // page introuvable (servie par l'hébergeur pour toute adresse inconnue)
  await page.goto(base + '/page-introuvable-404', { waitUntil: 'load' });
  await page.waitForSelector('#app main');
  const nf = await page.evaluate((cleanSrc) => { (0, eval)(`(${cleanSrc})`)(); return { head: [...document.head.querySelectorAll('title,meta[name="description"],meta[name="robots"]')].map((e) => e.outerHTML).join('\n'), app: document.getElementById('app').innerHTML }; }, clean.toString());
  fs.writeFileSync(path.join(WEB, '404.html'), TEMPLATE.replace('__PRE__', ' data-pre').replace('__HEAD__', () => nf.head).replace('__APP__', () => nf.app));

  // image de partage (une pour tout le site : la page d'accueil et la marque)
  const og = await page.evaluate(() => ({ mark: logoMark(70), img: (window.YANIS_PHOTOS || []).includes('pizza-spin') ? '/img/pizza-spin-900.webp' : '' }));
  const ogPage = await ctx.newPage();
  await ogPage.setViewportSize({ width: 1200, height: 630 });
  const d = { ...og };
  await ogPage.goto(`${base}/__og.html#${encodeURIComponent(JSON.stringify(d))}`, { waitUntil: 'load' });
  await ogPage.evaluate(() => window.ready);
  fs.mkdirSync(path.join(WEB, 'img'), { recursive: true });
  await ogPage.screenshot({ path: path.join(WEB, 'img', 'og.jpg'), type: 'jpeg', quality: 86 });

  // plan du site (pages indexables uniquement) et robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${info.map((x) => `  <url><loc>${escAttr(SITE_URL + (x.route === '/' ? '/' : x.route))}</loc><lastmod>${today}</lastmod>${x.img && x.img[0] === '/' ? `<image:image><image:loc>${escAttr(SITE_URL + x.img)}</image:loc></image:image>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(WEB, 'sitemap.xml'), sitemap);
  // tant que le site n'est pas indexable, la balise « noindex » suffit : Google doit pouvoir la lire, donc pas de blocage ici
  const robots = INDEXABLE
    ? `User-agent: *\nAllow: /\nDisallow: /cuisine\nDisallow: /commande\nDisallow: /commandes\nDisallow: /suivi/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : 'User-agent: *\nAllow: /\n';
  fs.writeFileSync(path.join(WEB, 'robots.txt'), robots);
  const s0 = await page.evaluate(() => ({ address: `${S().address}, ${S().zip} ${S().city}`, hours: [1, 2, 3, 4, 5, 6, 0].map((d) => `${JOURS[d]} ${hoursText(d)}`).join(' ; '), since: S().since }));
  const llms = `# Les Délices de Yanis\n\n> Restauration rapide halal au ${s0.address}, entre le Jardin public et les Chartrons, depuis ${s0.since} : pizzas, French tacos, kebab, burgers, wraps et plats maison. Commande en ligne à emporter : prête en 20 minutes environ, retrait au comptoir (commande possible à l’avance pour un horaire choisi).\n\nHoraires : ${s0.hours}.\n\n## Pages\n\n${info.map((x) => `- [${x.title.replace(/ \| Les Délices de Yanis, Bordeaux$/, '')}](${SITE_URL}${x.route === '/' ? '/' : x.route}): ${x.desc}`).join('\n')}\n`;
  fs.writeFileSync(path.join(WEB, 'llms.txt'), llms);
  fs.writeFileSync(path.join(WEB, '..', 'pages.json'), JSON.stringify({ pages: done, skipped }, null, 1));
  console.log(`${done.length} pages pré-rendues${skipped.length ? `, ignorées : ${skipped.join(', ')}` : ''}`);
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
