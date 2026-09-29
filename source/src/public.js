/* =====================================================================
   SITE CLIENT : recherche, véhicules, options, coordonnées, paiement
   ===================================================================== */
const ui = { grp: 'all', auto: false, sort: 'prix' };
/* Particulier : prix TTC. Professionnel : prix HT, TVA indiquée, facture au nom de la société. */
const isPro = () => !!(draft && draft.pro);
const ht = (ttc) => round2(ttc / (1 + db.settings.vat / 100));
const money = (ttc, dec) => eur(isPro() ? ht(ttc) : ttc, dec);
const taxTag = () => (isPro() ? ' HT' : '');
function taxSwitch() {
  return `<div class="tax-switch"><span>Vous êtes</span><div class="seg" role="group" aria-label="Type de client"><button type="button" class="${isPro() ? '' : 'on'}" data-pro-set="0">Particulier</button><button type="button" class="${isPro() ? 'on' : ''}" data-pro-set="1">Professionnel</button></div></div>`;
}
function bindTaxSwitch() {
  $$('[data-pro-set]').forEach((b) => (b.onclick = () => {
    draft.pro = b.dataset.proSet === '1';
    if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
    saveDraft();
    rerender();
  }));
}

/* ---------- Catégories de la flotte (filtres, menus, pages catégories) ---------- */
const GROUPS = [
  { id: 'all', label: 'Tous', title: 'Nos véhicules', test: () => true, txt: 'Citadines, compactes premium, berline électrique, SUV 7 places et utilitaires jusqu’à 20 m³ : toute la flotte, entretenue et préparée avant chaque départ.' },
  { id: 'voiture', label: 'Voitures', title: 'Voitures', test: (v) => v.category === 'voiture', txt: 'De la citadine au SUV premium, des voitures récentes pour la ville, les week-ends et les vacances.' },
  { id: 'citadine', label: 'Citadines', title: 'Citadines', test: (v) => v.category === 'voiture' && v.shape === 'citadine', txt: 'Compactes, sobres et faciles à garer : idéales pour Bordeaux et les trajets du quotidien.' },
  { id: 'berline', label: 'Berlines', title: 'Berlines et compactes premium', test: (v) => v.category === 'voiture' && v.shape === 'berline', txt: 'Le confort d’une compacte premium ou le silence d’une berline électrique, pour vos rendez-vous comme pour la route.' },
  { id: 'suv', label: 'SUV', title: 'SUV', test: (v) => v.category === 'voiture' && v.shape === 'suv', txt: 'De la place pour toute la famille avec le SUV 7 places, ou le prestige d’un SUV premium.' },
  { id: 'utilitaire', label: 'Utilitaires', title: 'Utilitaires', test: (v) => v.category === 'utilitaire', txt: 'Du petit fourgon de 3 m³ au 20 m³ avec hayon, tous conduits avec le permis B. Kit déménagement disponible.' },
  { id: 'minibus', label: 'Minibus', title: 'Minibus', test: (v) => v.shape === 'minibus', txt: 'Neuf places pour les sorties en groupe, les équipes et les événements.' },
];
const grp = (id) => GROUPS.find((g) => g.id === id) || GROUPS[0];
/** Adresse du catalogue d'une catégorie (« /vehicules » pour toute la flotte). */
const catHref = (id) => (!id || id === 'all' ? '/vehicules' : '/vehicules/' + id);
const groupsOf = (v) => GROUPS.filter((g) => g.id !== 'all' && g.test(v)).map((g) => g.id);
const liveFleet = () => db.vehicles.filter((v) => v.status === 'actif' && !v.deleted);
/** Catégorie principale d'un véhicule (fil d'Ariane, suggestions). */
const mainGroup = (v) => (v.shape === 'minibus' ? grp('minibus') : v.category === 'utilitaire' ? grp('utilitaire') : grp(['citadine', 'berline', 'suv'].find((k) => grp(k).test(v)) || 'voiture'));
const BRANDS = ['Renault', 'Peugeot', 'Mercedes', 'Mercedes-Benz', 'Tesla', 'Fiat', 'Citroën', 'Volkswagen', 'BMW', 'Audi', 'Toyota', 'Ford', 'Opel', 'Nissan', 'Dacia', 'Kia', 'Hyundai', 'Skoda', 'Seat', 'Iveco', 'Cupra', 'Volvo'];
function brandModel(v) {
  const [b, ...rest] = String(v.name || '').split(' ');
  return BRANDS.includes(b) && rest.length ? { brand: b, model: rest.join(' ') } : { brand: '', model: v.name };
}
const nameDash = (v) => { const x = brandModel(v); return x.brand ? `${x.brand} - ${x.model}` : x.model; };
const intlPhone = () => { const d = String(db.settings.phone || '').replace(/\D/g, ''); return d.startsWith('0') ? '33' + d.slice(1) : d; };
const waHref = (text) => `https://wa.me/${intlPhone()}${text ? '?text=' + encodeURIComponent(text) : ''}`;
const telHref = () => `tel:${String(db.settings.phone || '').replace(/\s/g, '')}`;
const fleetFrom = () => Math.min(...liveFleet().map((v) => v.price));

/** Photo « studio » façon catalogue : mur sombre avec le logo, sol clair, véhicule détouré. */
function studioShot(v, { big = false } = {}) {
  const ph = PHOTOS[v.id];
  const cut = !v.photo && ph?.cut;
  const s = db.settings;
  const logo = s.logo ? `<img src="${s.logo}" alt="">` : `<img src="${ASSETS.mark}" alt=""><i></i><img src="${ASSETS.word}" alt="">`;
  if (!cut && v.photo) return `<div class="shot own ${big ? 'big' : ''}"><img class="shot-photo" src="${esc(v.photo)}" alt="${esc(v.name)}" decoding="async"></div>`;
  // site en ligne : image réduite pour les cartes, pleine taille pour la fiche (écrans haute définition)
  const set = cut && ph.cutSm ? ` srcset="${ph.cutSm} ${ph.smW}w, ${cut} ${ph.w}w" sizes="${big ? '(max-width: 960px) 92vw, 780px' : '(max-width: 540px) 82vw, (max-width: 1180px) 45vw, 420px'}"` : '';
  const car = cut ? `<img class="shot-car" src="${cut}"${set} alt="${esc(v.name)}"${big ? '' : ' loading="lazy"'} decoding="async">` : `<div class="shot-svg">${carSVG(v.shape, v.color, { label: v.name })}</div>`;
  return `<div class="shot ${big ? 'big' : ''}"><span class="shot-logo" aria-hidden="true">${logo}</span>${car}</div>`;
}
/** Carte véhicule (catalogue) : photo studio, prix, modèle, trois caractéristiques. */
function rcard(v, { search = false } = {}) {
  const ok = search ? isAvailable(v.id, draft.from, draft.to) : true;
  let price;
  if (search) {
    const q = quoteSearch(v);
    price = `<span class="rc-tot">${money(q.total)}${taxTag()}</span> pour ${plural(q.days, 'jour')}${q.pct ? `<span class="rc-off">−${q.pct} %</span>` : ''}`;
  } else price = `À partir de <b>${money(v.price)}${taxTag()}</b>/jour`;
  const nf = ok ? null : nextFree(v.id, draft.from, draft.to);
  const first = v.category === 'utilitaire' && v.volume ? [icon('box'), `${String(v.volume).replace('.', ',')} m³`] : [icon('seats'), `${v.seats} places`];
  return `<a class="rcard ${ok ? '' : 'unavail'}" href="${vehicleHref(v)}" data-grp="${groupsOf(v).join(' ')}" data-v="${esc(v.id)}">
    ${studioShot(v)}
    <div class="rc-b">
      <div class="rc-p">${price}</div>
      <div class="rc-n">${esc(nameDash(v))}${v.similar ? '<small> ou similaire</small>' : ''}</div>
      <div class="rc-s"><span>${first[0]}${esc(first[1])}</span><span>${icon('fuel')}${esc(v.fuel)}</span><span>${icon('gear')}${v.gearbox === 'Automatique' ? 'Auto' : 'Manuelle'}</span></div>
      ${ok ? '' : `<div class="rc-na">${nf ? `Libre à partir du ${esc(fmtDay(nf))} à ${hm(nf).replace(':', 'h')}` : 'Indisponible sur vos dates'}</div>`}
    </div>
  </a>`;
}
/** Lieux de départ (accueil et page agences). */
function placeCard(a, tag = 'h3') {
  return `<div class="place">
    <div class="pl-ic">${icon(a.id === 'livraison' ? 'route' : a.id === 'aeroport' ? 'globe' : a.id === 'gare' ? 'clock' : 'pin')}</div>
    <${tag}>${esc(a.name)}</${tag}>
    <p>${esc(a.address)}</p>
    <p class="muted">${esc(a.note || '')}</p>
    <div class="pl-fee">${a.fee ? `Frais de remise : <b>${eur(a.fee)}</b>` : '<b>Sans frais</b>'}</div>
    <button type="button" class="btn-line" data-ag="${esc(a.id)}">Réserver ici</button>
  </div>`;
}

function demoBar(mode) {
  if (typeof INDEXABLE !== 'undefined' && INDEXABLE) return '';
  return `<div class="demo-bar"><div class="demo-bar-in">
    <span><b>Démonstration</b> · ${esc(db.settings.brand)} · les données restent dans ce navigateur</span>
    <nav class="demo-switch" aria-label="Changer de vue"><a href="/" class="${mode === 'site' ? 'on' : ''}">Site client</a><a href="/gestion" class="${mode === 'admin' ? 'on' : ''}">Logiciel du loueur</a></nav>
    <button type="button" class="demo-install" data-install hidden>${icon('download')}Installer l’app</button>
    <a href="#" class="demo-reset" data-reset>Réinitialiser</a>
  </div></div>`;
}
function siteHeader(active) {
  const s = db.settings;
  const sess = session();
  const c = sess && customer(sess.customerId);
  const fleet = liveFleet();
  const dd = GROUPS.filter((g) => g.id !== 'all' && fleet.some(g.test)).map((g) => `<a href="/vehicules/${g.id}">${esc(g.label)}</a>`).join('') + '<a href="/vehicules" class="dd-all">Tous les véhicules</a>';
  return `<div class="topline"><div class="wrap">
      <a href="${telHref()}">${icon('phone')}<span>${esc(s.phone)}</span></a>
      <span>${icon('pin')}<span>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</span></span>
      <span class="tl-right"><span>${icon('clock')}<span>${esc(weekHoursText())}</span></span><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a></span>
    </div></div>
    <header class="site-header"><div class="wrap">
      ${logoHTML(false)}
      <nav class="site-nav" aria-label="Navigation principale">
        <a href="/" class="${active === 'home' ? 'on' : ''}">Accueil</a>
        ${megaMenuHTML(active)}
        <div class="dd"><a href="/vehicules" class="${active === 'vehicules' ? 'on' : ''}">Véhicules${icon('chevD')}</a><div class="dd-m">${dd}</div></div>
        ${SEO_BY_PATH[SALE_HUB] ? `<a href="${SALE_HUB}" class="${active === 'vente' ? 'on' : ''}">Achat-vente</a>` : ''}
        <a href="/agences" class="${active === 'agences' ? 'on' : ''}">Agences</a>
        <a href="/professionnels" class="${active === 'pro' ? 'on' : ''}">Professionnels</a>
        ${GUIDES.length ? `<a href="/guides" class="${active === 'guides' ? 'on' : ''}">Guides</a>` : ''}
      </nav>
      <div class="actions">
        <a class="btn-pill" href="/contact">${icon('plus')}Contact</a>
        <a class="hd-user" href="/compte" aria-label="Mon espace client">${icon('user')}<span>${c ? esc(c.firstName) : 'Mon espace'}</span></a>
        <button type="button" class="menu-btn" data-menu aria-label="Ouvrir le menu"><span>Menu</span><i></i></button>
      </div>
    </div></header>`;
}
function siteFooter() {
  const s = db.settings;
  return `<footer class="site-footer">
    <div class="wrap ft-top">${logoHTML(false)}<nav class="ft-nav" aria-label="Pied de page"><a href="/vehicules">Nos véhicules</a><a href="/agences">Agences</a><a href="/professionnels">Professionnels</a><a href="/contact">Contact</a></nav></div>
    <div class="ft-line"></div>
    <nav aria-label="Plan du site">${seoLinksHTML()}</nav>
    <div class="ft-line"></div>
    <div class="wrap ft-grid">
      <div><p class="ft-h">Notre agence</p><p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p><p class="ft-hours">${esc(weekHoursText())}</p></div>
      <div><p class="ft-h">Contact</p><a class="ft-phone" href="${telHref()}">${esc(s.phone)}</a>${s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : ''}<a href="${waHref()}" target="_blank" rel="noopener">Écrire sur WhatsApp</a></div>
      <div><p class="ft-h">Informations</p><a href="/conditions-de-location">Conditions de location</a><a href="#" data-doc="cgv">Conditions générales de location</a><a href="#" data-doc="mentions">Mentions légales</a><a href="#" data-doc="credits">Crédits photos</a><a href="/compte">Mon espace client</a><a href="#" data-app>Installer l’application</a></div>
    </div>
    <div class="wrap ft-bottom"><span>${esc(s.brand)} © ${new Date().getFullYear()}. Tous droits réservés.</span><span class="ft-legal">${esc(s.legalName)}, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}</span><span class="ft-social"><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a><a href="${telHref()}" aria-label="Appeler">${icon('phone')}</a></span></div>
  </footer>`;
}
function publicPage(inner, { active = '', footer = true } = {}) {
  return demoBar('site') + siteHeader(active) + `<main id="main">${inner}</main>` + (footer ? siteFooter() : '')
    + `<a class="fab-wa" href="${waHref('Bonjour, je souhaite louer un véhicule.')}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${icon('wa')}</a><button type="button" class="fab-top" data-top aria-label="Revenir en haut de la page">${icon('chevU')}</button>`;
}
/** Menu du téléphone (et de l'ordinateur via l'icône ☰). */
function openMenu() {
  if ($('.mmenu')) return;
  const s = db.settings;
  const fleet = liveFleet();
  const el = document.createElement('div');
  el.className = 'mmenu';
  el.innerHTML = `<div class="mm-ov" data-mclose></div><aside class="mm-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="mm-hd">${logoHTML(false)}<button type="button" class="icon-btn" data-mclose aria-label="Fermer le menu">${icon('x')}</button></div>
    <nav class="mm-nav">
      <a href="/">Accueil</a>
      <a href="/vehicules">Nos véhicules</a>
      <div class="mm-sub">${GROUPS.filter((g) => g.id !== 'all' && fleet.some(g.test)).map((g) => `<a href="/vehicules/${g.id}">${esc(g.label)}</a>`).join('')}</div>
      ${navGroups().filter((g) => g.t !== 'Infos pratiques').map((g) => `<details class="mm-acc"><summary>${esc(g.t)}${icon('chevD')}</summary><div class="mm-sub">${g.items.map(([p, l]) => `<a href="${p}">${esc(l)}</a>`).join('')}</div></details>`).join('')}
      <a href="/agences">Agences et horaires</a>
      <a href="/professionnels">Professionnels</a>
      ${GUIDES.length ? '<a href="/guides">Guides pratiques</a>' : ''}
      ${pageExists('/faq') && SEO_BY_PATH['/faq'] ? '<a href="/faq">Questions fréquentes</a>' : ''}
      <a href="/contact">Contact</a>
      <a href="/compte">Mon espace client</a>
    </nav>
    <div class="mm-ct">
      <a class="mm-phone" href="${telHref()}">${esc(s.phone)}</a>
      <a class="btn btn-wa btn-block" href="${waHref()}" target="_blank" rel="noopener">${icon('wa')}Écrire sur WhatsApp</a>
      <button type="button" class="btn btn-ghost btn-block" data-app>${icon('download')}Installer l’application</button>
      <p>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p>
      <p>${esc(weekHoursText())}</p>
    </div>
  </aside>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('menu-on');
  requestAnimationFrame(() => el.classList.add('open'));
  const close = () => { el.classList.remove('open'); document.documentElement.classList.remove('menu-on'); document.removeEventListener('keydown', onKey); setTimeout(() => el.remove(), 380); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  el.addEventListener('click', (e) => { if (e.target.closest('[data-mclose]') || e.target.closest('a[href]') || e.target.closest('[data-app]')) close(); });
  setTimeout(() => $('.mm-nav a', el)?.focus({ preventScroll: true }), 60);
}
/* Actions communes du site (délégation : un seul écouteur pour toutes les pages). */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-top],[data-menu],[data-app]');
  if (!t) return;
  e.preventDefault();
  if (t.matches('[data-top]')) window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  else if (t.matches('[data-menu]')) openMenu();
  else installApp();
});

/* ---------- Présentation des véhicules ---------- */
function specsHTML(v) {
  const items = [[icon('seats'), `${v.seats} places`], [icon('gear'), v.gearbox], [icon('fuel'), v.fuel]];
  if (v.category === 'utilitaire' && v.volume) items.push([icon('box'), `${String(v.volume).replace('.', ',')} m³`]);
  else items.push([icon('door'), `${v.doors} portes`]);
  if (v.category === 'utilitaire' && v.payload) items.push([icon('weight'), `${v.payload} kg de charge`]);
  else if (v.ac) items.push([icon('snow'), 'Climatisation']);
  return items.map(([i, t]) => `<span>${i}${esc(t)}</span>`).join('');
}
function kmText(v, q) {
  if (q.kmIncluded == null) return 'Kilométrage illimité';
  return `${q.kmIncluded.toLocaleString('fr-FR')} km inclus, puis ${eur(v.extraKm, true)} par km`;
}
function quoteSearch(v, extra = {}) {
  return quote({ vehicleId: v.id, from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, ...extra });
}
function tripBar(step) {
  const aS = agency(draft.agencyStart);
  const aE = agency(draft.agencyEnd);
  const steps = ['Véhicule', 'Options', 'Coordonnées', 'Paiement'];
  return `<div class="book-top"><div class="wrap">
    <div class="trip">
      <div class="pt"><b>${esc(aS.short)}</b><span>${esc(fmtDay(draft.from))} · ${hm(parse(draft.from)).replace(':', 'h')}</span></div>
      <span class="arrow">${icon('arrowR')}</span>
      <div class="pt"><b>${esc(aE.short)}</b><span>${esc(fmtDay(draft.to))} · ${hm(parse(draft.to)).replace(':', 'h')}</span></div>
      <button class="btn btn-ghost btn-sm" data-edit-search>${icon('edit')}Modifier</button>
    </div>
    <div class="stepper" aria-label="Étapes">${steps.map((s, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i + 1 === step ? 'on' : i + 1 < step ? 'done' : ''}"><i>${i + 1 < step ? '✓' : i + 1}</i><span>${s}</span></span>`).join('')}</div>
  </div></div>`;
}

/* ---------- Formulaire de recherche (accueil et « Modifier ») ---------- */
function agencyOptions(sel) {
  return db.agencies.map((a) => `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.name)}${a.fee ? ` (+${eur(a.fee)})` : ''}</option>`).join('');
}
function searchFormHTML(st) {
  const kind = st.kind || (['utilitaire', 'minibus'].includes(ui.grp) ? 'utilitaire' : 'voiture');
  const f = dateBits(st.from), t = dateBits(st.to);
  const diff = st.sameAgency === false;
  const pro = st.pro != null ? st.pro : isPro();
  return `<form class="sx" novalidate>
    <div class="sx-top">
      <div class="sx-tabs" role="group" aria-label="Type de véhicule">
        <button type="button" class="sx-tab ${kind === 'voiture' ? 'on' : ''}" data-kind="voiture" aria-pressed="${kind === 'voiture'}">${icon('car')}Voitures</button>
        <button type="button" class="sx-tab ${kind === 'utilitaire' ? 'on' : ''}" data-kind="utilitaire" aria-pressed="${kind === 'utilitaire'}">${icon('van')}Utilitaires</button>
      </div>
      <a class="sx-link" href="/compte">Voir / modifier ma réservation</a>
    </div>
    <div class="sx-row ${diff ? 'diff' : ''}">
      <div class="sx-f sx-place"><span class="sx-l" data-start-l>${diff ? 'Retrait' : 'Retrait et retour'}</span><label class="sx-box">${icon('pin')}<select name="agencyStart" aria-label="Lieu de retrait">${agencyOptions(st.agencyStart)}</select></label></div>
      <div class="sx-f sx-place" data-end ${diff ? '' : 'hidden'}><span class="sx-l">Retour</span><label class="sx-box">${icon('pin')}<select name="agencyEnd" aria-label="Lieu de retour">${agencyOptions(st.agencyEnd)}</select><button type="button" class="sx-x" data-same aria-label="Rendre le véhicule au même endroit">${icon('x')}</button></label></div>
      <button type="button" class="sx-add" data-other ${diff ? 'hidden' : ''}>${icon('plus')}Lieu de retour différent</button>
      <div class="sx-f"><span class="sx-l">Date de départ</span><button type="button" class="sx-box sx-date" data-dates>${icon('cal')}<b data-from>${esc(f.d)}</b><i></i><b data-from-t>${f.t}</b></button></div>
      <div class="sx-f"><span class="sx-l">Date de retour</span><button type="button" class="sx-box sx-date" data-dates>${icon('cal')}<b data-to>${esc(t.d)}</b><i></i><b data-to-t>${t.t}</b></button></div>
      <button class="sx-go" type="submit">Voir les véhicules</button>
    </div>
    <div class="sx-bottom">
      <label class="sx-mini">${icon('user')}<select name="pro" aria-label="Type de client"><option value="0" ${pro ? '' : 'selected'}>Particulier</option><option value="1" ${pro ? 'selected' : ''}>Professionnel (prix HT)</option></select>${icon('chevD')}</label>
      <span class="sx-hours">${icon('clock')}${esc(weekHoursText())}</span>
    </div>
  </form>`;
}
function dateBits(iso) { const d = parse(iso); return d ? { d: `${d.getDate()} ${MOIS_C[d.getMonth()]}`, t: hm(d) } : { d: 'à choisir', t: '' }; }
function bindSearchForm(root, st, onSubmit) {
  const form = $('.sx', root);
  if (!form) return;
  if (st.pro == null) st.pro = isPro();
  const refresh = () => {
    const f = dateBits(st.from), t = dateBits(st.to);
    $('[data-from]', form).textContent = f.d; $('[data-from-t]', form).textContent = f.t;
    $('[data-to]', form).textContent = t.d; $('[data-to-t]', form).textContent = t.t;
  };
  $$('[data-kind]', form).forEach((b) => (b.onclick = () => { st.kind = b.dataset.kind; $$('[data-kind]', form).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); }); }));
  $$('[data-dates]', form).forEach((b) => (b.onclick = () => openDatePicker(st, (f, t) => { st.from = f; st.to = t; refresh(); })));
  const setDiff = (on) => {
    st.sameAgency = !on;
    $('[data-end]', form).hidden = !on;
    $('[data-other]', form).hidden = on;
    $('.sx-row', form).classList.toggle('diff', on);
    $('[data-start-l]', form).textContent = on ? 'Retrait' : 'Retrait et retour';
    st.agencyEnd = on ? form.agencyEnd.value : st.agencyStart;
  };
  form.agencyStart.onchange = () => { st.agencyStart = form.agencyStart.value; if (st.sameAgency !== false) st.agencyEnd = st.agencyStart; };
  form.agencyEnd.onchange = () => { st.agencyEnd = form.agencyEnd.value; };
  $('[data-other]', form).onclick = () => setDiff(true);
  $('[data-same]', form).onclick = (e) => { e.preventDefault(); setDiff(false); };
  form.pro.onchange = () => { st.pro = form.pro.value === '1'; };
  form.onsubmit = (e) => {
    e.preventDefault();
    if (st.sameAgency !== false) st.agencyEnd = st.agencyStart;
    const err = searchError(st);
    if (err) { toast(err, 'warn'); return; }
    onSubmit(st);
  };
}
function openSearchModal() {
  const fam = ['utilitaire', 'minibus'].includes(ui.grp) ? 'utilitaire' : 'voiture';
  const st = { from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, sameAgency: draft.agencyStart === draft.agencyEnd, kind: fam, pro: isPro() };
  openModal({
    title: 'Modifier la recherche',
    wide: true,
    body: `<div class="sx-modal">${searchFormHTML(st)}</div>`,
    onMount: (m, close) => {
      bindSearchForm(m, st, (res) => {
        draft.from = res.from; draft.to = res.to; draft.agencyStart = res.agencyStart; draft.agencyEnd = res.agencyEnd; draft.pro = !!res.pro;
        if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
        if (res.kind !== fam) ui.grp = res.kind;
        if (draft.vehicleId && !isAvailable(draft.vehicleId, draft.from, draft.to)) { toast('Ce véhicule n’est plus libre sur ces dates : choisissez-en un autre.', 'warn'); draft.vehicleId = null; saveDraft(); close(); go(catHref(ui.grp)); return; }
        saveDraft(); close();
        if (curPath().startsWith('/vehicules') && res.kind !== fam) go(catHref(ui.grp)); else render();
      });
    },
  });
}

/* ---------- Accueil ---------- */
function homeSearchState() {
  return { ...defaultSearch(), ...(draft && draft.from && !searchError(draft) ? { from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, sameAgency: draft.agencyStart === draft.agencyEnd } : {}), pro: isPro() };
}
const TESTIMONIALS = [
  { name: 'Sophie L.', text: 'Réservation faite en cinq minutes sur mon téléphone, et la Clio m’attendait à l’heure devant chez moi. Véhicule impeccable, je recommande.', meta: 'Citadine livrée à domicile · Bordeaux' },
  { name: 'Karim B.', text: 'Master 12 m³ pour notre déménagement : véhicule propre, kit de déménagement prêt dans le coffre et un accueil très professionnel à Yvrac.', meta: 'Utilitaire · Cenon' },
  { name: 'Élodie M.', text: 'Le 5008 sept places était parfait pour nos vacances en famille. L’annulation gratuite et la caution non débitée nous ont rassurés.', meta: 'SUV 7 places · Lormont' },
  { name: 'Thomas R.', text: 'Nous louons régulièrement des utilitaires pour nos chantiers : prix hors taxes, facture au nom de la société et paiement par virement, c’est exactement ce qu’il nous fallait.', meta: 'Client professionnel · bâtiment' },
];
function phoneMock() {
  if (typeof APP_SHOT === 'string' && APP_SHOT) {
    return `<div class="phone" aria-hidden="true"><div class="ph-scr ph-real"><img class="ph-shot" src="${APP_SHOT}" alt=""><div class="ph-bar"><b>9:41</b><span><i></i><i></i><i></i></span></div></div></div>`;
  }
  const glc = vehicle('v-glc') || liveFleet()[0];
  return `<div class="phone" aria-hidden="true"><div class="ph-scr">
    <div class="ph-status"><b>9:41</b><span><i></i><i></i><i></i></span></div>
    <div class="ph-hd"><img src="${ASSETS.mark}" alt=""><img src="${ASSETS.word}" alt=""></div>
    <div class="ph-h1">Location de voitures et d’utilitaires</div>
    <div class="ph-search"><div class="ph-tabs"><i class="on">Voitures</i><i>Utilitaires</i></div><div class="ph-f">${icon('pin')}Agence d’Yvrac</div><div class="ph-2"><div class="ph-f">${icon('cal')}30 sept.</div><div class="ph-f">${icon('cal')}3 oct.</div></div><div class="ph-go">Voir les véhicules</div></div>
    ${glc ? `<div class="ph-card">${studioShot(glc)}<b>${esc(nameDash(glc))}</b><span>À partir de ${eur(glc.price)}/jour</span></div>` : ''}
    <div class="ph-nav"><i class="on"></i><i></i><i></i><i></i></div>
  </div></div>`;
}
function pageHome() {
  const s = db.settings;
  const st = homeSearchState();
  const fleet = liveFleet();
  const withCut = (v) => v && v.status === 'actif' && !v.deleted && PHOTOS[v.id]?.cut && !v.photo;
  let stage = ['v-glc', 'v-tesla', 'v-classea', 'v-5008', 'v-master12'].map(vehicle).filter(withCut);
  if (!stage.length) stage = fleet.filter(withCut).slice(0, 5);
  const vans = fleet.filter((v) => v.category === 'utilitaire');
  const van = vehicle('v-master12') && withCut(vehicle('v-master12')) ? vehicle('v-master12') : vans.find(withCut);
  const minVan = vans.length ? Math.min(...vans.map((v) => v.price)) : null;
  const brands = [...new Set(fleet.map((v) => brandModel(v).brand).filter(Boolean).map((b) => (b === 'Mercedes' ? 'Mercedes-Benz' : b)))];
  const pills = GROUPS.filter((g) => fleet.some(g.test)).map((g) => `<button type="button" class="pill ${g.id === 'all' ? 'on' : ''}" data-hg="${g.id}" aria-pressed="${g.id === 'all'}">${esc(g.label)}</button>`).join('');
  const why = [
    ['Une flotte récente et soignée', 'Des véhicules récents, entretenus dans les règles et préparés avant chaque départ : nettoyés, vérifiés, le plein fait. Vous prenez la route l’esprit tranquille, que ce soit pour la journée ou pour un mois.'],
    ['Un service sur mesure', `Retrait à l’agence d’Yvrac, remise en gare Saint-Jean, à l’aéroport de Mérignac ou livraison à votre adresse. Une question avant de réserver ? Nous répondons par téléphone au ${s.phone} ou sur WhatsApp.`],
    ['Tout se fait en ligne', `Réservez en quelques minutes et payez par carte, en 3 ou 4 fois, ou par virement pour les professionnels. La caution n’est jamais débitée et l’annulation reste gratuite jusqu’à ${s.freeCancelHours} h avant le départ.`],
  ];
  const html = `
  <section class="hero2">
    <div class="h2-stage" aria-hidden="true"><div class="h2-glow"></div><canvas class="sr-dust"></canvas></div>
    <div class="wrap h2-in">
      <h1 data-words>Location de voitures et d’utilitaires à <span class="gold-text">Bordeaux</span></h1>
      <p class="h2-sub" data-reveal style="--d:.35s">Entrez dans l’univers ${esc(s.brand)} : citadines, SUV premium et utilitaires jusqu’à 20 m³, réservés et payés en ligne en quelques minutes.</p>
      <div class="search-card" data-reveal style="--d:.5s">${searchFormHTML(st)}</div>
    </div>
    ${stage.length ? `<div class="h2-cars">${stage.map((v, i) => `<img class="h2-car ${i === 0 ? 'on' : ''}" src="${PHOTOS[v.id].cut}" alt="${esc(v.name)}" data-v="${esc(v.id)}">`).join('')}</div>
    <div class="wrap h2-foot">
      <a class="h2-cap" href="${vehicleHref(stage[0])}" data-cap><span data-cap-seg>${esc(stage[0].segment)}</span><b data-cap-name>${esc(nameDash(stage[0]))}</b><span>À partir de <b data-cap-price>${money(stage[0].price)}${taxTag()}</b> par jour</span></a>
      <div class="h2-dots">${stage.map((v, i) => `<button type="button" class="${i ? '' : 'on'}" aria-label="${esc(v.name)}"></button>`).join('')}</div>
    </div>` : ''}
  </section>

  <section class="section-sm"><div class="wrap"><div class="promos">
    <article class="promo promo-app" data-reveal>
      <div class="promo-art">${phoneMock()}</div>
      <div class="promo-copy">
        <h2>Réservez et gérez vos locations, tout au même endroit</h2>
        <p>L’application ${esc(s.brand.split(' ')[0])} : réservation, documents et suivi de vos locations, même hors connexion.</p>
        <button type="button" class="btn-line" data-app>Installer l’application</button>
      </div>
    </article>
    <article class="promo promo-pro" data-reveal style="--d:.12s">
      <div class="promo-art">${van ? `<img class="promo-van" src="${PHOTOS[van.id].cut}" alt="">` : ''}${minVan != null ? `<span class="ptag"><small>À partir de</small><b>${eur(Math.floor(ht(minVan)))}</b><small>HT par jour</small></span>` : ''}</div>
      <div class="promo-copy">
        <h2>Louez un utilitaire pour votre activité</h2>
        <p>Profitez des tarifs professionnels : prix hors taxes, facture au nom de votre société et paiement par virement.</p>
        <a class="btn-line" href="/professionnels">Découvrir l’offre pro</a>
      </div>
    </article>
  </div></div></section>

  <section class="tagline"><div class="wrap"><p data-reveal>Que vous ayez besoin d’une voiture pour le week-end, d’un SUV pour les vacances ou d’un utilitaire pour déménager, ${esc(s.brand)} vous offre une location simple, rapide et soignée, adaptée à vos besoins.</p></div></section>

  <section class="section" id="vehicules"><div class="wrap">
    <h2 class="sec-title" data-reveal>Nos véhicules</h2>
    <div class="pillbar" role="group" aria-label="Catégories de véhicules">${pills}</div>
    <div class="rgrid" data-stagger>${fleet.map((v) => rcard(v)).join('')}</div>
  </div></section>

  <section class="section why"><div class="wrap">
    <h2 class="sec-title" data-reveal>Pourquoi nous choisir ?</h2>
    <div class="why-grid">${why.map(([h, p], i) => `<div class="why-i" data-reveal style="--d:${i * 0.15}s"><span class="why-n">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div></section>

  <section class="section-sm"><div class="wrap duo">
    <a class="duo-c light" href="/vehicules" data-reveal><h3>Vous recherchez un véhicule ?</h3><p>Citadine, berline électrique, SUV 7 places ou utilitaire jusqu’à 20 m³ : trouvez le véhicule qu’il vous faut à partir de ${eur(fleetFrom())} par jour et réservez-le en ligne.</p><span class="duo-go">Voir les véhicules ${icon('arrowR')}</span></a>
    <a class="duo-c gold" href="/professionnels" data-reveal style="--d:.12s"><h3>Vous êtes un professionnel ?</h3><p>Artisans, entreprises, déménageurs : tarifs hors taxes, facture au nom de votre société, paiement par virement et utilitaires disponibles toute l’année.</p><span class="duo-go">L’offre professionnels ${icon('arrowR')}</span></a>
  </div></section>

  ${homeSaleHTML()}

  <section class="places-band"><div class="wrap">
    <h2 class="sec-title" data-reveal>Où récupérer votre véhicule ?</h2>
    <p class="sec-sub" data-reveal>${esc(weekHoursText())}</p>
    <div class="places" data-stagger>${db.agencies.map(placeCard).join('')}</div>
  </div></section>

  ${INDEXABLE ? '' : `<section class="section"><div class="wrap">
    <h2 class="sec-title" data-reveal>Témoignages</h2>
    <div class="tst" data-tst><div class="tst-track">${TESTIMONIALS.map((t) => `<figure class="tst-c"><div class="tst-hd"><b>${esc(t.name)}</b><span class="tst-q" aria-hidden="true">“</span></div><div class="tst-st" aria-label="5 étoiles sur 5">★★★★★</div><blockquote>${esc(t.text)}</blockquote><figcaption>${esc(t.meta)}</figcaption></figure>`).join('')}</div></div>
    <div class="tst-dots"></div>
    <p class="tst-note">Avis d’exemple pour la démonstration : ils seront remplacés par vos avis clients.</p>
  </div></section>`}

  <section class="section-sm"><div class="wrap"><div class="brand-3d" data-reveal><canvas class="band-canvas" aria-label="Le P de PRISMA en trois dimensions"></canvas><div class="copy"><img src="${ASSETS.wordmark}" alt="${esc(s.brand)}, ${esc(s.tagline)}"><p>Une flotte entretenue, préparée avant chaque départ et livrée où vous le souhaitez. La lumière d’un prisme : un seul faisceau, toutes les nuances.</p></div></div></div></section>

  ${brands.length ? `<section class="section brands"><div class="wrap"><h2 class="sec-title" data-reveal>Nos marques</h2></div><div class="marquee" aria-label="${esc(brands.join(', '))}"><div class="mq-track">${brands.concat(brands, brands, brands).map((b) => `<span>${esc(b.toUpperCase())}</span>`).join('')}</div></div></section>` : ''}

  ${homeSeoHTML()}

  <section class="section" id="faq" style="padding-top:0"><div class="wrap" style="max-width:860px">
    <h2 class="sec-title" data-reveal>Questions fréquentes</h2>
    <div class="faq" data-stagger>${(homeFaqItems() || [
      { q: 'Quels documents faut-il présenter au départ ?', a: 'Votre permis de conduire, une pièce d’identité et une carte bancaire à votre nom pour la caution. Les professionnels ajoutent un extrait Kbis de moins de trois mois.' },
      { q: 'Comment fonctionne la caution ?', a: 'C’est une empreinte bancaire prise au départ : elle n’est pas débitée. Elle est libérée au retour du véhicule, déduction faite d’éventuels frais (carburant, kilomètres supplémentaires, dommages).' },
      { q: 'Quel âge et quelle ancienneté de permis ?', a: `${s.minAge} ans minimum et deux ans de permis pour la plupart des véhicules. Certains modèles demandent davantage : c’est indiqué sur leur fiche. Un supplément jeune conducteur s’applique aux permis de moins de ${s.youngYears} ans.` },
      { q: 'Puis-je annuler ou modifier ma réservation ?', a: `Oui, gratuitement jusqu’à ${s.freeCancelHours} heures avant le départ, depuis votre espace client ou par téléphone.` },
      { q: 'Faut-il un permis spécial pour les utilitaires ?', a: 'Non. Tous nos utilitaires, y compris le 20 m³ avec hayon, pèsent moins de 3,5 tonnes et se conduisent avec le permis B.' },
    ]).map((f) => `<details><summary>${esc(stripTags(f.q))}</summary><p>${f.a}</p></details>`).join('')}</div>
    ${SEO_BY_PATH['/faq'] ? '<p class="faq-more"><a class="more-link" href="/faq">Toutes les questions <i>' + icon('plus') + '</i></a></p>' : ''}
  </div></section>`;
  return publicPage(html, { active: 'home' });
}
function mountHome() {
  const card = $('.search-card');
  if (!card) return;
  const st = homeSearchState();
  bindSearchForm(card, st, (res) => {
    ui.grp = res.kind === 'utilitaire' ? 'utilitaire' : 'voiture';
    draft = { ...(draft || {}), from: res.from, to: res.to, agencyStart: res.agencyStart, agencyEnd: res.agencyEnd, pro: !!res.pro, vehicleId: null, options: {}, promo: null };
    if (draft.customer) draft.customer.type = draft.pro ? 'professionnel' : 'particulier';
    saveDraft();
    go(catHref(ui.grp));
  });
  // filtre du catalogue, sans recharger la page
  $$('[data-hg]').forEach((b) => (b.onclick = () => {
    const g = b.dataset.hg;
    $$('[data-hg]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    $$('#vehicules .rcard').forEach((c) => {
      const show = g === 'all' || c.dataset.grp.split(' ').includes(g);
      c.hidden = !show;
      if (show && !REDUCED) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    });
  }));
  mountPlaces();
}
function mountPlaces() {
  $$('[data-ag]').forEach((b) => (b.onclick = () => { ensureDraft(); draft.agencyStart = b.dataset.ag; draft.agencyEnd = b.dataset.ag; saveDraft(); toast(`Départ : ${agency(b.dataset.ag).name}. Choisissez votre véhicule.`); go('/vehicules'); }));
}

window.catFail = (img, shape, color) => { img.replaceWith(document.createRange().createContextualFragment(`<div class="cat-fb">${carSVG(shape, color)}</div>`)); };

/* ---------- Résultats ---------- */
function ensureDraft() {
  if (!draft || !draft.from || searchError(draft)) {
    const keep = draft || {};
    draft = { ...defaultSearch(), options: keep.options || {}, promo: keep.promo || null, vehicleId: keep.vehicleId || null, customer: keep.customer || null, pro: !!keep.pro };
    saveDraft();
  }
}
function pageResults(gid) {
  ensureDraft();
  if (gid) ui.grp = grp(gid).id;
  const g = grp(ui.grp);
  const fleet = liveFleet();
  let list = fleet.filter(g.test);
  if (ui.auto) list = list.filter((v) => v.gearbox === 'Automatique');
  const rows = list.map((v) => ({ v, q: quoteSearch(v), ok: isAvailable(v.id, draft.from, draft.to) }));
  const cmp = { prix: (a, b) => a.q.total - b.q.total, prixd: (a, b) => b.q.total - a.q.total, places: (a, b) => b.v.seats - a.v.seats }[ui.sort];
  rows.sort((a, b) => (a.ok === b.ok ? cmp(a, b) : a.ok ? -1 : 1));
  const nOk = rows.filter((r) => r.ok).length;
  const inG = fleet.filter(g.test);
  const span = (arr, unit) => { const u = [...new Set(arr)].sort((x, y) => x - y); return !u.length ? '' : u.length === 1 ? `${u[0]}${unit}` : `${u[0]} à ${u[u.length - 1]}${unit}`; };
  const deps = inG.map((v) => v.deposit);
  const seo = g.id === 'all' ? SEO_BY_PATH['/vehicules'] : null;
  const land = g.id !== 'all' && GROUP_LANDING[g.id] && SEO_BY_PATH[GROUP_LANDING[g.id]];
  const html = tripBar(1) + `<div class="wrap cat-page">
    <div class="cat-head">
      <div><h1 class="cat-title">${esc((seo && seo.h1) || g.title)}</h1><p>${esc((seo && seo.lead) || g.txt)}</p>${land ? `<a class="cat-land" href="${land.path}">${esc(land.h1)}${icon('arrowR')}</a>` : ''}</div>
      <nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span>${g.id === 'all' ? '<b>Véhicules</b>' : `<a href="/vehicules">Véhicules</a><span>/</span><b>${esc(g.label)}</b>`}</nav>
    </div>
    <p class="cat-also"><span>Découvrez également :</span>${GROUPS.filter((x) => x.id !== g.id && x.id !== 'all' && fleet.some(x.test)).map((x) => `<a href="/vehicules/${x.id}">${esc(x.title)}</a>`).join('')}</p>
    ${inG.length ? `<div class="conds"><b>Conditions générales de location</b><span>Âge minimum : <em>${span(inG.map((v) => Math.max(v.minAge, db.settings.minAge)), ' ans')}</em></span><span>Années de permis : <em>${span(inG.map((v) => v.minYears), ' ans')}</em></span><span>Caution entre : <em>${eur(Math.min(...deps))} et ${eur(Math.max(...deps))}</em>, par empreinte bancaire non débitée</span></div>` : ''}
    <div class="pillbar" role="group" aria-label="Catégories de véhicules">${GROUPS.filter((x) => fleet.some(x.test)).map((x) => `<a class="pill ${x.id === g.id ? 'on' : ''}" href="${x.id === 'all' ? '/vehicules' : '/vehicules/' + x.id}" ${x.id === g.id ? 'aria-current="page"' : ''}>${esc(x.label)}</a>`).join('')}</div>
    <div class="res-tools">
      <p class="res-count">Il y a <b>${nOk}</b> ${nOk > 1 ? 'véhicules disponibles' : 'véhicule disponible'} sur vos dates.${isPro() ? ' <span class="pro-note">Prix hors taxes</span>' : ''}</p>
      <div class="res-ctl">${taxSwitch()}<button type="button" class="chip ${ui.auto ? 'on' : ''}" data-auto aria-pressed="${ui.auto}">Boîte automatique</button><label class="field"><span class="sr-only">Trier</span><select class="select" data-sort><option value="prix" ${ui.sort === 'prix' ? 'selected' : ''}>Prix croissant</option><option value="prixd" ${ui.sort === 'prixd' ? 'selected' : ''}>Prix décroissant</option><option value="places" ${ui.sort === 'places' ? 'selected' : ''}>Nombre de places</option></select></label></div>
    </div>
    ${rows.length ? `<div class="rgrid" data-stagger>${rows.map((r) => rcard(r.v, { search: true })).join('')}</div>` : `<div class="empty">${icon('search')}Aucun véhicule ne correspond à ces filtres.<br><br><a class="btn btn-ghost" href="/vehicules">Voir tous les véhicules</a></div>`}
    ${g.id === 'all' ? catalogueSeoHTML() : ''}
  </div>`;
  return publicPage(html, { active: 'vehicules' });
}
function mountResults() {
  bindTaxSwitch();
  mountSeo();
  const a = $('[data-auto]'); if (a) a.onclick = () => { ui.auto = !ui.auto; rerender(); };
  const s = $('[data-sort]'); if (s) s.onchange = () => { ui.sort = s.value; rerender(); };
}

/* ---------- Fiche véhicule ---------- */
function pageVehicle(id) {
  ensureDraft();
  const v = vehicle(id);
  if (!v || v.deleted) return publicPage(`<div class="wrap empty">${icon('car')}Ce véhicule n’existe plus.<br><br><a class="btn btn-primary" href="/vehicules">Voir les véhicules</a></div>`);
  const q = quoteSearch(v);
  const ok = isAvailable(v.id, draft.from, draft.to);
  const s = db.settings;
  const g = mainGroup(v);
  const bm = brandModel(v);
  const photo = photoOf(v);
  const crd = creditOf(v);
  const f = parse(draft.from), t = parse(draft.to);
  const sameGroup = liveFleet().filter((x) => x.id !== v.id && g.test(x));
  const more = sameGroup.length ? sameGroup : liveFleet().filter((x) => x.id !== v.id && x.category === v.category);
  const waTxt = `Bonjour, je souhaite réserver le véhicule ${v.name} du ${fmtD(f)} à ${hm(f).replace(':', 'h')} au ${fmtD(t)} à ${hm(t).replace(':', 'h')}, départ ${agency(draft.agencyStart).name}.`;
  const html = tripBar(1) + `<div class="wrap vd">
    ${crumbsHTML(vehicleCrumbs(v).map(([l, p], i, a) => [l, i === a.length - 1 ? null : p]))}
    <div class="vd-head">
      <div><span class="vd-badge">${esc(bm.brand || v.segment)}</span><h1>${esc((SEO_VEHICLE[v.id] && SEO_VEHICLE[v.id].h1) || `Location ${v.name}`)}</h1><p class="vd-sub">${esc(v.segment)}${v.similar ? ' · ou similaire' : ''} · véhicule sans chauffeur</p></div>
      <div class="vd-contact"><a href="${telHref()}">${icon('phone')}Appeler</a><a href="${waHref(waTxt)}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
    </div>
    <div class="vd-grid">
      <div class="vd-gal">
        <div class="vd-main" data-vmain>${studioShot(v, { big: true })}</div>
        <div class="vd-thumbs">
          <button type="button" class="on" data-view="studio" aria-label="Vue studio">${studioShot(v)}</button>
          ${photo && !v.photo ? `<button type="button" data-view="photo" aria-label="Photo du modèle"><img src="${esc(photo)}" alt=""></button>` : ''}
          ${v.photo ? '' : `<button type="button" class="t3d" data-view="3d" aria-label="Vue en relief">${icon('refresh')}<span>Vue 3D</span></button>`}
        </div>
        ${crd ? `<p class="credit">Photo : ${esc(crd.author || crd.site || 'libre de droits')}${crd.license ? `, ${esc(crd.license)}` : ''}. Photo non contractuelle.</p>` : ''}
      </div>
      <aside class="vd-book">
        <div class="vd-price"><span class="vd-pl">Prix pour ${plural(q.days, 'jour')}</span><b class="num">${money(q.total)}${taxTag()}</b><span class="vd-km">${q.kmIncluded == null ? 'Kilométrage illimité' : `${q.kmIncluded.toLocaleString('fr-FR')} km inclus`} · ${isPro() ? 'prix hors taxes' : 'prix TTC'}${q.pct ? ` · tarif dégressif ${q.pct} %` : ''}</span></div>
        <div class="vd-dates"><span class="sx-l">Vos dates</span><button type="button" class="sx-box vd-when" data-edit-search>${icon('cal')}<span>${esc(fmtDay(f))} ${hm(f)} <em>→</em> ${esc(fmtDay(t))} ${hm(t)}</span>${icon('edit')}</button><span class="vd-ag">${icon('pin')}${esc(agency(draft.agencyStart).name)}${draft.agencyEnd !== draft.agencyStart ? ` → ${esc(agency(draft.agencyEnd).name)}` : ''}</span></div>
        ${ok ? '<button type="button" class="btn btn-primary btn-lg btn-block" data-continue>Réserver ce véhicule</button>' : `<div class="alert warn">${icon('alert')}<span>Ce véhicule n’est pas libre sur vos dates. Modifiez-les ou choisissez un autre véhicule.</span></div>`}
        <a class="btn btn-wa btn-block" href="${waHref(waTxt)}" target="_blank" rel="noopener">${icon('wa')}Réserver par WhatsApp</a>
        ${summaryCard(q, v, { title: 'Détail du prix' })}
      </aside>
    </div>
    <div class="vd-info">
      <div>
        <h2>Présentation</h2>
        <p class="vd-desc">${esc(v.description || '')}</p>
        <div class="specs vd-specs">${specsHTML(v)}</div>
        ${v.equipment?.length ? `<h3>Équipements</h3><ul class="vd-eq">${v.equipment.map((e) => `<li>${icon('check')}${esc(e)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="conds-card">
        <h3>Conditions de location</h3>
        <div class="kv"><span>Caution (empreinte bancaire, non débitée)</span><b>${eur(v.deposit)}</b></div>
        <div class="kv"><span>Franchise en cas de dommage</span><b>${eur(v.franchise)}</b></div>
        <div class="kv"><span>Kilométrage</span><b>${q.kmIncluded == null ? 'Illimité' : `${q.kmIncluded.toLocaleString('fr-FR')} km inclus`}</b></div>
        ${q.kmIncluded == null ? '' : `<div class="kv"><span>Kilomètre supplémentaire</span><b>${eur(v.extraKm, true)}</b></div>`}
        <div class="kv"><span>Âge minimum du conducteur</span><b>${Math.max(v.minAge, s.minAge)} ans</b></div>
        <div class="kv"><span>Permis de conduire depuis</span><b>${plural(v.minYears, 'an')} au moins</b></div>
      </div>
    </div>
    ${vehicleSeoHTML(v)}
    ${more.length ? `<section class="vd-more"><div class="sec-row"><h2>Autres modèles de la catégorie ${esc(g.label)}</h2><a class="more-link" href="${catHref(g.id)}">Voir tous les véhicules <i>${icon('plus')}</i></a></div><div class="hscroll">${more.map((x) => rcard(x, { search: true })).join('')}</div></section>` : ''}
  </div>
  <div class="sticky-cta vd-sticky"><div class="in"><div class="tot"><small>${plural(q.days, 'jour')}, hors options${isPro() ? ', hors taxes' : ''}</small><b>${money(q.total)}${taxTag()}</b></div>${ok ? `<button type="button" class="btn btn-primary btn-lg" data-continue>Réserver ${icon('arrowR')}</button>` : '<a class="btn btn-ghost btn-lg" href="/vehicules">Voir les véhicules libres</a>'}</div></div>`;
  return publicPage(html, { active: 'vehicules' });
}
function mountVehicle(id) {
  const v = vehicle(id);
  mountSeo();
  $$('[data-continue]').forEach((b) => (b.onclick = () => {
    if (draft.vehicleId !== id) { draft.options = {}; }
    draft.vehicleId = id;
    saveDraft();
    go('/options');
  }));
  const main = $('[data-vmain]');
  if (!main || !v) return;
  $$('[data-view]').forEach((b) => (b.onclick = () => {
    $$('[data-view]').forEach((x) => x.classList.toggle('on', x === b));
    const view = b.dataset.view;
    main.classList.remove('swap'); void main.offsetWidth; main.classList.add('swap');
    if (view === 'photo') main.innerHTML = `<img class="vd-photo" src="${esc(photoOf(v))}" alt="${esc(v.name)}">`;
    else if (view === '3d') { main.innerHTML = showroomHTML([v], { big: true }) + `<div class="drag-hint">${icon('arrowL')}Faites glisser pour faire pivoter${icon('arrowR')}</div>`; mountShowrooms(main); }
    else main.innerHTML = studioShot(v, { big: true });
  }));
}
function summaryCard(q, v, { title = 'Récapitulatif', showDetails = false, open = false } = {}) {
  const lines = q.lines.map((l0) => (isPro() ? { ...l0, amount: ht(l0.amount), label: l0.unit ? `Location ${plural(l0.days, 'jour')} (${eur(ht(l0.unit))} HT par jour)` : l0.label } : l0)).map((l) => `<div class="kv ${l.amount < 0 ? 'neg' : ''}"><span>${esc(l.label)}</span><b class="num">${l.amount < 0 ? '− ' + eur(-l.amount) : eur(l.amount)}</b></div>`).join('');
  return `<div class="sum-card">
    <div class="hd"><h2>${esc(title)}</h2>${isPro() ? '<span class="badge b-gold plain">Tarif professionnel</span>' : ''}</div>
    <div class="bd">
      ${lines}
      ${isPro()
        ? `<div class="kv total"><span>Total HT</span><b class="num">${eur(q.ht)}</b></div>
      <div class="kv" style="font-size:13px"><span>TVA ${db.settings.vat} %</span><span class="num">${eur(q.tva)}</span></div>
      <div class="kv" style="font-size:13px"><span>Total TTC</span><span class="num">${eur(q.total)}</span></div>`
        : `<div class="kv total"><span>Total TTC</span><b class="num">${eur(q.total)}</b></div>
      <div class="kv" style="font-size:13px"><span>dont TVA ${db.settings.vat} %</span><span class="num">${eur(q.tva)}</span></div>`}
      ${showDetails ? `<details ${open ? 'open' : ''} style="margin-top:10px"><summary class="link" style="cursor:pointer;list-style:none;display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-size:13.5px">${icon('info')}<span>Caution, franchise, kilométrage</span></summary>
        <div style="margin-top:8px">
          <div class="kv"><span>Durée</span><b>${plural(q.days, 'jour')}</b></div>
          <div class="kv"><span>Franchise maximale</span><b>${eur(q.franchise)}</b></div>
          <div class="kv"><span>Montant de la caution</span><b>${eur(q.deposit)}</b></div>
          <div class="kv"><span>Kilométrage inclus</span><b>${q.kmIncluded == null ? 'Illimité' : q.kmIncluded.toLocaleString('fr-FR') + ' km'}</b></div>
          <div class="kv"><span>Location hors options</span><b>${money(q.base)}${taxTag()}</b></div>
        </div></details>` : ''}
    </div>
  </div>`;
}
const statusIcon = () => '';

/* ---------- Options et garanties ---------- */
function pageOptions() {
  ensureDraft();
  const v = vehicle(draft.vehicleId);
  if (!v) { setTimeout(() => go('/vehicules'), 0); return publicPage(''); }
  const q = quoteSearch(v, { options: draft.options, promo: draft.promo });
  const aS = agency(draft.agencyStart);
  const aE = agency(draft.agencyEnd);
  const opts = db.options.filter((o) => o.active && o.cats.includes(v.category) && !(o.unlimited && v.kmDay === 0));
  const optRow = (o) => {
    const qty = draft.options[o.id] || 0;
    const price = o.unit === 'jour' ? `${money(o.price)}${taxTag()} par jour${o.max ? `, ${money(o.max)}${taxTag()} maximum` : ''}` : `${money(o.price)}${taxTag()} par location`;
    const act = o.maxQty > 1 && qty
      ? `<div class="qty"><button type="button" data-dec="${o.id}" aria-label="Retirer un">−</button><b>${qty}</b><button type="button" data-inc="${o.id}" aria-label="Ajouter un" ${qty >= o.maxQty ? 'disabled' : ''}>+</button></div>`
      : `<button type="button" class="btn ${qty ? 'btn-ghost' : 'btn-silver'} btn-sm" data-toggle="${o.id}">${qty ? `${icon('check')}Ajoutée` : `${icon('plus')}Ajouter`}</button>`;
    return `<div class="opt ${qty ? 'on' : ''}"><div class="ic">${icon(o.icon || 'plus')}</div><div><h4>${esc(o.name)}</h4><p>${esc(o.desc)}</p><div class="pr">${price}</div></div><div class="act">${act}</div></div>`;
  };
  const html = tripBar(2) + `<div class="wrap"><div class="book-layout">
    <div>
      <div class="sum-card"><div class="hd"><h3>Récapitulatif de votre réservation</h3><button class="btn btn-ghost btn-sm" data-edit-search>${icon('edit')}Modifier</button></div><div class="bd">
        <div class="ico-line">${icon('pin')}<span>Départ : <em>${esc(aS.name)}</em></span></div>
        <div class="ico-line">${icon('pin')}<span>Retour : <em>${esc(aE.name)}</em></span></div>
        <div class="ico-line">${icon('cal')}<span>Du ${esc(fmtDT(draft.from))}</span></div>
        <div class="ico-line">${icon('cal')}<span>Au ${esc(fmtDT(draft.to))}</span></div>
        <div style="display:flex;gap:14px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--line-2)">${vehicleThumb(v)}<div><b>${esc(v.name)}</b> <span class="muted" style="font-style:italic">${v.similar ? 'ou similaire' : ''}</span><br><a class="link" href="/vehicules" style="font-size:13px">Changer de véhicule</a></div></div>
      </div></div>
      <div style="margin:26px 0 14px"><span class="eyebrow">Étape 2</span><h2 class="page-title" style="margin-top:10px">Options et garanties</h2></div>
      <div style="display:grid;gap:12px">${opts.map(optRow).join('')}</div>
      <div class="card card-pad" style="margin-top:16px">
        <form data-promo style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap">
          <label class="field" style="flex:1;min-width:200px"><span class="lbl">Code promo</span><input class="input" name="code" value="${esc(draft.promo || '')}" placeholder="Par exemple BIENVENUE10" autocomplete="off"><span class="msg">Ce code n’est pas valable.</span></label>
          <button class="btn btn-ghost" type="submit">Appliquer</button>
          ${draft.promo ? '<button class="btn btn-danger btn-sm" type="button" data-unpromo>Retirer</button>' : ''}
        </form>
      </div>
    </div>
    <aside class="book-side">${summaryCard(q, v, { title: 'Montant total', showDetails: true, open: true })}</aside>
  </div></div>
  <div class="sticky-cta"><div class="in"><div class="tot"><small>Total ${isPro() ? 'HT' : 'TTC'}, options comprises</small><b>${money(q.total)}${taxTag()}</b></div><button class="btn btn-primary btn-lg" data-continue>Continuer pour ${money(q.total)}${taxTag()}</button></div></div>`;
  return publicPage(html, { active: 'vehicules', footer: false });
}
function mountOptions() {
  const setOpt = (id, qty) => {
    const o = option(id);
    if (qty > 0) { draft.options[id] = Math.min(qty, o.maxQty || 1); if (o.excl) delete draft.options[o.excl]; } else delete draft.options[id];
    saveDraft(); rerender();
  };
  $$('[data-toggle]').forEach((b) => (b.onclick = () => setOpt(b.dataset.toggle, draft.options[b.dataset.toggle] ? 0 : 1)));
  $$('[data-inc]').forEach((b) => (b.onclick = () => setOpt(b.dataset.inc, (draft.options[b.dataset.inc] || 0) + 1)));
  $$('[data-dec]').forEach((b) => (b.onclick = () => setOpt(b.dataset.dec, (draft.options[b.dataset.dec] || 0) - 1)));
  const f = $('[data-promo]');
  if (f) f.onsubmit = (e) => {
    e.preventDefault();
    const code = f.code.value.trim().toUpperCase();
    const p = db.promos.find((x) => x.active && x.code === code);
    if (!p) { f.querySelector('.field').classList.add('err'); return; }
    draft.promo = p.code; saveDraft(); toast(`Code ${p.code} appliqué : ${p.pct} % de remise.`, 'ok'); rerender();
  };
  const u = $('[data-unpromo]'); if (u) u.onclick = () => { draft.promo = null; saveDraft(); rerender(); };
  $('[data-continue]').onclick = () => go('/coordonnees');
}

/* ---------- Coordonnées et permis ---------- */
const COUNTRIES = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Espagne', 'Portugal', 'Italie', 'Allemagne', 'Royaume-Uni', 'Maroc', 'Algérie', 'Tunisie', 'Sénégal', 'Autre pays'];
function pageDetails() {
  ensureDraft();
  const v = vehicle(draft.vehicleId);
  if (!v) { setTimeout(() => go('/vehicules'), 0); return publicPage(''); }
  const sess = session();
  const known = sess && customer(sess.customerId);
  if (!draft.customer && known) draft.pro = known.type === 'professionnel';
  const c = draft.customer || (known ? { ...known } : { type: isPro() ? 'professionnel' : 'particulier', license: { country: 'France' } });
  const pro = isPro();
  const needsAddr = draft.agencyStart === 'livraison' || draft.agencyEnd === 'livraison';
  const q = quoteSearch(v, { options: draft.options, promo: draft.promo, youngDriver: isYoung(c) });
  const f = (name, label, val, attrs = '', hint = '') => `<label class="field" data-f="${name}"><span class="lbl">${label} <span class="req">*</span></span><input class="input" name="${name}" value="${esc(val || '')}" ${attrs}><span class="msg"></span>${hint ? `<span class="hint">${hint}</span>` : ''}</label>`;
  const html = tripBar(3) + `<div class="wrap"><div class="book-layout">
    <form data-details novalidate>
      <div style="margin-bottom:14px"><span class="eyebrow">Étape 3</span><h2 class="page-title" style="margin-top:10px">Vos informations</h2>
        <p class="muted" style="margin-top:8px">${known ? `Connecté en tant que <b style="color:var(--text)">${esc(known.firstName)} ${esc(known.lastName)}</b>. <a href="#" class="link" data-logout>Ce n’est pas vous ?</a>` : 'Vous avez déjà un compte ? <a href="#" class="link" data-login>Connectez-vous</a>'}</p></div>
      <div class="card card-pad" style="display:grid;gap:14px">
        <div class="seg" role="tablist" aria-label="Type de client"><button type="button" class="${pro ? '' : 'on'}" data-type="particulier">Particulier</button><button type="button" class="${pro ? 'on' : ''}" data-type="professionnel">Professionnel</button></div>
        ${pro ? `<div class="alert info">${icon('file')}<span>Tarif professionnel : prix hors taxes, facture au nom de la société avec la TVA indiquée, et paiement par virement possible.</span></div>` : ''}
        <div class="form-sec" data-pro ${pro ? '' : 'hidden'}>
          <div class="sub-title">Votre société</div>
          <div class="grid2">${f('company', 'Raison sociale', c.company, 'autocomplete="organization"')}${f('siret', 'SIRET', c.siret, 'inputmode="numeric"', '14 chiffres, sur votre Kbis.')}</div>
          <label class="field" data-f="vatNum"><span class="lbl">N° de TVA intracommunautaire</span><input class="input" name="vatNum" value="${esc(c.vatNum || '')}" placeholder="FR12 345678901" autocomplete="off"><span class="hint">Facultatif : il figurera sur vos factures.</span></label>
        </div>
        <div class="form-sec">
          <div class="sub-title">${pro ? 'Conducteur principal' : 'Vos coordonnées'}</div>
          <div class="grid2">${f('firstName', 'Prénom', c.firstName, 'autocomplete="given-name"')}${f('lastName', 'Nom', c.lastName, 'autocomplete="family-name"')}</div>
          <div class="grid2">${f('email', pro ? 'Email (factures et confirmations)' : 'Adresse email', c.email, 'type="email" autocomplete="email" inputmode="email"')}${f('phone', 'Téléphone mobile', c.phone, 'type="tel" autocomplete="tel" inputmode="tel"')}</div>
          ${f('birth', 'Date de naissance du conducteur', c.birth, 'type="date" max="' + dateKey(new Date()) + '"')}
        </div>
        <div class="form-sec">
          <div class="sub-title">${pro ? 'Adresse de facturation de la société' : 'Votre adresse'}</div>
          ${f('address', pro ? 'Adresse du siège ou de l’établissement' : 'Adresse', c.address, 'autocomplete="street-address"')}
          <div class="grid2">${f('zip', 'Code postal', c.zip, 'inputmode="numeric" autocomplete="postal-code"')}${f('city', 'Ville', c.city, 'autocomplete="address-level2"')}</div>
        </div>
        ${needsAddr ? `<label class="field" data-f="delivery"><span class="lbl">Adresse de livraison ou de reprise <span class="req">*</span></span><textarea class="textarea" name="delivery" placeholder="Numéro, rue, code postal, ville, et un détail utile (portail, étage)">${esc(draft.delivery || '')}</textarea><span class="msg"></span></label>` : ''}
      </div>
      <div class="card card-pad" style="display:grid;gap:14px;margin-top:14px">
        <div><span class="eyebrow">Permis de conduire</span></div>
        ${f('licNumber', 'Numéro de permis', c.license?.number, 'autocomplete="off"')}
        <div class="grid2">${f('licDate', 'Date d’obtention', c.license?.date, 'type="date" max="' + dateKey(new Date()) + '"')}<label class="field" data-f="licCountry"><span class="lbl">Pays de délivrance <span class="req">*</span></span><select class="select" name="licCountry">${COUNTRIES.map((x) => `<option ${x === (c.license?.country || 'France') ? 'selected' : ''}>${x}</option>`).join('')}</select><span class="msg"></span></label></div>
        <div data-young>${youngAlert(c, v)}</div>
      </div>
      <div class="card card-pad" style="display:grid;gap:12px;margin-top:14px">
        <label class="check" data-f="cgv"><input type="checkbox" name="cgv" ${draft.cgv ? 'checked' : ''}><span>J’accepte les <a href="#" class="link" data-doc="cgv">conditions générales de location</a>. <span class="req">*</span></span></label>
        <label class="check"><input type="checkbox" name="account" ${known || draft.account !== false ? 'checked' : ''}><span>Je crée mon espace client pour suivre mes locations et retrouver mes documents.</span></label>
        <div class="field msg-cgv" hidden><span class="msg" style="display:block">Merci d’accepter les conditions générales.</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:18px;flex-wrap:wrap">
        <a class="link" href="/options" style="text-decoration:none;display:inline-flex;gap:6px;align-items:center">${icon('arrowL')}<span>Retour à l’étape précédente</span></a>
        <button class="btn btn-primary btn-lg" type="submit">Confirmer ma réservation</button>
      </div>
    </form>
    <aside class="book-side">${summaryCard(q, v, { title: 'Montant total', showDetails: true })}</aside>
  </div></div>`;
  return publicPage(html, { active: 'vehicules', footer: false });
}
function isYoung(c) {
  const d = c?.license?.date;
  if (!d || !draft?.from) return false;
  return yearsBetween(parse(d + 'T00:00'), parse(draft.from)) < db.settings.youngYears;
}
function youngAlert(c, v) {
  if (!isYoung(c)) return '';
  const s = db.settings;
  const days = rentalDays(draft.from, draft.to);
  return `<div class="alert warn">${icon('info')}<span>Permis de moins de ${s.youngYears} ans : un supplément jeune conducteur de ${eur(s.youngFee)} par jour (${eur(Math.min(s.youngFee * days, s.youngFeeMax))} pour votre location) s’ajoute, et la caution est augmentée de ${eur(s.youngDeposit)}.</span></div>`;
}
function readDetails(form) {
  const g = (n) => (form[n] ? form[n].value.trim() : '');
  const type = $('.seg .on', form)?.dataset.type || 'particulier';
  return {
    type, company: g('company'), siret: g('siret'), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'),
    address: g('address'), zip: g('zip'), city: g('city'), birth: g('birth'), vatNum: g('vatNum').toUpperCase(),
    license: { number: g('licNumber').toUpperCase(), date: g('licDate'), country: g('licCountry') },
  };
}
function mountDetails() {
  const form = $('[data-details]');
  if (!form) return;
  const v = vehicle(draft.vehicleId);
  const keep = () => { draft.customer = readDetails(form); draft.delivery = form.delivery ? form.delivery.value : draft.delivery; draft.cgv = form.cgv.checked; draft.account = form.account.checked; saveDraft(); };
  // Particulier ou professionnel : on garde la saisie et on réaffiche (champs, libellés, prix HT ou TTC)
  $$('.seg button', form).forEach((b) => (b.onclick = () => {
    $$('.seg button', form).forEach((x) => x.classList.toggle('on', x === b));
    draft.pro = b.dataset.type === 'professionnel';
    keep();
    rerender();
  }));
  // Date d'obtention : l'alerte « jeune conducteur » et le montant se mettent à jour sur place. Redessiner tout le
  // formulaire à chaque « change » coupait la saisie de l'année au premier chiffre (« 0020 » au lieu de « 2020 »).
  const refreshYoung = () => {
    const d = form.licDate.value;
    if (d && +d.slice(0, 4) < 1900) return; // année en cours de saisie
    const c = readDetails(form);
    draft.customer = c;
    saveDraft();
    const box = $('[data-young]', form);
    if (box) box.innerHTML = youngAlert(c, v);
    const side = $('.book-side');
    if (side) {
      const open = !!side.querySelector('details[open]');
      side.innerHTML = summaryCard(quoteSearch(v, { options: draft.options, promo: draft.promo, youngDriver: isYoung(c) }), v, { title: 'Montant total', showDetails: true, open });
    }
  };
  form.licDate.addEventListener('change', refreshYoung);
  form.licDate.addEventListener('blur', refreshYoung);
  form.addEventListener('input', () => { draft.customer = readDetails(form); saveDraft(); });
  const login = $('[data-login]'); if (login) login.onclick = (e) => { e.preventDefault(); keep(); openLogin(() => { draft.customer = null; rerender(); }); };
  const lo = $('[data-logout]'); if (lo) lo.onclick = (e) => { e.preventDefault(); setSession(null); draft.customer = null; saveDraft(); rerender(); };
  form.onsubmit = (e) => {
    e.preventDefault();
    keep();
    const c = readDetails(form);
    const errs = {};
    const req = ['firstName', 'lastName', 'email', 'phone', 'address', 'zip', 'city', 'birth', 'licNumber', 'licDate'];
    if (c.type === 'professionnel') req.push('company', 'siret');
    const val = { ...c, licNumber: c.license.number, licDate: c.license.date };
    for (const k of req) if (!val[k]) errs[k] = 'Champ obligatoire.';
    if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)) errs.email = 'Adresse email invalide.';
    if (c.phone && c.phone.replace(/\D/g, '').length < 10) errs.phone = 'Numéro de téléphone incomplet.';
    if (c.siret && c.type === 'professionnel' && c.siret.replace(/\D/g, '').length !== 14) errs.siret = 'Le SIRET compte 14 chiffres.';
    if (form.delivery && !form.delivery.value.trim()) errs.delivery = 'Indiquez l’adresse de livraison.';
    const from = parse(draft.from);
    if (c.birth) {
      const age = yearsBetween(parse(c.birth + 'T00:00'), from);
      const min = Math.max(v.minAge, db.settings.minAge);
      if (age < min) errs.birth = `Ce véhicule est réservé aux conducteurs de ${min} ans et plus.`;
    }
    if (c.license.date) {
      const yrs = yearsBetween(parse(c.license.date + 'T00:00'), from);
      if (parse(c.license.date + 'T00:00') > new Date()) errs.licDate = 'Date d’obtention dans le futur.';
      else if (yrs < v.minYears) errs.licDate = `Ce véhicule demande ${plural(v.minYears, 'an')} de permis. Choisissez un autre véhicule ou appelez-nous.`;
    }
    $$('[data-f]', form).forEach((el) => el.classList.remove('err'));
    for (const [k, m] of Object.entries(errs)) { const el = $(`[data-f="${k}"]`, form); if (el) { el.classList.add('err'); const ms = $('.msg', el); if (ms) ms.textContent = m; } }
    $('.msg-cgv', form).hidden = form.cgv.checked;
    if (Object.keys(errs).length || !form.cgv.checked) {
      const first = $('.field.err', form) || (!form.cgv.checked && $('.msg-cgv', form));
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toast('Vérifiez les champs signalés.', 'warn');
      return;
    }
    const existing = db.customers.find((x) => x.email === c.email);
    if (existing?.blacklist) { toast('Nous ne pouvons pas finaliser cette réservation en ligne. Appelez-nous, nous trouverons une solution.', 'warn'); return; }
    if (!isAvailable(v.id, draft.from, draft.to)) { toast('Ce véhicule vient d’être réservé sur ces dates. Choisissez-en un autre.', 'warn'); go('/vehicules'); return; }
    if (c.type !== 'professionnel') Object.assign(c, { company: '', siret: '', vatNum: '' });
    let cust = existing;
    if (cust) Object.assign(cust, c, { account: cust.account || form.account.checked });
    else { cust = { id: uid('c'), ...c, createdAt: toISO(new Date()), account: form.account.checked, blacklist: false, notes: '' }; db.customers.push(cust); }
    const res = {
      id: uid('r'), number: '', createdAt: toISO(new Date()), status: 'attente_paiement', vehicleId: v.id, customerId: cust.id,
      from: draft.from, to: draft.to, agencyStart: draft.agencyStart, agencyEnd: draft.agencyEnd, options: { ...draft.options }, promo: draft.promo,
      youngDriver: isYoung(c), channel: 'En ligne', payments: [], checkout: null, checkin: null, notes: '', delivery: form.delivery ? form.delivery.value.trim() : '',
    };
    res.quote = quoteFor(res);
    db.seq++; res.number = resNumber(new Date(), db.seq);
    db.reservations.push(res);
    save();
    if (form.account.checked) setSession({ customerId: cust.id });
    draft = { ...draft, vehicleId: null, options: {}, promo: null, customer: null, delivery: '', cgv: false };
    saveDraft();
    go('/reservation/' + res.id);
  };
}
function openLogin(after) {
  openModal({
    title: 'Connexion',
    body: `<form data-login-form novalidate style="display:grid;gap:14px"><p class="muted">Recevez un lien de connexion par email, sans mot de passe à retenir.</p><label class="field"><span class="lbl">Adresse email</span><input class="input" name="email" type="email" autocomplete="email" placeholder="vous@exemple.fr"><span class="msg">Aucun compte avec cette adresse.</span></label><button class="btn btn-primary" type="submit">Recevoir mon lien</button><button class="btn btn-ghost" type="button" data-demo>Utiliser le compte de démonstration</button></form>`,
    onMount: (m, close) => {
      const f = $('[data-login-form]', m);
      const done = (c) => { setSession({ customerId: c.id }); close(); toast(`Démonstration : connecté en tant que ${c.firstName} ${c.lastName}.`, 'ok'); after && after(); };
      f.onsubmit = (e) => { e.preventDefault(); const c = db.customers.find((x) => x.email === f.email.value.trim().toLowerCase()); if (!c) { f.querySelector('.field').classList.add('err'); return; } done(c); };
      $('[data-demo]', m).onclick = () => done(db.customers[0]);
    },
  });
}

/* ---------- Réservation : récapitulatif, paiement, confirmation ---------- */
function resLines(res) {
  if (res.status === 'annulee') return res.cancelFee ? [{ label: 'Frais d’annulation (50 % du prix de la location)', amount: res.cancelFee }] : [];
  const q = res.quote;
  const extras = res.checkin?.extras || [];
  return q.lines.concat(extras.map((e) => ({ label: e.label, amount: e.amount })));
}
function billingHTML(res) {
  const q = res.quote;
  const lines = resLines(res);
  const total = totalDue(res);
  const ht = round2(total / (1 + db.settings.vat / 100));
  const p = paid(res);
  if (res.status === 'annulee') {
    const inP = round2(sum(res.payments || [], (x) => (x.amount > 0 ? x.amount : 0)));
    const outP = round2(-sum(res.payments || [], (x) => (x.amount < 0 ? x.amount : 0)));
    return `<div class="kv"><span>Location annulée</span><b class="num muted"><s>${eur(q.total, true)}</s></b></div>
    <div class="kv"><span>${res.cancelFee ? 'Frais d’annulation (50 %)' : 'Annulation sans frais'}</span><b class="num">${eur(res.cancelFee || 0, true)}</b></div>
    ${inP ? `<div class="kv"><span>Réglé</span><b class="num">${eur(inP, true)}</b></div>` : ''}
    ${outP ? `<div class="kv neg"><span>Remboursé</span><b class="num">${eur(outP, true)}</b></div>` : ''}
    <div class="kv total"><span>Reste à payer</span><b class="num">${eur(Math.max(0, balance(res)), true)}</b></div>`;
  }
  return lines.map((l) => `<div class="kv ${l.amount < 0 ? 'neg' : ''}"><span>${esc(l.label)}</span><b class="num">${l.amount < 0 ? '− ' + eur(-l.amount) : eur(l.amount)}</b></div>`).join('') + `
    <div class="kv" style="border-top:1px solid var(--line);margin-top:6px;padding-top:10px"><span>Montant HT</span><b class="num">${eur(ht, true)}</b></div>
    <div class="kv"><span>TVA ${db.settings.vat} %</span><b class="num">${eur(round2(total - ht), true)}</b></div>
    <div class="kv total"><span>Montant total TTC</span><b class="num">${eur(total, true)}</b></div>
    ${p ? `<div class="kv"><span>Déjà réglé</span><b class="num">${eur(p, true)}</b></div>` : ''}
    <div class="kv" style="font-size:16px"><span style="color:var(--text);font-weight:600">Reste à payer</span><b class="num gold-text">${eur(Math.max(0, balance(res)), true)}</b></div>
    <p class="muted" style="font-size:12.5px;margin-top:8px">Caution de ${eur(q.deposit)} par empreinte bancaire au départ, non débitée. Franchise : ${eur(q.franchise)}.</p>`;
}
function pageReservation(id) {
  const res = byId(db.reservations, id);
  if (!res) return publicPage(`<div class="wrap empty">${icon('file')}Réservation introuvable.<br><br><a class="btn btn-primary" href="/">Retour à l’accueil</a></div>`);
  const v = vehicle(res.vehicleId);
  const c = customer(res.customerId);
  const aS = agency(res.agencyStart);
  const aE = agency(res.agencyEnd);
  const waiting = res.status === 'attente_paiement';
  const cancelled = res.status === 'annulee';
  const s = db.settings;
  const canCancel = ['attente_paiement', 'confirmee'].includes(res.status);
  const head = cancelled
    ? `<div class="success-head"><div class="ck wait" style="box-shadow:inset 0 0 0 2px var(--danger);color:var(--danger)">${icon('x')}</div><div><h1 class="page-title">Réservation annulée</h1><p class="muted" style="margin-top:6px">${esc(res.number)}</p></div></div>`
    : waiting
      ? `<div class="success-head"><div class="ck wait">${icon('clock')}</div><div><h1 style="font-size:19px;font-weight:600">${res.transfer ? `${esc(c.firstName)}, votre véhicule est réservé : nous attendons votre virement` : `${esc(c.firstName)}, votre réservation ${esc(res.number)} est en attente de paiement`}</h1>${res.transfer ? `<p class="muted" style="margin-top:6px">Facture et RIB envoyés à ${esc(c.email)}. Référence à indiquer : ${esc(res.number)}.</p>` : ''}<p class="page-title" style="margin-top:12px;font-size:17px">Du ${esc(fmtD(res.from))} au ${esc(fmtD(res.to))}</p></div></div>`
      : `<div class="success-head"><div class="ck ok">${icon('check')}</div><div><h1 style="font-size:19px;font-weight:600">C’est confirmé, ${esc(c.firstName)} : votre véhicule vous attend</h1><p class="muted" style="margin-top:6px">Réservation ${esc(res.number)} · un email de confirmation vient de partir à ${esc(c.email)}</p><p class="page-title" style="margin-top:12px;font-size:17px">Du ${esc(fmtD(res.from))} au ${esc(fmtD(res.to))}</p></div></div>`;
  const html = (waiting ? `<div class="book-top"><div class="wrap"><div class="stepper" style="margin-left:0">${['Véhicule', 'Options', 'Coordonnées', 'Paiement'].map((x, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i === 3 ? 'on' : 'done'}"><i>${i === 3 ? 4 : '✓'}</i><span>${x}</span></span>`).join('')}</div></div></div>` : '') + `<div class="wrap" style="max-width:980px;padding-top:26px;padding-bottom:120px">
    ${head}
    <div class="grid2" style="margin-top:22px;align-items:start">
      <div style="display:grid;gap:14px">
        <div class="sum-card"><div class="hd"><h3>Détails de la location</h3></div><div class="bd">
          <div style="display:flex;gap:14px;align-items:center;margin-bottom:10px">${vehicleThumb(v)}<div><b>${esc(v.name)}</b><br><span class="muted" style="font-size:13px">${esc(v.segment)} · ${plural(res.quote.days, 'jour')}</span></div></div>
          <div class="ico-line">${icon('pin')}<span>Départ : <em>${esc(aS.name)}</em><br><span class="muted" style="font-size:13px">${esc(res.agencyStart === 'livraison' && res.delivery ? res.delivery : aS.address)}</span></span></div>
          <div class="ico-line">${icon('cal')}<span>${esc(fmtDay(res.from, true))} à ${hm(parse(res.from)).replace(':', 'h')}</span></div>
          <div class="ico-line">${icon('pin')}<span>Retour : <em>${esc(aE.name)}</em><br><span class="muted" style="font-size:13px">${esc(res.agencyEnd === 'livraison' && res.delivery ? res.delivery : aE.address)}</span></span></div>
          <div class="ico-line">${icon('cal')}<span>${esc(fmtDay(res.to, true))} à ${hm(parse(res.to)).replace(':', 'h')}</span></div>
        </div></div>
        ${cancelled ? '' : `<div class="sum-card"><div class="hd"><h3>Au départ, apportez</h3></div><div class="bd">
          <div class="ico-line">${icon('key')}<span>Votre permis de conduire (${esc(c.license?.country || 'France')})</span></div>
          <div class="ico-line">${icon('user')}<span>Une pièce d’identité à votre nom</span></div>
          <div class="ico-line">${icon('card')}<span>Une carte bancaire pour la caution de ${eur(res.quote.deposit)}</span></div>
          ${c.type === 'professionnel' ? `<div class="ico-line">${icon('file')}<span>Un extrait Kbis de moins de trois mois</span></div>` : ''}
        </div></div>`}
        <div class="sum-card"><div class="hd"><h3>Vos informations</h3></div><div class="bd">
          <div style="display:flex;gap:12px;align-items:center"><span class="avatar">${esc(initials(c.firstName + ' ' + c.lastName))}</span><div><b>${esc(custName(c))}</b><br><span class="muted" style="font-size:13px">${esc(c.type === 'professionnel' ? 'Professionnel' : 'Particulier')}</span></div></div>
          <div class="kv" style="margin-top:8px"><span>Adresse</span><b>${esc(c.address)}, ${esc(c.zip)} ${esc(c.city)}</b></div>
          <div class="kv"><span>Email</span><b>${esc(c.email)}</b></div>
          <div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div>
        </div></div>
      </div>
      <div style="display:grid;gap:14px">
        <div class="sum-card"><div class="hd"><h3>Détails de la facturation</h3>${statusBadge(res.status)}</div><div class="bd">${billingHTML(res)}</div></div>
        ${cancelled ? '' : `<div class="doc-row" style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" data-ics>${icon('cal')}Ajouter à mon agenda</button>
          <button class="btn btn-ghost btn-sm" data-bon>${icon('file')}Bon de réservation</button>
          ${canCancel ? `<button class="btn btn-danger btn-sm" data-cancel>${icon('x')}Annuler</button>` : ''}
        </div>`}
        <p class="muted" style="font-size:13px">Une question ? Appelez-nous au <a class="link" href="tel:${esc(s.phone.replace(/\s/g, ''))}">${esc(s.phone)}</a>.</p>
      </div>
    </div>
  </div>
  ${waiting ? `<div class="sticky-cta"><div class="in"><div class="tot"><small>Reste à payer</small><b>${eur(balance(res), true)}</b></div><a class="btn btn-primary btn-lg" href="/paiement/${esc(res.id)}">${icon('lock')}Payer la location</a></div></div>` : ''}`;
  return publicPage(html, { footer: !waiting });
}
function mountReservation(id) {
  const res = byId(db.reservations, id);
  if (!res) return;
  let cel = null;
  try { cel = sessionStorage.getItem('prisma-celebrate'); if (cel === id) sessionStorage.removeItem('prisma-celebrate'); } catch (e) { /* navigation privée */ }
  if (cel === id) { const ck = $('.ck.ok'); const r = ck ? ck.getBoundingClientRect() : null; setTimeout(() => celebrate(r ? r.left + r.width / 2 : undefined, r ? r.top + r.height / 2 : undefined), 350); }
  const b1 = $('[data-ics]'); if (b1) b1.onclick = () => downloadICS(res);
  const b2 = $('[data-bon]'); if (b2) b2.onclick = () => openDocument(res, 'bon');
  const b3 = $('[data-cancel]');
  if (b3) b3.onclick = () => {
    const free = parse(res.from) - new Date() > db.settings.freeCancelHours * 3600000;
    const p = paid(res);
    const fee = free ? 0 : round2(res.quote.base * 0.5);
    const refund = round2(p - fee);
    confirmBox('Annuler la réservation', free ? `L’annulation est gratuite : ${p ? `vous serez remboursé de ${eur(p, true)} sous quelques jours.` : 'rien ne vous sera facturé.'}` : `Le départ est dans moins de ${db.settings.freeCancelHours} heures : 50 % du prix de la location reste dû. ${p ? `Remboursement : ${eur(Math.max(0, refund), true)}.` : ''}`, 'Confirmer l’annulation', () => {
      res.status = 'annulee';
      res.cancelFee = fee;
      res.cancelledAt = toISO(new Date());
      if (refund > 0) res.payments.push({ id: uid('p'), amount: -refund, method: 'Remboursement', at: toISO(new Date()) });
      save(); toast(fee ? `Réservation annulée. Frais d’annulation : ${eur(fee, true)}.` : 'Réservation annulée, sans frais.', 'ok'); rerender();
    }, true);
  };
}
function pagePayment(id) {
  const res = byId(db.reservations, id);
  if (!res) return publicPage(`<div class="wrap empty">Réservation introuvable.</div>`);
  if (balance(res) <= 0) { setTimeout(() => go('/reservation/' + id), 0); return publicPage(''); }
  const amount = balance(res);
  const s = db.settings;
  const multi = amount >= s.installmentsMin;
  const pro = customer(res.customerId)?.type === 'professionnel';
  const m = (key, title, sub, logos = '') => `<button type="button" class="pay-m ${key === 'carte' ? 'on' : ''}" data-m="${key}"><span class="rd"></span><span><b>${title}</b><small>${sub}</small></span>${logos}</button>`;
  const html = `<div class="book-top"><div class="wrap"><div class="stepper" style="margin-left:0">${['Véhicule', 'Options', 'Coordonnées', 'Paiement'].map((x, i) => `${i ? '<span class="sep"></span>' : ''}<span class="s ${i === 3 ? 'on' : 'done'}"><i>${i === 3 ? 4 : '✓'}</i><span>${x}</span></span>`).join('')}</div></div></div>
  <div class="wrap" style="max-width:560px;padding-top:28px;padding-bottom:60px">
    <div style="text-align:center"><span class="eyebrow">Paiement sécurisé</span><p class="muted" style="margin-top:14px">Payer ${esc(s.brand)}</p><p style="font-size:38px;font-weight:600;letter-spacing:-.01em;margin-top:4px" class="num">${eur(amount, true)}</p><p class="muted" style="font-size:13px">Réservation ${esc(res.number)}${pro ? ` · soit ${eur(ht(amount), true)} HT, TVA ${eur(round2(amount - ht(amount)), true)}` : ''}</p></div>
    <div class="alert info" style="margin-top:20px">${icon('info')}<span><b style="color:var(--text)">Démonstration :</b> aucun paiement réel et aucun numéro de carte demandé. En production, le paiement passe par Stripe : carte bancaire, Apple Pay, Google Pay et paiement en plusieurs fois.</span></div>
    <div class="pay-methods" style="margin-top:16px">
      ${m('carte', 'Carte bancaire', 'Débit immédiat, 3D Secure', '<span class="logos"><i>CB</i><i>VISA</i><i>MC</i><i>AMEX</i></span>')}
      ${m('wallet', 'Apple Pay ou Google Pay', 'Validation sur votre téléphone')}
      ${multi ? m('3x', 'Payer en 3 fois', `3 × ${eur(round2(amount / 3), true)}, sans frais`) : ''}
      ${multi ? m('4x', 'Payer en 4 fois', `4 × ${eur(round2(amount / 4), true)}, sans frais`) : ''}
      ${pro ? m('virement', 'Virement bancaire', 'Réservé aux professionnels : facture envoyée par email, à régler avant le départ') : ''}
    </div>
    ${pro ? `<div class="pay-transfer" data-transfer hidden>Vous recevez la facture et notre RIB par email. Indiquez la référence <b>${esc(res.number)}</b> dans le libellé du virement. Le véhicule est bloqué pour vous et vous est remis dès réception du virement.</div>` : ''}
    <p class="muted" style="font-size:13px;margin-top:14px">${icon('shield').replace('<svg ', '<svg style="width:15px;height:15px;display:inline;vertical-align:-3px;margin-right:5px;color:var(--gold)" ')}La caution de ${eur(res.quote.deposit)} sera prise par empreinte bancaire au départ du véhicule : elle n’est pas débitée.</p>
    <button class="btn btn-primary btn-lg btn-block" style="margin-top:18px" data-pay>${icon('lock')}Payer ${eur(amount, true)}</button>
    <p style="text-align:center;margin-top:12px"><a class="link" href="/reservation/${esc(res.id)}">Retour au récapitulatif</a></p>
  </div>`;
  return publicPage(html, { footer: false });
}
function mountPayment(id) {
  const res = byId(db.reservations, id);
  let method = 'carte';
  const btn = $('[data-pay]');
  const payLabel = btn ? btn.innerHTML : '';
  $$('[data-m]').forEach((b) => (b.onclick = () => {
    method = b.dataset.m;
    $$('[data-m]').forEach((x) => x.classList.toggle('on', x === b));
    const tr = $('[data-transfer]');
    if (tr) tr.hidden = method !== 'virement';
    if (btn) btn.innerHTML = method === 'virement' ? `${icon('file')}Recevoir la facture et le RIB` : payLabel;
  }));
  if (btn) btn.onclick = () => {
    if (method === 'virement') {
      res.transfer = { at: toISO(new Date()) };
      save();
      toast(`Facture et RIB envoyés à ${customer(res.customerId)?.email || 'votre adresse'}. Le véhicule vous est réservé.`, 'ok');
      go('/reservation/' + res.id);
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Paiement en cours…';
    setTimeout(() => {
      const label = { carte: 'Carte bancaire', wallet: 'Apple Pay', '3x': 'Paiement en 3 fois', '4x': 'Paiement en 4 fois' }[method];
      res.payments.push({ id: uid('p'), amount: balance(res), method: label, at: toISO(new Date()) });
      if (res.status === 'attente_paiement') res.status = 'confirmee';
      save();
      try { sessionStorage.setItem('prisma-celebrate', res.id); } catch (e) { /* navigation privée */ }
      toast('Paiement accepté. Votre réservation est confirmée.', 'ok');
      go('/reservation/' + res.id);
    }, 1400);
  };
}

/* ---------- Espace client ---------- */
function pageAccount() {
  const sess = session();
  const c = sess && customer(sess.customerId);
  if (!c) {
    const html = `<div class="wrap" style="max-width:520px;padding-top:44px;padding-bottom:60px">
      <span class="eyebrow">Espace client</span><h1 class="page-title" style="margin-top:12px">Vos locations, vos documents</h1>
      <p class="muted" style="margin-top:10px">Suivez vos réservations, téléchargez vos bons et vos factures, annulez sans appeler.</p>
      <div class="card card-pad" style="margin-top:20px"><button class="btn btn-primary btn-block" data-login>Se connecter</button></div>
    </div>`;
    return publicPage(html);
  }
  const list = db.reservations.filter((r) => r.customerId === c.id).sort((a, b) => (a.from < b.from ? 1 : -1));
  const now = new Date();
  const up = list.filter((r) => parse(r.to) >= now && r.status !== 'annulee' && r.status !== 'terminee');
  const past = list.filter((r) => !up.includes(r));
  const row = (r) => { const v = vehicle(r.vehicleId); return `<a class="list-row" href="/reservation/${esc(r.id)}" style="text-decoration:none">${vehicleThumb(v)}<div><div class="t">${esc(v.name)}</div><div class="s">${esc(fmtD(r.from))} au ${esc(fmtD(r.to))} · ${esc(r.number)}</div></div><div class="r">${statusBadge(r.status)}${icon('chevR').replace('<svg ', '<svg style="width:18px;height:18px;color:var(--faint)" ')}</div></a>`; };
  const html = `<div class="wrap" style="max-width:880px;padding-top:36px;padding-bottom:60px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap"><div><span class="eyebrow">Espace client</span><h1 class="page-title" style="margin-top:12px">Bonjour ${esc(c.firstName)}</h1></div><div style="display:flex;gap:8px"><a class="btn btn-primary" href="/vehicules">${icon('plus')}Nouvelle location</a><button class="btn btn-ghost" data-logout>Se déconnecter</button></div></div>
    <div class="panel" style="margin-top:22px"><div class="p-hd"><h2>À venir et en cours</h2></div><div class="p-bd">${up.length ? up.map(row).join('') : '<p class="muted">Aucune location à venir.</p>'}</div></div>
    <div class="panel" style="margin-top:14px"><div class="p-hd"><h2>Historique</h2></div><div class="p-bd">${past.length ? past.map(row).join('') : '<p class="muted">Pas encore d’historique.</p>'}</div></div>
    <div class="panel" style="margin-top:14px"><div class="p-hd"><h2>Mes informations</h2></div><div class="p-bd">
      <div class="kv"><span>Nom</span><b>${esc(custName(c))}</b></div><div class="kv"><span>Email</span><b>${esc(c.email)}</b></div><div class="kv"><span>Téléphone</span><b>${esc(c.phone)}</b></div><div class="kv"><span>Permis</span><b>${esc(licText(c))}</b></div>
    </div></div>
  </div>`;
  return publicPage(html);
}
function mountAccount() {
  const l = $('[data-login]'); if (l) l.onclick = () => openLogin(() => rerender());
  const o = $('[data-logout]'); if (o) o.onclick = () => { setSession(null); rerender(); };
}

/* ---------- Agences ---------- */
function pageAgencies() {
  const c = SEO_BY_PATH['/agences'] || {};
  const html = `<div class="wrap cat-page">
    <div class="cat-head"><div><h1 class="cat-title">${esc(c.h1 || 'Agences et horaires')}</h1><p>${esc(c.lead || 'Retirez votre véhicule à l’agence d’Yvrac, en gare, à l’aéroport, ou faites-le livrer chez vous dans toute la métropole bordelaise.')}</p></div><nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Agences</b></nav></div>
    <div class="conds"><b>Horaires d’ouverture</b><span>${esc(weekHoursText())}</span><span>Remise et restitution sur rendez-vous pendant ces horaires, y compris en gare, à l’aéroport et à domicile.</span></div>
    <div class="places" data-stagger>${db.agencies.map((a) => placeCard(a, 'h2')).join('')}</div>
    ${agenciesSeoHTML()}
  </div>${ctaBandHTML()}`;
  return publicPage(html, { active: 'agences' });
}
function mountAgencies() {
  mountPlaces();
  mountSeo();
}

/* ---------- Contact ---------- */
function mapArt() {
  return `<svg class="map-svg" viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1200" height="380" fill="#0f1012"/>
    <path d="M-20 300 C180 250 260 330 430 290 S720 170 880 210 S1110 330 1230 280" fill="none" stroke="#1d2a33" stroke-width="46"/>
    <g fill="none" stroke="#24262b" stroke-linecap="round">
      <path d="M-10 120 L1210 60" stroke-width="16"/><path d="M60 -10 L240 390" stroke-width="12"/><path d="M520 -10 C540 120 600 220 560 390" stroke-width="18"/>
      <path d="M-10 210 C300 190 520 150 1210 170" stroke-width="10"/><path d="M820 -10 L760 390" stroke-width="10"/><path d="M1000 -10 C1030 150 980 260 1080 390" stroke-width="12"/>
    </g>
    <g fill="none" stroke="#1a1b1f" stroke-width="5">
      <path d="M140 0 L180 380M320 0 L300 380M420 0 L470 380M680 0 L650 380M920 0 L900 380M1100 0 L1150 380M0 40 L1200 20M0 170 L1200 120M0 250 L1200 240M0 340 L1200 330"/>
    </g>
    <g fill="#16171a"><rect x="190" y="40" width="90" height="60" rx="6"/><rect x="330" y="140" width="120" height="50" rx="6"/><rect x="640" y="60" width="100" height="70" rx="6"/><rect x="860" y="250" width="110" height="60" rx="6"/><rect x="1040" y="90" width="90" height="50" rx="6"/></g>
    <circle cx="600" cy="176" r="120" fill="url(#mapGlow)"/>
    <defs><radialGradient id="mapGlow"><stop offset="0" stop-color="#d9b878" stop-opacity=".18"/><stop offset="1" stop-color="#d9b878" stop-opacity="0"/></radialGradient></defs>
  </svg>`;
}
function pageContact() {
  const s = db.settings;
  const q = encodeURIComponent(`${s.address}, ${s.zip} ${s.city}`);
  const html = `<div class="map-band">${mapArt()}<div class="map-pin"><span class="mp-dot" aria-hidden="true"></span><div class="mp-card"><b>${esc(s.brand)}</b><span>${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</span><a class="link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Itinéraire</a></div></div></div>
  <div class="wrap contact-grid">
    <div class="ct-info">
      <h1 class="cat-title">Contact</h1>
      <p>${esc(s.address)}<br>${esc(s.zip)} ${esc(s.city)}</p>
      <a class="ct-phone" href="${telHref()}">${esc(s.phone)}</a>
      ${s.email ? `<a class="ct-mail" href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : ''}
      <p class="muted">${esc(weekHoursText())}</p>
      <div class="ct-social"><a href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a><a href="${telHref()}" aria-label="Appeler">${icon('phone')}</a><a href="/agences" aria-label="Agences">${icon('pin')}</a></div>
    </div>
    <form class="ct-form" data-contact novalidate>
      <h2>Formulaire de contact</h2>
      <div class="grid2">
        <label class="field" data-f="firstName"><span class="lbl">Prénom <span class="req">*</span></span><input class="input" name="firstName" autocomplete="given-name"><span class="msg">Champ obligatoire.</span></label>
        <label class="field" data-f="lastName"><span class="lbl">Nom <span class="req">*</span></span><input class="input" name="lastName" autocomplete="family-name"><span class="msg">Champ obligatoire.</span></label>
      </div>
      <div class="grid2">
        <label class="field" data-f="email"><span class="lbl">Email <span class="req">*</span></span><input class="input" name="email" type="email" autocomplete="email" inputmode="email"><span class="msg">Adresse email invalide.</span></label>
        <label class="field" data-f="phone"><span class="lbl">Téléphone</span><input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
      </div>
      <label class="field"><span class="lbl">Objet</span><select class="select" name="subject"><option>Réservation</option><option>Devis professionnel</option><option>Location longue durée</option><option>Dépôt-vente ou rachat de mon véhicule</option><option>Achat d’un véhicule</option><option>Autre demande</option></select></label>
      <label class="field" data-f="message"><span class="lbl">Message <span class="req">*</span></span><textarea class="textarea" name="message" placeholder="Dates, véhicule souhaité, nombre de jours…"></textarea><span class="msg">Écrivez votre message.</span></label>
      <button class="btn btn-primary" type="submit">Envoyer</button>
    </form>
  </div>
  <div class="wrap seo-body contact-more">
    <div class="seo-article cols">
      <section class="seo-sec"><h2>Nous trouver</h2><p>L’agence ${esc(s.brand === 'PRISMA AUTOMOBILES' ? 'PRISMA Automobiles' : s.brand)} vous accueille au ${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}, à environ 15 minutes de Bordeaux par la rocade, avec un parking gratuit.</p><p>Horaires d’ouverture : ${esc(weekHoursText())}. Vous pouvez aussi récupérer votre véhicule à la gare Saint-Jean, à l’aéroport de Bordeaux-Mérignac ou le faire livrer à votre adresse : retrouvez tous nos <a href="/agences">points de retrait</a>.</p></section>
      <section class="seo-sec"><h2>Réserver ou demander un devis</h2><p>La réservation en ligne est ouverte 24 h sur 24 et la confirmation arrive immédiatement par email. Vous préférez parler à quelqu’un ? Appelez le ${esc(s.phone)} ou écrivez-nous sur WhatsApp au même numéro.</p><p>Professionnels : pour plusieurs véhicules ou une longue durée, nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à ${Math.max(...s.degressive.map((d) => d.pct))} %. Découvrez <a href="/professionnels">l’offre professionnels</a>.</p></section>
    </div>
    ${relatedHTML(['/agences', '/faq', '/conditions-de-location', '/location-voiture-yvrac'], 'Pour préparer votre location')}
  </div>`;
  return publicPage(html, { active: 'contact' });
}
function mountContact() {
  mountSeo();
  const f = $('[data-contact]');
  if (!f) return;
  f.onsubmit = (e) => {
    e.preventDefault();
    const g = (n) => f[n].value.trim();
    const errs = [];
    for (const k of ['firstName', 'lastName', 'message']) if (!g(k)) errs.push(k);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) errs.push('email');
    $$('[data-f]', f).forEach((el) => el.classList.toggle('err', errs.includes(el.dataset.f)));
    if (errs.length) { toast('Vérifiez les champs signalés.', 'warn'); $(`[data-f="${errs[0]}"] .input, [data-f="${errs[0]}"] .textarea`, f)?.focus(); return; }
    if (!db.messages) db.messages = [];
    db.messages.unshift({ id: uid('m'), at: toISO(new Date()), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'), subject: f.subject.value, message: g('message'), done: false });
    save();
    f.reset();
    toast('Message envoyé : nous vous répondons rapidement.', 'ok');
  };
}
/* ---------- Professionnels ---------- */
function pagePro() {
  ensureDraft();
  if (!draft.pro) { draft.pro = true; if (draft.customer) draft.customer.type = 'professionnel'; saveDraft(); }
  const fleet = liveFleet();
  const vans = fleet.filter((v) => v.category === 'utilitaire');
  const cars = fleet.filter((v) => v.category === 'voiture');
  const pts = [
    ['euro', 'Tarifs hors taxes', 'Tous les prix sont affichés hors taxes ; la TVA de 20 % se récupère sur les utilitaires loués pour votre activité.'],
    ['file', 'Facture au nom de la société', 'Raison sociale, SIRET et numéro de TVA intracommunautaire sur chaque facture.'],
    ['card', 'Paiement par virement', 'Réglez par carte ou par virement : le véhicule est bloqué pour vous dès la réservation.'],
    ['van', 'Utilitaires jusqu’à 20 m³', 'Du petit fourgon au 20 m³ avec hayon, tous conduits avec le permis B.'],
  ];
  const c = SEO_BY_PATH['/professionnels'] || {};
  const html = `<div class="wrap cat-page">
    <div class="cat-head"><div><h1 class="cat-title">${esc(c.h1 || 'Professionnels')}</h1><p>${esc(c.lead || 'Artisans, entreprises du bâtiment, déménageurs, commerçants, équipes en déplacement : des utilitaires et des voitures récents, avec une gestion pensée pour les entreprises.')}</p></div><nav class="crumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span>/</span><b>Professionnels</b></nav></div>
    <div class="pro-grid" data-stagger>${pts.map(([ic, h, p]) => `<div class="pro-i"><div class="pl-ic">${icon(ic)}</div><h2>${esc(h)}</h2><p>${esc(p)}</p></div>`).join('')}</div>
    <div class="sec-row"><h2>Nos utilitaires</h2><a class="more-link" href="/vehicules/utilitaire">Réserver un utilitaire <i>${icon('plus')}</i></a></div>
    <div class="rgrid" data-stagger>${vans.map((v) => rcard(v)).join('')}</div>
    <div class="sec-row"><h2>Voitures pour vos déplacements</h2><a class="more-link" href="/vehicules/voiture">Réserver une voiture <i>${icon('plus')}</i></a></div>
    <div class="rgrid" data-stagger>${cars.map((v) => rcard(v)).join('')}</div>
    <div class="pro-cta"><div><h3>Plusieurs véhicules ou une longue durée ?</h3><p>Nous établissons un devis sur mesure, avec des tarifs dégressifs jusqu’à ${Math.max(...db.settings.degressive.map((d) => d.pct))} %.</p></div><div class="pro-cta-b"><a class="btn btn-primary" href="/contact">Demander un devis</a><a class="btn btn-wa" href="${waHref('Bonjour, je souhaite un devis professionnel.')}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div></div>
    ${c.sections ? `<div class="seo-body"><article class="seo-article">${tocHTML(c.sections)}${sectionsHTML(c.sections)}</article>${faqHTML(c.faq)}${relatedHTML(c.related)}</div>` : ''}
  </div>`;
  return publicPage(html, { active: 'pro' });
}

/* ---------- Documents : CGV, mentions, crédits, bon, contrat, facture ---------- */
function openInfoDoc(kind) {
  const s = db.settings;
  if (kind === 'cgv') openModal({ title: 'Conditions générales de location', wide: true, body: `<div style="white-space:pre-line;color:var(--text-2)">${esc(s.cgv)}</div>` });
  if (kind === 'mentions') openModal({ title: 'Mentions légales', body: `<div style="display:grid;gap:8px;color:var(--text-2)"><p><b style="color:var(--text)">${esc(s.legalName)}</b>, ${esc(s.legalForm)}</p><p>Siège social : ${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}</p><p>${esc(s.siren)} ${esc(s.rcs)}</p><p>Téléphone : ${esc(s.phone)}${s.email ? ` · ${esc(s.email)}` : ''}</p><p>Nom commercial et logo : ${esc(s.brand)}.</p></div>` });
  if (kind === 'credits') {
    const extra = ['hero', 'cat-voitures', 'cat-utilitaires'].map((k) => PHOTOS[k]?.credit).filter(Boolean);
    const list = db.vehicles.map(creditOf).filter(Boolean).concat(extra);
    const rows = list.map((c) => `<div class="list-row"><div><div class="t">${esc(c.title || 'Photo')}</div><div class="s">${esc(c.author || 'Auteur indiqué sur la page source')}${c.license ? ` · ${esc(c.license)}` : ''}${c.source ? ` · <a class="link" href="${esc(c.source)}" target="_blank" rel="noopener">source</a>` : ''}</div></div></div>`).join('');
    openModal({ title: 'Crédits photos', body: `<p class="muted">Photos libres de droits utilisées pour la démonstration, sous licence Creative Commons ou équivalente. Elles ont été recadrées, détourées et leurs plaques floutées, et seront remplacées par les photos de la flotte.</p><div style="margin-top:10px">${rows || '<p class="muted">Toutes les photos appartiennent au loueur.</p>'}</div>` });
  }
}
function downloadICS(res) {
  const v = vehicle(res.vehicleId);
  const a = agency(res.agencyStart);
  const f = (s) => s.replace(/[-:]/g, '') + '00';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PRISMA//Location//FR', 'BEGIN:VEVENT', `UID:${res.id}@prisma`, `DTSTAMP:${f(toISO(new Date()))}`, `DTSTART:${f(res.from)}`, `DTEND:${f(res.to)}`, `SUMMARY:Location ${v.name} (${res.number})`, `LOCATION:${a.name}, ${a.address}`, `DESCRIPTION:Départ ${a.name}. Pensez au permis, à une pièce d'identité et à une carte bancaire pour la caution.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  downloadFile(`${res.number}.ics`, ics, 'text/calendar');
}
function docHead(title, res) {
  const s = db.settings;
  return `<div class="dochead"><div style="display:flex;gap:12px;align-items:center"><img src="${ASSETS.doc}" alt=""><div><b style="font-size:15px">${esc(s.brand)}</b><br><span class="muted">${esc(s.address)}, ${esc(s.zip)} ${esc(s.city)}<br>${esc(s.phone)}${s.email ? ' · ' + esc(s.email) : ''}</span></div></div><div style="text-align:right"><h2>${esc(title)}</h2><span class="muted">N° ${esc(res.number)}<br>Émis le ${esc(fmtD(new Date()))}</span></div></div>`;
}
function openDocument(res, kind) {
  const s = db.settings;
  const v = vehicle(res.vehicleId);
  const c = customer(res.customerId);
  const q = res.quote;
  const lines = resLines(res);
  const total = totalDue(res);
  const ht = round2(total / (1 + s.vat / 100));
  const title = { bon: 'Bon de réservation', contrat: 'Contrat de location', facture: 'Facture' }[kind];
  const table = `<table><thead><tr><th>Désignation</th><th style="text-align:right">Montant TTC</th></tr></thead><tbody>${lines.map((l) => `<tr><td>${esc(l.label)}</td><td style="text-align:right">${l.amount < 0 ? '− ' + eur(-l.amount, true) : eur(l.amount, true)}</td></tr>`).join('')}
    <tr><td style="text-align:right">Total HT</td><td style="text-align:right">${eur(ht, true)}</td></tr><tr><td style="text-align:right">TVA ${s.vat} %</td><td style="text-align:right">${eur(round2(total - ht), true)}</td></tr><tr><td style="text-align:right"><b>Total TTC</b></td><td style="text-align:right"><b>${eur(total, true)}</b></td></tr><tr><td style="text-align:right">Réglé</td><td style="text-align:right">${eur(paid(res), true)}</td></tr></tbody></table>`;
  const body = `<div class="print-area"><div class="doc">${docHead(title, res)}
    <table><tbody>
      <tr><th>Client</th><td>${esc(custName(c))}<br>${esc(c.address)}, ${esc(c.zip)} ${esc(c.city)}<br>${esc(c.email)} · ${esc(c.phone)}${c.siret ? `<br>SIRET ${esc(c.siret)}` : ''}${c.vatNum ? ` · N° TVA ${esc(c.vatNum)}` : ''}</td></tr>
      <tr><th>Véhicule</th><td>${esc(v.name)}${v.similar ? ' ou similaire' : ''}${kind !== 'bon' ? ` · ${esc(v.plate)}` : ''}</td></tr>
      <tr><th>Départ</th><td>${esc(fmtDT(res.from))} · ${esc(agency(res.agencyStart).name)}</td></tr>
      <tr><th>Retour</th><td>${esc(fmtDT(res.to))} · ${esc(agency(res.agencyEnd).name)}</td></tr>
      <tr><th>Conducteur</th><td>Permis ${esc(licText(c))}</td></tr>
      <tr><th>Conditions</th><td>Caution ${eur(q.deposit)} · franchise ${eur(q.franchise)} · ${q.kmIncluded == null ? 'kilométrage illimité' : `${q.kmIncluded} km inclus puis ${eur(v.extraKm, true)} par km`}</td></tr>
      ${kind === 'contrat' && res.checkout ? `<tr><th>État au départ</th><td>${res.checkout.km.toLocaleString('fr-FR')} km · carburant ${res.checkout.fuel}/8${res.checkout.notes ? ' · ' + esc(res.checkout.notes) : ''}</td></tr>` : ''}
      ${res.checkin ? `<tr><th>État au retour</th><td>${res.checkin.km.toLocaleString('fr-FR')} km · carburant ${res.checkin.fuel}/8${res.checkin.notes ? ' · ' + esc(res.checkin.notes) : ''}</td></tr>` : ''}
    </tbody></table>
    ${table}
    ${kind === 'contrat' ? `<p class="muted" style="margin-top:12px;font-size:12px;white-space:pre-line">${esc(s.cgv)}</p><div class="sig"><div>Signature du loueur</div><div>Signature du client, précédée de « Lu et approuvé »</div></div>` : ''}
    ${kind === 'facture' ? `<p class="muted" style="margin-top:12px;font-size:12px">${esc(s.legalName)}, ${esc(s.legalForm)}, ${esc(s.siren)} ${esc(s.rcs)}. ${balance(res) <= 0 ? (paid(res) > 0 ? 'Paiement reçu, facture acquittée.' : 'Aucune somme due.') : `Reste à payer : ${eur(balance(res), true)}, à régler avant le départ du véhicule.`} Pénalités de retard : trois fois le taux d’intérêt légal. Indemnité forfaitaire pour frais de recouvrement : 40 €.</p>` : ''}
  </div></div>`;
  openModal({ title, wide: true, body, foot: `<button class="btn btn-ghost" data-close>Fermer</button><button class="btn btn-primary" data-print>${icon('print')}Imprimer ou enregistrer en PDF</button>`, onMount: (m) => { $('[data-print]', m).onclick = () => window.print(); } });
}
