/* =====================================================================
   LIGNE DE TEMPS DU FILM : plans, transitions, étalonnage, flou de bouge.
   window.READY : promesse résolue quand tout est chargé.
   window.seek(t) : rend l'image au temps t (secondes). Durée : DURATION.
   ===================================================================== */
const E = new Engine(document.getElementById('gl'));
const A = {};
const SH = {};
const DURATION = TIMING.duration;
const PARAMS = new URLSearchParams(location.search);
const MB_OVERRIDE = PARAMS.has('mb') ? Number(PARAMS.get('mb')) : null;

async function loadAssets() {
  const tex = (p, o) => U.loadTex(p, o);
  const list = {
    logo3d: [LOGO3D_TEX],
    icon: ['assets/brand/icon-512.png'],
  };
  const extra = typeof ASSET_LIST !== 'undefined' ? ASSET_LIST : {};
  Object.assign(list, extra);
  await Promise.all(Object.entries(list).map(async ([k, [p, o]]) => { A[k] = await tex(p, o); }));
  A.status = statusBarTex();
}

const TL = { shots: [], trans: [] };
function shot(id, a, b) { TL.shots.push({ id, a, b }); }
/** Transition entre deux plans qui se chevauchent : kind = 'fade' | 'flash' | 'zoom' | 'whip'. */
function trans(from, to, a, b, kind, o = {}) { TL.trans.push({ from, to, a, b, kind, ...o }); }

function build() { buildScenes(); }

/* ---------- Étalonnage par moment ---------- */
function look(t) {
  const L = { bloom: 0.62, threshold: 1.0, knee: 0.6, bloomRadius: 1.0, streak: 0, exposure: 1.0, vignette: 0.42, ca: 0.008, grain: 0.034, sat: 1.0, contrast: 1.03, lift: 0.0, tint: [1, 1, 1] };
  const inSpan = (spans) => spans.some(([a, b]) => t >= a && t < b);
  if (inSpan(TIMING.logoSpans)) { L.streak = 0.16; L.bloom = 0.7; }
  // écrans d'appareils : pas de halo sur les zones blanches de l'interface
  if (inSpan(TIMING.deviceSpans)) { L.threshold = 1.35; L.knee = 0.25; }
  L.fade = Math.max(1 - U.smooth(U.prog(t, 0, 0.45)), U.smooth(U.prog(t, DURATION - 0.9, DURATION - 0.05)));
  if (typeof lookExtra === 'function') lookExtra(t, L);
  return L;
}
/** Nombre de sous-images pour le flou de bouge (plus quand ça bouge vite). */
function motionSamples(t) {
  if (MB_OVERRIDE !== null) return MB_OVERRIDE;
  if (typeof samplesAt === 'function') return samplesAt(t);
  return 3;
}

function setMix(tr, p) {
  const u = E.mMix.uniforms;
  u.p.value = p; u.flash.value = 0; u.zA.value = 0; u.zB.value = 0; u.dA.value.set(0, 0); u.dB.value.set(0, 0); u.mode.value = 0;
  u.cA.value.set(0.5, 0.5); u.cB.value.set(0.5, 0.5);
  if (tr.center) { u.cA.value.set(tr.center[0], tr.center[1]); u.cB.value.set(tr.center[0], tr.center[1]); }
  if (tr.flashColor) u.flashColor.value.setRGB(...tr.flashColor); else u.flashColor.value.setRGB(1, 0.93, 0.82);
  if (tr.kind === 'fade') { u.p.value = U.smooth(p); }
  if (tr.kind === 'flash') { u.mode.value = 1; u.flash.value = (tr.power || 3) * Math.exp(-Math.pow((p - 0.5) / 0.09, 2)); u.zA.value = U.inCubic(p * 2) * (tr.zoom || 0.25); u.zB.value = (1 - U.outCubic(p * 2 - 1)) * (tr.zoom || 0.25); }
  if (tr.kind === 'zoom') { u.p.value = U.smooth(U.prog(p, 0.35, 0.65)); u.zA.value = U.inCubic(p) * (tr.zoom || 0.4); u.zB.value = (1 - U.outCubic(p)) * (tr.zoom || 0.4); u.flash.value = (tr.power || 0) * Math.pow(Math.sin(Math.PI * p), 3); }
  if (tr.kind === 'whip') {
    u.p.value = U.smooth(U.prog(p, 0.4, 0.6));
    const d = tr.dir || [1, 0];
    const k = Math.sin(Math.PI * p) * (tr.amount || 0.22);
    u.dA.value.set(d[0] * k, d[1] * k); u.dB.value.set(d[0] * k, d[1] * k);
  }
}

let lastT = -1;
window.seek = (t, opts = {}) => {
  const t0 = performance.now();
  const n = opts.samples ?? motionSamples(t);
  const act = TL.shots.filter((s) => t >= s.a && t < s.b);
  if (act.length === 0) {
    E.renderer.setRenderTarget(E.rtMix); E.renderer.setClearColor(0x000000, 1); E.renderer.clear();
  } else if (act.length === 1) {
    E.renderShot(SH[act[0].id], t, E.rtMix, n);
  } else {
    const [s1, s2] = act;
    const tr = TL.trans.find((x) => x.from === s1.id && x.to === s2.id) || { kind: 'fade', a: s2.a, b: s1.b };
    E.renderShot(SH[s1.id], t, E.rtShot[0], n);
    E.renderShot(SH[s2.id], t, E.rtShot[1], n);
    E.mMix.uniforms.tA.value = E.rtShot[0].texture; E.mMix.uniforms.tB.value = E.rtShot[1].texture;
    setMix(tr, U.prog(t, tr.a, tr.b));
    E.pass(E.mMix, E.rtMix);
  }
  E.post(E.rtMix, look(t), t);
  UI.update(t);
  lastT = t;
  return performance.now() - t0;
};
window.DURATION = DURATION;
window.READY = (async () => {
  await Promise.all([document.fonts.load('40px Michroma'), document.fonts.load('300 30px Inter'), document.fonts.load('600 30px Inter'), document.fonts.load('500 30px Inter')]);
  await loadAssets();
  build();
  await Promise.all([...document.images].map((im) => im.decode().catch(() => {})));
  // compile tous les shaders d'avance
  for (const k in SH) { try { E.renderer.compile(SH[k].scene, SH[k].camera); } catch (e) {} }
  return true;
})();
