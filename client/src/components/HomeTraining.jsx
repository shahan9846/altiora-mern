import { useEffect, useRef, useState } from 'react';
import useCategories from '../hooks/useCategories';

// Number that counts up the first time it scrolls into view (same effect as the old .count-up spans).
function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame;
    const run = () => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / 1200, 1);
        setValue(Math.round(progress * target));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { setValue(target); return undefined; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [target]);

  return <span className="count-up" ref={ref}>{value}{suffix}</span>;
}

// "13+ Ready Programs · 9 Categories · 100% Customizable", read from the database.
export function TrainingStats() {
  const categories = useCategories();
  if (!categories) return <div className="mini-stats" style={{ minHeight: 96 }} />;
  const programs = categories.reduce((n, c) => n + c.programCount, 0);

  return (
    <div className="mini-stats">
      <div><strong><CountUp target={programs} suffix="+" /></strong><span>Ready Programs</span></div>
      <div><strong><CountUp target={categories.length} /></strong><span>Categories</span></div>
      <div><strong><CountUp target={100} suffix="%" /></strong><span>Customizable</span></div>
    </div>
  );
}

const ICONS = [
  <path key="a" d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />,
  <g key="b"><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></g>,
  <g key="c"><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" /><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" /></g>,
  <g key="d"><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></g>,
  <g key="e"><path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" /></g>,
  <g key="f"><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></g>,
];

// One tag per training category.
export function TrainingTags() {
  const categories = useCategories();
  return (
    <div className="training-tags">
      {(categories || []).map((c, i) => (
        <span className="training-tag" key={c._id}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{ICONS[i % ICONS.length]}</svg>
          {c.name}
        </span>
      ))}
    </div>
  );
}
