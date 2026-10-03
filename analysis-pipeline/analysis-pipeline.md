# Implementation Plan: GCP Small Business Analysis & Automation Engine

## Objective
Deploy a low-cost, serverless data pipeline on Native GCP that ingests disparate small business operations data (Stripe/Square, CRM leads, QBO) directly into BigQuery, and visualizes KPIs in Looker Studio with automated digests.

---

## 1. System Architecture
- **Ingestion Runtime:** Google Cloud Functions (Python 3.10+, 2nd Gen)
- **Trigger Mechanisms:**
  - Cloud Scheduler (Hourly/Daily cron polling external REST APIs)
  - HTTP Webhook endpoints (Real-time event capture)
- **Secrets Management:** Google Cloud Secret Manager (API keys, OAuth tokens)
- **Analytical Data Warehouse:** Google BigQuery (Direct streaming via BigQuery Python Client)
- **Presentation Layer:** Looker Studio (Direct BigQuery Connector)
- **Dispatches:** Automated PDF/email summaries via SendGrid or SMTP Cloud Function

---

## 2. Target KPI Schema (BigQuery Aggregations)
- **Lead Triage & Conversion:** Form/webhook capture timestamps vs. initial contact and closed deals.
- **Cash Flow / Accounts Receivable:** Invoices billed, aging overdue buckets, and net payouts.
- **Client Acquisition Efficiency:** Ad spend joined against realized paid customer lifetime value.

---

## 3. Step-by-Step Execution Plan

### Phase 1: GCP Environment Provisioning
- [x] Enable necessary GCP APIs: Cloud Functions, Cloud Build, BigQuery, Secret Manager, Cloud Scheduler.
- [x] Create a BigQuery Dataset for the raw ingestion data (e.g., `raw_operations`).
- [x] Provision Secret Manager secrets for client vendor keys (e.g., Stripe API key).

### Phase 2: Ingestion Pipelines (Python Cloud Functions)
- [x] Scaffold Python project using `functions-framework` and `google-cloud-bigquery`.
- [x] Implement scheduled job (triggered via Cloud Scheduler):
  - Fetch delta records from source API (e.g., invoices, leads).
  - Format payloads into standardized JSON.
  - Stream records directly into BigQuery using `insert_rows_json`.
- [x] Implement HTTP webhook function to capture real-time Stripe/CRM triggers and stream directly to BigQuery.
- [x] Deploy functions to GCP automatically using GitHub Actions (`deploy-functions.yml`).

### Phase 3: Data Modeling in BigQuery
- [ ] Write scheduled SQL queries or views in BigQuery to transform raw JSON data.
- [ ] Aggregate metrics by date, lead source, and transaction status.
- [ ] Create deduplicated analytical views for Looker Studio.

### Phase 4: Visualization & Delivery
- [ ] Create a Looker Studio data source connecting directly to the BigQuery analytical view.
- [ ] Build a standardized 1-page dashboard template (Executive Summary).
- [ ] Set up scheduled email delivery in Looker Studio or write a Monday morning digest function.