"""
RetroFit Growth Engine - Page 2: Automated Pitch & Teaser Drafter
Generates hyper-personalized cold emails, SMS, DMs, and call scripts.
Includes direct SMTP email sending from python-tools/app.py.
"""

import os
import streamlit as st
from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.site_inspector import inspect_site
from modules.pitch_generator import generate_pitches
from modules.pipeline_store import save_lead, update_lead_status
from modules.email_sender import send_pitch_email, get_smtp_config

st.set_page_config(
    page_title="Pitch & Teaser Drafter | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="Automated Pitch & Teaser Drafter",
    subtitle="Diagnose contractor flaws and dispatch high-converting cold pitches directly via SMTP email, SMS, and phone.",
    badge_text="Outreach Engine"
)

# Prospect Target Input
default_url = st.session_state.get("selected_url", "")
preloaded_data = st.session_state.get("selected_lead_data", None)

col_input, col_meta = st.columns([3, 2])

with col_input:
    target_url = st.text_input(
        "Prospect Website URL (leave blank if lead has NO website)",
        value=default_url,
        placeholder="e.g. minneapolisroofingpros.com or leave blank for No-Website leads"
    )

with col_meta:
    meta_col1, meta_col2 = st.columns(2)
    with meta_col1:
        trade_val = preloaded_data.get("Trade") or preloaded_data.get("Keyword") or "Contractor" if preloaded_data else "Contractor"
        trade = st.text_input("Trade / Service", value=trade_val, placeholder="e.g. Plumber, Roofer")
    with meta_col2:
        city_val = preloaded_data.get("City") or preloaded_data.get("Address", "") if preloaded_data else ""
        city = st.text_input("City / Market", value=city_val, placeholder="e.g. Minneapolis, MN")

audit_btn = st.button("Inspect & Generate Pitches", type="primary", width='stretch')

# Determine if we should audit or use preloaded no-website data
if audit_btn or "current_audit" not in st.session_state or st.session_state.get("last_audited_url") != target_url:
    if target_url:
        with st.spinner("Analyzing site architecture, mobile responsiveness, and contact tags..."):
            audit_res = inspect_site(target_url)
            if preloaded_data:
                audit_res["email"] = audit_res.get("email") or preloaded_data.get("Email", "")
                audit_res["phone"] = audit_res.get("phone") or preloaded_data.get("Phone", "")
                audit_res["business_name"] = preloaded_data.get("Business Name") or audit_res.get("business_name", "")
            st.session_state["current_audit"] = audit_res
            st.session_state["last_audited_url"] = target_url
    elif preloaded_data and ("No Website" in preloaded_data.get("Lead Type", "")):
        # Synthesize audit dict for no-website lead
        st.session_state["current_audit"] = {
            "url": "",
            "domain": "No Website",
            "business_name": preloaded_data.get("Business Name", "Contractor"),
            "phone": preloaded_data.get("Phone", ""),
            "email": preloaded_data.get("Email", ""),
            "lead_type": "No Website",
            "rescue_score": 95,
            "lead_tier": "New Build Opportunity",
            "has_click_to_call": False,
            "ssl_secure": False,
            "cms_platform": "None",
            "flaws": ["No active website listed on Google Maps"],
            "response_time_sec": None,
            "copyright_year": None,
            "is_copyright_outdated": False,
        }
        st.session_state["last_audited_url"] = ""

# Render Inspection Results & Pitch Generator
if "current_audit" in st.session_state:
    audit = st.session_state["current_audit"]
    
    render_icon_heading("magnifying-glass", f"Diagnostic Breakdown: {audit['business_name']}", "Site architecture and mobile readiness evaluation", badge_color="orange")

    # Metric Cards
    m1, m2, m3, m4, m5 = st.columns(5)
    with m1:
        st.metric("Opportunity Score", f"{audit['rescue_score']}/100", audit["lead_tier"])
    with m2:
        st.metric("Mobile Tap-To-Call", "Detected" if audit["has_click_to_call"] else "Missing")
    with m3:
        st.metric("SSL Security", "Secure" if audit["ssl_secure"] else "Insecure")
    with m4:
        st.metric("Platform", audit["cms_platform"])
    with m5:
        st.metric("Latency", f"{audit['response_time_sec']}s" if audit['response_time_sec'] else "N/A")

    # Business details bar
    det_col1, det_col2, det_col3 = st.columns(3)
    with det_col1:
        custom_biz_name = st.text_input("Business Name", value=audit["business_name"])
        audit["business_name"] = custom_biz_name
    with det_col2:
        custom_phone = st.text_input("Phone Number", value=audit.get("phone", ""))
        audit["phone"] = custom_phone
    with det_col3:
        custom_email = st.text_input("Target Email", value=audit.get("email", "") if audit.get("email") != "Not Found" else "")
        audit["email"] = custom_email

    # Flaws list
    if audit["flaws"]:
        st.warning("**Detected Conversion Flaws:**\n* " + "\n* ".join(audit["flaws"]))
    else:
        st.success("Site fundamentals intact. Focus pitch on speed and lead capture.")

    st.divider()

    # Generate Personalized Pitches
    pitches = generate_pitches(audit, trade=trade, city=city)

    render_icon_heading("paper-plane-tilt", "Multi-Channel Outreach Copy", "Outreach scripts and templates for cold email, SMS, DM, and phone", badge_color="teal")

    tab_email, tab_sms, tab_dm, tab_phone = st.tabs([
        "Cold Email & SMTP Sender",
        "SMS / Text Message",
        "Social DM (IG/FB)",
        "Phone Cold Call Script"
    ])

    with tab_email:
        col_subj, col_to = st.columns([2, 1])
        with col_subj:
            chosen_subject = st.selectbox("Select Subject Line", pitches["subject_lines"])
        with col_to:
            send_to_email = st.text_input("Send to Email", value=audit["email"])

        editable_body = st.text_area("Email Body", value=pitches["email_body"], height=230)

        # Direct Send Button
        smtp_cfg = get_smtp_config()
        st.caption(f"Configured SMTP Sender: `{smtp_cfg['username'] or 'Not configured in .env'}`")
        
        send_col1, send_col2 = st.columns([1, 2])
        with send_col1:
            if st.button("Send Email via SMTP Now", type="primary", width='stretch'):
                if not send_to_email or "@" not in send_to_email:
                    st.error("Please enter a valid recipient email address above.")
                else:
                    with st.spinner(f"Sending email to {send_to_email} via SMTP..."):
                        success, msg = send_pitch_email(send_to_email, chosen_subject, editable_body)
                        if success:
                            st.success(f"{msg}")
                            # Update lead status in DB
                            lead_id = preloaded_data.get("ID") if preloaded_data else None
                            if lead_id:
                                update_lead_status(lead_id, "Pitched Email", f"Sent Cold Email via SMTP to {send_to_email}")
                            else:
                                save_lead({
                                    "Business Name": audit["business_name"],
                                    "Domain": audit["domain"],
                                    "Phone": audit["phone"],
                                    "Email": send_to_email,
                                    "Status": "Pitched Email",
                                    "Rescue Score": audit["rescue_score"],
                                    "Notes": f"Sent Cold Email via SMTP re: {pitches['focal_flaw']}",
                                    "Full URL": audit["url"],
                                })
                        else:
                            st.error(f"{msg}")

    with tab_sms:
        st.caption("Field-tested short text message (under 160-220 characters):")
        st.text_area("SMS Copy", value=pitches["sms_body"], height=100)
        st.caption(f"Character count: {len(pitches['sms_body'])} characters")

    with tab_dm:
        st.caption("Casual, conversational value-first DM for Instagram or Facebook business pages:")
        st.text_area("Social DM Copy", value=pitches["social_dm"], height=150)

    with tab_phone:
        st.caption("30-second telephone script with rapid objection handlers for cold calling:")
        st.text_area("Cold Call Script", value=pitches["phone_script"], height=280)

    st.divider()

    # Pipeline Action Bar
    pipe_col1, pipe_col2 = st.columns(2)
    with pipe_col1:
        if st.button("Save / Update Lead in Database", width='stretch'):
            save_lead({
                "Business Name": audit["business_name"],
                "Domain": audit["domain"],
                "Rescue Score": audit["rescue_score"],
                "Status": "New",
                "Trade": trade,
                "City": city,
                "Phone": audit["phone"],
                "Email": audit["email"],
                "Full URL": audit["url"],
                "Notes": f"Flaws: {pitches['focal_flaw']}",
            })
            st.success(f"Saved {audit['business_name']} to leads.db!")

    with pipe_col2:
        if st.button("Mark as Contacted (SMS Sent)", width='stretch'):
            save_lead({
                "Business Name": audit["business_name"],
                "Domain": audit["domain"],
                "Rescue Score": audit["rescue_score"],
                "Status": "Contacted",
                "Trade": trade,
                "City": city,
                "Phone": audit["phone"],
                "Email": audit["email"],
                "Full URL": audit["url"],
                "Notes": "Pitched via SMS.",
            })
            st.success(f"Updated status for {audit['business_name']} to 'Contacted'!")
