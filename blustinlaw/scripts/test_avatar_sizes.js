const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const filePath = 'file:///' + path.resolve('blustinlaw/index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  const sizes = [96, 110, 124];
  for (const size of sizes) {
    await page.evaluate((s) => {
      const badge = document.querySelector('.counsel-face-badge');
      if (badge) {
        badge.style.width = s + 'px';
        badge.style.height = s + 'px';
        badge.style.borderWidth = '3px';
      }
    }, size);
    const card = await page.$('.counsel-feature-card');
    await card.screenshot({
      path: `C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/test_size_${size}.png`
    });
    console.log(`Saved test_size_${size}.png`);
  }
  await browser.close();
})();
