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
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

  const logoBase64 = fs.readFileSync('blustinlaw/assets/img/logo.jpg').toString('base64');
  const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;

  // Option 1: Refined White Card Badge with Gold Line
  // Option 2: Navy Bar Badge with Gold Letters
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { padding: 40px; background: #071324; display: flex; gap: 30px; align-items: flex-start; }
        
        /* Master Option: Elegant unified white card with crisp navy/gold tagline */
        .unified-logo {
          background: #ffffff;
          border-radius: 6px;
          padding: 7px 12px 8px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          width: 220px;
        }
        .unified-logo img {
          width: 100%;
          height: auto;
          display: block;
        }
        .unified-logo .rule {
          width: 100%;
          height: 1.5px;
          background: linear-gradient(90deg, #c5a059 0%, #dfc282 50%, #c5a059 100%);
          margin: 4px 0 3px;
        }
        .unified-logo .tagline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 800;
          color: #071324;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
          text-align: center;
        }

        /* Master Option 2: Dark Navy Tagline Ribbon */
        .unified-logo-ribbon {
          background: #ffffff;
          border-radius: 6px;
          padding: 7px 10px 8px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          width: 220px;
        }
        .unified-logo-ribbon img {
          width: 100%;
          height: auto;
          display: block;
        }
        .unified-logo-ribbon .ribbon {
          width: 100%;
          background: #071324;
          border-radius: 3px;
          margin-top: 4px;
          padding: 3px 6px;
          text-align: center;
        }
        .unified-logo-ribbon .ribbon-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 8px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="unified-gold-rule" class="unified-logo">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="rule"></div>
        <div class="tagline">Attorneys &amp; Counselors at Law</div>
      </div>

      <div id="unified-navy-ribbon" class="unified-logo-ribbon">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="ribbon">
          <div class="ribbon-text">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Export unified-gold-rule as blustinlaw/assets/img/logo_law.png
  const el1 = await page.$('#unified-gold-rule');
  await el1.screenshot({
    path: 'blustinlaw/assets/img/logo_law.png',
    omitBackground: true
  });
  console.log('Saved blustinlaw/assets/img/logo_law.png');

  // Export unified-navy-ribbon as blustinlaw/assets/img/logo_law_ribbon.png
  const el2 = await page.$('#unified-navy-ribbon');
  await el2.screenshot({
    path: 'blustinlaw/assets/img/logo_law_ribbon.png',
    omitBackground: true
  });
  console.log('Saved blustinlaw/assets/img/logo_law_ribbon.png');

  // Screenshot preview in artifact dir
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/logo_final_options.png',
    clip: { x: 0, y: 0, width: 600, height: 300 }
  });

  await browser.close();
})();
