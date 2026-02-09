"use client";

import { useState } from 'react';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { ChevronRight, FileDown, X, ExternalLink } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { assetPath } from '@/lib/utils';
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const short = (s: string) => (s.length > 220 ? s.slice(0, 220) + '…' : s);

const downloadSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type DownloadFormValues = z.infer<typeof downloadSchema>;

type VolunteerRole = {
  title: string;
  blurb: string;
};

function AgedCareRoleCard({ role }: { role: VolunteerRole }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const directDownloadPath = `/pd/central-coast/${toSlug(role.title)}.pdf`;

  const triggerDownload = (path: string) => {
    const url = assetPath(path);
    const decodedUrl = decodeURI(url);
    const safeUrl = encodeURI(decodedUrl);
    const link = document.createElement('a');
    link.href = safeUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = async (values: DownloadFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const resp = await fetch('/api/volunteer-pd-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roleTitle: role.title,
        }),
      });

      let resolvedPath: string | undefined;

      if (resp.ok) {
        const data = (await resp.json()) as { downloadPath?: string };
        resolvedPath = data?.downloadPath || directDownloadPath;
      } else {
        resolvedPath = directDownloadPath;
      }

      if (resolvedPath) {
        triggerDownload(resolvedPath);
        form.reset();
        setShowForm(false);
        return;
      }

      setSubmitError('We could not start your download. Please try again.');
    } catch {
      if (directDownloadPath) {
        triggerDownload(directDownloadPath);
        form.reset();
        setShowForm(false);
        return;
      }
      setSubmitError('We could not start your download. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="group relative glass-surface rounded-xl p-6 border border-earth/20 dark:border-earth/10 shadow-sm transition-transform transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="font-semibold text-foreground">{role.title}</div>
        <Dialog.Root>
          <Dialog.Trigger
            aria-label="View details"
            aria-haspopup="dialog"
            title="View details"
            className="inline-flex items-center justify-center text-sm text-muted-foreground hover:text-sky dark:hover:text-sky focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background rounded p-2 min-w-[44px] min-h-[44px] z-30 relative"
          >
            <ChevronRight className="h-4 w-4" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[60] backdrop-blur-sm bg-background/40 dark:bg-background/50" />
            <Dialog.Content className="fixed inset-0 z-[60] flex items-center justify-center p-6">
              <div className="glass-surface relative w-full max-w-lg rounded-3xl border border-border p-6 shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-ocean/10 via-transparent to-sky/10"></div>
                <Dialog.Title className="text-xl font-semibold text-foreground">{role.title}</Dialog.Title>
                <Dialog.Description className="mt-2 text-base leading-relaxed text-foreground">{role.blurb}</Dialog.Description>
                {!showForm && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-border text-foreground hover:bg-sand/50 hover:text-ocean dark:hover:bg-white/10 dark:hover:text-sky"
                      onClick={() => setShowForm(true)}
                    >
                      <FileDown className="h-4 w-4 me-2" />
                      Download PD
                    </Button>
                  </div>
                )}
                {!showForm && <PDFAccessibilityNotice className="mt-2" />}
                {showForm && (
                  <div className="mt-4 space-y-4">
                    <Form {...form}>
                      <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        aria-describedby={submitError ? 'volunteer-download-error' : undefined}
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                  <Input autoComplete="given-name" inputMode="text" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                  <Input autoComplete="family-name" inputMode="text" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" autoComplete="email" inputMode="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {submitError && (
                          <p id="volunteer-download-error" role="alert" aria-live="polite" className="text-sm text-destructive">
                            {submitError}
                          </p>
                        )}
                        <div className="flex flex-col gap-3">
                          <Button type="submit" disabled={submitting} className="w-full bg-ocean text-white hover:bg-ocean/90">
                            {submitting ? 'Preparing download…' : 'Submit and download'}
                          </Button>
                          <Button type="button" variant="outline" className="w-full" onClick={() => {
                            setShowForm(false);
                            setSubmitError(null);
                          }}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
                <Dialog.Close className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full glass-surface p-2 shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                  <X className="h-4 w-4 text-muted-foreground" />
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{short(role.blurb)}</p>
    </div>
  );
}

export default function CentralCoastVolunteerPage() {
  const agedCareRoles = [
    {
      title: 'Aged Care Facility Visitor',
      blurb:
        "Bring companionship and joy to an older person living in residential care. You'll visit a designated resident at least twice monthly, building a genuine friendship through conversation, shared activities, and consistent presence that brightens their days and enriches both your lives. If you have genuine empathy for older people, demonstrated reliability, excellent listening skills, and the commitment to maintain appropriate boundaries while building a friendship that matters, this role offers profound rewards beyond volunteering.",
    },
    {
      title: 'Aged Care Home Visitor',
      blurb:
        "Provide companionship and social connection for older people living independently in their own homes. You'll visit a home care recipient at least twice monthly, helping combat isolation while respecting their independence and dignity in their own environment. If you combine reliability with respectful sensitivity, can work independently while knowing when to seek guidance, and you understand that aging at home is about preserving independence and identity, this role allows you to make an enormous difference in someone's daily life.",
    },
  ];


  return (
    <div className="animate-fade-in">
      

      <Section overlay center padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full glass-surface px-6 py-2 text-sm shadow mb-6">
            <span className="me-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Central Coast Volunteering</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Support Community on the Central Coast</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join Mosaic on the Central Coast to help families access services and build strong community connections.
          </p>
          <div className="mt-6 flex justify-center relative z-10">
            <VolunteerLocationNav currentSlug="central-coast" />
          </div>
        </div>
      </Section>

      <Section overlay>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <Tabs.Root defaultValue="aged-care">
              <Tabs.List className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 backdrop-blur-md p-1">
                <Tabs.Trigger value="aged-care" className="px-4 py-2 text-sm rounded-full transition data-[state=active]:bg-ocean data-[state=active]:text-white hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background">
                  Aged Care
                </Tabs.Trigger>
              </Tabs.List>

              <div className="mt-6">
                <Tabs.Content value="aged-care">
                  <GlassCard padding="md" className="rounded-2xl overflow-visible">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-care text-white flex items-center justify-center">
                        <img
                          src={assetPath("/images/ACVVS_logo.svg")}
                          alt="ACVVS logo"
                          className="block h-7 w-7 object-contain object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">Aged Care Volunteer Visitor Scheme (ACVVS)</h2>
                    </div>
                    <p className="mt-1 text-xs italic text-muted-foreground">
                      Funded by the Australian Government
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {agedCareRoles.map((r) => (
                        <AgedCareRoleCard key={r.title} role={r} />
                      ))}
                    </div>
                  </GlassCard>
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://forms.mosaicmc.org.au/Volunteer_Application"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply to Volunteer (opens in new tab)"
            className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            Apply to Volunteer
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            to="/get-involved"
            className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            More Ways to Get Involved
          </Link>
        </div>

        <VolunteerLocationNav currentSlug="central-coast" />
      </Section>
    </div>
  );
}
