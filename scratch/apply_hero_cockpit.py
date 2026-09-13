import os
import shutil

NEW_HERO_HTML = '''    <div class="container hero-grid">
      <div class="hero-content">
        <div class="badge">
          <span class="badge-pulse"></span>
          <span>Fast 48-72h Turnaround &bull; Built-In SMS Tracking</span>
        </div>

        <h1 class="hero-title">
          Your Website Doesn’t Need a $3,000 Rebuild. It Needs a <span class="gradient-text">Rescue.</span>
        </h1>

        <p class="hero-desc">
          I rescue slow, broken, and outdated contractor websites in 48–72 hours for a flat $299 — and build custom high-speed new sites from scratch. <strong>Equipped with instant SMS lead alerts</strong> so you capture high-ticket customer inquiries the second they land.
        </p>

        <div class="hero-cta-group">
          <a href="#scanner" class="btn btn-primary">
            <i class="ph-duotone ph-lightning btn-icon"></i>
            Scan Your Website Free
          </a>
          <a href="#simulator" class="btn btn-secondary">
            <i class="ph-bold ph-play-circle btn-icon"></i>
            See Lead Machine
          </a>
        </div>

        <div class="hero-trust-proof">
          <div class="trust-stars">
            <i class="ph-fill ph-star"></i>
            <i class="ph-fill ph-star"></i>
            <i class="ph-fill ph-star"></i>
            <i class="ph-fill ph-star"></i>
            <i class="ph-fill ph-star"></i>
          </div>
          <span>Built for MN Trade Contractors &bull; No Agency Lock-ins</span>
        </div>

        <div class="hero-stats-row">
          <div class="hero-stat-card">
            <span class="hero-stat-val">48-72h</span>
            <span class="hero-stat-label">Rapid Delivery</span>
          </div>
          <div class="hero-stat-card">
            <span class="hero-stat-val">$299</span>
            <span class="hero-stat-label">Flat Rate Rescue</span>
          </div>
          <div class="hero-stat-card">
            <span class="hero-stat-val">0.4s</span>
            <span class="hero-stat-label">Sub-Second Load</span>
          </div>
        </div>
      </div>

      <!-- Hero Visual: RetroFit High-Speed Architecture Showcase Deck -->
      <div class="hero-visual-wrapper">
        <div class="hero-ambient-glow"></div>
        <div class="hero-interactive-deck">
          <div class="deck-chrome-bar">
            <div class="deck-dots">
              <span class="deck-dot red"></span>
              <span class="deck-dot yellow"></span>
              <span class="deck-dot green"></span>
            </div>
            <div class="deck-url-chip">
              <i class="ph-bold ph-lock-simple" style="font-size: 0.7rem; color: #4ade80; margin-right: 4px;"></i>
              retrofitwebdesign.com/engine
            </div>
            <div class="deck-status-live">
              <span class="badge-pulse"></span>
              <span>LIVE ENGINE</span>
            </div>
          </div>

          <!-- Hero Speed Score Banner -->
          <div class="hero-speed-meter-card">
            <div class="meter-score-ring">
              <svg viewBox="0 0 36 36" class="circular-chart green">
                <path class="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="circle"
                  stroke-dasharray="99, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="score-number">99</div>
            </div>
            <div class="meter-details">
              <div class="meter-top">
                <span class="meter-badge">Google Lighthouse</span>
                <span class="meter-speed"><i class="ph-bold ph-lightning"></i> 0.38s Load</span>
              </div>
              <div class="meter-title">Sub-Second Mobile Architecture</div>
              <div class="meter-tags">
                <span class="meter-tag"><i class="ph-bold ph-check"></i> SEO 100</span>
                <span class="meter-tag"><i class="ph-bold ph-check"></i> Best Practices 100</span>
                <span class="meter-tag"><i class="ph-bold ph-check"></i> Accessibility 100</span>
              </div>
            </div>
          </div>

          <!-- Hero Live Lead Dispatch Alert -->
          <div class="hero-dispatch-radar-card">
            <div class="radar-header">
              <div class="radar-left">
                <span class="radar-ping"></span>
                <span class="radar-title">REAL-TIME LEAD DISPATCH</span>
              </div>
              <span class="radar-speed-badge">&lt; 15s to SMS</span>
            </div>

            <div class="radar-lead-body">
              <div class="radar-lead-top">
                <div class="radar-lead-caller">
                  <span class="radar-avatar"><i class="ph-bold ph-user"></i></span>
                  <div>
                    <div class="radar-lead-name">Dave M. <span class="radar-loc">&bull; Plymouth, MN</span></div>
                    <div class="radar-lead-service">Furnace Out &bull; Emergency Replacement</div>
                  </div>
                </div>
                <div class="radar-lead-val">$5,800 Est.</div>
              </div>
              <div class="radar-status-bar">
                <i class="ph-bold ph-check-circle" style="color: #4ade80;"></i>
                <span>Instant SMS routed to contractor phone &bull; <strong>11.4s total elapsed</strong></span>
              </div>
            </div>
          </div>

          <!-- 3 Quick Architecture Highlights -->
          <div class="hero-deck-features">
            <div class="deck-feat-pill">
              <i class="ph-bold ph-feather" style="color: var(--teal-400);"></i>
              <span>Zero WP Bloat</span>
            </div>
            <div class="deck-feat-pill">
              <i class="ph-bold ph-device-mobile" style="color: var(--gold-400);"></i>
              <span>100% Fluid Mobile</span>
            </div>
            <div class="deck-feat-pill">
              <i class="ph-bold ph-tag" style="color: var(--orange-400);"></i>
              <span>$299 Flat Rate</span>
            </div>
          </div>

        </div>
      </div>
    </div>'''

NEW_HERO_CSS = '''/* Hero Stats Row */
.hero-trust-proof {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: #9bb0cb;
  font-weight: 500;
  margin-top: -0.25rem;
}

.hero-trust-proof .trust-stars {
  display: flex;
  gap: 3px;
  color: var(--gold-400);
  font-size: 0.92rem;
}

.hero-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(251, 245, 232, 0.12);
  width: 100%;
}

.hero-stat-card {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.15rem;
  background: rgba(20, 28, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  transition: all var(--trans-fast);
}

.hero-stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(26, 36, 52, 0.8);
}

.hero-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
}

.hero-stat-card:nth-child(1)::before {
  background: var(--orange-500);
}

.hero-stat-card:nth-child(2)::before {
  background: var(--gold-400);
}

.hero-stat-card:nth-child(3)::before {
  background: var(--teal-400);
}

.hero-stat-val {
  font-family: var(--font-head);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--cream-logo);
  line-height: 1.2;
}

.hero-stat-label {
  font-size: 0.78rem;
  color: #9bb0cb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-top: 2px;
}

/* Hero Showcase Deck & Ambient Glow */
.hero-visual-wrapper {
  position: relative;
}

.hero-ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 115%;
  height: 115%;
  background: radial-gradient(circle, rgba(222, 87, 60, 0.13) 0%, rgba(48, 136, 130, 0.09) 45%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.hero-interactive-deck {
  position: relative;
  z-index: 1;
  background: linear-gradient(175deg, rgba(26, 35, 50, 0.96) 0%, rgba(16, 22, 32, 0.98) 100%);
  border: 1.5px solid rgba(251, 245, 232, 0.16);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
}

.deck-chrome-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.15rem;
  padding-bottom: 0.75rem;
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
  background: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.85rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #c2cedf;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
}

.deck-status-live {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--teal-400);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Speed Meter Card */
.hero-speed-meter-card {
  background: rgba(10, 14, 22, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.15rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-speed-meter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: #22c55e;
}

.meter-score-ring {
  position: relative;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-chart {
  display: block;
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 3;
}

.circle {
  fill: none;
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke: #22c55e;
  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6));
}

.score-number {
  position: absolute;
  font-family: var(--font-head);
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.meter-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex-grow: 1;
}

.meter-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meter-badge {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.meter-speed {
  font-size: 0.78rem;
  font-weight: 700;
  color: #4ade80;
  display: flex;
  align-items: center;
  gap: 4px;
}

.meter-title {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  color: var(--cream-logo);
}

.meter-tags {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.meter-tag {
  font-size: 0.68rem;
  font-weight: 600;
  color: #c2cedf;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.meter-tag i {
  color: #4ade80;
  font-size: 0.75rem;
}

/* Dispatch Radar Card */
.hero-dispatch-radar-card {
  background: rgba(10, 14, 22, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-dispatch-radar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: var(--orange-500);
}

.radar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.radar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radar-ping {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--orange-500);
  box-shadow: 0 0 10px var(--orange-500);
  animation: radar-pulse 2s infinite;
}

@keyframes radar-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(222, 87, 60, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(222, 87, 60, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(222, 87, 60, 0); }
}

.radar-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gold-400);
}

.radar-speed-badge {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--orange-400);
  background: rgba(222, 87, 60, 0.12);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(222, 87, 60, 0.25);
}

.radar-lead-body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.radar-lead-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.radar-lead-caller {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.radar-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(251, 245, 232, 0.1);
  border: 1px solid rgba(251, 245, 232, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cream-logo);
  font-size: 0.95rem;
  flex-shrink: 0;
}

.radar-lead-name {
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
}

.radar-loc {
  font-weight: 400;
  color: #94a3b8;
  font-size: 0.82rem;
}

.radar-lead-service {
  font-size: 0.78rem;
  color: var(--gold-400);
  margin-top: 1px;
}

.radar-lead-val {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 800;
  color: #4ade80;
  background: rgba(34, 197, 94, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.radar-status-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.radar-status-bar strong {
  color: #ffffff;
}

/* 3 Quick Architecture Highlights */
.hero-deck-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.deck-feat-pill {
  background: rgba(10, 14, 22, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-pill);
  padding: 0.45rem 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  font-weight: 600;
  color: #c2cedf;
  transition: all var(--trans-fast);
}

.deck-feat-pill:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}'''

def update_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Bump cache buster
    content = content.replace('style.css?v=3.8.0', 'style.css?v=3.9.0')

    # Find the hero container
    start_marker = '<div class="container hero-grid">'
    end_marker = '<!-- Contractor Industry Marquee -->'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print(f"Error finding markers in {file_path}")
        return False

    # Extract up to closing </section>
    section_end_idx = content.rfind('</section>', start_idx, end_idx)
    if section_end_idx == -1:
        print(f"Error finding </section> in {file_path}")
        return False

    new_content = content[:start_idx] + NEW_HERO_HTML + '\n  ' + content[section_end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated HTML in {file_path}")
    return True

def update_css_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find where .hero-stats-row starts and marquee starts
    start_idx = -1
    end_idx = -1
    for idx, line in enumerate(lines):
        if '.hero-stats-row {' in line:
            start_idx = idx
        if '/* --------------------------------------------------------------------------' in line and idx > 600:
            end_idx = idx
            break

    if start_idx == -1 or end_idx == -1:
        print(f"Error finding CSS slice: start={start_idx}, end={end_idx}")
        return False

    new_lines = lines[:start_idx] + [NEW_HERO_CSS + '\n\n'] + lines[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Updated CSS in {file_path}")
    return True

if __name__ == '__main__':
    update_html_file(r'c:\Users\syclo\retrofit-web\index.html')
    update_html_file(r'c:\Users\syclo\retrofit-web\v2\index.html')
    update_css_file(r'c:\Users\syclo\retrofit-web\style.css')
    shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
    print("All updates applied and synced to v2 successfully.")
