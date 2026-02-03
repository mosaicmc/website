
import { test } from '@playwright/test';

test('check computed styles for accessibility', async ({ page }) => {
  // Check About Page Gradient Text
  await page.goto('/about');
  
  // Enable dark mode if not already (assuming system preference or toggle)
  // Forcing dark mode via class if possible, or emulation
  await page.emulateMedia({ colorScheme: 'dark' });
  
  // Wait for hydration
  await page.waitForLoadState('networkidle');

  // Check About Page Board Title
  const boardTitle = page.locator('#board-title span');
  const boardColor = await boardTitle.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });
  console.log('About Page Board Title Color (Dark Mode):', boardColor);

  // Check Related Services (assuming it's on Aged Care page)
  await page.goto('/services/aged-care');
  await page.waitForLoadState('networkidle');
  
  // Scroll to bottom to trigger lazy load
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // Wait for lazy load and animation

  const relatedSection = page.locator('section').filter({ hasText: 'You May Also Be Interested In' }).first(); // Adjust text if needed
  // Or look for "Related Services" text if that's the key
  
  // The text key is 'services.alsoInterestedIn' -> "You might also be interested in" usually?
  // Let's check translation.json later. For now assume h2 with "Interested"
  
  const relatedH2 = relatedSection.locator('h2');
  if (await relatedH2.count() > 0) {
      const h2Color = await relatedH2.evaluate((el) => window.getComputedStyle(el).color);
      const sectionBg = await relatedSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      
      console.log('Related Services H2 Color:', h2Color);
      console.log('Related Services Section Bg:', sectionBg);
  } else {
      console.log('Related Services H2 not found');
  }
});
