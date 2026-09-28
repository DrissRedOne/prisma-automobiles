/* =====================================================================
   SCÈNE « SHOWROOM » : studio noir, sol laqué avec reflets, anneau de
   lumière et cône lumineux au-dessus de chaque véhicule, grand mot en
   fond. La caméra passe d'un véhicule à l'autre en mouvement fouetté.
   ===================================================================== */
const SHOW_T0 = TIMING.show.t0, SHOW_STEP = TIMING.show.step;   // un véhicule toutes les 2 s (une mesure)
const STAGES = [
  { cars: [{ id: 'v-clio', h: 1.72 }], word: 'CITADINE', cat: 'Citadines', name: 'Renault Clio V', price: '39 €', from: true },
  { cars: [{ id: 'v-tesla', h: 1.7 }], word: 'ÉLECTRIQUE', cat: 'Électrique', name: 'Tesla Model 3', price: '95 €' },
  { cars: [{ id: 'v-glc', h: 2.05 }], word: 'PREMIUM', cat: 'SUV premium', name: 'Mercedes GLC AMG Line', price: '139 €' },
  { cars: VERT
    ? [{ id: 'v-kangoo', h: 2.05, dx: -2.3, dz: -2.8 }, { id: 'v-master20', h: 3.35, dx: 2.45, dz: -3.6 }, { id: 'v-master12', h: 2.75, dx: 0.2, dz: 0.5 }]
    : [{ id: 'v-kangoo', h: 2.05, dx: -3.9, dz: -1.0 }, { id: 'v-master12', h: 2.75, dx: 0.1, dz: 0.35 }, { id: 'v-master20', h: 3.35, dx: 4.3, dz: -1.6 }],
    word: 'UTILITAIRES', cat: 'Utilitaires', name: 'De 3 à 20 m³', price: '45 €', from: true, wide: true },
];
const SHOW_END = SHOW_T0 + SHOW_STEP * STAGES.length;
const STAGE_DX = 12.5;

function carMaterial(tex, { reflect = false } = {}) {
  return new T.ShaderMaterial({
    uniforms: { map: { value: tex }, bright: { value: 1 }, sweep: { value: -2 }, opacity: { value: 1 }, reflK: { value: 3.2 }, reflA: { value: 0.3 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D map; uniform float bright, sweep, opacity, reflK, reflA; varying vec2 vUv;
      void main(){
        ${reflect ? 'vec4 c = texture2D(map, vUv, 2.2);' : 'vec4 c = texture2D(map, vUv);'}
        vec3 col = c.rgb;
        // étalonnage « studio » : milieux un peu plus denses, bas et côtés plongés dans l'ombre
        col = pow(col, vec3(1.12)) * 1.05;
        col *= mix(0.62, 1.0, smoothstep(0.0, 0.55, vUv.y));
        col *= 1.0 - 0.28 * pow(abs(vUv.x - 0.5) * 2.0, 2.4);
        // reflet de studio qui balaie la carrosserie
        float s = vUv.x * 0.85 + vUv.y * 0.45 - sweep;
        float band = exp(-s * s * 90.0);
        col += band * (0.08 + 0.55 * dot(c.rgb, vec3(0.333))) * vec3(1.0, 0.95, 0.86);
        col *= bright;
        float a = c.a * opacity;
        ${reflect ? 'a *= reflA * exp(-vUv.y * reflK);' : ''}
        gl_FragColor = vec4(col, a);
      }`,
    transparent: true, depthWrite: false,
  });
}

function wordTexture(word) {
  const fs = 300;
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `${fs}px Michroma`;
  const ls = fs * 0.12;
  const w = Math.ceil(probe.measureText(word).width + ls * (word.length - 1) + fs * 0.6);
  const h = Math.ceil(fs * 1.5);
  const tex = U.canvasTex(w, h, (g, cw, ch) => {
    g.font = `${fs}px Michroma`;
    g.textBaseline = 'middle';
    const grad = g.createLinearGradient(0, ch * 0.2, 0, ch * 0.85);
    grad.addColorStop(0, '#f3e6c8'); grad.addColorStop(0.5, '#8d7a5a'); grad.addColorStop(1, '#2a241b');
    g.fillStyle = grad;
    let x = fs * 0.3;
    for (const chr of word) { g.fillText(chr, x, ch * 0.55); x += g.measureText(chr).width + ls; }
  });
  tex.userData.aspect = w / h;
  return tex;
}

function buildShowroom(A) {
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(VERT ? 50 : 32, W / H, 0.1, 400);
  const X = (i) => i * STAGE_DX;
  // sol laqué : couleur, grain léger, bords qui se perdent dans le noir
  const floorTex = U.canvasTex(1024, 1024, (g, w, h) => {
    const rnd = U.seeded(21);
    g.fillStyle = '#0b0b0c'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) { const x = rnd() * w, y = rnd() * h, r = 20 + rnd() * 90; const rg = g.createRadialGradient(x, y, 0, x, y, r); const v = 9 + rnd() * 10; rg.addColorStop(0, `rgba(${v},${v},${v + 1},.35)`); rg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2); }
  });
  floorTex.wrapS = floorTex.wrapT = T.RepeatWrapping;
  const floor = new T.Mesh(new T.PlaneGeometry(240, 70), new T.ShaderMaterial({
    uniforms: { map: { value: floorTex }, camX: { value: 0 } },
    vertexShader: 'varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `uniform sampler2D map; uniform float camX; varying vec2 vUv; varying vec3 vW;
      void main(){ vec3 c = texture2D(map, vUv * vec2(10.0, 3.0)).rgb * 0.9; float d = length(vec2(vW.x - camX, (vW.z + 2.0) * 1.6));
        c *= exp(-d * 0.05); gl_FragColor = vec4(c, 1.0); }`,
    depthWrite: false,
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(STAGE_DX * 1.5, 0, -20);
  floor.renderOrder = -8;
  scene.add(floor);
  // barres de lumière verticales au fond, et leurs reflets
  const barTex = U.canvasTex(16, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.25, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,1)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
  const barReflTex = U.canvasTex(16, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.25)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
  const barMat = new T.MeshBasicMaterial({ map: barTex, color: new T.Color(0.95, 0.86, 0.72), transparent: true, depthWrite: false, blending: T.AdditiveBlending });
  const barReflMat = new T.MeshBasicMaterial({ map: barReflTex, color: new T.Color(0.13, 0.12, 0.1), transparent: true, depthWrite: false, blending: T.AdditiveBlending });
  for (let i = -2; i < 16; i++) {
    const x = i * 5.2 - 1;
    const b = new T.Mesh(new T.PlaneGeometry(0.045, 7.5), barMat); b.position.set(x, 3.75, -20); b.renderOrder = -6; scene.add(b);
    const r = new T.Mesh(new T.PlaneGeometry(0.16, 2.6), barReflMat); r.position.set(x, -1.3, -20); r.renderOrder = -7; scene.add(r);
  }
  const glowTex = U.glowTex([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,.35)'], [1, 'rgba(255,255,255,0)']]);
  const shTex = U.glowTex([[0, 'rgba(0,0,0,1)'], [0.55, 'rgba(0,0,0,.75)'], [1, 'rgba(0,0,0,0)']]);
  const stages = STAGES.map((st, i) => {
    const g = new T.Group();
    g.position.x = X(i);
    scene.add(g);
    const S = { group: g, cars: [], st };
    // flaque de lumière et anneau au sol
    const pool = new T.Mesh(new T.PlaneGeometry(st.wide ? 16 : 9, st.wide ? 7 : 6), new T.MeshBasicMaterial({ map: glowTex, color: new T.Color(0.2, 0.18, 0.14), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(0, 0.002, -0.2); pool.renderOrder = -4; g.add(pool);
    const ringR = st.wide ? (VERT ? 4.6 : 6.2) : 3.4;
    const ring = new T.Mesh(new T.RingGeometry(ringR - 0.035, ringR + 0.035, 256, 1), new T.ShaderMaterial({
      uniforms: { p: { value: 0 }, a: { value: 1 } },
      vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform float p, a; varying vec2 vP;
        void main(){ float ang = atan(vP.y, vP.x) / 6.28318 + 0.5; ang = fract(ang + 0.25); float on = step(ang, p);
          float head = exp(-pow((ang - p) * 40.0, 2.0)) * step(0.001, p) * (1.0 - step(0.999, p));
          vec3 c = vec3(2.2, 1.75, 1.15) * (on * 0.85 + head * 3.0); gl_FragColor = vec4(c * a, 1.0); }`,
      transparent: true, depthWrite: false, blending: T.AdditiveBlending,
    }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(0, 0.004, -0.2); ring.scale.set(1, st.wide ? 0.5 : 0.62, 1); ring.renderOrder = -3; g.add(ring);
    S.ring = ring; S.pool = pool;
    // cône de lumière venu du plafond
    const coneH = 9;
    const cone = new T.Mesh(new T.CylinderGeometry(0.25, st.wide ? 6.5 : 3.6, coneH, 64, 1, true), new T.ShaderMaterial({
      uniforms: { a: { value: 0 } },
      vertexShader: 'varying vec3 vN; varying float vY; void main(){ vN = normalize(normalMatrix * normal); vY = position.y / ' + coneH.toFixed(1) + ' + 0.5; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float a; varying vec3 vN; varying float vY; void main(){ float f = pow(abs(vN.z), 2.0); float g = mix(0.15, 1.0, vY); gl_FragColor = vec4(vec3(1.0, 0.9, 0.75) * f * g * a * 0.16, 1.0); }',
      transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending,
    }));
    cone.position.set(0, coneH / 2, -0.4); cone.renderOrder = 3; g.add(cone);
    S.cone = cone;
    const beamDust = makeDust({ count: 70, box: [st.wide ? 9 : 5, 7, 3], center: [0, 3.6, -0.4], size: 0.022, seed: 30 + i, opacity: 0.5, fov: 32 });
    beamDust.renderOrder = 4; g.add(beamDust); S.dust = beamDust;
    // grand mot au fond
    const wt = wordTexture(st.word);
    // le grand mot tient dans le cadre (plus étroit en vertical)
    const wh = Math.min(st.wide ? 2.3 : 1.55, (VERT ? (st.wide ? 10.4 : 7.0) : (st.wide ? 15 : 10.2)) / wt.userData.aspect);
    const wordM = new T.MeshBasicMaterial({ map: wt, transparent: true, depthWrite: false, opacity: 0, color: new T.Color(0.55, 0.55, 0.55) });
    const word = new T.Mesh(new T.PlaneGeometry(wh * wt.userData.aspect, wh), wordM);
    word.position.set(0, VERT ? (st.wide ? 5.0 : 3.45) : (st.wide ? 3.9 : 2.55), st.wide ? -7.5 : -5.2); word.renderOrder = -2; g.add(word);
    const wordR = new T.Mesh(word.geometry, new T.MeshBasicMaterial({ map: wt, transparent: true, depthWrite: false, opacity: 0, color: new T.Color(0.045, 0.045, 0.045) }));
    wordR.scale.y = -1; wordR.position.set(0, -word.position.y, word.position.z); wordR.renderOrder = -5; g.add(wordR);
    S.word = word; S.wordR = wordR;
    // véhicules (et leur reflet, et leur ombre de contact)
    for (const c of st.cars) {
      const tex = A['car-' + c.id];
      const bb = CAR_BBOX[c.id];                  // boîte du véhicule dans l'image (sans les marges)
      const iw = tex.userData.w, ih = tex.userData.h;
      const ph = c.h * ih / (bb[3] - bb[1]);    // hauteur du plan pour que le véhicule mesure c.h
      const pw = ph * iw / ih;
      const bottom = (ih - bb[3]) / ih * ph;      // marge transparente sous les roues
      const m = new T.Mesh(new T.PlaneGeometry(pw, ph), carMaterial(tex));
      m.position.set(c.dx || 0, ph / 2 - bottom, c.dz || 0); m.renderOrder = 1; g.add(m);
      const rm = carMaterial(tex, { reflect: true });
      const r = new T.Mesh(m.geometry, rm);
      r.scale.y = -1; r.position.set(c.dx || 0, -(ph / 2 - bottom), c.dz || 0); r.renderOrder = -5; g.add(r);
      const shadow = new T.Mesh(new T.PlaneGeometry(pw * 0.95, 2.2), new T.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, opacity: 0.9 }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.set(c.dx || 0, 0.003, (c.dz || 0) + 0.05); shadow.renderOrder = -3.5; g.add(shadow);
      S.cars.push({ m, r, c, pw, ph });
    }
    return S;
  });
  const backDust = makeDust({ count: 360, box: [90, 9, 20], center: [STAGE_DX * 1.5, 4, -8], size: 0.03, seed: 77, opacity: 0.45, fov: 32 });
  scene.add(backDust);

  // trajectoire de caméra : dérive lente sur chaque véhicule, fouetté entre deux
  const pose = (j, u) => {
    const wide = !!STAGES[j].wide;
    if (VERT) return { x: X(j) + U.lerp(-0.3, 0.3, u), y: wide ? 2.3 : 1.45, z: U.lerp(wide ? 15.6 : 9.9, wide ? 14.6 : 9.0, u), ly: wide ? 2.45 : 1.8 };
    return { x: X(j) + U.lerp(-0.9, 0.9, u), y: wide ? 1.9 : 1.25, z: U.lerp(wide ? 14.6 : 8.6, wide ? 13.6 : 7.7, u), ly: wide ? 1.35 : 0.9 };
  };
  const WH = 0.32;   // demi-durée du fouetté, de part et d'autre de la coupe
  const camAt = (t) => {
    const k = (t - SHOW_T0) / SHOW_STEP;
    const i = Math.max(0, Math.min(STAGES.length - 1, Math.floor(k)));
    const local = t - (SHOW_T0 + i * SHOW_STEP);
    const blend = (a, b, e, s) => ({ x: U.lerp(a.x, b.x, e), y: U.lerp(a.y, b.y, e), z: U.lerp(a.z, b.z, e), ly: U.lerp(a.ly, b.ly, e), yaw: Math.sin(Math.PI * s) * 0.2 });
    if (i > 0 && local < WH) { const s = 0.5 + local / (2 * WH); return blend(pose(i - 1, 1), pose(i, 0), U.whip(s), s); }
    if (i < STAGES.length - 1 && local > SHOW_STEP - WH) { const s = (local - (SHOW_STEP - WH)) / (2 * WH); return blend(pose(i, 1), pose(i + 1, 0), U.whip(s), s); }
    const u = U.io(U.prog(local, i > 0 ? WH : 0, i < STAGES.length - 1 ? SHOW_STEP - WH : SHOW_STEP));
    return { ...pose(i, u), yaw: 0 };
  };

  function update(t) {
    const p = camAt(t);
    // sortie vers le plan suivant : la caméra bascule vers le haut
    const tilt = U.inCubic(U.prog(t, SHOW_END - 0.38, SHOW_END + 0.1));
    camera.position.set(p.x, p.y + tilt * 1.2, p.z);
    camera.lookAt(p.x + p.yaw * 8, p.ly + tilt * 9, 0);
    floor.material.uniforms.camX.value = p.x;
    stages.forEach((S, i) => {
      const t0 = SHOW_T0 + i * SHOW_STEP;
      const on = U.outCubic(U.prog(t, t0 - 0.12, t0 + 0.4));
      const lit = 0.18 + 0.82 * on;
      const sw = U.lerp(-0.6, 1.9, U.io(U.prog(t, t0 + 0.05, t0 + 1.1)));
      for (const c of S.cars) {
        c.m.material.uniforms.bright.value = lit;
        c.r.material.uniforms.bright.value = lit;
        c.m.material.uniforms.sweep.value = sw;
        c.r.material.uniforms.sweep.value = sw;
      }
      S.ring.material.uniforms.p.value = U.sig(U.prog(t, t0, t0 + 0.9));
      S.ring.material.uniforms.a.value = 0.35 + 0.65 * on;
      S.cone.material.uniforms.a.value = 0.25 + 0.75 * on;
      S.pool.material.opacity = 0.3 + 0.7 * on;
      const wp = U.sig(U.prog(t, t0 + 0.05, t0 + 1.2));
      S.word.material.opacity = wp * 0.9;
      S.wordR.material.opacity = wp * 0.9;
      S.word.position.x = (1 - wp) * 1.8;
      S.wordR.position.x = S.word.position.x;
      S.dust.userData.setTime(t);
    });
    backDust.userData.setTime(t);
  }
  // vitesse de la caméra à l'écran (pour le flou directionnel des fouettés)
  const blurVec = (t) => {
    const d = 0.25 / FPS;
    const a = camAt(t - d), b = camAt(t + d);
    const dist = Math.max(4, b.z);
    const viewW = 2 * dist * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
    return [(b.x - a.x) / viewW + (b.yaw - a.yaw) * 0.9, 0];
  };
  return { scene, camera, update, camAt, blurVec };
}

function showroomUI() {
  const label = UI.el(`<div class="car-label"><div class="cat eyebrow"><i></i><span data-cat></span></div><div class="name" data-name></div><div class="price"><span class="gold" data-price></span><small data-unit></small></div></div>`);
  const counter = UI.el(`<div class="counter"><span data-num>01</span><div class="bar"><i data-bar></i></div><span style="color:rgba(255,255,255,.4)">0${STAGES.length}</span></div>`);
  const q = (s) => label.querySelector(s);
  let cur = -1;
  UI.add((t) => {
    const inShow = t >= SHOW_T0 - 0.2 && t < SHOW_T0 + SHOW_STEP * STAGES.length + 0.1;
    if (!inShow) { UI.set(label, { o: 0 }); UI.set(counter, { o: 0 }); return; }
    const i = Math.max(0, Math.min(STAGES.length - 1, Math.floor((t - SHOW_T0) / SHOW_STEP)));
    const st = STAGES[i];
    if (i !== cur) {
      cur = i;
      q('[data-cat]').textContent = st.cat;
      q('[data-name]').textContent = st.name;
      q('[data-price]').innerHTML = (st.from ? 'dès ' : '') + st.price.replace('€', '<span style="font-family:Inter;font-weight:500">€</span>');
      q('[data-unit]').textContent = ' / jour';
      counter.querySelector('[data-num]').textContent = '0' + (i + 1);
    }
    const t0 = SHOW_T0 + i * SHOW_STEP;
    const pin = U.sig(U.prog(t, t0 + 0.12, t0 + 0.75));
    const pout = i < STAGES.length - 1 ? U.inCubic(U.prog(t, t0 + SHOW_STEP - 0.3, t0 + SHOW_STEP - 0.05)) : U.inCubic(U.prog(t, SHOW_END - 0.45, SHOW_END - 0.1));
    UI.set(label, { o: pin * (1 - pout), x: (1 - pin) * -40 + pout * -30, blur: (1 - pin) * 6 + pout * 8 });
    // chaque ligne arrive avec un léger décalage
    [q('.cat'), q('.name'), q('.price')].forEach((k, j) => {
      const pj = U.sig(U.prog(t, t0 + 0.12 + j * 0.07, t0 + 0.8 + j * 0.07));
      k.style.transform = `translate3d(0, ${((1 - pj) * 26).toFixed(1)}px, 0)`;
      k.style.opacity = pj.toFixed(3);
    });
    const cin = U.smooth(U.prog(t, SHOW_T0, SHOW_T0 + 0.6)) * (1 - U.smooth(U.prog(t, SHOW_END - 0.5, SHOW_END - 0.1)));
    UI.set(counter, { o: cin });
    counter.querySelector('[data-bar]').style.width = (U.clamp((t - SHOW_T0) / (SHOW_STEP * STAGES.length)) * 100).toFixed(2) + '%';
  });
}
