/* =====================================================================
   SCÈNE « APPLICATION CLIENT » : téléphone 3D flottant, vraies captures
   de l'application qui défilent et s'enchaînent comme une navigation
   (accueil, catalogue, fiche, options, coordonnées, paiement, confirmation).
   ===================================================================== */
const PH = {
  t0: 16.0, enter: [15.82, 16.95],
  scroll: [[17.55, 18.55, 0, 1.2], [18.75, 19.65, 1.2, 3.25]],
  pushes: [[19.8, 'm-fiche'], [21.4, 'm-options'], [23.0, 'm-coordonnees'], [24.6, 'm-paiement'], [26.2, 'm-confirmee']],
  pushDur: 0.5,
  exit: [27.35, 28.15],
};

/** Fond commun aux scènes « produit » : dégradé chaud, grandes taches de lumière floues, poussière. */
function productBackdrop(scene, { seed = 3 } = {}) {
  scene.add(backdrop({ z: -14, w: 80, h: 46, inner: 'rgba(38,30,21,1)', gain: 1 }));
  const blobTex = U.glowTex([[0, 'rgba(255,255,255,1)'], [0.5, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']], 256);
  const blobs = [[0x9a6a2e, 10, -4.8, 2.2, -9, 0.2], [0x2a3f66, 12, 5.8, -2.6, -10, 0.12], [0x7a5a3a, 8, 2.0, 3.6, -11, 0.1], [0x6b5a40, 7, -7, -3, -9, 0.1]].map(([c, s, x, y, z, k2], i) => {
    const m = new T.Sprite(new T.SpriteMaterial({ map: blobTex, color: new T.Color(c).multiplyScalar(k2), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    m.scale.setScalar(s); m.position.set(x, y, z); m.userData.base = [x, y]; m.userData.k = i;
    scene.add(m);
    return m;
  });
  const dust = makeDust({ count: 180, box: [16, 9, 8], center: [0, 0, -2], size: 0.022, seed, opacity: 0.55 });
  scene.add(dust);
  return (t) => {
    blobs.forEach((b) => { const k = b.userData.k; b.position.x = b.userData.base[0] + Math.sin(t * 0.13 + k * 1.7) * 1.2; b.position.y = b.userData.base[1] + Math.cos(t * 0.11 + k) * 0.8; });
    dust.userData.setTime(t);
  };
}

function buildPhoneScene(A) {
  const scene = new T.Scene();
  const env = studioEnv(E.renderer);
  scene.environment = env;
  const camera = new T.PerspectiveCamera(30, W / H, 0.05, 100);
  const bgUpdate = productBackdrop(scene, { seed: 41 });
  scene.add(new T.AmbientLight(0xffffff, 0.3));
  const key = new T.DirectionalLight(0xfff1dc, 1.6); key.position.set(-3, 4, 5); scene.add(key);
  const rim = new T.DirectionalLight(0xcadae9, 1.2); rim.position.set(4, 2, -3); scene.add(rim);
  const ph = buildPhone({ env, frame: 0x46444a });
  scene.add(ph.group);
  const m = ph.mat.uniforms;
  m.tStatus.value = A.status;
  m.tHead.value = A['m-header'];
  m.headH.value = A['m-header'].userData.h / A['m-header'].userData.w;
  m.headOn.value = 1;
  const asp = (k) => A[k].userData.h / A[k].userData.w;
  const scrollAt = (t) => {
    let s = 0;
    for (const [a, b, s0, s1] of PH.scroll) if (t >= a) s = U.lerp(s0, s1, U.io(U.prog(t, a, b)));
    return s;
  };

  function update(t) {
    // écran : défilement puis navigation de page en page
    let cur = 'm-scroll', next = null, push = 0;
    for (let i = 0; i < PH.pushes.length; i++) {
      const [pt, id] = PH.pushes[i];
      if (t >= pt + PH.pushDur) cur = id;
      else if (t >= pt) { next = id; push = U.io(U.prog(t, pt, pt + PH.pushDur)); break; }
      else break;
    }
    m.tA.value = A[cur]; m.aspA.value = asp(cur); m.scrollA.value = cur === 'm-scroll' ? scrollAt(t) : 0;
    m.tB.value = next ? A[next] : A[cur]; m.aspB.value = next ? asp(next) : asp(cur); m.scrollB.value = 0;
    m.push.value = next ? push : 0;
    m.bright.value = 0.9;
    // téléphone : entrée, flottement, petite impulsion à chaque navigation, sortie
    const en = U.sig(U.prog(t, PH.enter[0], PH.enter[1]));
    const ex = U.inOutCubic(U.prog(t, PH.exit[0], PH.exit[1]));
    let kick = 0;
    for (const [pt] of PH.pushes) kick += U.bell(t, pt + 0.2, 0.28);
    const g = ph.group;
    g.position.set(-ex * 3.6, U.lerp(-2.6, 0, en) + Math.sin(t * 1.3) * 0.012 + ex * 0.4, -ex * 1.5);
    g.rotation.set(U.lerp(0.55, 0.05, en) + Math.sin(t * 0.7) * 0.02, U.lerp(-1.05, -0.3, en) + Math.sin((t - PH.t0) * 0.45) * 0.07 + kick * 0.06 - ex * 0.8, U.lerp(-0.14, 0, en) + ex * 0.15);
    // caméra : lent travelling avant, le téléphone reste à droite du texte
    const dz = U.io(U.prog(t, PH.t0, PH.exit[0]));
    camera.position.set(-0.62 + U.noise1(t * 0.3, 7) * 0.02, 0.02 + U.noise1(t * 0.25, 8) * 0.015, U.lerp(4.85, 4.6, dz));
    camera.lookAt(-0.62, 0, 0);
    bgUpdate(t);
  }
  const blurVec = (t) => {
    // sortie rapide : flou horizontal
    const v = U.inOutCubic(U.prog(t + 0.008, PH.exit[0], PH.exit[1])) - U.inOutCubic(U.prog(t - 0.008, PH.exit[0], PH.exit[1]));
    return [-v * 0.9, 0];
  };
  return { scene, camera, update, blurVec };
}

function phoneUI() {
  const steps = [
    ['Choisissez le véhicule', 'Catalogue, fiche, vue 3D'],
    ['Ajoutez vos options', 'Protections, conducteur, siège enfant'],
    ['Indiquez vos coordonnées', 'Particulier ou professionnel'],
    ['Payez en ligne', 'Carte, Apple Pay, 3 ou 4 fois'],
  ];
  const box = UI.el(`<div class="abs" style="left:150px;top:250px;width:760px">
    <div class="eyebrow" data-e style="display:flex;align-items:center;gap:18px"><i style="display:block;width:46px;height:1.5px;background:var(--gold2)"></i>Application client</div>
    <div class="h-lg" style="margin-top:26px" data-t1><span class="line-mask"><span>Réservez en</span></span></div>
    <div class="h-lg" style="margin-top:4px" data-t2><span class="line-mask"><span class="gold" style="background-size:220% 100%">4 étapes</span></span></div>
    <div data-steps style="margin-top:54px">${steps.map((s, i) => `
      <div class="st" style="display:flex;align-items:flex-start;gap:26px;padding:16px 0;border-top:1px solid rgba(255,255,255,.1)">
        <div class="n" style="font-family:Michroma;font-size:20px;letter-spacing:.08em;width:44px;padding-top:6px;color:var(--gold2)">0${i + 1}</div>
        <div style="flex:1"><div class="a" style="font-size:30px;font-weight:600;letter-spacing:-.005em">${s[0]}</div><div class="b" style="font-size:20px;color:var(--muted);margin-top:6px">${s[1]}</div></div>
        <div class="ok" style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#f6e7c2,#b8894a);color:#111;margin-top:4px">${UI.svg.check.replace('stroke-width="1.75"', 'stroke-width="2.4"').replace('<circle cx="12" cy="12" r="9"/>', '')}</div>
      </div>`).join('')}
    </div></div>`);
  const rows = [...box.querySelectorAll('.st')];
  const chips = [
    [18.2, 19.7, 'car', 'Voitures et utilitaires', 'Photos réelles, prix au jour', 330],
    [20.0, 21.3, 'search', 'Fiche détaillée', 'Vue 3D, conditions, caution', 420],
    [21.6, 22.9, 'shield', 'Protections à la carte', 'Franchise réduite ou à zéro', 360],
    [23.2, 24.5, 'users', 'Particulier ou professionnel', 'Prix HT et facture au nom de la société', 300],
    [24.8, 26.1, 'card', 'Paiement sécurisé', 'Carte, Apple Pay, 3 ou 4 fois sans frais', 520],
    [26.45, 27.3, 'check', 'Réservation confirmée', 'Email et espace client', 430],
  ].map(([a, b, ic, ti, su, y]) => { const c = UI.chip(ic, ti, su); c.style.left = '1368px'; c.style.top = y + 'px'; return { c, a, b }; });
  // étape active selon l'écran affiché
  const stepAt = (t) => (t < 21.4 ? 0 : t < 23.0 ? 1 : t < 24.6 ? 2 : t < 26.2 ? 3 : 4);
  UI.add((t) => {
    const on = t > 15.9 && t < 28.3;
    if (!on) { UI.set(box, { o: 0 }); chips.forEach(({ c }) => UI.set(c, { o: 0 })); return; }
    const out = U.inCubic(U.prog(t, 27.25, 27.85));
    UI.set(box, { o: 1 - out, x: -out * 60, blur: out * 8 });
    const pe = U.sig(U.prog(t, 16.35, 17.0));
    UI.set(box.querySelector('[data-e]'), { o: pe, x: (1 - pe) * -20 });
    const p1 = U.sig(U.prog(t, 16.45, 17.25)), p2 = U.sig(U.prog(t, 16.6, 17.4));
    box.querySelector('[data-t1] .line-mask > span').style.transform = `translate3d(0, ${((1 - p1) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-t2] .line-mask > span').style.transform = `translate3d(0, ${((1 - p2) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-t2] .gold').style.backgroundPosition = `${(100 - U.prog(t, 16.6, 19) * 100).toFixed(1)}% 0`;
    const cur = stepAt(t);
    rows.forEach((r, i) => {
      const pr = U.sig(U.prog(t, 17.2 + i * 0.09, 17.9 + i * 0.09));
      const active = i === cur, done = i < cur;
      const act = U.smooth(U.prog(t, [17.6, 21.4, 23.0, 24.6][i], [17.9, 21.7, 23.3, 24.9][i])) * (1 - U.smooth(U.prog(t, [21.4, 23.0, 24.6, 26.2][i], [21.7, 23.3, 24.9, 26.5][i])));
      UI.set(r, { o: pr * (0.34 + 0.66 * Math.max(act, done ? 0.55 : 0)), y: (1 - pr) * 20 });
      r.querySelector('.b').style.opacity = (0.35 + 0.65 * act).toFixed(3);
      r.querySelector('.b').style.maxHeight = '40px';
      const okP = U.outBack(U.prog(t, [21.45, 23.05, 24.65, 26.25][i], [21.8, 23.4, 25.0, 26.6][i]));
      r.querySelector('.ok').style.transform = `scale(${Math.max(0, okP).toFixed(3)})`;
      r.querySelector('.ok').style.opacity = Math.min(1, okP * 1.5).toFixed(3);
      r.style.borderTopColor = active ? 'rgba(227,197,143,.55)' : 'rgba(255,255,255,.1)';
    });
    chips.forEach(({ c, a, b }) => {
      const pin = U.sig(U.prog(t, a, a + 0.55)), pout = U.inCubic(U.prog(t, b - 0.3, b));
      UI.set(c, { o: pin * (1 - pout), x: (1 - pin) * 50 - pout * 20, y: (1 - pin) * 10, blur: (1 - pin) * 6 + pout * 6, s: 0.96 + 0.04 * pin });
    });
  });
}
