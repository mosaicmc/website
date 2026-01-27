import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export const LanguageSEO: FC = () => {
  // Base URL from environment or default
  const baseUrl = window.location.origin;
  const currentPath = window.location.pathname;

  const currentLang = 'en';
  const languages = ['en'];

  return (
    <Helmet>
      {/* Current Language */}
      <html lang={currentLang} />
      
      {/* Hreflang Tags for SEO */}
      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}${currentPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}${currentPath}`}
      />
    </Helmet>
  );
};
