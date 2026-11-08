import { useEffect, useRef } from 'react';
import useServices from '../hooks/useServices';
import ServiceCard from './ServiceCard';

// Home page "What We Do" row: the service cards slide by themselves, endlessly, with Previous / Next buttons.
//
// How it works
// - The list of cards is repeated, so the row can loop without a visible jump.
// - Every frame the row is scrolled a tiny bit to the left (requestAnimationFrame).
// - It stops while the mouse is over it or a finger touches it.
// - The arrow buttons scroll by one card, and the automatic sliding waits a moment before it starts again.

const MIN_CARDS_PER_HALF = 6; // how many cards one half of the loop holds, at least
const AUTO_SPEED = 0.75; // pixels per frame (about 45 pixels per second)
const RESUME_AFTER_MS = 2800; // how long the sliding waits after an arrow click
const CARD_GAP = 24; // space between two cards, in pixels (must match the CSS)

// One of the round Previous / Next buttons
function ArrowButton({ direction, onClick }) {
  const isPrev = direction < 0;
  return (
    <button type="button" className="slider-arrow" aria-label={isPrev ? 'Previous services' : 'Next services'} onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={isPrev ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
      </svg>
    </button>
  );
}

export default function ServicesSlider({ c }) {
  const services = useServices() || [];
  const viewportRef = useRef(null);
  const isPausedRef = useRef(false); // true while the sliding is stopped
  const resumeTimerRef = useRef(null);

  // Repeat the services so the loop has enough cards (the second half is a copy of the first)
  const repeats = services.length ? Math.max(2, Math.ceil(MIN_CARDS_PER_HALF / services.length)) : 2;
  const cardList = Array.from({ length: repeats * 2 }, () => services).flat();

  // The automatic sliding
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || services.length === 0) return undefined;

    let animationId;
    let lastTime = performance.now();

    const step = (now) => {
      const elapsed = Math.min(now - lastTime, 50); // capped so the row does not jump after switching tabs
      lastTime = now;

      if (!isPausedRef.current) {
        viewport.scrollLeft += (AUTO_SPEED * elapsed) / 16.67;

        // Halfway through the cards the row looks the same as at the start, so jump back by half
        const half = viewport.scrollWidth / 2;
        if (half > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
        else if (viewport.scrollLeft <= 0) viewport.scrollLeft += half;
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resumeTimerRef.current);
    };
  }, [services.length]);

  const pause = () => { isPausedRef.current = true; };
  const resume = () => { isPausedRef.current = false; };

  // Stop now, start again a moment later
  const pauseBriefly = () => {
    pause();
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(resume, RESUME_AFTER_MS);
  };

  // direction: -1 = one card back, 1 = one card forward
  const scrollByCard = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector('.service-card-img');
    const distance = card ? card.getBoundingClientRect().width + CARD_GAP : 384;
    const half = viewport.scrollWidth / 2;

    // At the very start or end of the loop, jump to the matching spot in the other half first
    if (direction < 0 && viewport.scrollLeft <= 5) viewport.scrollLeft += half;
    else if (direction > 0 && viewport.scrollLeft >= half - 5) viewport.scrollLeft -= half;

    viewport.scrollBy({ left: direction * distance, behavior: 'smooth' });
    pauseBriefly();
  };

  return (
    <>
      <div className="section-head reveal flex-between services-slider-head">
        <div className="services-slider-text">
          {c('services.eyebrow') && <span className="eyebrow">{c('services.eyebrow')}</span>}
          {c('services.title') && <h2>{c('services.title')}</h2>}
          {c('services.text') && <p>{c('services.text')}</p>}
        </div>
        <div className="slider-controls">
          <ArrowButton direction={-1} onClick={() => scrollByCard(-1)} />
          <ArrowButton direction={1} onClick={() => scrollByCard(1)} />
        </div>
      </div>

      {services.length > 0 && (
        <div
          className="services-auto-slider"
          id="services-viewport"
          ref={viewportRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={pauseBriefly}
        >
          <div className="services-auto-track">
            {cardList.map((service, index) => (
              <ServiceCard key={service.slug + '-' + index} service={service} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
