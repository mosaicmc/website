import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { FAQSection } from '@/components/FAQSection';
import { Users, Phone, ArrowRight, CheckCircle, Heart, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import RelatedServices from '../../components/RelatedServices';
import { useTranslation } from 'react-i18next';
import { assetPath } from '@/lib/utils';

const FamilySupportPage = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [expandedProgramIndex, setExpandedProgramIndex] = useState<number | null>(null);

  const programs = [
    {
      title: t('family.programs.tei.title'),
      description: t('family.programs.tei.description'),
      features: t('family.programs.tei.features', { returnObjects: true }) as string[],
      fundingNote: t('family.programs.tei.fundingNote'),
      icon: <Users className="h-8 w-8" />,
      color: "sun"
    },
    {
      title: t('family.programs.paw.title'),
      description: t('family.programs.paw.description'),
      features: t('family.programs.paw.features', { returnObjects: true }) as string[],
      fundingNote: t('family.programs.paw.fundingNote'),
      icon: <Heart className="h-8 w-8" />,
      color: "sun"
    }
  ];

  const teamMembers = [
    {
      name: "Gener Francia Lapina",
      role: "Team Leader - Family Support / Case Management Specialist",
      location: "Newcastle",
      qualifications: "Grad. Dip. Process Oriented Psychotherapy; M.A. in Public Governance; B.S. Human Ecology.",
      experience: "Over more than 20 years in community work, including the last decade focused on families and individual counselling, Gener supports families with compassionate, practical casework.",
      languages: ["English", "Tagalog", "Tetum (Timorese)"],
      phone: "(02) 4960 8401",
      email: "g.lapina@mosaicmc.org.au",
      image: assetPath("/images/Families Team 128px/FamTeam_Gener_128px.webp")
    },
    {
      name: "Miza (Mirsada) Torlakovic",
      role: "Multicultural Families Caseworker",
      location: "Newcastle",
      qualifications: "Bachelor of Social Sciences; Diploma of Welfare Studies",
      experience: "With more than 35 years of client-focused expertise in Settlement Services and Multicultural Family Support, Miza has supported individuals and families from multicultural backgrounds to feel safe, connected and empowered.",
      languages: ["Serbo-Croatian", "Bosnian", "Macedonian", "English"],
      phone: "(02) 4960 8402",
      email: "m.torlakovic@mosaicmc.org.au",
      image: assetPath("/images/Families Team 128px/FamTeam_Miza_128px.webp")
    },
    {
      name: "Juanita Q. Purcell-Loli",
      role: "Multicultural Families Caseworker", 
      location: "Newcastle",
      qualifications: "Master of Arts & Social Science",
      experience: "Juanita brings 30+ years supporting migrant communities and multicultural and vulnerable families to feel safe, connected and empowered.",
      languages: ["English", "Samoan"],
      phone: "(02) 4960 8403",
      email: "j.lolli@mosaicmc.org.au",
      image: assetPath("/images/Families Team 128px/FamTeam_Juanita_128px.webp")
    },
    {
      name: "Elena Martinez",
      role: "Multicultural Families Caseworker",
      location: "Newcastle",
      qualifications: "Honours Degree in Social Science (Australia); Teaching Degree (Russia)",
      experience: "Drawing on experience across education and community services, Elena has a background in primary teaching, disability support and multicultural casework.",
      languages: ["Russian", "English"],
      phone: "0429 146 459",
      email: "e.martinez@mosaicmc.org.au",
      image: assetPath("/images/Families Team 128px/FamTeam_Elena_128px.webp")
    },
    {
      name: "Natalia Meliendrez",
      role: "Multicultural Community Development Lead",
      location: "Central Coast",
      qualifications: "Bachelor of Early and Primary Education, Community Service Diploma- Certificate IV in Disability, Accreditation to parenting programs and Diploma of leadership and management",
      experience: "Natalia creates spaces where people from diverse cultural backgrounds feel respected, understood and empowered, leading groups and community programs that honour shared experiences and cultural identities.",
      languages: ["Spanish", "English"],
      phone: "0431 491 748",
      email: "n.meliendrez@mosaicmc.org.au",
      image: assetPath("/images/Families Team 128px/FamTeam_Natalia_128px.webp")
    },
  ];

  const locations = ["All", ...Array.from(new Set(teamMembers.map(m => m.location).filter((l): l is string => !!l))).sort((a, b) => a.localeCompare(b as string, undefined, { sensitivity: 'base' }))];
  const visibleMembers = selectedLocation === "All" ? teamMembers : teamMembers.filter(m => m.location === selectedLocation);
  const sortedMembers = [...visibleMembers].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const faqData = [
    {
      question: t('family.faq.whichProgramQuestion'),
      answer: t('family.faq.whichProgramAnswer')
    },
    {
      question: t('family.faq.freeQuestion'),
      answer: t('family.faq.freeAnswer')
    },
    {
      question: t('family.faq.languageQuestion'),
      answer: t('family.faq.languageAnswer')
    },
    {
      question: t('family.faq.startQuestion'),
      answer: t('family.faq.startAnswer')
    },
    {
      question: t('family.faq.referralsQuestion'),
      answer: t('family.faq.referralsAnswer')
    },
    {
      question: t('family.faq.availabilityQuestion'),
      answer: t('family.faq.availabilityAnswer')
    }
  ];

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Family Support</title>
        <meta name="description" content="Free multicultural family support including CAFS casework and PAW playgroups, with interpreters and culturally safe programs." />
      </Helmet>
      <FAQSchema faqs={faqData} name="Family Support FAQs" />
      
      
      {/* Hero Section with enhanced animations */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <AnimatedBackground variant="vibrant" />
        <div className="absolute inset-0 bg-sun/10 dark:bg-sun/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Users className="mr-2 h-4 w-4 text-sun" />
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('services.familySupport')}</span>
            </div>
            <h1 className="text-5xl fluid-h1 font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">{t('family.hero.headline')}</h1>
            <p className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed mb-3 animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
              {t('family.hero.subheadline')}
            </p>
            <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up break-words" style={{ animationDelay: '300ms' }}>
              {t('family.hero.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <a
                href="tel:1800813205"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('family.hero.ctaPhone')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
                <span className="mr-2 h-2 w-2 rounded-full bg-sun animate-pulse"></span>
                <span className="text-gray-700 dark:text-white/90 font-medium">{t('family.sections.programs.badge')}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">{t('family.sections.programs.title')}</h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <div 
                className="mb-6 lg:mb-8 break-inside-avoid" 
                key={index}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedProgramIndex === index}
                  aria-controls={`family-program-${index}-details`}
                  onMouseEnter={() => setExpandedProgramIndex(index)}
                  onMouseLeave={() => setExpandedProgramIndex(current => current === index ? null : current)}
                  onFocus={() => setExpandedProgramIndex(index)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setExpandedProgramIndex(current => current === index ? null : current);
                    }
                  }}
                  onClick={() => setExpandedProgramIndex(current => current === index ? null : index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setExpandedProgramIndex(current => current === index ? null : index);
                    }
                  }}
                  className="group relative flex flex-col w-full backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl hover:bg-white/80 dark:hover:bg-white/15 transition-shadow transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-background animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-1">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-br from-sun to-sun/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-sun/25 transition-all duration-300 group-hover:scale-110`}>
                          <div className="text-white">
                            {program.icon}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{program.title}</h3>
                      </div>
                    </div>

                    {expandedProgramIndex === index && (
                      <div 
                        id={`family-program-${index}-details`}
                        className="grid gap-3 pt-3 transition-opacity duration-300 ease-out"
                      >
                        <div className="mb-6">
                          <p className="text-gray-600 dark:text-white/80 leading-relaxed">{program.description}</p>
                        </div>

                        <div className="mb-8">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 text-sun mr-2" />
                            {program.title === t('family.programs.tei.title') 
                              ? t('family.programs.tei.whatWeProvideLabel')
                              : t('family.programs.paw.whatWeProvideLabel')}
                          </h4>
                          <ul className="space-y-3">
                            {program.features.map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-sun mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-white/80 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="mt-auto pt-2 text-xs italic text-muted-foreground">
                          {program.fundingNote}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-b-full bg-sun opacity-60"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sun opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('family.sections.eligibility.title')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {(t('family.eligibility.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <CheckCircle className="h-5 w-5 text-sun mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-gray-700 dark:text-gray-100">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden bg-card/70 border border-border">
                  <div className="aspect-video">
                    <picture>
                      <source srcSet={assetPath("/images/FamilyServices_Page_1080px/FamilyServices_HeroPage_1080px.webp")} type="image/webp" />
                      <img
                        src={assetPath("/images/FamilyServices_Page_1080px/FamilyServices_HeroPage_1080px.webp")}
                        alt="Family support eligibility"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center md:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {t('family.eligibility.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      

      

      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="doc-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-sun font-semibold mb-3">{t('family.sections.how.badge')}</p>
            <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('family.sections.how.title')}</h2>
            <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto">{t('family.sections.how.description')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(t('family.how.steps', { returnObjects: true }) as { title: string; description: string; bullets: string[] }[]).map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-sun/10 rounded-2xl">{idx === 0 ? <Phone className="h-6 w-6 text-sun" /> : idx === 1 ? <CheckCircle className="h-6 w-6 text-sun" /> : <Users className="h-6 w-6 text-sun" />}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-sun mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Impact stories section hidden as per request (videos missing)
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="doc-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sun font-semibold mb-3">Impact stories</p>
              <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">Families finding confidence and connection</h2>
              <p className="fluid-p text-gray-600 dark:text-white/80 mb-5">{t('family.impact.body')}</p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
                  <span>{t('family.impact.bullets.0')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
                  <span>{t('family.impact.bullets.1')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-sun mt-1">•</span>
                  <span>{t('family.impact.bullets.2')}</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white font-semibold mb-2">{t('family.impact.videoPlaceholderTitle')}</p>
                  <p className="text-white/80 text-sm mb-4">{t('family.impact.videoPlaceholderSubtitle')}</p>
                  <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow transition">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {t('family.impact.watchLabel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="fluid-h2 font-bold text-foreground">{t('family.team.title')}</h2>
            <p className="fluid-p text-muted-foreground max-w-4xl mx-auto">{t('family.team.description')}</p>
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
                  className={`inline-flex rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sun focus:ring-offset-2 focus:ring-offset-background ${
                    isActive ? 'bg-sun text-white border-transparent' : 'bg-background text-foreground border-border hover:bg-sand/60'
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
            return <ManagementSection title="" members={members} accentColor="sun" />;
          })()}
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">{t('family.team.integratedTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('family.team.integratedBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <FAQSection
        title={t('family.sections.faq.title')}
        subtitle={t('family.sections.faq.subtitle')}
        badge={t('family.sections.faq.badge')}
        items={faqData}
        accentColor="sun"
      />

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">{t('family.cta.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">{t('family.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.mosaicmc.org.au/refer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sun hover:bg-sun/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-sun/25"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {t('family.cta.referralLabel')}
              </a>
              <Link
                to="/contact-us"
                className="border-2 border-sun text-sun hover:bg-sun hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                {t('family.cta.contactLabel')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="family-support" />
    </div>
  );
};

export default FamilySupportPage;
