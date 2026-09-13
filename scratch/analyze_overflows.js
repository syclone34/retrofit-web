const data = require('C:/Users/syclo/.gemini/antigravity-ide/brain/817ffd27-1961-4318-a75f-1b0bf82b5fc9/mobile_overflows.json');
for (const w of ['375', '390', '768']) {
  console.log(`=== OVERFLOWS AT ${w}px ===`);
  const seen = new Set();
  for (const item of data[w]) {
    const key = `${item.tag}|${item.cls}|${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      console.log(`  ${item.tag} cls="${item.cls}" id="${item.id}" width=${item.width} right=${item.right}`);
    }
  }
}
