css_content = """/* ==========================================================================
   RetroFit Web Design — Clean Modern Agency Design System
   Tailored for Local Trade Contractors & Small Service Businesses
   Brand Palette: Midnight Navy (#131a26), Vintage Cream (#fbf5e8),
   Sunset Terracotta (#e75a32), Retro Teal (#2f8e91), Golden Mustard (#f5ab27)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Design Tokens & Variables
   -------------------------------------------------------------------------- */
:root {
  /* Brand Palette from Official Logo */
  --navy-950: #0f1520;
  --navy-900: #131a26;
  --navy-850: #182232;
  --navy-800: #1e2a3e;
  --navy-700: #2a3a54;

  /* Neutrals */
  --cream-50: #fbf8f1;
  --cream-100: #f5eedf;
  --cream-200: #ebe1cd;
  --white: #ffffff;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Accents */
  --orange-500: #e75a32;
  --orange-600: #d44922;
  --orange-400: #ff6e42;
  --teal-500: #2f8e91;
  --teal-600: #247376;
  --teal-400: #3bb1b5;
  --gold-500: #f5ab27;
  --gold-400: #ffbe47;
  --cream-logo: #fbf5e8;

  /* System Semantics */
  --bg-page: var(--cream-50);
  --bg-card: #ffffff;
  --border-card: var(--gray-200);
  --text-main: var(--gray-900);
  --text-muted: var(--gray-600);
  --text-light: #ffffff;

  /* Typography */
  --font-head: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Shadows */
  --shadow-sm: 0 2px 6px rgba(19, 26, 38, 0.05);
  --shadow-md: 0 10px 25px -5px rgba(19, 26, 38, 0.08), 0 0 0 1px rgba(19, 26, 38, 0.05);
  --shadow-lg: 0 20px 40px -10px rgba(19, 26, 38, 0.12), 0 0 0 1px rgba(19, 26, 38, 0.06);
  --shadow-xl: 0 25px 60px -15px rgba(19, 26, 38, 0.20);
  --shadow-orange: 0 8px 24px -4px rgba(231, 90, 50, 0.35);
  --shadow-teal: 0 8px 24px -4px rgba(47, 142, 145, 0.30);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Transitions */
  --trans-fast: 0.2s ease;
  --trans-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* --------------------------------------------------------------------------
   2. Base Reset & Typography
   -------------------------------------------------------------------------- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-head);
  font-weight: 800;
  color: var(--gray-900);
  line-height: 1.15;
  letter-spacing: -0.025em;
}

p {
  color: var(--text-muted);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.gradient-text {
  background: linear-gradient(135deg, var(--orange-400) 0%, var(--gold-500) 50%, var(--teal-400) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* --------------------------------------------------------------------------
   3. Buttons & Badges
   -------------------------------------------------------------------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.85rem;
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  cursor: pointer;
  border: none;
  transition: var(--trans-normal);
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--orange-400) 0%, var(--orange-500) 100%);
  color: #ffffff;
  box-shadow: var(--shadow-orange);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ff7e54 0%, var(--orange-600) 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -4px rgba(231, 90, 50, 0.45);
  color: #ffffff;
}

.btn-secondary {
  background: rgba(251, 245, 232, 0.12);
  color: var(--cream-logo);
  border: 1.5px solid rgba(251, 245, 232, 0.25);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(251, 245, 232, 0.22);
  border-color: rgba(251, 245, 232, 0.45);
  color: #ffffff;
  transform: translateY(-2px);
}

.btn-phone {
  background: rgba(47, 142, 145, 0.15);
  color: var(--teal-400);
  border: 1.5px solid rgba(47, 142, 145, 0.35);
  padding: 0.65rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 700;
}

.btn-phone:hover {
  background: rgba(47, 142, 145, 0.28);
  border-color: var(--teal-400);
  color: #ffffff;
  box-shadow: var(--shadow-teal);
  transform: translateY(-2px);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gold-400);
  background: rgba(245, 171, 39, 0.12);
  border: 1px solid rgba(245, 171, 39, 0.3);
  border-radius: var(--radius-pill);
}

.badge-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--teal-400);
  box-shadow: 0 0 10px var(--teal-400);
}

/* --------------------------------------------------------------------------
   4. Floating Agency Header
   -------------------------------------------------------------------------- */
.site-header {
  position: sticky;
  top: 1rem;
  z-index: 1000;
  padding: 0 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;
}

.nav-island {
  width: 100%;
  max-width: 1240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.75rem;
  background: rgba(19, 26, 38, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(251, 245, 232, 0.15);
  border-radius: var(--radius-pill);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.45);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.brand-logo-badge {
  height: 52px;
  width: auto;
  max-width: 145px;
  object-fit: contain;
  transition: transform var(--trans-fast);
}

.brand-link:hover .brand-logo-badge {
  transform: scale(1.04);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
}

.nav-item-link {
  color: #c5d0de;
  font-size: 0.92rem;
  font-weight: 600;
  transition: color var(--trans-fast);
  position: relative;
  padding: 0.25rem 0;
}

.nav-item-link:hover {
  color: var(--cream-logo);
}

.nav-item-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--orange-500);
  transition: width var(--trans-fast);
}

.nav-item-link:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav-actions .btn-primary {
  padding: 0.65rem 1.4rem;
  font-size: 0.9rem;
}

.nav-mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* --------------------------------------------------------------------------
   5. Hero Section (Deep Navy Statement Anchor)
   -------------------------------------------------------------------------- */
.hero-section {
  background: var(--navy-900);
  color: var(--cream-logo);
  padding: 3rem 0 6.5rem 0;
  position: relative;
  overflow: hidden;
  margin-top: -5.5rem;
  padding-top: 8rem;
  border-bottom: 5px solid var(--orange-500);
}

/* Signature Retro Stripe Accent */
.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--teal-500) 0%, var(--teal-500) 33.3%, var(--gold-500) 33.3%, var(--gold-500) 66.6%, var(--orange-500) 66.6%, var(--orange-500) 100%);
}

.synthwave-stage-bg {
  display: none !important;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 3.5rem;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  color: var(--cream-logo);
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
  color: var(--cream-logo);
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.hero-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(251, 245, 232, 0.12);
}

.hero-stat-card {
  display: flex;
  flex-direction: column;
}

.hero-stat-val {
  font-family: var(--font-head);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--cream-logo);
  line-height: 1.2;
}

.hero-stat-label {
  font-size: 0.8rem;
  color: #9bb0cb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

/* Hero Showcase Deck */
.hero-visual-wrapper {
  position: relative;
}

.ambient-glow-orb {
  display: none !important;
}

.hero-interactive-deck {
  background: var(--navy-850);
  border: 1px solid rgba(251, 245, 232, 0.15);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.6);
}

.deck-chrome-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(251, 245, 232, 0.1);
}

.deck-dots {
  display: flex;
  gap: 6px;
}

.deck-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.deck-dot.red { background: #ff5f56; }
.deck-dot.yellow { background: #ffbd2e; }
.deck-dot.green { background: #27c93f; }

.deck-url-chip {
  background: rgba(0, 0, 0, 0.25);
  padding: 0.25rem 0.85rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #c2cedf;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.deck-status-live {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--teal-400);
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero-split-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.split-card {
  padding: 1.15rem;
  border-radius: var(--radius-md);
  position: relative;
}

.split-card.legacy {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.split-card.modern {
  background: rgba(47, 142, 145, 0.12);
  border: 1px solid rgba(47, 142, 145, 0.35);
}

.split-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  margin-bottom: 0.85rem;
}

.split-card.legacy .split-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #9ca3af;
}

.split-card.modern .split-tag {
  background: var(--teal-500);
  color: #ffffff;
}

.split-metric-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.75rem;
  font-size: 0.82rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
}

.split-metric-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.split-metric-row span:first-child {
  color: #94a3b8;
  white-space: nowrap;
}

.split-metric-row .val-bad {
  color: #fca5a5;
  font-weight: 600;
}

.split-metric-row .val-good {
  color: #5eead4;
  font-weight: 700;
}

.laser-scan-line {
  display: none !important;
}

.hero-floating-lead-pill {
  background: var(--navy-950);
  border: 1px solid rgba(251, 245, 232, 0.15);
  padding: 0.75rem 1.15rem;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
}

.lead-pill-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--orange-500);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}

.lead-pill-text {
  font-size: 0.82rem;
  line-height: 1.35;
  color: #cbd5e1;
}

.lead-pill-text strong {
  color: #ffffff;
}

.lead-pill-time {
  font-size: 0.72rem;
  color: var(--gold-400);
  font-weight: 600;
}

/* --------------------------------------------------------------------------
   6. Contractor Industry Ticker (Clean Warm Band)
   -------------------------------------------------------------------------- */
.marquee-section {
  background: var(--cream-100);
  padding: 1.75rem 0;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid var(--cream-200);
}

.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: scrollMarquee 35s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes scrollMarquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.trade-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 1.35rem;
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--gray-800);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
  transition: var(--trans-fast);
}

.trade-pill i {
  color: var(--orange-500);
  font-size: 1.15rem;
}

.trade-pill:hover {
  border-color: var(--orange-500);
  color: var(--orange-500);
  transform: translateY(-2px);
}

/* --------------------------------------------------------------------------
   7. Before / After Transformation Lab (Crisp Light Studio)
   -------------------------------------------------------------------------- */
.lab-section {
  background: var(--cream-50);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-200);
}

.section-header {
  margin-bottom: 3.5rem;
}

.section-header.text-center {
  text-align: center;
}

.section-title {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  margin-bottom: 1rem;
  color: var(--gray-900);
}

.section-subtitle {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  max-width: 680px;
  margin: 0 auto;
  color: var(--gray-600);
}

.industry-tabs-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.lab-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-pill);
  color: var(--gray-700);
  font-family: var(--font-head);
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--trans-fast);
}

.lab-tab-btn i {
  color: var(--teal-500);
  font-size: 1.1rem;
}

.lab-tab-btn:hover {
  background: #ffffff;
  color: var(--orange-500);
  border-color: var(--orange-500);
  transform: translateY(-2px);
}

.lab-tab-btn.active {
  background: linear-gradient(135deg, var(--orange-400) 0%, var(--orange-500) 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--shadow-orange);
}

.lab-tab-btn.active i {
  color: #ffffff;
}

/* Slider Frame */
.slider-stage {
  max-width: 1060px;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-xl);
}

.slider-viewport {
  position: relative;
  width: 100%;
  height: 540px;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  background: #000;
}

.slider-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-layer.after-layer {
  z-index: 2;
  width: 50%;
  border-right: 3px solid #ffffff;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.35);
}

.slider-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  pointer-events: none;
}

.slider-badge {
  position: absolute;
  top: 1.25rem;
  z-index: 5;
  padding: 0.4rem 1rem;
  font-family: var(--font-head);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-sm);
  backdrop-filter: blur(10px);
}

.slider-badge.badge-before {
  left: 1.25rem;
  background: rgba(185, 28, 28, 0.85);
  color: #ffffff;
}

.slider-badge.badge-after {
  right: 1.25rem;
  background: rgba(47, 142, 145, 0.9);
  color: #ffffff;
}

.slider-handle-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #ffffff;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  cursor: ew-resize;
  pointer-events: auto;
}

.slider-handle-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: var(--orange-500);
  border: 3px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.25rem;
}

/* Lab Metrics Strip */
.lab-metrics-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--gray-200);
  background: #ffffff;
}

.lab-metric-card {
  padding: 1.5rem;
  text-align: center;
  border-right: 1px solid var(--gray-200);
}

.lab-metric-card:last-child {
  border-right: none;
}

.metric-tag {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  margin-bottom: 0.25rem;
}

.metric-val {
  font-family: var(--font-head);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--gray-900);
}

.metric-val.bad { color: #dc2626; }
.metric-val.good { color: var(--teal-500); }

/* --------------------------------------------------------------------------
   8. Instant Lead Simulator Section (Warm Cream)
   -------------------------------------------------------------------------- */
.simulator-section {
  background: var(--cream-100);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-200);
}

.simulator-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3.5rem;
  align-items: center;
}

.simulator-card {
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: 2.25rem;
  box-shadow: var(--shadow-lg);
}

.phone-mockup-frame {
  width: 320px;
  margin: 0 auto;
  background: var(--navy-950);
  border: 4px solid var(--navy-800);
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(19, 26, 38, 0.4);
}

.phone-speaker {
  width: 80px;
  height: 6px;
  background: #334155;
  border-radius: 3px;
  margin: 12px auto 8px auto;
}

.phone-screen {
  background: #0f172a;
  padding: 1.25rem 1rem;
  min-height: 480px;
  color: #ffffff;
}

.sms-thread {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sms-bubble {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 0.85rem 1rem;
  font-size: 0.82rem;
  line-height: 1.4;
}

.sms-bubble.alert-bubble {
  background: rgba(231, 90, 50, 0.18);
  border-color: var(--orange-500);
}

.sms-bubble strong {
  color: var(--orange-400);
  display: block;
  margin-bottom: 0.25rem;
}

/* --------------------------------------------------------------------------
   9. Speed Diagnostic Scanner (Deep Navy Feature Block)
   -------------------------------------------------------------------------- */
.scanner-section {
  background: var(--navy-900);
  color: var(--cream-logo);
  padding: 6rem 0;
  border-top: 4px solid var(--teal-500);
  border-bottom: 4px solid var(--orange-500);
}

.scanner-section .section-title {
  color: var(--cream-logo);
}

.scanner-section .section-subtitle {
  color: #c2cedf;
}

.scanner-console-card {
  max-width: 960px;
  margin: 0 auto;
  background: var(--navy-850);
  border: 1px solid rgba(251, 245, 232, 0.15);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-xl);
}

.scanner-input-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.scanner-input {
  flex: 1;
  background: #ffffff;
  color: var(--gray-900);
  border: 1px solid var(--gray-300);
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-pill);
  font-size: 1rem;
  font-family: var(--font-body);
  outline: none;
}

.scanner-input:focus {
  border-color: var(--orange-500);
}

.scanner-scores-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.score-dial {
  background: var(--navy-900);
  border: 1px solid rgba(251, 245, 232, 0.1);
  border-radius: var(--radius-md);
  padding: 1.25rem 1rem;
  text-align: center;
}

.score-val {
  font-family: var(--font-head);
  font-size: 2rem;
  font-weight: 800;
  color: var(--teal-400);
}

.score-val.warn { color: var(--gold-400); }
.score-val.danger { color: #f87171; }

.score-label {
  font-size: 0.78rem;
  color: #9bb0cb;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

/* --------------------------------------------------------------------------
   10. Why RetroFit Comparison Bento Grid
   -------------------------------------------------------------------------- */
.comparison-section {
  background: var(--cream-50);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-200);
}

.comparison-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.bento-card {
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: var(--trans-normal);
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.bento-card.highlight-winner {
  border: 2px solid var(--orange-500);
  box-shadow: 0 16px 36px -8px rgba(231, 90, 50, 0.18);
  position: relative;
}

.bento-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: rgba(231, 90, 50, 0.1);
  color: var(--orange-500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
}

.bento-title {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: var(--gray-900);
}

.bento-desc {
  color: var(--gray-600);
  font-size: 0.95rem;
  line-height: 1.55;
}

/* --------------------------------------------------------------------------
   11. Packages & Pricing (Clean High-Ticket Presentation)
   -------------------------------------------------------------------------- */
.pricing-section {
  background: var(--cream-100);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-200);
}

.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

.pricing-card {
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pricing-card.popular {
  border: 2.5px solid var(--orange-500);
  box-shadow: 0 20px 45px -10px rgba(231, 90, 50, 0.22);
}

.pricing-badge {
  position: absolute;
  top: -14px;
  right: 2rem;
  background: var(--orange-500);
  color: #ffffff;
  font-family: var(--font-head);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.35rem 1rem;
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-orange);
}

.pricing-title {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.pricing-desc {
  color: var(--gray-600);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.pricing-price {
  margin-bottom: 1.75rem;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.pricing-price-val {
  font-family: var(--font-head);
  font-size: 3rem;
  font-weight: 800;
  color: var(--gray-900);
}

.pricing-price-term {
  font-size: 1rem;
  color: var(--gray-500);
  font-weight: 600;
}

.pricing-features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.pricing-feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.92rem;
  color: var(--gray-700);
  font-weight: 500;
}

.pricing-feature-item i {
  color: var(--teal-500);
  font-size: 1.15rem;
  flex-shrink: 0;
}

/* --------------------------------------------------------------------------
   12. Founder & About Section
   -------------------------------------------------------------------------- */
.founder-section {
  background: var(--cream-50);
  padding: 6rem 0;
  border-bottom: 1px solid var(--cream-200);
}

.founder-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 3.5rem;
  align-items: center;
}

.founder-card {
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
}

.founder-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1.5rem auto;
  border: 4px solid var(--orange-500);
}

/* --------------------------------------------------------------------------
   13. Contact & Free Audit Form
   -------------------------------------------------------------------------- */
.contact-section {
  background: var(--cream-100);
  padding: 6rem 0;
}

.contact-card {
  max-width: 760px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: var(--shadow-lg);
}

.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: var(--font-head);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--gray-800);
}

.form-input, .form-textarea {
  width: 100%;
  background: var(--gray-50);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--gray-900);
  outline: none;
}

.form-input:focus, .form-textarea:focus {
  border-color: var(--orange-500);
  background: #ffffff;
}

/* --------------------------------------------------------------------------
   14. Site Footer (Deep Midnight Navy Anchor)
   -------------------------------------------------------------------------- */
.site-footer {
  background: var(--navy-900);
  color: var(--cream-logo);
  padding: 5rem 0 3rem 0;
  border-top: 1px solid rgba(251, 245, 232, 0.12);
}

.footer-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.footer-logo-stacked {
  height: 85px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  transition: transform var(--trans-fast);
}

.footer-logo-stacked:hover {
  transform: scale(1.04);
}

.site-footer p {
  color: #abbad0;
  font-size: 0.95rem;
  max-width: 580px;
}

.footer-links-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.footer-links-row a {
  color: var(--cream-logo);
  font-size: 0.92rem;
  font-weight: 600;
  transition: color var(--trans-fast);
}

.footer-links-row a:hover {
  color: var(--orange-400);
}

.footer-legal {
  font-size: 0.82rem;
  color: #718096;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
}

/* --------------------------------------------------------------------------
   15. Mobile Sticky Bar & Responsive Rules
   -------------------------------------------------------------------------- */
.mobile-action-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--navy-900);
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(251, 245, 232, 0.15);
  z-index: 999;
}

.mobile-action-bar-inner {
  display: flex;
  gap: 0.75rem;
}

.mobile-action-bar .btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 0.88rem;
}

@media (max-width: 1024px) {
  .hero-grid, .simulator-grid, .founder-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .comparison-bento-grid {
    grid-template-columns: 1fr;
  }
  .pricing-cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .nav-menu {
    display: none;
  }
  .nav-mobile-toggle {
    display: block;
  }
  .lab-metrics-strip {
    grid-template-columns: repeat(2, 1fr);
  }
  .scanner-scores-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .scanner-input-form {
    flex-direction: column;
  }
  .mobile-action-bar {
    display: block;
  }
  body {
    padding-bottom: 70px;
  }
}
"""

with open('c:/Users/syclo/retrofit-web/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

with open('c:/Users/syclo/retrofit-web/v2/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Saved clean modern agency style.css and v2/style.css successfully!")
