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

  const concepts = [
    { file: 'assets/img/new_logo_wordmark.png', out: 'header_concept_1_wordmark.png' },
    { file: 'assets/img/new_logo_monogram_crest.png', out: 'header_concept_2_crest.png' },
    { file: 'assets/img/new_logo_pillars_crest.png', out: 'header_concept_3_pillars.png' },
    { file: 'assets/img/new_logo_ba_seal.png', out: 'header_concept_4_ba_seal.png' }
  ];

  for (const c of concepts) {
    await page.evaluate((src) => {
      const img = document.querySelector('.brand-logo-img');
      if (img) img.src = src;
    }, c.file);
    const header = await page.$('.site-header');
    if (header) {
      await header.screenshot({
        path: `C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/${c.out}`
      });
      console.log(`Saved ${c.out}`);
    }
  }

  // Restore concept 1 as the default in the DOM
  await page.evaluate(() => {
    const img = document.querySelector('.brand-logo-img');
    if (img) img.src = 'assets/img/logo_law.png';
  });

  await browser.close();
})();
