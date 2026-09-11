const fs = require('fs');

const htmlPath = 'c:\\Users\\syclo\\retrofit-web\\v2\\index.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

const emojiMap = {
    '🔧': '<i class="ph-duotone ph-wrench"></i>',
    '🏠': '<i class="ph-duotone ph-house"></i>',
    '🌿': '<i class="ph-duotone ph-leaf"></i>',
    '🚗': '<i class="ph-duotone ph-car-profile"></i>',
    '⚡': '<i class="ph-duotone ph-lightning"></i>',
    '🔨': '<i class="ph-duotone ph-hammer"></i>',
    '✨': '<i class="ph-duotone ph-sparkle"></i>',
    '🐾': '<i class="ph-duotone ph-paw-print"></i>',
    '🍕': '<i class="ph-duotone ph-pizza"></i>'
};

for (const [emoji, icon] of Object.entries(emojiMap)) {
    // Global replacement for the emojis
    const regex = new RegExp(emoji, 'g');
    content = content.replace(regex, icon);
}

fs.writeFileSync(htmlPath, content, 'utf-8');
console.log("Emojis replaced with Phosphor icons!");
