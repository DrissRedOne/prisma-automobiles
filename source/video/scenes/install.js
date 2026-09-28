/* =====================================================================
   SCÈNE « APPLICATION INSTALLÉE » : écran d'accueil du téléphone,
   appui sur l'icône PRISMA, la fenêtre s'ouvre sur l'écran de démarrage,
   puis la caméra plonge vers le P (raccord avec le logo final).
   ===================================================================== */
const IN = { enter: [39.9, 40.8], glow: [40.75, 41.25], tap: 41.2, launch: [41.32, 41.86], push: [42.55, 44.05] };
// icône PRISMA dans l'écran d'accueil (en largeurs d'écran, origine en haut à gauche)
const HOME = { cols: [84, 354.7, 625.3, 896], rows: [330, 640, 950, 1260], size: 190, prisma: [2, 1] };

function homeScreenTex(icon) {
  return U.canvasTex(1170, 2532, (g, w, h) => {
    // fond d'écran : nuit chaude, lueurs or et bleu nuit, rayons discrets
    g.fillStyle = '#07070a'; g.fillRect(0, 0, w, h);
    const glow = (x, y, r, c) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, c); rg.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = rg; g.fillRect(0, 0, w, h); };
    glow(200, 500, 1300, 'rgba(150,104,48,.55)');
    glow(1050, 2100, 1300, 'rgba(40,62,120,.5)');
    glow(700, 1300, 700, 'rgba(120,70,100,.18)');
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 7; i++) { g.fillStyle = `rgba(255,236,200,${0.018 + i * 0.004})`; g.beginPath(); g.moveTo(-200 + i * 190, -100); g.lineTo(-100 + i * 190, -100); g.lineTo(700 + i * 260, h + 100); g.lineTo(560 + i * 260, h + 100); g.fill(); }
    g.restore();
    // icônes génériques (formes simples, sans marque)
    const S = HOME.size, R = S * 0.225;
    const tile = (x, y, bg, draw, label) => {
      g.save();
      g.beginPath(); g.roundRect(x, y, S, S, R); g.clip();
      if (typeof bg === 'string') { g.fillStyle = bg; g.fillRect(x, y, S, S); } else { const lg = g.createLinearGradient(x, y, x, y + S); lg.addColorStop(0, bg[0]); lg.addColorStop(1, bg[1]); g.fillStyle = lg; g.fillRect(x, y, S, S); }
      draw(x, y);
      g.restore();
      if (label) { g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '500 31px Inter'; g.textAlign = 'center'; g.fillText(label, x + S / 2, y + S + 44); g.textAlign = 'left'; }
    };
    const W2 = (c, lw = 11) => { g.strokeStyle = c; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round'; };
    const icons = [
      [['#ffffff', '#f1f1f1'], (x, y) => { g.fillStyle = '#e8453c'; g.font = '600 34px Inter'; g.textAlign = 'center'; g.fillText('LUN.', x + S / 2, y + 58); g.fillStyle = '#111'; g.font = '300 96px Inter'; g.fillText('28', x + S / 2, y + 150); g.textAlign = 'left'; }, 'Calendrier'],
      [['#1b1b1f', '#0d0d10'], (x, y) => { W2('#fff', 7); g.beginPath(); g.arc(x + S / 2, y + S / 2, 62, 0, 7); g.stroke(); W2('#fff', 8); g.beginPath(); g.moveTo(x + S / 2, y + S / 2); g.lineTo(x + S / 2, y + S / 2 - 42); g.moveTo(x + S / 2, y + S / 2); g.lineTo(x + S / 2 + 30, y + S / 2 + 10); g.stroke(); }, 'Horloge'],
      [['#4aa3ff', '#1e63d6'], (x, y) => { g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(x + 78, y + 80, 30, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x + 112, y + 118, 52, 30, 0, 0, 7); g.ellipse(x + 78, y + 126, 34, 24, 0, 0, 7); g.fill(); }, 'Météo'],
      [['#3a3a3f', '#232327'], (x, y) => { W2('#d9d9de', 12); g.beginPath(); g.arc(x + S / 2, y + S / 2, 46, 0, 7); g.stroke(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; g.beginPath(); g.moveTo(x + S / 2 + Math.cos(a) * 58, y + S / 2 + Math.sin(a) * 58); g.lineTo(x + S / 2 + Math.cos(a) * 74, y + S / 2 + Math.sin(a) * 74); g.stroke(); } }, 'Réglages'],
      [['#ffe08a', '#f7c948'], (x, y) => { g.fillStyle = '#fffaf0'; g.fillRect(x, y + 50, S, S); W2('rgba(0,0,0,.18)', 4); for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(x + 30, y + 88 + k * 26); g.lineTo(x + S - 30, y + 88 + k * 26); g.stroke(); } }, 'Notes'],
      [['#62d27a', '#2fae55'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x + S / 2, y + S / 2 - 6, 64, 52, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(x + 58, y + 128); g.lineTo(x + 50, y + 152); g.lineTo(x + 86, y + 136); g.fill(); }, 'Messages'],
      [['#9fd8ff', '#57b0f0'], (x, y) => { g.fillStyle = '#7dd67a'; g.beginPath(); g.moveTo(x, y + 120); g.lineTo(x + 70, y + 70); g.lineTo(x + 140, y + 130); g.lineTo(x + S, y + 90); g.lineTo(x + S, y + S); g.lineTo(x, y + S); g.fill(); g.fillStyle = '#ff5a4e'; g.beginPath(); g.arc(x + 120, y + 70, 24, Math.PI, 0); g.lineTo(x + 120, y + 118); g.closePath(); g.fill(); }, 'Plans'],
      [['#ff6a88', '#e0304e'], (x, y) => { W2('#fff', 12); g.beginPath(); g.moveTo(x + 84, y + 136); g.lineTo(x + 84, y + 56); g.lineTo(x + 134, y + 46); g.lineTo(x + 134, y + 124); g.stroke(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x + 70, y + 138, 20, 0, 7); g.arc(x + 120, y + 126, 20, 0, 7); g.fill(); }, 'Musique'],
      [['#2d2d33', '#16161a'], (x, y) => { g.fillStyle = '#44444c'; g.beginPath(); g.roundRect(x + 36, y + 60, 118, 82, 16); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(x + S / 2, y + 101, 30, 0, 7); g.fill(); W2('#8a8a94', 6); g.beginPath(); g.arc(x + S / 2, y + 101, 30, 0, 7); g.stroke(); }, 'Caméra'],
      null,
      [['#5ab0ff', '#2f6fe0'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.roundRect(x + 38, y + 58, 114, 78, 10); g.fill(); W2('#2f6fe0', 8); g.beginPath(); g.moveTo(x + 44, y + 64); g.lineTo(x + S / 2, y + 104); g.lineTo(x + 146, y + 64); g.stroke(); }, 'Mail'],
      [['#1f2a24', '#101612'], (x, y) => { g.fillStyle = '#c9a66b'; g.beginPath(); g.roundRect(x + 36, y + 62, 118, 74, 12); g.fill(); g.fillStyle = '#101612'; g.fillRect(x + 36, y + 82, 118, 14); }, 'Portefeuille'],
      [['#8e7cff', '#5b46d8'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x + 70, y + 60); g.lineTo(x + 140, y + 95); g.lineTo(x + 70, y + 130); g.closePath(); g.fill(); }, 'Vidéos'],
      [['#ff9f43', '#f06a1a'], (x, y) => { g.fillStyle = '#fff'; g.font = '700 70px Inter'; g.textAlign = 'center'; g.fillText('A', x + S / 2, y + 122); g.textAlign = 'left'; }, 'Livres'],
      [['#34c3a0', '#169c7c'], (x, y) => { W2('#fff', 10); g.beginPath(); g.moveTo(x + 48, y + 120); g.lineTo(x + 84, y + 84); g.lineTo(x + 110, y + 108); g.lineTo(x + 146, y + 68); g.stroke(); }, 'Bourse'],
      [['#5e5ce6', '#3634a3'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.arc(x + S / 2, y + S / 2, 50, 0, 7); g.fill(); g.fillStyle = '#3634a3'; g.beginPath(); g.arc(x + S / 2 + 22, y + S / 2 - 18, 44, 0, 7); g.fill(); }, 'Concentration'],
    ];
    let k = 0;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const x = HOME.cols[c], y = HOME.rows[r];
      if (r === HOME.prisma[0] && c === HOME.prisma[1]) {
        g.save(); g.beginPath(); g.roundRect(x, y, S, S, R); g.clip(); g.drawImage(icon.image, x, y, S, S); g.restore();
        g.strokeStyle = 'rgba(255,255,255,.14)'; g.lineWidth = 2; g.beginPath(); g.roundRect(x + 1, y + 1, S - 2, S - 2, R); g.stroke();
        g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '500 31px Inter'; g.textAlign = 'center'; g.fillText('PRISMA', x + S / 2, y + S + 44); g.textAlign = 'left';
        k++; continue;
      }
      let ic = icons[k++]; if (!ic) ic = icons[k++];
      if (ic) tile(x, y, ic[0], ic[1], ic[2]);
    }
    // points de page et dock
    for (let i = 0; i < 3; i++) { g.fillStyle = i === 0 ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(w / 2 - 36 + i * 36, 2080, 9, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(255,255,255,.16)'; g.beginPath(); g.roundRect(42, 2150, w - 84, 270, 90); g.fill();
    const dock = [
      [['#62d27a', '#2fae55'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x + 64, y + 50); g.quadraticCurveTo(x + 44, y + 70, x + 58, y + 104); g.quadraticCurveTo(x + 90, y + 150, x + 132, y + 142); g.lineTo(x + 142, y + 118); g.lineTo(x + 112, y + 104); g.lineTo(x + 100, y + 116); g.quadraticCurveTo(x + 80, y + 106, x + 74, y + 86); g.lineTo(x + 86, y + 74); g.lineTo(x + 76, y + 46); g.closePath(); g.fill(); }],
      [['#ffffff', '#e9eef5'], (x, y) => { W2('#2f7cf6', 9); g.beginPath(); g.arc(x + S / 2, y + S / 2, 60, 0, 7); g.stroke(); g.fillStyle = '#e8453c'; g.beginPath(); g.moveTo(x + S / 2, y + S / 2); g.lineTo(x + S / 2 + 34, y + S / 2 - 34); g.lineTo(x + S / 2 + 8, y + S / 2 + 8); g.fill(); g.fillStyle = '#9aa6b8'; g.beginPath(); g.moveTo(x + S / 2, y + S / 2); g.lineTo(x + S / 2 - 34, y + S / 2 + 34); g.lineTo(x + S / 2 - 8, y + S / 2 - 8); g.fill(); }],
      [['#5ab0ff', '#2f6fe0'], (x, y) => { g.fillStyle = '#fff'; g.beginPath(); g.roundRect(x + 38, y + 58, 114, 78, 10); g.fill(); W2('#2f6fe0', 8); g.beginPath(); g.moveTo(x + 44, y + 64); g.lineTo(x + S / 2, y + 104); g.lineTo(x + 146, y + 64); g.stroke(); }],
      [['#3a3a3f', '#232327'], (x, y) => { g.fillStyle = '#fff'; for (let i = 0; i < 3; i++) g.fillRect(x + 50, y + 62 + i * 26, 90, 12); }],
    ];
    dock.forEach((d2, i) => tile(HOME.cols[i], 2190, d2[0], d2[1], null));
  });
}

function buildInstallScene(A) {
  const scene = new T.Scene();
  const env = productEnv(E.renderer);
  scene.environment = env;
  const camera = new T.PerspectiveCamera(30, W / H, 0.02, 100);
  const bgUpdate = productBackdrop(scene, { seed: 63 });
  scene.add(new T.AmbientLight(0xffffff, 0.3));
  const ph = buildPhone({ env });
  scene.add(ph.group);
  const m = ph.mat.uniforms;
  const home = homeScreenTex(A.icon);
  m.tStatus.value = A.status;
  m.tA.value = home; m.aspA.value = 2532 / 1170; m.tB.value = home; m.aspB.value = 2532 / 1170;
  m.top.value = 0;           // le fond d'écran passe sous la barre d'état
  m.tL1.value = A.icon; m.tL2.value = A['m-accueil']; m.aspL2.value = 2532 / 1170;
  const S = HOME.size / 1170;
  const ix = HOME.cols[HOME.prisma[1]] / 1170, iy = HOME.rows[HOME.prisma[0]] / 1170;
  m.lRect.value.set(ix, iy, ix + S, iy + S);
  // halo autour de l'icône avant l'appui (dans l'espace de l'écran)
  const glowTex = U.glowTex([[0, 'rgba(255,236,200,1)'], [0.45, 'rgba(255,220,160,.35)'], [1, 'rgba(255,200,120,0)']]);
  const halo = new T.Mesh(new T.PlaneGeometry(0.34, 0.34), new T.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0, color: new T.Color(1.2, 1.1, 0.9) }));
  const sx = (ix + S / 2 - 0.5) * ph.sw, sy = (0.5 * ph.sh / ph.sw - (iy + S / 2)) * ph.sw;
  halo.position.set(sx, sy, 0.05);
  ph.group.add(halo);

  function update(t) {
    const en = U.sig(U.prog(t, IN.enter[0], IN.enter[1]));
    const push = U.inOutCubic(U.prog(t, IN.push[0], IN.push[1]));
    const g = ph.group;
    g.position.set(U.lerp(2.8, 0, en), Math.sin(t * 1.2) * 0.01 * (1 - push), 0);
    g.rotation.set(0.03 * (1 - push), U.lerp(-0.7, -0.16, en) * (1 - push), U.lerp(0.1, 0, en));
    // appui, ouverture, écran de démarrage
    const gl = U.bell(t, (IN.glow[0] + IN.glow[1]) / 2, 0.25);
    halo.material.opacity = gl * 0.9;
    m.tap.value = t >= IN.tap && t < IN.tap + 0.45 ? U.prog(t, IN.tap, IN.tap + 0.45) : 0;
    m.tapPos.value.set(ix + S / 2, iy + S / 2);
    m.launch.value = U.sig(U.prog(t, IN.launch[0], IN.launch[1]));
    m.lMix.value = 0;
    m.bright.value = 0.92;
    // caméra : le téléphone à droite du texte, puis plongée vers le P de l'écran de démarrage
    const cxA = -0.62, czA = 4.5;
    const centerY = (0.5 * ph.sh / ph.sw - (ph.sh / ph.sw) * 0.5) * ph.sw;
    camera.position.set(U.lerp(cxA, 0, U.smooth(U.prog(t, IN.push[0] - 0.3, IN.push[0] + 0.6))) + U.noise1(t * 0.3, 9) * 0.02 * (1 - push), U.lerp(0.02, centerY, push), camZ(t));
    camera.lookAt(U.lerp(cxA, 0, U.smooth(U.prog(t, IN.push[0] - 0.3, IN.push[0] + 0.6))), U.lerp(0, centerY, push), 0);
    bgUpdate(t);
  }
  function camZ(t) { return U.lerp(4.5, 0.42, U.inOutCubic(U.prog(t, IN.push[0], IN.push[1]))); }
  const zoomBlur = (t) => { const d = 0.25 / FPS; return Math.abs((camZ(t - d) - 0.045) / (camZ(t + d) - 0.045) - 1); };
  return { scene, camera, update, zoomBlur };
}

function installUI() {
  const box = UI.el(`<div class="abs" style="left:150px;top:330px;width:820px">
    <div class="eyebrow" data-e style="display:flex;align-items:center;gap:18px"><i style="display:block;width:46px;height:1.5px;background:var(--gold2)"></i>Application installable</div>
    <div class="h-lg" style="margin-top:26px"><span class="line-mask"><span data-l1>Installée</span></span></div>
    <div class="h-lg" style="margin-top:4px"><span class="line-mask"><span data-l2 class="gold" style="background-size:220% 100%">en un geste</span></span></div>
    <div class="sub" data-s style="margin-top:34px;max-width:780px">Depuis le site, sans passer par un store.</div>
  </div>`);
  const chip = UI.chip('wifi', 'Même hors connexion', 'Réservations et documents toujours accessibles');
  chip.style.left = '150px'; chip.style.top = '720px';
  UI.add((t) => {
    if (t < 39.9 || t > 43.9) { UI.set(box, { o: 0 }); UI.set(chip, { o: 0 }); return; }
    const out = U.inCubic(U.prog(t, 42.55, 43.1));
    UI.set(box, { o: 1 - out, x: -out * 70, blur: out * 10 });
    const pe = U.sig(U.prog(t, 40.15, 40.8));
    UI.set(box.querySelector('[data-e]'), { o: pe, x: (1 - pe) * -20 });
    const p1 = U.sig(U.prog(t, 40.25, 41.0)), p2 = U.sig(U.prog(t, 40.4, 41.15)), ps = U.sig(U.prog(t, 40.7, 41.4));
    box.querySelector('[data-l1]').style.transform = `translate3d(0, ${((1 - p1) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-l2]').style.transform = `translate3d(0, ${((1 - p2) * 110).toFixed(1)}%, 0)`;
    box.querySelector('[data-l2]').style.backgroundPosition = `${(100 - U.prog(t, 40.4, 42) * 100).toFixed(1)}% 0`;
    UI.set(box.querySelector('[data-s]'), { o: ps, y: (1 - ps) * 16 });
    const pc = U.sig(U.prog(t, 41.7, 42.3)), pco = U.inCubic(U.prog(t, 42.5, 42.95));
    UI.set(chip, { o: pc * (1 - pco), y: (1 - pc) * 20, blur: (1 - pc) * 6 + pco * 8 });
  });
}
