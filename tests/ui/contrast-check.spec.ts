import { test, expect } from '@playwright/test';

// Helper to calculate relative luminance
function getLuminance(r, g, b) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Helper to calculate contrast ratio
function getContrastRatio(fg, bg) {
  const lum1 = getLuminance(fg[0], fg[1], fg[2]);
  const lum2 = getLuminance(bg[0], bg[1], bg[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Helper to parse rgb/rgba string
function parseColor(colorStr) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

test.describe('Button Contrast Check', () => {
  test('Check contrast of buttons on hover', async ({ page }) => {
    // Go to Get Involved page
    await page.goto('/get-involved');

    // List of selectors to check
    const selectors = [
      // Nav trigger for Get Involved (active state since we are on the page)
      { name: 'Nav: Get Involved Trigger', selector: 'button:has-text("Get Involved")' },
      
      // Hero/Section buttons on Get Involved page (The 4 cards)
      { name: 'Card: Donate Now', selector: 'a:has-text("Donate Now")' },
      { name: 'Card: Volunteer with Us', selector: 'a:has-text("Volunteer with Us")' },
      { name: 'Card: View Careers', selector: 'a:has-text("View Careers")' },
      { name: 'Card: Find Support', selector: 'a:has-text("Find Support")' },
      
      // Also check Home page hero button
      // { name: 'Home: Explore Services', selector: 'a:has-text("Explore Our Services")' } // Will do in separate step
    ];

    for (const item of selectors) {
      console.log(`Checking ${item.name}...`);
      const locator = page.locator(item.selector).first();
      await expect(locator).toBeVisible();

      // Hover
      await locator.hover();
      await page.waitForTimeout(500); // Wait for transition

      // Get computed styles
      const color = await locator.evaluate((el) => window.getComputedStyle(el).color);
      const backgroundColor = await locator.evaluate((el) => window.getComputedStyle(el).backgroundColor);

      console.log(`${item.name} - Color: ${color}, Bg: ${backgroundColor}`);

      const fg = parseColor(color);
      const bg = parseColor(backgroundColor);

      if (fg && bg) {
        const contrast = getContrastRatio(fg, bg);
        console.log(`${item.name} - Contrast Ratio: ${contrast.toFixed(2)}`);
        
        // Fail if contrast is too low (AA requires 4.5:1, large text 3:1)
        // We'll warn for now to see results
        if (contrast < 3) {
            console.error(`LOW CONTRAST DETECTED for ${item.name}`);
        }
      } else {
        console.log(`Could not parse colors for ${item.name}`);
      }
    }
  });

  test('Check contrast of Home Hero button', async ({ page }) => {
      await page.goto('/');
      const selector = 'a:has-text("Explore Our Services")';
      const locator = page.locator(selector).first();
      await expect(locator).toBeVisible();

      await locator.hover();
      await page.waitForTimeout(500);

      const color = await locator.evaluate((el) => window.getComputedStyle(el).color);
      const backgroundColor = await locator.evaluate((el) => window.getComputedStyle(el).backgroundColor);

      console.log(`Home Hero - Color: ${color}, Bg: ${backgroundColor}`);
      
      const fg = parseColor(color);
      const bg = parseColor(backgroundColor);
      if (fg && bg) {
          const contrast = getContrastRatio(fg, bg);
          console.log(`Home Hero - Contrast Ratio: ${contrast.toFixed(2)}`);
          if (contrast < 3) {
            console.error(`LOW CONTRAST DETECTED for Home Hero`);
        }
      }
  });
});
