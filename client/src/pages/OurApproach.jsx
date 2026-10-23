import { Link } from 'react-router-dom';
import { usePage, useSite, usePaths } from '../context/ContentContext';
import FeatureCard from '../components/FeatureCard';

const ICON = (paths, w = 1.6) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>{paths}</svg>;

const PRINCIPLE_ICONS = [
  ICON(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>),
  ICON(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>),
  ICON(<><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>),
  ICON(<path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />),
];

export default function OurApproach() {
  const c = usePage('approach');
  const path = usePaths();
  const { c: site } = useSite();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-approach.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">{c('banner.title')}</span>
          </nav>
        </div>
      </section>

      <section className="section-charcoal has-bg">
        <div className="section-charcoal-bg"><img src="/assets/img-training.jpg" alt="" loading="lazy" /></div>
        <div className="container" style={{ padding: '0' }}>
          <div className="process-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="process-step reveal" key={n}>
                <span className="step-no">{String(n).padStart(2, '0')}</span>
                <h3>{c(`step${n}.title`)}</h3>
                <p>{c(`step${n}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white photo-band">
        <div className="container">
          <div className="photo-frame reveal">
            <img src="/assets/img-approach.jpg" alt="Altiora meeting room where client engagements are planned" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section-white" style={{ paddingTop: '56px' }}>
        <div className="container">
          <div className="grid-2">
            {[1, 2].map((n) => (
              <div className="editorial reveal" key={n}>
                <span className="eyebrow">{c(`stage${n}.eyebrow`)}</span>
                <h2 style={{ marginTop: '14px' }}>{c(`stage${n}.title`)}</h2>
                <p style={{ marginTop: '16px' }}>{c(`stage${n}.text`)}</p>
              </div>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: '64px' }}>
            {[3, 4].map((n) => (
              <div className="editorial reveal" key={n}>
                <span className="eyebrow">{c(`stage${n}.eyebrow`)}</span>
                <h2 style={{ marginTop: '14px' }}>{c(`stage${n}.title`)}</h2>
                <p style={{ marginTop: '16px' }}>{c(`stage${n}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{c('principles.eyebrow')}</span>
            <h2>{c('principles.title')}</h2>
          </div>
          <div className="card-grid-4">
            {[1, 2, 3, 4].map((n) => (
              <FeatureCard key={n} icon={PRINCIPLE_ICONS[n - 1]} title={c(`principle${n}.title`)} text={c(`principle${n}.text`)} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{site('cta.title')}</h2>
          <p>{site('cta.text')}</p>
          <Link to={path('contact')} className="btn btn-gold">{site('cta.button')}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
