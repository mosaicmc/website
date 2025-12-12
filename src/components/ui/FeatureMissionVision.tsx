import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Eye } from "lucide-react";

export function FeatureMissionVision({
  mission,
  vision,
}: {
  mission: string;
  vision: string;
}) {
  return (
    <section
      aria-labelledby="mission-vision-title"
      className="relative py-12 bg-gradient-to-br from-sand/30 via-sky/10 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-5 py-1.5 text-xs shadow-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse"></span>
            <span id="mission-vision-title" className="text-foreground/80 font-medium">
              Mission • Vision
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Card
            aria-label="Mission"
            className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-6 w-6 text-ocean dark:text-sky"
                />
                <h3 className="text-base font-semibold text-foreground">Mission</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground whitespace-normal break-words leading-relaxed">
                {mission}
              </p>
            </CardContent>
          </Card>
          <Card
            aria-label="Vision"
            className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition"
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-3">
                <Eye aria-hidden="true" className="h-6 w-6 text-ocean dark:text-sky" />
                <h3 className="text-base font-semibold text-foreground">Vision</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground whitespace-normal break-words leading-relaxed">
                {vision}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

