const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const logoBase64 = fs.readFileSync('blustinlaw/assets/img/logo.jpg').toString('base64');
  const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; padding: 50px; background: #071324; display: flex; flex-direction: column; gap: 40px; align-items: flex-start; }
        
        /* Variation 1: Clean White Card with Gold Divider */
        .logo-box-1 {
          background: #ffffff;
          border-radius: 6px;
          padding: 8px 14px 10px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 18px rgba(0,0,0,0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .logo-box-1 img {
          height: 52px;
          width: auto;
          display: block;
        }
        .logo-box-1 .tagline {
          margin-top: 5px;
          padding-top: 4px;
          border-top: 1.5px solid #c5a059;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          color: #071324;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
          text-align: center;
          width: 100%;
        }

        /* Variation 2: Navy & Gold Pill Banner at Bottom */
        .logo-box-2 {
          background: #ffffff;
          border-radius: 6px;
          padding: 8px 12px 9px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 18px rgba(0,0,0,0.35);
        }
        .logo-box-2 img {
          height: 50px;
          width: auto;
          display: block;
        }
        .logo-box-2 .tagline-bar {
          margin-top: 5px;
          padding: 4px 10px;
          background: #071324;
          border-radius: 3px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9px;
          font-weight: 700;
          color: #c5a059;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }

        /* Variation 3: Sleek Dark Header Emblem */
        .logo-box-3 {
          background: linear-gradient(180deg, #0d213d 0%, #081629 100%);
          border: 1.5px solid #c5a059;
          border-radius: 8px;
          padding: 8px 16px 10px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        }
        .logo-box-3 .top-img-wrap {
          background: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .logo-box-3 img {
          height: 48px;
          width: auto;
          display: block;
        }
        .logo-box-3 .tagline {
          margin-top: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-align: center;
        }
        .logo-box-3 .tagline span {
          color: #c5a059;
        }
      </style>
    </head>
    <body>
      <div id="v1" class="logo-box-1">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="tagline">Attorneys &amp; Counselors at Law</div>
      </div>

      <div id="v2" class="logo-box-2">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="tagline-bar">Attorneys &amp; Counselors at Law</div>
      </div>

      <div id="v3" class="logo-box-3">
        <div class="top-img-wrap">
          <img src="${logoDataUri}" alt="Blustin & Associates">
        </div>
        <div class="tagline">Attorneys <span>&amp;</span> Counselors at Law</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/logo_variations.png',
    clip: { x: 0, y: 0, width: 600, height: 650 }
  });
  console.log('logo_variations.png saved with images!');

  for (const id of ['v1', 'v2', 'v3']) {
    const el = await page.$('#' + id);
    await el.screenshot({
      path: `blustinlaw/assets/img/logo_${id}.png`
    });
    console.log(`Saved logo_${id}.png`);
  }

  await browser.close();
})();
