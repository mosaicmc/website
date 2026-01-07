import { Helmet } from 'react-helmet-async';
import VolunteerLocationNav from '@/components/ui/VolunteerLocationNav';
import { Link } from 'react-router-dom';
import { Section } from '@/components/ui/Section';
import { GlassCard } from '@/components/ui/GlassCard';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function TamworthVolunteerPage() {
  

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Volunteer in Tamworth | Mosaic Multicultural Connections</title>
        <meta
          name="description"
          content="Volunteer opportunities in Tamworth: settlement support, tutoring, ACVVS visitor, citizenship assistance and community events."
        />
      </Helmet>

      <Section overlay center padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
            <span className="text-muted-foreground font-medium">Tamworth Volunteering</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Strengthen Community in Tamworth</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Partner with Mosaic to support multicultural families in Tamworth with practical care and connection.
          </p>
          <div className="mt-6 flex justify-center relative z-10">
            <VolunteerLocationNav currentSlug="tamworth" />
          </div>
        </div>
      </Section>

      <Section overlay>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <GlassCard padding="md" className="rounded-2xl w-full max-w-6xl overflow-visible">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sand text-foreground flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">No Opportunities Currently Available</h2>
              </div>
              <p className="mt-2 text-muted-foreground">Sorry, we currently have no volunteering opportunities available in this location.</p>
              <div className="mt-4">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      aria-label="View details"
                      aria-haspopup="dialog"
                      title="View details"
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 dark:bg-card/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background z-30 relative"
                    >
                      <span>Why no openings?</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[60] backdrop-blur-sm bg-background/40 dark:bg-background/50" />
                    <Dialog.Content className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -8 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                        className="relative w-full max-w-lg rounded-3xl border border-border bg-card/95 dark:bg-card/90 p-6 shadow-2xl"
                      >
                        <Dialog.Title className="text-lg font-semibold text-foreground">Recruitment Paused</Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          Local volunteer recruitment is currently paused due to program capacity. Follow our socials or check back later for updates.
                        </Dialog.Description>
                        <Dialog.Close aria-label="Close" className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-white/80 dark:bg-white/10 border border-white/40 dark:border-white/20 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Dialog.Close>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </GlassCard>
            
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://tally.so/r/3qoXjg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-ocean to-ocean/90 hover:from-ocean/90 hover:to-ocean text-white hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Apply to Volunteer
          </a>
          <Link
            to="/get-involved"
            className="border-2 border-sky text-sky hover:bg-sky hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            More Ways to Get Involved
          </Link>
        </div>

        <VolunteerLocationNav currentSlug="tamworth" />
      </Section>
    </div>
  );
}
