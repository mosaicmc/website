import { test, expect, Page } from '@playwright/test';

test.describe('AgedCare eligibility section alignment', () => {
  async function getSection(page: Page) {
    await page.goto('http://localhost:5173/services/aged-care');
    const heading = page.getByRole('heading', { level: 2, name: 'Who Can Access Our Services?' });
    await expect(heading).toBeVisible({ timeout: 20000 });
    const section = heading.locator('xpath=ancestor::section[1]');
    const grid = section.locator('div').filter({ hasText: '' }).nth(0);
    return { section, grid };
  }

  test('desktop alignment and snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const { section } = await getSection(page);

    const textCol = section.locator('.space-y-4').first();
    const imageCol = section.locator('img[alt="Multicultural home care support"]').first();

    const textRect = await textCol.evaluate((el: HTMLElement) => el.getBoundingClientRect());
    const imgRect = await imageCol.evaluate((el: HTMLElement) => el.getBoundingClientRect());

    const textCenterY = textRect.top + textRect.height / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2;
    expect(Math.abs(textCenterY - imgCenterY)).toBeLessThanOrEqual(32);

    await expect(section).toHaveScreenshot('agedcare-eligibility-desktop.png');
  });

  test('tablet alignment and snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 900 });
    const { section } = await getSection(page);
    await expect(section).toHaveScreenshot('agedcare-eligibility-tablet.png');
  });

  test('mobile alignment and snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    const { section } = await getSection(page);
    await expect(section).toHaveScreenshot('agedcare-eligibility-mobile.png');
  });
});
