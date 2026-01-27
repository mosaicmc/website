import React from 'react';
import { Link } from 'react-router-dom';
import { assetPath, cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import { FileText, Phone, AlertTriangle, Book, ChevronRight, FileDown, ClipboardList } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '../components/RelatedServices';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';
import { DownloadGate } from '@/components/DownloadGate';
import { PageTransition } from '@/components/ui/PageTransition';
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';

import { prefetchOnHover } from '@/lib/prefetch';

const ResourcesPage = () => {
  const { t } = useTranslation();

  // Removed Downloads and FAQs per request; keeping page focused on key links

  const emergencyContacts = [
    { service: t('resources.emergencyContacts.services.police'), number: "000", available: t('resources.emergencyContacts.availability.247') },
    { service: t('resources.emergencyContacts.services.lifeline'), number: "13 11 14", available: t('resources.emergencyContacts.availability.247') },
    { service: t('resources.emergencyContacts.services.dv'), number: "1800 737 732", available: t('resources.emergencyContacts.availability.247') },
    { service: t('resources.emergencyContacts.services.mentalHealth'), number: "1800 011 511", available: t('resources.emergencyContacts.availability.247') },
    { service: t('resources.emergencyContacts.services.mosaic'), number: "1800 813 205", available: t('resources.emergencyContacts.availability.businessHours') },
    { service: t('resources.emergencyContacts.services.tis'), number: "131 450", available: t('resources.emergencyContacts.availability.247') }
  ];

  // Resource quality stats matching the screenshot design
  const qualityStats = [
    { 
      number: "100%", 
      label: t('resources.qualityStats.accuracyVerified'),
      description: t('resources.qualityStats.accuracyVerifiedDesc'),
      color: "sky"
    },
    { 
      number: "25+", 
      label: t('resources.qualityStats.languagesAvailable'),
      description: t('resources.qualityStats.languagesAvailableDesc'),
      color: "earth"
    },
    { 
      number: "24/7", 
      label: t('resources.qualityStats.onlineAccess'),
      description: t('resources.qualityStats.onlineAccessDesc'),
      color: "leaf"
    },
    { 
      number: "4", 
      label: t('resources.qualityStats.officeLocations'),
      description: t('resources.qualityStats.officeLocationsDesc'),
      color: "sun"
    }
  ];

  // Removed color class helper used only by the downloads section

  const getAccentColor = (color: string) => {
    const colorMap = {
      sky: "bg-sky",
      earth: "bg-earth", 
      leaf: "bg-leaf",
      sun: "bg-sun",
      ocean: "bg-ocean"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.sky;
  };

  const brochures = [
    { title: t('resources.brochureTitles.settlementSupport'), href: assetPath('/brochures/settlement-support.pdf'), color: 'sky' },
    { title: t('resources.brochureTitles.familySupport'), href: assetPath('/brochures/family-support.pdf'), color: 'sun' },
    { title: t('resources.brochureTitles.mosaicOverview'), href: assetPath('/brochures/generic-mosaic.pdf'), color: 'ocean' },
    { title: t('resources.brochureTitles.agedCare'), href: assetPath('/brochures/aged-care.pdf'), color: 'earth' },
    { title: t('resources.brochureTitles.communityEngagement'), href: assetPath('/brochures/community-engagement.pdf'), color: 'leaf' },
    { title: t('resources.brochureTitles.homeCareGuide'), href: assetPath('/brochures/Aged Care_Guide 2026.pdf'), color: 'earth' },
  ];

  const projectReports = [
    {
      title: t('resources.reportTitles.welcomingWorkplaces'),
      program: t('resources.reportPrograms.innovationFund'),
      href: assetPath('/Project Reports/Innovation Fund_Welcoming Workplaces Project_Final Report.pdf'),
      color: 'leaf',
      year: undefined
    },
    {
      title: t('resources.reportTitles.reapProject'),
      program: t('resources.reportPrograms.reapProject'),
      href: assetPath('/Project Reports/REAP Project Report.pdf'),
      color: 'sky',
      year: undefined
    }
  ];

  const featuredResources = [
    {
      key: 'emergency-translation',
      title: t('resources.emergencyTranslation'),
      description: t('resources.emergencyTranslationDesc'),
      href: '/resources/emergency-translation',
      icon: AlertTriangle,
      gradient: 'from-sun/20 to-sun/5',
      iconColor: 'text-sun-text',
    },
    {
      key: 'helpful-links',
      title: t('resources.helpfulLinks'),
      description: t('resources.trustedResources'),
      href: '/resources/helpful-links',
      icon: Book,
      gradient: 'from-earth/20 to-earth/5',
      iconColor: 'text-earth-text',
    },
    {
      key: 'knowledge-base',
      title: t('resources.knowledgeBase'),
      description: t('resources.knowledgeBaseDesc'),
      href: '/company/knowledge-base',
      icon: Book,
      gradient: 'from-leaf/20 to-leaf/5',
      iconColor: 'text-leaf-text',
    },
    {
      key: 'faqs',
      title: t('resources.faqs'),
      description: t('resources.faqsDesc'),
      href: '/resources/faqs',
      icon: Book,
      gradient: 'from-sky/20 to-sky/5',
      iconColor: 'text-sky-text',
    },
  ];

  const secondaryResources = [
    {
      key: 'annual-reports',
      title: t('resources.annualReports'),
      description: t('resources.annualReportsDesc'),
      href: '/resources/annual-reports',
      icon: FileText,
      gradient: 'from-leaf/20 to-leaf/5',
      iconColor: 'text-leaf-text',
    },
    {
      key: 'project-reports',
      title: t('resources.projectReports'),
      description: t('resources.projectReportsDesc'),
      href: '#project-reports',
      icon: ClipboardList,
      gradient: 'from-ocean/20 to-ocean/5',
      iconColor: 'text-ocean',
    },
    {
      key: 'brochures',
      title: t('resources.brochures'),
      description: t('resources.brochuresDesc'),
      href: '#brochures',
      icon: FileDown,
      gradient: 'from-earth/20 to-earth/5',
      iconColor: 'text-earth-text',
    },
  ];

  const reportBadgeStyles: Record<string, string> = {
    leaf: 'bg-leaf/10 text-leaf-text border-leaf/20',
    sky: 'bg-sky/10 text-sky-text border-sky/20',
    ocean: 'bg-ocean/10 text-ocean border-ocean/20',
    sun: 'bg-sun/10 text-sun-text border-sun/20',
    earth: 'bg-earth/10 text-earth-text border-earth/20',
  };

  const featuredGrid = [...featuredResources, ...secondaryResources];

  return (
    <PageTransition>
      <div className="animate-fade-in">
      <Helmet>
        <title>{t('resources.pageTitle', { title: t('resources.hero.title') })}</title>
        <meta name="description" content="Mosaic resources: brochures, annual reports, FAQs, emergency contacts, and helpful links for multicultural communities in NSW." />
      </Helmet>
      <Section overlay center padding="lg" overlayClassName="from-ocean/10 via-transparent to-sky/10">
        <AnimatedBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-foreground/80 font-medium">{t('resources.hero.badge')}</span>
          </div>
          <h1 className="fluid-h1 text-5xl font-bold mb-6 text-foreground">{t('resources.hero.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('resources.hero.description')}
          </p>
        </div>
      </Section>

      {/* Cross-sell key services that complement resources */}
      {/* Moved via DOM order to follow CTA while preserving styling */}

      {/* Sticky Emergency Alert */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/10 bg-background/95 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-2 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-sun" />
              <span className="font-medium">
                <Trans
                  i18nKey="resources.emergencyCall"
                  components={{
                    1: <a href="tel:000" className="text-primary hover:underline" />,
                  }}
                />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-earth" />
              <span className="font-medium">
                <Trans
                  i18nKey="resources.interpreterTis"
                  components={{
                    1: <a href="tel:131450" className="text-primary hover:underline" />,
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="text-center mb-10">
          <h2 className="fluid-h2 font-bold text-foreground">{t('resources.featuredResources')}</h2>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('resources.exploreResources')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuredGrid.map((resource) => {
            const card = (
              <div className="flex flex-col h-full rounded-2xl border border-border/60 bg-card/60 shadow-sm overflow-hidden hover:shadow-md hover:border-border transition-all">
                <div className={cn("h-32 bg-gradient-to-br p-5 flex flex-col justify-between", resource.gradient)}>
                  <div className="w-12 h-12 rounded-xl bg-white/90 shadow-sm flex items-center justify-center">
                    <resource.icon className={cn("h-6 w-6", resource.iconColor)} />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{resource.title}</h3>
                </div>
                <div className="flex-1 p-5">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    {t('resources.view')}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            );

            return resource.href.startsWith('#') ? (
              <a key={resource.key} href={resource.href} className="group h-full">
                {card}
              </a>
            ) : (
              <Link
                key={resource.key}
                to={resource.href}
                className="group h-full"
                {...prefetchOnHover(resource.href)}
              >
                {card}
              </Link>
            );
          })}
        </div>
      </Section>

      <Section padding="lg" className="bg-background border-t border-border/60">
        <div id="brochures" className="text-center mb-12">
          <h2 className="fluid-h2 font-bold text-foreground">{t('resources.brochures')}</h2>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('resources.brochuresDesc')}
          </p>
          <PDFAccessibilityNotice className="mt-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {brochures.map((brochure) => (
            <Card key={brochure.title} className="flex flex-col h-full rounded-2xl border border-border/60 bg-card/60 shadow-sm overflow-hidden">
              <div className={cn("h-2 w-full", getAccentColor(brochure.color))} />
              <CardHeader className="p-4 flex-1">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mb-3">
                  <FileDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">{brochure.title}</h4>
              </CardHeader>
              <CardFooter className="p-4 pt-0 mt-auto">
                <DownloadGate downloadUrl={brochure.href} resourceLabel={brochure.title}>
                  {(openForm) => (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      aria-label={t('common.downloadBrochureAria', { title: brochure.title })}
                      onClick={openForm}
                      data-testid="resource-download-btn"
                    >
                      <FileDown className="h-3 w-3 mr-1" />
                      {t('common.download')}
                    </Button>
                  )}
                </DownloadGate>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="lg" className="bg-background border-t border-border/60">
        <div id="project-reports" className="text-center mb-12">
          <h2 className="fluid-h2 font-bold text-foreground">{t('resources.projectReports')}</h2>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('resources.projectReportsDesc')}
          </p>
          <PDFAccessibilityNotice className="mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {projectReports.map((report) => (
            <Card key={report.title} className="flex flex-col h-full rounded-2xl border border-border/60 bg-card/60 shadow-sm overflow-hidden">
              <div className={cn("h-2 w-full", getAccentColor(report.color))} />
              <CardHeader className="p-4 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", reportBadgeStyles[report.color] || reportBadgeStyles.sky)}>
                    {report.program}
                  </span>
                  {report.year && (
                    <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                      {report.year}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">{report.title}</h4>
              </CardHeader>
              <CardFooter className="p-4 pt-0 mt-auto">
                <DownloadGate downloadUrl={report.href} resourceLabel={report.title}>
                  {(openForm) => (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      aria-label={t('common.downloadReportAria', { title: report.title })}
                      onClick={openForm}
                    >
                      <FileDown className="h-3 w-3 mr-1" />
                      {t('common.download')}
                    </Button>
                  )}
                </DownloadGate>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="lg" className="bg-gradient-to-b from-slate-50/60 via-white to-white dark:from-slate-900/40 dark:via-background dark:to-background border-t border-border/60">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-sun/20 text-sun flex items-center justify-center mx-auto mb-4">
            <Phone className="h-6 w-6" />
          </div>
          <h2 className="fluid-h2 font-bold text-foreground">{t('resources.emergencyContacts.title')}</h2>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('resources.emergencyContacts.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.service}
              href={`tel:${contact.number.replace(/\s/g, '')}`}
              className="group flex flex-col h-full rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm transition-all hover:shadow-lg hover:border-border"
              aria-label={t('emergency.aria.callAction', { title: contact.service, number: contact.number })}
            >
              <div className="text-sm font-semibold text-foreground">{contact.service}</div>
              <div className="mt-2 text-2xl font-bold text-primary">{contact.number}</div>
              <div className="mt-auto text-xs text-muted-foreground">{contact.available}</div>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-ocean/5 border-y border-ocean/10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-ocean/10 text-ocean px-3 py-1 text-sm font-medium mb-4">
              {t('resources.qualityAssurance.badge')}
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('resources.qualityAssurance.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('resources.qualityAssurance.description')}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {qualityStats.map((stat, index) => (
                <div key={index} className="bg-background/60 backdrop-blur rounded-xl p-4 border border-border/50">
                  <div className={`text-2xl font-bold text-${stat.color} mb-1`}>{stat.number}</div>
                  <div className="font-medium text-foreground text-sm">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-ocean/20 to-sky/20 rounded-3xl blur-3xl opacity-30" />
            <Card className="relative border-ocean/20 shadow-xl bg-card/80 backdrop-blur">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  {t('resources.emergencyContacts.title')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t('resources.emergencyContacts.description')}
                </p>
              </CardHeader>
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4 border border-red-100 dark:border-red-900/20">
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-900 dark:text-red-200">{t('resources.emergencyContacts.needInterpreter')}</div>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        <Trans i18nKey="resources.emergencyContacts.tisInfo">
                          Call the Translating & Interpreting Service (TIS) on <a href="tel:131450" className="font-bold underline">131 450</a> for immediate language support during emergencies.
                        </Trans>
                      </p>
                      <div className="mt-2 text-xs font-medium text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-900/30 inline-block px-2 py-1 rounded">
                        {t('resources.emergencyContacts.tisAvailability')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                      <div>
                        <div className="font-medium text-foreground">{contact.service}</div>
                        <div className="text-xs text-muted-foreground">{contact.available}</div>
                      </div>
                      <a 
                        href={`tel:${contact.number.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-primary font-bold hover:underline bg-primary/5 px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors"
                        aria-label={t('emergency.aria.callAction', { title: contact.service, number: contact.number })}
                      >
                        <Phone className="h-4 w-4" />
                        {contact.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section padding="lg" className="bg-ocean/10 dark:bg-ocean/20 border-t border-ocean/20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t('resources.cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('resources.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all" asChild>
              <a href="tel:1800813205" aria-label={t('resources.cta.aria.callMosaic')}>
                <Phone className="h-5 w-5" />
                {t('resources.cta.call')}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-background/50 backdrop-blur hover:bg-background/80" asChild>
              <a href="mailto:admin@mosaicmc.org.au" aria-label={t('resources.cta.aria.emailMosaic')}>
                <FileText className="h-5 w-5" />
                {t('resources.cta.email')}
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Related Services appears right after CTA, above footer */}
      <RelatedServices />
      </div>
    </PageTransition>
  );
};

export default ResourcesPage;
