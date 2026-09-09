import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Check, Save, Download, Copy, Share2, 
  Building2, Key, Wrench, Palette, Star, ArrowRight, ArrowLeft,
  FileCheck, ShieldCheck, HelpCircle, ExternalLink
} from 'lucide-react';

export default function ClientIntake({ 
  activeClient,
  onSaveToDatabase,
  darkMode 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedKey, setCopiedKey] = useState('');
  const [savedStatus, setSavedStatus] = useState('');

  // Intake Form State
  const [formData, setFormData] = useState({
    // Step 1: Business Identity
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    serviceArea: 'Twin Cities Metro Area, MN',
    businessHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Emergency 24/7',
    licenseNumber: 'Licensed, Bonded & Insured',

    // Step 2: Domain & DNS Access
    domainName: '',
    registrar: 'godaddy', // godaddy, namecheap, squarespace, networksolutions, other
    registrarEmail: '',
    registrarPassword: '',
    hasDelegateAccess: false,
    currentHost: 'WordPress / Shared',

    // Step 3: Core Services
    servicesList: '1. Emergency Repairs\n2. Routine Maintenance & Inspection\n3. New Equipment Installation\n4. Commercial & Residential Service',
    specialOffer: '10% Off First Service for New Customers',
    financingAvailable: false,

    // Step 4: Brand & Aesthetics
    logoUrl: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0f172a',
    brandVibe: 'Modern & Bold', // Modern & Bold, Clean & Corporate, Friendly & Local, Rugged Trades
    inspirationSites: 'https://flowsealplumbing.com\nhttps://blustinlaw.com',

    // Step 5: Social Proof & Media
    gbpLink: '',
    facebookLink: '',
    topReview1: '"Showed up on time, diagnosed the issue in 10 minutes, and charge was totally fair. Highly recommend!" — Dave K.',
    topReview2: '"Best contractor experience we have had in years. Professional and clean." — Sarah M.',
    photoLinks: 'https://drive.google.com/drive/folders/client-assets'
  });

  useEffect(() => {
    if (activeClient) {
      setFormData(prev => ({
        ...prev,
        businessName: activeClient.businessName || prev.businessName,
        domainName: activeClient.url || prev.domainName,
        phone: activeClient.phone || prev.phone,
        email: activeClient.email || prev.email,
        address: activeClient.address || prev.address
      }));
    }
  }, [activeClient]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  const handleSaveDossier = () => {
    if (onSaveToDatabase) {
      onSaveToDatabase({
        businessName: formData.businessName,
        url: formData.domainName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        clientNotes: `ONBOARDING INTAKE DOSSIER:\nContact: ${formData.contactPerson}\nRegistrar: ${formData.registrar} (${formData.registrarEmail})\nServices: ${formData.servicesList}\nVibe: ${formData.brandVibe}\nGBP: ${formData.gbpLink}`
      });
      setSavedStatus('Saved to Client Database!');
      setTimeout(() => setSavedStatus(''), 2500);
    }
  };

  // Generate 5-Hour Rescue Sprint Dossier
  const generateDossierMarkdown = () => {
    return `# WEBSITE RESCUE SPRINT DOSSIER
**Client**: ${formData.businessName}
**Sprint Date**: ${new Date().toLocaleDateString()}
**Guaranteed Turnaround**: 48-72 Hours ($299 Rescue + $49/mo Care)

---

## 1. BUSINESS NAP & IDENTITY
- **Company**: ${formData.businessName}
- **Contact Person**: ${formData.contactPerson || 'Owner'}
- **Direct Phone**: ${formData.phone}
- **Public Email**: ${formData.email}
- **Service Address**: ${formData.address}
- **Service Territory**: ${formData.serviceArea}
- **Operating Hours**: ${formData.businessHours}
- **Credentials**: ${formData.licenseNumber}

---

## 2. DOMAIN & INFRASTRUCTURE PIPELINE
- **Target Domain**: ${formData.domainName}
- **Registrar Provider**: ${formData.registrar.toUpperCase()}
- **Account Login**: ${formData.registrarEmail || '[Delegated access]'}
- **Current Hosting**: ${formData.currentHost}
- **Deployment Destination**: Cloudflare Pages / Netlify (RetroFit CDN)

---

## 3. CORE SERVICES TO FEATURE
${formData.servicesList}

**Special Introductory Offer**: ${formData.specialOffer || 'None'}

---

## 4. BRAND SPECIFICATIONS
- **Brand Vibe**: ${formData.brandVibe}
- **Primary Color**: ${formData.primaryColor}
- **Secondary Color**: ${formData.secondaryColor}
- **Logo Asset**: ${formData.logoUrl || 'Extract from old site'}
- **Inspiration References**:
${formData.inspirationSites}

---

## 5. REPUTATION & SOCIAL PROOF
- **Google Business Profile**: ${formData.gbpLink || 'None'}
- **Facebook / Social**: ${formData.facebookLink || 'None'}
- **Highlighted Review #1**: ${formData.topReview1}
- **Highlighted Review #2**: ${formData.topReview2}
- **Client Photo Repository**: ${formData.photoLinks}

---

## 5-HOUR SPRINT CHECKLIST
- [ ] Hour 1: Import assets & configure modular modern template
- [ ] Hour 2: Populate hero, services, and trust badge copy
- [ ] Hour 3: Integrate click-to-call mobile header & quote form
- [ ] Hour 4: Run local SEO schema generator & test responsiveness
- [ ] Hour 5: Point DNS A/CNAME records to CDN, setup SSL, enroll in $49/mo care
`;
  };

  // Generate standalone HTML intake form
  const generateStandaloneIntakeHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Rescue Onboarding Form | RetroFit Web Design</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --primary: #2563eb; --dark: #0f172a; --bg: #f8fafc; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { background: var(--bg); color: #334155; padding: 2rem 1rem; }
    .container { max-width: 680px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    h1 { font-size: 1.8rem; color: var(--dark); font-weight: 800; margin-bottom: 0.5rem; }
    p.sub { color: #64748b; font-size: 0.95rem; margin-bottom: 2rem; }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--dark); }
    input, textarea, select { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; }
    input:focus, textarea:focus { outline: none; border-color: var(--primary); }
    .btn { background: var(--primary); color: #fff; border: none; padding: 1rem 2rem; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; width: 100%; margin-top: 1rem; }
    .btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Website Rescue Onboarding</h1>
    <p class="sub">Welcome! Please provide these quick details so we can launch your modernized, high-converting website in 48-72 hours.</p>
    <form onsubmit="event.preventDefault(); alert('Thank you! Your website rescue dossier has been submitted.');">
      <div class="form-group">
        <label>Business Name</label>
        <input type="text" placeholder="e.g. Acme Plumbing Co." required>
      </div>
      <div class="form-group">
        <label>Owner / Contact Name</label>
        <input type="text" placeholder="Your Full Name" required>
      </div>
      <div class="form-group">
        <label>Primary Business Phone</label>
        <input type="tel" placeholder="(555) 000-0000" required>
      </div>
      <div class="form-group">
        <label>Public Business Email</label>
        <input type="email" placeholder="contact@yourbusiness.com" required>
      </div>
      <div class="form-group">
        <label>Website Domain Name</label>
        <input type="text" placeholder="yourbusiness.com" required>
      </div>
      <div class="form-group">
        <label>Domain Registrar (Where did you buy your domain?)</label>
        <select>
          <option>GoDaddy</option>
          <option>Namecheap</option>
          <option>Google Domains / Squarespace</option>
          <option>Network Solutions</option>
          <option>Other / Not Sure</option>
        </select>
      </div>
      <div class="form-group">
        <label>Top 3-5 Services to Highlight</label>
        <textarea rows="4" placeholder="1. Emergency Service&#10;2. Installation&#10;3. Maintenance"></textarea>
      </div>
      <div class="form-group">
        <label>Link to Logo or Photos (Google Drive / Dropbox)</label>
        <input type="url" placeholder="https://drive.google.com/...">
      </div>
      <button type="submit" class="btn">Submit Website Rescue Details</button>
    </form>
  </div>
</body>
</html>`;
  };

  const handleDownloadStandaloneHtml = () => {
    const html = generateStandaloneIntakeHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(formData.businessName || 'client').toLowerCase().replace(/\s+/g, '-')}-intake-form.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-500" />
              Client Intake & Onboarding Portal
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Asynchronous onboarding wizard for new clients. Auto-generates your 5-Hour Rescue Sprint Dossier and standalone client forms.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSaveDossier}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              {savedStatus || 'Save to Client CRM'}
            </button>
            <button
              onClick={handleDownloadStandaloneHtml}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Standalone Client Form (.html)
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800">
          {[
            { step: 1, label: '1. Identity & NAP', icon: Building2 },
            { step: 2, label: '2. Domain & DNS', icon: Key },
            { step: 3, label: '3. Core Services', icon: Wrench },
            { step: 4, label: '4. Brand & Style', icon: Palette },
            { step: 5, label: '5. Reviews & Media', icon: Star }
          ].map(s => {
            const Icon = s.icon;
            const active = currentStep === s.step;
            const completed = currentStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : completed
                    ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-medium'
                    : 'border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-xs truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-500" />
                Step 1: Business Identity & Contact NAP
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Business Legal / Brand Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    placeholder="e.g. Apex Heating & Cooling"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Primary Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => updateField('contactPerson', e.target.value)}
                    placeholder="e.g. John Doe (Owner)"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Primary Phone (Click-To-Call)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(612) 555-0199"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Public Contact Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="service@apexheating.com"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Physical Address (or City/State)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="123 Industrial Blvd, Minneapolis, MN 55413"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Service Territory / Radius</label>
                  <input
                    type="text"
                    value={formData.serviceArea}
                    onChange={(e) => updateField('serviceArea', e.target.value)}
                    placeholder="Minneapolis, St. Paul, and surrounding suburbs"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Operating Hours & Availability</label>
                  <input
                    type="text"
                    value={formData.businessHours}
                    onChange={(e) => updateField('businessHours', e.target.value)}
                    placeholder="Mon - Sat: 7am - 7pm | 24/7 Emergency"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-500" />
                Step 2: Domain Registrar & DNS Delegation
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Domain Name to Modernize</label>
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={(e) => updateField('domainName', e.target.value)}
                    placeholder="apexheating.com"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Domain Registrar</label>
                    <select
                      value={formData.registrar}
                      onChange={(e) => updateField('registrar', e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                    >
                      <option value="godaddy">GoDaddy</option>
                      <option value="namecheap">Namecheap</option>
                      <option value="squarespace">Google Domains / Squarespace</option>
                      <option value="networksolutions">Network Solutions</option>
                      <option value="cloudflare">Cloudflare</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Current Hosting Platform</label>
                    <input
                      type="text"
                      value={formData.currentHost}
                      onChange={(e) => updateField('currentHost', e.target.value)}
                      placeholder="e.g. Old WordPress / HostGator / Bluehost"
                      className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                    >
                    </input>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    Zero-Downtime DNS Delegation Instructions
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Clients do NOT need to give you passwords if they invite you as a delegate (e.g. GoDaddy Delegate Access or Namecheap Share Access to cole@retrofitweb.com).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-500" />
                Step 3: Core Moneymaker Services
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Core Services (1 per line)</label>
                <textarea
                  rows={5}
                  value={formData.servicesList}
                  onChange={(e) => updateField('servicesList', e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Hero Call-To-Action Special Offer</label>
                <input
                  type="text"
                  value={formData.specialOffer}
                  onChange={(e) => updateField('specialOffer', e.target.value)}
                  placeholder="e.g. $49 Off Heating Diagnostic or Free In-Home Estimate"
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-500" />
                Step 4: Brand & Aesthetics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Primary Brand Color</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateField('primaryColor', e.target.value)}
                      className="w-10 h-10 rounded border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => updateField('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Secondary / Background Color</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      className="w-10 h-10 rounded border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Design Vibe / Personality</label>
                <select
                  value={formData.brandVibe}
                  onChange={(e) => updateField('brandVibe', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                >
                  <option>Modern & Bold (High Contrast, Large Headers, Tech-Forward)</option>
                  <option>Clean & High-End (Sleek, Minimalist, Luxury Trade)</option>
                  <option>Friendly & Local (Warm, Community-Focused, Approachable)</option>
                  <option>Rugged Tradesman (Durable, High-Impact, Emergency Focus)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Inspiration / Competitor Websites</label>
                <textarea
                  rows={3}
                  value={formData.inspirationSites}
                  onChange={(e) => updateField('inspirationSites', e.target.value)}
                  placeholder="Paste URLs of sites they like"
                  className="w-full mt-1 p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                />
              </div>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Step 5: Social Proof, Media & Reviews
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Google Business Profile URL</label>
                  <input
                    type="url"
                    value={formData.gbpLink}
                    onChange={(e) => updateField('gbpLink', e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Client Photos Repository (Drive/Dropbox)</label>
                  <input
                    type="url"
                    value={formData.photoLinks}
                    onChange={(e) => updateField('photoLinks', e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Top Customer Review #1</label>
                <textarea
                  rows={2}
                  value={formData.topReview1}
                  onChange={(e) => updateField('topReview1', e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Top Customer Review #2</label>
                <textarea
                  rows={2}
                  value={formData.topReview2}
                  onChange={(e) => updateField('topReview2', e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-sm font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-xs text-slate-400">Step {currentStep} of 5</span>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDossier}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Check className="w-4 h-4" /> Finish & Save Dossier
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Col: Live 5-Hour Sprint Dossier Preview */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                5-Hour Rescue Dossier
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant blueprint for your 48h sprint</p>
            </div>
            <button
              onClick={() => handleCopy(generateDossierMarkdown(), 'dossier')}
              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              title="Copy Dossier Markdown"
            >
              {copiedKey === 'dossier' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto max-h-[500px]">
            <pre className="text-[11px] font-mono leading-relaxed text-slate-700 dark:text-zinc-300 whitespace-pre-wrap bg-slate-50 dark:bg-zinc-950 p-3 rounded-lg border border-slate-200 dark:border-zinc-800">
              {generateDossierMarkdown()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
