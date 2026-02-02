"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { StarRating } from './StarRating';
import { useTranslation } from 'react-i18next';
import reviewsData from '@/data/reviews.json';

type ScrapedReview = {
  id: string;
  authorName: string;
  authorProfileUrl?: string;
  authorAvatarUrl?: string;
  rating: number;
  dateText: string;
  text: string;
  reviewUrl?: string;
};

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';

const GoogleReviews = () => {
  const { t } = useTranslation();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const reviews = React.useMemo<ScrapedReview[]>(
    () => (Array.isArray(reviewsData?.reviews) ? reviewsData.reviews.slice(0, 6) : []),
    []
  );
  const placeUrl = React.useMemo(
    () => (typeof reviewsData?.placeUrl === 'string' ? reviewsData.placeUrl : null),
    []
  );
  const triggerGoogleTranslate = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!match?.[1]) return;
    const value = decodeURIComponent(match[1]);
    const parts = value.split('/');
    const targetLang = parts[parts.length - 1];
    if (!targetLang || targetLang === 'en') return;
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (!select) return;
    if (select.value !== targetLang) {
      select.value = targetLang;
    }
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }, []);

  React.useEffect(() => {
    if (reviews.length === 0) return;
    const id = window.setTimeout(() => {
      triggerGoogleTranslate();
    }, 100);
    return () => window.clearTimeout(id);
  }, [reviews, triggerGoogleTranslate]);

  

  return (
    <section
      ref={sectionRef}
      className="relative section-spacing bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:bg-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
      aria-label="Google Reviews"
      role="region"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center subsection-break">
          <div className="section-badge bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse" />
            <span className="text-gray-700 dark:text-white/90 font-medium">{t('reviews.badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('reviews.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-white/70 max-w-3xl mx-auto">{t('reviews.subtitle')}</p>
        </div>

        <div className="relative" aria-live="polite">
          {reviews.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((item) => (
                <Card key={item.id} className="group relative bg-card dark:bg-slate-900 border border-border hover:scale-[1.02] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background" tabIndex={0}>
                  <CardHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        {item.authorAvatarUrl ? (
                          <AvatarImage src={item.authorAvatarUrl} alt={item.authorName} loading="lazy" decoding="async" />
                        ) : (
                          <AvatarFallback className="text-foreground font-semibold">
                            {(item.authorName || 'Anonymous').split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-white/90">{item.authorName || 'Anonymous'}</div>
                        <div className="text-xs text-gray-600 dark:text-white/60">{item.dateText}</div>
                      </div>
                    </div>
                    <StarRating value={item.rating} ariaLabel={`${item.rating} out of 5 stars`} />
                  </CardHeader>
                  <CardContent>
                    <blockquote className="relative z-10 text-gray-700 dark:text-white/90 leading-relaxed text-base">“{item.text}”</blockquote>
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs text-muted-foreground">{t('reviews.source')}</span>
                    <a
                      href={item.reviewUrl || placeUrl || GOOGLE_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-ocean hover:text-ocean dark:text-white dark:hover:text-sky hover:underline decoration-ocean dark:decoration-sky underline-offset-4"
                      aria-label={`${t('reviews.viewOnGoogle')} (opens in new tab)`}
                    >
                      {t('reviews.viewOnGoogle')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'https://maps.app.goo.gl/DrXPngzuP6QN6kTk9',
                'https://maps.app.goo.gl/hbbf81UHNpfRJzH39',
                'https://maps.app.goo.gl/A4SD8B75KhLm5NeQA',
                'https://maps.app.goo.gl/eN1xkicjMGUxKvPK6',
              ].map((url, idx) => (
                <Card key={url} className="group relative bg-card dark:bg-slate-900 border border-border hover:scale-[1.02] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <CardHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="text-foreground font-semibold">GR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-white/90">{t('reviews.featured')}</div>
                        <div className="text-xs text-gray-600 dark:text-white/60">{t('reviews.recent')}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="relative z-10 text-gray-700 dark:text-white/90 leading-relaxed text-base">
                      {idx === 0 ? `“${t('reviews.fallback')}”` : `“${t('reviews.viewReview')}”`}
                    </blockquote>
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs text-muted-foreground">{t('reviews.source')}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-ocean hover:text-ocean dark:text-white dark:hover:text-sky hover:underline decoration-ocean dark:decoration-sky underline-offset-4"
                      aria-label={`${t('reviews.viewOnGoogle')} (opens in new tab)`}
                    >
                      {t('reviews.viewOnGoogle')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        

        <div className="text-center section-break">
          <a
            href={placeUrl || GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background bg-ocean text-white hover:bg-ocean/90 hover:text-white"
            aria-label={`${t('reviews.readAll')} (opens in new tab)`}
          >
            {t('reviews.readAll')}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
