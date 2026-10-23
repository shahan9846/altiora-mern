import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import ServiceIcon from './ServiceIcon';
import { imageUrl } from '../api/client';
import { usePaths } from '../context/ContentContext';

// The first paragraph of the description is the card text.
export const firstParagraph = (text = '') => text.split(/\n\s*\n/)[0].trim();

export default function ServiceCard({ service }) {
  const path = usePaths();
  return (
    <div className="service-card-img reveal">
      <div className="card-media">
        <div className="media-inner"><img src={imageUrl(service.image)} alt={service.imageAlt || service.title} loading="lazy" /></div>
        <div className="card-icon"><ServiceIcon /></div>
      </div>
      <div className="card-body">
        <h3>{service.title}</h3>
        <p className="card-text">{firstParagraph(service.description)}</p>
        <Link to={path('services') + '/' + service.slug} className="card-link">Learn More <Arrow /></Link>
      </div>
    </div>
  );
}
