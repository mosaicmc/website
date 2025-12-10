import { test, expect } from '@playwright/test';

test.describe('Homepage hero image loads responsively', () => {
  test('Hero image is visible and loaded', async ({ page }) => {
    await page.goto('/');
    const img = page.getByAltText('Diverse group of young people celebrating together in a library setting');
    await expect(img).toBeVisible();
    await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const el = document.querySelector('img[alt="Diverse group of young people celebrating together in a library setting"]') as HTMLImageElement | null;
      return !!el && el.naturalWidth > 0;
    });
  });
});

