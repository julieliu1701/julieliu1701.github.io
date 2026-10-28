/* =========================================================
   Soft GSAP scroll reveals — shared across all pages.
   Gentle fade + lift as content enters the viewport.
   Waits for the page-transition curtain so the two don't fight.
   ========================================================= */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  var SELECTORS = [
    '.site-header',
    '.hero-title',
    '.hero-foot > *',
    '.work-grid .tile',
    '.back-btn',
    '.about-top',
    '.xp-section-label',
    '.xp-row',
    '.phero',
    '.meta',
    'section.row',
    '.work-row .work-media',
    '.work-carousel'
  ];

  var BATCH = [
    '.work-grid .tile',
    '.xp-row',
    '.work-row .work-media'
  ];

  var seen = new Set();
  var targets = [];
  SELECTORS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (seen.has(el)) return;
      if (el.closest('.page-transition, .footer, .contact-links, .contact-copy')) return;
      seen.add(el);
      targets.push(el);
    });
  });

  if (!targets.length) return;

  document.documentElement.classList.add('gsap-soft');
  gsap.set(targets, { opacity: 0, y: 28, force3D: true });

  var EASE = 'power2.out';
  var DUR = 1.05;
  var CURTAIN = 780;
  var done = new Set();

  function softIn(els, stagger) {
    var list = gsap.utils.toArray(els).filter(function (el) {
      if (done.has(el)) return false;
      done.add(el);
      return true;
    });
    if (!list.length) return;
    gsap.to(list, {
      opacity: 1,
      y: 0,
      duration: DUR,
      ease: EASE,
      stagger: stagger || 0,
      overwrite: 'auto',
      onComplete: function () {
        gsap.set(list, { clearProps: 'transform' });
      }
    });
  }

  function isBatched(el) {
    return BATCH.some(function (sel) { return el.matches(sel); });
  }

  function arm() {
    done = new Set();

    BATCH.forEach(function (sel) {
      var group = targets.filter(function (el) { return el.matches(sel); });
      if (group.length < 2) return;
      ScrollTrigger.batch(group, {
        start: 'top bottom',
        once: true,
        onEnter: function (batch) { softIn(batch, 0.12); }
      });
    });

    targets.forEach(function (el) {
      if (isBatched(el)) {
        var mates = targets.filter(function (other) {
          return BATCH.some(function (sel) {
            return el.matches(sel) && other.matches(sel);
          });
        });
        if (mates.length >= 2) return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        once: true,
        onEnter: function () { softIn(el, 0); }
      });
    });

    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
      // Catch anything already intersecting the viewport
      targets.forEach(function (el) {
        if (done.has(el)) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) softIn(el, 0);
      });
    });
  }

  setTimeout(arm, CURTAIN);

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    gsap.set(targets, { opacity: 0, y: 28 });
    setTimeout(arm, CURTAIN);
  });
})();
