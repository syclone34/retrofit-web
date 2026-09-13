import re

def convert_to_vintage_cream(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        css = f.read()

    # Replace root tokens with Warm Vintage Cream System
    new_root = """/* --------------------------------------------------------------------------
   1. Design Tokens & CSS Variables (Warm Vintage Cream & Retro Brand System)
   -------------------------------------------------------------------------- */
:root {
  /* Warm Vintage Cream Base */
  --bg-space: #faf5ea;
  --bg-deep: #f3ecdc;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #ffffff;
  --bg-surface-glass: rgba(255, 255, 255, 0.92);
  --bg-surface-glass-hover: rgba(255, 255, 255, 0.98);
  --bg-navy-dark: #121826;
  --bg-navy-card: #182030;

  /* Border & Stroke Accents */
  --border-subtle: rgba(18, 24, 38, 0.08);
  --border-medium: rgba(18, 24, 38, 0.14);
  --border-glow-cyan: rgba(231, 90, 50, 0.25);
  --border-glow-violet: rgba(47, 142, 145, 0.25);

  /* Brand Accents - Exact Logo Harmony (Zero Green) */
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

  /* Legacy variable mapping - strictly zero green, all retro palette */
  --cyan-400: var(--orange-400);
  --cyan-500: var(--orange-500);
  --cyan-600: var(--orange-600);
  --violet-500: var(--teal-500);
  --violet-600: var(--teal-600);
  --fuchsia-500: var(--gold-500);
  --amber-400: var(--gold-400);
  --amber-500: var(--gold-500);
  --emerald-400: var(--teal-500);
  --emerald-500: var(--teal-500);
  --rose-500: #ef4444;

  /* Typography Colors - High Contrast on Cream */
  --text-white: #121826;
  --text-cream: #121826;
  --text-bright: #1b2438;
  --text-muted: #566478;
  --text-faint: #8190a6;
  --text-light: #ffffff;

  /* Gradients */
  --gradient-cyan: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-orange: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-teal: linear-gradient(135deg, #3bb1b5 0%, #2f8e91 100%);
  --gradient-glow: linear-gradient(135deg, #e75a32 0%, #f5ab27 50%, #2f8e91 100%);
  --gradient-card-border: linear-gradient(135deg, rgba(231, 90, 50, 0.2) 0%, rgba(47, 142, 145, 0.15) 50%, rgba(18, 24, 38, 0.04) 100%);
  --gradient-badge: linear-gradient(135deg, rgba(231, 90, 50, 0.1) 0%, rgba(47, 142, 145, 0.08) 100%);
  --gradient-laser: linear-gradient(180deg, rgba(231, 90, 50, 0) 0%, #e75a32 50%, rgba(231, 90, 50, 0) 100%);

  /* Typography Stack */
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Shadows & Glows */
  --glow-cyan-sm: 0 4px 16px rgba(231, 90, 50, 0.25);
  --glow-cyan-md: 0 8px 25px rgba(231, 90, 50, 0.35);
  --glow-violet-md: 0 8px 25px rgba(47, 142, 145, 0.3);
  --glow-emerald-sm: 0 4px 16px rgba(47, 142, 145, 0.25);
  --shadow-card: 0 12px 30px -8px rgba(18, 24, 38, 0.08), 0 0 0 1px rgba(18, 24, 38, 0.05);

  /* Transitions */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.35s var(--ease-smooth);
}"""

    # Replace :root section
    css = re.sub(r'/\* -+[\s\S]+?1\. Design Tokens[\s\S]+?:root \{[\s\S]+?--transition-normal:[^;]+;\s*\}', new_root, css)

    # Body styling for Light Vintage Cream
    new_body = """html {
  scroll-behavior: smooth;
  font-size: 16px;
  color-scheme: light;
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: var(--bg-space);
  color: var(--text-bright);
  font-family: var(--font-body);
  line-height: 1.65;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Subtle Warm Ambient Sunlight Glows */
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
    radial-gradient(circle 900px at 15% 10%, rgba(245, 171, 39, 0.07), transparent 70%),
    radial-gradient(circle 850px at 85% 20%, rgba(231, 90, 50, 0.05), transparent 70%),
    radial-gradient(circle 1000px at 50% 85%, rgba(47, 142, 145, 0.06), transparent 70%);
}

body::after {
  display: none !important;
}"""
    css = re.sub(r'html \{[\s\S]+?body::after \{[^}]+\}', new_body, css)

    # Primary buttons on light background
    css = css.replace('color: #040914;', 'color: #ffffff;')
    css = css.replace('.btn-primary {\n  background: var(--gradient-cyan);\n  color: #040914;', '.btn-primary {\n  background: var(--gradient-cyan);\n  color: #ffffff;')
    css = css.replace('.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 30px rgba(0, 242, 254, 0.55);\n  color: #000;', '.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(231, 90, 50, 0.45);\n  color: #ffffff;')

    # Replace any green references (emerald, #10b981, #34d399, #27c93f) with teal
    css = css.replace('#34d399', 'var(--teal-500)')
    css = css.replace('#10b981', 'var(--teal-500)')
    css = css.replace('#27c93f', 'var(--teal-500)')
    css = css.replace('rgba(16, 185, 129,', 'rgba(47, 142, 145,')
    css = css.replace('rgba(52, 211, 153,', 'rgba(47, 142, 145,')

    # Phone button styling (Teal accent on cream)
    css = css.replace('.btn-phone {\n  background: rgba(16, 185, 129, 0.12);\n  color: var(--emerald-400);\n  border: 1px solid rgba(16, 185, 129, 0.3);', '.btn-phone {\n  background: rgba(47, 142, 145, 0.1);\n  color: var(--teal-500);\n  border: 1px solid rgba(47, 142, 145, 0.25);')

    # Navigation Island for light mode
    nav_light = """.nav-island {
  max-width: max-content;
  width: auto;
  margin: 0;
  padding: 0.55rem 1.4rem;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(18, 24, 38, 0.1);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  box-shadow: 0 10px 30px -5px rgba(18, 24, 38, 0.08), 0 0 0 1px rgba(18, 24, 38, 0.03);
  transition: var(--transition-normal);
}"""
    css = re.sub(r'\.nav-island \{[\s\S]+?transition: var\(--transition-normal\);\s*\}', nav_light, css)

    # Glass panels on cream background
    glass_light = """.glass-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border-medium);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.glass-panel:hover {
  border-color: rgba(231, 90, 50, 0.35);
  box-shadow: 0 20px 45px -10px rgba(18, 24, 38, 0.12), 0 0 20px rgba(231, 90, 50, 0.08);
  transform: translateY(-3px);
}"""
    css = re.sub(r'\.glass-panel \{[\s\S]+?transform: translateY\(-3px\);\s*\}', glass_light, css)

    # Secondary button on cream
    btn_sec_light = """.btn-secondary {
  background: #ffffff;
  color: var(--text-bright);
  border: 1px solid var(--border-medium);
  box-shadow: 0 2px 8px rgba(18, 24, 38, 0.04);
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: rgba(231, 90, 50, 0.35);
  color: var(--orange-500);
  transform: translateY(-2px);
}"""
    css = re.sub(r'\.btn-secondary \{[\s\S]+?transform: translateY\(-2px\);\s*\}', btn_sec_light, css)

    # Trade pills in marquee
    css = css.replace('.trade-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.55rem 1.25rem;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid var(--border-subtle);', '.trade-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.55rem 1.25rem;\n  background: #ffffff;\n  border: 1px solid var(--border-medium);')

    # Lab tab buttons on cream
    css = css.replace('background: rgba(16, 23, 38, 0.6);', 'background: #ffffff;')

    # Footer styling - Midnight navy anchor with cream text
    footer_dark = """.site-footer {
  background: #121826;
  color: #fbf5e8;
  padding: 5rem 0 3rem 0;
  border-top: 1px solid rgba(251, 245, 232, 0.12);
  margin-top: 5rem;
}

.site-footer p {
  color: #c5d0de !important;
}

.footer-link {
  color: #c5d0de;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--orange-400);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 3rem;
  padding-top: 1.5rem;
  color: #8b99ad;
}"""
    css = re.sub(r'\.site-footer \{[\s\S]+?color:\s*#[0-9a-fA-F]+;\s*\}', footer_dark, css)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(css)
    print(f"Successfully converted {filepath} to Warm Vintage Cream!")

convert_to_vintage_cream('c:/Users/syclo/retrofit-web/style.css')
convert_to_vintage_cream('c:/Users/syclo/retrofit-web/v2/style.css')
