import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page-level animations from the original main.js: scroll reveal, the gold
// process timeline and the count-up numbers. Re-run on every route change
// because each page mounts a fresh set of elements. A MutationObserver also
// picks up elements that appear later (for example content loaded from the API).
export default function useSiteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const observers = [];
    const timers = [];
    const hasIO = 'IntersectionObserver' in window;
    const scans = [];

    const watch = (selector, threshold, onHit, fallback) => {
      const io = hasIO ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { onHit(entry.target); io.unobserve(entry.target); }
        });
      }, { threshold }) : null;
      if (io) observers.push(io);
      const scan = () => {
        document.querySelectorAll(selector).forEach((el) => {
          if (io) io.observe(el); else (fallback || onHit)(el);
        });
      };
      scans.push(scan);
      scan();
    };

    watch('.reveal:not(.in)', 0.12, (el) => el.classList.add('in'));

    watch('.process-grid:not(.in)', 0.3, (grid) => {
      grid.classList.add('in');
      grid.querySelectorAll('.process-step').forEach((step, i) => {
        timers.push(setTimeout(() => step.classList.add('is-active'), 250 + i * 220));
      });
    });

    watch('.count-up[data-target]:not([data-counted])', 0.4, (el) => {
      el.setAttribute('data-counted', '1');
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

    // new elements added after the first render (e.g. cards loaded from the API)
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scans.forEach((scan) => scan()));
    });
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      cancelAnimationFrame(frame);
      observers.forEach((io) => io.disconnect());
      timers.forEach(clearTimeout);
    };
  }, [pathname]);
}
