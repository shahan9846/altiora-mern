import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import TrainingCatalogue from '../components/TrainingCatalogue';

export default function Training() {
  useDocumentTitle("Training Programs | Altiora Business Advisory");

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-training.jpg" alt="" /></div>
        <div className="container">
          <h1>Training Programs</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Training Programs</span>
          </nav>
        </div>
      </section>

      <section className="section-white" style={{ paddingBottom: "56px" }}>
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: "680px", marginBottom: "0" }}>
            <span className="eyebrow">Our Training Catalogue</span>
            <h2>Practical Programs, Ready to Deploy</h2>
            <p>Every program below is built to be practical from day one — filter by category to find the right fit, or talk to us about a custom program below.</p>
          </div>
        </div>
      </section>

      <section className="section-white" style={{ paddingTop: "0" }}>
        <div className="container">
          <TrainingCatalogue />
        </div>
      </section>

      <section className="section-off">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div className="editorial reveal">
              <span className="eyebrow">Don't See What You Need?</span>
              <h2 style={{ marginTop: "14px" }}>We design custom programs too</h2>
              <p style={{ marginTop: "18px" }}>Every organization is different. If none of our standard programs are an exact fit, we can design a bespoke training solution around your specific goals, team and timeline.</p>
              <Link to="/contact" className="btn btn-outline-light" style={{ marginTop: "24px" }}>Discuss a Custom Program
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div className="photo-frame reveal" style={{ aspectRatio: "4/3", borderColor: "rgba(23,20,15,0.1)" }}>
              <img src="/assets/img-training.jpg" alt="Altiora facilitator designing a bespoke training program" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
