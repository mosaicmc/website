import { getMetadata } from "@/app/page-metadata";
import { PageTransition } from "@/components/ui/PageTransition";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import {
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FilePenLine,
  ShieldCheck,
  User,
} from "lucide-react";

export const metadata = {
  ...getMetadata("/shared/capacity-building-series-june-2026"),
  title: { absolute: "Capacity Building Series — Building Stronger Associations" },
  alternates: { canonical: "https://www.mosaicmc.org.au/shared/capacity-building-series-june-2026" },
  robots: { index: false, follow: false },
};

const steps = [
  {
    step: "Step 1",
    month: "July",
    title: "Governance Foundations Workshop",
    icon: Building2,
    intro:
      "Funders want to know your association is well run before they invest in your work. Good governance gives them that confidence.",
    bullets: [
      "Having a clear purpose and a written constitution, so everyone knows what your association stands for and how decisions are made",
      "Transparency and accountability, including keeping meeting records, managing finances responsibly, and being open with your members",
      "Diverse leadership, making sure women, young people, and different voices from across your community have a place at the table",
      "Your responsibilities under NSW Fair Trading and Australian law",
    ],
    note: "A well-governed association builds trust with funders and the broader community.",
  },
  {
    step: "Step 2",
    month: "August",
    title: "Grant Writing Workshop · Leaders Forum Dinner",
    icon: FilePenLine,
    intro:
      "With governance foundations in place, the next step is knowing how to apply for funding.",
    bullets: [
      "Welcome a sector expert to work through the grant writing process with us",
      "Learn how to find the right opportunities for your association",
      "Understand what makes a strong and competitive application",
    ],
    note: "Save the date: Monday 3rd August 2026. More details to follow.",
  },
  {
    step: "Step 3",
    month: "September",
    title: "Partner Due Diligence Workshop",
    icon: ShieldCheck,
    intro:
      "When your association works with another organisation to deliver a program, apply for funding, or share resources, funders want to know you have done your homework.",
    bullets: [
      "Protect your association by reducing risks like financial mismanagement and reputational damage",
      "Strengthen funding applications with sound partnerships and clear written agreements",
      "Build credibility with funders and partners by showing your association is trustworthy and well managed",
    ],
    note: "We will keep it simple. Clear steps, plain language, no legal jargon.",
  },
] as const;

export default function Page() {
  const headingClassName =
    "mt-0 bg-gradient-to-r from-ocean to-sky-text bg-clip-text text-transparent dark:from-sky dark:to-ocean";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Section variant="default" overlay fade="top" padding="lg" className="border-b border-divider overflow-hidden">
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/25 rounded-full blur-3xl dark:bg-blue-500/15 motion-safe:animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/25 rounded-full blur-3xl dark:bg-purple-500/15 motion-safe:animate-blob-delayed" />
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-badge bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/50 px-6 py-2 text-sm shadow-lg mb-6 backdrop-blur-sm inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ocean dark:bg-sky animate-pulse"></span>
              <span className="text-slate-900 dark:text-white font-medium">Capacity Building Series</span>
            </div>

            <h1 className="fluid-h1 text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:!text-white">
              Building Stronger Associations
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-800 dark:!text-slate-100 leading-relaxed">
              Three practical steps to help your association get ready for funding, partnerships, and growth.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                June 2026
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                The Mosaic Team — Mosaic Multicultural Connections
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {steps.map((item) => (
                <span
                  key={item.step}
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ocean/10 text-xs font-bold text-ocean dark:bg-sky/15 dark:text-sky">
                    {item.step.replace("Step ", "")}
                  </span>
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section padding="lg" variant="default">
          <div className="max-w-5xl mx-auto grid gap-6">
            <GlassCard className="rounded-[32px] border-white/50 bg-white/80 dark:border-slate-700/60 dark:bg-slate-900/60" padding="lg">
              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={headingClassName}>Ready your association for funding, partnerships, and growth</h2>
                  <p>
                    The Mosaic team has been working on a three-step series to help you and your associations get
                    ready. Ready to apply for funding. Ready to partner with others. Ready to grow.
                  </p>
                  <p>
                    This series builds on what we heard from you at the May forum. Each step is practical and designed
                    for where your association is right now.
                  </p>
                </div>
                <div className="rounded-3xl border border-ocean/10 bg-gradient-to-br from-ocean/5 via-white to-sky/10 p-6 dark:border-sky/20 dark:from-sky/10 dark:via-slate-900 dark:to-ocean/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ocean dark:text-sky">Series at a glance</p>
                  <div className="mt-4 space-y-3">
                    {steps.map((item) => (
                      <div key={item.step} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm dark:bg-slate-950/50">
                        <span className="inline-flex min-w-[88px] whitespace-nowrap items-center justify-center rounded-full bg-ocean/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-ocean dark:bg-sky/15 dark:text-sky">
                          {item.step}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.month}</p>
                          <p className="text-sm text-muted-foreground">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="relative grid gap-6 ps-0 md:ps-16">
              <div className="pointer-events-none absolute left-6 top-6 bottom-6 hidden w-px bg-gradient-to-b from-ocean/20 via-sky-text/50 to-ocean/20 md:block" />
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <GlassCard
                    key={item.step}
                    className="rounded-[32px] border-slate-700/60 bg-[linear-gradient(135deg,rgba(16,23,42,0.96),rgba(39,39,42,0.92))] text-white shadow-[0_28px_80px_rgba(15,23,42,0.28)]"
                    padding="lg"
                  >
                    <div className="relative overflow-hidden rounded-[24px]">
                      <div className="pointer-events-none absolute -left-[60px] top-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950 text-sm font-bold text-white shadow-[0_10px_30px_rgba(15,23,42,0.35)] md:inline-flex">
                        {item.step.replace("Step ", "")}
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,199,204,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_26%)]" />
                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-[#D8F0E6] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6A5B]">
                            {item.step} · {item.month}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                            <Icon className="h-3.5 w-3.5" />
                            Workshop
                          </span>
                        </div>

                        <h2 className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl">{item.title}</h2>
                        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/85">{item.intro}</p>
                        <p className="mt-3 text-base leading-relaxed text-white/75">At this workshop we will cover:</p>

                        <div className="mt-6 grid gap-3">
                          {item.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/88 backdrop-blur-sm"
                            >
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#A7E7D4]" />
                              <p className="m-0 text-base leading-relaxed">{bullet}</p>
                            </div>
                          ))}
                        </div>

                        <p className="mt-6 pl-8 md:pl-9 text-lg italic text-white/80">{item.note}</p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            <GlassCard
              className="rounded-[32px] border-ocean/10 bg-gradient-to-br from-ocean/[0.08] via-white to-sky/[0.10] dark:border-sky/20 dark:from-sky/10 dark:via-slate-900 dark:to-ocean/10"
              padding="lg"
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={headingClassName}>Happening in June</h2>
                  <h3 className="text-foreground dark:text-white">HMC Community Led Project Design and Grant Writing Workshops</h3>
                  <p>
                    HMC is running grant writing workshops in June with three time slots available, including one
                    online session. You are welcome to join whichever suits you. It is a good chance to get a head
                    start before our August session.
                  </p>
                  <p>
                    More details on each workshop will be shared closer to the date. Please reach out to the Mosaic
                    team with any questions.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg dark:border-slate-700/50 dark:bg-slate-950/60">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ocean dark:text-sky">
                    Register
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Choose the June session that suits your schedule and get started before the August Leaders Forum
                    Dinner workshop.
                  </p>
                  <a
                    href="https://www.facebook.com/share/1AnrYyKL8M/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-ocean to-sky-text px-6 py-3 font-semibold text-white no-underline transition-all duration-300 hover:scale-[1.02] hover:from-ocean/90 hover:to-sky-text/90 hover:shadow-lg hover:shadow-sky/20"
                  >
                    Find out more and register
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <div className="mt-5 rounded-2xl border border-ocean/10 bg-ocean/[0.05] px-5 py-5 dark:border-sky/15 dark:bg-sky/[0.08]">
                    <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
                      We are walking this journey alongside you. Every step of this series has been designed with your
                      communities in mind. Practical, accessible, and built for where you are right now.
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                      As Helena shared with you: your net-worth is your net-work. We are here to help you build both.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
