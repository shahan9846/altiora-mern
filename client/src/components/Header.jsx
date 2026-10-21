import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { useConsult } from '../context/ConsultContext';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/training', label: 'Training' },
  { to: '/why-altiora', label: 'Why Us' },
  { to: '/career-guidance', label: 'Career Guidance' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openConsult } = useConsult();
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const consult = (e) => { e.preventDefault(); setOpen(false); openConsult(); };

  return (
    <header className="site-header">
      <div className="container">
        <Brand />
        <nav className="nav-primary" aria-label="Primary">
          <ul className={'nav-links' + (open ? ' open' : '')} id="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => (isActive && !l.noActive ? 'active' : '')}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mobile-cta">
              <a href="#" className="btn btn-gold" onClick={consult}>Request a Consultation</a>
            </li>
          </ul>
          <div className="header-cta">
            <a href="#" className="btn btn-gold" onClick={consult}>Request a Consultation</a>
            <button
              type="button"
              className="nav-toggle"
              id="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
