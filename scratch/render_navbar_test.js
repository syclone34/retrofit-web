const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function renderContextPreview() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const origB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_no_bg.png').toString('base64');
  const opt1aB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_opt1a_cream.png').toString('base64');
  const opt1bB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_opt1b_cyan.png').toString('base64');
  const opt1cB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_opt1c_gold.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 30px;
          background: #0f141f;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #f1f5f9;
        }
        h2 { font-size: 20px; font-weight: 700; margin-bottom: 8px; color: #fff; }
        p.subtitle { color: #94a3b8; font-size: 14px; margin-top: 0; margin-bottom: 24px; }
        
        .section-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #38bdf8;
          margin: 24px 0 12px;
        }
        
        /* Simulated Navbars (68px height) */
        .navbars-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }
        .mock-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #181f2c;
          border: 1px solid #263346;
          border-radius: 10px;
          padding: 0 24px;
          height: 72px;
        }
        .nav-logo-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav-logo-wrap img {
          height: 56px;
          width: auto;
          display: block;
        }
        .nav-tag {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: #232d3f;
          color: #cbd5e1;
        }
        .mock-links {
          display: flex;
          gap: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
        }
        .mock-btn {
          background: #ff6b4a;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <h2>Real-World Context: Navbar Legibility Test (56px Logo Height)</h2>
      <p class="subtitle">Notice how the original disappears, while Option 1A (Cream) and 1B (Cyan) remain sharply legible at real website header sizes.</p>

      <div class="navbars-container">
        <!-- Original -->
        <div class="mock-nav">
          <div class="nav-logo-wrap">
            <img src="data:image/png;base64,${origB64}">
            <span class="nav-tag" style="border: 1px solid #ef4444; color: #fca5a5;">Original (Subtitle fades into navbar)</span>
          </div>
          <div class="mock-links">
            <span>Portfolio</span>
            <span>Services</span>
            <span>Audit</span>
            <div class="mock-btn">Get Started</div>
          </div>
        </div>

        <!-- 1A Cream -->
        <div class="mock-nav" style="border-color: #f7ebd444;">
          <div class="nav-logo-wrap">
            <img src="data:image/png;base64,${opt1aB64}">
            <span class="nav-tag" style="border: 1px solid #f7ebd4; color: #f7ebd4;">Option 1A: Crisp Cream Subtitle (Maximum Contrast)</span>
          </div>
          <div class="mock-links">
            <span>Portfolio</span>
            <span>Services</span>
            <span>Audit</span>
            <div class="mock-btn">Get Started</div>
          </div>
        </div>

        <!-- 1B Cyan -->
        <div class="mock-nav" style="border-color: #4ed7da44;">
          <div class="nav-logo-wrap">
            <img src="data:image/png;base64,${opt1bB64}">
            <span class="nav-tag" style="border: 1px solid #4ed7da; color: #4ed7da;">Option 1B: Retro Cyan Subtitle (Matches Monitor Sky)</span>
          </div>
          <div class="mock-links">
            <span>Portfolio</span>
            <span>Services</span>
            <span>Audit</span>
            <div class="mock-btn">Get Started</div>
          </div>
        </div>

        <!-- 1C Gold -->
        <div class="mock-nav" style="border-color: #f5a62344;">
          <div class="nav-logo-wrap">
            <img src="data:image/png;base64,${opt1cB64}">
            <span class="nav-tag" style="border: 1px solid #f5a623; color: #f5a623;">Option 1C: Amber Gold Subtitle (Matches CRT Stripe)</span>
          </div>
          <div class="mock-links">
            <span>Portfolio</span>
            <span>Services</span>
            <span>Audit</span>
            <div class="mock-btn">Get Started</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);

  await page.setViewport({ width: 1100, height: 500, deviceScaleFactor: 2 });
  const outPath = 'c:/Users/syclo/.gemini/antigravity-ide/brain/cd91ac65-82f2-4a97-b20f-38673a4d9d79/navbar_scale_test.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved navbar context test to:', outPath);
  await browser.close();
}

renderContextPreview().catch(console.error);
