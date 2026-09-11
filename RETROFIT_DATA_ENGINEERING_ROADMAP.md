# RetroFit Web Design: Data Engineering & Analytics Integration Roadmap

**Author:** Cole (RetroFit Web Design)  
**Focus:** Integrating Data Engineering (DE) & Analytics Engineering (AE) into the RetroFit Business Model  
**Objective:** Elevate RetroFit from a one-time $299 Website Rescue into high-retention, high-margin monthly recurring revenue ($99–$349+/mo MRR) by solving the "data blindness" problem for local service businesses.

---

## 1. Executive Summary & Value Proposition

Most local service businesses (contractors, plumbers, HVAC, law firms, detailers) spend money on websites, Google Ads, and local SEO without knowing their true **Lead-to-Revenue ROI**. Their data is fragmented:
- **Traffic & Clicks:** Google Analytics / Google Ads / GBP
- **Leads:** Phone calls, contact forms, click-to-call, quote requests
- **Sales & Revenue:** Invoicing/CRMs (Jobber, ServiceTitan, Housecall Pro, Clio, QuickBooks, Stripe)

By embedding **Data Engineering (pipelines, ingestion, webhooks)** and **Analytics Engineering (dbt/SQL models, attribution, executive reporting)** into RetroFit, you become their **"Fractional Revenue & Data Partner"**—a service 10x stickier than standard website maintenance.

---

## 2. The 3 Core Pillars

### Pillar 1: RetroFit Analyzer "Data Audit" Feature (Quickest Win)
*Upgrade the existing `retrofit-analyzer` React tool with an Analytics & Tracking Inspector.*
- **What it does:** When scanning a prospect’s URL, audit not just SEO and performance, but also their tracking maturity:
  - Is Google Tag Manager (GTM) or GA4 present?
  - Are conversion events firing on click-to-call or form submits?
  - Is dynamic call tracking (CallRail/Twilio) active?
  - Are meta pixels or ad tags running blindly without conversion APIs?
- **Pitch Angle:** *"Your site not only looks outdated, but you're also flying completely blind on which leads turn into paid jobs."*

### Pillar 2: Standard Client Tracking Stack (Standardization)
*Every modernized site deployed by RetroFit comes with an out-of-the-box tracking instrumentation layer:*
- **Standardized Event Schema:**
  - `phone_call_clicked` (with target number, page URL)
  - `quote_form_submitted` (with service requested, source UTMs)
  - `review_link_clicked`
  - `direction_map_clicked`
- **Data Destination:** Webhook endpoint (Cloud Function / Supabase / Postgres) logging every raw interaction with timestamp, referrer, and UTM parameters.

### Pillar 3: "Lead-to-Revenue" Attribution Pipeline (High-MRR Offer)
*A monthly retainer service ($199–$349/mo) bridging web forms/calls to closed invoices.*
- **Extract/Load (DE):** Pull leads from website webhooks + phone call logs + CRM/QuickBooks invoice completions.
- **Transform (AE):** Model conversion rates using dbt or scheduled SQL:
  - Form $\rightarrow$ Qualified Lead $\rightarrow$ Estimate Sent $\rightarrow$ Job Completed $\rightarrow$ Paid Invoice.
- **Serve (BI):** Automated 1-page Looker Studio / Metabase dashboard + automated weekly SMS/Email summary to the owner's phone.

---

## 3. Phased 90-Day Implementation Plan

### Phase 1: Days 1–14 — Upgrade the Analyzer & Define Schemas
- [ ] Add a `TrackingAudit.jsx` component inside `retrofit-analyzer` to detect GA4, GTM, Meta Pixel, and Call Tracking.
- [ ] Standardize the JavaScript tracking snippet across all RetroFit client templates (`retrofit-web/daytonagolfclub`, `blustinlaw`, `hairbyjennifer`, etc.).
- [ ] Define the core JSON event schema for leads and conversions.

### Phase 2: Days 15–30 — Lightweight Ingestion Pipeline
- [ ] Set up a centralized serverless webhook receiver (e.g., Supabase Edge Functions, Cloudflare Workers, or GCP Cloud Functions) with a Postgres/BigQuery backend.
- [ ] Build an automated Slack/Email alert whenever a client site captures a lead (proves immediate value to the client).
- [ ] Pilot this tracking pipeline on 1–2 existing RetroFit client sites (e.g., MNS All Seasons Comforts).

### Phase 3: Days 31–60 — Automated Outbound Scraping Pipeline (DE for Sales)
- [ ] Build a scheduled Python / DuckDB pipeline:
  1. Ingest local contractor listings (Google Places API / SerpApi / Yelp).
  2. Run batch headless audits (PageSpeed Insights API + tracking check).
  3. Generate a prioritized prospecting list ranked by **Rescue Score**:
     - High review count ($>30$ reviews) + Low mobile score ($<50$) + Zero conversion tracking.
- [ ] Pipe qualified leads directly into `OutreachEmail.jsx` inside `retrofit-analyzer`.

### Phase 4: Days 61–90 — Launch the "Revenue & Lead Intelligence" Retainer
- [ ] Build a modular Looker Studio / Metabase template for local service businesses.
- [ ] Connect CRM webhooks (Jobber, ServiceTitan, Housecall Pro, or Stripe/QuickBooks) to close the loop on revenue attribution.
- [ ] Package and roll out the upgraded service tiers to new and existing clients.

---

## 4. Revised RetroFit Pricing & Tier Ladder

| Tier | Price | Included Scope |
| :--- | :--- | :--- |
| **Tier 1: Website Rescue** | **$299** one-time | Full site modernization, 48–72h turnaround, speed, mobile, click-to-call, basic GA4 setup. |
| **Tier 2: Care & Uptime Plan** | **$49 / mo** | High-performance cloud hosting, daily backups, SSL, uptime monitoring, 30m edits. |
| **Tier 3: Growth & Lead Tracking** | **$99 / mo** | Care Plan **PLUS:** Call tracking integration, form conversion tracking, automated weekly SMS/Email performance digest. |
| **Tier 4: Lead-to-Revenue Intelligence** | **$199 – $349 / mo** | All above **PLUS:** CRM/QuickBooks integration, lead attribution pipeline, live Executive ROI Dashboard, quarterly strategy call. |

---

## 5. Standard Event & Data Model Schema

### Ingestion Event Schema (`events_raw`)
```json
{
  "client_id": "mns-all-seasons",
  "event_id": "evt_982341ab",
  "timestamp": "2026-09-09T16:15:00Z",
  "event_type": "quote_form_submit",
  "page_path": "/air-conditioning",
  "source_utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "ac-repair-spring"
  },
  "lead_payload": {
    "name": "Jane Doe",
    "phone": "612-555-0199",
    "service": "AC Tune-Up",
    "city": "Maple Grove"
  }
}
```

### Dimensional Modeling (`dbt` / SQL Marts)
1. **`dim_clients`**: Client metadata, niche, monthly tier, active status.
2. **`fct_leads`**: Unified leads from both web forms and phone calls, enriched with geographic and attribution data.
3. **`fct_revenue_attribution`**: Joined `fct_leads` $\rightarrow$ CRM booking record $\rightarrow$ Invoice paid amount. Calculates exact CAC and ROAS.

---

## 6. Next Steps When Resuming
When you're ready to start building:
1. Start with **Phase 1**: Add the tracking checker to `retrofit-analyzer` to use as an immediate sales weapon.
2. Embed the unified tracking script into your existing templates in `retrofit-web`.
