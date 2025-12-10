import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sun } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import SimpleCTA from '../components/SimpleCTA';
import GoogleReviews from '../components/GoogleReviews';
import { useTheme } from '../hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme();

  useEffect(() => {
    try {
      const key = 'preferredTheme';
      const existing = localStorage.getItem(key);
      if (!existing) localStorage.setItem(key, 'light');
      document.body.classList.add('theme-light');
    } catch { /* noop */ }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Mosaic Multicultural Connections | Support for NSW Communities</title>
        <meta
          name="description"
          content="Empowering multicultural communities across New South Wales through settlement support, home care, family services, and community engagement."
        />
      </Helmet>
      {theme === 'light' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ocean text-white text-xs font-medium shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
            <Sun className="h-3 w-3" />
            Light theme active
          </span>
        </div>
      )}
      <Hero />
      <ServiceCards />
      <Statistics />
      <Testimonials />
      <GoogleReviews />
      <SimpleCTA />
    </div>
  );
};

export default HomePage;
