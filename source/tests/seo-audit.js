// Contrôle SEO du site construit (out/web) : chaque page pré-rendue est lue telle que Google la reçoit,
// sans exécuter le JavaScript. Usage : node tests/seo-audit.js [dossier du site]
const fs = require('fs');
const path = require('path');
const WEB = path.resolve(process.argv[2] || path.join(__dirname, '../out/web'));
const { pages } = JSON.parse(fs.readFileSync(path.join(WEB, '..', 'pages.json'), 'utf8'));
const APP = [/^\/vehicules\/[\w-]+$/, /^\/options$/, /^\/coordonnees$/, /^\/compte$/, /^\/reservation\//, /^\/paiement\//, /^\/gestion/];
const fileFor = (r) => path.join(WEB, r === '/' ? 'index.html' : r.slice(1) + '.html');
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const problems = [];
const warn = (r, m) => problems.push(`${r} : ${m}`);
const titles = {}; const descs = {}; const inbound = {};
const rows = [];
for (const r of pages) {
  const html = fs.readFileSync(fileFor(r), 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const body = html.slice(html.indexOf('<body'));
  const title = decode((head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const desc = decode((head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const canon = (head.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
  const h1s = body.match(/<h1[\s>][\s\S]*?<\/h1>/g) || [];
  (titles[title] = titles[title] || []).push(r);
  (descs[desc] = descs[desc] || []).push(r);
  if (title.length < 30 || title.length > 65) warn(r, `title de ${title.length} caractères`);
  if (desc.length < 110 || desc.length > 160) warn(r, `description de ${desc.length} caractères`);
  if (h1s.length !== 1) warn(r, `${h1s.length} titres H1`);
  if (!canon || !canon.endsWith(r === '/' ? '/' : r)) warn(r, `canonical ${canon}`);
  if (!robots) warn(r, 'pas de balise robots');
  if (!/og:image" content="[^"]+\/img\/og\/[\w-]+\.jpg"/.test(head)) warn(r, 'image de partage absente');
  const og = (head.match(/og:image" content="[^"]*(\/img\/og\/[\w-]+\.jpg)"/) || [])[1];
  if (og && !fs.existsSync(path.join(WEB, og))) warn(r, `image de partage introuvable ${og}`);
  // données structurées
  const ld = head.match(/<script type="application\/ld\+json" id="ld-json">([\s\S]*?)<\/script>/);
  let types = [];
  if (!ld) warn(r, 'pas de données structurées');
  else {
    try {
      const j = JSON.parse(ld[1]);
      types = j['@graph'].map((x) => [].concat(x['@type']).join('+'));
      for (const x of j['@graph']) if (x['@type'] === 'FAQPage') for (const q of x.mainEntity) if (!q.name || !q.acceptedAnswer.text) warn(r, 'question vide dans FAQPage');
    } catch (e) { warn(r, 'JSON-LD invalide : ' + e.message); }
  }
  // liens internes
  const links = [...body.matchAll(/<a [^>]*href="(\/[^"#?]*)[^"]*"/g)].map((m) => m[1]);
  for (const l of new Set(links)) {
    const p = l.length > 1 ? l.replace(/\/$/, '') : l;
    if (pages.includes(p)) { (inbound[p] = inbound[p] || new Set()).add(r); continue; }
    if (APP.some((re) => re.test(p))) continue;
    if (/\.(png|jpg|webp|webmanifest|xml|txt)$/.test(p)) continue;
    warn(r, `lien vers une page inexistante ${l}`);
  }
  // images sans texte alternatif (hors décoration)
  const imgs = [...body.matchAll(/<img [^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/ alt="/.test(i));
  if (noAlt.length) warn(r, `${noAlt.length} image(s) sans attribut alt`);
  // ordre des titres
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) if (levels[i] > levels[i - 1] + 1) { warn(r, `titre H${levels[i]} après H${levels[i - 1]}`); break; }
  const main = body.match(/<main id="main">([\s\S]*?)<\/main>/);
  const words = main ? text(main[1]).split(' ').length : 0;
  if (words < 300) warn(r, `contenu court (${words} mots)`);
  if (/[—–]/.test(text(main ? main[1] : ''))) warn(r, 'tiret long ou moyen dans le texte');
  if (/\b(undefined|NaN|null)\b|\[object Object\]|Invalid Date/.test(text(main ? main[1] : ''))) warn(r, 'valeur technique affichée');
  rows.push({ r, title: title.length, desc: desc.length, words, kb: Math.round(Buffer.byteLength(html) / 1024), types: types.join(', '), robots });
}
for (const [t, rs] of Object.entries(titles)) if (rs.length > 1) warn(rs.join(', '), `title identique « ${t} »`);
for (const [d, rs] of Object.entries(descs)) if (rs.length > 1) warn(rs.join(', '), 'description identique');
for (const r of pages) if (r !== '/' && !(inbound[r] && inbound[r].size)) warn(r, 'aucun lien interne vers cette page');
// plan du site et robots
const sm = fs.readFileSync(path.join(WEB, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== pages.length) warn('sitemap.xml', `${locs.length} adresses pour ${pages.length} pages`);
console.log(rows.map((x) => `${x.r.padEnd(50)} title ${String(x.title).padStart(2)} · desc ${String(x.desc).padStart(3)} · ${String(x.words).padStart(4)} mots · ${String(x.kb).padStart(3)} Ko · ${x.types}`).join('\n'));
console.log(`\nrobots : ${[...new Set(rows.map((x) => x.robots))].join(' | ')}`);
console.log(`liens entrants (min) : ${Math.min(...pages.filter((r) => r !== '/').map((r) => (inbound[r] ? inbound[r].size : 0)))}`);
console.log(problems.length ? `\n${problems.length} point(s) à revoir :\n- ${problems.join('\n- ')}` : '\nAucun problème détecté.');
process.exit(problems.length ? 1 : 0);
