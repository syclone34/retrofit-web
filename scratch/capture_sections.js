const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');

async function captureSections() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('file:///c:/Users/syclo/retrofit-web/index.html');

  const deck = await page.$('.hero-interactive-deck');
  if (deck) {
    await deck.scrollIntoView();
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_deck_current.png' });
  }

  const comp = await page.$('#comparison');
  if (comp) {
    await comp.scrollIntoView();
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_comp_current.png' });
  }

  const contact = await page.$('#contact');
  if (contact) {
    await contact.scrollIntoView();
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_contact_current.png' });
  }

  await browser.close();
  console.log('Captured mobile views.');
}

captureSections().catch(console.error);
