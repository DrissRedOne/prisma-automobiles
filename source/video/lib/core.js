/* =====================================================================
   MOTEUR DE LA VIDÉO : outils d'animation, chargement des textures,
   rendu HDR (three.js), flou de bouge par sous-images, transitions,
   bloom, étalonnage (ACES), aberration chromatique, grain.
   Tout est piloté par le temps t (secondes) : une même image donne
   toujours le même rendu, ce qui permet le rendu image par image.
   ===================================================================== */
const T = THREE;
// format : horizontal (1920 x 1080) ou vertical (1080 x 1920, ?format=vertical)
const VERT = new URLSearchParams(location.search).get('format') === 'vertical';
const W = VERT ? 1080 : 1920, H = VERT ? 1920 : 1080, FPS = 30;

/* ---------- Outils ---------- */
const U = {};
U.clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
U.lerp = (a, b, t) => a + (b - a) * t;
U.prog = (t, a, b) => U.clamp((t - a) / (b - a));
U.smooth = (x) => { x = U.clamp(x); return x * x * (3 - 2 * x); };
U.outCubic = (x) => 1 - Math.pow(1 - U.clamp(x), 3);
U.inCubic = (x) => Math.pow(U.clamp(x), 3);
U.inOutCubic = (x) => { x = U.clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
U.outExpo = (x) => { x = U.clamp(x); return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); };
U.inExpo = (x) => { x = U.clamp(x); return x <= 0 ? 0 : Math.pow(2, 10 * x - 10); };
U.inOutExpo = (x) => { x = U.clamp(x); if (x <= 0) return 0; if (x >= 1) return 1; return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2; };
U.outQuint = (x) => 1 - Math.pow(1 - U.clamp(x), 5);
U.inOutQuint = (x) => { x = U.clamp(x); return x < 0.5 ? 16 * Math.pow(x, 5) : 1 - Math.pow(-2 * x + 2, 5) / 2; };
U.outBack = (x, s = 1.4) => { x = U.clamp(x); const c = s + 1; return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
U.bell = (t, c, w) => Math.exp(-Math.pow((t - c) / w, 2));
U.bezier = (p1x, p1y, p2x, p2y) => {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t, sy = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    x = U.clamp(x);
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 40; i++) { const v = sx(t); if (Math.abs(v - x) < 1e-7) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return sy(t);
  };
};
U.sig = U.bezier(0.22, 1, 0.36, 1);      // courbe signature : départ vif, arrivée très douce
U.io = U.bezier(0.65, 0, 0.35, 1);       // aller-retour doux
U.whip = U.bezier(0.8, 0, 0.2, 1);       // mouvement de caméra rapide (fouetté)
U.seeded = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
U.noise1 = (x, seed = 0) => { // bruit lisse 1D déterministe (mouvements de caméra « à la main »)
  const h = (n) => { const s = Math.sin((n + seed * 17.13) * 127.1) * 43758.5453; return s - Math.floor(s); };
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
  return U.lerp(h(i), h(i + 1), u) * 2 - 1;
};

let MAX_ANISO = 8;
U.loadTex = (url, { srgb = true, mips = true, flipY = true } = {}) => new Promise((res, rej) => {
  new T.TextureLoader().load(url, (t) => {
    if (srgb) t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = MAX_ANISO;
    t.flipY = flipY;
    t.generateMipmaps = mips;
    t.minFilter = mips ? T.LinearMipmapLinearFilter : T.LinearFilter;
    t.userData.w = t.image.width; t.userData.h = t.image.height;
    res(t);
  }, undefined, () => rej(new Error('Texture introuvable : ' + url)));
});
U.canvas = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return c; };
U.canvasTex = (w, h, draw, { srgb = true } = {}) => {
  const t = new T.CanvasTexture(U.canvas(w, h, draw));
  if (srgb) t.colorSpace = T.SRGBColorSpace;
  t.anisotropy = MAX_ANISO;
  t.userData.w = w; t.userData.h = h;
  return t;
};
U.glowTex = (stops = [[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,255,255,.45)'], [1, 'rgba(255,255,255,0)']], size = 256) => U.canvasTex(size, size, (g, w, h) => {
  const rg = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  stops.forEach(([o, c]) => rg.addColorStop(o, c));
  g.fillStyle = rg; g.fillRect(0, 0, w, h);
});
/** Rectangle à coins arrondis (x, y au centre). */
U.roundRect = (w, h, r) => {
  const s = new T.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
};
/** Géométrie plane arrondie, UV normalisées sur le rectangle. */
U.roundPlane = (w, h, r, seg = 20) => {
  const g = new T.ShapeGeometry(U.roundRect(w, h, r), seg);
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) / w + 0.5, p.getY(i) / h + 0.5);
  uv.needsUpdate = true;
  return g;
};

// motif de décalage sous-pixel (Halton 2,3), en pixels
const JITTER = (() => { const h = (i, b) => { let f = 1, r = 0; while (i > 0) { f /= b; r += f * (i % b); i = Math.floor(i / b); } return r; }; return Array.from({ length: 16 }, (_, i) => [h(i + 1, 2) - 0.5, h(i + 1, 3) - 0.5]); })();

/* ---------- Passes plein écran ---------- */
const VS_FS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
function passMat(fs, uniforms = {}, extra = {}) {
  return new T.ShaderMaterial({ vertexShader: VS_FS, fragmentShader: fs, uniforms, depthTest: false, depthWrite: false, ...extra });
}
const GLSL_COMMON = `
  float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  vec3 toSRGB(vec3 c){ c = max(c, 0.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c)); }
`;

class Engine {
  constructor(canvas) {
    const r = this.renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance', stencil: false });
    r.setPixelRatio(1);
    r.setSize(W, H, false);
    r.outputColorSpace = T.LinearSRGBColorSpace;
    r.toneMapping = T.NoToneMapping;
    MAX_ANISO = Math.min(8, r.capabilities.getMaxAnisotropy());
    const hf = (w, h, o = {}) => new T.WebGLRenderTarget(w, h, { type: T.HalfFloatType, depthBuffer: false, ...o });
    const q = new URLSearchParams(location.search);
    this.msaa = q.has('msaa') ? Number(q.get('msaa')) : 0;   // l'anticrénelage vient des sous-images décalées
    this.rtScene = hf(W, H, { depthBuffer: true, samples: this.msaa });
    this.rtShot = [hf(W, H), hf(W, H)];
    this.rtMix = hf(W, H);
    this.rtTmp = hf(W, H);
    this.mips = [];
    let w = W >> 1, h = H >> 1;
    for (let i = 0; i < 7; i++) { this.mips.push(hf(w, h)); w = Math.max(2, w >> 1); h = Math.max(2, h >> 1); }
    this.streak = [hf(W >> 2, H >> 3), hf(W >> 2, H >> 3)];

    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    geo.setAttribute('uv', new T.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    this.fsMesh = new T.Mesh(geo);
    this.fsMesh.frustumCulled = false;
    this.fsScene = new T.Scene();
    this.fsScene.add(this.fsMesh);
    this.fsCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.mCopy = passMat('uniform sampler2D tSrc; uniform float k; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(tSrc, vUv).rgb * k, 1.0); }', { tSrc: { value: null }, k: { value: 1 } });
    this.mAccum = passMat('uniform sampler2D tSrc; uniform float k; varying vec2 vUv; void main(){ gl_FragColor = vec4(texture2D(tSrc, vUv).rgb * k, 1.0); }', { tSrc: { value: null }, k: { value: 1 } },
      { blending: T.CustomBlending, blendSrc: T.OneFactor, blendDst: T.OneFactor, blendEquation: T.AddEquation, transparent: true });
    // Mélange de deux plans : fondu, éclair, flou radial (zoom) et flou directionnel (fouetté)
    this.mMix = passMat(`
      uniform sampler2D tA, tB; uniform float p, flash, zA, zB; uniform vec2 dA, dB, cA, cB; uniform vec3 flashColor; uniform int mode;
      varying vec2 vUv;
      vec3 blurS(sampler2D t, vec2 uv, float z, vec2 d, vec2 c){
        if (z < 0.0005 && dot(d, d) < 0.0000005) return texture2D(t, uv).rgb;
        vec3 acc = vec3(0.0);
        for (int i = 0; i < 24; i++){ float f = float(i) / 23.0 - 0.5; vec2 o = (uv - c) * z * f + d * f; acc += texture2D(t, uv - o).rgb; }
        return acc / 24.0;
      }
      void main(){
        vec3 a = blurS(tA, vUv, zA, dA, cA);
        vec3 b = blurS(tB, vUv, zB, dB, cB);
        vec3 col;
        if (mode == 1) col = mix(a, b, step(0.5, p));          // éclair : bascule au pic
        else col = mix(a, b, p);                               // fondu
        col = col * (1.0 + flash * 2.5) + flashColor * flash * 0.5;
        gl_FragColor = vec4(col, 1.0);
      }`, { tA: { value: null }, tB: { value: null }, p: { value: 0 }, flash: { value: 0 }, flashColor: { value: new T.Color(1, 0.92, 0.8) }, zA: { value: 0 }, zB: { value: 0 }, dA: { value: new T.Vector2() }, dB: { value: new T.Vector2() }, cA: { value: new T.Vector2(0.5, 0.5) }, cB: { value: new T.Vector2(0.5, 0.5) }, mode: { value: 0 } });
    // Flou directionnel (complète le flou de bouge entre les sous-images pendant les mouvements rapides)
    this.mDir = passMat(`
      uniform sampler2D tSrc; uniform vec2 dir; varying vec2 vUv;
      void main(){ vec3 acc = vec3(0.0); for (int i = 0; i < 24; i++){ float f = float(i) / 23.0 - 0.5; acc += texture2D(tSrc, vUv + dir * f).rgb; } gl_FragColor = vec4(acc / 24.0, 1.0); }`,
      { tSrc: { value: null }, dir: { value: new T.Vector2() } });
    // Flou de zoom radial (caméra qui fonce vers l'avant)
    this.mZoom = passMat(`
      uniform sampler2D tSrc; uniform float z; uniform vec2 c; varying vec2 vUv;
      void main(){ vec3 acc = vec3(0.0); for (int i = 0; i < 24; i++){ float f = float(i) / 23.0 - 0.5; acc += texture2D(tSrc, vUv - (vUv - c) * z * f).rgb; } gl_FragColor = vec4(acc / 24.0, 1.0); }`,
      { tSrc: { value: null }, z: { value: 0 }, c: { value: new T.Vector2(0.5, 0.5) } });
    // Bloom (seuil doux, descente 13 points, remontée en tente) : méthode « Call of Duty »
    this.mPre = passMat(`
      uniform sampler2D tSrc; uniform vec2 texel; uniform float threshold, knee; varying vec2 vUv;
      void main(){
        vec3 c = texture2D(tSrc, vUv + texel * vec2(-0.5, -0.5)).rgb + texture2D(tSrc, vUv + texel * vec2(0.5, -0.5)).rgb
               + texture2D(tSrc, vUv + texel * vec2(-0.5, 0.5)).rgb + texture2D(tSrc, vUv + texel * vec2(0.5, 0.5)).rgb;
        c = min(c * 0.25, vec3(48.0));
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - threshold + knee, 0.0, 2.0 * knee); rq = rq * rq / (4.0 * knee + 1e-4);
        float w = max(rq, br - threshold) / max(br, 1e-4);
        gl_FragColor = vec4(c * w, 1.0);
      }`, { tSrc: { value: null }, texel: { value: new T.Vector2() }, threshold: { value: 1 }, knee: { value: 0.5 } });
    this.mDown = passMat(`
      uniform sampler2D tSrc; uniform vec2 texel; varying vec2 vUv;
      vec3 s(vec2 o){ return texture2D(tSrc, vUv + texel * o).rgb; }
      void main(){
        vec3 r = s(vec2(0.0)) * 0.125
          + (s(vec2(-2.0, 2.0)) + s(vec2(2.0, 2.0)) + s(vec2(-2.0, -2.0)) + s(vec2(2.0, -2.0))) * 0.03125
          + (s(vec2(0.0, 2.0)) + s(vec2(-2.0, 0.0)) + s(vec2(2.0, 0.0)) + s(vec2(0.0, -2.0))) * 0.0625
          + (s(vec2(-1.0, 1.0)) + s(vec2(1.0, 1.0)) + s(vec2(-1.0, -1.0)) + s(vec2(1.0, -1.0))) * 0.125;
        gl_FragColor = vec4(r, 1.0);
      }`, { tSrc: { value: null }, texel: { value: new T.Vector2() } });
    this.mUp = passMat(`
      uniform sampler2D tSrc; uniform vec2 texel; uniform float k; varying vec2 vUv;
      vec3 s(vec2 o){ return texture2D(tSrc, vUv + texel * o).rgb; }
      void main(){
        vec3 r = (s(vec2(-1.0, 1.0)) + s(vec2(1.0, 1.0)) + s(vec2(-1.0, -1.0)) + s(vec2(1.0, -1.0)))
          + (s(vec2(0.0, 1.0)) + s(vec2(-1.0, 0.0)) + s(vec2(1.0, 0.0)) + s(vec2(0.0, -1.0))) * 2.0 + s(vec2(0.0)) * 4.0;
        gl_FragColor = vec4(r / 16.0 * k, 1.0);
      }`, { tSrc: { value: null }, texel: { value: new T.Vector2() }, k: { value: 1 } },
      { blending: T.CustomBlending, blendSrc: T.OneFactor, blendDst: T.OneFactor, blendEquation: T.AddEquation, transparent: true });
    // Traînée anamorphique : étirement horizontal des hautes lumières
    this.mStreak = passMat(`
      uniform sampler2D tSrc; uniform vec2 texel; uniform float spread; varying vec2 vUv;
      void main(){
        vec3 acc = vec3(0.0); float ws = 0.0;
        for (int i = -7; i <= 7; i++){ float f = float(i); float w = exp(-f * f / 18.0); acc += texture2D(tSrc, vUv + vec2(texel.x * f * spread, 0.0)).rgb * w; ws += w; }
        gl_FragColor = vec4(acc / ws, 1.0);
      }`, { tSrc: { value: null }, texel: { value: new T.Vector2() }, spread: { value: 1 } });
    // Composition finale : bloom, traînée, exposition, ACES, étalonnage, vignette, aberration, grain
    this.mFinal = passMat(`
      uniform sampler2D tScene, tBloom, tStreak; uniform float bloom, streak, exposure, vignette, ca, grain, time, sat, contrast, fade, lift;
      uniform vec3 tint, fadeColor, streakColor; varying vec2 vUv;
      ${GLSL_COMMON}
      vec3 RRTAndODTFit(vec3 v){ vec3 a = v * (v + 0.0245786) - 0.000090537; vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081; return a / b; }
      vec3 aces(vec3 c){
        const mat3 A = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
        const mat3 B = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
        c = A * (c / 0.6); c = RRTAndODTFit(c); c = B * c; return clamp(c, 0.0, 1.0);
      }
      void main(){
        vec2 d = vUv - 0.5;
        float k = ca * dot(d, d);
        vec3 col = vec3(texture2D(tScene, vUv - d * k).r, texture2D(tScene, vUv).g, texture2D(tScene, vUv + d * k).b);
        col += texture2D(tBloom, vUv).rgb * bloom;
        col += texture2D(tStreak, vUv).rgb * streak * streakColor;
        col *= exposure * tint;
        col = aces(col);
        float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = mix(vec3(l), col, sat);
        col = (col - 0.5) * contrast + 0.5 + lift;
        float v = smoothstep(1.0, 0.25, length(d * vec2(1.0, 0.82)) * 1.35);
        col *= mix(1.0 - vignette, 1.0, v);
        col = mix(col, fadeColor, fade);
        col = toSRGB(clamp(col, 0.0, 1.0));
        float n = hash12(gl_FragCoord.xy + fract(time * 13.7) * 571.0) - 0.5;
        col += n * grain * (1.0 - 0.6 * l);
        col += (hash12(gl_FragCoord.xy * 1.37 + time) - 0.5) / 255.0;
        gl_FragColor = vec4(col, 1.0);
      }`, {
      tScene: { value: null }, tBloom: { value: null }, tStreak: { value: null }, bloom: { value: 0.6 }, streak: { value: 0 }, exposure: { value: 1 }, vignette: { value: 0.35 }, ca: { value: 0.012 }, grain: { value: 0.045 }, time: { value: 0 },
      sat: { value: 1 }, contrast: { value: 1 }, lift: { value: 0 }, fade: { value: 0 }, tint: { value: new T.Vector3(1, 1, 1) }, fadeColor: { value: new T.Vector3(0, 0, 0) }, streakColor: { value: new T.Vector3(0.75, 0.85, 1.0) },
    });
  }
  pass(mat, target, clear = true) {
    const r = this.renderer;
    this.fsMesh.material = mat;
    r.setRenderTarget(target);
    r.autoClear = clear;
    r.render(this.fsScene, this.fsCam);
    r.autoClear = true;
  }
  /** Rend un plan (avec flou de bouge : moyenne de sous-images réparties sur l'obturation). */
  renderShot(shot, t, target, samples = 1, shutter = 0.5) {
    const r = this.renderer;
    const cam = shot.camera;
    const draw = (tt, k) => {
      shot.update(tt);
      // décalage sous-pixel différent à chaque sous-image : anticrénelage par accumulation
      if (samples > 1 && cam.setViewOffset) { const j = JITTER[k % JITTER.length]; cam.setViewOffset(W, H, j[0], j[1], W, H); }
      r.setRenderTarget(this.rtScene);
      r.setClearColor(shot.clear || 0x000000, 1);
      r.render(shot.scene, cam);
      if (samples > 1 && cam.clearViewOffset) cam.clearViewOffset();
    };
    if (samples <= 1) {
      draw(t, 0);
      this.mCopy.uniforms.tSrc.value = this.rtScene.texture; this.mCopy.uniforms.k.value = 1;
      this.pass(this.mCopy, target);
      return;
    }
    r.setRenderTarget(target); r.setClearColor(0x000000, 1); r.clear(true, false, false);
    for (let k = 0; k < samples; k++) {
      draw(t + ((k + 0.5) / samples - 0.5) * shutter / FPS, k);
      this.mAccum.uniforms.tSrc.value = this.rtScene.texture; this.mAccum.uniforms.k.value = 1 / samples;
      this.pass(this.mAccum, target, false);
    }
    shot.update(t);
    // mouvement très rapide : on lisse les écarts entre sous-images
    const v = shot.blurVec ? shot.blurVec(t) : null;
    if (v && Math.hypot(v[0], v[1]) > 0.002) {
      const k = 1.4 / samples;
      this.mCopy.uniforms.tSrc.value = target.texture; this.mCopy.uniforms.k.value = 1;
      this.pass(this.mCopy, this.rtTmp);
      this.mDir.uniforms.tSrc.value = this.rtTmp.texture; this.mDir.uniforms.dir.value.set(v[0] * k, v[1] * k);
      this.pass(this.mDir, target);
    }
    // zoom très rapide : même principe, dans l'axe de la caméra
    const zb = shot.zoomBlur ? shot.zoomBlur(t) : 0;
    if (zb > 0.002) {
      this.mCopy.uniforms.tSrc.value = target.texture; this.mCopy.uniforms.k.value = 1;
      this.pass(this.mCopy, this.rtTmp);
      this.mZoom.uniforms.tSrc.value = this.rtTmp.texture; this.mZoom.uniforms.z.value = Math.min(0.25, zb * 1.4 / Math.max(1, samples));
      this.pass(this.mZoom, target);
    }
  }
  /** Image finale à l'écran à partir de la source HDR. */
  post(src, look, time) {
    const m = this.mips;
    const pre = this.mPre.uniforms;
    pre.tSrc.value = src.texture; pre.texel.value.set(1 / W, 1 / H); pre.threshold.value = look.threshold ?? 1.0; pre.knee.value = look.knee ?? 0.6;
    this.pass(this.mPre, m[0]);
    for (let i = 1; i < m.length; i++) {
      this.mDown.uniforms.tSrc.value = m[i - 1].texture; this.mDown.uniforms.texel.value.set(1 / m[i - 1].width, 1 / m[i - 1].height);
      this.pass(this.mDown, m[i]);
    }
    for (let i = m.length - 2; i >= 0; i--) {
      this.mUp.uniforms.tSrc.value = m[i + 1].texture; this.mUp.uniforms.texel.value.set(1 / m[i + 1].width, 1 / m[i + 1].height); this.mUp.uniforms.k.value = look.bloomRadius ?? 1;
      this.pass(this.mUp, m[i], false);
    }
    const st = look.streak || 0;
    if (st > 0) {
      const s = this.mStreak.uniforms;
      s.tSrc.value = m[1].texture; s.texel.value.set(1 / this.streak[0].width, 1 / this.streak[0].height); s.spread.value = 3.2;
      this.pass(this.mStreak, this.streak[0]);
      s.tSrc.value = this.streak[0].texture; s.spread.value = 9;
      this.pass(this.mStreak, this.streak[1]);
    }
    const f = this.mFinal.uniforms;
    f.tScene.value = src.texture; f.tBloom.value = m[0].texture; f.tStreak.value = this.streak[1].texture;
    f.bloom.value = look.bloom ?? 0.6; f.streak.value = st; f.exposure.value = look.exposure ?? 1; f.vignette.value = look.vignette ?? 0.35;
    f.ca.value = look.ca ?? 0.012; f.grain.value = look.grain ?? 0.04; f.time.value = time; f.sat.value = look.sat ?? 1; f.contrast.value = look.contrast ?? 1;
    f.lift.value = look.lift ?? 0; f.fade.value = look.fade ?? 0;
    const tn = look.tint || [1, 1, 1]; f.tint.value.set(tn[0], tn[1], tn[2]);
    const sc = look.streakColor || [0.75, 0.85, 1.0]; f.streakColor.value.set(sc[0], sc[1], sc[2]);
    this.pass(this.mFinal, null);
  }
}
