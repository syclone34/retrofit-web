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

  // 1. Desktop 1440px
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  const header = await page.$('.site-header');
  if (header) {
    await header.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_header_desktop_1440.png'
    });
    console.log('Saved final_header_desktop_1440.png');
  }

  const footer = await page.$('.site-footer');
  if (footer) {
    await footer.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_footer_desktop_1440.png'
    });
    console.log('Saved final_footer_desktop_1440.png');
  }

  // 2. Laptop 1200px
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  const header1200 = await page.$('.site-header');
  if (header1200) {
    await header1200.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_header_laptop_1200.png'
    });
    console.log('Saved final_header_laptop_1200.png');
  }

  // 3. Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  const headerTablet = await page.$('.site-header');
  if (headerTablet) {
    await headerTablet.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_header_tablet_768.png'
    });
    console.log('Saved final_header_tablet_768.png');
  }

  // 4. Mobile 390px
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  const mobHeader = await page.$('.site-header');
  if (mobHeader) {
    await mobHeader.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_header_mobile_390.png'
    });
    console.log('Saved final_header_mobile_390.png');
  }

  // Also check About Us page header
  const aboutPath = 'file:///' + path.resolve('blustinlaw/about-us.html').replace(/\\/g, '/');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(aboutPath, { waitUntil: 'networkidle0' });
  const aboutHeader = await page.$('.site-header');
  if (aboutHeader) {
    await aboutHeader.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/final_about_header_1440.png'
    });
    console.log('Saved final_about_header_1440.png');
  }

  await browser.close();
})();
