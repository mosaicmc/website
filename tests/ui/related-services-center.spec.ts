import { test, expect } from '@playwright/test';

const STORIES_ENABLED = process.env.VITE_FEATURE_STORIES_PAGE === 'true';

const basePaths = [
  '/services',
  '/services/settlement-support',
  '/about',
];

const paths = STORIES_ENABLED ? [...basePaths, '/stories'] : basePaths;

test.describe('Related Services section is visible', () => {
  for (const path of paths) {
    test(`Section visible on ${path}`, async ({ page }) => {
      await page.goto(path);
      
      // Semantic check: Look for the specific section heading
      
      // Scroll to the footer to trigger lazy loading of the Related Services section (which is at the bottom)
      await page.locator('footer').scrollIntoViewIfNeeded();

      const heading = page.getByRole('heading', { name: 'You May Also Be Interested In' });
      
      await expect(heading).toBeVisible();

      // Ensure the section containing the heading is present
      const section = page.locator('section').filter({ has: heading });
      await expect(section).toBeVisible();

      // Verify at least one service link is present and visible
      // The section contains links to related services
      const links = section.getByRole('link');
      await expect(links.first()).toBeVisible();
    });
  }
});
