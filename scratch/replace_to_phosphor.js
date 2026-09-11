const fs = require('fs');

const htmlPath = 'c:\\Users\\syclo\\retrofit-web\\v2\\index.html';
let content = fs.readFileSync(htmlPath, 'utf-8');

// Replace Lucide script with Phosphor
content = content.replace('<script src="https://unpkg.com/lucide@latest"></script>', '<script src="https://unpkg.com/@phosphor-icons/web"></script>');

// Remove lucide.createIcons()
content = content.replace('<script>\n    lucide.createIcons();\n  </script>', '');
// Also account for formatting differences
content = content.replace(/<script>\s*lucide\.createIcons\(\);\s*<\/script>/g, '');

const map = {
    'phone': 'ph-phone-call',
    'menu': 'ph-list',
    'zap': 'ph-lightning',
    'smartphone': 'ph-device-mobile',
    'file-text': 'ph-file-text',
    'message-square': 'ph-chat-circle',
    'phone-call': 'ph-phone-call',
    'search': 'ph-scan',
    'x': 'ph-x',
    'check': 'ph-check',
    'chevrons-left-right': 'ph-arrows-left-right',
    'send': 'ph-paper-plane-right',
    'check-circle': 'ph-check-circle'
};

// Regex to find all data-lucide="..."
content = content.replace(/<i data-lucide="([^"]+)"(.*?)><\/i>/g, (match, iconName, rest) => {
    const phIcon = map[iconName] || ('ph-' + iconName);
    // Combine existing classes with Phosphor classes
    // rest might contain ` class="btn-icon"`
    // Let's parse out the class attribute
    let newClass = `ph-duotone ${phIcon}`;
    let newRest = rest;
    
    if (rest.includes('class="')) {
        newRest = rest.replace(/class="([^"]+)"/, (m, cls) => {
            return `class="${newClass} ${cls}"`;
        });
    } else {
        newRest = ` class="${newClass}"` + rest;
    }
    
    return `<i${newRest}></i>`;
});

fs.writeFileSync(htmlPath, content, 'utf-8');

console.log("Replaced Lucide with Phosphor Duotone!");
