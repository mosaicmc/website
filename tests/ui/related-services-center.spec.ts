import { test, expect } from '@playwright/test';

const STORIES_ENABLED = process.env.VITE_FEATURE_STORIES_PAGE === 'true';

const basePaths = [
  '/services',
  '/services/settlement-support',
  '/about',
];

const paths = STORIES_ENABLED ? [...basePaths, '/stories'] : basePaths;

test.describe('Related Services section is centered', () => {
  for (const path of paths) {
    test(`Section centered on ${path}`, async ({ page }) => {
      await page.goto(path);
      const tag = page.getByText('Related Services');
      await expect(tag).toBeVisible();
      const section = await tag.evaluateHandle((el) => el.closest('section'));
      const hasCenterClass = await section.evaluate((sec) => sec?.className.includes('section-center'));
      expect(hasCenterClass).toBe(true);
      const grid = await section.evaluateHandle((sec) => sec?.querySelector('.grid'));
      const justifyItems = await grid.evaluate((g) => getComputedStyle(g as Element).justifyItems);
      expect(justifyItems === 'center' || justifyItems === 'normal').toBeTruthy();
    });
  }
});
