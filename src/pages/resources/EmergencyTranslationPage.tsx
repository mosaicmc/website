import { Helmet } from "react-helmet-async";
import RelatedServices from '@/components/RelatedServices';
import { Phone, AlertTriangle, Flame, CloudLightning, Satellite, Radio, Zap, MapPin } from "lucide-react";
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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

  

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Emergency & Translation Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Quick access to emergency contacts and language support. Includes TIS National 131 450 and NSW emergency services links."
        />
      </Helmet>

      <Section overlay padding="lg" center containerClassName="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 md:space-y-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-gradient">Emergency & Translation Services</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">This page provides essential emergency contacts and language support information.</p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">Quick actions</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <Button asChild variant="destructive" className="h-11 w-full">
                    <a href="tel:000" aria-label="Call 000 for Police, Fire, Ambulance">
                      <span className="text-left">
                        <span className="block font-semibold">Call 000</span>
                        <span className="block text-xs text-primary-foreground/80">Police • Fire • Ambulance</span>
                      </span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-3">
                    <Button asChild variant="secondary" className="h-11 w-full">
                      <a href="tel:131450" aria-label="Call TIS National 131 450 for interpreters">
                        <span className="text-left">
                          <span className="block font-semibold">TIS 131 450</span>
                          <span className="block text-xs text-secondary-foreground/80">Interpreter support</span>
                        </span>
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 w-full">
                      <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" aria-label="Open NSW Government emergency information">
                        <span className="text-left">
                          <span className="block font-semibold">NSW Emergency Info</span>
                          <span className="block text-xs text-muted-foreground">Official guidance</span>
                        </span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          

          <div>
            <h2 className="font-semibold mb-3 text-foreground tracking-tight">Emergency contacts</h2>
            {[
              { heading: "Life-threatening emergencies", keys: ["Life threatening emergencies"] },
              { heading: "Weather & natural disasters", keys: ["Major bushfire incident updates", "Floods, storms and tsunamis", "Weather updates and flood warnings"] },
              { heading: "Utilities & transport", keys: ["Power outages / fallen powerlines", "Live traffic and road closures"] },
              { heading: "Local alerts & media", keys: ["Local emergency information", "Live radio updates"] },
            ].map((group) => (
              <Card key={group.heading} className="mb-6">
                <CardHeader>
                  <h3 className="text-sm md:text-base font-medium text-muted-foreground">{group.heading}</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emergencyItems.filter((i) => group.keys.includes(i.title)).map((item) => {
                      const isSesGeneral = item.title.startsWith('NSW SES');
                      const displayTitle = isSesGeneral ? 'NSW SES' : item.desc;
                      const displaySubtitle = isSesGeneral ? item.desc : item.title;
                      return (
                        <div key={item.title} className="grid grid-cols-[1fr,auto] items-center gap-4 py-3">
                          <div>
                            <div className="font-medium text-foreground leading-snug">{displayTitle}</div>
                            <div className="text-sm text-muted-foreground">{displaySubtitle}</div>
                          </div>
                          <div className="flex-shrink-0">
                            {item.action ? (
                              <Button asChild variant="outline" className="h-11">
                                <a href={item.action.href} aria-label={`Call ${displayTitle} on ${item.action.label}`}>
                                  {`Call ${item.action.label}`}
                                </a>
                              </Button>
                            ) : item.link ? (
                              <Button asChild variant="outline" className="h-11">
                                <a href={item.link.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${displayTitle}`}>
                                  {item.link.label}
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-foreground tracking-tight">Language support and interpreters</h2>
            <Card className="mx-auto max-w-3xl mt-3">
              <CardHeader>
                <p className="text-sm text-muted-foreground leading-relaxed">If you need language support, call the Translating & Interpreting Service on <a className="mc-link" href="tel:131450">131 450</a>. Ask for an interpreter and the language you speak.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <Button asChild className="w-full md:w-auto h-11">
                      <a href="tel:131450" aria-label="Call Translating and Interpreting Service on 131 450">Call TIS 131 450</a>
                    </Button>
                  </div>
                  <div className="space-y-5">
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="font-medium text-foreground">When you call emergency services</h3>
                        <p className="text-sm text-muted-foreground">Tell the operator you need an interpreter. They can connect TIS for you.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="font-medium text-foreground">At hospitals and government services</h3>
                        <p className="text-sm text-muted-foreground">Staff can arrange an interpreter so you can understand what is happening.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr] items-start gap-3">
                      <div>
                        <h3 className="font-medium text-foreground">Before you call</h3>
                        <p className="text-sm text-muted-foreground">Have your name, location, and phone number ready if you can.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-lg border border-border bg-muted/40 dark:bg-muted/20 p-5">
                      <h3 className="font-medium text-foreground mb-2">What to say when you call</h3>
                      <p className="text-base text-foreground">“I need an interpreter for my language. Please connect me to TIS National.”</p>
                      <div className="mt-3 flex justify-center md:justify-end">
                        <Button
                          variant="ghost"
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
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-foreground tracking-tight">Helpful links</h2>
            <Card className="mt-3">
              <CardHeader>
                <h3 className="text-sm md:text-base font-medium text-muted-foreground">Useful resources</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr] items-start gap-4">
                    <div>
                      <div className="font-medium text-foreground">NSW Government — Emergencies</div>
                      <div className="text-sm text-muted-foreground">Official emergency information and guidance</div>
                      <div className="mt-1">
                        <a
                          href="https://www.nsw.gov.au/emergencies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mc-link inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          aria-label="Open NSW Government emergency information"
                        >
                          nsw.gov.au/emergencies
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr] items-start gap-4">
                    <div>
                      <div className="font-medium text-foreground">Hazards Near Me NSW</div>
                      <div className="text-sm text-muted-foreground">Local emergency alerts and updates</div>
                      <div className="mt-1">
                        <a
                          href="https://www.nsw.gov.au/emergencies/near-me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mc-link inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          aria-label="Open Hazards Near Me NSW"
                        >
                          nsw.gov.au/emergencies/near-me
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr] items-start gap-4">
                    <div>
                      <div className="font-medium text-foreground">Live Traffic NSW</div>
                      <div className="text-sm text-muted-foreground">Road closures and live traffic updates</div>
                      <div className="mt-1">
                        <a
                          href="https://www.livetraffic.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mc-link inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                          aria-label="Open Live Traffic NSW"
                        >
                          livetraffic.com
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <BackLink to="/resources">Back to Resources</BackLink>
          </div>
        </div>
      </Section>
      <RelatedServices />
    </div>
  );
}
