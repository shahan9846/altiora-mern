import { Link } from 'react-router-dom';
import { usePage, usePaths } from '../context/ContentContext';
import TrainingExplorer from '../components/TrainingExplorer';
import Arrow from '../components/Arrow';

export default function Training() {
  const c = usePage('training');
  const path = usePaths();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-training.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">{c('banner.title')}</span>
          </nav>
        </div>
      </section>

      {/* <section className="section-white" style={{ paddingBottom: '56px' }}>
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: '680px', marginBottom: '0' }}>
            <span className="eyebrow">{c('intro.eyebrow')}</span>
            <h2>{c('intro.title')}</h2>
            <p>{c('intro.text')}</p>
          </div>
        </div>
      </section> */}

      <section className="section-off">
        <div className="container">
          <div className="section-head section-head-wide reveal">
            <span className="eyebrow">{c('areas.eyebrow')}</span>
            <h2>{c('areas.title')}</h2>
            <p>{c('areas.text')}</p>
          </div>
          <TrainingExplorer />
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="editorial reveal">
              <span className="eyebrow">{c('custom.eyebrow')}</span>
              <h2 style={{ marginTop: '14px' }}>{c('custom.title')}</h2>
              <p style={{ marginTop: '18px' }}>{c('custom.text')}</p>
              <Link to={path('contact')} className="btn btn-outline-light" style={{ marginTop: '24px' }}>{c('custom.button')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/img-training.jpg" alt="Altiora facilitator designing a bespoke training program" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{c('cta.title')}</h2>
          <p>{c('cta.text')}</p>
          <div className="cta-actions">
            <a href="#training-explorer" className="btn btn-gold" onClick={(e) => { e.preventDefault(); document.getElementById('training-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{c('cta.button1')} <Arrow /></a>
            <Link to={path('contact')} className="btn btn-outline-light">{c('cta.button2')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
