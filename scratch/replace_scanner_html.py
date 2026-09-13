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

for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    start_str = '<div class="scanner-box">'
    end_str = '    </div>\n  </section>\n\n  <!-- Comparison Matrix'

    s_idx = html.find(start_str)
    e_idx = html.find(end_str)

    if s_idx != -1 and e_idx != -1:
        html = html[:s_idx] + NEW_SCANNER_HTML + '\n' + html[e_idx:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Successfully replaced scanner-box in {path}")
    else:
        print(f"Failed to find boundaries in {path}: s={s_idx}, e={e_idx}")
