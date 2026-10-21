import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page-level animations from the original main.js: scroll reveal, the gold
// process timeline and the count-up numbers. Re-run on every route change
// because each page mounts a fresh set of elements.
export default function useSiteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const observers = [];
    const timers = [];
    const hasIO = 'IntersectionObserver' in window;

    const watch = (selector, threshold, onHit, fallback) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;
      if (!hasIO) { els.forEach(fallback || onHit); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { onHit(entry.target); io.unobserve(entry.target); }
        });
      }, { threshold });
      els.forEach((el) => io.observe(el));
      observers.push(io);
    };

    watch('.reveal:not(.in)', 0.12, (el) => el.classList.add('in'));

    watch('.process-grid', 0.3, (grid) => {
      grid.classList.add('in');
      grid.querySelectorAll('.process-step').forEach((step, i) => {
        timers.push(setTimeout(() => step.classList.add('is-active'), 250 + i * 220));
      });
    });

    watch('.count-up', 0.4, (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1200;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, (el) => { el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || ''); });

    return () => {
      observers.forEach((io) => io.disconnect());
      timers.forEach(clearTimeout);
    };
  }, [pathname]);
}
