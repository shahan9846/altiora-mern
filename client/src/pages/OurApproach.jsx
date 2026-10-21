import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function OurApproach() {
  useDocumentTitle("Our Approach | Altiora Business Advisory");

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-approach.jpg" alt="" /></div>
        <div className="container">
          <h1>Our Approach</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Our Approach</span>
          </nav>
        </div>
      </section>

      <section className="section-charcoal has-bg">
        <div className="section-charcoal-bg"><img src="/assets/img-training.jpg" alt="" loading="lazy" /></div>
        <div className="container" style={{ padding: "0" }}>
          <div className="process-grid">
            <div className="process-step reveal">
              <span className="step-no">01</span>
              <h3>Understand</h3>
              <p>Understand the organization's goals, challenges and people.</p>
            </div>
            <div className="process-step reveal">
              <span className="step-no">02</span>
              <h3>Design</h3>
              <p>Build tailored solutions around actual business requirements.</p>
            </div>
            <div className="process-step reveal">
              <span className="step-no">03</span>
              <h3>Deliver</h3>
              <p>Deliver practical, engaging and relevant programs.</p>
            </div>
            <div className="process-step reveal">
              <span className="step-no">04</span>
              <h3>Measure</h3>
              <p>Focus on application, outcomes and sustainable impact.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white photo-band">
        <div className="container">
          <div className="photo-frame reveal">
            <img src="/assets/img-approach.jpg" alt="Altiora meeting room where client engagements are planned" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section-white" style={{ paddingTop: "56px" }}>
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">Stage 01</span>
              <h2 style={{ marginTop: "14px" }}>Understand</h2>
              <p style={{ marginTop: "16px" }}>Every engagement begins with listening. We take the time to understand your organization's goals, the challenges your teams are facing, and the people who will be part of the program — before proposing any solution.</p>
            </div>
            <div className="editorial reveal">
              <span className="eyebrow">Stage 02</span>
              <h2 style={{ marginTop: "14px" }}>Design</h2>
              <p style={{ marginTop: "16px" }}>With a clear picture of your needs, we design a solution around your actual business requirements — not a repackaged, generic program. Content, format and delivery are shaped to fit your context.</p>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: "64px" }}>
            <div className="editorial reveal">
              <span className="eyebrow">Stage 03</span>
              <h2 style={{ marginTop: "14px" }}>Deliver</h2>
              <p style={{ marginTop: "16px" }}>Delivery is practical and engaging, led by experienced facilitators who keep sessions relevant to real work — not abstract theory disconnected from the job at hand.</p>
            </div>
            <div className="editorial reveal">
              <span className="eyebrow">Stage 04</span>
              <h2 style={{ marginTop: "14px" }}>Measure</h2>
              <p style={{ marginTop: "16px" }}>Our focus doesn't end at delivery. We look at how learning is applied on the job, and how the engagement contributes to sustainable, measurable impact over time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What Underpins the Approach</span>
            <h2>The principles behind every project</h2>
          </div>
          <div className="card-grid-4">
            <div className="service-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg></div>
              <h3>Tailored Solutions</h3>
              <p>Every program is shaped around your organization, not a template.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="9" r="5.5"/><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14"/></svg></div>
              <h3>Practical Application</h3>
              <p>Learning designed to be used, not just discussed.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 18.5 9 12l4 3 7.5-8.5"/><path d="M15.5 6.5H20.5V11.5"/></svg></div>
              <h3>Measurable Impact</h3>
              <p>A focus on outcomes that matter to the business.</p>
            </div>
            <div className="service-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5"/></svg></div>
              <h3>Long-Term Partnership</h3>
              <p>Relationships that continue well past a single project.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Ready to Elevate Your People and Performance?</h2>
          <p>Let's build practical solutions that create meaningful and sustainable business impact.</p>
          <Link to="/contact" className="btn btn-gold">Request a Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
