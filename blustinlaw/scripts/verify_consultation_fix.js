const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  // 1. Client Services Consultation Section
  const clientServicesPath = 'file:///' + path.resolve(__dirname, 'blustinlaw/client-services.html').replace(/\\/g, '/');
  console.log('Navigating to:', clientServicesPath);
  await page.goto(clientServicesPath, { waitUntil: 'networkidle0' });

  // Scroll to consultation section
  const consultSection = await page.$('#contact');
  if (consultSection) {
    await consultSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/fixed_consultation_client_services.png'
    });
    console.log('Saved fixed_consultation_client_services.png');
  }

  // 2. Index page consultation section
  const indexPath = 'file:///' + path.resolve(__dirname, 'blustinlaw/index.html').replace(/\\/g, '/');
  await page.goto(indexPath, { waitUntil: 'networkidle0' });
  const indexContact = await page.$('#contact');
  if (indexContact) {
    await indexContact.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/fixed_consultation_index.png'
    });
    console.log('Saved fixed_consultation_index.png');
  }

  // 3. Mobile viewport test on Client Services
  await page.setViewport({ width: 414, height: 896 });
  await page.goto(clientServicesPath, { waitUntil: 'networkidle0' });
  const mobileContact = await page.$('#contact');
  if (mobileContact) {
    await mobileContact.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({
      path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/fixed_consultation_mobile.png'
    });
    console.log('Saved fixed_consultation_mobile.png');
  }

  await browser.close();
  console.log('Verification finished successfully.');
})();
