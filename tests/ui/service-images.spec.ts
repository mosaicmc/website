import { test, expect } from '@playwright/test';

const alts = [
  'Community Engagement overview',
  'Family Services overview',
  'Home Care services overview',
  'Settlement Services overview',
];

const sizes = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

test.describe('All Services page images are responsive and accessible', () => {
  for (const s of sizes) {
    test(`/services shows all images at ${s.name}`, async ({ page }) => {
      await page.setViewportSize({ width: s.width, height: s.height });
      await page.goto('/services');
      for (const alt of alts) {
        const img = page.getByAltText(alt);
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
        await page.waitForFunction((altText) => {
          const el = document.querySelector(`img[alt="${altText}"]`) as HTMLImageElement | null;
          return !!el && el.naturalWidth > 0;
        }, alt, { timeout: 5000 });
      }
    });
  }
});
