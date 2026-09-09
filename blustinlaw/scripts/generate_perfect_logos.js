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
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          padding: 40px; 
          background: #071324; 
          display: flex; 
          flex-direction: column; 
          gap: 40px; 
          align-items: flex-start;
        }

        /* ============================================================
           VARIATION A: HORIZONTAL SEAMLESS EMBLEM (DARK HEADER)
           Icon mark on pure white badge + Large Serif Name + Gold Subtitle
           Ultra-sharp, authoritative, modern executive look
           ============================================================ */
        .logo-var-a {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 4px 6px;
          width: fit-content;
        }
        .logo-var-a .mark-badge {
          height: 64px;
          width: auto;
          background: #ffffff;
          padding: 4px 6px;
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(197, 160, 89, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .logo-var-a .mark-badge img {
          height: 56px;
          width: auto;
          display: block;
        }
        .logo-var-a .text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .logo-var-a .firm-name {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.015em;
          line-height: 1.1;
          white-space: nowrap;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .logo-var-a .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* ============================================================
           VARIATION B: HORIZONTAL WHITE PRESTIGE CARD
           Self-contained badge on pure white with crisp navy/gold
           ============================================================ */
        .logo-var-b {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          padding: 7px 18px 7px 9px;
          border-radius: 7px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(197, 160, 89, 0.4);
          width: fit-content;
        }
        .logo-var-b .mark-img {
          height: 58px;
          width: auto;
          display: block;
          flex-shrink: 0;
        }
        .logo-var-b .divider-line {
          width: 2px;
          height: 48px;
          background: linear-gradient(180deg, #c5a059 0%, #dfbe7e 50%, #c5a059 100%);
          border-radius: 1px;
          flex-shrink: 0;
        }
        .logo-var-b .text-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .logo-var-b .firm-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #071324;
          letter-spacing: 0.01em;
          line-height: 1.15;
          white-space: nowrap;
        }
        .logo-var-b .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #003f7f;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* ============================================================
           VARIATION C: HORIZONTAL LUXURY GOLD ACCENT CARD
           Deep Navy background card with gold border and gold typography
           ============================================================ */
        .logo-var-c {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #0a1b32;
          border: 1px solid rgba(197, 160, 89, 0.45);
          padding: 7px 18px 7px 8px;
          border-radius: 7px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.5);
          width: fit-content;
        }
        .logo-var-c .mark-badge {
          background: #ffffff;
          padding: 3px 5px;
          border-radius: 5px;
          display: flex;
          align-items: center;
        }
        .logo-var-c .mark-badge img {
          height: 52px;
          width: auto;
          display: block;
        }
        .logo-var-c .text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .logo-var-c .firm-name {
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1.1;
          white-space: nowrap;
        }
        .logo-var-c .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #dfbe7e;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <div id="var-a" class="logo-var-a">
        <div class="mark-badge">
          <img src="${logoDataUri}" alt="Blustin & Associates">
        </div>
        <div class="text-group">
          <div class="firm-name">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <div id="var-b" class="logo-var-b">
        <img class="mark-img" src="${logoDataUri}" alt="Blustin & Associates">
        <div class="divider-line"></div>
        <div class="text-group">
          <div class="firm-name">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <div id="var-c" class="logo-var-c">
        <div class="mark-badge">
          <img src="${logoDataUri}" alt="Blustin & Associates">
        </div>
        <div class="text-group">
          <div class="firm-name">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Export each variant as a transparent crisp PNG
  const exportList = [
    { id: 'var-a', name: 'logo_horizontal_transparent.png' },
    { id: 'var-b', name: 'logo_horizontal_white_card.png' },
    { id: 'var-c', name: 'logo_horizontal_navy_card.png' }
  ];

  for (const item of exportList) {
    const el = await page.$('#' + item.id);
    await el.screenshot({
      path: path.join('blustinlaw/assets/img', item.name),
      omitBackground: true
    });
    console.log(`Saved blustinlaw/assets/img/${item.name}`);
  }

  // Also take a showcase image of all three
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/showcase_readable_logos.png',
    clip: { x: 20, y: 20, width: 620, height: 440 }
  });
  console.log('Saved showcase_readable_logos.png');

  await browser.close();
})();
