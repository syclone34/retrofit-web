import os
file_path = r'c:\Users\syclo\retrofit-web\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<div class="pack-tier-title">Brand New Website Build</div>', '<div class="pack-tier-title">Performance Build</div>')
content = content.replace('<div class="pack-tier-desc">Starting fresh? Complete custom high-converting website engineered from scratch for your trade.</div>', '<div class="pack-tier-desc">Starting fresh? Complete custom high-converting website engineered from scratch for your trade, optimized for local SEO.</div>')
content = content.replace('<span class="pack-price-amt">$499</span>', '<span class="pack-price-amt">$899</span>')
content = content.replace('<span>Select $499 New Build</span>', '<span>Select Performance Build</span>')
content = content.replace('<div class="pack-tier-title">Growth Partner Plan</div>', '<div class="pack-tier-title">All-in-One Engine</div>')
content = content.replace('<div class="pack-tier-desc">Zero upfront barrier. Get a full custom website, hosting, and continuous support rolled into one monthly plan.</div>', '<div class="pack-tier-desc">Website as a Service. Get a full custom website, hosting, continuous support, and analytics rolled into one plan.</div>')
content = content.replace('<div class="pack-retainer-badge"><i class="ph-bold ph-check"></i> + $149/mo &bull; All-Inclusive</div>', '<div class="pack-retainer-badge"><i class="ph-bold ph-check"></i> + $199/mo &bull; All-Inclusive</div>')
content = content.replace('<div style="font-size: 0.7rem; color: var(--color-gray); margin-top: 3px; text-align: center;">* 4-month minimum commitment</div>', '<div style="font-size: 0.7rem; color: var(--color-gray); margin-top: 3px; text-align: center;">* 12-month minimum commitment</div>')
content = content.replace('<span><strong>Up to 5-10 Pages Built From Scratch</strong></span>', '<span><strong>Up to 5 Pages Built From Scratch</strong></span>')
content = content.replace('<span>Ongoing Standard SEO Setup</span>', '<span>Lead Tracking Setup & Routing</span>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated pricing in index.html')
