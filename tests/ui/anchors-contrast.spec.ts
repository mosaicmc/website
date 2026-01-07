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

test.describe('Anchors contrast – header and contact page', () => {
  for (const path of ['/', '/contact-us']) {
    test(`anchors have ≥4.5:1 contrast on ${path}`, async ({ page }) => {
      await page.goto(path);
      for (const theme of ['light', 'dark'] as const) {
        await page.evaluate((t) => {
          const root = document.documentElement;
          if (t === 'dark') root.classList.add('dark');
          else root.classList.remove('dark');
        }, theme);
        
        // Wait for transitions to complete
        await page.waitForTimeout(1000);

        // Limit to visible anchors
        const anchors = page.locator('a:visible');
        const count = await anchors.count();
        for (let i = 0; i < count; i++) {
          const handle = await anchors.nth(i).elementHandle();
          if (!handle) continue;
          
          const textContent = await anchors.nth(i).textContent();
          if (!textContent || !textContent.trim()) continue;

          // Skip Google Translate widget
          const href = await anchors.nth(i).getAttribute('href');
          if (href && href.includes('translate.google.com')) continue;

          const { fg, bg, html, classes } = await handle.evaluate((el) => {
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
            
            // Collect background stack
            let current: Element | null = el;
            const bgStack: RGBA[] = [];
            while (current) {
              const style = getComputedStyle(current);
              const c = getRgba(style.backgroundColor);
              if (c && c.a > 0) bgStack.push(c);
              // Optimization: if fully opaque, we can stop (but we need to blend from bottom up)
              // Actually, if we find opaque, anything behind it is hidden.
              if (c && c.a === 1) break;
              current = current.parentElement;
            }
            
            // If we didn't hit an opaque background, assume white base
            if (bgStack.length === 0 || bgStack[bgStack.length - 1].a < 1) {
               // Try body explicitly if not reached
               const bodyBg = getRgba(getComputedStyle(document.body).backgroundColor);
               if (bodyBg && bodyBg.a === 1) {
                  bgStack.push(bodyBg);
               } else {
                  bgStack.push({ r: 255, g: 255, b: 255, a: 1 });
               }
            }

            // Composite from bottom (last in stack) to top (first in stack)
            let finalBg = bgStack.pop();
            while (bgStack.length > 0) {
              const next = bgStack.pop();
              finalBg = blend(next, finalBg);
            }

            return { 
              fg: color, 
              bg: `rgb(${Math.round(finalBg.r)}, ${Math.round(finalBg.g)}, ${Math.round(finalBg.b)})`,
              html: el.outerHTML, 
              classes: el.className 
            };
          });
          const ratio = contrastRatio(parseColor(fg), parseColor(bg));
          if (ratio < 4.5) {
            console.log(`Contrast failure on ${path} (${theme}):`);
            console.log(`  Text: "${await anchors.nth(i).innerText()}"`);
            console.log(`  HTML: ${html}`);
            console.log(`  Classes: ${classes}`);
            console.log(`  FG: ${fg}, BG: ${bg}, Ratio: ${ratio}`);
          }
          expect(ratio, `Contrast failure: ${await anchors.nth(i).innerText()} - FG ${fg} on BG ${bg} (Ratio ${ratio.toFixed(2)})`).toBeGreaterThanOrEqual(4.5);

        }
      }
    });
  }
});
