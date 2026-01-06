import { test, expect } from '@playwright/test';

test.describe('Skip link and navigation focus', () => {
  test('skip link appears on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeVisible();
  });

  test('header About link receives focus and shows ring', async ({ page }) => {
    await page.goto('/');
    const about = page.getByRole('link', { name: 'About' });
    await about.focus();
    await expect(about).toBeFocused();
    const boxShadow = await about.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toEqual('none');
  });

  test('clicking About navigates successfully', async ({ page }) => {
    await page.goto('/');
    const about = page.getByRole('link', { name: 'About' });
    await about.click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByText('Our Values', { exact: true })).toBeVisible();
  });
});

test.describe('Resources anchors focus', () => {
  test('anchors on resources page show focus ring', async ({ page }) => {
    await page.goto('/resources');
    const brochuresLink = page.getByRole('link', { name: 'View' }).first();
    await brochuresLink.focus();
    await expect(brochuresLink).toBeFocused();
    const boxShadow = await brochuresLink.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(boxShadow).not.toEqual('none');
  });
});
