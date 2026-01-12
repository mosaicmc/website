import { test, expect } from '@playwright/test';

test.describe('Translation Flags – pure i18n', () => {
  test('switches to RU and updates html lang without reload', async ({ page }) => {
    await page.goto('/');
    const ruButton = page.getByRole('button', { name: 'Change language to RU' });
    await ruButton.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  });

  test('switches to AR and sets rtl, then back to EN', async ({ page }) => {
    await page.goto('/');
    const arButton = page.getByRole('button', { name: 'Change language to AR' });
    await arButton.click();
    
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    const enButton = page.getByRole('button', { name: 'Change language to EN' });
    await enButton.click();
    
    // EN might clear the dir or set it to ltr
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    // dir usually resets to ltr or is removed (default ltr)
    // We can check if it's ltr OR empty
    const dir = await page.getAttribute('html', 'dir');
    expect(!dir || dir === 'ltr').toBeTruthy();
  });
});
