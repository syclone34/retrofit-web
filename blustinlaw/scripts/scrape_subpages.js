const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // 1. Client Services
  console.log('Scraping client-services...');
  await page.goto('https://blustinlaw.com/client-services', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 3000));
  const servicesData = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
    const text = Array.from(document.querySelectorAll('p, li')).map(p => p.innerText.trim()).filter(t => t.length > 20);
    const imgs = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt }));
    return { headings, text: Array.from(new Set(text)), imgs };
  });
  fs.writeFileSync('blustin_services.json', JSON.stringify(servicesData, null, 2));

  // 2. About Us
  console.log('Scraping about-us...');
  await page.goto('https://blustinlaw.com/about-us', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 3000));
  const aboutData = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
    const text = Array.from(document.querySelectorAll('p, li')).map(p => p.innerText.trim()).filter(t => t.length > 20);
    const imgs = Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt }));
    return { headings, text: Array.from(new Set(text)), imgs };
  });
  fs.writeFileSync('blustin_about.json', JSON.stringify(aboutData, null, 2));

  await page.screenshot({ path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_about.png', fullPage: true });

  await browser.close();
  console.log('Done scraping subpages!');
})();
