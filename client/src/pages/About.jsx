// About page.
// All the wording comes from the dashboard (Pages -> About); anything not edited shows the default text.
// To change a text, see content/aboutContent.js and content/schema.js.
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, usePaths } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getAboutContent } from '../content/aboutContent';
import { CLOSING_BANNER } from '../content/siteContent';
import PageBanner from '../components/PageBanner';
import FeatureCard from '../components/FeatureCard';
import { icons } from '../components/icons';

// The icon for each card, in the same order as the cards on the page
const FOUNDATION_ICONS = [icons.shield, icons.growth, icons.ring];
const VALUES_ICONS = [icons.award, icons.shieldCheck, icons.people, icons.growth, icons.target];

export default function About() {
  const c = usePage('about'); // the text lookup for this page (also sets the page title and SEO tags)
  const path = usePaths(); // web address of another page, e.g. path('contact')
  const { openConsult } = useConsult(); // opens the "Request a consultation" popup

  const about = getAboutContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={about.banner.image} title={about.banner.title} />

      {/* ============ WHO WE ARE ============ */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              {about.who.smallHeading && <span className="eyebrow">{about.who.smallHeading}</span>}
              {about.who.heading && <h2 className="mt-14">{about.who.heading}</h2>}
              {about.who.text1 && <p className="mt-18">{about.who.text1}</p>}
              {about.who.button && (
                <Link to={path('contact')} className="btn btn-outline-light mt-28">
                  {about.who.button} {icons.arrow}
                </Link>
              )}
            </div>
            <div className="photo-frame about-photo reveal photo-light ratio-4-3">
              <img src={imageUrl(about.who.image)} alt="A team discussing a plan around a table and whiteboard" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PURPOSE, MISSION, VISION (black and gold band) ============ */}
      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            {about.foundation.smallHeading && <span className="eyebrow">{about.foundation.smallHeading}</span>}
            {about.foundation.heading && <h2>{about.foundation.heading}</h2>}
            {about.foundation.text && <p>{about.foundation.text}</p>}
          </div>
          <div className="card-grid-3">
            {about.foundation.cards.map((card, index) => (
              <FeatureCard key={index} icon={FOUNDATION_ICONS[index]} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR VALUES ============ */}
      <section className="section-off">
        <div className="container">
          <div className="section-head reveal">
            {about.values.smallHeading && <span className="eyebrow">{about.values.smallHeading}</span>}
            {about.values.heading && <h2>{about.values.heading}</h2>}
          </div>
          <div className="card-grid-5">
            {about.values.cards.map((card, index) => (
              <FeatureCard key={index} icon={VALUES_ICONS[index]} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg"><img src={imageUrl(about.ctaImage)} alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{CLOSING_BANNER.heading}</h2>
          <p>{CLOSING_BANNER.text}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>
            {CLOSING_BANNER.button} {icons.arrow}
          </a>
        </div>
      </section>
    </>
  );
}
