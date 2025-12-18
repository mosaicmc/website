import { test, expect } from '@playwright/test';

const boardNames = [
  'Sandra Feltham',
  'Dr Shirley Schulz-Robinson',
  'Zachary Ekandi',
  'Felix Rajeev (Raj) Sirimanne',
  'Peter Gittins',
  'Catherine Candiloro',
  'Lauren Croiset',
];

test.describe('About page board avatars', () => {
  test('Board member images are visible and loaded', async ({ page }) => {
    await page.goto('/about');
    for (const name of boardNames) {
      const heading = page.getByRole('heading', { name });
      await expect(heading, `Expected card for ${name} to be visible`).toBeVisible();
      await heading.scrollIntoViewIfNeeded();
      const img = heading.locator('xpath=following::img[1]');
      await expect(img, `Expected image near ${name} to be visible`).toBeVisible();
      await page.waitForFunction(() => {
        const el = document.querySelector('img') as HTMLImageElement | null;
        return !!el && el.naturalWidth > 0 && el.naturalHeight > 0;
      });
    }
  });
});
