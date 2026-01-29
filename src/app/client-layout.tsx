"use client";

import React, { Suspense } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import MosaicNavigation from "../components/MosaicNavigation";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import { ScrollToTopButton } from "../components/ui/floating-elements";
import { TopLoader } from "../components/ui/TopLoader";
import { PageSkeleton } from "../components/ui/Skeleton";
import { GoogleTranslateGuardrails } from "../components/GoogleTranslateGuardrails";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-page transition-colors duration-300" role="region" aria-label="Page content">
        <GoogleTranslateGuardrails />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <TopLoader />
        <MosaicNavigation />
        <main id="main-content">
          <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </ThemeProvider>
  );
}
