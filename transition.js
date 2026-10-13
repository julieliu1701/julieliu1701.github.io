/* =========================================================
   PAGE TRANSITION
   Leave: a black curtain rises from the bottom to cover the
          page, then the browser navigates.
   Enter: the curtain starts covering the new page and swipes
          up off the top.
   A timer always parks the curtain above the viewport after
   the swipe so a stalled animation cannot leave the page black.
   Opt a link in with data-transition.
   ========================================================= */
(function () {
  'use strict';
  const ov = document.querySelector('.page-transition');
  if (!ov) return;

  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const DUR = 700;
  let leaving = false;

  function park() {
    ov.style.animation = 'none';
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(-100%)';
  }

  function reveal() {
    if (leaving) return;
    ov.style.animation = 'none';
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(0)';
    void ov.offsetWidth;
    ov.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    ov.style.transform = 'translateY(-100%)';
    setTimeout(function () {
      if (!leaving) park();
    }, DUR + 80);
  }

  function leave(href) {
    leaving = true;
    ov.style.animation = 'none';
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(100%)';
    void ov.offsetWidth;
    ov.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    ov.style.transform = 'translateY(0)';

    let done = false;
    function go(e) {
      if (e && e.propertyName && e.propertyName !== 'transform') return;
      if (done) return;
      done = true;
      window.location.href = href;
    }
    ov.addEventListener('transitionend', go);
    setTimeout(go, DUR + 80);
  }

  reveal();

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    leaving = false;
    reveal();
  });

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank' || /^https?:/i.test(href)) return;
    e.preventDefault();
    leave(href);
  });
})();
