import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type Social = { platform: "linkedin" | "twitter" | "website"; href: string };
type ManagementMemberCard = {
  id?: string;
  name: string;
  role?: string;
  languages?: string[];
  avatar?: string;
  bio: string;
  credentialsSummary?: string;
  social?: Social[];
  summary?: string;
};

export function ManagementSection({
  title,
  members,
}: {
  title?: string;
  members: ManagementMemberCard[];
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<ManagementMemberCard | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  React.useEffect(() => {
    const onResize = () => setIsMobileOrTablet(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h2>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((m, idx) => (
            <Card
              key={m.id ?? `${m.name}-${idx}`}
              className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition"
            >
              <CardContent className="p-0">
                <div className="mx-auto mb-6">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white dark:border-slate-700 shadow-lg">
                    {m.avatar && (
                      <AvatarImage src={m.avatar} alt={m.name} loading="lazy" decoding="async" />
                    )}
                    <AvatarFallback className="text-foreground font-semibold">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{m.name}</h3>
                  {m.role && (
                    <span className="inline-flex items-center rounded-full bg-ocean/10 text-ocean border border-ocean/20 dark:bg-sky/10 dark:text-sky dark:border-sky/20 px-2.5 py-0.5 text-xs font-semibold mb-2">
                      {m.role}
                    </span>
                  )}
                  {Array.isArray(m.languages) && m.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2" aria-label={`Languages for ${m.name}`}>
                      {m.languages.map((lang) => (
                        <span
                          key={`${m.name}-${lang}`}
                          className="inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border px-2 py-0.5 text-[11px]"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                  {m.credentialsSummary && (
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3">
                      {m.credentialsSummary}
                    </p>
                  )}
                  {isMobileOrTablet ? (
                    <Sheet open={open} onOpenChange={(o) => { if (!o) setSelected(null); setOpen(o); }}>
                      <SheetTrigger asChild>
                        <Button
                          aria-label={`Read bio for ${m.name}`}
                          onClick={() => { setSelected(m); setOpen(true); }}
                          className="mt-1"
                        >
                          Read Bio
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="max-w-lg w-full">
                        <SheetHeader>
                          <SheetTitle>{selected?.name}</SheetTitle>
                          {selected?.role && (
                            <SheetDescription>{selected.role}</SheetDescription>
                          )}
                        </SheetHeader>
                        <div className="mt-4">
                          {selected?.languages && selected.languages.length > 0 && (
                            <p className="text-sm text-muted-foreground mb-2">Languages: {selected.languages.join(", ")}</p>
                          )}
                          {selected?.credentialsSummary && (
                            <p className="text-sm text-muted-foreground mb-3">{selected.credentialsSummary}</p>
                          )}
                          <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line mb-3">
                            {selected?.bio}
                          </p>
                        </div>
                      </SheetContent>
                    </Sheet>
                  ) : (
                    <Button
                      aria-label={`Read bio for ${m.name}`}
                      onClick={() => { setSelected(m); setOpen(true); }}
                      className="mt-1"
                    >
                      Read Bio
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {!isMobileOrTablet && open && selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/50"
            onClick={() => { setOpen(false); setSelected(null); }}
          />
          <div className="relative max-w-2xl w-[92%] md:w-[70%] rounded-2xl border border-border bg-background shadow-xl">
            <button
              aria-label="Close dialog"
              onClick={() => { setOpen(false); setSelected(null); }}
              className="absolute bottom-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-foreground shadow hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-6 pb-16">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{selected.name}</h3>
              {selected.role && (<p className="text-muted-foreground mb-1">{selected.role}</p>)}
              {selected.languages && selected.languages.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2">Languages: {selected.languages.join(", ")}</p>
              )}
              {selected.credentialsSummary && (
                <p className="text-sm text-muted-foreground mb-3">{selected.credentialsSummary}</p>
              )}
              <p className="text-sm md:text-base text-foreground leading-relaxed mb-3 whitespace-pre-line">{selected.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
