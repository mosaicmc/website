import { test, expect } from '@playwright/test';

test.describe('Skip link and navigation focus', () => {
  test('skip link appears on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeVisible();
  });

  test('header About link receives focus and shows ring', async ({ page }) => {
    await page.goto('/');
    const about = page.getByRole('link', { name: 'About' });
    await about.focus();
    // Use focus-visible check instead of toBeFocused() for robustness
    const isFocusVisible = await about.evaluate((el) => el.matches(':focus-visible'));
    expect(isFocusVisible).toBeTruthy();
    // Use boxShadow check which is more consistent across browsers than :focus-visible for programmatic focus
    await expect(about).toHaveCSS('box-shadow', /rgb/);
  });

  test('clicking About navigates successfully', async ({ page }) => {
    await page.goto('/');
    const about = page.getByRole('link', { name: 'About' });
    await about.click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByText('Our Values', { exact: true })).toBeVisible();
  });
});

test.describe('Resources anchors focus', () => {
  test('anchors on resources page show focus ring', async ({ page }) => {
    await page.goto('/resources');
    const brochuresLink = page.getByRole('link', { name: 'View' }).first();
    await brochuresLink.focus();
    const isFocusVisible = await brochuresLink.evaluate((el) => el.matches(':focus-visible'));
    expect(isFocusVisible).toBeTruthy();
  });
});
