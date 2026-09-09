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

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const badge = document.querySelector('.counsel-face-badge');
      if (badge) {
        badge.style.width = '112px';
        badge.style.height = '112px';
        badge.style.borderWidth = '3px';
      }
    });
    const card = await page.$('.counsel-feature-card');
    if (card) {
      await card.screenshot({
        path: `C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/test_112_${vp.name}.png`
      });
      console.log(`Saved test_112_${vp.name}.png`);
    }
  }

  await browser.close();
})();
