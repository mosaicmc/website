import { test, expect } from '@playwright/test';

test.describe('Locations videos', () => {
  test('renders videos with poster and plays on hover', async ({ page }) => {
    await page.goto('/contact-us');
    
    // Semantic check: locate any video elements on the page
    const videos = page.locator('video');
    
    // Ensure at least one video is present and visible
    await expect(videos.first()).toBeVisible();
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);

    // Check the first video for expected attributes
    const firstVideo = videos.first();
    await expect(firstVideo).toHaveAttribute('playsinline', '');
    await expect(firstVideo).toHaveAttribute('loop', '');
    await expect(firstVideo).toHaveAttribute('preload', 'none');
    
    // Check if poster is present
    const poster = await firstVideo.getAttribute('poster');
    expect(poster).toBeTruthy();

    // Verify muted property
    const isMuted = await firstVideo.evaluate((el) => (el as HTMLVideoElement).muted);
    expect(isMuted).toBeTruthy();

    // Verify source exists (either webm or mp4)
    const hasWebm = await firstVideo.locator(`source[type="video/webm"]`).count();
    const hasMp4 = await firstVideo.locator(`source[type="video/mp4"]`).count();
    expect(hasWebm + hasMp4).toBeGreaterThan(0);

    // Test interaction: Hover should play the video
    // We need to be careful with autoplay policies, but since it's muted, it should work.
    await firstVideo.hover();
    
    // Allow a small amount of time for the play promise to resolve/reject
    await page.waitForTimeout(500);
    
    const isPaused = await firstVideo.evaluate((el) => (el as HTMLVideoElement).paused);
    expect(isPaused).toBeFalsy();
  });

  test('videos remain visible across breakpoints', async ({ page }) => {
    await page.goto('/contact-us');
    const videos = page.locator('video');
    
    // Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(videos.first()).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(videos.first()).toBeVisible();
    
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(videos.first()).toBeVisible();
  });
});
