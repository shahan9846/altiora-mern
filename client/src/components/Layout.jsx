import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ConsultModal from './ConsultModal';
import FloatingButtons from './FloatingButtons';
import RouteLoader from './RouteLoader';
import useSiteEffects from '../hooks/useSiteEffects';

export default function Layout() {
  useSiteEffects();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ConsultModal />
      <FloatingButtons />
      <RouteLoader />
    </>
  );
}
