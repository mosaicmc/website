import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FlipWords } from './ui/flip-words';
import { serviceYearsLabel, languagesSpokenLabel, assetPath } from '@/lib/utils';
import AnimatedBackground from './ui/AnimatedBackground';

import { Button } from '@/components/ui/button';

const STORIES_ENABLED = import.meta.env.VITE_FEATURE_STORIES_PAGE === 'true';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 section-spacing transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Using the reusable AnimatedBackground component */}
      <AnimatedBackground variant="default" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full glass-surface px-4 py-2 text-sm shadow-lg animate-fade-in-up transition-all duration-300 group cursor-pointer">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse group-hover:animate-heartbeat"></span>
                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">{t('hero.badge', { years: serviceYearsLabel() })}</span>
              </div>
              
              <h1 className="fluid-h1 text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-5xl leading-[1.1] text-gray-900 dark:text-white animate-fade-in-up-delay-100 max-w-4xl">
                <span className="block sm:inline">{t('hero.supporting')}{" "}</span>
                <FlipWords 
                  words={t('hero.words', { returnObjects: true }) as string[]}
                  duration={3000}
                  className="inline-block px-1 sm:px-2"
                />{" "}
                <span className="block sm:inline mt-1 sm:mt-0">{t('hero.communities')}</span>
              </h1>
              
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300 leading-relaxed whitespace-pre-line animate-fade-in-up-delay-200">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-[400px]:flex-row animate-fade-in-up-delay-300">
              <Button asChild size="lg" variant="cta" className="h-12 rounded-xl text-sm font-semibold">
                <Link to="/services" data-testid="hero-explore-btn">
                  {t('hero.exploreServices')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {STORIES_ENABLED && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 border-0 bg-card text-foreground hover:bg-card/90"
                >
                  <Link to="/stories">
                    <Play className="mr-2 h-4 w-4" />
                    {t('hero.watchStories')}
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fade-in-up-delay-400">
              {[
                { number: serviceYearsLabel(), label: t('hero.stats.years') },
                { number: "2,500+", label: t('hero.stats.families') },
                { number: languagesSpokenLabel(), label: t('hero.stats.languages') }
              ].map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-all duration-300 cursor-pointer p-2 rounded-lg hover:bg-white/10 dark:hover:bg-slate-800/20">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-earth dark:group-hover:text-earth transition-all duration-300 group-hover:animate-pulse-gentle">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Image with subtle animations */}
          <div className="relative animate-fade-in-right z-10">
            <div className="relative mx-auto aspect-square max-w-[500px] overflow-hidden rounded-3xl transition-all duration-700 group shadow-2xl z-10">
              <picture>
                <source media="(min-width: 768px)" srcSet={assetPath("/images/aged-care/Home_Hero_1200:600px/Home_Hero_1200px.webp")} type="image/webp" />
                <source media="(min-width: 768px)" srcSet={assetPath("/images/aged-care/Home_Hero_1200:600px/Home_Hero_1200px.jpg")} type="image/jpeg" />
                <source srcSet={assetPath("/images/aged-care/Home_Hero_1200:600px/Home_Hero_600px.webp")} type="image/webp" />
                <img
                  src={assetPath("/images/aged-care/Home_Hero_1200:600px/Home_Hero_600px.jpg")}
                  alt="Diverse group of young people celebrating together in a library setting"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  />
              </picture>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ocean/10 via-transparent to-sky/10 pointer-events-none"></div>
            </div>

              {/* Floating card: Satisfaction Rate */}
              <div className="hero-card hero-card-compact hero-card-pos-top-right animate-fade-in-left delay-500 z-20 group/card hover:shadow-2xl">
                <div className="flex items-center gap-4">
                <div className="hero-icon flex items-center justify-center rounded-full bg-leaf text-ocean font-bold text-sm shadow-inner shrink-0 transition-colors duration-300 group-hover/card:bg-ocean group-hover/card:text-white">
                  95%
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none group-hover/card:text-ocean dark:group-hover/card:text-sky transition-colors">{t('hero.stats.satisfaction')}</p>
                  <p className="text-xs text-muted-foreground group-hover/card:text-foreground font-medium mt-0">{t('hero.stats.feedback')}</p>
                </div>
              </div>
              </div>
             
              {/* Floating card: Office Locations (brand-aligned, accessible) */}
              <Link
                to="/locations"
                aria-label="View office locations across NSW"
              className="hero-card hero-card-compact hero-card-pos-bottom-left hover:shadow-2xl transition-all duration-300 group/card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background z-20"
              >
                <div className="flex items-center gap-4">
                <div className="hero-icon flex items-center justify-center rounded-full bg-leaf text-ocean group-hover/card:bg-ocean group-hover/card:text-white transition-colors duration-300 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none group-hover/card:text-ocean dark:group-hover/card:text-sky transition-colors">
                    {t('hero.stats.locations')}
                  </p>
                  <p className="text-xs text-muted-foreground group-hover/card:text-foreground font-medium mt-0">
                    {t('hero.stats.coverage')}
                  </p>
                </div>
              </div>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
