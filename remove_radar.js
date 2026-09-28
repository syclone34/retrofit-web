const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace the hero dispatch radar card
const newContent = content.replace(/<!-- Hero Live Lead Dispatch Alert -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

fs.writeFileSync(targetFile, newContent);
console.log('Successfully removed hero radar card.');
