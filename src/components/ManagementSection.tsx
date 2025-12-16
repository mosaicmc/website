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
  location?: string;
  avatar?: string;
  bio: string;
  credentialsSummary?: string;
  social?: Social[];
  summary?: string;
};

export function ManagementSection({
  title,
  members,
  accentColor = "ocean",
}: {
  title?: string;
  members: ManagementMemberCard[];
  accentColor?: "ocean" | "sky" | "care" | "earth" | "leaf" | "sun";
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
              className={`group relative p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition ${
                accentColor === "care"
                  ? "hover:shadow-care/25"
                  : accentColor === "sky"
                  ? "hover:shadow-sky/25"
                  : accentColor === "earth"
                  ? "hover:shadow-earth/25"
                  : accentColor === "leaf"
                  ? "hover:shadow-leaf/25"
                  : accentColor === "sun"
                  ? "hover:shadow-sun/25"
                  : "hover:shadow-ocean/25"
              } hover:scale-[1.01]`}
            >
              <CardContent className="p-0">
                <div className="relative mx-auto mb-6">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -top-2 w-16 h-1 rounded-b-full opacity-60 ${
                      accentColor === "care"
                        ? "bg-care"
                        : accentColor === "sky"
                        ? "bg-sky"
                        : accentColor === "earth"
                        ? "bg-earth"
                        : accentColor === "leaf"
                        ? "bg-leaf"
                        : accentColor === "sun"
                        ? "bg-sun"
                        : "bg-ocean"
                    }`}
                  />
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-0 h-28 w-28 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition ${
                      accentColor === "care"
                        ? "bg-care/30"
                        : accentColor === "sky"
                        ? "bg-sky/30"
                        : accentColor === "earth"
                        ? "bg-earth/30"
                        : accentColor === "leaf"
                        ? "bg-leaf/30"
                        : accentColor === "sun"
                        ? "bg-sun/30"
                        : "bg-ocean/30"
                    }`}
                  />
                  <Avatar
                    className={`h-[128px] w-[128px] md:h-[128px] md:w-[128px] border-4 border-white dark:border-slate-700 shadow-lg transition-transform group-hover:scale-105 ${
                      accentColor === "care"
                        ? "group-hover:shadow-care/40"
                        : accentColor === "sky"
                        ? "group-hover:shadow-sky/40"
                        : accentColor === "earth"
                        ? "group-hover:shadow-earth/40"
                        : accentColor === "leaf"
                        ? "group-hover:shadow-leaf/40"
                        : accentColor === "sun"
                        ? "group-hover:shadow-sun/40"
                        : "group-hover:shadow-ocean/40"
                    }`}
                  >
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
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2 dark:text-foreground ${
                      accentColor === "care"
                        ? "bg-care/10 text-care border-care/20"
                        : accentColor === "sky"
                        ? "bg-sky/10 text-sky border-sky/20"
                        : accentColor === "earth"
                        ? "bg-earth/10 text-earth border-earth/20"
                        : accentColor === "leaf"
                        ? "bg-leaf/10 text-leaf border-leaf/20"
                        : accentColor === "sun"
                        ? "bg-sun/10 text-sun border-sun/20"
                        : "bg-ocean/10 text-ocean border-ocean/20"
                    }`}>
                      {m.role}
                    </span>
                  )}
                  {m.location && (
                    <div className="mb-2" aria-label={`Location for ${m.name}`}>
                      <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground border border-border px-2 py-0.5 text-[11px]">
                        {m.location}
                      </span>
                    </div>
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
                    <>
                      {m.credentialsSummary
                        .split("\n")
                        .filter((line) => line.trim().length > 0)
                        .map((line, i) => (
                          <p key={i} className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3">
                            {line.trim()}
                          </p>
                        ))}
                    </>
                  )}
                  {isMobileOrTablet ? (
                    <Sheet open={open} onOpenChange={(o) => { if (!o) setSelected(null); setOpen(o); }}>
                      <SheetTrigger asChild>
                        <Button
                          aria-label={`Read bio for ${m.name}`}
                          onClick={() => { setSelected(m); setOpen(true); }}
                          className={`mt-1 ${
                            accentColor === "care"
                              ? "hover:shadow-care/25"
                              : accentColor === "sky"
                              ? "hover:shadow-sky/25"
                              : accentColor === "earth"
                              ? "hover:shadow-earth/25"
                              : accentColor === "leaf"
                              ? "hover:shadow-leaf/25"
                              : accentColor === "sun"
                              ? "hover:shadow-sun/25"
                              : "hover:shadow-ocean/25"
                          }`}
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
                      className={`mt-1 ${
                        accentColor === "care"
                          ? "hover:shadow-care/25"
                          : accentColor === "sky"
                          ? "hover:shadow-sky/25"
                          : accentColor === "earth"
                          ? "hover:shadow-earth/25"
                          : accentColor === "leaf"
                          ? "hover:shadow-leaf/25"
                          : accentColor === "sun"
                          ? "hover:shadow-sun/25"
                          : "hover:shadow-ocean/25"
                      }`}
                    >
                      Read Bio
                    </Button>
                  )}
                </div>
              </CardContent>
              <div
                className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-60 transition blur-sm ${
                  accentColor === "care"
                    ? "bg-care"
                    : accentColor === "sky"
                    ? "bg-sky"
                    : accentColor === "earth"
                    ? "bg-earth"
                    : accentColor === "leaf"
                    ? "bg-leaf"
                    : accentColor === "sun"
                    ? "bg-sun"
                    : "bg-ocean"
                }`}
              />
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
