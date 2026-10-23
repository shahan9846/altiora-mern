import { Link } from 'react-router-dom';
import { usePage, useSite, usePaths } from '../context/ContentContext';
import useServices from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const c = usePage('services');
  const path = usePaths();
  const { c: site } = useSite();
  const services = useServices();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/svc-training-new.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Services</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: '640px' }}>
            <span className="eyebrow">{c('intro.eyebrow')}</span>
            <h2>{c('intro.title')}</h2>
            <p>{c('intro.text')}</p>
          </div>
          {services && services.length === 0 && <p>Our services will be listed here shortly.</p>}
          <div className="card-grid-3">
            {(services || []).map((s) => <ServiceCard key={s.slug} service={s} />)}
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
