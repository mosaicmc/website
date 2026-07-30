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

// hero: shown in the article header; gallery: woven into the body after paragraph 3 and 6
const STORY_IMAGES: Partial<Record<StoryId, {
  hero: { src: string; alt: string };
  gallery?: Array<{ src: string; alt: string; caption?: string }>;
}>> = {
  akol: {
    hero: {
      src: '/images/stories/akol-1-portrait.jpg',
      alt: 'Akol Koor smiling in an open-plan office in Armidale, NSW',
    },
    gallery: [
      {
        src: '/images/stories/akol-2-caseworker.jpg',
        alt: 'Akol in conversation with her caseworker at the Mosaic Multicultural Connections office, Armidale',
        caption: 'Akol with her caseworker at Mosaic's Armidale office',
      },
      {
        src: '/images/stories/akol-4-jobapps.jpg',
        alt: 'Caseworker working through job applications on a laptop with Akol beside him at Mosaic's Armidale office',
        caption: 'Working through job applications at Mosaic's Armidale office',
      },
      {
        src: '/images/stories/akol-3-park.jpg',
        alt: 'Akol smiling at a park in Armidale with a pram, golden afternoon light',
        caption: 'Akol in Armidale',
      },
    ],
  },
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
  const images = STORY_IMAGES[storyId];

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

        {/* Hero image */}
        {images?.hero && (
          <div className="w-full max-h-[520px] overflow-hidden">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        {/* Story body */}
        <Section variant="alt" padding="lg">
          <div className="max-w-3xl mx-auto">
            <article aria-label={t(`storiesPage.items.${storyId}.title`)}>
              {Array.isArray(sections) && sections.map((section, i) => {
                // Inject gallery images at natural breakpoints (after para 3 and para 6)
                const galleryAfter = [3, 6];
                const paraCount = sections.slice(0, i + 1).filter(s => s.type === 'paragraph').length;
                const galleryIndex = galleryAfter.indexOf(paraCount);
                const showGallery = section.type === 'paragraph' && galleryIndex !== -1 && images?.gallery?.[galleryIndex];

                return (
                  <React.Fragment key={i}>
                    {section.type === 'quote' ? (
                      <blockquote
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
                    ) : (
                      <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {section.text}
                      </p>
                    )}
                    {showGallery && images?.gallery?.[galleryIndex] && (
                      <figure className="my-10 rounded-xl overflow-hidden">
                        <img
                          src={images.gallery[galleryIndex].src}
                          alt={images.gallery[galleryIndex].alt}
                          className="w-full object-cover max-h-[420px]"
                          loading="lazy"
                          decoding="async"
                        />
                        {images.gallery[galleryIndex].caption && (
                          <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 italic">
                            {images.gallery[galleryIndex].caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </React.Fragment>
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
