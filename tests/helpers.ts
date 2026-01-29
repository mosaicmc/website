import { Page } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const mockReviews = require('./fixtures/mock-reviews.json');

export async function mockGoogleReviews(page: Page) {
  await page.route('**/reviews.json', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockReviews),
    });
  });
}
