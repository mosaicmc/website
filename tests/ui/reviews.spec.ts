import { test, expect } from '@playwright/test';

const mockReviews = {
  placeUrl: 'https://maps.google.com/sample',
  reviews: [
    {
      id: 'r1',
      authorName: 'Jane Doe',
      authorAvatarUrl: 'https://via.placeholder.com/50',
      rating: 5,
      dateText: '2 days ago',
      text: 'Amazing service and wonderful community support!',
      reviewUrl: 'https://maps.google.com/review/1'
    },
    {
      id: 'r2',
      authorName: 'John Smith',
      rating: 4,
      dateText: '1 week ago',
      text: 'Great experience overall, very helpful staff.',
      reviewUrl: 'https://maps.google.com/review/2'
    },
    {
      id: 'r3',
      authorName: 'Alice Johnson',
      rating: 5,
      dateText: '3 weeks ago',
      text: 'Mosaic has been a lifesaver for my family.',
      reviewUrl: 'https://maps.google.com/review/3'
    }
  ]
};

test.describe('GoogleReviews UI', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept requests to /reviews.json (or any path ending in reviews.json)
    await page.route('**/reviews.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockReviews),
      });
    });
  });

  test('renders featured reviews from mock data', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'Google Reviews' });
    await expect(section).toBeVisible();

    // Verify cards are rendered from mock data
    const cardText = section.getByText('Amazing service and wonderful community support!');
    await expect(cardText).toBeVisible();

    const authorName = section.getByText('Jane Doe');
    await expect(authorName).toBeVisible();
    
    // Verify star rating exists (aria-label check)
    const starRating = section.locator('[aria-label="5 out of 5 stars"]').first();
    await expect(starRating).toBeVisible();
  });
});

