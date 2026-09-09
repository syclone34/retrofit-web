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

  console.log('Navigating to blustinlaw.com...');
  await page.goto('https://blustinlaw.com/', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 4000));

  const pageData = await page.evaluate(() => {
    // Navigation links
    const nav = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
      text: a.innerText.trim().replace(/\s+/g, ' '),
      href: a.href
    })).filter(a => a.text.length > 0);

    // Headings
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim().replace(/\s+/g, ' ')
    })).filter(h => h.text.length > 0);

    // Paragraphs / text sections
    const textNodes = Array.from(document.querySelectorAll('p, li, blockquote')).map(p => 
      p.innerText.trim().replace(/\s+/g, ' ')
    ).filter(t => t.length > 15);

    // Images
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight
    })).filter(i => i.src && !i.src.includes('data:image'));

    return {
      title: document.title,
      nav,
      headings,
      textNodes: Array.from(new Set(textNodes)),
      images
    };
  });

  fs.writeFileSync('blustin_data.json', JSON.stringify(pageData, null, 2));
  console.log('Saved blustin_data.json');
  console.log('Title:', pageData.title);
  console.log('Headings found:', pageData.headings.length);
  console.log('Images found:', pageData.images.length);

  await page.screenshot({ path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/blustin_original.png', fullPage: true });
  console.log('Captured blustin_original.png screenshot');

  await browser.close();
})();
