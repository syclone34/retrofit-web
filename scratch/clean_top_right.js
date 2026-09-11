const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function clean() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const imgPath = 'C:/Users/syclo/.gemini/antigravity-ide/brain/e5206f91-76ca-45d0-a9b3-5ebdd6d7958a/.user_uploaded/media_1789052989463.jpg';
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const W = 506; // width of quadrant (avoiding center border)
        const H = 506; // height of quadrant
        c.width = W;
        c.height = H;
        const ctx = c.getContext('2d');
        
        // Draw top-right quadrant from x: 515, y: 4, width: 506, height: 506
        ctx.drawImage(img, 515, 4, W, H, 0, 0, W, H);
        
        // Now let's cleanly patch the badge area (in local coords, roughly x: 335..505, y: 0..65)
        // Notice on the opposite side (x: 10..180, y: 0..65), the background is the exact same cosmic dark sky with subtle stardust!
        // Let's create an offscreen canvas with a feathered mask
        const patchCanvas = document.createElement('canvas');
        patchCanvas.width = 175;
        patchCanvas.height = 70;
        const pCtx = patchCanvas.getContext('2d');
        
        // Copy the symmetrical patch from the left side (x: 20..195, y: 5..75)
        pCtx.drawImage(c, 20, 5, 175, 70, 0, 0, 175, 70);
        
        // Soft feather gradient
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = 175;
        maskCanvas.height = 70;
        const mCtx = maskCanvas.getContext('2d');
        const grad = mCtx.createRadialGradient(87, 35, 10, 87, 35, 90);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.8, 'rgba(0,0,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        mCtx.fillStyle = grad;
        mCtx.fillRect(0, 0, 175, 70);
        
        // Composite onto badge area: x: 332, y: 2
        // First fill base with sampled cosmic dark
        ctx.fillStyle = '#060714';
        ctx.fillRect(340, 2, 166, 62);
        
        // Draw the soft starfield patch
        ctx.globalAlpha = 0.95;
        ctx.drawImage(patchCanvas, 332, 2);
        ctx.globalAlpha = 1.0;
        
        window.__cleanDone = true;
      };
      img.src = 'data:image/jpeg;base64,${imgBase64}';
    </script>
  `);
  
  await page.waitForFunction(() => window.__cleanDone === true);
  const canvasHandle = await page.$('#c');
  const buffer = await canvasHandle.screenshot({ type: 'png' });
  
  fs.writeFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_top_right.png', buffer);
  console.log('Successfully saved cleaned retrofit_logo_top_right.png');
  await browser.close();
}

clean().catch(console.error);
