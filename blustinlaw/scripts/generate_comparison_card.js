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

  const oldLogoImg = 'data:image/png;base64,' + fs.readFileSync('blustinlaw/assets/img/logo_law_ribbon.png').toString('base64');
  const newLogoImg = 'data:image/png;base64,' + fs.readFileSync('blustinlaw/assets/img/logo_law.png').toString('base64');
  const whiteLogoImg = 'data:image/png;base64,' + fs.readFileSync('blustinlaw/assets/img/logo_white_card.png').toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #040d1a;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 1100px;
        }
        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        h2 span {
          color: #c5a059;
          font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .card {
          background: rgba(15, 36, 66, 0.6);
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 12px;
          padding: 24px 30px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-tag {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 4px 12px;
          border-radius: 99px;
        }
        .tag-old {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }
        .tag-new {
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }
        .tag-opt {
          background: rgba(197, 160, 89, 0.2);
          color: #dfbe7e;
          border: 1px solid rgba(197, 160, 89, 0.4);
        }
        .preview-box {
          background: #071324;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 16px 24px;
          height: 100px;
          display: flex;
          align-items: center;
        }
        .desc {
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <h2>Logo Readability Redesign <span>Direct Comparison</span></h2>

      <div class="comparison-grid">
        <!-- New Primary Design -->
        <div class="card" style="border-color: rgba(74, 222, 128, 0.5); background: rgba(15, 36, 66, 0.9);">
          <div class="card-header">
            <h3 style="font-size: 17px; color: #ffffff;">Current Active: Horizontal Transparent Lockup (Recommended)</h3>
            <span class="card-tag tag-new">Active on Site</span>
          </div>
          <div class="preview-box">
            <img src="${newLogoImg}" style="height: 64px; width: auto; display: block;" alt="New Readable Logo">
          </div>
          <p class="desc">Razor-sharp 25px serif firm name with high-contrast 11.5px bold warm-gold subtitle. Integrates seamlessly into the dark header without square card borders. 100% readable at 100% zoom.</p>
        </div>

        <!-- White Card Alternative -->
        <div class="card">
          <div class="card-header">
            <h3 style="font-size: 17px; color: #ffffff;">Alternative Option: Horizontal White Prestige Card Badge</h3>
            <span class="card-tag tag-opt">Available on Demand</span>
          </div>
          <div class="preview-box">
            <img src="${whiteLogoImg}" style="height: 60px; width: auto; display: block;" alt="White Card Logo">
          </div>
          <p class="desc">Crisp, self-contained white card badge with gold divider line. Features bold deep-navy firm name and royal-navy subtitle for maximum contrast.</p>
        </div>

        <!-- Old Design -->
        <div class="card" style="opacity: 0.65;">
          <div class="card-header">
            <h3 style="font-size: 17px; color: #cbd5e1;">Previous Stacked Design (Why it was unreadable)</h3>
            <span class="card-tag tag-old">Replaced</span>
          </div>
          <div class="preview-box">
            <img src="${oldLogoImg}" style="height: 60px; width: auto; display: block;" alt="Old Small Logo">
          </div>
          <p class="desc">Crammed into a square card with 8px subtitle. When rendered in the header at 60px height, the text shrunk down to ~3.5px physical height, rendering it illegible.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/logo_readability_comparison.png',
    fullPage: true
  });
  console.log('Saved logo_readability_comparison.png');

  await browser.close();
})();
