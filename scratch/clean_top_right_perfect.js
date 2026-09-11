const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function clean() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('c:/Users/syclo/retrofit-web/scratch/raw_quadrant_tr.png').toString('base64');
  
  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const W = img.width, H = img.height;
        c.width = W; c.height = H;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Fill the badge rectangle with exact pure black (matching (0,0,0) background)
        ctx.fillStyle = '#000000';
        ctx.fillRect(344, 0, 168, 65);
        
        // Soft feather border on the left and bottom edge of the fill
        const fLeft = ctx.createLinearGradient(336, 0, 345, 0);
        fLeft.addColorStop(0, 'rgba(0, 0, 0, 0)');
        fLeft.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = fLeft;
        ctx.fillRect(336, 0, 9, 65);
        
        const fBottom = ctx.createLinearGradient(0, 58, 0, 68);
        fBottom.addColorStop(0, 'rgba(0, 0, 0, 1)');
        fBottom.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fBottom;
        ctx.fillRect(336, 58, 176, 10);
        
        // Add subtle cosmic stardust matching the sky
        const stars = [
          {x: 375, y: 22, size: 1.2, color: 'rgba(255,255,255,0.7)'},
          {x: 420, y: 15, size: 0.9, color: 'rgba(168,85,247,0.7)'},
          {x: 460, y: 32, size: 1.2, color: 'rgba(0,242,254,0.7)'},
          {x: 405, y: 48, size: 0.9, color: 'rgba(255,255,255,0.5)'},
          {x: 485, y: 25, size: 1.4, color: 'rgba(255,255,255,0.8)'},
          {x: 445, y: 55, size: 0.9, color: 'rgba(168,85,247,0.6)'},
          {x: 495, y: 52, size: 1.0, color: 'rgba(0,242,254,0.6)'}
        ];
        stars.forEach(s => {
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        });

        window.__done = true;
      };
      img.src = 'data:image/png;base64,${b64}';
    </script>
  `);
  await page.waitForFunction(() => window.__done);
  const buf = await (await page.$('#c')).screenshot({ type: 'png' });
  fs.writeFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_top_right.png', buf);
  fs.writeFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_stacked.png', buf);
  await browser.close();
  console.log('Cleaned top right logo saved successfully!');
}
clean();
