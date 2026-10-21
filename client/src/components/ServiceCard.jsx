import { Link } from 'react-router-dom';
import Arrow from './Arrow';

export default function ServiceCard({ service }) {
  return (
    <div className="service-card-img reveal">
      <div className="card-media">
        <div className="media-inner"><img src={service.cardImg} alt={service.cardAlt} loading="lazy" /></div>
        <div className="card-icon">{service.icon}</div>
      </div>
      <div className="card-body">
        <h3>{service.cardTitle}</h3>
        <p>{service.cardText}</p>
        <Link to={'/services/' + service.slug} className="card-link">Learn More <Arrow /></Link>
      </div>
    </div>
  );
}
