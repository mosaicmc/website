"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type StoryId = 'mustafa' | 'orien' | 'akol';

const STORIES: { id: StoryId; accent: string; bar: string; badgeCls: string }[] = [
  { id: 'mustafa', accent: 'text-sky',   bar: 'bg-sky',   badgeCls: 'bg-sky/10 text-sky border-sky/20' },
  { id: 'orien',   accent: 'text-earth', bar: 'bg-earth', badgeCls: 'bg-earth/10 text-earth border-earth/20' },
  { id: 'akol',    accent: 'text-leaf',  bar: 'bg-leaf',  badgeCls: 'bg-leaf/10 text-leaf border-leaf/20' },
];

const ImpactStoriesPreview = () => {
  const { t } = useTranslation();

  return (
    <Section
      variant="surface"
      padding="lg"
      aria-labelledby="impact-stories-heading"
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <div
          className="section-badge bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6"
          aria-hidden="true"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-earth inline-block"></span>
          <span className="text-gray-700 dark:text-white/90 font-medium">
            {t('impactStoriesPreview.badge')}
          </span>
        </div>
        <h2
          id="impact-stories-heading"
          className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance"
        >
          {t('impactStoriesPreview.title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t('impactStoriesPreview.description')}
        </p>
      </div>

      {/* Story cards */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
        {STORIES.map(({ id, accent, bar, badgeCls }) => (
          <article
            key={id}
            className={`group relative flex flex-col bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 border-t-4 border-t-[var(--story-bar)] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden`}
            style={{ '--story-bar': `var(--color-${bar.replace('bg-', '')}, currentColor)` } as React.CSSProperties}
            aria-labelledby={`preview-title-${id}`}
          >
            {/* Colour bar */}
            <div className={`h-1 w-full ${bar}`} aria-hidden="true"></div>

            <div className="flex flex-col flex-1 p-6">
              {/* Program badge */}
              <Badge variant="outline" className={`self-start mb-4 text-xs font-medium ${badgeCls}`}>
                {t(`storiesPage.items.${id}.program`)}
              </Badge>

              {/* Title */}
              <h3
                id={`preview-title-${id}`}
                className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-balance"
              >
                {t(`storiesPage.items.${id}.title`)}
              </h3>
              <p className={`text-sm font-medium mb-4 ${accent}`}>
                {t(`storiesPage.items.${id}.subtitle`)}
              </p>

              {/* Pull quote */}
              <blockquote className="flex-1 mb-6 border-l-2 border-gray-200 dark:border-white/15 pl-4">
                <Quote className={`h-4 w-4 mb-1 ${accent}`} aria-hidden="true" />
                <p className="text-sm italic text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                  &ldquo;{t(`storiesPage.items.${id}.quote`)}&rdquo;
                </p>
                <footer className={`mt-2 text-xs font-semibold ${accent}`}>
                  — {t(`storiesPage.items.${id}.quoteAuthor`)}
                </footer>
              </blockquote>

              {/* CTA link */}
              <Link
                to={`/stories/${id}`}
                className={`inline-flex items-center gap-2 text-sm font-semibold ${accent} hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 rounded group/link`}
                aria-label={`${t('storiesPage.readMore')}: ${t(`storiesPage.items.${id}.title`)}`}
              >
                {t('storiesPage.readMore')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* View all CTA */}
      <div className="text-center">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link to="/stories">
            {t('impactStoriesPreview.viewAll')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default ImpactStoriesPreview;
