/* =========================================================
   Contact section — dotted text
   - Left copy ("thanks for exploring!" / "let's stay connected")
     is rendered as dot-particles that scatter from the cursor and
     spring back to their home positions.
   - Right links (Linkedin / Email / Resume) are static dots that
     turn slightly gray on hover (no disturbance); still clickable.
   ========================================================= */
(function () {
  'use strict';

  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const footer = document.getElementById('footerCta');
  if (!footer) return;

  const copyEl = footer.querySelector('.contact-copy');
  const bigText = copyEl.querySelector('.cc-big').textContent.trim();
  const subText = copyEl.querySelector('.cc-sub').textContent.trim();
  const linkEls = Array.prototype.slice.call(footer.querySelectorAll('.contact-links .clink'));

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement('canvas');
  canvas.className = 'contact-canvas';
  footer.insertBefore(canvas, footer.firstChild);
  const ctx = canvas.getContext('2d');
  const off = document.createElement('canvas');
  const octx = off.getContext('2d', { willReadFrequently: true });

  const FONT = "'Inter', 'Neue Montreal', system-ui, sans-serif";
  const LINK_FONT = "'Neue Montreal', sans-serif";
  const RAD = 60, FORCE = 2.6, K = 0.02, DAMP = 0.82;

  let W = 0, H = 0;
  let leftParts = [];              // {hx,hy,x,y,vx,vy,r}
  let rightGroups = [];           // {text, x, y, gray, el}
  let rightFontPx = 20;
  let hoverLink = -1;
  const mouse = { x: -9999, y: -9999, in: false };
  let visible = false, raf = null;

  /* render `text` to the offscreen canvas, sample filled pixels on a grid */
  function sampleText(text, fontPx, weight, grid, spacing) {
    spacing = spacing || 0;
    octx.font = weight + ' ' + fontPx + 'px ' + FONT;
    octx.letterSpacing = spacing + 'px';
    const w = Math.max(1, Math.ceil(octx.measureText(text).width) + 4);
    const h = Math.ceil(fontPx * 1.4);
    off.width = w; off.height = h;
    octx.font = weight + ' ' + fontPx + 'px ' + FONT;
    octx.letterSpacing = spacing + 'px';
    octx.textBaseline = 'alphabetic';
    octx.textAlign = 'left';
    octx.clearRect(0, 0, w, h);
    octx.fillStyle = '#fff';
    octx.fillText(text, 0, fontPx);
    const data = octx.getImageData(0, 0, w, h).data;
    const dots = [];
    for (let y = 0; y < h; y += grid) {
      for (let x = 0; x < w; x += grid) {
        if (data[(y * w + x) * 4 + 3] > 128) dots.push([x, y]);
      }
    }
    return { dots: dots, w: w, h: h };
  }

  function mk(x, y, r) { return { hx: x, hy: y, x: x, y: y, vx: 0, vy: 0, r: r }; }

  function layout() {
    W = footer.clientWidth; H = footer.clientHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);

    const bigPx = Math.max(40, Math.min(100, W * 0.050));
    const subPx = Math.max(20, Math.min(30, W * 0.025));
    // Footer links match nav: 15px size, 26px gap
    const linkPx = 18;
    // fine sampling + overlapping round dots → the copy reads as smooth Inter type,
    // but every dot is still a particle that can scatter on hover
    const gBig = Math.max(2, Math.round(bigPx / 34));
    const gSub = Math.max(2, Math.round(subPx / 15));
    const rBig = gBig * 0.78;
    const rSub = gSub * 0.78;
    const padX = Math.max(38, W * 0.062);
    const cy = H * 0.5 + 92;        // whole block sits ~1 inch below centre

    /* -------- LEFT copy (particles that read as smooth type) -------- */
    const big = sampleText(bigText, bigPx, '600', gBig);
    const sub = sampleText(subText, subPx, '500', gSub, 2);
    const gap = subPx * 0.5;
    const bigY = cy - (big.h + gap + sub.h) / 2;
    const subY = bigY + big.h + gap;
    leftParts = [];
    for (let i = 0; i < big.dots.length; i++) leftParts.push(mk(padX + big.dots[i][0], bigY + big.dots[i][1], rBig));
    for (let i = 0; i < sub.dots.length; i++) leftParts.push(mk(padX + sub.dots[i][0], subY + sub.dots[i][1], rSub));

    /* -------- RIGHT links (Neue Montreal; same line, bottom-right) -------- */
    rightGroups = new Array(linkEls.length);
    rightFontPx = linkPx;
    octx.font = '500 ' + linkPx + 'px ' + LINK_FONT;
    const linkGap = 20;
    // ADJUST BOTTOM INSET HERE ↓  distance from footer bottom edge
    const padBottom = Math.max(90, W * 0.04);
    const padY = H - padBottom - linkPx * 1.35;
    const baseY = padY + linkPx;
    let rightEdge = W - padX;
    for (let i = linkEls.length - 1; i >= 0; i--) {
      const label = linkEls[i].querySelector('.clink-label');
      const text = (label ? label.textContent : linkEls[i].textContent).trim()
        .replace(/\s*Copy(?:ed!)?\s*$/i, '').trim();
      const tw = Math.ceil(octx.measureText(text).width);
      const rightX = rightEdge;
      rightGroups[i] = { text: text, x: rightX, y: baseY, gray: 0, el: linkEls[i] };
      const a = linkEls[i];
      // hit box matches glyph bounds so the tip centers over the word
      a.style.left = (rightX - tw) + 'px';
      a.style.top = (padY - 4) + 'px';
      a.style.width = tw + 'px';
      a.style.height = (linkPx * 1.4) + 'px';
      rightEdge = rightX - tw - linkGap;
    }
    kick();
  }

  function step() {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* left copy — overlapping round dots (smooth at rest, scatter on hover) */
    let active = false;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (let i = 0; i < leftParts.length; i++) {
      const p = leftParts[i];
      p.vx += (p.hx - p.x) * K;
      p.vy += (p.hy - p.y) * K;
      if (mouse.in) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < RAD * RAD) {
          const d = Math.sqrt(d2) || 0.01;
          const f = (1 - d / RAD) * FORCE;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
      }
      p.vx *= DAMP; p.vy *= DAMP;
      p.x += p.vx; p.y += p.vy;
      if (Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) > 0.25 ||
          Math.abs(p.vx) + Math.abs(p.vy) > 0.25) active = true;
      ctx.moveTo(p.x + p.r, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    }
    ctx.fill();

    /* right links — real type, gray on hover, never disturbed */
    ctx.textAlign = 'right';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '500 ' + rightFontPx + 'px ' + LINK_FONT;
    for (let g = 0; g < rightGroups.length; g++) {
      const grp = rightGroups[g];
      const target = (g === hoverLink) ? 1 : 0;
      grp.gray += (target - grp.gray) * 0.2;
      if (Math.abs(target - grp.gray) > 0.01) active = true;
      const c = Math.round(255 - grp.gray * 120);   // #fff -> ~#878787
      ctx.fillStyle = 'rgb(' + c + ',' + c + ',' + c + ')';
      ctx.fillText(grp.text, grp.x, grp.y);
    }

    if (visible && (active || mouse.in)) raf = requestAnimationFrame(step);
    else raf = null;
  }

  function kick() { if (raf == null) raf = requestAnimationFrame(step); }

  /* ---- input ---- */
  if (fine) {
    window.addEventListener('mousemove', function (e) {
      const r = footer.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      mouse.in = visible && x >= 0 && x <= r.width && y >= 0 && y <= r.height;
      mouse.x = x; mouse.y = y;
      if (mouse.in) kick();
    }, { passive: true });

    linkEls.forEach(function (a, i) {
      a.addEventListener('mouseenter', function () { hoverLink = i; kick(); });
      a.addEventListener('mouseleave', function () { if (hoverLink === i) hoverLink = -1; kick(); });
    });
  }

  const io = new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting;
    if (visible) kick();
  }, { threshold: 0.02 });
  io.observe(footer);

  let rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 200); });

  /* ---- email copy (footer Email link) ---- */
  linkEls.forEach(function (a) {
    if (!a.hasAttribute('data-clip')) return;
    const tip = a.querySelector('.copy-tip');
    const original = tip ? tip.textContent : 'Copy';
    a.addEventListener('click', async function (e) {
      e.preventDefault();
      const text = a.getAttribute('data-clip') || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const t = document.createElement('textarea');
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(t);
      }
      if (tip) tip.textContent = 'Copied!';
      a.classList.add('copied');
      setTimeout(function () {
        a.classList.remove('copied');
        if (tip) tip.textContent = original;
      }, 1400);
    });
  });

  /* ---- go (wait for the font so glyph shapes are correct) ---- */
  function start() { layout(); setTimeout(layout, 400); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  else if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
