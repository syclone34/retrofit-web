const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log('Navigating to about-us...');
  await page.goto('https://blustinlaw.com/about-us', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about_us_live.png',
    fullPage: true
  });
  console.log('Screenshot saved to blustin_about_us_live.png!');

  const allImages = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('*').forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none' && bg.startsWith('url(')) {
        results.push({ type: 'background', raw: bg, tag: el.tagName, text: (el.innerText || '').slice(0, 30) });
      }
      if (el.tagName === 'IMG') {
        results.push({ type: 'img', url: el.src, alt: el.alt, width: el.naturalWidth, height: el.naturalHeight });
      }
    });
    return results;
  });

  fs.writeFileSync('all_about_us_images.json', JSON.stringify(allImages, null, 2));
  console.log('Done!');
  await browser.close();
})();
