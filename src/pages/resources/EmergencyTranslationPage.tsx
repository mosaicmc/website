import { Helmet } from "react-helmet-async";
import RelatedServices from '@/components/RelatedServices';
import { Phone, AlertTriangle, Flame, CloudLightning, Satellite, Radio, Zap, MapPin } from "lucide-react";
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';
import BackLink from "../../components/ui/BackLink";

export default function EmergencyTranslationPage() {
  const emergencyItems = [
    {
      title: "Life threatening emergencies",
      desc: "Police, Fire or Ambulance",
      action: { label: "Call 000", href: "tel:000" },
      icon: AlertTriangle,
    },
    {
      title: "Major bushfire incident updates",
      desc: "NSW Rural Fire Service",
      action: { label: "1800 679 737", href: "tel:1800679737" },
      icon: Flame,
    },
    {
      title: "Floods, storms and tsunamis",
      desc: "State Emergency Service (SES)",
      action: { label: "132 500", href: "tel:132500" },
      icon: CloudLightning,
    },
    {
      title: "NSW SES general enquiries",
      desc: "Non-emergency / general",
      action: { label: "138 737", href: "tel:138737" },
      icon: Phone,
    },
    {
      title: "Power outages / fallen powerlines",
      desc: "Ausgrid",
      action: { label: "13 13 88", href: "tel:131388" },
      icon: Zap,
    },
    {
      title: "Weather updates and flood warnings",
      desc: "Bureau of Meteorology",
      link: { label: "bom.gov.au", href: "https://www.bom.gov.au/" },
      icon: Satellite,
    },
    {
      title: "Live traffic and road closures",
      desc: "Live Traffic NSW",
      link: { label: "livetraffic.com", href: "https://www.livetraffic.com/" },
      icon: MapPin,
    },
    {
      title: "Local emergency information",
      desc: "Hazards Near Me NSW app",
      link: { label: "Download app", href: "https://www.nsw.gov.au/emergencies/near-me" },
      icon: AlertTriangle,
    },
    {
      title: "Live radio updates",
      desc: "1233 ABC Newcastle",
      link: { label: "Listen live", href: "https://www.abc.net.au/newcastle/" },
      icon: Radio,
    },
  ];

  const accentFor = (title: string) => {
    if (title.includes('Life threatening')) return 'bg-sun';
    if (title.includes('bushfire') || title.includes('Floods') || title.includes('storms') || title.includes('tsunamis')) return 'bg-leaf';
    if (title.includes('Power') || title.includes('Traffic')) return 'bg-earth';
    if (title.includes('Hazards') || title.includes('Weather')) return 'bg-sky';
    return 'bg-ocean';
  };

  

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Emergency & Translation Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Quick access to emergency contacts and language support. Includes TIS National 131 450 and NSW emergency services links."
        />
      </Helmet>

      <Section overlay padding="lg" center containerClassName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 md:space-y-12">
          <div>
            <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight text-brand-gradient">Emergency & Translation Services</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">This page provides essential emergency contacts and language support information.</p>
          </div>

          <Tabs defaultValue="quick" className="space-y-6">
            <TabsList className="mx-auto">
              <TabsTrigger value="quick">Quick Actions</TabsTrigger>
              <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
              <TabsTrigger value="language">Language Support</TabsTrigger>
              <TabsTrigger value="links">Helpful Links</TabsTrigger>
            </TabsList>
            <TabsContent value="quick">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 text-center">
                <Card className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6 lg:p-8 border-b border-border">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-sun text-white p-3">
                          <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Call 000</h3>
                          <p className="text-sm text-muted-foreground">Police • Fire • Ambulance</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 lg:p-8 flex-1" />
                    <CardHeader className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a href="tel:000" aria-label="Call 000 for Police, Fire, Ambulance">
                          Call now
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6 lg:p-8 border-b border-border">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-earth text-white p-3">
                          <Phone className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">TIS 131 450</h3>
                          <p className="text-sm text-muted-foreground">Interpreter support</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 lg:p-8 flex-1" />
                    <CardHeader className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                      <div className="grid grid-cols-1 gap-3">
                        <Button asChild variant="outline" className="h-11 w-full">
                          <a href="tel:131450" aria-label="Call TIS National 131 450 for interpreters">Call TIS 131 450</a>
                        </Button>
                        <Button asChild variant="outline" className="h-11 w-full">
                          <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" aria-label="Open NSW Government emergency information">
                            NSW Emergency Info
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contacts">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {emergencyItems.map((item) => {
                  const Icon = item.icon;
                  const isSesGeneral = item.title.startsWith('NSW SES');
                  const displayTitle = isSesGeneral ? 'NSW SES' : item.desc;
                  const displaySubtitle = isSesGeneral ? item.desc : item.title;
                  return (
                    <Card key={item.title} className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 h-full flex flex-col">
                        <CardHeader className="p-6 border-b border-border">
                          <div className="flex items-center gap-4">
                            <span className={`inline-flex items-center justify-center rounded-lg ${accentFor(item.title)} text-white p-3`}>
                              {Icon ? <Icon className="h-6 w-6" /> : null}
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{displayTitle}</h3>
                              <p className="text-sm text-muted-foreground">{displaySubtitle}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-1" />
                        <CardHeader className="p-6 pt-0">
                          {item.action ? (
                            <Button asChild variant="outline" className="h-11 w-full">
                              <a href={item.action.href} aria-label={`Call ${displayTitle} on ${item.action.label}`}>
                                {`Call ${item.action.label}`}
                              </a>
                            </Button>
                          ) : item.link ? (
                            <Button asChild variant="outline" className="h-11 w-full">
                              <a href={item.link.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${displayTitle}`}>
                                {item.link.label}
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </a>
                            </Button>
                          ) : null}
                        </CardHeader>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="language">
              <Card className="mt-3 h-full flex flex-col">
              <CardHeader className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">If you need language support, call the Translating & Interpreting Service on <a className="mc-link" href="tel:131450">131 450</a>. Ask for an interpreter and the language you speak.</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <Button asChild className="w-full md:w-auto h-11">
                      <a href="tel:131450" aria-label="Call Translating and Interpreting Service on 131 450">Call TIS 131 450</a>
                    </Button>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">When you call emergency services</h3>
                        <p className="text-sm text-muted-foreground">Tell the operator you need an interpreter. They can connect TIS for you.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">At hospitals and government services</h3>
                        <p className="text-sm text-muted-foreground">Staff can arrange an interpreter so you can understand what is happening.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Before you call</h3>
                        <p className="text-sm text-muted-foreground">Have your name, location, and phone number ready if you can.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-lg border border-border bg-sand/40 dark:bg-sand/25 p-5">
                      <h3 className="text-lg font-semibold text-foreground mb-2">What to say when you call</h3>
                      <p className="text-base text-foreground">“I need an interpreter for my language. Please connect me to TIS National.”</p>
                      <div className="mt-3 flex justify-center md:justify-end">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText('I need an interpreter for my language. Please connect me to TIS National.')}
                          aria-label="Copy interpreter request script"
                        >
                          Copy script
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button asChild variant="outline" className="w-full md:w-auto h-11">
                      <a href="https://www.tisnational.gov.au/" target="_blank" rel="noopener noreferrer" aria-label="Visit TIS National website">Visit TIS National</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="links">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                <Card className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6 border-b border-border">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                          <Satellite className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">NSW Government — Emergencies</h3>
                          <p className="text-sm text-muted-foreground">Official emergency information and guidance</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.nsw.gov.au/emergencies"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open NSW Government emergency information"
                        >
                          Open
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6 border-b border-border">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                          <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Hazards Near Me NSW</h3>
                          <p className="text-sm text-muted-foreground">Local emergency alerts and updates</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.nsw.gov.au/emergencies/near-me"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Hazards Near Me NSW"
                        >
                          Open
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
                <Card className="group relative h-full flex flex-col transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-white/80 dark:group-hover:bg-white/15">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <CardHeader className="p-6 border-b border-border">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center rounded-lg bg-ocean text-white p-3">
                          <MapPin className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Live Traffic NSW</h3>
                          <p className="text-sm text-muted-foreground">Road closures and live traffic updates</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1" />
                    <CardHeader className="p-6 pt-0">
                      <Button asChild variant="outline" className="h-11 w-full">
                        <a
                          href="https://www.livetraffic.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Live Traffic NSW"
                        >
                          Open
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardHeader>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>


          <div className="mt-10">
            <BackLink to="/resources">Back to Resources</BackLink>
          </div>
        </div>
      </Section>
      <RelatedServices />
    </div>
  );
}
