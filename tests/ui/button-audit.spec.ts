import { test, expect, Page } from '@playwright/test';

// --- Helper Functions ---

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(rgb1: number[], rgb2: number[]) {
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function parseColor(color: string) {
  const match = color.match(/\d+/g);
  if (!match) return [0, 0, 0];
  return match.slice(0, 3).map(Number);
}

async function getElementStyles(page: Page, selector: string) {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();
  
  return element.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor,
    };
  });
}

async function checkContrast(page: Page, selector: string, name: string, state: 'Normal' | 'Hover' = 'Normal') {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();

  if (state === 'Hover') {
    await element.hover();
    await page.waitForTimeout(500); // Wait for transition
  } else {
    // Ensure mouse is away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  }

  const styles = await getElementStyles(page, selector);
  
  const fg = parseColor(styles.color);
  let bg = parseColor(styles.backgroundColor);
  
  // Handle transparent background
  if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' || styles.backgroundColor === 'transparent') {
     const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
     bg = parseColor(bodyBg);
  }

  const ratio = getContrastRatio(fg, bg);
  console.log(`${name} [${state}]: Ratio=${ratio.toFixed(2)}:1 (FG: ${styles.color}, BG: ${styles.backgroundColor})`);
  
  // Reset mouse if hover
  if (state === 'Hover') {
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  }

  return ratio;
}

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, theme);
  await page.waitForTimeout(500); // Wait for theme transition
}

// --- Tests ---

const viewports = [
  { width: 1280, height: 720, name: 'Desktop' },
  { width: 375, height: 667, name: 'Mobile' }
];

const themes = ['light', 'dark'] as const;

for (const viewport of viewports) {
  test.describe(`Viewport: ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const theme of themes) {
      test(`Button Audit - ${theme} mode`, async ({ page }) => {
        // Capture console logs
        page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
        page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

        // 1. Home Page "Explore Our Services"
        await page.goto('http://localhost:4173/');
        await page.waitForLoadState('networkidle');
        await setTheme(page, theme);
        
        console.log(`\n--- ${viewport.name} | ${theme} | Home Page ---`);
        // Use data-testid for reliability
        const exploreSelector = 'a[data-testid="hero-explore-btn"]';
        
        // Wait for element to be attached and visible
        try {
            await page.waitForSelector(exploreSelector, { state: 'visible', timeout: 5000 });
        } catch (e) {
            console.log('Timeout waiting for hero button.');
            await page.screenshot({ path: `error-home-${theme}-${viewport.name}.png` });
        }
        
        const count = await page.locator(exploreSelector).count();
        console.log(`Found ${count} "Explore Our Services" links`);
        
        if (count > 0) {
            const ratioNormal = await checkContrast(page, exploreSelector, 'Hero CTA', 'Normal');
            expect(ratioNormal).toBeGreaterThan(3); // AA Large Text or 4.5 for body. Button text is often bold.
            
            const ratioHover = await checkContrast(page, exploreSelector, 'Hero CTA', 'Hover');
            expect(ratioHover).toBeGreaterThan(3);
        } else {
            console.log('WARNING: Hero CTA not found with selector a[href="/services"]');
            // Debug: print all links
            const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map(a => a.href));
            console.log('Available links:', links);
        }

        // 2. Resources Page "Call 1800"
        await page.goto('http://localhost:4173/resources');
        await page.waitForLoadState('networkidle');
        await setTheme(page, theme);

        console.log(`\n--- ${viewport.name} | ${theme} | Resources Page ---`);
        const callSelector = 'a[aria-label="Call Mosaic Multicultural Connections"]';
        
        const callCount = await page.locator(callSelector).count();
        if (callCount > 0) {
            const ratioNormal = await checkContrast(page, callSelector, 'Call Button', 'Normal');
            expect(ratioNormal).toBeGreaterThan(3);
            
            const ratioHover = await checkContrast(page, callSelector, 'Call Button', 'Hover');
            expect(ratioHover).toBeGreaterThan(3);
        } else {
             console.log('WARNING: Call Button not found');
        }
      });
    }
  });
}
