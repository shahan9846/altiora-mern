import { useToast } from '../../components/admin/ToastProvider';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getPages, savePage } from '../../api/admin';
import { DEFAULTS, PAGES } from '../../content/schema';
import { useContent } from '../../context/ContentContext';

export default function AdminPageEditor() {
  const toast = useToast();
  const { key } = useParams();
  const def = PAGES[key];
  const { reload } = useContent();
  const defaults = DEFAULTS[key] || {};

  const [stored, setStored] = useState(null);   // what is saved in the database
  const [values, setValues] = useState({});     // text shown in the form (saved text, or the default)
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!def) return;
    setStored(null); setNotice(''); setError('');
    getPages()
      .then((all) => {
        const page = all[key] || {};
        const content = page.content || {};
        setValues(Object.fromEntries(Object.keys(defaults).map((k) => [k, (content[k] || '').trim() ? content[k] : defaults[k]])));
        setStored(page);
      })
      .catch((e) => setError(e.message));
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const changed = useMemo(
    () => Object.keys(defaults).filter((k) => values[k] !== undefined && values[k] !== defaults[k]).length,
    [values, defaults]
  );

  if (!def) return <Navigate to="/admin/pages" replace />;

  const setValue = (k) => (e) => { setNotice(''); setValues((v) => ({ ...v, [k]: e.target.value })); };
  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setNotice('');
    try {
      // only texts that differ from the default are stored; the rest keep following the default wording
      const content = Object.fromEntries(
        Object.keys(defaults).filter((k) => (values[k] || '').trim() && values[k] !== defaults[k]).map((k) => [k, values[k]])
      );
      const saved = await savePage(key, { content }) // only the wording is sent; the SEO details are edited under SEO and left as they are;
      setStored(saved);
      await reload(); // the public pages pick up the change straight away
      setNotice('Saved. The website now shows these changes.');
      toast('Changes saved', 'The website now shows them.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!stored && !error) return <div className="adm-loading">Loading…</div>;

  return (
    <>
      <div className="adm-page-head">
        <div>
          <Link to="/admin/pages" className="adm-link">← All pages</Link>
          <h1 style={{ marginTop: 8 }}>{def.label}</h1>
          <p className="adm-head-text">{def.description || 'Edit the wording of this page. Its search engine details are under SEO.'}</p>
        </div>
        {def.path && <a className="btn btn-outline-light" href={def.path} target="_blank" rel="noreferrer">View page</a>}
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <form onSubmit={save} className="adm-editor">
        {def.groups.map((group, gi) => (
          <details className="adm-card adm-group" key={group.title} open={gi === 0}>
            <summary>
              <span>{group.title}</span>
              <small>{group.fields.length} {group.fields.length === 1 ? 'text' : 'texts'}</small>
            </summary>
            {group.description && <p className="adm-hint" style={{ margin: '0 0 12px' }}>{group.description}</p>}
            <div className="adm-group-fields">
              {group.fields.map((f) => {
                const value = values[f.key] ?? f.default;
                const isChanged = value !== f.default;
                return (
                  <div className="adm-field" key={f.key}>
                    <label htmlFor={`f-${f.key}`}>
                      {f.label}
                      {isChanged && <button type="button" className="adm-reset" onClick={() => setValues((v) => ({ ...v, [f.key]: f.default }))}>Reset to original</button>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea id={`f-${f.key}`} rows={Math.min(10, Math.max(3, Math.ceil(value.length / 42)))} value={value} onChange={setValue(f.key)} maxLength={3000} />
                    ) : (
                      <input id={`f-${f.key}`} value={value} onChange={setValue(f.key)} maxLength={3000} />
                    )}
                  </div>
                );
              })}
            </div>
          </details>
        ))}

        <div className="adm-savebar">
          <span>{notice || (changed ? `${changed} text${changed === 1 ? '' : 's'} differ from the original wording` : 'All texts use the original wording')}</span>
          <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
        </div>
      </form>
    </>
  );
}
