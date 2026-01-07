import { test, expect } from '@playwright/test';

const sizes = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

test.describe('Color Contrast Test Block', () => {
  for (const s of sizes) {
    test(`before/after screenshots at ${s.name}`, async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('preferredTheme', 'dark');
      });
      await page.setViewportSize({ width: s.width, height: s.height });
      await page.goto('/tests/color-contrast');

      await page.waitForSelector('#test-block', { timeout: 15000 });
      const block = page.locator('#test-block');
      await expect(block).toBeVisible();

      // Original: black background
      const origBg = await block.evaluate((el) => getComputedStyle(el).backgroundColor);
      // rgb(18, 18, 18) corresponds to hsl(0, 0%, 7%) defined in index.css
      expect(origBg).toBe('rgb(18, 18, 18)');
      await page.screenshot({ path: `tests/ui/color-contrast.spec.ts-snapshots/original-${s.name}.png`, fullPage: true });

      // Apply bg-card (hsl(0 0% 3.9%) -> rgb(10, 10, 10))
      await page.locator('#toggle-bg').click();
      const newBg = await block.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(newBg).toBe('rgb(10, 10, 10)');
      await page.screenshot({ path: `tests/ui/color-contrast.spec.ts-snapshots/hex111215-${s.name}.png`, fullPage: true });
    });
  }
});
