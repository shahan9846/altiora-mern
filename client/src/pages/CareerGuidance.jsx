// Career Guidance page.
// The wording comes from the dashboard (Pages -> Career Guidance); the support cards come from Dashboard -> Career Guidance.
// To change a text, see content/careerContent.js and content/schema.js.
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, usePaths } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getCareerContent } from '../content/careerContent';
import useCareerServices from '../hooks/useCareerServices';
import PageBanner from '../components/PageBanner';
import { icons } from '../components/icons';

export default function CareerGuidance() {
  const c = usePage('career'); // the text lookup for this page (also sets the page title and SEO tags)
  const path = usePaths(); // web address of another page, e.g. path('services')
  const { openConsult } = useConsult(); // opens the "Request a consultation" popup
  const careerServices = useCareerServices(); // the support cards from the API (null while loading)

  const career = getCareerContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={career.banner.image} title={career.banner.title} />

      {/* ============ INTRO ============ */}
      <section className="section-white">
        <div className="container">
          {/* photo on the left (smaller), text on the right */}
          <div className="career-intro">
            <div className="photo-frame reveal photo-light ratio-4-3">
              <img src={imageUrl(career.intro.image)} alt="Professional preparing for the next step in their career" loading="lazy" />
            </div>
            <div className="editorial reveal">
              {career.intro.smallHeading && <span className="eyebrow">{career.intro.smallHeading}</span>}
              {career.intro.heading && <h2 className="mt-14">{career.intro.heading}</h2>}
              {career.intro.text && <p className="lede mt-18">{career.intro.text}</p>}
              <div className="career-actions">
                {career.intro.button1 && (
                  <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>
                    {career.intro.button1} {icons.arrow}
                  </a>
                )}
                {career.intro.button2 && <Link to={path('services')} className="btn btn-outline-light">{career.intro.button2}</Link>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRACTICAL SUPPORT (cards managed in the dashboard) ============ */}
      {careerServices && careerServices.length > 0 && (
        <section className="section-off">
          <div className="container">
            <div className="section-head reveal max-w-720">
              {career.support.smallHeading && <span className="eyebrow">{career.support.smallHeading}</span>}
              {career.support.heading && <h2>{career.support.heading}</h2>}
              {career.support.text && <p>{career.support.text}</p>}
            </div>
            <div className="support-grid">
              {careerServices.map((service, index) => (
                <div className="support-card" key={service._id}>
                  <div className="support-icon">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg"><img src={imageUrl(career.cta.image)} alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{career.cta.heading}</h2>
          <p>{career.cta.text}</p>
          <Link to={path('contact') + '?service=career-guidance-development'} className="btn btn-gold">
            {career.cta.button} {icons.arrow}
          </Link>
        </div>
      </section>
    </>
  );
}
