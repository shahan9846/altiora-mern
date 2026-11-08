import { Link } from 'react-router-dom';
import { PAGES, PAGE_ORDER } from '../../content/schema';
import AdminPageHead from '../../components/admin/AdminPageHead';

// List of every page whose wording and SEO can be edited
export default function AdminPages() {
  return (
    <>
      <AdminPageHead
        eyebrow="Website content"
        title="Pages"
        text="Edit the wording of each page. Anything you leave unchanged keeps its current wording. Search engine details are under SEO."
      />

      <div className="adm-card adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Page</th><th>What you can edit</th><th></th></tr>
          </thead>
          <tbody>
            {PAGE_ORDER.map((key) => {
              const page = PAGES[key];
              const fields = page.groups.flatMap((g) => g.fields);
              const imageCount = fields.filter((f) => f.type === 'image').length;
              const textCount = fields.length - imageCount;
              return (
                <tr key={key}>
                  <td className="nowrap"><strong>{page.label}</strong>{page.path && <small className="adm-muted">{page.path}</small>}</td>
                  <td>
                    <small className="mt-0">{page.description || `${textCount} editable texts and ${imageCount} ${imageCount === 1 ? 'picture' : 'pictures'}`}</small>
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
