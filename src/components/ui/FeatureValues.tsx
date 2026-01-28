import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Eye, Users, Lightbulb, HeartHandshake } from "lucide-react";

type ValueItem = {
  key: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export function FeatureValues() {
  const items: ValueItem[] = [
    { 
      key: "trust", 
      title: "Trust", 
      description: "We rely on and have faith in people and our organisation.",
      Icon: ShieldCheck 
    },
    { 
      key: "transparency", 
      title: "Transparency", 
      description: "We share openly with each other, without judgement.",
      Icon: Eye 
    },
    { 
      key: "respect", 
      title: "Respect", 
      description: "We treat everyone equally and consider the opinions of others, no matter our differences.",
      Icon: HeartHandshake 
    },
    { 
      key: "collaboration", 
      title: "Collaboration", 
      description: "We work together to support each other in our endeavours.",
      Icon: Users 
    },
    { 
      key: "creation", 
      title: "Creation", 
      description: "We grow through collective ideas and innovation.",
      Icon: Lightbulb 
    },
  ];

  return (
    <section
      aria-labelledby="values-title"
      className="relative py-16 bg-background transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-sand/40 via-transparent to-ocean/10 dark:from-white/10 dark:to-sky/15"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center rounded-full bg-sand/60 dark:bg-white/10 border border-border px-4 py-1 text-xs font-medium text-foreground shadow-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse" aria-hidden="true"></span>
            <span id="values-title">Our Values</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What we stand for
          </h2>
        </div>

        <div
          role="list"
          aria-label="Organisational values"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map(({ key, title, description, Icon }) => (
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
                  <h3 className="text-lg md:text-xl font-semibold text-foreground uppercase">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
