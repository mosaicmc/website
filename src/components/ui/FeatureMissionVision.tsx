import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Stars } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeatureMissionVision({
  mission,
  vision,
}: {
  mission: string;
  vision: string;
}) {
  const { t } = useTranslation();
  const missionRef = React.useRef<HTMLDivElement | null>(null);
  const visionRef = React.useRef<HTMLDivElement | null>(null);
  const [mismatch, setMismatch] = React.useState(false);

  const syncHeights = React.useCallback(() => {
    const m = missionRef.current;
    const v = visionRef.current;
    if (!m || !v) {
      if (import.meta.env.DEV) {
        console.warn("FeatureMissionVision: refs missing, unable to sync sizes");
      }
      return;
    }
    m.style.height = "auto";
    v.style.height = "auto";
    const mh = m.getBoundingClientRect().height;
    const vh = v.getBoundingClientRect().height;
    const maxH = Math.max(mh, vh);
    if (!Number.isFinite(maxH) || maxH <= 0) {
      if (import.meta.env.DEV) {
        console.warn("FeatureMissionVision: invalid measurements", { mh, vh, maxH });
      }
      return;
    }
    const next = `${Math.ceil(maxH)}px`;
    if (m.style.height !== next) m.style.height = next;
    if (v.style.height !== next) v.style.height = next;
    const delta = Math.abs(mh - vh);
    setMismatch(delta > 0.5);
  }, []);

  React.useEffect(() => {
    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncHeights);
    };
    run();
    const roMission = new ResizeObserver(run);
    const roVision = new ResizeObserver(run);
    const moConfig: MutationObserverInit = { childList: true, subtree: true, characterData: true };
    const moMission = new MutationObserver(run);
    const moVision = new MutationObserver(run);
    if (missionRef.current) {
      roMission.observe(missionRef.current);
      moMission.observe(missionRef.current, moConfig);
    }
    if (visionRef.current) {
      roVision.observe(visionRef.current);
      moVision.observe(visionRef.current, moConfig);
    }
    const onResize = () => run();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      roMission.disconnect();
      roVision.disconnect();
      moMission.disconnect();
      moVision.disconnect();
    };
  }, [syncHeights]);

  return (
    <section
      aria-labelledby="mission-vision-title"
      className="relative py-16 bg-background transition-colors duration-300"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-sand/40 via-transparent to-ocean/10 dark:from-white/10 dark:to-sky/15"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center rounded-full bg-sand/60 dark:bg-white/10 border border-border px-4 py-1 text-xs font-medium text-foreground shadow-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky animate-pulse"></span>
            <span id="mission-vision-title">{t('common.missionAndVision')}</span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t('common.ourMissionAndVision')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <div
            ref={missionRef}
            className="h-full"
          >
            <Card
              aria-label={t('about.mission')}
              className={`relative p-6 rounded-3xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition h-full ${mismatch ? "ring-2 ring-sky" : ""}`}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                  <Target
                    aria-hidden="true"
                    className="h-6 w-6 text-ocean dark:text-sky"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">{t('about.mission')}</h3>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground whitespace-normal break-words leading-relaxed">
                  {mission}
                </p>
              </CardContent>
              {mismatch && (
                <div
                  aria-live="polite"
                  className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-sand/70 dark:bg-white/10 border border-border text-foreground"
                >
                  {t('common.sizeMismatch')}
                </div>
              )}
            </Card>
          </div>
          <div
            ref={visionRef}
            className="h-full"
          >
            <Card
              aria-label={t('about.vision')}
              className={`relative p-6 rounded-3xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition h-full ${mismatch ? "ring-2 ring-sky" : ""}`}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Stars aria-hidden="true" className="h-6 w-6 text-ocean dark:text-sky" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">{t('about.vision')}</h3>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground whitespace-normal break-words leading-relaxed">
                  {vision}
                </p>
              </CardContent>
              {mismatch && (
                <div
                  aria-live="polite"
                  className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-sand/70 dark:bg-white/10 border border-border text-foreground"
                >
                  {t('common.sizeMismatch')}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
