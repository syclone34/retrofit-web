const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

async function testScanner() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  const fileUrl = 'file:///' + path.resolve('c:/Users/syclo/retrofit-web/v2/index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });

  console.log('1. Page loaded');

  // Test 1: Click Legacy WordPress HVAC chip
  console.log('2. Testing Legacy WordPress HVAC chip...');
  await page.click('.sample-chip-btn[data-url="outdated-hvac-contractor.com"]');
  
  await page.waitForSelector('#scannerResults.active', { timeout: 8000 });
  const perfHvac = await page.$eval('#textPerf', el => el.textContent);
  console.log('   HVAC Result Score:', perfHvac);

  // Test 2: Click DIY Wix Roofing chip
  console.log('3. Testing DIY Wix Roofing chip...');
  await page.click('.sample-chip-btn[data-url="diy-builder-roofing.com"]');
  await page.waitForSelector('#scannerResults.active', { timeout: 8000 });
  const perfDiy = await page.$eval('#textPerf', el => el.textContent);
  console.log('   DIY Result Score:', perfDiy);

  // Test 3: Click Flagship RetroFit chip
  console.log('4. Testing Flagship RetroFit chip...');
  await page.click('.sample-chip-btn[data-url="retrofitwebdesign.com"]');
  await page.waitForSelector('#scannerResults.active', { timeout: 8000 });
  const perfRetro = await page.$eval('#textPerf', el => el.textContent);
  console.log('   RetroFit Result Score:', perfRetro);

  // Test 4: Custom domain input
  console.log('5. Testing Custom domain input...');
  await page.$eval('#scanUrlInput', el => el.value = 'custom-contractor-test.com');
  await page.click('#scanSubmitBtn');
  await page.waitForSelector('#scannerResults.active', { timeout: 8000 });
  const perfCustom = await page.$eval('#textPerf', el => el.textContent);
  console.log('   Custom Domain Result Score:', perfCustom);

  await browser.close();
  console.log('All scanner tests PASSED perfectly with no hangs or infinite spins!');
}

testScanner().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
