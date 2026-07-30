"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Tag, Quote, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/PageTransition';
import RelatedServices from '@/components/RelatedServices';

type StoryId = 'mustafa' | 'orien' | 'akol';

interface Props {
  storyId: StoryId;
}

const STORY_SEQUENCE: StoryId[] = ['mustafa', 'orien', 'akol'];

const ACCENT: Record<StoryId, { bar: string; text: string; badge: string; bg: string }> = {
  mustafa: { bar: 'bg-sky', text: 'text-sky', badge: 'bg-sky/10 text-sky border-sky/20', bg: 'bg-sky/5 dark:bg-sky/10' },
  orien:   { bar: 'bg-earth', text: 'text-earth', badge: 'bg-earth/10 text-earth border-earth/20', bg: 'bg-earth/5 dark:bg-earth/10' },
  akol:    { bar: 'bg-leaf', text: 'text-leaf', badge: 'bg-leaf/10 text-leaf border-leaf/20', bg: 'bg-leaf/5 dark:bg-leaf/10' },
};

type SectionItem =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; author: string };

const StoryDetailPage = ({ storyId }: Props) => {
  const { t } = useTranslation();
  const accent = ACCENT[storyId];

  const idx = STORY_SEQUENCE.indexOf(storyId);
  const prevId = idx > 0 ? STORY_SEQUENCE[idx - 1] : null;
  const nextId = idx < STORY_SEQUENCE.length - 1 ? STORY_SEQUENCE[idx + 1] : null;

  const sections = t(`storyDetail.${storyId}.sections`, { returnObjects: true }) as SectionItem[];

  return (
    <PageTransition>
      <div>
        {/* Back link + hero */}
        <Section variant="default" divider="top" fade="top" padding="sm">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-ocean dark:hover:text-sky mb-8 transition-colors group"
              aria-label={t('storiesPage.backToStories')}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {t('storiesPage.backToStories')}
            </Link>

            {/* Program badge */}
            <Badge variant="outline" className={`mb-4 text-xs font-medium ${accent.badge}`}>
              {t(`storiesPage.items.${storyId}.program`)}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-balance leading-tight">
              {t(`storiesPage.items.${storyId}.title`)}
            </h1>
            <p className={`text-lg font-medium mb-6 ${accent.text}`}>
              {t(`storiesPage.items.${storyId}.subtitle`)}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {t(`storiesPage.items.${storyId}.location`)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {t(`storiesPage.items.${storyId}.date`)}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {t(`storiesPage.items.${storyId}.program`)}
              </span>
            </div>

            {/* Accent bar */}
            <div className={`h-1 w-16 rounded-full ${accent.bar} mb-0`} aria-hidden="true"></div>
          </div>
        </Section>

        {/* Story body */}
        <Section variant="alt" padding="lg">
          <div className="max-w-3xl mx-auto">
            <article aria-label={t(`storiesPage.items.${storyId}.title`)}>
              {Array.isArray(sections) && sections.map((section, i) => {
                if (section.type === 'quote') {
                  return (
                    <blockquote
                      key={i}
                      className={`my-10 rounded-2xl p-6 md:p-8 ${accent.bg} border-l-4 ${accent.bar.replace('bg-', 'border-')}`}
                    >
                      <Quote className={`h-6 w-6 mb-3 ${accent.text}`} aria-hidden="true" />
                      <p className="text-lg md:text-xl italic text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                        &ldquo;{section.text}&rdquo;
                      </p>
                      <footer className={`text-sm font-semibold ${accent.text}`}>
                        — {section.author}
                      </footer>
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                  >
                    {section.text}
                  </p>
                );
              })}
            </article>

            {/* Impact highlight */}
            <div className={`mt-12 rounded-2xl p-6 md:p-8 ${accent.bg} border border-gray-200 dark:border-white/10`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${accent.text}`}>
                {t('storiesPage.impactHighlight')}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {t(`storiesPage.items.${storyId}.statValue`)}
              </p>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t(`storiesPage.items.${storyId}.statLabel`)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(`storiesPage.items.${storyId}.statContext`)}
              </p>
            </div>
          </div>
        </Section>

        {/* Prev / Next navigation */}
        <Section variant="surface" padding="sm">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            {prevId ? (
              <Button asChild variant="outline" className="gap-2">
                <Link to={`/stories/${prevId}`}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5">{t('storiesPage.prevStory')}</span>
                    <span className="font-semibold">{t(`storiesPage.items.${prevId}.title`)}</span>
                  </span>
                </Link>
              </Button>
            ) : <div />}

            {nextId ? (
              <Button asChild variant="outline" className="gap-2 ml-auto">
                <Link to={`/stories/${nextId}`}>
                  <span className="text-right">
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5">{t('storiesPage.nextStory')}</span>
                    <span className="font-semibold">{t(`storiesPage.items.${nextId}.title`)}</span>
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : <div />}
          </div>
        </Section>

        <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default StoryDetailPage;
