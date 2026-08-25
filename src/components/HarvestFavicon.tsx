"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { assetPath } from "@/lib/utils";

const FAVICON_SELECTOR = 'link[rel="icon"]';
const HARVEST_ICON_HREF = assetPath("/images/harvest-logo.svg");

/**
 * Temporarily swaps the site favicon to the HARVEST program logo while the
 * visitor is browsing HARVEST pages, restoring the original site favicons
 * on navigation away.
 */
export function HarvestFavicon() {
  const location = useLocation();
  const isHarvestMode = location.pathname.startsWith("/services/harvest");

  useEffect(() => {
    const existingLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>(FAVICON_SELECTOR)
    );

    if (!isHarvestMode) {
      return;
    }

    const originalState = existingLinks.map((link) => ({
      link,
      href: link.href,
      type: link.type,
    }));

    existingLinks.forEach((link) => {
      link.href = HARVEST_ICON_HREF;
      link.type = "image/svg+xml";
    });

    return () => {
      originalState.forEach(({ link, href, type }) => {
        link.href = href;
        link.type = type;
      });
    };
  }, [isHarvestMode]);

  return null;
}
