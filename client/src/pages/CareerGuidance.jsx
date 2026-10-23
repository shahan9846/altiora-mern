import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, usePaths } from '../context/ContentContext';
import Arrow from '../components/Arrow';
import ServiceIcon from '../components/ServiceIcon';
import useCareerServices from '../hooks/useCareerServices';

// Wording: Dashboard → Pages → Career Guidance page. The support cards: Dashboard → Career Guidance.
export default function CareerGuidance() {
  const c = usePage('career');
  const path = usePaths();
  const { openConsult } = useConsult();
  const careerServices = useCareerServices();

  return (
    <>
      {/* Banner (same style as the other inner pages) */}
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/svc-compliance-new.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">{c('banner.title')}</span>
          </nav>
        </div>
      </section>

      {/* Intro */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">{c('intro.eyebrow')}</span>
              <h2 style={{ marginTop: 14 }}>{c('intro.title')}</h2>
              <p className="lede" style={{ marginTop: 18 }}>{c('intro.text')}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>{c('intro.button1')} <Arrow /></a>
                <Link to={path('services')} className="btn btn-outline-light">{c('intro.button2')}</Link>
              </div>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.2', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/svc-compliance-new.jpg" alt="Professional preparing for the next step in their career" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Practical support (cards managed in the admin dashboard) */}
      {careerServices && careerServices.length > 0 && (
        <section className="section-off">
          <div className="container">
            <div className="section-head reveal" style={{ maxWidth: 720 }}>
              <span className="eyebrow">{c('support.eyebrow')}</span>
              <h2>{c('support.title')}</h2>
              <p>{c('support.text')}</p>
            </div>
            <div className="support-grid">
              {careerServices.map((s) => (
                <div className="support-card" key={s._id}>
                  <div className="support-icon"><ServiceIcon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <span className="support-mark" aria-hidden="true"><ServiceIcon name={s.icon} /></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approach */}
      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">{c('approach.eyebrow')}</span>
            <h2>{c('approach.title')}</h2>
            <p>{c('approach.text')}</p>
          </div>
        </div>
        <div className="container" style={{ padding: 0 }}>
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

      {/* Why choose Altiora */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">{c('why.eyebrow')}</span>
              <h2 style={{ marginTop: 14 }}>{c('why.title')}</h2>
              <p style={{ marginTop: 18 }}>{c('why.text')}</p>
              <ul className="list-check">
                {[1, 2, 3, 4].map((n) => <li key={n}>{c(`why.item${n}`)}</li>)}
              </ul>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.2', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/img-why.jpg" alt="Altiora advisor and client shaking hands" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{c('cta.title')}</h2>
          <p>{c('cta.text')}</p>
          <Link to={path('contact') + '?service=career-guidance-development'} className="btn btn-gold">{c('cta.button')} <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
