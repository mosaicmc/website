import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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

  useEffect(() => {
    if (!words.length || prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => window.clearInterval(timer);
  }, [words.length, interval, prefersReducedMotion]);

  if (!words.length) return null;
  if (prefersReducedMotion) {
    return (
      <span className={cn("inline-block", className)}>
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-block relative text-left px-1 sm:px-2 py-0 leading-[1.1] min-h-[1.4em] flipwords-gradient transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}
      translate="yes"
    >
      {words[currentIndex]}
    </span>
  );
}
