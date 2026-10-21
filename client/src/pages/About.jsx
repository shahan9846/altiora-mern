import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle("About Us | Altiora Business Advisory");
  const { openConsult } = useConsult();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-about-doha.jpg" alt="" /></div>
        <div className="container">
          <h1>About Us</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">About Us</span>
          </nav>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">Who We Are</span>
              <h2 style={{ marginTop: "14px" }}>A dedicated business advisory and learning partner</h2>
              <p style={{ marginTop: "18px" }}>Altiora Business Advisory is a business consulting and advisory firm focused on people, performance and practical growth. We work with organizations across industries to design and deliver training, learning and HR advisory solutions that respond to real business needs.</p>
              <p>Rather than offering generic, off-the-shelf programs, we take the time to understand each client's context — their goals, their challenges and their people — before proposing a way forward.</p>
              <Link to="/contact" className="btn btn-outline-light" style={{ marginTop: "28px" }}>Talk To Our Team
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: "4/3.4", borderColor: "rgba(23,20,15,0.1)" }}>
              <img src="/assets/img-about-doha.jpg" alt="Altiora advisor in discussion with a client, Doha skyline in the background" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-off has-bg">
        <div className="section-off-bg"><img src="/assets/img-approach.jpg" alt="" loading="lazy" /></div>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Foundation</span>
            <h2>Purpose, Mission &amp; Vision</h2>
            <p>The principles that shape how we work with every client, every time.</p>
          </div>
          <div className="card-grid-3">
            <div className="mv-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z"/></svg></div>
              <h3>Our Purpose</h3>
              <p>We believe organizations grow when their people grow. Our purpose is to help businesses build the internal capability — skills, structure and confidence — that supports long-term success, rather than short-term fixes.</p>
            </div>
            <div className="mv-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 18.5 9 12l4 3 7.5-8.5"/><path d="M15.5 6.5H20.5V11.5"/></svg></div>
              <h3>Our Mission</h3>
              <p>To deliver practical, relevant and well-designed advisory and learning solutions that help organizations develop their people, strengthen performance and achieve sustainable business results.</p>
            </div>
            <div className="mv-card reveal">
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/></svg></div>
              <h3>Our Vision</h3>
              <p>To be a trusted advisory partner recognized for practical impact — known by clients not for the size of our promises, but for the quality and relevance of our work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="editorial reveal">
              <span className="eyebrow">What We Believe</span>
              <h2 style={{ marginTop: "14px" }}>Principles behind every engagement</h2>
              <ul className="list-check">
                <li>Learning should be practical, not theoretical for its own sake.</li>
                <li>Every organization's context is different, and solutions should reflect that.</li>
                <li>Long-term partnerships create better outcomes than one-off projects.</li>
                <li>Quality and professionalism matter in every engagement, large or small.</li>
              </ul>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: "4/3.4", borderColor: "rgba(23,20,15,0.1)" }}>
              <img src="/assets/svc-learning-new.jpg" alt="Altiora advisory team in discussion" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-charcoal">
        <div className="container">
          <div className="section-head on-dark reveal">
            <span className="eyebrow">Why Organizations Choose Us</span>
            <h2>A practical, people-first approach</h2>
          </div>
          <div className="card-grid-4">
            <div className="service-card reveal" style={{ background: "var(--charcoal-soft)", borderColor: "var(--cream-line)" }}>
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg></div>
              <h3 style={{ color: "var(--white)" }}>Tailored, Not Templated</h3>
              <p style={{ color: "var(--cream-mute)" }}>Solutions built around your organization, not generic packages.</p>
            </div>
            <div className="service-card reveal" style={{ background: "var(--charcoal-soft)", borderColor: "var(--cream-line)" }}>
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="9" r="5.5"/><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14"/></svg></div>
              <h3 style={{ color: "var(--white)" }}>Practical Delivery</h3>
              <p style={{ color: "var(--cream-mute)" }}>Programs designed for real application, not just awareness.</p>
            </div>
            <div className="service-card reveal" style={{ background: "var(--charcoal-soft)", borderColor: "var(--cream-line)" }}>
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5"/></svg></div>
              <h3 style={{ color: "var(--white)" }}>Long-Term Partnership</h3>
              <p style={{ color: "var(--cream-mute)" }}>Relationships that extend beyond a single project.</p>
            </div>
            <div className="service-card reveal" style={{ background: "var(--charcoal-soft)", borderColor: "var(--cream-line)" }}>
              <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z"/></svg></div>
              <h3 style={{ color: "var(--white)" }}>Professional Standards</h3>
              <p style={{ color: "var(--cream-mute)" }}>Quality and rigour applied consistently across every engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-bg"><img src="/assets/img-home-why.jpg" alt="" loading="lazy" /></div>
        <div className="container reveal">
          <h2>Ready to Elevate Your People and Performance?</h2>
          <p>Let's build practical solutions that create meaningful and sustainable business impact.</p>
          <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); openConsult(); }}>Request a Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </section>
    </>
  );
}
