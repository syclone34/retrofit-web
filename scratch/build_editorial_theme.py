import re

with open('c:/Users/syclo/retrofit-web/scratch/pristine_style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. New Design Tokens for Clean Modern Editorial
new_root = """:root {
  /* Brand Colors from Official Logo */
  --navy-dark: #131a26;
  --navy-surface: #1c2536;
  --navy-elevated: #243046;
  --cream-base: #fbf8f1;
  --cream-alt: #f5eedf;
  --cream-white: #ffffff;
  --cream-border: rgba(19, 26, 38, 0.08);

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

  /* Global Base Variables */
  --bg-space: var(--navy-dark);
  --bg-deep: var(--navy-surface);
  --bg-surface: var(--cream-white);
  --bg-surface-elevated: var(--cream-white);

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

  /* Typography Defaults */
  --text-dark: #121826;
  --text-dark-muted: #566478;
  --text-dark-faint: #8291a5;
  --text-cream: #fbf5e8;
  --text-bright: #edf2f7;
  --text-muted: #a6b5c9;
  --text-faint: #738399;

  /* Gradients */
  --gradient-cyan: linear-gradient(135deg, #ff6e42 0%, #e75a32 100%);
  --gradient-glow: linear-gradient(135deg, #e75a32 0%, #f5ab27 50%, #2f8e91 100%);
  --gradient-card-border: linear-gradient(135deg, rgba(231, 90, 50, 0.25) 0%, rgba(47, 142, 145, 0.2) 50%, rgba(19, 26, 38, 0.05) 100%);
  --gradient-badge: linear-gradient(135deg, rgba(231, 90, 50, 0.1) 0%, rgba(47, 142, 145, 0.1) 100%);

  /* Typography Stack */
  --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Modern Editorial Shadows */
  --shadow-sm: 0 2px 8px rgba(19, 26, 38, 0.06);
  --shadow-md: 0 12px 32px -6px rgba(19, 26, 38, 0.08), 0 0 0 1px rgba(19, 26, 38, 0.05);
  --shadow-lg: 0 24px 50px -12px rgba(19, 26, 38, 0.12), 0 0 0 1px rgba(19, 26, 38, 0.05);
  --shadow-card: var(--shadow-md);

  /* Transitions */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.35s var(--ease-smooth);
}"""

old_root_pattern = r':root\s*\{[\s\S]*?--transition-normal:\s*all\s*0\.35s\s*var\(--ease-smooth\);\s*\}'
css = re.sub(old_root_pattern, new_root, css, count=1)

# 2. Body base styling
new_body_bg = """body {
  background-color: var(--cream-base);
  color: var(--text-dark);
  font-family: var(--font-body);
  line-height: 1.65;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body::before,
body::after {
  display: none !important;
}"""

old_body_bg = r'body\s*\{[\s\S]*?body::after\s*\{[\s\S]*?opacity:\s*0\.68;\s*\}'
css = re.sub(old_body_bg, new_body_bg, css, count=1)

# 3. Clean Primary & Phone Buttons
css = css.replace('color: #040914;', 'color: #ffffff;')
css = css.replace('background: rgba(16, 185, 129, 0.12);\n  color: var(--emerald-400);\n  border: 1px solid rgba(16, 185, 129, 0.3);',
                  'background: rgba(47, 142, 145, 0.12);\n  color: #3bb1b5;\n  border: 1px solid rgba(47, 142, 145, 0.3);')
css = css.replace('background: rgba(16, 185, 129, 0.22);\n  border-color: var(--emerald-400);',
                  'background: rgba(47, 142, 145, 0.25);\n  border-color: #3bb1b5;')

# 4. Floating Header & Brand Logo
header_update = """.site-header {
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

.brand-logo-badge {
  height: 52px;
  width: auto;
  max-width: 145px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.nav-island {
  max-width: max-content;
  width: auto;
  margin: 0;
  padding: 0.55rem 1.4rem;
  background: rgba(19, 26, 38, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(251, 245, 232, 0.15);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 245, 232, 0.05);
  transition: var(--transition-normal);
}

.nav-item-link {
  color: #c5d0de;
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

old_header_pattern = r'\.site-header\s*\{[\s\S]*?\.nav-item-link:hover\s*\{\s*color:\s*var\(--text-white\);\s*\}'
css = re.sub(old_header_pattern, header_update, css, count=1)

# 5. Clean Hero Section in Solid Deep Midnight Navy with Cream Headlines
hero_update = """/* --------------------------------------------------------------------------
   7. Hero Section (Deep Midnight Navy Anchor)
   -------------------------------------------------------------------------- */
.hero-section {
  background: var(--navy-dark);
  color: var(--cream);
  padding: 3rem 0 6.5rem 0;
  position: relative;
  overflow: hidden;
  margin-top: -6rem;
  padding-top: 8.5rem;
  border-bottom: 4px solid var(--orange-500);
}

.synthwave-stage-bg {
  display: none !important;
}

.hero-title {
  color: var(--cream);
  font-size: clamp(2.4rem, 4.4vw, 3.8rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.hero-desc {
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  color: #c2cedf;
  line-height: 1.6;
  max-width: 580px;
}

.hero-desc strong {
  color: var(--cream);
}

.hero-stat-val {
  color: var(--cream);
}

.hero-stat-label {
  color: #9bb0cb;
}

.hero-interactive-deck {
  background: var(--navy-surface);
  border: 1px solid rgba(251, 245, 232, 0.15);
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.6);
}"""

old_hero_pattern = r'/\* -+[\s\S]+?7\. Hero Section[\s\S]+?\.hero-interactive-deck \{[\s\S]+?transition: transform 0\.4s var\(--ease-smooth\);\s*\}'
css = re.sub(old_hero_pattern, hero_update, css, count=1)

# 6. Ticker / Marquee Section (Soft Warm Cream Transition)
ticker_update = """.marquee-section {
  background: var(--cream-alt);
  padding: 1.75rem 0;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid var(--cream-border);
}

.trade-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.35rem;
  background: #ffffff;
  border: 1px solid rgba(19, 26, 38, 0.08);
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-dark);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
  transition: var(--transition-fast);
}

.trade-pill i {
  color: var(--orange-500);
  font-size: 1.15rem;
}

.trade-pill:hover {
  background: #ffffff;
  border-color: var(--orange-500);
  color: var(--orange-500);
  transform: translateY(-2px);
}"""

old_ticker_pattern = r'/\* -+[\s\S]+?8\. Contractor Industry Marquee[\s\S]+?\.trade-pill:hover \{[\s\S]+?color: var\(--cyan-500\);\s*\}'
css = re.sub(old_ticker_pattern, ticker_update, css, count=1)

# 7. Alternating Section Backgrounds & Editorial Cards
editorial_sections = """
/* ==========================================================================
   Editorial Section Layouts & Color Hierarchy
   ========================================================================== */

/* Before & After Lab - Crisp Off-White */
.lab-section {
  background: var(--cream-base);
  color: var(--text-dark);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-border);
}

.lab-section .section-title {
  color: var(--text-dark);
}

.lab-section .section-subtitle {
  color: var(--text-dark-muted);
}

.lab-tab-btn {
  background: #ffffff;
  border: 1px solid rgba(19, 26, 38, 0.1);
  color: var(--text-dark-muted);
  box-shadow: var(--shadow-sm);
}

.lab-tab-btn i {
  color: var(--teal-500);
}

.lab-tab-btn:hover {
  background: #ffffff;
  color: var(--text-dark);
  border-color: var(--orange-500);
  transform: translateY(-2px);
}

.lab-tab-btn.active {
  background: var(--gradient-cyan);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 20px rgba(231, 90, 50, 0.35);
}

.lab-frame-card {
  background: #ffffff !important;
  border: 1px solid rgba(19, 26, 38, 0.08) !important;
  box-shadow: var(--shadow-lg) !important;
}

.lab-frame-card .metric-val {
  color: var(--text-dark) !important;
}

/* Simulator Section - Warm Cream */
.simulator-section {
  background: var(--cream-alt);
  color: var(--text-dark);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-border);
}

.simulator-section .section-title {
  color: var(--text-dark);
}

.simulator-section .section-subtitle {
  color: var(--text-dark-muted);
}

.simulator-card,
.phone-mockup-wrapper {
  background: #ffffff !important;
  border: 1px solid rgba(19, 26, 38, 0.08) !important;
  box-shadow: var(--shadow-lg) !important;
}

/* Speed Scanner - Deep Navy Highlight Block */
.scanner-section {
  background: var(--navy-dark);
  color: var(--cream);
  padding: 6rem 0;
  border-top: 4px solid var(--teal-500);
  border-bottom: 4px solid var(--orange-500);
}

.scanner-section .section-title {
  color: var(--cream);
}

.scanner-section .section-subtitle {
  color: #c2cedf;
}

.scanner-console-card {
  background: var(--navy-surface) !important;
  border: 1px solid rgba(251, 245, 232, 0.15) !important;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.5) !important;
}

/* Why RetroFit Bento Grid - Crisp Off-White */
.comparison-section {
  background: var(--cream-base);
  color: var(--text-dark);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-border);
}

.comparison-section .section-title {
  color: var(--text-dark);
}

.comparison-section .section-subtitle {
  color: var(--text-dark-muted);
}

.bento-card {
  background: #ffffff !important;
  border: 1px solid rgba(19, 26, 38, 0.08) !important;
  box-shadow: var(--shadow-card) !important;
}

.bento-card h3 {
  color: var(--text-dark) !important;
}

.bento-card p {
  color: var(--text-dark-muted) !important;
}

.bento-card.highlight-winner {
  background: #ffffff !important;
  border: 2px solid var(--orange-500) !important;
  box-shadow: 0 20px 45px -10px rgba(231, 90, 50, 0.15) !important;
}

/* Pricing Section - Warm Cream */
.pricing-section {
  background: var(--cream-alt);
  color: var(--text-dark);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-border);
}

.pricing-section .section-title {
  color: var(--text-dark);
}

.pricing-section .section-subtitle {
  color: var(--text-dark-muted);
}

.pricing-card {
  background: #ffffff !important;
  border: 1px solid rgba(19, 26, 38, 0.08) !important;
  box-shadow: var(--shadow-card) !important;
}

.pricing-card h3,
.pricing-price-val {
  color: var(--text-dark) !important;
}

.pricing-desc,
.pricing-feature-item {
  color: var(--text-dark-muted) !important;
}

.pricing-card.popular {
  border: 2px solid var(--orange-500) !important;
  box-shadow: 0 25px 50px -12px rgba(231, 90, 50, 0.2) !important;
}

/* Founder / About Section - Crisp Off-White */
.founder-section {
  background: var(--cream-base);
  color: var(--text-dark);
  padding: 6rem 0;
}

.founder-section .section-title {
  color: var(--text-dark);
}

.founder-section p {
  color: var(--text-dark-muted) !important;
}

.founder-card {
  background: #ffffff !important;
  border: 1px solid rgba(19, 26, 38, 0.08) !important;
  box-shadow: var(--shadow-lg) !important;
}

/* Site Footer - Deep Navy Anchor */
.site-footer {
  background: var(--navy-dark) !important;
  color: var(--cream) !important;
  padding: 5rem 0 3rem 0;
  border-top: 1px solid rgba(251, 245, 232, 0.12);
  margin-top: 0 !important;
}

.site-footer p,
.site-footer .footer-link {
  color: #abbad0 !important;
}

.site-footer .footer-link:hover {
  color: var(--orange-400) !important;
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

# Append the editorial rules
css += "\n" + editorial_sections

# Replace any lingering neon green/emerald references with retro teal
css = css.replace('#34d399', 'var(--teal-500)')
css = css.replace('#10b981', 'var(--teal-500)')
css = css.replace('#27c93f', 'var(--teal-500)')
css = css.replace('rgba(16, 185, 129,', 'rgba(47, 142, 145,')
css = css.replace('rgba(52, 211, 153,', 'rgba(47, 142, 145,')

# Headline text gradient
css = css.replace('linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #a100ff 100%)', 'linear-gradient(135deg, #ff6e42 0%, #f5ab27 50%, #3bb1b5 100%)')

with open('c:/Users/syclo/retrofit-web/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('c:/Users/syclo/retrofit-web/v2/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Clean Modern Editorial CSS applied successfully!")
