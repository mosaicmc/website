import type { Metadata } from "next";
import translations from "@/locales/en/translation.json";

const DEFAULT_TITLE =
  translations.home?.meta?.title ||
  "Mosaic Multicultural Connections | Support for NSW Communities";
const DEFAULT_DESCRIPTION =
  translations.home?.meta?.description ||
  "Mosaic Multicultural Connections supports multicultural communities across NSW.";

const overrides: Record<string, Metadata> = {
  "/": {
    title: { absolute: DEFAULT_TITLE },
    description: DEFAULT_DESCRIPTION,
  },
  "/services": {
    title: { absolute: translations.servicesPage?.meta?.title || "Services | Mosaic Multicultural Connections" },
    description:
      translations.servicesPage?.meta?.description || DEFAULT_DESCRIPTION,
  },
  "/contact-us": {
    title: {
      absolute:
        translations.locationsPage?.meta?.title ||
        "Contact Mosaic Multicultural Connections — Get in touch",
    },
    description:
      translations.locationsPage?.meta?.description || DEFAULT_DESCRIPTION,
  },
  "/locations": {
    title: {
      absolute:
        translations.locationsPage?.meta?.title ||
        "Contact Mosaic Multicultural Connections — Get in touch",
    },
    description:
      translations.locationsPage?.meta?.description || DEFAULT_DESCRIPTION,
  },
  "/stories": {
    title: {
      absolute:
        translations.storiesPage?.meta?.title ||
        "Community Stories | Mosaic Multicultural Connections",
    },
    description:
      translations.storiesPage?.meta?.description || DEFAULT_DESCRIPTION,
  },
  "/donate": {
    title: { absolute: translations.donate?.meta?.title || "Donate | Mosaic Multicultural Connections" },
    description: translations.donate?.meta?.description || DEFAULT_DESCRIPTION,
  },
};

const toTitleCase = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function getMetadata(path: string): Metadata {
  if (overrides[path]) return overrides[path];
  const trimmed = path.replace(/\/$/, "");
  const segments = trimmed.split("/").filter(Boolean);
  const fallbackTitle = segments.length
    ? toTitleCase(segments[segments.length - 1])
    : DEFAULT_TITLE;
  return {
    title: fallbackTitle,
    description: DEFAULT_DESCRIPTION,
  };
}
