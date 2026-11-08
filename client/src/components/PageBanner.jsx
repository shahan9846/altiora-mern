import { Link } from 'react-router-dom';
import { imageUrl } from '../api/client';

// The big picture banner at the top of every inner page, with the "Home / Page name" trail under the title.
//   image: the background picture, title: the big heading, crumb: the last word in the trail (defaults to the title)
export default function PageBanner({ image, title, crumb = title }) {
  return (
    <section className="page-banner page-banner-img">
      <div className="page-banner-bg"><img src={imageUrl(image)} alt="" /></div>
      <div className="container">
        <h1>{title}</h1>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <span className="current">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
