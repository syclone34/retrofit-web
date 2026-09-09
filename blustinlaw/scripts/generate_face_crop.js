const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();

  // Create close-up face crop from sholly_blustin.jpg
  const imgBase64 = fs.readFileSync('blustinlaw/assets/img/sholly_blustin.jpg').toString('base64');
  const imgDataUri = `data:image/jpeg;base64,${imgBase64}`;

  await page.setViewport({ width: 300, height: 300, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { width: 300px; height: 300px; overflow: hidden; background: #071324; }
        .crop-container {
          width: 300px;
          height: 300px;
          overflow: hidden;
          position: relative;
        }
        .crop-img {
          width: 100%;
          height: auto;
          position: absolute;
          top: -24px;
          left: 0;
          transform: scale(1.4);
          transform-origin: 52% 24%;
        }
      </style>
    </head>
    <body>
      <div class="crop-container" id="face-crop">
        <img src="${imgDataUri}" class="crop-img">
      </div>
    </body>
    </html>
  `);

  const el = await page.$('#face-crop');
  await el.screenshot({
    path: 'blustinlaw/assets/img/sholly_face.jpg',
    type: 'jpeg',
    quality: 95
  });
  console.log('Saved blustinlaw/assets/img/sholly_face.jpg');

  await browser.close();
})();
