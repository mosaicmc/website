import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

test.describe('GoogleReviews UI', () => {
  test.beforeEach(async ({ page }) => {
    await mockGoogleReviews(page);
  });

  test('renders featured reviews from mock data', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'Google Reviews' });
    await expect(section).toBeVisible();

    // Verify cards are rendered from mock data
    const cardText = section.getByText('This is a mock review for testing purposes. The service was excellent.');
    await expect(cardText).toBeVisible();

    const authorName = section.getByText('Mock Reviewer 1');
    await expect(authorName).toBeVisible();
    
    // Verify star rating exists (aria-label check)
    const starRating = section.locator('[aria-label="5 out of 5 stars"]').first();
    await expect(starRating).toBeVisible();
  });
});
