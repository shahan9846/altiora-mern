import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useContent } from './context/ContentContext';
import { DEFAULT_PATHS, pathFor } from './content/paths';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Training from './pages/Training';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import WhyAltiora from './pages/WhyAltiora';
import CareerGuidance from './pages/CareerGuidance';
const RequireAuth = lazy(() => import('./components/admin/RequireAuth'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminPrograms = lazy(() => import('./pages/admin/AdminPrograms'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminCareerServices = lazy(() => import('./pages/admin/AdminCareerServices'));
const AdminPages = lazy(() => import('./pages/admin/AdminPages'));
const AdminPageEditor = lazy(() => import('./pages/admin/AdminPageEditor'));
const AdminSeo = lazy(() => import('./pages/admin/AdminSeo'));
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'));
const AdminSeoEditor = lazy(() => import('./pages/admin/AdminSeoEditor'));

// the page for each key; its address comes from Dashboard → SEO (custom) or DEFAULT_PATHS
const PUBLIC_PAGES = [
  ['about', <About />],
  ['why', <WhyAltiora />],
  ['training', <Training />],
  ['career', <CareerGuidance />],
  ['contact', <Contact />],
];

// the old service address (/services/<name>) leads to the new one when the Services page has a custom address
function RedirectService({ to }) {
  const { slug } = useParams();
  return <Navigate to={to + '/' + slug} replace />;
}

export default function App() {
  const { pages, loaded } = useContent();
  const path = (key) => pathFor(key, pages);
  const servicesPath = path('services');

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--black)' }} />}>
    <Routes>
      <Route element={<Layout />}>
        {/* The pages are drawn at once, with the default web addresses and wording. The saved ones (custom addresses,
            edited texts) are applied as soon as the API answers, so a slow or sleeping API never leaves a blank page. */}
        <Route path="/" element={<Home />} />
        <Route path={servicesPath} element={<Services />} />
        <Route path={servicesPath + '/:slug'} element={<ServiceDetail />} />
        {PUBLIC_PAGES.map(([key, element]) => <Route key={key} path={path(key)} element={element} />)}
        {/* a page with a custom address: its old default address leads to the new one */}
        {Object.keys(DEFAULT_PATHS).filter((k) => k !== 'home' && path(k) !== DEFAULT_PATHS[k]).map((k) => (
          <Route key={'old-' + k} path={DEFAULT_PATHS[k]} element={<Navigate to={path(k)} replace />} />
        ))}
        {servicesPath !== DEFAULT_PATHS.services && <Route path={DEFAULT_PATHS.services + '/:slug'} element={<RedirectService to={servicesPath} />} />}
        {/* an unknown address could still be a custom one: "not found" is shown only after the saved addresses were checked */}
        <Route path="*" element={loaded ? <NotFound /> : <div style={{ minHeight: '60vh' }} />} />
      </Route>

      {/* Admin dashboard: separate layout, no public header/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboard />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="career" element={<AdminCareerServices />} />
        <Route path="pages" element={<AdminPages />} />
        <Route path="pages/:key" element={<AdminPageEditor />} />
        <Route path="seo" element={<AdminSeo />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="seo/:key" element={<AdminSeoEditor />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
    </Routes>
    </Suspense>
  );
}
