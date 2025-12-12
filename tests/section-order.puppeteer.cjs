const puppeteer = require('puppeteer');

async function getSectionByHeading(page, headingText) {
  const handle = await page.evaluateHandle((text) => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.find((s) => s.textContent && s.textContent.includes(text)) || null;
  }, headingText);
  if (!handle) return null;
  const el = handle.asElement();
  const box = await el.boundingBox();
  return { el, box };
}

async function run() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:4173';
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Scenario A: Resources page with CTA present
  await page.goto(`${baseUrl}/resources`, { waitUntil: 'networkidle0' });
  const cta = await getSectionByHeading(page, 'Need Additional Resources?');
  const related = await getSectionByHeading(page, 'You May Also Be Interested In');
  if (!cta || !related) throw new Error('Expected CTA and RelatedServices sections on /resources');
  if (!(related.box.y > cta.box.y)) throw new Error('RelatedServices must render after CTA on /resources');

  // Verify RelatedServices is near the footer (last major section)
  const lastSectionIsRelated = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const related = sections.find((s) => s.textContent.includes('You May Also Be Interested In'));
    return sections[sections.length - 1] === related;
  });
  if (!lastSectionIsRelated) throw new Error('RelatedServices not last section before footer on /resources');

  // Responsive check: mobile viewport
  await page.setViewport({ width: 375, height: 812 });
  const ctaMobile = await getSectionByHeading(page, 'Need Additional Resources?');
  const relatedMobile = await getSectionByHeading(page, 'You May Also Be Interested In');
  if (!(relatedMobile.box.y > ctaMobile.box.y)) throw new Error('Mobile: RelatedServices must render after CTA');

  // Scenario B: Page without CTA (Helpful Links)
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${baseUrl}/resources/helpful-links`, { waitUntil: 'networkidle0' });
  const related2 = await getSectionByHeading(page, 'You May Also Be Interested In');
  if (!related2) throw new Error('Expected RelatedServices on Helpful Links');
  const lastIsRelated2 = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    const related = sections.find((s) => s.textContent.includes('You May Also Be Interested In'));
    return sections[sections.length - 1] === related;
  });
  if (!lastIsRelated2) throw new Error('RelatedServices not last section on Helpful Links');

  await browser.close();
  console.log('Puppeteer section ordering tests passed');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

