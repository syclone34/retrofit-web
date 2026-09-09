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
  await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 3 });

  const logoBase64 = fs.readFileSync('blustinlaw/assets/img/logo.jpg').toString('base64');
  const logoDataUri = `data:image/jpeg;base64,${logoBase64}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
          background: transparent !important; 
          padding: 30px; 
          display: flex; 
          flex-direction: column; 
          gap: 30px; 
          align-items: flex-start;
        }

        /* -------------------------------------------------------------
           STYLE 1: TRANSPARENT HORIZONTAL LOCKUP (Header Seamless)
           ------------------------------------------------------------- */
        #logo-transparent {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 6px 10px;
          width: fit-content;
        }
        #logo-transparent .mark-badge {
          height: 60px;
          width: auto;
          background: #ffffff;
          padding: 4px 6px;
          border-radius: 6px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        #logo-transparent .mark-badge img {
          height: 52px;
          width: auto;
          display: block;
        }
        #logo-transparent .text-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        #logo-transparent .firm-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 25px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.015em;
          line-height: 1.1;
          white-space: nowrap;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        #logo-transparent .firm-sub {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           STYLE 2: WHITE CARD BADGE (Prestige Self-Contained Card)
           ------------------------------------------------------------- */
        #logo-white-card {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          padding: 8px 18px 8px 10px;
          border-radius: 7px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px rgba(197, 160, 89, 0.4);
          width: fit-content;
        }
        #logo-white-card .mark-img {
          height: 56px;
          width: auto;
          display: block;
          flex-shrink: 0;
        }
        #logo-white-card .divider {
          width: 2px;
          height: 46px;
          background: linear-gradient(180deg, #c5a059 0%, #dfbe7e 50%, #c5a059 100%);
          border-radius: 1px;
          flex-shrink: 0;
        }
        #logo-white-card .text-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        #logo-white-card .firm-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #071324;
          letter-spacing: 0.01em;
          line-height: 1.15;
          white-space: nowrap;
        }
        #logo-white-card .firm-sub {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          color: #003f7f;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           STYLE 3: LARGE STACKED EMBLEM (For Stacked Admirers)
           ------------------------------------------------------------- */
        #logo-stacked {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          padding: 10px 14px 12px;
          border-radius: 7px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px rgba(197, 160, 89, 0.35);
          width: 280px;
        }
        #logo-stacked .mark-img {
          width: 100%;
          height: auto;
          display: block;
        }
        #logo-stacked .banner {
          margin-top: 8px;
          width: 100%;
          background: #003f7f;
          border-radius: 4px;
          padding: 6px 4px;
          text-align: center;
        }
        #logo-stacked .banner-text {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="logo-transparent">
        <div class="mark-badge">
          <img src="${logoDataUri}" alt="Blustin & Associates">
        </div>
        <div class="text-group">
          <div class="firm-name">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <div id="logo-white-card">
        <img class="mark-img" src="${logoDataUri}" alt="Blustin & Associates">
        <div class="divider"></div>
        <div class="text-group">
          <div class="firm-name">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <div id="logo-stacked">
        <img class="mark-img" src="${logoDataUri}" alt="Blustin & Associates">
        <div class="banner">
          <div class="banner-text">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // 1. Export Transparent Horizontal as logo_law.png (default active) & logo_horizontal_transparent.png
  const elTrans = await page.$('#logo-transparent');
  await elTrans.screenshot({
    path: 'blustinlaw/assets/img/logo_law.png',
    omitBackground: true
  });
  await elTrans.screenshot({
    path: 'blustinlaw/assets/img/logo_horizontal_transparent.png',
    omitBackground: true
  });
  console.log('Saved logo_law.png and logo_horizontal_transparent.png');

  // 2. Export White Card as logo_white_card.png
  const elWhite = await page.$('#logo-white-card');
  await elWhite.screenshot({
    path: 'blustinlaw/assets/img/logo_white_card.png',
    omitBackground: true
  });
  console.log('Saved logo_white_card.png');

  // 3. Export Stacked as logo_stacked.png
  const elStacked = await page.$('#logo-stacked');
  await elStacked.screenshot({
    path: 'blustinlaw/assets/img/logo_stacked.png',
    omitBackground: true
  });
  console.log('Saved logo_stacked.png');

  await browser.close();
})();
