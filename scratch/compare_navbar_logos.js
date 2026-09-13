const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function renderComparison() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const origB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_no_bg_orig.png').toString('base64');
  const creamB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_prominent_cream.png').toString('base64');
  const cyanB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_prominent_cyan.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0b0f17;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #f1f5f9;
          padding: 40px;
        }
        h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 6px;
          color: #ffffff;
        }
        p.subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 32px;
        }
        .demo-card {
          background: #101622;
          border: 1px solid #1e293b;
          border-radius: 16px;
          margin-bottom: 28px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .demo-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: #141c2c;
          border-bottom: 1px solid #1e293b;
        }
        .demo-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .tag-orig { background: #334155; color: #cbd5e1; }
        .tag-rec { background: rgba(243, 178, 62, 0.2); color: #f3b23e; border: 1px solid rgba(243, 178, 62, 0.4); }

        /* Actual Navbars */
        .site-header {
          width: 100%;
          background: rgba(19, 26, 38, 0.98);
          border-bottom: 1px solid rgba(251, 245, 232, 0.08);
          padding: 0;
        }
        .nav-island {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 2.2rem;
        }
        .brand-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          position: relative;
        }

        /* Ambient Glow Wrapper for enhanced option */
        .brand-link.enhanced {
          padding: 4px 10px;
          border-radius: 12px;
        }
        .brand-link.enhanced::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: radial-gradient(ellipse at center, rgba(243, 178, 62, 0.16) 0%, rgba(222, 87, 60, 0.08) 50%, transparent 75%);
          pointer-events: none;
        }

        .brand-logo-badge-orig {
          height: 84px;
          width: auto;
          display: block;
          filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.3));
        }

        .brand-logo-badge-enhanced {
          height: 88px;
          width: auto;
          display: block;
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 12px rgba(243, 178, 62, 0.2));
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          list-style: none;
        }
        .nav-item-link {
          color: #c5d0de;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(47, 142, 145, 0.15);
          color: #3caba3;
          border: 1.5px solid rgba(47, 142, 145, 0.35);
          padding: 0.65rem 1.25rem;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #ff684a 0%, #de573c 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px -4px rgba(231, 90, 50, 0.35);
          padding: 0.65rem 1.45rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h1>Navigation Logo Visibility & Prominence Comparison</h1>
      <p class="subtitle">Comparing the current logo vs. tightly cropped, high-contrast versions with warm ambient back-glow.</p>

      <!-- 1. Original -->
      <div class="demo-card">
        <div class="demo-card-header">
          <div class="demo-card-title">
            <span>Current Header</span>
            <span class="tag tag-orig">Current (25% dead transparent padding, low-contrast dark teal subtitle)</span>
          </div>
        </div>
        <div class="site-header">
          <div class="nav-island">
            <a href="#" class="brand-link">
              <img src="data:image/png;base64,${origB64}" class="brand-logo-badge-orig">
            </a>
            <ul class="nav-menu">
              <li><a href="#" class="nav-item-link">Lead Tracker</a></li>
              <li><a href="#" class="nav-item-link">Speed Scanner</a></li>
              <li><a href="#" class="nav-item-link">Why RetroFit</a></li>
              <li><a href="#" class="nav-item-link">Packages</a></li>
              <li><a href="#" class="nav-item-link">About</a></li>
            </ul>
            <div class="nav-actions">
              <div class="btn-phone">
                <span>(612) 516-3145</span>
              </div>
              <div class="btn-primary">Get Free Audit</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Enhanced Option A (Cream Subtitle) -->
      <div class="demo-card" style="border-color: rgba(243, 178, 62, 0.35);">
        <div class="demo-card-header" style="background: #182236;">
          <div class="demo-card-title" style="color: #f7ebd4;">
            <span>Option A: Tight Crop + High-Contrast Vintage Cream Subtitle + Ambient Warm Glow</span>
            <span class="tag tag-rec">Recommended (Crisp & Harmonious)</span>
          </div>
        </div>
        <div class="site-header">
          <div class="nav-island">
            <a href="#" class="brand-link enhanced">
              <img src="data:image/png;base64,${creamB64}" class="brand-logo-badge-enhanced">
            </a>
            <ul class="nav-menu">
              <li><a href="#" class="nav-item-link">Lead Tracker</a></li>
              <li><a href="#" class="nav-item-link">Speed Scanner</a></li>
              <li><a href="#" class="nav-item-link">Why RetroFit</a></li>
              <li><a href="#" class="nav-item-link">Packages</a></li>
              <li><a href="#" class="nav-item-link">About</a></li>
            </ul>
            <div class="nav-actions">
              <div class="btn-phone">
                <span>(612) 516-3145</span>
              </div>
              <div class="btn-primary">Get Free Audit</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Enhanced Option B (Cyan Subtitle) -->
      <div class="demo-card" style="border-color: rgba(82, 224, 228, 0.3);">
        <div class="demo-card-header" style="background: #162432;">
          <div class="demo-card-title" style="color: #5eead4;">
            <span>Option B: Tight Crop + Vibrant Retro Cyan Subtitle + Ambient Glow</span>
            <span class="tag" style="background: rgba(82, 224, 228, 0.2); color: #5eead4; border: 1px solid rgba(82, 224, 228, 0.4);">Vibrant Retro Accent</span>
          </div>
        </div>
        <div class="site-header">
          <div class="nav-island">
            <a href="#" class="brand-link enhanced">
              <img src="data:image/png;base64,${cyanB64}" class="brand-logo-badge-enhanced">
            </a>
            <ul class="nav-menu">
              <li><a href="#" class="nav-item-link">Lead Tracker</a></li>
              <li><a href="#" class="nav-item-link">Speed Scanner</a></li>
              <li><a href="#" class="nav-item-link">Why RetroFit</a></li>
              <li><a href="#" class="nav-item-link">Packages</a></li>
              <li><a href="#" class="nav-item-link">About</a></li>
            </ul>
            <div class="nav-actions">
              <div class="btn-phone">
                <span>(612) 516-3145</span>
              </div>
              <div class="btn-primary">Get Free Audit</div>
            </div>
          </div>
        </div>
      </div>

    </body>
    </html>
  `);

  await page.setViewport({ width: 1400, height: 850, deviceScaleFactor: 2 });
  const outPath = 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/logo_prominence_comparison.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved comparison to:', outPath);
  await browser.close();
}

renderComparison().catch(console.error);
