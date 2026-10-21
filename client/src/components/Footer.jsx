import { Link } from 'react-router-dom';
import Brand from './Brand';
import { NAV_LINKS } from './Header';
import { WHATSAPP_URL } from '../config';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>A business advisory firm helping organizations build capability, develop people and drive sustainable growth through practical, tailored learning solutions.</p>
            <div className="footer-social">
              <a href="#" aria-label="Altiora on LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6.5 9v9M6.5 6.2v.01M11 18V9m0 4c0-2.5 1.6-4 3.8-4S18 10.5 18 13v5" /></svg></a>
              <a href="#" aria-label="Altiora on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" aria-label="Altiora on Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3h2v6.5h3V14h2.4l.6-3H13V9c0-.8.2-1.5 1-1.5Z" /></svg></a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Altiora on WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 18.5 6.9 15A7.5 7.5 0 1 1 9.8 17.6L6 18.5Z" /><path d="M9.3 9.7c0 2.9 2.4 5.3 5.3 5.3" /></svg></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3.3a1 1 0 0 1-.5 1.1l-1.6.9a12 12 0 0 0 6.6 6.6l.9-1.6a1 1 0 0 1 1.1-.5l3.3.7a1 1 0 0 1 .8 1v2.2A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5Z" /></svg><span>+974 XXXX XXXX</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" /><path d="m4.5 6.5 7.5 6 7.5-6" /></svg><span>info@altiorabusinessadvisory.com</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg><span>Doha, Qatar</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Altiora Business Advisory. All Rights Reserved.</span>
          <span><a href="#">Privacy &amp; Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
