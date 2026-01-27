import { Helmet } from "react-helmet-async";
import RelatedServices from '@/components/RelatedServices';
import { Globe, Phone, Info, ExternalLink } from "lucide-react";
import Section from '@/components/ui/Section';

export default function TranslationServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Translation Services | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Translation and interpreting services for multicultural communities. Access TIS National (131 450) and language support resources." 
        />
      </Helmet>

      <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
          <div className="text-center mb-10">
            <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">Translation Services</h1>
            <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
              If you need language support, these services can help you talk to
              government agencies, emergency services, and community organisations.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 text-primary p-3">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="fluid-h2 font-semibold">TIS National (Translating & Interpreting Service)</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    24/7 phone interpreting service accessible from anywhere in Australia.
                    Ask for an interpreter in your language.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <a href="tel:131450" className="inline-flex items-center gap-2 text-primary hover:underline">
                      <Phone className="h-4 w-4" /> Call 131 450
                    </a>
                    <a
                      href="https://www.tisnational.gov.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="More about TIS National (opens in new tab)"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      More about TIS National
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 text-primary p-3">
                  <Info className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="fluid-h2 font-semibold">Using interpreters with services</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Many services can arrange an interpreter when you call. If you
                    need help speaking to police, a hospital, or a government agency,
                    ask them to connect to an interpreter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            In an emergency, call <a className="text-primary hover:underline" href="tel:000">000</a> first, then ask for
            an interpreter.
          </div>
      </Section>
      <RelatedServices />
    </div>
  );
}
