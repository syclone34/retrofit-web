const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // 600 DPI = 6.25 deviceScaleFactor (since default is 96 DPI)
    // 3.5 inches * 96 = 336px
    // 2.0 inches * 96 = 192px
    await page.setViewport({
        width: 1000, 
        height: 1000,
        deviceScaleFactor: 6.25 // Forces exactly 600 DPI rendering
    });

    const filePath = `file:///${path.join(__dirname, 'bscard.html').replace(/\\/g, '/')}`;
    console.log(`Loading ${filePath}...`);
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Hide the "FRONT" and "BACK" labels and disable hover effects for a clean screenshot
    await page.addStyleTag({
        content: `
            .label-container { display: none !important; }
            .card { box-shadow: none !important; transform: none !important; }
            body { background: transparent !important; }
        `
    });

    console.log('Rendering Front Card...');
    const frontCard = await page.$('.card-front');
    await frontCard.screenshot({ 
        path: path.join(__dirname, 'front_highres_600dpi.png'),
        omitBackground: true
    });

    console.log('Rendering Back Card...');
    const backCard = await page.$('.card-back');
    await backCard.screenshot({ 
        path: path.join(__dirname, 'back_highres_600dpi.png'),
        omitBackground: true
    });

    await browser.close();
    console.log('✅ Success! High-resolution 600 DPI images saved as front_highres_600dpi.png and back_highres_600dpi.png');
})();
