const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function testTransparent() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const logoB64 = fs.readFileSync('c:/Users/syclo/retrofit-web/assets/retrofit_logo_top_right.png').toString('base64');
  
  await page.setContent(`
    <canvas id="c"></canvas>
    <script>
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const id = ctx.getImageData(0, 0, c.width, c.height);
        const d = id.data;
        
        // Convert black background to transparent alpha
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i+1], b = d[i+2];
          const maxVal = Math.max(r, g, b);
          
          if (maxVal <= 12) {
            d[i+3] = 0;
          } else if (maxVal < 45) {
            // Smooth ramp for faint ambient glow
            const factor = (maxVal - 12) / (45 - 12);
            d[i+3] = Math.round(maxVal * factor);
          } else {
            // Un-premultiply slightly to keep vibrant neon glow
            const alpha = Math.min(255, Math.round(maxVal * 1.25));
            d[i+3] = alpha;
          }
        }
        
        ctx.putImageData(id, 0, 0);
        window.__done = true;
      };
      img.src = 'data:image/png;base64,${logoB64}';
    </script>
  `);
  
  await page.waitForFunction(() => window.__done);
  const buf = await (await page.$('#c')).screenshot({ type: 'png', omitBackground: true });
  fs.writeFileSync('c:/Users/syclo/retrofit-web/scratch/transparent_test.png', buf);
  console.log('Saved transparent_test.png');
  await browser.close();
}

testTransparent().catch(console.error);
