const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function test() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const imgPath = 'C:/Users/syclo/.gemini/antigravity-ide/brain/e5206f91-76ca-45d0-a9b3-5ebdd6d7958a/.user_uploaded/media_1789052989463.jpg';
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  page.on('console', msg => console.log('PAGE:', msg.text()));

  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = 1024; c.height = 1024;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // Look for the white pill badge around x: 800..1020, y: 0..70
        const id = ctx.getImageData(800, 0, 224, 70);
        let minX = 9999, maxX = 0, minY = 9999, maxY = 0;
        for (let y = 0; y < 70; y++) {
          for (let x = 0; x < 224; x++) {
            const idx = (y * 224 + x) * 4;
            const r = id.data[idx], g = id.data[idx+1], b = id.data[idx+2];
            if (r > 160 && g > 160 && b > 160) {
              const realX = 800 + x;
              if (realX < minX) minX = realX;
              if (realX > maxX) maxX = realX;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        console.log('Badge bounds:', JSON.stringify({ minX, maxX, minY, maxY }));
        window.__ready = true;
      };
      img.src = 'data:image/jpeg;base64,${imgBase64}';
    </script>
  `);
  await page.waitForFunction(() => window.__ready === true);
  await browser.close();
}
test().catch(console.error);
