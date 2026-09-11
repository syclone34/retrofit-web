# RetroFit Web Design: Service Installation & Deployment Playbook
**The Complete Field Guide for Rapid Client Launches & Rescues**

- **Author:** Cole (RetroFit Web Design)
- **Operating Model:** Solo Side-Gig (5–10 Hours/Week)
- **Tech Stack Operating Cost:** $0.00 / month (Cloudflare Pages, Netlify, Web3Forms, Google Sheets, Looker Studio, UptimeRobot)
- **Target Revenue Model:** Upfront Builds ($299–$599) + Hands-Free Recurring MRR ($49–$99/mo)

---

## Table of Contents
1. [Operating Principles & Time Protection](#1-operating-principles--time-protection)
2. [Master Service Matrix & Time Estimates](#2-master-service-matrix--time-estimates)
3. [Client Intake Fast-Track (Copy-Paste Email/SMS)](#3-client-intake-fast-track)
4. [Playbook 1: Website Rescue Package ($299)](#playbook-1-website-rescue-package-299)
5. [Playbook 2: Brand New 5-Page Website Build ($499)](#playbook-2-brand-new-5-page-website-build-499)
6. [Playbook 3: Custom Site Overhaul & Suburb Silos ($599)](#playbook-3-custom-site-overhaul--suburb-silos-599)
7. [Playbook 4: Basic Care & Cloud Hosting Plan ($49/mo)](#playbook-4-basic-care--cloud-hosting-plan-49mo)
8. [Playbook 5: Lead Tracker & Growth Plan ($99/mo) ★ BEST SELLER](#playbook-5-lead-tracker--growth-plan-99mo--best-seller)
9. [Playbook 6: Google Business Profile & Local SEO Booster (+$149)](#playbook-6-google-business-profile--local-seo-booster-149)
10. [Playbook 7: Online Booking & Interactive Estimator Widget (+$150)](#playbook-7-online-booking--interactive-estimator-widget-150)
11. [Playbook 8: Logo Modernization & Brand Tokens (+$99)](#playbook-8-logo-modernization--brand-tokens-99)
12. [Post-Launch Hand-Off & Video Walkthrough SOP](#12-post-launch-hand-off--video-walkthrough-sop)
13. [Directory Architecture & Starter Kit Reference](#13-directory-architecture--starter-kit-reference)

---

## 1. Operating Principles & Time Protection

Because RetroFit is run as a focused, high-margin solo side-gig, every service is engineered with strict operational boundaries:
1. **Never Start From a Blank Canvas:** Every build branches from the standardized RetroFit modular starter kit (`/starter-kit`).
2. **Zero Live Intake Meetings:** Do not do 60-minute Zoom strategy calls. Collect copy, credentials, and photos via the standardized 5-question intake text/email.
3. **Pure Vanilla Web Architecture:** No heavy WordPress databases to patch, no complex server management, and no breaking plugin updates. Static HTML5, modern CSS variables, and lightweight JavaScript host for free with infinite scale and 100/100 PageSpeed.
4. **Scope Isolation:** Fix what drives phone calls and quote requests: headline, mobile speed, trust badges, tap-to-call, and forms. Politely decline 15-page bespoke portal requests.
5. **Autopilot Recurring Revenue:** Services like the $99/mo Lead Tracker run completely automated once installed—no manual monthly data crunching.

---

## 2. Master Service Matrix & Time Estimates

| Service | Client Price | Time Budget | Monthly Upkeep | Core Value Delivered to Client |
| :--- | :--- | :--- | :--- | :--- |
| **1. Website Rescue** | **$299** one-time | 2.0 – 2.5 Hours | 0 hrs | Modern layout refresh, sub-second speed, 100% mobile, tap-to-call. |
| **2. Brand New Build** | **$499** one-time | 3.5 – 4.0 Hours | 0 hrs | Turnkey 5-page custom build, high-converting copy, DNS & SSL. |
| **3. Custom Overhaul** | **$599** one-time | 4.5 – 5.0 Hours | 0 hrs | Up to 10 pages, service silo pages, target suburb landing pages. |
| **4. Basic Care Plan** | **$49 / month** | 15 Mins (Setup) | <15 min/mo | Cloudflare/Netlify CDN, SSL, daily Git backups, uptime alerts. |
| **5. Lead Tracker & Growth** | **$99 / month** | 15 Mins (Setup) | 0 min/mo *(Auto)* | Care Plan + `retrofit-tracker.js`, instant phone SMS leads, monthly Looker PDF. |
| **6. Google Business SEO** | **+$149** add-on | 45 Mins | 0 hrs | GBP profile audit, category match, review shortcut, LocalBusiness JSON-LD. |
| **7. Booking / Estimator** | **+$150** add-on | 30–45 Mins | 0 hrs | Dynamic interactive quote estimator or Calendly/Jobber booking embed. |
| **8. Logo & Brand Kit** | **+$99** add-on | 30 Mins | 0 hrs | Scalable vector SVG recreation, complete favicon suite, CSS color tokens. |

---

## 3. Client Intake Fast-Track

Send this exact template via text or email immediately upon receiving the initial deposit. Do not schedule a phone call until these 5 items are received:

```text
Hey [Client Name], Cole here from RetroFit Web Design! Excited to get started on your site.

To get your new site live within [48 hours / 3-5 days], shoot me a quick reply with these 5 quick items:

1. Current website link (and domain login if you have it — GoDaddy, Namecheap, etc.)
2. Best phone number and email where you want customer quote notifications sent
3. High-res logo file (or just snap a clear photo of your work truck / business card)
4. Your top 3 to 5 services you want more calls for (e.g. Furnace Repair, AC Replacement)
5. Service areas you cover (e.g. Maple Grove, Plymouth, Minnetonka & NW Suburbs)

I'll take it from there and have a live preview link ready for you to test on your phone!
```

---

## Playbook 1: Website Rescue Package ($299)
**Target Delivery: 48–72 Hours | Total Hands-On Time: 2 to 2.5 Hours**

### Service Scope & Boundaries
- **In Scope:** Full visual refresh, mobile navigation fix, image WebP conversion, tap-to-call button, contact form hooked to email/SMS, SSL setup, PageSpeed score 90+.
- **Out of Scope:** Copywriting 10 new pages, ecommerce shopping carts, custom backend databases.

### Step-by-Step Assembly Protocol
```
[0:00 - 0:25] Asset Scraping: Run RetroFit Analyzer to rip existing text, photos, colors, and logo.
[0:25 - 1:15] Structural Migration: Duplicate /starter-kit, populate client copy and hero CTA.
[1:15 - 1:45] Mobile Polish & Image Optimization: Convert images to WebP, test sticky mobile call bar.
[1:45 - 2:10] Forms & Dialers: Hook form to Web3Forms/Formspree; verify tel: links trigger phone dialer.
[2:10 - 2:30] Deploy Staging & Send Preview: Push to Cloudflare Pages/Netlify, send preview link to client.
```

### Modular Code Installation: Sticky Mobile Call Bar
Every rescue site **must** have a sticky bottom bar on smartphones. Add before `</body>`:

```html
<!-- RETROFIT MOBILE STICKY CALL BAR -->
<div class="retrofit-sticky-call-bar" id="mobileCallBar">
  <a href="tel:+16125550199" class="call-bar-link" id="stickyCallBtn">
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
    </svg>
    <span>Call Now: (612) 555-0199</span>
  </a>
</div>
```

Accompanying CSS in `style.css`:
```css
.retrofit-sticky-call-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-primary, #00f2fe);
  padding: 12px 16px;
  z-index: 9999;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.25);
  text-align: center;
}
.call-bar-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #0b0f19;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
}
@media (max-width: 768px) {
  .retrofit-sticky-call-bar { display: block; }
  body { padding-bottom: 60px; } /* Prevent footer cut-off */
}
```

### Verification Checklist Before Sending Preview
- [ ] Mobile PageSpeed score is 90+ (test on PageSpeed Insights).
- [ ] Tap-to-call link triggers phone dialer on real smartphone.
- [ ] Form submission successfully arrives in client's inbox.
- [ ] No placeholder "Lorem Ipsum" or broken image tags exist.

---

## Playbook 2: Brand New 5-Page Website Build ($499)
**Target Delivery: 3–5 Days | Total Hands-On Time: 3.5 to 4.0 Hours**

### Standard 5-Page Directory Layout
```
client-new-build/
├── index.html         (High-converting homepage & lead funnel)
├── services.html      (Categorized list of core services)
├── about.html         (Company backstory, owner bio, license/insurance proof)
├── contact.html       (Google map embed, service radius, quote form)
├── privacy.html       (Standardized privacy policy)
├── css/
│   └── style.css      (RetroFit unified design system)
├── js/
│   ├── app.js         (Mobile nav toggle, smooth scroll)
│   └── tracker.js     (RetroFit Lead Tracking snippet)
└── assets/            (Compressed WebP images, logo, icons)
```

### Fast-Track Branding Token Setup (15 Mins)
Set the client's colors at the top of `css/style.css`. All components will inherit these automatically:
```css
:root {
  --color-primary: #00f2fe;    /* Brand Accent 1 */
  --color-secondary: #0070f3;  /* Brand Accent 2 */
  --color-dark: #0b0f19;       /* Deep Slate Background */
  --color-surface: #141c2e;    /* Card Surface */
  --color-text: #f8fafc;       /* Light Heading Text */
  --color-muted: #94a3b8;      /* Body Copy */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### High-Converting 4-Step Home Page Formula
1. **Hero with Clear Promise & Dual CTAs:** "Trusted [Service] in [City] | Fast Same-Day Service" $\to$ [Call Now] & [Get Free Quote].
2. **Trust Strip:** Licensed & Insured, 5-Star Rated, Upfront Pricing, Locally Owned.
3. **Service Cards Grid:** 4–6 service cards with clear icon, description, and "Learn More" links.
4. **Lead Capture & Map Section:** Simple 4-field quote form with embedded Google Map showing service territory.

---

## Playbook 3: Custom Site Overhaul & Suburb Silos ($599)
**Target Delivery: 3–5 Days | Total Hands-On Time: 4.5 to 5.0 Hours**

Designed for contractors and service businesses looking to capture search traffic from neighboring affluent suburbs without paying for Google Ads.

### URL Structure & Silo Architecture
```
/                                 (Main Home / Primary City)
/services/heating-repair.html     (Deep service page)
/services/ac-installation.html    (Deep service page)
/locations/maple-grove.html       (Target Suburb 1)
/locations/plymouth.html          (Target Suburb 2)
/locations/minnetonka.html        (Target Suburb 3)
```

### Suburb Silo Landing Page Template (`locations/maple-grove.html`)
```html
<section class="location-hero">
  <div class="container">
    <span class="badge">Serving Hennepin & Wright Counties</span>
    <h1>Top-Rated Heating & Air Conditioning in <span class="text-gradient">Maple Grove, MN</span></h1>
    <p>Locally owned and trusted by Maple Grove homeowners for fast, reliable furnace repairs, AC tune-ups, and emergency service.</p>
    <div class="hero-actions">
      <a href="tel:+16125550199" class="btn btn-primary">📞 Call (612) 555-0199</a>
      <a href="#quote" class="btn btn-secondary">Get Maple Grove Estimate</a>
    </div>
  </div>
</section>
```

---

## Playbook 4: Basic Care & Cloud Hosting Plan ($49/mo)
**Setup Time: 15 Mins | Monthly Upkeep: <15 Mins/Month**

### Zero-Cost Hosting Architecture
Host the client site on **Cloudflare Pages** or **Netlify**:
- **Operating Cost:** $0.00 / month.
- **Benefits:** Global edge CDN, automatic SSL certificate with renewal, 99.99% uptime, zero server patches.

### 4-Step Setup Checklist (15 Mins):
1. **Git Remote Backup (3 Mins):** Push code to private GitHub repository (`github.com/cole/client-{slug}`). Every commit serves as an immutable, timestamped off-site backup.
2. **Cloudflare Pages Deploy (5 Mins):** Connect the GitHub repository to Cloudflare Pages. Output directory: `/` (root).
3. **DNS Configuration (4 Mins):**
   - In client's domain registrar (GoDaddy, Namecheap, etc.):
     - Point `CNAME @` $\to$ `client-project.pages.dev`
     - Point `CNAME www` $\to$ `client-project.pages.dev`
   - Turn on "Always Use HTTPS" and HTTP/3.
4. **Automated Uptime Monitoring ($0) (3 Mins):**
   - Add client URL to free **UptimeRobot** account.
   - Configure alerts to ping your email/phone if the site ever fails to respond for >5 minutes.

---

## Playbook 5: Lead Tracker & Growth Plan ($99/mo) ★ BEST SELLER
**Setup Time: 15 Mins | Monthly Upkeep: 0 Mins (100% Autopilot)**

This service elevates RetroFit from a web designer into a critical revenue partner. It solves the "did my website actually get me jobs?" question without requiring Cole to manually create monthly reports.

### Complete Autopilot Lead Pipeline
```
[Homeowner Phone Tap or Form Submit]
                 │
                 ▼
[retrofit-tracker.js (<2.5KB drop-in script)]
                 │
        ┌────────┴───────────────────────────┐
        ▼                                    ▼
[Web3Forms / Webhook Gateway]        [Google Sheets Master Ledger]
        │                                    │
        ▼ (< 5 Seconds)                      ▼ (Monthly on 1st)
[Instant SMS to Contractor's Phone]   [Google Looker Studio PDF Digest]
"⚡ Lead: John Doe (612-555-0199)"    "September: 28 Calls, 11 Forms"
```

### Installation Steps (15 Mins):

#### Step 1: Drop-In the Tracking Script (2 Mins)
Add right before `</body>` on every page of the client's site:
```html
<script 
  src="https://retrofitwebdesign.com/assets/retrofit-tracker.js" 
  data-client-id="mns-all-seasons" 
  data-endpoint="https://api.web3forms.com/submit">
</script>
```

#### Step 2: Instant SMS Routing to Contractor's Phone (5 Mins)
To notify the business owner within 5 seconds of a lead entering the site:
- In the contact form submission handler (Web3Forms or Formspree), set the notification email to the owner's **Carrier Email-to-SMS Gateway**:
  - **Verizon:** `[10digitnumber]@vtext.com`
  - **AT&T:** `[10digitnumber]@txt.att.net`
  - **T-Mobile:** `[10digitnumber]@tmomail.net`
- When a form is submitted, the carrier sends an SMS directly to their phone screen:
  > *"⚡ RetroFit Lead Alert: Mike Miller requested 'Furnace Tune-up' (612-555-0199). Tap number to call immediately."*

#### Step 3: Google Looker Studio Monthly PDF Delivery ($0) (8 Mins)
1. **The Lead Ledger:** Create a Google Sheet with columns: `Timestamp`, `Event_Type`, `Caller_Name`, `Phone`, `Service`, `Referrer`, `Device`.
2. **Connect to Template:** Link the Sheet to your standardized 1-page Looker Studio dashboard displaying:
   - Total Phone Calls (Clicks on `tel:`)
   - Total Quote Form Submissions
   - % Traffic from Mobile vs. Desktop
   - Estimated Job Value Generated
3. **Set Scheduled Delivery:**
   - Click **Share $\to$ Schedule Delivery**.
   - Frequency: **Monthly on the 1st**.
   - Recipient: Contractor's email.
   - Subject: *"Your Monthly Website Performance Summary - [Business Name]"*.
4. **Result:** Once configured, Google handles the PDF generation and emailing automatically every single month. Cole spends 0 minutes on ongoing reporting.

---

## Playbook 6: Google Business Profile & Local SEO Booster (+$149)
**Setup Time: 45 Mins | Hands-On Execution**

### The 45-Minute GBP Sprint
1. **NAP Consistency Audit (10 Mins):**
   - Ensure the business **Name**, **Address**, and **Phone** are identical character-for-character across their website footer, Google Business Profile, and Facebook page.
2. **Category & Services Alignment (10 Mins):**
   - Verify primary category is exact (e.g. "HVAC Contractor" rather than general "Heating Contractor").
   - Add 10 specific sub-services with brief descriptions in the GBP dashboard.
3. **Direct Review Link Generation (5 Mins):**
   - Generate their short review link (`https://search.google.com/local/writereview?placeid=...`).
   - Add a "Leave a Review" button in the website footer and email signature.
4. **Drop-In JSON-LD LocalBusiness Schema (20 Mins):**
   Paste into `<head>` of `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "MNS All Seasons Comforts",
  "image": "https://www.mnsallseasons.com/assets/logo.webp",
  "telephone": "+1-612-555-0199",
  "url": "https://www.mnsallseasons.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Central Ave",
    "addressLocality": "Maple Grove",
    "addressRegion": "MN",
    "postalCode": "55369",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.0725,
    "longitude": -93.4558
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}
</script>
```

---

## Playbook 7: Online Booking & Interactive Estimator Widget (+$150)
**Setup Time: 30–45 Mins**

Allows prospective customers to see estimated costs live on the website, dramatically increasing lead form conversion rates.

### Drop-In HTML Estimator Component (`estimator.html`)
```html
<div class="retrofit-estimator-card">
  <h3>Instant Price Range Estimator</h3>
  <p class="estimator-subtitle">Select your service to get an immediate ballpark estimate:</p>
  
  <div class="form-group">
    <label for="serviceType">Service Needed:</label>
    <select id="serviceType" class="form-control" onchange="calculateEstimate()">
      <option value="tuneup">Seasonal System Tune-Up ($89 - $129)</option>
      <option value="repair">Diagnostic & Repair ($99 - $249)</option>
      <option value="replacement">Full System Replacement ($3,500 - $6,500)</option>
    </select>
  </div>

  <div class="form-group">
    <label for="homeSize">Approximate Home Square Footage:</label>
    <select id="homeSize" class="form-control" onchange="calculateEstimate()">
      <option value="1">Under 1,500 sq ft</option>
      <option value="1.2">1,500 - 2,500 sq ft</option>
      <option value="1.4">2,500+ sq ft</option>
    </select>
  </div>

  <div class="estimate-result-box">
    <span>Estimated Cost:</span>
    <span class="estimate-price" id="estimateOutput">$89 – $129</span>
  </div>

  <a href="#quote" class="btn btn-primary btn-block">Lock In This Estimate</a>
</div>
```

### Accompanying Calculation Logic (`app.js`)
```javascript
function calculateEstimate() {
  const service = document.getElementById('serviceType').value;
  const multiplier = parseFloat(document.getElementById('homeSize').value) || 1.0;
  const output = document.getElementById('estimateOutput');

  let low = 89, high = 129;
  if (service === 'repair') {
    low = Math.round(99 * multiplier);
    high = Math.round(249 * multiplier);
  } else if (service === 'replacement') {
    low = Math.round(3500 * multiplier);
    high = Math.round(6500 * multiplier);
  }
  output.textContent = `$${low.toLocaleString()} – $${high.toLocaleString()}`;
}
```

---

## Playbook 8: Logo Modernization & Brand Tokens (+$99)
**Setup Time: 30 Mins**

Transform low-res pixelated contractor logos (from truck doors or business cards) into crisp, professional modern assets.

### 3-Step Execution:
1. **SVG Vectorization (15 Mins):** Run the bitmap image through vector tracing software (or Illustrator/Inkscape) to export a scalable, razor-sharp `.svg` logo.
2. **Complete Favicon Suite (10 Mins):**
   - Export `favicon.ico` (32x32), `apple-touch-icon.png` (180x180), and `android-chrome-192x192.png`.
   - Place into client's `/assets/` directory.
3. **Add Head Tags (5 Mins):**
```html
<link rel="icon" type="image/x-icon" href="assets/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
```

---

## 12. Post-Launch Hand-Off & Video Walkthrough SOP

Once the website is live on its custom domain:
1. **The 2-Minute Loom Walkthrough:**
   - Record a 90–120 second video on your desktop and phone screen.
   - Script:
     > *"Hey [Name], Cole here! Your new website is officially live. I'm clicking your phone number here and you can see it dials your office directly. I just submitted a test quote form, and you should have already received a text on your phone. Everything is hosted on Cloudflare with SSL and backed up daily. Thanks for trusting RetroFit!"*
2. **Automated Stripe Subscription Activation:**
   - Send the Stripe Customer Portal link for their $49/mo or $99/mo care plan.
   - The first invoice bills automatically on the day of launch.

---

## 13. Directory Architecture & Starter Kit Reference

All new builds are cloned directly from `/starter-kit`:
```
retrofit-web/
├── starter-kit/
│   ├── index.html                  (Complete responsive 1-page template)
│   ├── css/
│   │   └── style.css               (CSS variable design system)
│   ├── js/
│   │   ├── app.js                  (Mobile menu, estimator logic)
│   │   └── retrofit-tracker.js     (Zero-dependency tracking snippet)
│   └── components/
│       ├── mobile-sticky-call-bar.html
│       ├── lead-form-web3forms.html
│       ├── interactive-estimator.html
│       ├── local-business-schema.json
│       └── google-sheets-lead-schema.csv
```

**Clone Command for a New Client:**
```powershell
cp -r starter-kit clients/new-client-name
```
You are immediately 80% finished before writing a single line of code!
