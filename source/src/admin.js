/* =====================================================================
   LOGICIEL DU LOUEUR : tableau de bord, réservations, planning, flotte,
   clients, options et tarifs, paramètres
   ===================================================================== */
const adm = { resFilter: 'all', resQuery: '', planStart: null, clientQuery: '', chartTable: false };
const NAV = [
  ['dashboard', 'Tableau de bord', 'grid'],
  ['reservations', 'Réservations', 'list'],
  ['planning', 'Planning', 'gantt'],
  ['flotte', 'Véhicules', 'car'],
  ['clients', 'Clients', 'users'],
  ['tarifs', 'Options et tarifs', 'tag'],
  ['parametres', 'Paramètres', 'sliders'],
];
function adminPage(key, title, sub, actions, content) {
  const waiting = db.reservations.filter((r) => r.status === 'attente_paiement').length;
  const nav = NAV.map(([k, label, ic]) => `<a class="nav ${k === key ? 'on' : ''}" href="/gestion/${k}">${icon(ic)}<span>${label}</span>${k === 'reservations' && waiting ? `<span class="cnt">${waiting}</span>` : ''}</a>`).join('');
  const mnav = NAV.filter(([k]) => ['dashboard', 'reservations', 'planning', 'flotte', 'parametres'].includes(k)).map(([k, label, ic]) => `<a class="${k === key ? 'on' : ''}" href="/gestion/${k}">${icon(ic)}<span>${label.split(' ')[0]}</span></a>`).join('');
  return demoBar('admin') + `<div class="admin">
    <aside class="side">${logoHTML(true)}${nav}<div class="side-foot">${esc(db.settings.legalName)}<br>${esc(db.settings.city)} · ${esc(db.settings.phone)}</div></aside>
    <div class="main">
      <header class="topbar"><div class="topbar-in"><div><h1>${esc(title)}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div><div class="actions">${actions || ''}</div></div></header>
      <div class="page">${content}</div>
    </div>
  </div><nav class="mnav" aria-label="Navigation du logiciel">${mnav}</nav>`;
}

/* ---------- Calculs ---------- */
const active = (r) => r.status !== 'annulee';
function monthKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; }
function revenueBetween(a, b) {
  let t = 0;
  for (const r of db.reservations) for (const p of r.payments || []) { const d = parse(p.at); if (d >= a && d < b) t += p.amount; }
  return round2(t);
}
function occupancy(from, days) {
  const to = addDays(from, days);
  const fleet = db.vehicles.filter((v) => v.status === 'actif');
  const total = fleet.length * days * DAY;
  let used = 0;
  for (const r of db.reservations) {
    if (!active(r) || !fleet.some((v) => v.id === r.vehicleId)) continue;
    const a = Math.max(parse(r.from).getTime(), from.getTime());
    const b = Math.min(parse(r.to).getTime(), to.getTime());
    if (b > a) used += b - a;
  }
  return total ? Math.round((used / total) * 100) : 0;
}
function vehicleState(v, when = new Date()) {
  if (v.status !== 'actif') return { label: 'Hors service', cls: 'b-grey' };
  const t = when.getTime();
  if (db.blocks.some((b) => b.vehicleId === v.id && parse(b.from).getTime() <= t && parse(b.to).getTime() > t)) return { label: 'Entretien', cls: 'b-warn' };
  if (db.reservations.some((r) => r.vehicleId === v.id && r.status === 'en_cours')) return { label: 'En location', cls: 'b-violet' };
  return { label: 'Disponible', cls: 'b-ok' };
}

/* ---------- Tableau de bord ---------- */
function pageDashboard() {
  const now = new Date();
  const m0 = new Date(now.getFullYear(), now.getMonth(), 1);
  const lm0 = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lmSame = new Date(now.getFullYear(), now.getMonth() - 1, Math.min(now.getDate(), new Date(now.getFullYear(), now.getMonth(), 0).getDate()), now.getHours(), now.getMinutes());
  const ca = revenueBetween(m0, addDays(now, 1));
  const caPrev = revenueBetween(lm0, lmSame);
  const delta = caPrev ? Math.round(((ca - caPrev) / caPrev) * 100) : null;
  const in30 = addDays(now, 30);
  const upcoming = db.reservations.filter((r) => active(r) && parse(r.from) >= now && parse(r.from) < in30);
  const occ = occupancy(dayStart(now), 30);
  const recent = db.reservations.filter((r) => active(r) && parse(r.createdAt) > addDays(now, -90));
  const avg = recent.length ? round2(sum(recent, (r) => r.quote.total) / recent.length) : 0;
  const today = dayStart(now);
  const deps = db.reservations.filter((r) => ['confirmee', 'attente_paiement'].includes(r.status) && sameDay(parse(r.from), today)).sort((a, b) => (a.from < b.from ? -1 : 1));
  const rets = db.reservations.filter((r) => r.status === 'en_cours' && parse(r.to) < addDays(today, 1)).sort((a, b) => (a.to < b.to ? -1 : 1));
  const waiting = db.reservations.filter((r) => r.status === 'attente_paiement').sort((a, b) => (a.from < b.from ? -1 : 1));
  const msgs = (db.messages || []).filter((m) => !m.done);
  const service = db.vehicles.filter((v) => !v.deleted && v.nextService && parse(v.nextService + 'T00:00') < addDays(now, 30)).sort((a, b) => (a.nextService < b.nextService ? -1 : 1));
  const resRow = (r, kind) => { const v = vehicle(r.vehicleId); const c = customer(r.customerId); const t = kind === 'dep' ? r.from : r.to; return `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer">${vehicleThumb(v)}<div><div class="t">${hm(parse(t)).replace(':', 'h')} · ${esc(custName(c))}</div><div class="s">${esc(v.name)} · ${esc(agency(kind === 'dep' ? r.agencyStart : r.agencyEnd).short)}</div></div><div class="r">${kind === 'dep' ? `<button class="btn btn-silver btn-sm" data-act="checkout" data-id="${esc(r.id)}">Remettre</button>` : `<button class="btn btn-silver btn-sm" data-act="checkin" data-id="${esc(r.id)}">Réceptionner</button>`}</div></div>`; };
  const content = `
    <div class="kpis">
      <div class="kpi" data-reveal><div class="l">Encaissé ce mois-ci</div><div class="v" data-count="${Math.round(ca)}" data-fmt="eur">${eur(Math.round(ca))}</div><div class="d">${delta == null ? '' : `<span class="${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} %</span>`} par rapport à la même période du mois dernier</div></div>
      <div class="kpi" data-reveal style="--d:.08s"><div class="l">Départs dans les 30 jours</div><div class="v" data-count="${upcoming.length}">${upcoming.length}</div><div class="d">${plural(waiting.length, 'réservation')} en attente de paiement</div></div>
      <div class="kpi" data-reveal style="--d:.16s"><div class="l">Occupation, 30 prochains jours</div><div class="v" data-count="${occ}" data-fmt="pct">${occ} %</div><div class="meter" role="img" aria-label="Taux d’occupation ${occ} %"><i style="width:${occ}%"></i></div></div>
      <div class="kpi" data-reveal style="--d:.24s"><div class="l">Panier moyen, 90 jours</div><div class="v" data-count="${Math.round(avg)}" data-fmt="eur">${eur(Math.round(avg))}</div><div class="d">sur ${plural(recent.length, 'réservation')}</div></div>
    </div>
    <div class="dash-grid">
      <div class="panel"><div class="p-hd"><h2>Aujourd’hui, ${esc(fmtDay(now, true))}</h2><div class="actions"><button class="btn btn-primary btn-sm" data-new>${icon('plus')}Nouvelle réservation</button></div></div><div class="p-bd">
        <div class="block-title" style="margin-top:0">Départs (${deps.length})</div>${deps.length ? deps.map((r) => resRow(r, 'dep')).join('') : '<p class="muted">Aucun départ prévu aujourd’hui.</p>'}
        <div class="block-title">Retours (${rets.length})</div>${rets.length ? rets.map((r) => resRow(r, 'ret')).join('') : '<p class="muted">Aucun retour prévu aujourd’hui.</p>'}
      </div></div>
      <div class="panel"><div class="p-hd"><h2>À traiter</h2></div><div class="p-bd">
        ${msgs.map((m) => `<div class="list-row" data-msg="${esc(m.id)}" style="cursor:pointer"><span class="avatar">${icon('mail').replace('<svg ', '<svg style="width:18px;height:18px" ')}</span><div><div class="t">Message de ${esc(m.firstName)} ${esc(m.lastName)}</div><div class="s">${esc(m.subject)} · ${esc(fmtDT(m.at))}</div></div><div class="r"><button class="btn btn-ghost btn-sm" data-msg-open="${esc(m.id)}">Lire</button></div></div>`).join('')}
        ${waiting.length ? waiting.slice(0, 5).map((r) => { const c = customer(r.customerId); return `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer"><span class="avatar">${esc(initials(custName(c)))}</span><div><div class="t">${esc(custName(c))}</div><div class="s">${esc(r.number)} · départ ${esc(fmtDay(r.from))} · ${eur(balance(r))}</div></div><div class="r"><button class="btn btn-ghost btn-sm" data-act="remind" data-id="${esc(r.id)}">Relancer</button></div></div>`; }).join('') : '<p class="muted">Aucun paiement en attente.</p>'}${waiting.length > 5 ? `<a class="link" href="/gestion/reservations" data-waitall style="display:inline-block;margin:10px 0 6px">Voir les ${waiting.length} paiements en attente</a>` : ''}
        ${service.map((v) => `<div class="list-row">${vehicleThumb(v)}<div><div class="t">${esc(v.name)}</div><div class="s">Entretien ou contrôle prévu le ${esc(fmtD(v.nextService + 'T00:00'))}</div></div><div class="r"><span class="badge b-warn plain">${icon('wrench').replace('<svg ', '<svg style="width:12px;height:12px" ')}Entretien</span></div></div>`).join('')}
      </div></div>
    </div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Chiffre d’affaires encaissé, 6 derniers mois</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-chart-table>${adm.chartTable ? 'Voir le graphique' : 'Voir en tableau'}</button></div></div><div class="p-bd">${revenueChart()}</div></div>`;
  return adminPage('dashboard', 'Tableau de bord', esc(db.settings.brand), `<a class="btn btn-ghost btn-sm" href="/" target="_blank">${icon('ext')}<span>Voir le site</span></a>`, content);
}
function revenueChart() {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const a = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const b = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    months.push({ label: MOIS[a.getMonth()], short: MOIS_C[a.getMonth()], value: revenueBetween(a, b), current: i === 0 });
  }
  if (adm.chartTable) return `<table class="tbl"><thead><tr><th>Mois</th><th class="r">Encaissé</th></tr></thead><tbody>${months.map((m) => `<tr style="cursor:default"><td style="text-transform:capitalize">${esc(m.label)}${m.current ? ' (en cours)' : ''}</td><td class="r num">${eur(m.value)}</td></tr>`).join('')}</tbody></table>`;
  const W = 720, H = 240, padL = 56, padB = 28, padT = 16;
  const max = Math.max(...months.map((m) => m.value), 1);
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const nice = Math.ceil(max / step) * step;
  const ticks = [0, nice / 2, nice];
  const slot = (W - padL) / months.length;
  const bw = Math.min(28, slot * 0.4);
  const y = (v) => padT + (H - padT - padB) * (1 - v / nice);
  let g = '';
  for (const t of ticks) g += `<line x1="${padL}" x2="${W}" y1="${y(t)}" y2="${y(t)}" stroke="rgba(255,255,255,.08)" stroke-width="1"/><text x="${padL - 10}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#8a8f97" class="num">${Math.round(t).toLocaleString('fr-FR')} €</text>`;
  months.forEach((m, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(m.value);
    const h = Math.max(0, H - padB - top);
    const r = Math.min(4, h);
    const x0 = cx - bw / 2;
    const path = h > 0 ? `M${x0} ${H - padB}V${top + r}Q${x0} ${top} ${x0 + r} ${top}H${x0 + bw - r}Q${x0 + bw} ${top} ${x0 + bw} ${top + r}V${H - padB}Z` : '';
    g += `<g class="bar-hit" tabindex="0" data-tip="${esc(m.label)}|${esc(eur(m.value))}" data-x="${cx}" data-y="${top}"><rect x="${cx - slot / 2}" y="${padT}" width="${slot}" height="${H - padT}" fill="transparent"/>${path ? `<path class="m" style="--d:${i * 0.08}s" d="${path}" fill="${m.current ? 'url(#goldBar)' : '#4b5058'}"/>` : ''}</g>`;
    g += `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11.5" fill="#a0a4ab">${esc(m.short)}</text>`;
    if (m.current) g += `<text x="${cx}" y="${top - 8}" text-anchor="middle" font-size="12" font-weight="600" fill="#f3e1b6">${esc(eur(m.value))}</text>`;
  });
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Chiffre d’affaires encaissé par mois"><defs><linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e7c2"/><stop offset="1" stop-color="#c39a61"/></linearGradient></defs>${g}</svg><div class="tip"></div></div>`;
}
function mountDashboard() {
  bindResLinks();
  const wa = $('[data-waitall]'); if (wa) wa.onclick = () => { adm.resFilter = 'attente_paiement'; };
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
  $$('[data-msg]').forEach((r) => (r.onclick = () => openMessage(r.dataset.msg)));
  const t = $('[data-chart-table]'); if (t) t.onclick = () => { adm.chartTable = !adm.chartTable; rerender(); };
  const chart = $('.chart');
  if (chart) {
    const tip = $('.tip', chart);
    const show = (el) => { const [l, v] = el.dataset.tip.split('|'); const svg = $('svg', chart); const k = svg.getBoundingClientRect().width / 720; tip.innerHTML = `<b>${esc(v)}</b><span style="text-transform:capitalize">${esc(l)}</span>`; tip.style.left = Number(el.dataset.x) * k + 'px'; tip.style.top = Number(el.dataset.y) * k + 'px'; tip.style.display = 'block'; };
    $$('.bar-hit', chart).forEach((el) => { el.addEventListener('pointerenter', () => show(el)); el.addEventListener('focus', () => show(el)); el.addEventListener('pointerleave', () => (tip.style.display = 'none')); el.addEventListener('blur', () => (tip.style.display = 'none')); });
  }
}
/** Message reçu par le formulaire de contact du site. */
function openMessage(id) {
  const m = (db.messages || []).find((x) => x.id === id);
  if (!m) return;
  const reply = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`${db.settings.brand} : ${m.subject}`)}`;
  openModal({
    title: `Message de ${m.firstName} ${m.lastName}`,
    body: `<div class="kv"><span>Objet</span><b>${esc(m.subject)}</b></div><div class="kv"><span>Reçu le</span><b>${esc(fmtDT(m.at))}</b></div>${m.email ? `<div class="kv"><span>Email</span><b>${esc(m.email)}</b></div>` : ''}${m.phone ? `<div class="kv"><span>Téléphone</span><b>${esc(m.phone)}</b></div>` : ''}<p style="margin-top:14px;white-space:pre-line;color:var(--text-2)">${esc(m.message)}</p>`,
    foot: `${m.email ? `<a class="btn btn-ghost" href="${reply}">${icon('mail')}Répondre</a>` : ''}${m.phone ? `<a class="btn btn-ghost" href="tel:${esc(m.phone.replace(/\s/g, ''))}">${icon('phone')}Appeler</a>` : ''}<button class="btn btn-primary" data-done>Marquer comme traité</button>`,
    onMount: (el, close) => { $('[data-done]', el).onclick = () => { m.done = true; save(); close(); toast('Message traité.', 'ok'); rerender(true); }; },
  });
}
function bindResLinks() {
  $$('[data-res]').forEach((el) => el.addEventListener('click', (e) => { if (e.target.closest('[data-act]')) return; openResDrawer(el.dataset.res); }));
  $$('[data-act]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); resAction(b.dataset.act, b.dataset.id); }));
}

/* ---------- Réservations ---------- */
function pageReservations() {
  const q = adm.resQuery.toLowerCase();
  let list = db.reservations.slice();
  if (adm.resFilter === 'upcoming') list = list.filter((r) => ['confirmee', 'attente_paiement'].includes(r.status));
  else if (adm.resFilter !== 'all') list = list.filter((r) => r.status === adm.resFilter);
  if (q) list = list.filter((r) => { const c = customer(r.customerId); const v = vehicle(r.vehicleId); return [r.number, custName(c), c?.email, c?.phone, v?.name, v?.plate].join(' ').toLowerCase().includes(q); });
  list.sort((a, b) => (adm.resFilter === 'terminee' || adm.resFilter === 'annulee' ? (a.from < b.from ? 1 : -1) : Math.abs(parse(a.from) - new Date()) - Math.abs(parse(b.from) - new Date())));
  const counts = (s) => db.reservations.filter((r) => r.status === s).length;
  const chip = (k, label, n) => `<button class="chip ${adm.resFilter === k ? 'on' : ''}" data-f="${k}">${label}${n != null ? ` · ${n}` : ''}</button>`;
  const rows = list.slice(0, 150).map((r) => { const c = customer(r.customerId); const v = vehicle(r.vehicleId); return `<tr data-res="${esc(r.id)}"><td><b>${esc(r.number)}</b><br><span class="muted" style="font-size:12.5px">${esc(r.channel || '')}</span></td><td>${esc(custName(c))}<br><span class="muted" style="font-size:12.5px">${esc(c?.phone || '')}</span></td><td><div style="display:flex;gap:10px;align-items:center">${vehicleThumb(v)}<span>${esc(v?.name || '')}<br><span class="plate">${esc(v?.plate || '')}</span></span></div></td><td class="nowrap">${esc(fmtDay(r.from))} ${hm(parse(r.from)).replace(':', 'h')}<br><span class="muted">${esc(fmtDay(r.to))} ${hm(parse(r.to)).replace(':', 'h')}</span></td><td class="r num">${active(r) ? eur(totalDue(r)) : `<s class="muted">${eur(r.quote.total)}</s>${r.cancelFee ? `<br><span style="font-size:12.5px">frais ${eur(r.cancelFee)}</span>` : ''}`}${balance(r) > 0 ? `<br><span style="color:var(--warn);font-size:12.5px">reste ${eur(balance(r))}</span>` : ''}</td><td>${statusBadge(r.status)}</td></tr>`; }).join('');
  const content = `
    <div class="toolbar">
      <input class="input" type="search" placeholder="Rechercher : n°, client, véhicule, plaque" value="${esc(adm.resQuery)}" data-q>
      <div class="chips">${chip('all', 'Toutes')}${chip('upcoming', 'À venir')}${chip('attente_paiement', 'En attente', counts('attente_paiement'))}${chip('en_cours', 'En cours', counts('en_cours'))}${chip('terminee', 'Terminées')}${chip('annulee', 'Annulées')}</div>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>N°</th><th>Client</th><th>Véhicule</th><th>Départ / retour</th><th class="r">Montant</th><th>Statut</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="muted" style="cursor:default">Aucune réservation.</td></tr>'}</tbody></table></div>
    ${list.length > 150 ? `<p class="muted" style="margin-top:10px">150 premières réservations affichées sur ${list.length}. Affinez la recherche.</p>` : ''}`;
  return adminPage('reservations', 'Réservations', plural(list.length, 'réservation'), `<button class="btn btn-primary btn-sm" data-new>${icon('plus')}<span>Nouvelle réservation</span></button>`, content);
}
function mountReservations() {
  bindResLinks();
  $$('[data-f]').forEach((b) => (b.onclick = () => { adm.resFilter = b.dataset.f; rerender(); }));
  const q = $('[data-q]');
  if (q) q.oninput = debounce(() => { adm.resQuery = q.value; rerender(true); }, 250);
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

/* ---------- Fiche réservation (panneau latéral) ---------- */
let closeDrawer = null;
function openResDrawer(id) {
  if (closeDrawer) closeDrawer();
  const r = byId(db.reservations, id);
  if (!r) return;
  const v = vehicle(r.vehicleId);
  const c = customer(r.customerId);
  const steps = [
    ['Réservation créée', r.createdAt, true],
    ['Paiement reçu', r.payments.find((p) => p.amount > 0)?.at, r.payments.some((p) => p.amount > 0)],
    ['Véhicule remis', r.checkout?.at, !!r.checkout],
    ['Véhicule restitué', r.checkin?.at, !!r.checkin],
  ];
  const acts = [];
  if (r.status === 'attente_paiement') acts.push(['pay', 'Encaisser', 'btn-primary'], ['remind', 'Envoyer le lien de paiement', 'btn-ghost']);
  if (r.status === 'confirmee') acts.push(['checkout', 'Remettre le véhicule', 'btn-primary']);
  if (r.status === 'en_cours') acts.push(['checkin', 'Réceptionner le véhicule', 'btn-primary']);
  if (balance(r) > 0 && r.status !== 'attente_paiement') acts.push(['pay', active(r) ? 'Encaisser le solde' : 'Encaisser les frais d’annulation', 'btn-silver']);
  acts.push(['contrat', 'Contrat', 'btn-ghost'], ['facture', 'Facture', 'btn-ghost']);
  if (['attente_paiement', 'confirmee'].includes(r.status)) acts.push(['cancel', 'Annuler', 'btn-danger']);
  const ov = document.createElement('div');
  ov.innerHTML = `<div class="drawer-ov"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Réservation ${esc(r.number)}">
    <div class="d-hd"><div><h3>${esc(r.number)}</h3><div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap">${statusBadge(r.status)}<span class="badge b-grey plain">${esc(r.channel || 'En ligne')}</span>${r.youngDriver ? '<span class="badge b-warn plain">Jeune conducteur</span>' : ''}${c.type === 'professionnel' ? '<span class="badge b-gold plain">Professionnel</span>' : ''}${r.transfer && r.status === 'attente_paiement' ? '<span class="badge b-gold plain">Virement annoncé</span>' : ''}</div></div><button class="icon-btn" data-x style="margin-left:auto" aria-label="Fermer">${icon('x')}</button></div>
    <div class="d-bd">
      <div style="display:flex;gap:14px;align-items:center">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><br><span class="plate">${esc(v.plate)}</span> <span class="muted" style="font-size:13px">${v.odo ? v.odo.toLocaleString('fr-FR') + ' km' : ''}</span></div></div>
      <div class="block-title">Location</div>
      <div class="ico-line">${icon('cal')}<span>${esc(fmtDT(r.from))} · ${esc(agency(r.agencyStart).name)}</span></div>
      <div class="ico-line">${icon('cal')}<span>${esc(fmtDT(r.to))} · ${esc(agency(r.agencyEnd).name)}</span></div>
      ${r.delivery ? `<div class="ico-line">${icon('route')}<span>${esc(r.delivery)}</span></div>` : ''}
      <div class="block-title">Client</div>
      <div class="list-row" style="padding-top:0"><span class="avatar">${esc(initials(custName(c)))}</span><div><div class="t">${esc(custName(c))}</div><div class="s">${esc(c.phone)} · ${esc(c.email)}</div></div><div class="r"><a class="btn btn-ghost btn-sm" href="tel:${esc((c.phone || '').replace(/\s/g, ''))}">${icon('phone')}</a></div></div>
      ${c.type === 'professionnel' ? `<div class="kv"><span>Société</span><b>${esc(c.company || '')}${c.siret ? ` · SIRET ${esc(c.siret)}` : ''}</b></div>${c.vatNum ? `<div class="kv"><span>N° TVA</span><b>${esc(c.vatNum)}</b></div>` : ''}` : ''}
      ${r.transfer && r.status === 'attente_paiement' ? `<div class="kv"><span>Virement annoncé</span><b>${esc(fmtDT(r.transfer.at))} · à rapprocher du relevé</b></div>` : ''}
      <div class="kv"><span>Permis</span><b>${esc(licText(c))}</b></div>
      <div class="block-title">Suivi</div>
      <ul class="timeline">${steps.map(([l, at, done]) => `<li class="${done ? 'done' : ''}"><i></i><span>${l}${done && at ? ` <span class="muted">· ${esc(fmtDT(at))}</span>` : ''}</span></li>`).join('')}</ul>
      ${r.checkout ? `<div class="kv"><span>Départ</span><b>${r.checkout.km.toLocaleString('fr-FR')} km · carburant ${r.checkout.fuel}/8</b></div>` : ''}
      ${r.checkin ? `<div class="kv"><span>Retour</span><b>${r.checkin.km.toLocaleString('fr-FR')} km · carburant ${r.checkin.fuel}/8</b></div>` : ''}
      <div class="block-title">Facturation</div>
      ${billingHTML(r)}
      ${r.payments.length ? `<div class="block-title">Paiements</div>${r.payments.map((p) => `<div class="kv"><span>${esc(fmtD(p.at))} · ${esc(p.method)}</span><b class="num" style="color:${p.amount < 0 ? 'var(--danger)' : 'var(--text)'}">${p.amount < 0 ? '− ' + eur(-p.amount, true) : eur(p.amount, true)}</b></div>`).join('')}` : ''}
      <div class="block-title">Notes internes</div>
      <textarea class="textarea" data-notes placeholder="Visible uniquement dans le logiciel">${esc(r.notes || '')}</textarea>
    </div>
    <div class="d-ft">${acts.map(([k, l, cls]) => `<button class="btn ${cls} btn-sm" data-act="${k}" data-id="${esc(r.id)}">${l}</button>`).join('')}</div>
  </aside>`;
  document.body.appendChild(ov);
  const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); closeDrawer = null; };
  const onKey = (e) => { if (e.key === 'Escape' && !$('.overlay')) close(); };
  document.addEventListener('keydown', onKey);
  $('.drawer-ov', ov).onclick = close;
  $('[data-x]', ov).onclick = close;
  $('[data-notes]', ov).onchange = (e) => { r.notes = e.target.value; save(); toast('Note enregistrée.'); };
  $$('[data-act]', ov).forEach((b) => (b.onclick = () => resAction(b.dataset.act, r.id)));
  closeDrawer = close;
  setTimeout(() => $('[data-x]', ov).focus(), 30);
}
function refreshAfter(id) { rerender(true); if (closeDrawer && id) openResDrawer(id); }
function resAction(act, id) {
  const r = byId(db.reservations, id);
  if (!r) return;
  const v = vehicle(r.vehicleId);
  const s = db.settings;
  if (act === 'remind') { toast(`Démonstration : lien de paiement envoyé par SMS et email à ${custName(customer(r.customerId))}.`, 'ok'); return; }
  if (act === 'contrat' || act === 'facture') { openDocument(r, act); return; }
  if (act === 'pay') {
    openModal({
      title: 'Encaisser un paiement',
      body: `<form data-f style="display:grid;gap:12px"><label class="field"><span class="lbl">Montant</span><input class="input" name="amount" type="number" step="0.01" min="0.01" value="${Math.max(0, balance(r))}"></label><label class="field"><span class="lbl">Moyen de paiement</span><select class="select" name="method"><option>Carte bancaire</option><option>Espèces</option><option ${r.transfer ? 'selected' : ''}>Virement</option><option>Chèque</option><option>Lien de paiement</option></select></label></form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Encaisser</button>',
      onMount: (m, close) => { $('[data-ok]', m).onclick = () => { const f = $('[data-f]', m); const a = round2(f.amount.value); if (!(a > 0)) { toast('Montant invalide.', 'warn'); return; } r.payments.push({ id: uid('p'), amount: a, method: f.method.value, at: toISO(new Date()) }); if (r.status === 'attente_paiement' && balance(r) <= 0) r.status = 'confirmee'; save(); close(); toast(`${eur(a, true)} encaissés.`, 'ok'); refreshAfter(r.id); }; },
    });
    return;
  }
  if (act === 'cancel') {
    const p = paid(r);
    confirmBox('Annuler la réservation', `${esc(r.number)} sera annulée et le véhicule libéré.${p ? ` ${eur(p, true)} ont été réglés : un remboursement sera enregistré.` : ''}`, 'Annuler la réservation', () => {
      r.status = 'annulee';
      r.cancelFee = 0;
      r.cancelledAt = toISO(new Date());
      if (p > 0) r.payments.push({ id: uid('p'), amount: -p, method: 'Remboursement', at: toISO(new Date()) });
      save(); toast('Réservation annulée.', 'ok'); refreshAfter(r.id);
    }, true);
    return;
  }
  if (act === 'checkout') {
    const fuelOpts = (sel) => Array.from({ length: 9 }, (_, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>${i === 8 ? 'Plein (8/8)' : i === 0 ? 'Réserve (0/8)' : i + '/8'}</option>`).join('');
    openModal({
      title: 'Remise du véhicule',
      body: `<form data-f style="display:grid;gap:12px">
        <p class="muted">${esc(v.name)} · <span class="plate">${esc(v.plate)}</span> · ${esc(custName(customer(r.customerId)))}</p>
        ${balance(r) > 0 ? `<div class="alert warn">${icon('alert')}<span>Il reste ${eur(balance(r), true)} à encaisser avant la remise des clés.</span></div>` : ''}
        <div class="grid2"><label class="field"><span class="lbl">Kilométrage au départ</span><input class="input" name="km" type="number" value="${v.odo || 0}"></label><label class="field"><span class="lbl">Carburant ou charge</span><select class="select" name="fuel">${fuelOpts(8)}</select></label></div>
        <label class="field"><span class="lbl">État du véhicule, dommages existants</span><textarea class="textarea" name="notes" placeholder="Rayure pare-choc arrière droit, jante avant gauche frottée…"></textarea></label>
        <label class="check"><input type="checkbox" name="docs"> Permis et pièce d’identité vérifiés</label>
        <label class="check"><input type="checkbox" name="deposit"> Caution de ${eur(r.quote.deposit)} prise par empreinte bancaire</label>
        <button type="button" class="btn btn-ghost btn-sm" style="justify-self:start" data-photo>${icon('camera')}Ajouter des photos de l’état des lieux</button>
      </form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Remettre les clés</button>',
      onMount: (m, close) => {
        $('[data-photo]', m).onclick = () => toast('Démonstration : les photos prises au téléphone seront jointes au contrat.');
        $('[data-ok]', m).onclick = () => {
          const f = $('[data-f]', m);
          if (!f.docs.checked || !f.deposit.checked) { toast('Cochez la vérification des papiers et la caution.', 'warn'); return; }
          r.checkout = { km: Number(f.km.value) || v.odo || 0, fuel: Number(f.fuel.value), notes: f.notes.value.trim(), docs: true, deposit: true, at: toISO(new Date()) };
          r.status = 'en_cours';
          save(); close(); toast('Véhicule remis. Bonne route au client.', 'ok'); refreshAfter(r.id);
        };
      },
    });
    return;
  }
  if (act === 'checkin') {
    const out = r.checkout || { km: v.odo || 0, fuel: 8 };
    const fuelOpts = (sel) => Array.from({ length: 9 }, (_, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>${i === 8 ? 'Plein (8/8)' : i === 0 ? 'Réserve (0/8)' : i + '/8'}</option>`).join('');
    const cleanTaken = !!r.options['o-clean'];
    openModal({
      title: 'Retour du véhicule',
      body: `<form data-f style="display:grid;gap:12px">
        <p class="muted">Départ : ${out.km.toLocaleString('fr-FR')} km, carburant ${out.fuel}/8. ${r.quote.kmIncluded == null ? 'Kilométrage illimité.' : `${r.quote.kmIncluded.toLocaleString('fr-FR')} km inclus, puis ${eur(r.quote.extraKm, true)} par km.`}</p>
        <div class="grid2"><label class="field"><span class="lbl">Kilométrage au retour</span><input class="input" name="km" type="number" value="${out.km + 320}"></label><label class="field"><span class="lbl">Carburant ou charge</span><select class="select" name="fuel">${fuelOpts(out.fuel)}</select></label></div>
        <label class="field"><span class="lbl">Nouveaux dommages : montant retenu sur la caution</span><input class="input" name="damages" type="number" min="0" step="1" value="0"><span class="hint">Plafonné à la franchise, soit ${eur(r.quote.franchise)}.</span></label>
        ${cleanTaken ? '<p class="muted">Option « retour sans lavage » souscrite : pas de frais de nettoyage.</p>' : `<label class="check"><input type="checkbox" name="cleaning"> Nettoyage nécessaire (${eur(s.cleaningFee)})</label>`}
        <label class="field"><span class="lbl">Remarques</span><textarea class="textarea" name="notes"></textarea></label>
        <div class="alert info" data-sum></div>
      </form>`,
      foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Clôturer la location</button>',
      onMount: (m, close) => {
        const f = $('[data-f]', m);
        const compute = () => {
          const km = Number(f.km.value) || out.km;
          const driven = Math.max(0, km - out.km);
          const extras = [];
          if (r.quote.kmIncluded != null && driven > r.quote.kmIncluded) extras.push({ label: `Kilomètres supplémentaires (${driven - r.quote.kmIncluded} km)`, amount: round2((driven - r.quote.kmIncluded) * r.quote.extraKm) });
          const miss = out.fuel - Number(f.fuel.value);
          if (miss > 0) extras.push({ label: `Carburant manquant (${miss}/8)`, amount: round2(miss * s.fuelEighth) });
          const dmg = Math.min(Math.max(0, Number(f.damages.value) || 0), r.quote.franchise);
          if (dmg > 0) extras.push({ label: 'Dommages constatés au retour', amount: dmg });
          if (!cleanTaken && f.cleaning?.checked) extras.push({ label: 'Nettoyage', amount: s.cleaningFee });
          return { km, driven, extras };
        };
        const draw = () => { const x = compute(); const t = round2(sum(x.extras, (e) => e.amount)); $('[data-sum]', m).innerHTML = `${icon('info')}<span>${x.driven.toLocaleString('fr-FR')} km parcourus. ${x.extras.length ? `À facturer : <b style="color:var(--text)">${eur(t, true)}</b> (${x.extras.map((e) => esc(e.label)).join(', ')}), prélevés sur la caution. Libération du reste de la caution.` : 'Rien à facturer : la caution est entièrement libérée.'}</span>`; };
        f.addEventListener('input', draw); f.addEventListener('change', draw); draw();
        $('[data-ok]', m).onclick = () => {
          const x = compute();
          if (x.km < out.km) { toast('Le kilométrage de retour est inférieur au départ.', 'warn'); return; }
          r.checkin = { km: x.km, fuel: Number(f.fuel.value), damages: Number(f.damages.value) || 0, cleaning: !!f.cleaning?.checked, notes: f.notes.value.trim(), extras: x.extras, at: toISO(new Date()) };
          const t = round2(sum(x.extras, (e) => e.amount));
          if (t > 0) r.payments.push({ id: uid('p'), amount: t, method: 'Prélevé sur la caution', at: toISO(new Date()) });
          r.status = 'terminee';
          v.odo = x.km;
          save(); close(); toast('Location clôturée. La facture est prête.', 'ok'); refreshAfter(r.id);
        };
      },
    });
  }
}

/* ---------- Nouvelle réservation (téléphone ou agence) ---------- */
function openQuickBooking({ vehicleId, date }) {
  const start = date ? firstSlot(date) : firstSlot(addDays(new Date(), 1));
  if (!date) start.setHours(10, 0, 0, 0);
  let end = addDays(start, 1);
  if (!openingFor(end)) end = addDays(end, 1);
  const st = { vehicleId: vehicleId || db.vehicles[0].id, from: toISO(start), to: toISO(end), agencyStart: 'yvrac', agencyEnd: 'yvrac', options: {}, customerId: '', paid: true };
  const custOpts = db.customers.slice().sort((a, b) => custName(a).localeCompare(custName(b))).map((c) => `<option value="${esc(c.id)}">${esc(custName(c))}</option>`).join('');
  openModal({
    title: 'Nouvelle réservation',
    wide: true,
    body: `<form data-f style="display:grid;gap:12px">
      <div class="grid2"><label class="field"><span class="lbl">Véhicule</span><select class="select" name="vehicleId">${db.vehicles.filter((v) => v.status === 'actif').map((v) => `<option value="${esc(v.id)}" ${v.id === st.vehicleId ? 'selected' : ''}>${esc(v.name)} · ${esc(v.plate)}</option>`).join('')}</select></label>
      <label class="field"><span class="lbl">Client</span><select class="select" name="customerId"><option value="">Nouveau client…</option>${custOpts}</select></label></div>
      <div class="grid3" data-newc><label class="field"><span class="lbl">Prénom et nom</span><input class="input" name="name" placeholder="Jean Dupont"></label><label class="field"><span class="lbl">Téléphone</span><input class="input" name="phone" type="tel"></label><label class="field"><span class="lbl">Email</span><input class="input" name="email" type="email"></label></div>
      <div class="grid2"><label class="field"><span class="lbl">Départ</span><input class="input" name="from" type="datetime-local" step="1800" value="${st.from}"></label><label class="field"><span class="lbl">Retour</span><input class="input" name="to" type="datetime-local" step="1800" value="${st.to}"></label></div>
      <div class="grid2"><label class="field"><span class="lbl">Lieu de départ</span><select class="select" name="agencyStart">${agencyOptions('yvrac')}</select></label><label class="field"><span class="lbl">Lieu de retour</span><select class="select" name="agencyEnd">${agencyOptions('yvrac')}</select></label></div>
      <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Options</span><div data-opts style="display:flex;flex-wrap:wrap;gap:8px"></div></div>
      <label class="check"><input type="checkbox" name="paid" checked> Paiement reçu (sinon la réservation reste en attente de paiement)</label>
      <div class="alert info" data-sum></div>
    </form>`,
    foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Créer la réservation</button>',
    onMount: (m, close) => {
      const f = $('[data-f]', m);
      const read = () => { st.vehicleId = f.vehicleId.value; st.from = f.from.value; st.to = f.to.value; st.agencyStart = f.agencyStart.value; st.agencyEnd = f.agencyEnd.value; st.customerId = f.customerId.value; st.paid = f.paid.checked; };
      const drawOpts = () => { const v = vehicle(st.vehicleId); $('[data-opts]', m).innerHTML = db.options.filter((o) => o.active && o.cats.includes(v.category) && !(o.unlimited && v.kmDay === 0)).map((o) => `<button type="button" class="chip ${st.options[o.id] ? 'on' : ''}" data-o="${esc(o.id)}">${esc(o.name)}</button>`).join(''); $$('[data-o]', m).forEach((b) => (b.onclick = () => { const o = option(b.dataset.o); if (st.options[o.id]) delete st.options[o.id]; else { st.options[o.id] = 1; if (o.excl) delete st.options[o.excl]; } drawOpts(); draw(); })); };
      const draw = () => {
        read();
        $('[data-newc]', m).hidden = !!st.customerId;
        const box = $('[data-sum]', m);
        if (!st.from || !st.to || parse(st.to) <= parse(st.from)) { box.innerHTML = `${icon('alert')}<span>Vérifiez les dates : le retour doit suivre le départ.</span>`; return; }
        const ok = isAvailable(st.vehicleId, st.from, st.to);
        const q = quote({ ...st, options: st.options });
        box.innerHTML = `${icon(ok ? 'info' : 'alert')}<span>${ok ? `${plural(q.days, 'jour')} · <b style="color:var(--text)">${eur(q.total, true)}</b> TTC · caution ${eur(q.deposit)}` : 'Ce véhicule n’est pas libre sur ces dates : il est déjà réservé ou en entretien.'}</span>`;
      };
      f.addEventListener('change', (e) => { if (e.target.name === 'vehicleId') { st.options = {}; read(); drawOpts(); } draw(); });
      f.addEventListener('input', draw);
      drawOpts(); draw();
      $('[data-ok]', m).onclick = () => {
        read();
        if (!st.from || !st.to || parse(st.to) <= parse(st.from)) { toast('Dates invalides.', 'warn'); return; }
        if (!isAvailable(st.vehicleId, st.from, st.to)) { toast('Véhicule indisponible sur ces dates.', 'warn'); return; }
        let cid = st.customerId;
        if (!cid) {
          const name = f.name.value.trim();
          if (!name || !f.phone.value.trim()) { toast('Indiquez au moins le nom et le téléphone du client.', 'warn'); return; }
          const [first, ...rest] = name.split(/\s+/);
          const c = { id: uid('c'), type: 'particulier', firstName: first, lastName: rest.join(' ') || '', email: f.email.value.trim().toLowerCase(), phone: f.phone.value.trim(), address: '', zip: '', city: '', birth: '', license: { number: '', date: '', country: 'France' }, createdAt: toISO(new Date()), account: false, blacklist: false, notes: 'Créé depuis le logiciel.' };
          db.customers.push(c); cid = c.id;
        }
        const res = { id: uid('r'), number: '', createdAt: toISO(new Date()), status: st.paid ? 'confirmee' : 'attente_paiement', vehicleId: st.vehicleId, customerId: cid, from: st.from, to: st.to, agencyStart: st.agencyStart, agencyEnd: st.agencyEnd, options: { ...st.options }, promo: null, youngDriver: false, channel: 'Téléphone', payments: [], checkout: null, checkin: null, notes: '' };
        res.quote = quoteFor(res);
        if (st.paid) res.payments.push({ id: uid('p'), amount: res.quote.total, method: 'Carte bancaire', at: toISO(new Date()) });
        db.seq++; res.number = resNumber(new Date(), db.seq);
        db.reservations.push(res);
        save(); close(); toast(`Réservation ${res.number} créée.`, 'ok'); rerender(true);
      };
    },
  });
}

/* ---------- Planning de la flotte ---------- */
function pagePlanning() {
  const days = window.innerWidth < 700 ? 14 : 21;
  if (!adm.planStart) adm.planStart = addDays(dayStart(new Date()), -1);
  const start = adm.planStart;
  const end = addDays(start, days);
  const col = window.innerWidth < 600 ? 40 : 48;
  const today = dayStart(new Date());
  let head = `<div class="plan-h"><div class="corner">Véhicule</div>`;
  for (let i = 0; i < days; i++) { const d = addDays(start, i); head += `<div class="d ${d.getDay() === 0 || d.getDay() === 6 ? 'we' : ''} ${sameDay(d, today) ? 'td' : ''}">${JOURS_C[d.getDay()].replace('.', '')}<b>${d.getDate()}</b></div>`; }
  head += '</div>';
  const groups = [['voiture', 'Voitures'], ['utilitaire', 'Utilitaires']];
  let body = '';
  const nowX = ((Date.now() - start.getTime()) / DAY) * col;
  for (const [cat, label] of groups) {
    const vs = db.vehicles.filter((v) => v.category === cat && v.status === 'actif');
    if (!vs.length) continue;
    body += `<div class="plan-group">${label}</div>`;
    for (const v of vs) {
      let cells = '';
      for (let i = 0; i < days; i++) { const d = addDays(start, i); cells += `<div class="cell ${d.getDay() === 0 || d.getDay() === 6 ? 'we' : ''}" data-cell="${esc(v.id)}|${dateKey(d)}"></div>`; }
      let bars = '';
      for (const r of db.reservations) {
        if (r.vehicleId !== v.id || !active(r)) continue;
        const a = parse(r.from), b = parse(r.to);
        if (b <= start || a >= end) continue;
        const x = ((Math.max(a, start) - start) / DAY) * col;
        const w = Math.max(20, ((Math.min(b, end) - Math.max(a, start)) / DAY) * col - 2);
        const c = customer(r.customerId);
        bars += `<div class="bar s-${r.status}" style="left:${x + 1}px;width:${w}px;--d:${Math.min(0.9, x / 900).toFixed(2)}s" data-res="${esc(r.id)}" title="${esc(r.number)} · ${esc(custName(c))} · ${esc(fmtDT(r.from))} au ${esc(fmtDT(r.to))}">${esc(c?.lastName || c?.company || '')}<small>${hm(a).replace(':', 'h')} → ${esc(fmtDay(r.to))}</small></div>`;
      }
      for (const bl of db.blocks) {
        if (bl.vehicleId !== v.id) continue;
        const a = parse(bl.from), b = parse(bl.to);
        if (b <= start || a >= end) continue;
        const x = ((Math.max(a, start) - start) / DAY) * col;
        const w = Math.max(20, ((Math.min(b, end) - Math.max(a, start)) / DAY) * col - 2);
        bars += `<div class="bar blk" style="left:${x + 1}px;width:${w}px" title="${esc(bl.reason)}">${icon('wrench').replace('<svg ', '<svg style="width:12px;height:12px;display:inline;vertical-align:-2px" ')} ${esc(bl.reason)}</div>`;
      }
      body += `<div class="plan-r"><div class="lab" data-veh="${esc(v.id)}" title="${esc(v.name)} · ${esc(v.plate)}">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><span>${esc(v.plate)}</span></div></div><div class="cells">${cells}${bars}${nowX > 0 && nowX < days * col ? `<div class="now-line" style="left:${nowX}px"></div>` : ''}</div></div>`;
    }
  }
  const content = `
    <div class="toolbar" style="justify-content:space-between">
      <div style="display:flex;gap:8px;align-items:center"><button class="btn btn-ghost btn-sm" data-shift="-7" aria-label="Semaine précédente">${icon('chevL')}</button><button class="btn btn-ghost btn-sm" data-today>Aujourd’hui</button><button class="btn btn-ghost btn-sm" data-shift="7" aria-label="Semaine suivante">${icon('chevR')}</button><b style="margin-left:6px">${esc(fmtDay(start))} au ${esc(fmtDay(addDays(end, -1)))}</b></div>
      <div class="legend"><span><i style="background:#f0b54e"></i>En attente de paiement</span><span><i style="background:#86a8ff"></i>Confirmée</span><span><i style="background:linear-gradient(135deg,#f6e7c2,#d9b878)"></i>En cours</span><span><i style="background:#4d5259"></i>Terminée</span><span><i style="background:repeating-linear-gradient(135deg,#1f2126 0 3px,#2a2d33 3px 6px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)"></i>Entretien</span></div>
    </div>
    <div class="plan" style="--col:${col}px"><div class="plan-grid">${head}${body}</div></div>
    <p class="muted" style="margin-top:10px;font-size:13px">Touchez une case vide pour créer une réservation, une barre pour ouvrir la fiche.</p>`;
  return adminPage('planning', 'Planning de la flotte', `${db.vehicles.filter((v) => v.status === 'actif').length} véhicules`, `<button class="btn btn-primary btn-sm" data-new>${icon('plus')}<span>Nouvelle réservation</span></button>`, content);
}
function mountPlanning() {
  bindResLinks();
  $$('[data-shift]').forEach((b) => (b.onclick = () => { adm.planStart = addDays(adm.planStart, Number(b.dataset.shift)); rerender(true); }));
  const t = $('[data-today]'); if (t) t.onclick = () => { adm.planStart = null; rerender(true); };
  $$('[data-cell]').forEach((c) => (c.onclick = () => { const [vid, d] = c.dataset.cell.split('|'); openQuickBooking({ vehicleId: vid, date: parse(d + 'T00:00') }); }));
  $$('[data-veh]').forEach((l) => (l.onclick = () => openVehicleEditor(l.dataset.veh)));
  const n = $('[data-new]'); if (n) n.onclick = () => openQuickBooking({});
  const plan = $('.plan');
  if (plan && !adm.planScrolled) { plan.scrollLeft = 0; }
}

/* ---------- Véhicules ---------- */
function pageFleet() {
  const cards = db.vehicles.filter((v) => !v.deleted).map((v) => { const st = vehicleState(v); return `<button class="fcard" data-veh="${esc(v.id)}">${vehicleVisual(v)}<div class="b"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><h3>${esc(v.name)}</h3><span class="badge ${st.cls}">${st.label}</span></div><div class="meta"><span class="plate">${esc(v.plate)}</span><span>${(v.odo || 0).toLocaleString('fr-FR')} km</span></div><div class="meta"><span>${esc(v.segment)}</span><b style="color:var(--text)">${eur(v.price)} / jour</b></div></div></button>`; }).join('');
  return adminPage('flotte', 'Véhicules', plural(db.vehicles.filter((v) => !v.deleted).length, 'véhicule'), `<button class="btn btn-primary btn-sm" data-add>${icon('plus')}<span>Ajouter un véhicule</span></button>`, `<div class="fleet">${cards}</div>`);
}
function mountFleet() {
  $$('[data-veh]').forEach((b) => (b.onclick = () => openVehicleEditor(b.dataset.veh)));
  const a = $('[data-add]'); if (a) a.onclick = () => openVehicleEditor(null);
}
function openVehicleEditor(id) {
  const isNew = !id;
  const v = isNew ? { id: uid('v'), name: '', category: 'voiture', segment: '', shape: 'citadine', color: '#8d949c', plate: '', seats: 5, doors: 5, gearbox: 'Manuelle', fuel: 'Essence', price: 50, kmDay: 250, extraKm: 0.3, deposit: 1000, franchise: 1200, odo: 0, status: 'actif', similar: true, ac: true, minAge: 21, minYears: 2, description: '', equipment: [], photo: null, photoUrl: null } : { ...vehicle(id) };
  const sel = (name, opts, cur) => `<select class="select" name="${name}">${opts.map(([k, l]) => `<option value="${esc(k)}" ${String(k) === String(cur) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  const inp = (name, label, val, attrs = '') => `<label class="field"><span class="lbl">${label}</span><input class="input" name="${name}" value="${esc(val ?? '')}" ${attrs}></label>`;
  const blocks = db.blocks.filter((b) => b.vehicleId === v.id);
  openModal({
    title: isNew ? 'Ajouter un véhicule' : v.name,
    wide: true,
    body: `<form data-f style="display:grid;gap:14px">
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px" class="veh-edit">
        <div><div data-visual>${vehicleVisual(v)}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><label class="btn btn-silver btn-sm" style="cursor:pointer">${icon('upload')}Changer la photo<input type="file" accept="image/*" data-file hidden></label>${v.photo ? '<button type="button" class="btn btn-ghost btn-sm" data-unphoto>Photo d’origine</button>' : ''}</div>
          <p class="muted" style="font-size:12.5px;margin-top:8px">Prenez la photo au téléphone, de trois quarts avant, sur fond dégagé. Elle est réduite automatiquement.</p>
        </div>
        <div style="display:grid;gap:12px">
          ${inp('name', 'Modèle', v.name, 'placeholder="Renault Clio V"')}
          <div class="grid2">${inp('plate', 'Immatriculation', v.plate, 'placeholder="AB-123-CD"')}${inp('segment', 'Catégorie affichée', v.segment, 'placeholder="Citadine"')}</div>
          <div class="grid2"><label class="field"><span class="lbl">Type</span>${sel('category', [['voiture', 'Voiture'], ['utilitaire', 'Utilitaire']], v.category)}</label><label class="field"><span class="lbl">État</span>${sel('status', [['actif', 'En service'], ['inactif', 'Hors service']], v.status)}</label></div>
        </div>
      </div>
      <div class="grid3">${inp('seats', 'Places', v.seats, 'type="number" min="1"')}${inp('doors', 'Portes', v.doors, 'type="number" min="2"')}<label class="field"><span class="lbl">Boîte</span>${sel('gearbox', [['Manuelle', 'Manuelle'], ['Automatique', 'Automatique']], v.gearbox)}</label></div>
      <div class="grid3"><label class="field"><span class="lbl">Énergie</span>${sel('fuel', [['Essence', 'Essence'], ['Diesel', 'Diesel'], ['Hybride', 'Hybride'], ['Électrique', 'Électrique']], v.fuel)}</label>${inp('volume', 'Volume utile (m³)', v.volume || '', 'type="number" step="0.1"')}${inp('payload', 'Charge utile (kg)', v.payload || '', 'type="number"')}</div>
      <div class="block-title" style="margin:6px 0 0">Tarif et conditions</div>
      <div class="grid3">${inp('price', 'Prix par jour (€ TTC)', v.price, 'type="number" min="1"')}${inp('kmDay', 'Km inclus par jour (0 = illimité)', v.kmDay, 'type="number" min="0"')}${inp('extraKm', 'Km supplémentaire (€)', v.extraKm, 'type="number" step="0.01" min="0"')}</div>
      <div class="grid3">${inp('deposit', 'Caution (€)', v.deposit, 'type="number" min="0"')}${inp('franchise', 'Franchise (€)', v.franchise, 'type="number" min="0"')}${inp('odo', 'Kilométrage actuel', v.odo, 'type="number" min="0"')}</div>
      <div class="grid3">${inp('minAge', 'Âge minimum', v.minAge, 'type="number" min="18"')}${inp('minYears', 'Années de permis minimum', v.minYears, 'type="number" min="0"')}${inp('nextService', 'Prochain entretien ou contrôle', v.nextService || '', 'type="date"')}</div>
      <label class="field"><span class="lbl">Description</span><textarea class="textarea" name="description">${esc(v.description)}</textarea></label>
      <label class="field"><span class="lbl">Équipements (un par ligne)</span><textarea class="textarea" name="equipment">${esc((v.equipment || []).join('\n'))}</textarea></label>
      ${isNew ? '' : `<div class="block-title" style="margin:6px 0 0">Indisponibilités (entretien, réparation)</div>
        <div data-blocks>${blocks.length ? blocks.map((b) => `<div class="list-row"><div><div class="t">${esc(b.reason)}</div><div class="s">${esc(fmtDT(b.from))} au ${esc(fmtDT(b.to))}</div></div><div class="r"><button type="button" class="btn btn-danger btn-sm" data-delblock="${esc(b.id)}">Supprimer</button></div></div>`).join('') : '<p class="muted">Aucune.</p>'}</div>
        <div class="grid3" style="align-items:end">${inp('bFrom', 'Du', '', 'type="datetime-local" step="1800"')}${inp('bTo', 'Au', '', 'type="datetime-local" step="1800"')}<button type="button" class="btn btn-ghost" data-addblock>${icon('wrench')}Bloquer</button></div>
        ${inp('bReason', 'Motif', 'Entretien')}`}
    </form>`,
    foot: `${isNew ? '' : '<button class="btn btn-danger" data-del style="margin-right:auto">Supprimer</button>'}<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Enregistrer</button>`,
    onMount: (m, close) => {
      if (window.innerWidth < 700) $('.veh-edit', m).style.gridTemplateColumns = '1fr';
      const f = $('[data-f]', m);
      $('[data-file]', m).onchange = async (e) => {
        try { v.photo = await readImage(e.target.files[0], 1100); $('[data-visual]', m).innerHTML = vehicleVisual(v); toast('Photo prête : pensez à enregistrer.'); } catch (err) { toast(err.message, 'warn'); }
      };
      const up = $('[data-unphoto]', m); if (up) up.onclick = () => { v.photo = null; $('[data-visual]', m).innerHTML = vehicleVisual(v); };
      const ab = $('[data-addblock]', m);
      if (ab) ab.onclick = () => {
        if (!f.bFrom.value || !f.bTo.value || parse(f.bTo.value) <= parse(f.bFrom.value)) { toast('Indiquez les deux dates de l’indisponibilité.', 'warn'); return; }
        const clash = db.reservations.find((r) => r.vehicleId === v.id && ['confirmee', 'attente_paiement', 'en_cours'].includes(r.status) && overlap(parse(f.bFrom.value), parse(f.bTo.value), parse(r.from), parse(r.to)));
        if (clash) { toast(`Conflit avec la réservation ${clash.number} : déplacez-la d’abord.`, 'warn'); return; }
        db.blocks.push({ id: uid('b'), vehicleId: v.id, from: f.bFrom.value, to: f.bTo.value, reason: f.bReason.value.trim() || 'Indisponible' });
        save(); close(); toast('Indisponibilité enregistrée.', 'ok'); rerender(true); openVehicleEditor(v.id);
      };
      $$('[data-delblock]', m).forEach((b) => (b.onclick = () => { db.blocks = db.blocks.filter((x) => x.id !== b.dataset.delblock); save(); close(); rerender(true); openVehicleEditor(v.id); }));
      const del = $('[data-del]', m);
      if (del) del.onclick = () => {
        const fut = db.reservations.filter((r) => r.vehicleId === v.id && ['confirmee', 'attente_paiement', 'en_cours'].includes(r.status));
        if (fut.length) { toast(`Impossible : ${plural(fut.length, 'réservation')} en cours ou à venir. Passez plutôt le véhicule hors service.`, 'warn'); return; }
        confirmBox('Supprimer le véhicule', `${esc(v.name)} (${esc(v.plate)}) sera retiré de la flotte. L’historique est conservé.`, 'Supprimer', () => { const orig = vehicle(v.id); orig.status = 'inactif'; orig.deleted = true; db.vehicles = db.vehicles.filter((x) => x.id !== v.id || db.reservations.some((r) => r.vehicleId === v.id)); save(); close(); toast('Véhicule retiré.', 'ok'); rerender(true); }, true);
      };
      $('[data-ok]', m).onclick = () => {
        const num = (n) => (f[n].value === '' ? null : Number(f[n].value));
        const upd = {
          name: f.name.value.trim(), plate: f.plate.value.trim().toUpperCase(), segment: f.segment.value.trim(), category: f.category.value, status: f.status.value,
          seats: num('seats') || 1, doors: num('doors') || 2, gearbox: f.gearbox.value, fuel: f.fuel.value, volume: num('volume'), payload: num('payload'),
          price: num('price') || 1, kmDay: num('kmDay') || 0, extraKm: num('extraKm') || 0, deposit: num('deposit') || 0, franchise: num('franchise') || 0, odo: num('odo') || 0,
          minAge: num('minAge') || 18, minYears: num('minYears') || 0, nextService: f.nextService.value || null,
          description: f.description.value.trim(), equipment: f.equipment.value.split('\n').map((x) => x.trim()).filter(Boolean), photo: v.photo || null,
        };
        if (!upd.name || !upd.plate) { toast('Le modèle et l’immatriculation sont obligatoires.', 'warn'); return; }
        if (isNew) {
          upd.shape = upd.category === 'utilitaire' ? 'fourgon' : 'citadine';
          db.vehicles.push({ ...v, ...upd });
        } else Object.assign(vehicle(v.id), upd);
        save(); close(); toast('Véhicule enregistré.', 'ok'); rerender(true);
      };
    },
  });
}

/* ---------- Clients ---------- */
function pageClients() {
  const q = adm.clientQuery.toLowerCase();
  const rows = db.customers.filter((c) => !q || [custName(c), c.email, c.phone, c.city].join(' ').toLowerCase().includes(q)).map((c) => {
    const rs = db.reservations.filter((r) => r.customerId === c.id && active(r));
    const tot = round2(sum(rs, (r) => paid(r)));
    return { c, n: rs.length, tot };
  }).sort((a, b) => b.tot - a.tot);
  const html = `<div class="toolbar"><input class="input" type="search" placeholder="Rechercher un client" value="${esc(adm.clientQuery)}" data-q></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Contact</th><th>Permis</th><th class="r">Locations</th><th class="r">Total réglé</th><th></th></tr></thead><tbody>
    ${rows.map(({ c, n, tot }) => `<tr data-client="${esc(c.id)}"><td><div style="display:flex;gap:10px;align-items:center"><span class="avatar">${esc(initials(custName(c)))}</span><div><b>${esc(custName(c))}</b><br><span class="muted" style="font-size:12.5px">${esc(c.type === 'professionnel' ? 'Professionnel' : 'Particulier')}${c.city ? ' · ' + esc(c.city) : ''}</span></div></div></td><td>${esc(c.phone)}<br><span class="muted" style="font-size:12.5px">${esc(c.email)}</span></td><td>${c.license?.date ? `depuis ${esc(fmtD(c.license.date + 'T00:00'))}` : '<span class="muted">à compléter</span>'}</td><td class="r num">${n}</td><td class="r num">${eur(tot)}</td><td>${c.blacklist ? '<span class="badge b-danger">Liste noire</span>' : ''}</td></tr>`).join('')}
    </tbody></table></div>`;
  return adminPage('clients', 'Clients', plural(db.customers.length, 'client'), `<button class="btn btn-ghost btn-sm" data-csv>${icon('download')}<span>Exporter</span></button>`, html);
}
function mountClients() {
  const q = $('[data-q]'); if (q) q.oninput = debounce(() => { adm.clientQuery = q.value; rerender(true); }, 250);
  $$('[data-client]').forEach((r) => (r.onclick = () => openClient(r.dataset.client)));
  const csv = $('[data-csv]');
  if (csv) csv.onclick = () => {
    const cell = (x) => `"${String(x ?? '').replace(/"/g, '""')}"`;
    const lines = [['Nom', 'Société', 'Email', 'Téléphone', 'Adresse', 'Code postal', 'Ville', 'Permis', 'Obtenu le', 'Locations', 'Total réglé'].map(cell).join(';')];
    for (const c of db.customers) { const rs = db.reservations.filter((r) => r.customerId === c.id && active(r)); lines.push([`${c.firstName} ${c.lastName}`, c.company || '', c.email, c.phone, c.address, c.zip, c.city, c.license?.number, c.license?.date, rs.length, String(round2(sum(rs, (r) => paid(r)))).replace('.', ',')].map(cell).join(';')); }
    downloadFile('clients.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
  };
}
function openClient(id) {
  const c = customer(id);
  const rs = db.reservations.filter((r) => r.customerId === c.id).sort((a, b) => (a.from < b.from ? 1 : -1));
  openModal({
    title: custName(c),
    wide: true,
    body: `<div class="grid2" style="align-items:start">
      <div>
        <div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div><div class="kv"><span>Email</span><b>${esc(c.email)}</b></div>
        <div class="kv"><span>Adresse</span><b>${esc([c.address, c.zip, c.city].filter(Boolean).join(', ')) || '<span class="muted">à compléter</span>'}</b></div>
        <div class="kv"><span>Né(e) le</span><b>${c.birth ? esc(fmtD(c.birth + 'T00:00')) : 'non renseigné'}</b></div>
        <div class="kv"><span>Permis</span><b>${esc(c.license?.number || 'non renseigné')}${c.license?.date ? `, ${esc(fmtD(c.license.date + 'T00:00'))}` : ''}</b></div>
        ${c.siret ? `<div class="kv"><span>SIRET</span><b>${esc(c.siret)}</b></div>` : ''}
        <label class="check" style="margin-top:12px"><input type="checkbox" data-bl ${c.blacklist ? 'checked' : ''}> Liste noire : refuser les réservations en ligne</label>
        <label class="field" style="margin-top:12px"><span class="lbl">Notes</span><textarea class="textarea" data-cn>${esc(c.notes || '')}</textarea></label>
      </div>
      <div><div class="block-title" style="margin-top:0">Historique (${rs.length})</div>${rs.map((r) => `<div class="list-row" data-res="${esc(r.id)}" style="cursor:pointer">${vehicleThumb(vehicle(r.vehicleId))}<div><div class="t">${esc(vehicle(r.vehicleId).name)}</div><div class="s">${esc(fmtD(r.from))} au ${esc(fmtD(r.to))} · ${eur(totalDue(r))}</div></div><div class="r">${statusBadge(r.status)}</div></div>`).join('') || '<p class="muted">Aucune location.</p>'}</div>
    </div>`,
    foot: `<button class="btn btn-ghost" data-close>Fermer</button><button class="btn btn-primary" data-book>${icon('plus')}Nouvelle réservation</button>`,
    onMount: (m, close) => {
      $('[data-bl]', m).onchange = (e) => { c.blacklist = e.target.checked; save(); toast(c.blacklist ? 'Client ajouté à la liste noire.' : 'Client retiré de la liste noire.'); rerender(true); };
      $('[data-cn]', m).onchange = (e) => { c.notes = e.target.value; save(); toast('Note enregistrée.'); };
      $$('[data-res]', m).forEach((el) => (el.onclick = () => { close(); openResDrawer(el.dataset.res); }));
      $('[data-book]', m).onclick = () => { close(); openQuickBooking({}); setTimeout(() => { const s = $('.overlay [name="customerId"]'); if (s) { s.value = c.id; s.dispatchEvent(new Event('change', { bubbles: true })); } }, 60); };
    },
  });
}

/* ---------- Options et tarifs ---------- */
function pageTarifs() {
  const s = db.settings;
  const content = `
    <div class="panel"><div class="p-hd"><h2>Tarifs des véhicules</h2><div class="actions"><span class="muted" style="font-size:13px">Modifiez une case, c’est enregistré.</span></div></div><div class="p-bd" style="overflow:auto">
      <table class="tbl"><thead><tr><th>Véhicule</th><th class="r">Prix / jour</th><th class="r">Km inclus / jour</th><th class="r">Km sup.</th><th class="r">Caution</th><th class="r">Franchise</th></tr></thead><tbody>
      ${db.vehicles.filter((v) => !v.deleted).map((v) => `<tr style="cursor:default"><td><div style="display:flex;gap:10px;align-items:center">${vehicleThumb(v)}<b>${esc(v.name)}</b></div></td>${[['price', 1], ['kmDay', 1], ['extraKm', 0.01], ['deposit', 1], ['franchise', 1]].map(([k, st]) => `<td class="r"><input class="input num" style="width:100px;min-height:38px;text-align:right" type="number" step="${st}" min="0" value="${v[k]}" data-vp="${esc(v.id)}|${k}"></td>`).join('')}</tr>`).join('')}
      </tbody></table><p class="muted" style="font-size:12.5px;margin-top:8px">0 km inclus = kilométrage illimité. Les réservations déjà faites gardent leur prix.</p></div></div>
    <div class="dash-grid">
      <div class="panel"><div class="p-hd"><h2>Options proposées au client</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-addopt>${icon('plus')}Ajouter</button></div></div><div class="p-bd">
        ${db.options.map((o) => `<div class="list-row"><div class="avatar" style="border-radius:12px">${icon(o.icon || 'plus').replace('<svg ', '<svg style="width:18px;height:18px" ')}</div><div><div class="t">${esc(o.name)}</div><div class="s">${eur(o.price)} ${o.unit === 'jour' ? 'par jour' : 'par location'}${o.max ? `, ${eur(o.max)} max` : ''} · ${o.cats.map((c) => (c === 'voiture' ? 'voitures' : 'utilitaires')).join(' et ')}</div></div><div class="r"><label class="check"><input type="checkbox" data-optact="${esc(o.id)}" ${o.active ? 'checked' : ''}>Active</label><button class="icon-btn" data-optedit="${esc(o.id)}" aria-label="Modifier">${icon('edit')}</button></div></div>`).join('')}
      </div></div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="panel"><div class="p-hd"><h2>Tarif dégressif</h2></div><div class="p-bd">
          ${s.degressive.map((d, i) => `<div class="grid2" style="margin-bottom:8px;align-items:end"><label class="field"><span class="lbl">À partir de (jours)</span><input class="input" type="number" min="2" value="${d.days}" data-deg="${i}|days"></label><label class="field"><span class="lbl">Remise (%)</span><input class="input" type="number" min="0" max="80" value="${d.pct}" data-deg="${i}|pct"></label></div>`).join('')}
        </div></div>
        <div class="panel"><div class="p-hd"><h2>Codes promo</h2><div class="actions"><button class="btn btn-ghost btn-sm" data-addpromo>${icon('plus')}Ajouter</button></div></div><div class="p-bd">
          ${db.promos.map((p, i) => `<div class="list-row"><div><div class="t">${esc(p.code)} · ${p.pct} %</div><div class="s">${esc(p.note || '')}</div></div><div class="r"><label class="check"><input type="checkbox" data-pact="${i}" ${p.active ? 'checked' : ''}>Actif</label><button class="icon-btn" data-pdel="${i}" aria-label="Supprimer">${icon('trash')}</button></div></div>`).join('')}
        </div></div>
        <div class="panel"><div class="p-hd"><h2>Lieux de départ et de retour</h2></div><div class="p-bd">
          ${db.agencies.map((a) => `<div class="list-row"><div><div class="t">${esc(a.name)}</div><div class="s">${esc(a.address)}</div></div><div class="r"><input class="input num" style="width:96px;min-height:38px;text-align:right" type="number" min="0" value="${a.fee}" data-afee="${esc(a.id)}" aria-label="Frais"> €</div></div>`).join('')}
        </div></div>
      </div>
    </div>`;
  return adminPage('tarifs', 'Options et tarifs', 'Prix, options, remises', '', content);
}
function mountTarifs() {
  $$('[data-vp]').forEach((i) => (i.onchange = () => { const [id, k] = i.dataset.vp.split('|'); vehicle(id)[k] = Number(i.value) || 0; save(); toast('Tarif enregistré.'); }));
  $$('[data-deg]').forEach((i) => (i.onchange = () => { const [n, k] = i.dataset.deg.split('|'); db.settings.degressive[n][k] = Number(i.value) || 0; db.settings.degressive.sort((a, b) => a.days - b.days); save(); toast('Remise enregistrée.'); }));
  $$('[data-afee]').forEach((i) => (i.onchange = () => { agency(i.dataset.afee).fee = Number(i.value) || 0; save(); toast('Frais enregistrés.'); }));
  $$('[data-optact]').forEach((i) => (i.onchange = () => { option(i.dataset.optact).active = i.checked; save(); }));
  $$('[data-pact]').forEach((i) => (i.onchange = () => { db.promos[i.dataset.pact].active = i.checked; save(); }));
  $$('[data-pdel]').forEach((b) => (b.onclick = () => { db.promos.splice(Number(b.dataset.pdel), 1); save(); rerender(true); }));
  const ap = $('[data-addpromo]');
  if (ap) ap.onclick = () => openModal({
    title: 'Nouveau code promo',
    body: `<form data-f style="display:grid;gap:12px"><label class="field"><span class="lbl">Code</span><input class="input" name="code" placeholder="ETE2026"></label><label class="field"><span class="lbl">Remise (%)</span><input class="input" name="pct" type="number" min="1" max="80" value="10"></label><label class="field"><span class="lbl">Note interne</span><input class="input" name="note"></label></form>`,
    foot: '<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Créer</button>',
    onMount: (m, close) => { $('[data-ok]', m).onclick = () => { const f = $('[data-f]', m); const code = f.code.value.trim().toUpperCase().replace(/\s+/g, ''); if (!code || db.promos.some((p) => p.code === code)) { toast('Code vide ou déjà existant.', 'warn'); return; } db.promos.push({ code, pct: Number(f.pct.value) || 10, active: true, note: f.note.value.trim() }); save(); close(); rerender(true); }; },
  });
  const edit = (o) => {
    const isNew = !o;
    const x = o || { id: uid('o'), name: '', desc: '', price: 5, unit: 'jour', max: null, maxQty: 1, cats: ['voiture', 'utilitaire'], active: true, icon: 'plus' };
    openModal({
      title: isNew ? 'Nouvelle option' : x.name,
      body: `<form data-f style="display:grid;gap:12px">
        <label class="field"><span class="lbl">Nom</span><input class="input" name="name" value="${esc(x.name)}"></label>
        <label class="field"><span class="lbl">Description affichée au client</span><textarea class="textarea" name="desc">${esc(x.desc)}</textarea></label>
        <div class="grid3"><label class="field"><span class="lbl">Prix (€)</span><input class="input" name="price" type="number" min="0" step="0.5" value="${x.price}"></label><label class="field"><span class="lbl">Facturé</span><select class="select" name="unit"><option value="jour" ${x.unit === 'jour' ? 'selected' : ''}>par jour</option><option value="forfait" ${x.unit === 'forfait' ? 'selected' : ''}>par location</option></select></label><label class="field"><span class="lbl">Plafond (€)</span><input class="input" name="max" type="number" min="0" value="${x.max ?? ''}"></label></div>
        <div style="display:flex;gap:16px"><label class="check"><input type="checkbox" name="car" ${x.cats.includes('voiture') ? 'checked' : ''}> Voitures</label><label class="check"><input type="checkbox" name="van" ${x.cats.includes('utilitaire') ? 'checked' : ''}> Utilitaires</label></div>
      </form>`,
      foot: `${isNew ? '' : '<button class="btn btn-danger" data-del style="margin-right:auto">Supprimer</button>'}<button class="btn btn-ghost" data-close>Annuler</button><button class="btn btn-primary" data-ok>Enregistrer</button>`,
      onMount: (m, close) => {
        const f = $('[data-f]', m);
        const d = $('[data-del]', m); if (d) d.onclick = () => { db.options = db.options.filter((y) => y.id !== x.id); save(); close(); rerender(true); };
        $('[data-ok]', m).onclick = () => {
          const cats = [f.car.checked && 'voiture', f.van.checked && 'utilitaire'].filter(Boolean);
          if (!f.name.value.trim() || !cats.length) { toast('Nom et type de véhicule obligatoires.', 'warn'); return; }
          Object.assign(x, { name: f.name.value.trim(), desc: f.desc.value.trim(), price: Number(f.price.value) || 0, unit: f.unit.value, max: f.max.value === '' ? null : Number(f.max.value), cats });
          if (isNew) db.options.push(x);
          save(); close(); rerender(true);
        };
      },
    });
  };
  const ao = $('[data-addopt]'); if (ao) ao.onclick = () => edit(null);
  $$('[data-optedit]').forEach((b) => (b.onclick = () => edit(option(b.dataset.optedit))));
}

/* ---------- Paramètres ---------- */
const ACCENTS = [['#d9b878', 'Or champagne'], ['#c9ccd1', 'Argent'], ['#cadae9', 'Reflet bleuté'], ['#e6cfdc', 'Reflet rosé'], ['#f3f2ef', 'Blanc nacré']];
function pageSettings() {
  const s = db.settings;
  const inp = (name, label, val, attrs = '') => `<label class="field"><span class="lbl">${label}</span><input class="input" name="${name}" value="${esc(val ?? '')}" ${attrs}></label>`;
  const day = (d) => { const h = s.hours[d]; return `<b>${JOURS[d][0].toUpperCase() + JOURS[d].slice(1)}</b><input class="input" type="time" step="1800" data-h="${d}|open" value="${h ? h.open : '09:00'}" ${h ? '' : 'disabled'}><input class="input" type="time" step="1800" data-h="${d}|close" value="${h ? h.close : '18:00'}" ${h ? '' : 'disabled'}><label class="check cl"><input type="checkbox" data-closed="${d}" ${h ? '' : 'checked'}> Fermé</label>`; };
  const content = `
    <div class="dash-grid" style="margin-top:0">
      <div class="panel"><div class="p-hd"><h2>Identité</h2></div><div class="p-bd"><form data-id style="display:grid;gap:12px">
        <div class="grid2">${inp('brand', 'Nom affiché', s.brand)}${inp('tagline', 'Signature', s.tagline)}</div>
        <div class="grid2">${inp('legalName', 'Raison sociale', s.legalName)}${inp('legalForm', 'Forme et capital', s.legalForm)}</div>
        <div class="grid2">${inp('siren', 'SIREN', s.siren)}${inp('rcs', 'Greffe', s.rcs)}</div>
        ${inp('address', 'Adresse', s.address)}
        <div class="grid2">${inp('zip', 'Code postal', s.zip)}${inp('city', 'Ville', s.city)}</div>
        <div class="grid2">${inp('phone', 'Téléphone', s.phone)}${inp('email', 'Email', s.email, 'type="email" placeholder="contact@votre-domaine.fr"')}</div>
        <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Couleur d’accent</span><div class="swatches">${ACCENTS.map(([c, l]) => `<button type="button" class="swatch ${s.accent === c ? 'on' : ''}" style="background:${c}" data-accent="${c}" title="${l}" aria-label="${l}"></button>`).join('')}<label class="swatch" style="display:grid;place-items:center;cursor:pointer;background:var(--surface-2)" title="Autre couleur">${icon('plus').replace('<svg ', '<svg style="width:16px;height:16px" ')}<input type="color" data-accent-custom value="${esc(s.accent)}" style="position:absolute;opacity:0;width:0;height:0"></label></div></div>
        <div><span class="lbl" style="display:block;font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">Logo</span><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${logoMark('logo-mark')}<label class="btn btn-ghost btn-sm" style="cursor:pointer">${icon('upload')}Remplacer<input type="file" accept="image/*" data-logo hidden></label>${s.logo ? '<button type="button" class="btn btn-ghost btn-sm" data-unlogo>Logo PRISMA d’origine</button>' : ''}</div></div>
        <button class="btn btn-primary" type="submit" style="justify-self:start">Enregistrer l’identité</button>
      </form></div></div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="panel"><div class="p-hd"><h2>Horaires d’ouverture</h2></div><div class="p-bd"><div class="hours-tbl">${[1, 2, 3, 4, 5, 6, 0].map(day).join('')}</div></div></div>
        <div class="panel"><div class="p-hd"><h2>Règles de location</h2></div><div class="p-bd"><form data-rules style="display:grid;gap:12px">
          <div class="grid3">${inp('minAge', 'Âge minimum', s.minAge, 'type="number" min="18"')}${inp('youngYears', 'Jeune conducteur si permis de moins de (ans)', s.youngYears, 'type="number" min="0"')}${inp('youngFee', 'Supplément par jour (€)', s.youngFee, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('youngFeeMax', 'Plafond du supplément (€)', s.youngFeeMax, 'type="number" min="0"')}${inp('youngDeposit', 'Caution en plus (€)', s.youngDeposit, 'type="number" min="0"')}${inp('prepHours', 'Préparation entre deux locations (h)', s.prepHours, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('leadHours', 'Délai minimum avant départ (h)', s.leadHours, 'type="number" min="0"')}${inp('freeCancelHours', 'Annulation gratuite jusqu’à (h avant)', s.freeCancelHours, 'type="number" min="0"')}${inp('installmentsMin', 'Paiement en plusieurs fois dès (€)', s.installmentsMin, 'type="number" min="0"')}</div>
          <div class="grid3">${inp('fuelEighth', 'Carburant manquant, par huitième (€)', s.fuelEighth, 'type="number" min="0"')}${inp('cleaningFee', 'Forfait nettoyage (€)', s.cleaningFee, 'type="number" min="0"')}${inp('vat', 'TVA (%)', s.vat, 'type="number" min="0"')}</div>
          <button class="btn btn-primary" type="submit" style="justify-self:start">Enregistrer les règles</button>
        </form></div></div>
      </div>
    </div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Conditions générales de location</h2></div><div class="p-bd"><textarea class="textarea" style="min-height:220px" data-cgv>${esc(s.cgv)}</textarea><button class="btn btn-primary btn-sm" style="margin-top:10px" data-savecgv>Enregistrer les conditions</button></div></div>
    <div class="panel" style="margin-top:16px"><div class="p-hd"><h2>Démonstration</h2></div><div class="p-bd" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"><button class="btn btn-ghost btn-sm" data-export>${icon('download')}Exporter les données</button><button class="btn btn-danger btn-sm" data-reset>${icon('refresh')}Réinitialiser la démonstration</button><span class="muted" style="font-size:13px">Les données restent dans ce navigateur. En production, elles sont hébergées sur un serveur sécurisé, avec sauvegardes.</span></div></div>`;
  return adminPage('parametres', 'Paramètres', 'Identité, horaires, règles', '', content);
}
function mountSettings() {
  const s = db.settings;
  const fid = $('[data-id]');
  if (fid) fid.onsubmit = (e) => { e.preventDefault(); for (const k of ['brand', 'tagline', 'legalName', 'legalForm', 'siren', 'rcs', 'address', 'zip', 'city', 'phone', 'email']) s[k] = fid[k].value.trim(); save(); applyTheme(); toast('Identité enregistrée.', 'ok'); rerender(true); };
  $$('[data-accent]').forEach((b) => (b.onclick = () => { s.accent = b.dataset.accent; save(); applyTheme(); rerender(true); }));
  const cc = $('[data-accent-custom]'); if (cc) cc.onchange = () => { s.accent = cc.value; save(); applyTheme(); rerender(true); };
  const lg = $('[data-logo]'); if (lg) lg.onchange = async (e) => { try { s.logo = await readImage(e.target.files[0], 400); save(); rerender(true); toast('Logo remplacé.', 'ok'); } catch (err) { toast(err.message, 'warn'); } };
  const ul = $('[data-unlogo]'); if (ul) ul.onclick = () => { s.logo = null; save(); rerender(true); };
  $$('[data-closed]').forEach((c) => (c.onchange = () => { const d = c.dataset.closed; s.hours[d] = c.checked ? null : { open: '09:00', close: '18:00' }; save(); rerender(true); }));
  $$('[data-h]').forEach((i) => (i.onchange = () => {
    const [d, k] = i.dataset.h.split('|');
    if (!s.hours[d] || !i.value) return;
    const [hh, mm] = i.value.split(':').map(Number);
    const next = { ...s.hours[d], [k]: `${pad(hh)}:${mm < 30 ? '00' : '30'}` };
    if (next.open >= next.close) { toast('L’ouverture doit précéder la fermeture.', 'warn'); i.value = s.hours[d][k]; return; }
    s.hours[d] = next; save(); toast('Horaires enregistrés.');
  }));
  const fr = $('[data-rules]'); if (fr) fr.onsubmit = (e) => { e.preventDefault(); for (const k of ['minAge', 'youngYears', 'youngFee', 'youngFeeMax', 'youngDeposit', 'prepHours', 'leadHours', 'freeCancelHours', 'installmentsMin', 'fuelEighth', 'cleaningFee', 'vat']) s[k] = Number(fr[k].value) || 0; save(); toast('Règles enregistrées.', 'ok'); };
  const cg = $('[data-savecgv]'); if (cg) cg.onclick = () => { s.cgv = $('[data-cgv]').value; save(); toast('Conditions enregistrées.', 'ok'); };
  const ex = $('[data-export]'); if (ex) ex.onclick = () => downloadFile('prisma-donnees.json', JSON.stringify(db, null, 2), 'application/json');
}
