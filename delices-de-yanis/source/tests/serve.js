// Serveur local qui imite l'hébergement Vercel du site (adresses sans « .html », pages de l'application, 404.html).
// Usage : node tests/serve.js [dossier du site, défaut out/web] [port, défaut 8791]
const http = require('http'), fs = require('fs'), path = require('path');
const WEB = path.resolve(process.argv[2] || path.join(__dirname, '../out/web')); const PORT = +process.argv[3] || 8791;
const T = { '.ico': 'image/x-icon', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const APP = [/^\/commande$/, /^\/commandes$/, /^\/suivi\/[^/]+$/, /^\/cuisine$/, /^\/cuisine\/.*$/];
http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u.length > 1 && u.endsWith('/')) { res.writeHead(308, { Location: u.slice(0, -1) }); return res.end(); }
  // cleanUrls : /page.html et /index.html redirigent vers l'adresse propre
  if (/\.html$/.test(u)) { res.writeHead(308, { Location: u.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '') || '/' }); return res.end(); }
  const send = (f, code = 200) => { res.writeHead(code, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); };
  const f = path.join(WEB, u);
  if (path.extname(u) && fs.existsSync(f) && fs.statSync(f).isFile()) return send(f);
  const h = path.join(WEB, u === '/' ? 'index.html' : u + '.html');
  if (fs.existsSync(h)) return send(h);
  if (APP.some((r) => r.test(u))) return send(path.join(WEB, 'app.html'));
  send(path.join(WEB, '404.html'), 404);
}).listen(PORT, '127.0.0.1', () => console.log('ok ' + PORT));
