const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('blustinlaw/index.html').replace(/\\/g, '/');

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // 1. Capture the Hero Counsel Feature Card (Face picture in place of AV Preeminent)
  const card = await page.$('.counsel-feature-card');
  if (card) {
    await card.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/counsel_card_face_final.png'
    });
    console.log('Saved counsel_card_face_final.png');
  }

  // 2. Capture the Hero section
  const hero = await page.$('.hero-section');
  if (hero) {
    await hero.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/hero_section_face_final.png'
    });
    console.log('Saved hero_section_face_final.png');
  }

  // 3. Capture the Trust Strip (AV Preeminent preserved)
  const trust = await page.$('.trust-strip');
  if (trust) {
    await trust.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/trust_strip_preserved.png'
    });
    console.log('Saved trust_strip_preserved.png');
  }

  // 4. Capture the About section (Full portrait with AV Preeminent badge preserved)
  const about = await page.$('.attorney-bio-card');
  if (about) {
    await about.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/about_bio_card_preserved.png'
    });
    console.log('Saved about_bio_card_preserved.png');
  }

  // 5. Capture the About-Us page attorney card (AV Preeminent preserved)
  const pageAbout = await browser.newPage();
  await pageAbout.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const aboutPath = 'file:///' + path.resolve('blustinlaw/about-us.html').replace(/\\/g, '/');
  await pageAbout.goto(aboutPath, { waitUntil: 'networkidle0' });
  const aboutCard = await pageAbout.$('.attorney-bio-card');
  if (aboutCard) {
    await aboutCard.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/about_us_card_preserved.png'
    });
    console.log('Saved about_us_card_preserved.png');
  }

  await browser.close();
})();
