import { Helmet } from "react-helmet-async";
import Section from '@/components/ui/Section';
import RelatedServices from '@/components/RelatedServices';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AlertTriangle, Languages, Scale, CloudSun, Route, ExternalLink, HeartHandshake } from 'lucide-react';

export default function HelpfulLinksPage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Helpful Links | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Emergency help, interpreter support, legal information, and travel updates from trusted sources."
        />
      </Helmet>

      <Section padding="lg" overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
        <div className="subsection-break">
          <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight text-foreground">Helpful Links</h1>
          <p className="lead max-w-2xl">
            If you are facing an emergency or need trusted information quickly, the links below can help.
            These services are provided by NSW and Australian government agencies and trusted organisations.
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            If you are unsure where to start, begin with the emergency and language support options.
          </p>
        </div>
        <div className="space-y-12">
          <Card className="border-l-2 border-sun">
            <CardHeader className="p-5 md:p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-sun" />
                <h2 className="text-lg md:text-xl font-semibold">Emergency and Immediate Help</h2>
                <Badge variant="outline" className="ml-auto text-sun border-sun">Emergency</Badge>
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">Use these services if you need urgent information or support during an emergency.</div>
            </CardHeader>
            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-sun mt-0.5" />
                  <div>
                    <a href="https://www.nsw.gov.au/emergencies" target="_blank" rel="noopener noreferrer" aria-label="NSW Government Emergencies — official emergency updates and contacts" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      NSW Government Emergencies
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Official emergency updates, safety advice, and contact information for New South Wales.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-sun mt-0.5" />
                  <div>
                    <a href="https://www.nsw.gov.au/emergencies/near-me" target="_blank" rel="noopener noreferrer" aria-label="Hazards Near Me NSW — local alerts for fires, floods, and storms" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      Hazards Near Me NSW
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Local alerts and real-time information about fires, floods, storms, and other hazards near you.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-2 border-sky">
            <CardHeader className="p-5 md:p-6">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-sky" />
                <h2 className="text-lg md:text-xl font-semibold">Language and Interpreter Support</h2>
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">If English is not your first language, help is available.</div>
            </CardHeader>
            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Languages className="h-4 w-4 text-sky mt-0.5" />
                  <div>
                    <a href="https://www.tisnational.gov.au/" target="_blank" rel="noopener noreferrer" aria-label="Translating and Interpreting Service National — call 131 450 for interpreter support" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      Translating and Interpreting Service (TIS National)
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Call 131 450 for free interpreter support, available 24 hours a day.</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">You can ask for an interpreter in your language before explaining your situation.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-2 border-ocean">
            <CardHeader className="p-5 md:p-6">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-ocean" />
                <h2 className="text-lg md:text-xl font-semibold">Legal and Government Information</h2>
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">These services can help you understand your rights and options.</div>
            </CardHeader>
            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Scale className="h-4 w-4 text-ocean mt-0.5" />
                  <div>
                    <a href="https://www.legalaid.nsw.gov.au/" target="_blank" rel="noopener noreferrer" aria-label="Legal Aid NSW — free legal help, advice, and referrals" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      Legal Aid NSW
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Free legal help, advice, and referrals across New South Wales.</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">If you are not sure whether your issue is legal, they can help you work that out.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-2 border-leaf">
            <CardHeader className="p-5 md:p-6">
              <div className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-leaf" />
                <h2 className="text-lg md:text-xl font-semibold">Weather, Roads and Transport</h2>
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground">Use these services to stay informed about conditions that may affect your safety or travel.</div>
            </CardHeader>
            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CloudSun className="h-4 w-4 text-leaf mt-0.5" />
                  <div>
                    <a href="https://www.bom.gov.au/" target="_blank" rel="noopener noreferrer" aria-label="Bureau of Meteorology — forecasts, warnings, and flood updates" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      Bureau of Meteorology
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Weather forecasts, warnings, and flood updates for your area.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Route className="h-4 w-4 text-leaf mt-0.5" />
                  <div>
                    <a href="https://www.livetraffic.com/" target="_blank" rel="noopener noreferrer" aria-label="Live Traffic NSW — current road conditions, closures, and traffic updates" className="font-medium hover:underline text-foreground hover:text-ocean focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2 focus:ring-offset-background inline-flex items-center gap-1">
                      Live Traffic NSW
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                    <div className="text-sm text-muted-foreground">Current road conditions, closures, and traffic updates across NSW.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="section-break">
          <Card className="border-l-2 border-leaf">
            <CardHeader className="p-5 md:p-6">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-leaf" />
                <h2 className="text-lg md:text-xl font-semibold">Need help choosing the right service?</h2>
              </div>
              <div className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                If you are unsure which service is best for your situation, Mosaic can help. Our team can listen, explain your options, and support you to connect with the right help.
              </div>
            </CardHeader>
            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white">
                  <Link to="/contact-us" aria-label="Contact Mosaic for guidance">
                    Contact Mosaic
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
      </Section>

      <RelatedServices />
    </div>
  );
}
