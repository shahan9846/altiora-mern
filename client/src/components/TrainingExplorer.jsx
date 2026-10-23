import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { getCategories, getPrograms } from '../api/client';
import { usePaths } from '../context/ContentContext';

const MAX_OUTCOMES = 3; // keeps the rows tidy; extra outcomes stay in the admin

// "Customized Corporate Training" is a training area in the admin, but the page shows it as its own block further down.
const CUSTOM_AREA = 'customized corporate training';

const paragraphs = (text = '') => text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);

// Training areas on the left, and the selected area (description + its programs as simple rows) on the right.
// Loaded from /api/categories and /api/programs; both are managed in the admin dashboard.
export default function TrainingExplorer() {
  const path = usePaths();
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | error
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // the phone dropdown
  const menuRef = useRef(null);

  // the dropdown closes when the visitor taps elsewhere or presses Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const away = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    const key = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', key); };
  }, [menuOpen]);

  useEffect(() => {
    Promise.all([getPrograms(), getCategories()])
      .then(([p, c]) => {
        const areas = c.filter((a) => a.name.trim().toLowerCase() !== CUSTOM_AREA);
        setPrograms(p);
        setCategories(areas);
        setSelected(areas[0]?._id || null);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <p>Loading programs…</p>;
  if (state === 'error') return <p>Sorry, we couldn't load the training programs right now. Please try again shortly.</p>;
  if (categories.length === 0) return <p>Our training programs will be listed here shortly.</p>;

  const count = (id) => programs.filter((p) => p.category?._id === id).length;
  const current = categories.find((a) => a._id === selected) || categories[0];
  const list = programs.filter((p) => p.category?._id === current._id);

  return (
    <div className="explorer" id="training-explorer">
      {/* phones: a dropdown instead of the side list */}
      <div className="explorer-select" ref={menuRef}>
        <span className="explorer-select-label" id="area-label">Training area</span>
        <button
          type="button"
          className="explorer-select-btn"
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
          aria-labelledby="area-label"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="explorer-select-name">{current.name}</span>
          <small>{count(current._id)}</small>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        {menuOpen && (
          <ul className="explorer-select-list" role="listbox" aria-labelledby="area-label">
            {categories.map((a) => (
              <li key={a._id} role="option" aria-selected={a._id === current._id}>
                <button
                  type="button"
                  className={a._id === current._id ? 'active' : ''}
                  onClick={() => { setSelected(a._id); setMenuOpen(false); }}
                >
                  <span>{a.name}</span>
                  <small>{count(a._id)}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="explorer-nav" role="tablist" aria-label="Training areas">
        {categories.map((a) => (
          <button
            key={a._id}
            type="button"
            role="tab"
            aria-selected={a._id === current._id}
            className={'explorer-tab' + (a._id === current._id ? ' active' : '')}
            onClick={() => setSelected(a._id)}
          >
            <span>{a.name}</span>
            <small>{count(a._id)}</small>
          </button>
        ))}
      </nav>

      <div className="explorer-panel" role="tabpanel" key={current._id}>
        <span className="eyebrow">Training Area</span>
        <h3>{current.name}</h3>
        {paragraphs(current.description).map((t) => <p className="explorer-desc" key={t}>{t}</p>)}

        <div className="explorer-list-head">
          <h4>Programs in this area</h4>
          <span>{list.length} {list.length === 1 ? 'program' : 'programs'}</span>
        </div>

        {list.length === 0 ? (
          <p className="explorer-empty">
            No ready-made programs in this area yet.{' '}
            <Link to={path('contact')} style={{ color: 'var(--gold-deep)', fontWeight: 500 }}>Ask us about a customized program</Link>.
          </p>
        ) : (
          <ul className="explorer-list">
            {list.map((p) => (
              <li key={p._id}>
                <div className="explorer-row-main">
                  <h5>{p.title}</h5>
                  <p>{p.description}</p>
                  <div className="explorer-tags">
                    {p.outcomes.slice(0, MAX_OUTCOMES).map((o) => <span key={o}>{o}</span>)}
                  </div>
                </div>
                <Link className="explorer-enquire" to={path('contact')}>Enquire <Arrow /></Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
