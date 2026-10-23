import { useToast } from '../../components/admin/ToastProvider';
import { useConfirm } from '../../components/admin/ConfirmProvider';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProgram, deleteProgram, listCategories, listPrograms, updateProgram } from '../../api/admin';
import AdminModal from '../../components/admin/AdminModal';

const EMPTY = { category: '', title: '', description: '', outcomesText: '' };

const toForm = (p) => ({ ...p, category: p.category?._id || '', outcomesText: (p.outcomes || []).join('\n') });
const toPayload = (f) => ({
  category: f.category,
  title: f.title,
  description: f.description,
  outcomes: f.outcomesText.split('\n').map((s) => s.trim()).filter(Boolean),
});

export default function AdminPrograms() {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null | { id?: string, form }
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([listPrograms(), listCategories()])
      .then(([programs, cats]) => { setRows(programs); setCategories(cats); })
      .catch((e) => setError(e.message));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows || []).filter((r) =>
      (category === 'all' || r.category?._id === category) &&
      (!q || [r.title, r.description, r.category?.name || ''].some((v) => v.toLowerCase().includes(q))));
  }, [rows, category, query]);

  const open = (p) => {
    setFormError(''); setFieldErrors({});
    setEditing(p ? { id: p._id, form: toForm(p) } : { form: { ...EMPTY } });
  };
  const setField = (name) => (e) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: e.target.value } }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setFormError(''); setFieldErrors({});
    try {
      const payload = toPayload(editing.form);
      if (editing.id) {
        const updated = await updateProgram(editing.id, payload);
        setRows((rs) => rs.map((r) => (r._id === editing.id ? updated : r)));
      } else {
        const created = await createProgram(payload);
        setRows((rs) => [...rs, created]);
      }
      toast(editing.id ? 'Program updated' : 'Program added', 'It is now on the Training page.');
      setEditing(null);
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!(await confirm({ title: 'Delete this program?', message: `"${p.title}" will disappear from the website.`, confirmLabel: 'Delete', danger: true }))) return;
    try {
      await deleteProgram(p._id);
      toast('Program deleted');
      setRows((rs) => rs.filter((r) => r._id !== p._id));
    } catch (e) { setError(e.message); }
  };

  const f = editing?.form;
  const FieldErr = ({ name }) => (fieldErrors[name] ? <span className="adm-err">{fieldErrors[name][0]}</span> : null);

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Website content</span>
          <h1>Training Programs</h1>
          <p className="adm-head-text">The programs listed on the Training page. Choose a category for each one.</p>
        </div>
      </div>

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => open(null)}>Add program</button>
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <div className="adm-toolbar">
        <select className="adm-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type="search" className="adm-search" placeholder="Search programs…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="adm-card adm-table-wrap">
        {!rows ? (
          <div className="adm-loading">Loading…</div>
        ) : visible.length === 0 ? (
          <p className="adm-empty">{rows.length ? 'No programs match your filters.' : 'No programs yet. Click “Add program” to create the first one.'}</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p._id}>
                  <td><strong>{p.title}</strong><small>{p.description}</small></td>
                  <td>{p.category?.name || <em className="adm-muted">None</em>}</td>
                  <td className="adm-actions">
                    <button type="button" className="adm-btn-sm" onClick={() => open(p)}>Edit</button>
                    <button type="button" className="adm-btn-sm danger" onClick={() => remove(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <AdminModal title={editing.id ? 'Edit program' : 'Add program'} onClose={() => setEditing(null)} wide>
          <form onSubmit={save} className="adm-form">
            <div className="adm-field">
              <label htmlFor="p-title">Title *</label>
              <input id="p-title" value={f.title} onChange={setField('title')} required />
              <FieldErr name="title" />
            </div>
            <div className="adm-field">
              <label htmlFor="p-category">Category *</label>
              <select id="p-category" className="adm-select" value={f.category} onChange={setField('category')} required>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <small className="adm-hint">Need a new one? <Link to="/admin/categories" className="adm-link">Manage categories</Link></small>
              <FieldErr name="category" />
            </div>
            <div className="adm-field full">
              <label htmlFor="p-desc">Description *</label>
              <textarea id="p-desc" rows="3" value={f.description} onChange={setField('description')} required />
              <FieldErr name="description" />
            </div>
            <div className="adm-field full">
              <label htmlFor="p-out">Learning outcomes <small>(one per line; the first 3 show on the website)</small></label>
              <textarea id="p-out" rows="4" value={f.outcomesText} onChange={setField('outcomesText')} />
              <FieldErr name="outcomes" />
            </div>
            {formError && <div className="adm-alert full" role="alert">{formError}</div>}
            <div className="adm-modal-foot full">
              <button type="button" className="adm-btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? 'Saving…' : 'Save program'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
