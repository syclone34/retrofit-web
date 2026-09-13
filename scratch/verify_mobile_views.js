const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');

async function captureVerification() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('file:///c:/Users/syclo/retrofit-web/index.html', { waitUntil: 'networkidle0' });

  // 1. Mobile Hero
  await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/verified_mobile_hero.png', clip: { x: 0, y: 0, width: 390, height: 844 } });

  // 2. Open Mobile Navigation
  const toggle = await page.$('#navToggle');
  if (toggle) {
    await toggle.click();
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/verified_mobile_menu.png', clip: { x: 0, y: 0, width: 390, height: 600 } });
    await toggle.click(); // close it
    await new Promise(r => setTimeout(r, 200));
  }

  // 3. Contact Direct Call Box
  const contact = await page.$('#contact');
  if (contact) {
    await contact.scrollIntoView();
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/verified_mobile_contact.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
  }

  await browser.close();
  console.log('Saved verified mobile screenshots.');
}

captureVerification().catch(console.error);
