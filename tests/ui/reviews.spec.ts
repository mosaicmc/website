import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

test.describe('GoogleReviews UI', () => {
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('renders featured reviews from mock data', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to bottom to ensure content-visibility: auto elements are rendered
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const section = page.getByRole('region', { name: 'Google Reviews' });
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    // Verify heading exists semantically
    const heading = section.getByRole('heading', { name: /What People Are Saying/i });
    await expect(heading).toBeVisible();

    // Verify cards are rendered from mock data
    const cardText = section.getByText('Mosaic Services is a great organisation, and Elena is incredibly helpful and knowledgeable. Highly recommend!');
    await expect(cardText).toBeVisible();

    const authorName = section.getByText('Kagombe Muzingu');
    await expect(authorName).toBeVisible();
    
    // Verify star rating exists (aria-label check)
    const starRating = section.locator('[aria-label="5 out of 5 stars"]').first();
    await expect(starRating).toBeVisible();
  });
});
