"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const hasWords = Array.isArray(words) && words.length > 0;
  const [currentWord, setCurrentWord] = useState(words[0] || "");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    if (!hasWords) return;
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words, hasWords]);

  useEffect(() => {
    if (!hasWords || prefersReducedMotion) return undefined;
    if (!isAnimating) {
      const timeout = window.setTimeout(() => {
        startAnimation();
      }, duration);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [isAnimating, duration, startAnimation, hasWords, prefersReducedMotion]);

  if (!hasWords) {
    return null;
  }

  if (prefersReducedMotion) {
    return (
      <span className={cn("inline-block", className)}>
        {words[0]}
      </span>
    );
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -20,
          scale: 0.8,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left px-1 sm:px-2 py-0 leading-[1.1] min-h-[1.4em] overflow-visible flipwords-gradient",
          className
        )}
        key={currentWord}
      >
        {/* Simplified animation for better performance and mobile compatibility */}
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: wordIndex * 0.1,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.1 + letterIndex * 0.02,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
