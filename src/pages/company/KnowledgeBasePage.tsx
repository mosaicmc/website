import type { ComponentType } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BackLink from "../../components/ui/BackLink";
import { ShieldCheck, BadgeCheck, Scale, Layers, ClipboardList, ChevronRight, Lock, MessageCircle } from "lucide-react";
import ErrorBoundary from "../../components/ErrorBoundary";
import Section from "../../components/ui/Section";

type KBItem = {
  title: string;
  href: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
};

export default function KnowledgeBasePage() {
  const items: KBItem[] = [
    {
      title: "Code of Conduct",
      href: "/policies/code-of-conduct",
      desc: "Values, expected behaviours, and reporting processes.",
      icon: BadgeCheck,
    },
    {
      title: "Work Health & Safety",
      href: "/policies/work-health-safety",
      desc: "Safety responsibilities, hazard reporting, and emergency procedures.",
      icon: ShieldCheck,
    },
    {
      title: "Diversity & Inclusion",
      href: "/policies/diversity-inclusion",
      desc: "Equity, inclusion and cultural safety principles.",
      icon: Layers,
    },
    {
      title: "Whistleblower",
      href: "/policies/whistleblower",
      desc: "Protected disclosure, investigations and confidentiality.",
      icon: Scale,
    },
    {
      title: "Quality Management",
      href: "/policies/quality-management",
      desc: "Continuous improvement and compliance practices.",
      icon: ClipboardList,
    },
    {
      title: "Privacy Policy",
      href: "/policies/privacy",
      desc: "How we collect, use, and protect your personal information.",
      icon: Lock,
    },
    {
      title: "Feedback & Complaints",
      href: "/policies/feedback-complaints",
      desc: "How to share your feedback or make a formal complaint.",
      icon: MessageCircle,
    },
    {
      title: "Child Safety Policy",
      href: "/policies/child-safety",
      desc: "Child protection, safeguarding practices, and reporting procedures.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Knowledge Base | Mosaic Multicultural Connections</title>
        <meta name="description" content="Browse Mosaic’s organisational policies and governance resources." />
      </Helmet>

      <ErrorBoundary>
        <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
          <div className="text-center subsection-break">
            <h1 id="kb-title" className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">Knowledge Base</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Organisational policies and governance resources for staff, volunteers, partners and stakeholders.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-earth text-white p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">View</span>
                    <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="section-break">
            <BackLink to="/about">Back to About</BackLink>
          </div>
        </Section>
      </ErrorBoundary>
    </div>
  );
}
