import type { ComponentType } from "react";
import { AU } from '@/lib/auSpelling';
import { Helmet } from "react-helmet-async";
import BackLink from "../../components/ui/BackLink";
import RelatedServices from '@/components/RelatedServices';

export default function HelpfulLinksPage() {
  const links: Array<{
    title: string;
    desc: string;
    href: string;
    icon?: ComponentType<{ className?: string }>;
  }> = [
    { title: "Legal Aid NSW", desc: AU("Free legal help and advice across NSW"), href: "https://www.legalaid.nsw.gov.au/" },
    { title: "Translating & Interpreting Service (TIS National)", desc: AU("131 450 — 24/7 interpreter support"), href: "https://www.tisnational.gov.au/" },
    { title: "NSW Government Emergencies", desc: AU("Official guidance and contacts"), href: "https://www.nsw.gov.au/emergencies" },
    { title: "Hazards Near Me NSW", desc: AU("Local emergency information app"), href: "https://www.nsw.gov.au/emergencies/near-me" },
    { title: "Bureau of Meteorology", desc: AU("Weather updates and flood warnings"), href: "https://www.bom.gov.au/" },
    { title: "Live Traffic NSW", desc: AU("Traffic updates and road closures"), href: "https://www.livetraffic.com/" },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Helpful Links | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Curated external resources including Legal Aid NSW, interpreter support, official emergency and traffic information."
        />
      </Helmet>

      <section className="doc-container section-spacing">
        <div className="subsection-break">
          <h1>Helpful Links</h1>
          <p className="lead max-w-2xl">
            Trusted resources to support you during emergencies, with language assistance and official information.
          </p>
        </div>

        <ul className="list-disc list-inside space-y-2 text-sm">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
              <span className="ml-2 text-muted-foreground">— {link.desc}</span>
            </li>
          ))}
        </ul>

        <div className="section-break">
          <BackLink to="/resources">Back to Resources</BackLink>
        </div>
      </section>

      <RelatedServices />
    </div>
  );
}
