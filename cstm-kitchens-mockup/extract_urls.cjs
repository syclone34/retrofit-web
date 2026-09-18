const fs = require('fs');
const content = fs.readFileSync('C:/Users/syclo/.gemini/antigravity-ide/brain/b294dabd-4b35-4ca0-98b2-960a6f31a0f3/.system_generated/steps/962/content.md', 'utf8');
const urls = content.match(/https:\/\/[^"'\s<>]+fbcdn\.net[^"'\s<>]*/g) || [];
console.log('Found', urls.length, 'image URLs');
const unique = [...new Set(urls.map(u => u.replace(/&amp;/g, '&')))];
const jpgs = unique.filter(u => u.includes('.jpg') || u.includes('.png'));
jpgs.forEach((u, i) => console.log(i, u));
