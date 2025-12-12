import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://mosaicmc.org.au';
const ORG_NAME = 'Mosaic Multicultural Connections';
const GEO_REGION = 'AU-NSW';
const GEO_PLACENAME = 'Newcastle, NSW';
const GEO_POSITION = '-32.926;151.781';

export default function DefaultSEO() {
  const location = useLocation();
  const canonical = `${SITE_URL}${location.pathname}`;
  const ogUrl = canonical;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      'https://www.facebook.com/mosaicmc.org.au',
      'https://www.instagram.com/mosaicmc.org.au',
      'https://www.linkedin.com/company/mosaicmc',
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+61-1800-813-205',
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: ['en'],
    }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newcastle',
      addressRegion: 'NSW',
      postalCode: '2300',
      addressCountry: 'AU',
      streetAddress: '456 Hunter Street',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Breadcrumb JSON-LD removed

  return (
    <Helmet>
      <html lang="en-AU" />
      <meta httpEquiv="Content-Language" content="en-AU" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-au" href={canonical} />

      <meta property="og:locale" content="en_AU" />
      <meta property="og:site_name" content={ORG_NAME} />
      <meta property="og:url" content={ogUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mosaicmc" />

      <meta name="robots" content="index,follow" />
      <meta name="geo.region" content={GEO_REGION} />
      <meta name="geo.placename" content={GEO_PLACENAME} />
      <meta name="geo.position" content={GEO_POSITION} />
      <meta name="ICBM" content={GEO_POSITION.replace(';', ', ')} />

      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
    </Helmet>
  );
}
