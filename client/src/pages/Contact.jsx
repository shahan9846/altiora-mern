import { Link } from 'react-router-dom';
import { usePage, useSite } from '../context/ContentContext';
import EnquiryForm from '../components/EnquiryForm';

const ICON = (paths) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{paths}</svg>;

const SOCIAL = [
  { key: 'linkedin', label: 'Altiora on LinkedIn', icon: <path d="M6.5 9v9M6.5 6.2v.01M11 18V9m0 4c0-2.5 1.6-4 3.8-4S18 10.5 18 13v5" /> },
  { key: 'instagram', label: 'Altiora on Instagram', icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></> },
  { key: 'facebook', label: 'Altiora on Facebook', icon: <path d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3h2v6.5h3V14h2.4l.6-3H13V9c0-.8.2-1.5 1-1.5Z" /> },
];

export default function Contact() {
  const c = usePage('contact');
  const { phone, email, address, whatsappUrl, social, mapSrc } = useSite();

  return (
    <>
      <section className="page-banner page-banner-img">
        <div className="page-banner-bg"><img src="/assets/img-contact.jpg" alt="" /></div>
        <div className="container">
          <h1>{c('banner.title')}</h1>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Contact</span>
          </nav>
        </div>
      </section>

      <section className="section-off" style={{ paddingTop: '56px' }}>
        <div className="container">
          {/* heading and text across the full width, then the contact details and the form side by side below it */}
          <div className="contact-intro reveal">
            <span className="eyebrow">{c('intro.eyebrow')}</span>
            <h2 style={{ marginTop: '14px' }}>{c('intro.title')}</h2>
            <p className="lede" style={{ marginTop: '14px' }}>{c('intro.text')}</p>
          </div>
          <div className="grid-2" style={{ alignItems: 'flex-start', marginTop: '40px' }}>
            <div>
              <div className="contact-box-grid">
                <div className="contact-box reveal">
                  <div className="icon">{ICON(<><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></>)}</div>
                  <div>
                    <h4>{c('visit.title')}</h4>
                    <p>{address}</p>
                  </div>
                </div>
                <div className="contact-box reveal">
                  <div className="icon">{ICON(<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3.3a1 1 0 0 1-.5 1.1l-1.6.9a12 12 0 0 0 6.6 6.6l.9-1.6a1 1 0 0 1 1.1-.5l3.3.7a1 1 0 0 1 .8 1v2.2A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5Z" />)}</div>
                  <div>
                    <h4>{c('call.title')}</h4>
                    <p>{phone}</p>
                  </div>
                </div>
                <div className="contact-box reveal">
                  <div className="icon">{ICON(<><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" /><path d="m4.5 6.5 7.5 6 7.5-6" /></>)}</div>
                  <div>
                    <h4>{c('email.title')}</h4>
                    <p>{email}</p>
                  </div>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}>
                {ICON(<><path d="M6 18.5 6.9 15A7.5 7.5 0 1 1 9.8 17.6L6 18.5Z" /><path d="M9.3 9.7c0 2.9 2.4 5.3 5.3 5.3" /></>)}
                {c('whatsapp.button')}
              </a>
              <div className="footer-social" style={{ marginTop: '22px' }}>
                {SOCIAL.filter((s) => social[s.key]).map((s) => (
                  <a key={s.key} href={social[s.key]} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{ICON(s.icon)}</a>
                ))}
              </div>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="section-white" style={{ padding: '0' }}>
        <iframe className="map-frame" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Altiora Business Advisory location — ${address}`}></iframe>
      </section>
    </>
  );
}
