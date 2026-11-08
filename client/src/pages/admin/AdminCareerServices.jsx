import { createCareerService, deleteCareerService, listCareerServices, updateCareerService } from '../../api/admin';
import useAdminCrud from '../../hooks/useAdminCrud';
import AdminPageHead from '../../components/admin/AdminPageHead';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FieldError from '../../components/admin/FieldError';

// Dashboard -> Career Guidance: the support cards on the Career Guidance page.
// The list, the add/edit popup and the delete box all come from useAdminCrud.
const toForm = (c) => ({ title: c.title, description: c.description, order: String(c.order ?? '') });
const toPayload = ({ title, description, order }) => ({ title, description, ...(order !== '' ? { order: Number(order) } : {}) });

export default function AdminCareerServices() {
  const crud = useAdminCrud({
    list: listCareerServices, create: createCareerService, update: updateCareerService, remove: deleteCareerService,
    emptyForm: { title: '', description: '', order: '' },
    toForm, toPayload,
    messages: { added: 'Card added', updated: 'Card updated', deleted: 'Card deleted', savedText: 'It is now on the Career Guidance page.' },
    confirmDelete: (c) => ({ title: 'Delete this card?', message: `"${c.title}" will disappear from the Career Guidance page.` }),
  });
  const { editing, fieldErrors } = crud;
  const form = editing?.form;

  return (
    <>
      <AdminPageHead
        eyebrow="Website content"
        title="Career Guidance"
        text="The support cards on the Career Guidance page. Each card has a title and a short description."
      />

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => crud.open(null)}>Add career service</button>
      </div>

      {crud.error && <div className="adm-alert" role="alert">{crud.error}</div>}

      <AdminTable
        rows={crud.rows}
        columns={['Order', 'Career service', '']}
        empty="No career services yet. Click “Add career service” to create the first one."
        renderRow={(c) => (
          <tr key={c._id}>
            <td className="nowrap">{c.order}</td>
            <td><strong>{c.title}</strong><small>{c.description}</small></td>
            <td className="adm-actions">
              <button type="button" className="adm-btn-sm" onClick={() => crud.open(c)}>Edit</button>
              <button type="button" className="adm-btn-sm danger" onClick={() => crud.remove(c)}>Delete</button>
            </td>
          </tr>
        )}
      />

      {editing && (
        <AdminModal title={editing.id ? 'Edit career service' : 'Add career service'} onClose={crud.close}>
          <form onSubmit={crud.save} className="adm-form single">
            <div className="adm-field">
              <label htmlFor="c-title">Title *</label>
              <input id="c-title" value={form.title} onChange={crud.setField('title')} required maxLength={120} />
              <FieldError errors={fieldErrors} name="title" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-desc">Description * <small>(one or two short sentences)</small></label>
              <textarea id="c-desc" rows="4" value={form.description} onChange={crud.setField('description')} required maxLength={300} />
              <FieldError errors={fieldErrors} name="description" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-order">Display order <small>(lowest first{editing.id ? '' : '; empty = add at the end'})</small></label>
              <input id="c-order" type="number" min="0" max="9999" value={form.order} onChange={crud.setField('order')} />
              <FieldError errors={fieldErrors} name="order" />
            </div>
            {crud.formError && <div className="adm-alert" role="alert">{crud.formError}</div>}
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn-sm" onClick={crud.close}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={crud.saving}>{crud.saving ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
