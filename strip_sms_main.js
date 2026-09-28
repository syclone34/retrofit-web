const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace the entire simulator section
const newContent = content.replace(/<!-- Interactive Live SMS Lead Machine Simulator -->[\s\S]*?<\/section>/, '');

fs.writeFileSync(targetFile, newContent);
console.log('Successfully removed SMS simulator section from main index.');
