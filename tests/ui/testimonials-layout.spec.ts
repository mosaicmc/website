import { test, expect, Page } from '@playwright/test';

async function assertLayout(page: Page) {
  await page.goto('http://localhost:5173/');
  const badge = page.getByText('Testimonials', { exact: true });
  await expect(badge).toBeVisible({ timeout: 20000 });
  const section = badge.locator('xpath=ancestor::section[1]');

  const paddings = await section.evaluate((el: HTMLElement) => {
    const s = getComputedStyle(el);
    return { pt: parseFloat(s.paddingTop), pb: parseFloat(s.paddingBottom) };
  });
  expect(paddings.pt).toBeLessThanOrEqual(56);
  expect(paddings.pb).toBeLessThanOrEqual(56);

  const headingEl = section.locator('h2').first();
  await expect(headingEl).toBeVisible();
  const hMb = await headingEl.evaluate((el: HTMLElement) => parseFloat(getComputedStyle(el).marginBottom));
  expect(hMb).toBeLessThanOrEqual(16);

  const quote = section.locator('blockquote').first();
  await expect(quote).toBeVisible();
  const qMb = await quote.evaluate((el: HTMLElement) => parseFloat(getComputedStyle(el).marginBottom));
  expect(qMb).toBeLessThanOrEqual(24);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const rowLeft = section.locator('.animate-scroll-left').first();
  const rowRight = section.locator('.animate-scroll-right').first();
  const leftAnim = await rowLeft.evaluate((el: HTMLElement) => getComputedStyle(el).animationName);
  const rightAnim = await rowRight.evaluate((el: HTMLElement) => getComputedStyle(el).animationName);
  expect(leftAnim === 'none' || leftAnim === '').toBeTruthy();
  expect(rightAnim === 'none' || rightAnim === '').toBeTruthy();
}

test.describe('Testimonials layout compression and accessibility', () => {
  test('mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await assertLayout(page);
  });

  test('tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await assertLayout(page);
  });

  test('desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await assertLayout(page);
  });
});
