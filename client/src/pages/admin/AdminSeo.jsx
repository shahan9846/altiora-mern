import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPages } from '../../api/admin';
import { PAGES, PAGE_ORDER } from '../../content/schema';
import { pathFor } from '../../content/paths';

// Overview of the search engine details of every page
export default function AdminSeo() {
  const [pages, setPages] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPages().then(setPages).catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Search engines</span>
          <h1>SEO</h1>
          <p className="adm-head-text">Control how each page appears in Google results and when its link is shared. Pages you leave alone use the suggested text.</p>
        </div>
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}
      {!pages && !error && <div className="adm-loading">Loading…</div>}

      {pages && (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Page</th><th>Web address</th><th>SEO title</th><th>Description</th><th>Share image</th><th></th></tr>
            </thead>
            <tbody>
              {PAGE_ORDER.map((key) => {
                const def = PAGES[key];
                const seo = (pages[key] || {}).seo || {};
                const hasTitle = !!def.seo?.title;
                return (
                  <tr key={key}>
                    <td className="nowrap"><strong>{def.label}</strong></td>
                    <td className="nowrap">{def.path ? <code className="adm-code">{pathFor(key, pages)}</code> : <span className="adm-muted">—</span>}</td>
                    <td>{hasTitle ? (seo.title ? <small style={{ marginTop: 0 }}>{seo.title}</small> : <span className="adm-muted">Suggested</span>) : <span className="adm-muted">—</span>}</td>
                    <td>{seo.description ? <span className="adm-badge contacted">Custom</span> : <span className="adm-muted">Suggested</span>}</td>
                    <td>{seo.image ? <span className="adm-badge contacted">Added</span> : <span className="adm-muted">Default</span>}</td>
                    <td className="adm-actions"><Link className="adm-btn-sm active" to={`/admin/seo/${key}`}>Edit SEO</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
