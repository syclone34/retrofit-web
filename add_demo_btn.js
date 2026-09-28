const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetContent = `<a href="#contact" class="btn btn-navy pack-cta-btn" data-plan="All-in-One Engine ($0 Upfront / $149/mo)">
            <span>Select $0 Build Plan</span>
            <i class="ph-bold ph-arrow-right btn-icon"></i>
          </a>`;

const replacementContent = `<a href="#contact" class="btn btn-navy pack-cta-btn" style="margin-bottom: 0.5rem;" data-plan="All-in-One Engine ($0 Upfront / $199/mo)">
            <span>Select All-in-One Engine</span>
            <i class="ph-bold ph-arrow-right btn-icon"></i>
          </a>
          <a href="demo-dashboard.html" class="btn btn-secondary pack-cta-btn" target="_blank" style="margin-top: 0;">
            <i class="ph-bold ph-chart-line-up btn-icon"></i>
            View Live Dashboard Demo
          </a>`;

content = content.replace(targetContent, replacementContent);
// Also fix the dropdown option value
content = content.replace('<option value="All-in-One Engine ($0 Upfront / $149/mo)">All-in-One Engine ($0 Upfront / $149/mo)</option>', '<option value="All-in-One Engine ($0 Upfront / $199/mo)">All-in-One Engine ($0 Upfront / $199/mo)</option>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added demo dashboard button');
