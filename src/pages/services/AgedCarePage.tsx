import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Heart, Phone, ArrowRight, CheckCircle, Users, Home, Clock, ShieldCheck, Megaphone, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import { GlassCard } from '@/components/ui/GlassCard';
import RelatedServices from '../../components/RelatedServices';
import { useTranslation } from 'react-i18next';

const AgedCarePage = () => {
  const { t } = useTranslation();
  // FAQ state and data (matching other services pages)
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>('faq-1');
  const [selectedLocation, setSelectedLocation] = useState<string>("All");

  type FaqItem = {
    question: string;
    answer: React.ReactNode;
    schemaAnswer: string;
  };

  const teamMembers = [
    {
      name: "Stacey Anderson",
      role: "Care Coordinator, CHSP",
      location: "Central Coast",
      qualifications: "Endorsed Enrolled Nurse; Diploma Community Services (started).",
      experience: "With experience in Emergency, Theatres, Outpatients, and the Australian Red Cross Blood Service, Stacey has held roles as a Treatment Nurse, Improvement Coach, and manager of a dementia-specific day centre.",
      languages: ["English", "Spanish (learning)"],
      image: "/images/Home Care Team 128px/AgedCareTeam_Stacey_128px.webp"
    },
    {
      name: "Corinne Rietdijk",
      role: "Care Coordinator, SaH",
      location: "Newcastle",
      qualifications: "Certificate III in Aged Care.",
      experience: "Corinne has more than 20 years in aged, dementia, palliative, community, residential disability and mental health care, supporting older people to live safely and with dignity at home and in the community.",
      languages: ["English"],
      image: "/images/Home Care Team 128px/AgedCareTeam_Corinne_128px.webp"
    },
    {
      name: "Dianne Rainbow",
      role: "Care Coordinator, SaH & CHSP",
      location: "Central Coast",
      qualifications: "Diploma in Aged Care (Case Management).",
      experience: "Dianne has worked across residential care, community support, RAS assessment and case management for 30+ years.",
      languages: ["English"],
      image: "/images/Home Care Team 128px/AgedCareTeam_Dianne_128px.webp"
    },
    {
      name: "Sally Wiltshire",
      role: "Coordinator, ACVVS",
      location: "Newcastle",
      qualifications: "",
      experience: "Sally coordinates volunteers across aged, palliative and community care, building meaningful connections through the ACVVS program over more than 12 years.",
      languages: ["English"],
      image: "/images/Home Care Team 128px/AgedCareTeam_Sally_128px.webp"
    }
  ];

  const locations = ["All", ...Array.from(new Set(teamMembers.map(m => m.location).filter((l): l is string => !!l))).sort((a, b) => a.localeCompare(b as string, undefined, { sensitivity: 'base' }))];
  const visibleMembers = selectedLocation === "All" ? teamMembers : teamMembers.filter(m => m.location === selectedLocation);
  const sortedMembers = [...visibleMembers].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const faqData: FaqItem[] = [
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
              <a
                href="/brochures/Home_Care_Price_List/SaH%20Pricelist%202025.pdf"
                download
                className="underline underline-offset-4"
              >
                {t('agedCare.faq.pricingLinkSah')}
              </a>
            </li>
            <li>
              <a
                href="/brochures/Home_Care_Price_List/CHSP%20Pricelist%202025.pdf"
                download
                className="underline underline-offset-4"
              >
                {t('agedCare.faq.pricingLinkChsp')}
              </a>
            </li>
          </ul>
        </div>
      ),
      schemaAnswer: `${t('agedCare.faq.pricingAnswerIntro')} ${t('agedCare.faq.pricingLinkSah')} ${t('agedCare.faq.pricingLinkChsp')}`,
    },
  ];

  // Split FAQs into two columns
  const midpoint = Math.ceil(faqData.length / 2);
  const leftColumnFaqs = faqData.slice(0, midpoint);
  const rightColumnFaqs = faqData.slice(midpoint);

  const schemaFaqs = faqData.map((f) => ({ question: f.question, answer: f.schemaAnswer }));

  const AccordionItem = ({ faq, index, value, onValueChange, columnPrefix }: {
    faq: FaqItem;
    index: number;
    value: string | undefined;
    onValueChange: (value: string | undefined) => void;
    columnPrefix: string;
  }) => {
    const itemValue = `${columnPrefix}-${index}`;
    const isOpen = value === itemValue;
    return (
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-md bg-white/60 dark:bg-white/10 ${
          isOpen ? 'border-care shadow-xl' : 'border-white/40 dark:border-white/20'
        }`}
      >
        <button
          className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
          onClick={() => onValueChange(isOpen ? undefined : itemValue)}
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-care"></span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</span>
          </div>
          <span
            className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${
              isOpen ? 'bg-care text-white border-care' : 'border-white/40 dark:border-white/20 text-gray-600 dark:text-white/70'
            }`}
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          className={`px-6 pt-0 pb-6 text-gray-700 dark:text-gray-100 transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          {faq.answer}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Aged Care Services</title>
        <meta name="description" content="Culturally appropriate home care with multilingual staff, home care packages, and family support across NSW." />
      </Helmet>
      <FAQSchema faqs={schemaFaqs} name="Home Care FAQs" />
      
      {/* Hero Section with enhanced animations */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        {/* Accent tint overlay to align with care */}
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Heart className="mr-2 h-4 w-4 text-care" />
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('services.agedCare')}</span>
            </div>
            <h1 className="text-5xl fluid-h1 font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">{t('agedCare.hero.headline')}</h1>
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg animate-fade-in-down">
                <span className="mr-2 h-2 w-2 rounded-full bg-care animate-pulse"></span>
                <span className="text-gray-700 dark:text-white/90 font-medium">{t('agedCare.sections.programs.badge')}</span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-8 text-center">{t('agedCare.sections.programs.title')}</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: t('agedCare.programs.sah.title'),
                  description: t('agedCare.programs.sah.description'),
                  icon: <Home className="h-6 w-6" />,
                  features: t('agedCare.programs.sah.features', { returnObjects: true }) as string[],
                },
                {
                  title: t('agedCare.programs.chspIndividual.title'),
                  description: t('agedCare.programs.chspIndividual.description'),
                  icon: <Users className="h-6 w-6" />,
                  features: t('agedCare.programs.chspIndividual.features', { returnObjects: true }) as string[],
                },
                {
                  title: t('agedCare.programs.chspRespite.title'),
                  description: t('agedCare.programs.chspRespite.description'),
                  icon: <Clock className="h-6 w-6" />,
                  features: t('agedCare.programs.chspRespite.features', { returnObjects: true }) as string[],
                },
                {
                  title: t('agedCare.programs.acvvs.title'),
                  description: t('agedCare.programs.acvvs.description'),
                  icon: <Users className="h-6 w-6" />,
                  features: t('agedCare.programs.acvvs.features', { returnObjects: true }) as string[],
                }
              ].map((program, index) => (
                <GlassCard key={index} className="rounded-xl hover:shadow-lg hover:ring-1 hover:ring-care/30 group hover:scale-105 animate-fade-in-up" padding="lg" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-care rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {program.title === t('agedCare.programs.acvvs.title') ? (
                        <img
                          src="/images/ACVVS_logo.svg"
                          alt="ACVVS logo"
                          className="block h-7 w-7 object-contain object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        program.icon
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-care transition-colors">{program.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-100 mb-4">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="w-2 h-2 rounded-full bg-care mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700 dark:text-gray-100 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {program.title === t('agedCare.programs.acvvs.title') && (
                    <p className="mt-3 text-xs italic text-muted-foreground">
                      {t('agedCare.programs.acvvs.fundingNote')}
                    </p>
                  )}
                </GlassCard>
              ))}
            </div>
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
                    src="/images/aged-care/eligibility.png"
                    alt="Multicultural home care support"
                    className="w-full h-full object-cover"
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
                  <GlassCard key={i} className="rounded-xl hover:shadow-lg hover:ring-1 hover:ring-care/30" padding="lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-3 bg-care/10 rounded-2xl">{card.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-100">{card.description}</p>
                  </GlassCard>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </section>


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
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-care animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('agedCare.sections.faq.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('agedCare.sections.faq.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">{t('agedCare.sections.faq.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {leftColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  value={leftColumnValue}
                  onValueChange={setLeftColumnValue}
                  columnPrefix="left"
                />
              ))}
            </div>

            <div className="space-y-6">
              {rightColumnFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  faq={faq}
                  index={index}
                  value={rightColumnValue}
                  onValueChange={setRightColumnValue}
                  columnPrefix="right"
                />
              ))}
            </div>
          </div>

          
        </div>
      </section>

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-care/10 dark:bg-care/15 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300 break-words">{t('agedCare.cta.title')}</h2>
            <p className="text-base sm:text-xl text-gray-700 dark:text-gray-100 mb-8 max-w-3xl mx-auto break-words">{t('agedCare.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1800813205"
                className="bg-gradient-to-r from-care to-care/90 hover:from-care/90 hover:to-care text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-care/25 focus:outline-none focus:ring-2 focus:ring-care focus:ring-offset-2 focus:ring-offset-background"
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
    </div>
  );
};

export default AgedCarePage;
