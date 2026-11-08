import { createCategory, deleteCategory, listCategories, updateCategory } from '../../api/admin';
import useAdminCrud from '../../hooks/useAdminCrud';
import AdminPageHead from '../../components/admin/AdminPageHead';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';
import FieldError from '../../components/admin/FieldError';

// Dashboard -> Training -> Categories: the areas that group the training programs.
// The list, the add/edit popup and the delete box all come from useAdminCrud.
const toForm = (c) => ({ name: c.name, description: c.description || '', order: String(c.order ?? '') });
const toPayload = ({ name, description, order }) => ({ name, description, ...(order !== '' ? { order: Number(order) } : {}) });

export default function AdminCategories() {
  const crud = useAdminCrud({
    list: listCategories, create: createCategory, update: updateCategory, remove: deleteCategory,
    emptyForm: { name: '', description: '', order: '' },
    toForm, toPayload,
    messages: { added: 'Category added', updated: 'Category updated', deleted: 'Category deleted' },
    confirmDelete: (c) => ({ title: 'Delete this category?', message: `The category "${c.name}" will be removed.` }),
  });
  const { editing, fieldErrors } = crud;
  const form = editing?.form;

  return (
    <>
      <AdminPageHead
        eyebrow="Website content"
        title="Program Categories"
        text="Categories group your training programs and become the filter buttons on the Training page."
      />

      <div className="adm-add-row">
        <button type="button" className="btn btn-gold" onClick={() => crud.open(null)}>Add category</button>
      </div>

      {crud.error && <div className="adm-alert" role="alert">{crud.error}</div>}

      <AdminTable
        rows={crud.rows}
        columns={['Order', 'Category', 'Programs', '']}
        empty="No categories yet. Click “Add category” to create the first one."
        renderRow={(c) => (
          <tr key={c._id}>
            <td className="nowrap">{c.order}</td>
            <td><strong>{c.name}</strong>{c.description && <small>{c.description}</small>}</td>
            <td className="nowrap">{c.programCount}</td>
            <td className="adm-actions">
              <button type="button" className="adm-btn-sm" onClick={() => crud.open(c)}>Edit</button>
              <button type="button" className="adm-btn-sm danger" onClick={() => crud.remove(c)}>Delete</button>
            </td>
          </tr>
        )}
      />

      {editing && (
        <AdminModal title={editing.id ? 'Edit category' : 'Add category'} onClose={crud.close}>
          <form onSubmit={crud.save} className="adm-form single">
            <div className="adm-field">
              <label htmlFor="c-name">Name *</label>
              <input id="c-name" value={form.name} onChange={crud.setField('name')} required maxLength={120} />
              <FieldError errors={fieldErrors} name="name" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-desc">Description <small>(shown on the Training page)</small></label>
              <textarea id="c-desc" rows="4" value={form.description} onChange={crud.setField('description')} maxLength={600} />
              <FieldError errors={fieldErrors} name="description" />
            </div>
            <div className="adm-field">
              <label htmlFor="c-order">Display order <small>(lowest first{editing.id ? '' : '; leave empty to add at the end'})</small></label>
              <input id="c-order" type="number" min="0" max="9999" value={form.order} onChange={crud.setField('order')} />
              <FieldError errors={fieldErrors} name="order" />
            </div>
            {crud.formError && <div className="adm-alert" role="alert">{crud.formError}</div>}
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn-sm" onClick={crud.close}>Cancel</button>
              <button type="submit" className="btn btn-gold" disabled={crud.saving}>{crud.saving ? 'Saving…' : 'Save category'}</button>
            </div>
          </form>
        </AdminModal>
      )}
    </>
  );
}
