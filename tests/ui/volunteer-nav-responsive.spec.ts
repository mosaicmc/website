import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness Check', () => {
  test.use({ viewport: { width: 320, height: 568 } }); // iPhone 5/SE size

  test('volunteer page has no horizontal scroll', async ({ page }) => {
    await page.goto('/volunteer/armidale');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    
    if (scrollWidth > clientWidth) {
      console.log(`Horizontal scroll detected on Volunteer Page: ${scrollWidth} > ${clientWidth}`);
      // Find the culprit
      const culprit = await page.evaluate(() => {
        let maxRight = 0;
        let culpritEl = '';
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > document.documentElement.clientWidth) {
             const style = window.getComputedStyle(el);
             if (style.display !== 'none' && style.opacity !== '0' && style.visibility !== 'hidden') {
                if (rect.right > maxRight) {
                  maxRight = rect.right;
                  culpritEl = el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').join('.') : '');
                }
             }
          }
        });
        return culpritEl;
      });
      console.log(`Culprit element: ${culprit}`);
    }
    
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // Allow 1px rounding error

    // Verify text is hidden on mobile
    // The previous location name is "Central Coast" or similar.
    // We check that the span containing it has 'display: none' or similar.
    // Actually, we added 'hidden sm:block' class.
    // Playwright's toBeVisible() respects CSS visibility.
    
    // We need to find the specific span. It's aria-hidden="true".
    // Let's look for text "Central Coast" (prev of Armidale)
    const prevText = page.getByText('Central Coast').first();
    await expect(prevText).toBeHidden();

    const nextText = page.getByText('Tamworth').first();
    await expect(nextText).toBeHidden();

    // Current text "Armidale" should be visible
    const currentText = page.getByText('Armidale').first();
    await expect(currentText).toBeVisible();
  });
});
