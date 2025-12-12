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
      className="relative py-16 bg-background transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center rounded-full bg-sand/60 dark:bg-white/10 border border-border px-4 py-1 text-xs font-medium text-foreground shadow-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse" aria-hidden="true"></span>
            <span id="values-title">Values</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What we stand for
          </h2>
        </div>

        <div
          role="list"
          aria-label="Organisational values"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {items.map(({ key, title, Icon }) => (
            <Card
              key={key}
              role="listitem"
              aria-label={title}
              tabIndex={0}
              className="group p-6 rounded-3xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sand/60 dark:bg-white/10 border border-border text-ocean dark:text-sky">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Core organisational principle guiding decisions and behaviours.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
