import { useEffect, useMemo, useState } from 'react';
import { deleteEnquiry, listEnquiries, setEnquiryStatus } from '../../api/admin';
import AdminModal from '../../components/admin/AdminModal';
import { fmtDate, StatusBadge } from './AdminDashboard';

const STATUSES = ['new', 'contacted', 'closed'];

export default function AdminEnquiries() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    listEnquiries().then(setRows).catch((e) => setError(e.message));
  }, []);

  const counts = useMemo(() => {
    const c = { all: rows?.length || 0, new: 0, contacted: 0, closed: 0 };
    rows?.forEach((r) => { c[r.status || 'new'] += 1; });
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows || []).filter((r) => {
      if (filter !== 'all' && (r.status || 'new') !== filter) return false;
      if (!q) return true;
      return [r.name, r.email, r.company, r.phone, r.service, r.subject, r.message].some((v) => (v || '').toLowerCase().includes(q));
    });
  }, [rows, filter, query]);

  const changeStatus = async (row, status) => {
    try {
      const updated = await setEnquiryStatus(row._id, status);
      setRows((rs) => rs.map((r) => (r._id === row._id ? updated : r)));
      setSelected((s) => (s && s._id === row._id ? updated : s));
    } catch (e) { setError(e.message); }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete the enquiry from ${row.name}? This cannot be undone.`)) return;
    try {
      await deleteEnquiry(row._id);
      setRows((rs) => rs.filter((r) => r._id !== row._id));
      setSelected(null);
    } catch (e) { setError(e.message); }
  };

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Inbox</span>
          <h1>Enquiries</h1>
        </div>
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <div className="adm-toolbar">
        <div className="adm-tabs">
          {['all', ...STATUSES].map((s) => (
            <button key={s} type="button" className={'adm-tab' + (filter === s ? ' active' : '')} onClick={() => setFilter(s)}>
              {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)} <span>{counts[s]}</span>
            </button>
          ))}
        </div>
        <input type="search" className="adm-search" placeholder="Search name, email, company, message…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="adm-card adm-table-wrap">
        {!rows ? (
          <div className="adm-loading">Loading…</div>
        ) : visible.length === 0 ? (
          <p className="adm-empty">{rows.length ? 'No enquiries match your filters.' : 'No enquiries yet — they will appear here when someone submits a form on the website.'}</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Received</th><th>Name</th><th>Contact</th><th>Interest</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r._id} className={(r.status || 'new') === 'new' ? 'is-new' : ''}>
                  <td className="nowrap">{fmtDate(r.createdAt)}</td>
                  <td><strong>{r.name}</strong>{r.company && <small>{r.company}</small>}</td>
                  <td><span>{r.email}</span><small>{r.phone}</small></td>
                  <td>{r.service || r.subject || <em className="adm-muted">Consultation</em>}</td>
                  <td>
                    <select className="adm-select" value={r.status || 'new'} onChange={(e) => changeStatus(r, e.target.value)} aria-label="Status">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="adm-actions">
                    <button type="button" className="adm-btn-sm" onClick={() => setSelected(r)}>View</button>
                    <button type="button" className="adm-btn-sm danger" onClick={() => remove(r)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <AdminModal title="Enquiry details" onClose={() => setSelected(null)}>
          <dl className="adm-dl">
            <dt>Received</dt><dd>{fmtDate(selected.createdAt)} · via {selected.source === 'consultation' ? 'consultation popup' : 'contact form'}</dd>
            <dt>Name</dt><dd>{selected.name}</dd>
            {selected.company && (<><dt>Company</dt><dd>{selected.company}</dd></>)}
            <dt>Email</dt><dd><a className="adm-link" href={'mailto:' + selected.email}>{selected.email}</a></dd>
            <dt>Phone</dt><dd><a className="adm-link" href={'tel:' + selected.phone}>{selected.phone}</a></dd>
            {selected.service && (<><dt>Service</dt><dd>{selected.service}</dd></>)}
            {selected.subject && (<><dt>Subject</dt><dd>{selected.subject}</dd></>)}
            <dt>Message</dt><dd className="adm-message">{selected.message}</dd>
            <dt>Status</dt><dd><StatusBadge status={selected.status} /></dd>
          </dl>
          <div className="adm-modal-foot">
            <div className="adm-btn-row">
              {STATUSES.map((s) => (
                <button key={s} type="button" className={'adm-btn-sm' + ((selected.status || 'new') === s ? ' active' : '')} onClick={() => changeStatus(selected, s)}>
                  Mark {s}
                </button>
              ))}
            </div>
            <div className="adm-btn-row">
              <a className="btn btn-gold" href={'mailto:' + selected.email + '?subject=' + encodeURIComponent('Re: your enquiry to Altiora Business Advisory')}>Reply by email</a>
              <button type="button" className="adm-btn-sm danger" onClick={() => remove(selected)}>Delete</button>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}
