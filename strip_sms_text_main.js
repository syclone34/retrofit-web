const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
  { target: /built-in instant SMS lead tracking/gi, replacement: "built-in instant lead routing" },
  { target: /Built-in instant SMS lead alerts/gi, replacement: "Built-in instant lead alerts" },
  { target: /Built-In SMS Tracking/gi, replacement: "Built-In Lead Tracking" },
  { target: /Equipped with instant SMS lead alerts/gi, replacement: "Equipped with instant lead alerts" },
  { target: /< 15s to SMS/gi, replacement: "< 15s to Inbox" },
  { target: /Instant SMS routed to contractor phone/gi, replacement: "Instant Lead routed to contractor inbox" },
  { target: /Built-in real-time SMS lead alerts/gi, replacement: "Built-in real-time lead alerts" },
  { target: /No custom SMS lead routing/gi, replacement: "No custom lead routing" },
  { target: /Instant SMS Lead Alerts/gi, replacement: "Instant Lead Alerts" },
  { target: /SMS lead alerts & monthly report/gi, replacement: "Lead alerts & monthly report" },
  { target: /wire up instant SMS lead routing/gi, replacement: "wire up instant lead routing" },
  { target: /instant SMS alerts routed straight to your smartphone/gi, replacement: "instant alerts routed straight to your inbox" },
  { target: /via email and SMS/gi, replacement: "via email" },
  { target: /SMS/g, replacement: "Direct" } // catch any remaining
];

for (const rep of replacements) {
  content = content.replace(rep.target, rep.replacement);
}

fs.writeFileSync(targetFile, content);
console.log('Successfully replaced SMS text references in main index.');
