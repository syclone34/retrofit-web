import re

def apply_perfect_mix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        css = f.read()

    # The Perfect Mix: Medium Slate-Navy Backdrop with Warm Cream Typography & Cards
    new_root = """/* --------------------------------------------------------------------------
   1. Design Tokens & CSS Variables (RetroFit "Perfect Mix" Balanced System)
   -------------------------------------------------------------------------- */
:root {
  /* Balanced Medium Retro Slate-Navy Backdrop */
  --bg-space: #161f30;
  --bg-deep: #1a2538;
  --bg-surface: #202d44;
  --bg-surface-elevated: #263650;
  --bg-surface-glass: rgba(26, 37, 56, 0.88);
  --bg-surface-glass-hover: rgba(34, 48, 72, 0.94);
  --bg-cream-card: #fbf5e8;

  /* Border & Stroke Accents */
  --border-subtle: rgba(251, 245, 232, 0.12);
  --border-medium: rgba(251, 245, 232, 0.20);
  --border-glow-cyan: rgba(231, 90, 50, 0.35);
  --border-glow-violet: rgba(47, 142, 145, 0.35);

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
  --cream-muted: #e2dac9;

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

  /* Typography Colors - Warm Cream & High Legibility */
  --text-white: #fbf5e8;
  --text-cream: #fbf5e8;
  --text-bright: #e9eff8;
  --text-muted: #abbad0;
  --text-faint: #7889a2;
  --text-light: #ffffff;

  /* Gradients */
  --gradient-cyan: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-orange: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-teal: linear-gradient(135deg, #3bb1b5 0%, #2f8e91 100%);
  --gradient-glow: linear-gradient(135deg, #e75a32 0%, #f5ab27 50%, #2f8e91 100%);
  --gradient-card-border: linear-gradient(135deg, rgba(231, 90, 50, 0.3) 0%, rgba(47, 142, 145, 0.2) 50%, rgba(251, 245, 232, 0.1) 100%);
  --gradient-badge: linear-gradient(135deg, rgba(231, 90, 50, 0.15) 0%, rgba(47, 142, 145, 0.15) 100%);
  --gradient-laser: linear-gradient(180deg, rgba(231, 90, 50, 0) 0%, #e75a32 50%, rgba(231, 90, 50, 0) 100%);

  /* Typography Stack */
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Shadows & Glows */
  --glow-cyan-sm: 0 4px 16px rgba(231, 90, 50, 0.25);
  --glow-cyan-md: 0 8px 30px rgba(231, 90, 50, 0.35);
  --glow-violet-md: 0 8px 30px rgba(47, 142, 145, 0.35);
  --glow-emerald-sm: 0 4px 16px rgba(47, 142, 145, 0.25);
  --shadow-card: 0 16px 36px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 245, 232, 0.08);

  /* Transitions */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.35s var(--ease-smooth);
}"""

    # Replace :root
    css = re.sub(r'/\* -+[\s\S]+?1\. Design Tokens[\s\S]+?:root \{[\s\S]+?--transition-normal:[^;]+;\s*\}', new_root, css)

    # Body section
    new_body = """html {
  scroll-behavior: smooth;
  font-size: 16px;
  color-scheme: dark;
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

/* Subtle Warm Ambient Glows */
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
    radial-gradient(circle 900px at 15% 15%, rgba(231, 90, 50, 0.07), transparent 70%),
    radial-gradient(circle 850px at 85% 25%, rgba(47, 142, 145, 0.09), transparent 70%),
    radial-gradient(circle 1000px at 50% 85%, rgba(245, 171, 39, 0.06), transparent 70%);
}

body::after {
  display: none !important;
}"""
    css = re.sub(r'html \{[\s\S]+?body::after \{[^}]+\}', new_body, css)

    # Typography defaults
    typo_css = """h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: var(--cream);
}

p {
  color: var(--text-muted);
}

.gradient-text {
  background: linear-gradient(135deg, #ff6e42 0%, #f5ab27 50%, #3bb1b5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}"""
    css = re.sub(r'h1,[\s\S]+?\.gradient-text \{[\s\S]+?display: inline-block;\s*\}', typo_css, css)

    # Nav Island
    nav_css = """.nav-island {
  max-width: max-content;
  width: auto;
  margin: 0;
  padding: 0.55rem 1.4rem;
  background: rgba(22, 31, 48, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(251, 245, 232, 0.16);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(251, 245, 232, 0.05);
  transition: var(--transition-normal);
}

.nav-item-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  transition: var(--transition-fast);
  position: relative;
  padding: 0.35rem 0.15rem;
}

.nav-item-link:hover {
  color: var(--cream);
}"""
    css = re.sub(r'\.nav-island \{[\s\S]+?\.nav-item-link:hover \{\s*color:[^;]+;\s*\}', nav_css, css)

    # Phone Button
    btn_phone_css = """.btn-phone {
  background: rgba(47, 142, 145, 0.15);
  color: #3bb1b5;
  border: 1px solid rgba(47, 142, 145, 0.35);
  padding: 0.6rem 1.05rem;
  font-size: 0.86rem;
  font-weight: 700;
  white-space: nowrap;
}

.btn-phone:hover {
  background: rgba(47, 142, 145, 0.28);
  border-color: #3bb1b5;
  color: #ffffff;
  box-shadow: var(--glow-emerald-sm);
  transform: translateY(-2px);
}"""
    css = re.sub(r'\.btn-phone \{[\s\S]+?transform: translateY\(-2px\);\s*\}', btn_phone_css, css)

    # Glass Panels
    glass_css = """.glass-panel {
  background: var(--bg-surface-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.glass-panel:hover {
  border-color: rgba(231, 90, 50, 0.35);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(231, 90, 50, 0.15);
  transform: translateY(-3px);
}"""
    css = re.sub(r'\.glass-panel \{[\s\S]+?transform: translateY\(-3px\);\s*\}', glass_css, css)

    # Secondary Button
    btn_sec = """.btn-secondary {
  background: rgba(251, 245, 232, 0.06);
  color: var(--cream);
  border: 1px solid var(--border-medium);
  backdrop-filter: blur(12px);
}

.btn-secondary:hover {
  background: rgba(251, 245, 232, 0.12);
  border-color: var(--orange-500);
  color: #ffffff;
  transform: translateY(-2px);
}"""
    css = re.sub(r'\.btn-secondary \{[\s\S]+?transform: translateY\(-2px\);\s*\}', btn_sec, css)

    # Trade pills in marquee
    trade_pill_css = """.trade-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1.25rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
  transition: var(--transition-fast);
}

.trade-pill i {
  color: var(--orange-500);
  font-size: 1.15rem;
}

.trade-pill:hover {
  background: var(--bg-surface-elevated);
  border-color: var(--orange-500);
  color: var(--cream);
}"""
    css = re.sub(r'\.trade-pill \{[\s\S]+?color: var\(--cream\);\s*\}', trade_pill_css, css)

    # Lab tab buttons
    lab_tabs_css = """.lab-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: var(--transition-normal);
}

.lab-tab-btn i {
  color: var(--teal-400);
  font-size: 1.1rem;
}

.lab-tab-btn:hover {
  background: var(--bg-surface-elevated);
  color: var(--cream);
  border-color: var(--border-medium);
  transform: translateY(-2px);
}

.lab-tab-btn.active {
  background: var(--gradient-cyan);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(231, 90, 50, 0.4);
}"""
    css = re.sub(r'\.lab-tab-btn \{[\s\S]+?box-shadow: 0 4px 20px rgba\(231, 90, 50, 0\.4\);\s*\}', lab_tabs_css, css)

    # Hero interactive deck
    deck_css = """.hero-interactive-deck {
  position: relative;
  z-index: 1;
  background: var(--bg-deep);
  border: 1px solid var(--border-medium);
  border-radius: 24px;
  padding: 1.5rem;
  backdrop-filter: blur(25px);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(251, 245, 232, 0.08);
  transition: transform 0.4s var(--ease-smooth);
}"""
    css = re.sub(r'\.hero-interactive-deck \{[\s\S]+?transition: transform 0\.4s var\(--ease-smooth\);\s*\}', deck_css, css)

    # Footer
    footer_css = """.site-footer {
  background: #111726;
  color: var(--cream);
  padding: 5rem 0 3rem 0;
  border-top: 1px solid var(--border-subtle);
  margin-top: 5rem;
}

.site-footer p {
  color: var(--text-muted) !important;
}

.footer-link {
  color: var(--text-muted);
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
  color: var(--text-faint);
}"""
    css = re.sub(r'\.site-footer \{[\s\S]+?color: var\(--text-faint\);\s*\}', footer_css, css)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(css)
    print(f"Applied Perfect Mix to {filepath}")

apply_perfect_mix('c:/Users/syclo/retrofit-web/style.css')
apply_perfect_mix('c:/Users/syclo/retrofit-web/v2/style.css')
