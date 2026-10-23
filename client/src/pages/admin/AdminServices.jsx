import { useToast } from '../../components/admin/ToastProvider';
import { useConfirm } from '../../components/admin/ConfirmProvider';
import { useEffect, useRef, useState } from 'react';
import { createService, deleteService, listServices, updateService, uploadImage } from '../../api/admin';
import { imageUrl } from '../../api/client';
import AdminModal from '../../components/admin/AdminModal';
import { firstParagraph } from '../../components/ServiceCard';

const MAX_MB = 5;
const EMPTY = { title: '', description: '', image: '', imageAlt: '', order: '', seoTitle: '', seoDescription: '' };

const toForm = (s) => ({
  title: s.title, description: s.description, image: s.image, imageAlt: s.imageAlt || '', order: String(s.order ?? ''),
  seoTitle: s.seoTitle || '', seoDescription: s.seoDescription || '',
});
const toPayload = (f) => ({
  title: f.title, description: f.description, image: f.image, imageAlt: f.imageAlt,
  seoTitle: f.seoTitle, seoDescription: f.seoDescription,
  ...(f.order !== '' ? { order: Number(f.order) } : {}),
});

export default function AdminServices() {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | { id?: string, slug?: string, form }
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);

  const load = () => listServices().then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const open = (s) => {
    setFormError(''); setFieldErrors({});
    setEditing(s ? { id: s._id, slug: s.slug, form: toForm(s) } : { form: { ...EMPTY } });
  };
  const setField = (name) => (e) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: e.target.value } }));
  const setValue = (name, value) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: value } }));

  // Upload as soon as a photo is chosen; the form then holds its address
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // lets the same file be chosen again
    if (!file) return;
    setFieldErrors((fe) => ({ ...fe, image: undefined }));
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setFieldErrors((fe) => ({ ...fe, image: ['Please choose a JPG, PNG or WebP photo.'] }));
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setFieldErrors((fe) => ({ ...fe, image: [`That photo is too large (maximum ${MAX_MB} MB).`] }));
      return;
    }
    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      setValue('image', url);
    } catch (err) {
      setFieldErrors((fe) => ({ ...fe, image: [err.message] }));
    } finally {
      setUploading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!editing.form.image) {
      setFieldErrors({ image: ['Please upload an image.'] });
      return;
    }
    setSaving(true); setFormError(''); setFieldErrors({});
    try {
      const payload = toPayload(editing.form);
      if (editing.id) await updateService(editing.id, payload);
      else await createService(payload);
      toast(editing.id ? 'Service updated' : 'Service added', 'It is now on the website.');
      setEditing(null);
      await load();
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    setError('');
    if (!(await confirm({ title: 'Delete this service?', message: `"${s.title}" will disappear from the website.`, confirmLabel: 'Delete', danger: true }))) return;
    try {
      await deleteService(s._id);
      toast('Service deleted');
      setRows((rs) => rs.filter((r) => r._id !== s._id));
    } catch (e) { setError(e.message); }
  };

  const f = editing?.form;
  const FieldErr = ({ name }) => (fieldErrors[name] ? <span className="adm-err">{fieldErrors[name][0]}</span> : null);

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Website content</span>
          <h1>Services</h1>
          <p className="adm-head-text">The services shown on the home page, the Services page and their own pages. Add a title, a description and a photo.</p>
        </div>
      </div>

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => open(null)}>Add service</button>
      </div>

     

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <div className="adm-card adm-table-wrap">
        {!rows ? (
          <div className="adm-loading">Loading…</div>
        ) : rows.length === 0 ? (
          <p className="adm-empty">No services yet. Click “Add service” to create the first one.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Order</th><th></th><th>Service</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s._id}>
                  <td className="nowrap">{s.order}</td>
                  <td style={{ width: 84 }}><img className="adm-thumb" src={imageUrl(s.image)} alt="" /></td>
                  <td><strong>{s.title}</strong><small>{firstParagraph(s.description)}</small></td>
                  <td className="adm-actions">
                    <button type="button" className="adm-btn-sm" onClick={() => open(s)}>Edit</button>
                    <button type="button" className="adm-btn-sm danger" onClick={() => remove(s)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <AdminModal title={editing.id ? 'Edit service' : 'Add service'} onClose={() => setEditing(null)} wide>
          <form onSubmit={save} className="adm-form">
            <div className="adm-field full">
              <label htmlFor="s-title">Title *</label>
              <input id="s-title" value={f.title} onChange={setField('title')} required maxLength={120} />
              <FieldErr name="title" />
            </div>
            <div className="adm-field full">
              <label htmlFor="s-desc">Description * <small>(a blank line starts a new paragraph; the cards show the first paragraph)</small></label>
              <textarea id="s-desc" rows="7" value={f.description} onChange={setField('description')} required maxLength={1200} />
              <FieldErr name="description" />
            </div>

            <div className="adm-field full">
              <label>Image * <small>(shown on the cards and the service page)</small></label>
              <div className="adm-upload">
                <div className="adm-upload-preview">
                  {f.image ? <img src={imageUrl(f.image)} alt="Selected" /> : <span>No image yet</span>}
                </div>
                <div className="adm-upload-side">
                  <input ref={fileInput} id="s-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} hidden />
                  <button type="button" className="adm-btn-sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading…' : f.image ? 'Change image' : 'Choose image'}
                  </button>
                  <small className="adm-hint">JPG, PNG or WebP, up to {MAX_MB} MB. It is resized automatically.</small>
                </div>
              </div>
              <FieldErr name="image" />
            </div>

            <div className="adm-field full">
              <label htmlFor="s-alt">Image alt text <small>(describes the picture for screen readers and search engines; empty = the title is used)</small></label>
              <input id="s-alt" value={f.imageAlt} onChange={setField('imageAlt')} maxLength={160} placeholder="For example: Facilitator leading a leadership workshop" />
              <FieldErr name="imageAlt" />
            </div>

            <div className="adm-field">
              <label htmlFor="s-order">Display order <small>(lowest first{editing.id ? '' : '; empty = add at the end'})</small></label>
              <input id="s-order" type="number" min="0" max="9999" value={f.order} onChange={setField('order')} />
              <FieldErr name="order" />
            </div>

            <div className="adm-field full adm-seo-box">
              <label>Search engine details <small>(optional; if empty, the service title and first paragraph are used)</small></label>
              <input aria-label="SEO title" placeholder="SEO title (about 50 to 60 characters)" value={f.seoTitle} onChange={setField('seoTitle')} maxLength={120} />
              <textarea aria-label="SEO description" rows="2" placeholder="Meta description (about 150 to 160 characters)" value={f.seoDescription} onChange={setField('seoDescription')} maxLength={320} />
              <FieldErr name="seoTitle" />
              <FieldErr name="seoDescription" />
            </div>

            {formError && <div className="adm-alert full" role="alert">{formError}</div>}
            <div className="adm-modal-foot full">
              <button type="button" className="adm-btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={saving || uploading}>{saving ? 'Saving…' : 'Save service'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
