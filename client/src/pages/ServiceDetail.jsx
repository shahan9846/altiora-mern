import { Link, useParams } from 'react-router-dom';
import services from '../data/services';
import ServiceCard from '../components/ServiceCard';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { useConsult } from '../context/ConsultContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

const STEPS = [
  ['01', 'Understand', "Understand the organization's goals, challenges and people."],
  ['02', 'Design', 'Build a tailored solution around your actual business requirements.'],
  ['03', 'Deliver', 'Deliver a practical, engaging and relevant program.'],
  ['04', 'Measure', 'Focus on application, outcomes and sustainable impact.'],
];

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.2 2.2 4.8-5" /></svg>
);

// One template for all four service pages (data lives in data/services.jsx).
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const { openConsult } = useConsult();
  useDocumentTitle(service ? `${service.title} | Altiora Business Advisory` : 'Service not found | Altiora Business Advisory');

  if (!service) return <NotFound />;
  const related = services.filter((s) => s.slug !== slug);
  const contactLink = '/contact?service=' + service.slug;

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src={service.bannerImg} alt="" /></div>
        <div className="container">
          <h1>{service.title}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/services">Services</Link>
            <span className="sep">/</span>
            <span className="current">{service.title}</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            <div className="reveal">
              <div className="service-icon" style={{ marginBottom: 24 }}>{service.icon}</div>
              <span className="eyebrow">{service.num} — Service</span>
              <h2 style={{ marginTop: 14 }}>{service.title}</h2>
              <p className="lede" style={{ marginTop: 16 }}>{service.lede}</p>
              <p style={{ marginTop: 16, color: 'var(--ink-soft)' }}>{service.audience}</p>
              <Link to={contactLink} className="btn btn-outline-light" style={{ marginTop: 28 }}>Request a Consultation <Arrow /></Link>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src={service.photo} alt={service.photoAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: 640 }}>
            <span className="eyebrow">What We Provide</span>
            <h2>Inside This Service</h2>
          </div>
          <div className="card-grid-3">
            {service.features.map((f) => (
              <div className="mv-card reveal" key={f.title}>
                <div className="service-icon">{CHECK}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: 640 }}>
            <span className="eyebrow">Key Benefits</span>
            <h2>What This Means For Your Organization</h2>
            <p>{service.benefits}</p>
          </div>
        </div>
      </section>

      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">Our Approach</span>
            <h2>How We Deliver This Service</h2>
            <p>The same disciplined, four-step process behind every Altiora engagement.</p>
          </div>
        </div>
        <div className="container" style={{ padding: 0 }}>
          <div className="process-grid">
            {STEPS.map(([no, title, text]) => (
              <div className="process-step reveal" key={no}>
                <span className="step-no">{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: 640 }}>
            <span className="eyebrow">Related Services</span>
            <h2>You Might Also Be Interested In</h2>
          </div>
          <div className="card-grid-3">
            {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Let's Build the Right Solution for Your Organization.</h2>
          <p>Tell us about your goals and we'll put together an approach that fits.</p>
          <Link to={contactLink} className="btn btn-gold">Request a Consultation <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
