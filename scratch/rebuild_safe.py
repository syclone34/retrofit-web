with open('c:/Users/syclo/retrofit-web/scratch/pristine_style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

output_lines = []
in_root = False
in_body_before = False
in_body_after = False

for line in lines:
    # 1. Update :root variables
    if ':root {' in line:
        in_root = True
        output_lines.append(line)
        output_lines.append("""  /* Brand Colors matching Official RetroFit Logo */
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

  /* Brand Accents - Logo Harmony (Zero Neon Green) */
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

  /* Component mappings */
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
}\n""")
        continue

    if in_root:
        if line.strip() == '}':
            in_root = False
        continue

    # 2. Update body::before (ambient glow)
    if 'body::before {' in line:
        in_body_before = True
        output_lines.append("""body::before {
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
}\n""")
        continue

    if in_body_before:
        if line.strip() == '}':
            in_body_before = False
        continue

    # 3. Disable body::after (starfield dots)
    if 'body::after {' in line:
        in_body_after = True
        output_lines.append("""body::after {
  display: none !important;
}\n""")
        continue

    if in_body_after:
        if line.strip() == '}':
            in_body_after = False
        continue

    # 4. Hide floor perspective grid
    if '.synthwave-stage-bg {' in line:
        output_lines.append(".synthwave-stage-bg {\n  display: none !important;\n}\n")
        continue

    # 5. Fix logo sizing
    if '.brand-logo-badge {' in line:
        output_lines.append(""".brand-logo-badge {
  height: 52px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  transition: transform 0.25s ease;\n""")
        continue

    # 6. Replace neon colors in any remaining line
    l = line
    l = l.replace('#00f2fe 0%, #4facfe 50%, #a100ff 100%', '#ff6e42 0%, #f5ab27 50%, #3bb1b5 100%')
    l = l.replace('#00f2fe 0%, #4facfe 100%', '#ff6e42 0%, #e75a32 100%')
    l = l.replace('color: #040914;', 'color: #ffffff;')
    l = l.replace('#34d399', '#3bb1b5')
    l = l.replace('#10b981', '#2f8e91')
    l = l.replace('#27c93f', '#2f8e91')
    l = l.replace('rgba(16, 185, 129,', 'rgba(47, 142, 145,')
    l = l.replace('rgba(52, 211, 153,', 'rgba(47, 142, 145,')

    output_lines.append(l)

final_css = "".join(output_lines)

# Ensure header and footer brand logo rules
header_fix = """
.site-header {
  position: sticky;
  top: 1.25rem;
  z-index: 100;
  padding: 0 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;
}

.brand-link {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 101;
  background-color: transparent !important;
  display: flex;
  align-items: center;
  transition: transform 0.25s ease;
}

.brand-link:hover {
  transform: translateY(-50%) scale(1.04);
}

.footer-brand-link {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.footer-logo-stacked {
  height: 85px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  border: none !important;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
}
"""

final_css += header_fix

with open('c:/Users/syclo/retrofit-web/style.css', 'w', encoding='utf-8') as f:
    f.write(final_css)

with open('c:/Users/syclo/retrofit-web/v2/style.css', 'w', encoding='utf-8') as f:
    f.write(final_css)

print("Saved safe complete style.css and v2/style.css! Lines:", len(output_lines))
