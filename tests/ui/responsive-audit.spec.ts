import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/about-us',
  '/get-involved',
  '/resources',
  '/services/settlement-support',
  '/services/aged-care',
  '/services/community-engagement',
  '/contact-us',
];

const viewports = [
  { width: 390, height: 844, name: 'mobile' },
  { width: 768, height: 1024, name: 'ipad' },
  { width: 820, height: 1180, name: 'ipad-air' }, // Primary failure target
  { width: 1024, height: 1366, name: 'ipad-pro' },
  { width: 1280, height: 800, name: 'desktop' },
];

test.describe('Site-wide Responsiveness Audit', () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route} at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
        // 1. Configure viewport
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        // 2. Navigate
        await page.goto(route, { waitUntil: 'networkidle' });

        // 3. Check for horizontal scroll (overflow)
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        
        // Allow 1px tolerance for sub-pixel rendering
        const hasHorizontalScroll = scrollWidth > innerWidth + 1;
        
        if (hasHorizontalScroll) {
          const offenders = await page.evaluate(() => {
            const vw = window.innerWidth;
            const docWidth = document.documentElement.scrollWidth;
            const nodes = Array.from(document.querySelectorAll<HTMLElement>('body *'));
            const wide = nodes
              .map((el) => {
                const r = el.getBoundingClientRect();
                return {
                  tag: el.tagName.toLowerCase(),
                  id: el.id || '',
                  className: (el.className && typeof el.className === 'string') ? el.className : '',
                  width: Math.round(r.width),
                  left: Math.round(r.left),
                  right: Math.round(r.right),
                };
              })
              // Filter: 
              // 1. Must stick out of viewport (right > vw)
              // 2. Must be within the actual scrollable area (right <= docWidth + 5)
              //    (This excludes elements hidden by overflow:hidden that render way off-screen)
              .filter((x) => (x.right > vw + 1) && (x.right <= docWidth + 5))
              // Sort by how far right they go (descending)
              .sort((a, b) => b.right - a.right)
              .slice(0, 10);
            return { vw, wide };
          });
        
          console.log(`[OVERFLOW] ${route} ${viewport.name} vw=${offenders.vw}`);
          offenders.wide.forEach((x, i) => {
            console.log(
              `[OVERFLOW:${i}] <${x.tag}> id="${x.id}" width=${x.width} left=${x.left} right=${x.right} class="${x.className}"`
            );
          });
          
          console.log(`[FAIL] Horizontal scroll detected on ${route} at ${viewport.width}px. Scroll: ${scrollWidth}, Window: ${innerWidth}`);
        }

        // 4. Take full page screenshot
        // We use fullPage: true to capture the whole layout, but focused layout checks happen in the viewport
        await page.screenshot({ 
          path: `test-results/responsive-audit/${viewport.name}${route.replace(/\//g, '-')}.png`,
          fullPage: true 
        });

        // 5. Assert no horizontal scroll
        expect(hasHorizontalScroll, `Horizontal scroll detected on ${route} at ${viewport.name}`).toBe(false);
      });
    }
  }
});
