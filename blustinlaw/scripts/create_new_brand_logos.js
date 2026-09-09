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
  await page.setViewport({ width: 1400, height: 1200, deviceScaleFactor: 3 });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: transparent !important;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          align-items: flex-start;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .showcase-title {
          color: #ffffff;
          font-size: 22px;
          font-family: 'Playfair Display', serif;
          border-bottom: 2px solid #c5a059;
          padding-bottom: 8px;
          margin-bottom: -10px;
        }

        /* -------------------------------------------------------------
           CONCEPT 1: PURE EXECUTIVE WORDMARK (What user screenshotted!)
           Clean, timeless, authoritative, zero bulky icon.
           ------------------------------------------------------------- */
        #new-logo-1 {
          display: inline-flex;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          padding: 8px 12px;
          width: fit-content;
          cursor: pointer;
        }
        #new-logo-1 .title-row {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.02em;
          line-height: 1.1;
          white-space: nowrap;
          display: flex;
          align-items: baseline;
        }
        #new-logo-1 .gold-amp {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 30px;
          font-weight: 600;
          color: #dfbe7e;
          margin: 0 4px;
        }
        #new-logo-1 .pllc {
          font-size: 21px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.04em;
        }
        #new-logo-1 .sub-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        #new-logo-1 .sub-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, #c5a059 0%, rgba(197, 160, 89, 0.2) 100%);
        }
        #new-logo-1 .tagline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           CONCEPT 2: BESPOKE GOLD "B" MONOGRAM SHIELD
           Custom modern geometric crest with legal balance line + B
           ------------------------------------------------------------- */
        #new-logo-2 {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 8px 12px;
          width: fit-content;
          cursor: pointer;
        }
        #new-logo-2 .emblem-box {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #0d223f 0%, #061221 100%);
          border: 1.5px solid #c5a059;
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 0 12px rgba(197, 160, 89, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        #new-logo-2 .emblem-box::after {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 7px;
          pointer-events: none;
        }
        #new-logo-2 .emblem-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, #dfbe7e 0%, #c5a059 50%, #9a732a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          transform: translateY(-1px);
        }
        #new-logo-2 .text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        #new-logo-2 .firm-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 25px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.015em;
          line-height: 1.1;
          white-space: nowrap;
        }
        #new-logo-2 .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           CONCEPT 3: CLASSICAL LEGAL PILLARS & BALANCE CREST (Vector SVG)
           Architectural columns of justice in warm gold
           ------------------------------------------------------------- */
        #new-logo-3 {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 8px 12px;
          width: fit-content;
          cursor: pointer;
        }
        #new-logo-3 .icon-svg {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
        }
        #new-logo-3 .text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        #new-logo-3 .firm-title {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
          line-height: 1.15;
          white-space: nowrap;
        }
        #new-logo-3 .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: #dfbe7e;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }

        /* -------------------------------------------------------------
           CONCEPT 4: PRESTIGE INTERLOCKING "B&A" SEAL
           Luxury circular coin crest with interlocking monogram
           ------------------------------------------------------------- */
        #new-logo-4 {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: transparent;
          padding: 8px 12px;
          width: fit-content;
          cursor: pointer;
        }
        #new-logo-4 .circle-seal {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          border-radius: 50%;
          background: radial-gradient(circle, #0e274b 0%, #061120 100%);
          border: 2px solid #c5a059;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5);
        }
        #new-logo-4 .circle-seal::before {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          border: 1px dashed rgba(197, 160, 89, 0.45);
        }
        #new-logo-4 .seal-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          font-style: italic;
          background: linear-gradient(135deg, #ffffff 0%, #dfbe7e 60%, #c5a059 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        #new-logo-4 .text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        #new-logo-4 .firm-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 25px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.015em;
          line-height: 1.1;
          white-space: nowrap;
        }
        #new-logo-4 .firm-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 800;
          color: #c5a059;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }
      </style>
    </head>
    <body>
      <h3 class="showcase-title">1. Pure Executive Wordmark (Clean & Timeless - Based on Your Crop)</h3>
      <div id="new-logo-1">
        <div class="title-row">
          <span>Blustin</span>
          <span class="gold-amp">&amp;</span>
          <span>Associates</span>
          <span class="pllc">, PLLC</span>
        </div>
        <div class="sub-row">
          <span class="tagline">Attorneys &amp; Counselors at Law</span>
          <div class="sub-line"></div>
        </div>
      </div>

      <h3 class="showcase-title">2. Modern Gold "B" Crest Monogram (Authoritative & Sharp)</h3>
      <div id="new-logo-2">
        <div class="emblem-box">
          <span class="emblem-letter">B</span>
        </div>
        <div class="text-group">
          <div class="firm-title">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <h3 class="showcase-title">3. Classical Pillars &amp; Scales Crest (Roman Heritage / Cinzel)</h3>
      <div id="new-logo-3">
        <svg class="icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Circular outer glow/ring -->
          <circle cx="50" cy="50" r="46" stroke="#c5a059" stroke-width="2" opacity="0.85"/>
          <circle cx="50" cy="50" r="41" stroke="#dfbe7e" stroke-width="0.75" stroke-dasharray="2 3" opacity="0.6"/>
          <!-- Pediment triangle -->
          <path d="M50 16L24 29H76L50 16Z" fill="#c5a059"/>
          <!-- Architrave beam -->
          <rect x="24" y="30.5" width="52" height="3" rx="0.5" fill="#dfbe7e"/>
          <!-- Columns -->
          <rect x="29" y="35" width="5" height="34" rx="1" fill="#c5a059"/>
          <rect x="42" y="35" width="5" height="34" rx="1" fill="#dfbe7e"/>
          <rect x="53" y="35" width="5" height="34" rx="1" fill="#dfbe7e"/>
          <rect x="66" y="35" width="5" height="34" rx="1" fill="#c5a059"/>
          <!-- Base plinth -->
          <rect x="22" y="70" width="56" height="4" rx="1" fill="#c5a059"/>
          <rect x="18" y="75" width="64" height="4" rx="1" fill="#a6813a"/>
          <!-- Scales pivot -->
          <circle cx="50" cy="49" r="2.5" fill="#ffffff"/>
        </svg>
        <div class="text-group">
          <div class="firm-title">BLUSTIN &amp; ASSOCIATES</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>

      <h3 class="showcase-title">4. Prestige Interlocking "B&A" Seal (Circular Luxury Crest)</h3>
      <div id="new-logo-4">
        <div class="circle-seal">
          <span class="seal-text">B&amp;A</span>
        </div>
        <div class="text-group">
          <div class="firm-title">Blustin &amp; Associates, PLLC</div>
          <div class="firm-sub">Attorneys &amp; Counselors at Law</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Save showcase overview image on dark background
  await page.evaluate(() => {
    document.body.style.background = '#071324';
  });
  await page.screenshot({
    path: 'C:/Users/syclo/.gemini/antigravity-ide/brain/e6b8192c-f4f9-4dee-8b62-6080a369b67e/new_logo_concepts_showcase.png',
    clip: { x: 20, y: 20, width: 850, height: 750 }
  });
  console.log('Saved new_logo_concepts_showcase.png');

  // Set background to completely transparent for individual PNG exports
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  });

  // Now export each option as a true transparent PNG
  const concepts = [
    { id: 'new-logo-1', file: 'new_logo_wordmark.png' },
    { id: 'new-logo-2', file: 'new_logo_monogram_crest.png' },
    { id: 'new-logo-3', file: 'new_logo_pillars_crest.png' },
    { id: 'new-logo-4', file: 'new_logo_ba_seal.png' }
  ];

  for (const c of concepts) {
    const el = await page.$('#' + c.id);
    await el.screenshot({
      path: `blustinlaw/assets/img/${c.file}`,
      omitBackground: true
    });
    console.log(`Exported blustinlaw/assets/img/${c.file}`);
  }

  // Also replace logo_law.png with Concept 1 (The Pure Wordmark matches the user's uploaded image directly!)
  const elWordmark = await page.$('#new-logo-1');
  await elWordmark.screenshot({
    path: 'blustinlaw/assets/img/logo_law.png',
    omitBackground: true
  });
  console.log('Set new_logo_wordmark.png as active logo_law.png!');

  await browser.close();
})();
