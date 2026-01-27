import React from 'react';
import RelatedServices from '@/components/RelatedServices';
import { Helmet } from 'react-helmet-async';
import { assetPath } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const DonatePage = () => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>{t('donate.meta.title')}</title>
        <meta
          name="description"
          content={t('donate.meta.description')}
        />
      </Helmet>
      {/* Hero */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="fluid-h1 text-4xl font-bold mb-3 text-gray-900 dark:text-white">{t('donate.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('donate.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-3">{t('donate.impact.title')}</h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  {t('donate.impact.text1')}
                </p>
                <p>
                  {t('donate.impact.text2')}
                </p>
                <p>
                  {t('donate.impact.text3')}
                </p>
                <p className="font-medium text-foreground">{t('donate.impact.abn')}</p>
                <div className="pt-2">
                  <a
                    href="https://www.acnc.gov.au/charity/charities/83faff37-39af-e811-a960-000d3ad24282/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="ACNC Registered Charity Profile"
                    className="inline-flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <img
                      src={assetPath("/images/charity_logo-150x150.png")}
                      alt="ACNC Registered Charity"
                      className="h-24 w-auto object-contain transition-transform hover:scale-105"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="aspect-[16/12] sm:aspect-[16/10] w-full">
                  <iframe
                    src="https://mosaicmc.raisely.com/embed"
                    title="Donate to Mosaic Multicultural Connections"
                    width="100%"
                    height="620"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground text-center">{t('donate.securePayment')}</p>
        </div>
      </section>
      <RelatedServices />
    </div>
  );
};

export default DonatePage;
