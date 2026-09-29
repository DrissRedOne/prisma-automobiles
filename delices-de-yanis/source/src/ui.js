/* =====================================================================
   COMPOSANTS : typographie, photos, étiquettes, fiches produit,
   fenêtres (bas d'écran sur téléphone), messages, en-tête, pied de page.
   ===================================================================== */
/** Typographie française : espaces insécables avant : ; ? ! et dans les guillemets. */
const fr = (s) => String(s).replace(/ ([:;?!])/g, ' $1').replace(/« /g, '« ').replace(/ »/g, ' »');
const PHOTO_SET = new Set(window.YANIS_PHOTOS || []);
/** Photo d'un plat en WebP (deux tailles), sinon une vignette dessinée. */
function photo(id, { size = 640, cls = '', alt = '', eager = false } = {}) {
  if (!PHOTO_SET.has(id)) return `<span class="ph-none ${cls}" aria-hidden="true">${icon(id.startsWith('pizza') ? 'flame' : 'bag')}</span>`;
  const big = size > 700;
  return `<img class="${cls}" src="/img/${id}-${big ? 1200 : 640}.webp" srcset="/img/${id}-640.webp 640w, /img/${id}-1200.webp 1200w" sizes="${big ? '(max-width: 700px) 100vw, 900px' : '(max-width: 700px) 45vw, 360px'}" alt="${esc(alt)}" width="${big ? 1200 : 640}" height="${big ? 900 : 480}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
const tagHTML = (t) => (TAGS[t] ? `<span class="tag ${TAGS[t][1]}">${t === 'spicy' ? icon('flame') : t === 'veggie' ? icon('leaf') : t === 'best' ? icon('star') : ''}${esc(TAGS[t][0])}</span>` : '');
const fromPrice = (p) => (p.options.some((g) => group(g).type === 'one' && group(g).items.some((x) => x[2] > 0)) ? 'dès ' : '');

/** Fiche produit : ligne (téléphone) ou carte (ordinateur), selon la mise en page du parent. */
function productCard(p) {
  const off = !p.available;
  return `<article class="pcard ${off ? 'off' : ''}" data-p="${esc(p.id)}">
    <button type="button" class="pcard-hit" data-open="${esc(p.id)}" ${off ? 'disabled' : ''} aria-label="${esc(p.name)}, ${esc(eur(p.price))}"></button>
    <div class="pcard-img">${photo(p.id, { alt: p.name })}${p.tags.includes('best') ? '<span class="pcard-best">' + icon('star') + 'Top</span>' : ''}</div>
    <div class="pcard-body">
      <h3>${esc(p.name)}</h3>
      <p class="pcard-desc">${esc(fr(p.desc))}</p>
      <div class="pcard-foot"><b class="price">${fromPrice(p)}${esc(eur(p.price))}</b><span class="pcard-tags">${p.tags.filter((t) => ['halal', 'veggie', 'spicy'].includes(t)).map(tagHTML).join('')}</span></div>
    </div>
    <span class="pcard-add" aria-hidden="true">${off ? 'Épuisé' : icon('plus')}</span>
  </article>`;
}

/* ---------- Fenêtres ---------- */
const OPEN = new Set();
function openSheet({ title = '', body = '', foot = '', cls = '', onMount, onClose, side = false }) {
  const el = document.createElement('div');
  el.className = `sheet-wrap ${side ? 'side' : ''} ${cls}`;
  el.innerHTML = `<div class="sheet-ov" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title || 'Fenêtre')}">
    ${title ? `<div class="sheet-hd"><h2>${esc(title)}</h2><button type="button" class="icon-btn" data-close aria-label="Fermer">${icon('x')}</button></div>` : `<button type="button" class="icon-btn sheet-x" data-close aria-label="Fermer">${icon('x')}</button>`}
    <div class="sheet-bd">${body}</div>${foot ? `<div class="sheet-ft">${foot}</div>` : ''}</div>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('locked');
  const back = document.activeElement;
  requestAnimationFrame(() => {
    el.classList.add('open');
    // le clavier et les lecteurs d'écran passent dans la fenêtre
    const sh = $('.sheet', el); sh.tabIndex = -1;
    if (!el.contains(document.activeElement)) sh.focus({ preventScroll: true });
  });
  const close = () => {
    if (!OPEN.has(close)) return;
    OPEN.delete(close);
    el.classList.remove('open');
    if (!OPEN.size) document.documentElement.classList.remove('locked');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => el.remove(), 320);
    if (back && back.isConnected && typeof back.focus === 'function') try { back.focus({ preventScroll: true }); } catch (e) { /* rien */ }
    if (onClose) onClose();
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  el.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
  OPEN.add(close);
  if (onMount) onMount(el, close);
  return close;
}
const closeAll = () => [...OPEN].forEach((c) => c());

function toast(msg, kind = '') {
  let box = $('.toasts');
  if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast ' + kind;
  t.innerHTML = `${icon(kind === 'ok' ? 'check' : kind === 'warn' ? 'alert' : 'info')}<span>${esc(msg)}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---------- En-tête et pied de page ---------- */
function statusPill() {
  const now = new Date();
  if (pausedNow()) return `<span class="st-pill paused"><i></i>Commandes en pause</span>`;
  if (isOpenAt(now)) { const c = closingToday(now); return `<span class="st-pill open"><i></i>Ouvert${c ? `, jusqu’à ${hm(c)}` : ''}</span>`; }
  const n = nextOpening(now);
  return `<span class="st-pill closed"><i></i>Fermé${n ? `, ouvre ${sameDay(n, now) ? 'à' : dayLabel(n) + ' à'} ${hm(n)}` : ''}</span>`;
}
function siteHeader(active = '') {
  const n = cartCount();
  return `<header class="hd"><div class="wrap hd-in">
    ${logoHTML()}
    <nav class="hd-nav" aria-label="Navigation principale">
      <a href="/carte" class="${active === 'carte' ? 'on' : ''}">La carte</a>
      <a href="/livraison-bordeaux" class="${active === 'livraison' ? 'on' : ''}">Livraison</a>
      <a href="/infos" class="${active === 'infos' ? 'on' : ''}">Infos et horaires</a>
      <a href="/commandes" class="${active === 'commandes' ? 'on' : ''}">Mes commandes</a>
    </nav>
    <div class="hd-act">
      ${statusPill()}
      <button type="button" class="hd-cart" data-cart aria-label="Voir le panier">${icon('bag')}<span class="hd-cart-n" ${n ? '' : 'hidden'}>${n}</span><span class="hd-cart-t">${n ? esc(eur(totals().sub)) : 'Panier'}</span></button>
      <button type="button" class="icon-btn hd-menu" data-menu aria-label="Menu">${icon('menu')}</button>
    </div>
  </div></header>`;
}
function siteFooter() {
  const s = S();
  return `<footer class="ft"><div class="wrap ft-in">
    <div class="ft-brand">${logoHTML(true)}<p>${esc(fr(s.tagline))}. À emporter ou livré, depuis ${s.since}.</p>
      <a class="btn btn-primary" href="/carte">${icon('bag')}Commander</a></div>
    <div><p class="ft-h">Nous trouver</p><p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p><a class="ft-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a>${s.phone ? `<a class="ft-link" href="tel:${esc(s.phone.replace(/\s/g, ''))}">${icon('phone')}${esc(s.phone)}</a>` : ''}</div>
    <div><p class="ft-h">Horaires</p><ul class="ft-hours">${hoursGroups().map(([d, h]) => `<li><span>${esc(d)}</span><span>${esc(h)}</span></li>`).join('')}</ul></div>
    <div><p class="ft-h">Commander</p><a href="/carte">La carte</a><a href="/pizza-bordeaux">Pizzas à emporter</a><a href="/tacos-bordeaux">Tacos</a><a href="/livraison-bordeaux">Livraison à Bordeaux</a><a href="/halal-bordeaux">Cuisine halal</a><a href="/commandes">Mes commandes</a></div>
  </div>
  <div class="wrap ft-bot"><span>© ${new Date().getFullYear()} ${esc(s.name)}. ${esc(s.legalForm)} ${esc(s.legalName)}, ${esc(s.siren)} ${esc(s.rcs)}.</span><span class="ft-bot-l"><a href="#" data-doc="mentions">Mentions légales</a><a href="#" data-doc="allergenes">Allergènes</a><a href="#" data-doc="credits">Crédits photos</a><a href="/cuisine">Espace restaurant</a><a href="#" data-install hidden>Installer l’application</a></span></div>
  <p class="wrap ft-demo">Site de démonstration réalisé par Groupe Amane Conseils : les commandes ne sont pas transmises au restaurant.</p>
  </footer>`;
}
function page(inner, { active = '', footer = true, bar = true } = {}) {
  const n = cartCount();
  return siteHeader(active) + `<main id="main">${inner}</main>` + (footer ? siteFooter() : '')
    + (bar && n ? `<button type="button" class="cartbar" data-cart><span class="cartbar-n">${n}</span><span>Voir le panier</span><b>${esc(eur(totals().sub))}</b></button>` : '');
}
/** Met à jour l'en-tête et la barre du panier sans redessiner la page. */
function refreshCartUI() {
  const n = cartCount();
  $$('.hd-cart-n').forEach((e) => { e.hidden = !n; e.textContent = n; });
  $$('.hd-cart-t').forEach((e) => { e.textContent = n ? eur(totals().sub) : 'Panier'; });
  let bar = $('.cartbar');
  if (!n) { if (bar) bar.remove(); return; }
  if (!bar && $('#main') && !/^\/(commande|suivi|cuisine)/.test(curPath())) {
    bar = document.createElement('button'); bar.type = 'button'; bar.className = 'cartbar'; bar.dataset.cart = ''; document.body.appendChild(bar);
  }
  if (bar) bar.innerHTML = `<span class="cartbar-n">${n}</span><span>Voir le panier</span><b>${esc(eur(totals().sub))}</b>`;
  const b = $('.hd-cart'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  // le mode (à emporter ou livraison) choisi dans le panier se retrouve partout dans la page
  $$('[data-mode]').forEach((x) => { const on = x.dataset.mode === cart.mode; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
  $$('[data-zipbox]').forEach((z) => { z.hidden = cart.mode !== 'livraison'; });
  if (typeof renderCartPanel === 'function') renderCartPanel();
}
function openMenu() {
  openSheet({ cls: 'menu-sheet', side: true, title: 'Menu', body: `<nav class="mm">
    <a href="/">${icon('home')}Accueil</a><a href="/carte">${icon('grid')}La carte</a><a href="/livraison-bordeaux">${icon('bike')}Livraison à Bordeaux</a><a href="/infos">${icon('clock')}Infos et horaires</a><a href="/commandes">${icon('list')}Mes commandes</a>
    <p class="mm-h">Nos spécialités</p><a href="/pizza-bordeaux">Pizzas à emporter</a><a href="/tacos-bordeaux">French tacos</a><a href="/halal-bordeaux">Cuisine halal</a>
    <p class="mm-h">Restaurant</p><a href="/cuisine">${icon('chef')}Espace restaurant</a>
    <button type="button" class="mm-install" data-install hidden>${icon('download')}<span><b>Installer l’application</b><small>Commandez depuis l’écran d’accueil</small></span></button></nav>`,
    onMount: (el, close) => { el.addEventListener('click', (e) => { if (e.target.closest('a[href],[data-install]')) close(); }); if (typeof updateInstallUI === 'function') updateInstallUI(); } });
}
function openDoc(kind) {
  const s = S();
  if (kind === 'mentions') openSheet({ title: 'Mentions légales', body: `<div class="doc"><p><b>${esc(s.legalName)}</b>, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}.</p><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}.</p><p>Site de démonstration réalisé par Groupe Amane Conseils (72 bis avenue des Tabernottes, 33370 Yvrac). Hébergement : Vercel Inc.</p><p>Les données saisies restent dans votre navigateur : aucune commande n’est transmise au restaurant et aucun paiement n’est débité.</p></div>` });
  if (kind === 'allergenes') openSheet({ title: 'Allergènes', body: `<div class="doc"><p>Nos plats peuvent contenir : gluten, lait, œufs, moutarde, sésame, fruits à coque, céleri, soja.</p><p>Une allergie ou une intolérance ? Indiquez-la dans la précision de votre commande et demandez conseil à l’équipe au comptoir.</p><p>Viandes halal : volaille, bœuf et agneau certifiés halal. Aucune viande de porc.</p></div>` });
  if (kind === 'credits') {
    const list = (window.YANIS_CREDITS || []).map((c) => `<li><b>${esc(c.titre || c.id)}</b><span>${esc(c.auteur || 'Auteur indiqué sur la page source')} · ${esc(c.licence)}${c.source ? ` · <a class="link" href="${esc(c.source)}" target="_blank" rel="noopener">source</a>` : ''}</span></li>`).join('');
    openSheet({ title: 'Crédits photos', body: `<div class="doc"><p>Photos d’illustration libres de droits (licences Creative Commons ou domaine public), recadrées. Elles seront remplacées par les photos des plats du restaurant.</p><ul class="credits">${list}</ul></div>` });
  }
}
