const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function testSubmit(url, outName) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Scroll to contact form
  await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView();
  });

  await new Promise(r => setTimeout(r, 600));

  // Fill form
  await page.type('#clientName', 'Dave Miller');
  await page.type('#businessName', 'Miller Heating & Air');
  await page.type('#clientEmail', 'dave@millerhvac.com');
  await page.type('#clientPhone', '(612) 555-0199');

  // Submit form
  await page.click('#formSubmitBtn');

  // Wait for submission animation / promise resolution (1.5s)
  await new Promise(r => setTimeout(r, 2000));

  const shot = await page.screenshot({ fullPage: false });
  const outPath = 'c:/Users/syclo/.gemini/antigravity-ide/brain/cd91ac65-82f2-4a97-b20f-38673a4d9d79/' + outName;
  fs.writeFileSync(outPath, shot);
  console.log('Saved screenshot to:', outPath);

  // Check formSuccess computed style and display
  const status = await page.evaluate(() => {
    const fsEl = document.getElementById('formSuccess');
    const cForm = document.getElementById('contactForm');
    const card = document.querySelector('.contact-form-card');
    return {
      cFormDisplay: window.getComputedStyle(cForm).display,
      formSuccessDisplay: window.getComputedStyle(fsEl).display,
      formSuccessClasses: fsEl.className,
      cardHeight: card.offsetHeight,
      cardWidth: card.offsetWidth
    };
  });
  console.log('Status after submit:', status);

  await browser.close();
}

(async () => {
  console.log('--- Testing v2/index.html ---');
  await testSubmit('file:///c:/Users/syclo/retrofit-web/v2/index.html', 'submit_test_v2.png');
  console.log('--- Testing root index.html ---');
  await testSubmit('file:///c:/Users/syclo/retrofit-web/index.html', 'submit_test_root.png');
})();
