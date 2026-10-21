import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import services from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  useDocumentTitle("Our Services | Altiora Business Advisory");

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/svc-training-new.jpg" alt="" /></div>
        <div className="container">
          <h1>Our Services</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Services</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: "640px" }}>
            <span className="eyebrow">At A Glance</span>
            <h2>Our Core Service Areas</h2>
            <p>A quick look at each service — open any one for the full detail.</p>
          </div>
          <div className="card-grid-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Ready to Elevate Your People and Performance?</h2>
          <p>Let's build practical solutions that create meaningful and sustainable business impact.</p>
          <Link to="/contact" className="btn btn-gold">Request a Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
