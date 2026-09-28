/* =====================================================================
   ÉLÉMENTS COMMUNS DES SCÈNES : environnement de studio, poussière de
   lumière, bokeh, fond dégradé, téléphone et écran 3D.
   ===================================================================== */
let ENV = null;
function studioEnv(renderer) {
  if (ENV) return ENV;
  const pm = new T.PMREMGenerator(renderer);
  ENV = pm.fromScene(new RoomEnvironment(renderer), 0.03).texture;
  return ENV;
}
const PX_SCALE = (fov) => H / (2 * Math.tan((fov * Math.PI) / 360));

/** Particules de lumière (poussière, bokeh), mouvement calculé à partir du temps. */
function makeDust({ count = 200, box = [10, 6, 6], center = [0, 0, 0], size = 0.03, color = 0xf3e1b6, colors = null, seed = 3, opacity = 0.6, bokeh = false, drift = 1, fov = 30 } = {}) {
  const rand = U.seeded(seed);
  const pos = new Float32Array(count * 3), sd = new Float32Array(count), col = new Float32Array(count * 3);
  const base = new T.Color(color);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = center[0] + (rand() - 0.5) * box[0];
    pos[i * 3 + 1] = center[1] + (rand() - 0.5) * box[1];
    pos[i * 3 + 2] = center[2] + (rand() - 0.5) * box[2];
    sd[i] = rand();
    const c = colors ? new T.Color(colors[Math.floor(rand() * colors.length)]) : base;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(pos, 3));
  g.setAttribute('aSeed', new T.BufferAttribute(sd, 1));
  g.setAttribute('color', new T.BufferAttribute(col, 3));
  const m = new T.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSize: { value: size }, uScale: { value: PX_SCALE(fov) }, uOpacity: { value: opacity }, uDrift: { value: drift } },
    vertexShader: `
      uniform float uTime, uSize, uScale, uDrift; attribute float aSeed; attribute vec3 color; varying float vA; varying vec3 vC;
      void main(){
        vec3 p = position;
        p.x += sin(uTime * 0.13 + aSeed * 6.28) * 0.35 * uDrift;
        p.y += sin(uTime * 0.11 + aSeed * 12.1) * 0.25 * uDrift + uTime * 0.03 * (aSeed - 0.35) * uDrift;
        p.z += cos(uTime * 0.09 + aSeed * 3.1) * 0.2 * uDrift;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = max(1.0, uSize * (0.45 + aSeed) * uScale / -mv.z);
        vA = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 40.0);
        vC = color;
      }`,
    fragmentShader: bokeh ? `
      uniform float uOpacity; varying float vA; varying vec3 vC;
      void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = smoothstep(1.0, 0.55, r); gl_FragColor = vec4(vC * a * uOpacity * (0.7 + 0.3 * vA), 1.0); }` : `
      uniform float uOpacity; varying float vA; varying vec3 vC;
      void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; float a = pow(max(0.0, 1.0 - r), 2.2); gl_FragColor = vec4(vC * a * vA * uOpacity, 1.0); }`,
    transparent: true, depthWrite: false, blending: T.AdditiveBlending,
  });
  const pts = new T.Points(g, m);
  pts.frustumCulled = false;
  pts.userData.setTime = (t) => { m.uniforms.uTime.value = t; };
  return pts;
}

/** Grand fond : dégradé radial très sombre (évite le noir « mort »). */
function backdrop({ z = -12, w = 60, h = 34, inner = 'rgba(46,36,22,1)', outer = 'rgba(0,0,0,1)', gain = 1 } = {}) {
  const tex = U.canvasTex(512, 512, (g, cw, ch) => {
    const rg = g.createRadialGradient(cw / 2, ch / 2, 0, cw / 2, ch / 2, cw / 2);
    rg.addColorStop(0, inner); rg.addColorStop(1, outer);
    g.fillStyle = rg; g.fillRect(0, 0, cw, ch);
  });
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex, color: new T.Color(gain, gain, gain), depthWrite: false }));
  m.position.z = z;
  m.renderOrder = -10;
  return m;
}

/** Trait de lumière horizontal (reflet anamorphique). */
function lightStreak({ w = 14, h = 0.035, color = [3, 2.9, 2.7] } = {}) {
  const tex = U.canvasTex(1024, 64, (g, cw, ch) => {
    const gh = g.createLinearGradient(0, 0, cw, 0);
    gh.addColorStop(0, 'rgba(255,255,255,0)'); gh.addColorStop(0.5, 'rgba(255,255,255,1)'); gh.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gh; g.fillRect(0, 0, cw, ch);
    const gv = g.createLinearGradient(0, 0, 0, ch);
    gv.addColorStop(0, 'rgba(0,0,0,1)'); gv.addColorStop(0.5, 'rgba(0,0,0,0)'); gv.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = gv; g.fillRect(0, 0, cw, ch);
  });
  return new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex, color: new T.Color(...color), transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
}

/* ---------- Écran d'appareil : captures, défilement, navigation, lancement d'appli ---------- */
const SCREEN_VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
/**
 * Matériau d'écran. Unités : la largeur de l'écran vaut 1.
 * tA, tB : captures ; scrollA/B : défilement (en largeurs d'écran) ; push : navigation (B arrive par la droite).
 * top : hauteur de la barre d'état (téléphone). Lancement d'appli : rectangle qui grandit depuis l'icône.
 */
function screenMaterial({ aspect, top = 0, island = false, radius = 0 } = {}) {
  return new T.ShaderMaterial({
    uniforms: {
      tA: { value: null }, tB: { value: null }, aspA: { value: 2 }, aspB: { value: 2 }, scrollA: { value: 0 }, scrollB: { value: 0 },
      push: { value: 0 }, fade: { value: 0 }, bright: { value: 1 }, top: { value: top }, asp: { value: aspect },
      tStatus: { value: null }, statusOn: { value: top > 0 ? 1 : 0 }, island: { value: island ? 1 : 0 },
      launch: { value: 0 }, lRect: { value: new T.Vector4(0, 0, 0.2, 0.2) }, tL1: { value: null }, tL2: { value: null }, aspL2: { value: 2 }, lMix: { value: 0 },
      tap: { value: 0 }, tapPos: { value: new T.Vector2(0.5, 0.5) }, press: { value: 0 }, pressRect: { value: new T.Vector4(0, 0, 0, 0) },
      tHead: { value: null }, headH: { value: 0 }, headOn: { value: 0 },
    },
    vertexShader: SCREEN_VS,
    fragmentShader: `
      uniform sampler2D tA, tB, tStatus, tL1, tL2, tHead; uniform float aspA, aspB, scrollA, scrollB, push, fade, bright, top, asp, statusOn, island, launch, lMix, aspL2, tap, press, headH, headOn;
      uniform vec4 lRect, pressRect; uniform vec2 tapPos; varying vec2 vUv;
      float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
      // position dans l'écran en largeurs, origine en haut à gauche
      vec3 shot(sampler2D t, float a, float sc, vec2 uv, float yOff){
        float y = (1.0 - uv.y) * asp - yOff + sc;
        if (uv.x < 0.0 || uv.x > 1.0 || y < 0.0 || y > a) return vec3(0.0);
        return texture2D(t, vec2(uv.x, 1.0 - y / a)).rgb;
      }
      void main(){
        vec2 uv = vUv;
        float x0 = 1.0 - push;
        vec3 a = shot(tA, aspA, scrollA, vec2(uv.x + push * 0.28, uv.y), top) * (1.0 - 0.55 * push);
        vec3 b = shot(tB, aspB, scrollB, vec2(uv.x - x0, uv.y), top);
        vec3 col = uv.x < x0 ? a : b;
        col = mix(col, shot(tB, aspB, scrollB, uv, top), fade);
        // ombre portée de la page qui arrive
        col *= 1.0 - 0.35 * smoothstep(0.06, 0.0, x0 - uv.x) * step(uv.x, x0) * step(0.001, push) * step(push, 0.999);
        vec2 P = vec2(uv.x, (1.0 - uv.y) * asp);
        // en-tête fixe de l'application (reste en haut pendant le défilement)
        if (headOn > 0.5 && P.y >= top && P.y < top + headH) col = texture2D(tHead, vec2(uv.x, 1.0 - (P.y - top) / headH)).rgb;
        // lancement : fenêtre qui grandit de l'icône à l'écran entier (écran de démarrage puis appli)
        if (launch > 0.0){
          vec2 c = vec2((lRect.x + lRect.z) * 0.5, (lRect.y + lRect.w) * 0.5);
          vec2 hs = vec2((lRect.z - lRect.x) * 0.5, (lRect.w - lRect.y) * 0.5);
          vec2 C = mix(c, vec2(0.5, asp * 0.5), launch), HS = mix(hs, vec2(0.5, asp * 0.5), launch);
          float rr = mix(0.05, 0.11, launch);
          float d = sdBox(P - C, HS, rr);
          if (d < 0.0){
            vec2 lp = (P - (C - HS)) / (2.0 * HS);          // 0..1 dans la fenêtre
            vec3 s1 = vec3(0.0);
            vec2 sp = (lp - 0.5) * vec2(1.0, HS.y / HS.x) / 0.36 + 0.5; // logo au centre
            if (sp.x > 0.0 && sp.x < 1.0 && sp.y > 0.0 && sp.y < 1.0) s1 = texture2D(tL1, vec2(sp.x, 1.0 - sp.y)).rgb;
            vec3 s2 = shot(tL2, aspL2, 0.0, vec2(lp.x, 1.0 - lp.y), top);
            vec3 w = mix(s1, s2, lMix);
            col = mix(col, w, smoothstep(0.0, -0.004, d));
          }
        }
        // barre d'état et îlot
        if (statusOn > 0.5 && P.y < top){
          vec4 s = texture2D(tStatus, vec2(uv.x, 1.0 - P.y / top));
          col = mix(col, s.rgb, s.a);
        }
        if (island > 0.5){
          float di = sdBox(P - vec2(0.5, 0.07), vec2(0.158, 0.046), 0.046);
          col = mix(col, vec3(0.0), smoothstep(0.003, -0.003, di));
        }
        if (tap > 0.0){
          float r = length(P - tapPos);
          float ring = smoothstep(0.012, 0.0, abs(r - tap * 0.16)) * (1.0 - tap);
          float disc = smoothstep(0.075, 0.0, r) * (1.0 - tap) * 0.35;
          col += vec3(1.0) * (ring * 0.9 + disc);
        }
        gl_FragColor = vec4(col * bright, 1.0);
      }`,
  });
}

/** Barre d'état du téléphone (heure, réseau, batterie), dessinée une fois. */
function statusBarTex() {
  return U.canvasTex(1170, 150, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff';
    g.font = '600 50px Inter';
    g.textBaseline = 'middle';
    g.fillText('9:41', 120, 78);
    // réseau
    const bx = 820;
    for (let i = 0; i < 4; i++) { const bh = 14 + i * 7; g.fillRect(bx + i * 16, 92 - bh, 11, bh); }
    // wifi
    g.strokeStyle = '#fff'; g.lineWidth = 7; g.lineCap = 'round';
    for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(925, 96, 10 + i * 13, -Math.PI * 0.75, -Math.PI * 0.25); g.stroke(); }
    // batterie
    g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.55)';
    const rx = 975, ry = 60, rw = 74, rh = 36;
    g.beginPath(); g.roundRect(rx, ry, rw, rh, 11); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.roundRect(rx + 6, ry + 6, rw - 12, rh - 12, 6); g.fill();
    g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(rx + rw + 5, ry + 12, 6, 12);
  });
}

/** Téléphone 3D : cadre titane, verre noir, écran lumineux, îlot, boutons, bloc photo. */
function buildPhone({ W: pw = 0.78, H: ph = 1.6, D: pd = 0.085, frame = 0x3b3a3f, env } = {}) {
  const g = new T.Group();
  const rad = 0.125, bev = 0.018;
  const body = new T.ExtrudeGeometry(U.roundRect(pw - bev * 2, ph - bev * 2, rad - bev), { depth: pd - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 6, curveSegments: 28 });
  body.translate(0, 0, -(pd - bev * 2) / 2);
  const back = new T.MeshPhysicalMaterial({ color: 0x1d1d20, roughness: 0.42, metalness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.35, envMap: env, envMapIntensity: 0.7 });
  const edge = new T.MeshPhysicalMaterial({ color: frame, roughness: 0.24, metalness: 1, clearcoat: 0.3, envMap: env, envMapIntensity: 1.25 });
  g.add(new T.Mesh(body, [back, edge]));
  // verre avant (noir brillant) et écran
  const glass = new T.Mesh(U.roundPlane(pw - 0.008, ph - 0.008, rad - 0.004, 24), new T.MeshPhysicalMaterial({ color: 0x010101, roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02, envMap: env, envMapIntensity: 0.9 }));
  glass.position.z = pd / 2 + 0.0006;
  g.add(glass);
  const bez = 0.028;
  const sw = pw - bez * 2, sh = ph - bez * 2;
  const smat = screenMaterial({ aspect: sh / sw, top: 0.13, island: true });
  const screen = new T.Mesh(U.roundPlane(sw, sh, rad - bez * 0.9, 24), smat);
  screen.position.z = pd / 2 + 0.0012;
  g.add(screen);
  // reflet du verre par-dessus l'écran (ajouté à la lumière de l'écran)
  const refl = new T.Mesh(U.roundPlane(pw - 0.008, ph - 0.008, rad - 0.004, 24), new T.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.06, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, envMap: env, envMapIntensity: 0.55, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
  refl.position.z = pd / 2 + 0.0018;
  g.add(refl);
  // boutons latéraux
  const btn = (x, y, h) => { const m = new T.Mesh(new T.CapsuleGeometry(0.006, h, 4, 10), edge); m.position.set(x, y, 0); g.add(m); };
  btn(-pw / 2 - 0.004, 0.42, 0.07); btn(-pw / 2 - 0.004, 0.29, 0.1); btn(-pw / 2 - 0.004, 0.16, 0.1); btn(pw / 2 + 0.004, 0.27, 0.16);
  // bloc photo au dos
  const camG = new T.Group();
  const plate = new T.Mesh(new T.ExtrudeGeometry(U.roundRect(0.3, 0.3, 0.07), { depth: 0.008, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 3, curveSegments: 16 }), new T.MeshPhysicalMaterial({ color: 0x1a1a1d, roughness: 0.2, metalness: 0.3, clearcoat: 1, envMap: env }));
  camG.add(plate);
  const lensM = new T.MeshPhysicalMaterial({ color: 0x050507, roughness: 0.05, metalness: 0.5, clearcoat: 1, envMap: env, envMapIntensity: 1.2 });
  const ringM = new T.MeshPhysicalMaterial({ color: 0x55545a, roughness: 0.2, metalness: 1, envMap: env });
  [[-0.068, 0.068], [-0.068, -0.068], [0.07, 0]].forEach(([x, y]) => {
    const ring = new T.Mesh(new T.CylinderGeometry(0.055, 0.058, 0.02, 32), ringM); ring.rotation.x = Math.PI / 2; ring.position.set(x, y, 0.016); camG.add(ring);
    const lens = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 0.022, 32), lensM); lens.rotation.x = Math.PI / 2; lens.position.set(x, y, 0.018); camG.add(lens);
  });
  camG.position.set(-pw / 2 + 0.2, ph / 2 - 0.2, -pd / 2 - 0.004);
  camG.rotation.y = Math.PI;
  g.add(camG);
  return { group: g, screen, mat: smat, sw, sh };
}

/** Écran 3D (moniteur fin, aluminium, bordure noire). */
function buildDisplay({ W: dw = 4.8, H: dh = 3.1, D: dd = 0.07, env } = {}) {
  const g = new T.Group();
  const rad = 0.09, bev = 0.016;
  const body = new T.ExtrudeGeometry(U.roundRect(dw - bev * 2, dh - bev * 2, rad - bev), { depth: dd - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 5, curveSegments: 20 });
  body.translate(0, 0, -(dd - bev * 2) / 2);
  const alu = new T.MeshPhysicalMaterial({ color: 0xb9bcc2, roughness: 0.42, metalness: 1, clearcoat: 0.1, envMap: env, envMapIntensity: 0.8 });
  g.add(new T.Mesh(body, [alu, alu]));
  const glass = new T.Mesh(U.roundPlane(dw - 0.01, dh - 0.01, rad - 0.005, 16), new T.MeshPhysicalMaterial({ color: 0x020202, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02, envMap: env, envMapIntensity: 0.8 }));
  glass.position.z = dd / 2 + 0.0008;
  g.add(glass);
  const bez = 0.07;
  const sw = dw - bez * 2, sh = sw / 1.6;
  const smat = screenMaterial({ aspect: sh / sw });
  const screen = new T.Mesh(U.roundPlane(sw, sh, 0.012, 8), smat);
  screen.position.set(0, (dh - bez * 2 - sh) / 2 - 0.0, dd / 2 + 0.0016);
  g.add(screen);
  const refl = new T.Mesh(U.roundPlane(dw - 0.01, dh - 0.01, rad - 0.005, 16), new T.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04, envMap: env, envMapIntensity: 0.4, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
  refl.position.z = dd / 2 + 0.0024;
  g.add(refl);
  return { group: g, screen, mat: smat, sw, sh };
}

/** Carte flottante (capture d'un élément de l'interface) : coins arrondis, ombre douce. */
function floatingCard(tex, { width = 1, radius = 0.04, shadow = 0.55, bright = 1 } = {}) {
  const w = width, h = width * tex.userData.h / tex.userData.w;
  const grp = new T.Group();
  const shTex = U.canvasTex(256, 256, (g2, cw, ch) => {
    g2.filter = 'blur(18px)'; g2.fillStyle = 'rgba(0,0,0,1)';
    g2.beginPath(); g2.roundRect(40, 40, cw - 80, ch - 80, 26); g2.fill();
  });
  const shadowM = new T.Mesh(new T.PlaneGeometry(w * 1.25, h * 1.3), new T.MeshBasicMaterial({ map: shTex, transparent: true, opacity: shadow, depthWrite: false, color: 0x000000 }));
  shadowM.position.set(w * 0.03, -h * 0.06, -0.04);
  grp.add(shadowM);
  const m = new T.ShaderMaterial({
    uniforms: { map: { value: tex }, r: { value: radius / w }, asp: { value: h / w }, opacity: { value: 1 }, bright: { value: bright } },
    vertexShader: SCREEN_VS,
    fragmentShader: `uniform sampler2D map; uniform float r, asp, opacity, bright; varying vec2 vUv;
      float sdBox(vec2 p, vec2 b, float rr){ vec2 q = abs(p) - b + rr; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - rr; }
      void main(){ vec2 p = (vUv - 0.5) * vec2(1.0, asp); float d = sdBox(p, vec2(0.5, 0.5 * asp), r); float a = smoothstep(0.002, -0.002, d);
        vec3 c = texture2D(map, vUv).rgb * bright; gl_FragColor = vec4(c, a * opacity); }`,
    transparent: true, depthWrite: false,
  });
  const card = new T.Mesh(new T.PlaneGeometry(w, h), m);
  grp.add(card);
  grp.userData = { card, shadow: shadowM, mat: m, w, h };
  return grp;
}
