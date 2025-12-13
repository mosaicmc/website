import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const SimpleCTA = () => {
  return (
    <section className="relative section-spacing overflow-hidden bg-background transition-colors duration-300 bg-gradient-to-br from-sky via-ocean to-earth dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/85 via-ocean/90 to-earth/85 dark:from-slate-900/75 dark:via-slate-800/75 dark:to-slate-900/75"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-earth/25 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ocean/15 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/90 border border-sand/50 px-8 py-3 text-sm shadow-xl mb-8">
            <span className="mr-2 h-2 w-2 rounded-full bg-ocean animate-pulse"></span>
            <span className="text-ocean font-semibold tracking-wide">TAKE ACTION TODAY</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Ready to Take Your{" "}
            <span className="bg-gradient-to-r from-sand via-white to-sand bg-clip-text text-transparent drop-shadow-lg dark:text-white dark:bg-clip-text dark:bg-gradient-to-r dark:from-sand dark:via-white dark:to-sand">
              Next Step?
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-sand/95 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Whether you're seeking settlement support, family assistance, home care services, or community connections, our qualified team is here to help. All consultations are free and available in your preferred language.
          </p>
          
          <div className="max-w-5xl mx-auto text-center mb-6">
            <div className="text-sm md:text-xs uppercase tracking-wide text-white/85">What happens next</div>
            <div className="mt-2 px-4">
              <div className="flex flex-col items-center gap-3 md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-4">
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center size-7 md:size-6 rounded-full border border-white/30 bg-white/15 text-white/90 text-xs font-medium">1</span>
                  <span className="text-base md:text-sm text-white/90 leading-6 md:leading-5 break-words md:whitespace-nowrap">We review your enquiry.</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center size-7 md:size-6 rounded-full border border-white/30 bg-white/15 text-white/90 text-xs font-medium">2</span>
                  <span className="text-base md:text-sm text-white/90 leading-6 md:leading-5 break-words md:whitespace-nowrap">We contact you in your preferred language.</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center size-7 md:size-6 rounded-full border border-white/30 bg-white/15 text-white/90 text-xs font-medium">3</span>
                  <span className="text-base md:text-sm text-white/90 leading-6 md:leading-5 break-words md:whitespace-nowrap">We guide you through the next steps.</span>
                </div>
              </div>
            </div>
          </div>
          
          
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center section-break">
            <Link
              to="/services"
              className="group relative inline-flex items-center justify-center rounded-2xl bg-ocean text-white px-10 py-5 text-xl font-bold shadow-2xl hover:bg-ocean/90 hover:shadow-ocean/30 transition-all duration-300 hover:scale-105 active:scale-98 border-2 border-ocean/20 overflow-hidden focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
            >
              <span className="relative z-10">Explore Our Services</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center rounded-2xl backdrop-blur-md bg-white/15 border-2 border-border text-foreground px-10 py-5 text-xl font-bold shadow-2xl hover:bg-sand/20 hover:text-foreground transition-all duration-300 hover:scale-105 active:scale-98 overflow-hidden focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
            >
              <Phone className="mr-3 h-6 w-6 relative z-10" />
              <span className="relative z-10">Get Support Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
          
          <div className="backdrop-blur-md bg-sand/20 rounded-2xl p-8 border border-sand/30 shadow-xl max-w-3xl mx-auto">
            <p className="text-foreground/90 dark:text-white/90 text-base leading-relaxed">
              <span className="text-sand font-bold">*Service Areas:</span> Our services may vary by location. Please{" "}
              <Link 
                to="/contact" 
                className="text-white hover:text-sand font-bold underline decoration-2 underline-offset-4 hover:decoration-sand transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
              >
                Contact us
              </Link>{" "}
              to confirm availability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleCTA;
