import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import SimpleCTA from '../components/SimpleCTA';
import GoogleReviews from '../components/GoogleReviews';

const HomePage = () => {
  const { t } = useTranslation();

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
        <title>{t('home.meta.title')}</title>
        <meta
          name="description"
          content={t('home.meta.description')}
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
