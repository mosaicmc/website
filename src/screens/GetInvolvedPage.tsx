"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { assetPath, cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Heart, Users, Briefcase, ArrowRight, ExternalLink, ClipboardList, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RelatedServices from '@/components/RelatedServices';
import { PageTransition } from '@/components/ui/PageTransition';

const GetInvolvedPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const opportunities = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: t('getInvolved.opportunities.donate.title'),
      description: t('getInvolved.opportunities.donate.description'),
      benefits: [
        t('getInvolved.opportunities.donate.benefits.0'),
        t('getInvolved.opportunities.donate.benefits.1'),
        t('getInvolved.opportunities.donate.benefits.2'),
        t('getInvolved.opportunities.donate.benefits.3')
      ],
      action: t('getInvolved.opportunities.donate.action'),
      link: "/donate",
      external: false,
      color: "earth"
    },
      {
        icon: <Users className="h-8 w-8" />,
        title: t('getInvolved.opportunities.volunteer.title'),
        description: t('getInvolved.opportunities.volunteer.description'),
        benefits: [
          t('getInvolved.opportunities.volunteer.benefits.0'),
          t('getInvolved.opportunities.volunteer.benefits.1'),
          t('getInvolved.opportunities.volunteer.benefits.2'),
          t('getInvolved.opportunities.volunteer.benefits.3')
        ],
        action: t('getInvolved.opportunities.volunteer.action'),
        link: "#volunteer-with-us-heading",
        external: false,
        color: "sky"
      },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: t('getInvolved.opportunities.careers.title'),
      description: t('getInvolved.opportunities.careers.description'),
      benefits: [
        t('getInvolved.opportunities.careers.benefits.0'),
        t('getInvolved.opportunities.careers.benefits.1'),
        t('getInvolved.opportunities.careers.benefits.2'),
        t('getInvolved.opportunities.careers.benefits.3')
      ],
      action: t('getInvolved.opportunities.careers.action'),
      link: "/company/careers",
      external: false,
      color: "leaf"
    },
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: t('getInvolved.opportunities.referral.title'),
      description: t('getInvolved.opportunities.referral.description'),
      benefits: [
        t('getInvolved.opportunities.referral.benefits.0'),
        t('getInvolved.opportunities.referral.benefits.1'),
        t('getInvolved.opportunities.referral.benefits.2'),
        t('getInvolved.opportunities.referral.benefits.3')
      ],
      action: t('getInvolved.opportunities.referral.action'),
      link: "https://forms.mosaicmc.org.au/referral",
      external: true,
      color: "sun"
    }
  ];

  const getAccentBar = (color: string) => {
    const colorMap = {
      sky: 'bg-sky',
      earth: 'bg-earth',
      leaf: 'bg-leaf',
      sun: 'bg-sun',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getAccentText = (color: string) => {
    const colorMap = {
      sky: 'text-sky',
      earth: 'text-earth',
      leaf: 'text-leaf',
      sun: 'text-sun',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    const rectHeight = header ? header.getBoundingClientRect().height : 0;
    if (rectHeight && rectHeight > 0) return rectHeight;
    return window.matchMedia('(min-width: 1024px)').matches ? 96 : 80;
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const headerHeight = getHeaderHeight();
        const offset = headerHeight;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const spotlights: Array<{
    name: string;
    role: string;
    quote: string;
    years?: string;
    source: string;
    image?: string;
  }> = useMemo(() => [
    {
      name: t('getInvolved.spotlights.0.name'),
      role: t('getInvolved.spotlights.0.role'),
      quote: t('getInvolved.spotlights.0.quote'),
      years: t('getInvolved.spotlights.0.years'),
      image: undefined,
      source: 'https://www.instagram.com/p/DKDrctCRjg6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.1.name'),
      role: t('getInvolved.spotlights.1.role'),
      quote: t('getInvolved.spotlights.1.quote'),
      years: t('getInvolved.spotlights.1.years'),
      source: 'https://www.instagram.com/p/DKBGFPPuQui/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.2.name'),
      role: t('getInvolved.spotlights.2.role'),
      quote: t('getInvolved.spotlights.2.quote'),
      years: t('getInvolved.spotlights.2.years'),
      source: 'https://www.instagram.com/p/DJ-hZqSvuRb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.3.name'),
      role: t('getInvolved.spotlights.3.role'),
      quote: t('getInvolved.spotlights.3.quote'),
      years: t('getInvolved.spotlights.3.years'),
      source: 'https://www.instagram.com/p/DJ78YFesQrH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.4.name'),
      role: t('getInvolved.spotlights.4.role'),
      quote: t('getInvolved.spotlights.4.quote'),
      years: t('getInvolved.spotlights.4.years'),
      source: 'https://www.instagram.com/p/DJ5YKCbhTVn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.5.name'),
      role: t('getInvolved.spotlights.5.role'),
      quote: t('getInvolved.spotlights.5.quote'),
      years: t('getInvolved.spotlights.5.years'),
      source: 'https://www.instagram.com/p/DJ2zIbUzoq3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    },
    {
      name: t('getInvolved.spotlights.6.name'),
      role: t('getInvolved.spotlights.6.role'),
      quote: t('getInvolved.spotlights.6.quote'),
      years: t('getInvolved.spotlights.6.years'),
      source: 'https://www.instagram.com/p/DJ0OG5KRnDc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    }
  ], [t]);

  const getShortcode = (url: string): string | null => {
    const match = url.match(/\/p\/([^/?]+)/);
    return match ? match[1] : null;
  };

  // Static tiles are expected at /spotlights/{shortcode}.webp|.png|.jpg. No placeholder fallback.

  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const spotlight = spotlights[spotlightIndex];

  useEffect(() => {
    setSpotlightIndex(Math.floor(Math.random() * spotlights.length));
  }, [spotlights.length]);

  const [spotlightImage, setSpotlightImage] = useState<string | null>(null);

  useEffect(() => {
    const code = getShortcode(spotlight.source);
    if (!code) return;
    const localCandidates = [
      assetPath(`/spotlights/${code}.webp`),
      assetPath(`/spotlights/${code}.png`),
      assetPath(`/spotlights/${code}.jpg`),
      assetPath(`/images/spotlights/${code}.webp`),
      assetPath(`/images/spotlights/${code}.png`),
      assetPath(`/images/spotlights/${code}.jpg`),
    ];
    const initial = localCandidates[0] as string;
    setSpotlightImage(initial);
    const cacheKey = `spotlightTile:${code}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setSpotlightImage(cached);
      return;
    }
    const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(spotlight.source)}`;
    fetch(noembedUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.thumbnail_url === 'string') {
          setSpotlightImage(data.thumbnail_url);
          // try { console.log('[Spotlight] image(oembed)', data.thumbnail_url); } catch (e) { void e; }
          sessionStorage.setItem(cacheKey, data.thumbnail_url);
          return;
        }
        // Fallback: fetch page via read-only proxy and parse og:image
        const proxyUrl = `https://r.jina.ai/http://www.instagram.com/p/${code}/`;
        return fetch(proxyUrl)
          .then((r) => (r.ok ? r.text() : ''))
          .then((html) => {
            const m = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
            if (m && m[1]) {
              setSpotlightImage(m[1]);
              sessionStorage.setItem(cacheKey, m[1]);
            }
          });
      })
      .catch(() => {});
  }, [spotlight.source]);
 
  return (
    <PageTransition>
      <div className="animate-fade-in">
      
      <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
        <AnimatedBackground />
        <div className="max-w-3xl mx-auto text-center">
          <div className="section-badge bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-foreground/80 font-medium">{t('getInvolved.badge')}</span>
          </div>
          <h1 className="fluid-h1 text-3xl md:text-4xl font-bold mb-5 text-foreground">{t('getInvolved.title')}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('getInvolved.description')}
          </p>
        </div>
        <div id="volunteer-with-us-bottom" className="scroll-mt-24" />
      </Section>

      {/* Opportunities Grid */}
      <Section overlay center className="py-3 md:py-4 lg:py-5 section-break" containerClassName="max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-8 text-center items-stretch">
          {opportunities.map((opportunity, index) => (
            <Card
              key={index}
              className="w-full rounded-2xl border border-border/60 bg-card/70 shadow-lg overflow-hidden hover:shadow-xl hover:border-border transition-all duration-300 flex flex-col h-full"
            >
              <div className={cn("h-1.5 w-full", getAccentBar(opportunity.color))} />
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center justify-center gap-3">
                  <div className={cn("w-12 h-12 rounded-2xl bg-muted/70 border border-border/60 flex items-center justify-center shadow-sm", getAccentText(opportunity.color))}>
                    {React.cloneElement(opportunity.icon as React.ReactElement, { className: 'h-6 w-6' })}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{opportunity.title}</h3>
                </div>
              </CardHeader>

              <CardContent className="text-center px-6 pb-6 flex-1 flex flex-col">
                <p className="text-muted-foreground leading-relaxed mb-5">{opportunity.description}</p>
                <h3 className="text-base font-bold text-foreground mb-3">{t('getInvolved.benefitsTitle')}</h3>
                <ul className="space-y-2 mb-5 text-left">
                  {opportunity.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center justify-start space-x-2.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", getAccentBar(opportunity.color))}></div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pb-6 justify-center mt-auto">
                {opportunity.external ? (
                  <Button asChild size="cta-sm" variant="cta" className="w-full">
                    <a
                      href={opportunity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${opportunity.action} (opens in new tab)`}
                      className="group inline-flex items-center"
                    >
                      {opportunity.action}
                      <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="cta-sm" variant="cta" className="w-full">
                    <Link
                      to={opportunity.link}
                      className="group"
                      onClick={(e) => {
                        if (opportunity.link.startsWith('#')) {
                          e.preventDefault();
                          const id = opportunity.link.slice(1);
                          const el = document.getElementById(id);
                          if (el) {
                            const headerHeight = getHeaderHeight();
                            const targetTop = el.getBoundingClientRect().top + window.scrollY - headerHeight;
                            window.scrollTo({ top: targetTop, behavior: 'smooth' });
                            history.replaceState(null, '', `#${id}`);
                          }
                        }
                      }}
                    >
                      {opportunity.action}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section center className="py-4 md:py-6 lg:py-7" containerClassName="max-w-4xl">
        <div id="volunteer-with-us" className="text-center mb-6">
          <h2 id="volunteer-with-us-heading" className="text-3xl leading-tight font-bold text-foreground scroll-mt-28">{t('getInvolved.volunteerWithUs')}</h2>
          {/* moved helper text into the card below for consistent layout */}
        </div>
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6">
          <p className="text-base text-muted-foreground leading-relaxed mb-3">{t('getInvolved.whyVolunteer')}</p>
          <p className="text-base text-foreground leading-relaxed mb-3">
            {t('getInvolved.volunteerDescription')}
          </p>
          <p className="text-base text-foreground leading-relaxed mb-3">
            {t('getInvolved.volunteerSupportDescription')}
          </p>
          <p className="mt-2 text-base font-bold text-ocean dark:text-sky leading-relaxed mb-4">
            {t('getInvolved.isVolunteeringRight')}
          </p>
          <p className="text-base text-foreground leading-relaxed mb-2">
            {t('getInvolved.joinMissionIf')}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-sky flex-shrink-0" />
              <span className="text-foreground">{t('getInvolved.missionChecks.0')}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-earth flex-shrink-0" />
              <span className="text-foreground">{t('getInvolved.missionChecks.1')}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-leaf flex-shrink-0" />
              <span className="text-foreground">{t('getInvolved.missionChecks.2')}</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">{t('getInvolved.trainingSupport')}</p>
        </div>
      </Section>

      {/* Volunteer Spotlight */}
      <Section padding="sm" overlay className="py-4 md:py-6 lg:py-7 section-break" center containerClassName="max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch text-center">
          <div className="flex flex-col h-full">
            <h2 className="text-3xl leading-tight font-bold text-foreground mb-6 inline-flex items-center justify-center">
              <Users className="h-8 w-8 text-sky mr-3" />
              {t('getInvolved.volunteerSpotlight')}
            </h2>
            <Card className="rounded-2xl p-4 shadow-lg text-center flex-1">
              <div className="flex items-center justify-center space-x-4 mb-4">
                  {spotlightImage ? (
                    <img
                      src={spotlightImage}
                      alt={t('getInvolved.spotlight.imageAlt', { name: spotlight.name })}
                      width={128}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      className="w-32 h-32 rounded-full object-cover border-2 border-white dark:border-slate-700"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = 'none';
                      }}
                    />
                  ) : null}
                  {!spotlightImage && (
                    <div className="w-32 h-32 bg-gradient-to-br from-sky to-sky/80 rounded-full flex items-center justify-center text-white shadow-md">
                      <Users className="h-10 w-10" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{spotlight.name}</h3>
                    <p className="text-muted-foreground">{spotlight.role}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed italic mt-2">
                  "{spotlight.quote}"
                </blockquote>
                <div className="mt-4 text-sm">
                  <a href={spotlight.source} target="_blank" rel="noopener noreferrer" aria-label={`${t('getInvolved.spotlight.sourceLabel')} (opens in new tab)`} className="inline-flex items-center text-primary hover:underline">
                    {t('getInvolved.spotlight.sourceLabel')}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
            </Card>
          </div>

          <div className="space-y-8 scroll-mt-24 flex flex-col h-full" id="volunteer-opportunities">
            <h2 className="text-3xl leading-tight font-bold text-foreground">{t('getInvolved.volunteerOpportunities')}</h2>
            <p className="text-sm text-muted-foreground">{t('getInvolved.opportunitiesByLocation')}</p>
            <Card className="rounded-lg shadow-sm flex-1">
              <ul className="divide-y divide-border">
                {[
                  { name: t('getInvolved.locations.newcastle'), href: '/volunteer/newcastle' },
                  { name: t('getInvolved.locations.centralCoast'), href: '/volunteer/central-coast' },
                  { name: t('getInvolved.locations.armidale'), href: '/volunteer/armidale' },
                  { name: t('getInvolved.locations.tamworth'), href: '/volunteer/tamworth' },
                ].map((place) => (
                  <li key={place.href}>
                    <Link
                      to={place.href}
                      className="flex items-center justify-between py-2 text-foreground hover:text-sky dark:hover:text-sky focus-visible:outline-none focus-visible:ring-0 dark:focus-visible:ring-2 dark:focus-visible:ring-ocean dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background rounded px-1"
                    >
                      <span>{place.name}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            <Button asChild variant="cta" size="cta-sm" className="w-full sm:w-auto">
              <a href="https://forms.mosaicmc.org.au/volunteer-application" target="_blank" rel="noopener noreferrer" aria-label={`${t('getInvolved.applyToVolunteer')} (opens in new tab)`}>
                {t('getInvolved.applyToVolunteer')}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default GetInvolvedPage;
