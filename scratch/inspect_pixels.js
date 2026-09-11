const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('c:/Users/syclo/retrofit-web/scratch/raw_quadrant_tr.png').toString('base64');
  page.on('console', m => console.log('PAGE:', m.text()));
  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        for (let x = 100; x <= 500; x += 50) {
          const d = ctx.getImageData(x, 10, 1, 1).data;
          console.log('x=' + x + ', y=10: ' + d[0] + ',' + d[1] + ',' + d[2]);
        }
        for (let x = 300; x <= 360; x += 10) {
          const d = ctx.getImageData(x, 30, 1, 1).data;
          console.log('x=' + x + ', y=30: ' + d[0] + ',' + d[1] + ',' + d[2]);
        }
        window.__d = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);
  await page.waitForFunction(() => window.__d);
  await browser.close();
}
run().catch(console.error);
