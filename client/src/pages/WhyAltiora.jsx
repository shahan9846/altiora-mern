// "Why Altiora" page.
// All the wording comes from the dashboard (Pages -> Why Altiora); anything not edited shows the default text.
// To change a text, see content/whyContent.js and content/schema.js.
import { useConsult } from '../context/ConsultContext';
import { usePage } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getWhyContent } from '../content/whyContent';
import PageBanner from '../components/PageBanner';
import FeatureCard from '../components/FeatureCard';
import { icons } from '../components/icons';

// The icon for each "what sets us apart" card, in the same order as the cards on the page
const APART_ICONS = [icons.target, icons.award, icons.people, icons.book, icons.shieldCheck, icons.growth];

export default function WhyAltiora() {
  const c = usePage('why'); // the text lookup for this page (also sets the page title and SEO tags)
  const { openConsult } = useConsult(); // opens the "Request a consultation" popup

  const why = getWhyContent(c);

  return (
    <>
      {/* ============ BANNER ============ */}
      <PageBanner image={why.banner.image} title={why.banner.title} />

      {/* ============ INTRO ============ */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              {why.intro.smallHeading && <span className="eyebrow">{why.intro.smallHeading}</span>}
              {why.intro.heading && <h2 className="mt-14">{why.intro.heading}</h2>}
              {why.intro.text1 && <p className="mt-18">{why.intro.text1}</p>}
            </div>
            <div className="photo-frame reveal photo-light ratio-16-10">
              <img src={imageUrl(why.intro.image)} alt="Altiora facilitator leading a workplace training session" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT SETS US APART ============ */}
      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            {why.apart.smallHeading && <span className="eyebrow">{why.apart.smallHeading}</span>}
            {why.apart.heading && <h2>{why.apart.heading}</h2>}
          </div>
          <div className="card-grid-3">
            {why.apart.cards.map((card, index) => (
              <FeatureCard key={index} icon={APART_ICONS[index]} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg"><img src={imageUrl(why.cta.image)} alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{why.cta.heading}</h2>
          <p>{why.cta.text}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>
            {why.cta.button} {icons.arrow}
          </a>
        </div>
      </section>
    </>
  );
}
