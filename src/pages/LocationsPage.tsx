import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Navigation, Mail } from 'lucide-react';
import RelatedServices from '@/components/RelatedServices';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { LOCATIONS } from '@/data/locations';
import { SITE_CONTACT_PHONE, SITE_CONTACT_EMAIL } from '@/config/site';

const LocationsPage = () => {
  const locations = LOCATIONS;

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Our Locations</title>
        <meta name="description" content="Find Mosaic offices across NSW with addresses, hours, services, and contact details for your nearest location." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-foreground/80 font-medium">Find Us</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-foreground">Our Locations</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Four convenient offices across NSW, each staffed with multilingual professionals ready to support your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stack-vertical">
            {locations.map((location, index) => (
              <div key={index} className="backdrop-blur-md bg-card/70 rounded-2xl shadow-xl overflow-hidden border border-border/60 hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={location.image}
                      alt={`${location.name} exterior`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-ocean text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      {location.name}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-foreground mb-6">{location.name}</h2>
                    
                    {/* Contact Info */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{location.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-sky flex-shrink-0" />
                        <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-ocean transition-colors">
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-sky flex-shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-muted-foreground hover:text-ocean transition-colors">
                          {location.email}
                        </a>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-sky mt-1 flex-shrink-0" />
                        <div className="text-muted-foreground">
                          <div>{location.hours.weekdays}</div>
                          <div>{location.hours.weekend}</div>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
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

                    

                    {/* Actions */}
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
