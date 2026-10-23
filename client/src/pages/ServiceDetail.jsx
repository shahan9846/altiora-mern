import { Link, useParams } from 'react-router-dom';
import useServices from '../hooks/useServices';
import ServiceIcon from '../components/ServiceIcon';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { useSeoTags } from '../content/seo';
import ServiceCard, { firstParagraph } from '../components/ServiceCard';
import { imageUrl } from '../api/client';
import { usePaths } from '../context/ContentContext';

// One template for every service page: title, description and a consultation button.
// The services come from the API (managed in the admin dashboard).
export default function ServiceDetail() {
  const { slug } = useParams();
  const path = usePaths();
  const services = useServices();
  const index = services ? services.findIndex((s) => s.slug === slug) : -1;
  const service = index >= 0 ? services[index] : null;
  // SEO: the optional fields from the service form, otherwise the service's own title and first paragraph
  useSeoTags({
    title: service ? (service.seoTitle || '').trim() || `${service.title} | Altiora Business Advisory` : 'Services | Altiora Business Advisory',
    description: service ? (service.seoDescription || '').trim() || firstParagraph(service.description).slice(0, 160) : '',
    image: service?.image || '',
    imageAlt: service ? service.imageAlt || service.title : '',
  });

  if (!services) return <div style={{ minHeight: '60vh' }} />; // still loading
  if (!service) return <NotFound />;

  const paragraphs = service.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const number = String(index + 1).padStart(2, '0');
  // up to three other services, starting with the ones that follow this one in the list
  const related = [...services.slice(index + 1), ...services.slice(0, index)].slice(0, 3);

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src={imageUrl(service.image)} alt="" /></div>
        <div className="container">
          <h1>{service.title}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to={path('services')}>Services</Link>
            <span className="sep">/</span>
            <span className="current">{service.title}</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            <div className="reveal">
              <div className="service-icon" style={{ marginBottom: 24 }}><ServiceIcon /></div>
              <span className="eyebrow">{number} — Service</span>
              <h2 style={{ marginTop: 14 }}>{service.title}</h2>
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? 'lede' : undefined} style={i === 0 ? { marginTop: 16 } : { marginTop: 16, color: 'var(--ink-soft)' }}>{p}</p>
              ))}
              <Link to={path('contact') + '?service=' + service.slug} className="btn btn-outline-light" style={{ marginTop: 28 }}>Request a Consultation <Arrow /></Link>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src={imageUrl(service.image)} alt={service.imageAlt || service.title} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section-off">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Explore More</span>
              <h2>Related Services</h2>
            </div>
            <div className="card-grid-3">
              {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
