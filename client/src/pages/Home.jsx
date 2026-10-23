import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { usePage, useSite, usePaths, Lines } from '../context/ContentContext';
import Hero from '../components/Hero';
import ServicesSlider from '../components/ServicesSlider';
import { TrainingStats, TrainingTags } from '../components/HomeTraining';

const ICON = (paths, w = 1.6) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>{paths}</svg>;
const ARROW = ICON(<path d="M5 12h14M13 6l6 6-6 6" />, 2);

const VALUE_ICONS = [
  ICON(<><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>),
  ICON(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>),
  ICON(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>),
  ICON(<><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" /><path d="m10 11 3.3-3.2a2.3 2.3 0 0 1 3.2 3.3" /></>),
  ICON(<><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>),
];

const STAT_ICONS = [
  ICON(<><path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-7h6v7" /></>),
  ICON(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /></>),
  ICON(<path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />),
  ICON(<path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />),
];

// "100%" counts up from 0; anything else (like "Practical") is shown as written
function StatValue({ text }) {
  const m = /^(\d+)(.*)$/.exec(text.trim());
  if (!m) return text;
  return <><span className="count-up" data-target={m[1]}>0</span>{m[2]}</>;
}

export default function Home() {
  const c = usePage('home');
  const path = usePaths();
  const { c: site } = useSite();
  const { openConsult } = useConsult();

  return (
    <>
      <Hero c={c} />

      <div className="value-strip">
        <div className="container">
          <div className="value-grid">
            {[1, 2, 3, 4, 5].map((n) => (
              <div className="value-item reveal" key={n}>
                <div className="icon">{VALUE_ICONS[n - 1]}</div>
                <div><h4>{c(`value${n}.title`)}</h4><p>{c(`value${n}.text`)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.2', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/photo-team-whiteboard.jpg" alt="A team discussing a plan around a table and whiteboard" loading="lazy" />
            </div>
            <div className="reveal">
              <span className="eyebrow">{c('about.eyebrow')}</span>
              <h2 style={{ marginTop: '14px' }}>{c('about.title')}</h2>
              <p className="lede" style={{ marginTop: '18px' }}>{c('about.text')}</p>
              <p style={{ marginTop: '16px', color: 'var(--ink-soft)' }}>{c('about.text2')}</p>
              <Link to={path('about')} className="btn btn-outline-light" style={{ marginTop: '28px' }}>{c('about.button')} {ARROW}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <ServicesSlider c={c} />
          <div className="text-center reveal" style={{ marginTop: '44px' }}>
            <Link to={path('services')} className="btn btn-outline-light">{c('services.button')}</Link>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <span className="eyebrow">{c('why.eyebrow')}</span>
              <h2><Lines text={c('why.title')} /></h2>
              <p className="lede" style={{ marginTop: '20px' }}>{c('why.text')}</p>
              <Link to={path('why')} className="btn btn-outline-light" style={{ marginTop: '30px' }}>{c('why.button')} {ARROW}</Link>
            </div>
            <div className="stat-panel">
              <div className="stat-grid">
                {[1, 2, 3, 4].map((n) => (
                  <div className={`stat-cell reveal stat-reveal-${n}`} key={n}>
                    <div className="icon">{STAT_ICONS[n - 1]}</div>
                    <div className="num"><StatValue text={c(`stat${n}.value`)} /></div>
                    <div className="label">{c(`stat${n}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-charcoal has-bg">
        <div className="section-charcoal-bg"><img src="/assets/img-training.jpg" alt="" loading="lazy" /></div>
        <div className="container">
          <div className="section-head on-dark reveal" style={{ maxWidth: 'none', marginBottom: '34px' }}>
            <span className="eyebrow">{c('approach.eyebrow')}</span>
            <h2>{c('approach.title')}</h2>
            <p style={{ maxWidth: 'none', whiteSpace: 'nowrap' }}>{c('approach.text')}</p>
          </div>
        </div>
        <div className="container" style={{ padding: '0' }}>
          <div className="process-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="process-step reveal" key={n}>
                <span className="step-no">{String(n).padStart(2, '0')}</span>
                <h3>{c(`step${n}.title`)}</h3>
                <p>{c(`step${n}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <span className="eyebrow">{c('training.eyebrow')}</span>
              <h2>{c('training.title')}</h2>
              <p className="lede" style={{ marginTop: '18px' }}>{c('training.text')}</p>
              <TrainingStats labels={[c('training.label1'), c('training.label2'), c('training.label3')]} />
              <Link to={path('training')} className="btn btn-outline-light" style={{ marginTop: '30px' }}>{c('training.button')} {ARROW}</Link>
            </div>
            <div className="reveal">
              <div className="photo-frame" style={{ aspectRatio: '4/3.3', marginBottom: '24px' }}>
                <img src="/assets/img-home-why.jpg" alt="Altiora facilitator leading a workplace training session" loading="lazy" />
              </div>
              <TrainingTags />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-approach.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>{site('cta.title')}</h2>
          <p>{site('cta.text')}</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>{site('cta.button')} {ARROW}</a>
        </div>
      </section>
    </>
  );
}
