"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import RelatedServices from '@/components/RelatedServices';
import { PageTransition } from '@/components/ui/PageTransition';
import { AU } from '@/lib/auSpelling';

type StoryId = 'mustafa' | 'orien' | 'akol';

const STORY_HERO_IMAGES: Partial<Record<StoryId, { src: string; alt: string }>> = {
  mustafa: {
    src: '/images/stories/mustafa-1-portrait.jpg',
    alt: 'Mustafa Mohmand "Zac" standing on the football pitch sideline',
  },
  orien: {
    src: '/images/stories/orien-1-portrait.jpg',
    alt: 'Orien Khalaf smiling inside the Thread Shed community hall, Newcastle',
  },
  akol: {
    src: '/images/stories/akol-1-portrait.jpg',
    alt: 'Akol Koor smiling in Armidale, NSW',
  },
};

// Program colour mapping:
//   Mustafa — COMPACT (Community Engagement) → leaf (green)
//   Orien   — SETS → sky (teal)
//   Akol    — SETS → sky (teal)
//   Family Services → sun (gold)  |  Aged Care → care (pink)
const STORY_COLORS: Record<StoryId, { accent: string; accentText: string; badge: string; panel: string; panelText: string; panelMeta: string; dot: string }> = {
  mustafa: {
    accent: 'bg-leaf',
    accentText: 'text-leaf-text dark:text-leaf',
    badge: 'bg-white/20 text-white border-white/30',
    panel: 'bg-leaf/10 dark:bg-leaf/15',
    panelText: 'text-gray-900 dark:text-white',
    panelMeta: 'text-gray-600 dark:text-leaf/80',
    dot: 'bg-leaf',
  },
  orien: {
    accent: 'bg-sky',
    accentText: 'text-sky-text dark:text-sky',
    badge: 'bg-white/20 text-white border-white/30',
    panel: 'bg-sky/10 dark:bg-sky/15',
    panelText: 'text-gray-900 dark:text-white',
    panelMeta: 'text-gray-600 dark:text-sky/80',
    dot: 'bg-sky',
  },
  akol: {
    accent: 'bg-sky',
    accentText: 'text-sky-text dark:text-sky',
    badge: 'bg-white/20 text-white border-white/30',
    panel: 'bg-sky/10 dark:bg-sky/15',
    panelText: 'text-gray-900 dark:text-white',
    panelMeta: 'text-gray-600 dark:text-sky/80',
    dot: 'bg-sky',
  },
};

const STORY_IDS: StoryId[] = ['mustafa', 'orien', 'akol'];

const StoriesPage = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <Section variant="default" divider="top" fade="top">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-badge bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth inline-block" aria-hidden="true"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('storiesPage.hero.badge')}</span>
            </div>
            <h1 className="fluid-h1 text-4xl lg:text-5xl font-bold mb-5 text-gray-900 dark:text-white text-balance">
              {t('storiesPage.hero.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {AU(t('storiesPage.hero.description'))}
            </p>
          </div>
        </Section>

        {/* Story Cards — 3-column grid, image top + coloured panel bottom */}
        <Section variant="alt" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {STORY_IDS.map((id) => {
              const colors = STORY_COLORS[id];
              const heroImg = STORY_HERO_IMAGES[id];
              return (
                <article
                  key={id}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  aria-labelledby={`story-title-${id}`}
                >
                  {/* Image — square crop, object-center so faces stay visible */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    {heroImg ? (
                      <img
                        src={heroImg.src}
                        alt={heroImg.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      /* Placeholder when no photo yet */
                      <div className={`w-full h-full ${colors.accent} opacity-20 flex items-center justify-center`}>
                        <BookOpen className="h-16 w-16 text-white/60" aria-hidden="true" />
                      </div>
                    )}
                    {/* Program badge overlaid on image */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className={`text-xs font-semibold backdrop-blur-sm ${colors.accent} text-white border-transparent`}>
                        {t(`storiesPage.items.${id}.program`)}
                      </Badge>
                    </div>
                  </div>

                  {/* Coloured text panel */}
                  <div className={`flex flex-col flex-1 p-6 ${colors.panel}`}>
                    {/* Location + read time */}
                    <div className={`flex flex-wrap items-center gap-3 mb-3 text-xs ${colors.panelMeta}`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                        {t(`storiesPage.items.${id}.location`)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                        {t('storiesPage.readTime', { count: t(`storiesPage.items.${id}.readTime`) })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      id={`story-title-${id}`}
                      className={`text-lg font-bold mb-2 text-balance leading-snug ${colors.panelText}`}
                    >
                      {t(`storiesPage.items.${id}.title`)}
                    </h2>

                    {/* Excerpt */}
                    <p className={`text-sm leading-relaxed mb-4 flex-1 line-clamp-3 ${colors.panelMeta}`}>
                      {t(`storiesPage.items.${id}.excerpt`)}
                    </p>

                    {/* Read more */}
                    <Link
                      to={`/stories/${id}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.accentText} hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                      aria-label={`${t('storiesPage.readMore')}: ${t(`storiesPage.items.${id}.title`)}`}
                    >
                      {t('storiesPage.readMore')}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default StoriesPage;
