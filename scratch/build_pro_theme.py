import re

with open('c:/Users/syclo/retrofit-web/scratch/pristine_style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update :root Tokens with the exact colors from the official logo
old_root_pattern = r':root\s*\{[\s\S]*?--transition-normal:\s*all\s*0\.35s\s*var\(--ease-smooth\);\s*\}'

new_root = """:root {
  /* Official RetroFit Logo Brand Palette */
  --bg-space: #131a26;
  --bg-deep: #182130;
  --bg-surface: #1e283a;
  --bg-surface-elevated: #253248;
  --bg-surface-glass: rgba(24, 33, 48, 0.88);
  --bg-surface-glass-hover: rgba(30, 40, 58, 0.94);

  /* Border & Stroke Accents */
  --border-subtle: rgba(251, 245, 232, 0.10);
  --border-medium: rgba(251, 245, 232, 0.18);
  --border-glow-cyan: rgba(231, 90, 50, 0.35);
  --border-glow-violet: rgba(47, 142, 145, 0.35);

  /* Brand Accents - Exact Logo Colors (Zero Neon Green) */
  --orange-400: #ff6e42;
  --orange-500: #e75a32;
  --orange-600: #d44922;
  --teal-400: #3bb1b5;
  --teal-500: #2f8e91;
  --teal-600: #237073;
  --gold-400: #ffbe47;
  --gold-500: #f5ab27;
  --cream: #fbf5e8;
  --cream-muted: #e4dcce;

  /* Component color mapping */
  --cyan-400: var(--orange-400);
  --cyan-500: var(--orange-500);
  --cyan-600: var(--orange-600);
  --violet-500: var(--teal-500);
  --violet-600: var(--teal-600);
  --fuchsia-500: var(--gold-500);
  --amber-400: var(--gold-400);
  --amber-500: var(--gold-500);
  --emerald-400: var(--teal-400);
  --emerald-500: var(--teal-500);
  --rose-500: #ef4444;

  /* Typography Colors */
  --text-white: #fbf5e8;
  --text-cream: #fbf5e8;
  --text-bright: #edf2f7;
  --text-muted: #a6b5c9;
  --text-faint: #738399;

  /* Gradients */
  --gradient-cyan: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-glow: linear-gradient(135deg, #e75a32 0%, #f5ab27 50%, #2f8e91 100%);
  --gradient-card-border: linear-gradient(135deg, rgba(231, 90, 50, 0.35) 0%, rgba(47, 142, 145, 0.25) 50%, rgba(251, 245, 232, 0.08) 100%);
  --gradient-badge: linear-gradient(135deg, rgba(231, 90, 50, 0.15) 0%, rgba(47, 142, 145, 0.15) 100%);
  --gradient-laser: linear-gradient(180deg, rgba(231, 90, 50, 0) 0%, #e75a32 50%, rgba(231, 90, 50, 0) 100%);

  /* Typography Stack */
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Shadows & Glows */
  --glow-cyan-sm: 0 0 16px rgba(231, 90, 50, 0.25);
  --glow-cyan-md: 0 0 32px rgba(231, 90, 50, 0.35);
  --glow-violet-md: 0 0 32px rgba(47, 142, 145, 0.35);
  --glow-emerald-sm: 0 0 16px rgba(47, 142, 145, 0.3);
  --shadow-card: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(251, 245, 232, 0.06);

  /* Transitions */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.35s var(--ease-smooth);
}"""

css = re.sub(old_root_pattern, new_root, css, count=1)

# 2. Ambient background: soft warm glow matching the logo, remove starfield dots
old_body_bg = r'body::before\s*\{[\s\S]*?body::after\s*\{[\s\S]*?opacity:\s*0\.68;\s*\}'

new_body_bg = """/* Ambient Warm Sunset Glows matching Logo Atmosphere */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(circle 900px at 15% 15%, rgba(231, 90, 50, 0.08), transparent 70%),
    radial-gradient(circle 850px at 85% 25%, rgba(47, 142, 145, 0.10), transparent 70%),
    radial-gradient(circle 1000px at 50% 85%, rgba(245, 171, 39, 0.06), transparent 70%);
}

body::after {
  display: none !important;
}"""

css = re.sub(old_body_bg, new_body_bg, css, count=1)

# 3. Update typography & gradient-text
css = css.replace('linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #a100ff 100%)', 'linear-gradient(135deg, #ff6e42 0%, #f5ab27 50%, #3bb1b5 100%)')
css = css.replace('linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', 'linear-gradient(135deg, #ff6e42 0%, #e75a32 100%)')

# 4. Primary button color
css = css.replace('color: #040914;', 'color: #ffffff;')

# 5. Phone button: Use Retro Teal instead of emerald green
css = css.replace('background: rgba(16, 185, 129, 0.12);', 'background: rgba(47, 142, 145, 0.15);')
css = css.replace('color: var(--emerald-400);', 'color: #3bb1b5;')
css = css.replace('border: 1px solid rgba(16, 185, 129, 0.3);', 'border: 1px solid rgba(47, 142, 145, 0.35);')
css = css.replace('background: rgba(16, 185, 129, 0.22);', 'background: rgba(47, 142, 145, 0.28);')
css = css.replace('border-color: var(--emerald-400);', 'border-color: #3bb1b5;')

# 6. Navbar and Brand Logo styling
css = css.replace('.brand-logo-badge {\n  height: 110px;\n  width: auto;\n  max-width: 250px;', '.brand-logo-badge {\n  height: 52px;\n  width: auto;\n  max-width: 145px;\n  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));')

# Ensure header vertically aligns brand-link
css = css.replace('.site-header {\n  position: sticky;\n  top: 1.25rem;\n  z-index: 100;\n  padding: 0 2rem;\n  margin-bottom: 2rem;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  max-width: 1360px;\n  margin-left: auto;\n  margin-right: auto;\n}',
                  '.site-header {\n  position: sticky;\n  top: 1.25rem;\n  z-index: 100;\n  padding: 0 2rem;\n  margin-bottom: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  max-width: 1360px;\n  margin-left: auto;\n  margin-right: auto;\n}')

css = css.replace('.brand-link {\n  position: absolute;\n  left: 1.5rem;\n  top: 0;\n  z-index: 101;\n  background-color: transparent !important;\n  transition: transform 0.25s ease;\n}',
                  '.brand-link {\n  position: absolute;\n  left: 1.5rem;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 101;\n  background-color: transparent !important;\n  display: flex;\n  align-items: center;\n  transition: transform 0.25s ease;\n}\n\n.brand-link:hover {\n  transform: translateY(-50%) scale(1.04);\n}')

# Footer logo styling
css = css.replace('.footer-logo-stacked {\n  height: 140px;\n  width: auto;\n  border-radius: 18px;\n  object-fit: contain;\n  border: 1px solid rgba(0, 242, 254, 0.25);',
                  '.footer-logo-stacked {\n  height: 85px;\n  width: auto;\n  max-width: 220px;\n  object-fit: contain;\n  border: none;')

# Replace green in status dots, badge pulses, and split cards
css = css.replace('#34d399', '#3bb1b5')
css = css.replace('#10b981', '#2f8e91')
css = css.replace('#27c93f', '#2f8e91')
css = css.replace('rgba(16, 185, 129,', 'rgba(47, 142, 145,')
css = css.replace('rgba(52, 211, 153,', 'rgba(47, 142, 145,')

# Clean hero perspective floor grid so it doesn't clutter the page
css = css.replace('.synthwave-stage-bg {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 260px;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: 0;\n}',
                  '.synthwave-stage-bg {\n  display: none !important;\n}')

with open('c:/Users/syclo/retrofit-web/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('c:/Users/syclo/retrofit-web/v2/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Saved professional style.css and v2/style.css successfully!")
