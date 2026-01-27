import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FAQSection } from '@/components/FAQSection';
import { Heart, Phone, ArrowRight, CheckCircle, Users, Home, Clock, ShieldCheck, Megaphone, Scale, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import RelatedServices from '../../components/RelatedServices';
import { useTranslation } from 'react-i18next';
import { assetPath } from '@/lib/utils';
import { DownloadGate } from '@/components/DownloadGate';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/PageTransition';
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';

type ProgramCard = {
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  fundingNote?: string;
};

const AgedCarePage = () => {
  const { t } = useTranslation();
  // FAQ state and data (matching other services pages)
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [activeProgram, setActiveProgram] = useState<ProgramCard | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const showImpactStories = false;

  useEffect(() => {
    if (!activeProgram) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProgram(null);
        return;
      }
      if (event.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey) {
          if (!active || active === first || !container.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [activeProgram]);

  const teamMembers = [
    {
      name: "Stacey Anderson",
      role: "Care Coordinator, CHSP",
      location: "Central Coast",
      qualifications: "Endorsed Enrolled Nurse; Diploma Community Services (started).",
      experience: "With experience in Emergency, Theatres, Outpatients, and the Australian Red Cross Blood Service, Stacey has held roles as a Treatment Nurse, Improvement Coach, and manager of a dementia-specific day centre.",
      languages: ["English", "Spanish (learning)"],
      image: assetPath("/images/Home Care Team 128px/AgedCareTeam_Stacey_128px.webp")
    },
    {
      name: "Corinne Rietdijk",
      role: "Care Coordinator, SaH",
      location: "Newcastle",
      qualifications: "Certificate III in Aged Care.",
      experience: "Corinne has more than 20 years in aged, dementia, palliative, community, residential disability and mental health care, supporting older people to live safely and with dignity at home and in the community.",
      languages: ["English"],
      image: assetPath("/images/Home Care Team 128px/AgedCareTeam_Corinne_128px.webp")
    },
    {
      name: "Dianne Rainbow",
      role: "Care Coordinator, SaH & CHSP",
      location: "Central Coast",
      qualifications: "Diploma in Aged Care (Case Management).",
      experience: "Dianne has worked across residential care, community support, RAS assessment and case management for 30+ years.",
      languages: ["English"],
      image: assetPath("/images/Home Care Team 128px/AgedCareTeam_Dianne_128px.webp")
    },
    {
      name: "Sally Wiltshire",
      role: "Coordinator, ACVVS",
      location: "Newcastle",
      qualifications: "",
      experience: "Sally coordinates volunteers across aged, palliative and community care, building meaningful connections through the ACVVS program over more than 12 years.",
      languages: ["English"],
      image: assetPath("/images/Home Care Team 128px/AgedCareTeam_Sally_128px.webp")
    }
  ];

  const locations = ["All", ...Array.from(new Set(teamMembers.map(m => m.location).filter((l): l is string => !!l))).sort((a, b) => a.localeCompare(b as string, undefined, { sensitivity: 'base' }))];
  const visibleMembers = selectedLocation === "All" ? teamMembers : teamMembers.filter(m => m.location === selectedLocation);
  const sortedMembers = [...visibleMembers].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const faqData = [
    {
      question: t('agedCare.faq.sahQuestion'),
      answer: t('agedCare.faq.sahAnswer'),
      schemaAnswer: t('agedCare.faq.sahAnswer'),
    },
    {
      question: t('agedCare.faq.chspQuestion'),
      answer: t('agedCare.faq.chspAnswer'),
      schemaAnswer: t('agedCare.faq.chspAnswer'),
    },
    {
      question: t('agedCare.faq.eligibilityQuestion'),
      answer: t('agedCare.faq.eligibilityAnswer'),
      schemaAnswer: t('agedCare.faq.eligibilityAnswer'),
    },
    {
      question: t('agedCare.faq.startQuestion'),
      answer: t('agedCare.faq.startAnswer'),
      schemaAnswer: t('agedCare.faq.startAnswer'),
    },
    {
      question: t('agedCare.faq.matchingQuestion'),
      answer: t('agedCare.faq.matchingAnswer'),
      schemaAnswer: t('agedCare.faq.matchingAnswer'),
    },
    {
      question: t('agedCare.faq.clinicalQuestion'),
      answer: t('agedCare.faq.clinicalAnswer'),
      schemaAnswer: t('agedCare.faq.clinicalAnswer'),
    },
    {
      question: t('agedCare.faq.costsQuestion'),
      answer: (
        <div className="space-y-3 text-base leading-relaxed">
          <p>{t('agedCare.faq.costsAnswer1')}</p>
          <p>{t('agedCare.faq.costsAnswer2')}</p>
        </div>
      ),
      schemaAnswer: `${t('agedCare.faq.costsAnswer1')} ${t('agedCare.faq.costsAnswer2')}`,
    },
    {
      question: t('agedCare.faq.pricingQuestion'),
      answer: (
        <div className="space-y-3 text-base leading-relaxed">
          <p>{t('agedCare.faq.pricingAnswerIntro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <DownloadGate
                  downloadUrl={assetPath("/brochures/Home_Care_Price_List/SaH%20Pricelist%202025.pdf")}
                  resourceLabel={t('agedCare.faq.pricingLinkSah')}
                >
                  {(openForm) => (
                    <button
                      type="button"
                      onClick={openForm}
                      className="underline underline-offset-4 text-left"
                    >
                      {t('agedCare.faq.pricingLinkSah')}
                    </button>
                  )}
                </DownloadGate>
              </li>
              <li>
                <DownloadGate
                  downloadUrl={assetPath("/brochures/Home_Care_Price_List/CHSP%20Pricelist%202025.pdf")}
                  resourceLabel={t('agedCare.faq.pricingLinkChsp')}
                >
                  {(openForm) => (
                    <button
                      type="button"
                      onClick={openForm}
                      className="underline underline-offset-4 text-left"
                    >
                      {t('agedCare.faq.pricingLinkChsp')}
                    </button>
                  )}
                </DownloadGate>
              </li>
            </ul>
            <PDFAccessibilityNotice className="mt-3" />
        </div>
      ),
      schemaAnswer: `${t('agedCare.faq.pricingAnswerIntro')} ${t('agedCare.faq.pricingLinkSah')} ${t('agedCare.faq.pricingLinkChsp')}`,
    },
  ];

  return (
    <PageTransition>
      <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Aged Care Services</title>
        <meta name="description" content="Culturally appropriate aged care and home care services for multicultural seniors. NDIS and Home Care Package provider in NSW." />
      </Helmet>
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        {/* Accent tint overlay to align with care */}
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 motion-safe:animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 motion-safe:animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-50 text-earth-text font-medium text-sm mb-6">
              <Heart className="w-4 h-4" />
              <span>Aged Care Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Dignified Care for Your <span className="text-earth-text">Golden Years</span>
            </h1>
            <p className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
              {t('agedCare.hero.subheadline')}
            </p>
            <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-6 animate-fade-in-up break-words" style={{ animationDelay: '300ms' }}>
              {t('agedCare.hero.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <a
                href="tel:1800813205"
                className="border-2 border-care text-care hover:bg-care hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2"
                aria-label="Call Mosaic on 1800 813 205"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('agedCare.hero.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      

      {/* Programs Showcase with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl motion-safe:animate-pulse-gentle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg animate-fade-in-down">
                <span className="mr-2 h-2 w-2 rounded-full bg-care animate-pulse"></span>
                <span className="text-gray-700 dark:text-white/90 font-medium">{t('agedCare.sections.programs.badge')}</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-8 text-center">{t('agedCare.sections.programs.title')}</h2>

           <div className="max-w-7xl mx-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {([
              {
                title: t('agedCare.programs.sah.title'),
                description: t('agedCare.programs.sah.description'),
                icon: <Home className="h-6 w-6" />,
                features: t('agedCare.programs.sah.features', { returnObjects: true }) as string[],
                fundingNote: t('agedCare.programs.sah.fundingNote'),
              },
              {
                title: t('agedCare.programs.chspIndividual.title'),
                description: t('agedCare.programs.chspIndividual.description'),
                icon: <Users className="h-6 w-6" />,
                features: t('agedCare.programs.chspIndividual.features', { returnObjects: true }) as string[],
                fundingNote: t('agedCare.programs.chspIndividual.fundingNote'),
              },
              {
                title: t('agedCare.programs.chspRespite.title'),
                description: t('agedCare.programs.chspRespite.description'),
                icon: <Clock className="h-6 w-6" />,
                features: t('agedCare.programs.chspRespite.features', { returnObjects: true }) as string[],
                fundingNote: t('agedCare.programs.chspRespite.fundingNote'),
              },
              {
                title: t('agedCare.programs.acvvs.title'),
                description: t('agedCare.programs.acvvs.description'),
                icon: <Users className="h-6 w-6" />,
                features: t('agedCare.programs.acvvs.features', { returnObjects: true }) as string[],
                fundingNote: t('agedCare.programs.acvvs.fundingNote'),
              }
            ] as ProgramCard[]).map((program, index) => (
              <div
                key={index}
                className="group relative flex h-full min-w-0 flex-row items-start gap-4 backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-5 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.16)] hover:shadow-[0_20px_45px_rgba(241,107,131,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15"
              >
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={100}
                  inactiveZone={0.05}
                  movementDuration={1.5}
                  borderWidth={2}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>

                <div className="relative z-10 flex w-full items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out bg-care">
                      <div className="text-white">
                        {program.title === t('agedCare.programs.acvvs.title') ? (
                          <img
                            src={assetPath("/images/ACVVS_logo.svg")}
                            alt="ACVVS logo"
                            className="block h-6 w-6 object-contain object-center brightness-0 invert"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          program.icon
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {program.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/80 mt-1">
                      {program.description}
                    </p>
                    <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="group/cta inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm font-semibold text-care transition-colors duration-300 ease-out hover:text-care/80 whitespace-nowrap"
                      onClick={() => setActiveProgram(program)}
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-b-full bg-gradient-to-r from-care/20 via-care/40 to-care/20"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-care opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Eligibility section placed after programs */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('agedCare.sections.eligibility.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('agedCare.eligibility.items.0')}</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('agedCare.eligibility.items.1')}</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('agedCare.eligibility.items.2')}</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-care mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('agedCare.eligibility.items.3')}</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                <div className="aspect-video">
                    <img
                      src={assetPath("/images/aged-care/eligibility.webp")}
                    alt="Multicultural home care support"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-care font-semibold mb-3">{t('agedCare.sections.how.badge')}</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('agedCare.sections.how.title')}</h2>
          </div>
          <div className="stack-vertical">
            <div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: t('agedCare.how.rights.title'),
                    description: t('agedCare.how.rights.description'),
                    icon: <ShieldCheck className="h-6 w-6 text-care" />,
                  },
                  {
                    title: t('agedCare.how.choice.title'),
                    description: t('agedCare.how.choice.description'),
                    icon: <Megaphone className="h-6 w-6 text-care" />,
                  },
                  {
                    title: t('agedCare.how.voice.title'),
                    description: t('agedCare.how.voice.description'),
                    icon: <Scale className="h-6 w-6 text-care" />,
                  },
                ].map((card, i) => (
                  <div key={i} className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-lg hover:ring-1 hover:ring-care/30 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-3 bg-care/10 rounded-2xl">{card.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-100">{card.description}</p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </section>


      {/* TODO: Unhide when video content is available */}
      {showImpactStories && (
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
          <div className="doc-container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-care font-semibold mb-3">{t('agedCare.impact.badge')}</p>
                <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('agedCare.impact.title')}</h2>
                <p className="fluid-p text-gray-700 dark:text-gray-100 mb-5">{t('agedCare.impact.body')}</p>
                <ul className="space-y-3 text-gray-700 dark:text-gray-100 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-care mt-1">•</span>
                    <span>{t('agedCare.impact.bullets.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-care mt-1">•</span>
                    <span>{t('agedCare.impact.bullets.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-care mt-1">•</span>
                    <span>{t('agedCare.impact.bullets.2')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-white font-semibold mb-2">{t('agedCare.impact.videoPlaceholderTitle')}</p>
                    <p className="text-white/80 text-sm mb-4">{t('agedCare.impact.videoPlaceholderSubtitle')}</p>
                    <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow transition">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {t('agedCare.impact.watchLabel')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="fluid-h2 font-bold text-foreground">{t('agedCare.team.title')}</h2>
            <p className="fluid-p text-muted-foreground max-w-4xl mx-auto">{t('agedCare.team.description')}</p>
          </div>
          <div role="tablist" aria-label="Staff locations" className="flex flex-wrap gap-2 justify-center mb-8">
            {locations.map((loc) => {
              const isActive = selectedLocation === loc;
              return (
                <button
                  key={loc}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedLocation(loc)}
                  className={`inline-flex rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background ${
                    isActive ? 'bg-care text-white border-transparent' : 'bg-background text-foreground border-border hover:bg-sand/60'
                  }`}
                  title={`Show ${loc === "All" ? "all locations" : loc}`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
          {(() => {
            const members = sortedMembers.map((m) => ({
              name: m.name,
              role: m.role,
              languages: m.languages,
              avatar: m.image,
              bio: m.experience ?? m.qualifications ?? '',
              credentialsSummary: m.qualifications,
              location: m.location,
            }));
            return <ManagementSection title="" members={members} accentColor="care" />;
          })()}
        </div>
      </section>

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <FAQSection
        title={t('agedCare.sections.faq.title')}
        subtitle={t('agedCare.sections.faq.subtitle')}
        badge={t('agedCare.sections.faq.badge')}
        items={faqData}
        accentColor="care"
      />

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 motion-safe:animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300 break-words">{t('agedCare.cta.title')}</h2>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-100 mb-8 max-w-3xl mx-auto break-words">{t('agedCare.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-care hover:bg-care/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-care/25 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('agedCare.cta.callLabel')}
              </a>
              <Link
                to="/contact-us"
                className="border-2 border-care text-care hover:bg-care hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background"
              >
                {t('agedCare.cta.contactLabel')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="aged-care" />

      {activeProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
          onClick={() => setActiveProgram(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="aged-program-title"
            aria-describedby="aged-program-desc"
            className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
            ref={dialogRef}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl flex items-center justify-center bg-care">
                  <span className="text-white">
                    {activeProgram.title === t('agedCare.programs.acvvs.title') ? (
                      <img
                        src={assetPath("/images/ACVVS_logo.svg")}
                        alt="ACVVS logo"
                        className="block h-6 w-6 object-contain object-center brightness-0 invert"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      activeProgram.icon
                    )}
                  </span>
                </span>
                <h3 id="aged-program-title" className="text-xl font-semibold">
                  {activeProgram.title}
                </h3>
              </div>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                onClick={() => setActiveProgram(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p id="aged-program-desc" className="mt-4 text-base text-muted-foreground">
              {activeProgram.description}
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <CheckCircle className="h-5 w-5 text-care" />
                {t('agedCare.programs.whatWeProvideLabel', 'What we provide')}
              </div>
              <ul className="mt-3 space-y-2 text-base">
                {activeProgram.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-care" />
                    <span className="text-gray-700 dark:text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {activeProgram.fundingNote && (
              <p className="mt-4 text-sm italic text-muted-foreground">
                {activeProgram.fundingNote}
              </p>
            )}
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setActiveProgram(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </PageTransition>
  );
};

export default AgedCarePage;
