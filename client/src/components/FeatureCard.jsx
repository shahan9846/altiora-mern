// A card with an icon, a title and a short text. It is dark inside dark sections and white inside light ones
// (see ".feature-card" in style.css). `icon` is an <svg> element. A blank line in `text` starts a new paragraph;
// `wide` makes the card span the whole row (for a card with a long text).
export default function FeatureCard({ icon, title, text, wide }) {
  const paragraphs = (text || '').split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);
  return (
    <div className={'feature-card' + (wide ? ' feature-card-wide' : '')}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      {paragraphs.map((t, i) => <p key={i}>{t}</p>)}
      <span className="feature-mark" aria-hidden="true">{icon}</span>
    </div>
  );
}
