import { test, expect } from '@playwright/test';

const locations = [
  { name: 'Charlestown', slug: 'Charlestown' },
  { name: 'Central Coast', slug: 'Central-Coast' },
  { name: 'Tamworth', slug: 'Tamworth' },
  { name: 'Armidale', slug: 'Armidale' },
];

test.describe('Locations videos', () => {
  test('renders videos with poster and plays on hover', async ({ page }) => {
    await page.goto('/contact-us');
    const cards = page.locator('section .grid > div:has(video)');
    await expect(cards).toHaveCount(locations.length);

    for (let i = 0; i < locations.length; i++) {
      const video = cards.nth(i).locator('video');
      await expect(video).toBeVisible();
      const isMuted = await video.evaluate((el) => (el as HTMLVideoElement).muted);
      expect(isMuted).toBeTruthy();
      await expect(video).toHaveAttribute('playsinline', '');
      await expect(video).toHaveAttribute('loop', '');
      await expect(video).toHaveAttribute('preload', 'metadata');
      const poster = await video.getAttribute('poster');
      expect(poster).toBeTruthy();

      const hasWebm = await video.locator(`source[type="video/webm"]`).count();
      const hasMp4 = await video.locator(`source[type="video/mp4"]`).count();
      expect(hasWebm + hasMp4).toBeGreaterThan(0);

      await video.hover();
      await page.waitForTimeout(250);
      const paused = await video.evaluate((el) => (el as HTMLVideoElement).paused);
      expect(paused).toBeFalsy();
    }
  });

  test('responsive sizing at breakpoints', async ({ page }) => {
    await page.goto('http://localhost:5173/contact-us');
    // Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    let vids = page.locator('video.w-full.aspect-video.object-cover');
    await expect(vids.first()).toBeVisible();
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    vids = page.locator('video.w-full.aspect-video.object-cover');
    await expect(vids.first()).toBeVisible();
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    vids = page.locator('video.w-full.aspect-video.object-cover');
    await expect(vids.first()).toBeVisible();
  });
});
