import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Home, Phone, ArrowRight, CheckCircle, Users, ChevronDown, ChevronUp, Globe, FileText, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import RelatedServices from '../../components/RelatedServices';
import { useTranslation } from 'react-i18next';
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

const SettlementSupportPage = () => {
  const { t } = useTranslation();
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default
  const [selectedLocation, setSelectedLocation] = useState<string>("All");

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
    { question: t('settlement.faq.eligibilityQuestion'), answer: t('settlement.faq.eligibilityAnswer') },
    { question: t('settlement.faq.housingQuestion'), answer: t('settlement.faq.housingAnswer') },
    { question: t('settlement.faq.employmentQuestion'), answer: t('settlement.faq.employmentAnswer') },
    { question: t('settlement.faq.govServicesQuestion'), answer: t('settlement.faq.govServicesAnswer') },
    { question: t('settlement.faq.languageQuestion'), answer: t('settlement.faq.languageAnswer') },
    { question: t('settlement.faq.durationQuestion'), answer: t('settlement.faq.durationAnswer') },
  ];

  // Split FAQs into two columns
  const leftColumnFaqs = faqData.slice(0, 4);
  const rightColumnFaqs = faqData.slice(4, 7);

  const AccordionItem = ({ faq, index, value, onValueChange, columnPrefix }: {
    faq: typeof faqData[0];
    index: number;
    value: string | undefined;
    onValueChange: (value: string | undefined) => void;
    columnPrefix: string;
  }) => {
    const itemValue = `${columnPrefix}-${index}`;
    const isOpen = value === itemValue;

    const toggleItem = () => {
      onValueChange(isOpen ? undefined : itemValue);
    };

    return (
      <div className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:scale-[1.01]">
        {/* Question Button */}
        <button
          onClick={toggleItem}
          className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 group"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4 leading-relaxed">
            "{faq.question}"
          </h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-6 w-6 text-sky transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-6 w-6 text-sky transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>
        </button>

        {/* Answer Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'max-h-[500px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 border-t border-white/30 dark:border-white/20 pt-6">
            <p className="text-gray-600 dark:text-white/80 leading-relaxed text-base">
              {faq.answer}
            </p>
          </div>
        </div>

        {/* Subtle accent line */}
        <div className={`h-1 bg-gradient-to-r from-sky to-sky/80 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Settlement Support & Refugee Services | Central Coast, Newcastle & Northern NSW</title>
        <meta
          name="description"
          content="Free settlement services for migrants and multicultural communities across the Central Coast, Newcastle, Lake Macquarie, Maitland, Tamworth and Armidale. Practical help with housing, work, English, safety and legal support."
        />
      </Helmet>
      <FAQSchema faqs={faqData} name="Settlement Support FAQs" />
      
      
      {/* Hero Section with enhanced animations */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Home className="mr-2 h-4 w-4 text-sky" />
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('services.settlement')}</span>
            </div>
            <h1 className="text-5xl fluid-h1 font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">{t('settlement.hero.headline')}</h1>
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
                className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('settlement.hero.cta')}
              </a>
            </div>
            <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">{t('settlement.hero.footerNote')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('settlement.hero.referralNote')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
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

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: t('settlement.programs.housing.title'),
                description: t('settlement.programs.housing.description'),
                features: t('settlement.programs.housing.features', { returnObjects: true }) as string[],
                icon: <Home className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.employment.title'),
                description: t('settlement.programs.employment.description'),
                features: t('settlement.programs.employment.features', { returnObjects: true }) as string[],
                icon: <Users className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.government.title'),
                description: t('settlement.programs.government.description'),
                features: t('settlement.programs.government.features', { returnObjects: true }) as string[],
                icon: <FileText className="h-8 w-8" />,
                color: "sky"
              },
              {
                title: t('settlement.programs.community.title'),
                description: t('settlement.programs.community.description'),
                features: t('settlement.programs.community.features', { returnObjects: true }) as string[],
                icon: <Globe className="h-8 w-8" />,
                color: "sky"
              }
            ].map((service, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>

                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
                      service.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      service.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      service.color === 'leaf' ? 'bg-gradient-to-br from-leaf to-leaf/80' :
                      'bg-gradient-to-br from-sun to-sun/80'
                    }`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">{service.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      service.color === 'sky' ? 'text-sky' :
                      service.color === 'earth' ? 'text-earth' :
                      service.color === 'leaf' ? 'text-leaf' :
                      'text-sun'
                    }`} />
                    {t('settlement.programs.whatWeProvideLabel')}
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          service.color === 'sky' ? 'bg-sky' :
                          service.color === 'earth' ? 'bg-earth' :
                          service.color === 'leaf' ? 'bg-leaf' :
                          'bg-sun'
                        }`}></div>
                        <span className="text-gray-600 dark:text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="stack-vertical">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('settlement.sections.eligibility.title')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">{t('settlement.eligibility.items.0')}</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">{t('settlement.eligibility.items.1')}</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">{t('settlement.eligibility.items.2')}</span>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-sky mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-100">{t('settlement.eligibility.items.3')}</span>
                  </div>
                </div>
                <div className="relative h-64 overflow-hidden rounded-xl md:h-full">
                  <img
                    src={assetPath('/images/SettlementServices_Page_1080px/SettlementServices_Page_1080px.webp')}
                    alt="Settlement Support"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="doc-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-sky font-semibold mb-3">{t('settlement.sections.how.badge')}</p>
            <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('settlement.sections.how.title')}</h2>
            <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto break-words">
              {t('settlement.sections.how.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(t('settlement.how.steps', { returnObjects: true }) as { title: string; description: string; bullets: string[] }[]).map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-sky/10 rounded-2xl">{idx === 0 ? <Phone className="h-6 w-6 text-sky" /> : idx === 1 ? <CheckCircle className="h-6 w-6 text-sky" /> : <Users className="h-6 w-6 text-sky" />}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-sky mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

      {/* Impact video stories */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="doc-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky font-semibold mb-3">{t('settlement.impact.badge')}</p>
              <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('settlement.impact.title')}</h2>
              <p className="fluid-p text-gray-600 dark:text-white/80 mb-5 break-words">
                {t('settlement.impact.helper')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
                  <span>{t('settlement.impact.bullets.0')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
                  <span>{t('settlement.impact.bullets.1')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sky mt-1">•</span>
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
                {t('settlement.comprehensive.paragraph')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-sun animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('settlement.sections.faq.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">{t('settlement.sections.faq.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>{t('settlement.sections.faq.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
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

            {/* Right Column */}
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

      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">{t('settlement.cta.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">{t('settlement.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.mosaicmc.org.au/refer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-sky to-sky/90 hover:from-sky/90 hover:to-sky text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sky/25"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {t('settlement.cta.callLabel')}
              </a>
              <Link
                to="/contact-us"
                className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
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

      
    </div>
  );
};

export default SettlementSupportPage;
