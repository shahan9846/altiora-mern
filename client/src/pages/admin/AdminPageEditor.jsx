import { useToast } from '../../components/admin/ToastProvider';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPages, savePage } from '../../api/admin';
import AdminPageHead from '../../components/admin/AdminPageHead';
import ImageField from '../../components/admin/ImageField';
import { DEFAULTS, IMAGE_KEYS, PAGES } from '../../content/schema';
import { useContent } from '../../context/ContentContext';

// "14 texts · 3 images" shown at the right of a group's title
const countLabel = (fields) => {
  const images = fields.filter((f) => f.type === 'image').length;
  const texts = fields.length - images;
  return [texts && `${texts} ${texts === 1 ? 'text' : 'texts'}`, images && `${images} ${images === 1 ? 'image' : 'images'}`].filter(Boolean).join(' · ');
};

export default function AdminPageEditor() {
  const toast = useToast();
  const { key } = useParams();
  const def = PAGES[key];
  const { reload } = useContent();
  const defaults = DEFAULTS[key] || {};
  const imageKeys = IMAGE_KEYS[key]; // the fields that hold a picture (a picture can not be empty, a text can)

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
        setValues(Object.fromEntries(Object.keys(defaults).map((k) => [
          k,
          typeof content[k] === 'string' && (content[k].trim() || !imageKeys?.has(k)) ? content[k] : defaults[k],
        ])));
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
        Object.keys(defaults)
          // a cleared text is saved as empty (the website then hides it); a picture can not be cleared
          .filter((k) => values[k] !== defaults[k] && (!imageKeys?.has(k) || (values[k] || '').trim()))
          .map((k) => [k, values[k]])
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
      <AdminPageHead
        back={{ to: '/admin/pages', label: 'All pages' }}
        title={def.label}
        text={(def.description || 'Edit the wording of this page. Its search engine details are under SEO.') + ' Clear a text and save to hide it from the website.'}
        action={def.path && <a className="btn btn-outline-light" href={def.path} target="_blank" rel="noreferrer">View page</a>}
      />

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <form onSubmit={save} className="adm-editor">
        {def.groups.map((group, gi) => (
          <details className="adm-card adm-group" key={group.title} open={gi === 0}>
            <summary>
              <span>{group.title}</span>
              <small>{countLabel(group.fields)}</small>
            </summary>
            {group.description && <p className="adm-hint adm-group-note">{group.description}</p>}
            <div className="adm-group-fields">
              {group.fields.map((f) => {
                const value = values[f.key] ?? f.default;
                if (f.type === 'image') {
                  return (
                    <ImageField
                      key={f.key}
                      label={f.label}
                      hint={f.hint}
                      value={value}
                      original={f.default}
                      onChange={(url) => { setNotice(''); setValues((v) => ({ ...v, [f.key]: url })); }}
                    />
                  );
                }
                return (
                  <div className="adm-field" key={f.key}>
                    <label htmlFor={`f-${f.key}`}>
                      {f.label}
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
