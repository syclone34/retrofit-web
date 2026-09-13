import os
import shutil

# 1. Update index.html and v2/index.html to include id="heroRadarLeadBody"
for path in [r'c:\Users\syclo\retrofit-web\index.html', r'c:\Users\syclo\retrofit-web\v2\index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<div class="radar-lead-body">', '<div class="radar-lead-body" id="heroRadarLeadBody">')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated radar body id in {path}")

# 2. Update style.css to add transition to .radar-lead-body
with open(r'c:\Users\syclo\retrofit-web\style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace(
'''.radar-lead-body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}''',
'''.radar-lead-body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
}'''
)

with open(r'c:\Users\syclo\retrofit-web\style.css', 'w', encoding='utf-8') as f:
    f.write(css)

shutil.copyfile(r'c:\Users\syclo\retrofit-web\style.css', r'c:\Users\syclo\retrofit-web\v2\style.css')
print("Synced style.css to v2")

# 3. Update app.js and v2/app.js to add hero lead rotator
lead_rotator_code = '''
  // ========================================================================
  // 7. Hero Real-Time Lead Dispatch Ticker Rotation
  // ========================================================================
  const heroRadarLeadBody = document.getElementById('heroRadarLeadBody');
  if (heroRadarLeadBody) {
    const heroLeads = [
      {
        name: 'Dave M.',
        loc: 'Plymouth, MN',
        service: 'Furnace Out • Emergency Replacement',
        val: '$5,800 Est.',
        elapsed: '11.4s total elapsed'
      },
      {
        name: 'Brad S.',
        loc: 'Maple Grove, MN',
        service: 'Main Water Line Leak Repair',
        val: '$3,400 Est.',
        elapsed: '8.9s total elapsed'
      },
      {
        name: 'Tyler K.',
        loc: 'Otsego, MN',
        service: 'Full Roof Replacement (Hail Claim)',
        val: '$14,200 Est.',
        elapsed: '13.2s total elapsed'
      },
      {
        name: 'Ryan P.',
        loc: 'Elk River, MN',
        service: 'Panel Upgrade & EV Charger Install',
        val: '$4,100 Est.',
        elapsed: '9.5s total elapsed'
      }
    ];

    let currentHeroLeadIdx = 0;
    setInterval(() => {
      currentHeroLeadIdx = (currentHeroLeadIdx + 1) % heroLeads.length;
      const lead = heroLeads[currentHeroLeadIdx];

      heroRadarLeadBody.style.opacity = '0';
      heroRadarLeadBody.style.transform = 'translateY(4px)';

      setTimeout(() => {
        heroRadarLeadBody.innerHTML = `
          <div class="radar-lead-top">
            <div class="radar-lead-caller">
              <span class="radar-avatar"><i class="ph-bold ph-user"></i></span>
              <div>
                <div class="radar-lead-name">${lead.name} <span class="radar-loc">&bull; ${lead.loc}</span></div>
                <div class="radar-lead-service">${lead.service}</div>
              </div>
            </div>
            <div class="radar-lead-val">${lead.val}</div>
          </div>
          <div class="radar-status-bar">
            <i class="ph-bold ph-check-circle" style="color: #4ade80;"></i>
            <span>Instant SMS routed to contractor phone &bull; <strong>${lead.elapsed}</strong></span>
          </div>
        `;
        heroRadarLeadBody.style.opacity = '1';
        heroRadarLeadBody.style.transform = 'translateY(0)';
      }, 300);
    }, 5500);
  }
});
'''

for path in [r'c:\Users\syclo\retrofit-web\app.js', r'c:\Users\syclo\retrofit-web\v2\app.js']:
    with open(path, 'r', encoding='utf-8') as f:
        js = f.read()
    # Replace the last `});`
    idx = js.rfind('});')
    if idx != -1:
        new_js = js[:idx] + lead_rotator_code
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_js)
        print(f"Added lead rotator to {path}")
