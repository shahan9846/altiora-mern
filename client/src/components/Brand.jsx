import { Link } from 'react-router-dom';

export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Altiora Business Advisory — Home">
      <img src="/assets/logo-mark.png" alt="Altiora Business Advisory logo mark" />
      <span className="wordmark">
        <strong>ALTIORA</strong>
        <span>BUSINESS ADVISORY</span>
      </span>
    </Link>
  );
}
