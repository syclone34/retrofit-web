"""
RetroFit Growth Engine - Page 6: Mass Email Campaigns
Batch dispatch personalized cold emails to targeted prospect segments via SMTP.
"""

import os
import time
import streamlit as st
import pandas as pd
from dotenv import load_dotenv

from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, LOGO_PATH
from modules.pipeline_store import get_pipeline_df, update_lead_status
from modules.email_sender import send_pitch_email, get_smtp_config

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH, override=True)

st.set_page_config(
    page_title="Mass Email Campaigns | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="Mass Email Campaigns",
    subtitle="Filter your pipeline, compose personalized templates, and launch mass SMTP outreach campaigns.",
    badge_text="Outreach Engine"
)

# Fetch leads
df_leads = get_pipeline_df()

if df_leads.empty:
    st.info("No leads in pipeline. Use Lead Finder to harvest prospects first.")
    st.stop()

# Ensure leads have valid emails
df_with_emails = df_leads[df_leads["Email"].notna() & (df_leads["Email"] != "") & (df_leads["Email"] != "Not Found")]

render_icon_heading("funnel", "1. Target Audience Segmentation", "Filter your leads to build a targeted mailing list", badge_color="orange")

# Filters
f_col1, f_col2, f_col3 = st.columns(3)
with f_col1:
    lead_types = ["All"] + sorted(list(df_with_emails["Lead Type"].dropna().unique()))
    chosen_type = st.selectbox("Filter by Lead Type:", lead_types)
with f_col2:
    status_types = ["All"] + sorted(list(df_with_emails["Status"].dropna().unique()))
    chosen_status = st.selectbox("Filter by CRM Status:", status_types, index=status_types.index("New") if "New" in status_types else 0)
with f_col3:
    st.write("")
    exclude_contacted = st.checkbox("Exclude previously pitched leads", value=True)

# Apply Filters
batch_df = df_with_emails.copy()
if chosen_type != "All":
    batch_df = batch_df[batch_df["Lead Type"] == chosen_type]
if chosen_status != "All":
    batch_df = batch_df[batch_df["Status"] == chosen_status]
if exclude_contacted:
    batch_df = batch_df[~batch_df["Status"].str.contains("Pitched|Contacted", case=False, na=False)]

st.caption(f"**{len(batch_df)}** valid leads matched your targeting criteria.")

if batch_df.empty:
    st.warning("No leads match the current filters. Try adjusting the dropdowns above.")
else:
    cols_to_show = [c for c in ["ID", "Business Name", "City", "Lead Type", "Status", "Email"] if c in batch_df.columns]
    st.dataframe(
        batch_df[cols_to_show],
        width='stretch',
        hide_index=True,
        height=200
    )

st.divider()

render_icon_heading("envelope-simple-open", "2. Email Template Studio", "Compose your message using dynamic variables", badge_color="teal")

st.info("**Dynamic Variables Supported:** You can use `{{Business Name}}`, `{{City}}`, and `{{Website}}` anywhere in the subject or body to personalize each email.")

default_subject = "Quick question about {{Business Name}}"
default_body = """Hi team at {{Business Name}},

I was looking for home service experts in {{City}} and came across your business. I noticed a few things on your website that are likely costing you leads.

I run a local web design agency and we specialize in fixing these exact issues. Would you be open to a quick 5-minute chat this week?

Best,
Cole Fuller
RetroFit Web Design
"""

col_edit1, col_edit2 = st.columns([2, 1])

with col_edit1:
    template_subject = st.text_input("Subject Line:", value=default_subject)
    template_body = st.text_area("Email Body:", value=default_body, height=250)

with col_edit2:
    st.markdown("#### Live Preview")
    preview_lead = batch_df.iloc[0] if not batch_df.empty else None
    if preview_lead is not None:
        p_name = preview_lead.get("Business Name", "Contractor")
        raw_city = preview_lead.get("City")
        if pd.isna(raw_city) or not str(raw_city).strip() or str(raw_city) == "nan":
            p_city = "your area"
        else:
            p_city = str(raw_city)
            
        raw_website = preview_lead.get("Website")
        p_website = str(raw_website) if pd.notna(raw_website) and raw_website else "No Website"
            
        p_subj = template_subject.replace("{{Business Name}}", str(p_name)).replace("{{City}}", str(p_city)).replace("{{Website}}", p_website)
        p_body = template_body.replace("{{Business Name}}", str(p_name)).replace("{{City}}", str(p_city)).replace("{{Website}}", p_website)
        
        st.caption(f"**To:** {preview_lead.get('Email')}")
        st.caption(f"**Subject:** {p_subj}")
        st.markdown(f"> {p_body.replace(chr(10), '<br>')}", unsafe_allow_html=True)

st.divider()

render_icon_heading("paper-plane-right", "3. Launch Campaign", "Dispatch emails sequentially via SMTP", badge_color="orange")

smtp_cfg = get_smtp_config()
st.caption(f"Using SMTP Sender: `{smtp_cfg['username'] or 'Not configured'}`")

if st.button(f"Launch Campaign to {len(batch_df)} Leads", type="primary", width='stretch', disabled=batch_df.empty):
    if not smtp_cfg["username"]:
        st.error("Cannot launch: SMTP credentials are not configured in your .env file.")
    else:
        st.warning("Campaign Started! Please leave this page open until the progress bar completes.")
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        leads_list = batch_df.to_dict('records')
        success_count = 0
        error_count = 0
        
        for idx, lead in enumerate(leads_list):
            progress = (idx + 1) / len(leads_list)
            
            b_name = str(lead.get("Business Name", "Contractor"))
            raw_city = lead.get("City")
            if pd.isna(raw_city) or not str(raw_city).strip() or str(raw_city) == "nan":
                b_city = "your area"
            else:
                b_city = str(raw_city)
            raw_website = lead.get("Website")
            b_website = str(raw_website) if pd.notna(raw_website) and raw_website else "No Website"
            target_email = str(lead.get("Email", ""))
            
            # Sub variables
            live_subj = template_subject.replace("{{Business Name}}", b_name).replace("{{City}}", b_city).replace("{{Website}}", b_website)
            live_body = template_body.replace("{{Business Name}}", b_name).replace("{{City}}", b_city).replace("{{Website}}", b_website)
            
            status_text.markdown(f"Sending to `{target_email}` ({idx+1}/{len(leads_list)})...")
            
            success, msg = send_pitch_email(target_email, live_subj, live_body)
            
            if success:
                success_count += 1
                update_lead_status(lead["ID"], "Pitched Email", f"Mass Campaign: {live_subj}")
            else:
                error_count += 1
                
            progress_bar.progress(progress)
            
            # Intentional delay to protect SMTP reputation and avoid spam filters
            if idx < len(leads_list) - 1:
                time.sleep(2.5)
                
        progress_bar.empty()
        status_text.empty()
        
        if success_count > 0:
            st.success(f"Campaign Complete! Successfully sent {success_count} emails and updated CRM statuses.")
        if error_count > 0:
            st.error(f"{error_count} emails failed to send. Check your SMTP limits.")
        
        st.rerun()
