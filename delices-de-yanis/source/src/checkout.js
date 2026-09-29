/* =====================================================================
   PANIER, COMMANDE ET SUIVI
   ===================================================================== */
function cartLinesHTML(editable = true) {
  return cart.lines.map((l) => {
    const p = product(l.productId);
    if (!p) return '';
    const detail = choiceText(p, l.choice);
    return `<div class="cline" data-line="${esc(l.id)}">
      <div class="cline-img">${photo(p.id, { alt: '' })}</div>
      <div class="cline-b"><b>${esc(p.name)}</b>${detail ? `<small>${esc(detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}
        ${editable ? `<div class="cline-act"><div class="qty sm"><button type="button" data-lm aria-label="Retirer une unité">${icon(l.qty > 1 ? 'minus' : 'trash')}</button><b>${l.qty}</b><button type="button" data-lp aria-label="Ajouter une unité">${icon('plus')}</button></div>${p.options.length ? `<button type="button" class="link sm" data-edit>Modifier</button>` : ''}</div>` : `<small>Quantité : ${l.qty}</small>`}
      </div>
      <b class="cline-p">${esc(eur(l.unit * l.qty))}</b>
    </div>`;
  }).join('');
}
function totalsHTML(t) {
  return `<div class="tots">
    <div><span>Sous-total</span><b>${esc(eur(t.sub))}</b></div>
    ${t.discount ? `<div class="disc"><span>Code ${esc(t.promo.code)} (−${t.promo.pct} %)</span><b>−${esc(eur(t.discount))}</b></div>` : ''}
    ${cart.mode === 'livraison' ? `<div><span>Livraison${t.zone ? ` (${esc(t.zone.zip)})` : ''}</span><b>${t.zone ? (t.delivery ? esc(eur(t.delivery)) : 'Offerte') : 'Code postal ?'}</b></div>` : ''}
    <div class="tot"><span>Total TTC</span><b>${esc(eur(t.total))}</b></div>
  </div>`;
}
function upsellHTML() {
  const inCart = new Set(cart.lines.map((l) => l.productId));
  const ideas = ['canette', 'frites', 'tiramisu', 'cookie', 'milkshake', 'nuggets'].map(product).filter((p) => p && p.available !== false && !inCart.has(p.id)).slice(0, 4);
  if (!ideas.length) return '';
  return `<div class="upsell"><p class="upsell-h">Avec ça ?</p><div class="upsell-row">${ideas.map((p) => `<button type="button" class="up" data-open="${esc(p.id)}">${photo(p.id, { alt: '' })}<span>${esc(p.name)}</span><b>+${esc(eur(p.price))}</b></button>`).join('')}</div></div>`;
}
/** Contenu du panier : fenêtre (téléphone, bouton du panier) ou colonne fixe à droite de la carte (ordinateur). */
function cartBodyHTML({ panel = false } = {}) {
  const t = totals();
  if (!cart.lines.length) {
    return panel
      ? `<div class="cp-empty">${icon('bag')}<b>Votre panier est vide</b><p>${fr('Choisissez un plat : il s’ajoute ici, avec le total de votre commande.')}</p></div>`
      : `<div class="empty-card">${icon('bag')}<p>Votre panier est vide.</p><a class="btn btn-primary" href="/carte">Voir la carte</a></div>`;
  }
  return `${panel ? '' : modeSwitch('compact') + zipBox()}<div class="clines">${cartLinesHTML()}</div>${panel ? '' : upsellHTML()}
    <details class="promo" ${cart.promo ? 'open' : ''}><summary>${icon('gift')}Un code promo ?</summary><form class="promo-f" data-promo><input name="code" placeholder="Votre code" value="${esc(cart.promo || '')}" autocapitalize="characters" aria-label="Code promo"><button type="submit" class="btn btn-ghost sm">Appliquer</button></form><p class="muted small">${fr('Première commande en ligne : YANIS10.')}</p></details>
    ${totalsHTML(t)}`;
}
function cartFootHTML() {
  if (!cart.lines.length) return '';
  const t = totals();
  const blocked = cart.mode === 'livraison' && (!t.zone || t.missingMin > 0);
  return `${t.missingMin > 0 && t.zone ? `<p class="warn-line">${icon('info')}Encore ${esc(eur(t.missingMin))} pour être livré (minimum ${esc(eur(S().minDelivery))}).</p>` : ''}${cart.mode === 'livraison' && !t.zone ? `<p class="warn-line">${icon('pin')}Indiquez un code postal livré, ou passez à emporter.</p>` : ''}
    <a class="btn btn-primary btn-lg btn-block ${blocked ? 'disabled' : ''}" href="/commande" ${blocked ? 'aria-disabled="true" tabindex="-1"' : ''} data-go-checkout><span>Commander</span><b>${esc(eur(t.total))}</b></a>`;
}
/** Boutons du panier (quantités, modifier, code promo, suggestions), communs à la fenêtre et à la colonne. */
function bindCart(root, redraw) {
  const changed = () => { saveCart(); refreshCartUI(); redraw(); };
  bindModeSwitch(root, redraw);
  bindZip(root);
  $$('[data-zipbox] input', root).forEach((i) => i.addEventListener('change', redraw));
  const later = (fn) => { if (OPEN.size) { closeAll(); setTimeout(fn, 330); } else fn(); };
  $$('[data-line]', root).forEach((row) => {
    const l = cart.lines.find((x) => x.id === row.dataset.line);
    if (!l) return;
    $('[data-lm]', row).onclick = () => { l.qty -= 1; if (l.qty <= 0) cart.lines = cart.lines.filter((x) => x !== l); changed(); };
    $('[data-lp]', row).onclick = () => { l.qty = Math.min(20, l.qty + 1); changed(); };
    const ed = $('[data-edit]', row); if (ed) ed.onclick = () => later(() => openProduct(l.productId, { editLine: l.id }));
  });
  const pf = $('[data-promo]', root);
  if (pf) pf.onsubmit = (e) => {
    e.preventDefault();
    const code = pf.code.value.trim().toUpperCase();
    if (!code) { cart.promo = null; changed(); return; }
    if (!S().promos.some((x) => x.code === code)) { toast('Ce code n’existe pas.', 'warn'); return; }
    cart.promo = code; toast('Code appliqué.', 'ok'); changed();
  };
  $$('.upsell [data-open]', root).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); later(() => openProduct(b.dataset.open)); }));
  const go = $('[data-go-checkout]', root);
  if (go) go.addEventListener('click', (e) => { if (go.classList.contains('disabled')) { e.preventDefault(); e.stopPropagation(); } });
}
function openCart() {
  openSheet({ title: 'Votre panier', side: true, cls: 'cart-sheet', body: '', foot: ' ', onMount: (el, close) => {
    const draw = () => {
      $('.sheet-bd', el).innerHTML = cartBodyHTML();
      const ft = $('.sheet-ft', el);
      ft.innerHTML = cartFootHTML();
      ft.hidden = !cart.lines.length;
      bindCart(el, draw);
    };
    draw();
    el.addEventListener('click', (e) => { const a = e.target.closest('a[href]'); if (a && !a.classList.contains('disabled')) close(); });
  } });
}
function cartPanelHTML() {
  return `<aside class="cpanel" data-cartpanel aria-label="Votre panier"><div class="cpanel-in">
    <div class="cpanel-hd"><h2>Votre commande</h2><span class="cpanel-mode" data-cpmode></span></div>
    <div class="cpanel-bd" data-cpbd></div><div class="cpanel-ft" data-cpft></div>
  </div></aside>`;
}
function renderCartPanel() {
  const p = $('[data-cartpanel]');
  if (!p) return;
  $('[data-cpmode]', p).innerHTML = cart.mode === 'livraison' ? `${icon('bike')}Livraison` : `${icon('bag')}À emporter`;
  $('[data-cpbd]', p).innerHTML = cartBodyHTML({ panel: true });
  $('[data-cpft]', p).innerHTML = cartFootHTML();
  bindCart(p, renderCartPanel);
}

/* ---------- Page de commande ---------- */
function pageCommande() {
  if (!cart.lines.length) { setTimeout(() => go('/carte'), 0); return page(''); }
  const t = totals();
  const client = lsGet(CLIENT_KEY) || {};
  const sl = slots(cart.mode);
  const asapOk = openNow() && sl.length;
  const slotOpts = sl.slice(0, 60).map((d) => `<option value="${toISO(d)}" ${cart.when === toISO(d) ? 'selected' : ''}>${esc(dayLabel(d))}, ${esc(hm(d))}</option>`).join('');
  const html = `<div class="wrap co">
    <div class="co-main">
      <a class="back" href="/carte">${icon('chevL')}Retour à la carte</a>
      <h1>Finaliser la commande</h1>
      <form data-co novalidate>
        <section class="co-sec"><h2><span>1</span>Retrait ou livraison</h2>${modeSwitch()}
          <div data-addr ${cart.mode === 'livraison' ? '' : 'hidden'}>
            <div class="grid2"><label class="f"><span>Adresse</span><input name="street" autocomplete="street-address" placeholder="Numéro et rue" value="${esc((client.address || {}).street || '')}"><em class="err-m"></em></label>
            <label class="f"><span>Code postal</span><input name="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" value="${esc(cart.zip || (client.address || {}).zip || '')}"><em class="err-m"></em></label></div>
            <label class="f"><span>Précisions pour le livreur</span><input name="info" placeholder="Code, étage, interphone" value="${esc((client.address || {}).info || '')}"></label>
          </div>
          <p class="co-where" data-where ${cart.mode === 'emporter' ? '' : 'hidden'}>${icon('pin')}À récupérer au ${esc(S().address)}, ${esc(S().city)}</p>
        </section>
        <section class="co-sec"><h2><span>2</span>Quand ?</h2>
          <div class="when">
            <label class="when-o ${asapOk ? '' : 'disabled'}"><input type="radio" name="when" value="asap" ${asapOk && cart.when === 'asap' ? 'checked' : ''} ${asapOk ? '' : 'disabled'}><span><b>Dès que possible</b><small data-asap>${asapOk ? `Environ ${cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes} min` : pausedNow() ? 'Commandes immédiates en pause' : 'Le restaurant est fermé'}</small></span></label>
            <label class="when-o"><input type="radio" name="when" value="slot" ${!asapOk || cart.when !== 'asap' ? 'checked' : ''}><span><b>Programmer</b><select name="slot" aria-label="Créneau">${slotOpts || '<option value="">Aucun créneau</option>'}</select></span></label>
          </div>
        </section>
        <section class="co-sec"><h2><span>3</span>Vos coordonnées</h2>
          <div class="grid2"><label class="f"><span>Prénom</span><input name="firstName" autocomplete="given-name" value="${esc(client.firstName || '')}"><em class="err-m"></em></label><label class="f"><span>Nom</span><input name="lastName" autocomplete="family-name" value="${esc(client.lastName || '')}"><em class="err-m"></em></label></div>
          <div class="grid2"><label class="f"><span>Téléphone</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(client.phone || '')}"><em class="err-m"></em></label><label class="f"><span>Email (reçu et suivi)</span><input name="email" type="email" inputmode="email" autocomplete="email" value="${esc(client.email || '')}"><em class="err-m"></em></label></div>
        </section>
        <section class="co-sec"><h2><span>4</span>Paiement</h2>
          <div class="pay">
            <label class="pay-o"><input type="radio" name="pay" value="carte" checked><span>${icon('card')}<b>Carte bancaire en ligne</b><small>CB, Visa, Mastercard, Apple Pay, Google Pay</small></span></label>
            <label class="pay-o"><input type="radio" name="pay" value="sur-place"><span>${icon('cash')}<b data-paylbl>${cart.mode === 'livraison' ? 'À la livraison' : 'Sur place'}</b><small>Espèces, carte ou titres-restaurant</small></span></label>
          </div>
          <p class="demo-note">${icon('info')}Démonstration : la commande n’est pas transmise au restaurant et aucun paiement n’est débité.</p>
        </section>
      </form>
    </div>
    <aside class="co-side"><div class="co-card">
      <h2>Récapitulatif</h2>
      <div class="clines">${cartLinesHTML(false)}</div>
      <div data-tots>${totalsHTML(t)}</div>
      <button type="button" class="btn btn-primary btn-lg btn-block" data-pay><span>Commander et payer</span><b data-total>${esc(eur(t.total))}</b></button>
      <p class="muted small center">${icon('lock')}Paiement sécurisé</p>
    </div></aside>
  </div>`;
  return page(html, { footer: false, bar: false });
}
function mountCommande() {
  const f = $('[data-co]');
  if (!f) return;
  const redraw = () => {
    const t = totals();
    $('[data-tots]').innerHTML = totalsHTML(t);
    $('[data-total]').textContent = eur(t.total);
    $('[data-addr]').hidden = cart.mode !== 'livraison';
    $('[data-where]').hidden = cart.mode !== 'emporter';
    $('[data-paylbl]').textContent = cart.mode === 'livraison' ? 'À la livraison' : 'Sur place';
    const asap = $('[data-asap]'); if (asap && openNow()) asap.textContent = `Environ ${cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes} min`;
    const sl = slots(cart.mode);
    const sel = f.slot; const cur = sel.value;
    sel.innerHTML = sl.slice(0, 60).map((d) => `<option value="${toISO(d)}">${esc(dayLabel(d))}, ${esc(hm(d))}</option>`).join('') || '<option value="">Aucun créneau</option>';
    if ([...sel.options].some((o) => o.value === cur)) sel.value = cur;
  };
  bindModeSwitch(document, redraw);
  f.zip.addEventListener('input', () => { f.zip.value = f.zip.value.replace(/\D/g, '').slice(0, 5); cart.zip = f.zip.value; saveCart(); redraw(); });
  f.slot.addEventListener('change', () => { f.querySelector('[name=when][value=slot]').checked = true; });
  $('[data-pay]').onclick = () => {
    const v = (n) => (f[n] ? f[n].value.trim() : '');
    const errs = {};
    for (const n of ['firstName', 'phone']) if (!v(n)) errs[n] = 'Obligatoire.';
    if (v('phone') && v('phone').replace(/\D/g, '').length < 10) errs.phone = 'Numéro incomplet.';
    if (v('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errs.email = 'Email invalide.';
    const t = totals();
    if (cart.mode === 'livraison') {
      if (!v('street')) errs.street = 'Indiquez l’adresse.';
      if (!zoneFor(v('zip'))) errs.zip = 'Code postal non livré.';
      else if (t.missingMin > 0) { toast(`Minimum ${eur(S().minDelivery)} pour la livraison : il manque ${eur(t.missingMin)}.`, 'warn'); return; }
    }
    const whenSlot = f.querySelector('[name=when]:checked')?.value === 'slot' || !openNow();
    if (whenSlot && !f.slot.value) { toast('Aucun créneau disponible pour le moment.', 'warn'); return; }
    $$('.f', f).forEach((l) => l.classList.remove('err'));
    for (const [n, m] of Object.entries(errs)) { const i = f[n]; if (i) { const l = i.closest('.f'); l.classList.add('err'); $('.err-m', l).textContent = m; } }
    if (Object.keys(errs).length) { const first = $('.f.err', f); first.scrollIntoView({ behavior: 'smooth', block: 'center' }); toast('Vérifiez les champs signalés.', 'warn'); return; }
    const payment = f.querySelector('[name=pay]:checked').value;
    const client = { firstName: v('firstName'), lastName: v('lastName'), phone: v('phone'), email: v('email').toLowerCase(), address: cart.mode === 'livraison' ? { street: v('street'), zip: v('zip'), city: 'Bordeaux', info: v('info') } : (lsGet(CLIENT_KEY) || {}).address };
    const place = () => {
      sync();
      const due = whenSlot ? new Date(f.slot.value) : addMin(new Date(), cart.mode === 'livraison' ? S().deliveryMinutes : S().prepMinutes);
      const o = {
        id: uid('o'), number: orderNumber(), createdAt: new Date().toISOString(), status: 'recue', history: [{ st: 'recue', at: new Date().toISOString() }], auto: true,
        mode: cart.mode, when: whenSlot ? 'slot' : 'asap', due: due.toISOString(),
        customer: { firstName: client.firstName, lastName: client.lastName, phone: client.phone, email: client.email },
        address: cart.mode === 'livraison' ? client.address : null,
        lines: cart.lines.map((l) => ({ id: l.id, productId: l.productId, choice: l.choice, qty: l.qty, note: l.note, unit: l.unit, detail: choiceText(product(l.productId), l.choice) })),
        promo: t.promo ? t.promo.code : null, discount: t.discount, delivery: t.delivery, total: t.total, payment, paid: payment === 'carte', channel: 'En ligne', demo: false,
      };
      db.orders.unshift(o); save();
      const mine = lsGet(CLIENT_KEY) || {};
      lsSet(CLIENT_KEY, { ...mine, ...client, orders: [o.id].concat(mine.orders || []).slice(0, 30) });
      cart.lines = []; cart.promo = null; saveCart();
      go('/suivi/' + o.id);
    };
    if (payment === 'carte') {
      openSheet({ cls: 'paying', body: `<div class="pay-anim"><div class="spin"></div><b>Paiement sécurisé en cours…</b><p class="muted small">${eur(t.total)} · démonstration, rien n’est débité</p></div>`, onMount: (el, close) => setTimeout(() => { close(); place(); }, 1400) });
    } else place();
  };
}

/* ---------- Suivi de commande ---------- */
function pageSuivi(id) {
  const o = orderById(id);
  if (!o) return pageNotFound();
  const flow = FLOW(o);
  const i = o.status === 'annulee' ? -1 : flow.indexOf(o.status);
  const due = new Date(o.due);
  const lines = orderLines(o);
  const headline = o.status === 'annulee' ? 'Commande annulée' : o.status === 'terminee' ? (o.mode === 'livraison' ? 'Commande livrée' : 'Commande récupérée') : o.status === 'prete' ? 'Votre commande est prête !' : o.status === 'livraison' ? 'Votre livreur arrive' : o.status === 'preparation' ? 'On prépare votre commande' : 'Commande reçue, merci !';
  const html = `<div class="wrap narrow pagepad suivi" data-suivi="${esc(o.id)}">
    <div class="track-card st-${o.status}">
      <p class="kicker">Commande n° ${esc(o.number)} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'}</p>
      <h1>${esc(headline)}</h1>
      ${['terminee', 'annulee'].includes(o.status) ? '' : `<p class="eta">${icon('clock')}${o.mode === 'livraison' ? 'Livraison prévue vers' : 'Prête vers'} <b>${esc(hm(due))}</b>${sameDay(due, new Date()) ? '' : ` (${esc(dayLabel(due))})`}</p>`}
      ${o.status === 'annulee' ? '' : `<ol class="track">${flow.map((st, k) => `<li class="${k < i ? 'done' : k === i ? 'now' : ''}"><span class="dot">${k < i || o.status === 'terminee' ? icon('check') : ''}</span><b>${esc(STATUS[st][0])}</b>${k === i && st !== 'terminee' ? `<small>${esc(STATUS[st][1])}</small>` : ''}</li>`).join('')}</ol>`}
      ${o.status === 'prete' ? `<div class="pickup">${icon('pin')}<span>À récupérer au comptoir : <b>${esc(S().address)}</b>. Donnez le numéro <b>${esc(o.number)}</b>.</span></div>` : ''}
    </div>
    <div class="grid-2">
      <div class="box"><h2>Votre commande</h2>${lines.map((l) => `<div class="rl"><span><b>${l.qty} × ${esc(l.name)}</b>${l.detail ? `<small>${esc(l.detail)}</small>` : ''}${l.note ? `<small class="note">« ${esc(l.note)} »</small>` : ''}</span><b>${esc(eur(l.unit * l.qty))}</b></div>`).join('')}
        <div class="tots">${o.discount ? `<div class="disc"><span>Code ${esc(o.promo)}</span><b>−${esc(eur(o.discount))}</b></div>` : ''}${o.mode === 'livraison' ? `<div><span>Livraison</span><b>${o.delivery ? esc(eur(o.delivery)) : 'Offerte'}</b></div>` : ''}<div class="tot"><span>Total TTC</span><b>${esc(eur(o.total))}</b></div></div>
        <p class="muted small">${o.paid ? `${icon('check')}Payée en ligne` : `À régler ${o.mode === 'livraison' ? 'à la livraison' : 'sur place'}`}</p></div>
      <div class="box"><h2>${o.mode === 'livraison' ? 'Livraison' : 'Retrait'}</h2>
        ${o.mode === 'livraison' && o.address ? `<p>${esc(o.address.street)}<br>${esc(o.address.zip)} ${esc(o.address.city)}</p>${o.address.info ? `<p class="muted small">${esc(o.address.info)}</p>` : ''}` : `<p>${esc(S().name)}<br>${esc(S().address)}, ${esc(S().zip)} ${esc(S().city)}</p>`}
        <p class="muted small">Au nom de ${esc(o.customer.firstName)} ${esc(o.customer.lastName || '')} · ${esc(o.customer.phone)}</p>
        ${S().phone ? `<a class="btn btn-ghost" href="tel:${esc(S().phone.replace(/\s/g, ''))}">${icon('phone')}Appeler le restaurant</a>` : ''}
        <button type="button" class="btn btn-ghost" data-again>${icon('refresh')}Recommander la même chose</button></div>
    </div>
    <div class="app-card" data-install hidden>${logoMark(44)}<span><b>Installez l’application</b><small>${fr('Vos commandes et leur suivi, à portée de pouce : ajoutez Les Délices de Yanis à votre écran d’accueil.')}</small></span><span class="btn btn-dark sm">Installer</span></div>
    <p class="center"><a class="link" href="/commandes">Toutes mes commandes</a></p>
  </div>`;
  return page(html, { active: 'commandes', bar: false });
}
let suiviTimer = null;
function mountSuivi(id) {
  clearInterval(suiviTimer);
  const o = orderById(id);
  if (!o) return;
  const again = $('[data-again]');
  if (again) again.onclick = () => {
    for (const l of o.lines) { const p = product(l.productId); if (p && p.available !== false) addToCart(p, l.choice, l.qty, l.note); }
    refreshCartUI(); toast('Commande ajoutée au panier.', 'ok'); openCart();
  };
  const last = o.status;
  suiviTimer = setInterval(() => {
    if (!$(`[data-suivi="${id}"]`)) { clearInterval(suiviTimer); return; }
    db = lsGet(STORE) || db;   // la cuisine a pu changer le statut depuis un autre onglet
    const cur = orderById(id);
    if (!cur) return;
    autoAdvance(cur);
    const now = orderById(id);   // relu : l'avancement enregistre une nouvelle copie des données
    if (now && now.status !== last) { render(true); if (navigator.vibrate) try { navigator.vibrate(120); } catch (e) { /* rien */ } }
  }, 2000);
}
