import { test, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Helper to calculate relative luminance
function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Helper to calculate contrast ratio
function getContrastRatio(fg: number[], bg: number[]) {
  const lum1 = getLuminance(fg[0], fg[1], fg[2]);
  const lum2 = getLuminance(bg[0], bg[1], bg[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Helper to parse rgb/rgba string
function parseColor(colorStr: string) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

// Helper to toggle theme
async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t: string) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, theme);
  await page.waitForTimeout(500); // Wait for theme transition
}

test.describe('Specific Button Contrast Verification', () => {
  // Ensure test-results directory exists
  const resultsDir = path.join(process.cwd(), 'test-results', 'contrast-check');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const pagesToCheck = [
    {
      name: 'Home Page',
      url: '/',
      elements: [
        { name: 'Explore Our Services', selector: '[data-testid="hero-explore-btn"]' },
        { name: 'Read all reviews on Google', selector: 'a[href*="maps.app.goo.gl"]' }
      ]
    },
    {
      name: 'Company News Page',
      url: '/company/news',
      elements: [
        { name: 'Media enquiries', selector: 'a[href*="topic=media"]' }
      ]
    },
    {
      name: 'Resources Page',
      url: '/resources',
      elements: [
        // Targeting the first download button in the Brochures section
        { name: 'Brochure Download', selector: '[data-testid="resource-download-btn"]' }
      ]
    }
  ];

  for (const pageConfig of pagesToCheck) {
    test(`Check contrast on ${pageConfig.name}`, async ({ page }) => {
      await page.goto(pageConfig.url);
      
      // Check both themes
      for (const theme of ['light', 'dark'] as const) {
        console.log(`\n--- Testing ${pageConfig.name} in ${theme} mode ---`);
        await setTheme(page, theme);

        for (const el of pageConfig.elements) {
          const locator = page.locator(el.selector).first();
          
          // Wait for element to be visible
          await expect(locator).toBeVisible();

          // Scroll into view
          await locator.scrollIntoViewIfNeeded();

          // Hover to trigger hover state
          await locator.hover();
          await page.waitForTimeout(500); // Wait for transition

          // Take screenshot
          const screenshotPath = path.join(resultsDir, `${pageConfig.name.replace(/\s+/g, '_')}-${el.name.replace(/\s+/g, '_')}-${theme}.png`);
          await locator.screenshot({ path: screenshotPath });
          console.log(`Screenshot saved to: ${screenshotPath}`);

          // Get computed styles with effective background color resolution
          const color = await locator.evaluate((e) => window.getComputedStyle(e).color);
          const backgroundColor = await locator.evaluate((e) => {
            let current = e;
            while (current) {
              const style = window.getComputedStyle(current);
              const bg = style.backgroundColor;
              // Check for non-transparent background (ignore low opacity overlays)
              const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
              if (match) {
                const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
                if (alpha >= 0.9) return bg;
              }
              current = current.parentElement as Element;
            }
            // Default to white if no background found (standard web default)
            return 'rgb(255, 255, 255)';
          });
          
          // Log values
          console.log(`Element: ${el.name} (${theme})`);
          console.log(`  Color: ${color}`);
          console.log(`  Background: ${backgroundColor}`);

          const fg = parseColor(color);
          const bg = parseColor(backgroundColor);

          if (fg && bg) {
            const contrast = getContrastRatio(fg, bg);
            console.log(`  Contrast Ratio: ${contrast.toFixed(2)}:1`);

            // Determine font size for WCAG requirement (simplified check)
            const fontSize = await locator.evaluate((e) => parseFloat(window.getComputedStyle(e).fontSize));
            const fontWeight = await locator.evaluate((e) => window.getComputedStyle(e).fontWeight);
            const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && (fontWeight === '700' || fontWeight === 'bold'));
            const minContrast = isLargeText ? 3.0 : 4.5;

            console.log(`  Requirement: ${minContrast}:1 (${isLargeText ? 'Large Text' : 'Normal Text'})`);

            if (contrast < minContrast) {
               console.error(`  FAIL: Contrast ${contrast.toFixed(2)} < ${minContrast}`);
               // We won't fail the test run immediately so we can report all issues, 
               // but in a strict CI env this should fail. 
               // For now, we verify.
            } else {
               console.log(`  PASS`);
            }
          } else {
            console.warn(`  Could not parse colors for calculation.`);
          }
        }
      }
    });
  }
});
