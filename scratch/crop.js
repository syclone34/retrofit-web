import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';

const brainDir = "C:\\Users\\syclo\\.gemini\\antigravity-ide\\brain\\cfd064a9-1848-476f-b759-05e578b0fdd8";
const pubDir = "C:\\Users\\syclo\\retrofit-web\\cstm-kitchens-mockup\\public";

async function cropCenterImage(imgFilename, outFilename) {
  try {
    const imgPath = path.join(brainDir, imgFilename);
    const outPath = path.join(pubDir, outFilename);
    
    console.log(`Processing ${imgFilename}...`);
    const img = await Jimp.read(imgPath);
    
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    
    const topBarHeight = 56;
    const rightSidebarStart = width - 360;
    
    let leftEdge = 0;
    let rightEdge = rightSidebarStart;
    
    // Scan for left edge
    for (let x = 0; x < rightSidebarStart; x++) {
      let isBlackCol = true;
      for (let y = topBarHeight; y < height; y += 10) {
        const hex = img.getPixelColor(x, y);
        const { r, g, b } = Jimp.intToRGBA(hex);
        if (r > 15 || g > 15 || b > 15) {
          isBlackCol = false;
          break;
        }
      }
      if (!isBlackCol) {
        leftEdge = x;
        break;
      }
    }
    
    // Scan for right edge
    for (let x = rightSidebarStart - 1; x > leftEdge; x--) {
      let isBlackCol = true;
      for (let y = topBarHeight; y < height; y += 10) {
        const hex = img.getPixelColor(x, y);
        const { r, g, b } = Jimp.intToRGBA(hex);
        if (r > 15 || g > 15 || b > 15) {
          isBlackCol = false;
          break;
        }
      }
      if (!isBlackCol) {
        rightEdge = x;
        break;
      }
    }
    
    // Scan for top edge
    let topEdge = topBarHeight;
    for (let y = topBarHeight; y < height; y++) {
      let isBlackRow = true;
      for (let x = leftEdge; x < rightEdge; x += 10) {
        const hex = img.getPixelColor(x, y);
        const { r, g, b } = Jimp.intToRGBA(hex);
        if (r > 15 || g > 15 || b > 15) {
          isBlackRow = false;
          break;
        }
      }
      if (!isBlackRow) {
        topEdge = y;
        break;
      }
    }
    
    // Scan for bottom edge
    let bottomEdge = height;
    for (let y = height - 1; y > topEdge; y--) {
      let isBlackRow = true;
      for (let x = leftEdge; x < rightEdge; x += 10) {
        const hex = img.getPixelColor(x, y);
        const { r, g, b } = Jimp.intToRGBA(hex);
        if (r > 15 || g > 15 || b > 15) {
          isBlackRow = false;
          break;
        }
      }
      if (!isBlackRow) {
        bottomEdge = y;
        break;
      }
    }

    // Add a tiny safety margin
    leftEdge += 2;
    topEdge += 2;
    rightEdge -= 2;
    bottomEdge -= 2;

    const cropWidth = rightEdge - leftEdge;
    const cropHeight = bottomEdge - topEdge;

    img.crop(leftEdge, topEdge, cropWidth, cropHeight);
    await img.writeAsync(outPath);
    console.log(`Cropped to ${outFilename}`);

  } catch (err) {
    console.error(`Error processing ${imgFilename}:`, err);
  }
}

async function run() {
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });
  
  await cropCenterImage("hero_kitchen_view_1789691596355.png", "hero.jpg");
  await cropCenterImage("kitchen_photo_1_1789691702662.png", "service1.jpg");
  await cropCenterImage("photo_bathroom_laundry_1789691777395.png", "service2.jpg");
  await cropCenterImage("logo_jpg_1789691465648.png", "logo.jpg");
}

run();
