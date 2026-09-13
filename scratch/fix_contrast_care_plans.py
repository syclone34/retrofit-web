import os
import shutil

with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace the glass-panel feature row styles with high-contrast text and bright check circles
old_glass_feature_css = '''.glass-panel .pack-feature-row {
  color: #e2e8f0;
}

.glass-panel .pack-feature-row i {
  color: var(--cyan-400);
}'''

new_glass_feature_css = '''.glass-panel .pack-feature-row,
.care-card .pack-feature-row {
  color: #e2e8f0;
  font-size: 0.92rem;
}

.glass-panel .pack-feature-row strong,
.care-card .pack-feature-row strong {
  color: #ffffff !important;
  font-weight: 700;
}

.glass-panel .feat-check-circle,
.care-card .feat-check-circle {
  background: rgba(34, 197, 94, 0.18);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.35);
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.15);
}

.glass-panel .pack-feature-row i,
.care-card .pack-feature-row i {
  color: #4ade80;
}'''

css = css.replace(old_glass_feature_css, new_glass_feature_css)

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Updated style.css and synced to v2")

# Bump cache buster in index.html and v2/index.html
for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    html = html.replace('style.css?v=3.9.3', 'style.css?v=3.9.4')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Bumped cache buster in {path}")
