import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../../api/admin';
import { fmtDate, StatusBadge } from '../../components/admin/adminFormat';

const I = (d) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const ICONS = {
  mail: I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>),
  box: I(<path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5" />),
  compass: I(<><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>),
  book: I(<path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Zm16 0c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />),
};

function StatCard({ label, value, hint, icon, to, accent }) {
  return (
    <Link to={to} className={'adm-card adm-stat' + (accent ? ' accent' : '')}>
      <span className="adm-stat-icon">{ICONS[icon]}</span>
      <div className="adm-stat-body">
        <span className="adm-stat-label">{label}</span>
        <strong>{value}</strong>
        {hint && <span className="adm-stat-hint">{hint}</span>}
      </div>
    </Link>
  );
}

const initials = (n = '') => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!stats) return <div className="adm-loading">Loading…</div>;

  const { enquiries: e, programs: p, services, careerCards, recent } = stats;

  return (
    <div className="adm-dash">
      <div className="adm-dash-head">
        <div>
          <h1>Dashboard</h1>
          <p>Here is what needs your attention today.</p>
        </div>
        <Link to="/" target="_blank" className="adm-view-site">View website ↗</Link>
      </div>

      <div className="adm-stats">
        <StatCard accent to="/admin/enquiries" icon="mail" label="Total enquiries" value={e.total} hint={`${e.new} new · ${e.contacted} contacted · ${e.closed} closed`} />
        <StatCard to="/admin/services" icon="box" label="Services" value={services} hint="Shown on the website" />
        <StatCard to="/admin/career" icon="compass" label="Career guidance" value={careerCards} hint="Support cards" />
        <StatCard to="/admin/programs" icon="book" label="Training programs" value={p.total} hint={`${p.byCategory.length} categories`} />
      </div>

      <section className="adm-card">
        <div className="adm-card-head">
          <h2>Recent enquiries</h2>
          <Link to="/admin/enquiries" className="adm-link">View all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="adm-empty">No enquiries yet.</p>
        ) : (
          <ul className="adm-list">
            {recent.map((r) => (
              <li key={r._id}>
                <span className="adm-avatar">{initials(r.name)}</span>
                <div className="adm-list-main">
                  <strong>{r.name}</strong>
                  <span>{r.subject || r.service || r.message.slice(0, 60)}</span>
                </div>
                <div className="adm-list-right">
                  <StatusBadge status={r.status} />
                  <small>{fmtDate(r.createdAt)}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
