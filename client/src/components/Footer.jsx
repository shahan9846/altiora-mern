import { Link } from 'react-router-dom';
import Brand from './Brand';
import { useNavLinks } from './Header';
import { useSite } from '../context/ContentContext';
import { FOOTER } from '../content/siteContent';
import { brandIcons } from './icons';

// The social buttons (the real logos are in components/icons.jsx, their colours in style.css)
const SOCIAL = [
  { key: 'linkedin', label: 'Altiora on LinkedIn' },
  { key: 'instagram', label: 'Altiora on Instagram' },
  { key: 'facebook', label: 'Altiora on Facebook' },
  { key: 'x', label: 'Altiora on X' },
  { key: 'tiktok', label: 'Altiora on TikTok' },
];

export default function Footer() {
  const { phone, email, address, whatsappUrl, social } = useSite();
  const navLinks = useNavLinks();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>{FOOTER.description}</p>
            <p className="footer-tagline">{FOOTER.tagline}</p>
            <div className="footer-social">
              {/* a social icon only shows once its address is filled in under Dashboard → Pages → Site settings */}
              {SOCIAL.filter((s) => social[s.key]).map((s) => (
                <a key={s.key} href={social[s.key]} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={'social-' + s.key}>
                  {brandIcons[s.key]}
                </a>
              ))}
              {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Altiora on WhatsApp" className="social-whatsapp">{brandIcons.whatsapp}</a>}
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-contact">
              {phone && <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3.3a1 1 0 0 1-.5 1.1l-1.6.9a12 12 0 0 0 6.6 6.6l.9-1.6a1 1 0 0 1 1.1-.5l3.3.7a1 1 0 0 1 .8 1v2.2A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5Z" /></svg><span>{phone}</span></li>}
              {email && <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" /><path d="m4.5 6.5 7.5 6 7.5-6" /></svg><span>{email}</span></li>}
              {address && <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg><span>{address}</span></li>}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {FOOTER.company}. All Rights Reserved.</span>
          <span><a href="#">Privacy &amp; Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
