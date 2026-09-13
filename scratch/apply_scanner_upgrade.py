import os
import shutil

NEW_SCANNER_HTML = '''      <div class="scanner-box">
        <!-- Input Form with Icon & Fast Sample Chips -->
        <form class="scanner-input-form" id="scannerForm">
          <div class="scanner-input-wrapper">
            <i class="ph-bold ph-globe-hemisphere-west scanner-input-icon"></i>
            <input type="text" class="scanner-input-field" id="scanUrlInput" placeholder="Enter your contractor domain (e.g. twin-cities-plumbing.com)" required>
          </div>
          <button type="submit" class="btn btn-primary" id="scanSubmitBtn">
            <i class="ph-duotone ph-scan btn-icon"></i>
            <span>Analyze Website</span>
          </button>
        </form>

        <!-- Quick Sample Chips -->
        <div class="scanner-sample-chips">
          <span class="sample-chip-label">Try Example:</span>
          <button type="button" class="sample-chip-btn" data-url="retrofitwebdesign.com">retrofitwebdesign.com (Flagship)</button>
          <button type="button" class="sample-chip-btn" data-url="outdated-hvac-contractor.com">Legacy WordPress HVAC</button>
          <button type="button" class="sample-chip-btn" data-url="diy-builder-roofing.com">DIY Wix Roofing</button>
        </div>

        <!-- Live Terminal Stream with Chrome Window Header -->
        <div class="scanner-terminal" id="scannerTerminal">
          <div class="terminal-chrome">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <span class="terminal-title">GOOGLE LIGHTHOUSE AUDIT ENGINE &bull; LIVE STREAM</span>
            <span class="terminal-live-ping"><span class="badge-pulse"></span> RUNNING</span>
          </div>
          <div class="terminal-body" id="scannerTerminalBody"></div>
        </div>

        <!-- Scanner Scores Display -->
        <div class="scanner-results-container" id="scannerResults">
          <div class="scanner-scores-grid">
            <!-- Performance -->
            <div class="score-card">
              <span class="score-card-badge badge-speed"><i class="ph-bold ph-lightning"></i> Core Vitals</span>
              <div class="score-circle-wrap">
                <svg class="score-svg" viewBox="0 0 36 36">
                  <path class="score-bg-circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="score-progress-circle score-red" id="circlePerf" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="score-number-display score-red" id="textPerf">--</div>
              </div>
              <div class="score-label-title">Performance Speed</div>
              <div class="score-summary-text" id="descPerf">Evaluating server response & asset render blocking.</div>
            </div>

            <!-- Mobile UX -->
            <div class="score-card">
              <span class="score-card-badge badge-mobile"><i class="ph-bold ph-device-mobile"></i> Viewport</span>
              <div class="score-circle-wrap">
                <svg class="score-svg" viewBox="0 0 36 36">
                  <path class="score-bg-circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="score-progress-circle score-red" id="circleMobile" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="score-number-display score-red" id="textMobile">--</div>
              </div>
              <div class="score-label-title">Mobile Usability</div>
              <div class="score-summary-text" id="descMobile">Checking viewport tags, tap targets, and touch scaling.</div>
            </div>

            <!-- Local SEO -->
            <div class="score-card">
              <span class="score-card-badge badge-seo"><i class="ph-bold ph-map-pin"></i> Local SEO</span>
              <div class="score-circle-wrap">
                <svg class="score-svg" viewBox="0 0 36 36">
                  <path class="score-bg-circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="score-progress-circle score-yellow" id="circleSeo" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="score-number-display score-yellow" id="textSeo">--</div>
              </div>
              <div class="score-label-title">Local SEO Schema</div>
              <div class="score-summary-text" id="descSeo">Analyzing meta structure, crawlability, and local headers.</div>
            </div>

            <!-- Best Practices -->
            <div class="score-card">
              <span class="score-card-badge badge-sec"><i class="ph-bold ph-shield-check"></i> Security</span>
              <div class="score-circle-wrap">
                <svg class="score-svg" viewBox="0 0 36 36">
                  <path class="score-bg-circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="score-progress-circle score-yellow" id="circleSec" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="score-number-display score-yellow" id="textSec">--</div>
              </div>
              <div class="score-label-title">Security & Stack</div>
              <div class="score-summary-text" id="descSec">Verifying SSL/TLS certificates and modern code standards.</div>
            </div>
          </div>

          <!-- Recommendation Banner -->
          <div class="scanner-recommendation-box">
            <div class="rec-left-content">
              <div class="rec-badge-pill">
                <i class="ph-fill ph-trophy"></i>
                <span>RetroFit Diagnostic Breakdown</span>
              </div>
              <h4 style="color:#fff; font-size:1.25rem; margin-bottom:6px;">RetroFit Rescue Recommendation</h4>
              <p style="font-size:0.95rem; color:#cbd5e1; line-height: 1.55;" id="recommendationCopy">
                A 48-hour RetroFit code rescue will elevate your performance to <strong style="color:#ffffff;">98%+</strong> and make your site 100% mobile-first.
              </p>
            </div>
            <a href="#pricing" class="btn btn-primary" id="scannerQuoteAction">
              <i class="ph-bold ph-lock-key"></i>
              <span>Lock In $299 Rescue Quote</span>
            </a>
          </div>
        </div>
      </div>'''

NEW_SCANNER_CSS = '''/* --------------------------------------------------------------------------
   9. Speed Diagnostic Scanner (Deep Navy Feature Block)
   -------------------------------------------------------------------------- */
.scanner-section {
  background: var(--navy-900);
  color: var(--cream-logo);
  padding: 6.5rem 0;
  border-top: 3px solid var(--teal-500);
  border-bottom: 3px solid var(--orange-500);
  position: relative;
}

.scanner-section .section-title {
  color: var(--cream-logo);
}

.scanner-section .section-subtitle {
  color: #c2cedf;
}

.scanner-box {
  max-width: 1060px;
  margin: 0 auto;
}

.scanner-input-form {
  display: flex;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.scanner-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.scanner-input-icon {
  position: absolute;
  left: 1.25rem;
  font-size: 1.25rem;
  color: var(--teal-500);
  pointer-events: none;
}

.scanner-input-field {
  width: 100%;
  background: #ffffff;
  color: var(--gray-900);
  border: 2px solid rgba(255, 255, 255, 0.15);
  padding: 1rem 1.25rem 1rem 3.2rem;
  border-radius: var(--radius-pill);
  font-size: 1.02rem;
  font-family: var(--font-body);
  font-weight: 500;
  outline: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition: var(--trans-fast);
}

.scanner-input-field:focus {
  border-color: var(--orange-500);
  box-shadow: 0 6px 20px rgba(222, 87, 60, 0.35);
}

.scanner-sample-chips {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
}

.sample-chip-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sample-chip-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  font-size: 0.78rem;
  font-family: var(--font-mono);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--trans-fast);
}

.sample-chip-btn:hover {
  background: rgba(48, 136, 130, 0.25);
  border-color: var(--teal-400);
  color: #ffffff;
  transform: translateY(-1px);
}

/* Scanner Terminal Window */
.scanner-terminal {
  display: none;
  background: #0d121c;
  border: 1.5px solid rgba(48, 136, 130, 0.35);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2.25rem;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.scanner-terminal.active {
  display: block;
  animation: fadeInTerminal 0.3s ease-out;
}

@keyframes fadeInTerminal {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.terminal-chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(21, 28, 40, 0.95);
  padding: 0.65rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.t-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.t-dot.red { background: #ff5f56; }
.t-dot.yellow { background: #ffbd2e; }
.t-dot.green { background: #27c93f; }

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.06em;
}

.terminal-live-ping {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--teal-400);
}

.terminal-body {
  padding: 1.25rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.84rem;
  line-height: 1.7;
  color: #cbd5e1;
  max-height: 180px;
  overflow-y: auto;
}

.terminal-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.terminal-prompt {
  color: #4ade80;
  font-weight: 800;
  user-select: none;
}

/* Scanner Results Grid */
.scanner-results-container {
  display: none;
}

.scanner-results-container.active {
  display: block;
  animation: fadeInTerminal 0.4s ease-out;
}

.scanner-scores-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.score-card {
  background: linear-gradient(180deg, rgba(26, 35, 50, 0.95) 0%, rgba(16, 22, 32, 0.98) 100%);
  border: 1.5px solid rgba(251, 245, 232, 0.12);
  border-radius: var(--radius-xl);
  padding: 2rem 1.25rem 1.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  transition: transform var(--trans-normal), box-shadow var(--trans-normal), border-color var(--trans-normal);
}

.score-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
  border-color: rgba(251, 245, 232, 0.25);
}

.score-card-badge {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.score-card-badge.badge-speed {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.score-card-badge.badge-mobile {
  background: rgba(48, 136, 130, 0.15);
  color: var(--teal-400);
  border: 1px solid rgba(48, 136, 130, 0.3);
}

.score-card-badge.badge-seo {
  background: rgba(243, 178, 62, 0.15);
  color: var(--gold-400);
  border: 1px solid rgba(243, 178, 62, 0.3);
}

.score-card-badge.badge-sec {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.score-circle-wrap {
  position: relative;
  width: 105px;
  height: 105px;
  margin: 0 auto 1.25rem auto;
}

.score-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-bg-circle {
  fill: none;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 2.8;
}

.score-progress-circle {
  fill: none;
  stroke-width: 3.2;
  stroke-linecap: round;
  transition: stroke-dasharray 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Radiant Authentic Lighthouse Status Colors */
.score-green {
  color: #22c55e !important;
  stroke: #22c55e !important;
  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6));
}

.score-yellow {
  color: #f59e0b !important;
  stroke: #f59e0b !important;
  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6));
}

.score-red {
  color: #ef4444 !important;
  stroke: #ef4444 !important;
  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6));
}

.score-number-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-head);
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.score-label-title {
  font-family: var(--font-head);
  font-size: 1.05rem;
  color: #ffffff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}

.score-summary-text {
  font-size: 0.84rem;
  color: #cbd5e1;
  line-height: 1.5;
}

/* Recommendation Box with High-Contrast Typography */
.scanner-recommendation-box {
  background: linear-gradient(135deg, rgba(26, 35, 50, 0.95) 0%, rgba(16, 22, 32, 0.98) 100%);
  border: 1.5px solid rgba(48, 136, 130, 0.45);
  border-radius: var(--radius-xl);
  padding: 1.75rem 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
}

.rec-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gold-400);
  background: rgba(243, 178, 62, 0.14);
  border: 1px solid rgba(243, 178, 62, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-pill);
  margin-bottom: 0.75rem;
}

.scanner-recommendation-box h4 {
  color: #ffffff !important;
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.scanner-recommendation-box p {
  color: #cbd5e1 !important;
  font-size: 0.94rem;
  line-height: 1.55;
  margin: 0;
}

.scanner-recommendation-box strong {
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .scanner-recommendation-box {
    flex-direction: column;
    text-align: center;
  }
}'''

# 1. Update index.html and v2/index.html
for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    start_tag = '<div class="scanner-box">'
    end_tag = '</section>\n\n  <!-- Comparison Matrix'
    s_idx = html.find(start_tag)
    e_idx = html.find(end_tag)

    if s_idx != -1 and e_idx != -1:
        # We replace up to the closing </div> of scanner-box
        box_end = html.rfind('</div>\n    </div>\n  </section>', s_idx, e_idx)
        if box_end != -1:
            html = html[:s_idx] + NEW_SCANNER_HTML + '\n    ' + html[box_end + 6:]
        else:
            print(f"Warning: box_end not found in {path}")

    # Bump cache buster
    html = html.replace('style.css?v=3.9.4', 'style.css?v=3.9.5')
    html = html.replace('app.js?v=3.9.2', 'app.js?v=3.9.3')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated {path}")

# 2. Update style.css and v2/style.css
with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

start_marker = '/* --------------------------------------------------------------------------\n   9. Speed Diagnostic Scanner'
end_marker = '/* --------------------------------------------------------------------------\n   10. Why RetroFit Comparison Bento Grid'

s_css = css.find(start_marker)
e_css = css.find(end_marker)

if s_css != -1 and e_css != -1:
    css = css[:s_css] + NEW_SCANNER_CSS + '\n\n' + css[e_css:]

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Updated CSS and synced to v2")

# 3. Update app.js and v2/app.js to support terminal-body and sample chips
for js_path in [r'c:\Users\syclo\retrofit-web\app.js', r'c:\Users\syclo\retrofit-web\v2\app.js']:
    with open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Update appendTerminal
    old_append = '''  function appendTerminal(msg) {
    if (!scannerTerminal) return;
    const line = document.createElement('div');
    line.textContent = `> ${msg}`;
    scannerTerminal.appendChild(line);
    scannerTerminal.scrollTop = scannerTerminal.scrollHeight;
  }'''

    new_append = '''  function appendTerminal(msg) {
    const terminalBody = document.getElementById('scannerTerminalBody') || scannerTerminal;
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">&gt;</span> <span>${msg}</span>`;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }'''

    if old_append in js:
        js = js.replace(old_append, new_append)

    # Clear terminal body on submit
    old_clear = "scannerTerminal.innerHTML = '';"
    new_clear = '''const terminalBody = document.getElementById('scannerTerminalBody');
      if (terminalBody) terminalBody.innerHTML = ''; else scannerTerminal.innerHTML = '';'''
    if old_clear in js:
        js = js.replace(old_clear, new_clear)

    # Update recommendationCopy styling in JS
    old_rec = '''          if (recommendationCopy) {
            recommendationCopy.innerHTML = `<strong>🏆 Flagship RetroFit Standard:</strong> This site runs on RetroFit's modern high-speed architecture (<strong>99%</strong> health). This is the exact benchmark we deliver to your business!`;
          }'''

    new_rec = '''          if (recommendationCopy) {
            recommendationCopy.innerHTML = `<strong style="color:#ffffff;">🏆 Flagship RetroFit Standard:</strong> This site runs on RetroFit's modern high-speed architecture (<strong style="color:#4ade80;">99%</strong> health). This is the exact benchmark we deliver to your business!`;
          }'''

    if old_rec in js:
        js = js.replace(old_rec, new_rec)

    # Add sample chips handler
    sample_chips_code = '''
  // Scanner Sample Chips Auto-Filler
  const sampleChipBtns = document.querySelectorAll('.sample-chip-btn');
  sampleChipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (scanUrlInput && url) {
        scanUrlInput.value = url;
        if (scannerForm) {
          scannerForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    });
  });
'''
    if 'Scanner Sample Chips Auto-Filler' not in js:
        idx = js.find('// Scanner Quote Button Route')
        if idx != -1:
            js = js[:idx] + sample_chips_code + '\n  ' + js[idx:]

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"Updated JS in {js_path}")
