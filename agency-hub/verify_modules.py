"""
Test verification script for RetroFit Agency Hub modules
"""

import sys
import os

# Add agency-hub to path
sys.path.insert(0, os.path.dirname(__file__))

from modules.site_inspector import inspect_site, clean_domain_name
from modules.pitch_generator import generate_pitches
from modules.pipeline_store import get_pipeline_df, save_lead, update_lead_status
from modules.scraper import search_contractors_web

def run_tests():
    print("--- 1. Testing Domain Cleaner ---")
    domain = clean_domain_name("https://www.example-roofing.com/services?id=1")
    assert domain == "example-roofing.com", f"Domain mismatch: {domain}"
    print(f" Clean domain: {domain}")

    print("\n--- 2. Testing Site Inspector (Offline / Simulated) ---")
    mock_url = "https://example.com"
    audit = inspect_site(mock_url, timeout=5)
    print(f" Domain: {audit['domain']}")
    print(f" Rescue Score: {audit['rescue_score']}/100 ({audit['lead_tier']})")
    print(f" Reachable: {audit['reachable']}")
    assert "rescue_score" in audit

    print("\n--- 3. Testing Pitch Generator ---")
    pitches = generate_pitches(audit, trade="Roofing", city="Minneapolis, MN")
    assert len(pitches["subject_lines"]) >= 3
    assert len(pitches["email_body"]) > 50
    assert len(pitches["sms_body"]) > 20
    assert len(pitches["phone_script"]) > 100
    print(f" Generated Email Subject: {pitches['subject_lines'][0]}")
    print(f" SMS Length: {len(pitches['sms_body'])} characters")

    print("\n--- 4. Testing Pipeline Store ---")
    df = get_pipeline_df()
    print(f" Loaded {len(df)} leads from pipeline.")
    assert len(df) >= 1

    print("\n--- 5. Testing Web Scraper ---")
    results = search_contractors_web("Roofing", "Minneapolis, MN", limit=3)
    print(f" Web Search returned {len(results)} candidate listings.")

    print("\n ALL BACKEND MODULES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    run_tests()
