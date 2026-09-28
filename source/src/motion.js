/* =====================================================================
   ANIMATIONS : intro 3D, apparitions au défilement, cartes en relief,
   showroom, compteurs, confettis. Tout respecte « réduire les animations ».
   ===================================================================== */
const FINE = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Intro : le prisme PRISMA en 3D, puis le logo ---------- */
function playIntro() {
  let seen = false;
  try { seen = sessionStorage.getItem('prisma-intro') === '1'; sessionStorage.setItem('prisma-intro', '1'); } catch (e) { /* navigation privée */ }
  const h = location.hash || '#/';
  if (seen || REDUCED || h.startsWith('#/gestion')) return;
  const el = document.createElement('div');
  el.className = 'intro';
  el.innerHTML = `<canvas class="intro-canvas"></canvas><div class="intro-brand"><img class="blend" src="${ASSETS.word}" alt="${esc(db.settings.brand)}"><i class="intro-line"></i><p>${esc(db.settings.tagline)}</p></div><button class="intro-skip" type="button">Passer</button>`;
  document.body.appendChild(el);
  document.documentElement.classList.add('intro-on');
  const prism = createPrism(el.querySelector('canvas'), { mode: 'intro' });
  if (!prism) { el.classList.add('no3d'); el.insertAdjacentHTML('afterbegin', `<img class="intro-mark blend" src="${ASSETS.mark}" alt="">`); }
  let t0 = performance.now();
  if (prism) { prism.onFirstFrame(() => { t0 = performance.now(); el.classList.add('ready'); }); prism.start(); }
  const D = 3300;
  let done = false;
  const tick = (now) => {
    if (done) return;
    const p = Math.min(1, (now - t0) / 2400);
    if (prism) prism.setProgress(p);
    if (now - t0 > 1500) el.classList.add('brand');
    if (now - t0 > D) finish(); else requestAnimationFrame(tick);
  };
  const finish = () => {
    if (done) return;
    done = true;
    el.classList.add('out');
    document.documentElement.classList.remove('intro-on');
    initReveal();
    revealAll();
    setTimeout(() => { if (prism) prism.dispose(); el.remove(); }, 1000);
  };
  el.querySelector('.intro-skip').onclick = finish;
  el.addEventListener('click', (e) => { if (!e.target.closest('.intro-skip')) finish(); });
  requestAnimationFrame(tick);
}

/* ---------- Apparition au défilement ---------- */
let revealObs = null;
function splitWords(root) {
  $$('[data-words]', root).forEach((h) => {
    if (h.dataset.split) return;
    h.dataset.split = '1';
    let i = 0;
    const walk = (node) => {
      for (const n of Array.from(node.childNodes)) {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          for (const part of parts) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); continue; }
            const w = document.createElement('span'); w.className = 'rw';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--d', `${0.05 + i++ * 0.07}s`);
            w.appendChild(s); frag.appendChild(w);
          }
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          if (n.classList.contains('gold-text')) { const w = document.createElement('span'); w.className = 'rw'; n.replaceWith(w); w.appendChild(n); n.style.setProperty('--d', `${0.05 + i++ * 0.07}s`); n.classList.add('rw-in'); }
          else walk(n);
        }
      }
    };
    walk(h);
  });
}
function initReveal(root = document) {
  splitWords(root);
  $$('[data-stagger]', root).forEach((p) => { Array.from(p.children).forEach((c, i) => { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--d', `${Math.min(i, 8) * 0.08}s`); }); });
  const els = $$('[data-reveal]:not(.in), [data-words]:not(.in)', root);
  if (REDUCED || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); $$('[data-count]', root).forEach(countUp); return; }
  if (document.documentElement.classList.contains('intro-on')) return;
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); if (en.target.hasAttribute('data-count')) countUp(en.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e) => revealObs.observe(e));
  $$('[data-count]:not([data-reveal])', root).forEach((e) => countUp(e));
}
function revealAll() { $$('[data-reveal],[data-words]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < window.innerHeight) e.classList.add('in'); }); }

/* ---------- Compteurs ---------- */
function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const to = Number(el.dataset.count) || 0;
  const fmt = el.dataset.fmt || 'int';
  const out = (v) => (fmt === 'eur' ? eur(Math.round(v)) : fmt === 'pct' ? `${Math.round(v)} %` : Math.round(v).toLocaleString('fr-FR'));
  if (REDUCED) { el.textContent = out(to); return; }
  const t0 = performance.now(), D = 1300;
  const step = (now) => { const p = Math.min(1, (now - t0) / D); const e = 1 - Math.pow(1 - p, 4); el.textContent = out(to * e); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- Cartes en relief (souris) ---------- */
function initTilt(root = document) {
  if (!FINE || REDUCED) return;
  $$('[data-tilt]', root).forEach((card) => {
    if (card.dataset.tiltOn) return;
    card.dataset.tiltOn = '1';
    const max = Number(card.dataset.tilt) || 6;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
}

/* ---------- Showroom : plateau lumineux, reflets, carrousel ---------- */
function carArt(v) {
  const cut = PHOTOS[v.id]?.cut;
  if (cut) return `<img class="sr-img" src="${cut}" alt="${esc(v.name)}">`;
  return carSVG(v.shape, v.color, { label: v.name });
}
function showroomHTML(list, { carousel = false, big = false } = {}) {
  const cars = list.map((v, i) => `<div class="sr-car ${i === 0 ? 'on' : ''}${PHOTOS[v.id]?.cut ? ' photo' : ''}" data-i="${i}"><div class="sr-body">${carArt(v)}</div><div class="sr-refl" aria-hidden="true">${carArt(v)}</div></div>`).join('');
  const meta = carousel ? `<div class="sr-meta">
      <div class="sr-info" aria-live="polite"><span class="sr-seg">${esc(list[0].segment)}</span><b class="sr-name">${esc(list[0].name)}</b><span class="sr-price">À partir de <b>${eur(list[0].price)}</b> par jour</span></div>
      <div class="sr-nav"><button type="button" class="icon-btn" data-sr-prev aria-label="Véhicule précédent">${icon('chevL')}</button><div class="sr-dots">${list.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('')}</div><button type="button" class="icon-btn" data-sr-next aria-label="Véhicule suivant">${icon('chevR')}</button></div>
    </div>` : '';
  return `<div class="showroom ${big ? 'big' : ''}" data-showroom data-ids="${list.map((v) => esc(v.id)).join(',')}">
    <div class="sr-scene">
      <div class="sr-spot"></div>
      <div class="sr-floor"><i class="sr-ring"></i><i class="sr-ring r2"></i><i class="sr-grid"></i></div>
      <canvas class="sr-dust" aria-hidden="true"></canvas>
      <div class="sr-cars">${cars}</div>
      <div class="sr-sweep" aria-hidden="true"></div>
    </div>${meta}</div>`;
}
const showrooms = new Set();
function mountShowrooms(root = document) {
  $$('[data-showroom]', root).forEach((sr) => {
    if (sr.dataset.on) return;
    sr.dataset.on = '1';
    const ids = sr.dataset.ids.split(',');
    const cars = $$('.sr-car', sr);
    const scene = $('.sr-scene', sr);
    let i = 0, timer = null;
    let moved = 0;
    const show = (n) => {
      if (!sr.isConnected) { clearInterval(timer); return; }
      if (cars.length < 2) return;
      const next = (n + cars.length) % cars.length;
      if (next === i) return;
      const cur = cars[i];
      cur.classList.remove('on'); cur.classList.add('off');
      setTimeout(() => cur.classList.remove('off'), 900);
      cars[next].classList.add('on');
      i = next;
      const v = vehicle(ids[i]);
      const info = $('.sr-info', sr);
      if (info && v) {
        info.classList.remove('swap'); void info.offsetWidth; info.classList.add('swap');
        $('.sr-seg', info).textContent = v.segment; $('.sr-name', info).textContent = v.name; $('.sr-price b', info).textContent = eur(v.price);
      }
      $$('.sr-dots i', sr).forEach((d, k) => d.classList.toggle('on', k === i));
    };
    const auto = () => { clearInterval(timer); if (!REDUCED && cars.length > 1) timer = setInterval(() => show(i + 1), 5200); };
    const prev = $('[data-sr-prev]', sr), next = $('[data-sr-next]', sr);
    if (prev) prev.onclick = () => { show(i - 1); auto(); };
    if (next) next.onclick = () => { show(i + 1); auto(); };
    $$('.sr-dots i', sr).forEach((d, k) => (d.onclick = () => { show(k); auto(); }));
    const link = $('.sr-cars', sr);
    if (link && sr.closest('.hero')) link.addEventListener('click', () => { if (moved > 6) return; const v = vehicle(ids[i]); if (v) go('#/vehicule/' + v.id); });
    auto();
    // Relief : la scène suit la souris, ou le doigt quand on fait glisser
    let rx = 0, ry = 0, tx = 0, ty = 0, dragging = false, sx = 0, base = 0;
    const loop = () => { rx += (tx - rx) * 0.08; ry += (ty - ry) * 0.08; scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; if (sr.isConnected) requestAnimationFrame(loop); };
    if (!REDUCED) {
      requestAnimationFrame(loop);
      sr.addEventListener('pointermove', (e) => {
        const r = sr.getBoundingClientRect();
        if (dragging) { moved = Math.max(moved, Math.abs(e.clientX - sx)); ty = Math.max(-18, Math.min(18, base + ((e.clientX - sx) / r.width) * 40)); return; }
        if (!FINE) return;
        ty = ((e.clientX - r.left) / r.width - 0.5) * 12;
        tx = (0.5 - (e.clientY - r.top) / r.height) * 6;
      });
      sr.addEventListener('pointerleave', () => { if (!dragging) { tx = 0; ty = 0; } });
      sr.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; dragging = true; moved = 0; sx = e.clientX; base = ty; });
      const up = () => { dragging = false; setTimeout(() => { tx = 0; ty = 0; }, 1200); };
      sr.addEventListener('pointerup', up); sr.addEventListener('pointercancel', up);
    }
    // Poussière de lumière
    const cv = $('.sr-dust', sr);
    if (cv && !REDUCED) dust(cv, sr);
    showrooms.add(sr);
    const stop = () => clearInterval(timer);
    sr._stop = stop;
  });
}
function dust(cv, host) {
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const P = [];
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = () => { cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; };
  size();
  for (let k = 0; k < 42; k++) P.push({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.4, s: 0.02 + Math.random() * 0.05, a: Math.random() * Math.PI * 2, g: Math.random() < 0.6 });
  let last = performance.now();
  const frame = (now) => {
    if (!host.isConnected) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (cv.width !== cv.clientWidth * dpr) size();
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) {
      p.y -= p.s * dt; p.a += dt * 1.6;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      const alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(p.a));
      ctx.beginPath();
      ctx.fillStyle = p.g ? `rgba(243,225,182,${alpha})` : `rgba(202,218,233,${alpha})`;
      ctx.arc(p.x * cv.width, p.y * cv.height, p.r * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- Prisme du bandeau de marque (rendu seulement quand il est visible) ---------- */
let bandPrism = null;
function mountBandPrism() {
  if (bandPrism) { bandPrism.dispose(); bandPrism = null; }
  const cv = $('.band-canvas');
  if (!cv) return;
  bandPrism = createPrism(cv, { mode: 'band' });
  if (!bandPrism) { cv.closest('.brand-3d')?.classList.add('no3d'); return; }
  const io = new IntersectionObserver((en) => { if (!bandPrism) return; if (en[0].isIntersecting) bandPrism.start(); else bandPrism.stop(); });
  io.observe(cv);
  bandPrism._io = io;
}
function disposeBandPrism() { if (bandPrism) { bandPrism._io?.disconnect(); bandPrism.dispose(); bandPrism = null; } }

/* ---------- Confettis dorés (paiement accepté) ---------- */
function celebrate(x = window.innerWidth / 2, y = window.innerHeight / 3) {
  if (REDUCED) return;
  const cv = document.createElement('canvas');
  cv.className = 'confetti';
  document.body.appendChild(cv);
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = window.innerWidth * dpr; cv.height = window.innerHeight * dpr;
  const ctx = cv.getContext('2d');
  const cols = ['#f6e7c2', '#e3c58f', '#c39a61', '#ffffff', '#cadae9', '#e6cfdc'];
  const P = Array.from({ length: 140 }, () => ({ x: x * dpr, y: y * dpr, vx: (Math.random() - 0.5) * 14 * dpr, vy: (-Math.random() * 13 - 4) * dpr, w: (4 + Math.random() * 6) * dpr, h: (2 + Math.random() * 3) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[Math.floor(Math.random() * cols.length)] }));
  const t0 = performance.now();
  const frame = (now) => {
    const t = now - t0;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) {
      p.vy += 0.38 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - t / 2600); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    }
    if (t < 2700) requestAnimationFrame(frame); else cv.remove();
  };
  requestAnimationFrame(frame);
}

/* ---------- En-tête qui se densifie au défilement ---------- */
function onScrollHeader() {
  const h = $('.site-header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScrollHeader, { passive: true });

/* ---------- Accueil : véhicules qui défilent sur la scène ---------- */
function mountHero() {
  const hero = $('.hero2');
  if (!hero || hero.dataset.on) return;
  hero.dataset.on = '1';
  const cars = $$('.h2-car', hero);
  const dots = $$('.h2-dots button', hero);
  const cap = $('[data-cap]', hero);
  let i = 0;
  let timer = null;
  const show = (n) => {
    if (!hero.isConnected) { clearInterval(timer); return; }
    if (cars.length < 2) return;
    const next = (n + cars.length) % cars.length;
    if (next === i) return;
    const prev = cars[i];
    prev.classList.remove('on'); prev.classList.add('off');
    setTimeout(() => prev.classList.remove('off'), 1100);
    cars[next].classList.add('on');
    dots.forEach((d, k) => d.classList.toggle('on', k === next));
    i = next;
    const v = vehicle(cars[i].dataset.v);
    if (cap && v) {
      cap.href = '#/vehicule/' + v.id;
      $('[data-cap-seg]', cap).textContent = v.segment;
      $('[data-cap-name]', cap).textContent = nameDash(v);
      $('[data-cap-price]', cap).textContent = money(v.price) + taxTag();
      cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
    }
  };
  const auto = () => { clearInterval(timer); if (!REDUCED && cars.length > 1) timer = setInterval(() => { if (!document.hidden) show(i + 1); }, 5200); };
  dots.forEach((d, k) => (d.onclick = () => { show(k); auto(); }));
  const stage = $('.h2-cars', hero);
  if (stage) stage.onclick = () => { const id = cars[i]?.dataset.v; if (id) go('#/vehicule/' + id); };
  auto();
  const cv = $('.sr-dust', hero);
  if (cv && !REDUCED) dust(cv, hero);
}
/* ---------- Témoignages : défilement par page, points, rotation douce ---------- */
function mountTestimonials() {
  const box = $('[data-tst]');
  if (!box || box.dataset.on) return;
  box.dataset.on = '1';
  const track = $('.tst-track', box);
  const cards = $$('.tst-c', box);
  const dotsBox = box.parentElement.querySelector('.tst-dots');
  const per = () => (window.innerWidth < 760 ? 1 : 2);
  const pages = () => Math.max(1, Math.ceil(cards.length / per()));
  let page = 0;
  let timer = null;
  const mark = () => $$('button', dotsBox).forEach((b, j) => b.classList.toggle('on', j === page));
  const goTo = (k) => {
    page = (k + pages()) % pages();
    const c = cards[Math.min(cards.length - 1, page * per())];
    track.scrollTo({ left: c.offsetLeft - cards[0].offsetLeft, behavior: REDUCED ? 'auto' : 'smooth' });
    mark();
  };
  const draw = () => {
    if (!dotsBox) return;
    dotsBox.innerHTML = Array.from({ length: pages() }, (_, k) => `<button type="button" class="${k === page ? 'on' : ''}" aria-label="Avis, page ${k + 1}"></button>`).join('');
    $$('button', dotsBox).forEach((b, k) => (b.onclick = () => { goTo(k); restart(); }));
  };
  const restart = () => { clearInterval(timer); if (!REDUCED && pages() > 1) timer = setInterval(() => { if (!box.isConnected) { clearInterval(timer); return; } if (!document.hidden) goTo(page + 1); }, 6500); };
  track.addEventListener('scroll', () => { const w = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth; const k = Math.round(track.scrollLeft / (w * per())); if (k !== page && k < pages()) { page = k; mark(); } }, { passive: true });
  draw();
  restart();
}
/* ---------- Bouton « revenir en haut » ---------- */
function onScrollFab() { const b = $('.fab-top'); if (b) b.classList.toggle('show', window.scrollY > 700); }
window.addEventListener('scroll', onScrollFab, { passive: true });

/** À appeler après chaque rendu de page. */
function afterRender() {
  initReveal();
  initTilt();
  mountShowrooms();
  mountHero();
  mountTestimonials();
  onScrollFab();
  onScrollHeader();
  if ($('.band-canvas')) mountBandPrism(); else disposeBandPrism();
  if (document.documentElement.classList.contains('intro-on')) return;
  requestAnimationFrame(revealAll);
}
