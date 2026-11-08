// Home page.
// All the wording comes from the dashboard (Pages -> Home); anything not edited shows the default text.
// The page is its sections from top to bottom. To change a text, see content/homeContent.js and content/schema.js.
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, usePaths, Lines } from '../context/ContentContext';
import { imageUrl } from '../api/client';
import { getHomeContent } from '../content/homeContent';
import { CLOSING_BANNER } from '../content/siteContent';
import Hero from '../components/Hero';
import ServicesSlider from '../components/ServicesSlider';
import { TrainingStats, TrainingTags } from '../components/HomeTraining';
import StatValue from '../components/StatValue';
import { icons } from '../components/icons';

// The icon for each item, in the same order as the items on the page
const VALUE_ICONS = [icons.people, icons.target, icons.award, icons.handshakeFull, icons.growth];
const STAT_ICONS = [icons.house, icons.ring, icons.handshake, icons.shield];
const ARROW = icons.arrow;

export default function Home() {
  const c = usePage('home'); // the text lookup for this page (also sets the page title and SEO tags)
  const path = usePaths(); // web address of another page, e.g. path('about')
  const { openConsult } = useConsult(); // opens the "Request a consultation" popup

  const home = getHomeContent(c);

  return (
    <>
      {/* ============ HERO ============ */}
      <Hero c={c} />

      {/* ============ VALUE STRIP ============ */}
      <div className="value-strip">
        <div className="container">
          <div className="value-grid">
            {home.valueStrip.map((item, index) => (
              <div className="value-item reveal" key={index}>
                <div className="icon">{VALUE_ICONS[index]}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="photo-frame reveal photo-light ratio-16-10">
              <img src={imageUrl(home.about.image)} alt="A team discussing a plan around a table and whiteboard" loading="lazy" />
            </div>
            <div className="reveal">
              {home.about.smallHeading && <span className="eyebrow">{home.about.smallHeading}</span>}
              {home.about.heading && <h2 className="mt-14">{home.about.heading}</h2>}
              {home.about.intro && <p className="lede mt-18">{home.about.intro}</p>}
              {home.about.button && (
                <Link to={path('about')} className="btn btn-outline-light mt-28">
                  {home.about.button} {ARROW}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section-off">
        <div className="container">
          <ServicesSlider c={c} />
          <div className="text-center reveal mt-44">
            {home.services.button && <Link to={path('services')} className="btn btn-outline-light">{home.services.button}</Link>}
          </div>
        </div>
      </section>

      {/* ============ WHY ALTIORA ============ */}
      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              {home.why.smallHeading && <span className="eyebrow">{home.why.smallHeading}</span>}
              {home.why.heading && <h2><Lines text={home.why.heading} /></h2>}
              {home.why.text && <p className="lede mt-20">{home.why.text}</p>}
              {home.why.button && (
                <Link to={path('why')} className="btn btn-outline-light mt-30">
                  {home.why.button} {ARROW}
                </Link>
              )}
            </div>
            <div className="stat-panel">
              <div className="stat-grid">
                {home.why.highlights.map((highlight, index) => (
                  <div className={`stat-cell reveal stat-reveal-${index + 1}`} key={index}>
                    <div className="icon">{STAT_ICONS[index]}</div>
                    <div className="num"><StatValue text={highlight.value} /></div>
                    <div className="label">{highlight.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR APPROACH ============ */}
      <section className="section-charcoal has-bg">
        <div className="section-charcoal-bg">
          <img src={imageUrl(home.approach.image)} alt="" loading="lazy" />
        </div>
        <div className="container">
          <div className="section-head on-dark reveal approach-head">
            {home.approach.smallHeading && <span className="eyebrow">{home.approach.smallHeading}</span>}
            {home.approach.heading && <h2>{home.approach.heading}</h2>}
            {home.approach.text && <p>{home.approach.text}</p>}
          </div>
        </div>
        <div className="container no-pad">
          <div className="process-grid">
            {home.approach.steps.map((step, index) => (
              <div className="process-step reveal" key={index}>
                <span className="step-no">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAINING ============ */}
      <section className="section-off">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              {home.training.smallHeading && <span className="eyebrow">{home.training.smallHeading}</span>}
              {home.training.heading && <h2>{home.training.heading}</h2>}
              {home.training.text && <p className="lede mt-18">{home.training.text}</p>}
              <TrainingStats labels={home.training.numberLabels} />
              {home.training.button && (
                <Link to={path('training')} className="btn btn-outline-light mt-30">
                  {home.training.button} {ARROW}
                </Link>
              )}
            </div>
            <div className="reveal">
              <TrainingTags />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CALL TO ACTION ============ */}
      <section className="cta-band">
        <div className="cta-bg">
          <img src={imageUrl(home.ctaImage)} alt="" loading="lazy" />
        </div>
        <div className="container reveal">
          <h2>{CLOSING_BANNER.heading}</h2>
          <p>{CLOSING_BANNER.text}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>
            {CLOSING_BANNER.button} {ARROW}
          </a>
        </div>
      </section>
    </>
  );
}
