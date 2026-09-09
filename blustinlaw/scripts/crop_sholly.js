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

  const rawPath = path.resolve('blustinlaw/assets/img/sholly_blustin_raw.png').replace(/\\/g, '/');
  await page.goto('file:///' + rawPath);

  const crop = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        // Border is white: r,g,b > 240
        if (a > 20 && !(r > 240 && g > 240 && b > 240)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
  });

  console.log('Crop box:', crop);

  const dataUrl = await page.evaluate((c) => {
    const img = document.querySelector('img');
    const outCanvas = document.createElement('canvas');
    outCanvas.width = c.width;
    outCanvas.height = c.height;
    const ctx = outCanvas.getContext('2d');
    ctx.drawImage(img, c.minX, c.minY, c.width, c.height, 0, 0, c.width, c.height);
    return outCanvas.toDataURL('image/png');
  }, crop);

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('blustinlaw/assets/img/sholly_blustin_cropped.png', base64Data, 'base64');
  console.log('Cropped image saved successfully!');

  await browser.close();
})();
