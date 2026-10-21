import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Training from './pages/Training';
import OurApproach from './pages/OurApproach';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import WhyAltiora from './pages/WhyAltiora';
import CareerGuidance from './pages/CareerGuidance';
import RequireAuth from './components/admin/RequireAuth';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminCategories from './pages/admin/AdminCategories';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/training" element={<Training />} />
        <Route path="/our-approach" element={<OurApproach />} />
        <Route path="/why-altiora" element={<WhyAltiora />} />
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin dashboard: separate layout, no public header/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboard />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="categories" element={<AdminCategories />} />
      </Route>
    </Routes>
  );
}
