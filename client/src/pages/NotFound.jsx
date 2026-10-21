import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found | Altiora Business Advisory');
  return (
    <section className="section-white">
      <div className="container text-center">
        <span className="eyebrow">404</span>
        <h2 style={{ marginTop: 14 }}>We couldn't find that page</h2>
        <p style={{ marginTop: 14 }}>The page you're looking for may have moved or no longer exists.</p>
        <Link to="/" className="btn btn-gold" style={{ marginTop: 28 }}>Back to Home</Link>
      </div>
    </section>
  );
}
