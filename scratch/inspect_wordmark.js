const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function inspectWordmark() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_no_bg.png').toString('base64');
  
  page.on('console', msg => console.log(msg.text()));

  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, c.width, c.height).data;
        
        // Scan across X for y between 450 and 620
        for (let x = 50; x <= 770; x += 30) {
          let vis = 0, rSum = 0, gSum = 0, bSum = 0;
          for (let y = 450; y <= 620; y++) {
            const idx = (y * c.width + x) * 4;
            if (data[idx + 3] > 100) {
              vis++;
              rSum += data[idx];
              gSum += data[idx + 1];
              bSum += data[idx + 2];
            }
          }
          if (vis > 0) {
            console.log('x=' + x + ': vis=' + vis + ' avgRGB=(' + Math.round(rSum/vis) + ',' + Math.round(gSum/vis) + ',' + Math.round(bSum/vis) + ')');
          }
        }
        window.__done = true;
      };
      img.src = 'data:image/png;base64,' + "${b64}";
    </script>
  `);
  
  await page.waitForFunction(() => window.__done);
  await browser.close();
}
inspectWordmark().catch(console.error);
