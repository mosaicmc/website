import React from 'react';
import { Link } from 'react-router-dom';
import { assetPath } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
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
  // Removed Downloads and FAQs per request; keeping page focused on key links

  const emergencyContacts = [
    { service: "Police, Fire, Ambulance", number: "000", available: "24/7" },
    { service: "Lifeline Crisis Support", number: "13 11 14", available: "24/7" },
    { service: "Domestic Violence Helpline", number: "1800 737 732", available: "24/7" },
    { service: "Mental Health Crisis Line", number: "1800 011 511", available: "24/7" },
    { service: "Mosaic Multicultural Connections", number: "1800 813 205", available: "Business hours (Mon–Fri 9am–5pm)" },
    { service: "Translating & Interpreting Service", number: "131 450", available: "24/7" }
  ];

  // Resource quality stats matching the screenshot design
  const qualityStats = [
    { 
      number: "100%", 
      label: "Accuracy Verified",
      description: "All resources professionally reviewed",
      color: "sky"
    },
    { 
      number: "25+", 
      label: "Languages Available",
      description: "Multilingual resource access",
      color: "earth"
    },
    { 
      number: "24/7", 
      label: "Online Access",
      description: "Resources available anytime",
      color: "leaf"
    },
    { 
      number: "4", 
      label: "Office Locations",
      description: "Physical support across NSW",
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
    { title: 'Settlement Support', href: assetPath('/brochures/settlement-support.pdf'), color: 'sky' },
    { title: 'Family Support', href: assetPath('/brochures/family-support.pdf'), color: 'sun' },
    { title: 'Mosaic Overview', href: assetPath('/brochures/generic-mosaic.pdf'), color: 'ocean' },
    { title: 'Aged Care', href: assetPath('/brochures/aged-care.pdf'), color: 'earth' },
    { title: 'Community Engagement', href: assetPath('/brochures/community-engagement.pdf'), color: 'leaf' },
    { title: 'Mosaic Home Care Guide 2026', href: assetPath('/brochures/Aged Care_Guide 2026.pdf'), color: 'earth' },
  ];

  const projectReports = [
    {
      title: 'Welcoming Workplaces Project Final Report',
      program: 'Innovation Fund',
      href: assetPath('/Project Reports/Innovation Fund_Welcoming Workplaces Project_Final Report.pdf'),
      color: 'leaf',
      year: undefined
    },
    {
      title: 'REAP Project Report',
      program: 'REAP Project',
      href: assetPath('/Project Reports/REAP Project Report.pdf'),
      color: 'sky',
      year: undefined
    }
  ];

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Mosaic Multicultural - Resources & Support</title>
        <meta name="description" content="Access guides, policies, FAQs, and emergency contacts. Multilingual resources and professionally reviewed information to support multicultural communities." />
      </Helmet>
      <Section overlay center padding="lg" overlayClassName="from-ocean/10 via-transparent to-sky/10">
        <AnimatedBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-foreground/80 font-medium">Resources</span>
          </div>
          <h1 className="fluid-h1 text-5xl font-bold mb-6 text-foreground">Resources & Support</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Access important information, emergency contacts, and downloadable resources in multiple languages.
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
              <span className="font-medium">In an emergency call <a href="tel:000" className="text-primary hover:underline">000</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-earth" />
              <span className="font-medium">Interpreter available — TIS <a href="tel:131450" className="text-primary hover:underline">131 450</a></span>
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
                    <div className="text-xs text-muted-foreground">Police • Fire • Ambulance</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a href="tel:000" aria-label="Call 000 for Police, Fire, Ambulance">
                    Call now
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
                    <div className="text-lg font-semibold text-foreground">TIS 131 450</div>
                    <div className="text-xs text-muted-foreground">Translating & Interpreting Service</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a href="tel:131450" aria-label="Call TIS National 131 450 for interpreters">
                    Call now
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
                    <div className="text-lg font-semibold text-foreground">NSW Emergency Info</div>
                    <div className="text-xs text-muted-foreground">Official guidance and contacts</div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 mt-auto">
                <Button asChild variant="outline" size="sm" className="rounded-lg">
                  <a
                    href="https://www.nsw.gov.au/emergency"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open NSW Government emergency information"
                  >
                    Open
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

      <Section padding="lg" className="bg-background border-t border-border/60">
        <div id="brochures">
          <div className="text-center mb-10">
            <h2 className="fluid-h2 font-bold text-foreground">Brochures</h2>
            <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
              Download service brochures to share or read offline. Available for all core services.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {brochures.map((b) => (
              <Card key={b.title} className="group">
                <CardHeader className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center rounded-lg ${getAccentColor(b.color)} text-white p-2`}>
                      <FileDown className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-lg font-semibold text-foreground">{b.title}</div>
                      <div className="text-xs text-muted-foreground">PDF brochure</div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-6">
                  <DownloadGate downloadUrl={b.href} resourceLabel={`${b.title} brochure`}>
                    {(openForm) => (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={openForm}
                        data-testid="resource-download-btn"
                        aria-label={`Download ${b.title} brochure (PDF)`}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </DownloadGate>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section padding="lg" className="bg-background border-t border-border/60">
        <div id="project-reports">
          <div className="text-center mb-10">
            <h2 className="fluid-h2 font-bold text-foreground">Project Reports</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectReports.map((r) => (
              <Card key={r.title} className="group">
                <CardHeader className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center rounded-lg ${getAccentColor(r.color)} text-white p-2`}>
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-lg font-semibold text-foreground">{r.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.program}
                        {r.year && <span> • {r.year}</span>}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-6">
                  <DownloadGate downloadUrl={r.href} resourceLabel={r.title}>
                    {(openForm) => (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={openForm}
                        data-testid="resource-download-btn"
                        aria-label={`Download ${r.title} (PDF)`}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </DownloadGate>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-background">
        <AnimatedBackground variant="subtle" className="opacity-70" />
        <div className="relative z-10">
          <div className="text-center subsection-break">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-card/60 border border-border/60 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-foreground/80 font-medium">Quality Assurance</span>
            </div>
            <h2 className="fluid-h2 font-bold text-foreground dark:text-white mb-4">Resource Excellence</h2>
            <p className="fluid-p text-muted-foreground max-w-3xl mx-auto">
              Our commitment to providing reliable, accessible, and professionally maintained resources
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {qualityStats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center transform transition-all duration-700"
              >
                {/* Premium glass morphism card */}
                <div className="relative backdrop-blur-xl bg-card/70 rounded-2xl p-6 lg:p-8 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-card/80">
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <div className="text-4xl lg:text-6xl font-bold mb-2 transition-all duration-300 text-foreground dark:text-white drop-shadow-lg">
                        {stat.number}
                      </div>
                      
                      {/* Animated accent line */}
                      <div className="w-12 h-1 mx-auto rounded-full overflow-hidden bg-muted">
                        <div 
                          className={`h-full transition-all duration-2000 ease-out rounded-full ${getAccentColor(stat.color)}`}
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-lg font-semibold text-foreground dark:text-white mb-2 drop-shadow-sm">
                      {stat.label}
                    </div>
                    
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </div>
                  </div>

                  {/* Subtle top accent */}
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full ${getAccentColor(stat.color)} opacity-60`}></div>
                  
                  {/* Corner glow effect */}
                  <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getAccentColor(stat.color)} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section padding="lg" className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sun rounded-full mb-6 shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h2 className="fluid-h2 font-bold text-foreground dark:text-white mb-4">Emergency Contacts</h2>
            <p className="fluid-p text-muted-foreground max-w-3xl mx-auto">
              Important phone numbers for crisis situations and immediate support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-lg p-6 shadow-lg border border-white/40 dark:border-white/15">
                <h3 className="font-bold text-foreground dark:text-white mb-2">{contact.service}</h3>
                <div className="text-2xl font-bold text-sun mb-2">
                  <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="hover:underline">
                    {contact.number}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{contact.available}</p>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="group relative backdrop-blur-md bg-white/70 dark:bg-white/10 rounded-lg p-6 shadow-lg max-w-2xl mx-auto border border-white/40 dark:border-white/15">
              <h3 className="text-xl font-bold text-foreground dark:text-white mb-4">Need an Interpreter?</h3>
              <p className="text-muted-foreground mb-4">
                Call the Translating & Interpreting Service (TIS) on <strong>131 450</strong> for immediate language support during emergencies.
              </p>
              <p className="text-sm text-muted-foreground">
                Available 24/7 in over 160 languages
              </p>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
      </Section>

      <Section center>
        <div className="text-center">
          <div className="backdrop-blur-md bg-card rounded-2xl p-12 border border-border">
            <h2 className="fluid-h2 font-bold mb-6 text-foreground">Need Additional Resources?</h2>
            <p className="fluid-p text-muted-foreground mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Our multilingual staff can help you access the information and support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="default">
                <a href="tel:1800813205" aria-label="Call Mosaic Multicultural Connections">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 1800 813 205
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:info@mosaicmc.org.au" aria-label="Email Mosaic for resources">
                  Email for Resources
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Services appears right after CTA, above footer */}
      <RelatedServices />

      
    </div>
  );
};

export default ResourcesPage;
