import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import RelatedServices from '@/components/RelatedServices';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { LOCATIONS } from '@/data/locations';
import { SITE_CONTACT_PHONE, SITE_CONTACT_EMAIL } from '@/config/site';
import { Section } from '@/components/ui/Section';
import ContactFormBlock from '@/components/form-patterns-4';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AU } from '@/lib/auSpelling';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const LocationsPage = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const locations = LOCATIONS;

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>{t('locationsPage.meta.title')}</title>
        <meta name="description" content="Mosaic office locations across NSW — Newcastle, Central Coast, Armidale, Tamworth. Find your nearest office and contact our teams." />
        <meta property="og:title" content={t('locationsPage.meta.title')} />
        <meta property="og:description" content="Mosaic office locations across NSW — Newcastle, Central Coast, Armidale, Tamworth. Find your nearest office and contact our teams." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={t('locationsPage.meta.title')} />
        <meta name="twitter:description" content="Mosaic office locations across NSW — Newcastle, Central Coast, Armidale, Tamworth. Find your nearest office and contact our teams." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('locationsPage.meta.title'),
          url: 'https://mosaicmc.org.au/contact-us',
          description: AU(t('locationsPage.meta.description')),
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-foreground/80 font-medium">{t('locationsPage.hero.badge')}</span>
            </div>
            <h1 className="fluid-h1 text-5xl font-bold mb-6 text-foreground">{t('locationsPage.hero.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{AU(t('locationsPage.hero.description'))}</p>
          </div>
        </div>
      </section>

      <Section overlay className="py-3 md:py-4 lg:py-5 section-break" containerClassName="max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <ContactFormBlock />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <Card className="rounded-lg shadow-sm border-l-2 border-sun">
              <CardHeader className="p-5 md:p-6">
                <h3 className="text-xl font-bold text-foreground">{t('locationsPage.emergency.title')}</h3>
              </CardHeader>
              <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {AU(t('locationsPage.emergency.description'))}
                </p>
                <Button asChild className="bg-ocean bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2">
                  <a href="/resources" aria-label={t('locationsPage.emergency.action')}>{t('locationsPage.emergency.action')}</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow-sm border-l-2 border-sun">
              <CardHeader className="p-5 md:p-6">
                <h3 className="text-xl font-bold text-foreground">{t('locationsPage.quickConnect.title')}</h3>
              </CardHeader>
              <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {t('locationsPage.quickConnect.hours')}
                </p>
                <a
                  href="tel:1800813205"
                  aria-label={t('locationsPage.quickConnect.call', { phone: SITE_CONTACT_PHONE })}
                  className="bg-ocean hover:bg-ocean/90 text-white hover:text-white h-9 px-4 py-2 rounded-md text-sm font-medium w-full transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 hover:shadow-lg hover:shadow-ocean/25 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                >
                  <Phone className="h-5 w-5" />
                  {t('locationsPage.quickConnect.call', { phone: SITE_CONTACT_PHONE })}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Locations Grid */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-8">
            {locations.map((location, index) => (
              <div key={index} className="backdrop-blur-md bg-card/70 rounded-2xl shadow-xl overflow-hidden border border-border/60 hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  {(location.videoWebm || location.videoMp4) ? (
                    prefersReducedMotion ? (
                      <img
                        src={location.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <video
                        className="w-full aspect-video object-cover"
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        poster={location.image}
                        aria-hidden="true"
                        onMouseEnter={(e) => {
                          e.currentTarget.muted = true;
                          e.currentTarget.play().catch(() => {});
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.muted = true;
                          if (e.currentTarget.paused) {
                            e.currentTarget.play().catch(() => {});
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.muted = true;
                          e.currentTarget.play().catch(() => {});
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      >
                        {location.videoWebm && <source src={location.videoWebm} type="video/webm" />}
                        {location.videoMp4 && <source src={location.videoMp4} type="video/mp4" />}
                      </video>
                    )
                  ) : (
                    <img
                      src={location.image}
                      alt={`${location.name} exterior`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-ocean text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                    {location.name}
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">{location.name}</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-sky flex-shrink-0" />
                      <span className="text-muted-foreground">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-sky flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {location.hours.weekdays}
                      </span>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">{t('locationsPage.location.services')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {location.services.map((service, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="inline-block size-2 bg-leaf rounded-full flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {location.directionsUrl ? (
                        <Button asChild className="flex-1 rounded-lg px-6 py-3 font-medium">
                          <a
                            href={location.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t('locationsPage.location.directions')} ${location.name} (opens in new tab)`}
                            className="flex items-center justify-center gap-1"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            {t('locationsPage.location.directions')}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </Button>
                      ) : (
                      <Button className="flex-1 rounded-lg px-6 py-3 font-medium">
                        <span className="flex items-center justify-center">
                          <Navigation className="h-4 w-4 mr-2" />
                          {t('locationsPage.location.directions')}
                        </span>
                      </Button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelatedServices />
      {/* Contact CTA */}
      <section className="section-center py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl p-12 border border-white/20 dark:border-slate-700/50 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('locationsPage.cta.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {AU(t('locationsPage.cta.description'))}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${SITE_CONTACT_PHONE.replace(/\s/g, '')}`}
                className="bg-ocean text-white hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-ocean/90 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
              >
                {t('locationsPage.cta.call', { phone: SITE_CONTACT_PHONE })}
              </a>
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="bg-slate-900 dark:bg-slate-700 text-white border-2 border-slate-900 dark:border-slate-700 px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-slate-800 dark:hover:bg-slate-600 hover:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                {t('locationsPage.cta.email')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
