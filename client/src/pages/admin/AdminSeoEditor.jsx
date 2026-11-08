import { useToast } from '../../components/admin/ToastProvider';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPages, savePage } from '../../api/admin';
import useImageUpload, { MAX_IMAGE_MB } from '../../hooks/useImageUpload';
import AdminPageHead from '../../components/admin/AdminPageHead';
import FieldError from '../../components/admin/FieldError';
import { imageUrl } from '../../api/client';
import { PAGES } from '../../content/schema';
import { useContent } from '../../context/ContentContext';
import { DEFAULT_PATHS, pathFor } from '../../content/paths';

const EMPTY_SEO = { title: '', description: '', image: '', imageAlt: '', slug: '', canonical: '' };

// Colour hint for the SEO length counters (Google shows roughly this many characters)
const lengthClass = (n, min, max) => (n === 0 ? '' : n > max ? 'over' : n < min ? 'short' : 'good');

function Counter({ value, min, max }) {
  const n = value.length;
  return <small className={'adm-count ' + lengthClass(n, min, max)}>{n} characters · aim for {min}–{max}</small>;
}

// Search engine (SEO) details of one page. The page wording is edited separately under Pages.
export default function AdminSeoEditor() {
  const toast = useToast();
  const { key } = useParams();
  const def = PAGES[key];
  const { reload } = useContent();

  const [loaded, setLoaded] = useState(false);
  const [seo, setSeo] = useState(EMPTY_SEO);
  const [savedSlug, setSavedSlug] = useState(''); // the address the page has right now (for the "View page" link)
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    if (!def) return;
    setLoaded(false); setNotice(''); setError(''); setFieldErrors({});
    getPages()
      .then((all) => {
        const own = (all[key] || {}).seo || {};
        setSeo({ ...EMPTY_SEO, ...own });
        setSavedSlug(own.slug || '');
        setLoaded(true);
      })
      .catch((e) => setError(e.message));
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  // the share image is uploaded as soon as it is chosen
  const { uploading, onFile } = useImageUpload({
    noun: 'image',
    setFieldErrors,
    onUploaded: (url) => { setNotice(''); setSeo((s) => ({ ...s, image: url })); },
  });

  if (!def) return <Navigate to="/admin/seo" replace />;

  const hasPageSeo = !!def.seo?.title; // the site-settings entry only has a default description and share image
  const hasOwnAddress = hasPageSeo && key !== 'home'; // every page except Home and the site settings can have its own web address
  const defaultPath = DEFAULT_PATHS[key] || '/';
  const currentPath = pathFor(key, { [key]: { seo: { slug: savedSlug } } });
  const setSeoValue = (k) => (e) => { setNotice(''); setSeo((s) => ({ ...s, [k]: e.target.value })); };
  // the web address is kept tidy as it is typed: lowercase, hyphens instead of spaces, no odd characters
  const setSlug = (e) => {
    setNotice('');
    const v = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g, '-').replace(/^-/, '');
    setSeo((s) => ({ ...s, slug: v }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setNotice(''); setFieldErrors({});
    try {
      const saved = await savePage(key, { seo }); // only the SEO part is sent; the page wording is left as it is
      setSeo({ ...EMPTY_SEO, ...(saved.seo || {}) });
      setSavedSlug((saved.seo || {}).slug || '');
      await reload();
      setNotice('Saved. Search engines will pick this up the next time they visit.');
      toast('Changes saved', 'Search engines will see them on their next visit.');
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSaving(false);
    }
  };

  if (!loaded && !error) return <div className="adm-loading">Loading…</div>;

  return (
    <>
      <AdminPageHead
        back={{ to: '/admin/seo', label: 'All SEO' }}
        title={'SEO · ' + def.label}
        text="How this page looks in Google results and when its link is shared."
        action={def.path && <a className="btn btn-outline-light" href={currentPath} target="_blank" rel="noreferrer">View page</a>}
      />

      {error && <div className="adm-alert" role="alert">{error}</div>}

      <form onSubmit={save} className="adm-editor">
        <div className="adm-card adm-group adm-seo-group">
          {def.seo?.seoNote && <p className="adm-hint adm-group-note">{def.seo.seoNote}</p>}
          <div className="adm-group-fields">
            {hasPageSeo && (
              <div className="adm-field">
                <label htmlFor="seo-title">SEO title</label>
                <input id="seo-title" value={seo.title} onChange={setSeoValue('title')} placeholder={def.seo.title} maxLength={120} />
                <Counter value={seo.title || def.seo.title} min={30} max={60} />
                <FieldError errors={fieldErrors} name="title" />
              </div>
            )}
            <div className="adm-field">
              <label htmlFor="seo-desc">Meta description</label>
              <textarea id="seo-desc" rows="3" value={seo.description} onChange={setSeoValue('description')} placeholder={def.seo?.description} maxLength={320} />
              <Counter value={seo.description || def.seo?.description || ''} min={70} max={160} />
              <FieldError errors={fieldErrors} name="description" />
            </div>
            {hasOwnAddress && (
              <div className="adm-field">
                <label htmlFor="seo-slug">Page URL <small>(the page's web address)</small></label>
                <div className="adm-slug">
                  <span>{window.location.host}/</span>
                  <input id="seo-slug" value={seo.slug} onChange={setSlug} placeholder={defaultPath.slice(1)} maxLength={60} autoComplete="off" />
                </div>
                <small className="adm-hint">Lowercase letters, numbers and hyphens, for example about-us. Empty keeps the default address (/{defaultPath.slice(1)}). If you change it, the old address leads visitors to the new one and the menu updates.</small>
                <FieldError errors={fieldErrors} name="slug" />
              </div>
            )}
            {hasPageSeo && (
              <div className="adm-field">
                <label htmlFor="seo-canonical">Canonical URL <small>(optional)</small></label>
                <input id="seo-canonical" type="url" value={seo.canonical} onChange={setSeoValue('canonical')} placeholder={window.location.origin + (seo.slug ? '/' + seo.slug : defaultPath)} maxLength={300} />
                <small className="adm-hint">Tells search engines which address is the main one for this page. Leave empty to use the page's own address. Use it only when the same content is also published at another address.</small>
                <FieldError errors={fieldErrors} name="canonical" />
              </div>
            )}
            <div className="adm-field">
              <label>Share image <small>(shown when the link is shared; about 1200 × 630 works best)</small></label>
              <div className="adm-upload">
                <div className="adm-upload-preview">
                  {seo.image ? <img src={imageUrl(seo.image)} alt="Share preview" /> : <span>Uses the site's default image</span>}
                </div>
                <div className="adm-upload-side">
                  <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={onFile} hidden />
                  <button type="button" className="adm-btn-sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
                    {uploading ? 'Uploading…' : seo.image ? 'Change image' : 'Choose image'}
                  </button>
                  {seo.image && <button type="button" className="adm-btn-sm" onClick={() => setSeo((s) => ({ ...s, image: '' }))}>Remove image</button>}
                  <small className="adm-hint">JPG, PNG or WebP, up to {MAX_IMAGE_MB} MB.</small>
                </div>
              </div>
              <FieldError errors={fieldErrors} name="image" />
            </div>
            <div className="adm-field">
              <label htmlFor="seo-img-alt">Share image alt text <small>(describe the picture in a few words)</small></label>
              <input id="seo-img-alt" value={seo.imageAlt} onChange={setSeoValue('imageAlt')} maxLength={160} placeholder="For example: Altiora team in a planning workshop" />
              <Counter value={seo.imageAlt} min={10} max={125} />
              <FieldError errors={fieldErrors} name="imageAlt" />
            </div>
          </div>
        </div>

        <div className="adm-savebar">
          <span>{notice || 'Empty fields use the suggested text shown in grey.'}</span>
          <button type="submit" className="btn btn-gold" disabled={saving || uploading}>{saving ? 'Saving…' : 'Save changes'}</button>
        </div>
      </form>
    </>
  );
}
