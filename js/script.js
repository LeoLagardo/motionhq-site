/* MotionHQ — vanilla JS interactions */
(function () {
  'use strict';

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      mobile.hidden = false;
      requestAnimationFrame(() => (mobile.style.display = 'flex'));
    } else {
      mobile.style.display = '';
      mobile.hidden = true;
    }
  };
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  /* ---------- Smooth scroll fallback (browsers ignoring CSS) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Count-up numbers ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const duration = 1400;
    const start = performance.now();
    const isInt = Number.isInteger(target);
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = isInt ? Math.round(value).toLocaleString() : value.toFixed(1);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.getAttribute('data-count')));
  }

  /* ---------- FAQ: single-open accordion ---------- */
  const items = document.querySelectorAll('.faq details');
  items.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) items.forEach((o) => o !== d && (o.open = false));
    });
  });

  /* ---------- Hero mockup pointer tilt ---------- */
  const mock = document.getElementById('heroMock');
  if (mock && window.matchMedia('(pointer: fine)').matches) {
    const card = mock.querySelector('.mock-card');
    let raf = 0;
    const onMove = (e) => {
      const rect = mock.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `rotateY(${-6 + dx * 6}deg) rotateX(${6 - dy * 6}deg)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
    };
    mock.addEventListener('mousemove', onMove);
    mock.addEventListener('mouseleave', reset);
  }

  /* ---------- Year ---------- */
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach((n) => (n.textContent = year));
})();

const ADMIN_URL = 'https://motionhq-7afmcn4uy-leolagardos-projects.vercel.app';
const SITE_URL = 'https://leolagardo.github.io/motionhq-site';

function redirectToLogin() {
  window.location.href = ADMIN_URL + "/login";

}

function redirectToSignup() {
  window.location.href = SITE_URL + "/signup.html";
}