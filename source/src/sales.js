/* =====================================================================
   VÉHICULES À VENDRE : annonces (stock de l'agence ou dépôt-vente),
   vitrine avec filtres et tri, fiche annonce, demande d'information,
   de rendez-vous ou de réservation, avec reprise éventuelle.
   Les annonces se gèrent dans le logiciel du loueur (rubrique Ventes).
   ===================================================================== */
const SALE_PHOTOS = typeof EMBEDDED_SALE_PHOTOS === 'object' ? EMBEDDED_SALE_PHOTOS : {};
const SALE_LIST = '/vehicules-occasion';
const SALE_CATS = [['all', 'Tous'], ['citadine', 'Citadines'], ['compacte', 'Compactes'], ['suv', 'SUV'], ['berline', 'Berlines'], ['utilitaire', 'Utilitaires']];
const SALE_STATUS = { disponible: ['Disponible', 'b-ok'], reserve: ['Réservé', 'b-warn'], vendu: ['Vendu', 'b-sold'] };
const SALE_ENERGIES = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const SALES_SEED = 2;   // à augmenter quand les annonces de démonstration changent : elles sont remplacées chez les visiteurs
const saleName = (s) => `${s.brand} ${s.model}`;
const saleFull = (s) => `${s.brand} ${s.model}${s.version ? ' ' + s.version : ''}`;
const saleHref = (s) => '/vehicule-occasion/' + s.slug;
const sale = (id) => (db.sales || []).find((x) => x.id === id);
const saleBySlug = (slug) => (db.sales || []).find((x) => !x.deleted && (x.slug === slug || x.id === slug));
const liveSales = () => (db.sales || []).filter((s) => !s.deleted);
const onSale = () => liveSales().filter((s) => s.status !== 'vendu');
const kmFmt = (n) => `${Number(n || 0).toLocaleString('fr-FR')} km`;
const saleSlug = (s) => slugify(`${s.brand} ${s.model} ${s.version || ''} ${s.year || ''}`).slice(0, 80);
/** Vignette Crit'Air d'un véhicule récent (normes Euro 5 et 6) : 0 électrique, 1 essence ou hybride, 2 diesel. */
const saleCritair = (s) => (s.energy === 'Électrique' ? 0 : s.energy === 'Diesel' ? 2 : 1);
/** Mise en circulation lisible (« mars 2020 »). */
function saleReg(s) {
  const [y, m] = String(s.firstReg || '').split('-').map(Number);
  return y ? `${m ? MOIS[m - 1] + ' ' : ''}${y}` : String(s.year || '');
}
/** Contrôle technique : obligatoire (moins de 6 mois) pour vendre à un particulier un véhicule de plus de 4 ans. */
function saleCT(s) {
  const [y, m] = String(s.firstReg || s.year || '').split('-').map(Number);
  if (!y) return '';
  const age = yearsBetween(new Date(y, (m || 1) - 1, 1), new Date());
  return age >= 4 ? 'Contrôle technique de moins de 6 mois remis à la vente' : 'Moins de 4 ans : pas encore de contrôle technique';
}
const daysOnline = (s) => Math.max(0, Math.round((dayStart(new Date()) - dayStart(parse(s.listedAt) || new Date())) / DAY));
const isNewSale = (s) => s.status === 'disponible' && daysOnline(s) <= 10;

/* ---------- Annonces d'exemple (démonstration) ---------- */
function seedSales() {
  const today = dayStart(new Date());
  const at = (n) => toISO(addDays(today, -n));
  const S = (o) => ({ status: 'disponible', mode: 'stock', owners: 1, doors: 5, seats: 5, deleted: false, photo: null, ...o, slug: o.slug || saleSlug(o) });
  return [
    S({ id: 'vo-3008', ref: 'VO-2601', brand: 'Peugeot', model: '3008', version: 'GT Line 1.5 BlueHDi 130 EAT8', category: 'suv', shape: 'suv', color: '#6e747b', colorName: 'Gris Platinium', year: 2020, firstReg: '2020-03', km: 68400, price: 21900, energy: 'Diesel', gearbox: 'Automatique', power: 130, listedAt: at(12),
      equipment: ['i-Cockpit et écran tactile 10 pouces', 'Navigation connectée', 'Apple CarPlay et Android Auto', 'Caméra de recul', 'Aide au stationnement avant et arrière', 'Climatisation automatique bizone', 'Régulateur et limiteur de vitesse'],
      description: 'SUV familial en première main, entretien suivi. Boîte automatique à 8 rapports, grand coffre et position de conduite haute : à l’aise en famille comme sur les longs trajets.' }),
    S({ id: 'vo-captur', ref: 'VO-2602', brand: 'Renault', model: 'Captur', version: 'TCe 100 Intens', category: 'suv', shape: 'suv', color: '#c8202a', colorName: 'Rouge Flamme, toit noir', year: 2021, firstReg: '2021-06', km: 41200, price: 16490, energy: 'Essence', gearbox: 'Manuelle', power: 100, mode: 'depot', owners: 1, listedAt: at(3),
      equipment: ['Écran tactile 9,3 pouces et navigation', 'Apple CarPlay et Android Auto', 'Banquette arrière coulissante', 'Caméra de recul', 'Climatisation automatique', 'Jantes alliage 18 pouces'],
      description: 'Petit SUV bicolore vendu en dépôt-vente pour le compte de son propriétaire. Banquette arrière coulissante pour moduler le coffre, idéal en ville comme pour les week-ends.' }),
    S({ id: 'vo-golf', ref: 'VO-2603', brand: 'Volkswagen', model: 'Golf', version: 'GTI 2.0 TSI 245 DSG7', category: 'compacte', shape: 'berline', color: '#f1f2f3', colorName: 'Blanc Pur', year: 2021, firstReg: '2021-05', km: 42300, price: 33900, energy: 'Essence', gearbox: 'Automatique', power: 245, owners: 1, listedAt: at(21),
      equipment: ['Digital Cockpit Pro', 'Navigation et écran 10 pouces', 'Apple CarPlay et Android Auto sans fil', 'Sièges sport GTI', 'Régulateur de vitesse adaptatif', 'Phares LED matriciels'],
      description: 'La compacte sportive de référence, boîte DSG à 7 rapports et 245 ch. Première main, carnet d’entretien à jour.' }),
    S({ id: 'vo-yaris', ref: 'VO-2604', brand: 'Toyota', model: 'Yaris', version: 'Hybride 100h Dynamic', category: 'citadine', shape: 'citadine', color: '#2742a8', colorName: 'Bleu Nébula', year: 2019, firstReg: '2019-06', km: 52300, price: 14490, energy: 'Hybride', gearbox: 'Automatique', power: 100, listedAt: at(6),
      equipment: ['Motorisation hybride et boîte automatique', 'Écran tactile Toyota Touch 2', 'Caméra de recul', 'Climatisation automatique', 'Régulateur de vitesse', 'Aide au maintien de voie'],
      description: 'Citadine hybride très sobre en ville, boîte automatique de série. Parfaite pour les trajets quotidiens dans Bordeaux Métropole.' }),
    S({ id: 'vo-sandero', ref: 'VO-2605', brand: 'Dacia', model: 'Sandero Stepway', version: 'TCe 90 Confort', category: 'citadine', shape: 'citadine', color: '#c86b2a', colorName: 'Orange Atacama', year: 2022, firstReg: '2022-09', km: 23500, price: 13490, energy: 'Essence', gearbox: 'Manuelle', power: 90, status: 'reserve', listedAt: at(18),
      equipment: ['Barres de toit modulables', 'Écran multimédia et smartphone connecté', 'Aide au stationnement arrière', 'Climatisation', 'Régulateur de vitesse'],
      description: 'Citadine surélevée au look baroudeur, économique à l’usage. Véhicule réservé : contactez-nous pour être prévenu s’il se libère.' }),
    S({ id: 'vo-c3', ref: 'VO-2606', brand: 'Citroën', model: 'C3', version: 'PureTech 83 Shine', category: 'citadine', shape: 'citadine', color: '#eef0f2', colorName: 'Blanc Banquise, toit rouge', year: 2019, firstReg: '2019-04', km: 61300, price: 9990, energy: 'Essence', gearbox: 'Manuelle', power: 83, owners: 2, listedAt: at(33),
      equipment: ['Écran tactile 7 pouces', 'Apple CarPlay et Android Auto', 'Caméra de recul', 'Climatisation automatique', 'Régulateur de vitesse', 'Airbump latéraux'],
      description: 'Citadine confortable à petit prix, idéale pour un premier véhicule ou un second véhicule du foyer.' }),
    S({ id: 'vo-a3', ref: 'VO-2607', brand: 'Audi', model: 'A3 Berline', version: '35 TFSI 150 S tronic S line', category: 'compacte', shape: 'berline', color: '#1b1d21', colorName: 'Noir Mythic', year: 2022, firstReg: '2022-03', km: 38700, price: 28900, energy: 'Essence', gearbox: 'Automatique', power: 150, mode: 'depot', owners: 1, listedAt: at(9),
      equipment: ['Virtual Cockpit', 'Navigation MMI et écran 10,1 pouces', 'Apple CarPlay et Android Auto', 'Sièges avant chauffants', 'Radar de stationnement avant et arrière', 'Éclairage d’ambiance'],
      description: 'Berline compacte premium à boîte automatique S tronic, finition S line, vendue en dépôt-vente pour le compte de son propriétaire. Intérieur très bien conservé.' }),
    S({ id: 'vo-serie3', ref: 'VO-2608', brand: 'BMW', model: 'Série 3', version: '320d xDrive 190 Luxury', category: 'berline', shape: 'berline', color: '#15171b', colorName: 'Noir Saphir', year: 2022, firstReg: '2022-10', km: 48500, price: 36500, energy: 'Diesel', gearbox: 'Automatique', power: 190, owners: 1, status: 'vendu', listedAt: at(40), soldAt: at(4),
      equipment: ['Transmission intégrale xDrive', 'Boîte automatique à 8 rapports', 'Navigation professionnelle', 'Sièges chauffants', 'Caméra de recul', 'Accès et démarrage sans clé'],
      description: 'Berline routière vendue récemment. D’autres berlines et compactes premium sont régulièrement proposées : contactez-nous pour votre recherche.' }),
    S({ id: 'vo-modely', ref: 'VO-2609', brand: 'Tesla', model: 'Model Y', version: 'Grande Autonomie transmission intégrale', category: 'suv', shape: 'suv', color: '#a9adb3', colorName: 'Gris argent', year: 2022, firstReg: '2022-08', km: 51900, price: 31900, energy: 'Électrique', gearbox: 'Automatique', power: null, owners: 1, listedAt: at(2),
      equipment: ['Autopilot', 'Toit en verre panoramique', 'Écran central 15 pouces', 'Sièges chauffants avant et arrière', 'Hayon électrique', 'Accès au réseau de Superchargeurs'],
      description: 'SUV électrique spacieux, transmission intégrale et grande autonomie. Recharge rapide sur le réseau de Superchargeurs pour les longs trajets.' }),
    S({ id: 'vo-500', ref: 'VO-2610', brand: 'Fiat', model: '500', version: '1.0 Hybrid 70 Dolcevita', category: 'citadine', shape: 'citadine', color: '#f05a4a', colorName: 'Rouge Corallo', year: 2021, firstReg: '2021-07', km: 30800, price: 11490, energy: 'Hybride', gearbox: 'Manuelle', power: 70, doors: 3, seats: 4, mode: 'depot', owners: 1, listedAt: at(14),
      equipment: ['Motorisation hybride légère', 'Toit panoramique en verre', 'Écran tactile 7 pouces', 'Apple CarPlay et Android Auto', 'Radar de recul', 'Climatisation'],
      description: 'Citadine chic et facile à garer, vendue en dépôt-vente pour le compte de son propriétaire. Toit en verre, finition Dolcevita et teinte Rouge Corallo.' }),
    S({ id: 'vo-partner', ref: 'VO-2611', brand: 'Peugeot', model: 'Partner', version: 'Standard 1.5 BlueHDi 100 Asphalt', category: 'utilitaire', shape: 'fourgonnette', color: '#f4f5f6', colorName: 'Blanc Banquise', year: 2020, firstReg: '2020-10', km: 79200, price: 13900, energy: 'Diesel', gearbox: 'Manuelle', power: 100, doors: 4, seats: 3, owners: 1, listedAt: at(25),
      equipment: ['Cabine 3 places', 'Porte latérale coulissante', 'Cloison de séparation', 'Écran tactile et navigation', 'Aide au stationnement arrière', 'Anneaux d’arrimage'],
      description: 'Petit utilitaire pratique pour les artisans et les livraisons en ville. Cabine trois places et chargement protégé par une cloison.' }),
    S({ id: 'vo-transit', ref: 'VO-2612', brand: 'Ford', model: 'Transit Custom Kombi', version: '2.0 EcoBlue 130 Trend, 9 places', category: 'utilitaire', shape: 'minibus', color: '#c9ccd1', colorName: 'Gris Moondust', year: 2019, firstReg: '2019-05', km: 98600, price: 24900, energy: 'Diesel', gearbox: 'Manuelle', power: 130, doors: 4, seats: 9, owners: 1, listedAt: at(29),
      equipment: ['9 places', 'Climatisation avant et arrière', 'Portes latérales coulissantes', 'Régulateur de vitesse', 'Caméra de recul', 'Radar de stationnement'],
      description: 'Minibus 9 places polyvalent, pour les équipes, les associations et les familles nombreuses. Il se conduit avec le permis B.' }),
  ];
}

/* ---------- Briques d'affichage ---------- */
function saleShot(s, { big = false } = {}) {
  const ph = SALE_PHOTOS[s.id];
  const cut = !s.photo && ph && ph.cut;
  const st = db.settings;
  const logo = st.logo ? `<img src="${st.logo}" alt="">` : `<img src="${ASSETS.mark}" alt=""><i></i><img src="${ASSETS.word}" alt="">`;
  if (!cut && s.photo) return `<div class="shot own ${big ? 'big' : ''}"><img class="shot-photo" src="${esc(s.photo)}" alt="${esc(saleFull(s))}" decoding="async"></div>`;
  const set = cut && ph.cutSm ? ` srcset="${ph.cutSm} ${ph.smW}w, ${cut} ${ph.w}w" sizes="${big ? '(max-width: 960px) 92vw, 780px' : '(max-width: 540px) 82vw, (max-width: 1180px) 45vw, 420px'}"` : '';
  const car = cut ? `<img class="shot-car" src="${cut}"${set} alt="${esc(saleFull(s))} d’occasion"${big ? '' : ' loading="lazy"'} decoding="async">` : `<div class="shot-svg">${carSVG(s.shape || 'citadine', s.color || '#8a929c', { label: saleName(s) })}</div>`;
  return `<div class="shot ${big ? 'big' : ''}"><span class="shot-logo" aria-hidden="true">${logo}</span>${car}</div>`;
}
function saleTags(s) {
  const t = [];
  if (s.status !== 'disponible') t.push(`<span class="vo-tag ${s.status}">${SALE_STATUS[s.status][0]}</span>`);
  else if (isNewSale(s)) t.push('<span class="vo-tag new">Nouveau</span>');
  if (s.mode === 'depot') t.push('<span class="vo-tag depot">Dépôt-vente</span>');
  return t.length ? `<span class="vo-tags">${t.join('')}</span>` : '';
}
/** Carte d'annonce (vitrine, accueil, suggestions). */
function saleCard(s) {
  // un véhicule vendu reste visible dans la vitrine, sans lien : son annonce n'est plus en ligne
  const tag = s.status === 'vendu' ? 'div' : 'a';
  return `<${tag} class="rcard vo-card ${s.status}"${tag === 'a' ? ` href="${saleHref(s)}"` : ''} data-vo="${esc(s.id)}" data-cat="${esc(s.category)}" data-energy="${esc(s.energy)}" data-gear="${esc(s.gearbox)}" data-price="${s.price}" data-km="${s.km}" data-year="${s.year}" data-listed="${esc(s.listedAt || '')}">
    <div class="vo-shot">${saleShot(s)}${saleTags(s)}</div>
    <div class="rc-b">
      <div class="rc-p"><b>${eur(s.price)}</b>${s.status === 'vendu' ? '<span class="vo-sold">Vendu</span>' : ''}</div>
      <div class="rc-n">${esc(`${s.brand} - ${s.model}`)}<small> ${esc(s.version || '')}</small></div>
      <div class="rc-s"><span>${icon('cal')}${esc(String(s.year))}</span><span>${icon('gauge')}${esc(kmFmt(s.km))}</span><span>${icon('fuel')}${esc(s.energy)}</span><span>${icon('gear')}${s.gearbox === 'Automatique' ? 'Auto' : 'Manuelle'}</span></div>
    </div>
  </${tag}>`;
}
/** Quelques annonces (accueil, page achat-vente) : les plus récentes encore en vente. */
function saleTeaserHTML(title = 'Nos véhicules à vendre', n = 8) {
  const list = onSale().sort((a, b) => (a.listedAt < b.listedAt ? 1 : -1)).slice(0, n);
  if (!list.length) return '';
  return `<div class="sec-row vo-teaser-hd"><h2>${esc(title)}</h2><a class="more-link" href="${SALE_LIST}">Voir les ${onSale().length} véhicules <i>${icon('plus')}</i></a></div>
    <div class="hscroll vo-hscroll">${list.map(saleCard).join('')}</div>`;
}
const demoSalesNote = () => (INDEXABLE ? '' : '<p class="tst-note">Annonces d’exemple pour la démonstration : elles seront remplacées par les véhicules de PRISMA Automobiles, gérés depuis le logiciel.</p>');

/* ---------- Vitrine ---------- */
const voUi = { cat: 'all', energy: '', gear: '', pmax: '', kmax: '', sort: 'recent' };
function pageSales() {
  const c = SEO_BY_PATH[SALE_LIST] || {};
  const all = liveSales();
  const avail = onSale();
  const from = avail.length ? Math.min(...avail.map((s) => s.price)) : null;
  const opt = (v, l, cur) => `<option value="${esc(v)}" ${String(v) === String(cur) ? 'selected' : ''}>${esc(l)}</option>`;
  const cats = SALE_CATS.filter(([k]) => k === 'all' || all.some((s) => s.category === k));
  const html = `
  <section class="ph-band"><div class="wrap">
    ${pageHeadHTML({ crumbs: [['Accueil', '/'], [c.h1 || 'Véhicules à vendre', null]], h1: c.h1 || 'Voitures d’occasion à vendre près de Bordeaux', sub: esc(c.description || ''), facts: [
      ['car', `<b>${plural(avail.length, 'véhicule')}</b> à vendre${from != null ? `, dès <b>${eur(from)}</b>` : ''}`],
      ['key', '<a href="/rachat-voiture-bordeaux">Rachat</a> et <a href="/depot-vente-voiture-bordeaux">dépôt-vente</a> de votre véhicule'],
      ['pin', 'Agence d’Yvrac, à 15 minutes de Bordeaux'],
    ] })}
  </div></section>
  <section class="vo-list" id="vitrine"><div class="wrap">
    <div class="pillbar vo-cats" role="group" aria-label="Catégories">${cats.map(([k, l]) => `<button type="button" class="pill ${voUi.cat === k ? 'on' : ''}" data-vocat="${k}" aria-pressed="${voUi.cat === k}">${esc(l)}</button>`).join('')}</div>
    <button type="button" class="vo-filt-btn" data-vofilt aria-expanded="false" aria-controls="vo-filtres">${icon('sliders')}<span>Filtrer et trier</span><i data-vofiltn></i></button>
    <form class="vo-filters" id="vo-filtres" data-vofilters onsubmit="return false">
      <label class="field"><span class="lbl">Énergie</span><select class="select" name="energy">${opt('', 'Toutes', voUi.energy)}${SALE_ENERGIES.filter((e) => all.some((s) => s.energy === e)).map((e) => opt(e, e, voUi.energy)).join('')}</select></label>
      <label class="field"><span class="lbl">Boîte</span><select class="select" name="gear">${opt('', 'Toutes', voUi.gear)}${opt('Automatique', 'Automatique', voUi.gear)}${opt('Manuelle', 'Manuelle', voUi.gear)}</select></label>
      <label class="field"><span class="lbl">Budget maximum</span><select class="select" name="pmax">${opt('', 'Sans limite', voUi.pmax)}${[10000, 15000, 20000, 25000, 30000].map((p) => opt(p, eur(p), voUi.pmax)).join('')}</select></label>
      <label class="field"><span class="lbl">Kilométrage maximum</span><select class="select" name="kmax">${opt('', 'Sans limite', voUi.kmax)}${[30000, 50000, 75000, 100000].map((k) => opt(k, kmFmt(k), voUi.kmax)).join('')}</select></label>
      <label class="field"><span class="lbl">Trier par</span><select class="select" name="sort">${opt('recent', 'Nouveautés', voUi.sort)}${opt('prix', 'Prix croissant', voUi.sort)}${opt('prixd', 'Prix décroissant', voUi.sort)}${opt('km', 'Kilométrage', voUi.sort)}${opt('annee', 'Année la plus récente', voUi.sort)}</select></label>
    </form>
    <p class="res-count" data-vocount></p>
    <div class="rgrid vo-grid" data-vogrid>${all.map(saleCard).join('')}</div>
    <div class="empty" data-voempty hidden>${icon('search')}Aucun véhicule ne correspond à ces critères pour le moment.<br><br><a class="btn btn-ghost" href="#estimation" data-jump="estimation">Décrire ma recherche</a></div>
    ${demoSalesNote()}
  </div></section>
  ${c.sections && c.sections.length ? `<div class="wrap seo-body">${seoLeadHTML(c.lead)}<article class="seo-article">${sectionsHTML(c.sections)}</article></div>` : ''}
  ${estimationHTML('achat')}
  <div class="wrap seo-body">${faqHTML(c.faq)}${relatedHTML(c.related || ['/achat-vente-voiture-bordeaux', '/depot-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches'])}</div>
  ${ctaBandHTML('Un véhicule vous intéresse ?', { text: `Appelez-nous au ${db.settings.phone} ou écrivez-nous sur WhatsApp pour le voir à l’agence d’Yvrac.`, primary: ['Voir les véhicules', '#vitrine'], wa: 'Bonjour, je suis intéressé par un véhicule à vendre sur votre site.' })}`;
  return publicPage(html, { active: 'vente' });
}
function mountSales() {
  const grid = $('[data-vogrid]');
  if (!grid) return;
  const f = $('[data-vofilters]');
  const cards = $$('.vo-card', grid);
  const apply = () => {
    const { cat, energy, gear, pmax, kmax, sort } = voUi;
    let n = 0;
    for (const c of cards) {
      const d = c.dataset;
      const show = (cat === 'all' || d.cat === cat) && (!energy || d.energy === energy) && (!gear || d.gear === gear) && (!pmax || +d.price <= +pmax) && (!kmax || +d.km <= +kmax);
      c.hidden = !show;
      if (show) n++;
    }
    // vendus en fin de liste, puis le tri choisi
    const key = { recent: (c) => -Date.parse(c.dataset.listed || 0), prix: (c) => +c.dataset.price, prixd: (c) => -c.dataset.price, km: (c) => +c.dataset.km, annee: (c) => -c.dataset.year }[sort];
    cards.slice().sort((a, b) => (a.classList.contains('vendu') - b.classList.contains('vendu')) || (key(a) - key(b))).forEach((c) => grid.appendChild(c));
    const avail = cards.filter((c) => !c.hidden && !c.classList.contains('vendu')).length;
    $('[data-vocount]').innerHTML = n ? `<b>${avail}</b> ${avail > 1 ? 'véhicules à vendre' : 'véhicule à vendre'}${n > avail ? ` et ${plural(n - avail, 'vente')} récente${n - avail > 1 ? 's' : ''}` : ''}` : '';
    $('[data-voempty]').hidden = n > 0;
  };
  $$('[data-vocat]').forEach((b) => (b.onclick = () => {
    voUi.cat = b.dataset.vocat;
    $$('[data-vocat]').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    apply();
  }));
  const fb = $('[data-vofilt]');
  const syncFb = () => { const n = [voUi.energy, voUi.gear, voUi.pmax, voUi.kmax].filter(Boolean).length; $('[data-vofiltn]').textContent = n ? String(n) : ''; };
  fb.onclick = () => { const open = !f.classList.contains('open'); f.classList.toggle('open', open); fb.setAttribute('aria-expanded', String(open)); };
  f.onchange = () => { voUi.energy = f.energy.value; voUi.gear = f.gear.value; voUi.pmax = f.pmax.value; voUi.kmax = f.kmax.value; voUi.sort = f.sort.value; syncFb(); apply(); };
  syncFb();
  apply();
  mountEstimation();
  mountSeo();
}

/* ---------- Fiche annonce ---------- */
function pageSale(id) {
  const s = sale(id);
  if (!s || s.deleted) return pageNotFound();
  const st = SALE_STATUS[s.status] || SALE_STATUS.disponible;
  const ph = SALE_PHOTOS[s.id];
  const photo = s.photo || (ph && ph.src);
  const others = onSale().filter((x) => x.id !== s.id).sort((a, b) => (Math.abs(a.price - s.price) - Math.abs(b.price - s.price))).slice(0, 8);
  const wa = `Bonjour, je suis intéressé par le véhicule ${saleFull(s)} (réf. ${s.ref}) vu sur votre site.`;
  const specs = [
    ['Marque', s.brand], ['Modèle', s.model], ['Version', s.version], ['Année', s.year], ['Mise en circulation', saleReg(s)], ['Kilométrage', kmFmt(s.km)],
    ['Énergie', s.energy], ['Boîte de vitesses', s.gearbox], ['Puissance', s.power ? `${s.power} ch` : ''], ['Portes', s.doors], ['Places', s.seats],
    ['Couleur', s.colorName], ['Vignette Crit’Air', String(saleCritair(s))], ['Propriétaires', s.owners === 1 ? 'Première main' : s.owners ? String(s.owners) : ''],
    ['Contrôle technique', saleCT(s)], ['Référence', s.ref],
  ].filter(([, v]) => v !== '' && v != null);
  const html = `<div class="wrap vd vo-page" data-og-d="${esc(`${s.year} · ${kmFmt(s.km)} · ${s.energy} · ${eur(s.price)}`)}">
    ${crumbsHTML([['Accueil', '/'], ['Véhicules à vendre', SALE_LIST], [saleName(s), null]])}
    <div class="vd-head">
      <div><span class="vd-badge">${esc(s.brand)}</span><h1>${esc(saleFull(s))} d’occasion</h1><p class="vd-sub">${esc(String(s.year))} · ${esc(kmFmt(s.km))} · ${esc(s.energy)} · ${esc(s.gearbox)}${s.mode === 'depot' ? ' · dépôt-vente' : ''}</p></div>
      <div class="vd-contact"><a href="${telHref()}">${icon('phone')}Appeler</a><a href="${waHref(wa)}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
    </div>
    <div class="vd-grid">
      <div class="vd-gal">
        <div class="vd-main vo-main" data-vomain>${saleShot(s, { big: true })}${saleTags(s)}</div>
        <div class="vd-thumbs">
          <button type="button" class="on" data-voview="studio" aria-label="Vue studio">${saleShot(s)}</button>
          ${photo && !s.photo ? `<button type="button" data-voview="photo" aria-label="Photo du véhicule"><img src="${esc(photo)}" alt="" loading="lazy"></button>` : ''}
        </div>
        ${ph && ph.credit && !s.photo ? `<p class="credit">Photo : ${esc(ph.credit.author || 'libre de droits')}${ph.credit.license ? `, ${esc(ph.credit.license)}` : ''}. Photo d’illustration.</p>` : ''}
      </div>
      <aside class="vd-book vo-buy">
        <div class="vd-price"><span class="vd-pl">Prix</span><b class="num">${eur(s.price)}</b><span class="vd-km">Réf. ${esc(s.ref)} · <span class="badge ${st[1]}">${st[0]}</span></span></div>
        ${s.status === 'reserve' ? `<div class="alert warn">${icon('info')}<span>Ce véhicule est réservé. Laissez vos coordonnées : nous vous prévenons s’il se libère.</span></div>` : ''}
        ${s.status === 'vendu' ? `<div class="alert info">${icon('info')}<span>Ce véhicule est vendu. Décrivez-nous votre recherche : nous vous proposerons des modèles proches.</span></div>` : ''}
        <a class="btn btn-primary btn-lg btn-block" href="#contact-annonce" data-jump="contact-annonce">${s.status === 'vendu' ? 'Décrire ma recherche' : 'Je suis intéressé'}</a>
        <a class="btn btn-wa btn-block" href="${waHref(wa)}" target="_blank" rel="noopener">${icon('wa')}Écrire sur WhatsApp</a>
        <ul class="vo-perks">
          <li>${icon('pin')}<span>À voir à l’agence d’Yvrac, sur rendez-vous</span></li>
          <li>${icon('key')}<span>Votre véhicule actuel : <a href="/rachat-voiture-bordeaux">faites estimer sa reprise</a></span></li>
          ${s.mode === 'depot' ? `<li>${icon('users')}<span>Vendu en dépôt-vente pour le compte de son propriétaire</span></li>` : `<li>${icon('check')}<span>Vendu par PRISMA Automobiles</span></li>`}
        </ul>
      </aside>
    </div>
    <div class="vd-info vo-info">
      <div>
        <h2>Caractéristiques</h2>
        <div class="vo-specs">${specs.map(([k, v]) => `<div class="kv"><span>${esc(k)}</span><b>${esc(String(v))}</b></div>`).join('')}</div>
        ${s.equipment && s.equipment.length ? `<h3>Équipements</h3><ul class="vd-eq">${s.equipment.map((e) => `<li>${icon('check')}${esc(e)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="conds-card">
        <h3>Le mot du vendeur</h3>
        <p class="vd-desc">${esc(s.description || '')}</p>
        <div class="kv"><span>Prix</span><b>${eur(s.price)}</b></div>
        <div class="kv"><span>Disponibilité</span><b>${st[0]}</b></div>
        <div class="kv"><span>Lieu</span><b>Agence d’Yvrac</b></div>
        <p class="muted vo-docs">À la vente : certificat de cession, carte grise barrée, certificat de situation administrative de moins de 15 jours et, pour un véhicule de plus de 4 ans, contrôle technique de moins de 6 mois. <a class="link" href="/guides/vendre-sa-voiture-demarches">Les démarches en détail</a>.</p>
      </div>
    </div>
    <section class="est vo-contact" id="contact-annonce"><div class="est-in">
      <div class="est-copy">
        <span class="eyebrow">Réf. ${esc(s.ref)}</span>
        <h2>${s.status === 'vendu' ? 'Décrivez-nous votre recherche' : 'Ce véhicule vous intéresse ?'}</h2>
        <p>Posez vos questions, demandez un rendez-vous pour le voir à l’agence d’Yvrac ou réservez-le : nous vous rappelons rapidement.</p>
        <ul class="lp-facts"><li>${icon('phone')}<span>${esc(db.settings.phone)}, aussi sur WhatsApp</span></li><li>${icon('clock')}<span>${esc(weekHoursText())}</span></li></ul>
      </div>
      <form class="est-form" data-vocontact novalidate>
        <label class="field"><span class="lbl">Votre demande</span><select class="select" name="kind"><option>Plus d’informations</option><option>Rendez-vous pour voir le véhicule</option>${s.status === 'disponible' ? '<option>Réserver ce véhicule</option>' : ''}</select></label>
        <div class="grid2"><label class="field" data-f="firstName"><span class="lbl">Prénom <span class="req">*</span></span><input class="input" name="firstName" autocomplete="given-name"><span class="msg">Champ obligatoire.</span></label><label class="field" data-f="lastName"><span class="lbl">Nom <span class="req">*</span></span><input class="input" name="lastName" autocomplete="family-name"><span class="msg">Champ obligatoire.</span></label></div>
        <div class="grid2"><label class="field" data-f="phone"><span class="lbl">Téléphone <span class="req">*</span></span><input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel"><span class="msg">Numéro de téléphone incomplet.</span></label><label class="field" data-f="email"><span class="lbl">Email</span><input class="input" name="email" type="email" autocomplete="email" inputmode="email"><span class="msg">Adresse email invalide.</span></label></div>
        <label class="check"><input type="checkbox" name="trade" data-trade><span>J’ai un véhicule à faire reprendre</span></label>
        <div class="grid3" data-tradef hidden><label class="field"><span class="lbl">Marque et modèle</span><input class="input" name="tModel" placeholder="Renault Clio"></label><label class="field"><span class="lbl">Année</span><input class="input" name="tYear" inputmode="numeric" maxlength="4" placeholder="2017"></label><label class="field"><span class="lbl">Kilométrage</span><input class="input" name="tKm" inputmode="numeric" placeholder="95 000"></label></div>
        <label class="field"><span class="lbl">Message</span><textarea class="textarea" name="message" placeholder="Vos questions, vos disponibilités pour un rendez-vous…"></textarea></label>
        <button class="btn btn-primary btn-lg" type="submit">Envoyer ma demande</button>
        <p class="est-note">Vos informations servent uniquement à vous recontacter au sujet de ce véhicule.</p>
      </form>
    </div></section>
    ${others.length ? `<section class="vd-more"><div class="sec-row"><h2>D’autres véhicules à vendre</h2><a class="more-link" href="${SALE_LIST}">Tous les véhicules <i>${icon('plus')}</i></a></div><div class="hscroll">${others.map(saleCard).join('')}</div></section>` : ''}
  </div>`;
  return publicPage(html, { active: 'vente' });
}
function mountSale(id) {
  const s = sale(id);
  const main = $('[data-vomain]');
  if (!s || !main) return;
  const tags = saleTags(s);
  $$('[data-voview]').forEach((b) => (b.onclick = () => {
    $$('[data-voview]').forEach((x) => x.classList.toggle('on', x === b));
    main.classList.remove('swap'); void main.offsetWidth; main.classList.add('swap');
    main.innerHTML = (b.dataset.voview === 'photo' ? `<img class="vd-photo" src="${esc(s.photo || SALE_PHOTOS[s.id].src)}" alt="${esc(saleFull(s))}">` : saleShot(s, { big: true })) + tags;
  }));
  const f = $('[data-vocontact]');
  if (f) {
    const tr = $('[data-tradef]', f);
    f.trade.onchange = () => { tr.hidden = !f.trade.checked; };
    f.onsubmit = (e) => {
      e.preventDefault();
      const g = (n) => (f[n] ? f[n].value.trim() : '');
      const errs = ['firstName', 'lastName', 'phone'].filter((n) => !g(n));
      if (g('phone') && g('phone').replace(/\D/g, '').length < 10) errs.push('phone');
      if (g('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('email'))) errs.push('email');
      $$('[data-f]', f).forEach((el) => el.classList.toggle('err', errs.includes(el.dataset.f)));
      if (errs.length) { toast('Vérifiez les champs signalés.', 'warn'); $(`[data-f="${errs[0]}"] .input`, f)?.focus(); return; }
      const trade = f.trade.checked ? [g('tModel'), g('tYear'), g('tKm') && `${g('tKm')} km`].filter(Boolean).join(', ') : '';
      const message = [`Demande : ${g('kind')}`, `Véhicule : ${saleFull(s)} (réf. ${s.ref}, ${eur(s.price)})`, trade && `Reprise souhaitée : ${trade}`, g('message') && `Message : ${g('message')}`].filter(Boolean).join('\n');
      if (!db.messages) db.messages = [];
      db.messages.unshift({ id: uid('m'), at: toISO(new Date()), firstName: g('firstName'), lastName: g('lastName'), email: g('email').toLowerCase(), phone: g('phone'), subject: `Annonce ${s.ref} : ${saleName(s)}`, message, saleId: s.id, done: false });
      save();
      f.reset();
      tr.hidden = true;
      toast('Demande envoyée : nous vous rappelons rapidement.', 'ok');
    };
  }
  mountSeo();
}

/* ---------- Données structurées d'une annonce ---------- */
function saleLd(s) {
  const url = absUrl(saleHref(s));
  const ph = SALE_PHOTOS[s.id];
  const img = ph && ph.src && !s.photo ? absAsset(ph.src) : undefined;
  return {
    '@type': ['Product', s.category === 'utilitaire' ? 'Vehicle' : 'Car'], '@id': url + '#vehicule', name: `${saleFull(s)} d’occasion`, url,
    description: stripTags(s.description || ''), image: img ? [img] : undefined, sku: s.ref,
    brand: { '@type': 'Brand', name: s.brand }, model: s.model, vehicleModelDate: String(s.year), dateVehicleFirstRegistered: s.firstReg || undefined,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: s.km, unitCode: 'KMT' }, fuelType: s.energy, vehicleTransmission: s.gearbox, color: s.colorName || undefined,
    numberOfDoors: s.doors, vehicleSeatingCapacity: s.seats, vehicleEngine: s.power ? { '@type': 'EngineSpecification', enginePower: { '@type': 'QuantitativeValue', value: s.power, unitText: 'ch' } } : undefined,
    itemCondition: 'https://schema.org/UsedCondition',
    offers: { '@type': 'Offer', url, price: Number(s.price).toFixed(2), priceCurrency: 'EUR', itemCondition: 'https://schema.org/UsedCondition', availability: s.status === 'vendu' ? 'https://schema.org/SoldOut' : s.status === 'reserve' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock', seller: { '@id': SITE_URL + '/#agence' } },
  };
}
