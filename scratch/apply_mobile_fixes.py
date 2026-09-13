import os
import shutil

# 1. Update style.css to add overflow-x: hidden to html, body, and polish mobile header & responsive rules
with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Ensure global overflow-x protection
if 'overflow-x: hidden' not in css[:500]:
    css = css.replace(
'''body {
  font-family: var(--font-body);''',
'''html, body {
  overflow-x: hidden;
  max-width: 100%;
}

body {
  font-family: var(--font-body);'''
    )

# Update @media (max-width: 860px) in style.css
old_860_rule = '''@media (max-width: 860px) {
  .nav-island {
    padding: 0.65rem 1.15rem;
  }
  .brand-logo-badge {
    height: 64px;
  }
  .nav-menu {
    display: none;
  }
  .nav-mobile-toggle {
    display: block;
  }'''

new_860_rule = '''@media (max-width: 860px) {
  .nav-island {
    padding: 0.65rem 1.15rem;
  }
  .brand-logo-badge {
    height: 52px;
    max-width: 170px;
  }
  .nav-menu {
    display: none;
  }
  .nav-actions .btn-phone,
  .nav-actions .btn-primary {
    display: none !important;
  }
  .nav-mobile-toggle {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #ffffff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
  }
  .nav-mobile-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  .care-plans-row {
    grid-template-columns: 1fr;
  }'''

css = css.replace(old_860_rule, new_860_rule)

# Add mobile cockpit tuning in @media (max-width: 480px)
old_480_rule = '''@media (max-width: 480px) {
  .lab-metrics-strip {
    grid-template-columns: 1fr;
  }'''

new_480_rule = '''@media (max-width: 480px) {
  .hero-deck-features {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .hero-speed-meter-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
    padding: 1rem;
  }
  .meter-details {
    width: 100%;
  }
  .radar-lead-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
  .radar-lead-val {
    align-self: flex-start;
  }
  .lab-metrics-strip {
    grid-template-columns: 1fr;
  }'''

css = css.replace(old_480_rule, new_480_rule)

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Updated style.css and synced to v2/style.css")

# 2. Update app.js and v2/app.js mobile menu styling to match brand palette
for js_path in [r'c:\Users\syclo\retrofit-web\app.js', r'c:\Users\syclo\retrofit-web\v2\app.js']:
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    js = js.replace("navMenu.style.background = 'rgba(10, 14, 23, 0.98)';", "navMenu.style.background = 'rgba(21, 28, 40, 0.98)';")
    js = js.replace("navMenu.style.border = '1px solid rgba(0, 242, 254, 0.2)';", "navMenu.style.border = '1px solid rgba(251, 245, 232, 0.15)';")
    js = js.replace("navMenu.style.borderRadius = '20px';", "navMenu.style.borderRadius = '16px'; navMenu.style.boxShadow = '0 16px 36px rgba(0,0,0,0.5)';")

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"Updated mobile menu styles in {js_path}")

# 3. Bump cache busters in index.html and v2/index.html
for html_path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    html = html.replace('style.css?v=3.9.1', 'style.css?v=3.9.2')
    html = html.replace('app.js?v=3.9.0', 'app.js?v=3.9.1')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Bumped cache buster in {html_path}")
