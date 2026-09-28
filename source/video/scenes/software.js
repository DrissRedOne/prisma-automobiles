/* =====================================================================
   SCÈNE « LOGICIEL DU LOUEUR » : grand écran 3D avec les vraies captures
   du logiciel ; les éléments du tableau de bord sortent de l'écran,
   puis planning, flotte, fiche de réservation et facture.
   ===================================================================== */
const SW = {
  enter: [27.7, 29.3], center: [29.3, 30.5],
  kpi: [30.0, 31.35], panels: [31.55, 32.95],
  pushes: [[33.15, 'd-planning'], [35.2, 'd-flotte'], [37.0, 'd-fiche-reservation']], pushDur: 0.55,
  plan: [33.3, 35.25], fleet: [35.2, 36.1], invoice: [37.35, 38.35],
};
// positions des éléments dans la capture du tableau de bord (pixels CSS, écran 1440 x 900)
const D_RECTS = { kpi: [[272, 89, 275.5, 178.4], [561.5, 89, 275.5, 178.4], [851, 89, 275.5, 178.4], [1140.5, 89, 275.5, 178.4]], today: [272, 283.4, 626.7, 452.3], chart: [272, 1042.7, 1144, 464.3] };

function buildSoftwareScene(A) {
  const scene = new T.Scene();
  const env = studioEnv(E.renderer);
  scene.environment = env;
  const camera = new T.PerspectiveCamera(30, W / H, 0.05, 100);
  const bgUpdate = productBackdrop(scene, { seed: 57 });
  scene.add(new T.AmbientLight(0xffffff, 0.3));
  const key = new T.DirectionalLight(0xfff1dc, 1.4); key.position.set(-3, 4, 6); scene.add(key);
  const d = buildDisplay({ env });
  scene.add(d.group);
  const m = d.mat.uniforms;
  const sw = d.sw, sh = d.sh, scr = d.screen.position;
  // coordonnées locales (dans l'écran) d'un rectangle de la capture
  const at = (r) => ({ x: scr.x + ((r[0] + r[2] / 2) / 1440 - 0.5) * sw, y: scr.y + (0.5 - (r[1] + r[3] / 2) / 900) * sh, w: (r[2] / 1440) * sw });
  // chaque carte qui sort de l'écran laisse un emplacement sombre derrière elle
  const slotMat = (rr, aspect) => new T.ShaderMaterial({
    uniforms: { a: { value: 0 }, r: { value: rr }, asp: { value: aspect } },
    vertexShader: SCREEN_VS,
    fragmentShader: `uniform float a, r, asp; varying vec2 vUv;
      float sdBox(vec2 p, vec2 b, float rr){ vec2 q = abs(p) - b + rr; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - rr; }
      void main(){ vec2 p = (vUv - 0.5) * vec2(1.0, asp); float d = sdBox(p, vec2(0.5, 0.5 * asp), r); float m = smoothstep(0.003, -0.003, d);
        float edge = smoothstep(0.012, 0.0, abs(d)) * 0.35; gl_FragColor = vec4(vec3(0.012) + edge * vec3(0.9, 0.78, 0.55) * 0.25, m * a); }`,
    transparent: true, depthWrite: false,
  });
  const mk = (tex, r, rad) => {
    const p = at(r);
    const c = floatingCard(tex, { width: p.w, radius: rad * p.w, shadow: 0.6, bright: 0.92 });
    c.userData.home = p; c.visible = false; d.group.add(c);
    const hh = p.w * tex.userData.h / tex.userData.w;
    const slot = new T.Mesh(new T.PlaneGeometry(p.w, hh), slotMat(rad, hh / p.w));
    slot.position.set(p.x, p.y, scr.z + 0.002); d.group.add(slot);
    c.userData.slot = slot;
    return c;
  };
  const kpis = [1, 2, 3, 4].map((i) => mk(A['d-kpi-' + i], D_RECTS.kpi[i - 1], 0.065));
  const today = mk(A['d-aujourdhui'], D_RECTS.today, 0.03);
  const chart = mk(A['d-graphique'], D_RECTS.chart, 0.018);
  chart.userData.slot.visible = false;   // le graphique est sous le bas de l'écran : il monte depuis le bord
  const invoice = floatingCard(A['d-facture'], { width: 2.05, radius: 0.012, shadow: 0.7, bright: 0.97 });
  invoice.visible = false;
  d.group.add(invoice);
  const asp = (k) => A[k].userData.h / A[k].userData.w;

  function place(card, p, to, s0 = 1, s1 = 1.18, rot = [0, 0, 0]) {
    const h = card.userData.home;
    card.visible = p > 0.001;
    card.position.set(U.lerp(h.x, to[0], p), U.lerp(h.y, to[1], p), U.lerp(0.045, to[2], p) + 0.03);
    const s = U.lerp(s0, s1, p);
    card.scale.set(s, s, 1);
    card.rotation.set(rot[0] * p, rot[1] * p, rot[2] * p);
    card.userData.shadow.material.opacity = 0.6 * U.smooth(p * 3);
    if (card.userData.slot) card.userData.slot.material.uniforms.a.value = 0.9 * U.smooth(p * 2.5);
  }

  function update(t) {
    // écran : tableau de bord, puis planning, flotte, fiche
    let cur = 'd-tableau', next = null, push = 0;
    for (const [pt, id] of SW.pushes) {
      if (t >= pt + SW.pushDur) cur = id;
      else if (t >= pt) { next = id; push = U.io(U.prog(t, pt, pt + SW.pushDur)); break; }
      else break;
    }
    m.tA.value = A[cur]; m.aspA.value = asp(cur); m.scrollA.value = 0;
    m.tB.value = next ? A[next] : A[cur]; m.aspB.value = next ? asp(next) : asp(cur); m.scrollB.value = 0;
    m.push.value = next ? push : 0;
    m.bright.value = 0.9;
    // l'écran arrive de la droite, se centre, puis vit doucement
    const en = U.sig(U.prog(t, SW.enter[0], SW.enter[1]));
    const ce = U.sig(U.prog(t, SW.center[0], SW.center[1]));
    const g = d.group;
    g.position.set(U.lerp(U.lerp(7.5, 2.8, en), 0, ce), U.lerp(-0.35, 0, en) + Math.sin(t * 0.9) * 0.01, 0);
    g.rotation.set(0.03 + Math.sin(t * 0.5) * 0.01, U.lerp(U.lerp(-0.85, -0.42, en), -0.14, ce) + Math.sin((t - 28) * 0.35) * 0.03, 0);
    // cartes des indicateurs
    kpis.forEach((c, i) => {
      const pOut = U.sig(U.prog(t, SW.kpi[0] + i * 0.1, SW.kpi[0] + 0.7 + i * 0.1));
      const pIn = U.inOutCubic(U.prog(t, SW.kpi[1] - 0.05 + i * 0.05, SW.kpi[1] + 0.4 + i * 0.05));
      const h = c.userData.home;
      place(c, pOut * (1 - pIn), [h.x * 1.1, h.y - 0.28, 1.1], 1, 1.18, [0.05, 0.12 - i * 0.07, 0]);
    });
    const pT = U.sig(U.prog(t, SW.panels[0], SW.panels[0] + 0.7)) * (1 - U.inOutCubic(U.prog(t, SW.panels[1] - 0.05, SW.panels[1] + 0.4)));
    place(today, pT, [-1.25, -0.05, 1.05], 1, 1.12, [0, 0.16, 0]);
    const pC = U.sig(U.prog(t, SW.panels[0] + 0.12, SW.panels[0] + 0.85)) * (1 - U.inOutCubic(U.prog(t, SW.panels[1], SW.panels[1] + 0.4)));
    place(chart, pC, [0.95, -0.72, 1.3], 1, 0.62, [0, -0.14, 0]);
    // facture : sort de l'écran comme une feuille
    const pI = U.sig(U.prog(t, SW.invoice[0], SW.invoice[1]));
    invoice.visible = pI > 0.001;
    invoice.position.set(U.lerp(0.4, 0.95, pI), U.lerp(0.1, 0.02, pI), U.lerp(0.05, 1.55, pI));
    invoice.rotation.set(U.lerp(0, -0.04, pI), U.lerp(0, 0.1, pI) + Math.sin(t * 0.8) * 0.01 * pI, U.lerp(0, -0.035, pI));
    const si = U.lerp(0.5, 1, pI); invoice.scale.set(si, si, 1);
    invoice.userData.mat.uniforms.opacity.value = U.smooth(pI * 4);
    invoice.userData.shadow.material.opacity = 0.7 * U.smooth(pI * 2);
    // caméra : recul pour l'entrée, rapprochement sur le planning, retour
    const planP = U.io(U.prog(t, SW.plan[0], SW.plan[0] + 0.8)) * (1 - U.io(U.prog(t, SW.fleet[0], SW.fleet[1])));
    const pan = U.io(U.prog(t, SW.plan[0] + 0.3, SW.plan[1]));
    const inv = U.io(U.prog(t, SW.invoice[0], SW.invoice[1] + 0.4));
    const cx = U.lerp(U.lerp(0.9, 0, ce), U.lerp(-1.0, 1.0, pan), planP) + inv * 0.35;
    const cz = U.lerp(U.lerp(9.4, 7.9, ce), 5.1, planP) - inv * 0.5 + U.io(U.prog(t, 28, 40)) * -0.3;
    const cy = U.lerp(0.12, 0.35, planP) + U.noise1(t * 0.25, 3) * 0.02;
    camera.position.set(cx + U.noise1(t * 0.3, 4) * 0.03, cy, cz);
    camera.lookAt(U.lerp(U.lerp(0.9, 0, ce) * 0.9, cx * 0.92, planP) + inv * 0.3, U.lerp(0.05, 0.3, planP), 0);
    bgUpdate(t);
  }
  return { scene, camera, update };
}

function softwareUI() {
  const title = UI.el(`<div class="abs" style="left:150px;top:360px;width:900px">
    <div class="eyebrow" data-e style="display:flex;align-items:center;gap:18px"><i style="display:block;width:46px;height:1.5px;background:var(--gold2)"></i>Logiciel de gestion</div>
    <div class="h-lg" style="margin-top:26px"><span class="line-mask"><span data-l1>Pilotez tout</span></span></div>
    <div class="h-lg" style="margin-top:4px"><span class="line-mask"><span data-l2 class="gold" style="background-size:220% 100%">d’un seul écran</span></span></div>
  </div>`);
  const cap = UI.el(`<div class="car-label" style="bottom:96px"><div class="cat eyebrow"><i></i><span data-a></span></div><div class="name" data-b style="font-size:46px"></div></div>`);
  const caps = [
    [30.05, 31.45, 'Tableau de bord', 'Votre activité en temps réel'],
    [31.6, 33.05, 'Aujourd’hui', 'Départs, retours et relances du jour'],
    [33.45, 35.1, 'Planning', 'Toute la flotte d’un coup d’œil'],
    [35.45, 36.95, 'Flotte', 'Entretiens, kilométrage, disponibilités'],
    [37.45, 39.55, 'Documents', 'Contrat et facture en un clic'],
  ];
  let cur = -1;
  UI.add((t) => {
    // titre
    const on = t > 27.9 && t < 30.6;
    if (!on) UI.set(title, { o: 0 });
    else {
      const out = U.inCubic(U.prog(t, 29.35, 29.9));
      UI.set(title, { o: 1 - out, x: -out * 80, blur: out * 10 });
      const pe = U.sig(U.prog(t, 28.25, 28.9));
      UI.set(title.querySelector('[data-e]'), { o: pe, x: (1 - pe) * -20 });
      const p1 = U.sig(U.prog(t, 28.35, 29.1)), p2 = U.sig(U.prog(t, 28.5, 29.25));
      title.querySelector('[data-l1]').style.transform = `translate3d(0, ${((1 - p1) * 110).toFixed(1)}%, 0)`;
      title.querySelector('[data-l2]').style.transform = `translate3d(0, ${((1 - p2) * 110).toFixed(1)}%, 0)`;
      title.querySelector('[data-l2]').style.backgroundPosition = `${(100 - U.prog(t, 28.5, 30) * 100).toFixed(1)}% 0`;
    }
    // légendes
    const i = caps.findIndex(([a, b]) => t >= a - 0.05 && t < b + 0.05);
    if (i < 0) { UI.set(cap, { o: 0 }); return; }
    const [a, b, e, n] = caps[i];
    if (i !== cur) { cur = i; cap.querySelector('[data-a]').textContent = e; cap.querySelector('[data-b]').textContent = n; }
    const pin = U.sig(U.prog(t, a, a + 0.55)), pout = U.inCubic(U.prog(t, b - 0.28, b));
    UI.set(cap, { o: pin * (1 - pout), x: (1 - pin) * -36 - pout * 24, blur: (1 - pin) * 6 + pout * 8 });
  });
}
