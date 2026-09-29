/* =====================================================================
   ESPACE RESTAURANT : connexion, écran cuisine (commandes en direct),
   tableau de bord, carte (ruptures, prix), réglages.
   ===================================================================== */
const ADM_NAV = [['commandes', 'Commandes', 'bell', 'Commandes'], ['historique', 'Historique', 'list', 'Historique'], ['tableau', 'Tableau de bord', 'chart', 'Ventes'], ['carte', 'La carte', 'grid', 'Carte'], ['reglages', 'Réglages', 'sliders', 'Réglages']];
const isAdminPath = (p) => /^\/cuisine(\/|$)/.test(p);
const active = (o) => !['terminee', 'annulee'].includes(o.status);
const admUi = { sound: true, autoSim: false, seen: new Set() };

function adminLogin() {
  return `<div class="auth"><div class="auth-box">
    ${logoHTML(true)}
    <div class="auth-card">
      <p class="kicker">Espace restaurant</p>
      <h1>Connexion</h1>
      <p class="muted">Commandes en direct, carte, ruptures et réglages.</p>
      <form data-login novalidate>
        <label class="f"><span>Identifiant</span><input name="login" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false"></label>
        <label class="f"><span>Mot de passe</span><input name="pw" type="password" autocomplete="current-password"><em class="err-m"></em></label>
        <button class="btn btn-primary btn-lg btn-block" type="submit">${icon('lock')}Se connecter</button>
      </form>
    </div>
    <a class="back light" href="/">${icon('chevL')}Retour au site</a>
  </div></div>`;
}
function mountAdminLogin() {
  const f = $('[data-login]');
  f.onsubmit = (e) => {
    e.preventDefault();
    if (!checkAdmin(f.login.value, f.pw.value)) { const l = f.pw.closest('.f'); l.classList.add('err'); $('.err-m', l).textContent = 'Identifiant ou mot de passe incorrect.'; f.pw.value = ''; return; }
    setAdminSession({ at: new Date().toISOString() });
    render();
  };
}

function adminShell(key, title, content, actions = '') {
  const waiting = db.orders.filter((o) => o.status === 'recue').length;
  const paused = pausedNow();
  return `<div class="adm">
    <header class="adm-hd"><div class="adm-hd-in">
      <a class="adm-logo" href="/cuisine">${logoMark(34)}<span>Délices de Yanis <small>restaurant</small></span></a>
      <nav class="adm-nav" aria-label="Espace restaurant">${ADM_NAV.map(([k, l, ic, sh]) => `<a href="/cuisine${k === 'commandes' ? '' : '/' + k}" class="${k === key ? 'on' : ''}" ${k === key ? 'aria-current="page"' : ''}>${icon(ic)}<span class="l-long">${esc(l)}</span><span class="l-short">${esc(sh)}</span>${k === 'commandes' && waiting ? `<i class="cnt">${waiting}</i>` : ''}</a>`).join('')}</nav>
      <div class="adm-act">
        <button type="button" class="pausebtn ${paused ? 'paused' : ''}" data-pause>${icon(paused ? 'play' : 'pause')}<span>${paused ? 'Commandes en pause' : 'Commandes ouvertes'}</span></button>
        <button type="button" class="icon-btn" data-install hidden title="Installer l’appli cuisine" aria-label="Installer l’appli cuisine">${icon('download')}</button>
        <a class="icon-btn" href="/" title="Voir le site" aria-label="Voir le site">${icon('home')}</a>
        <button type="button" class="icon-btn" data-logout title="Se déconnecter" aria-label="Se déconnecter">${icon('logout')}</button>
      </div>
    </div></header>
    <main class="adm-main" id="main"><div class="adm-top"><h1>${esc(title)}</h1><div class="adm-top-act">${actions}</div></div>${content}</main>
  </div>`;
}
function bindAdminShell() {
  const lo = $('[data-logout]'); if (lo) lo.onclick = () => { setAdminSession(null); toast('Vous êtes déconnecté.', 'ok'); render(); };
  const pb = $('[data-pause]');
  if (pb) pb.onclick = () => {
    if (pausedNow()) { sync(); S().paused = false; S().pausedUntil = null; save(); toast('Commandes en ligne rouvertes.', 'ok'); render(true); return; }
    openSheet({ title: 'Mettre les commandes en pause', body: `<p class="muted">Le site n’accepte plus de nouvelles commandes immédiates pendant ce temps. Les créneaux programmés restent possibles.</p><div class="pause-opts">${[15, 30, 60].map((m) => `<button type="button" class="btn btn-ghost" data-pm="${m}">${m} minutes</button>`).join('')}<button type="button" class="btn btn-ghost" data-pm="0">Jusqu’à réouverture</button></div>`, onMount: (el, close) => {
      $$('[data-pm]', el).forEach((b) => (b.onclick = () => { const m = +b.dataset.pm; sync(); S().paused = true; S().pausedUntil = m ? addMin(new Date(), m).toISOString() : null; save(); close(); toast(m ? `Pause de ${m} minutes.` : 'Commandes en pause.', 'ok'); render(true); }));
    } });
  };
}

/* ---------- Commandes en direct ---------- */
function ticketLines(o) {
  return orderLines(o).map((l) => `<li><b>${l.qty} ×</b><span><b>${esc(l.name)}</b>${l.detail ? `<small>${esc(l.detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}</span></li>`).join('');
}
function orderCard(o) {
  const created = new Date(o.createdAt);
  const mins = Math.max(0, Math.round((Date.now() - created) / 60000));
  const due = new Date(o.due);
  const late = active(o) && due < new Date();
  const next = { recue: ['preparation', 'Accepter et préparer'], preparation: [o.mode === 'livraison' ? 'livraison' : 'prete', o.mode === 'livraison' ? 'Confier au livreur' : 'Prête'], prete: ['terminee', 'Remise au client'], livraison: ['terminee', 'Livrée'] }[o.status];
  return `<article class="kcard ${o.status === 'recue' ? 'new' : ''} ${late ? 'late' : ''}" data-o="${esc(o.id)}">
    <div class="kcard-hd"><b class="kno">N° ${esc(o.number)}</b><span class="mode m-${o.mode}">${icon(o.mode === 'livraison' ? 'bike' : 'bag')}${o.mode === 'livraison' ? 'Livraison' : 'À emporter'}</span><span class="since">${mins < 1 ? 'à l’instant' : `il y a ${mins} min`}</span></div>
    <p class="kdue ${late ? 'late' : ''}">${icon('clock')}${o.when === 'slot' ? 'Programmée' : 'Au plus tôt'} : <b>${esc(hm(due))}</b>${sameDay(due, new Date()) ? '' : ` (${esc(dayLabel(due))})`}</p>
    <ul class="klines">${ticketLines(o)}</ul>
    <div class="kcust"><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b><a href="tel:${esc((o.customer.phone || '').replace(/\s/g, ''))}">${icon('phone')}${esc(o.customer.phone || '')}</a>${o.address ? `<span>${icon('pin')}${esc(o.address.street)}, ${esc(o.address.zip)}${o.address.info ? ` · ${esc(o.address.info)}` : ''}</span>` : ''}</div>
    <div class="kfoot"><b>${esc(eur(o.total))}</b><span class="paid ${o.paid ? 'yes' : ''}">${o.paid ? 'Payée en ligne' : o.mode === 'livraison' ? 'À encaisser à la livraison' : 'À encaisser sur place'}</span></div>
    <div class="kact">${next ? `<button type="button" class="btn btn-primary" data-next="${next[0]}">${esc(next[1])}</button>` : ''}<button type="button" class="icon-btn" data-print title="Imprimer le ticket" aria-label="Imprimer le ticket">${icon('printer')}</button>${o.status === 'recue' ? `<button type="button" class="icon-btn danger" data-cancel title="Refuser" aria-label="Refuser la commande">${icon('x')}</button>` : ''}</div>
  </article>`;
}
function pageCuisine() {
  const list = db.orders.filter(active).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  const cols = [['recue', 'Nouvelles'], ['preparation', 'En préparation'], ['prete', deliveryOn() ? 'Prêtes et en livraison' : 'Prêtes à récupérer']];
  const inCol = (c) => list.filter((o) => (c === 'prete' ? ['prete', 'livraison'].includes(o.status) : o.status === c));
  const today = db.orders.filter((o) => sameDay(new Date(o.createdAt), new Date()) && o.status !== 'annulee');
  const content = `<div class="kstats"><span><b>${today.length}</b> commandes aujourd’hui</span><span><b>${esc(eur(today.reduce((a, o) => a + o.total, 0)))}</b> de ventes</span><span><b>${list.length}</b> en cours</span></div>
  <p class="kdemo">${icon('info')}${fr('Démonstration : les commandes passées sur le site depuis cet appareil arrivent ici en direct, avec une sonnerie. « Simuler une commande » en ajoute une à tout moment.')}</p>
  <div class="kboard">${cols.map(([c, l]) => `<section class="kcol k-${c}"><h2>${esc(l)}<i>${inCol(c).length}</i></h2><div class="kcol-b">${inCol(c).map(orderCard).join('') || `<p class="kempty">Rien pour le moment.</p>`}</div></section>`).join('')}</div>`;
  const notif = 'Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied';
  const actions = `<button type="button" class="btn btn-ghost" data-sound>${icon('bell')}${admUi.sound ? 'Son activé' : 'Son coupé'}</button>${notif ? `<button type="button" class="btn btn-ghost" data-notif>${icon('info')}Activer les alertes</button>` : ''}<button type="button" class="btn btn-dark" data-sim>${icon('sparkle')}Simuler une commande</button>`;
  return adminShell('commandes', 'Commandes en direct', content, actions);
}
/* Son : les navigateurs ne l'autorisent qu'après un premier geste sur la page (le moindre toucher suffit). */
let actx = null;
function audio() {
  try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) { actx = null; }
  return actx;
}
document.addEventListener('pointerdown', () => { if (isAdminPath(curPath()) && admUi.sound) audio(); }, { passive: true });
function chime() {
  if (!admUi.sound) return;
  try {
    const ctx = audio();
    if (!ctx) return;
    [880, 1175, 1568].forEach((f, i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.frequency.value = f; o.type = 'sine'; g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.16); g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + i * 0.16 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.16 + 0.5); o.connect(g).connect(ctx.destination); o.start(ctx.currentTime + i * 0.16); o.stop(ctx.currentTime + i * 0.16 + 0.55); });
  } catch (e) { /* son indisponible */ }
}
function simulateOrder() {
  sync();
  const r = Math.random;
  const pool = db.menu.filter((p) => p.available !== false && p.cat !== 'boissons');
  const lines = [];
  for (let i = 0; i < 1 + Math.floor(r() * 3); i++) { const p = pool[Math.floor(r() * pool.length)]; const c = defaultChoiceSeed(p, r); lines.push({ id: uid('l'), productId: p.id, choice: c, qty: 1, note: r() < 0.2 ? 'Bien cuit s’il vous plaît' : '', unit: unitPrice(p, c) }); }
  const mode = deliveryOn() && r() < 0.5 ? 'livraison' : 'emporter';
  const sub = round2(lines.reduce((a, l) => a + l.unit * l.qty, 0));
  const fee = mode === 'livraison' ? (sub >= S().freeDeliveryFrom ? 0 : 2.5) : 0;
  const names = [['Lina', 'M.'], ['Adam', 'B.'], ['Chloé', 'R.'], ['Ilyes', 'T.'], ['Emma', 'D.'], ['Sofiane', 'K.']];
  const [fn, ln] = names[Math.floor(r() * names.length)];
  const now = new Date();
  db.orders.unshift({ id: uid('o'), number: orderNumber(), createdAt: now.toISOString(), status: 'recue', history: [{ st: 'recue', at: now.toISOString() }], auto: false, mode, when: 'asap', due: addMin(now, mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes).toISOString(), customer: { firstName: fn, lastName: ln, phone: `06 39 98 ${pad(Math.floor(r() * 100))} ${pad(Math.floor(r() * 100))}` }, address: mode === 'livraison' ? { street: `${1 + Math.floor(r() * 60)} rue Fondaudège`, zip: '33000', city: 'Bordeaux', info: '' } : null, lines, promo: null, discount: 0, delivery: fee, total: round2(sub + fee), payment: 'carte', paid: true, channel: 'En ligne', demo: true });
  save();
}
let cuisineTimer = null;
function mountCuisine() {
  bindAdminShell();
  clearInterval(cuisineTimer);
  db.orders.filter((o) => o.status === 'recue').forEach((o) => admUi.seen.add(o.id));
  const bind = () => {
    $$('[data-o]').forEach((card) => {
      const o = orderById(card.dataset.o);
      const nx = $('[data-next]', card); if (nx) nx.onclick = () => { setStatus(o, nx.dataset.next, true); toast(`Commande ${o.number} : ${STATUS[nx.dataset.next][0].toLowerCase()}.`, 'ok'); render(true); };
      const cc = $('[data-cancel]', card); if (cc) cc.onclick = () => { setStatus(o, 'annulee', true); toast(`Commande ${o.number} refusée.`, 'ok'); render(true); };
      $('[data-print]', card).onclick = () => printTicket(o);
    });
    const sim = $('[data-sim]'); if (sim) sim.onclick = () => { simulateOrder(); chime(); render(true); };
    const snd = $('[data-sound]'); if (snd) snd.onclick = () => { admUi.sound = !admUi.sound; render(true); };
    const nt = $('[data-notif]'); if (nt) nt.onclick = async () => { try { const r = await Notification.requestPermission(); toast(r === 'granted' ? 'Alertes activées : une notification arrive à chaque commande.' : 'Alertes refusées par le navigateur.', r === 'granted' ? 'ok' : 'warn'); } catch (e) { /* navigateur sans notifications */ } render(true); };
  };
  bind();
  // nouvelles commandes (site ouvert dans un autre onglet ou sur un autre écran du même appareil)
  cuisineTimer = setInterval(() => {
    if (curPath() !== '/cuisine') { clearInterval(cuisineTimer); return; }
    const fresh = lsGet(STORE);
    if (!fresh) return;
    const before = JSON.stringify(db.orders.filter(active).map((o) => o.id + o.status));
    db = fresh;
    const news = db.orders.filter((o) => o.status === 'recue' && !admUi.seen.has(o.id));
    news.forEach((o) => admUi.seen.add(o.id));
    if (news.length) alertNew(news);
    if (JSON.stringify(db.orders.filter(active).map((o) => o.id + o.status)) !== before) render(true);
    else $$('.since').forEach((s) => { const c = s.closest('[data-o]'); const o = c && orderById(c.dataset.o); if (o) { const m = Math.max(0, Math.round((Date.now() - new Date(o.createdAt)) / 60000)); s.textContent = m < 1 ? 'à l’instant' : `il y a ${m} min`; } });
  }, 3000);
}
/* ---------- Alertes de l'appli cuisine : son, vibration, notification, pastille sur l'icône ---------- */
function alertNew(news) {
  chime();
  try { if (navigator.vibrate) navigator.vibrate([220, 100, 220]); } catch (e) { /* rien */ }
  toast(news.length > 1 ? `${news.length} nouvelles commandes` : `Nouvelle commande n° ${news[0].number}`, 'ok');
  // appli en arrière-plan : notification du système (une par commande)
  if (document.visibilityState !== 'visible' && 'Notification' in window && Notification.permission === 'granted' && navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((reg) => news.forEach((o) => reg.showNotification(`Nouvelle commande n° ${o.number}`, {
      body: `${o.customer.firstName} · ${plural(o.lines.reduce((a, l) => a + l.qty, 0), 'article')} · ${eur(o.total)} · ${o.paid ? 'payée en ligne' : 'à encaisser'}`,
      tag: 'commande-' + o.id, icon: '/icons/cuisine-192.png', badge: '/icons/cuisine-96.png', vibrate: [220, 100, 220], data: { url: '/cuisine' },
    }))).catch(() => {});
  }
  updateBadge();
}
/** Pastille sur l'icône de l'appli installée : nombre de commandes à accepter. */
function updateBadge() {
  const n = db.orders.filter((o) => o.status === 'recue').length;
  try { if ('setAppBadge' in navigator) (n ? navigator.setAppBadge(n) : navigator.clearAppBadge()).catch(() => {}); } catch (e) { /* rien */ }
}
/* Écran de la tablette toujours allumé tant que l'espace restaurant est ouvert */
let wake = null;
async function keepAwake() {
  try { if ('wakeLock' in navigator && !wake && document.visibilityState === 'visible') { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); } } catch (e) { wake = null; }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && isAdminPath(curPath()) && adminSession()) keepAwake(); });
/** Appelé à chaque changement de page : écran allumé et pastille dans l'espace restaurant, rien ailleurs. */
function adminRouteHook(path) {
  if (isAdminPath(path) && adminSession()) { keepAwake(); updateBadge(); }
  else if (wake) { wake.release().catch(() => {}); wake = null; }
}

/* ---------- Historique des commandes ---------- */
const histUi = { day: 0 };
function pageHistorique() {
  const today = dayStart(new Date());
  const day = new Date(today.getTime() - histUi.day * DAY);
  const list = db.orders.filter((o) => sameDay(new Date(o.createdAt), day)).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  const ok = list.filter((o) => o.status !== 'annulee');
  const sum = round2(ok.reduce((a, o) => a + o.total, 0));
  const days = [...Array(7)].map((_, i) => new Date(today.getTime() - i * DAY));
  const content = `<div class="chips hist-days">${days.map((d, i) => `<button type="button" class="chip ${i === histUi.day ? 'on' : ''}" data-hday="${i}">${i === 0 ? 'Aujourd’hui' : i === 1 ? 'Hier' : `${cap(JOURS[d.getDay()])} ${d.getDate()}`}</button>`).join('')}</div>
  <div class="kstats"><span><b>${ok.length}</b> ${ok.length > 1 ? 'commandes' : 'commande'}</span><span><b>${esc(eur(sum))}</b> de ventes</span><span><b>${esc(eur(ok.length ? sum / ok.length : 0))}</b> panier moyen</span></div>
  <div class="hlist">${list.length ? list.map((o) => `<button type="button" class="hrow" data-h="${esc(o.id)}"><b class="kno">N° ${esc(o.number)}</b><span class="hrow-t">${esc(hm(new Date(o.createdAt)))}</span><span class="hrow-c"><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b><small>${esc(orderLines(o).map((l) => (l.qty > 1 ? l.qty + ' × ' : '') + l.name).join(', '))}</small></span><span class="badge b-${o.status}">${esc(STATUS[o.status][0])}</span><b class="hrow-p">${esc(eur(o.total))}</b></button>`).join('') : '<p class="kempty">Aucune commande ce jour-là.</p>'}</div>`;
  return adminShell('historique', 'Historique', content);
}
function mountHistorique() {
  bindAdminShell();
  $$('[data-hday]').forEach((b) => (b.onclick = () => { histUi.day = +b.dataset.hday; render(true); }));
  $$('[data-h]').forEach((b) => (b.onclick = () => openOrderSheet(orderById(b.dataset.h))));
}
/** Détail d'une commande : ce qui a été commandé, le client, le paiement et chaque étape avec son heure. */
function openOrderSheet(o) {
  if (!o) return;
  const steps = (o.history || []).map((h) => `<li><b>${esc(STATUS[h.st] ? STATUS[h.st][0] : h.st)}</b><span>${esc(hm(new Date(h.at)))}</span></li>`).join('');
  openSheet({ title: `Commande n° ${o.number}`, body: `<div class="odetail">
    <p class="muted">${esc(dayLabel(new Date(o.createdAt)))} à ${esc(hm(new Date(o.createdAt)))} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'} · ${o.when === 'slot' ? `programmée pour ${esc(hm(new Date(o.due)))}` : 'dès que possible'}</p>
    <ul class="klines">${ticketLines(o)}</ul>
    <div class="tots">${o.discount ? `<div class="disc"><span>Code ${esc(o.promo)}</span><b>−${esc(eur(o.discount))}</b></div>` : ''}<div class="tot"><span>Total TTC</span><b>${esc(eur(o.total))}</b></div></div>
    <p><b>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')}</b> · <a class="link" href="tel:${esc((o.customer.phone || '').replace(/\s/g, ''))}">${esc(o.customer.phone || '')}</a></p>
    <p class="paid ${o.paid ? 'yes' : ''}">${o.paid ? 'Payée en ligne' : 'Réglée au comptoir'}</p>
    <ol class="steps-mini">${steps}</ol></div>`,
    foot: `<button type="button" class="btn btn-ghost" data-reprint>${icon('printer')}Réimprimer le ticket</button>`,
    onMount: (el) => { $('[data-reprint]', el).onclick = () => printTicket(o); } });
}
function printTicket(o) {
  const w = window.open('', '_blank', 'width=380,height=640');
  if (!w) { toast('Autorisez les fenêtres pour imprimer.', 'warn'); return; }
  const lines = orderLines(o).map((l) => `<tr><td>${l.qty} ×</td><td><b>${esc(l.name)}</b>${l.detail ? `<br><small>${esc(l.detail)}</small>` : ''}${l.note ? `<br><small>« ${esc(l.note)} »</small>` : ''}</td><td style="text-align:right">${esc(eur(l.unit * l.qty))}</td></tr>`).join('');
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Ticket ${esc(o.number)}</title><style>body{font:13px/1.35 monospace;margin:12px;color:#000}h1{font-size:18px;margin:0}table{width:100%;border-collapse:collapse}td{vertical-align:top;padding:3px 2px;border-bottom:1px dashed #999}small{font-size:11px}.big{font-size:22px;font-weight:bold}</style></head><body>
    <h1>${esc(S().name)}</h1><p>${esc(S().address)}, ${esc(S().city)}</p><p class="big">N° ${esc(o.number)} · ${o.mode === 'livraison' ? 'LIVRAISON' : 'À EMPORTER'}</p>
    <p>${esc(new Date(o.createdAt).toLocaleString('fr-FR'))}<br>Pour : ${esc(hm(new Date(o.due)))}<br>${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')} · ${esc(o.customer.phone)}${o.address ? `<br>${esc(o.address.street)}, ${esc(o.address.zip)} ${esc(o.address.info || '')}` : ''}</p>
    <table>${lines}</table><p class="big">Total : ${esc(eur(o.total))}</p><p>${o.paid ? 'PAYÉE EN LIGNE' : 'À ENCAISSER'}</p><script>window.print()<\/script></body></html>`);
  w.document.close();
}

/* ---------- Tableau de bord ---------- */
function pageTableau() {
  const done = db.orders.filter((o) => o.status !== 'annulee');
  const today = dayStart(new Date());
  const inDay = (o, d) => sameDay(new Date(o.createdAt), d);
  const t = done.filter((o) => inDay(o, today));
  const sum = (a) => round2(a.reduce((x, o) => x + o.total, 0));
  const last7 = done.filter((o) => new Date(o.createdAt) > new Date(today.getTime() - 6 * DAY));
  const prev7 = done.filter((o) => { const d = new Date(o.createdAt); return d <= new Date(today.getTime() - 6 * DAY) && d > new Date(today.getTime() - 13 * DAY); });
  const delta = sum(prev7) ? Math.round(((sum(last7) - sum(prev7)) / sum(prev7)) * 100) : 0;
  const days = [...Array(14)].map((_, i) => new Date(today.getTime() - (13 - i) * DAY));
  const perDay = days.map((d) => sum(done.filter((o) => inDay(o, d))));
  const maxD = Math.max(1, ...perDay);
  const counts = {};
  // les plats (les boissons accompagnent presque chaque commande : elles fausseraient le classement)
  for (const o of done.filter((x) => new Date(x.createdAt) > new Date(today.getTime() - 29 * DAY))) for (const l of o.lines) { const p = product(l.productId); if (p && p.cat !== 'boissons') counts[l.productId] = (counts[l.productId] || 0) + l.qty; }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topMax = top.length ? top[0][1] : 1;
  const hours = [...Array(24)].map((_, h) => last7.filter((o) => new Date(o.createdAt).getHours() === h).length);
  const hMax = Math.max(1, ...hours);
  const deliv = last7.length ? Math.round((last7.filter((o) => o.mode === 'livraison').length / last7.length) * 100) : 0;
  const online = last7.length ? Math.round((last7.filter((o) => o.paid).length / last7.length) * 100) : 0;
  const content = `
  <div class="kpis">
    <div class="kpi"><small>Ventes du jour</small><b>${esc(eur(sum(t)))}</b><span>${plural(t.length, 'commande')}</span></div>
    <div class="kpi"><small>7 derniers jours</small><b>${esc(eur(sum(last7)))}</b><span class="${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} % sur la semaine d’avant</span></div>
    <div class="kpi"><small>Panier moyen</small><b>${esc(eur(last7.length ? sum(last7) / last7.length : 0))}</b><span>sur 7 jours</span></div>
    ${deliveryOn() ? `<div class="kpi"><small>Part livraison</small><b>${deliv} %</b><span>${100 - deliv} % à emporter</span></div>` : `<div class="kpi"><small>Payé en ligne</small><b>${online} %</b><span>${100 - online} % au comptoir</span></div>`}
  </div>
  <div class="dash">
    <section class="panel wide"><h2>Ventes des 14 derniers jours</h2><div class="bars">${perDay.map((v, i) => `<div class="bar" title="${esc(dayLabel(days[i]))} : ${esc(eur(v))}"><i style="height:${Math.round((v / maxD) * 100)}%"></i><small>${days[i].getDate()}</small></div>`).join('')}</div></section>
    <section class="panel"><h2>Les plus vendus, 30 jours</h2><ul class="toplist">${top.map(([id, n]) => `<li><span>${esc((product(id) || { name: id }).name)}</span><i style="width:${Math.round((n / topMax) * 100)}%"></i><b>${n}</b></li>`).join('')}</ul></section>
    <section class="panel"><h2>Heures de pointe, 7 jours</h2><div class="hbars">${hours.map((v, h) => (h >= 11 && h <= 23 ? `<div class="hb"><i style="height:${Math.round((v / hMax) * 100)}%"></i><small>${h}h</small></div>` : '')).join('')}</div></section>
  </div>`;
  return adminShell('tableau', 'Tableau de bord', content);
}

/* ---------- La carte ---------- */
function pageAdmCarte() {
  const content = `<p class="muted">Un plat en rupture disparaît de la commande en ligne jusqu’à ce que vous le remettiez. Les prix se changent directement.</p>
  ${CATEGORIES.map(([c, n]) => `<section class="panel"><h2>${esc(n)}</h2><div class="mlist">${db.menu.filter((p) => p.cat === c).map((p) => `<div class="mrow ${p.available === false ? 'off' : ''}" data-m="${esc(p.id)}"><div class="mrow-img">${photo(p.id, { alt: '' })}</div><span class="mrow-n"><b>${esc(p.name)}</b><small>${esc(p.desc)}</small></span><label class="mprice"><input inputmode="decimal" value="${esc(p.price.toFixed(2).replace('.', ','))}" aria-label="Prix de ${esc(p.name)}"><span>€</span></label><label class="switch" title="Disponible"><input type="checkbox" ${p.available === false ? '' : 'checked'} data-av><i></i><span>${p.available === false ? 'Rupture' : 'Disponible'}</span></label></div>`).join('')}</div></section>`).join('')}`;
  return adminShell('carte', 'La carte', content, `<button type="button" class="btn btn-ghost" data-resetmenu>${icon('refresh')}Carte d’origine</button>`);
}
function mountAdmCarte() {
  bindAdminShell();
  $$('[data-m]').forEach((row) => {
    const p = () => product(row.dataset.m);
    const pr = $('.mprice input', row);
    const show = () => { pr.value = p().price.toFixed(2).replace('.', ','); };
    pr.onchange = () => { const v = Math.round(parseFloat(pr.value.replace(/\s/g, '').replace(',', '.')) * 100) / 100; if (isNaN(v) || v < 0) { show(); toast('Prix invalide.', 'warn'); return; } sync(); p().price = v; show(); save(); toast(`${p().name} : ${eur(v)}.`, 'ok'); };
    pr.onkeydown = (e) => { if (e.key === 'Enter') pr.blur(); };
    const av = $('[data-av]', row);
    av.onchange = () => { sync(); p().available = av.checked; save(); row.classList.toggle('off', !av.checked); $('.switch span', row).textContent = av.checked ? 'Disponible' : 'Rupture'; toast(`${p().name} : ${av.checked ? 'de nouveau disponible' : 'en rupture'}.`, 'ok'); };
  });
  $('[data-resetmenu]').onclick = () => { sync(); db.menu = MENU.map((p) => ({ ...p, available: true })); save(); toast('Carte d’origine rétablie.', 'ok'); render(true); };
}

/* ---------- Réglages ---------- */
function pageReglages() {
  const s = S();
  const content = `<form class="panel form-grid" data-set>
    <h2>Le restaurant</h2>
    <label class="f"><span>Téléphone affiché sur le site</span><input name="phone" value="${esc(s.phone)}" placeholder="05 56 00 00 00"></label>
    <label class="f"><span>Email</span><input name="email" value="${esc(s.email)}"></label>
    <h2>Délais</h2>
    <label class="f"><span>Préparation à emporter (min)</span><input name="prepMinutes" type="number" min="5" value="${s.prepMinutes}"></label>
    <h2>Livraison</h2>
    <label class="check"><input type="checkbox" name="delivery" ${s.delivery ? 'checked' : ''}><span>Proposer aussi la livraison (sinon, tout est à emporter)</span></label>
    <div class="grid3"><label class="f"><span>Livraison (min)</span><input name="deliveryMinutes" type="number" min="10" value="${s.deliveryMinutes}"></label><label class="f"><span>Minimum livraison (€)</span><input name="minDelivery" type="number" min="0" step="0.5" value="${s.minDelivery}"></label><label class="f"><span>Offerte dès (€)</span><input name="freeDeliveryFrom" type="number" min="0" step="1" value="${s.freeDeliveryFrom}"></label></div>
    <div class="zones-edit">${s.zones.map((z, i) => `<label class="f"><span>${esc(z.zip)} · ${esc(z.label)}</span><input type="number" step="0.5" min="0" data-zone="${i}" value="${z.fee}"></label>`).join('')}</div>
    <h2>Horaires</h2>
    <div class="hours-edit">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<label class="f"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><input data-day="${d}" value="${esc((s.hours[d] || []).map(([a, b]) => `${a}-${b}`).join(', '))}" placeholder="11:30-14:30, 18:00-23:00 (vide = fermé)"></label>`).join('')}</div>
    <h2>Écran cuisine</h2>
    <p class="muted small">${fr('Installez l’appli « Yanis Cuisine » sur la tablette ou le téléphone du restaurant : elle s’ouvre directement sur les commandes, sonne et vibre à chaque nouvelle commande, affiche une notification quand elle est en arrière-plan et garde l’écran allumé pendant le service.')}</p>
    <button type="button" class="btn btn-dark" data-install hidden>${icon('download')}Installer l’appli sur cet appareil</button>
    <h2>Démonstration</h2>
    <label class="check"><input type="checkbox" name="autoDemo" ${s.autoDemo ? 'checked' : ''}><span>Le suivi de commande avance tout seul si la cuisine ne répond pas</span></label>
    <div class="form-act"><button type="submit" class="btn btn-primary">Enregistrer</button><button type="button" class="btn btn-ghost" data-resetall>${icon('refresh')}Remettre les données d’exemple</button></div>
  </form>`;
  return adminShell('reglages', 'Réglages', content);
}
function mountReglages() {
  bindAdminShell();
  const f = $('[data-set]');
  f.onsubmit = (e) => {
    e.preventDefault();
    sync();
    const s = S();
    s.phone = f.phone.value.trim(); s.email = f.email.value.trim();
    for (const k of ['prepMinutes', 'deliveryMinutes', 'minDelivery', 'freeDeliveryFrom']) { const v = parseFloat(f[k].value); if (!isNaN(v) && v >= 0) s[k] = v; }
    $$('[data-zone]', f).forEach((i) => { const v = parseFloat(i.value); if (!isNaN(v) && v >= 0) s.zones[+i.dataset.zone].fee = v; });
    let bad = false;
    $$('[data-day]', f).forEach((i) => {
      const txt = i.value.trim();
      if (!txt) { s.hours[i.dataset.day] = []; return; }
      const rs = txt.split(',').map((x) => x.trim().split('-').map((y) => y.trim().replace('h', ':')));
      if (rs.every((r) => r.length === 2 && r.every((t) => /^\d{1,2}:\d{2}$/.test(t)) && toMin(r[0]) < toMin(r[1]))) s.hours[i.dataset.day] = rs.map((r) => r.map((t) => t.padStart(5, '0')));
      else { bad = true; i.closest('.f').classList.add('err'); }
    });
    s.autoDemo = f.autoDemo.checked;
    s.delivery = f.delivery.checked;
    if (!s.delivery && cart.mode !== 'emporter') { cart.mode = 'emporter'; saveCart(); }
    save();
    toast(bad ? 'Enregistré, sauf les horaires signalés (format 11:30-14:30).' : 'Réglages enregistrés.', bad ? 'warn' : 'ok');
  };
  $('[data-resetall]').onclick = () => { if (!confirm('Remettre la carte, les réglages et les commandes d’exemple ?')) return; db = seedDb(); save(); toast('Données d’exemple rétablies.', 'ok'); render(true); };
}
