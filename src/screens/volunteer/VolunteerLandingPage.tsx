"use client";

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { PageTransition } from "@/components/ui/PageTransition";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FAQSection } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  ExternalLink,
  FileText,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Megaphone,
  Phone,
  Users,
} from "lucide-react";

type ProgramCard = {
  title: string;
  description: string;
  features: string[];
  icon: JSX.Element;
  color: "sky" | "earth" | "leaf" | "sun";
};

const VolunteerLandingPage = () => {
  const { t } = useTranslation();

  const spotlights: Array<{
    name: string;
    role: string;
    quote: string;
    years?: string;
    source: string;
  }> = useMemo(
    () => [
      {
        name: t("getInvolved.spotlights.0.name"),
        role: t("getInvolved.spotlights.0.role"),
        quote: t("getInvolved.spotlights.0.quote"),
        years: t("getInvolved.spotlights.0.years"),
        source: "https://www.instagram.com/p/DKDrctCRjg6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
      {
        name: t("getInvolved.spotlights.1.name"),
        role: t("getInvolved.spotlights.1.role"),
        quote: t("getInvolved.spotlights.1.quote"),
        years: t("getInvolved.spotlights.1.years"),
        source: "https://www.instagram.com/p/DKBGFPPuQui/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
      {
        name: t("getInvolved.spotlights.2.name"),
        role: t("getInvolved.spotlights.2.role"),
        quote: t("getInvolved.spotlights.2.quote"),
        years: t("getInvolved.spotlights.2.years"),
        source: "https://www.instagram.com/p/DJ-hZqSvuRb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
      {
        name: t("getInvolved.spotlights.3.name"),
        role: t("getInvolved.spotlights.3.role"),
        quote: t("getInvolved.spotlights.3.quote"),
        years: t("getInvolved.spotlights.3.years"),
        source: "https://www.instagram.com/p/DJ78YFesQrH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
      {
        name: t("getInvolved.spotlights.4.name"),
        role: t("getInvolved.spotlights.4.role"),
        quote: t("getInvolved.spotlights.4.quote"),
        years: t("getInvolved.spotlights.4.years"),
        source: "https://www.instagram.com/p/DJ5YKCbhTVn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
    ],
    [t]
  );

  const spotlightCards = useMemo(() => {
    const getShortcode = (url: string): string | null => {
      const match = url.match(/\/p\/([^/?]+)/);
      return match ? match[1] : null;
    };
    return spotlights.slice(0, 5).map((s) => ({
      ...s,
      shortcode: getShortcode(s.source),
    }));
  }, [spotlights]);

  const quickFacts = useMemo(
    () => [
      t("volunteerPage.quickFacts.fact1"),
      t("volunteerPage.quickFacts.fact2"),
      t("volunteerPage.quickFacts.fact3"),
      t("volunteerPage.quickFacts.fact4"),
    ],
    [t]
  );

  const programs: ProgramCard[] = useMemo(
    () => [
      {
        title: t("volunteerPage.programs.settlement.title"),
        description: t("volunteerPage.programs.settlement.description"),
        features: t("volunteerPage.programs.settlement.features", { returnObjects: true }) as unknown as string[],
        icon: <HeartHandshake className="h-6 w-6" />,
        color: "sky",
      },
      {
        title: t("volunteerPage.programs.youth.title"),
        description: t("volunteerPage.programs.youth.description"),
        features: t("volunteerPage.programs.youth.features", { returnObjects: true }) as unknown as string[],
        icon: <BookOpen className="h-6 w-6" />,
        color: "sky",
      },
      {
        title: t("volunteerPage.programs.agedCare.title"),
        description: t("volunteerPage.programs.agedCare.description"),
        features: t("volunteerPage.programs.agedCare.features", { returnObjects: true }) as unknown as string[],
        icon: <HeartPulse className="h-6 w-6" />,
        color: "sky",
      },
      {
        title: t("volunteerPage.programs.community.title"),
        description: t("volunteerPage.programs.community.description"),
        features: t("volunteerPage.programs.community.features", { returnObjects: true }) as unknown as string[],
        icon: <Megaphone className="h-6 w-6" />,
        color: "sky",
      },
      {
        title: t("volunteerPage.programs.employment.title"),
        description: t("volunteerPage.programs.employment.description"),
        features: t("volunteerPage.programs.employment.features", { returnObjects: true }) as unknown as string[],
        icon: <Briefcase className="h-6 w-6" />,
        color: "sky",
      },
    ],
    [t]
  );

  const locations = useMemo(
    () => [
      { name: t("getInvolved.locations.newcastle"), href: "/volunteer/newcastle", blurb: t("volunteerPage.locations.newcastle") },
      { name: t("getInvolved.locations.centralCoast"), href: "/volunteer/central-coast", blurb: t("volunteerPage.locations.centralCoast") },
      { name: t("getInvolved.locations.armidale"), href: "/volunteer/armidale", blurb: t("volunteerPage.locations.armidale") },
      { name: t("getInvolved.locations.tamworth"), href: "/volunteer/tamworth", blurb: t("volunteerPage.locations.tamworth") },
    ],
    [t]
  );

  const howItWorksSteps = useMemo(
    () =>
      t("volunteerPage.howItWorks.steps", { returnObjects: true }) as unknown as {
        title: string;
        description: string;
        bullets: string[];
      }[],
    [t]
  );

  const faqData = useMemo(
    () =>
      ([0, 1, 2, 3, 4, 5] as const).map((i) => ({
        question: t(`volunteerPage.faqs.${i}.q`),
        answer: t(`volunteerPage.faqs.${i}.a`),
        schemaAnswer: t(`volunteerPage.faqs.${i}.a`),
      })),
    [t]
  );

  return (
    <PageTransition>
      <div className="motion-safe:animate-fade-in">
        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <AnimatedBackground />
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="service-badge mb-6 motion-safe:animate-fade-in-down">
                <span className="me-2 h-2 w-2 rounded-full bg-sky"></span>
                <span className="font-medium">{t("volunteerPage.badge")}</span>
              </div>
              <h1 className="fluid-h1 text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 motion-safe:animate-fade-in-up">
                {t("volunteerPage.title")}
              </h1>
              <p
                className="fluid-p text-gray-600 dark:text-white/70 text-xl max-w-3xl mx-auto leading-relaxed motion-safe:animate-fade-in-up break-words"
                style={{ animationDelay: "200ms" }}
              >
                {t("volunteerPage.description")
                  .split("\n\n")
                  .filter((x) => x.trim().length > 0)
                  .map((p, i) => (
                    <span key={i}>
                      {p}
                      {i < 1 ? <><br /><br /></> : null}
                    </span>
                  ))}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center motion-safe:animate-fade-in-up" style={{ animationDelay: "350ms" }}>
                <a
                  href="https://forms.mosaicmc.org.au/volunteer-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-ocean to-sky-text hover:from-ocean/90 hover:to-sky-text/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                  aria-label={`${t("getInvolved.applyToVolunteer")} (opens in new tab)`}
                >
                  {t("getInvolved.applyToVolunteer")}
                  <ExternalLink className="h-5 w-5 ms-2" aria-hidden="true" />
                </a>
                <a
                  href="#volunteer-locations"
                  className="border-2 border-sky text-ocean dark:text-white hover:bg-sky hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
                >
                  {t("volunteerPage.browseLocations")}
                  <ArrowRight className="h-5 w-5 ms-2" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {quickFacts.map((fact) => (
                  <div
                    key={fact}
                    className="rounded-2xl border border-white/50 dark:border-white/15 bg-white/70 dark:bg-white/10 backdrop-blur-xl px-4 py-3 text-sm text-gray-800 dark:text-white shadow-sm"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sky-text flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{fact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="service-badge mb-6 motion-safe:animate-fade-in-down">
                <span className="me-2 h-2 w-2 rounded-full bg-sky"></span>
                <span className="font-medium">{t("volunteerPage.sections.programs.badge")}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4 motion-safe:animate-fade-in-up">
                {t("volunteerPage.sections.programs.title")}
              </h2>
              <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed motion-safe:animate-fade-in-up break-words" style={{ animationDelay: "200ms" }}>
                {t("volunteerPage.sections.programs.description")}
              </p>
            </div>

            <div className="max-w-7xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,360px))] lg:justify-center auto-rows-fr justify-items-center">
              {programs.map((program, index) => {
                const bgClass = program.color === "sky" ? "bg-sky" : program.color === "earth" ? "bg-earth" : program.color === "leaf" ? "bg-leaf" : "bg-sun";
                const hoverGlowClass = program.color === "sky"
                  ? "hover:shadow-[0_20px_45px_rgba(96,199,204,0.25)]"
                  : program.color === "earth"
                    ? "hover:shadow-[0_20px_45px_rgba(243,122,96,0.25)]"
                    : program.color === "leaf"
                      ? "hover:shadow-[0_20px_45px_rgba(180,215,133,0.28)]"
                      : "hover:shadow-[0_20px_45px_rgba(252,183,61,0.28)]";

                return (
                  <div
                    key={`${program.title}-${index}`}
                    className={`group relative flex h-full w-full max-w-[360px] min-w-0 flex-row items-start gap-4 backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-5 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15 ${hoverGlowClass}`}
                  >
                    <GlowingEffect
                      spread={30}
                      glow={true}
                      disabled={false}
                      proximity={100}
                      inactiveZone={0.05}
                      movementDuration={1.5}
                      borderWidth={2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>

                    <div className="relative z-10 flex w-full items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out ${bgClass}`}>
                          <div className="text-white">{program.icon}</div>
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{program.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-white/80 mt-1">{program.description}</p>
                        <ul className="mt-3 space-y-2">
                          {program.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-gray-600 dark:text-white/70">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky/70 flex-shrink-0"></span>
                              <span className="leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <Button asChild variant="outline" className="border-0 bg-transparent p-0 h-auto text-sm font-semibold text-sky-text hover:text-sky/80">
                            <a href="#volunteer-locations">
                              {t("volunteerPage.sections.programs.cta")}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="stack-vertical">
              <div className="motion-safe:animate-fade-in-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {t("getInvolved.isVolunteeringRight")}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-base text-gray-700 dark:text-gray-100 leading-relaxed">
                      {t("volunteerPage.rightForYou.intro")}
                    </p>
                    {(t("volunteerPage.rightForYou.bullets", { returnObjects: true }) as unknown as string[]).map((item) => (
                      <div key={item} className="flex items-start space-x-3 group">
                        <CheckCircle className="h-5 w-5 text-sky-text mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-gray-700 dark:text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-xl md:h-full">
                    <img
                      src={assetPath("/images/Volunteer/Volunteer.webp")}
                      alt="Volunteering with Mosaic"
                      width={1080}
                      height={608}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <a
                    href="https://forms.mosaicmc.org.au/volunteer-application"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("getInvolved.applyToVolunteer")} (opens in new tab)`}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ocean to-sky-text hover:from-ocean/90 hover:to-sky-text/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                  >
                    {t("getInvolved.applyToVolunteer")}
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
          <div id="volunteer-locations" className="scroll-mt-28" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="service-badge mb-6">
                <span className="me-2 h-2 w-2 rounded-full bg-sky"></span>
                <span className="font-medium">{t("volunteerPage.sections.locations.badge")}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t("volunteerPage.locationsTitle")}</h2>
              <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed break-words">
                {t("volunteerPage.locationsSubtitle")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-stretch">
              {locations.map((loc) => (
                <div
                  key={loc.href}
                  className="group relative h-full w-full backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-5 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15 hover:shadow-[0_20px_45px_rgba(96,199,204,0.25)]"
                >
                  <GlowingEffect spread={28} glow={true} disabled={false} proximity={90} inactiveZone={0.05} movementDuration={1.5} borderWidth={2} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{loc.name}</h3>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-white/70">
                        <MapPin className="h-3.5 w-3.5" />
                        NSW
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-white/80 leading-relaxed">{loc.blurb}</p>
                    <div className="mt-4">
                      <Button asChild size="sm" className="w-full bg-ocean text-white hover:bg-ocean/90">
                        <Link to={loc.href}>
                          {t("volunteerPage.viewRoles")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://forms.mosaicmc.org.au/volunteer-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-ocean to-sky-text hover:from-ocean/90 hover:to-sky-text/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                aria-label={`${t("getInvolved.applyToVolunteer")} (opens in new tab)`}
              >
                {t("getInvolved.applyToVolunteer")}
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
          <div className="doc-container">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-text font-semibold mb-3">{t("volunteerPage.howItWorks.badge")}</p>
              <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t("volunteerPage.howItWorks.title")}</h2>
              <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto break-words">{t("volunteerPage.howItWorks.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {howItWorksSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="h-full rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center p-3 bg-sky/10 rounded-2xl">
                      {idx === 0 ? (
                        <FileText className="h-6 w-6 text-sky-text" aria-hidden="true" />
                      ) : idx === 1 ? (
                        <Phone className="h-6 w-6 text-sky-text" aria-hidden="true" />
                      ) : idx === 2 ? (
                        <CheckCircle className="h-6 w-6 text-sky-text" aria-hidden="true" />
                      ) : (
                        <Users className="h-6 w-6 text-sky-text" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">{`${idx + 1}. ${step.title}`}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-white/80 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                        <span className="text-sky-text mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/40 dark:border-white/15 bg-white/60 dark:bg-white/10 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20 pointer-events-none"></div>
              <div className="relative z-10 p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="service-badge mb-6">
                    <span className="me-2 h-2 w-2 rounded-full bg-sky"></span>
                    <span className="font-medium">{t("getInvolved.spotlight.badge")}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {t("getInvolved.spotlight.title")}
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {spotlightCards.map((s) => {
                    const src = s.shortcode ? assetPath(`/spotlights/${s.shortcode}.webp`) : "";
                    return (
                      <div
                        key={s.source}
                        className="group relative h-full w-full backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.14)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          {src ? (
                            <img
                              src={src}
                              alt={t("getInvolved.spotlight.imageAlt", { name: s.name })}
                              width={96}
                              height={96}
                              loading="lazy"
                              decoding="async"
                              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-white/60 dark:border-white/20 shadow-sm bg-white/50 dark:bg-white/5"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}
                          <div className="min-w-0">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">
                              {s.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-white/70">{s.role}</p>
                            {s.years ? (
                              <p className="text-xs text-gray-600 dark:text-white/60 mt-1">{s.years}</p>
                            ) : null}
                          </div>
                        </div>
                        <blockquote className="text-gray-700 dark:text-white/80 leading-relaxed italic">
                          “{s.quote}”
                        </blockquote>
                        <div className="mt-4 text-sm">
                          <a
                            href={s.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${t("getInvolved.spotlight.sourceLabel")} (opens in new tab)`}
                            className="inline-flex items-center text-sky-text hover:underline font-medium"
                          >
                            {t("getInvolved.spotlight.sourceLabel")}
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection
          title={t("volunteerPage.faqTitle")}
          badge={t("volunteerPage.faqBadge")}
          subtitle={t("volunteerPage.faqSubtitle")}
          items={faqData}
          accentColor="sky"
        />
      </div>
    </PageTransition>
  );
};

export default VolunteerLandingPage;
