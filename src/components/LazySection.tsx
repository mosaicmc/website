"use client";

import React from "react";
import { isTranslationActive } from "@/lib/google-translate";

type LazySectionProps = {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
};

export default function LazySection({
  children,
  className,
  minHeight = 320,
  rootMargin = "200px 0px",
}: LazySectionProps) {
  const [lazyDisabled, setLazyDisabled] = React.useState(() => isTranslationActive());
  const [isVisible, setIsVisible] = React.useState(() => lazyDisabled);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (lazyDisabled && !isVisible) {
      setIsVisible(true);
    }
  }, [lazyDisabled, isVisible]);

  React.useEffect(() => {
    if (!ref.current || isVisible || lazyDisabled) return;
    const node = ref.current;

    // Fallback: if the element is already within (or near) the viewport by the
    // time this effect runs, some environments never fire an initial
    // IntersectionObserver callback with isIntersecting=true. Check synchronously
    // so content isn't stuck behind an empty placeholder forever.
    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportHeight + 200 && rect.bottom > -200) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);

    // Extra safety net: periodically re-check position in case the observer
    // fails to fire (e.g. due to layout shifts happening before it attaches).
    const interval = window.setInterval(() => {
      const r = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh + 200 && r.bottom > -200) {
        setIsVisible(true);
      }
    }, 500);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [isVisible, lazyDisabled, rootMargin]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const disableLazy = isTranslationActive();
      setLazyDisabled(disableLazy);
      if (disableLazy) setIsVisible(true);
    };
    window.addEventListener('google-translate:refresh', handler as EventListener);
    return () => {
      window.removeEventListener('google-translate:refresh', handler as EventListener);
    };
  }, []);


  return (
    <div ref={ref} className={className} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}
