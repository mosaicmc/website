import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Navigation, Phone } from 'lucide-react';
import RelatedServices from '@/components/RelatedServices';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { LOCATIONS } from '@/data/locations';
import { SITE_CONTACT_PHONE, SITE_CONTACT_EMAIL } from '@/config/site';
import { Section } from '@/components/ui/Section';
import ContactFormBlock from '@/components/form-patterns-4';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LocationsPage = () => {
  const locations = LOCATIONS;

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Contact Mosaic Multicultural Connections — Get in touch</title>
        <meta name="description" content="Get in touch with Mosaic to find the right support, services, or local office. Whether for yourself, a family member, or a client, our team will guide you and respond within 48 business hours." />
        <meta property="og:title" content="Contact Mosaic Multicultural Connections — Get in touch" />
        <meta property="og:description" content="Get in touch with Mosaic to find the right support, services, or local office. Our team will respond within 48 business hours." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Contact Mosaic Multicultural Connections — Get in touch" />
        <meta name="twitter:description" content="Use the form to ask a question, request support, or connect with a local office. Response within 48 business hours." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Mosaic Multicultural Connections',
          url: 'https://mosaicmc.org.au/contact-us',
          description: 'Get in touch with Mosaic to find the right support, services, or local office. Our team will respond within 48 business hours.',
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-foreground/80 font-medium">Contact</span>
            </div>
            <h1 className="fluid-h1 text-5xl font-bold mb-6 text-foreground">Get in touch with Mosaic</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">We’re here to help you find the right support, services, or local office. Whether you’re reaching out for yourself, a family member, or a client, our team will guide you to the right place.</p>
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
                <h3 className="text-xl font-bold text-foreground">Emergency Services</h3>
              </CardHeader>
              <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  We do not provide 24/7 emergency support. For crisis services and emergency contacts, please visit our resources page.
                </p>
                <Button asChild className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2">
                  <a href="/resources" aria-label="View Emergency Services">View Emergency Services</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow-sm border-l-2 border-sun">
              <CardHeader className="p-5 md:p-6">
                <h3 className="text-xl font-bold text-foreground">Quick Connect</h3>
              </CardHeader>
              <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Working Days: Monday - Friday (except Public Holidays). Business Hours: 9:00am - 5:00pm
                </p>
                <a
                  href="tel:1800813205"
                  aria-label="Call 1800 813 205"
                  className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white h-9 px-4 py-2 rounded-md text-sm font-medium w-full transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 hover:shadow-lg hover:shadow-ocean/25 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                >
                  <Phone className="h-5 w-5" />
                  Call 1800 813 205
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
                    <video
                      className="w-full h-64 object-cover"
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      tabIndex={0}
                      poster={location.image}
                      aria-label={`${location.name} exterior video`}
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
                      onFocus={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      }}
                      onBlur={(e) => {
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          const v = e.currentTarget as HTMLVideoElement;
                          v.muted = true;
                          v.play().catch(() => {});
                        }
                      }}
                    >
                      {location.videoWebm && <source src={location.videoWebm} type="video/webm" />}
                      {location.videoMp4 && <source src={location.videoMp4} type="video/mp4" />}
                    </video>
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
                  <h2 className="text-3xl font-bold text-foreground mb-6">{location.name}</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{location.address}</span>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Available Services</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {location.services.map((service, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-leaf rounded-full"></div>
                          <span className="text-muted-foreground text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-ocean text-white px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-ocean/90 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2">
                      Visit This Office
                    </button>
                    {location.directionsUrl ? (
                      <a
                        href={location.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${location.name}`}
                        className="flex-1 border border-border text-foreground hover:bg-sand/50 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </a>
                    ) : (
                      <button className="flex-1 border border-border text-foreground hover:bg-sand/50 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </button>
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
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Not Sure Which Office to Visit?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Contact our head office and we'll help you find the right location and services for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${SITE_CONTACT_PHONE.replace(/\s/g, '')}`}
                className="bg-ocean text-white px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-ocean/90 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
              >
                Call {SITE_CONTACT_PHONE}
              </a>
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="border-2 border-border text-foreground hover:bg-sand/50 px-8 py-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
