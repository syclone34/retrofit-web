const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/Brand New Website Build/g, 'Performance Build');
content = content.replace(/Starting fresh\? Complete custom high-converting website engineered from scratch for your trade\./g, 'Starting fresh? Complete custom high-converting website engineered from scratch for your trade, optimized for local SEO.');
content = content.replace(/<span class="pack-price-amt">\$499<\/span>/g, '<span class="pack-price-amt">$899</span>');
content = content.replace(/Select \$499 New Build/g, 'Select Performance Build');
content = content.replace(/Growth Partner Plan/g, 'All-in-One Engine');
content = content.replace(/Zero upfront barrier\. Get a full custom website, hosting, and continuous support rolled into one monthly plan\./g, 'Website as a Service. Get a full custom website, hosting, continuous support, and analytics rolled into one plan.');
content = content.replace(/\+ \$149\/mo &bull; All-Inclusive/g, '+ $199/mo &bull; All-Inclusive');
content = content.replace(/\* 4-month minimum commitment/g, '* 12-month minimum commitment');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete.');
