const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');

async function testAndroidDevices() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Test various Android viewports
  const devices = [
    { name: 'Android_360x800', width: 360, height: 800, scale: 3 },
    { name: 'Android_392x872', width: 392, height: 872, scale: 2.75 },
    { name: 'Android_412x915', width: 412, height: 915, scale: 2.625 }
  ];

  for (const d of devices) {
    await page.setViewport({
      width: d.width,
      height: d.height,
      deviceScaleFactor: d.scale,
      isMobile: true,
      hasTouch: true
    });
    await page.goto('file:///c:/Users/syclo/retrofit-web/index.html', { waitUntil: 'networkidle0' });

    // Measure hero elements
    const metrics = await page.evaluate(() => {
      const W = window.innerWidth;
      const hero = document.querySelector('.hero-section');
      const container = document.querySelector('.hero-section .container');
      const content = document.querySelector('.hero-content');
      const badge = document.querySelector('.hero-content .badge');
      const title = document.querySelector('.hero-title');
      const desc = document.querySelector('.hero-desc');
      const btn = document.querySelector('.hero-cta-group .btn-primary');

      return {
        viewportWidth: W,
        containerWidth: container ? container.offsetWidth : null,
        contentWidth: content ? content.offsetWidth : null,
        badgeRight: badge ? badge.getBoundingClientRect().right : null,
        titleRight: title ? title.getBoundingClientRect().right : null,
        descRight: desc ? desc.getBoundingClientRect().right : null,
        btnRight: btn ? btn.getBoundingClientRect().right : null,
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth
      };
    });

    console.log(`=== ${d.name} ===`);
    console.log(JSON.stringify(metrics, null, 2));

    await page.screenshot({
      path: `c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/android_test_${d.name}.png`,
      clip: { x: 0, y: 0, width: d.width, height: d.height }
    });
  }

  await browser.close();
  console.log('Android tests complete.');
}

testAndroidDevices().catch(console.error);
