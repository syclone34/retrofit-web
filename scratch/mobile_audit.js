const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');
const fs = require('fs');

async function auditMobile() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('file:///c:/Users/syclo/retrofit-web/index.html', { waitUntil: 'networkidle0' });

  // 1. Check mobile menu toggle
  console.log('Testing mobile menu toggle...');
  const navToggle = await page.$('#navToggle');
  let menuInfo = null;
  if (navToggle) {
    await navToggle.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_menu_open.png' });
    menuInfo = await page.evaluate(() => {
      const menu = document.getElementById('navMenu');
      if (!menu) return { exists: false };
      const cs = window.getComputedStyle(menu);
      return {
        className: menu.className,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        position: cs.position,
        height: cs.height,
        zIndex: cs.zIndex,
        rect: menu.getBoundingClientRect()
      };
    });
    console.log('Mobile menu state after click:', menuInfo);
  }

  // 2. Scan for overflows across widths
  const report = {};
  for (const w of [375, 390, 768]) {
    await page.setViewport({ width: w, height: 844 });
    const overflows = await page.evaluate((viewportW) => {
      const bad = [];
      document.querySelectorAll('*').forEach(el => {
        if (['HTML', 'BODY'].includes(el.tagName)) return;
        const cs = window.getComputedStyle(el);
        if (cs.position === 'fixed' || cs.position === 'absolute' || cs.display === 'none') return;
        const r = el.getBoundingClientRect();
        if (r.width > viewportW + 2 || r.right > viewportW + 2 || r.left < -2) {
          bad.push({
            tag: el.tagName,
            cls: el.className,
            id: el.id,
            width: Math.round(r.width),
            right: Math.round(r.right),
            left: Math.round(r.left)
          });
        }
      });
      return bad;
    }, w);
    report[w] = overflows;
    console.log(`Viewport ${w}px overflow count:`, overflows.length);
  }
  fs.writeFileSync('c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_overflows.json', JSON.stringify(report, null, 2));

  // 3. Capture section screenshots
  const sections = ['#simulator', '#scanner', '#comparison', '#pricing', '#about', '#contact', 'footer'];
  for (const s of sections) {
    const el = await page.$(s);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 300));
      const cleanName = s.replace(/[^a-z0-9]/gi, '_');
      await page.screenshot({ path: `c:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_sec_${cleanName}.png` });
    }
  }

  await browser.close();
  console.log('Audit complete.');
}

auditMobile().catch(console.error);
