import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true, icon: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z' },
  { to: '/admin/enquiries', label: 'Enquiries', icon: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Zm.5 0 7.5 6 7.5-6' },
  { to: '/admin/categories', label: 'Program Categories', icon: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z' },
  { to: '/admin/programs', label: 'Training Programs', icon: 'M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Zm16 0c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); document.title = 'Admin | Altiora Business Advisory'; }, [pathname]);

  return (
    <div className="adm">
      <aside className={'adm-side' + (open ? ' open' : '')}>
        <Link to="/admin" className="adm-brand">
          <img src="/assets/logo-mark.png" alt="" />
          <span><strong>ALTIORA</strong><small>ADMIN</small></span>
        </Link>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'adm-nav' + (isActive ? ' active' : '')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={n.icon} /></svg>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noreferrer" className="adm-nav">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
            View website
          </a>
        </div>
      </aside>
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} />}

      <div className="adm-main">
        <header className="adm-top">
          <button type="button" className="adm-icon-btn adm-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <div className="adm-top-right">
            <span className="adm-user">{user?.email}</span>
            <button type="button" className="btn btn-outline-light adm-logout" onClick={logout}>Sign out</button>
          </div>
        </header>
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
