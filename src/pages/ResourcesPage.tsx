import React from 'react';
import { Link } from 'react-router-dom';
import { assetPath } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import { FileText, Phone, AlertTriangle, Book, ChevronRight, FileDown, ClipboardList } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import RelatedServices from '../components/RelatedServices';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Section from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { DownloadGate } from '@/components/DownloadGate';

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
      program: 'Innovation Fund',
      href: assetPath('/Project Reports/Innovation Fund_Welcoming Workplaces Project_Final Report.pdf'),
      color: 'leaf',
      year: undefined
    },
    {
      title: t('resources.reportTitles.reapProject'),
      program: 'REAP Project',
      href: assetPath('/Project Reports/REAP Project Report.pdf'),
      color: 'sky',
      year: undefined
    }
  ];

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - {t('resources.hero.title')}</title>
        <meta name="description" content={t('resources.hero.description')} />
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
                <Trans i18nKey="resources.emergencyBar.call">
                  In an emergency call <a href="tel:000" className="text-primary hover:underline">000</a>
                </Trans>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-earth" />
              <span className="font-medium">
                <Trans i18nKey="resources.emergencyBar.interpreter">
                  Interpreter available — TIS <a href="tel:131450" className="text-primary hover:underline">131 450</a>
                </Trans>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Section padding="sm" className="bg-background border-y border-border/60">
        <div className="grid gap-4 sm:grid-cols-3">
            <Card className="group h-full flex flex-col">
              <CardHeader className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-lg bg-sun text-white p-2">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-lg font-semibold text-foreground">Call 000</div>
                    <div className="text-xs text-muted-foreground">{t('resources.emergencyCards.policeFireAmbulance')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a href="tel:000" aria-label={t('emergency.aria.call000')}>
                    {t('resources.emergencyCards.callNow')}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group h-full flex flex-col">
              <CardHeader className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-lg bg-earth text-white p-2">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{t('resources.emergencyCards.tisTitle')}</div>
                    <div className="text-xs text-muted-foreground">{t('resources.emergencyCards.tisDesc')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a href="tel:131450" aria-label={t('emergency.aria.callTis')}>
                    {t('resources.emergencyCards.callNow')}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group h-full flex flex-col">
              <CardHeader className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center rounded-lg bg-leaf text-white p-2">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-lg font-semibold text-foreground">{t('resources.emergencyCards.nswTitle')}</div>
                    <div className="text-xs text-muted-foreground">{t('resources.emergencyCards.nswDesc')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a
                    href="https://www.nsw.gov.au/emergency"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('emergency.aria.openNswEmergency')}
                  >
                    {t('resources.emergencyCards.open')}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-10">
          <h2 className="fluid-h2 font-bold text-foreground">Featured Resources</h2>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            Explore our most requested resources: Emergency Services, Translation Services,
            Annual Reports, and Knowledge Base.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/resources/emergency-translation" {...prefetchOnHover('/resources/emergency-translation')}>
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-sun/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-sun text-white p-3">
                      <AlertTriangle className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Emergency & Translation</h3>
                      <p className="text-sm text-muted-foreground">Emergency contacts and interpreter support (NSW compliance)</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </Link>
            <Link to="/resources/helpful-links" {...prefetchOnHover('/resources/helpful-links')}>
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-earth/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-earth text-white p-3">
                      <Book className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Helpful Links</h3>
                      <p className="text-sm text-muted-foreground">Trusted external resources</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </Link>
            <Link to="/company/knowledge-base" {...prefetchOnHover('/company/knowledge-base')}>
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-earth/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-earth text-white p-3">
                      <Book className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Knowledge Base</h3>
                      <p className="text-sm text-muted-foreground">All organisational policies and governance resources</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </Link>
            <Link to="/resources/faqs" {...prefetchOnHover('/resources/faqs')}>
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-leaf/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-leaf text-white p-3">
                      <Book className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">FAQs</h3>
                      <p className="text-sm text-muted-foreground">Answers to common questions</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </Link>
            <Link to="/resources/annual-reports" {...prefetchOnHover('/resources/annual-reports')}>
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-leaf/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-leaf text-white p-3">
                      <FileText className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Annual Reports</h3>
                      <p className="text-sm text-muted-foreground">1990–2025 with interactive viewer</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </Link>
            <a href="#project-reports" className="block">
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-leaf/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-leaf text-white p-3">
                      <ClipboardList className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Project Reports</h3>
                      <p className="text-sm text-muted-foreground">Download reports on Mosaic programs.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </a>
            <a href="#brochures" className="block">
              <GlassCard className="group h-full flex flex-col rounded-xl hover:shadow-md hover:ring-1 hover:ring-ocean/20" padding="none">
                <div className="p-6 border-b border-border relative rounded-t-xl">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ocean/10 via-transparent to-transparent rounded-t-xl"></div>
                  <div className="flex items-center gap-4 relative">
                    <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                      <FileDown className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Brochures</h3>
                      <p className="text-sm text-muted-foreground">Download service PDFs</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Button variant="link" className="text-primary">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </GlassCard>
            </a>
          </div>
      </Section>

      <Section className="bg-ocean/5 border-y border-ocean/10">
        <div className="relative max-w-5xl mx-auto">
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

              <div className="grid sm:grid-cols-2 gap-3">
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
      </Section>

      <Section id="downloads">
        <div className="space-y-16">
          {/* Brochures Column */}
          <div className="space-y-6" id="brochures">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-sky/10 text-sky">
                <Book className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('resources.brochuresSection.title')}</h3>
                <p className="text-muted-foreground">{t('resources.brochuresSection.description')}</p>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-start">
              {brochures.map((brochure, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col">
                  <div className={`h-1 w-full ${getAccentColor(brochure.color)} opacity-80`} />
                  <CardHeader className="p-5 flex-1 relative">
                    <div className={`absolute top-4 right-4 p-2 rounded-full bg-${brochure.color} text-white shadow-sm`}>
                       <FileDown className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-8">
                      {brochure.title}
                    </h4>
                  </CardHeader>
                  <CardFooter className="p-5 pt-0 mt-auto">
                    <DownloadGate 
                      downloadUrl={brochure.href}
                      resourceLabel={brochure.title}
                    >
                      {(openForm) => (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between hover:bg-muted group/btn pl-0" 
                          onClick={openForm}
                          aria-label={t('common.downloadBrochureAria', { title: brochure.title })}
                        >
                          <span className="text-muted-foreground group-hover/btn:text-foreground font-medium">{t('common.download')}</span>
                        </Button>
                      )}
                    </DownloadGate>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Project Reports Column */}
          <div className="space-y-6 scroll-mt-28" id="project-reports">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-leaf/10 text-leaf">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('resources.projectReportsSection.title')}</h3>
                <p className="text-muted-foreground">{t('resources.projectReportsSection.description')}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 items-start">
              {projectReports.map((report, index) => (
                <GlassCard key={index} className="group hover:bg-card/80 transition-all duration-300">
                  <div className="flex flex-col gap-4 p-1 h-full justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${report.color}/10 text-${report.color} border border-${report.color}/20`}>
                          {report.program}
                        </span>
                        {report.year && (
                          <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                            {report.year}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {report.title}
                      </h4>
                    </div>
                    <DownloadGate 
                      downloadUrl={report.href}
                      resourceLabel={report.title}
                    >
                      {(openForm) => (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-center gap-2" 
                          onClick={openForm}
                          aria-label={t('common.downloadReportAria', { title: report.title })}
                        >
                          <FileDown className="h-4 w-4" />
                          {t('common.download')}
                        </Button>
                      )}
                    </DownloadGate>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-ocean/5 border-y border-ocean/10">
        <div className="space-y-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-ocean/10 text-ocean px-3 py-1 text-sm font-medium mb-4">
              {t('resources.qualityAssurance.badge')}
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('resources.qualityAssurance.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('resources.qualityAssurance.description')}
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-left">
              {qualityStats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className={`relative backdrop-blur-xl bg-background/60 dark:bg-white/5 rounded-2xl p-6 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-background/80 dark:group-hover:bg-white/10 ${stat.color === 'sky' ? 'shadow-sky/20 hover:shadow-sky/30' : stat.color === 'earth' ? 'shadow-earth/20 hover:shadow-earth/30' : stat.color === 'sun' ? 'shadow-sun/20 hover:shadow-sun/30' : 'shadow-leaf/20 hover:shadow-leaf/30'}`}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-4">
                        <div className={`text-4xl font-bold mb-2 transition-all duration-300 text-${stat.color}`}>
                          {stat.number}
                        </div>
                        <div className="w-12 h-1 rounded-full overflow-hidden bg-muted">
                          <div className={`h-full w-full rounded-full bg-${stat.color} opacity-80`}></div>
                        </div>
                      </div>
                      <div className="font-semibold text-foreground mb-2">{stat.label}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{stat.description}</div>
                    </div>

                    {/* Top accent */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full bg-${stat.color} opacity-60`}></div>
                  </div>
                </div>
              ))}
            </div>
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
  );
};

export default ResourcesPage;
