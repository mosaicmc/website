import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import SimpleCTA from '../components/SimpleCTA';
import GoogleReviews from '../components/GoogleReviews';

const HomePage = () => {

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
