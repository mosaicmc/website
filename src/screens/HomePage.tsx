"use client";

import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import { PageTransition } from '@/components/ui/PageTransition';
import ServiceCards from '../components/ServiceCards';
const Statistics = lazy(() => import('../components/Statistics'));
const ImpactStoriesPreview = lazy(() => import('../components/ImpactStoriesPreview'));
const MosaicTestimonials = lazy(() => import('../components/MosaicTestimonials'));
const SimpleCTA = lazy(() => import('../components/SimpleCTA'));
const GoogleReviews = lazy(() => import('../components/GoogleReviews'));

const HomePage = () => {
  const lazyFallback = <div className="min-h-[1px]" aria-hidden />;

  return (
    <PageTransition>
      <div>
      
      <Hero />
      <ServiceCards />
      <Suspense fallback={lazyFallback}>
        <Statistics />
      </Suspense>
      <Suspense fallback={lazyFallback}>
        <ImpactStoriesPreview />
      </Suspense>
      <Suspense fallback={lazyFallback}>
        <MosaicTestimonials />
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
