import type { Metadata, Viewport } from "next";
import Script from "next/script";
import ClientLayout from "./client-layout";
import "./globals.css";

const SITE_URL = "https://www.mosaicmc.org.au/";
const ORG_NAME = "Mosaic Multicultural Connections";
const DEFAULT_DESCRIPTION =
  "Settlement support, aged care, family services, and community engagement across NSW.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mosaic Multicultural Connections | Support for NSW Communities",
    template: "%s | Mosaic Multicultural Connections",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "multicultural support",
    "NSW",
    "settlement services",
    "home care",
    "family support",
    "community engagement",
  ],
  openGraph: {
    type: "website",
    siteName: ORG_NAME,
    title: ORG_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "https://www.mosaicmc.org.au/og-image.jpg",
        width: 1200,
        height: 630,
        alt: ORG_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ORG_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["https://www.mosaicmc.org.au/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://mosaicmc.raisely.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.raisely.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.raisely.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mosaicmc.raisely.com" />
        <link rel="dns-prefetch" href="https://cdn.raisely.com" />
        <link rel="dns-prefetch" href="https://api.raisely.com" />
      </head>
      <body suppressHydrationWarning>
        <div
          id="google_translate_element"
          style={{ position: "absolute", left: "-9999px", top: 0 }}
        />
        <Script
          id="theme-preload"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('preferredTheme') || localStorage.getItem('theme');
                if (savedTheme === 'dark' || (!savedTheme)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`function googleTranslateElementInit() {
  if (!window.google || !window.google.translate) return;
  new window.google.translate.TranslateElement(
    { pageLanguage: 'en', autoDisplay: false },
    'google_translate_element'
  );
}`}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: ORG_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}images/logo.png`,
              sameAs: [
                "https://www.facebook.com/mosaicmc.org.au",
                "https://www.instagram.com/mosaicmc.org.au",
                "https://www.linkedin.com/company/mosaicmc",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+61-1800-813-205",
                  contactType: "customer service",
                  areaServed: "AU",
                  availableLanguage: ["en"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Newcastle",
                addressRegion: "NSW",
                postalCode: "2300",
                addressCountry: "AU",
                streetAddress: "456 Hunter Street",
              },
            }),
          }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: ORG_NAME,
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3E1M7JF0ZD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3E1M7JF0ZD');
          `}
        </Script>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
