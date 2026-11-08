// Services page.
// The heading texts come from the dashboard (Pages -> Services); the service cards come from Dashboard -> Services.
// To change a text, see content/servicesContent.js and content/schema.js.
import { Link } from 'react-router-dom';
import { usePage, usePaths } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getServicesContent } from '../content/servicesContent';
import { CLOSING_BANNER } from '../content/siteContent';
import useServices from '../hooks/useServices';
import PageBanner from '../components/PageBanner';
import ServiceCard from '../components/ServiceCard';
import { icons } from '../components/icons';

export default function Services() {
  const c = usePage('services'); // the text lookup for this page (also sets the page title and SEO tags)
  const path = usePaths(); // web address of another page, e.g. path('contact')
  const services = useServices(); // the service cards from the API (empty list = none yet, null = still loading)

  const page = getServicesContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={page.banner.image} title={page.banner.title} crumb="Services" />

      {/* ============ SERVICE CARDS ============ */}
      <section className="section-white">
        <div className="container">
          {/* the title stays in two lines, the paragraph runs the full width of the page */}
          <div className="section-head section-head-full reveal">
            {page.intro.smallHeading && <span className="eyebrow">{page.intro.smallHeading}</span>}
            {page.intro.heading && <h2>{page.intro.heading}</h2>}
            {page.intro.text && <p>{page.intro.text}</p>}
          </div>
          {services && services.length === 0 && <p>Our services will be listed here shortly.</p>}
          <div className="card-grid-3">
            {(services || []).map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg"><img src={imageUrl(page.ctaImage)} alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{CLOSING_BANNER.heading}</h2>
          <p>{CLOSING_BANNER.text}</p>
          <Link to={path('contact')} className="btn btn-gold">{CLOSING_BANNER.button}{icons.arrow}</Link>
        </div>
      </section>
    </>
  );
}
