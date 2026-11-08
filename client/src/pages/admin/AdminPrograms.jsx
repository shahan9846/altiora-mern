import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProgram, deleteProgram, listCategories, listPrograms, updateProgram } from '../../api/admin';
import useAdminCrud from '../../hooks/useAdminCrud';
import AdminPageHead from '../../components/admin/AdminPageHead';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FieldError from '../../components/admin/FieldError';

// Dashboard -> Training -> Training Programs: the programs listed on the Training page.
// The list, the add/edit popup and the delete box come from useAdminCrud; this page adds a category filter and a search.
const toForm = (p) => ({ ...p, category: p.category?._id || '', outcomesText: (p.outcomes || []).join('\n') });
const toPayload = (f) => ({
  category: f.category,
  title: f.title,
  description: f.description,
  outcomes: f.outcomesText.split('\n').map((s) => s.trim()).filter(Boolean), // one outcome per line
});

export default function AdminPrograms() {
  const [categories, setCategories] = useState([]); // for the filter and the category dropdown
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const crud = useAdminCrud({
    // the programs and the categories are loaded together
    list: () => Promise.all([listPrograms(), listCategories()]).then(([programs, cats]) => { setCategories(cats); return programs; }),
    create: createProgram, update: updateProgram, remove: deleteProgram,
    emptyForm: { category: '', title: '', description: '', outcomesText: '' },
    toForm, toPayload,
    mergeSaved: true,
    messages: { added: 'Program added', updated: 'Program updated', deleted: 'Program deleted', savedText: 'It is now on the Training page.' },
    confirmDelete: (p) => ({ title: 'Delete this program?', message: `"${p.title}" will disappear from the website.` }),
  });
  const { rows, editing, fieldErrors } = crud;
  const form = editing?.form;

  // the programs that match the category filter and the search box
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows || []).filter((r) =>
      (categoryFilter === 'all' || r.category?._id === categoryFilter) &&
      (!q || [r.title, r.description, r.category?.name || ''].some((v) => v.toLowerCase().includes(q))));
  }, [rows, categoryFilter, query]);

  return (
    <>
      <AdminPageHead
        eyebrow="Website content"
        title="Training Programs"
        text="The programs listed on the Training page. Choose a category for each one."
      />

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => crud.open(null)}>Add program</button>
      </div>

      {crud.error && <div className="adm-alert" role="alert">{crud.error}</div>}

      <div className="adm-toolbar">
        <select className="adm-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type="search" className="adm-search" placeholder="Search programs…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <AdminTable
        rows={rows}
        items={visible}
        columns={['Title', 'Category', '']}
        empty={rows?.length ? 'No programs match your filters.' : 'No programs yet. Click “Add program” to create the first one.'}
        renderRow={(p) => (
          <tr key={p._id}>
            <td><strong>{p.title}</strong><small>{p.description}</small></td>
            <td>{p.category?.name || <em className="adm-muted">None</em>}</td>
            <td className="adm-actions">
              <button type="button" className="adm-btn-sm" onClick={() => crud.open(p)}>Edit</button>
              <button type="button" className="adm-btn-sm danger" onClick={() => crud.remove(p)}>Delete</button>
            </td>
          </tr>
        )}
      />

      {editing && (
        <AdminModal title={editing.id ? 'Edit program' : 'Add program'} onClose={crud.close} wide>
          <form onSubmit={crud.save} className="adm-form">
            <div className="adm-field">
              <label htmlFor="p-title">Title *</label>
              <input id="p-title" value={form.title} onChange={crud.setField('title')} required />
              <FieldError errors={fieldErrors} name="title" />
            </div>
            <div className="adm-field">
              <label htmlFor="p-category">Category *</label>
              <select id="p-category" className="adm-select" value={form.category} onChange={crud.setField('category')} required>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
              <small className="adm-hint">Need a new one? <Link to="/admin/categories" className="adm-link">Manage categories</Link></small>
              <FieldError errors={fieldErrors} name="category" />
            </div>
            <div className="adm-field full">
              <label htmlFor="p-desc">Description *</label>
              <textarea id="p-desc" rows="3" value={form.description} onChange={crud.setField('description')} required />
              <FieldError errors={fieldErrors} name="description" />
            </div>
            <div className="adm-field full">
              <label htmlFor="p-out">Learning outcomes <small>(one per line; the first 3 show on the website)</small></label>
              <textarea id="p-out" rows="4" value={form.outcomesText} onChange={crud.setField('outcomesText')} />
              <FieldError errors={fieldErrors} name="outcomes" />
            </div>
            {crud.formError && <div className="adm-alert full" role="alert">{crud.formError}</div>}
            <div className="adm-modal-foot full">
              <button type="button" className="adm-btn-sm" onClick={crud.close}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={crud.saving}>{crud.saving ? 'Saving…' : 'Save program'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
