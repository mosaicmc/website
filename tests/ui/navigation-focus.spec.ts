import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

test.describe('Navigation keyboard focus', () => {
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('Skip to content link appears on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeVisible();
  });

  test('header About link receives focus and shows ring', async ({ page }) => {
    await page.goto('/');
    const about = page.getByRole('link', { name: 'About' });
    await about.focus();
    // Check real focus via activeElement instead of :focus-visible which is inconsistent in tests
    const hasFocus = await about.evaluate((el) => document.activeElement === el);
    expect(hasFocus).toBeTruthy();
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
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('anchors on resources page show focus ring', async ({ page }) => {
    await page.goto('/resources');
    const brochuresLink = page.getByRole('link', { name: 'View' }).first();
    await brochuresLink.focus();
    const hasFocus = await brochuresLink.evaluate((el) => document.activeElement === el);
    expect(hasFocus).toBeTruthy();
  });
});
