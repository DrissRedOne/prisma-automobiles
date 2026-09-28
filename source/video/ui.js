/* =====================================================================
   TYPOGRAPHIE ET INFORMATIONS À L'ÉCRAN (calque HTML au-dessus du rendu
   3D). Chaque élément est placé et animé à partir du temps t.
   Règle maison : aucun tiret long dans les textes.
   ===================================================================== */
const UI = (() => {
  const root = document.getElementById('ui');
  const parts = [];
  function el(html, parent = root) {
    const d = document.createElement('div');
    d.innerHTML = html.trim();
    const n = d.firstElementChild;
    parent.appendChild(n);
    return n;
  }
  /** Applique opacité, déplacement, échelle, flou. Masqué quand invisible. */
  function set(n, { o = 1, x = 0, y = 0, s = 1, blur = 0, rot = 0, clip = null, ls = null } = {}) {
    // opacité nulle sur le parent : masque aussi les enfants, même ceux rendus visibles à part
    if (o <= 0.002) { n.style.opacity = '0'; if (n.style.visibility !== 'hidden') n.style.visibility = 'hidden'; return; }
    n.style.visibility = 'visible';
    n.style.opacity = o.toFixed(4);
    n.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(4)})${rot ? ` rotate(${rot.toFixed(3)}deg)` : ''}`;
    n.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
    if (clip !== null) n.style.clipPath = clip;
    if (ls !== null) n.style.letterSpacing = ls;
  }
  /** Découpe un texte en mots, chacun dans un masque (révélation par le bas). */
  function words(text, cls = '') {
    return text.split(' ').map((w) => `<span class="line-mask" style="display:inline-block"><span class="word ${cls}">${w}</span></span>`).join('<span class="word"> </span>');
  }
  function revealWords(n, t, t0, { stagger = 0.06, dur = 0.7, out = null } = {}) {
    const ws = n.querySelectorAll('.line-mask > .word');
    ws.forEach((w, i) => {
      const p = U.sig(U.prog(t, t0 + i * stagger, t0 + i * stagger + dur));
      let y = (1 - p) * 110, o = p;
      if (out) { const q = U.inCubic(U.prog(t, out[0] + i * stagger * 0.5, out[1] + i * stagger * 0.5)); y -= q * 110; o *= 1 - q; }
      w.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0)`;
      w.style.opacity = o.toFixed(3);
    });
  }
  const svg = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 1 1-4 0v-4l2.2-5.2A2 2 0 0 1 5 6.5h14a2 2 0 0 1 1.8 1.3L23 13v4a2 2 0 1 1-4 0"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0"/><path d="M12 20h.01"/><path d="m2 2 20 20"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M11 18h2"/></svg>',
  };
  function chip(icon, title, sub = '') {
    return el(`<div class="chip"><div class="ic">${svg[icon]}</div><div class="tx"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div></div>`);
  }
  return {
    root, el, set, words, revealWords, chip, svg,
    add(fn) { parts.push(fn); },
    update(t) { for (const f of parts) f(t); },
  };
})();

/* ---------- Logo : composition du logo d'origine (1024 px) ramenée à l'écran ---------- */
const LOGO_LAYOUT = (() => {
  const k = 1.12, oy = 190, y0 = 205;
  const X = (x) => 960 + (x - 512) * k, Y = (y) => oy + (y - y0) * k;
  return {
    prisma: { x: X(99), y: Y(573), w: (2493 / 3) * k },
    auto: { x: X(229), y: Y(688), w: (1719 / 3) * k },
    line: { x0: X(106), x1: X(920), y: Y(774) },
    slogan: { x: X(99), y: Y(803), w: (2490 / 3) * k },
  };
})();

function logoUI(K, { tagline = null, slogan = false, contact = false, legal = null } = {}) {
  const L = LOGO_LAYOUT;
  const wmP = UI.el(`<img class="wm" src="assets/brand/wm-prisma.png" style="left:${L.prisma.x}px;top:${L.prisma.y}px;width:${L.prisma.w}px">`);
  const wmA = UI.el(`<img class="wm" src="assets/brand/wm-automobile.png" style="left:${L.auto.x}px;top:${L.auto.y}px;width:${L.auto.w}px">`);
  const hair = UI.el(`<div class="hair" style="left:${L.line.x0}px;width:${L.line.x1 - L.line.x0}px;top:${L.line.y}px"></div>`);
  const tag = tagline ? UI.el(`<div class="abs center-x eyebrow" style="top:${L.line.y + 30}px;color:rgba(255,255,255,.86);font-weight:500;font-size:22px;letter-spacing:.36em">${UI.words(tagline)}</div>`) : null;
  const slog = slogan ? UI.el(`<img class="wm" src="assets/brand/wm-slogan.png" style="left:${L.slogan.x}px;top:${L.slogan.y}px;width:${L.slogan.w}px">`) : null;
  const cont = contact ? UI.el(`<div class="abs center-x" style="top:936px">
      <div class="sub" style="font-size:24px;color:rgba(255,255,255,.8)">Location de voitures et d’utilitaires<span style="color:var(--gold2);margin:0 16px">·</span>Yvrac, Bordeaux Métropole<span style="color:var(--gold2);margin:0 16px">·</span><span class="gold" style="font-family:Michroma;font-size:23px;letter-spacing:.12em">07 49 58 81 44</span></div></div>`) : null;
  const leg = legal ? UI.el(`<div class="legal">${legal}</div>`) : null;
  UI.add((t) => {
    const a = K.up[0] + 0.3;
    const pP = U.sig(U.prog(t, a, a + 0.95));
    const out = U.prog(t, K.push[0], K.push[0] + 0.45);
    const S = 1 + U.inCubic(out) * 0.2, O = 1 - U.smooth(out);
    const fadeEnd = K.end ? 1 - U.smooth(U.prog(t, K.end[0], K.end[1])) : 1;
    // PRISMA : ouverture depuis le centre, du flou au net
    const inset = (1 - pP) * 50;
    UI.set(wmP, { o: Math.min(1, pP * 1.6) * O * fadeEnd, blur: (1 - pP) * 14, s: (0.94 + 0.06 * pP) * S, clip: `inset(-20% ${inset.toFixed(2)}% -20% ${inset.toFixed(2)}%)`, y: (S - 1) * -120 });
    const pA = U.sig(U.prog(t, a + 0.35, a + 1.15));
    UI.set(wmA, { o: pA * O * fadeEnd, y: (1 - pA) * 16 + (S - 1) * -60, blur: (1 - pA) * 8, s: S });
    const pL = U.sig(U.prog(t, a + 0.55, a + 1.35));
    UI.set(hair, { o: pL * O * 0.9 * fadeEnd, s: 1, clip: `inset(0 ${((1 - pL) * 50).toFixed(2)}% 0 ${((1 - pL) * 50).toFixed(2)}%)`, y: (S - 1) * 40 });
    if (tag) { UI.set(tag, { o: O * fadeEnd, y: (S - 1) * 60, s: S }); UI.revealWords(tag, t, a + 0.75, { stagger: 0.07, dur: 0.75 }); }
    if (slog) { const pS = U.sig(U.prog(t, a + 0.8, a + 1.7)); UI.set(slog, { o: pS * fadeEnd, blur: (1 - pS) * 6, clip: `inset(-30% ${((1 - pS) * 50).toFixed(2)}% -30% ${((1 - pS) * 50).toFixed(2)}%)` }); }
    if (cont) { const pC = U.sig(U.prog(t, a + 1.5, a + 2.4)); UI.set(cont, { o: pC * fadeEnd, y: (1 - pC) * 24 }); }
    if (leg) { const pG = U.smooth(U.prog(t, a + 2.2, a + 3.0)); UI.set(leg, { o: pG * fadeEnd }); }
  });
}
