/* =========================================================
   INVERT CURSOR — small sharp invert dot (matches home
   page project/work section). No trail.
   ========================================================= */
(function () {
  'use strict';

  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (!fine) return;

  document.body.classList.add('fx');

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const invertCv = document.createElement('canvas');
  invertCv.id = 'dots-invert';
  document.body.appendChild(invertCv);
  const ictx = invertCv.getContext('2d');

  // matches dots.js OTHER_D in work mode
  const D = 18;
  const R = D / 2;

  let VW = 0, VH = 0;
  let mx = -9999, my = -9999, inView = false;
  let raf = null;

  function resize() {
    VW = window.innerWidth;
    VH = window.innerHeight;
    invertCv.width = Math.round(VW * DPR);
    invertCv.height = Math.round(VH * DPR);
  }

  function draw() {
    ictx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ictx.clearRect(0, 0, VW, VH);
    if (!inView) return;

    // sharp invert disc (hard edge, same feel as home work section)
    const g = ictx.createRadialGradient(mx, my, 0, mx, my, R);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.9, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ictx.fillStyle = g;
    ictx.beginPath();
    ictx.arc(mx, my, R, 0, Math.PI * 2);
    ictx.fill();
  }

  function loop() {
    if (window.innerWidth !== VW || window.innerHeight !== VH) resize();
    draw();
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    inView = true;
  }, { passive: true });

  document.addEventListener('mouseleave', function () {
    inView = false;
  });

  let rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 200);
  });

  function start() { resize(); loop(); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
