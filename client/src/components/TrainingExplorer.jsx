import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import useTrainingAreas from '../hooks/useTrainingAreas';
import { usePaths } from '../context/ContentContext';

const MAX_OUTCOMES = 3; // keeps the rows tidy; extra outcomes stay in the dashboard

// Splits a text on blank lines into paragraphs
const paragraphs = (text = '') => text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);

// On phones the list of training areas is a dropdown instead of the side list.
//   areas: all areas   current: the selected area   countOf(id): how many programs an area has
//   onSelect(id): called when the visitor picks an area
function AreaDropdown({ areas, current, countOf, onSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // the dropdown closes when the visitor taps elsewhere or presses Escape
  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideTap = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    const closeOnEscape = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', closeOnOutsideTap);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideTap);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="explorer-select" ref={menuRef}>
      <span className="explorer-select-label" id="area-label">Training area</span>
      <button
        type="button"
        className="explorer-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="area-label"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="explorer-select-name">{current.name}</span>
        <small>{countOf(current._id)}</small>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul className="explorer-select-list" role="listbox" aria-labelledby="area-label">
          {areas.map((area) => (
            <li key={area._id} role="option" aria-selected={area._id === current._id}>
              <button
                type="button"
                className={area._id === current._id ? 'active' : ''}
                onClick={() => { onSelect(area._id); setOpen(false); }}
              >
                <span>{area.name}</span>
                <small>{countOf(area._id)}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Training areas on the left, and the selected area (description + its programs as simple rows) on the right.
// Loaded from /api/categories and /api/programs; both are managed in the dashboard.
export default function TrainingExplorer() {
  const path = usePaths();
  const { state, areas, programs } = useTrainingAreas();
  const [selectedId, setSelectedId] = useState(null); // null = the first area

  if (state === 'loading') return <p>Loading programs…</p>;
  if (state === 'error') return <p>Sorry, we couldn't load the training programs right now. Please try again shortly.</p>;
  if (areas.length === 0) return <p>Our training programs will be listed here shortly.</p>;

  const programsOf = (areaId) => programs.filter((p) => p.category?._id === areaId);
  const countOf = (areaId) => programsOf(areaId).length;
  const current = areas.find((a) => a._id === selectedId) || areas[0];
  const list = programsOf(current._id);

  return (
    <div className="explorer" id="training-explorer">
      <AreaDropdown areas={areas} current={current} countOf={countOf} onSelect={setSelectedId} />

      <nav className="explorer-nav" role="tablist" aria-label="Training areas">
        {areas.map((area) => (
          <button
            key={area._id}
            type="button"
            role="tab"
            aria-selected={area._id === current._id}
            className={'explorer-tab' + (area._id === current._id ? ' active' : '')}
            onClick={() => setSelectedId(area._id)}
          >
            <span>{area.name}</span>
            <small>{countOf(area._id)}</small>
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
            <Link to={path('contact')}>Ask us about a customized program</Link>.
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
