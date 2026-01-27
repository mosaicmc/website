import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Heart, Users, Handshake, ArrowRight, CheckCircle } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';
import { useTranslation, Trans } from 'react-i18next';

const ServiceCards = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: t('serviceCards.settlement.title'),
      description: t('serviceCards.settlement.description'),
      features: t('serviceCards.settlement.features', { returnObjects: true }) as string[],
      link: "/services/settlement-support",
      color: "sky"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('serviceCards.agedCare.title'),
      description: t('serviceCards.agedCare.description'),
      features: t('serviceCards.agedCare.features', { returnObjects: true }) as string[],
      link: "/services/aged-care",
      color: "care"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('serviceCards.familySupport.title'),
      description: t('serviceCards.familySupport.description'),
      features: t('serviceCards.familySupport.features', { returnObjects: true }) as string[],
      link: "/services/family-support",
      color: "sun"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: t('serviceCards.communityEngagement.title'),
      description: t('serviceCards.communityEngagement.description'),
      features: t('serviceCards.communityEngagement.features', { returnObjects: true }) as string[],
      link: "/services/community-engagement",
      color: "leaf"
    }
  ];

  return (
    <section className="relative section-spacing bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      {/* Enhanced glass morphism background with multiple layers - adaptive for light/dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl motion-safe:animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl motion-safe:animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trusted Partner Section - Page Flow Optimized */}
        <div className="relative section-break section-spacing">
          {/* Subtle background gradient - different from glass morphism */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-800/30"></div>
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-7xl mx-auto relative">
            {/* Left Column - Compelling Headline (2/5 width) */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="text-sm font-medium text-earth-text dark:text-earth/90 uppercase tracking-wider">{t('serviceCards.trustedPartner.badge')}</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    {t('serviceCards.trustedPartner.titlePrefix')}{" "}
                    <span className="text-brand-gradient">
                      {t('serviceCards.trustedPartner.titleHighlight')}
                    </span>
                    <br />
                    {t('serviceCards.trustedPartner.titleSuffix')}
                  </h2>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-sky to-ocean"></div>
                  
                  <p className="text-xl text-gray-600 dark:text-white/70 font-light leading-relaxed">
                    {t('serviceCards.trustedPartner.subtitle')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Flowing Content (3/5 width) */}
            <div className="lg:col-span-3 stack-vertical">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-gray-700 dark:text-white/80 font-light">
                  <Trans
                    i18nKey="serviceCards.trustedPartner.intro"
                    components={{ 1: <strong className="font-semibold text-ocean dark:text-sky/90" /> }}
                  />
                </p>
                
                <p className="text-lg leading-relaxed text-gray-600 dark:text-white/70">
                  {t('serviceCards.trustedPartner.body1')}
                </p>
                
                <div className="border-l-4 border-sky/30 pl-6 my-8">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-white/80 italic">
                    {t('serviceCards.trustedPartner.quote')}
                  </p>
                </div>
                
                <p className="text-xl leading-relaxed text-gray-800 dark:text-white font-medium">
                  {t('serviceCards.trustedPartner.conclusionPrefix')}{" "}
                  <span className="text-brand-gradient font-semibold">
                    {t('serviceCards.trustedPartner.conclusionHighlight')}
                  </span>{" "}
                  {t('serviceCards.trustedPartner.conclusionSuffix')}
                </p>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-sky rounded-full"></div>
                  <span>{t('serviceCards.trustedPartner.trustIndicators.interpreters')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-ocean rounded-full"></div>
                  <span>{t('serviceCards.trustedPartner.trustIndicators.culturallyResponsive')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                  <div className="w-2 h-2 bg-earth rounded-full"></div>
                  <span>{t('serviceCards.trustedPartner.trustIndicators.communityFocused')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Header with glass effect */}
        <div className="text-center subsection-break">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-gray-700 dark:text-white/90 font-medium">{t('serviceCards.sectionBadge')}</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('serviceCards.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
            {t('serviceCards.sectionDescription')}
          </p>
        </div>

        {/* Services Grid with enhanced glass morphism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15 flex flex-col h-full"
            >
              {/* GlowingEffect with custom parameters for service cards */}
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0.05}
                movementDuration={1.5}
                borderWidth={2}
              />
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content with enhanced readability */}
              <div className="relative z-10 flex flex-col h-full flex-1">
                <div className="flex items-start space-x-6 flex-1">
                  <div className="flex-shrink-0">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                      service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      service.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      service.color === 'care' ? 'bg-gradient-to-br from-care to-care/80' :
                      service.color === 'leaf' ? 'bg-gradient-to-br from-leaf to-leaf/80' :
                      'bg-gradient-to-br from-sun to-sun/80'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6 flex-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-white/70">
                          <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 ${
                            service.color === 'sky' ? 'text-sky-text' :
                            service.color === 'earth' ? 'text-earth-text' :
                            service.color === 'care' ? 'text-care-text' :
                            service.color === 'leaf' ? 'text-leaf-text' :
                            'text-sun-text'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="cta"
                    asChild
                    className="inline-flex items-center justify-center px-6 py-3 h-11 rounded-full bg-ocean text-white font-medium text-[15px] hover:bg-ocean/90 hover:shadow-ocean/25 min-w-40 w-full sm:w-auto"
                  >
                    <Link to={service.link}>
                      {t('serviceCards.learnMore')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Subtle top accent */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${
                service.color === 'sky' ? 'bg-gradient-to-r from-sky to-sky/80' :
                service.color === 'earth' ? 'bg-gradient-to-r from-earth to-earth/80' :
                service.color === 'care' ? 'bg-gradient-to-r from-care to-care/80' :
                service.color === 'leaf' ? 'bg-gradient-to-r from-leaf to-leaf/80' :
                'bg-gradient-to-r from-sun to-sun/80'
              } opacity-60`}></div>
              
              {/* Corner glow effect */}
              <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
                service.color === 'sky' ? 'bg-sky' :
                service.color === 'earth' ? 'bg-earth' :
                service.color === 'care' ? 'bg-care' :
                service.color === 'leaf' ? 'bg-leaf' :
                'bg-sun'
              } opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button
            variant="cta"
            asChild
            className="inline-flex items-center justify-center rounded-xl bg-ocean px-8 py-4 text-base font-semibold text-white shadow-xl hover:bg-ocean/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean backdrop-blur-sm"
          >
            <Link to="/services">
              {t('serviceCards.viewAll')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
