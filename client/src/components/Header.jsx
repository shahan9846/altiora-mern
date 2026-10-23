import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { useConsult } from '../context/ConsultContext';
import { useSite, usePaths } from '../context/ContentContext';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', end: true },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'training', label: 'Training' },
  { key: 'why', label: 'Why Us' },
  { key: 'career', label: 'Career' },
  { key: 'contact', label: 'Contact' },
];

// The menu entries with their current web addresses (used by the header and the footer)
export function useNavLinks() {
  const path = usePaths();
  return NAV_ITEMS.map((l) => ({ ...l, to: path(l.key) }));
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openConsult } = useConsult();
  const { c } = useSite();
  const navLinks = useNavLinks();
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
            {navLinks.map((l) => (
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
              <a href="#" className="btn btn-gold" onClick={consult}>{c('headerCta')}</a>
            </li>
          </ul>
          <div className="header-cta">
            <a href="#" className="btn btn-gold" onClick={consult}>{c('headerCta')}</a>
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
