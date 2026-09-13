const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function inspectSlices() {
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
        
        // Let's find pixel counts and dominant colors across y slices
        for (let y = 80; y <= 680; y += 20) {
          let visible = 0;
          let rSum = 0, gSum = 0, bSum = 0;
          for (let x = 0; x < c.width; x++) {
            const idx = (y * c.width + x) * 4;
            if (data[idx + 3] > 100) {
              visible++;
              rSum += data[idx];
              gSum += data[idx + 1];
              bSum += data[idx + 2];
            }
          }
          if (visible > 0) {
            const avgR = Math.round(rSum / visible);
            const avgG = Math.round(gSum / visible);
            const avgB = Math.round(bSum / visible);
            console.log('y=' + y + ': visible=' + visible + ' avgRGB=(' + avgR + ',' + avgG + ',' + avgB + ')');
          } else {
            console.log('y=' + y + ': GAP (visible=0)');
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
inspectSlices().catch(console.error);
