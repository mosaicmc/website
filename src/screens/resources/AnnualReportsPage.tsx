"use client";

import { useEffect, useMemo, useState } from "react";
import RelatedServices from '@/components/RelatedServices';
import { FileText, ExternalLink } from "lucide-react";
import DecadeCards from '@/components/DecadeCards';
import { computeDecadeGroups } from '@/components/DecadeCards.data';
import Section from '@/components/ui/Section';
import { TrackedDownloadButton } from "@/components/TrackedDownloadButton";
import { DOWNLOAD_CATALOG } from "@/lib/downloadCatalog";
import { PDFAccessibilityNotice } from '@/components/ui/PDFAccessibilityNotice';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Report = { year: string; downloadId: string };

const reports: Report[] = [
  { year: "1991", downloadId: "annual-report-1991" },
  { year: "1992", downloadId: "annual-report-1992" },
  { year: "1993", downloadId: "annual-report-1993" },
  { year: "1994", downloadId: "annual-report-1994" },
  { year: "1995", downloadId: "annual-report-1995" },
  { year: "1996", downloadId: "annual-report-1996" },
  { year: "1997", downloadId: "annual-report-1997" },
  { year: "1998", downloadId: "annual-report-1998" },
  { year: "1999", downloadId: "annual-report-1999" },
  { year: "2000", downloadId: "annual-report-2000" },
  { year: "2001", downloadId: "annual-report-2001" },
  { year: "2002", downloadId: "annual-report-2002" },
  { year: "2003", downloadId: "annual-report-2003" },
  { year: "2004", downloadId: "annual-report-2004" },
  { year: "2005", downloadId: "annual-report-2005" },
  { year: "2006", downloadId: "annual-report-2006" },
  { year: "2007", downloadId: "annual-report-2007" },
  { year: "2008", downloadId: "annual-report-2008" },
  { year: "2009", downloadId: "annual-report-2009" },
  { year: "2010", downloadId: "annual-report-2010" },
  { year: "2011", downloadId: "annual-report-2011" },
  { year: "2012", downloadId: "annual-report-2012" },
  { year: "2013", downloadId: "annual-report-2013" },
  { year: "2014", downloadId: "annual-report-2014" },
  { year: "2015", downloadId: "annual-report-2015" },
  { year: "2016", downloadId: "annual-report-2016" },
  { year: "2017", downloadId: "annual-report-2017" },
  { year: "2018", downloadId: "annual-report-2018" },
  { year: "2019", downloadId: "annual-report-2019" },
  { year: "2020", downloadId: "annual-report-2020" },
  { year: "2021", downloadId: "annual-report-2021" },
  { year: "2022", downloadId: "annual-report-2022" },
  { year: "2023", downloadId: "annual-report-2023" },
  { year: "2024", downloadId: "annual-report-2024" },
  { year: "2025", downloadId: "annual-report-2025" },
];

export default function AnnualReportsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);
  const [activeDecade, setActiveDecade] = useState<string | null>(null);

  const groups = useMemo(() => computeDecadeGroups(reports), []);
  const decadeOrder = groups.map((g) => g.id);
  const latestYear = useMemo(() => {
    const nums = reports
      .map((r) => parseInt(r.year, 10))
      .filter((n) => Number.isFinite(n));
    return nums.length ? Math.max(...nums) : null;
  }, []);
  const latestYearStr = latestYear ? String(latestYear) : null;

  useEffect(() => {
    if (latestYearStr) {
      const r = reports.find((x) => x.year === latestYearStr);
      if (r) {
        setSelected(r);
        setOpen(true);
        setActiveDecade('2021-present');
      }
    }
  }, [latestYearStr]);

  const filteredReports = useMemo(() => {
    if (!activeDecade) return reports.slice().sort((a, b) => parseInt(b.year) - parseInt(a.year));
    const g = groups.find((x) => x.id === activeDecade);
    return (g?.items ?? []);
  }, [activeDecade, groups]);

  const goPrevDecade = () => {
    if (!activeDecade) return;
    const idx = decadeOrder.indexOf(activeDecade);
    if (idx > 0) setActiveDecade(decadeOrder[idx - 1]);
  };
  const goNextDecade = () => {
    if (!activeDecade) return;
    const idx = decadeOrder.indexOf(activeDecade);
    if (idx >= 0 && idx < decadeOrder.length - 1) setActiveDecade(decadeOrder[idx + 1]);
  };

  return (
    <div className="min-h-screen bg-background">
      

      <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
          <div className="text-center mb-10">
            <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">Annual Reports</h1>
            <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
              Click a year to open the report in a smooth side panel, or use the
              external link to download directly.
            </p>
            <PDFAccessibilityNotice className="mt-4" />
          </div>

          <div className="mb-8">
            <DecadeCards
              reports={reports}
              selected={activeDecade}
              onSelect={(id) => setActiveDecade((prev) => (prev === id ? null : id))}
            />
            <div className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">
              {activeDecade ? (
                <span>
                  Showing <span className="font-semibold text-foreground">{activeDecade}</span>
                </span>
              ) : (
                <span>Showing all years</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-center gap-3" role="navigation" aria-label="Decade navigation">
              <button
                className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 px-4 py-2 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                onClick={goPrevDecade}
                disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === 0}
                aria-disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === 0}
              >
                Previous Decade
              </button>
              <button
                className="inline-flex items-center rounded-full border border-border bg-card/70 dark:bg-card/30 px-4 py-2 text-sm text-foreground hover:bg-sand/50 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                onClick={goNextDecade}
                disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === decadeOrder.length - 1}
                aria-disabled={!activeDecade || decadeOrder.indexOf(activeDecade) === decadeOrder.length - 1}
              >
                Next Decade
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in-up">
            {filteredReports.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">No reports in this decade yet.</div>
            )}
            {filteredReports.map((r) => {
              const isLatest = latestYearStr ? r.year === latestYearStr : false;
              return (
                <div
                  key={r.year}
                  className={`relative rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md ${isLatest ? 'border-ocean ring-2 ring-ocean' : ''}`}
                  aria-label={isLatest ? `Annual Report ${r.year}, latest` : `Annual Report ${r.year}`}
                >
                  {isLatest && (
                    <span className="absolute top-2 right-2 rounded-full bg-ocean text-white text-xs px-2 py-1" aria-label="Latest report">
                      Latest
                    </span>
                  )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 text-primary p-3">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{r.year}</h3>
                      <p className="text-sm text-muted-foreground">Annual Report</p>
                    </div>
                  </div>
                  <TrackedDownloadButton
                    downloadId={r.downloadId}
                    renderTrigger={(onClick) => (
                      <button
                        type="button"
                        onClick={onClick}
                        className="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background rounded-full p-1"
                        aria-label={`Download Annual Report ${r.year}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </button>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => {
                      setSelected(r);
                      setOpen(true);
                    }}
                  >
                    Open in panel →
                  </button>
                </div>
                </div>
              );
            })}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <span className="sr-only">Open report</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>
                  {selected ? `Annual Report ${selected.year}` : "Annual Report"}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 h-[70vh]">
                {selected ? (
                  <iframe
                    src={encodeURI(DOWNLOAD_CATALOG.find(i => i.id === selected.downloadId)?.path || "")}
                    title={`Annual Report ${selected.year}`}
                    className="w-full h-full rounded-lg border"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">Select a report to view.</div>
                )}
              </div>
            </SheetContent>
          </Sheet>
      </Section>
      <RelatedServices />
    </div>
  );
}
