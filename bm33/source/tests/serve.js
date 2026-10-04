// Serveur de test : URL propres comme Vercel (cleanUrls), 404.html, en-têtes de ../out/vercel.json.
// Usage : node serve.js <dossier> <port>
const http = require('http'), fs = require('fs'), path = require('path');
const dir = path.resolve(process.argv[2] || path.join(__dirname, '..', 'out', 'web'));
const port = +(process.argv[3] || 8811);
const readVercel = () => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'out', 'vercel.json'), 'utf8')); } catch (e) { return {}; } };
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
const rx = (src) => new RegExp('^' + src.replace(/\(\.\*\)/g, '(.*)') + '$');
http.createServer((req, res) => {
  const vercel = readVercel();
  let u = decodeURIComponent(req.url.split('?')[0]);
  for (const r of vercel.redirects || []) if (u === r.source) { res.writeHead(r.permanent ? 308 : 307, { Location: r.destination }); return res.end(); }
  if (u.endsWith('.html') && u !== '/404.html') { res.writeHead(308, { Location: u.slice(0, -5) || '/' }); return res.end(); }
  let f = path.join(dir, u);
  if (u === '/') f = path.join(dir, 'index.html');
  else if (!path.extname(u)) f = path.join(dir, u + '.html');
  let status = 200;
  if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { f = path.join(dir, '404.html'); status = 404; }
  const h = { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' };
  for (const block of vercel.headers || []) if (rx(block.source).test(u)) for (const x of block.headers) h[x.key] = x.value;
  res.writeHead(status, h);
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log('http://localhost:' + port));
