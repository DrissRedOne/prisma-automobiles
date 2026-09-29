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
@font-face{font-family:"Bricolage Grotesque";font-weight:600 800;src:url(/fonts/bricolage-latin.woff2) format("woff2")}
@font-face{font-family:"Inter";font-weight:400 800;src:url(/fonts/inter-latin.woff2) format("woff2")}
html,body{margin:0}
.og{position:relative;width:1200px;height:630px;overflow:hidden;background:radial-gradient(700px 420px at 0% 100%,rgba(226,67,42,.14),transparent 60%),radial-gradient(800px 500px at 40% 0%,rgba(246,183,60,.30),transparent 60%),#fbf5ec;font-family:Inter,sans-serif;color:#1c1511}
.ph{position:absolute;right:-40px;top:40px;width:600px;height:550px;border-radius:60px 60px 60px 170px;overflow:hidden;transform:rotate(-2deg);box-shadow:0 30px 70px rgba(28,21,17,.25);background:#f4e9da}
.ph img{width:100%;height:100%;object-fit:cover}
.nophoto .ph{display:none}
.l{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:16px}
.l small{display:block;font-size:14px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#7b6c62}
.l b{display:block;font-family:"Bricolage Grotesque";font-weight:800;font-size:32px;letter-spacing:-.02em;margin-top:2px}
h1{position:absolute;left:64px;top:190px;width:560px;margin:0;font-family:"Bricolage Grotesque";font-weight:800;font-size:64px;line-height:1.02;letter-spacing:-.03em}
.nophoto h1{width:1000px}
h1 em{font-style:normal;color:#e2432a}
p{position:absolute;left:64px;bottom:60px;margin:0;display:flex;gap:12px;flex-wrap:wrap;width:560px}
p span{padding:10px 18px;border-radius:999px;background:#fff;font-size:19px;font-weight:700;box-shadow:0 6px 18px rgba(28,21,17,.08)}
p span:first-child{background:#e2432a;color:#fff}
</style></head><body><div class="og"><div class="ph"><img alt=""></div><div class="l"></div><h1></h1><p></p></div><script>
  const d = JSON.parse(decodeURIComponent(location.hash.slice(1)));
  document.querySelector('.l').innerHTML = d.mark + '<span><small>Les Délices</small><b>de Yanis</b></span>';
  document.querySelector('h1').innerHTML = d.h1;
  document.querySelector('p').innerHTML = d.chips.map((c) => '<span>' + c + '</span>').join('');
  const img = document.querySelector('.ph img');
  if (d.img) img.src = d.img; else document.body.classList.add('nophoto');
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
  const og = await page.evaluate(() => ({ mark: logoMark(76), img: (window.YANIS_PHOTOS || []).includes('hero-pizza') ? '/img/hero-pizza-1200.webp' : '' }));
  const ogPage = await ctx.newPage();
  await ogPage.setViewportSize({ width: 1200, height: 630 });
  const d = { ...og, h1: 'Pizzas, tacos et <em>plats maison</em> à Bordeaux', chips: ['Commande en ligne', 'À emporter en 20 min', 'Livraison'] };
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
  const llms = `# Les Délices de Yanis\n\n> Restauration rapide halal au ${s0.address}, entre le Jardin public et les Chartrons, depuis ${s0.since} : pizzas, French tacos, kebab, burgers, wraps et plats maison. Commande en ligne à emporter (prête en 20 minutes environ) ou en livraison dans Bordeaux centre (33000), aux Chartrons (33300), à Caudéran (33200), à Saint-Jean (33800) et à la Bastide (33100).\n\nHoraires : ${s0.hours}.\n\n## Pages\n\n${info.map((x) => `- [${x.title.replace(/ \| Les Délices de Yanis, Bordeaux$/, '')}](${SITE_URL}${x.route === '/' ? '/' : x.route}): ${x.desc}`).join('\n')}\n`;
  fs.writeFileSync(path.join(WEB, 'llms.txt'), llms);
  fs.writeFileSync(path.join(WEB, '..', 'pages.json'), JSON.stringify({ pages: done, skipped }, null, 1));
  console.log(`${done.length} pages pré-rendues${skipped.length ? `, ignorées : ${skipped.join(', ')}` : ''}`);
  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
