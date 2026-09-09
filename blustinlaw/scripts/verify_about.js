const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // 1. Screenshot of index.html scrolled to #about
  const indexPath = 'file:///' + path.resolve('blustinlaw/index.html').replace(/\\/g, '/');
  await page.goto(indexPath, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about_section.png'
  });
  console.log('blustin_about_section.png saved!');

  // 2. Click a tab (Publications) and capture viewport
  await page.evaluate(() => {
    const btn = document.querySelector('.about-tab-btn[data-tab="tab-publications"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about_tab_publications.png'
  });
  console.log('blustin_about_tab_publications.png saved!');

  // 3. Click another tab (Career) and capture
  await page.evaluate(() => {
    const btn = document.querySelector('.about-tab-btn[data-tab="tab-career"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about_tab_career.png'
  });
  console.log('blustin_about_tab_career.png saved!');

  // 4. Also full screenshot of dedicated about-us.html
  const aboutPath = 'file:///' + path.resolve('blustinlaw/about-us.html').replace(/\\/g, '/');
  await page.goto(aboutPath, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about_us_page_full.png',
    fullPage: true
  });
  console.log('blustin_about_us_page_full.png saved!');

  await browser.close();
})();
