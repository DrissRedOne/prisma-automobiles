/* =====================================================================
   LE « P » PRISMA EN 3D (WebGL, three.js) : le P du logo reconstruit en
   volume à partir de ses 8 facettes. La face avant reprend exactement le
   logo (texture) ; chaque facette a sa propre orientation et capte la
   lumière à son tour quand le P tourne ; les tranches sont en métal or et
   argent. Intro : les facettes arrivent en vol et s'assemblent, un reflet
   balaie le P, puis un faisceau le traverse et ressort en spectre.
   Bandeau : P assemblé, en lente rotation, reflet périodique.
   ===================================================================== */
function webglOK() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { return false; }
}
function gradientTexture(draw, w = 512, h = 128) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Géométrie relevée sur le logo d'origine (pixels de l'image de 1024 px)
const P_PTS = {
  A: [384.5, 204.5], B: [537.5, 204.5], C: [674.5, 297.0], D: [674.5, 383.0], D2: [669.0, 390.0],
  E: [489.0, 461.8], F: [384.0, 541.5], L: [384.2, 335.0], K: [428.3, 360.0], N: [449.3, 372.7],
  J: [482.5, 391.0], H1: [390.0, 209.5], H2: [578.5, 337.0],
};
// Facettes du P (elles pavent le P, trou exclu) et orientation de chacune : x à droite, y en haut, z vers nous
const P_FACETS = [
  { pts: ['A', 'B', 'C'], n: [-0.05, 0.45, 1] },                  // bande haute, argent clair
  { pts: ['A', 'C', 'D', 'D2', 'H2', 'H1'], n: [0.3, -0.18, 1] },  // bande basse
  { pts: ['J', 'H2', 'D2', 'E'], n: [0.2, -0.32, 1] },            // panse irisée
  { pts: ['A', 'H1', 'J', 'N', 'K', 'L'], n: [-0.4, 0.2, 1] },     // montant doré
  { pts: ['L', 'K', 'F'], n: [-0.36, -0.05, 1] },                 // pied, facette claire
  { pts: ['K', 'N', 'F'], n: [0.34, 0.08, 1] },                   // pied, facette dorée
  { pts: ['N', 'J', 'F'], n: [-0.24, -0.14, 1] },                 // pied, or pâle
  { pts: ['J', 'E', 'F'], n: [0.06, -0.45, 1] },                  // pied, reflets rosés
];
const P_BOX = [349, 193, 360];   // zone du logo couverte par la texture (x0, y0, côté)
const P_CENTER = [529.25, 373];  // centre du P
const P_K = 2.3 / 337;           // unités 3D par pixel du logo (le P mesure 2,3 de haut)
const P_DEPTH = 0.24;

// Aléatoire reproductible : l'intro est la même à chaque visite
function seeded(seed) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/**
 * Crée la scène du P sur un canvas. Renvoie null si WebGL est indisponible.
 * mode « intro » : assemblage des facettes, puis faisceau et spectre au fil de la progression.
 * mode « band » : P assemblé, faisceau et spectre déjà présents.
 */
function createPrism(canvas, { mode = 'band' } = {}) {
  if (!window.THREE || !RoomEnvironment || !canvas || !webglOK() || typeof LOGO3D_TEX !== 'string') return null;
  const T = THREE;
  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new T.Scene();
  const pmrem = new T.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(renderer), 0.03);
  scene.environment = envRT.texture;

  const camera = new T.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.1, 9);

  // Texture du logo : chargée avant la première image, sinon le P apparaîtrait noir un instant
  let texReady = false;
  const img = new Image();
  const tex = new T.Texture(img);
  tex.colorSpace = T.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  img.onload = () => { tex.needsUpdate = true; texReady = true; };
  img.src = LOGO3D_TEX;

  // Coordonnées de texture = position dans le logo : la face avant est le logo, les tranches prennent la couleur du bord
  const toUV = (X, Y) => new T.Vector2((X / P_K + P_CENTER[0] - P_BOX[0]) / P_BOX[2], 1 - (P_CENTER[1] - Y / P_K - P_BOX[1]) / P_BOX[2]);
  const uvGen = {
    generateTopUV: (g, v, a, b, c) => [a, b, c].map((i) => toUV(v[i * 3], v[i * 3 + 1])),
    generateSideWallUV: (g, v, a, b, c, d) => [a, b, c, d].map((i) => toUV(v[i * 3], v[i * 3 + 1])),
  };

  // Reflet qui balaie la face avant (commun à toutes les facettes)
  const sweep = { value: -3 };
  const makeFront = () => {
    const m = new T.MeshPhysicalMaterial({
      color: 0x000000, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 1,
      roughness: 0.16, metalness: 0, ior: 1.5, clearcoat: 0.6, clearcoatRoughness: 0.04,
      iridescence: 0.35, iridescenceIOR: 1.3, iridescenceThicknessRange: [220, 720],
      envMapIntensity: 0.35, toneMapped: false,
    });
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uSweep = sweep;
      sh.fragmentShader = 'uniform float uSweep;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float sweepD = (vEmissiveMapUv.x * 0.85 + (1.0 - vEmissiveMapUv.y) * 0.55) - uSweep;
        totalEmissiveRadiance += exp(-sweepD * sweepD * 150.0) * vec3(1.0, 0.94, 0.82) * (0.3 + 0.7 * dot(emissiveColor.rgb, vec3(0.3333)));`);
    };
    return m;
  };
  // Tranches : métal poli, teinté par la couleur du bord de chaque facette (or sur le montant, argent sur la bande)
  const sideMat = new T.MeshPhysicalMaterial({ color: 0xa3a3a3, map: tex, metalness: 1, roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.08, envMapIntensity: 1.1 });

  const P = new T.Group();       // le P entier (rotation, flottement)
  const rand = seeded(7);
  const r = (a, b) => a + rand() * (b - a);
  const L = new T.Vector3(-3, 4, 5).normalize();   // lumière principale, en haut à gauche comme sur le logo
  const pieces = P_FACETS.map((f, i) => {
    const pts = f.pts.map((k) => new T.Vector2((P_PTS[k][0] - P_CENTER[0]) * P_K, (P_CENTER[1] - P_PTS[k][1]) * P_K));
    const geo = new T.ExtrudeGeometry(new T.Shape(pts), { depth: P_DEPTH, bevelEnabled: false, curveSegments: 1, UVGenerator: uvGen });
    geo.translate(0, 0, -P_DEPTH / 2);
    // orientation propre de la facette (faces avant et arrière) : les reflets changent d'une facette à l'autre
    const n = new T.Vector3(...f.n).normalize();
    const nor = geo.attributes.normal;
    for (let j = 0; j < nor.count; j++) {
      const z = nor.getZ(j);
      if (z > 0.9) nor.setXYZ(j, n.x, n.y, n.z);
      else if (z < -0.9) nor.setXYZ(j, n.x, n.y, -n.z);
    }
    // pivot au centre de la facette pour son vol d'assemblage
    const c = pts.reduce((s, p) => s.add(p), new T.Vector2()).divideScalar(pts.length);
    geo.translate(-c.x, -c.y, 0);
    const front = makeFront();
    const mesh = new T.Mesh(geo, [front, sideMat]);
    const rest = new T.Vector3(c.x, c.y, 0);
    mesh.position.copy(rest);
    P.add(mesh);
    // départ du vol : dispersée autour du P, retournée, plus ou moins loin de nous
    const dir = new T.Vector3(c.x + r(-0.3, 0.3), c.y + r(-0.3, 0.3), 0).normalize();
    return {
      mesh, front, n, nL: n.dot(L), rest,
      from: new T.Vector3(dir.x * r(2.4, 3.8), dir.y * r(1.9, 3.1), r(-4, 2.2)),
      rot: new T.Vector3(r(-2.6, 2.6), r(-2.6, 2.6), r(-1.8, 1.8)),
      delay: 0.03 + i * 0.022,
    };
  });
  scene.add(P);

  // Lumières de studio : or chaud et argent froid
  scene.add(new T.AmbientLight(0xffffff, 0.2));
  const key = new T.DirectionalLight(0xfff1d6, 2.2); key.position.copy(L).multiplyScalar(8); scene.add(key);
  const rim = new T.DirectionalLight(0xcadae9, 1.8); rim.position.set(5, 1.5, -3); scene.add(rim);
  const under = new T.PointLight(0xe3c58f, 14, 12, 2); under.position.set(0.4, -2.6, 1.6); scene.add(under);

  // Faisceau entrant (blanc) et spectre sortant (reflets du logo : bleu, rose, or, vert d'eau)
  const beamTex = gradientTexture((g, w, h) => {
    const gh = g.createLinearGradient(0, 0, w, 0);
    gh.addColorStop(0, 'rgba(255,255,255,0)'); gh.addColorStop(0.35, 'rgba(255,255,255,.55)'); gh.addColorStop(1, 'rgba(255,255,255,1)');
    g.fillStyle = gh; g.fillRect(0, 0, w, h);
    const gv = g.createLinearGradient(0, 0, 0, h);
    gv.addColorStop(0, 'rgba(0,0,0,1)'); gv.addColorStop(0.42, 'rgba(0,0,0,0)'); gv.addColorStop(0.58, 'rgba(0,0,0,0)'); gv.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = gv; g.fillRect(0, 0, w, h);
  });
  const BEAM_W = 5.2, BEAM_A = -0.1, IN = new T.Vector2(-0.97, 0.22);   // entrée : flanc gauche du montant doré
  const beam = new T.Mesh(new T.PlaneGeometry(BEAM_W, 0.13), new T.MeshBasicMaterial({ map: beamTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0 }));
  beam.rotation.z = BEAM_A;
  scene.add(beam);
  const specTex = gradientTexture((g, w, h) => {
    const cols = ['#cadae9', '#b9c8ff', '#e6cfdc', '#f3c9d9', '#e3c58f', '#f6e7c2', '#bfe0d6'];
    for (let i = 0; i < cols.length; i++) {
      const y0 = (i / cols.length) * h;
      const gr = g.createLinearGradient(0, 0, w, 0);
      gr.addColorStop(0, cols[i] + 'ff'); gr.addColorStop(0.6, cols[i] + '99'); gr.addColorStop(1, cols[i] + '00');
      g.fillStyle = gr; g.fillRect(0, y0, w, h / cols.length + 1);
    }
    // éventail : étroit à gauche, large à droite
    g.globalCompositeOperation = 'destination-in';
    g.beginPath(); g.moveTo(0, h * 0.47); g.lineTo(w, 0); g.lineTo(w, h); g.lineTo(0, h * 0.53); g.closePath();
    g.fillStyle = '#000'; g.fill();
  }, 1024, 512);
  const SPEC_W = mode === 'band' ? 3.2 : 5.6, SPEC_A = -0.2, OUT = new T.Vector2(0.97, -0.08);   // sortie : panse irisée, à droite
  const spec = new T.Mesh(new T.PlaneGeometry(SPEC_W, 2.2), new T.MeshBasicMaterial({ map: specTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0 }));
  spec.rotation.z = SPEC_A;
  spec.scale.set(0.001, 0.82, 1);
  scene.add(spec);

  // Points chauds (entrée du faisceau, sortie du spectre), éclair d'assemblage, halo du logo
  const glowTex = gradientTexture((g, w, h) => { const rg = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.25, 'rgba(255,246,222,.55)'); rg.addColorStop(1, 'rgba(255,240,210,0)'); g.fillStyle = rg; g.fillRect(0, 0, w, h); }, 256, 256);
  const sprite = (color, s, x, y, z) => { const o = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0 })); o.scale.setScalar(s); o.position.set(x, y, z); scene.add(o); return o; };
  const glowIn = sprite(0xffffff, 0.8, IN.x, IN.y, 0.4);
  const glowOut = sprite(0xf6e7c2, 1.0, OUT.x, OUT.y, 0.4);
  const flash = sprite(0xfff6e0, 3.4, 0, 0, 0.5);
  const halo = sprite(0xcadae9, 2.6, 0.55, 1.05, -0.8);   // lueur bleutée au-dessus du P, comme sur le logo
  // Poussière de lumière
  const N = 90;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (rand() - 0.5) * 9; pos[i * 3 + 1] = (rand() - 0.5) * 4.5; pos[i * 3 + 2] = (rand() - 0.5) * 3 - 1; }
  const pgeo = new T.BufferGeometry(); pgeo.setAttribute('position', new T.BufferAttribute(pos, 3));
  const dots = new T.Points(pgeo, new T.PointsMaterial({ color: 0xf3e1b6, size: 0.022, transparent: true, opacity: 0.55, depthWrite: false, blending: T.AdditiveBlending }));
  scene.add(dots);

  const baseY = mode === 'intro' ? 0.3 : 0;
  let w = 0, h = 0;
  const resize = () => {
    const rc = canvas.getBoundingClientRect();
    const nw = Math.max(1, Math.round(rc.width)), nh = Math.max(1, Math.round(rc.height));
    if (nw === w && nh === h) return;
    w = nw; h = nh;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // cadrage : le P reste entier et lisible sur les écrans étroits
    camera.position.z = (w / h < 1 ? 11.5 : 9.2) * (mode === 'intro' ? 1.05 : 1);
    camera.updateProjectionMatrix();
  };
  const ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);
  resize();

  try { renderer.compile(scene, camera); } catch (e) { /* compilation à la volée */ }
  let progress = mode === 'intro' ? 0 : 1;
  let firstFrame = null;
  let running = false, raf = 0, last = performance.now(), t = 0;
  const px = { x: 0, y: 0 };
  const onMove = (e) => { px.x = (e.clientX / window.innerWidth - 0.5) * 2; px.y = (e.clientY / window.innerHeight - 0.5) * 2; };
  window.addEventListener('pointermove', onMove, { passive: true });
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const ease = (x) => 1 - Math.pow(1 - clamp01(x), 3);
  const expo = (x) => { x = clamp01(x); return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); };
  const q = new T.Quaternion(), nW = new T.Vector3();
  const frame = (now) => {
    if (!running) return;
    if (!texReady) { last = now; raf = requestAnimationFrame(frame); return; }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now; t += dt;
    // le P ondule lentement et suit un peu la souris ; à l'intro il finit de pivoter vers nous
    const settle = mode === 'intro' ? (1 - ease(progress / 0.7)) : 0;
    P.rotation.y = REDUCED ? 0.18 : Math.sin(t * 0.42) * 0.34 + px.x * 0.12 - settle * 0.5;
    P.rotation.x = 0.05 + Math.sin(t * 0.6) * 0.045 + px.y * 0.06;
    P.position.y = baseY + Math.sin(t * 0.9) * 0.05;
    camera.position.x += (px.x * 0.35 - camera.position.x) * 0.04;
    camera.lookAt(0, baseY * 0.6, 0);
    // assemblage des facettes, puis éclairage de chacune selon son orientation réelle
    for (const pc of pieces) {
      const e = expo((progress - pc.delay) / 0.3);
      pc.mesh.position.lerpVectors(pc.from, pc.rest, e);
      pc.mesh.rotation.set(pc.rot.x * (1 - e), pc.rot.y * (1 - e), pc.rot.z * (1 - e));
      q.copy(P.quaternion).multiply(pc.mesh.quaternion);
      const lam = nW.copy(pc.n).applyQuaternion(q).dot(L) - pc.nL;
      pc.front.emissiveIntensity = (0.3 + 0.7 * e) * Math.min(1.4, Math.max(0.55, 1 + lam * 0.9));
    }
    // reflet : une fois à l'assemblage, puis toutes les 6,5 s
    if (mode === 'intro' && progress < 0.99) sweep.value = -0.4 + 2.2 * clamp01((progress - 0.34) / 0.24);
    else { const c = (t % 6.5) / 1.4; sweep.value = c <= 1 ? -0.4 + 2.2 * c : -3; }
    flash.material.opacity = mode === 'intro' ? 0.3 * Math.exp(-Math.pow((progress - 0.4) / 0.06, 2)) : 0;
    halo.material.opacity = ease((progress - 0.3) / 0.4) * (0.3 + Math.sin(t * 1.1) * 0.05);
    // faisceau et spectre, accrochés au P
    const pb = ease((progress - 0.46) / 0.2);
    const ps = ease((progress - 0.58) / 0.34);
    const inY = IN.y + P.position.y, outY = OUT.y + P.position.y;
    const bw = BEAM_W * Math.max(0.001, pb);
    beam.scale.x = Math.max(0.001, pb);
    beam.position.set(IN.x - (bw / 2) * Math.cos(BEAM_A), inY - (bw / 2) * Math.sin(BEAM_A), 0.2);
    beam.material.opacity = pb * (0.85 + Math.sin(t * 3) * 0.08);
    const sw = SPEC_W * Math.max(0.001, ps);
    spec.scale.x = Math.max(0.001, ps);
    spec.position.set(OUT.x + (sw / 2) * Math.cos(SPEC_A), outY + (sw / 2) * Math.sin(SPEC_A), 0.2);
    spec.material.opacity = ps * (0.72 + Math.sin(t * 2.2) * 0.07);
    glowIn.position.y = inY; glowOut.position.y = outY;
    glowIn.material.opacity = pb * (0.55 + Math.sin(t * 5) * 0.08);
    glowOut.material.opacity = ps * (0.6 + Math.sin(t * 4) * 0.1);
    dots.rotation.y = t * 0.02;
    dots.material.opacity = 0.35 + 0.2 * Math.sin(t * 1.3);
    renderer.render(scene, camera);
    if (firstFrame) { const f = firstFrame; firstFrame = null; f(); }
    raf = requestAnimationFrame(frame);
  };
  const api = {
    start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); },
    setProgress(p) { progress = p; },
    onFirstFrame(fn) { firstFrame = fn; },
    dispose() {
      api.stop();
      window.removeEventListener('pointermove', onMove);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      const mats = new Set();
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); [].concat(o.material || []).forEach((m) => mats.add(m)); });
      mats.forEach((m) => { if (m.map && m.map !== tex) m.map.dispose(); m.dispose(); });
      tex.dispose(); envRT.dispose(); pmrem.dispose(); renderer.dispose();
    },
  };
  return api;
}
