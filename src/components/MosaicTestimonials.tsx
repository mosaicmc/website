"use client";

import React from 'react';
import { Testimonial04 } from '@/components/ui/testimonial-04';
import { normalizeTestimonialText } from '@/lib/testimonialsParser';

type TestimonialEntry = {
  name: string;
  role: string;
  testimonial: string;
  image?: string;
  origin?: string;
};

type TestimonialsPayload = {
  meta?: {
    bottomText?: string;
    badgeLabel?: string;
  };
  entries?: TestimonialEntry[];
};

const FALLBACK_TITLE = 'Mosaic Testimonials – Client & Volunteer Stories';
const FALLBACK_SUBTITLE = 'Warm, real experiences from clients and volunteers across our community';
const FALLBACK_BADGE = 'Mosaic Testimonials';
const FALLBACK_BOTTOM = '95% client satisfaction rate';

const MosaicTestimonials = () => {
  const [payload, setPayload] = React.useState<TestimonialsPayload | null>(null);

  React.useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        const response = await fetch('/testimonials.json');
        if (!response.ok) return;
        const data = (await response.json()) as TestimonialsPayload;
        if (isActive) setPayload(data);
      } catch {
        if (isActive) setPayload(null);
      }
    };

    load();
    return () => {
      isActive = false;
    };
  }, []);

  const items = (payload?.entries ?? [])
    .filter((entry) => entry && entry.testimonial)
    .slice(0, 14)
    .map((entry) => ({
      ...entry,
      testimonial: normalizeTestimonialText(entry.testimonial),
    }));

  if (!items.length) return null;

  return (
    <Testimonial04
      title={FALLBACK_TITLE}
      subtitle={FALLBACK_SUBTITLE}
      badgeLabel={payload?.meta?.badgeLabel ?? FALLBACK_BADGE}
      bottomText={payload?.meta?.bottomText ?? FALLBACK_BOTTOM}
      testimonials={items}
    />
  );
};

export default MosaicTestimonials;
