import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { WorksPage } from './pages/WorksPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { CenterHelpPage } from './pages/CenterHelpPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { ContentFieldDetailPage } from './pages/ContentFieldDetailPage';
import { ContactPage } from './pages/ContactPage';
import { SuggestionPage } from './pages/SuggestionPage';
import { ComplaintPage } from './pages/ComplaintPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

// Admin Dashboard & Auth
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#080808] text-white font-cairo antialiased selection:bg-[#B5121B] selection:text-white flex flex-col justify-between">
      {/* Sticky Global Navbar (Hidden on Admin routes) */}
      {!isAdminRoute && <Navbar />}

      {/* Dynamic Route Pages */}
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Content Fields Detail Routes */}
          <Route path="/content/:slug" element={<ContentFieldDetailPage />} />

          {/* Services Routes */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />

          {/* News Routes */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Works / Portfolio Routes */}
          <Route path="/works" element={<WorksPage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />

          {/* Resources & Tools Routes */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:sub" element={<ResourcesPage />} />
          <Route path="/tools/:slug" element={<ToolDetailPage />} />

          {/* Help & Contact Routes */}
          <Route path="/centerhelp" element={<CenterHelpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/*" element={<AdminDashboardPage />} />
        </Routes>
      </main>

      {/* Global Footer (Hidden on Admin routes) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <CMSProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </CMSProvider>
  );
}

export default App;
