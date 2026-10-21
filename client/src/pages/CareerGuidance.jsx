import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Arrow from '../components/Arrow';

// Content from Altiora_Website_Content.docx ("Career Guidance")
const SUPPORT = [
  'Career planning and consultations',
  'Interview preparation',
  'CV and professional profile development',
  'LinkedIn profile guidance',
  'Professional development planning',
  'Career transition guidance',
  'Graduate and early-career support',
  'Professional Certification & Qualification Planning',
];

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.2 2.2 4.8-5" /></svg>
);

export default function CareerGuidance() {
  useDocumentTitle('Career Guidance | Altiora Business Advisory');

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/svc-compliance-new.jpg" alt="" /></div>
        <div className="container">
          <h1>Career Guidance</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Career Guidance</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">Career Guidance</span>
              <h2 style={{ marginTop: 14 }}>Build Your Career With Clarity and Confidence</h2>
              <p style={{ marginTop: 18 }}>Career development is more than finding the next job. It is about understanding your strengths, identifying the right direction, and preparing yourself for future opportunities.</p>
              <p>Whether you are beginning your career, looking to progress professionally, considering a career transition, or exploring further qualifications, Altiora provides personalized guidance to support informed career and development decisions.</p>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: '4/3.4', borderColor: 'rgba(23,20,15,0.1)' }}>
              <img src="/assets/svc-compliance-new.jpg" alt="Professional preparing for the next step in their career" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: 640 }}>
            <span className="eyebrow">How We Support You</span>
            <h2>Guidance for every stage of your career</h2>
          </div>
          <div className="card-grid-4">
            {SUPPORT.map((item) => (
              <div className="mv-card reveal" key={item}>
                <div className="service-icon">{CHECK}</div>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: 720 }}>
            <span className="eyebrow">Our Aim</span>
            <p style={{ marginTop: 14, fontSize: '1.15rem' }}>Our aim is to help individuals make informed career decisions and present their skills and experience with greater confidence.</p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Let's Build Something Meaningful</h2>
          <p>Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward.</p>
          <Link to="/contact?service=career-guidance-development" className="btn btn-gold">Send Enquiry <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
