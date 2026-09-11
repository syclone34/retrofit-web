const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function test() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const imgPath = 'C:/Users/syclo/.gemini/antigravity-ide/brain/e5206f91-76ca-45d0-a9b3-5ebdd6d7958a/.user_uploaded/media_1789052989463.jpg';
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = 512;
        c.height = 512;
        const ctx = c.getContext('2d');
        // raw top right quadrant from 512, 0, 512, 512
        ctx.drawImage(img, 512, 0, 512, 512, 0, 0, 512, 512);
        window.__done = true;
      };
      img.src = 'data:image/jpeg;base64,${imgBase64}';
    </script>
  `);
  await page.waitForFunction(() => window.__done);
  const buf = await (await page.$('#c')).screenshot({ type: 'png' });
  fs.writeFileSync('c:/Users/syclo/retrofit-web/scratch/raw_quadrant_tr.png', buf);
  await browser.close();
}
test();
