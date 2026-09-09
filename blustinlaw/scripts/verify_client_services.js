const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('blustinlaw/client-services.html').replace(/\\/g, '/');

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // 1. Hero & Top View
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_hero_view.png',
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });
  console.log('Saved services_hero_view.png');

  // 2. Bars & Restaurants Section
  const bars = await page.$('#bars-restaurants');
  if (bars) {
    await bars.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_bars_section.png'
    });
    console.log('Saved services_bars_section.png');
  }

  // 3. Auto Dealerships Section
  const auto = await page.$('#auto-dealerships');
  if (auto) {
    await auto.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_auto_section.png'
    });
    console.log('Saved services_auto_section.png');
  }

  // 4. Startups & Forbes Articles Section
  const startups = await page.$('#startups');
  if (startups) {
    await startups.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_startups_section.png'
    });
    console.log('Saved services_startups_section.png');
  }

  // 5. Case Precedents Section
  const achievements = await page.$('#achievements');
  if (achievements) {
    await achievements.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_achievements_section.png'
    });
    console.log('Saved services_achievements_section.png');
  }

  // 6. Mobile View (390px)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/services_mobile_view.png',
    clip: { x: 0, y: 0, width: 390, height: 1200 }
  });
  console.log('Saved services_mobile_view.png');

  await browser.close();
})();
