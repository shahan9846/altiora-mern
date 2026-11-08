import { useRef } from 'react';
import { createService, deleteService, listServices, updateService } from '../../api/admin';
import { imageUrl } from '../../api/client';
import useAdminCrud from '../../hooks/useAdminCrud';
import useImageUpload, { MAX_IMAGE_MB } from '../../hooks/useImageUpload';
import AdminPageHead from '../../components/admin/AdminPageHead';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FieldError from '../../components/admin/FieldError';
import { firstParagraph } from '../../components/ServiceCard';

// Dashboard -> Services: the services shown on the home page, the Services page and each service's own page.
// The list, the add/edit popup and the delete box come from useAdminCrud; this page adds the photo upload.
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
  const fileInput = useRef(null);

  const crud = useAdminCrud({
    list: listServices, create: createService, update: updateService, remove: deleteService,
    emptyForm: { title: '', description: '', image: '', imageAlt: '', order: '', seoTitle: '', seoDescription: '' },
    toForm, toPayload,
    validate: (form) => (form.image ? null : { image: ['Please upload an image.'] }),
    messages: { added: 'Service added', updated: 'Service updated', deleted: 'Service deleted', savedText: 'It is now on the website.' },
    confirmDelete: (s) => ({ title: 'Delete this service?', message: `"${s.title}" will disappear from the website.` }),
  });
  const { editing, fieldErrors } = crud;
  const form = editing?.form;

  // The photo is uploaded as soon as it is chosen; the form then holds its web address
  const { uploading, onFile } = useImageUpload({
    noun: 'photo',
    setFieldErrors: crud.setFieldErrors,
    onUploaded: (url) => crud.setValue('image', url),
  });

  return (
    <>
      <AdminPageHead
        eyebrow="Website content"
        title="Services"
        text="The services shown on the home page, the Services page and their own pages. Add a title, a description and a photo."
      />

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => crud.open(null)}>Add service</button>
      </div>

      {crud.error && <div className="adm-alert" role="alert">{crud.error}</div>}

      <AdminTable
        rows={crud.rows}
        columns={['Order', '', 'Service', '']}
        empty="No services yet. Click “Add service” to create the first one."
        renderRow={(s) => (
          <tr key={s._id}>
            <td className="nowrap">{s.order}</td>
            <td className="adm-thumb-cell"><img className="adm-thumb" src={imageUrl(s.image)} alt="" /></td>
            <td><strong>{s.title}</strong><small>{firstParagraph(s.description)}</small></td>
            <td className="adm-actions">
              <button type="button" className="adm-btn-sm" onClick={() => crud.open(s)}>Edit</button>
              <button type="button" className="adm-btn-sm danger" onClick={() => crud.remove(s)}>Delete</button>
            </td>
          </tr>
        )}
      />

      {editing && (
        <AdminModal title={editing.id ? 'Edit service' : 'Add service'} onClose={crud.close} wide>
          <form onSubmit={crud.save} className="adm-form">
            <div className="adm-field full">
              <label htmlFor="s-title">Title *</label>
              <input id="s-title" value={form.title} onChange={crud.setField('title')} required maxLength={120} />
              <FieldError errors={fieldErrors} name="title" />
            </div>
            <div className="adm-field full">
              <label htmlFor="s-desc">Description * <small>(a blank line starts a new paragraph; the cards show the first paragraph)</small></label>
              <textarea id="s-desc" rows="7" value={form.description} onChange={crud.setField('description')} required maxLength={1200} />
              <FieldError errors={fieldErrors} name="description" />
            </div>

            <div className="adm-field full">
              <label>Image * <small>(shown on the cards and the service page)</small></label>
              <div className="adm-upload">
                <div className="adm-upload-preview">
                  {form.image ? <img src={imageUrl(form.image)} alt="Selected" /> : <span>No image yet</span>}
                </div>
                <div className="adm-upload-side">
                  <input ref={fileInput} id="s-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} hidden />
                  <button type="button" className="adm-btn-sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading…' : form.image ? 'Change image' : 'Choose image'}
                  </button>
                  <small className="adm-hint">JPG, PNG or WebP, up to {MAX_IMAGE_MB} MB. It is resized automatically.</small>
                </div>
              </div>
              <FieldError errors={fieldErrors} name="image" />
            </div>

            <div className="adm-field full">
              <label htmlFor="s-alt">Image alt text <small>(describes the picture for screen readers and search engines; empty = the title is used)</small></label>
              <input id="s-alt" value={form.imageAlt} onChange={crud.setField('imageAlt')} maxLength={160} placeholder="For example: Facilitator leading a leadership workshop" />
              <FieldError errors={fieldErrors} name="imageAlt" />
            </div>

            <div className="adm-field">
              <label htmlFor="s-order">Display order <small>(lowest first{editing.id ? '' : '; empty = add at the end'})</small></label>
              <input id="s-order" type="number" min="0" max="9999" value={form.order} onChange={crud.setField('order')} />
              <FieldError errors={fieldErrors} name="order" />
            </div>

            <div className="adm-field full adm-seo-box">
              <label>Search engine details <small>(optional; if empty, the service title and first paragraph are used)</small></label>
              <input aria-label="SEO title" placeholder="SEO title (about 50 to 60 characters)" value={form.seoTitle} onChange={crud.setField('seoTitle')} maxLength={120} />
              <textarea aria-label="SEO description" rows="2" placeholder="Meta description (about 150 to 160 characters)" value={form.seoDescription} onChange={crud.setField('seoDescription')} maxLength={320} />
              <FieldError errors={fieldErrors} name="seoTitle" />
              <FieldError errors={fieldErrors} name="seoDescription" />
            </div>

            {crud.formError && <div className="adm-alert full" role="alert">{crud.formError}</div>}
            <div className="adm-modal-foot full">
              <button type="button" className="adm-btn-sm" onClick={crud.close}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={crud.saving || uploading}>{crud.saving ? 'Saving…' : 'Save service'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
