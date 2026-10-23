import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNoIndex } from '../../content/seo';
import { PAGES, PAGE_ORDER } from '../../content/schema';
import { ConfirmProvider, useConfirm } from './ConfirmProvider';
import { ToastProvider } from './ToastProvider';

const ICON = {
  dash: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z',
  pages: 'M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h6',
  seo: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 4.5 4.5',
  mail: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Zm.5 0 7.5 6 7.5-6',
  box: 'M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-2 5-5 2 2-5 5-2Z',
  bell: 'M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9Zm4 9.5a2 2 0 0 0 4 0',
  book: 'M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Zm16 0c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z',
};

// A menu entry is either a link or a group (a heading that opens a list of links)
const NAV = [
  { to: '/admin', label: 'Dashboard', end: true, icon: ICON.dash },
  {
    id: 'pages', label: 'Pages', icon: ICON.pages, prefix: ['/admin/pages'],
    items: [
      { to: '/admin/pages', label: 'All pages', end: true },
      ...PAGE_ORDER.map((key) => ({ to: `/admin/pages/${key}`, label: PAGES[key].label })),
    ],
  },
  { to: '/admin/seo', label: 'SEO', icon: ICON.seo },
  { to: '/admin/enquiries', label: 'Enquiries', icon: ICON.mail },
  { to: '/admin/services', label: 'Services', icon: ICON.box },
  { to: '/admin/career', label: 'Career Guidance', icon: ICON.compass },
  { to: '/admin/notifications', label: 'Notifications', icon: ICON.bell },
  {
    id: 'training', label: 'Training', icon: ICON.book, prefix: ['/admin/categories', '/admin/programs'],
    items: [
      { to: '/admin/categories', label: 'Categories' },
      { to: '/admin/programs', label: 'Training Programs' },
    ],
  },
];

const inGroup = (group, pathname) => group.prefix.some((p) => pathname === p || pathname.startsWith(p + '/'));

const Icon = ({ d }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={d} /></svg>;

function NavGroup({ group, pathname }) {
  const active = inGroup(group, pathname);
  const [open, setOpen] = useState(active);
  // opening a page from anywhere (a link, the browser Back button) opens its group
  useEffect(() => { if (active) setOpen(true); }, [active]);
  return (
    <div className={'adm-group-nav' + (open ? ' open' : '')}>
      <button type="button" className={'adm-nav adm-group-btn' + (active ? ' has-active' : '')} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon d={group.icon} />
        <span>{group.label}</span>
        <svg className="adm-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="adm-sub">
          {group.items.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) => 'adm-subnav' + (isActive ? ' active' : '')}>{i.label}</NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

const TODAY = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// the dashboard frame; the confirmation box is available to every dashboard page inside it
export default function AdminLayout() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <AdminShell />
      </ConfirmProvider>
    </ToastProvider>
  );
}

function AdminShell() {
  useNoIndex();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const confirm = useConfirm();

  const signOut = async () => {
    if (await confirm({ title: 'Sign out?', message: 'You will need to sign in again to manage the website.', confirmLabel: 'Sign out', icon: 'signout' })) logout();
  };

  useEffect(() => { document.title = 'Admin | Altiora Business Advisory'; }, [pathname]);

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link to="/admin" className="adm-brand">
          <img src="/assets/logo-mark.png" alt="" />
          <span><strong>ALTIORA</strong><small>ADMIN</small></span>
        </Link>
        <nav>
          {NAV.map((n) => n.items ? (
            <NavGroup key={n.id} group={n} pathname={pathname} />
          ) : (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'adm-nav' + (isActive ? ' active' : '')}>
              <Icon d={n.icon} />
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

      <div className="adm-main">
        <header className="adm-top">
          <div className="adm-top-welcome">
            <strong>Welcome back, {user?.name || 'Admin'}</strong>
            <span>{TODAY}</span>
          </div>
          <div className="adm-top-right">
            <span className="adm-user">{user?.email}</span>
            <button type="button" className="btn btn-outline-light adm-logout" onClick={signOut}>Sign out</button>
          </div>
        </header>
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
