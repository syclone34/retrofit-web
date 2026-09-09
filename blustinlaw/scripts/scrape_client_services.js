const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('https://blustinlaw.com/client-services', { waitUntil: 'networkidle2', timeout: 30000 });

  const data = await page.evaluate(() => {
    const title = document.title;
    // Extract main sections or text blocks
    const content = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, ul, ol, a, img');
    elements.forEach(el => {
      const tag = el.tagName.toLowerCase();
      const text = el.innerText ? el.innerText.trim() : '';
      const src = el.src || '';
      const href = el.href || '';
      if (text || src) {
        content.push({ tag, text, src, href });
      }
    });
    return { title, bodyText: document.body.innerText, content };
  });

  fs.writeFileSync('blustin_client_services_scraped.json', JSON.stringify(data, null, 2));
  console.log('Saved blustin_client_services_scraped.json');
  console.log('Body Text Snippet:');
  console.log(data.bodyText.substring(0, 2500));

  await browser.close();
})();
