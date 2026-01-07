import { test } from '@playwright/test';

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

test.describe('Buttons contrast scan', () => {
  const routes = ['/', '/services', '/about', '/get-involved', '/resources', '/locations', '/contact-us', '/stories'];

  for (const path of routes) {
    test(`measure button contrast ratios on ${path}`, async ({ page }) => {
      await page.goto(`http://127.0.0.1:4173${path}`);

      for (const theme of ['light', 'dark'] as const) {
        await page.evaluate((t) => {
          const root = document.documentElement;
          if (t === 'dark') root.classList.add('dark');
          else root.classList.remove('dark');
        }, theme);

        await page.waitForTimeout(500);

        const buttons = page.locator('button:visible, [data-slot="button"]:visible');
        const count = await buttons.count();
        const cap = Math.min(count, 50);
        const results: { text: string; defaultRatio: number; hoverRatio: number }[] = [];

        for (let i = 0; i < cap; i++) {
          const locator = buttons.nth(i);
          const handle = await locator.elementHandle();
          if (!handle) continue;
          const text = (await locator.innerText()).trim();
          if (!text) continue;

          const computeColors = async () => {
            return await handle.evaluate((el) => {
              type RGBA = { r: number; g: number; b: number; a: number };
              const getRgba = (c: string) => {
                const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
                if (!match) return null;
                return {
                  r: parseInt(match[1], 10),
                  g: parseInt(match[2], 10),
                  b: parseInt(match[3], 10),
                  a: match[4] !== undefined ? parseFloat(match[4]) : 1
                };
              };
              const blend = (fg: RGBA, bg: RGBA) => {
                const a = fg.a + bg.a * (1 - fg.a);
                if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
                const r = (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a;
                const g = (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a;
                const b = (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a;
                return { r, g, b, a };
              };

              const color = getComputedStyle(el).color;
              const fg = color;

              // Collect parent background stack, fallback to body if transparent
              let current: Element | null = el;
              const bgStack: RGBA[] = [];
              while (current) {
                const style = getComputedStyle(current);
                const c = getRgba(style.backgroundColor);
                if (c && c.a > 0) bgStack.push(c);
                if (c && c.a === 1) break;
                current = current.parentElement;
              }
              if (bgStack.length === 0 || bgStack[bgStack.length - 1].a < 1) {
                const bodyBg = getRgba(getComputedStyle(document.body).backgroundColor);
                if (bodyBg && bodyBg.a === 1) {
                  bgStack.push(bodyBg);
                } else {
                  bgStack.push({ r: 255, g: 255, b: 255, a: 1 });
                }
              }
              let finalBg = bgStack.pop()!;
              while (bgStack.length > 0) {
                const next = bgStack.pop()!;
                finalBg = blend(next, finalBg);
              }

              return {
                fg,
                bg: `rgb(${Math.round(finalBg.r)}, ${Math.round(finalBg.g)}, ${Math.round(finalBg.b)})`
              };
            });
          };

          const { fg, bg } = await computeColors();
          const defaultRatio = contrastRatio(parseColor(fg), parseColor(bg));

          let hoverRatio = defaultRatio;
          try {
            await locator.hover();
            await page.waitForTimeout(200);
            const { fg: hfg, bg: hbg } = await computeColors();
            hoverRatio = contrastRatio(parseColor(hfg), parseColor(hbg));
          } catch {
            // skip if hover fails
          }

          results.push({ text, defaultRatio, hoverRatio });
        }

        // Short report per page/theme
        const byLowest = [...results].sort((a, b) => a.defaultRatio - b.defaultRatio);
        const minDefault = byLowest[0]?.defaultRatio ?? NaN;
        const minHover = results.length ? results.reduce((m, x) => Math.min(m, x.hoverRatio), Infinity) : NaN;
        console.log(`[${path}][${theme}] buttons scanned=${results.length} minDefault=${Number.isFinite(minDefault) ? minDefault.toFixed(2) : 'n/a'} minHover=${Number.isFinite(minHover) ? minHover.toFixed(2) : 'n/a'}`);
        for (const r of results.slice(0, 5)) {
          console.log(`  "${r.text}" default=${r.defaultRatio.toFixed(2)} hover=${r.hoverRatio.toFixed(2)}`);
        }
      }
    });
  }
});
