import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockGoogleReviews(page);
});

const routes = [
  '/',
  '/about',
  '/services',
  '/services/settlement-support',
  '/services/aged-care',
  '/services/family-support',
  '/services/community-engagement',
  '/get-involved',
  '/resources',
  '/resources/emergency-translation',
  '/resources/annual-reports',
  '/company/news',
  '/contact-us',
];

// Skipped as stories page is hidden but preserved
test.skip('no stories links on routes', () => {
  for (const route of routes) {
    test(`no stories links on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('a[href="/stories"]')).toHaveCount(0);
    });
  }
});

test.skip('stories route is not accessible', async ({ page }) => {
  await page.goto('/stories');
  await expect(page.locator('h1:has-text("Stories & Impact")')).toHaveCount(0);
  await expect(page.locator('a[href="/stories"]')).toHaveCount(0);
});
