/* =========================================================
   PAGE TRANSITION — controller for the black swipe-up curtain
   The enter reveal is handled purely in CSS. This script only
   plays the leave animation (curtain rises up from the bottom
   to cover the screen) before navigating to the next page.
   Opt a link in with  data-transition.  If JS is unavailable
   the links simply navigate normally.
   ========================================================= */
(function () {
  'use strict';
  const ov = document.querySelector('.page-transition');
  if (!ov) return;

  const EASE = 'cubic-bezier(.76,0,.24,1)';
  const DUR = 700;

  /* LEAVE — rise up from the bottom to cover, then navigate */
  function leave(href) {
    ov.style.animation = 'none';
    ov.style.transition = 'none';
    ov.style.transform = 'translateY(100%)';   // park just below the screen
    void ov.offsetWidth;                        // reflow so the parked position sticks
    ov.style.transition = 'transform ' + DUR + 'ms ' + EASE;
    ov.style.transform = 'translateY(0)';       // slide up into full cover

    let done = false;
    const go = () => { if (!done) { done = true; window.location.href = href; } };
    ov.addEventListener('transitionend', go, { once: true });
    setTimeout(go, DUR + 120);                  // fallback if transitionend is missed
  }

  /* Replay the reveal when the page is restored from bfcache (browser back) */
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    ov.style.animation = 'none';
    void ov.offsetWidth;
    ov.style.animation = '';
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-transition]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank' || /^https?:/i.test(href)) return;
    e.preventDefault();
    leave(href);
  });
})();
