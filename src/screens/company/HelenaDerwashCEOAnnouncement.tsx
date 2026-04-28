"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import { assetPath, serviceYearsBase } from '@/lib/utils';
import { Globe, Award, Heart, Quote } from 'lucide-react';

type QuoteCardProps = {
  quote: string;
  name: string;
  title: string;
};

const QuoteCard = ({ quote, name, title }: QuoteCardProps) => {
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-slate-50 shadow-xl dark:bg-slate-800">
      <Quote className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rotate-12 text-white/5" aria-hidden="true" />
      <blockquote className="relative z-10 p-8 md:p-12">
        <p className="text-lg md:text-2xl font-medium leading-relaxed">
          “{quote}”
        </p>
      </blockquote>
      <figcaption className="flex items-center gap-4 border-t border-white/10 px-8 py-6 md:px-12 md:py-8">
        <div className="h-1 w-10 md:w-14 rounded-full bg-ocean" />
        <div className="min-w-0">
          <p className="text-base md:text-xl font-bold text-white">{name}</p>
          <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/70">{title}</p>
        </div>
      </figcaption>
    </figure>
  );
};

const HelenaDerwashCEOAnnouncement = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const yearsSince1986 = currentYear - 1986;
  const bodyTextClass = "text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed";

  return (
    <div className="animate-fade-in bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
      {/* Hero Section */}
      <Section padding="sm" center className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-border py-24 md:py-32">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-ocean/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4 md:px-6">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold bg-ocean text-white mb-8 border border-ocean/40 shadow-sm">
            <Award className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
            Leadership Announcement
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
            {t('helenaDerwashCEO.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {t('helenaDerwashCEO.hero.description')}
          </p>
        </div>
      </Section>

      {/* Main Content & Headshot */}
      <Section padding="lg" containerClassName="max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sidebar / Headshot */}
          <div className="w-full lg:col-span-5 space-y-10 lg:sticky lg:top-32 order-2 lg:order-1">
            <div className="relative group max-w-xl mx-auto lg:max-w-none">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-ocean to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-200 dark:bg-slate-800">
                <img
                  src={assetPath("/images/news/Announcement/Helena_Derwash.png")}
                  alt={t('helenaDerwashCEO.photoCaption')}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <p className="text-lg md:text-xl font-semibold leading-tight">{t('helenaDerwashCEO.photoCaption')}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <h2 className="sr-only">Highlights</h2>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border/50 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-ocean/5 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-ocean" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Global Perspective</h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">20+ years of humanitarian leadership across international borders</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border/50 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-500/5 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Lived Experience</h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">Deep understanding of displacement and multicultural integration</p>
              </div>
            </div>
          </div>

          {/* Main Body Text */}
          <div className="w-full lg:col-span-7 space-y-12 lg:pt-4 order-1 lg:order-2">
            <div className="max-w-none">
              <p className="text-lg md:text-2xl leading-relaxed font-bold text-slate-900 dark:text-slate-50 border-l-4 border-ocean pl-6 md:pl-8 py-2 mb-10">
                {t('helenaDerwashCEO.intro.paragraph1', { years: serviceYearsBase() })}
              </p>
              
              <div className="space-y-6">
                <p className={bodyTextClass}>{t('helenaDerwashCEO.intro.paragraph2', { date: "Tuesday, 28 April 2026" })}</p>

                <div className="my-10 md:my-16">
                  <QuoteCard
                    quote={t('helenaDerwashCEO.quote.helena')}
                    name="Helena Derwash"
                    title={t('helenaDerwashCEO.quote.helenaTitle')}
                  />
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mt-12 mb-6">
                  {t('helenaDerwashCEO.section1.title')}
                </h2>
                <div className="space-y-6">
                  <p className={bodyTextClass}>{t('helenaDerwashCEO.section1.paragraph1', { years: yearsSince1986 })}</p>
                  <p className={bodyTextClass}>{t('helenaDerwashCEO.section1.paragraph2')}</p>
                  <p className={bodyTextClass}>{t('helenaDerwashCEO.section1.paragraph3')}</p>
                  <p className={bodyTextClass}>{t('helenaDerwashCEO.section1.paragraph4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Strategy Section */}
      <Section padding="lg" className="bg-white dark:bg-slate-900 border-y border-border py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 md:mb-16 text-center tracking-tight text-slate-900 dark:text-slate-50">
            {t('helenaDerwashCEO.section2.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-border/60 hover:border-ocean/30 transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <p className={bodyTextClass}>{t('helenaDerwashCEO.section2.paragraph1')}</p>
                <p className={bodyTextClass}>{t('helenaDerwashCEO.section2.paragraph2')}</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-border/60 shadow-sm min-h-[260px] md:min-h-0">
              <img
                src={assetPath("/images/news/Announcement/4.png")}
                alt="Helena Derwash with Sandra Feltham, Board Chair - Mosaic Multicultural Connections"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <QuoteCard
            quote={t('helenaDerwashCEO.quote.sandra')}
            name="Sandra Feltham"
            title={t('helenaDerwashCEO.quote.sandraTitle')}
          />
        </div>
      </Section>

      {/* Transition & Next Steps */}
      <Section padding="lg" containerClassName="max-w-6xl" className="py-16 md:py-24">
        <div className="space-y-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 tracking-tight text-center lg:text-left text-slate-900 dark:text-slate-50">{t('helenaDerwashCEO.section3.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <p className={bodyTextClass}>{t('helenaDerwashCEO.section3.paragraph1')}</p>
              <p className={bodyTextClass}>{t('helenaDerwashCEO.section3.paragraph2')}</p>
            </div>
          </div>

          <div className="bg-ocean rounded-3xl p-8 md:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl group">
            <Globe className="absolute -bottom-20 -right-20 w-96 h-96 text-white/5 transition-transform duration-1000 group-hover:scale-105" />
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-8 tracking-tight">{t('helenaDerwashCEO.section4.title')}</h2>
              <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                <p className="text-lg md:text-2xl text-white/95 leading-relaxed">
                  {t('helenaDerwashCEO.section4.paragraph1')}
                </p>
                <p className="text-base md:text-lg text-white/85 leading-relaxed">
                  {t('helenaDerwashCEO.section4.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HelenaDerwashCEOAnnouncement;
