"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type StoryId = 'mustafa' | 'orien' | 'akol' | 'mansoor' | 'sumie';

// Program colour mapping:
//   mustafa — COMPACT (Community Engagement) → leaf (green)
//   orien   — SETS → sky (teal)
//   akol    — SETS → sky (teal)
//   mansoor — Playing Around the World (Family Support) → sun (gold)
//   sumie   — Playing Around the World / Multicultural Mothers Group (Family Support) → sun (gold)
// `date` mirrors storiesPage.items.<id>.date and drives the newest-first ordering below.
const STORIES: { id: StoryId; date: string; accent: string; bar: string; badgeCls: string }[] = [
  { id: 'mustafa', date: '2025-09-16', accent: 'text-leaf-text dark:text-leaf', bar: 'bg-leaf', badgeCls: 'bg-leaf/10 text-leaf-text dark:text-leaf border-leaf/20' },
  { id: 'orien',   date: '2026-05-14', accent: 'text-sky-text dark:text-sky',  bar: 'bg-sky',  badgeCls: 'bg-sky/10 text-sky-text dark:text-sky border-sky/20' },
  { id: 'akol',    date: '2026-06-22', accent: 'text-sky-text dark:text-sky',  bar: 'bg-sky',  badgeCls: 'bg-sky/10 text-sky-text dark:text-sky border-sky/20' },
  { id: 'mansoor', date: '2025-07-31', accent: 'text-sun-text dark:text-sun',  bar: 'bg-sun',  badgeCls: 'bg-sun/10 text-sun-text dark:text-sun border-sun/20' },
  { id: 'sumie',   date: '2025-08-20', accent: 'text-sun-text dark:text-sun',  bar: 'bg-sun',  badgeCls: 'bg-sun/10 text-sun-text dark:text-sun border-sun/20' },
];

// Newest 3 stories only, sorted most-recent first.
const FEATURED_STORIES = [...STORIES]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

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
        {FEATURED_STORIES.map(({ id, accent, bar, badgeCls }) => (
          <article
            key={id}
            className="group relative flex flex-col bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
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
