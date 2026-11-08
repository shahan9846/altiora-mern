import { useEffect, useState } from 'react';
import Arrow from './Arrow';
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePaths } from '../context/ContentContext';
import { imageUrl } from '../api/client';

// Description of each slide picture (its crop position is set in style.css, .hero-slide). The pictures themselves come from the dashboard
// (Pages -> Home -> Pictures); the original photos are the defaults in content/schema.js.
const SLIDES = [
  {
    alt: 'Business leaders collaborating on strategic growth and advisory solutions in a modern boardroom',
  },
  {
    alt: 'Professional facilitator leading a hands-on corporate workshop with engaged participants',
  },
  {
    alt: 'Business partners concluding a strategic agreement and long-term partnership with a handshake',
  },
];

// The round Previous / Next buttons on the sides of the picture
function SlideButton({ direction, onClick }) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      className={'hero-slider-nav ' + (isPrev ? 'hero-slider-prev' : 'hero-slider-next')}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={isPrev ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
      </svg>
    </button>
  );
}

// Auto-rotating hero: the copy on the left changes with each slide.
export default function Hero({ c }) {
  const [current, setCurrent] = useState(0);
  const path = usePaths();
  const { openConsult } = useConsult();

  useEffect(() => {
    const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % SLIDES.length), 4200);
    return () => clearTimeout(timer); // restarts whenever current changes
  }, [current]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

  const n = current + 1;
  const imageOf = (index) => imageUrl(c(`hero${index + 1}.image`));
  const slide = { eyebrow: c(`hero${n}.eyebrow`), title: c(`hero${n}.title`), em: c(`hero${n}.em`), lede: c(`hero${n}.lede`) };
  const button1 = c('hero.button1');
  const button2 = c('hero.button2');

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-copy">
          {slide.eyebrow && <span className="eyebrow slide-pulse" key={'e' + current}>{slide.eyebrow}</span>}
          {(slide.title || slide.em) && (
            <h1 className="slide-pulse" key={'t' + current}>
              {slide.title}{slide.title && slide.em && <br />}{slide.em && <em>{slide.em}</em>}
            </h1>
          )}
          {slide.lede && <p className="lede slide-pulse" key={'l' + current}>{slide.lede}</p>}
          {(button1 || button2) && (
            <div className="hero-actions">
              {button1 && <Link to={path('services')} className="btn btn-gold">{button1} <Arrow /></Link>}
              {button2 && <a href="#" className="btn btn-outline-dark" onClick={(e) => { e.preventDefault(); openConsult(); }}>{button2}</a>}
            </div>
          )}
        </div>
        <div className="hero-visual">
          <span className="thin-line thin-line-a"></span>
          <span className="thin-line thin-line-b"></span>
          <div className="hero-slider" id="hero-slider">
            {SLIDES.map((s, i) => (
              <div key={i} className={'hero-slide' + (i === current ? ' is-active' : '')}>
                <img src={imageOf(i)} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? "high" : undefined} />
              </div>
            ))}

            <SlideButton direction="prev" onClick={prevSlide} />
            <SlideButton direction="next" onClick={nextSlide} />

            <div className="hero-slider-dots" role="tablist" aria-label="Featured images">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={'Show image ' + (i + 1)}
                  className={i === current ? 'is-active' : ''}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
