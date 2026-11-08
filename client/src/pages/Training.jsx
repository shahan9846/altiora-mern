// Training page.
// All the wording comes from the dashboard (Pages -> Training); the programs come from Dashboard -> Training.
// To change a text, see content/trainingContent.js and content/schema.js.
import { Link } from 'react-router-dom';
import { usePage, usePaths } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getTrainingContent } from '../content/trainingContent';
import PageBanner from '../components/PageBanner';
import TrainingExplorer from '../components/TrainingExplorer';
import { icons } from '../components/icons';

export default function Training() {
  const c = usePage('training'); // the text lookup for this page (also sets the page title and SEO tags)
  const path = usePaths(); // web address of another page, e.g. path('contact')

  const training = getTrainingContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={training.banner.image} title={training.banner.title} />

      {/* ============ TRAINING PROGRAMS ============ */}
      <section className="section-off">
        <div className="container">
          <div className="section-head section-head-wide reveal">
            {training.areas.smallHeading && <span className="eyebrow">{training.areas.smallHeading}</span>}
            {training.areas.heading && <h2>{training.areas.heading}</h2>}
            {training.areas.text && <p>{training.areas.text}</p>}
          </div>
          <TrainingExplorer />
        </div>
      </section>

      {/* ============ CUSTOM TRAINING ============ */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2 align-center">
            <div className="editorial reveal">
              {training.custom.smallHeading && <span className="eyebrow">{training.custom.smallHeading}</span>}
              {training.custom.heading && <h2 className="mt-14">{training.custom.heading}</h2>}
              {training.custom.text && <p className="mt-18">{training.custom.text}</p>}
              {training.custom.button && (
                <Link to={path('contact')} className="btn btn-outline-light mt-24">
                  {training.custom.button}{icons.arrow}
                </Link>
              )}
            </div>
            <div className="photo-frame reveal photo-light ratio-4-3">
              <img src={imageUrl(training.custom.image)} alt="Altiora facilitator designing a bespoke training program" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg"><img src={imageUrl(training.cta.image)} alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{training.cta.heading}</h2>
          <p>{training.cta.text}</p>
          <div className="cta-actions">
            <Link to={path('contact')} className="btn btn-outline-light">{training.cta.button}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
