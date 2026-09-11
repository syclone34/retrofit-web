const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const imgPath = 'C:/Users/syclo/.gemini/antigravity-ide/brain/e5206f91-76ca-45d0-a9b3-5ebdd6d7958a/.user_uploaded/media_1789052989463.jpg';
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #000; overflow: hidden; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <canvas id="cropCanvas"></canvas>
      <canvas id="transparentCanvas"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          // Top right quadrant is x: 512 to 1024, y: 0 to 512
          // But let's check borders to ensure we don't grab dividing line
          const srcX = 514;
          const srcY = 0;
          const srcW = 510;
          const srcH = 508;
          
          const canvas = document.getElementById('cropCanvas');
          canvas.width = srcW;
          canvas.height = srcH;
          const ctx = canvas.getContext('2d');
          
          // Draw top-right quadrant
          ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
          
          // Clean "Made with AI" badge in top right (it is located around x: 330..500 in this cropped 510-wide space, y: 0..60)
          // Let's sample the background color nearby and paint over the badge with matching starry cosmic black
          // In the cropped quadrant, the badge is roughly x: 330 to 505, y: 5 to 55
          // Let's inspect or fill that region with the smooth cosmic gradient / background
          const sampleBg = ctx.getImageData(300, 30, 1, 1).data;
          console.log('Sample background color:', sampleBg);
          
          // We can blend the background over the watermark area (x: 320 to 510, y: 0 to 55)
          const grad = ctx.createLinearGradient(320, 0, 510, 55);
          grad.addColorStop(0, 'rgba(5, 7, 18, 1)');
          grad.addColorStop(1, 'rgba(4, 5, 14, 1)');
          ctx.fillStyle = grad;
          ctx.fillRect(330, 0, 180, 58);
          
          // Add a few subtle faint stars to blend seamlessly
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fillRect(370, 22, 1.5, 1.5);
          ctx.fillRect(440, 35, 1.5, 1.5);
          ctx.fillRect(410, 15, 1, 1);
          ctx.fillRect(480, 28, 1.5, 1.5);
          ctx.fillStyle = 'rgba(0, 242, 254, 0.5)';
          ctx.fillRect(425, 40, 2, 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
          ctx.fillRect(460, 18, 2, 2);

          window.__cropDone = true;
        };
        img.src = 'data:image/jpeg;base64,${imgBase64}';
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction(() => window.__cropDone === true);

  // Capture cropped canvas
  const canvasHandle = await page.$('#cropCanvas');
  const cropBuffer = await canvasHandle.screenshot({ type: 'png' });
  
  const destPath = 'c:/Users/syclo/retrofit-web/assets/retrofit_logo_top_right.png';
  fs.writeFileSync(destPath, cropBuffer);
  console.log('Saved top right logo to:', destPath, 'size:', cropBuffer.length);
  
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
