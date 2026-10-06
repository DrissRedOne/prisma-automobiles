/* Héliciculture du Garnoutey : interactions et animations.
   Principe : tout le contenu est lisible sans ce script ; une animation ne masque un élément qu'au moment
   où elle le prend en charge, et des filets de sécurité réaffichent tout ce qui resterait caché. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var mq = function (q) { return w.matchMedia ? w.matchMedia(q).matches : false; };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  var introPending = html.classList.contains('intro-on');
  try { sessionStorage.setItem('garnoutey-intro', '1'); } catch (e) { /* navigation privée */ }

  var G = w.gsap, ST = w.ScrollTrigger, SPLIT = w.SplitText;
  var anim = !!(G && ST);
  if (anim) {
    G.registerPlugin(ST);
    if (SPLIT) G.registerPlugin(SPLIT);
    ST.config({ ignoreMobileResize: true });
  }

  var hdr = $('[data-hdr]'), book = $('[data-book]'), ftr = $('[data-ftr]'), main = $('#contenu');
  var heroEl = $('[data-hero]');
  var fontsReady = Promise.race([
    d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve(),
    new Promise(function (r) { setTimeout(r, 1500); })
  ]);

  /* ------------------------------------------------------------ défilement doux (souris uniquement) */
  var lenis = null;
  if (anim && !reduce && fine && typeof w.Lenis === 'function') {
    try {
      lenis = new w.Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
      lenis.on('scroll', ST.update);
      G.ticker.add(function (t) { lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
    } catch (e) { lenis = null; }
  }
  function lockScroll(on) {
    if (lenis) { on ? lenis.stop() : lenis.start(); }
    html.style.overflow = on ? 'hidden' : '';
  }

  /* ------------------------------------------------------------ en-tête, barre de commande */
  var lastY = w.scrollY || 0, ticking = false, ftrVisible = false;
  function setHidden(v) {
    if (!hdr) return;
    hdr.classList.toggle('is-hidden', v);
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
      var limit = heroEl ? heroEl.offsetHeight * 0.6 : 420;
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
    $$('a[href*="#"]', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(true); }); });
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

  /* ------------------------------------------------------------ ancres (défilement doux, décalage de l'en-tête) */
  function scrollToEl(t, instant) {
    var top = t.getBoundingClientRect().top + (w.scrollY || 0) - (hdr ? hdr.offsetHeight : 0) - 16;
    if (lenis && !instant) lenis.scrollTo(top, { duration: 1.3 });
    else w.scrollTo({ top: top, behavior: reduce || instant ? 'auto' : 'smooth' });
    if (!t.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA|FORM)$/.test(t.tagName)) t.setAttribute('tabindex', '-1');
    t.focus({ preventScroll: true });
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="#"]') : null;
    if (!a) return;
    var url;
    try { url = new URL(a.href, w.location.href); } catch (err) { return; }
    if (url.pathname !== w.location.pathname || !url.hash || url.hash.length < 2) return;
    var t = null;
    try { t = d.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (err) { return; }
    if (!t) return;
    e.preventDefault();
    if (url.search !== w.location.search) { try { history.replaceState(null, '', url.pathname + url.search + url.hash); } catch (err) { /* rien */ } applyProduct(); }
    scrollToEl(t);
  });

  /* ------------------------------------------------------------ formulaire de commande (prépare un e-mail) */
  var form = $('[data-form]');
  // arrivée depuis « Nos escargots » (?produit=particuliers|restaurants|revendeurs) : le profil est déjà choisi
  function applyProduct() {
    var sel = form ? $('[data-qui]', form) : null;
    if (!sel) return;
    var key = null;
    try { key = new URLSearchParams(w.location.search).get('produit'); } catch (e) { key = null; }
    if (!key) return;
    $$('option', sel).forEach(function (o) { if (o.getAttribute('data-key') === key) sel.value = o.value; });
    var type = $('#f-type', form), drop = $('#f-retrait', form);
    if (key !== 'particuliers') {
      if (type) type.value = 'Acheteur professionnel';
      if (drop) drop.value = 'Livraison avec la remorque';
    }
  }
  if (form) {
    applyProduct();
    var doneBox = $('[data-form-done]', form), copied = $('[data-form-copied]', form), errBox = $('[data-form-err]', form), lastText = '';
    var to = (form.getAttribute('action') || '').replace(/^mailto:/, '');
    var frDate = function (v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : (v || ''); };
    var required = $$('[required]', form);
    required.forEach(function (f) { f.addEventListener('input', function () { if (f.value.trim()) f.removeAttribute('aria-invalid'); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var missing = required.filter(function (f) { return !f.value.trim(); });
      required.forEach(function (f) { if (missing.indexOf(f) > -1) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid'); });
      var mail = $('#f-mail', form);
      var badMail = mail && mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim());
      if (mail) { if (badMail) mail.setAttribute('aria-invalid', 'true'); else mail.removeAttribute('aria-invalid'); }
      if (missing.length || badMail) {
        if (errBox) { errBox.hidden = false; errBox.textContent = missing.length ? 'Indiquez au moins votre nom et votre téléphone, pour que nous puissions vous rappeler.' : 'Cette adresse e-mail semble incomplète.'; }
        (missing[0] || mail).focus();
        return;
      }
      if (errBox) errBox.hidden = true;
      var fd = new FormData(form), lines = [];
      fd.forEach(function (v, k) { v = String(v).trim(); if (v) lines.push(k + ' : ' + (k === 'Date souhaitée' ? frDate(v) : v)); });
      var subject = (fd.get('Demande') || 'Demande') + (fd.get('Nom') ? ', ' + String(fd.get('Nom')).trim() : '');
      var body = 'Bonjour,\n\nVoici ma demande :\n\n' + lines.join('\n') + '\n\nMerci de me recontacter.\n';
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
  // arrivée sur une ancre depuis une autre page : la placer sous l'en-tête une fois la page prête
  if (w.location.hash.length > 1) {
    w.addEventListener('load', function () {
      var t = null;
      try { t = d.getElementById(decodeURIComponent(w.location.hash.slice(1))); } catch (e) { t = null; }
      if (t) setTimeout(function () { scrollToEl(t, true); }, 60);
    });
  }

  /* ------------------------------------------------------------ vidéos de l'élevage
     L'image d'attente reste seule en mouvement réduit et en mode économie de données ; sinon la vidéo se charge
     quand elle approche de l'écran, se met en pause quand elle en sort, et un bouton permet de l'arrêter. */
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  $$('[data-video]').forEach(function (box) {
    var v = $('video', box), btn = $('[data-video-btn]', box), label = $('[data-video-label]', box);
    if (!v || reduce || saveData) return;
    var userPaused = false, inView = false;
    var setBtn = function (paused) {
      box.classList.toggle('is-paused', paused);
      if (label) label.textContent = paused ? 'Lancer la vidéo' : 'Mettre la vidéo en pause';
    };
    var play = function () {
      if (html.classList.contains('intro-on')) { setTimeout(function () { if (inView && !userPaused) play(); }, 500); return; }
      if (!v.getAttribute('data-loaded')) {
        v.setAttribute('data-loaded', '1');
        $$('source', v).forEach(function (s) { s.setAttribute('src', s.getAttribute('data-src')); });
        v.load();
      }
      var p = v.play();
      if (p && p.catch) p.catch(function () { /* lecture refusée par le navigateur : l'image reste */ });
    };
    v.addEventListener('playing', function () { box.classList.add('is-playing'); if (btn) btn.hidden = false; setBtn(false); });
    v.addEventListener('pause', function () { setBtn(true); });
    if (btn) btn.addEventListener('click', function () {
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
    });
    if ('IntersectionObserver' in w) {
      new IntersectionObserver(function (es) {
        inView = es[0].isIntersecting;
        if (inView && !userPaused) play();
        else if (!inView && !v.paused) v.pause();
      }, { rootMargin: '200px 0px' }).observe(box);
    } else { inView = true; play(); }
  });

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
      try { fn(); } catch (err) { if (w.console) console.error('[garnoutey]', err); }
    }
    if (tasks.length) setTimeout(drain, 0);
  };

  /* ---------------- haut de page : l'entrée est en CSS (elle n'attend pas ce script) ; ici, parallaxe et intro */
  // (sur le conteneur seulement : l'image garde son animation d'entrée en CSS, sans conflit de transformation)
  if (heroEl && !reduce) {
    var hm = $('[data-hero-media]', heroEl);
    if (hm) G.to(hm, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------------- intro (accueil, première visite) : la spirale se dessine, puis le rideau se lève */
  function runIntro() {
    var el = $('div.intro');
    var drop = function () { if (el) el.remove(); html.classList.remove('intro-on'); };
    if (!introPending || !el || reduce || !heroEl) { drop(); return; }
    if (w.getComputedStyle(el).visibility === 'hidden') { drop(); return; }
    el.style.animation = 'none';
    html.classList.add('hero-js');
    var heroTl = G.timeline({ paused: true });
    heroTl.fromTo($('.hero__arch', heroEl), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .fromTo($('.hero__img', heroEl), { scale: 1.25 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0.2)
      .fromTo($$('.hero__line > span', heroEl), { yPercent: 108 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.1 }, 0.25)
      .fromTo($$('[data-hero-item]', heroEl), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1 }, 0.55)
      .fromTo($('.hero__badge', heroEl), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.6)' }, 1.0);
    lockScroll(true);
    var mark = $('.intro__mark', el), panel = $('.intro__panel', el);
    var started = false;
    var start = function () { if (!started) { started = true; heroTl.play(); } };
    var finish = function () { start(); el.remove(); html.classList.remove('intro-on'); lockScroll(false); ST.refresh(); };
    var tl = G.timeline({ delay: 1.75, onComplete: finish });
    tl.to(mark, { y: -40, opacity: 0, duration: 0.8, ease: 'power3.in' }, 0)
      .to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0.35)
      .add(start, 0.75);
    setTimeout(function () { if (d.contains(el)) tl.progress(1); }, 5200);
  }
  runIntro();

  /* ---------------- apparitions au défilement */
  $$('[data-reveal]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var sib = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [];
      var i = Math.max(0, sib.indexOf(el));
      G.from(el, { opacity: 0, y: 36, duration: 1.15, ease: 'power3.out', delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  });

  // arches : elles « montent » depuis le bas, l'image se pose
  $$('[data-clip]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var im = $('.arch__img', el) || $('img', el);
      var tl = G.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath' }, 0);
      if (im) tl.fromTo(im, { scale: 1.28 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0.15);
    });
  });

  $$('[data-parallax]').forEach(function (el) {
    if (reduce) return;
    queue(function () {
      var v = parseFloat(el.getAttribute('data-parallax')) || 0.05;
      G.fromTo(el, { yPercent: -v * 100 }, { yPercent: v * 100, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  // spirale qui se dessine au fil du défilement
  $$('[data-draw]').forEach(function (p) {
    if (reduce) return;
    queue(function () {
      var sec = p.closest('section') || p;
      G.fromTo(p, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 85%', end: 'bottom 40%', scrub: 1 } });
    });
  });

  // emblème du pied de page : tracé à l'arrivée, puis le mot « Garnoutey » monte
  var fe = $('.ftr__emblem');
  if (fe && !reduce) queue(function () {
    var paths = $$('path', fe), word = $('.ftr__word');
    G.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
    var tl = G.timeline({ scrollTrigger: { trigger: '.ftr__mark', start: 'top 96%', once: true } });
    tl.to(paths[0], { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to(paths[1], { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 1.5);
    if (word) tl.from(word, { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.2);
  });

  /* ---------------- le cycle de l'année : défilement horizontal épinglé (grand écran) */
  var cyc = $('[data-cycle]');
  if (cyc && !reduce) queue(function () {
    var track = $('[data-cycle-track]', cyc), bar = $('[data-cycle-bar]', cyc), pin = $('.cycle__pin', cyc);
    G.matchMedia().add('(min-width: 1100px) and (min-height: 640px)', function () {
      cyc.classList.add('is-h');
      var dist = function () { return Math.max(0, track.scrollWidth - w.innerWidth); };
      var tw = G.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: {
        trigger: cyc, start: 'top top', end: function () { return '+=' + dist(); }, pin: pin, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: function (st) { if (bar) G.set(bar, { scaleX: st.progress }); }
      } });
      $$('.cycle__step', track).forEach(function (s) {
        var im = $('.arch__img', s);
        if (im) G.fromTo(im, { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: s, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      });
      return function () { cyc.classList.remove('is-h'); G.set(track, { clearProps: 'transform' }); if (bar) G.set(bar, { clearProps: 'transform' }); };
    });
    G.matchMedia().add('(max-width: 1099px), (max-height: 639px)', function () {
      $$('.cycle__step', track).forEach(function (s) {
        G.from(s, { opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 88%', once: true } });
      });
    });
  });

  /* ---------------- bandeaux défilants, accélérés par la vitesse de défilement */
  $$('.marquee').forEach(function (mq_) {
    if (reduce) return;
    queue(function () {
      var track = $('.marquee__track', mq_);
      var loop = G.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      var boost = { v: 1 }, calm = null;
      var setBoost = G.quickTo(boost, 'v', { duration: 0.6, ease: 'power3.out', onUpdate: function () { loop.timeScale(boost.v); } });
      ST.create({
        trigger: mq_, start: 'top bottom', end: 'bottom top',
        onToggle: function (st) { st.isActive ? loop.play() : loop.pause(); },
        onUpdate: function (st) {
          setBoost(1 + Math.min(Math.abs(st.getVelocity()) / 300, 4));
          clearTimeout(calm); calm = setTimeout(function () { setBoost(1); }, 140);
        }
      });
    });
  });

  /* ---------------- titres ligne à ligne, texte qui s'allume au défilement (une fois les polices prêtes) */
  var fontsLate = !!(d.fonts && d.fonts.status === 'loading');
  fontsReady.then(function () {
    if (!SPLIT || reduce) { drain(); return; }
    $$('[data-split]').forEach(function (el) {
      queue(function () {
        SPLIT.create(el, {
          type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
          onSplit: function (self) {
            return G.from(self.lines, { yPercent: 112, duration: 1.25, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          }
        });
      });
    });
    $$('[data-scrolllit]').forEach(function (el) {
      queue(function () {
        var sp = SPLIT.create(el, { type: 'words' });
        G.fromTo(sp.words, { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
      });
    });
    if (fontsLate) queue(function () { ST.refresh(); });
    drain();
  });

  /* ---------------- filets de sécurité : rien ne reste caché */
  function failsafe() {
    $$('[data-reveal], [data-clip], .cycle__step').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < w.innerHeight * 0.92 && r.bottom > 0 && !G.isTweening(el)) {
        var cs = w.getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.05) G.set(el, { opacity: 1, y: 0 });
        if (cs.clipPath && cs.clipPath !== 'none' && cs.clipPath.indexOf('100%') > -1) G.set(el, { clipPath: 'none' });
      }
    });
  }
  ST.addEventListener('scrollEnd', failsafe);
  setTimeout(failsafe, 4000);
  drain();
})();
