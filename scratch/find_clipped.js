const puppeteer = require('C:/Users/syclo/family-photo-hub/server/node_modules/puppeteer');

async function findClippedElements() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 844 });
  await page.goto('file:///c:/Users/syclo/retrofit-web/index.html', { waitUntil: 'networkidle0' });

  const clipped = await page.evaluate(() => {
    const W = window.innerWidth;
    const items = [];
    document.querySelectorAll('*').forEach(el => {
      if (['HTML', 'BODY', 'SCRIPT', 'STYLE'].includes(el.tagName)) return;
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      if (cs.position === 'fixed' || cs.position === 'absolute') return;
      if (el.classList.contains('marquee-track') || el.closest('.marquee-track')) return;

      const r = el.getBoundingClientRect();
      if (r.right > W + 2) {
        items.push({
          tag: el.tagName,
          cls: el.className,
          id: el.id,
          text: el.textContent.trim().slice(0, 30),
          right: Math.round(r.right),
          width: Math.round(r.width)
        });
      }
    });
    return items;
  });

  console.log(`Total elements exceeding 375px: ${clipped.length}`);
  clipped.forEach(c => console.log(`  <${c.tag} class="${c.cls}"> right=${c.right} w=${c.width}: "${c.text}"`));
  await browser.close();
}

findClippedElements().catch(console.error);
