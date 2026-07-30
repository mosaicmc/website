"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, BookOpen, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RelatedServices from '@/components/RelatedServices';
import { PageTransition } from '@/components/ui/PageTransition';
import { AU } from '@/lib/auSpelling';

type StoryId = 'mustafa' | 'orien' | 'akol';

const STORY_HERO_IMAGES: Partial<Record<StoryId, { src: string; alt: string }>> = {
  akol: {
    src: '/images/stories/akol-1-portrait.jpg',
    alt: 'Akol Koor smiling in Armidale, NSW',
  },
};

const STORY_COLORS: Record<StoryId, { accent: string; badge: string; border: string; dot: string }> = {
  mustafa: {
    accent: 'text-sky',
    badge: 'bg-sky/10 text-sky border-sky/20',
    border: 'border-t-sky',
    dot: 'bg-sky',
  },
  orien: {
    accent: 'text-earth',
    badge: 'bg-earth/10 text-earth border-earth/20',
    border: 'border-t-earth',
    dot: 'bg-earth',
  },
  akol: {
    accent: 'text-leaf',
    badge: 'bg-leaf/10 text-leaf border-leaf/20',
    border: 'border-t-leaf',
    dot: 'bg-leaf',
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

        {/* Story Cards */}
        <Section variant="alt" padding="lg">
          <div className="flex flex-col gap-12 max-w-4xl mx-auto">
            {STORY_IDS.map((id) => {
              const colors = STORY_COLORS[id];
              return (
                <article
                  key={id}
                  className={`group relative bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 border-t-4 ${colors.border} shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden`}
                  aria-labelledby={`story-title-${id}`}
                >
                  {STORY_HERO_IMAGES[id] && (
                    <div className="w-full h-64 md:h-72 overflow-hidden">
                      <img
                        src={STORY_HERO_IMAGES[id]!.src}
                        alt={STORY_HERO_IMAGES[id]!.alt}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-8 md:p-10">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <Badge variant="outline" className={`text-xs font-medium ${colors.badge}`}>
                        {t(`storiesPage.items.${id}.program`)}
                      </Badge>
                      <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        {t(`storiesPage.items.${id}.location`)}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                        {t('storiesPage.readTime', { count: t(`storiesPage.items.${id}.readTime`) })}
                      </span>
                    </div>

                    {/* Title & subtitle */}
                    <h2
                      id={`story-title-${id}`}
                      className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-balance"
                    >
                      {t(`storiesPage.items.${id}.title`)}
                    </h2>
                    <p className={`text-base font-medium mb-4 ${colors.accent}`}>
                      {t(`storiesPage.items.${id}.subtitle`)}
                    </p>

                    {/* Excerpt */}
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {t(`storiesPage.items.${id}.excerpt`)}
                    </p>

                    {/* Pull quote */}
                    <blockquote className="relative border-l-4 border-gray-200 dark:border-white/15 pl-5 mb-7">
                      <Quote className={`h-5 w-5 mb-1 ${colors.accent}`} aria-hidden="true" />
                      <p className="text-base italic text-gray-700 dark:text-gray-300 leading-relaxed">
                        &ldquo;{t(`storiesPage.items.${id}.quote`)}&rdquo;
                      </p>
                      <footer className={`mt-2 text-sm font-semibold ${colors.accent}`}>
                        — {t(`storiesPage.items.${id}.quoteAuthor`)}
                      </footer>
                    </blockquote>

                    {/* Impact stat */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 mb-7">
                      <div className={`h-2.5 w-2.5 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`} aria-hidden="true"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white font-semibold">
                          {t(`storiesPage.items.${id}.statValue`)} {t(`storiesPage.items.${id}.statLabel`)}:
                        </strong>{' '}
                        {t(`storiesPage.items.${id}.statContext`)}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button asChild variant="outline" className="group/btn gap-2">
                      <Link to={`/stories/${id}`} aria-label={`${t('storiesPage.readMore')}: ${t(`storiesPage.items.${id}.title`)}`}>
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                        {t('storiesPage.readMore')}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>
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
