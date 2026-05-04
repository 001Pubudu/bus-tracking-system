/* ===================================================
   BusTrack – app.js
   Shared interactive behaviour (no dependencies)
   =================================================== */

(function () {
  'use strict';

  /* ---- Helpers ---- */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ======================================================
     1. RESPONSIVE NAVIGATION – hamburger toggle
     ====================================================== */
  const hamburger = qs('.hamburger');
  const navLinks   = qs('.nav-links');
  const navActions = qs('.nav-actions');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      navLinks  && navLinks.classList.toggle('open', open);
      navActions && navActions.classList.toggle('open', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks?.contains(e.target)) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks  && navLinks.classList.remove('open');
        navActions && navActions.classList.remove('open');
      }
    });
  }

  /* ======================================================
     2. ACTIVE NAV LINK
     ====================================================== */
  const page = location.pathname.split('/').pop() || 'index.html';
  qsa('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ======================================================
     3. TAB SWITCHING
     ====================================================== */
  qsa('[data-tabs]').forEach((tabGroup) => {
    const buttons = qsa('.tab-btn', tabGroup);
    const panels  = qsa('.tab-panel', tabGroup);

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = qs(`[data-tab-panel="${target}"]`, tabGroup);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ======================================================
     4. TOAST NOTIFICATIONS
     ====================================================== */
  function showToast(msg, emoji = '🚌') {
    let container = qs('#toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${emoji}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
  }

  /* ======================================================
     5. MOCK LIVE BUS STATUS UPDATES (index + tracking)
     ====================================================== */
  const mockUpdates = [
    { msg: 'Bus #101 arrived at City Center',         emoji: '🟢' },
    { msg: 'Bus #204 is delayed by ~5 min',            emoji: '🟡' },
    { msg: 'Bus #318 departed from North Terminal',    emoji: '🚌' },
    { msg: 'Bus #155 is now on-time – ETA 3 min',      emoji: '🟢' },
    { msg: 'Bus #402 detour via West Avenue',          emoji: '⚠️' },
    { msg: 'Bus #509 boarding at South Bus Stop',      emoji: '🚏' },
    { msg: 'Bus #667 approaching University Gate',     emoji: '📍' },
    { msg: 'Bus #720 service resumed after break',     emoji: '✅' },
  ];

  let updateIdx = 0;

  function scheduleLiveUpdate() {
    const delay = 5000 + Math.random() * 6000; // 5–11 s
    setTimeout(() => {
      const u = mockUpdates[updateIdx % mockUpdates.length];
      updateIdx++;
      showToast(u.msg, u.emoji);

      // Also update .bus-detail spans tagged as live-eta on the page
      const etaTags = qsa('[data-live-eta]');
      etaTags.forEach((el) => {
        const mins = Math.max(1, parseInt(el.textContent) + (Math.random() > 0.5 ? -1 : 1));
        el.textContent = `${mins} min`;
      });

      scheduleLiveUpdate();
    }, delay);
  }

  // Only run on pages that have live bus cards
  if (qs('.bus-card-header') || qs('.bus-list-item')) {
    setTimeout(scheduleLiveUpdate, 3000);
  }

  /* ======================================================
     6. TRACKING PAGE – bus list selection
     ====================================================== */
  const busListItems = qsa('.bus-list-item');
  busListItems.forEach((item) => {
    item.addEventListener('click', () => {
      busListItems.forEach(b => b.classList.remove('selected'));
      item.classList.add('selected');

      // Update detail panel if present
      const panel = qs('#track-detail-panel');
      if (panel) {
        const busNum   = item.dataset.busNum   || '—';
        const busRoute = item.dataset.busRoute || '—';
        const busEta  = item.dataset.busEta  || '—';
        const busSpeed= item.dataset.busSpeed|| '—';

        const setField = (id, val) => { const el = qs(`#${id}`, panel); if (el) el.textContent = val; };
        setField('detail-bus-num',   busNum);
        setField('detail-bus-route', busRoute);
        setField('detail-bus-eta',   busEta);
        setField('detail-bus-speed', busSpeed);
        showToast(`Tracking Bus #${busNum}`, '📍');
      }
    });
  });

  /* ======================================================
     7. ROUTES PAGE – search / filter
     ====================================================== */
  const routeSearch = qs('#route-search');
  if (routeSearch) {
    routeSearch.addEventListener('input', () => {
      const q = routeSearch.value.toLowerCase();
      qsa('.route-row').forEach((row) => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ======================================================
     8. CONTACT FORM – basic front-end validation & feedback
     ====================================================== */
  const contactForm = qs('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name  = qs('#c-name',  contactForm).value.trim();
      const email = qs('#c-email', contactForm).value.trim();
      const msg   = qs('#c-msg',   contactForm).value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill in all required fields.', '⚠️');
        return;
      }

      // Simulate async submission
      const btn = qs('[type="submit"]', contactForm);
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        showToast(`Thanks ${name}! We'll be in touch shortly.`, '✅');
      }, 1400);
    });
  }

  /* ======================================================
     9. PROGRESS BAR ANIMATION on scroll
     ====================================================== */
  function animateBars() {
    qsa('.progress-bar[data-width]').forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40 && !bar.dataset.animated) {
        bar.style.width = bar.dataset.width;
        bar.dataset.animated = '1';
      }
    });
  }
  window.addEventListener('scroll', animateBars, { passive: true });
  animateBars();

  /* ======================================================
     10. SMOOTH SCROLL for in-page anchors
     ====================================================== */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = qs(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

})();
