/* =====================================================================
   SCÈNE « LOGO » : les facettes du P arrivent en vol et s'assemblent,
   éclair, reflet, faisceau et spectre, puis le P prend sa place au-dessus
   du wordmark (composition exacte du logo). Sert à l'ouverture et au final.
   ===================================================================== */
function buildLogoScene(A, K) {
  // K : repères temporels de la scène (secondes, temps global)
  const scene = new T.Scene();
  scene.environment = studioEnv(E.renderer);
  const camera = new T.PerspectiveCamera(30, W / H, 0.1, 200);
  prismLights(scene);
  const rig = buildPrism(A.logo3d, { spectrumWidth: 7.2 });
  scene.add(rig.root);
  scene.add(backdrop({ z: -16, w: 90, h: 52, inner: 'rgba(64,49,30,1)', gain: 1 }));
  const dust = makeDust({ count: 260, box: [18, 10, 9], center: [0, 0.4, -1.5], size: 0.028, seed: 11, opacity: 0.75 });
  scene.add(dust);
  const bokeh = makeDust({ count: 12, box: [15, 8.5, 3], center: [0, 0.3, 6.5], size: 0.42, seed: 5, opacity: 0.1, bokeh: true, drift: 0.6, colors: [0xe0a24e, 0xf2c98a, 0x7f9cff, 0xd98fb0] });
  scene.add(bokeh);
  const streak = lightStreak({ w: VERT ? 22 : 16, h: VERT ? 0.045 : 0.03, color: [4, 3.8, 3.4] });
  streak.position.set(0, 0, 0.6);
  scene.add(streak);
  const LOCK_Y = LOGO_FMT.lockY, LOCK_X = LOGO_FMT.lockX;

  function update(t) {
    const asmP = U.prog(t, K.asm[0], K.asm[1]);
    const up = U.sig(U.prog(t, K.up[0], K.up[1]));
    const push = U.prog(t, K.push[0], K.push[1]);
    // caméra
    let z;
    if (t < K.hit) z = U.lerp(K.z0, K.zHit, U.outCubic(U.prog(t, K.start, K.hit)));
    else z = U.lerp(K.zHit - (t - K.hit) * 0.06, K.zLock, up);
    z -= U.inCubic(push) * (z - 2.2);
    const hx = U.noise1(t * 0.35, 1) * 0.06, hy = U.noise1(t * 0.3, 2) * 0.04;
    const pushY = U.inOutCubic(push) * LOCK_Y * up;
    camera.position.set(hx, 0.08 + hy + pushY, z);
    camera.lookAt(0, pushY + up * 0.02, 0);
    // le P : rotation d'assemblage puis léger mouvement ; place du logo
    const settle = U.sig(U.prog(t, K.asm[0], K.hit));
    const rotY = U.lerp(K.rot0, 0.1, settle) + Math.sin((t - K.hit) * 0.55) * 0.1 * U.prog(t, K.hit, K.hit + 1) * (1 - 0.6 * up);
    rig.root.position.set(LOCK_X * up, LOCK_Y * up, 0);
    rig.update({
      time: t, asm: asmP,
      rotY, rotX: 0.05 + Math.sin(t * 0.6) * 0.03,
      sweep: t >= K.sweep[0] && t <= K.sweep[1] ? -0.4 + 2.2 * U.prog(t, K.sweep[0], K.sweep[1]) : -3,
      flash: 0.9 * U.bell(t, K.hit, 0.07),
      halo: U.prog(t, K.hit, K.hit + 1.2),
      beam: U.outCubic(U.prog(t, K.beam[0], K.beam[1])),
      spec: U.outCubic(U.prog(t, K.spec[0], K.spec[1])),
      beamA: 1 - 0.35 * up, specA: 1 - 0.3 * up + 0.8 * push,
      bright: 1 + 0.25 * U.bell(t, K.hit, 0.25),
    });
    // trait de lumière de l'ouverture
    const sg = U.outExpo(U.prog(t, K.streak[0], K.streak[1]));
    streak.scale.set(Math.max(0.001, sg), 1 + 2 * U.bell(t, K.streak[1], 0.3), 1);
    streak.material.opacity = sg * (1 - U.smooth(U.prog(t, K.streak[1], K.streak[2]))) + 0.9 * U.bell(t, K.hit, 0.16);
    if (t > K.streak[2]) streak.scale.set(1.25, 1, 1);
    dust.userData.setTime(t);
    bokeh.userData.setTime(t);
  }
  return { scene, camera, update, rig };
}

// cadrages du logo selon le format (le P doit tomber exactement au-dessus du wordmark)
const LOGO_FMT = VERT ? { z0: 30, zHit: 12.4, zLock: 22.8, lockY: 1.62, lockX: 0.12, oz0: 15, ozHit: 12.8 } : { z0: 17, zHit: 10.2, zLock: 12.65, lockY: 1.02, lockX: 0.06, oz0: 11.2, ozHit: 10.4 };
const INTRO_K = { ...TIMING.intro, z0: LOGO_FMT.z0, zHit: LOGO_FMT.zHit, zLock: LOGO_FMT.zLock, rot0: -1.35 };
const OUTRO_K = { ...TIMING.outro, z0: LOGO_FMT.oz0, zHit: LOGO_FMT.ozHit, zLock: LOGO_FMT.zLock, rot0: 0.35 };
