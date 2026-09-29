/* =====================================================================
   SITE : accueil, carte, fiche produit (options), pages spécialités,
   infos et horaires, mes commandes, page introuvable.
   ===================================================================== */
const catName = (id) => (CATEGORIES.find((c) => c[0] === id) || [id, id])[1];
const live = () => db.menu.filter((p) => p.available !== false);
const bestSellers = () => db.menu.filter((p) => p.tags.includes('best'));

/* ---------- Choix du mode : à emporter ou livraison ---------- */
function modeSwitch(where = '') {
  return `<div class="modesw ${where}" role="radiogroup" aria-label="Mode de commande">
    <button type="button" role="radio" data-mode="emporter" aria-checked="${cart.mode === 'emporter'}" class="${cart.mode === 'emporter' ? 'on' : ''}">${icon('bag')}<span><b>À emporter</b><small>Prête en ${S().prepMinutes} min</small></span></button>
    <button type="button" role="radio" data-mode="livraison" aria-checked="${cart.mode === 'livraison'}" class="${cart.mode === 'livraison' ? 'on' : ''}">${icon('bike')}<span><b>Livraison</b><small>En ${S().deliveryMinutes} min</small></span></button>
  </div>`;
}
function bindModeSwitch(root = document, after) {
  $$('[data-mode]', root).forEach((b) => (b.onclick = () => {
    cart.mode = b.dataset.mode; saveCart();
    $$('[data-mode]', root).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', String(x === b)); });
    $$('[data-zipbox]', root).forEach((z) => { z.hidden = cart.mode !== 'livraison'; });
    refreshCartUI();
    if (after) after();
  }));
}
function zipBox() {
  return `<div class="zipbox" data-zipbox ${cart.mode === 'livraison' ? '' : 'hidden'}>
    <label class="zip-f">${icon('pin')}<input name="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" placeholder="Votre code postal" value="${esc(cart.zip)}" aria-label="Code postal de livraison"></label>
    <p class="zip-msg" data-zipmsg>${zipMsg(cart.zip)}</p>
  </div>`;
}
function zipMsg(zip) {
  if (!zip) return `Nous livrons ${S().zones.map((z) => z.zip).join(', ')}.`;
  if (!/^\d{5}$/.test(zip)) return 'Code postal à 5 chiffres.';
  const z = zoneFor(zip);
  return z ? `<b class="ok">${icon('check')}Nous livrons ${esc(z.label)}</b>, frais ${esc(eur(z.fee))}, offerts dès ${esc(eur(S().freeDeliveryFrom))}.` : `<b class="ko">${icon('alert')}Pas encore de livraison au ${esc(zip)}</b> : commandez à emporter, c’est prêt en ${S().prepMinutes} min.`;
}
function bindZip(root = document) {
  $$('[data-zipbox] input', root).forEach((i) => (i.oninput = () => {
    cart.zip = i.value.replace(/\D/g, '').slice(0, 5); i.value = cart.zip; saveCart();
    $$('[data-zipmsg]', root).forEach((m) => { m.innerHTML = zipMsg(cart.zip); });
    if (typeof renderCartPanel === 'function') renderCartPanel();
  }));
}

/* ---------- Accueil ---------- */
function pageHome() {
  const s = S();
  const cats = CATEGORIES.filter(([c]) => live().some((p) => p.cat === c) && !['boissons'].includes(c));
  const catPhoto = { pizzas: 'pizza-reine', tacos: 'tacos', sandwichs: 'burger', plats: 'assiette-kebab', cote: 'frites', desserts: 'tiramisu' };
  const html = `
  <section class="hero"><div class="wrap hero-in">
    <div class="hero-copy">
      <p class="kicker">${icon('pin')}${esc(s.address)}, ${esc(s.city)}</p>
      <h1>Pizzas, tacos et <em>plats maison</em>, au cœur de Bordeaux</h1>
      <p class="hero-sub">${fr('Pâte pétrie chaque matin, viandes halal, frites coupées sur place. À emporter en 20 minutes ou livré chez vous : commandez en ligne en deux minutes.')}</p>
      <div class="order-card">${modeSwitch()}${zipBox()}<a class="btn btn-primary btn-lg btn-block" href="/carte">Voir la carte et commander${icon('arrowR')}</a></div>
      <ul class="trust"><li>${icon('shield')}Viandes halal</li><li>${icon('chef')}Fait maison</li><li>${icon('star')}Depuis ${s.since}</li><li>${icon('card')}Paiement sécurisé</li></ul>
    </div>
    <div class="hero-art">
      <div class="hero-photo">${photo('hero-pizza', { size: 1200, alt: 'Pizza sortant du four', eager: true })}</div>
      <div class="float f1">${icon('timer')}<span><b>Prête en ${s.prepMinutes} min</b><small>à emporter</small></span></div>
      <div class="float f2">${photo('pizza-poulet-curry', { cls: 'float-img', alt: '' })}<span><b>La Yanis</b><small>notre pizza signature</small></span></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-hd"><h2>Les plus commandés</h2><a class="more" href="/carte">Toute la carte${icon('arrowR')}</a></div>
    <div class="rail-wrap"><button type="button" class="rail-btn prev" data-rail-prev aria-label="Plats précédents" disabled>${icon('chevL')}</button><div class="rail" data-rail>${bestSellers().map(productCard).join('')}</div><button type="button" class="rail-btn next" data-rail-next aria-label="Plats suivants">${icon('chevR')}</button></div>
  </div></section>

  <section class="sec sec-cats"><div class="wrap">
    <div class="sec-hd"><h2>Envie de quoi ?</h2></div>
    <div class="cats">${cats.map(([c, name, sub]) => `<a class="cat-tile" href="/carte#${c}">${photo(catPhoto[c] || '', { alt: '' })}<span><b>${esc(name)}</b><small>${esc(sub)}</small></span></a>`).join('')}</div>
  </div></section>

  <section class="sec how"><div class="wrap">
    <div class="sec-hd"><h2>Commander, c’est simple</h2></div>
    <ol class="steps">
      <li><span class="step-n">1</span><b>Choisissez</b><p>${fr('Votre pizza, votre tacos avec vos viandes et vos sauces, un menu pour le midi.')}</p></li>
      <li><span class="step-n">2</span><b>Payez en ligne</b><p>${fr('Carte bancaire, Apple Pay ou Google Pay. Ou réglez sur place si vous préférez.')}</p></li>
      <li><span class="step-n">3</span><b>Suivez votre commande</b><p>${fr('Reçue, en préparation, prête : vous savez quand passer, ou quand le livreur arrive.')}</p></li>
    </ol>
  </div></section>

  <section class="sec deliv"><div class="wrap deliv-in">
    <div><p class="kicker">${icon('bike')}Livraison</p><h2>Livré chaud, dans tout Bordeaux centre</h2>
      <p>${fr(`Livraison en ${s.deliveryMinutes} minutes environ, offerte dès ${eur(s.freeDeliveryFrom)} de commande. Minimum ${eur(s.minDelivery)}.`)}</p>
      <a class="btn btn-dark" href="/livraison-bordeaux">Zones et frais de livraison${icon('arrowR')}</a></div>
    <ul class="zones">${s.zones.map((z) => `<li><b>${esc(z.zip)}</b><span>${esc(z.label)}</span><em>${esc(eur(z.fee))}</em></li>`).join('')}</ul>
  </div></section>

  <section class="sec"><div class="wrap info-grid">
    <div class="info-card"><h2>Horaires</h2><ul class="hours">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<li class="${new Date().getDay() === d ? 'today' : ''}"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><span>${esc(hoursText(d))}</span></li>`).join('')}</ul></div>
    <div class="info-card map-card"><h2>Au pied du Palais Gallien</h2><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p class="muted">${fr('À deux pas du Jardin public et des Chartrons, tram C arrêt Jardin public.')}</p>${mapArt()}<a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a></div>
  </div></section>

  ${seoHomeHTML()}
  <section class="cta-band"><div class="wrap cta-in"><div><h2>Une petite faim ?</h2><p>${fr('Commandez maintenant, c’est prêt en 20 minutes.')}</p></div><a class="btn btn-light btn-lg" href="/carte">${icon('bag')}Commander</a></div></section>`;
  return page(html, { active: 'accueil' });
}
function mapArt() {
  return `<svg class="map-art" viewBox="0 0 400 190" aria-hidden="true"><rect width="400" height="190" rx="18" fill="#F3E8DA"/><path d="M-10 150 C80 120 140 170 230 130 S360 90 420 110" stroke="#D9E4E8" stroke-width="26" fill="none"/><g stroke="#FFFFFF" stroke-width="9" fill="none" stroke-linecap="round"><path d="M20 40 L380 60"/><path d="M60 -10 L110 200"/><path d="M250 -10 L210 200"/><path d="M20 100 L380 90"/></g><circle cx="300" cy="44" r="26" fill="#DCE8C8"/><text x="300" y="48" font-size="10" text-anchor="middle" fill="#6d7f4f" font-family="Inter, sans-serif">Jardin public</text><g transform="translate(168 58)"><circle r="30" fill="#E2432A" opacity=".15"/><path d="M0 18s16-14 16-26a16 16 0 0 0-32 0c0 12 16 26 16 26z" fill="#E2432A"/><circle cy="-8" r="6" fill="#FFF7EA"/></g></svg>`;
}
function mountHome() { bindModeSwitch(); bindZip(); bindRails(); }
/** Flèches des bandeaux qui défilent (ordinateur) : elles disparaissent aux extrémités. */
function bindRails(root = document) {
  $$('.rail-wrap', root).forEach((w) => {
    const rail = $('[data-rail]', w); const prev = $('[data-rail-prev]', w); const next = $('[data-rail-next]', w);
    const upd = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; };
    const step = () => Math.max(260, rail.clientWidth * 0.8);
    prev.onclick = () => rail.scrollBy({ left: -step(), behavior: REDUCED ? 'auto' : 'smooth' });
    next.onclick = () => rail.scrollBy({ left: step(), behavior: REDUCED ? 'auto' : 'smooth' });
    rail.addEventListener('scroll', upd, { passive: true });
    upd();
  });
}

/* ---------- La carte ---------- */
const menuUi = { q: '', f: '' };
function pageCarte() {
  const cats = CATEGORIES.filter(([c]) => db.menu.some((p) => p.cat === c));
  const html = `
  <div class="carte-top"><div class="wrap">
    <div class="carte-hd"><div><h1>La carte</h1><p class="muted">${fr('Toutes nos viandes sont halal. Prix TTC, TVA incluse.')}</p></div>${modeSwitch('compact')}</div>
    ${zipBox()}
  </div></div>
  <nav class="catnav" aria-label="Catégories"><div class="wrap catnav-in" data-catnav>
    ${cats.map(([c, n], i) => `<a href="#${c}" data-cat="${c}" class="${i ? '' : 'on'}">${esc(n)}</a>`).join('')}
  </div></nav>
  <div class="wrap carte-layout"><div class="carte">
    <div class="carte-tools">
      <label class="search">${icon('search')}<input type="search" data-q placeholder="Rechercher un plat, une sauce…" value="${esc(menuUi.q)}" aria-label="Rechercher dans la carte"></label>
      <div class="chips" role="group" aria-label="Filtres">${[['', 'Tout'], ['veggie', 'Végétarien'], ['spicy', 'Épicé'], ['best', 'Les plus commandés']].map(([k, l]) => `<button type="button" class="chip ${menuUi.f === k ? 'on' : ''}" data-f="${k}">${esc(l)}</button>`).join('')}</div>
    </div>
    ${cats.map(([c, n, sub]) => `<section class="cat-sec" id="${c}" data-sec="${c}"><div class="cat-sec-hd"><h2>${esc(n)}</h2><p>${esc(sub)}</p></div><div class="pgrid">${db.menu.filter((p) => p.cat === c).map(productCard).join('')}</div></section>`).join('')}
    <p class="empty" data-empty hidden>${icon('search')}Aucun plat ne correspond. <button type="button" class="link" data-reset>Tout afficher</button></p>
  </div>${cartPanelHTML()}</div>`;
  return page(html, { active: 'carte' });
}
function mountCarte() {
  bindModeSwitch(); bindZip(); renderCartPanel();
  const apply = () => {
    const q = menuUi.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let n = 0;
    $$('.pcard').forEach((c) => {
      const p = product(c.dataset.p);
      const txt = (p.name + ' ' + p.desc + ' ' + catName(p.cat)).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const show = (!q || txt.includes(q)) && (!menuUi.f || p.tags.includes(menuUi.f));
      c.hidden = !show; if (show) n++;
    });
    $$('[data-sec]').forEach((s) => { s.hidden = !$$('.pcard', s).some((c) => !c.hidden); });
    $('[data-empty]').hidden = n > 0;
  };
  const qi = $('[data-q]');
  qi.oninput = () => { menuUi.q = qi.value; apply(); };
  $$('[data-f]').forEach((b) => (b.onclick = () => { menuUi.f = b.dataset.f; $$('[data-f]').forEach((x) => x.classList.toggle('on', x === b)); apply(); }));
  $('[data-reset]').onclick = () => { menuUi.q = ''; menuUi.f = ''; qi.value = ''; $$('[data-f]').forEach((x) => x.classList.toggle('on', !x.dataset.f)); apply(); };
  apply();
  // catégorie en cours, mise en avant dans la barre au fil du défilement
  const nav = $('[data-catnav]');
  const links = $$('[data-cat]', nav);
  links.forEach((a) => (a.onclick = (e) => { e.preventDefault(); const t = document.getElementById(a.dataset.cat); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130, behavior: REDUCED ? 'auto' : 'smooth' }); }));
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((ents) => {
      for (const en of ents) if (en.isIntersecting) {
        links.forEach((a) => a.classList.toggle('on', a.dataset.cat === en.target.dataset.sec));
        const on = links.find((a) => a.classList.contains('on')); if (on) nav.scrollTo({ left: on.offsetLeft - 16, behavior: REDUCED ? 'auto' : 'smooth' });
      }
    }, { rootMargin: '-140px 0px -65% 0px' });
    $$('[data-sec]').forEach((s) => obs.observe(s));
  }
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 130 }), 60); }
}

/* ---------- Fiche produit : options, quantité, précision ---------- */
function openProduct(id, { editLine } = {}) {
  const p = product(id);
  if (!p) return;
  if (p.available === false) { toast(`${p.name} est épuisé pour le moment.`, 'warn'); return; }
  const line = editLine && cart.lines.find((l) => l.id === editLine);
  const choice = line ? JSON.parse(JSON.stringify(line.choice)) : defaultChoice(p);
  let qty = line ? line.qty : 1;
  const groupHTML = (gid) => {
    const g = group(gid);
    const max = groupMax(g, choice);
    const sel = choice[gid] || [];
    const hint = g.type === 'one' ? (g.required ? 'Obligatoire' : 'Facultatif') : g.min ? `${sel.length}/${max} · au moins ${g.min}` : `${sel.length}/${max} · facultatif`;
    return `<fieldset class="og ${groupVisible(g, choice) ? '' : 'hidden'}" data-g="${gid}"><legend><b>${esc(g.label)}</b><small data-hint>${esc(hint)}</small></legend>
      <div class="og-items">${g.items.map(([oid, label, price]) => `<button type="button" class="opt ${sel.includes(oid) ? 'on' : ''}" data-o="${oid}" aria-pressed="${sel.includes(oid)}"><span class="opt-box ${g.type === 'one' ? 'round' : ''}">${icon('check')}</span><span class="opt-l">${esc(label)}</span>${price ? `<span class="opt-p">+${esc(eur(price))}</span>` : ''}</button>`).join('')}</div></fieldset>`;
  };
  const body = `<div class="pd">
    <div class="pd-img">${photo(p.id, { size: 1200, alt: p.name, eager: true })}</div>
    <div class="pd-in">
      <div class="pd-tags">${p.tags.map(tagHTML).join('')}</div>
      <h2>${esc(p.name)}</h2>
      <p class="pd-desc">${esc(fr(p.desc))}</p>
      <div data-groups>${p.options.map(groupHTML).join('')}</div>
      <label class="pd-note"><span>Une précision pour la cuisine ?</span><textarea rows="2" maxlength="140" data-note placeholder="Par exemple : bien cuite, sauce à part">${esc(line ? line.note : '')}</textarea></label>
    </div></div>`;
  const foot = `<div class="qty">${'<button type="button" data-qm aria-label="Retirer une unité">' + icon('minus') + '</button>'}<b data-qty>${qty}</b>${'<button type="button" data-qp aria-label="Ajouter une unité">' + icon('plus') + '</button>'}</div><button type="button" class="btn btn-primary btn-lg pd-add" data-add></button>`;
  openSheet({ cls: 'pd-sheet', body, foot, onMount: (el, close) => {
    const draw = () => {
      $('[data-qty]', el).textContent = qty;
      const miss = missingChoice(p, choice);
      const btn = $('[data-add]', el);
      btn.innerHTML = miss ? `<span>${esc(miss.msg)}</span>` : `<span>${line ? 'Mettre à jour' : 'Ajouter'}</span><b>${esc(eur(unitPrice(p, choice) * qty))}</b>`;
      btn.classList.toggle('muted', !!miss);
      $$('[data-g]', el).forEach((fs) => {
        const g = group(fs.dataset.g);
        fs.classList.toggle('hidden', !groupVisible(g, choice));
        const sel = choice[fs.dataset.g] || [];
        const max = groupMax(g, choice);
        $('[data-hint]', fs).textContent = g.type === 'one' ? (g.required ? 'Obligatoire' : 'Facultatif') : g.min ? `${sel.length}/${max} · au moins ${g.min}` : `${sel.length}/${max} · facultatif`;
        $$('[data-o]', fs).forEach((b) => { const on = sel.includes(b.dataset.o); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.classList.toggle('dim', g.type !== 'one' && !on && sel.length >= max); });
      });
    };
    $$('[data-g]', el).forEach((fs) => $$('[data-o]', fs).forEach((b) => (b.onclick = () => {
      const gid = fs.dataset.g; const g = group(gid); const oid = b.dataset.o;
      let sel = choice[gid] || [];
      if (g.type === 'one') sel = [oid];
      else if (sel.includes(oid)) sel = sel.filter((x) => x !== oid);
      else if (sel.length < groupMax(g, choice)) sel = sel.concat(oid);
      else if (groupMax(g, choice) === 1) sel = [oid];
      else { toast(`${g.label} : ${groupMax(g, choice)} au maximum.`, 'warn'); return; }
      choice[gid] = sel;
      // taille du tacos plus petite : on garde les premières viandes choisies
      for (const [k, gg] of Object.entries(OPTION_GROUPS)) if (gg.maxFrom && choice[k]) choice[k] = choice[k].slice(0, groupMax(gg, choice));
      draw();
    })));
    $('[data-qm]', el).onclick = () => { qty = Math.max(1, qty - 1); draw(); };
    $('[data-qp]', el).onclick = () => { qty = Math.min(20, qty + 1); draw(); };
    $('[data-add]', el).onclick = () => {
      const miss = missingChoice(p, choice);
      if (miss) { const fs = $(`[data-g="${miss.gid}"]`, el); if (fs) { fs.classList.remove('shake'); void fs.offsetWidth; fs.classList.add('shake'); fs.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return; }
      const note = $('[data-note]', el).value.trim();
      if (line) { cart.lines = cart.lines.filter((l) => l.id !== line.id); }
      addToCart(p, JSON.parse(JSON.stringify(choice)), qty, note);
      close();
      toast(line ? 'Panier mis à jour.' : `${p.name} ajouté au panier.`, 'ok');
      refreshCartUI();
      if (line) openCart();
    };
    draw();
  } });
}

/* ---------- Pages spécialités (rédigées pour Google) ---------- */
function pageSeo(p) {
  const items = db.menu.filter(p.filter);
  const html = `
  <section class="seo-hero"><div class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>${esc(p.crumb)}</b></nav>
    <h1>${esc(fr(p.h1))}</h1>
    <p class="lead">${esc(fr(p.lead))}</p>
    <div class="seo-facts">${p.facts.map((f) => `<span>${icon('check')}${esc(fr(f))}</span>`).join('')}</div>
  </div></section>
  ${items.length ? `<section class="sec"><div class="wrap"><div class="sec-hd"><h2>${esc(p.itemsTitle)}</h2><a class="more" href="/carte">Toute la carte${icon('arrowR')}</a></div><div class="pgrid">${items.map(productCard).join('')}</div></div></section>` : ''}
  <section class="sec"><div class="wrap prose">${p.sections.map(([h, t]) => `<h2>${esc(fr(h))}</h2>${t.map((x) => `<p>${fr(x)}</p>`).join('')}`).join('')}
    ${p.faq ? `<h2>Questions fréquentes</h2><div class="faq">${p.faq.map(([q, a]) => `<details><summary>${esc(fr(q))}</summary><p>${fr(a)}</p></details>`).join('')}</div>` : ''}
  </div></section>
  <section class="cta-band"><div class="wrap cta-in"><div><h2>${esc(fr(p.cta || 'On s’occupe de tout'))}</h2><p>${fr('Commande en ligne en deux minutes, à emporter ou livrée.')}</p></div><a class="btn btn-light btn-lg" href="/carte">${icon('bag')}Commander</a></div></section>`;
  return page(html, { active: p.active || '' });
}

/* ---------- Infos et horaires ---------- */
function pageInfos() {
  const p = SEO_PAGES.find((x) => x.path === '/infos');
  const s = S();
  const html = `
  <section class="seo-hero"><div class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Infos et horaires</b></nav>
    <h1>Infos pratiques et horaires</h1>
    <p class="lead">${esc(fr(p.lead))}</p>
  </div></section>
  <section class="sec"><div class="wrap info-grid four">
    <div class="info-card"><h2>Horaires</h2><ul class="hours">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<li class="${new Date().getDay() === d ? 'today' : ''}"><span>${JOURS[d].charAt(0).toUpperCase() + JOURS[d].slice(1)}</span><span>${esc(hoursText(d))}</span></li>`).join('')}</ul><p class="muted small">${fr('Commande en ligne possible à l’avance pour un créneau à venir.')}</p></div>
    <div class="info-card map-card"><h2>Adresse</h2><p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p class="muted">${esc(fr(s.quarter))}</p>${mapArt()}<a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`)}" target="_blank" rel="noopener">${icon('map')}Itinéraire</a></div>
    <div class="info-card"><h2>Livraison</h2><ul class="zones small">${s.zones.map((z) => `<li><b>${esc(z.zip)}</b><span>${esc(z.label)}</span><em>${esc(eur(z.fee))}</em></li>`).join('')}</ul><p class="muted small">${fr(`Minimum ${eur(s.minDelivery)} de commande, livraison offerte dès ${eur(s.freeDeliveryFrom)}.`)}</p></div>
    <div class="info-card"><h2>Paiement</h2><p>${fr('En ligne par carte bancaire, Apple Pay ou Google Pay. Sur place ou à la livraison : espèces, carte, titres-restaurant.')}</p><h2 class="mt">Allergènes</h2><p>${fr('Une allergie ? Précisez-la dans votre commande et demandez conseil au comptoir.')}</p><button type="button" class="link" data-doc="allergenes">Voir les allergènes</button></div>
  </div></section>
  <section class="sec"><div class="wrap prose">${p.sections.map(([h, t]) => `<h2>${esc(fr(h))}</h2>${t.map((x) => `<p>${fr(x)}</p>`).join('')}`).join('')}
    <h2>Questions fréquentes</h2><div class="faq">${p.faq.map(([q, a]) => `<details><summary>${esc(fr(q))}</summary><p>${fr(a)}</p></details>`).join('')}</div></div></section>`;
  return page(html, { active: 'infos' });
}

/* ---------- Mes commandes (sur cet appareil) ---------- */
function pageMesCommandes() {
  const mine = (lsGet(CLIENT_KEY) || {}).orders || [];
  const list = mine.map(orderById).filter(Boolean);
  const html = `<div class="wrap narrow pagepad">
    <h1>Mes commandes</h1>
    <p class="muted">${fr('Les commandes passées depuis cet appareil. Suivez-les ou recommandez en un clic.')}</p>
    ${list.length ? `<div class="olist">${list.map((o) => `<a class="orow" href="/suivi/${esc(o.id)}"><span class="orow-n">N° ${esc(o.number)}</span><span class="orow-m"><b>${esc(orderLines(o).map((l) => (l.qty > 1 ? l.qty + ' × ' : '') + l.name).join(', '))}</b><small>${esc(dayLabel(new Date(o.createdAt)))} à ${esc(hm(new Date(o.createdAt)))} · ${o.mode === 'livraison' ? 'Livraison' : 'À emporter'} · ${esc(eur(o.total))}</small></span><span class="badge b-${o.status}">${esc(STATUS[o.status][0])}</span>${icon('chevR')}</a>`).join('')}</div>`
      : `<div class="empty-card">${icon('bag')}<p>Aucune commande pour le moment.</p><a class="btn btn-primary" href="/carte">Voir la carte</a></div>`}
  </div>`;
  return page(html, { active: 'commandes' });
}

function pageNotFound() {
  return page(`<div class="wrap narrow pagepad nf"><p class="kicker">Erreur 404</p><h1>Cette page n’existe pas</h1><p class="muted">${fr('Mais la carte, elle, est bien là.')}</p><a class="btn btn-primary btn-lg" href="/carte">Voir la carte</a></div>`);
}
