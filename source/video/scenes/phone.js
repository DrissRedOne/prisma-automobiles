/* =====================================================================
   SCÈNE « APPLICATION CLIENT » : téléphone 3D flottant, vraies captures
   de l'application qui défilent et s'enchaînent comme une navigation
   (accueil, catalogue, fiche, options, coordonnées, paiement, confirmation).
   Film : le téléphone repart sur le côté. Pub : la caméra plonge dans l'écran.
   ===================================================================== */
const PH = TIMING.phone;

/** Fond commun aux scènes « produit » : dégradé chaud, grandes taches de lumière floues, poussière. */
function productBackdrop(scene, { seed = 3 } = {}) {
  scene.add(backdrop({ z: -14, w: 80, h: 46, inner: 'rgba(38,30,21,1)', gain: 1 }));
  const blobTex = U.glowTex([[0, 'rgba(255,255,255,1)'], [0.5, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']], 256);
  const blobs = [[0x9a6a2e, 10, -4.8, 2.2, -9, 0.2], [0x2a3f66, 12, 5.8, -2.6, -10, 0.12], [0x7a5a3a, 8, 2.0, 3.6, -11, 0.1], [0x6b5a40, 7, -7, -3, -9, 0.1]].map(([c, s, x, y, z, k2], i) => {
    const m = new T.Sprite(new T.SpriteMaterial({ map: blobTex, color: new T.Color(c).multiplyScalar(k2), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    m.scale.setScalar(s); m.position.set(VERT ? x * 0.55 : x, VERT ? y * 1.6 : y, z); m.userData.base = [m.position.x, m.position.y]; m.userData.k = i;
    scene.add(m);
    return m;
  });
  const dust = makeDust({ count: 180, box: VERT ? [9, 16, 8] : [16, 9, 8], center: [0, 0, -2], size: 0.022, seed, opacity: 0.55 });
  scene.add(dust);
  return (t) => {
    blobs.forEach((b) => { const k = b.userData.k; b.position.x = b.userData.base[0] + Math.sin(t * 0.13 + k * 1.7) * 1.2; b.position.y = b.userData.base[1] + Math.cos(t * 0.11 + k) * 0.8; });
    dust.userData.setTime(t);
  };
}

function buildPhoneScene(A) {
  const scene = new T.Scene();
  const env = productEnv(E.renderer);
  scene.environment = env;
  const camera = new T.PerspectiveCamera(30, W / H, 0.02, 100);
  const bgUpdate = productBackdrop(scene, { seed: 41 });
  scene.add(new T.AmbientLight(0xffffff, 0.3));
  const key = new T.DirectionalLight(0xfff1dc, 1.6); key.position.set(-3, 4, 5); scene.add(key);
  const rim = new T.DirectionalLight(0xcadae9, 1.2); rim.position.set(4, 2, -3); scene.add(rim);
  const ph = buildPhone({ env });
  scene.add(ph.group);
  // halo doux derrière le téléphone : la silhouette sombre se détache du fond
  const haloTex = U.glowTex([[0, 'rgba(255,255,255,1)'], [0.45, 'rgba(255,255,255,.4)'], [1, 'rgba(255,255,255,0)']], 256);
  const halo = new T.Sprite(new T.SpriteMaterial({ map: haloTex, color: new T.Color(0.11, 0.09, 0.07), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
  halo.scale.set(2.6, 3.1, 1); halo.position.set(0, 0, -1.6);
  scene.add(halo);
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
  // cadrage : à droite du texte (horizontal) ou centré sous le titre (vertical)
  const CX = VERT ? 0 : -0.62, CY = VERT ? 0.1 : 0, Z0 = VERT ? 6.4 : 4.35, Z1 = VERT ? 6.1 : 4.1;
  const dive = PH.mode === 'dive';
  const screenCenterY = 0;       // l'écran est centré sur le téléphone

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
    const ex = dive ? 0 : U.inOutCubic(U.prog(t, PH.exit[0], PH.exit[1]));
    const dv = dive ? U.inOutCubic(U.prog(t, PH.exit[0], PH.exit[1])) : 0;
    let kick = 0;
    for (const [pt] of PH.pushes) kick += U.bell(t, pt + 0.2, 0.28);
    const g = ph.group;
    const yaw0 = VERT ? -0.2 : -0.3;
    g.position.set(-ex * 3.6, U.lerp(-2.6, 0, en) + Math.sin(t * 1.3) * 0.012 * (1 - dv) + ex * 0.4, -ex * 1.5);
    halo.position.set(g.position.x, g.position.y, -1.6);
    halo.material.opacity = en * (1 - ex) * (1 - dv);
    g.rotation.set(
      (U.lerp(0.55, 0.05, en) + Math.sin(t * 0.7) * 0.02) * (1 - dv),
      (U.lerp(-1.05, yaw0, en) + Math.sin((t - PH.t0) * 0.45) * 0.07 + kick * 0.06 - ex * 0.8) * (1 - dv),
      U.lerp(-0.14, 0, en) + ex * 0.15,
    );
    // caméra : lent travelling avant ; en « plongée », elle rentre dans l'écran
    const cx = U.lerp(CX + U.noise1(t * 0.3, 7) * 0.02, 0, dv), cy = U.lerp(CY + U.noise1(t * 0.25, 8) * 0.015, screenCenterY, dv);
    camera.position.set(cx, cy, camZ(t));
    camera.lookAt(U.lerp(CX, 0, dv), U.lerp(CY, screenCenterY, dv), 0);
    bgUpdate(t);
  }
  function camZ(t) {
    const dz = U.io(U.prog(t, PH.t0, PH.exit[0]));
    const dv = dive ? U.inOutCubic(U.prog(t, PH.exit[0], PH.exit[1])) : 0;
    return U.lerp(U.lerp(Z0, Z1, dz), 0.34, dv);
  }
  // plongée : variation d'échelle pendant l'obturation (flou de zoom)
  const zoomBlur = (t) => {
    if (!dive) return 0;
    const d = 0.25 / FPS, sz = 0.045;
    return Math.abs((camZ(t - d) - sz) / (camZ(t + d) - sz) - 1);
  };
  const blurVec = (t) => {
    if (dive) return null;
    // sortie rapide : flou horizontal
    const v = U.inOutCubic(U.prog(t + 0.008, PH.exit[0], PH.exit[1])) - U.inOutCubic(U.prog(t - 0.008, PH.exit[0], PH.exit[1]));
    return [-v * 0.9, 0];
  };
  return { scene, camera, update, blurVec, zoomBlur };
}

/* ---------- Textes de la scène ---------- */
const PHONE_COPY = CUT === 'pub' ? {
  eyebrow: 'Application PRISMA', t1: 'Réservez', t2: 'en ligne', sub: 'En quelques minutes, 24 h sur 24.',
  steps: null,
  chips: [
    [15.0, 16.0, 'car', 'Toute la flotte en ligne', 'Voitures et utilitaires, photos réelles'],
    [16.3, 17.4, 'search', 'Chaque véhicule en détail', 'Photos, vue 3D, conditions'],
    [17.7, 18.8, 'users', 'Particuliers et professionnels', 'Prix HT et facture au nom de la société'],
    [19.1, 20.2, 'card', 'Payez en 3 ou 4 fois', 'Sans frais, carte ou Apple Pay'],
    [20.5, 21.25, 'check', 'Réservation confirmée', 'Aussitôt, par email'],
  ],
} : {
  eyebrow: 'Application client', t1: 'Réservez en', t2: '4 étapes', sub: null,
  steps: [
    ['Choisissez le véhicule', 'Catalogue, fiche, vue 3D'],
    ['Ajoutez vos options', 'Protections, conducteur, siège enfant'],
    ['Indiquez vos coordonnées', 'Particulier ou professionnel'],
    ['Payez en ligne', 'Carte, Apple Pay, 3 ou 4 fois'],
  ],
  chips: [
    [18.2, 19.7, 'car', 'Voitures et utilitaires', 'Photos réelles, prix au jour'],
    [20.0, 21.3, 'search', 'Fiche détaillée', 'Vue 3D, conditions, caution'],
    [21.6, 22.9, 'shield', 'Protections à la carte', 'Franchise réduite ou à zéro'],
    [23.2, 24.5, 'users', 'Particulier ou professionnel', 'Prix HT et facture au nom de la société'],
    [24.8, 26.1, 'card', 'Paiement sécurisé', 'Carte, Apple Pay, 3 ou 4 fois sans frais'],
    [26.45, 27.3, 'check', 'Réservation confirmée', 'Email et espace client'],
  ],
};

function phoneUI() {
  const C = PHONE_COPY;
  const t0 = PH.t0, end = PH.exit[0];
  const steps = C.steps && !VERT ? C.steps : null;
  const pos = VERT ? 'left:0;right:0;top:150px;text-align:center' : 'left:150px;top:250px;width:760px';
  const box = UI.el(`<div class="abs" style="${pos}">
    <div class="eyebrow" data-e style="display:flex;align-items:center;gap:18px;${VERT ? 'justify-content:center' : ''}"><i style="display:block;width:46px;height:1.5px;background:var(--gold2)"></i>${C.eyebrow}${VERT ? '<i style="display:block;width:46px;height:1.5px;background:var(--gold2)"></i>' : ''}</div>
    <div class="h-lg" style="margin-top:26px;${VERT ? 'font-size:66px' : ''}" data-t1><span class="line-mask"><span>${C.t1}</span></span></div>
    <div class="h-lg" style="margin-top:4px;${VERT ? 'font-size:66px' : ''}" data-t2><span class="line-mask"><span class="gold" style="background-size:220% 100%">${C.t2}</span></span></div>
    ${C.sub ? `<div class="sub" data-s style="margin-top:${VERT ? 22 : 30}px;${VERT ? 'font-size:32px' : ''}">${C.sub}</div>` : ''}
    ${steps ? `<div data-steps style="margin-top:54px">${steps.map((s, i) => `
      <div class="st" style="display:flex;align-items:flex-start;gap:26px;padding:16px 0;border-top:1px solid rgba(255,255,255,.1)">
        <div class="n" style="font-family:Michroma;font-size:20px;letter-spacing:.08em;width:44px;padding-top:6px;color:var(--gold2)">0${i + 1}</div>
        <div style="flex:1"><div class="a" style="font-size:30px;font-weight:600;letter-spacing:-.005em">${s[0]}</div><div class="b" style="font-size:20px;color:var(--muted);margin-top:6px">${s[1]}</div></div>
        <div class="ok" style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#f6e7c2,#b8894a);color:#111;margin-top:4px">${UI.svg.check.replace('stroke-width="1.75"', 'stroke-width="2.4"').replace('<circle cx="12" cy="12" r="9"/>', '')}</div>
      </div>`).join('')}</div>` : ''}
  </div>`);
  const rows = [...box.querySelectorAll('.st')];
  const chips = C.chips.map(([a, b, ic, ti, su], k) => {
    const c = UI.chip(ic, ti, su);
    if (VERT) { c.style.left = '50%'; c.style.top = '1575px'; c.style.transformOrigin = 'center'; c.dataset.center = '1'; }
    else { c.style.left = '1368px'; c.style.top = [330, 420, 360, 300, 520, 430][k % 6] + 'px'; }
    return { c, a, b };
  });
  const pushT = PH.pushes.map((p) => p[0]);
  const stepAt = (t) => (t < pushT[1] ? 0 : t < pushT[2] ? 1 : t < pushT[3] ? 2 : t < pushT[4] ? 3 : 4);
  UI.add((t) => {
    const on = t > t0 - 0.1 && t < end + 0.95;
    if (!on) { UI.set(box, { o: 0 }); chips.forEach(({ c }) => UI.set(c, { o: 0 })); return; }
    const out = U.inCubic(U.prog(t, end - 0.1, end + 0.5));
    UI.set(box, { o: 1 - out, x: VERT ? 0 : -out * 60, y: VERT ? -out * 40 : 0, blur: out * 8 });
    const pe = U.sig(U.prog(t, t0 + 0.35, t0 + 1.0));
    UI.set(box.querySelector('[data-e]'), { o: pe, x: VERT ? 0 : (1 - pe) * -20, y: VERT ? (1 - pe) * 10 : 0 });
    const p1 = U.sig(U.prog(t, t0 + 0.45, t0 + 1.25)), p2 = U.sig(U.prog(t, t0 + 0.6, t0 + 1.4));
    box.querySelector('[data-t1] .line-mask > span').style.transform = `translate3d(0, ${((1 - p1) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-t2] .line-mask > span').style.transform = `translate3d(0, ${((1 - p2) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-t2] .gold').style.backgroundPosition = `${(100 - U.prog(t, t0 + 0.6, t0 + 3) * 100).toFixed(1)}% 0`;
    const s = box.querySelector('[data-s]');
    if (s) { const ps = U.sig(U.prog(t, t0 + 0.85, t0 + 1.55)); UI.set(s, { o: ps, y: (1 - ps) * 14 }); }
    if (rows.length) {
      const cur = stepAt(t);
      rows.forEach((r, i) => {
        const pr = U.sig(U.prog(t, t0 + 1.2 + i * 0.09, t0 + 1.9 + i * 0.09));
        const a0 = i === 0 ? t0 + 1.6 : pushT[i], a1 = pushT[i + 1] ?? 99;
        const act = U.smooth(U.prog(t, a0, a0 + 0.3)) * (1 - U.smooth(U.prog(t, a1, a1 + 0.3)));
        UI.set(r, { o: pr * (0.34 + 0.66 * Math.max(act, i < cur ? 0.55 : 0)), y: (1 - pr) * 20 });
        r.querySelector('.b').style.opacity = (0.35 + 0.65 * act).toFixed(3);
        const okP = U.outBack(U.prog(t, a1 + 0.05, a1 + 0.4));
        r.querySelector('.ok').style.transform = `scale(${Math.max(0, okP).toFixed(3)})`;
        r.querySelector('.ok').style.opacity = Math.min(1, okP * 1.5).toFixed(3);
        r.style.borderTopColor = i === cur ? 'rgba(227,197,143,.55)' : 'rgba(255,255,255,.1)';
      });
    }
    chips.forEach(({ c, a, b }) => {
      const pin = U.sig(U.prog(t, a, a + 0.55)), pout = U.inCubic(U.prog(t, b - 0.3, b));
      const o = pin * (1 - pout);
      if (c.dataset.center) UI.set(c, { o, x: -c.offsetWidth / 2, y: (1 - pin) * 24 - pout * 12, blur: (1 - pin) * 6 + pout * 6, s: 0.96 + 0.04 * pin });
      else UI.set(c, { o, x: (1 - pin) * 50 - pout * 20, y: (1 - pin) * 10, blur: (1 - pin) * 6 + pout * 6, s: 0.96 + 0.04 * pin });
    });
  });
}
