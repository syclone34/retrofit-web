const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Test 1: Desktop 1920x1080
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
  console.log('Navigating to', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const desktopBoxes = await page.evaluate(() => {
    const nav = document.querySelector('.nav-island');
    const heroSec = document.querySelector('.hero-section');
    const heroCont = document.querySelector('.hero-section .container');
    const heroGrid = document.querySelector('.hero-grid');
    const heroLeft = document.querySelector('.hero-content');
    const heroRight = document.querySelector('.hero-visual-wrapper');

    const getBox = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
    };

    return {
      navIsland: getBox(nav),
      heroContainer: getBox(heroCont),
      heroGrid: getBox(heroGrid),
      heroLeft: getBox(heroLeft),
      heroRight: getBox(heroRight),
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth
    };
  });

  console.log('DESKTOP 1920x1080:');
  console.log(JSON.stringify(desktopBoxes, null, 2));

  const artifactDesktop = 'C:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/desktop_1920_verified.png';
  await page.screenshot({ path: artifactDesktop, clip: { x: 0, y: 0, width: 1920, height: 950 } });

  // Test 2: Mobile 390x844
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const mobileBoxes = await page.evaluate(() => {
    const heroCont = document.querySelector('.hero-section .container');
    const heroGrid = document.querySelector('.hero-grid');
    const heroTitle = document.querySelector('.hero-title');
    const heroRight = document.querySelector('.hero-visual-wrapper');

    const getBox = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
    };

    return {
      heroContainer: getBox(heroCont),
      heroGrid: getBox(heroGrid),
      heroTitle: getBox(heroTitle),
      heroRight: getBox(heroRight),
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth,
      hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth
    };
  });

  console.log('MOBILE 390x844:');
  console.log(JSON.stringify(mobileBoxes, null, 2));

  const artifactMobile = 'C:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_390_verified_final.png';
  await page.screenshot({ path: artifactMobile, clip: { x: 0, y: 0, width: 390, height: 844 } });

  await browser.close();
  console.log('DONE_SUCCESS');
})();
