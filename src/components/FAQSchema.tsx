import React from 'react';
import { Helmet } from 'react-helmet-async';

type FAQ = { question: string; answer: string | React.ReactNode; schemaAnswer?: string };

export default function FAQSchema({ faqs, name }: { faqs: FAQ[]; name?: string }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: name ?? undefined,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.schemaAnswer || (typeof f.answer === 'string' ? f.answer : ''),
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Helmet>
  );
}

