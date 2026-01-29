import { test, expect } from '@playwright/test';

test.describe('Section visibility and presence', () => {
  test('Contact page CTA section is visible', async ({ page }) => {
    await page.goto('/contact-us');
    
    // Semantic check: Look for the specific CTA heading "Not Sure Which Office to Visit?"
    const heading = page.getByRole('heading', { name: /Not Sure Which/i });
    
    // Scroll to it
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();

    // Ensure the section is discoverable by checking for action links
    // "Call" or "Email" links should be present
    const callLink = page.getByRole('link', { name: /Call/i }).first();
    await expect(callLink).toBeVisible();
  });

  test('Locations page CTA section is visible', async ({ page }) => {
    // The Locations page is served at /contact-us
    await page.goto('/contact-us');
    
    const heading = page.getByRole('heading', { name: /Not Sure Which Office to Visit/i });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    
    // Check for the Email link as well
    const emailLink = page.getByRole('link', { name: /Email/i }).first();
    await expect(emailLink).toBeVisible();
  });
});
