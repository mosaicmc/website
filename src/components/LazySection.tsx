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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
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
