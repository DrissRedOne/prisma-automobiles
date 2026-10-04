/* BM33 Automobiles : interactions.
   Principe : tout le contenu est lisible sans ce script. Les apparitions ne masquent que ce qui est encore sous
   la ligne de flottaison au moment où le script le prend en charge ; rien n'est jamais caché sans filet de sécurité. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var mq = function (q) { return w.matchMedia ? w.matchMedia(q).matches : false; };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var run = function (name, fn) { try { fn(); } catch (e) { if (w.console) console.error('[bm33] ' + name, e); } };

  /* ------------------------------------------------------------ en-tête et barre de contact */
  var hdr = $('[data-hdr]'), dock = $('[data-dock]'), ftr = $('.ftr'), main = $('#contenu'), menu = $('#menu');
  var lastY = w.scrollY || 0, ticking = false, ftrVisible = false;
  function onScroll() {
    ticking = false;
    var y = w.scrollY || 0, dy = y - lastY;
    if (hdr && !html.classList.contains('menu-open')) {
      hdr.classList.toggle('is-solid', y > 24);
      if (y > 420 && dy > 6) hdr.classList.add('is-hidden');
      else if (dy < -6 || y <= 420) hdr.classList.remove('is-hidden');
    }
    if (dock) dock.classList.toggle('is-away', ftrVisible || html.classList.contains('menu-open'));
    lastY = y;
  }
  run('entete', function () {
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; w.requestAnimationFrame(onScroll); } }, { passive: true });
    if (hdr) hdr.addEventListener('focusin', function () { hdr.classList.remove('is-hidden'); });
    if (ftr && 'IntersectionObserver' in w) {
      new IntersectionObserver(function (es) { ftrVisible = es[0].isIntersecting; onScroll(); }, { rootMargin: '0px 0px -12% 0px' }).observe(ftr);
    }
    onScroll();
  });

  /* ------------------------------------------------------------ menu plein écran */
  run('menu', function () {
    var burger = $('[data-burger]'), label = $('[data-burger-label]'), lastFocus = null;
    if (!menu || !burger) return;
    var outside = function () { return [main, ftr, dock, $('.skip')].filter(Boolean); };
    function open() {
      lastFocus = d.activeElement;
      menu.hidden = false;
      html.classList.add('menu-open');
      w.requestAnimationFrame(function () { menu.classList.add('is-open'); });
      burger.setAttribute('aria-expanded', 'true');
      if (label) label.textContent = 'Fermer le menu';
      outside().forEach(function (el) { el.inert = true; el.setAttribute('aria-hidden', 'true'); });
      html.style.overflow = 'hidden';
      if (hdr) hdr.classList.remove('is-hidden');
      onScroll();
      var first = $('.menu__link[aria-current]', menu) || $('.menu__link', menu);
      if (first) first.focus({ preventScroll: true });
    }
    function close(silent) {
      if (!html.classList.contains('menu-open')) return;
      menu.classList.remove('is-open');
      menu.hidden = true;
      html.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Ouvrir le menu';
      outside().forEach(function (el) { el.inert = false; el.removeAttribute('aria-hidden'); });
      html.style.overflow = '';
      onScroll();
      if (!silent && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    burger.addEventListener('click', function () { html.classList.contains('menu-open') ? close() : open(); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { close(true); }); });
    d.addEventListener('keydown', function (e) {
      if (!html.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = [burger].concat($$('a[href], button:not([disabled])', menu).filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; }));
      var i = f.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      else if (i === -1) { e.preventDefault(); f[0].focus(); }
    });
    w.addEventListener('resize', function () { if (w.innerWidth >= 1100) close(true); });
    w.addEventListener('pageshow', function (e) { if (e.persisted) close(true); });
  });

  /* ------------------------------------------------------------ apparitions au défilement (une seule fois) */
  run('apparitions', function () {
    var els = $$('[data-reveal]');
    if (reduce || !('IntersectionObserver' in w) || !html.classList.contains('motion')) return;
    var vh = w.innerHeight || 800;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var sib = el.parentElement ? $$(':scope > .rv', el.parentElement) : [];
        el.style.transitionDelay = Math.min(Math.max(0, sib.indexOf(el)) % 4, 3) * 0.07 + 's';
        el.classList.add('is-in');
        setTimeout(function () { el.classList.remove('rv', 'is-in'); el.style.transitionDelay = ''; }, 1600);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 || (r.width === 0 && r.height === 0)) return; // déjà visible ou masqué : jamais caché
      el.classList.add('rv');
      io.observe(el);
    });
    var showAll = function () { $$('.rv').forEach(function (el) { el.classList.remove('rv', 'is-in'); }); };
    w.addEventListener('beforeprint', showAll);
    setTimeout(function () { // filet de sécurité : ce qui est déjà passé à l'écran ne reste jamais caché
      $$('.rv').forEach(function (el) { if (el.getBoundingClientRect().bottom < 0) el.classList.remove('rv'); });
    }, 4000);
  });

  /* ------------------------------------------------------------ halo du haut de page qui suit la souris */
  run('halo', function () {
    var hero = $('[data-hero]');
    if (!hero || reduce || !mq('(hover: hover) and (pointer: fine)')) return;
    var raf = 0, mx = 0.5, my = 0.4;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height;
      if (!raf) raf = w.requestAnimationFrame(function () { raf = 0; hero.style.setProperty('--mx', (mx * 100).toFixed(1) + '%'); hero.style.setProperty('--my', (my * 100).toFixed(1) + '%'); });
    });
  });

  /* ------------------------------------------------------------ cartes : seconde photo chargée au premier survol */
  run('cartes', function () {
    if (!mq('(hover: hover) and (pointer: fine)')) return;
    $$('.card__alt-img[data-srcset]').forEach(function (im) {
      var card = im.closest('.card__link');
      if (!card) return;
      var load = function () {
        if (!im.hasAttribute('data-srcset')) return;
        im.onload = function () { im.parentNode.classList.add('is-ready'); };
        im.srcset = im.getAttribute('data-srcset');
        im.removeAttribute('data-srcset');
      };
      card.addEventListener('pointerenter', load, { once: true });
      card.addEventListener('focus', load, { once: true });
    });
  });

  /* ------------------------------------------------------------ stock : filtres et tri */
  run('filtres', function () {
    var form = $('[data-filters]'), grid = $('[data-grid]');
    if (!form || !grid) return;
    var items = $$('[data-item]', grid), promos = $$('[data-promo]', grid);
    var count = $('[data-count]', form), countLabel = $('[data-count-label]', form);
    var empty = $('[data-empty]');
    var KEYS = { body: 'carrosserie', fuel: 'energie', max: 'budget', sort: 'tri' };
    function val(name) {
      var el = form.elements[name];
      if (!el) return '';
      if (el.length !== undefined && !el.tagName) { for (var i = 0; i < el.length; i++) if (el[i].checked) return el[i].value; return ''; }
      return el.value;
    }
    function apply(push) {
      var body = val('body'), fuel = val('fuel'), max = parseInt(val('max'), 10) || 0, sort = val('sort') || 'recent';
      var shown = 0;
      var data = items.map(function (it) {
        var c = $('[data-card]', it);
        var ok = (!body || c.getAttribute('data-body') === body) && (!fuel || c.getAttribute('data-fuel') === fuel) && (!max || parseInt(c.getAttribute('data-price'), 10) <= max);
        it.hidden = !ok;
        if (ok) shown++;
        return { el: it, price: +c.getAttribute('data-price'), km: +c.getAttribute('data-km'), order: +c.getAttribute('data-order') };
      });
      data.sort(function (a, b) {
        if (sort === 'price-asc') return a.price - b.price || a.order - b.order;
        if (sort === 'price-desc') return b.price - a.price || a.order - b.order;
        if (sort === 'km-asc') return a.km - b.km || a.order - b.order;
        return a.order - b.order;
      });
      data.forEach(function (x) { grid.appendChild(x.el); });
      promos.forEach(function (p) { grid.appendChild(p); p.hidden = shown === 0; });
      if (count) count.textContent = shown;
      if (countLabel) countLabel.textContent = shown > 1 ? 'véhicules' : 'véhicule';
      if (empty) empty.hidden = shown !== 0;
      if (push && w.history && w.history.replaceState) {
        var q = [];
        Object.keys(KEYS).forEach(function (k) { var v = val(k); if (v && !(k === 'sort' && v === 'recent')) q.push(KEYS[k] + '=' + encodeURIComponent(v)); });
        w.history.replaceState(null, '', w.location.pathname + (q.length ? '?' + q.join('&') : '') + w.location.hash);
      }
    }
    // état initial depuis l'adresse (?carrosserie=SUV&budget=30000...)
    try {
      var params = new URLSearchParams(w.location.search);
      Object.keys(KEYS).forEach(function (k) {
        var v = params.get(KEYS[k]);
        if (!v) return;
        var el = form.elements[k];
        if (!el) return;
        if (el.length !== undefined && !el.tagName) { for (var i = 0; i < el.length; i++) el[i].checked = el[i].value === v; }
        else if ($$('option', el).some(function (o) { return o.value === v; })) el.value = v;
      });
    } catch (e) { /* adresse illisible : filtres par défaut */ }
    form.addEventListener('change', function () { apply(true); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    $$('[data-reset]').forEach(function (b) {
      b.addEventListener('click', function () { form.reset(); apply(true); var f = $('input[name="body"]', form); if (f) f.focus(); });
    });
    apply(false);
  });

  /* ------------------------------------------------------------ fiche : galerie et visionneuse */
  run('galerie', function () {
    var gal = $('[data-gal]'), lb = $('[data-lb]');
    if (!gal) return;
    var track = $('[data-gal-track]', gal), slides = $$('[data-gal-slide]', gal), idxEl = $('[data-gal-index]', gal);
    var cur = 0;
    function slideW() { return track.clientWidth || 1; }
    function scrollable() { return track.scrollWidth > track.clientWidth + 4; }
    function goSlide(i) {
      i = (i + slides.length) % slides.length;
      track.scrollTo({ left: i * slideW(), behavior: reduce ? 'auto' : 'smooth' });
    }
    var t = 0;
    track.addEventListener('scroll', function () {
      if (t) return;
      t = w.requestAnimationFrame(function () {
        t = 0;
        cur = Math.round(track.scrollLeft / slideW());
        if (idxEl) idxEl.textContent = cur + 1;
      });
    }, { passive: true });
    var prev = $('[data-gal-prev]', gal), next = $('[data-gal-next]', gal);
    if (prev) prev.addEventListener('click', function () { if (scrollable()) goSlide(cur - 1); else openLb(cur - 1 < 0 ? slides.length - 1 : cur - 1); });
    if (next) next.addEventListener('click', function () { if (scrollable()) goSlide(cur + 1); else openLb((cur + 1) % slides.length); });

    if (!lb || typeof lb.showModal !== 'function') return;
    var figs = $$('[data-lb-fig]', lb), lbIdx = $('[data-lb-index]', lb), at = 0, opener = null;
    function show(i) {
      at = (i + figs.length) % figs.length;
      figs.forEach(function (f, k) { f.hidden = k !== at; });
      if (lbIdx) lbIdx.textContent = at + 1;
      // précharge la suivante
      var nx = figs[(at + 1) % figs.length], im = nx && $('img', nx);
      if (im && im.loading === 'lazy') im.loading = 'eager';
    }
    function openLb(i) {
      opener = d.activeElement;
      show(i);
      lb.showModal();
      html.style.overflow = 'hidden';
      var c = $('[data-lb-close]', lb); if (c) c.focus();
    }
    lb.addEventListener('close', function () {
      html.style.overflow = '';
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    });
    $$('[data-gal-open]').forEach(function (b) { b.addEventListener('click', function () { openLb(parseInt(b.getAttribute('data-gal-open'), 10) || 0); }); });
    var cl = $('[data-lb-close]', lb); if (cl) cl.addEventListener('click', function () { lb.close(); });
    var lp = $('[data-lb-prev]', lb), ln = $('[data-lb-next]', lb);
    if (lp) lp.addEventListener('click', function () { show(at - 1); });
    if (ln) ln.addEventListener('click', function () { show(at + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === $('[data-lb-stage]', lb)) lb.close(); });
    // glisser du doigt dans la visionneuse
    var x0 = null;
    lb.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') x0 = e.clientX; });
    lb.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    });
  });

  /* ------------------------------------------------------------ formulaires : étapes, envoi par WhatsApp ou e-mail */
  run('formulaires', function () {
    var WA = 'https://wa.me/33784952067';
    var frDate = function (v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : (v || ''); };
    var today = new Date(), iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $$('[data-date-min]').forEach(function (i) { i.min = iso; });

    // rendez-vous : véhicule prérempli depuis la fiche (?vehicule=BM-01), champ affiché pour un essai seulement
    var sel = $('[data-vehicule-select]');
    if (sel) {
      try {
        var ref = new URLSearchParams(w.location.search).get('vehicule');
        if (ref) $$('option', sel).forEach(function (o) { if (o.getAttribute('data-ref') === ref) sel.value = o.value; });
      } catch (e) { /* rien */ }
      var fieldV = $('[data-field-vehicule]'), essai = $('[data-objet-essai]');
      var sync = function () { if (fieldV && essai) fieldV.hidden = !essai.checked; };
      $$('input[name="Objet"]').forEach(function (r) { r.addEventListener('change', sync); });
      sync();
    }

    $$('form[data-form]').forEach(function (form) {
      var kind = form.getAttribute('data-form');
      var steps = form.hasAttribute('data-steps-form') ? $$('[data-step]', form) : [];
      var bar = $$('[data-steps-bar] li', form), at = 0, sendBy = 'whatsapp';
      var done = $('[data-form-done]', form);
      var to = (form.getAttribute('action') || '').replace(/^mailto:/, '');

      function fieldsOf(scope) { return $$('input, select, textarea', scope).filter(function (f) { return !f.closest('[hidden]'); }); }
      function firstInvalid(scope) {
        var list = fieldsOf(scope);
        for (var i = 0; i < list.length; i++) {
          var f = list[i];
          if (f.value && f.type !== 'radio') f.value = f.value.replace(/^\s+|\s+$/g, '');
          if (f.checkValidity && !f.checkValidity()) return f;
        }
        return null;
      }
      function goStep(i, focus) {
        at = i;
        steps.forEach(function (s, k) { s.classList.toggle('is-current', k === i); s.hidden = k !== i; });
        bar.forEach(function (b, k) { b.classList.toggle('is-on', k <= i); });
        if (focus) {
          var lg = $('.form__legend', steps[i]);
          if (lg) { lg.setAttribute('tabindex', '-1'); lg.focus({ preventScroll: true }); }
          var top = form.getBoundingClientRect().top + (w.scrollY || 0) - 110;
          if ((w.scrollY || 0) > top) w.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
        }
      }
      if (steps.length) {
        form.classList.add('is-stepped');
        goStep(0, false);
        $$('[data-next]', form).forEach(function (b) {
          b.addEventListener('click', function () {
            var bad = firstInvalid(steps[at]);
            if (bad) { if (bad.reportValidity) bad.reportValidity(); bad.focus(); return; }
            goStep(Math.min(at + 1, steps.length - 1), true);
          });
        });
        $$('[data-prev]', form).forEach(function (b) { b.addEventListener('click', function () { goStep(Math.max(at - 1, 0), true); }); });
      }
      $$('[data-send]', form).forEach(function (b) { b.addEventListener('click', function () { sendBy = b.getAttribute('data-send'); }); });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (e.submitter && e.submitter.getAttribute('data-send')) sendBy = e.submitter.getAttribute('data-send');
        // vérifie chaque étape (et revient à la première incomplète)
        var scopes = steps.length ? steps : [form];
        for (var s = 0; s < scopes.length; s++) {
          var wasHidden = scopes[s].hidden;
          scopes[s].hidden = false;
          var bad = firstInvalid(scopes[s]);
          scopes[s].hidden = wasHidden;
          if (bad) {
            if (steps.length) goStep(s, false);
            if (bad.reportValidity) bad.reportValidity();
            bad.focus();
            return;
          }
        }
        var fd = new FormData(form), lines = [], get = function (k) { return String(fd.get(k) || '').trim(); };
        fd.forEach(function (v, k) {
          v = String(v).trim();
          var f = form.elements[k];
          if (f && f.closest && f.closest('[hidden]') && !steps.length) return;
          if (v) lines.push(k + ' : ' + (k === 'Jour' ? frDate(v) : v));
        });
        var subject;
        if (kind === 'estimation') subject = 'Estimation : ' + get('Marque') + ' ' + get('Modèle') + ' (' + get('Année') + ', ' + get('Kilométrage') + ' km)';
        else if (kind === 'recherche') subject = 'Recherche sur mesure : ' + get('Recherche') + ', budget ' + get('Budget');
        else subject = (get('Objet') || 'Demande de rendez-vous') + (get('Véhicule') && /essai/i.test(get('Objet')) ? ' : ' + get('Véhicule') : '');
        var intro = { estimation: 'Bonjour, je souhaite faire estimer ma voiture.', recherche: 'Bonjour, je recherche une voiture.' }[kind] || 'Bonjour, je souhaite prendre rendez-vous.';
        var body = intro + '\n\n' + lines.join('\n') + '\n';
        if (sendBy === 'mail') {
          w.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body + '\nMerci.\n');
        } else {
          var url = WA + '?text=' + encodeURIComponent(subject + '\n\n' + body);
          var win = null;
          try { win = w.open(url, '_blank'); } catch (err) { win = null; }
          if (win) { try { win.opener = null; } catch (err) { /* rien */ } } else w.location.href = url;
        }
        if (done) { done.hidden = false; setTimeout(function () { done.focus(); }, 60); }
      });
    });
  });
})();
