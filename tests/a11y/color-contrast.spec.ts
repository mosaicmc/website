import { test, expect } from '@playwright/test';

function contrastRatio([r1, g1, b1]: number[], [r2, g2, b2]: number[]) {
  const srgb = (c: number) => c / 255;
  const luminance = (rgb: number[]) => {
    const [r, g, b] = rgb.map(srgb).map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const L1 = luminance([r1, g1, b1]);
  const L2 = luminance([r2, g2, b2]);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseColor(rgbString: string): number[] {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
  if (!match) return [0, 0, 0];
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

async function assertAnchorsContrast(page: import('@playwright/test').Page, pageUrl: string) {
  await page.goto(pageUrl);
  // Check both light and dark themes
  for (const theme of ['light', 'dark'] as const) {
    await page.evaluate((t) => {
      const root = document.documentElement;
      if (t === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
    }, theme);
    const anchors = page.locator('a:visible');
    const count = await anchors.count();
    for (let i = 0; i < count; i++) {
      const handle = await anchors.nth(i).elementHandle();
      if (!handle) continue;
      const { fg, bg } = await handle.evaluate((el) => {
        const color = getComputedStyle(el).color;
        const transparent = (c: string) => c.includes('rgba') && c.endsWith(', 0)');
        let current: Element | null = el;
        while (current) {
          const style = getComputedStyle(current);
          const bgc = style.backgroundColor;
          if (bgc && !transparent(bgc)) return { fg: color, bg: bgc };
          current = current.parentElement;
        }
        return { fg: color, bg: getComputedStyle(document.body).backgroundColor };
      });
      const ratio = contrastRatio(parseColor(fg), parseColor(bg));
      // WCAG AA for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  }
}

test.describe('Anchor color contrast', () => {
  test('Header anchors contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/');
    for (const theme of ['light', 'dark'] as const) {
      await page.evaluate((t) => {
        const root = document.documentElement;
        if (t === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
      }, theme);
      const headerAnchors = page.locator('nav a:visible, header a:visible');
      const count = await headerAnchors.count();
      for (let i = 0; i < count; i++) {
        const handle = await headerAnchors.nth(i).elementHandle();
        if (!handle) continue;
        const { fg, bg } = await handle.evaluate((el) => {
          const color = getComputedStyle(el).color;
          const transparent = (c: string) => c.includes('rgba') && c.endsWith(', 0)');
          let current: Element | null = el;
          while (current) {
            const style = getComputedStyle(current);
            const bgc = style.backgroundColor;
            if (bgc && !transparent(bgc)) return { fg: color, bg: bgc };
            current = current.parentElement;
          }
          return { fg: color, bg: getComputedStyle(document.body).backgroundColor };
        });
        const ratio = contrastRatio(parseColor(fg), parseColor(bg));
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test('Contact page anchors contrast meets WCAG AA', async ({ page }) => {
    await assertAnchorsContrast(page, '/contact-us');
  });
});
