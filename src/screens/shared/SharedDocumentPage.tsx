"use client";

import { Link } from "react-router-dom";
import { PageTransition } from "@/components/ui/PageTransition";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import { Calendar, FileDown, User } from "lucide-react";
import { TrackedDownloadButton } from "@/components/TrackedDownloadButton";

export default function SharedDocumentPage() {
  const headingClassName =
    "mt-0 bg-gradient-to-r from-ocean to-sky-text bg-clip-text text-transparent dark:from-sky dark:to-ocean";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Section variant="default" overlay fade="top" padding="lg" className="border-b border-divider">
          <div className="max-w-4xl mx-auto text-center">
            <div className="section-badge bg-white/80 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700/50 px-6 py-2 text-sm shadow-lg mb-6 backdrop-blur-sm inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ocean dark:bg-sky animate-pulse"></span>
              <span className="text-slate-900 dark:text-white font-medium">Event Summary & Way Forward</span>
            </div>

            <h1 className="fluid-h1 text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:!text-white">
              Mosaic Leaders Forum
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-800 dark:!text-slate-100 leading-relaxed">
              EVENT SUMMARY & WAY FORWARD
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                18 May 2026
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Helena Derwash, CEO — Mosaic Multicultural Connections
              </span>
            </div>

          </div>
        </Section>

        <Section padding="lg" variant="default">
          <div className="max-w-4xl mx-auto">
            <div id="document-content" className="scroll-mt-28" />

            <GlassCard className="rounded-3xl" padding="lg">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className={headingClassName}>A message from Helena Derwash, CEO</h2>
                <p>
                  A warm thank you to everyone who attended and continues to actively engage with the forum.
                  Mosaic&apos;s commitment to the communities we serve and the staff who make it possible was clearly
                  visible in the room.
                </p>
                <p>
                  This forum illustrates and reinforces why I returned to Australia: to give back to the country and
                  community that shaped my own story.
                </p>
              </div>
            </GlassCard>

            <div className="grid gap-6 mt-8">
              <GlassCard className="rounded-3xl" padding="lg">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={headingClassName}>Pause & celebrate what has been achieved</h2>
                  <p>
                    It is human nature to focus on what needs to be done. Today, take a moment to recognise what this
                    group has accomplished in a very short time spanning a wide range of topics and needs across
                    communities with varied migration and resettlement experiences.
                  </p>
                  <p>
                    Your needs have been carefully mapped by the dedicated Mosaic team, cross-referenced across our
                    programming pillars, and aligned with our strategic vision and operational capability. From this
                    work, the Terms of Reference was developed, an extraordinary foundation that ensures community
                    voices remain at the forefront of advocacy at every level, driving both visibility and long-term
                    sustainability.
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="rounded-3xl" padding="lg">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={headingClassName}>Mosaic&apos;s vision: a connected community</h2>
                  <blockquote>
                    <p>&quot;A connected community where diversity defines and nourishes us&quot;</p>
                  </blockquote>
                  <p>
                    Is not just our strategic anchor. It signals that connection must reach beyond nationality. The
                    three pillars that increase visibility, strengthen your voice, and realise your vision are:
                    Communication, Coordination and Collaboration.
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="rounded-3xl" padding="lg">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className={headingClassName}>Actions raised</h2>
                  <p>
                    Following points which were raised last night and in the spirit of amplifying diverse voices which
                    can nourish this forum the following actions will benefit us all:
                  </p>
                  <ul>
                    <li>
                      Consider developing a one-page fact sheet for your association: who you are, what you do, where
                      you operate, and how you plan to achieve your goals. A simple, shared starting point for
                      connection.
                    </li>
                    <li>
                      Those fact sheets can become the foundation for a Leaders Forum social media presence: a
                      Facebook page to start with — giving our collective work greater visibility in the broader
                      community.
                    </li>
                    <li>
                      A shared yearly events calendar across all our communities would allow us to see each other&apos;s
                      work, plan together, and find natural opportunities for collaboration.
                    </li>
                    <li>
                      For regional associations: the metropolitan associations have walked a similar path and have
                      much to offer. Reaching out to them opens the door to shared experience, mentorship, and mutual
                      support, I strongly urge the connection.
                    </li>
                    <li>
                      Investing in your association&apos;s governance structure is one of the most valuable things you can
                      do. Governance: the framework of roles, accountability, and decision-making that guides your
                      organisation, builds trust, strengthens credibility, and signals to funders that you are
                      well-managed and sustainable. As the team work on the &lsquo;grants training workshop&rdquo; please
                      consider when applying for funding, due diligence is standard practice; having a documented
                      constitution, clear office bearers, sound financial processes, and meeting records in place can
                      make the difference in your application.
                    </li>
                    <li>Collective Action amplifies Individual Voices</li>
                  </ul>
                  <blockquote>
                    <p className="text-center bg-gradient-to-r from-ocean to-sky-text bg-clip-text text-transparent dark:from-sky dark:to-ocean">
                      Your net-worth is Your Net-work
                    </p>
                  </blockquote>
                </div>
              </GlassCard>
            </div>

            <div className="mt-10">
              <TrackedDownloadButton
                downloadId="shared-leaders-forum-summary-2026"
                variant="cta"
                size="cta-sm"
                className="w-full sm:w-auto"
              >
                <FileDown className="h-4 w-4" />
                Download PDF
              </TrackedDownloadButton>
              <p className="text-sm text-muted-foreground">
                If you have trouble accessing this document or need it in an alternative format, please{" "}
                <Link to="/contact-us" className="text-primary hover:underline">
                  contact us
                </Link>
                .
              </p>
              <p className="text-sm text-muted-foreground mt-2">Last updated: 19 May 2026</p>
            </div>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
