import os
import shutil

NEW_PRICING_CARDS_HTML = '''      <!-- 3 Core Packages -->
      <div class="pricing-cards-grid">
        <!-- Package 1: Rescue (Featured) -->
        <div class="pricing-card featured" id="packRescue">
          <div class="pricing-card-badge">
            <i class="ph-fill ph-fire"></i>
            <span>Most Popular &bull; 48-72h Delivery</span>
          </div>

          <div class="pack-header-meta">
            <span class="pack-category-chip chip-orange">Existing Sites</span>
            <span class="pack-speed-chip"><i class="ph-bold ph-lightning"></i> 48–72h Turnaround</span>
          </div>

          <div class="pack-tier-title">Website Rescue Package</div>
          <div class="pack-tier-desc">Fast visual modernization, mobile redesign, and sub-second speed overhaul for your current service site.</div>

          <div class="pack-price-block">
            <div class="price-main-line">
              <span class="pack-price-amt">$299</span>
              <span class="pack-price-cadence">flat rate</span>
            </div>
            <div class="pack-retainer-badge"><i class="ph-bold ph-check"></i> Zero Monthly Retainer &bull; 100% Yours</div>
          </div>

          <ul class="pack-features-list">
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>Up to 5 Pages Modernized</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>Fast 48–72 Hour Delivery</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>100% Fluid Mobile Ergonomics</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Sub-Second Google Speed Optimization</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Click-to-Call & Quote Lead Routing</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Local SEO Meta Structure & Free SSL</span>
            </li>
          </ul>

          <a href="#contact" class="btn btn-primary pack-cta-btn" data-plan="Website Rescue Package ($299)">
            <i class="ph-duotone ph-lightning btn-icon"></i>
            Claim $299 Rescue
          </a>
        </div>

        <!-- Package 2: New Build -->
        <div class="pricing-card" id="packNewBuild">
          <div class="pack-header-meta">
            <span class="pack-category-chip chip-teal">Brand New Site</span>
            <span class="pack-speed-chip"><i class="ph-bold ph-clock"></i> 3–5 Days</span>
          </div>

          <div class="pack-tier-title">Brand New Website Build</div>
          <div class="pack-tier-desc">Starting fresh? Complete custom high-converting website engineered from scratch for your trade.</div>

          <div class="pack-price-block">
            <div class="price-main-line">
              <span class="pack-price-amt">$499</span>
              <span class="pack-price-cadence">flat rate</span>
            </div>
            <div class="pack-retainer-badge"><i class="ph-bold ph-check"></i> Turnkey Delivery &bull; Zero Lock-in</div>
          </div>

          <ul class="pack-features-list">
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>Up to 5 Pages Built From Scratch</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>3–5 Day Delivery Turnaround</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>100% Mobile-First Ergonomic Layout</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Google Business Profile & Map Embed</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>High-Speed Cloud Hosting & SSL Setup</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>100% Ownership & Full Source Code</span>
            </li>
          </ul>

          <a href="#contact" class="btn btn-navy pack-cta-btn" data-plan="Brand New Website Build ($499)">
            <span>Select $499 New Build</span>
            <i class="ph-bold ph-arrow-right btn-icon"></i>
          </a>
        </div>

        <!-- Package 3: Overhaul -->
        <div class="pricing-card" id="packOverhaul">
          <div class="pack-header-meta">
            <span class="pack-category-chip chip-gold">Full Expansion</span>
            <span class="pack-speed-chip"><i class="ph-bold ph-clock"></i> 3–5 Days</span>
          </div>

          <div class="pack-tier-title">Custom Site Overhaul</div>
          <div class="pack-tier-desc">Multi-service expansion for established trade businesses dominating multiple local Minnesota cities.</div>

          <div class="pack-price-block">
            <div class="price-main-line">
              <span class="pack-price-amt">$599</span>
              <span class="pack-price-cadence">flat rate</span>
            </div>
            <div class="pack-retainer-badge"><i class="ph-bold ph-check"></i> Multi-Location &bull; Maximum Reach</div>
          </div>

          <ul class="pack-features-list">
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>Up to 10 Pages Included</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span><strong>3–5 Day Delivery Turnaround</strong></span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Multi-Location & City Target Pages</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Google Reviews & Reputation Showcase</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>Sub-Second CDN Speed & Schema Setup</span>
            </li>
            <li class="pack-feature-row">
              <span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>
              <span>2 Weeks Post-Launch Priority Support</span>
            </li>
          </ul>

          <a href="#contact" class="btn btn-navy pack-cta-btn" data-plan="Custom Site Overhaul ($599)">
            <span>Select $599 Overhaul</span>
            <i class="ph-bold ph-arrow-right btn-icon"></i>
          </a>
        </div>
      </div>'''

NEW_PRICING_CSS = '''/* --------------------------------------------------------------------------
   11. Packages & Pricing (Clean High-Ticket Presentation)
   -------------------------------------------------------------------------- */
.pricing-section {
  background: var(--cream-100);
  padding: 6.5rem 0;
  border-bottom: 1px solid var(--cream-200);
  position: relative;
}

.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1140px;
  margin: 2.5rem auto 0;
  align-items: stretch;
}

.pricing-card {
  background: #ffffff;
  border: 1.5px solid rgba(21, 28, 40, 0.08);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem 2.25rem;
  box-shadow: 0 12px 32px -8px rgba(21, 28, 40, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform var(--trans-normal), box-shadow var(--trans-normal), border-color var(--trans-normal);
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(21, 28, 40, 0.14);
  border-color: rgba(21, 28, 40, 0.16);
}

.pricing-card.featured {
  border: 2px solid var(--orange-500);
  box-shadow: 0 24px 55px -10px rgba(222, 87, 60, 0.22), 0 0 0 1px rgba(222, 87, 60, 0.15);
  transform: scale(1.03);
  z-index: 2;
  background: #ffffff;
}

.pricing-card.featured:hover {
  transform: scale(1.03) translateY(-5px);
  box-shadow: 0 30px 65px -10px rgba(222, 87, 60, 0.3);
}

.pricing-card-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--orange-500) 0%, var(--orange-400) 100%);
  color: #ffffff;
  font-family: var(--font-head);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 1.25rem;
  border-radius: var(--radius-pill);
  box-shadow: 0 8px 20px -2px rgba(222, 87, 60, 0.45);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  z-index: 5;
}

.pack-header-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.15rem;
}

.pack-category-chip {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-pill);
}

.pack-category-chip.chip-orange {
  background: rgba(222, 87, 60, 0.12);
  color: var(--orange-600);
  border: 1px solid rgba(222, 87, 60, 0.25);
}

.pack-category-chip.chip-teal {
  background: rgba(48, 136, 130, 0.12);
  color: var(--teal-600);
  border: 1px solid rgba(48, 136, 130, 0.25);
}

.pack-category-chip.chip-gold {
  background: rgba(243, 178, 62, 0.15);
  color: #b45309;
  border: 1px solid rgba(243, 178, 62, 0.3);
}

.pack-speed-chip {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--gray-600);
  display: flex;
  align-items: center;
  gap: 4px;
}

.pack-speed-chip i {
  color: var(--orange-500);
  font-size: 0.82rem;
}

.pack-tier-title {
  font-family: var(--font-head);
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--gray-900);
  line-height: 1.2;
  margin-bottom: 0.45rem;
}

.pack-tier-desc {
  color: var(--gray-600);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.35rem;
  min-height: 54px;
}

.pack-price-block {
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-bottom: 1px solid var(--gray-200);
  padding-bottom: 1.35rem;
}

.price-main-line {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.pack-price-amt {
  font-family: var(--font-head);
  font-size: 3.1rem;
  font-weight: 800;
  color: var(--gray-900);
  line-height: 1;
}

.pack-price-cadence {
  font-size: 0.95rem;
  color: var(--gray-500);
  font-weight: 600;
}

.pack-retainer-badge {
  font-size: 0.75rem;
  color: var(--teal-600);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}

.pack-retainer-badge i {
  color: var(--teal-500);
  font-size: 0.8rem;
}

.pack-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
}

.pack-feature-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--gray-700);
  line-height: 1.4;
}

.feat-check-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(48, 136, 130, 0.12);
  color: var(--teal-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.pack-feature-row strong {
  color: var(--gray-900);
}

.pack-cta-btn {
  width: 100%;
  margin-top: auto;
}

/* High-Contrast Navy CTA Button */
.btn-navy {
  background: var(--navy-900);
  color: #ffffff !important;
  border: 1.5px solid var(--navy-800);
  padding: 0.9rem 1.75rem;
  font-family: var(--font-head);
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: var(--radius-pill);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
  transition: all var(--trans-normal);
  cursor: pointer;
  width: 100%;
  text-decoration: none;
}

.btn-navy:hover {
  background: var(--navy-800);
  border-color: var(--teal-500);
  color: #ffffff !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.25);
}

/* Care Plans */
.care-plans-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.glass-panel {
  background: var(--navy-900);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  color: #fff;
  box-shadow: var(--shadow-lg);
}

.glass-panel .pack-tier-title {
  color: #fff;
}

.glass-panel .pack-price-amt {
  color: #fff;
}'''

# Update index.html and v2/index.html
for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace('style.css?v=3.9.0', 'style.css?v=3.9.1')

    # Replace 3 Core Packages grid
    start_tag = '<!-- 3 Core Packages -->'
    end_tag = '<!-- Monthly Care & Growth Plans -->'
    start_pos = html.find(start_tag)
    end_pos = html.find(end_tag)

    if start_pos != -1 and end_pos != -1:
        html = html[:start_pos] + NEW_PRICING_CARDS_HTML + '\n\n      ' + html[end_pos:]

    # Clean up Care plans leftover cyan styling
    html = html.replace('color:var(--cyan-500);', 'color:var(--teal-400);')
    html = html.replace('border-color: rgba(0,242,254,0.4);', 'border-color: rgba(48,136,130,0.4);')
    html = html.replace('color:var(--cyan-500);', 'color:var(--teal-400);')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated HTML in {path}")

# Update style.css
with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace pricing CSS block
start_css_marker = '/* --------------------------------------------------------------------------\n   11. Packages & Pricing'
end_css_marker = '.glass-panel .pack-price-amt {'
start_c = css.find(start_css_marker)
end_c = css.find(end_css_marker)

if start_c != -1 and end_c != -1:
    after_end = css.find('}', end_c) + 1
    css = css[:start_c] + NEW_PRICING_CSS + css[after_end:]

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Updated CSS and synced to v2 successfully.")
