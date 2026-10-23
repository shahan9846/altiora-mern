import { useToast } from '../../components/admin/ToastProvider';
import { useConfirm } from '../../components/admin/ConfirmProvider';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCategory, deleteCategory, listCategories, updateCategory } from '../../api/admin';
import AdminModal from '../../components/admin/AdminModal';

const EMPTY = { name: '', description: '', order: '' };

export default function AdminCategories() {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | { id?: string, form }
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => listCategories().then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const open = (c) => {
    setFormError(''); setFieldErrors({});
    setEditing(c
      ? { id: c._id, form: { name: c.name, description: c.description || '', order: String(c.order ?? '') } }
      : { form: { ...EMPTY } });
  };
  const setField = (name) => (e) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: e.target.value } }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setFormError(''); setFieldErrors({});
    try {
      const { name, description, order } = editing.form;
      const payload = { name, description, ...(order !== '' ? { order: Number(order) } : {}) };
      if (editing.id) await updateCategory(editing.id, payload);
      else await createCategory(payload);
      toast(editing.id ? 'Category updated' : 'Category added');
      setEditing(null);
      await load();
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    setError('');
    if (!(await confirm({ title: 'Delete this category?', message: `The category "${c.name}" will be removed.`, confirmLabel: 'Delete', danger: true }))) return;
    try {
      await deleteCategory(c._id);
      toast('Category deleted');
      setRows((rs) => rs.filter((r) => r._id !== c._id));
    } catch (e) { setError(e.message); }
  };

  const f = editing?.form;
  const FieldErr = ({ name }) => (fieldErrors[name] ? <span className="adm-err">{fieldErrors[name][0]}</span> : null);

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Website content</span>
          <h1>Program Categories</h1>
          <p className="adm-head-text">Categories group your training programs and become the filter buttons on the Training page.</p>
        </div>
      </div>

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => open(null)}>Add category</button>
      </div>


      {error && <div className="adm-alert" role="alert">{error}</div>}

      <div className="adm-card adm-table-wrap">
        {!rows ? (
          <div className="adm-loading">Loading…</div>
        ) : rows.length === 0 ? (
          <p className="adm-empty">No categories yet. Click “Add category” to create the first one.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Order</th><th>Category</th><th>Programs</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c._id}>
                  <td className="nowrap">{c.order}</td>
                  <td><strong>{c.name}</strong>{c.description && <small>{c.description}</small>}</td>
                  <td className="nowrap">{c.programCount}</td>
                  <td className="adm-actions">
                    <button type="button" className="adm-btn-sm" onClick={() => open(c)}>Edit</button>
                    <button type="button" className="adm-btn-sm danger" onClick={() => remove(c)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <AdminModal title={editing.id ? 'Edit category' : 'Add category'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="adm-form single">
            <div className="adm-field">
              <label htmlFor="c-name">Name *</label>
              <input id="c-name" value={f.name} onChange={setField('name')} required maxLength={120} />
              <FieldErr name="name" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-desc">Description <small>(shown on the Training page)</small></label>
              <textarea id="c-desc" rows="4" value={f.description} onChange={setField('description')} maxLength={600} />
              <FieldErr name="description" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-order">Display order <small>(lowest first{editing.id ? '' : '; leave empty to add at the end'})</small></label>
              <input id="c-order" type="number" min="0" max="9999" value={f.order} onChange={setField('order')} />
              <FieldErr name="order" />
            </div>
            {formError && <div className="adm-alert" role="alert">{formError}</div>}
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? 'Saving…' : 'Save category'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
