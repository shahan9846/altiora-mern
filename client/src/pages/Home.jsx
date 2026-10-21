import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Hero from '../components/Hero';
import ServicesSlider from '../components/ServicesSlider';
import { TrainingStats, TrainingTags } from '../components/HomeTraining';

export default function Home() {
  useDocumentTitle("Home | Altiora Business Advisory");
  const { openConsult } = useConsult();

  return (
    <>
      <Hero />

      <div className="value-strip">
        <div className="container">
          <div className="value-grid">
            <div className="value-item reveal">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="8.5" r="2.4"/><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3"/></svg></div>
              <div><h4>People Focussed</h4><p>Developing talent and strengthening capabilities.</p></div>
            </div>
            <div className="value-item reveal">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg></div>
              <div><h4>Custom Solutions</h4><p>Tailored programs aligned to your business goals.</p></div>
            </div>
            <div className="value-item reveal">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="9" r="5.5"/><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14"/></svg></div>
              <div><h4>Practical &amp; Impactful</h4><p>Real-world learning for measurable results.</p></div>
            </div>
            <div className="value-item reveal">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5"/><path d="m10 11 3.3-3.2a2.3 2.3 0 0 1 3.2 3.3"/></svg></div>
              <div><h4>Trust &amp; Partnership</h4><p>Building long-term relationships you can rely on.</p></div>
            </div>
            <div className="value-item reveal">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 18.5 9 12l4 3 7.5-8.5"/><path d="M15.5 6.5H20.5V11.5"/></svg></div>
              <div><h4>Driving Growth</h4><p>Empowering organizations to achieve excellence.</p></div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="photo-frame reveal" style={{ aspectRatio: "4/3.2", borderColor: "rgba(23,20,15,0.1)" }}>
              <img src="/assets/img-about-doha.jpg" alt="Altiora advisor in discussion with a client, Doha skyline in the background" loading="lazy" />
            </div>
            <div className="reveal">
              <span className="eyebrow">About Altiora</span>
              <h2 style={{ marginTop: "14px" }}>A dedicated business advisory and learning partner</h2>
              <p className="lede" style={{ marginTop: "18px" }}>Altiora Business Advisory is a business consulting and advisory firm focused on people, performance and practical growth. We work with organizations across industries to design and deliver training, learning and HR advisory solutions that respond to real business needs.</p>
              <Link to="/about" className="btn btn-outline-light" style={{ marginTop: "28px" }}>More About Us
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <ServicesSlider />
          <div className="text-center reveal" style={{ marginTop: "44px" }}>
            <Link to="/services" className="btn btn-outline-light">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <span className="eyebrow">Why Altiora</span>
              <h2>Built Around Your Business.<br />Designed Around Your People.</h2>
              <p className="lede" style={{ marginTop: "20px" }}>We focus on practical, tailored and sustainable solutions rather than generic, off-the-shelf programs — built around your organization's actual goals, challenges and people.</p>
              <Link to="/why-altiora" className="btn btn-outline-light" style={{ marginTop: "30px" }}>Discover Why Altiora
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="stat-panel">
              <div className="stat-grid">
                <div className="stat-cell reveal stat-reveal-1">
                  <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-7h6v7"/></svg></div>
                  <div className="num"><span className="count-up" data-target="100">0</span>%</div>
                  <div className="label">Tailored Solutions</div>
                </div>
                <div className="stat-cell reveal stat-reveal-2">
                  <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/></svg></div>
                  <div className="num">Practical</div>
                  <div className="label">Learning Impact</div>
                </div>
                <div className="stat-cell reveal stat-reveal-3">
                  <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5"/></svg></div>
                  <div className="num">Long-term</div>
                  <div className="label">Client Partnership</div>
                </div>
                <div className="stat-cell reveal stat-reveal-4">
                  <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z"/></svg></div>
                  <div className="num">Every Time</div>
                  <div className="label">Commitment to Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-charcoal has-bg">
        <div className="section-charcoal-bg"><img src="/assets/img-training.jpg" alt="" loading="lazy" /></div>
        <div className="container">
          <div className="section-head on-dark reveal" style={{ maxWidth: "none", marginBottom: "34px" }}>
            <span className="eyebrow">Our Approach</span>
            <h2>A Structured, Practical Methodology</h2>
            <p style={{ maxWidth: "none", whiteSpace: "nowrap" }}>Every engagement follows the same disciplined process, adapted to your organization.</p>
          </div>
        </div>
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

      <section className="section-off">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <span className="eyebrow">Training Programs</span>
              <h2>Learning That Creates Real Impact</h2>
              <p className="lede" style={{ marginTop: "18px" }}>A structured catalogue of programs covering leadership, professional skills and people development — each designed to be practical from day one.</p>
              <TrainingStats />
              <Link to="/training" className="btn btn-outline-light" style={{ marginTop: "30px" }}>View Training Programs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="reveal">
              <div className="photo-frame" style={{ aspectRatio: "4/3.3", marginBottom: "24px" }}>
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
