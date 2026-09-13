import os
import shutil

NEW_CARE_PLANS_HTML = '''      <!-- Monthly Care & Growth Plans -->
      <div class="section-header text-center" style="margin-top: 5rem; margin-bottom: 1.5rem;">
        <span class="badge">Hands-Off Monthly Growth</span>
        <h3 class="section-title" style="font-size:2rem;">Ongoing Care & Lead Tracking Plans</h3>
        <p class="section-subtitle">Keep your site secure, blazing fast, and actively bringing in local jobs month after month.</p>
      </div>

      <!-- Monthly / Annual Billing Toggle Switch -->
      <div class="care-billing-toggle-container">
        <span class="care-toggle-label active" id="billingMonthlyLabel">Pay Monthly</span>
        <label class="care-toggle-switch" for="careBillingSwitch">
          <input type="checkbox" id="careBillingSwitch" aria-label="Toggle Annual or Monthly Billing">
          <span class="care-toggle-slider"></span>
        </label>
        <span class="care-toggle-label" id="billingAnnualLabel">
          Pay Yearly
          <span class="care-discount-tag">Save 2 Months Free</span>
        </span>
      </div>

      <div class="care-plans-row">
        <!-- Basic Care -->
        <div class="glass-panel care-card" id="careCardBasic" style="padding: 2.25rem 2rem;">
          <div class="pack-tier-title">Basic Care & Cloud Hosting</div>
          <div class="pack-price-block">
            <div class="care-price-line">
              <span class="pack-price-amt" id="basicCareAmt">$49</span>
              <span class="pack-price-cadence" id="basicCareCadence">/month</span>
            </div>
            <div class="care-sub-note" id="basicCareNote">Billed monthly &bull; Cancel anytime</div>
          </div>
          <ul class="pack-features-list" style="margin-bottom: 1.5rem;">
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>High-Speed Cloud Hosting & SSL Certificate</li>
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>Automated Daily Off-Site Backups</li>
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>Up to 30 Min of Content & Photo Edits / Mo</li>
          </ul>
          <a href="#contact" class="btn btn-navy pack-cta-btn" id="basicCareBtn" data-plan="Basic Care & Cloud Hosting ($49/mo)" style="width:100%;">Select $49/mo Care</a>
        </div>

        <!-- Lead Tracker & Growth (Recommended) -->
        <div class="glass-panel care-card featured" id="careCardTracker" style="padding: 2.25rem 2rem; border-color: rgba(48,136,130,0.5); background: rgba(16,24,44,0.95); position: relative;">
          <div class="badge" style="margin-bottom: 0.75rem;">Top Contractor Choice</div>
          <div class="pack-tier-title" style="color:var(--teal-400);">Lead Tracker & Growth Plan</div>
          <div class="pack-price-block">
            <div class="care-price-line">
              <span class="pack-price-amt" id="trackerCareAmt">$99</span>
              <span class="pack-price-cadence" id="trackerCareCadence">/month</span>
            </div>
            <div class="care-sub-note" id="trackerCareNote">Billed monthly &bull; Cancel anytime</div>
          </div>
          <ul class="pack-features-list" style="margin-bottom: 1.5rem;">
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span><strong>Everything in Basic Care & Cloud Hosting</strong></li>
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span><strong>Instant SMS Lead Alerts</strong> to your cell phone</li>
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span><strong>1-Page Monthly Performance Digest</strong> on the 1st</li>
            <li class="pack-feature-row"><span class="feat-check-circle"><i class="ph-bold ph-check"></i></span>Same-Day Priority Support & Content Updates</li>
          </ul>
          <a href="#contact" class="btn btn-primary pack-cta-btn" id="trackerCareBtn" data-plan="Lead Tracker & Growth Plan ($99/mo)" style="width:100%;">Enroll in $99/mo Lead Tracker</a>
        </div>
      </div>'''

NEW_REQUESTED_PLAN_SELECT = '''            <div class="form-group">
              <label class="form-label" for="requestedPlan">Selected Package / Service</label>
              <select class="form-select" id="requestedPlan" name="chosenPackage">
                <option value="Website Rescue Package ($299)">Website Rescue Package ($299 flat rate)</option>
                <option value="Brand New Website Build ($499)">Brand New Website Build ($499 flat rate)</option>
                <option value="Custom Site Overhaul ($599)">Custom Site Overhaul ($599 flat rate)</option>
                <optgroup label="Annual Care Plans (Save 2 Months Free)">
                  <option value="Lead Tracker & Growth Plan ($990/year - 2 Months Free)">Lead Tracker & Growth Plan ($990/year — Save $198)</option>
                  <option value="Basic Care & Cloud Hosting ($490/year - 2 Months Free)">Basic Care & Cloud Hosting ($490/year — Save $98)</option>
                </optgroup>
                <optgroup label="Monthly Care Plans">
                  <option value="Lead Tracker & Growth Plan ($99/mo)">Lead Tracker & Growth Plan ($99/mo)</option>
                  <option value="Basic Care & Cloud Hosting ($49/mo)">Basic Care & Cloud Hosting ($49/mo)</option>
                </optgroup>
                <option value="Free Website Diagnostic Consultation">Free Website Diagnostic Consultation</option>
              </select>
            </div>'''

NEW_CARE_CSS = '''/* --------------------------------------------------------------------------
   Care Plans Annual / Monthly Toggle Switch
   -------------------------------------------------------------------------- */
.care-billing-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.15rem;
  margin: 1.5rem auto 2.5rem;
  background: var(--navy-900);
  padding: 0.65rem 1.6rem;
  border-radius: var(--radius-pill);
  border: 1.5px solid rgba(251, 245, 232, 0.15);
  width: fit-content;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.care-toggle-label {
  font-family: var(--font-head);
  font-size: 0.92rem;
  font-weight: 700;
  color: #94a3b8;
  cursor: pointer;
  transition: color var(--trans-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  user-select: none;
}

.care-toggle-label.active {
  color: var(--cream-logo);
}

.care-discount-tag {
  background: linear-gradient(135deg, var(--orange-500) 0%, var(--orange-400) 100%);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 12px rgba(222, 87, 60, 0.4);
}

.care-toggle-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  cursor: pointer;
}

.care-toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.care-toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--navy-700);
  transition: .3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.care-toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: #ffffff;
  transition: .3s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.care-toggle-switch input:checked + .care-toggle-slider {
  background-color: var(--teal-500);
}

.care-toggle-switch input:checked + .care-toggle-slider:before {
  transform: translateX(24px);
}

.care-price-line {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.care-sub-note {
  font-size: 0.82rem;
  color: #94a3b8;
  margin-top: 0.35rem;
  font-weight: 500;
}'''

# 1. Update index.html and v2/index.html
for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace Care plans section
    start_tag = '<!-- Monthly Care & Growth Plans -->'
    end_tag = '<!-- Interactive Price Estimator Console -->'
    s_idx = html.find(start_tag)
    e_idx = html.find(end_tag)

    if s_idx != -1 and e_idx != -1:
        html = html[:s_idx] + NEW_CARE_PLANS_HTML + '\n\n      ' + html[e_idx:]

    # Replace requestedPlan select
    select_start = '<div class="form-group">\n              <label class="form-label" for="requestedPlan">Selected Package / Service</label>'
    select_end = '</select>\n            </div>'
    s_sel = html.find(select_start)
    if s_sel != -1:
        e_sel = html.find(select_end, s_sel) + len(select_end)
        html = html[:s_sel] + NEW_REQUESTED_PLAN_SELECT + html[e_sel:]

    # Bump cache buster
    html = html.replace('style.css?v=3.9.2', 'style.css?v=3.9.3')
    html = html.replace('app.js?v=3.9.1', 'app.js?v=3.9.2')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {path}")

# 2. Update style.css and v2/style.css
with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.care-billing-toggle-container' not in css:
    marker = '/* Care Plans */'
    c_idx = css.find(marker)
    if c_idx != -1:
        css = css[:c_idx] + NEW_CARE_CSS + '\n\n' + css[c_idx:]

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Updated CSS and synced to v2")

# 3. Update app.js and v2/app.js to add toggle handler and smooth select pulse
TOGGLE_JS = '''
  // ========================================================================
  // 8. Care Plans Monthly vs. Annual Billing Toggle
  // ========================================================================
  const careBillingSwitch = document.getElementById('careBillingSwitch');
  const billingMonthlyLabel = document.getElementById('billingMonthlyLabel');
  const billingAnnualLabel = document.getElementById('billingAnnualLabel');

  const basicCareAmt = document.getElementById('basicCareAmt');
  const basicCareCadence = document.getElementById('basicCareCadence');
  const basicCareNote = document.getElementById('basicCareNote');
  const basicCareBtn = document.getElementById('basicCareBtn');

  const trackerCareAmt = document.getElementById('trackerCareAmt');
  const trackerCareCadence = document.getElementById('trackerCareCadence');
  const trackerCareNote = document.getElementById('trackerCareNote');
  const trackerCareBtn = document.getElementById('trackerCareBtn');

  function updateCareBilling(isAnnual) {
    if (isAnnual) {
      if (billingMonthlyLabel) billingMonthlyLabel.classList.remove('active');
      if (billingAnnualLabel) billingAnnualLabel.classList.add('active');

      if (basicCareAmt) basicCareAmt.textContent = '$490';
      if (basicCareCadence) basicCareCadence.textContent = '/year';
      if (basicCareNote) basicCareNote.innerHTML = '<strong style="color:var(--teal-400);">Save $98/year</strong> &bull; 2 Months Free Included';
      if (basicCareBtn) {
        basicCareBtn.textContent = 'Select $490/yr Annual Care';
        basicCareBtn.setAttribute('data-plan', 'Basic Care & Cloud Hosting ($490/year - 2 Months Free)');
      }

      if (trackerCareAmt) trackerCareAmt.textContent = '$990';
      if (trackerCareCadence) trackerCareCadence.textContent = '/year';
      if (trackerCareNote) trackerCareNote.innerHTML = '<strong style="color:var(--teal-400);">Save $198/year</strong> &bull; 2 Months Free Included';
      if (trackerCareBtn) {
        trackerCareBtn.textContent = 'Enroll in $990/yr Annual Lead Tracker';
        trackerCareBtn.setAttribute('data-plan', 'Lead Tracker & Growth Plan ($990/year - 2 Months Free)');
      }
    } else {
      if (billingMonthlyLabel) billingMonthlyLabel.classList.add('active');
      if (billingAnnualLabel) billingAnnualLabel.classList.remove('active');

      if (basicCareAmt) basicCareAmt.textContent = '$49';
      if (basicCareCadence) basicCareCadence.textContent = '/month';
      if (basicCareNote) basicCareNote.textContent = 'Billed monthly • Cancel anytime';
      if (basicCareBtn) {
        basicCareBtn.textContent = 'Select $49/mo Care';
        basicCareBtn.setAttribute('data-plan', 'Basic Care & Cloud Hosting ($49/mo)');
      }

      if (trackerCareAmt) trackerCareAmt.textContent = '$99';
      if (trackerCareCadence) trackerCareCadence.textContent = '/month';
      if (trackerCareNote) trackerCareNote.textContent = 'Billed monthly • Cancel anytime';
      if (trackerCareBtn) {
        trackerCareBtn.textContent = 'Enroll in $99/mo Lead Tracker';
        trackerCareBtn.setAttribute('data-plan', 'Lead Tracker & Growth Plan ($99/mo)');
      }
    }
  }

  if (careBillingSwitch) {
    careBillingSwitch.addEventListener('change', (e) => {
      updateCareBilling(e.target.checked);
    });
  }

  if (billingMonthlyLabel) {
    billingMonthlyLabel.addEventListener('click', () => {
      if (careBillingSwitch) {
        careBillingSwitch.checked = false;
        updateCareBilling(false);
      }
    });
  }

  if (billingAnnualLabel) {
    billingAnnualLabel.addEventListener('click', () => {
      if (careBillingSwitch) {
        careBillingSwitch.checked = true;
        updateCareBilling(true);
      }
    });
  }
'''

for js_path in [r'c:\Users\syclo\retrofit-web\app.js', r'c:\Users\syclo\retrofit-web\v2\app.js']:
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Enhance packCtaBtns click handler to scroll and pulse select input
    old_pack_handler = '''      if (requestedPlanSelect && plan) {
        requestedPlanSelect.value = plan;
      }'''

    new_pack_handler = '''      if (requestedPlanSelect && plan) {
        requestedPlanSelect.value = plan;
        requestedPlanSelect.style.borderColor = 'var(--orange-500)';
        requestedPlanSelect.style.boxShadow = '0 0 16px rgba(222, 87, 60, 0.45)';
        setTimeout(() => {
          requestedPlanSelect.style.borderColor = '';
          requestedPlanSelect.style.boxShadow = '';
        }, 2200);
      }'''

    if old_pack_handler in js:
        js = js.replace(old_pack_handler, new_pack_handler)

    if '8. Care Plans Monthly vs. Annual Billing Toggle' not in js:
        idx = js.rfind('});')
        if idx != -1:
            js = js[:idx] + TOGGLE_JS + '\n});\n'

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"Updated JS in {js_path}")
