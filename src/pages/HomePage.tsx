import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import { PageTransition } from '@/components/ui/PageTransition';
import ServiceCards from '../components/ServiceCards';
const Statistics = lazy(() => import('../components/Statistics'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const SimpleCTA = lazy(() => import('../components/SimpleCTA'));
const GoogleReviews = lazy(() => import('../components/GoogleReviews'));

const HomePage = () => {
  const { t } = useTranslation();
  const lazyFallback = <div className="min-h-[1px]" aria-hidden />;

  useEffect(() => {
    try {
      const key = 'preferredTheme';
      const existing = localStorage.getItem(key);
      if (!existing) localStorage.setItem(key, 'light');
      document.body.classList.add('theme-light');
    } catch { /* noop */ }
  }, []);

  return (
    <PageTransition>
      <div>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta
          name="description"
          content="Mosaic Multicultural Connections supports multicultural communities across NSW with settlement, aged care, family services, and community programs since 1980."
        />
      </Helmet>
      <Hero />
      <ServiceCards />
      <Suspense fallback={lazyFallback}>
        <Statistics />
      </Suspense>
      <Suspense fallback={lazyFallback}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={lazyFallback}>
        <GoogleReviews />
      </Suspense>
      <Suspense fallback={lazyFallback}>
        <SimpleCTA />
      </Suspense>
      </div>
    </PageTransition>
  );
};

export default HomePage;
