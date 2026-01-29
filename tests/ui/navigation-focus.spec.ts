import { test, expect } from '@playwright/test';

import { mockGoogleReviews } from '../helpers';

test.describe('Navigation keyboard focus', () => {
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('Skip to content link appears on focus', async ({ page }) => {
    // Initial state: link should be hidden (sr-only)
    // Note: Playwright considers sr-only hidden
    await page.goto('/');
    
    // Press tab to focus the skip link (it's the first focusable element)
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeVisible();
  });

  test('about navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // Wait for main content
    await expect(page.getByRole('main')).toBeVisible();
    
    // Open navigation menu if present (mobile or collapsible nav)
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.count() > 0 && await menuButton.isVisible()) {
      await menuButton.click();
    }

    const aboutLink = page.getByRole('link', { name: /about/i }).first();
    await expect(aboutLink).toBeVisible();
    
    await aboutLink.click();
    await expect(page).toHaveURL(/about/);
  });

  test('resources page has focusable links', async ({ page }) => {
    await page.goto('/resources');
    
    // Wait for content
    await expect(page.getByRole('main')).toBeVisible();
    
    const links = page.locator('main a[href]');
    await expect(links.first()).toBeVisible();
    
    await links.first().focus();
    const hasFocus = await links.first().evaluate(
      el => document.activeElement === el
    );
    
    expect(hasFocus).toBeTruthy();
  });
});
