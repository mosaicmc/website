import { test, expect } from '@playwright/test';

test.describe('Board of Directors (team6) section', () => {
  const breakpoints = [
    { name: 'mobile', size: { width: 375, height: 800 } },
    { name: 'tablet', size: { width: 768, height: 1024 } },
    { name: 'desktop', size: { width: 1280, height: 900 } },
  ];

  for (const bp of breakpoints) {
    test(`renders and is accessible at ${bp.name}`, async ({ page }) => {
      await page.setViewportSize(bp.size);
      await page.goto('/about');

      const sandraHeading = page.getByRole('heading', { name: 'Sandra Feltham' });
      await expect(sandraHeading).toBeVisible();
      await sandraHeading.scrollIntoViewIfNeeded();

      const sandraImg = page.getByAltText('Sandra Feltham');
      await expect(sandraImg).toBeVisible();

      const socialLink = page.getByLabel('Sandra Feltham on LinkedIn');
      await expect(socialLink).toBeVisible();
      await socialLink.focus();
      await expect(socialLink).toBeFocused();

      const readBio = sandraHeading.locator('xpath=following::button[contains(., "Read Bio")]').first();
      await expect(readBio).toBeVisible();

      const zachLanguages = page.getByLabel('Languages for Zachary Ekandi');
      await expect(zachLanguages).toBeVisible();
    });
  }
});
