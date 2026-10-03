/* CLOS : interactions et animations.
   Principe : tout le contenu est lisible sans ce script ; les animations ne masquent un élément qu'au moment
   où elles le prennent en charge, et des filets de sécurité réaffichent tout ce qui resterait caché. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var mq = function (q) { return w.matchMedia ? w.matchMedia(q).matches : false; };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  var introPending = html.classList.contains('intro-on');
  try { sessionStorage.setItem('clos-intro', '1'); } catch (e) { /* navigation privée */ }

  var G = w.gsap, ST = w.ScrollTrigger, SPLIT = w.SplitText;
  var anim = !!(G && ST);
  if (anim) {
    G.registerPlugin(ST);
    if (SPLIT) G.registerPlugin(SPLIT);
    ST.config({ ignoreMobileResize: true });
  }
  html.classList.add('anim'); // les états initiaux du haut de page passent sous le contrôle du script

  var hdr = $('[data-hdr]'), book = $('[data-book]'), ftr = $('[data-ftr]'), main = $('#contenu');
  var heroEl = $('[data-hero]'), subnav = $('[data-subnav]');
  var fontsReady = Promise.race([
    d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve(),
    new Promise(function (r) { setTimeout(r, 1500); })
  ]);

  /* ------------------------------------------------------------ défilement doux (souris uniquement) */
  var lenis = null;
  if (anim && !reduce && fine && typeof w.Lenis === 'function') {
    try {
      lenis = new w.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      G.ticker.add(function (t) { lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
    } catch (e) { lenis = null; }
  }
  function lockScroll(on) {
    if (lenis) { on ? lenis.stop() : lenis.start(); }
    html.style.overflow = on ? 'hidden' : '';
  }

  /* ------------------------------------------------------------ en-tête, bouton Réserver */
  var lastY = w.scrollY || 0, ticking = false, ftrVisible = false;
  function setHidden(v) {
    if (!hdr) return;
    hdr.classList.toggle('is-hidden', v);
    html.classList.toggle('hdr-hidden', v);
  }
  function onScrollFrame() {
    ticking = false;
    var y = w.scrollY || 0, dy = y - lastY;
    var menuOpen = html.classList.contains('menu-open');
    if (hdr && !menuOpen) {
      hdr.classList.toggle('is-solid', y > 40);
      if (y > 320 && dy > 4) setHidden(true);
      else if (dy < -4 || y <= 320) setHidden(false);
    }
    if (book) {
      var limit = heroEl ? heroEl.offsetHeight * 0.7 : 420;
      book.classList.toggle('is-on', y > limit && !ftrVisible && !menuOpen);
    }
    lastY = y;
  }
  w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); } }, { passive: true });
  if (hdr) hdr.addEventListener('focusin', function () { setHidden(false); });
  if (ftr && 'IntersectionObserver' in w) {
    new IntersectionObserver(function (es) { ftrVisible = es[0].isIntersecting; onScrollFrame(); }, { rootMargin: '0px 0px -8% 0px' }).observe(ftr);
  }
  onScrollFrame();

  /* ------------------------------------------------------------ menu plein écran */
  var menu = $('#menu'), burger = $('[data-burger]'), burgerLabel = $('[data-burger-label]');
  var lastFocus = null, menuBusy = false;
  function setInert(v) {
    [main, ftr, book, $('.skip')].forEach(function (el) { if (el) { el.inert = v; if (v) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden'); } });
  }
  function menuPhoto(key) {
    $$('.menu__photo', menu).forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-photo') === key); });
  }
  function burgerCenter() {
    var r = burger.getBoundingClientRect();
    return (r.left + r.width / 2) + 'px ' + (r.top + r.height / 2) + 'px';
  }
  function openMenu() {
    if (!menu || html.classList.contains('menu-open') || menuBusy) return;
    lastFocus = d.activeElement;
    menu.hidden = false;
    html.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    if (burgerLabel) burgerLabel.textContent = 'Fermer le menu';
    setInert(true); lockScroll(true); setHidden(false);
    var cur = $('.menu__link[aria-current]', menu) || $('.menu__link', menu);
    if (cur) menuPhoto(cur.getAttribute('data-photo'));
    var links = $$('.menu__link', menu);
    if (anim && !reduce) {
      var at = burgerCenter(), R = Math.hypot(w.innerWidth, w.innerHeight) * 1.05;
      G.killTweensOf([$('.menu__bg', menu), links, $('.menu__aside', menu)]);
      G.fromTo($('.menu__bg', menu), { clipPath: 'circle(0px at ' + at + ')' }, { clipPath: 'circle(' + R + 'px at ' + at + ')', duration: 0.9, ease: 'expo.inOut' });
      G.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.3 });
      G.fromTo($('.menu__aside', menu), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
    }
    setTimeout(function () { if (cur) cur.focus({ preventScroll: true }); }, anim && !reduce ? 320 : 0);
  }
  function closeMenu(instant) {
    if (!menu || !html.classList.contains('menu-open')) return;
    burger.setAttribute('aria-expanded', 'false');
    if (burgerLabel) burgerLabel.textContent = 'Ouvrir le menu';
    function done() {
      menu.hidden = true; menuBusy = false;
      html.classList.remove('menu-open');
      setInert(false); lockScroll(false); onScrollFrame();
    }
    if (anim && !reduce && !instant) {
      menuBusy = true;
      var links = $$('.menu__link', menu);
      G.killTweensOf([$('.menu__bg', menu), links, $('.menu__aside', menu)]);
      G.to(links, { yPercent: -110, duration: 0.45, ease: 'power3.in', stagger: 0.03 });
      G.to($('.menu__aside', menu), { opacity: 0, duration: 0.3 });
      G.to($('.menu__bg', menu), { clipPath: 'circle(0px at ' + burgerCenter() + ')', duration: 0.75, ease: 'expo.inOut', delay: 0.2, onComplete: done });
    } else done();
    if (!instant && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  if (menu && burger) {
    burger.addEventListener('click', function () { html.classList.contains('menu-open') ? closeMenu() : openMenu(); });
    $$('.menu__link', menu).forEach(function (a) {
      a.addEventListener('pointerenter', function () { menuPhoto(a.getAttribute('data-photo')); });
      a.addEventListener('focus', function () { menuPhoto(a.getAttribute('data-photo')); });
      a.addEventListener('click', function () { if (a.getAttribute('aria-current')) closeMenu(); });
    });
    d.addEventListener('keydown', function (e) {
      if (!html.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key !== 'Tab') return;
      var f = [burger].concat($$('a[href], button:not([disabled])', menu).filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; }));
      var i = f.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      else if (i === -1) { e.preventDefault(); f[0].focus(); }
    });
    w.addEventListener('resize', function () { if (w.innerWidth >= 1100 && html.classList.contains('menu-open')) closeMenu(true); });
  }
  w.addEventListener('pageshow', function (e) {
    if (e.persisted) { closeMenu(true); if (anim) ST.refresh(); }
  });

  /* ------------------------------------------------------------ ancres (défilement avec décalage de l'en-tête) */
  d.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    var t = null;
    try { t = d.querySelector(id); } catch (err) { return; }
    if (!t) return;
    e.preventDefault();
    var off = (subnav ? subnav.offsetHeight : 0) + 16;
    var top = t.getBoundingClientRect().top + (w.scrollY || 0) - off - (t.getBoundingClientRect().top < 0 && hdr ? hdr.offsetHeight : 0);
    if (lenis) lenis.scrollTo(top, { duration: 1.3 });
    else w.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    t.focus({ preventScroll: true });
  });

  /* ------------------------------------------------------------ sous-menu de la carte (section active) */
  if (subnav && 'IntersectionObserver' in w) {
    var sLinks = $$('[data-subnav-link]', subnav);
    var list = $('.subnav__list', subnav);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        sLinks.forEach(function (l) {
          var on = l.getAttribute('href') === '#' + en.target.id;
          l.classList.toggle('is-active', on);
          if (on) { l.setAttribute('aria-current', 'true'); if (list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: l.offsetLeft - 16, behavior: 'smooth' }); }
          else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('[data-msec]').forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------ formulaire de privatisation (prépare un e-mail) */
  var form = $('[data-form]');
  if (form) {
    var doneBox = $('[data-form-done]', form), copied = $('[data-form-copied]', form), lastText = '';
    var to = (form.getAttribute('action') || '').replace(/^mailto:/, '');
    var frDate = function (v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : (v || ''); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) { if (form.reportValidity) form.reportValidity(); return; }
      var fd = new FormData(form), lines = [];
      fd.forEach(function (v, k) { v = String(v).trim(); if (v) lines.push(k + ' : ' + (k === 'Date' ? frDate(v) : v)); });
      var subject = 'Demande de privatisation : ' + (fd.get('Occasion') || 'événement') + ', le ' + frDate(fd.get('Date')) + ' (' + (fd.get('Convives') || '?') + ' personnes)';
      var body = 'Bonjour,\n\nJe souhaite organiser un événement au Clos. Voici ma demande :\n\n' + lines.join('\n') + '\n\nMerci de me recontacter.\n';
      lastText = 'À : ' + to + '\nObjet : ' + subject + '\n\n' + body;
      if (doneBox) { doneBox.hidden = false; setTimeout(function () { doneBox.focus(); }, 60); }
      w.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
    var copyBtn = $('[data-form-copy]', form);
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var ok = function () { if (copied) copied.textContent = 'Demande copiée : collez-la dans un e-mail à ' + to + '.'; };
      var fallback = function () {
        var ta = d.createElement('textarea'); ta.value = lastText; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        d.body.appendChild(ta); ta.select();
        try { d.execCommand('copy'); ok(); } catch (err) { if (copied) copied.textContent = 'Copie impossible : écrivez-nous à ' + to + '.'; }
        d.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(lastText).then(ok, fallback); else fallback();
    });
  }

  /* ============================================================ animations (GSAP) */
  if (!anim) {
    html.classList.remove('intro-on');
    var intro0 = $('div.intro'); if (intro0) intro0.remove();
    return;
  }

  /* ---------------- tâches découpées : l'initialisation ne bloque jamais la page plus de ~30 ms d'affilée */
  var tasks = [];
  var queue = function (fn) { tasks.push(fn); };
  var drain = function () {
    var t0 = performance.now();
    while (tasks.length && performance.now() - t0 < 30) {
      var fn = tasks.shift();
      try { fn(); } catch (err) { if (w.console) console.error('[clos]', err); }
    }
    if (tasks.length) setTimeout(drain, 0);
  };

  /* ---------------- haut de page : l'entrée est en CSS (elle n'attend pas ce script) ; ici, parallaxe et intro */
  if (heroEl && !reduce) {
    if (heroEl.classList.contains('hero')) {
      G.to($('.hero__media', heroEl), { yPercent: 16, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
      G.to($('.hero__inner', heroEl), { yPercent: -10, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
    } else {
      var hm = $('[data-hero-media]', heroEl);
      if (hm && (heroEl.classList.contains('phero--full') || heroEl.classList.contains('lost'))) {
        G.to(hm, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
      }
    }
  }

  /* ---------------- intro (accueil, première visite) : le logo se dessine puis rejoint l'en-tête */
  function runIntro() {
    var el = $('div.intro');
    var drop = function () { if (el) el.remove(); html.classList.remove('intro-on'); };
    if (!introPending || !el || reduce || !heroEl) { drop(); return; }
    // script très lent : le filet de sécurité CSS a déjà retiré l'intro, on n'anime plus rien
    if (w.getComputedStyle(el).visibility === 'hidden') { drop(); return; }
    el.style.animation = 'none';
    html.classList.add('hero-js'); // le haut de page passe sous le contrôle de GSAP (entrée après l'intro)
    var heroTl = G.timeline({ paused: true });
    heroTl.fromTo($('.hero__img', heroEl), { scale: 1.22 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0)
      .fromTo($$('.hero__wordmark .wordmark__l', heroEl), { y: 180 }, { y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.08 }, 0.1)
      .fromTo($$('[data-hero-item]', heroEl), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1 }, 0.5);
    lockScroll(true);
    var logo = $('.intro__logo', el), panel = $('.intro__panel', el), target = $('.hdr__disc');
    var started = false;
    var start = function () { if (!started) { started = true; heroTl.play(); } };
    var finish = function () { start(); el.remove(); html.classList.remove('intro-on'); lockScroll(false); ST.refresh(); };
    var a = logo.getBoundingClientRect(), b = target ? target.getBoundingClientRect() : null;
    var tl = G.timeline({ onComplete: finish });
    tl.fromTo($('.disc__bg', el), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.95, ease: 'expo.out' }, 0)
      .fromTo($$('.disc__letters use', el), { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'expo.out', stagger: 0.06 }, 0.12)
      .fromTo($('.disc__sub', el), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.38);
    if (b && b.width && a.width) {
      tl.to(logo, { x: (b.left + b.width / 2) - (a.left + a.width / 2), y: (b.top + b.height / 2) - (a.top + a.height / 2), scale: b.width / a.width, duration: 0.95, ease: 'expo.inOut' }, 1.1);
    } else {
      tl.to(logo, { opacity: 0, scale: 0.7, duration: 0.6, ease: 'power2.in' }, 1.1);
    }
    tl.to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.95, ease: 'expo.inOut' }, 1.1)
      .add(start, 1.35);
    setTimeout(function () { if (d.contains(el)) tl.progress(1); }, 6000);
  }
  runIntro();

  /* ---------------- apparitions au défilement */
  $$('[data-reveal]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var sib = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [];
      var i = Math.max(0, sib.indexOf(el));
      G.from(el, { opacity: 0, y: 38, duration: 1.1, ease: 'power3.out', delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  });

  $$('[data-clip]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
    var im = $('img', el);
    var tl = G.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(14% 10% 14% 10% round 10px)' }, { clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 1.6, ease: 'expo.out' }, 0);
    if (im) tl.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: 'expo.out' }, 0);
    });
  });

  $$('[data-parallax]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var v = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      G.fromTo(el, { yPercent: -v * 100 }, { yPercent: v * 100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  $$('[data-count]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var end = parseFloat(el.getAttribute('data-count')), dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if (isNaN(end)) return;
      var o = { v: 0 }, fmt = function (v) { return v.toFixed(dec).replace('.', ','); };
      el.textContent = fmt(0);
      G.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: function () { el.textContent = fmt(o.v); }, onComplete: function () { el.textContent = fmt(end); }, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
  });

  /* ---------------- bandeau défilant, accéléré par la vitesse de défilement */
  var marquee = $('.marquee');
  if (marquee && !reduce) queue(function () {
    var loops = $$('[data-marquee]', marquee).map(function (row) {
      var track = $('.marquee__track', row), dir = parseFloat(row.getAttribute('data-marquee')) || 1;
      return G.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 46, ease: 'none', repeat: -1 });
    });
    var boost = { v: 1 }, calm = null;
    var setBoost = G.quickTo(boost, 'v', { duration: 0.6, ease: 'power3.out', onUpdate: function () { loops.forEach(function (t) { t.timeScale(boost.v); }); } });
    ST.create({
      trigger: marquee, start: 'top bottom', end: 'bottom top',
      onToggle: function (st) { loops.forEach(function (t) { st.isActive ? t.play() : t.pause(); }); },
      onUpdate: function (st) {
        setBoost(1 + Math.min(Math.abs(st.getVelocity()) / 260, 5));
        clearTimeout(calm); calm = setTimeout(function () { setBoost(1); }, 140);
      }
    });
  });

  /* ---------------- aperçu des plats qui suit la souris */
  $$('[data-dishes]').forEach(function (scope) {
    var prev = $('[data-dish-preview]', scope);
    if (!prev) return;
    queue(function () {
      var rows = $$('[data-dish]', scope);
      var items = {}; $$('[data-dish-img]', prev).forEach(function (it) { items[it.getAttribute('data-dish-img')] = it; });
      G.matchMedia().add('(min-width: 900px) and (hover: hover) and (pointer: fine)', function () {
        // les photos se chargent quand la liste approche
        ST.create({ trigger: scope, start: 'top bottom+=600', once: true, onEnter: function () { $$('img', prev).forEach(function (im) { im.loading = 'eager'; }); } });
        G.set(prev, { xPercent: -50, yPercent: -50, x: w.innerWidth / 2, y: w.innerHeight / 2, opacity: 0, scale: 0.86 });
        var xTo = G.quickTo(prev, 'x', { duration: 0.65, ease: 'power3' }), yTo = G.quickTo(prev, 'y', { duration: 0.65, ease: 'power3' });
        var cur = null, shown = false;
        var hide = function () { if (!shown) return; shown = false; G.to(prev, { opacity: 0, scale: 0.86, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }); };
        var show = function (key) {
          var it = items[key];
          if (!it) { hide(); return; }
          if (!shown) { shown = true; G.to(prev, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' }); }
          if (cur !== it) {
            if (cur) G.to(cur, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut', overwrite: true });
            G.fromTo(it, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power3.inOut', overwrite: true });
            it.parentNode.appendChild(it);
            cur = it;
          }
        };
        var move = function (e) { xTo(e.clientX); yTo(e.clientY); };
        var enters = rows.map(function (r) { var f = function () { show(r.getAttribute('data-dish')); }; r.addEventListener('pointerenter', f); return [r, 'pointerenter', f]; });
        var leaves = rows.map(function (r) { var f = function (e) { if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest('[data-dish]')) hide(); }; r.addEventListener('pointerleave', f); return [r, 'pointerleave', f]; });
        w.addEventListener('pointermove', move, { passive: true });
        return function () {
          w.removeEventListener('pointermove', move);
          enters.concat(leaves).forEach(function (x) { x[0].removeEventListener(x[1], x[2]); });
          G.set(prev, { clearProps: 'all' });
        };
      });
    });
  });

  /* ---------------- galerie horizontale épinglée (bar à vins) */
  var gal = $('[data-gallery]');
  if (gal) queue(function () {
    G.matchMedia().add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', function () {
      var track = $('[data-gallery-track]', gal);
      var dist = function () { return Math.max(0, track.scrollWidth - gal.clientWidth); };
      G.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: gal, start: 'center center', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
    });
  });

  /* ---------------- plan : itinéraire depuis la gare, repères */
  $$('[data-plan]').forEach(function (p) {
    if (reduce) return;
    queue(function () {
      var route = $('.plan__route', p);
      var tl = G.timeline({ scrollTrigger: { trigger: p, start: 'top 78%', once: true } });
      if (route) tl.fromTo(route, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' }, 0.2);
      tl.from($$('.plan__disc, .plan__dot', p), { scale: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.25, transformOrigin: '50% 50%' }, 0)
        .from($$('.plan__lab', p), { opacity: 0, x: -8, duration: 0.6, ease: 'power2.out', stagger: 0.25 }, 0.4);
    });
  });

  /* ---------------- grand « CLOS » du pied de page */
  var fl = $$('.ftr__wordmark .wordmark__l');
  if (fl.length && !reduce) queue(function () {
    G.fromTo(fl, { y: 180 }, { y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.ftr__mark', start: 'top 98%', once: true } });
  });

  /* ---------------- titres ligne à ligne, texte qui s'allume au défilement (une fois les polices prêtes) */
  var fontsLate = !!(d.fonts && d.fonts.status === 'loading');
  fontsReady.then(function () {
    if (!SPLIT || reduce) return;
    $$('[data-split]').forEach(function (el) {
      queue(function () {
        SPLIT.create(el, {
          type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
          onSplit: function (self) {
            return G.from(self.lines, { yPercent: 112, duration: 1.2, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          }
        });
      });
    });
    $$('[data-scrolllit]').forEach(function (el) {
      queue(function () {
        var sp = SPLIT.create(el, { type: 'words' });
        G.fromTo(sp.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
      });
    });
    if (fontsLate) queue(function () { ST.refresh(); });
    drain();
  });

  /* ---------------- filets de sécurité : rien ne reste caché */
  function failsafe() {
    $$('[data-reveal], [data-clip]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < w.innerHeight * 0.92 && r.bottom > 0 && !G.isTweening(el)) {
        var cs = w.getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.05 || (cs.clipPath && cs.clipPath !== 'none' && cs.clipPath.indexOf('14%') > -1)) G.set(el, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 10px)' });
      }
    });
  }
  ST.addEventListener('scrollEnd', failsafe);
  setTimeout(failsafe, 4000);
  drain();
})();
