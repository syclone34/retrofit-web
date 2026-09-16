"""
RetroFit Growth Engine - Page 3: Lead Pipeline & CRM
Unified CRM database connected to leads.db from python-tools.
Tracks outreach status, follow-up notes, and direct SMTP email dispatching.
"""

import os
import streamlit as st
import pandas as pd
from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.pipeline_store import get_pipeline_df, update_lead_status, delete_lead_by_id
from modules.email_sender import send_pitch_email, get_smtp_config

st.set_page_config(
    page_title="Lead Pipeline | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="Contractor Outreach Pipeline & CRM",
    subtitle="Manage your contractor database, track outreach statuses, send follow-up emails, and close $299 Website Rescues.",
    badge_text="Pipeline CRM"
)

df = get_pipeline_df()

if df.empty:
    st.info("Your pipeline is currently empty. Use the Lead Finder to harvest prospects or Pitch Drafter to save single leads.")
else:
    # Summary Metrics
    m1, m2, m3, m4 = st.columns(4)
    total_leads = len(df)
    new_leads = len(df[df["Status"] == "New"])
    contacted = len(df[df["Status"].isin(["Contacted", "Pitched Email", "Pitched SMS", "Followed Up"])])
    won = len(df[df["Status"].str.contains("Won", na=False)])

    with m1:
        st.metric("Total Prospects in DB", total_leads)
    with m2:
        st.metric("New Leads to Contact", new_leads)
    with m3:
        st.metric("In Active Outreach", contacted)
    with m4:
        st.metric("Won Rescues / Builds", won, f"${won * 299:,} Revenue" if won > 0 else "")

    st.write("")

    # Filter Controls
    f_col1, f_col2, f_col3 = st.columns(3)
    with f_col1:
        all_statuses = ["All"] + sorted(list(df["Status"].dropna().unique()))
        selected_status = st.selectbox("Filter by Status", all_statuses, index=0)
    with f_col2:
        all_types = ["All"] + sorted(list(df["Lead Type"].dropna().unique()))
        selected_type = st.selectbox("Filter by Lead Type", all_types, index=0)
    with f_col3:
        search_kw = st.text_input("Search Business Name or Phone", placeholder="Type to search...")

    view_df = df.copy()
    if selected_status != "All":
        view_df = view_df[view_df["Status"] == selected_status]
    if selected_type != "All":
        view_df = view_df[view_df["Lead Type"] == selected_type]
    if search_kw.strip():
        kw = search_kw.strip().lower()
        view_df = view_df[
            view_df["Business Name"].str.lower().str.contains(kw, na=False) |
            view_df["Phone"].str.contains(kw, na=False)
        ]

    # Data Table
    display_cols = ["ID", "Business Name", "Status", "Rescue Score", "Notes", "Lead Type", "Phone", "Email", "Address", "Date Found"]
    available_cols = [c for c in display_cols if c in view_df.columns]

    st.dataframe(
        view_df[available_cols],
        width='stretch',
        hide_index=True,
        column_config={
            "ID": st.column_config.NumberColumn("ID", width="small"),
            "Rescue Score": st.column_config.ProgressColumn(
                "Rescue Score",
                format="%d/100",
                min_value=0,
                max_value=100,
                width="small"
            ),
            "Notes": st.column_config.TextColumn(
                "Notes & Outreach Log",
                width="large",
                help="Outreach logs, audit flaws, and follow-up notes"
            ),
            "Status": st.column_config.TextColumn("Status", width="small"),
            "Phone": st.column_config.TextColumn("Phone", width="small"),
            "Email": st.column_config.TextColumn("Email", width="small"),
        }
    )

    # Export Button
    csv_data = view_df.to_csv(index=False).encode("utf-8")
    st.download_button(
        label="Export Filtered Leads to CSV",
        data=csv_data,
        file_name="retrofit_leads_pipeline.csv",
        mime="text/csv"
    )

    st.divider()

    # Lead Actions & Quick SMTP Email Dispatcher
    render_icon_heading("lightning", "Lead Action Center & Quick Dispatcher", "Update lead records or dispatch direct pitch emails", badge_color="orange")
    
    lead_options = [f"#{row['ID']} - {row['Business Name']} ({row['Phone']})" for _, row in view_df.iterrows()]
    
    if lead_options:
        selected_lead_str = st.selectbox("Select a Lead to Manage", lead_options)
        lead_id = int(selected_lead_str.split(" - ")[0].replace("#", ""))
        matching = df[df["ID"] == lead_id].iloc[0]

        tab_update, tab_direct_email = st.tabs(["Update Status & Notes", "Dispatch Direct Pitch Email"])

        with tab_update:
            edit_col1, edit_col2, edit_col3 = st.columns([2, 2, 3])
            with edit_col1:
                st.write(f"**Business:** {matching['Business Name']}")
                st.caption(f"**Website:** {matching.get('Website') or 'No Website'}")
                st.caption(f"**Address:** {matching.get('Address', 'N/A')}")
            with edit_col2:
                status_options = [
                    "New",
                    "Contacted",
                    "Pitched Email",
                    "Pitched SMS",
                    "Followed Up",
                    "Won ($299 Rescue)",
                    "Won ($499 New Build)",
                    "Lost / Not Interested"
                ]
                curr_status = matching.get("Status", "New")
                curr_idx = status_options.index(curr_status) if curr_status in status_options else 0
                new_status = st.selectbox("Update Status", status_options, index=curr_idx)
                new_email = st.text_input("Lead Email", value=matching.get("Email", ""))
            with edit_col3:
                new_notes = st.text_area("Outreach Notes", value=matching.get("Notes", ""), height=100)

            act_col1, act_col2, act_col3 = st.columns(3)
            with act_col1:
                if st.button("Save Lead Updates", type="primary", width='stretch'):
                    update_lead_status(lead_id, new_status, new_notes, new_email)
                    st.success(f"Updated lead #{lead_id}!")
                    st.rerun()
            with act_col2:
                if st.button("Delete Lead", width='stretch'):
                    delete_lead_by_id(lead_id)
                    st.warning(f"Deleted lead #{lead_id}!")
                    st.rerun()
            with act_col3:
                if st.button("Open in Pitch Drafter", width='stretch'):
                    st.session_state["selected_url"] = matching.get("Website", "")
                    st.session_state["selected_lead_data"] = matching.to_dict()
                    st.switch_page("pages/2_Pitch_Drafter.py")

        with tab_direct_email:
            st.caption("Send a personalized outreach email directly through your SMTP server (from python-tools):")
            
            smtp_cfg = get_smtp_config()
            st.info(f"Connected SMTP Account: **{smtp_cfg['username'] or 'Please set SMTP_USERNAME in .env'}**")

            email_recipient = st.text_input("Recipient Email", value=matching.get("Email", "") if matching.get("Email") != "Not Found" else "")
            
            is_no_site = "No Website" in matching.get("Lead Type", "")
            if is_no_site:
                default_subj = f"Quick question about {matching['Business Name']}'s website"
                default_body = f"""Hi there,

I was trying to look up {matching['Business Name']} online but couldn't find a website for you.

I run Retrofit Web Design, a local agency that helps businesses like yours get set up with professional, modern websites to drive more local traffic. We offer very competitive pricing and I would love to chat if you're ever interested in establishing a web presence.

Let me know!

Thanks,
Cole
Retrofit Web Design
Call or Text: (612) 516-3145
cole@retrofitwebdesign.com | retrofitwebdesign.com"""
            else:
                default_subj = f"Quick question re: {matching['Business Name']}'s website"
                default_body = f"""Hey {matching['Business Name']} team,

I was browsing your website on my smartphone today and noticed mobile visitors have trouble tapping to call your phone number directly, causing homeowners on 4G to bounce.

We rescue and modernize contractor websites in 48 hours for a flat $299 (sub-second load speeds, 100% mobile-first tap-to-call, and instant SMS lead routing).

Would you be open to seeing a quick 60-second preview mockup for {matching['Business Name']}?

Best,
Cole
RetroFit Web Design
(612) 516-3145 | retrofitwebdesign.com"""

            subj_input = st.text_input("Subject", value=default_subj)
            body_input = st.text_area("Body", value=default_body, height=220)

            if st.button("Send Email to Contractor", type="primary"):
                if not email_recipient or "@" not in email_recipient:
                    st.error("Please provide a valid recipient email address.")
                else:
                    with st.spinner("Sending email..."):
                        success, msg = send_pitch_email(email_recipient, subj_input, body_input)
                        if success:
                            st.success(f"{msg}")
                            update_lead_status(lead_id, "Contacted", f"Sent pitch email to {email_recipient}", email_recipient)
                            st.rerun()
                        else:
                            st.error(f"{msg}")
