"use client";

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/ui/Section';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Heart, Briefcase, ArrowRight, ExternalLink, ClipboardList } from 'lucide-react';
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



      <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default GetInvolvedPage;
