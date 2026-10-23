import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage } from '../context/ContentContext';
import Arrow from '../components/Arrow';
import FeatureCard from '../components/FeatureCard';

// The icon of each "what sets us apart" card (the wording is editable: Dashboard → Pages → Why Altiora)
const ICONS = [
  <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>,
  <><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>,
  <><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>,
  <><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" /><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" /></>,
  <><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>,
  <><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>,
];

export default function WhyAltiora() {
  const c = usePage('why');
  const { openConsult } = useConsult();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-why.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">{c('banner.title')}</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">{c('intro.eyebrow')}</span>
              <h2 style={{ marginTop: 14 }}>{c('intro.title')}</h2>
              <p style={{ marginTop: 18 }}>{c('intro.text1')}</p>
              <p>{c('intro.text2')}</p>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.4', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/img-home-why.jpg" alt="Altiora facilitator leading a workplace training session" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">{c('apart.eyebrow')}</span>
            <h2>{c('apart.title')}</h2>
          </div>
          <div className="card-grid-3">
            {ICONS.map((icon, i) => (
              <FeatureCard
                key={i}
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{icon}</svg>}
                title={c(`apart${i + 1}.title`)}
                text={c(`apart${i + 1}.text`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-approach.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{c('cta.title')}</h2>
          <p>{c('cta.text')}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>{c('cta.button')} <Arrow /></a>
        </div>
      </section>
    </>
  );
}
