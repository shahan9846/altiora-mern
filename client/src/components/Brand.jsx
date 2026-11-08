import { Link } from 'react-router-dom';
import { useSite } from '../context/ContentContext';
import { imageUrl } from '../api/client';

export default function Brand() {
  const { c } = useSite(); // the logo can be replaced in the dashboard (Pages -> Site settings -> Pictures)
  return (
    <Link to="/" className="brand" aria-label="Altiora Business Advisory — Home">
      <img src={imageUrl(c('logo.image'))} alt="Altiora Business Advisory logo mark" />
      <span className="wordmark">
        <strong>ALTIORA</strong>
        <span>BUSINESS ADVISORY</span>
      </span>
    </Link>
  );
}
