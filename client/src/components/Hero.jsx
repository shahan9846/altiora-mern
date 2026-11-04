import { useEffect, useState } from 'react';
import Arrow from './Arrow';
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePaths } from '../context/ContentContext';

// Slide pictures tailored to each heading & text.
const SLIDES = [
  {
    img: '/assets/hero-advisory-strategy.jpg',
    alt: 'Business leaders collaborating on strategic growth and advisory solutions in a modern boardroom',
    position: 'center center',
  },
  {
    img: '/assets/hero-practical-training.jpg',
    alt: 'Professional facilitator leading a hands-on corporate workshop with engaged participants',
    position: 'center 35%',
  },
  {
    img: '/assets/hero-trusted-partnership.jpg',
    alt: 'Business partners concluding a strategic agreement and long-term partnership with a handshake',
    position: 'center 45%',
  },
];

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
  const slide = { eyebrow: c(`hero${n}.eyebrow`), title: c(`hero${n}.title`), em: c(`hero${n}.em`), lede: c(`hero${n}.lede`) };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow slide-pulse" key={'e' + current}>{slide.eyebrow}</span>
          <h1 className="slide-pulse" key={'t' + current}>{slide.title}<br /><em>{slide.em}</em></h1>
          <p className="lede slide-pulse" key={'l' + current}>{slide.lede}</p>
          <div className="hero-actions">
            <Link to={path('services')} className="btn btn-gold">{c('hero.button1')} <Arrow /></Link>
            <a href="#" className="btn btn-outline-dark" onClick={(e) => { e.preventDefault(); openConsult(); }}>{c('hero.button2')}</a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="thin-line thin-line-a"></span>
          <span className="thin-line thin-line-b"></span>
          <div className="hero-slider" id="hero-slider">
            {SLIDES.map((s, i) => (
              <div key={s.img} className={'hero-slide' + (i === current ? ' is-active' : '')}>
                <img src={s.img} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? "high" : undefined} style={s.position ? { objectPosition: s.position } : undefined} />
              </div>
            ))}

            {/* Previous & Next side navigation buttons */}
            <button
              type="button"
              className="hero-slider-nav hero-slider-prev"
              aria-label="Previous slide"
              onClick={prevSlide}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-slider-nav hero-slider-next"
              aria-label="Next slide"
              onClick={nextSlide}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="hero-slider-dots" role="tablist" aria-label="Featured images">
              {SLIDES.map((s, i) => (
                <button
                  key={s.img}
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
