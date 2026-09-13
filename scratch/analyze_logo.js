const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function analyze() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_no_bg.png').toString('base64');
  
  page.on('console', msg => console.log('PAGE:', msg.text()));

  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;
        
        let minX = c.width, maxX = 0, minY = c.height, maxY = 0;
        for (let y = 0; y < c.height; y++) {
          for (let x = 0; x < c.width; x++) {
            const idx = (y * c.width + x) * 4;
            if (data[idx + 3] > 30) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        console.log('Bounds:', JSON.stringify({ minX, maxX, minY, maxY, w: c.width, h: c.height }));
        
        // Sample colors in different vertical regions
        // Top monitor: ~minY to ~50%
        // "RetroFit": ~50% to ~75%
        // "WEB DESIGN": ~75% to maxY
        window.__done = true;
      };
      img.src = 'data:image/png;base64,' + "${b64}";
    </script>
  `);
  
  await page.waitForFunction(() => window.__done);
  await browser.close();
}
analyze().catch(err => console.error(err));
