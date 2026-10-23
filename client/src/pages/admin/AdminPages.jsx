import { Link } from 'react-router-dom';
import { PAGES, PAGE_ORDER } from '../../content/schema';

// List of every page whose wording and SEO can be edited
export default function AdminPages() {
  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Website content</span>
          <h1>Pages</h1>
          <p className="adm-head-text">Edit the wording of each page. Anything you leave unchanged keeps its current wording. Search engine details are under SEO.</p>
        </div>
      </div>

      <div className="adm-card adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Page</th><th>What you can edit</th><th></th></tr>
          </thead>
          <tbody>
            {PAGE_ORDER.map((key) => {
              const page = PAGES[key];
              const fieldCount = page.groups.reduce((n, g) => n + g.fields.length, 0);
              return (
                <tr key={key}>
                  <td className="nowrap"><strong>{page.label}</strong>{page.path && <small className="adm-muted">{page.path}</small>}</td>
                  <td>
                    <small style={{ marginTop: 0 }}>{page.description || `${fieldCount} editable texts`}</small>
                  </td>
                  <td className="adm-actions">
                    {page.path && <a className="adm-btn-sm" href={page.path} target="_blank" rel="noreferrer">View</a>}
                    <Link className="adm-btn-sm active" to={`/admin/pages/${key}`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
