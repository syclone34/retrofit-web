const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function verify() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Load local file directly with file:// url
  await page.goto('file:///c:/Users/syclo/retrofit-web/v2/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Desktop Hero & Header screenshot
  await page.screenshot({
    path: 'c:/Users/syclo/retrofit-web/scratch/v2_desktop_hero.png',
    clip: { x: 0, y: 0, width: 1440, height: 860 }
  });

  // 2. Footer screenshot
  const footer = await page.$('.site-footer');
  if (footer) {
    await footer.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await footer.screenshot({
      path: 'c:/Users/syclo/retrofit-web/scratch/v2_footer.png'
    });
  }

  // 3. Mobile Viewport test
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'c:/Users/syclo/retrofit-web/scratch/v2_mobile_header.png',
    clip: { x: 0, y: 0, width: 390, height: 750 }
  });

  await browser.close();
  console.log('All verification screenshots captured!');
}

verify().catch(console.error);
