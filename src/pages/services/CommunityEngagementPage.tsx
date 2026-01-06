import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSchema from '@/components/FAQSchema';
import { Handshake, Phone, ArrowRight, CheckCircle, Calendar, Globe, ChevronDown, ChevronUp, Heart, Award, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import RelatedServices from '../../components/RelatedServices';
import { useTranslation } from 'react-i18next';
import { assetPath } from '@/lib/utils';

const CommunityEngagementPage = () => {
  const { t } = useTranslation();
  // Two separate states for each accordion column
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>("faq-1"); // Second FAQ open by default
  const [selectedLocation, setSelectedLocation] = useState<string>("All");

  const teamMembers = [
    {
      name: "Chiyedza Magwerekwete",
      role: "Gamble Aware Caseworker",
      location: "Newcastle",
      qualifications: "Bachelor in Social Science",
      experience: "Chiyedza has worked in community services and the Permanency Support Program, supporting families to achieve stable, long‑term outcomes.",
      languages: ["English", "Shona"],
      email: "c.magwerekwete@mosaicmc.org.au",
      image: assetPath("/images/Community Engagement Team 128px/CommEngTeam_Chiyedza_128px.webp")
    },
    {
      name: "Natalia Meliendrez",
      role: "Multicultural Community Development Lead",
      location: "Central Coast",
      qualifications: "Community Service Diploma; Diploma of Leadership and Management.",
      experience: "Natalia creates spaces where people from diverse cultural backgrounds feel respected, understood and empowered, leading groups and community programs that honour shared experiences and cultural identities.",
      languages: ["Spanish", "English"],
      phone: "0431 491 748",
      email: "n.meliendrez@mosaicmc.org.au",
      image: assetPath("/images/Community Engagement Team 128px/CommEngTeam_Natalia_128px.webp")
    },
    {
      name: "Helen Mieres",
      role: "Playing around the world – play group facilitator",
      location: "Central Coast",
      experience: "With more than 15 years of community-focused experience, Helen has worked alongside families, children, and people experiencing homelessness to build strength, stability, and connection.",
      languages: ["English", "Spanish"],
      image: assetPath("/images/Community Engagement Team 128px/CommEngTeam_Helen_128px.webp")
    },
    // Removed retired staff entry
  ];

  const locations = ["All", ...Array.from(new Set(teamMembers.map(m => m.location).filter((l): l is string => !!l))).sort((a, b) => a.localeCompare(b as string, undefined, { sensitivity: 'base' }))];
  const visibleMembers = selectedLocation === "All" ? teamMembers : teamMembers.filter(m => m.location === selectedLocation);
  const sortedMembers = [...visibleMembers].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const faqData = [
    { question: t('community.faq.programsQuestion'), answer: t('community.faq.programsAnswer') },
    { question: t('community.faq.leadershipQuestion'), answer: t('community.faq.leadershipAnswer') },
    { question: t('community.faq.volunteerQuestion'), answer: t('community.faq.volunteerAnswer') },
    { question: t('community.faq.festivalsQuestion'), answer: t('community.faq.festivalsAnswer') },
    { question: t('community.faq.advocacyQuestion'), answer: t('community.faq.advocacyAnswer') },
    { question: t('community.faq.partnershipsQuestion'), answer: t('community.faq.partnershipsAnswer') }
  ];

  // Split FAQs into two columns
  const leftColumnFaqs = faqData.slice(0, 3);
  const rightColumnFaqs = faqData.slice(3, 6);

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
              <ChevronUp className="h-6 w-6 text-leaf transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-6 w-6 text-leaf transition-transform duration-300 group-hover:scale-110" />
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
        <div className={`h-1 bg-gradient-to-r from-leaf to-leaf/80 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Community Engagement</title>
        <meta name="description" content="Community engagement programs including cultural festivals, leadership development, volunteering, and advocacy to build inclusive communities." />
      </Helmet>
      <FAQSchema faqs={faqData} name="Community Engagement FAQs" />
      {/* Hero Section with enhanced animations */}
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        {/* Accent tint overlay to differentiate page */}
        <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Handshake className="mr-2 h-4 w-4 text-leaf" />
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('services.communityEngagement')}</span>
            </div>
            <h1 className="text-5xl fluid-h1 font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">{t('community.hero.headline')}</h1>
            <p className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed mb-3 animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
              {t('community.hero.subheadline')}
            </p>
            <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in-up break-words" style={{ animationDelay: '300ms' }}>
              {t('community.hero.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex flex-col items-center">
                <a
                  href="tel:1800813205"
                  className="border-2 border-leaf text-leaf hover:bg-leaf hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t('community.hero.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('community.sections.programs.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">{t('community.sections.programs.title')}</h2>
            <p className="text-xl fluid-p text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>{t('community.sections.programs.description')}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: t('community.programs.gambleAware.title'),
                description: t('community.programs.gambleAware.description'),
                features: t('community.programs.gambleAware.features', { returnObjects: true }) as string[],
                who: t('community.programs.gambleAware.who'),
                icon: <Heart className="h-8 w-8" />,
                color: "leaf"
              },
              {
                title: t('community.programs.multiculturalDevelopment.title'),
                description: t('community.programs.multiculturalDevelopment.description'),
                features: t('community.programs.multiculturalDevelopment.features', { returnObjects: true }) as string[],
                who: t('community.programs.multiculturalDevelopment.who'),
                icon: <Globe className="h-8 w-8" />,
                color: "leaf"
              },
              {
                title: t('community.programs.homeworkCenters.title'),
                description: t('community.programs.homeworkCenters.description'),
                features: t('community.programs.homeworkCenters.features', { returnObjects: true }) as string[],
                who: t('community.programs.homeworkCenters.who'),
                icon: <Award className="h-8 w-8" />,
                color: "leaf"
              }
            ].map((program, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-3xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
                      program.color === 'sun' ? 'bg-gradient-to-br from-sun to-sun/80' :
                      program.color === 'sky' ? 'bg-gradient-to-br from-sky to-sky/80' :
                      program.color === 'earth' ? 'bg-gradient-to-br from-earth to-earth/80' :
                      'bg-gradient-to-br from-leaf to-leaf/80'
                    }`}>
                      <div className="text-white">
                        {program.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{program.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white/80 leading-relaxed mb-6">{program.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle className={`h-5 w-5 mr-2 ${
                      program.color === 'sun' ? 'text-sun' :
                      program.color === 'sky' ? 'text-sky' :
                      program.color === 'earth' ? 'text-earth' :
                      'text-leaf'
                    }`} />
                    {t('community.programs.whatWeProvideLabel')}
                  </h4>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          program.color === 'sun' ? 'bg-sun' :
                          program.color === 'sky' ? 'bg-sky' :
                          program.color === 'earth' ? 'bg-earth' :
                          'bg-leaf'
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
          <div className="animate-fade-in-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('community.sections.eligibility.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('community.eligibility.items.0')}</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('community.eligibility.items.1')}</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-leaf mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">{t('community.eligibility.items.2')}</span>
                </div>
              </div>
              <div className="relative h-64 overflow-hidden rounded-xl md:h-full">
                <img
                  src={assetPath("/images/CommEngagement_Page_1080px/CommunityEngagement_Page_1080px.webp")}
                  alt="Community Engagement"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="doc-container">
          <div className="text-center subsection-break">
            <p className="text-sm uppercase tracking-[0.3em] text-leaf font-semibold mb-3">{t('community.sections.how.badge')}</p>
            <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('community.sections.how.title')}</h2>
            <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto">
              {t('community.sections.how.description')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(t('community.how.steps', { returnObjects: true }) as { title: string; description: string; bullets: string[] }[]).map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-leaf/10 rounded-2xl">{idx === 0 ? <Phone className="h-6 w-6 text-leaf" /> : idx === 1 ? <Calendar className="h-6 w-6 text-leaf" /> : <Award className="h-6 w-6 text-leaf" />}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                      <span className="text-leaf mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="doc-container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-leaf font-semibold mb-3">{t('community.impact.badge')}</p>
              <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('community.impact.title')}</h2>
              <p className="fluid-p text-gray-600 dark:text-white/80 mb-5">{t('community.impact.body')}</p>
              <ul className="space-y-3 text-gray-700 dark:text-white/80 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>{t('community.impact.bullets.0')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>{t('community.impact.bullets.1')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-leaf mt-1">•</span>
                  <span>{t('community.impact.bullets.2')}</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-2xl bg-slate-900/80 flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-white font-semibold mb-2">{t('community.impact.videoPlaceholderTitle')}</p>
                  <p className="text-white/80 text-sm mb-4">{t('community.impact.videoPlaceholderSubtitle')}</p>
                  <button className="inline-flex items-center px-5 py-3 rounded-full bg-white text-slate-900 font-semibold shadow hover:scale-105 transition">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {t('community.impact.watchLabel')}
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
            <h2 className="fluid-h2 font-bold text-foreground">{t('community.team.title')}</h2>
            <p className="fluid-p text-muted-foreground max-w-4xl mx-auto">{t('community.team.description')}</p>
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
                  className={`inline-flex rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2 focus:ring-offset-background ${
                    isActive ? 'bg-leaf text-white border-transparent' : 'bg-background text-foreground border-border hover:bg-sand/60'
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
            return <ManagementSection title="" members={members} accentColor="leaf" />;
          })()}
          <div className="text-center mt-16">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">{t('community.team.collaborativeTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('community.team.collaborativeBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced 2-Column Accordion Design */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{t('community.sections.faq.badge')}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">{t('community.sections.faq.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>{t('community.sections.faq.subtitle')}</p>
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

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300 break-words">{t('community.cta.title')}</h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto break-words">{t('community.cta.body')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.mosaicmc.org.au/refer"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-leaf to-leaf/90 hover:from-leaf/90 hover:to-leaf text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-leaf/25 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2 focus:ring-offset-background"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {t('community.cta.callLabel')}
              </a>
              <Link
                to="/contact-us"
                className="border-2 border-leaf text-leaf hover:bg-leaf hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2 focus:ring-offset-background"
              >
                {t('community.cta.contactLabel')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-white/70 text-sm">{t('community.cta.footnote')}</p>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices current="community-engagement" />
    </div>
  );
};

export default CommunityEngagementPage;
