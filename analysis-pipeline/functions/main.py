import functions_framework
from google.cloud import bigquery
from google.cloud import secretmanager
import json
import os
import requests
from datetime import datetime

# Initialize GCP clients
bq_client = bigquery.Client()
secret_client = secretmanager.SecretManagerServiceClient()

PROJECT_ID = os.environ.get("GCP_PROJECT", "retrofit-web-design")
DATASET_ID = "raw_operations"

def get_secret(secret_id, version_id="latest"):
    name = f"projects/{PROJECT_ID}/secrets/{secret_id}/versions/{version_id}"
    response = secret_client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

def stream_to_bq(table_name, rows):
    """Streams a list of dicts directly into BigQuery."""
    if not rows:
        return []
    
    table_id = f"{PROJECT_ID}.{DATASET_ID}.{table_name}"
    # errors will be a list of dicts if insertion fails
    errors = bq_client.insert_rows_json(table_id, rows)
    return errors


@functions_framework.http
def webhook_handler(request):
    """
    HTTP Webhook Endpoint: Captures real-time events (e.g. from Stripe or CRM).
    """
    request_json = request.get_json(silent=True)
    if not request_json:
        return "No JSON payload received", 400

    # Determine event type/source from headers or payload
    # For now, we'll assume it's a generic event
    event_type = request_json.get("type", "unknown_event")
    
    # Standardize the payload
    row_to_insert = {
        "event_id": request_json.get("id", "no_id"),
        "event_type": event_type,
        "source": "webhook",
        "payload": json.dumps(request_json),  # Store full payload as a JSON string for flexible querying later
        "ingested_at": datetime.utcnow().isoformat()
    }

    errors = stream_to_bq("webhook_events", [row_to_insert])
    
    if errors:
        print(f"Errors inserting webhook into BigQuery: {errors}")
        return f"Internal Error: {errors}", 500
        
    return "Webhook processed successfully", 200


@functions_framework.http
def scheduled_polling_handler(request):
    """
    Scheduled Job Endpoint: Intended to be triggered by Cloud Scheduler.
    Fetches data from external REST APIs (like Stripe or QBO) and streams to BQ.
    """
    # Example: Fetching from a fictional CRM API
    # crm_api_key = get_secret("CRM_API_KEY")
    # response = requests.get("https://api.example.com/v1/leads", headers={"Authorization": f"Bearer {crm_api_key}"})
    # leads = response.json().get("data", [])
    
    # Mock data for demonstration
    leads = [
        {"id": "lead_123", "status": "new", "source": "facebook_ads"},
        {"id": "lead_124", "status": "contacted", "source": "organic_search"}
    ]

    rows_to_insert = []
    for lead in leads:
        rows_to_insert.append({
            "lead_id": lead["id"],
            "status": lead["status"],
            "source": lead["source"],
            "ingested_at": datetime.utcnow().isoformat(),
            "raw_payload": json.dumps(lead)
        })

    errors = stream_to_bq("crm_leads", rows_to_insert)

    if errors:
        print(f"Errors inserting leads into BigQuery: {errors}")
        return f"Internal Error: {errors}", 500

    return f"Successfully polled and inserted {len(rows_to_insert)} records.", 200
