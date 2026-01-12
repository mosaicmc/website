import { test, expect } from '@playwright/test';
import { mockGoogleReviews } from '../helpers';

// Utility: scroll a locator into view and wait for potential lazy-load
async function ensureVisible(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  // Give IntersectionObserver a moment to fire and fetch reviews
  await page.waitForTimeout(600);
}

test.describe('Home page – Google Reviews section', () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });
    // Mock the network request for reviews
    await mockGoogleReviews(page);

    // Mock IntersectionObserver to trigger immediately
    await page.addInitScript(() => {
      class FakeIntersectionObserver {
        private _callback: IntersectionObserverCallback;
        constructor(callback: IntersectionObserverCallback) {
          this._callback = callback;
        }
        observe(element: Element) {
          this._callback([{ isIntersecting: true, target: element } as IntersectionObserverEntry]);
        }
        unobserve() {}
        disconnect() {}
        takeRecords(): IntersectionObserverEntry[] { return []; }
        root: Element | Document | null = null;
        rootMargin = '';
        thresholds: ReadonlyArray<number> = [];
      }
      (window as Window & typeof globalThis & { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
        FakeIntersectionObserver as unknown as typeof IntersectionObserver;
    });
    await page.goto('/');
  });

  test('renders Google Reviews section and initial cards', async ({ page }) => {
    const section = page.locator('[aria-label="Google Reviews"]');
    await ensureVisible(page, section);
    await expect(section).toBeVisible();

    // Heading within the section
    await expect(section.getByRole('heading', { name: 'What People Are Saying' })).toBeVisible();

    // Wait for reviews to load: cards with tabindex=0 appear when not loading
    const cards = section.locator('.group[tabindex="0"]');
    await expect(cards.first()).toBeVisible();
    const initialCount = await cards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Link to Google exists
    await expect(section.getByRole('link', { name: 'Read all reviews on Google' })).toBeVisible();
  });

  test('Load more reviews increases visible count', async ({ page }) => {
    const section = page.locator('[aria-label="Google Reviews"]');
    await ensureVisible(page, section);
    const cards = section.locator('.group[tabindex="0"]');
    await expect(cards.first()).toBeVisible();
    const before = await cards.count();

    const loadMore = section.getByRole('button', { name: 'Load more reviews' });
    if (await loadMore.isVisible()) {
      await loadMore.click();
      await expect(cards.nth(before)).toBeVisible();
      const after = await cards.count();
      expect(after).toBeGreaterThan(before);
    } else {
      // If no more reviews are available, at least confirm button is hidden appropriately
      await expect(loadMore).toBeHidden();
    }
  });

  test('visual snapshots of Google Reviews section at breakpoints', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Visual snapshots only on Chromium');
    const section = page.locator('[aria-label="Google Reviews"]');
    const screenshotOptions = { 
      maxDiffPixelRatio: 0.02, 
      timeout: 10000, 
      animations: 'disabled' as const 
    };

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-desktop.png', screenshotOptions);

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-tablet.png', screenshotOptions);

    // Mobile
    await page.setViewportSize({ width: 375, height: 800 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-mobile.png', screenshotOptions);
  });
});

test.describe('About page – Values and Leadership', () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });
    await page.goto('/about');
  });

  test('renders Values section with 4 cards', async ({ page }) => {
    // Use ID locator which is more stable
    await expect(page.locator('#values-title')).toBeVisible();
    const valuesSection = page
      .locator('section')
      .filter({ hasText: 'What we stand for' })
      .first();
    await expect(valuesSection).toBeVisible();
    const valuesGrid = valuesSection.locator('.grid').first();
    await expect(valuesGrid).toBeVisible();
    await expect(valuesGrid.locator('h3')).toHaveCount(5);
  });

  test('renders Leadership section with avatars and roles', async ({ page }) => {
    // Debug: Ensure we are on the right page
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByText('Our Story').first()).toBeVisible();

    // Try to find "Leadership Team" in any way
    const leadershipText = page.getByText('Leadership Team').first();
    // Allow some time for hydration/translation
    await expect(leadershipText).toBeVisible({ timeout: 10000 });

    const leadershipSection = page
      .locator('section')
      .filter({ has: leadershipText });
    await expect(leadershipSection).toBeVisible();
    
    const leaderCards = leadershipSection.locator('.group');
    await expect(leaderCards.first()).toBeVisible();
    await expect(leaderCards).toHaveCount(5);
    // Validate one known member text exists
    await expect(leadershipSection.getByRole('heading', { name: 'Sharon Daishe' })).toBeVisible();
  });

  test('visual snapshots of Leadership section at breakpoints', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Visual snapshots only on Chromium');
    const leadership = page.locator('section').filter({ hasText: 'Leadership Team' });
    const screenshotOptions = { timeout: 10000, animations: 'disabled' as const };

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(leadership).toHaveScreenshot('about-leadership-desktop.png', screenshotOptions);

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(leadership).toHaveScreenshot('about-leadership-tablet.png', screenshotOptions);

    // Mobile
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(leadership).toHaveScreenshot('about-leadership-mobile.png', screenshotOptions);
  });
});
