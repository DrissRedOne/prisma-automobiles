/* =====================================================================
   LE « P » PRISMA EN 3D (repris de src/prism3d.js, piloté par le temps) :
   8 facettes relevées sur le logo, face avant = le logo lui-même, tranches
   en métal or et argent, reflet balayant, faisceau blanc entrant et
   spectre sortant. Toutes les valeurs d'animation sont passées à update().
   ===================================================================== */
const P_PTS = {
  A: [384.5, 204.5], B: [537.5, 204.5], C: [674.5, 297.0], D: [674.5, 383.0], D2: [669.0, 390.0],
  E: [489.0, 461.8], F: [384.0, 541.5], L: [384.2, 335.0], K: [428.3, 360.0], N: [449.3, 372.7],
  J: [482.5, 391.0], H1: [390.0, 209.5], H2: [578.5, 337.0],
};
const P_FACETS = [
  { pts: ['A', 'B', 'C'], n: [-0.05, 0.45, 1] },
  { pts: ['A', 'C', 'D', 'D2', 'H2', 'H1'], n: [0.3, -0.18, 1] },
  { pts: ['J', 'H2', 'D2', 'E'], n: [0.2, -0.32, 1] },
  { pts: ['A', 'H1', 'J', 'N', 'K', 'L'], n: [-0.4, 0.2, 1] },
  { pts: ['L', 'K', 'F'], n: [-0.36, -0.05, 1] },
  { pts: ['K', 'N', 'F'], n: [0.34, 0.08, 1] },
  { pts: ['N', 'J', 'F'], n: [-0.24, -0.14, 1] },
  { pts: ['J', 'E', 'F'], n: [0.06, -0.45, 1] },
];
const P_BOX = [349, 193, 360];
const P_CENTER = [529.25, 373];
const P_K = 2.3 / 337;
const P_DEPTH = 0.24;

function buildPrism(logoTex, { seed = 7, spectrumWidth = 5.6 } = {}) {
  const root = new T.Group();       // position (le faisceau et le spectre suivent)
  const P = new T.Group();          // rotation du P
  root.add(P);
  const toUV = (X, Y) => new T.Vector2((X / P_K + P_CENTER[0] - P_BOX[0]) / P_BOX[2], 1 - (P_CENTER[1] - Y / P_K - P_BOX[1]) / P_BOX[2]);
  const uvGen = {
    generateTopUV: (g, v, a, b, c) => [a, b, c].map((i) => toUV(v[i * 3], v[i * 3 + 1])),
    generateSideWallUV: (g, v, a, b, c, d) => [a, b, c, d].map((i) => toUV(v[i * 3], v[i * 3 + 1])),
  };
  const sweep = { value: -3 };
  const makeFront = () => {
    const m = new T.MeshPhysicalMaterial({
      color: 0x000000, emissive: 0xffffff, emissiveMap: logoTex, emissiveIntensity: 1,
      roughness: 0.16, metalness: 0, ior: 1.5, clearcoat: 0.6, clearcoatRoughness: 0.04,
      iridescence: 0.35, iridescenceIOR: 1.3, iridescenceThicknessRange: [220, 720], envMapIntensity: 0.35,
    });
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uSweep = sweep;
      sh.fragmentShader = 'uniform float uSweep;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float sweepD = (vEmissiveMapUv.x * 0.85 + (1.0 - vEmissiveMapUv.y) * 0.55) - uSweep;
        totalEmissiveRadiance += exp(-sweepD * sweepD * 150.0) * vec3(1.0, 0.94, 0.82) * (0.45 + 1.4 * dot(emissiveColor.rgb, vec3(0.3333)));`);
    };
    return m;
  };
  const sideMat = new T.MeshPhysicalMaterial({ color: 0xa3a3a3, map: logoTex, metalness: 1, roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.08, envMapIntensity: 1.1 });
  const rand = U.seeded(seed);
  const r = (a, b) => a + rand() * (b - a);
  const L = new T.Vector3(-3, 4, 5).normalize();
  const pieces = P_FACETS.map((f, i) => {
    const pts = f.pts.map((k) => new T.Vector2((P_PTS[k][0] - P_CENTER[0]) * P_K, (P_CENTER[1] - P_PTS[k][1]) * P_K));
    const geo = new T.ExtrudeGeometry(new T.Shape(pts), { depth: P_DEPTH, bevelEnabled: false, curveSegments: 1, UVGenerator: uvGen });
    geo.translate(0, 0, -P_DEPTH / 2);
    const n = new T.Vector3(...f.n).normalize();
    const nor = geo.attributes.normal;
    for (let j = 0; j < nor.count; j++) {
      const z = nor.getZ(j);
      if (z > 0.9) nor.setXYZ(j, n.x, n.y, n.z);
      else if (z < -0.9) nor.setXYZ(j, n.x, n.y, -n.z);
    }
    const c = pts.reduce((s, p) => s.add(p), new T.Vector2()).divideScalar(pts.length);
    geo.translate(-c.x, -c.y, 0);
    const front = makeFront();
    const mesh = new T.Mesh(geo, [front, sideMat]);
    const rest = new T.Vector3(c.x, c.y, 0);
    mesh.position.copy(rest);
    P.add(mesh);
    const dir = new T.Vector3(c.x + r(-0.3, 0.3), c.y + r(-0.3, 0.3), 0).normalize();
    return {
      mesh, front, n, nL: n.dot(L), rest,
      from: new T.Vector3(dir.x * r(3.2, 5.2), dir.y * r(2.6, 4.2), r(-5, 3.2)),
      rot: new T.Vector3(r(-3.4, 3.4), r(-3.4, 3.4), r(-2.4, 2.4)),
      delay: i * 0.055,
    };
  });

  const grad = (draw, w = 512, h = 128) => U.canvasTex(w, h, draw);
  const beamTex = grad((g, w, h) => {
    const gh = g.createLinearGradient(0, 0, w, 0);
    gh.addColorStop(0, 'rgba(255,255,255,0)'); gh.addColorStop(0.35, 'rgba(255,255,255,.55)'); gh.addColorStop(1, 'rgba(255,255,255,1)');
    g.fillStyle = gh; g.fillRect(0, 0, w, h);
    const gv = g.createLinearGradient(0, 0, 0, h);
    gv.addColorStop(0, 'rgba(0,0,0,1)'); gv.addColorStop(0.42, 'rgba(0,0,0,0)'); gv.addColorStop(0.58, 'rgba(0,0,0,0)'); gv.addColorStop(1, 'rgba(0,0,0,1)');
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = gv; g.fillRect(0, 0, w, h);
  });
  const BEAM_W = 7.5, BEAM_A = -0.1, IN = new T.Vector2(-0.97, 0.22);
  const beam = new T.Mesh(new T.PlaneGeometry(BEAM_W, 0.13), new T.MeshBasicMaterial({ map: beamTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0, color: new T.Color(2.2, 2.2, 2.2) }));
  beam.rotation.z = BEAM_A;
  root.add(beam);
  const specTex = grad((g, w, h) => {
    const cols = ['#cadae9', '#b9c8ff', '#e6cfdc', '#f3c9d9', '#e3c58f', '#f6e7c2', '#bfe0d6'];
    for (let i = 0; i < cols.length; i++) {
      const y0 = (i / cols.length) * h;
      const gr = g.createLinearGradient(0, 0, w, 0);
      gr.addColorStop(0, cols[i] + 'ff'); gr.addColorStop(0.6, cols[i] + '99'); gr.addColorStop(1, cols[i] + '00');
      g.fillStyle = gr; g.fillRect(0, y0, w, h / cols.length + 1);
    }
    g.globalCompositeOperation = 'destination-in';
    g.beginPath(); g.moveTo(0, h * 0.47); g.lineTo(w, 0); g.lineTo(w, h); g.lineTo(0, h * 0.53); g.closePath();
    g.fillStyle = '#000'; g.fill();
  }, 1024, 512);
  const SPEC_A = -0.2, OUT = new T.Vector2(0.97, -0.08);
  const spec = new T.Mesh(new T.PlaneGeometry(spectrumWidth, 2.2), new T.MeshBasicMaterial({ map: specTex, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0, color: new T.Color(1.6, 1.6, 1.6) }));
  spec.rotation.z = SPEC_A;
  spec.scale.set(0.001, 0.82, 1);
  root.add(spec);
  const glowTex = U.glowTex([[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,246,222,.55)'], [1, 'rgba(255,240,210,0)']]);
  const sprite = (color, s, x, y, z) => { const o = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color, transparent: true, blending: T.AdditiveBlending, depthWrite: false, opacity: 0 })); o.scale.setScalar(s); o.position.set(x, y, z); root.add(o); return o; };
  const glowIn = sprite(new T.Color(2, 2, 2), 0.55, IN.x, IN.y, 0.4);
  const glowOut = sprite(new T.Color(2, 1.8, 1.5), 0.7, OUT.x, OUT.y, 0.4);
  const flash = sprite(new T.Color(2.4, 2.2, 1.9), 2.3, 0, 0, 0.5);
  const halo = sprite(0xcadae9, 3.0, 0.55, 1.05, -0.8);

  const q = new T.Quaternion(), nW = new T.Vector3();
  /**
   * s : { asm (0..1 assemblage), sweep (position du reflet, -3 = aucun), beam (0..1), spec (0..1),
   *       flash (0..1), halo (0..1), rotY, rotX, time }
   */
  function update(s) {
    const tt = s.time || 0;
    P.rotation.set(s.rotX || 0, s.rotY || 0, s.rotZ || 0);
    for (const pc of pieces) {
      const e = U.outExpo(U.clamp((s.asm - pc.delay) / (1 - 0.055 * (pieces.length - 1))));
      pc.mesh.position.lerpVectors(pc.from, pc.rest, e);
      pc.mesh.rotation.set(pc.rot.x * (1 - e), pc.rot.y * (1 - e), pc.rot.z * (1 - e));
      pc.mesh.updateMatrix();
      q.copy(P.quaternion).multiply(pc.mesh.quaternion);
      const lam = nW.copy(pc.n).applyQuaternion(q).dot(L) - pc.nL;
      pc.front.emissiveIntensity = (0.25 + 0.75 * e) * Math.min(1.5, Math.max(0.5, 1 + lam * 0.9)) * (s.bright ?? 1);
    }
    sweep.value = s.sweep ?? -3;
    flash.material.opacity = s.flash || 0;
    halo.material.opacity = (s.halo || 0) * (0.3 + Math.sin(tt * 1.1) * 0.05);
    const pb = U.clamp(s.beam || 0), ps = U.clamp(s.spec || 0);
    const bw = BEAM_W * Math.max(0.001, pb);
    beam.scale.x = Math.max(0.001, pb);
    beam.position.set(IN.x - (bw / 2) * Math.cos(BEAM_A), IN.y - (bw / 2) * Math.sin(BEAM_A), 0.2);
    beam.material.opacity = pb * (0.85 + Math.sin(tt * 3) * 0.08) * (s.beamA ?? 1);
    const sw = spectrumWidth * Math.max(0.001, ps);
    spec.scale.x = Math.max(0.001, ps);
    spec.position.set(OUT.x + (sw / 2) * Math.cos(SPEC_A), OUT.y + (sw / 2) * Math.sin(SPEC_A), 0.2);
    spec.material.opacity = ps * (0.72 + Math.sin(tt * 2.2) * 0.07) * (s.specA ?? 1);
    glowIn.material.opacity = pb * (0.6 + Math.sin(tt * 5) * 0.08) * (s.beamA ?? 1);
    glowOut.material.opacity = ps * (0.65 + Math.sin(tt * 4) * 0.1) * (s.specA ?? 1);
  }
  return { root, P, pieces, update };
}

/** Lumières de studio du P (or chaud, argent froid). */
function prismLights(scene) {
  const L = new T.Vector3(-3, 4, 5).normalize();
  scene.add(new T.AmbientLight(0xffffff, 0.2));
  const key = new T.DirectionalLight(0xfff1d6, 2.2); key.position.copy(L).multiplyScalar(8); scene.add(key);
  const rim = new T.DirectionalLight(0xcadae9, 1.8); rim.position.set(5, 1.5, -3); scene.add(rim);
  const under = new T.PointLight(0xe3c58f, 14, 12, 2); under.position.set(0.4, -2.6, 1.6); scene.add(under);
  return { key, rim, under };
}
