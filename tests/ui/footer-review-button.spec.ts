import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

test.describe('Footer – Review Us button', () => {
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('is visible and opens Google Reviews', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();
    const link = footer.locator('a').filter({ hasText: /leave a google review/i }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toBe('https://share.google/G2RRRo3M2HAuMbduE');
  });
});
