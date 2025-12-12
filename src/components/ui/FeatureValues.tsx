import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Eye, Handshake, Users, Lightbulb } from "lucide-react";

type ValueItem = {
  key: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export function FeatureValues({ values }: { values?: ValueItem[] }) {
  const items: ValueItem[] =
    values ??
    [
      { key: "trust", title: "TRUST", Icon: ShieldCheck },
      { key: "transparency", title: "TRANSPARENCY", Icon: Eye },
      { key: "respect", title: "RESPECT", Icon: Handshake },
      { key: "collaboration", title: "COLLABORATION", Icon: Users },
      { key: "creation", title: "CREATION", Icon: Lightbulb },
    ];

  return (
    <section
      aria-labelledby="values-title"
      className="relative py-12 bg-gradient-to-br from-sand/30 via-sky/10 to-ocean/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center rounded-full backdrop-blur-md bg-sand/60 dark:bg-white/10 border border-sky/40 dark:border-white/20 px-5 py-1.5 text-xs shadow-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse"></span>
            <span id="values-title" className="text-foreground/80 font-medium">
              Values
            </span>
          </div>
        </div>

        <Card
          aria-label="Values"
          className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition"
        >
          <CardContent className="p-0">
            <div className="flex items-center gap-3 mb-4">
              <Users aria-hidden="true" className="h-6 w-6 text-ocean dark:text-sky" />
              <h3 className="text-base font-semibold text-foreground">Values</h3>
            </div>
            <div
              role="list"
              aria-label="Organisational values"
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {items.map(({ key, title, Icon }) => (
                <span
                  key={key}
                  role="listitem"
                  className="inline-flex items-center gap-2 rounded-full bg-sand/50 dark:bg-white/10 border border-border px-3 py-1 text-xs md:text-sm font-semibold text-foreground whitespace-normal break-words"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 text-ocean dark:text-sky flex-shrink-0"
                  />
                  <span>{title}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

