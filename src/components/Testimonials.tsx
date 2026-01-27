import React from 'react';
import { useTranslation } from 'react-i18next';
import { Testimonial04 } from './ui/testimonial-04';
import { normalizeTestimonialText } from '@/lib/testimonialsParser';

type LocalTestimonial = {
  text?: string;
  testimonial: string;
  name: string;
  role: string;
  origin: string;
  image?: string;
};

const Testimonials = () => {
  const { t } = useTranslation();

  // Get translations from i18n
  const title = t('testimonials.title');
  const subtitle = t('testimonials.subtitle');
  const bottomText = t('testimonials.bottomText');
  const badgeLabel = t('testimonials.badgeLabel');
  
  // Get items from i18n, ensuring we get an array
  const rawItems = t('testimonials.items', { returnObjects: true });
  const items: LocalTestimonial[] = Array.isArray(rawItems) ? rawItems : [];

  // Map the translation items to the expected format
  // We use a set of default images since the translation file doesn't contain image URLs
  const defaultImages = [
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
  ];

  const testimonials: LocalTestimonial[] = items.map((item, index) => ({
    testimonial: normalizeTestimonialText(item.text || item.testimonial),
    name: item.name,
    role: item.role,
    origin: item.origin,
    image: defaultImages[index % defaultImages.length]
  }));

  return (
    <Testimonial04 
      testimonials={testimonials}
      title={title}
      subtitle={subtitle}
      bottomText={bottomText}
      badgeLabel={badgeLabel}
    />
  );
};

export default Testimonials;
