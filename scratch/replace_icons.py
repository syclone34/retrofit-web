import re

html_path = r"c:\Users\syclo\retrofit-web\v2\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Include Lucide script
lucide_script = '<script src="https://unpkg.com/lucide@latest"></script>\n  <!-- Main JavaScript Application -->'
content = content.replace('<!-- Main JavaScript Application -->', lucide_script)

# Add lucide.createIcons() to app.js, or just put it inline in index.html right before </body>
lucide_init = '<script>\n    lucide.createIcons();\n  </script>\n</body>'
content = content.replace('</body>', lucide_init)

# Now, let's regex replace the various SVGs

replacements = [
    (r'<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2\.5">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M2\.25 6\.75[^>]+/>\s*</svg>', '<i data-lucide="phone" class="btn-icon"></i>'),
    (r'<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0[^>]+/>.*?</svg>', '<i data-lucide="phone" class="btn-icon"></i>'),
    (r'<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path d="M2\.25 6\.75[^>]+/>.*?</svg>', '<i data-lucide="phone" class="btn-icon"></i>'),
    
    (r'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\s*<line[^>]+></line>\s*<line[^>]+></line>\s*<line[^>]+></line>\s*</svg>', '<i data-lucide="menu"></i>'),
    
    (r'<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>\s*</svg>', '<i data-lucide="zap" class="btn-icon"></i>'),
    
    (r'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h\.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>\s*</svg>', '<i data-lucide="smartphone"></i>'),
    
    (r'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>\s*</svg>', '<i data-lucide="file-text"></i>'),
    
    (r'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M8 10h\.01M12 10h\.01M16 10h\.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>\s*</svg>', '<i data-lucide="message-square" style="width:14px; height:14px;"></i>'),
    
    (r'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0[^>]+/>\s*</svg>', '<i data-lucide="phone-call" style="width:12px; height:12px;"></i>'),
    
    (r'<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5">\s*<circle cx="11" cy="11" r="8"></circle>\s*<line x1="21" y1="21" x2="16\.65" y2="16\.65"></line>\s*</svg>', '<i data-lucide="search" class="btn-icon"></i>'),
    
    (r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path d="M18 6L6 18M6 6l12 12"/></svg>', '<i data-lucide="x" style="width:18px; height:18px;"></i>'),
    
    (r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><polyline points="20 6 9 17 4 12"/></svg>', '<i data-lucide="check" style="width:18px; height:18px;"></i>'),
    
    (r'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><polyline points="20 6 9 17 4 12"/></svg>', '<i data-lucide="check"></i>'),
    
    (r'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M8 7l-5 5 5 5m8-10l5 5-5 5"/>\s*</svg>', '<i data-lucide="chevrons-left-right" style="width:18px; height:18px;"></i>'),
    
    (r'<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2\.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>', '<i data-lucide="send" class="btn-icon"></i>'),
    
    (r'<svg class="form-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\s*<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>\s*</svg>', '<i data-lucide="check-circle" class="form-success-icon"></i>')
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Icons replaced with Lucide!")
