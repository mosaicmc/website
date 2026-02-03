"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/Section';

export default function NotFoundPage() {
  return (
    <>
      
      
      <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-ocean dark:text-ocean-light mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Page Not Found</h2>
        <p className="text-slate-600 dark:text-muted-foreground max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return Home</Link>
        </Button>
      </Section>
    </>
  );
}
