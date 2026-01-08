import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <section className="relative section-spacing bg-gradient-to-br from-ocean via-sky to-ocean dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
      {/* Enhanced glass morphism background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean/80 via-sky/70 to-ocean/80 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/90"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 text-sm shadow-lg mb-8">
            <span className="mr-2 h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-white font-medium">{t('cta.badge')}</span>
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('cta.headlinePrefix')}{" "}
            <span className="bg-gradient-to-r from-sand via-white to-sand bg-clip-text text-transparent">
              {t('cta.headlineEmphasis')}
            </span>
          </h2>
          
          {/* Content */}
          <p className="text-base sm:text-xl text-white/90 subsection-break leading-relaxed max-w-3xl mx-auto break-words">
            {t('cta.helperText')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center subsection-break">
            <Button asChild size="lg" variant="cta" className="rounded-xl px-8 py-4 text-lg font-semibold">
              <Link to="/services">
                {t('cta.primaryButtonLabel')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="rounded-xl px-8 py-4 text-lg font-semibold border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white">
              <Link to="/contact-us">
                <Phone className="mr-2 h-5 w-5" />
                {t('cta.secondaryButtonLabel')}
              </Link>
            </Button>
          </div>
          
          {/* Service Areas Notice */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg max-w-2xl mx-auto">
            <p className="text-white/80 text-sm leading-relaxed break-words">
              <span className="text-white font-medium">{t('cta.footnote.label')}</span> {t('cta.footnote.textPrefix')}{" "}
              <Link 
                to="/contact-us" 
                className="text-sand hover:text-white font-medium underline decoration-sand/50 hover:decoration-white transition-colors duration-300"
              >
                {t('cta.footnote.contactLink')}
              </Link>{" "}
              {t('cta.footnote.textSuffix')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
