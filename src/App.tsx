import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LocationsPage from './pages/LocationsPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import ResourcesPage from './pages/ResourcesPage';
import StoriesPage from './pages/StoriesPage';
import ContactPage from './pages/ContactPage';
import SettlementSupportPage from './pages/services/SettlementSupportPage';
import AgedCarePage from './pages/services/AgedCarePage';
import FamilySupportPage from './pages/services/FamilySupportPage';
import CommunityEngagementPage from './pages/services/CommunityEngagementPage';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-dark-bg">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/settlement-support" element={<SettlementSupportPage />} />
              <Route path="/services/aged-care" element={<AgedCarePage />} />
              <Route path="/services/family-support" element={<FamilySupportPage />} />
              <Route path="/services/community-engagement" element={<CommunityEngagementPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/get-involved" element={<GetInvolvedPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;