"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { getRelatedPages, keyForPath, copyFor, RelatedItem } from '@/lib/related';

interface RelatedServicesProps { current?: 'settlement-support' | 'aged-care' | 'family-support' | 'community-engagement' }

export default function RelatedServices({ current }: RelatedServicesProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;
  const items: RelatedItem[] = getRelatedPages(path);
  const currentKey = current ?? keyForPath(path);
  const paragraph = currentKey === 'locations'
    ? 'Plan your visit with related services and resources available at our hubs.'
    : t(copyFor(currentKey));

  return (
    <Section overlay center>
      <div className="text-center mb-12">
        <div className="section-badge bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/50 px-6 py-2 text-sm shadow-lg mb-6 backdrop-blur-sm">
          <span className="mr-2 h-2 w-2 rounded-full bg-ocean dark:bg-sky animate-pulse"></span>
          <span className="text-slate-900 dark:text-white font-medium">{t('services.relatedTitle')}</span>
        </div>
        <h2 className="text-4xl font-bold text-slate-950 dark:!text-white mb-4">{t('services.alsoInterestedIn')}</h2>
          <p className="text-xl text-slate-900 dark:!text-slate-100 max-w-3xl mx-auto">{paragraph}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((svc) => (
          <ButtonLink key={svc.key} to={svc.link} label={t(svc.title)} color={svc.color} />
        ))}
      </div>
    </Section>
  );
}

function ButtonLink({ to, label, color }: { to: string; label: string; color: string }) {
  const classes = buttonClasses(color);
  return (
    <Link
      to={to}
      aria-label={`${label} – Navigate`}
      className="group block w-full rounded-2xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      <div className="w-full rounded-2xl border border-white/40 dark:border-transparent bg-transparent">
        <div className="p-3">
          <span
            className={classes}
          >
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}

function buttonClasses(color: string) {
  const base = 'inline-flex items-center justify-center w-full h-10 md:h-11 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background';
  const byColor =
    color === 'sky' ? 'bg-sky bg-gradient-to-r from-sky to-sky/90 text-ocean hover:from-sky/90 hover:to-sky' :
    color === 'earth' ? 'bg-earth bg-gradient-to-r from-earth to-earth/90 text-gray-900 hover:from-earth/90 hover:to-earth' :
    color === 'care' ? 'bg-care bg-gradient-to-r from-care to-care/90 text-gray-900 hover:from-care/90 hover:to-care' :
    color === 'leaf' ? 'bg-leaf bg-gradient-to-r from-leaf to-leaf/90 text-ocean hover:from-leaf/90 hover:to-leaf' :
    'bg-sun bg-gradient-to-r from-sun to-sun/90 text-ocean hover:from-sun/90 hover:to-sun';
  return cn(base, byColor);
}
