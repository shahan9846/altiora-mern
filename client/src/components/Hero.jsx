import { useEffect, useState } from 'react';
import Arrow from './Arrow';
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePaths } from '../context/ContentContext';

// Slide pictures. The wording of each slide is editable (Dashboard → Pages → Home).
const SLIDES = [
  { img: '/assets/photo-team-meeting.jpg', alt: 'A team collaborating around a table in a bright meeting room' },
  { img: '/assets/photo-training-session.jpg', alt: 'A facilitator presenting to a team during a training session', position: '86% center' },
  { img: '/assets/photo-advisory-discussion.jpg', alt: 'Colleagues in an advisory discussion around a meeting table', position: '40% center' },
];

// Auto-rotating hero: the copy on the left changes with each slide.
export default function Hero({ c }) {
  const [current, setCurrent] = useState(0);
  const path = usePaths();
  const { openConsult } = useConsult();

  useEffect(() => {
    const timer = setTimeout(() => setCurrent((c) => (c + 1) % SLIDES.length), 3400);
    return () => clearTimeout(timer); // restarts whenever the slide changes (also after a dot click)
  }, [current]);

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
