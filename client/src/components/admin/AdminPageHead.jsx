import { Link } from 'react-router-dom';

// The heading block at the top of every dashboard page.
//   eyebrow: small label above the title      title / text: the heading and the sentence under it
//   back: { to, label } shows a "← All pages" style link above the title (used by the editor pages)
//   action: a button placed on the right (for example "View page")
export default function AdminPageHead({ eyebrow, title, text, back, action }) {
  return (
    <div className="adm-page-head">
      <div>
        {back && <Link to={back.to} className="adm-link">← {back.label}</Link>}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className={back ? 'has-back' : undefined}>{title}</h1>
        <p className="adm-head-text">{text}</p>
      </div>
      {action}
    </div>
  );
}
