import { useEffect, useState } from 'react';
import Arrow from './Arrow';
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';

const SLIDES = [
  {
    eyebrow: 'Altiora Business Advisory',
    title: 'Elevating Potential.',
    em: 'Delivering Excellence.',
    lede: 'Altiora Business Advisory partners with organizations to build capabilities, develop people and drive sustainable business success.',
    img: '/assets/img-slider-team.jpg',
    alt: 'Team collaborating during an Altiora advisory session',
  },
  {
    eyebrow: 'Practical Learning',
    title: 'Training That',
    em: 'Creates Real Impact.',
    lede: 'Hands-on programs designed to build skills your teams can put to work from day one.',
    img: '/assets/svc-training-new.jpg',
    alt: 'Altiora facilitator leading a training session',
    position: '25% 30%',
  },
  {
    eyebrow: 'Trusted Partnership',
    title: 'Advisory Built On',
    em: 'Lasting Relationships.',
    lede: 'We work alongside your organization for the long term — not just for a single engagement.',
    img: '/assets/img-why.jpg',
    alt: 'Altiora advisor and client shaking hands',
    position: '68% center',
  },
];

// Auto-rotating hero: the copy on the left changes with each slide.
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { openConsult } = useConsult();

  useEffect(() => {
    const timer = setTimeout(() => setCurrent((c) => (c + 1) % SLIDES.length), 3400);
    return () => clearTimeout(timer); // restarts whenever the slide changes (also after a dot click)
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow slide-pulse" key={'e' + current}>{slide.eyebrow}</span>
          <h1 className="slide-pulse" key={'t' + current}>{slide.title}<br /><em>{slide.em}</em></h1>
          <p className="lede slide-pulse" key={'l' + current}>{slide.lede}</p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-gold">Explore Our Services <Arrow /></Link>
            <a href="#" className="btn btn-outline-dark" onClick={(e) => { e.preventDefault(); openConsult(); }}>Request a Consultation</a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="thin-line thin-line-a"></span>
          <span className="thin-line thin-line-b"></span>
          <div className="hero-slider" id="hero-slider">
            {SLIDES.map((s, i) => (
              <div key={s.img} className={'hero-slide' + (i === current ? ' is-active' : '')}>
                <img src={s.img} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} style={s.position ? { objectPosition: s.position } : undefined} />
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
