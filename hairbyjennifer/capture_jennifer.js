const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  const filePath = 'file:///' + path.resolve('c:/Users/syclo/retrofit-web/hairbyjennifer/index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // 1. Desktop Hero + Header
  await page.screenshot({ 
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/jennifer_hero_desktop.png',
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });

  // 2. Full Page Desktop
  await page.screenshot({ 
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/jennifer_full_desktop.png',
    fullPage: true 
  });

  // 3. Before & After Slider Section
  const sliderSection = await page.$('#transformation');
  if (sliderSection) {
    await sliderSection.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/jennifer_slider_desktop.png'
    });
  }

  // 4. Mobile Viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.screenshot({ 
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/jennifer_hero_mobile.png',
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
