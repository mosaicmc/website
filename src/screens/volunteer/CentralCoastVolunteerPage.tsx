"use client";

import { useState } from 'react';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import { ChevronRight, ExternalLink } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { assetPath } from '@/lib/utils';
import { TrackedDownloadButton } from '@/components/TrackedDownloadButton';

const short = (s: string) => (s.length > 220 ? s.slice(0, 220) + '…' : s);

type VolunteerRole = {
  title: string;
  blurb: string;
  downloadId: string;
};

function AgedCareRoleCard({ role }: { role: VolunteerRole }) {
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
                
                <div className="mt-6">
                  <TrackedDownloadButton
                    downloadId={role.downloadId}
                    className="w-full sm:w-auto bg-ocean text-white hover:bg-ocean/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                  >
                    Download PD
                  </TrackedDownloadButton>
                </div>

                <Dialog.Close className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full glass-surface p-2 shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                  <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
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
  const agedCareRoles: VolunteerRole[] = [
    {
      title: 'Aged Care Facility Visitor',
      blurb:
        "Bring companionship and joy to an older person living in residential care. You'll visit a designated resident at least twice monthly, building a genuine friendship through conversation, shared activities, and consistent presence that brightens their days and enriches both your lives. If you have genuine empathy for older people, demonstrated reliability, excellent listening skills, and the commitment to maintain appropriate boundaries while building a friendship that matters, this role offers profound rewards beyond volunteering.",
      downloadId: 'pd-central-coast-aged-care-facility',
    },
    {
      title: 'Aged Care Home Visitor',
      blurb:
        "Provide companionship and social connection for older people living independently in their own homes. You'll visit a home care recipient at least twice monthly, helping combat isolation while respecting their independence and dignity in their own environment. If you combine reliability with respectful sensitivity, can work independently while knowing when to seek guidance, and you understand that aging at home is about preserving independence and identity, this role allows you to make an enormous difference in someone's daily life.",
      downloadId: 'pd-central-coast-aged-care-home',
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
