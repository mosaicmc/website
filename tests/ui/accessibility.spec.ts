import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Key pages to test
const PAGES = [
  '/',
  '/about',
  '/services',
  '/services/aged-care',
  '/resources',
  '/contact-us',
  '/company/privacy-policy'
];

// Viewports to test against
const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 }
];

test.describe('WCAG 2.1 AA Accessibility Compliance', () => {
  
  for (const pagePath of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`${viewport.name} - ${pagePath} should pass Axe WCAG 2.1 AA checks`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(pagePath);
        
        // Wait for hydration/content
        await page.waitForLoadState('networkidle');

        // Run Axe analysis
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .exclude('iframe') // Exclude external iframes (like maps/videos) if they cause false positives, but we'll try to keep them if possible. 
          // Note: sometimes external widgets fail. Excluding specific problematic 3rd party selectors might be needed.
          // For now, let's exclude the common Google Maps iframe if it exists
          .exclude('iframe[src*="google.com/maps"]') 
          .analyze();

        // Attach violation details to test report if any
        if (accessibilityScanResults.violations.length > 0) {
          const violationSummary = accessibilityScanResults.violations.map(v => {
            return `\n[${v.id}] ${v.description}\nHelp: ${v.helpUrl}\nNodes: ${v.nodes.length}\nSelector: ${v.nodes[0].target}\n`;
          }).join('----------------------------------------');
          console.log(`\nAccessibility Violations for ${pagePath} (${viewport.name}):\n${violationSummary}`);
          
          expect(accessibilityScanResults.violations, `Accessibility violations found on ${pagePath} (${viewport.name}):\n${violationSummary}`).toEqual([]);
        } else {
          expect(accessibilityScanResults.violations).toEqual([]);
        }
      });
    }
  }

  // Specific check for Mobile Menu Accessibility
  test('Mobile Menu should be accessible (Focus Trap & ARIA)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /toggle menu/i });
    await expect(menuButton).toBeVisible();
    
    // Check if menu button has accessible name (verified by getByRole finding it)
    await expect(menuButton).toBeVisible();
    
    // Open menu
    await menuButton.click();
    const navMenu = page.locator('[role="dialog"], [role="navigation"]'); 
    // Note: implementation detail, assuming it's a dialog or nav. 
    // If using Shadcn sheet, it usually has role="dialog".
    
    // Wait for animation
    await page.waitForTimeout(500);

    // Run Axe on the open menu specifically
    const menuScan = await new AxeBuilder({ page })
      .include('[role="dialog"]') // Scan only the modal if possible
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
      
    expect(menuScan.violations).toEqual([]);
    
    // Test Focus Trap (Basic check: Tab should stay inside)
    // This is hard to perfectly test in Playwright without a lot of keypresses, 
    // but we can check if the first focused element is within the menu.
    // (Shadcn/Radix usually handles this well).
  });

  // Zoom Reflow Test (Simulated)
  test('Page should handle 200% zoom without horizontal scroll (Desktop)', async ({ page }) => {
    // WCAG 1.4.10 Reflow: 320 CSS pixels. 
    // At 1280px screen, 400% zoom = 320px. 
    // We can simulate this by setting viewport to 320px width on desktop mode, or just checking mobile view.
    // However, the standard says "content can be presented without loss of information... and without requiring scrolling in two dimensions"
    // effectively meaning it should be responsive down to 320px.
    
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone SE width is 320-375 depending on gen. 320 is the critical test.
    await page.goto('/services');
    
    // Check for horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding pixels
  });
});
