import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import { getCategories, getPrograms } from '../api/client';

const ALL = 'all';
const MAX_OUTCOMES = 3; // keeps the cards an even height; extra outcomes stay in the admin

// Category filter chips + program cards, loaded from /api/categories and /api/programs.
export default function TrainingCatalogue() {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | error
  const [selected, setSelected] = useState(ALL);

  useEffect(() => {
    Promise.all([getPrograms(), getCategories()])
      .then(([p, c]) => { setPrograms(p); setCategories(c); setState('ready'); })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <p>Loading programs…</p>;
  if (state === 'error') return <p>Sorry, we couldn't load the training programs right now. Please try again shortly.</p>;

  const current = categories.find((c) => c._id === selected);
  const visible = selected === ALL ? programs : programs.filter((p) => p.category?._id === selected);

  return (
    <>
      <div id="filter-bar" className="filter-bar" role="tablist" aria-label="Filter training programs by category" style={{ marginBottom: 44 }}>
        <button type="button" className={'filter-chip' + (selected === ALL ? ' active' : '')} onClick={() => setSelected(ALL)}>All Programs</button>
        {categories.map((c) => (
          <button key={c._id} type="button" className={'filter-chip' + (c._id === selected ? ' active' : '')} onClick={() => setSelected(c._id)}>
            {c.name}
          </button>
        ))}
      </div>

      {current && current.description && (
        <p style={{ maxWidth: '72ch', margin: '-12px 0 36px', color: 'var(--ink-soft)' }}>{current.description}</p>
      )}

      {visible.length === 0 && (
        <p style={{ marginBottom: 36 }}>
          No ready-made programs in this area yet.{' '}
          <Link to="/contact" style={{ color: 'var(--gold-deep)', fontWeight: 500 }}>Ask us about a customized program</Link>.
        </p>
      )}

      <div id="training-grid" className="training-grid">
        {visible.map((p) => (
          <article className="training-card reveal in" key={p._id}>
            <span className="cat">{p.category?.name}</span>
            <h3>{p.title}</h3>
            <p className="desc">{p.description}</p>
            <ul className="outcomes">
              {p.outcomes.slice(0, MAX_OUTCOMES).map((o) => <li key={o}>{o}</li>)}
            </ul>
            <Link className="btn btn-outline-light enquire" to="/contact">Enquire Now <Arrow /></Link>
          </article>
        ))}
      </div>
    </>
  );
}
