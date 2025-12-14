import { test, expect } from '@playwright/test';

test.describe('Section center alignment', () => {
  test('Contact page Section overlay is centered', async ({ page }) => {
    await page.goto('/contact-us');
    const centered = page.locator('section.section-center').first();
    await expect(centered).toBeVisible();
    await expect(centered).toHaveCSS('text-align', 'center');
  });

  test('Locations page CTA section is centered', async ({ page }) => {
    await page.goto('/locations');
    const centered = page.locator('section.section-center').first();
    await expect(centered).toBeVisible();
    await expect(centered).toHaveCSS('text-align', 'center');
  });
});
