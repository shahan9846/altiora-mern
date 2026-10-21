import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Arrow from '../components/Arrow';

// Content from Altiora_Website_Content.docx ("Why Altiora?")
const REASONS = [
  {
    title: 'Tailored to Your Needs',
    text: 'We recognize that every organization and individual is different. Our solutions can be adapted to specific objectives, audiences, industries, and development priorities.',
    icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>,
  },
  {
    title: 'Practical & Relevant',
    text: 'We focus on learning that participants can understand, relate to, and apply in their professional environment.',
    icon: <><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>,
  },
  {
    title: 'People-Focused Approach',
    text: 'Development is about people. We place the learner at the center of the experience while keeping organizational objectives in focus.',
    icon: <><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>,
  },
  {
    title: 'Flexible Solutions',
    text: 'From focused workshops to customized development programs, our approach allows us to respond to different learning requirements and delivery needs.',
    icon: <><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" /><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" /></>,
  },
  {
    title: 'Quality-Driven',
    text: 'We are committed to maintaining professionalism, relevance, and quality throughout every stage of the learning journey.',
    icon: <><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>,
  },
  {
    title: 'Built for Continuous Growth',
    text: 'We look beyond a single training session and encourage development that supports continued learning, stronger capabilities, and long-term professional growth.',
    icon: <><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>,
  },
];

export default function WhyAltiora() {
  useDocumentTitle('Why Altiora | Altiora Business Advisory');
  const { openConsult } = useConsult();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-why.jpg" alt="" /></div>
        <div className="container">
          <h1>Why Altiora</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Why Altiora</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">Why Altiora?</span>
              <h2 style={{ marginTop: 14 }}>Development with purpose</h2>
              <p style={{ marginTop: 18 }}>At Altiora, every development journey begins with a clear purpose. Our approach is centered on identifying the right priorities and creating solutions that align with individual and organizational goals.</p>
              <p>We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact.</p>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.4', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/img-home-why.jpg" alt="Altiora facilitator leading a workplace training session" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">Our Strengths</span>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="card-grid-3">
            {REASONS.map((r) => (
              <div className="service-card reveal" key={r.title} style={{ background: 'var(--charcoal-soft)', borderColor: 'var(--cream-line)' }}>
                <div className="service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{r.icon}</svg>
                </div>
                <h3 style={{ color: 'var(--white)' }}>{r.title}</h3>
                <p style={{ color: 'var(--cream-mute)' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-approach.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Your Goals. Our Focus.</h2>
          <p>Whether you are developing a team, strengthening a specific capability, or investing in your own professional growth, Altiora works with you to create a development experience that has purpose and direction.</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>Request a Consultation <Arrow /></a>
        </div>
      </section>
    </>
  );
}
