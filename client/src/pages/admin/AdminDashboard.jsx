import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../../api/admin';

export const fmtDate = (d) =>
  new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export function StatusBadge({ status }) {
  return <span className={'adm-badge ' + (status || 'new')}>{status || 'new'}</span>;
}

function StatCard({ label, value, hint }) {
  return (
    <div className="adm-card adm-stat">
      <span className="adm-stat-label">{label}</span>
      <strong>{value}</strong>
      {hint && <span className="adm-stat-hint">{hint}</span>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!stats) return <div className="adm-loading">Loading…</div>;

  const { enquiries: e, programs: p, recent } = stats;
  const max = Math.max(1, ...p.byCategory.map((c) => c.count));

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Overview</span>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="adm-stats">
        <StatCard label="New enquiries" value={e.new} hint="Waiting for a reply" />
        <StatCard label="Last 7 days" value={e.lastWeek} hint="Enquiries received" />
        <StatCard label="All enquiries" value={e.total} hint={`${e.contacted} contacted · ${e.closed} closed`} />
        <StatCard label="Training programs" value={p.total} hint={`${p.byCategory.length} categories`} />
      </div>

      <div className="adm-grid-2">
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
                  <div>
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

        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Programs by category</h2>
            <Link to="/admin/programs" className="adm-link">Manage</Link>
          </div>
          {p.byCategory.length === 0 ? (
            <p className="adm-empty">No programs yet.</p>
          ) : (
            <ul className="adm-bars">
              {p.byCategory.map((c) => (
                <li key={c.category}>
                  <div className="adm-bar-label"><span>{c.category}</span><strong>{c.count}</strong></div>
                  <div className="adm-bar"><span style={{ width: (c.count / max) * 100 + '%' }} /></div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
