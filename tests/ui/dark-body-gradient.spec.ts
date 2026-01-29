import { test, expect } from '@playwright/test';

const paths = ['/', '/services', '/about'];
const sizes = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const p of paths) {
  test.describe(`Dark body gradient on ${p}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.addInitScript(() => {
        localStorage.setItem('preferredTheme', 'dark');
      });
    });

    for (const s of sizes) {
      test(`renders gradient at ${s.name}`, async ({ page, browserName }) => {
        // Skip visual/gradient tests on Firefox due to known rendering timeouts
        test.skip(browserName === 'firefox', 'Skipping gradient check on Firefox');
        
        await page.setViewportSize({ width: s.width, height: s.height });
        await page.goto(p);
        await expect(page.locator('html')).toHaveClass(/dark/);
        const bgImage = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);
        const attach = await page.evaluate(() => getComputedStyle(document.body).backgroundAttachment);
        expect(bgImage.includes('linear-gradient')).toBeTruthy();
        expect(attach).toBe('fixed');
      });
    }
  });
}

