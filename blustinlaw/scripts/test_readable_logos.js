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
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  const logoBase64 = fs.readFileSync('blustinlaw/assets/img/logo.jpg').toString('base64');
  const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { padding: 40px; background: #071324; display: flex; flex-direction: column; gap: 36px; }
        
        /* -------------------------------------------------------------
           OPTION 1: HORIZONTAL LOCKUP (Maximum Readability)
           Mark on the left, Large Firm Name & Descriptor on the right
           All rendered as a single unified logo graphic on dark header!
           ------------------------------------------------------------- */
        .logo-horizontal-dark {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 6px 0;
          cursor: pointer;
        }
        .logo-horizontal-dark .mark-badge {
          height: 64px;
          width: auto;
          background: #ffffff;
          padding: 3px 6px;
          border-radius: 5px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
        }
        .logo-horizontal-dark .mark-badge img {
          height: 58px;
          width: auto;
          display: block;
        }
        .logo-horizontal-dark .text-col {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .logo-horizontal-dark .firm-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1.1;
          white-space: nowrap;
        }
        .logo-horizontal-dark .firm-tagline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           OPTION 2: HORIZONTAL WHITE BADGE (Single Self-Contained Card)
           Entire lockup inside a crisp white card with prominent text
           ------------------------------------------------------------- */
        .logo-horizontal-white {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          padding: 6px 16px 6px 8px;
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          cursor: pointer;
        }
        .logo-horizontal-white img {
          height: 54px;
          width: auto;
          display: block;
        }
        .logo-horizontal-white .divider {
          width: 1.5px;
          height: 44px;
          background: #c5a059;
        }
        .logo-horizontal-white .text-col {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .logo-horizontal-white .firm-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #071324;
          letter-spacing: 0.01em;
          line-height: 1.1;
          white-space: nowrap;
        }
        .logo-horizontal-white .firm-tagline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: #003f7f;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           OPTION 3: LARGE STACKED EMBLEM BADGE
           Tightly cropped mark with much larger, bold high-contrast text
           ------------------------------------------------------------- */
        .logo-stacked-large {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          padding: 8px 14px 9px;
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          width: 250px;
        }
        .logo-stacked-large img {
          width: 100%;
          height: auto;
          display: block;
        }
        .logo-stacked-large .bottom-bar {
          margin-top: 6px;
          background: #003f7f;
          width: 100%;
          border-radius: 3px;
          padding: 5px 8px;
          text-align: center;
        }
        .logo-stacked-large .bottom-bar span {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          display: block;
        }

        /* -------------------------------------------------------------
           OPTION 4: COMPACT LARGE STACKED WHITE BADGE (Gold Accent)
           ------------------------------------------------------------- */
        .logo-stacked-gold-bar {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          padding: 8px 14px 10px;
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          width: 240px;
        }
        .logo-stacked-gold-bar img {
          width: 100%;
          height: auto;
          display: block;
        }
        .logo-stacked-gold-bar .divider {
          width: 100%;
          height: 2px;
          background: #c5a059;
          margin: 6px 0 5px;
        }
        .logo-stacked-gold-bar .tagline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #071324;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          white-space: nowrap;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h3 style="color:#c5a059; font-family:'Plus Jakarta Sans', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Option 1: Horizontal Emblem (Seamless on Dark Navy Header)</h3>
      <div id="opt1" class="logo-horizontal-dark">
        <div class="mark-badge">
          <img src="${logoDataUri}" alt="Blustin & Associates">
        </div>
        <div class="text-col">
          <div class="firm-title">Blustin &amp; Associates, PLLC</div>
          <div class="firm-tagline">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <h3 style="color:#c5a059; font-family:'Plus Jakarta Sans', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Option 2: Horizontal White Card Badge (Self-Contained Image)</h3>
      <div id="opt2" class="logo-horizontal-white">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="divider"></div>
        <div class="text-col">
          <div class="firm-title">Blustin &amp; Associates</div>
          <div class="firm-tagline">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <h3 style="color:#c5a059; font-family:'Plus Jakarta Sans', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Option 3: Stacked Large Badge with Navy Banner (High Contrast)</h3>
      <div id="opt3" class="logo-stacked-large">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="bottom-bar">
          <span>Attorneys &amp; Counselors at Law</span>
        </div>
      </div>

      <h3 style="color:#c5a059; font-family:'Plus Jakarta Sans', sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em;">Option 4: Stacked Large Badge with Gold Line (Clean & Bold)</h3>
      <div id="opt4" class="logo-stacked-gold-bar">
        <img src="${logoDataUri}" alt="Blustin & Associates">
        <div class="divider"></div>
        <div class="tagline">Attorneys &amp; Counselors at Law</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/readable_logo_options.png',
    clip: { x: 0, y: 0, width: 900, height: 800 }
  });
  console.log('readable_logo_options.png saved!');

  // Export each option as transparent PNG
  for (const id of ['opt1', 'opt2', 'opt3', 'opt4']) {
    const el = await page.$('#' + id);
    await el.screenshot({
      path: `blustinlaw/assets/img/logo_${id}.png`,
      omitBackground: true
    });
  }
  console.log('Exported all 4 options!');

  await browser.close();
})();
