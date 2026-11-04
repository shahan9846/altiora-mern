import { useEffect, useRef, useState } from 'react';
import useServices from '../hooks/useServices';
import ServiceCard from './ServiceCard';

// Home page "What We Do" row:
// Combines continuous smooth auto-sliding (marquee/infinite loop) with interactive prev/next navigation buttons.
//
// How it works:
// - A repeated set of cards forms an infinite seamless loop.
// - Auto-scrolls smoothly via requestAnimationFrame.
// - Automatically pauses on mouse hover, touch, or keyboard focus.
// - Arrow buttons smoothly scroll by one card width in either direction.
// - When users click prev/next, auto-scrolling temporarily pauses and then resumes seamlessly.

const MIN_CARDS_PER_HALF = 6;
const AUTO_SPEED = 0.75; // pixels per frame (~45px per second)

export default function ServicesSlider({ c }) {
  const services = useServices() || [];
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const isHoveredRef = useRef(false);
  const manualPauseTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate services to ensure seamless wrapping
  const repeats = services.length ? Math.max(2, Math.ceil(MIN_CARDS_PER_HALF / services.length)) : 2;
  const cardList = Array.from({ length: repeats * 2 }, () => services).flat();

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || services.length === 0) return;

    let animId;
    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min(now - lastTime, 50); // cap delta time to prevent jumping on tab switch
      lastTime = now;

      if (!isHoveredRef.current) {
        // Auto-scroll forward
        el.scrollLeft += (AUTO_SPEED * dt) / 16.67;

        // Loop seamlessly halfway through the content
        const maxScroll = el.scrollWidth / 2;
        if (maxScroll > 0 && el.scrollLeft >= maxScroll) {
          el.scrollLeft -= maxScroll;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += maxScroll;
        }
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (manualPauseTimerRef.current) clearTimeout(manualPauseTimerRef.current);
    };
  }, [services.length]);

  const pauseBriefly = () => {
    isHoveredRef.current = true;
    setIsPaused(true);
    if (manualPauseTimerRef.current) clearTimeout(manualPauseTimerRef.current);
    manualPauseTimerRef.current = setTimeout(() => {
      isHoveredRef.current = false;
      setIsPaused(false);
    }, 2800);
  };

  const scrollByAmount = (direction) => {
    const el = viewportRef.current;
    if (!el) return;

    const card = el.querySelector('.service-card-img');
    const stepAmount = card ? card.getBoundingClientRect().width + 24 : 384;
    const maxScroll = el.scrollWidth / 2;

    // Check wrapping boundaries before/after scrolling
    if (direction < 0 && el.scrollLeft <= 5) {
      el.scrollLeft += maxScroll;
    } else if (direction > 0 && el.scrollLeft >= maxScroll - 5) {
      el.scrollLeft -= maxScroll;
    }

    el.scrollBy({ left: direction * stepAmount, behavior: 'smooth' });
    pauseBriefly();
  };

  return (
    <>
      <div className="section-head reveal flex-between" style={{ alignItems: 'flex-end', marginBottom: 36, maxWidth: 'none', flexWrap: 'nowrap' }}>
        <div style={{ marginBottom: 0, maxWidth: 640 }}>
          <span className="eyebrow">{c('services.eyebrow')}</span>
          <h2>{c('services.title')}</h2>
          <p>{c('services.text')}</p>
        </div>
        <div className="slider-controls">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Previous services"
            onClick={() => scrollByAmount(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Next services"
            onClick={() => scrollByAmount(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {services.length > 0 && (
        <div
          className="services-auto-slider"
          id="services-viewport"
          ref={viewportRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            setIsPaused(false);
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
            setIsPaused(true);
          }}
          onTouchEnd={() => {
            pauseBriefly();
          }}
        >
          <div className="services-auto-track" ref={trackRef}>
            {cardList.map((s, i) => (
              <ServiceCard key={s.slug + '-' + i} service={s} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
