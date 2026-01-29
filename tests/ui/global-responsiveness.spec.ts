import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/about',
  '/services',
  '/services/settlement-support',
  '/resources',
  '/contact-us',
  '/company/privacy-policy' // Representative policy page
];

const VIEWPORTS = [
  { name: 'Mobile (iPhone SE)', width: 375, height: 667 },
  { name: 'Mobile (Large)', width: 428, height: 926 },
  { name: 'Tablet (iPad)', width: 768, height: 1024 },
  { name: 'Tablet (iPad Pro)', width: 1024, height: 1366 }
];

test.describe('Global Responsiveness Check', () => {
  
  for (const viewport of VIEWPORTS) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      for (const path of PAGES) {
        test(`should render ${path} without horizontal scroll`, async ({ page }) => {
          await page.goto(path);
          await page.waitForLoadState('domcontentloaded');

          // Check for horizontal scroll
          const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
          const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

          // Allow a small buffer for sub-pixel rendering differences
          if (scrollWidth > clientWidth + 1) {
            console.log(`Overflow detected on ${path} [${viewport.name}]: ${scrollWidth} > ${clientWidth}`);
            
            // Log potential culprits
            const culprit = await page.evaluate(() => {
                let maxRight = 0;
                let culpritEl = '';
                const docWidth = document.documentElement.clientWidth;
                document.querySelectorAll('*').forEach(el => {
                  const rect = el.getBoundingClientRect();
                  const style = window.getComputedStyle(el);
                  if (rect.right > docWidth && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                        if (rect.right > maxRight) {
                          maxRight = rect.right;
                          culpritEl = `${el.tagName.toLowerCase()}${el.id ? '#'+el.id : ''}${el.className ? '.'+el.className.split(' ').join('.') : ''}`;
                        }
                  }
                });
                return culpritEl;
            });
            console.log(`Potential culprit: ${culprit}`);
          }

          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

          // Check Navigation
          // On Mobile and Tablet (< 1024px usually), we expect a hamburger menu
          // On larger Tablets (>= 1024px), it might be desktop nav depending on breakpoints
          // Tailwind 'xl' is 1280px. So < 1280 is mobile menu.
          
          if (viewport.width < 1280) { // Tailwind xl breakpoint
             const menuButton = page.getByRole('button', { name: /toggle menu/i });
             // It might be hidden if it's loading, wait a bit
             await expect(menuButton).toBeVisible();
          } else {
             // Desktop Nav check - ensure hamburger is HIDDEN
             const menuButton = page.getByRole('button', { name: /toggle menu/i });
             await expect(menuButton).toBeHidden();
             
             // Check for a desktop nav item like "About"
             // const desktopAboutLink = page.locator('nav').getByRole('link', { name: 'About', exact: true }).first();
             // Note: Depending on structure, "About" might be in a dropdown or top level.
             // Let's just check the Logo is visible
             const logo = page.locator('a[href="/"]').first();
             await expect(logo).toBeVisible();
          }
        });
      }
    });
  }
});
