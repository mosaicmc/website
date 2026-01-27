import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { FAQSection } from '@/components/FAQSection';
import {
  Home,
  Phone,
  ArrowRight,
  CheckCircle,
  Users,
  FileText,
  UserPlus,
  HeartPulse,
  BookOpen,
  Briefcase,
  Languages,
  Route,
  Scale,
  HeartHandshake,
  X,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import RelatedServices from '../../components/RelatedServices';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/PageTransition';
import MirjaImg from './SETS Team 128px/SETSTeam_Mirja_128px.webp';
import MadanImg from './SETS Team 128px/SETSTeam_Madan_128px.webp';
import BasimImg from './SETS Team 128px/SETSTeam_Basim_128px.webp';
import PatriciaImg from './SETS Team 128px/SETSTeam_Patricia_128px.webp';
import BronwynImg from './SETS Team 128px/SETSTeam_Bronwyn_128px.webp';
import RoseImg from './SETS Team 128px/SETSTeam_Rose_128px.webp';
import SamiImg from './SETS Team 128px/SETSTeam_Sami_128px.webp';
import MaramImg from './SETS Team 128px/SETSTeam_Maram_128px.webp';
import MichaelImg from './SETS Team 128px/SETSTeam_Michael_128px.webp';
import LeeImg from './SETS Team 128px/SETSTeam_Lee_128px.webp';
import { assetPath } from '@/lib/utils';

type ProgramCard = {
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  color: 'sky' | 'earth' | 'leaf' | 'sun';
};

type ExternalTransLinkProps = {
  href: string;
  className?: string;
  ariaLabel: string;
  children?: React.ReactNode;
};

const ExternalTransLink = ({ href, className, ariaLabel, children }: ExternalTransLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${ariaLabel} (opens in new tab)`}
    className={`inline-flex items-center gap-1 ${className ?? ''}`}
  >
    {children}
    <ExternalLink className="h-3 w-3" aria-hidden="true" />
  </a>
);

const SettlementSupportPage = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [activeProgram, setActiveProgram] = useState<ProgramCard | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const showImpactStories = false;

  useEffect(() => {
    if (!activeProgram) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProgram(null);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeProgram]);

  const teamMembers = [
    {
      name: "Basim Khudeda",
      role: "Settlement Caseworker",
      location: "Armidale",
      qualifications: "Certificate III in Business Administration; currently studying Applied Physics and Mathematics.",
      experience: "Basim has provided settlement support in Armidale since February 2024, drawing on business administration experience and ongoing studies in Applied Physics and Mathematics.",
      languages: ["Ezidi", "Kurdish (Kurmanji)", "Arabic", "English"],
      image: BasimImg
    },
    {
      name: "Maram Mohamed",
      role: "Settlement Caseworker",
      location: "Newcastle",
      qualifications: "Master of Social Change and Development; Bachelor of Mass Communication.",
      experience: "Experienced in leading international student initiatives and delivering hospitality and events programs, helping students gain recognition and awards.",
      languages: ["English", "Arabic"],
      image: MaramImg
    },
    {
      name: "Patricia Camilleri",
      role: "Settlement Caseworker",
      location: "Central Coast",
      qualifications: "Diploma of Community Service; Diploma of Management.",
      experience: "Patricia brings over 25 years across welfare, case management and program delivery, supporting families to access services and achieve positive outcomes.",
      languages: ["English", "Spanish"],
      image: PatriciaImg
    },
    {
      name: "Mirja Colding-Moran",
      role: "Team Leader, Settlement Services",
      location: "Newcastle",
      qualifications: "B.Educ/B.Soc.Sci (Hons); Grad Dip Migration Law & Practice; Dip International Relations.",
      experience: "Mirja has worked in refugee settlement and migration law, guiding migrants and refugees through services and legal pathways.",
      languages: ["English", "Swedish"],
      image: MirjaImg
    },
    {
      name: "Bronwyn",
      role: "Settlement Caseworker",
      location: "Newcastle",
      qualifications: "BAppSci (Human Geog); Adv Clinical Training Gestalt Psychotherapy; Grad Dip Gestalt Therapy.",
      experience: "Over 25 years of experience in community development, case management, engagement and counselling, helping individuals and communities connect, heal and thrive.",
      languages: ["English", "Turkish (basic)", "Khmer (basic)", "German (basic)"],
      image: BronwynImg
    },
    {
      name: "Lee Arandale",
      role: "Settlement Caseworker",
      location: "Armidale",
      qualifications: "Associate Diploma Arts (Peace Studies); Diploma Community Services (Case Management).",
      experience: "Over 20 years of experience in case management, advocacy and community projects, strengthening access to services and community capacity.",
      languages: ["English"],
      image: LeeImg
    },
    {
      name: "Mohammad Sami Zakhil",
      role: "Youth Connector/ Settlement Caseworker",
      location: "Newcastle",
      qualifications: "Diploma Management & Leadership; Diploma Community Works; Degree in Public Administration.",
      experience: "Mohammad Sami brings over 10 years of experience working for Youth empowerment with a background in advocacy Youth empowerment, women's and children rights and community work.",
      languages: ["Pashto", "Dari", "English", "Urdu", "Hindi", "Persian", "Zargari"],
      image: SamiImg
    },
    {
      name: "Rose Oku",
      role: "Settlement Caseworker",
      location: "Newcastle",
      qualifications: "Master of Social Work (Qualifying); Bachelor of Social Science; Diploma Community Service; Diploma Youth Work.",
      experience: "Rose has 23 years in youth and community development, supporting multicultural groups and playgroups to feel connected and thrive.",
      languages: ["English", "Luo"],
      image: RoseImg
    },
    {
      name: "Michael de Laroche Souvestre",
      role: "Settlement Caseworker",
      location: "Tamworth",
      qualifications: "Associate Degree in Policing Practice.",
      experience: "Over 10 years of experience in policing, community engagement and domestic violence support, helping individuals and families stay safe and access justice.",
      languages: ["English"],
      image: MichaelImg
    },
    {
      name: "Madan Narayanamurthy",
      role: "Regional Coordinator, Settlement Services",
      location: "Armidale",
      qualifications: "Cert IV in Community Services; Master's in IT.",
      experience: "Over 10 years of experience in program and community development for non-profits, with a focus on managing digital fundraising and event promotions.",
      languages: ["English", "Hindi", "Tamil", "Telugu"],
      image: MadanImg
    }
  ];

  const locations = ["All", ...Array.from(new Set(teamMembers.map(m => m.location).filter((l): l is string => !!l))).sort((a, b) => a.localeCompare(b as string, undefined, { sensitivity: 'base' }))];
  const visibleMembers = selectedLocation === "All" ? teamMembers : teamMembers.filter(m => m.location === selectedLocation);
  const sortedMembers = [...visibleMembers].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const faqData = [
    { question: t('settlement.faq.referralQuestion'), answer: t('settlement.faq.referralAnswer') },
    {
      question: t('settlement.faq.eligibilityQuestion'),
      answer: (
        <Trans
          i18nKey="settlement.faq.eligibilityAnswer"
          components={{ 1: <ExternalTransLink href="https://immi.homeaffairs.gov.au/settling-in-australia/sets-program/eligibility" ariaLabel={t('settlement.eligibility.eligibilityLinkLabel')} className="text-sky-text hover:underline font-medium" /> }}
        />
      ),
      schemaAnswer: t('settlement.faq.eligibilityAnswer').replace(/<[^>]*>/g, '')
    },
    { question: t('settlement.faq.housingQuestion'), answer: t('settlement.faq.housingAnswer') },
    { question: t('settlement.faq.employmentQuestion'), answer: t('settlement.faq.employmentAnswer') },
    { question: t('settlement.faq.govServicesQuestion'), answer: t('settlement.faq.govServicesAnswer') },
    { question: t('settlement.faq.languageQuestion'), answer: t('settlement.faq.languageAnswer') },
    {
      question: t('settlement.faq.durationQuestion'),
      answer: (
        <Trans
          i18nKey="settlement.faq.durationAnswer"
          components={{ 0: <div className="mb-4" />, 1: <div /> }}
        />
      ),
      schemaAnswer: t('settlement.faq.durationAnswer').replace(/<[^>]*>/g, ' ')
    },
  ];

  return (
    <PageTransition>
      <div className="animate-fade-in">
      <Helmet>
        <title>Settlement Support & Refugee Services | Central Coast, Newcastle & Northern NSW</title>
        <meta
          name="description"
          content="Settlement support for migrants and refugees in NSW. Help with housing, employment, education, English, and community connection."
        />
      </Helmet>
      <FAQSchema faqs={faqData} name="Settlement Support FAQs" />
      
      
      {/* Hero Section with enhanced animations */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 motion-safe:animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 motion-safe:animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-text font-medium text-sm mb-6">
              <Home className="w-4 h-4" />
              <span>{t('services.settlement')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              Supporting Your Journey to a <span className="text-sky-text">New Life</span>
            </h1>
            <p
              className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed mb-4 animate-fade-in-up break-words"
              style={{ animationDelay: '200ms' }}
            >
              {t('settlement.hero.subheadline')}
            </p>
            <p
              className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up break-words"
              style={{ animationDelay: '280ms' }}
            >
              {t('settlement.hero.bodyPrimary')} {t('settlement.hero.bodySecondary')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <a
                href="tel:1800813205"
                className="border-2 border-sky text-sky-text hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('settlement.hero.cta')}
              </a>
            </div>
            <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                <Trans
                  i18nKey="settlement.hero.footerNote"
                  components={{ 1: <ExternalTransLink href="https://immi.homeaffairs.gov.au/settling-in-australia/sets-program/eligibility" ariaLabel={t('settlement.eligibility.eligibilityLinkLabel')} className="text-sky-text hover:underline font-medium" /> }}
                />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('settlement.hero.referralNote')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('settlement.sections.programs.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">{t('settlement.sections.programs.title')}</h2>
            <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
              {t('settlement.programs.helper')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {([
              {
                title: t('settlement.programs.educationTraining.title'),
                description: t('settlement.programs.educationTraining.description'),
                features: t('settlement.programs.educationTraining.features', { returnObjects: true }) as string[],
                icon: <BookOpen className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.employment.title'),
                description: t('settlement.programs.employment.description'),
                features: t('settlement.programs.employment.features', { returnObjects: true }) as string[],
                icon: <Briefcase className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.healthWellbeing.title'),
                description: t('settlement.programs.healthWellbeing.description'),
                features: t('settlement.programs.healthWellbeing.features', { returnObjects: true }) as string[],
                icon: <HeartPulse className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.housing.title'),
                description: t('settlement.programs.housing.description'),
                features: t('settlement.programs.housing.features', { returnObjects: true }) as string[],
                icon: <Home className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.languageServices.title'),
                description: t('settlement.programs.languageServices.description'),
                features: t('settlement.programs.languageServices.features', { returnObjects: true }) as string[],
                icon: <Languages className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.transport.title'),
                description: t('settlement.programs.transport.description'),
                features: t('settlement.programs.transport.features', { returnObjects: true }) as string[],
                icon: <Route className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.civicParticipation.title'),
                description: t('settlement.programs.civicParticipation.description'),
                features: t('settlement.programs.civicParticipation.features', { returnObjects: true }) as string[],
                icon: <Users className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.familySocialSupport.title'),
                description: t('settlement.programs.familySocialSupport.description'),
                features: t('settlement.programs.familySocialSupport.features', { returnObjects: true }) as string[],
                icon: <HeartHandshake className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.justice.title'),
                description: t('settlement.programs.justice.description'),
                features: t('settlement.programs.justice.features', { returnObjects: true }) as string[],
                icon: <Scale className="h-6 w-6" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.finance.title'),
                description: t('settlement.programs.finance.description'),
                features: t('settlement.programs.finance.features', { returnObjects: true }) as string[],
                icon: <FileText className="h-6 w-6" />,
                color: "sky"
              }
            ] as ProgramCard[]).map((service, index) => {
              const bgClass = service.color === 'sky'
                ? 'bg-sky'
                : service.color === 'earth'
                  ? 'bg-earth'
                  : service.color === 'leaf'
                    ? 'bg-leaf'
                    : 'bg-sun';
              const hoverGlowClass = service.color === 'sky'
                ? 'hover:shadow-[0_20px_45px_rgba(96,199,204,0.25)]'
                : service.color === 'earth'
                  ? 'hover:shadow-[0_20px_45px_rgba(243,122,96,0.25)]'
                  : service.color === 'leaf'
                    ? 'hover:shadow-[0_20px_45px_rgba(180,215,133,0.28)]'
                    : 'hover:shadow-[0_20px_45px_rgba(252,183,61,0.28)]';
              const glowClass = service.color === 'sky'
                ? 'bg-sky'
                : service.color === 'earth'
                  ? 'bg-earth'
                  : service.color === 'leaf'
                    ? 'bg-leaf'
                    : 'bg-sun';
              return (
                <div
                  key={index}
                  className={`group relative flex h-full min-w-0 flex-row items-start gap-4 backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-5 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15 ${hoverGlowClass}`}
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
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out ${bgClass}`}>
                        <div className="text-white">{service.icon}</div>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white/80 mt-1">
                        {service.description}
                      </p>
                      <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="group/cta inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm font-semibold text-sky-text transition-colors duration-300 ease-out hover:text-sky/80 whitespace-nowrap"
                        onClick={() => setActiveProgram(service)}
                      >
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                      </Button>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-b-full bg-gradient-to-r from-sky/20 via-sky/40 to-sky/20`}></div>
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${glowClass} opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="eligibility" className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stack-vertical">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('settlement.sections.eligibility.title')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {(t('settlement.eligibility.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <CheckCircle className="h-5 w-5 text-sky-text mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-gray-700 dark:text-gray-100">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="relative h-64 overflow-hidden rounded-xl md:h-full">
                  <img
                    src={assetPath('/images/SettlementServices_Page_1080px/SettlementServices_Page_1080px.webp')}
                    alt="Settlement Support"
                    width={1080}
                    height={608}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              
              <div className="mt-8 text-center md:text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {t('settlement.eligibility.note')}
                </p>
                <p className="mt-2 text-sm">
                  <a
                    href="https://immi.homeaffairs.gov.au/settling-in-australia/sets-program/eligibility"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('settlement.eligibility.eligibilityLinkLabel')} (opens in new tab)`}
                    className="inline-flex items-center gap-1 text-sky-text hover:underline font-medium"
                  >
                    {t('settlement.eligibility.eligibilityLinkLabel')}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="doc-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-text font-semibold mb-3">{t('settlement.sections.how.badge')}</p>
            <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('settlement.sections.how.title')}</h2>
            <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto break-words">
              {t('settlement.sections.how.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(t('settlement.how.steps', { returnObjects: true }) as { title: string; description: string; bullets: string[] }[]).map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-sky/10 rounded-2xl">{idx === 0 ? <Phone className="h-6 w-6 text-sky-text" /> : idx === 1 ? <CheckCircle className="h-6 w-6 text-sky-text" /> : <Users className="h-6 w-6 text-sky-text" />}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-sky-text mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      {/* TODO: Unhide when video content is available */}
      {showImpactStories && (
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
          <div className="doc-container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-text font-semibold mb-3">{t('settlement.impact.badge')}</p>
                <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('settlement.impact.title')}</h2>
                <p className="fluid-p text-gray-600 dark:text-white/80 mb-5 break-words">
                  {t('settlement.impact.helper')}
                </p>
                <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-sky-text mt-1">•</span>
                    <span>{t('settlement.impact.bullets.0')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-sky-text mt-1">•</span>
                    <span>{t('settlement.impact.bullets.1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-sky-text mt-1">•</span>
                    <span>{t('settlement.impact.bullets.2')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-white font-semibold mb-2">{t('settlement.impact.videoPlaceholderTitle')}</p>
                    <p className="text-white/80 text-sm mb-4">{t('settlement.impact.videoPlaceholderSubtitle')}</p>
                    <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow hover:scale-105 transition">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      {t('settlement.impact.watchLabel')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="fluid-h2 font-bold text-foreground">{t('settlement.team.title')}</h2>
            <p className="fluid-p text-muted-foreground max-w-4xl mx-auto">{t('settlement.team.description')}</p>
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
                  className={`inline-flex rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background ${
                    isActive ? 'bg-sky text-white border-transparent' : 'bg-background text-foreground border-border hover:bg-sand/60'
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
            return <ManagementSection title="" members={members} accentColor="sky" />;
          })()}
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">{t('settlement.comprehensive.title')}</h3>
              <p className="text-muted-foreground leading-relaxed break-words">
                {(() => {
                  const scoaText = 'Settlement Council of Australia (SCOA) framework';
                  const paragraph = t('settlement.comprehensive.paragraph');
                  const parts = paragraph.split(scoaText);
                  return (
                    <>
                      {parts[0]}
                      <a
                        href="https://scoa.org.au/wp-content/uploads/2021/02/SCoA-SSQF.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${scoaText} (opens in new tab)`}
                        className="inline-flex items-center gap-1 text-sky-text hover:underline font-medium"
                      >
                        {scoaText}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      {parts[1] ?? ''}
                    </>
                  );
                })()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <FAQSection
        title={t('settlement.sections.faq.title')}
        subtitle={t('settlement.sections.faq.subtitle')}
        badge={t('settlement.sections.faq.badge')}
        items={faqData}
        accentColor="sky"
      />

      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 motion-safe:animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">{t('settlement.cta.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">{t('settlement.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.mosaicmc.org.au/refer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('settlement.cta.callLabel')} (opens in new tab)`}
                className="bg-sky hover:bg-sky/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-sky/25"
              >
                <UserPlus className="h-5 w-5" />
                {t('settlement.cta.callLabel')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/contact-us"
                className="border-2 border-sky text-sky-text hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                {t('settlement.cta.contactLabel')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-white/70 text-sm">{t('settlement.cta.footnote')}</p>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="settlement-support" />

      {activeProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="presentation"
          onClick={() => setActiveProgram(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settlement-program-title"
            aria-describedby="settlement-program-desc"
            className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  activeProgram.color === 'sky'
                    ? 'bg-sky'
                    : activeProgram.color === 'earth'
                      ? 'bg-earth'
                      : activeProgram.color === 'leaf'
                        ? 'bg-leaf'
                        : 'bg-sun'
                }`}>
                  <span className="text-white">{activeProgram.icon}</span>
                </span>
                <h3 id="settlement-program-title" className="text-xl font-semibold">
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
            <p id="settlement-program-desc" className="mt-4 text-base text-muted-foreground">
              {activeProgram.description}
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <CheckCircle className={`h-5 w-5 ${
                  activeProgram.color === 'sky'
                    ? 'text-sky'
                    : activeProgram.color === 'earth'
                      ? 'text-earth'
                      : activeProgram.color === 'leaf'
                        ? 'text-leaf'
                        : 'text-sun'
                }`} />
                {t('settlement.programs.whatWeProvideLabel')}
              </div>
              <ul className="mt-3 space-y-2 text-base">
                {activeProgram.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`mt-2 h-2 w-2 rounded-full ${
                      activeProgram.color === 'sky'
                        ? 'bg-sky'
                        : activeProgram.color === 'earth'
                          ? 'bg-earth'
                          : activeProgram.color === 'leaf'
                            ? 'bg-leaf'
                            : 'bg-sun'
                    }`} />
                    <span className="text-gray-700 dark:text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
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

export default SettlementSupportPage;
