const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function testRecolor() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_no_bg.png').toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #161a23; font-family: 'Segoe UI', sans-serif; color: #fff; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
        .card { background: #1f2532; border: 1px solid #2d3748; border-radius: 12px; padding: 16px; text-align: center; }
        .card h3 { margin: 0 0 12px 0; font-size: 15px; letter-spacing: 0.5px; }
        canvas { max-width: 100%; height: auto; border-radius: 8px; background: #181e2b; }
      </style>
    </head>
    <body>
      <div class="grid">
        <div class="card">
          <h3 style="color: #94a3b8;">Original (Low Contrast)</h3>
          <canvas id="c0"></canvas>
        </div>
        <div class="card">
          <h3 style="color: #f7ebd4;">Option 1A: Cream Subtitle + Vibrant Coral 'Fit'</h3>
          <canvas id="c1"></canvas>
        </div>
        <div class="card">
          <h3 style="color: #4ed7da;">Option 1B: Bright Cyan Subtitle + Vibrant Coral 'Fit'</h3>
          <canvas id="c2"></canvas>
        </div>
        <div class="card">
          <h3 style="color: #f5a623;">Option 1C: Sunset Gold Subtitle + Vibrant Coral 'Fit'</h3>
          <canvas id="c3"></canvas>
        </div>
      </div>

      <script>
        const img = new Image();
        img.onload = () => {
          const W = img.width, H = img.height;
          
          function setupCanvas(id, modifyFn) {
            const c = document.getElementById(id);
            c.width = W; c.height = H;
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0);
            if (modifyFn) {
              const imgData = ctx.getImageData(0, 0, W, H);
              modifyFn(imgData.data, W, H);
              ctx.putImageData(imgData, 0, 0);
            }
          }
          
          // c0: original
          setupCanvas('c0', null);
          
          // Helper: HSL to RGB
          function hslToRgb(h, s, l) {
            let r, g, b;
            if (s === 0) {
              r = g = b = l;
            } else {
              const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
              };
              const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              const p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
          }

          function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) {
              h = s = 0;
            } else {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
            }
            return [h, s, l];
          }

          // Function to adjust "Fit" and "WEB DESIGN"
          function processLogo(data, W, H, subtitleTargetColor) {
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const i = (y * W + x) * 4;
                const alpha = data[i + 3];
                if (alpha < 15) continue;
                
                const r = data[i], g = data[i + 1], b = data[i + 2];
                
                // 1. "WEB DESIGN" subtitle & side dashes: y >= 640
                if (y >= 635) {
                  // Original is dark teal (r ~ 50..90, g ~ 100..140, b ~ 110..150)
                  // We recolor preserving intensity/shading
                  const intensity = Math.max(r, g, b) / 145; // normalize intensity
                  data[i] = Math.min(255, Math.round(subtitleTargetColor[0] * intensity));
                  data[i + 1] = Math.min(255, Math.round(subtitleTargetColor[1] * intensity));
                  data[i + 2] = Math.min(255, Math.round(subtitleTargetColor[2] * intensity));
                }
                
                // 2. "Fit" in RetroFit: y between 445 and 630, x >= 520
                if (y >= 445 && y < 635 && x >= 520) {
                  // Only affect the orange/rust pixels of "Fit"
                  // Rust pixels have r > 120 and r > g * 1.5
                  if (r > 100 && r > g * 1.3) {
                    const [h, s, l] = rgbToHsl(r, g, b);
                    // Shift hue slightly warmer/brighter, boost lightness by ~25%
                    const newH = 0.045; // warm coral orange (~16 degrees)
                    const newS = Math.min(1.0, s * 1.15);
                    const newL = Math.min(0.68, l * 1.35 + 0.05); // boost lightness significantly
                    const [nr, ng, nb] = hslToRgb(newH, newS, newL);
                    data[i] = nr;
                    data[i + 1] = ng;
                    data[i + 2] = nb;
                  }
                }
              }
            }
          }

          // 1A: Cream Subtitle [246, 235, 212]
          setupCanvas('c1', (data, W, H) => processLogo(data, W, H, [246, 235, 212]));
          
          // 1B: Bright Cyan Subtitle [78, 215, 218]
          setupCanvas('c2', (data, W, H) => processLogo(data, W, H, [78, 215, 218]));
          
          // 1C: Sunset Amber Subtitle [250, 180, 55]
          setupCanvas('c3', (data, W, H) => processLogo(data, W, H, [250, 180, 55]));

          window.__done = true;
        };
        img.src = 'data:image/png;base64,' + "${b64}";
      </script>
    </body>
    </html>
  `);

  await page.waitForFunction(() => window.__done);
  
  // Set viewport to capture full grid
  await page.setViewport({ width: 1400, height: 950, deviceScaleFactor: 1.5 });
  const outPath = 'c:/Users/syclo/.gemini/antigravity-ide/brain/cd91ac65-82f2-4a97-b20f-38673a4d9d79/option1_comparisons.png';
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved comparison to:', outPath);

  // Also save individual transparent PNGs for 1A, 1B, 1C into assets/
  for (const [id, filename] of [['c1', 'retrofit_logo_opt1a_cream.png'], ['c2', 'retrofit_logo_opt1b_cyan.png'], ['c3', 'retrofit_logo_opt1c_gold.png']]) {
    const canvasElem = await page.$('#' + id);
    const buf = await canvasElem.screenshot({ type: 'png', omitBackground: true });
    fs.writeFileSync('c:/Users/syclo/retrofit-web/assets/' + filename, buf);
    console.log('Saved transparent asset:', filename);
  }

  await browser.close();
}

testRecolor().catch(console.error);
