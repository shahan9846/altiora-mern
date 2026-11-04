import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, useSite, usePaths } from '../context/ContentContext';
import FeatureCard from '../components/FeatureCard';

const ICON = (paths, w = 1.6) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>{paths}</svg>;
const ARROW = ICON(<path d="M5 12h14M13 6l6 6-6 6" />, 2);

const PMV_ICONS = [
  ICON(<path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />),
  ICON(<><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>),
  ICON(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /></>),
];

const CHOOSE_ICONS = [
  ICON(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>),
  ICON(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>),
  ICON(<path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />),
  ICON(<path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />),
];

const VALUE_ICONS = [
  ICON(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>),
  ICON(<><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>),
  ICON(<><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>),
  ICON(<><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>),
  ICON(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>),
];

export default function About() {
  const c = usePage('about');
  const path = usePaths();
  const { c: site } = useSite();
  const { openConsult } = useConsult();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/photo-doha-sunset.jpg" alt="" /></div>
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
              <span className="eyebrow">{c('who.eyebrow')}</span>
              <h2 style={{ marginTop: '14px' }}>{c('who.title')}</h2>
              <p style={{ marginTop: '18px' }}>{c('who.text1')}</p>
              <p>{c('who.text2')}</p>
              <Link to={path('contact')} className="btn btn-outline-light" style={{ marginTop: '28px' }}>{c('who.button')} {ARROW}</Link>
            </div>
            <div className="photo-frame about-photo reveal" style={{ aspectRatio: '4/3', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/photo-team-whiteboard.jpg" alt="A team discussing a plan around a table and whiteboard" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-off has-bg">
        <div className="section-off-bg"><img src="/assets/img-approach.jpg" alt="" loading="lazy" /></div>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{c('foundation.eyebrow')}</span>
            <h2>{c('foundation.title')}</h2>
            <p>{c('foundation.text')}</p>
          </div>
          <div className="card-grid-3">
            {[1, 2, 3].map((n) => (
              <FeatureCard key={n} icon={PMV_ICONS[n - 1]} title={c(`pmv${n}.title`)} text={c(`pmv${n}.text`)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">{c('believe.eyebrow')}</span>
              <h2 style={{ marginTop: '14px' }}>{c('believe.title')}</h2>
              <ul className="list-check">
                {[1, 2, 3, 4].map((n) => <li key={n}>{c(`believe.item${n}`)}</li>)}
              </ul>
            </div>
            <div className="photo-frame about-photo reveal" style={{ aspectRatio: '4/3', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/photo-doha-aerial.jpg" alt="Aerial view of the Doha skyline and waterfront" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{c('values.eyebrow')}</span>
            <h2>{c('values.title')}</h2>
          </div>
          <div className="card-grid-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <FeatureCard key={n} icon={VALUE_ICONS[n - 1]} title={c(`value${n}.title`)} text={c(`value${n}.text`)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">{c('choose.eyebrow')}</span>
            <h2>{c('choose.title')}</h2>
          </div>
          <div className="card-grid-4">
            {[1, 2, 3, 4].map((n) => (
              <FeatureCard key={n} icon={CHOOSE_ICONS[n - 1]} title={c(`choose${n}.title`)} text={c(`choose${n}.text`)} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{site('cta.title')}</h2>
          <p>{site('cta.text')}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>{site('cta.button')} {ARROW}</a>
        </div>
      </section>
    </>
  );
}
