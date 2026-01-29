"use client";

import ServicesList from '../components/features-06/features-06';
import RelatedServices from '@/components/RelatedServices';
import { AU } from '@/lib/auSpelling';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '@/components/ui/PageTransition';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="animate-fade-in">
      
      {/* Hero Section */}
      <Section variant="default" divider="top" fade="top">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-badge bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">{t('servicesPage.hero.badge')}</span>
          </div>
          <h1 className="fluid-h1 text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">
            {AU(t('servicesPage.hero.title'))}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up">
            {AU(t('servicesPage.hero.description'))}
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
            {AU(t('servicesPage.hero.subtext'))}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up">
            <Button asChild variant="cta" size="cta" className="w-full sm:w-auto">
              <a href="https://forms.mosaicmc.org.au/refer" target="_blank" rel="noopener noreferrer" aria-label={`${t('servicesPage.hero.referral')} (opens in new tab)`} className="inline-flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {t('servicesPage.hero.referral')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="cta-outline" size="cta" className="w-full sm:w-auto">
              <Link to="/contact-us">
                {t('servicesPage.hero.contact')}
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      


      {/* Services List Section */}
      <ServicesList
        title={t('servicesPage.list.title')}
      />
      <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
