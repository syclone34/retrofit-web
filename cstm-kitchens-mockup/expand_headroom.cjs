const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function expandHeadroom() {
  const inputPath = 'C:\\Users\\syclo\\.gemini\\antigravity-ide\\brain\\b1420e73-b476-41c2-ab71-8f9dc1936588\\.user_uploaded\\media_1789766341874.png';
  const outputPath = 'C:\\Users\\syclo\\retrofit-web\\cstm-kitchens-mockup\\public\\rachael_portrait.jpg';
  
  console.log('Loading image...');
  const img = await Jimp.read(inputPath);
  
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  
  console.log(`Original dimensions: ${w}x${h}`);
  
  // Add 25% headroom
  const headroom = Math.floor(h * 0.25);
  const newHeight = h + headroom;
  
  // Create new image
  const newImg = new Jimp({ width: w, height: newHeight, color: 0x00000000 });
  
  // Copy original image to the bottom of the new canvas
  newImg.blit(img, 0, headroom);
  
  // Stretch the top row to fill the headroom
  for (let y = 0; y < headroom; y++) {
    for (let x = 0; x < w; x++) {
      newImg.setPixelColor(img.getPixelColor(x, 0), x, y);
    }
  }

  // Smooth the transition area
  newImg.blur(2, 0, 0, w, headroom + 10);
  
  await new Promise((resolve, reject) => {
    newImg.write(outputPath, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  console.log(`Saved to ${outputPath} with dimensions ${w}x${newHeight}`);
}

expandHeadroom().catch(console.error);
