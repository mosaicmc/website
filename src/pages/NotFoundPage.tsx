import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Mosaic Multicultural Connections</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-ocean mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return Home</Link>
        </Button>
      </Section>
    </>
  );
}
