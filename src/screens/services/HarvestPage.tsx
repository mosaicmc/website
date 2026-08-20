"use client";

import React from 'react';
import {
  Sprout,
  Phone,
  ArrowRight,
  CheckCircle,
  UserPlus,
  ExternalLink,
  GraduationCap,
  Award,
  Languages,
  ShieldCheck,
  Tractor,
  HeartHandshake,
  Handshake,
  ClipboardList,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ManagementSection } from '@/components/ManagementSection';
import LazySection from '@/components/LazySection';
import RelatedServices from '../../components/RelatedServices';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '@/components/ui/PageTransition';
import { assetPath } from '@/lib/utils';

type Offering = { title: string; description: string };
type Step = { title: string; description: string; bullets: string[] };
type Target = { number: number; suffix: string; label: string };

const OFFERING_ICONS = [
  GraduationCap,
  Award,
  Languages,
  ShieldCheck,
  Tractor,
  HeartHandshake,
  Handshake,
];

const STEP_ICONS = [ClipboardList, GraduationCap, Handshake, Tractor, CheckCircle];

const HarvestPage = () => {
  const { t } = useTranslation();

  const offerings = t('harvest.offerings', { returnObjects: true }) as unknown as Offering[];
  const steps = t('harvest.how.steps', { returnObjects: true }) as unknown as Step[];
  const targets = t('harvest.targets.items', { returnObjects: true }) as unknown as Target[];
  const eligibilityItems = t('harvest.eligibility.items', { returnObjects: true }) as unknown as string[];

  const coordinator = {
    name: "Anthony Wright",
    role: "HARVEST Project Coordinator",
    location: "Armidale",
    qualifications: "Diploma in Agriculture, Certificate IV in Training and Assessment",
    experience: "Ant was the REAP project lead in Armidale from May 2023 to June 2025 and is now the coordinator for the HARVEST program, facilitating training and employment for 17 to 25 year old migrant jobseekers, drawing on a background in the rural industry and vocational training.",
    languages: ["English"],
    image: assetPath("/images/SETS Team 128px/SETSTeam_Anthony_320px.webp"),
  };

  return (
    <PageTransition>
      <div className="motion-safe:animate-fade-in">

        {/* Hero Section */}
        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-leaf/30 rounded-full blur-3xl dark:bg-leaf/20 motion-safe:animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sun/30 rounded-full blur-3xl dark:bg-sun/20 motion-safe:animate-blob-delayed"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="service-badge mb-6">
                <Sprout className="w-4 h-4 text-leaf-text" />
                <span>{t('harvest.hero.badge')}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight motion-safe:animate-fade-in-up">
                {t('harvest.hero.headline')}
              </h1>
              <p
                className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed mb-4 motion-safe:animate-fade-in-up break-words"
                style={{ animationDelay: '200ms' }}
              >
                {t('harvest.hero.subheadline')}
              </p>
              <p
                className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-8 motion-safe:animate-fade-in-up break-words"
                style={{ animationDelay: '280ms' }}
              >
                {t('harvest.hero.body')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center motion-safe:animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                <a
                  href="https://forms.mosaicmc.org.au/referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('harvest.hero.referralCta')} (opens in new tab)`}
                  className="bg-leaf hover:bg-leaf/90 text-ocean hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-leaf/25"
                >
                  <UserPlus className="h-5 w-5" />
                  {t('harvest.hero.referralCta')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:1800813205"
                  className="border-2 border-leaf text-ocean dark:text-white hover:bg-leaf hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-leaf focus:ring-offset-2"
                >
                  <Phone className="h-5 w-5 me-2" />
                  {t('harvest.hero.cta')}
                </a>
              </div>
              <div className="mt-6 motion-safe:animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                  {t('harvest.hero.footerNote')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('harvest.hero.fundingNote')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="service-badge mb-6 motion-safe:animate-fade-in-down">
                <span className="me-2 h-2 w-2 rounded-full bg-leaf"></span>
                <span className="font-medium">{t('harvest.programs.badge')}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl fluid-h2 font-bold text-gray-900 dark:text-white mb-4 motion-safe:animate-fade-in-up">{t('harvest.programs.title')}</h2>
              <p className="text-base sm:text-xl fluid-p text-gray-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed motion-safe:animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
                {t('harvest.programs.helper')}
              </p>
            </div>

            <div className="max-w-7xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(260px,360px))] lg:justify-center auto-rows-fr justify-items-center">
              {offerings.map((offering, index) => {
                const Icon = OFFERING_ICONS[index % OFFERING_ICONS.length];
                return (
                  <div
                    key={index}
                    className="group relative flex h-full w-full max-w-[360px] min-w-0 flex-row items-start gap-4 backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-5 border border-white/50 dark:border-white/20 shadow-[0_12px_30px_rgba(120,90,60,0.16)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:group-hover:bg-white/15 hover:shadow-[0_20px_45px_rgba(180,215,133,0.28)]"
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 ease-out bg-leaf">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                          {offering.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-white/80 mt-1">
                          {offering.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-b-full bg-gradient-to-r from-leaf/20 via-leaf/40 to-leaf/20"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-leaf opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="motion-safe:animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('harvest.eligibility.title')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {eligibilityItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <CheckCircle className="h-5 w-5 text-leaf-text mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-gray-700 dark:text-gray-100">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-leaf shadow-lg">
                      <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('harvest.hero.badge')}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed">
                    {t('harvest.eligibility.note')}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center md:text-left">
                <p className="mt-2 text-sm">
                  <a
                    href="https://forms.mosaicmc.org.au/referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t('harvest.eligibility.linkLabel')} (opens in new tab)`}
                    className="inline-flex items-center gap-1 text-leaf-text hover:underline font-medium"
                  >
                    {t('harvest.eligibility.linkLabel')}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How HARVEST Works */}
        <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
          <div className="doc-container">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-leaf-text font-semibold mb-3">{t('harvest.how.badge')}</p>
              <h2 className="fluid-h2 font-bold text-gray-900 dark:text-white mb-4">{t('harvest.how.title')}</h2>
              <p className="fluid-p text-gray-600 dark:text-white/70 max-w-3xl mx-auto break-words">
                {t('harvest.how.description')}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((step, idx) => {
                const Icon = STEP_ICONS[idx % STEP_ICONS.length];
                return (
                  <div key={idx} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-leaf/10 rounded-2xl">
                        <Icon className="h-6 w-6 text-leaf-text" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-white/80 mb-4 text-sm">{step.description}</p>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-white/80">
                          <span className="text-leaf-text mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2026-27 Program Targets */}
        <section className="relative py-20 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="service-badge mb-6">
                <span className="me-2 h-2 w-2 rounded-full bg-leaf"></span>
                <span className="font-medium">{t('harvest.targets.badge')}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('harvest.targets.title')}</h2>
              <p className="text-sm text-gray-600 dark:text-white/70 max-w-2xl mx-auto italic">{t('harvest.targets.note')}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {targets.map((target, idx) => (
                <div
                  key={idx}
                  className="relative backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-6 border border-white/50 dark:border-white/20 shadow-xl text-center"
                >
                  <div className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {target.number}
                    <span className="text-gray-600 dark:text-white/70">{target.suffix}</span>
                  </div>
                  <div className="w-10 h-1 mx-auto rounded-full bg-leaf mb-3"></div>
                  <div className="text-sm font-medium text-gray-700 dark:text-white/80">{target.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-gray-500 dark:text-white/50 text-center max-w-3xl mx-auto">
              {t('harvest.targets.source')}
            </p>
          </div>
        </section>

        {/* Coordinator */}
        <LazySection minHeight={420}>
          <section className="py-16 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="fluid-h2 font-bold text-foreground">Meet the HARVEST Team</h2>
                <p className="fluid-p text-muted-foreground max-w-3xl mx-auto">HARVEST is coordinated locally, with bilingual, culturally responsive mentoring throughout the program.</p>
              </div>
              <ManagementSection
                title=""
                members={[{
                  name: coordinator.name,
                  role: coordinator.role,
                  languages: coordinator.languages,
                  avatar: coordinator.image,
                  bio: coordinator.experience,
                  credentialsSummary: coordinator.qualifications,
                  location: coordinator.location,
                }]}
                accentColor="leaf"
              />
            </div>
          </section>
        </LazySection>

        {/* Final CTA */}
        <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-leaf/10 dark:bg-leaf/15 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sun/30 rounded-full blur-3xl dark:bg-sun/20 motion-safe:animate-blob"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group motion-safe:animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">{t('harvest.cta.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto">{t('harvest.cta.body')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forms.mosaicmc.org.au/referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('harvest.cta.referralLabel')} (opens in new tab)`}
                  className="bg-leaf hover:bg-leaf/90 text-ocean hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-leaf/25"
                >
                  <UserPlus className="h-5 w-5" />
                  {t('harvest.cta.referralLabel')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/contact-us"
                  className="border-2 border-leaf text-ocean dark:text-white hover:bg-leaf hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
                >
                  {t('harvest.cta.contactLabel')}
                  <ArrowRight className="h-5 w-5 ms-2" />
                </Link>
                <a
                  href="mailto:info@mosaicmc.org.au?subject=HARVEST%20Employer%20Enquiry"
                  className="border-2 border-leaf text-ocean dark:text-white hover:bg-leaf hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
                >
                  <Mail className="h-5 w-5 me-2" />
                  {t('harvest.cta.employerLabel')}
                </a>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-white/70 text-sm">{t('harvest.cta.footnote')}</p>
              </div>
            </div>
          </div>
        </section>

        <LazySection minHeight={360}>
          <RelatedServices current="settlement-support" />
        </LazySection>

      </div>
    </PageTransition>
  );
};

export default HarvestPage;
