/* =========================================================
   THE WORK — hover tips, video controls, auto/drag carousel
   ========================================================= */
(function () {
  'use strict';

  /* ---------- floating tip that follows the cursor ---------- */
  const tip = document.createElement('div');
  tip.className = 'work-popup';
  tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);

  let tipActive = false;
  let tipX = 0, tipY = 0;

  function placeTip(x, y) {
    tipX = x; tipY = y;
    const pad = 14;
    const tw = tip.offsetWidth || 160;
    const th = tip.offsetHeight || 40;
    let left = x + 14;
    let top = y + 18;
    if (left + tw > window.innerWidth - pad) left = x - tw - 14;
    if (top + th > window.innerHeight - pad) top = y - th - 12;
    if (left < pad) left = pad;
    if (top < pad) top = pad;
    tip.style.transform = 'translate(' + left + 'px,' + top + 'px)';
  }

  function showTip(text, x, y) {
    const t = (text || '').trim();
    if (!t) {
      tip.classList.remove('show');
      tipActive = false;
      return;
    }
    tip.textContent = t;
    tip.classList.add('show');
    tipActive = true;
    placeTip(x, y);
  }

  function hideTip() {
    tip.classList.remove('show');
    tipActive = false;
  }

  document.addEventListener('mousemove', function (e) {
    if (!tipActive) return;
    placeTip(e.clientX, e.clientY);
  }, { passive: true });

  document.querySelectorAll('.work-tip').forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      showTip(el.getAttribute('data-tip') || '', e.clientX, e.clientY);
    });
    el.addEventListener('mousemove', function (e) {
      if (tipActive) placeTip(e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', hideTip);
  });

  /* ---------- video lightbox (click thumbnail to expand) ---------- */
  const lightbox = document.createElement('div');
  lightbox.className = 'video-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Video player');
  lightbox.innerHTML =
    '<div class="video-lightbox__panel">' +
      '<button type="button" class="video-lightbox__close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
          '<path d="M6 6l12 12M18 6L6 18"/>' +
        '</svg>' +
      '</button>' +
      '<video class="video-lightbox__video" controls playsinline></video>' +
    '</div>';
  document.body.appendChild(lightbox);

  const lbVideo = lightbox.querySelector('.video-lightbox__video');
  const lbClose = lightbox.querySelector('.video-lightbox__close');
  let lbOpen = false;

  function openLightbox(wrap, video) {
    lbOpen = true;
    lbVideo.src = video.currentSrc || video.getAttribute('src') || '';
    lbVideo.currentTime = video.currentTime || 0;
    lbVideo.muted = false;
    lightbox.classList.add('show');
    document.body.classList.add('video-lightbox-open');
    document.body.style.overflow = 'hidden';
    video.pause();
    wrap.classList.remove('is-playing');
    lbVideo.play().catch(function () {});
    lbClose.focus();
  }

  function closeLightbox() {
    if (!lbOpen) return;
    lbOpen = false;
    lightbox.classList.remove('show');
    document.body.classList.remove('video-lightbox-open');
    document.body.style.overflow = '';
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
  }

  lbClose.addEventListener('click', function (e) {
    e.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lbOpen) closeLightbox();
  });

  /* ---------- video play / mute ---------- */
  document.querySelectorAll('.work-video').forEach(function (wrap) {
    const video = wrap.querySelector('video');
    const btnPlay = wrap.querySelector('.vid-play');
    const btnMute = wrap.querySelector('.vid-mute');
    if (!video || !btnPlay || !btnMute) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;

    function sync() {
      wrap.classList.toggle('is-playing', !video.paused);
      wrap.classList.toggle('is-unmuted', !video.muted);
      btnPlay.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
      btnMute.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
    }
    sync();

    wrap.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.vid-bar')) return;
      e.stopPropagation();
    });

    wrap.addEventListener('click', function (e) {
      if (e.target.closest('.vid-bar')) return;
      e.preventDefault();
      openLightbox(wrap, video);
    });

    btnPlay.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (video.paused) video.play().catch(function () {});
      else video.pause();
      sync();
    });

    btnMute.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      video.muted = !video.muted;
      sync();
    });

    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
  });

  /* ---------- click-stack (3+ slides, arrow on hover) ---------- */
  document.querySelectorAll('.work-stack').forEach(function (fig) {
    const frame = fig.querySelector('.stack-frame');
    if (!frame) return;
    const extra = Array.prototype.slice.call(fig.querySelectorAll('.stack-src'))
      .map(function (el) { return el.getAttribute('src'); });
    const srcs = [frame.getAttribute('src')].concat(extra);
    let idx = 0;

    fig.addEventListener('pointerdown', function (e) {
      e.stopPropagation();
    });

    fig.addEventListener('click', function (e) {
      if (e.target.closest('.vid-bar')) return;
      idx = (idx + 1) % srcs.length;
      frame.src = srcs[idx];
    });
  });

  /* ---------- carousel: hover auto-scroll + free manual scroll ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    const viewport = root.querySelector('.carousel-viewport')
      || (root.classList.contains('work-row') ? root : null);
    if (!viewport) return;

    let hovering = false;
    let userOverride = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let raf = null;

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function stopAuto() {
      if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function tick() {
      if (!hovering || userOverride) { raf = null; return; }
      const max = maxScroll();
      if (viewport.scrollLeft >= max - 0.5) { raf = null; return; }
      viewport.scrollLeft += 1.15;
      raf = requestAnimationFrame(tick);
    }

    function startAuto() {
      if (raf != null || !hovering || userOverride) return;
      raf = requestAnimationFrame(tick);
    }

    root.addEventListener('mouseenter', function () {
      hovering = true;
      if (!userOverride) startAuto();
    });

    root.addEventListener('mouseleave', function () {
      hovering = false;
      userOverride = false;
      stopAuto();
      dragging = false;
    });

    // wheel / trackpad — immediate manual scroll (overrides auto)
    viewport.addEventListener('wheel', function (e) {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!dx) return;
      const max = maxScroll();
      if (max <= 0) return;
      e.preventDefault();
      userOverride = true;
      stopAuto();
      viewport.scrollLeft = Math.max(0, Math.min(max, viewport.scrollLeft + dx));
    }, { passive: false });

    root.querySelectorAll('.work-stack').forEach(function (stack) {
      stack.addEventListener('mouseenter', function () {
        userOverride = true;
        stopAuto();
      });
      stack.addEventListener('mouseleave', function () {
        if (hovering && !dragging) {
          userOverride = false;
          startAuto();
        }
      });
    });

    viewport.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      if (e.target.closest('.work-stack, .work-video, .vid-bar')) return;
      dragging = true;
      userOverride = true;
      stopAuto();
      startX = e.clientX;
      startScroll = viewport.scrollLeft;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('is-dragging');
    });

    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      viewport.scrollLeft = startScroll - dx;
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      // keep userOverride until mouse leaves so swipe wins over hover auto-scroll
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });
})();
