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

  // Let's test Variant A (Transparent Seamless) at 66px height
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Test 1: Insert logo_horizontal_transparent.png with enlarged styling
  await page.evaluate(() => {
    const img = document.querySelector('.brand-logo-img');
    if (img) {
      img.src = 'assets/img/logo_horizontal_transparent.png';
      img.style.height = '66px';
      img.style.width = 'auto';
    }
    const header = document.querySelector('.header-inner');
    if (header) {
      header.style.height = '90px';
    }
  });

  const headerA = await page.$('.site-header');
  await headerA.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/header_variant_a_desktop.png'
  });
  console.log('Saved header_variant_a_desktop.png');

  // Mobile test for Variant A
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const img = document.querySelector('.brand-logo-img');
    if (img) {
      img.style.height = '48px';
      img.style.maxWidth = '250px';
    }
  });
  const mobHeaderA = await page.$('.site-header');
  await mobHeaderA.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/header_variant_a_mobile.png'
  });
  console.log('Saved header_variant_a_mobile.png');

  // Test 2: Insert logo_horizontal_white_card.png
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const img = document.querySelector('.brand-logo-img');
    if (img) {
      img.src = 'assets/img/logo_horizontal_white_card.png';
      img.style.height = '62px';
      img.style.width = 'auto';
    }
  });
  const headerB = await page.$('.site-header');
  await headerB.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/header_variant_b_desktop.png'
  });
  console.log('Saved header_variant_b_desktop.png');

  await browser.close();
})();
