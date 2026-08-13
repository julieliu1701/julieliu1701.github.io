/* =========================================================
   YUYA — interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Nav toggle (dots <-> cross) ---------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close after a link is chosen
    nav.querySelectorAll('.nav-links a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('.email-copy').forEach((btn) => {
    const tip = btn.querySelector('.copy-tip');
    const original = tip ? tip.textContent : 'Copy';
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-clip') || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        // fallback for non-secure contexts
        const t = document.createElement('textarea');
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(t);
      }
      if (tip) tip.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.classList.remove('copied');
        if (tip) tip.textContent = original;
      }, 1400);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((r) => io.observe(r));
  } else {
    reveals.forEach((r) => r.classList.add('in'));
  }
})();
