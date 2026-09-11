const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function buildSuite() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Load cleaned top-right logo
  const logoB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_top_right.png').toString('base64');
  
  // Let's create a page that:
  // 1. Tests the top-right logo in the exact navbar context
  // 2. Builds a matching horizontal lockup with identical gradient, typography, and stars
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Plus+Jakarta+Sans:wght@700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; background: #060713; font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Horizontal lockup canvas */
        #horizCanvas {
          display: block;
        }
      </style>
    </head>
    <body>
      <canvas id="horizCanvas" width="720" height="160"></canvas>
      
      <script>
        const img = new Image();
        img.onload = () => {
          const c = document.getElementById('horizCanvas');
          const ctx = c.getContext('2d');
          
          // Background: cosmic deep space matching logo background
          ctx.fillStyle = '#060714';
          ctx.fillRect(0, 0, c.width, c.height);
          
          // Add stardust and subtle nebula glow
          const nGrad = ctx.createRadialGradient(80, 80, 20, 80, 80, 160);
          nGrad.addColorStop(0, 'rgba(0, 242, 254, 0.12)');
          nGrad.addColorStop(0.6, 'rgba(168, 85, 247, 0.08)');
          nGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = nGrad;
          ctx.fillRect(0, 0, c.width, c.height);
          
          // Faint laser horizon beam extending to the right
          const lGrad = ctx.createLinearGradient(0, 95, c.width, 95);
          lGrad.addColorStop(0, 'transparent');
          lGrad.addColorStop(0.15, 'rgba(236, 72, 153, 0.5)');
          lGrad.addColorStop(0.4, 'rgba(255, 222, 89, 0.8)');
          lGrad.addColorStop(0.7, 'rgba(0, 242, 254, 0.6)');
          lGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = lGrad;
          ctx.fillRect(160, 93, c.width - 160, 2);
          
          // Perspective grid lines faintly below horizon
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
          ctx.lineWidth = 1;
          for (let y = 95; y < 160; y += 12) {
            ctx.beginPath();
            ctx.moveTo(160, y);
            ctx.lineTo(c.width, y);
            ctx.stroke();
          }
          for (let x = 160; x < c.width; x += 35) {
            ctx.beginPath();
            ctx.moveTo(x + 25, 95);
            ctx.lineTo(x, 160);
            ctx.stroke();
          }
          
          // Stars
          const stars = [
            {x: 35, y: 30, s: 1.2, c: 'rgba(255,255,255,0.8)'},
            {x: 90, y: 20, s: 1.5, c: 'rgba(0,242,254,0.7)'},
            {x: 130, y: 45, s: 1, c: 'rgba(168,85,247,0.8)'},
            {x: 200, y: 25, s: 1.2, c: 'rgba(255,255,255,0.6)'},
            {x: 320, y: 35, s: 1.5, c: 'rgba(0,242,254,0.8)'},
            {x: 450, y: 18, s: 1.2, c: 'rgba(255,255,255,0.7)'},
            {x: 560, y: 40, s: 1.8, c: 'rgba(168,85,247,0.7)'},
            {x: 650, y: 22, s: 1.2, c: 'rgba(255,255,255,0.8)'},
            {x: 680, y: 55, s: 1, c: 'rgba(0,242,254,0.6)'}
          ];
          stars.forEach(st => {
            ctx.fillStyle = st.c;
            ctx.beginPath();
            ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
            ctx.fill();
          });
          
          // Draw the cyber R glyph extracted from img
          // In img (512x512), the R glyph is roughly x: 120..420, y: 45..290
          const rSrcX = 115, rSrcY = 48, rSrcW = 310, rSrcH = 245;
          const rDestH = 135;
          const rDestW = (rSrcW / rSrcH) * rDestH;
          ctx.drawImage(img, rSrcX, rSrcY, rSrcW, rSrcH, 12, 12, rDestW, rDestH);
          
          // Now draw RetroFit wordmark next to it
          // Font: Outfit 800
          document.fonts.ready.then(() => {
            const textX = rDestW + 28;
            
            // Neon under-glow for RetroFit
            ctx.font = '800 68px "Outfit", sans-serif';
            ctx.shadowColor = 'rgba(0, 242, 254, 0.45)';
            ctx.shadowBlur = 18;
            
            // Text gradient matching the logo: Cyan top to fuchsia/magenta bottom
            const tGrad = ctx.createLinearGradient(textX, 25, textX, 85);
            tGrad.addColorStop(0, '#00f2fe');
            tGrad.addColorStop(0.3, '#38bdf8');
            tGrad.addColorStop(0.7, '#a855f7');
            tGrad.addColorStop(1, '#ec4899');
            
            ctx.fillStyle = tGrad;
            ctx.fillText('RetroFit', textX, 82);
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            // WEB DESIGN: Bright, crisp, perfectly readable clean white with tracking
            ctx.font = '700 24px "Space Grotesk", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
            ctx.shadowBlur = 8;
            ctx.letterSpacing = '6px';
            ctx.fillText('WEB DESIGN', textX + 4, 134);
            
            window.__suiteReady = true;
          });
        };
        img.src = 'data:image/png;base64,${logoB64}';
      </script>
    </body>
    </html>
  `);
  
  await page.waitForFunction(() => window.__suiteReady === true, { timeout: 10000 });
  
  const horizCanvas = await page.$('#horizCanvas');
  const horizBuffer = await horizCanvas.screenshot({ type: 'png' });
  fs.writeFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_horizontal.png', horizBuffer);
  console.log('Saved updated retrofit_logo_horizontal.png');
  
  await browser.close();
}

buildSuite().catch(console.error);
