"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getTranslationTarget, isTranslationActive } from "@/lib/google-translate";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SimpleWordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function SimpleWordRotator({
  words,
  interval = 3000,
  className,
}: SimpleWordRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [translationActive, setTranslationActive] = useState(isTranslationActive);

  const triggerGoogleTranslate = useCallback(() => {
    const targetLang = getTranslationTarget() || "en";
    if (!targetLang || targetLang === "en") return;
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (!select) return;
    if (select.value !== targetLang) {
      select.value = targetLang;
    }
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }, []);

  useEffect(() => {
    if (!words.length || prefersReducedMotion || translationActive) return undefined;
    const timer = window.setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => window.clearInterval(timer);
  }, [words.length, interval, prefersReducedMotion, translationActive]);

  useEffect(() => {
    if (prefersReducedMotion || translationActive) return;
    const target = getTranslationTarget() || "en";
    if (target === "en") return;
    const id = window.setTimeout(() => {
      triggerGoogleTranslate();
    }, 60);
    return () => window.clearTimeout(id);
  }, [currentIndex, prefersReducedMotion, translationActive, triggerGoogleTranslate]);

  useEffect(() => {
    if (translationActive) {
      setCurrentIndex(0);
      setIsVisible(true);
    }
  }, [translationActive]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      setTranslationActive(isTranslationActive());
    };
    window.addEventListener('google-translate:refresh', handler as EventListener);
    return () => window.removeEventListener('google-translate:refresh', handler as EventListener);
  }, []);

  if (!words.length) return null;
  if (prefersReducedMotion || translationActive) {
    return (
      <span className={cn("inline-block", className)} translate="yes">
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-block relative text-left px-1 sm:px-2 py-0 leading-[1.1] min-h-[1.4em] flipwords-gradient transition-all duration-300 ease-in-out drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
      translate="yes"
    >
      {words[currentIndex]}
    </span>
  );
}
