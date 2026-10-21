import { useCallback, useEffect, useRef, useState } from 'react';
import services from '../data/services';
import ServiceCard from './ServiceCard';

// Home page "What We Do" row with prev/next arrows that scroll the cards.
export default function ServicesSlider() {
  const viewport = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollBy = (dir) => {
    const el = viewport.current;
    const card = el.querySelector('.service-card-img');
    const amount = card ? card.getBoundingClientRect().width + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <>
      <div className="section-head reveal flex-between" style={{ alignItems: 'flex-end', marginBottom: 36, maxWidth: 'none', flexWrap: 'nowrap' }}>
        <div style={{ marginBottom: 0, maxWidth: 640 }}>
          <span className="eyebrow">What We Do</span>
          <h2>Solutions That Drive Growth</h2>
          <p>Core areas of advisory and learning support, each shaped around the realities of your organization.</p>
        </div>
        <div className="slider-controls">
          <button type="button" className="slider-arrow" aria-label="Previous services" disabled={atStart} onClick={() => scrollBy(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="slider-arrow" aria-label="Next services" disabled={atEnd} onClick={() => scrollBy(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <div className="slider-viewport" id="services-viewport" ref={viewport} onScroll={update}>
        <div className="card-grid-4 slider-track" id="services-track">
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </div>
    </>
  );
}
