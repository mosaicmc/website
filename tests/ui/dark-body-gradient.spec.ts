import { test, expect } from '@playwright/test';

const paths = ['/', '/services', '/about'];
const sizes = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const p of paths) {
  test.describe(`Dark body gradient on ${p}`, () => {
    for (const s of sizes) {
      test(`renders gradient at ${s.name}`, async ({ page }) => {
        await page.setViewportSize({ width: s.width, height: s.height });
        await page.goto(p);
        const hasDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        expect(hasDark).toBeTruthy();
        const bgImage = await page.evaluate(() => getComputedStyle(document.body).backgroundImage);
        const attach = await page.evaluate(() => getComputedStyle(document.body).backgroundAttachment);
        expect(bgImage.includes('linear-gradient')).toBeTruthy();
        expect(attach).toBe('fixed');
      });
    }
  });
}

