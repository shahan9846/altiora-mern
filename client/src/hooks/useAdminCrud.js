import { useEffect, useState } from 'react';
import { useToast } from '../components/admin/ToastProvider';
import { useConfirm } from '../components/admin/ConfirmProvider';

// Everything a dashboard "list + add/edit popup + delete" page needs, so each page only describes what is different.
// Used by Categories, Training Programs, Services and Career Guidance.
//
//   const crud = useAdminCrud({ list, create, update, remove, emptyForm, toForm, toPayload, messages, confirmDelete });
//
// Options
//   list / create / update / remove  the API functions from api/admin.js
//   emptyForm                        the form values for "Add" (all fields as text)
//   toForm(row)                      turns a saved row into form values (for "Edit")
//   toPayload(form)                  turns the form values into what the API expects
//   messages                         { added, updated, deleted, savedText } shown in the little green message
//   confirmDelete(row)               { title, message } for the "Are you sure?" box
//   validate(form)                   optional: return { field: ['message'] } to stop the save before it is sent
//   mergeSaved                       true = put the saved row straight into the list; false = load the list again
//
// Returns the state the page shows (rows, error, editing, formError, fieldErrors, saving) and the actions
// (open, close, setField, setValue, save, remove). `editing` is null when the popup is closed.
export default function useAdminCrud({
  list, create, update, remove: removeApi,
  emptyForm, toForm, toPayload,
  messages, confirmDelete,
  validate, mergeSaved = false,
}) {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState(null); // null while loading
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | { id?: string, form }
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => list().then(setRows).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Opens the popup: with a row to edit it, or with nothing to add a new one
  const open = (row) => {
    setFormError(''); setFieldErrors({});
    setEditing(row ? { id: row._id, form: toForm(row) } : { form: { ...emptyForm } });
  };
  const close = () => setEditing(null);

  // <input onChange={setField('title')} />  for ordinary inputs, setValue('image', url) for values set by code
  const setField = (name) => (e) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: e.target.value } }));
  const setValue = (name, value) => setEditing((s) => ({ ...s, form: { ...s.form, [name]: value } }));

  const save = async (e) => {
    e.preventDefault();
    const problems = validate?.(editing.form);
    if (problems) { setFieldErrors(problems); return; }

    setSaving(true); setFormError(''); setFieldErrors({});
    try {
      const payload = toPayload(editing.form);
      const saved = editing.id ? await update(editing.id, payload) : await create(payload);
      if (mergeSaved) setRows((rs) => (editing.id ? rs.map((r) => (r._id === editing.id ? saved : r)) : [...rs, saved]));
      toast(editing.id ? messages.updated : messages.added, messages.savedText);
      close();
      if (!mergeSaved) await load();
    } catch (err) {
      setFormError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    setError('');
    if (!(await confirm({ ...confirmDelete(row), confirmLabel: 'Delete', danger: true }))) return;
    try {
      await removeApi(row._id);
      toast(messages.deleted);
      setRows((rs) => rs.filter((r) => r._id !== row._id));
    } catch (e) { setError(e.message); }
  };

  return {
    rows, setRows, error, setError,
    editing, formError, fieldErrors, setFieldErrors, saving,
    open, close, setField, setValue, save, remove,
  };
}
