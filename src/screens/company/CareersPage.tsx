"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, Briefcase, CheckCircle } from 'lucide-react';

const EMPLOYMENT_HERO_ORG_ID = '233f4167-92af-4cf8-ba1a-f9ab71c2a337';
const EMPLOYMENT_HERO_WIDGET_SRC = 'https://addons-assets.employmenthero.com/jobs-widget/v1/widget.js';
const EMPLOYMENT_HERO_WIDGET_CONTAINER_ID = 'eh-jobs-widget';
const CAREERS_FORM_ENDPOINT = 'https://formsubmit.co/ajax/recruitment@mosaicmc.org.au';
const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024;

const countWords = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const buildCareerInterestSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().trim().min(2, { message: t('careersPage.form.validation.fullName') }),
    email: z.string().trim().email({ message: t('careersPage.form.validation.email') }),
    phone: z.string().trim().min(8, { message: t('careersPage.form.validation.phone') }),
    preferredLocation: z.string().trim().min(2, { message: t('careersPage.form.validation.preferredLocation') }),
    program: z.string().trim().min(1, { message: t('careersPage.form.validation.program') }),
    coverNote: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || countWords(value) <= 200, {
        message: t('careersPage.form.validation.coverNote'),
      }),
    resume: z
      .any()
      .refine((value) => value instanceof FileList && value.length > 0, {
        message: t('careersPage.form.validation.resumeRequired'),
      })
      .refine(
        (value) => !(value instanceof FileList) || value.length === 0 || value[0].size <= MAX_RESUME_SIZE_BYTES,
        { message: t('careersPage.form.validation.resumeSize') }
      ),
    website: z.string().optional(),
  });

type CareerInterestFormValues = {
  fullName: string;
  email: string;
  phone: string;
  preferredLocation: string;
  program: string;
  coverNote?: string;
  resume: FileList;
  website?: string;
};

const CareersPage = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const careerInterestSchema = useMemo(() => buildCareerInterestSchema(t), [t]);

  const form = useForm<CareerInterestFormValues>({
    resolver: zodResolver(careerInterestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      preferredLocation: '',
      program: '',
      coverNote: '',
      website: '',
    },
  });

  useEffect(() => {
    const container = document.getElementById(EMPLOYMENT_HERO_WIDGET_CONTAINER_ID);
    if (container) container.innerHTML = '';

    const existingScript = document.querySelector(
      `script[data-eh-widget="jobs"][data-org-id="${EMPLOYMENT_HERO_ORG_ID}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = EMPLOYMENT_HERO_WIDGET_SRC;
    script.async = true;
    script.setAttribute('data-org-id', EMPLOYMENT_HERO_ORG_ID);
    script.setAttribute('data-eh-widget', 'jobs');
    document.body.appendChild(script);

    return () => {
      script.remove();
      const c = document.getElementById(EMPLOYMENT_HERO_WIDGET_CONTAINER_ID);
      if (c) c.innerHTML = '';
    };
  }, []);

  const coverNoteValue = form.watch('coverNote') ?? '';
  const coverNoteWordCount = countWords(coverNoteValue);

  const onSubmit = async (values: CareerInterestFormValues) => {
    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitError(null);

    const data = new FormData();
    data.append('full_name', values.fullName);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('preferred_location', values.preferredLocation);
    data.append('program_interested_in', values.program);
    data.append('cover_note', values.coverNote?.trim() || '');
    data.append('resume', values.resume[0]);
    data.append('_subject', 'Careers expression of interest - Mosaic website');
    data.append('_template', 'table');
    data.append('_captcha', 'false');
    data.append('_honey', values.website?.trim() || '');

    try {
      const response = await fetch(CAREERS_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error('submit-failed');
      }

      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
      setSubmitError(t('careersPage.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section className="relative section-spacing bg-background transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-sky/10 dark:bg-sky/15 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 motion-safe:animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 motion-safe:animate-blob-delayed"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="service-badge mb-6">
              <Briefcase className="w-4 h-4 text-sky" />
              <span>{t('careersPage.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight motion-safe:animate-fade-in-up">
              {t('careersPage.hero.headline')}
            </h1>
            <p
              className="text-base sm:text-xl fluid-p text-gray-700 dark:text-gray-100 leading-relaxed mb-4 motion-safe:animate-fade-in-up break-words"
              style={{ animationDelay: '200ms' }}
            >
              {t('careersPage.hero.bodyPrimary')}
            </p>
            <p
              className="text-base sm:text-xl fluid-p text-gray-600 dark:text-gray-300 leading-relaxed mb-8 motion-safe:animate-fade-in-up break-words"
              style={{ animationDelay: '280ms' }}
            >
              {t('careersPage.hero.bodySecondary')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center motion-safe:animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <a
                href="#open-roles"
                className="border-2 border-sky text-ocean dark:text-white hover:bg-sky hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                {t('careersPage.hero.ctaRoles')}
                <ArrowRight className="h-5 w-5 ms-2" aria-hidden="true" />
              </a>
              <a
                href="#expression-of-interest"
                className="border-2 border-sky text-ocean dark:text-white hover:bg-sky hover:text-ocean px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
              >
                {t('careersPage.hero.ctaInterest')}
                <ArrowRight className="h-5 w-5 ms-2" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-12 motion-safe:animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('careersPage.hero.whyTitle')}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 text-start">
                {(
                  t('careersPage.hero.whyBullets', { returnObjects: true }) as unknown as Array<{
                    title: string;
                    description: string;
                  }>
                ).map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-sky/10 rounded-2xl">
                        <CheckCircle className="h-6 w-6 text-sky-text" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-white/80 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section padding="sm" className="pb-10" containerClassName="max-w-5xl">
        <div id="open-roles" className="scroll-mt-24" />
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
          <div id={EMPLOYMENT_HERO_WIDGET_CONTAINER_ID} />
        </div>
      </Section>

      <Section padding="sm" className="pb-14" containerClassName="max-w-5xl">
        <div id="expression-of-interest" className="scroll-mt-24" />
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.2fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 text-sm font-medium text-muted-foreground">
                {t('careersPage.form.badge')}
              </span>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {t('careersPage.form.heading')}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t('careersPage.form.intro')}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {t('careersPage.form.description')}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-6">
              <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('careersPage.form.personalDetails')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('careersPage.form.supportingText')}
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('careersPage.form.fields.fullName')}</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            className="bg-background focus-visible:ring-ocean focus-visible:border-ocean"
                            placeholder={t('careersPage.form.placeholders.fullName')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careersPage.form.fields.email')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              autoComplete="email"
                              className="bg-background focus-visible:ring-ocean focus-visible:border-ocean"
                              placeholder={t('careersPage.form.placeholders.email')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careersPage.form.fields.phone')}</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              autoComplete="tel"
                              className="bg-background focus-visible:ring-ocean focus-visible:border-ocean"
                              placeholder={t('careersPage.form.placeholders.phone')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="preferredLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careersPage.form.fields.preferredLocation')}</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-background focus-visible:ring-ocean focus-visible:border-ocean"
                              placeholder={t('careersPage.form.placeholders.preferredLocation')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('careersPage.form.fields.program')}</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-background focus-visible:ring-ocean focus-visible:border-ocean">
                                <SelectValue placeholder={t('careersPage.form.placeholders.program')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Settlement Services">{t('careersPage.form.programOptions.settlement')}</SelectItem>
                              <SelectItem value="Family Support">{t('careersPage.form.programOptions.family')}</SelectItem>
                              <SelectItem value="Aged Care">{t('careersPage.form.programOptions.agedCare')}</SelectItem>
                              <SelectItem value="Community Engagement">{t('careersPage.form.programOptions.community')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="coverNote"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>{t('careersPage.form.fields.coverNote')}</FormLabel>
                          <span className="text-xs text-muted-foreground">
                            {t('careersPage.form.wordCount', {
                              count: coverNoteWordCount,
                              max: 200,
                            })}
                          </span>
                        </div>
                        <FormControl>
                          <Textarea
                            rows={5}
                            className="resize-y bg-background focus-visible:ring-ocean focus-visible:border-ocean"
                            placeholder={t('careersPage.form.placeholders.coverNote')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { onChange, ref, name } }) => (
                      <FormItem>
                        <FormLabel>{t('careersPage.form.fields.resume')}</FormLabel>
                        <FormControl>
                          <Input
                            ref={ref}
                            name={name}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="bg-background file:me-3 file:rounded-md file:bg-sand file:px-3 file:text-foreground focus-visible:ring-ocean focus-visible:border-ocean"
                            onChange={(event) => {
                              onChange(event.target.files);
                              setSubmitState('idle');
                              setSubmitError(null);
                            }}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">{t('careersPage.form.resumeHelp')}</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                    {...form.register('website')}
                  />

                  {submitState === 'success' ? (
                    <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      {t('careersPage.form.success')}
                    </p>
                  ) : null}

                  {submitError ? (
                    <p className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                      {submitError}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-ocean to-sky-text text-white hover:from-ocean/90 hover:to-sky-text/90"
                  >
                    {isSubmitting ? t('careersPage.form.submitting') : t('careersPage.form.submit')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CareersPage;
