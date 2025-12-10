import { test, expect } from '@playwright/test';

test.describe('Removal of info bar and breadcrumbs', () => {
  test('Breadcrumbs nav is not present on core pages', async ({ page }) => {
    for (const path of ['/', '/about', '/services', '/contact']) {
      await page.goto(path);
      const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"]');
      await expect(breadcrumbs).toHaveCount(0);
    }
  });

  test('Info bar is removed from Settlement Support', async ({ page }) => {
    await page.goto('/services/settlement-support');
    await expect(page.getByText('Need Settlement Support Now?')).toHaveCount(0);
  });

  test('Info bar is removed from Family Support', async ({ page }) => {
    await page.goto('/services/family-support');
    await expect(page.getByText('Need Family Support Now?')).toHaveCount(0);
  });

  test('Info bar is removed from Aged Care', async ({ page }) => {
    await page.goto('/services/aged-care');
    await expect(page.getByText('The new Aged Care Act is now in effect')).toHaveCount(0);
  });
});
