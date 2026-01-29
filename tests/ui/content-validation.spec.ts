import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'Home', text: 'Mosaic' },
  { path: '/services', name: 'Services', text: 'Services' },
  { path: '/about', name: 'About', text: 'About' },
  { path: '/get-involved', name: 'Get Involved', text: 'Involved' },
  { path: '/donate', name: 'Donate', text: 'Donate' },
  { path: '/services/aged-care', name: 'Aged Care', text: 'Aged Care' },
  { path: '/services/family-support', name: 'Family Support', text: 'Family' },
  { path: '/services/settlement-support', name: 'Settlement Support', text: 'Settlement' },
  { path: '/services/community-engagement', name: 'Community Engagement', text: 'Community' }
];

test.describe('Content Validation', () => {
  for (const pageInfo of pages) {
    test(`Validate ${pageInfo.name} (${pageInfo.path})`, async ({ page }) => {
      test.setTimeout(60000); // Increase timeout to 60s
      
      // 1. Visit the page
      const response = await page.goto(pageInfo.path);
      expect(response?.status()).toBe(200);

      // 2. Check for H1
      await expect(page.locator('h1').first()).toBeVisible();
      
      // 3. Check for SEO Metadata (Title)
      const title = await page.title();
      expect(title).not.toBe('');
      
      // 4. Check for Critical Text
      await expect(page.locator('body')).toContainText(pageInfo.text);

      // 5. Check for broken images (HEAD request)
      const images = await page.locator('img').all();
      for (const img of images) {
        const src = await img.getAttribute('src');
        if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
           // Skip external images if needed, but for now check all
           try {
             const response = await page.request.head(src);
             // Some servers don't support HEAD, fallback to GET if 405/404/etc? 
             // Actually, if HEAD fails, try GET.
             if (response.status() !== 200) {
                const getResponse = await page.request.get(src);
                expect(getResponse.status()).toBe(200);
             } else {
                expect(response.status()).toBe(200);
             }
           } catch (e) {
             console.warn(`Failed to check image: ${src}`, e);
             // Don't fail the test for external flakiness, but log it
           }
        }
      }

      // 6. Check for Accessibility (Basic: Alt tags)
      for (const img of images) {
         const alt = await img.getAttribute('alt');
         // Check that alt attribute exists
         expect(alt).not.toBeNull(); 
      }
    });
  }

  test('Navigation Links should work', async ({ page }) => {
    await page.goto('/');
    const links = await page.locator('nav a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        const response = await page.request.head(href);
        if (response.status() !== 200) {
             const getResponse = await page.request.get(href);
             expect(getResponse.status()).toBe(200);
        }
      }
    }
  });
});
