const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');

async function captureContact() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('file:///c:/Users/syclo/retrofit-web/index.html', { waitUntil: 'networkidle0' });

  const contact = await page.$('#contact');
  if (contact) {
    await contact.scrollIntoView();
    await new Promise(r => setTimeout(r, 200));
    // screenshot the current visible viewport
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/verified_mobile_contact_real.png' });
  }

  await browser.close();
  console.log('Saved real contact view.');
}

captureContact().catch(console.error);
