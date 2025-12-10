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

    // Verify card dimensions scale wider and shorter at desktop
    const badge = page.getByText('Testimonials', { exact: true });
    const section = badge.locator('xpath=ancestor::section[1]');
    const card = section.locator('.group').first();
    const rectDesktop = await card.evaluate((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });
    expect(rectDesktop.width).toBeGreaterThanOrEqual(360); // w-96 ~ 384px
    expect(rectDesktop.height).toBeLessThanOrEqual(220);

    const quote = section.locator('blockquote').first();
    const fontSize = await quote.evaluate((el: HTMLElement) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(16); // readability
  });

  test('responsive width vs height scaling', async ({ page }) => {
    // Compare mobile vs desktop card dimensions for proportional change
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173/');
    const badge = page.getByText('Testimonials', { exact: true });
    const section = badge.locator('xpath=ancestor::section[1]');
    const card = section.locator('.group').first();
    const rectMobile = await card.evaluate((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:5173/');
    const rectDesktop = await card.evaluate((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });

    expect(rectDesktop.width).toBeGreaterThanOrEqual(rectMobile.width * 1.3);
    expect(rectDesktop.height).toBeLessThanOrEqual(rectMobile.height * 0.95);
  });

  test('motion layout animation during resize', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('http://localhost:5173/');
    const badge = page.getByText('Testimonials', { exact: true });
    const section = badge.locator('xpath=ancestor::section[1]');
    const rowLeft = section.locator('[data-testid="row-left"]');

    const transformBefore = await rowLeft.evaluate((el: HTMLElement) => getComputedStyle(el).transform);
    expect(transformBefore === 'none' || transformBefore === 'matrix(1, 0, 0, 1, 0, 0)').toBeTruthy();

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(30);

    const transformDuring = await rowLeft.evaluate((el: HTMLElement) => getComputedStyle(el).transform);
    expect(transformDuring === 'none').toBeFalsy();

    await page.waitForTimeout(600);
    const transformAfter = await rowLeft.evaluate((el: HTMLElement) => getComputedStyle(el).transform);
    expect(transformAfter === 'none' || transformAfter === 'matrix(1, 0, 0, 1, 0, 0)').toBeTruthy();
  });
});
