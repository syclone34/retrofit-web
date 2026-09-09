const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');
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

  // Test avatar integration
  await page.evaluate(() => {
    const header = document.querySelector('.counsel-card-header');
    if (header) {
      header.innerHTML = `
        <div class="counsel-header-left">
          <span class="counsel-role-eyebrow">Lead Attorney &amp; Founder</span>
          <h3 class="counsel-name">Sholly A. Blustin</h3>
        </div>
        <div class="counsel-avatar-thumb">
          <img src="assets/img/sholly_blustin.jpg" alt="Attorney Sholly A. Blustin" class="counsel-avatar-img">
        </div>
      `;
    }

    // Add styles for the avatar
    const style = document.createElement('style');
    style.innerHTML = `
      .counsel-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
      }
      .counsel-avatar-thumb {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        border: 2.5px solid #c5a059;
        box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 12px rgba(197, 160, 89, 0.3);
        flex-shrink: 0;
      }
      .counsel-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 12%;
        display: block;
      }
    `;
    document.head.appendChild(style);
  });

  const card = await page.$('.counsel-feature-card');
  if (card) {
    await card.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/counsel_card_with_face.png'
    });
    console.log('Saved counsel_card_with_face.png');
  }

  // Also take hero screenshot
  const hero = await page.$('.hero-section');
  if (hero) {
    await hero.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/hero_with_counsel_face.png'
    });
    console.log('Saved hero_with_counsel_face.png');
  }

  await browser.close();
})();
