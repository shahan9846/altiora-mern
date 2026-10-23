import { useToast } from '../../components/admin/ToastProvider';
import { useConfirm } from '../../components/admin/ConfirmProvider';
import { useEffect, useState } from 'react';
import { createCareerService, deleteCareerService, listCareerServices, updateCareerService } from '../../api/admin';
import AdminModal from '../../components/admin/AdminModal';

const EMPTY = { title: '', description: '', order: '' };

const toForm = (c) => ({ title: c.title, description: c.description, order: String(c.order ?? '') });
const toPayload = (f) => ({
  title: f.title,
  description: f.description,
  ...(f.order !== '' ? { order: Number(f.order) } : {}),
});

export default function AdminCareerServices() {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | { id?: string, form }
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => listCareerServices().then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const open = (c) => {
    setFormError(''); setFieldErrors({});
    setEditing(c ? { id: c._id, form: toForm(c) } : { form: { ...EMPTY } });
  };
  const setField = (name) => (e) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: e.target.value } }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setFormError(''); setFieldErrors({});
    try {
      const payload = toPayload(editing.form);
      if (editing.id) await updateCareerService(editing.id, payload);
      else await createCareerService(payload);
      toast(editing.id ? 'Card updated' : 'Card added', 'It is now on the Career Guidance page.');
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
    if (!(await confirm({ title: 'Delete this card?', message: `"${c.title}" will disappear from the Career Guidance page.`, confirmLabel: 'Delete', danger: true }))) return;
    try {
      await deleteCareerService(c._id);
      toast('Card deleted');
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
          <h1>Career Guidance</h1>
          <p className="adm-head-text">The support cards on the Career Guidance page. Each card has a title and a short description.</p>
        </div>
      </div>

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => open(null)}>Add career service</button>
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <div className="adm-card adm-table-wrap">
        {!rows ? (
          <div className="adm-loading">Loading…</div>
        ) : rows.length === 0 ? (
          <p className="adm-empty">No career services yet. Click “Add career service” to create the first one.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Order</th><th>Career service</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c._id}>
                  <td className="nowrap">{c.order}</td>
                  <td><strong>{c.title}</strong><small>{c.description}</small></td>
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
        <AdminModal title={editing.id ? 'Edit career service' : 'Add career service'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="adm-form single">
            <div className="adm-field">
              <label htmlFor="c-title">Title *</label>
              <input id="c-title" value={f.title} onChange={setField('title')} required maxLength={120} />
              <FieldErr name="title" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-desc">Description * <small>(one or two short sentences)</small></label>
              <textarea id="c-desc" rows="4" value={f.description} onChange={setField('description')} required maxLength={300} />
              <FieldErr name="description" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-order">Display order <small>(lowest first{editing.id ? '' : '; empty = add at the end'})</small></label>
              <input id="c-order" type="number" min="0" max="9999" value={f.order} onChange={setField('order')} />
              <FieldErr name="order" />
            </div>
            {formError && <div className="adm-alert" role="alert">{formError}</div>}
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
