"""
RetroFit Growth Engine - Page 1: Lead Finder & Scraper
Finds local trade contractors, audits their websites, and ranks rescue opportunities.
Integrates python-tools scrapers for No-Website leads, Slow-Website leads, and Web Directory searches.
"""

import os
import streamlit as st
import pandas as pd
from dotenv import load_dotenv

from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.scraper import (
    search_contractors_web, batch_audit_candidates,
    run_no_website_scraper, run_slow_website_scraper
)
from modules.pipeline_store import save_lead, get_pipeline_df, update_lead_status
from modules.site_inspector import clean_domain_name

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH)

st.set_page_config(
    page_title="Lead Finder & Scraper | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="Local Contractor Lead Finder & Scraper",
    subtitle="Harvest trade businesses across US markets. Find contractors with NO website (new build) or SLOW/OUTDATED sites ($299 rescue).",
    badge_text="Lead Harvester"
)

# Input Configuration Modes
tab_no_web, tab_slow_web, tab_web_dir, tab_paste, tab_csv = st.tabs([
    "No-Website Leads (Maps)",
    "Slow Website Leads (PageSpeed)",
    "Web Directory Scraper",
    "Paste Domains",
    "Upload CSV"
])

# 1. No-Website Leads Scraper (from python-tools/no_website_leads.py)
with tab_no_web:
    render_icon_heading("map-pin-line", "Find Businesses With No Website", "Scrapes Google Places for contractors without websites — perfect for new site builds", badge_color="orange")
    st.caption("Scrapes Google Places for local contractors with active phone numbers and reviews, but zero website presence. Perfect for $499 New Website Builds!")
    
    col_nw1, col_nw2, col_nw3 = st.columns([2, 1, 1])
    with col_nw1:
        nw_keyword = st.text_input("Search Keyword", value=os.getenv("SEARCH_KEYWORD", "plumbers in maple grove"), key="nw_kw")
    with col_nw2:
        nw_state = st.text_input("Filter State (optional)", value=os.getenv("TARGET_STATE", "MN"), key="nw_st")
    with col_nw3:
        nw_pages = st.slider("Pages to crawl", 1, 3, 2, key="nw_pg")

    if st.button("Run No-Website Scraper", type="primary", key="btn_run_nw"):
        status_box = st.empty()
        with st.spinner("Querying Google Places API and searching for email contacts..."):
            found = run_no_website_scraper(
                keyword=nw_keyword,
                target_state=nw_state,
                max_pages=nw_pages,
                progress_callback=lambda msg: status_box.markdown(f"`{msg}`")
            )
            status_box.empty()
            if found:
                st.success(f"Found and saved {len(found)} NO-WEBSITE leads directly to your database!")
                st.session_state["recent_found_leads"] = found
            else:
                st.warning("No new leads found (or Places API key missing in .env). Check your configuration.")

# 2. Slow-Website Leads Scraper (from python-tools/scraper.py)
with tab_slow_web:
    render_icon_heading("gauge", "Find Slow Website Leads", "Scrapes Google Places and audits PageSpeed to flag slow mobile sites (< 50)", badge_color="teal")

    col_sw1, col_sw2, col_sw3 = st.columns([2, 1, 1])
    with col_sw1:
        sw_keyword = st.text_input("Search Keyword", value="roofing in minneapolis", key="sw_kw")
    with col_sw2:
        sw_state = st.text_input("Filter State", value=os.getenv("TARGET_STATE", "MN"), key="sw_st")
    with col_sw3:
        sw_thresh = st.slider("Max Speed Score", 10, 60, 50, key="sw_th")

    if st.button("Run Slow Website Scraper", type="primary", key="btn_run_sw"):
        status_box = st.empty()
        with st.spinner("Testing contractor websites with Google PageSpeed..."):
            found_slow = run_slow_website_scraper(
                keyword=sw_keyword,
                target_state=sw_state,
                threshold=sw_thresh,
                max_pages=2,
                progress_callback=lambda msg: status_box.markdown(f"`{msg}`")
            )
            status_box.empty()
            if found_slow:
                st.success(f"Found and saved {len(found_slow)} SLOW WEBSITE leads to your database!")
                st.session_state["recent_found_leads"] = found_slow
            else:
                st.warning("No slow websites found matching those criteria or API key missing.")

# 3. Web Directory Scraper
with tab_web_dir:
    render_icon_heading("globe", "Web Directory & Mobile UX Auditor", "Zero-API search across trade directories with full mobile UX audit", badge_color="orange")
    
    search_col1, search_col2, search_col3 = st.columns([2, 2, 1])
    with search_col1:
        trade_options = [
            "Plumbing", "Roofing", "HVAC / Heating & Air", "Electrical",
            "Landscaping", "Handyman & Remodeling", "House Cleaning",
            "Painting", "Auto Detailing & Repair", "Tree Service"
        ]
        selected_trade = st.selectbox("Select Trade / Service", trade_options, index=1)
    with search_col2:
        target_city = st.text_input("Target City & State", value="Minneapolis, MN", placeholder="e.g. Dallas, TX or Orlando, FL")
    with search_col3:
        lead_limit = st.slider("Max Results", min_value=5, max_value=25, value=10, step=5)

    search_btn = st.button("Search & Scrape Directory", type="primary", use_container_width=True)
    if search_btn:
        with st.spinner(f"Searching web directories for {selected_trade} in {target_city}..."):
            raw_candidates = search_contractors_web(selected_trade, target_city, limit=lead_limit)
            if raw_candidates:
                st.session_state["raw_candidates"] = raw_candidates
                st.success(f"Found {len(raw_candidates)} contractor domains! Starting live site inspections...")
            else:
                st.warning("No listings found with that query. Try another city or trade.")

# 4. Paste Domains
with tab_paste:
    render_icon_heading("clipboard-text", "Batch Audit Pasted Domains", "Paste contractor domains (one per line) to batch-audit their rescue scores", badge_color="teal")
    pasted_domains = st.text_area(
        "Domains",
        placeholder="twin-cities-plumbing.com\nlegacyhvacpros.com\ndallasroofingcrew.com",
        height=140
    )
    custom_trade = st.text_input("Trade label for these domains", value="Contractor")
    paste_btn = st.button("Audit Pasted Domains", type="primary")
    if paste_btn and pasted_domains.strip():
        lines = [line.strip() for line in pasted_domains.strip().split("\n") if line.strip()]
        st.session_state["raw_candidates"] = [
            {"website": u, "domain": clean_domain_name(u), "trade": custom_trade, "city": ""}
            for u in lines
        ]

# 5. Upload CSV
with tab_csv:
    render_icon_heading("file-arrow-up", "Upload CSV Lead List", "Upload a CSV file containing contractor URLs (must have a 'website' or 'url' column)", badge_color="orange")
    uploaded_file = st.file_uploader("Choose CSV file", type=["csv"])
    if uploaded_file is not None:
        try:
            up_df = pd.read_csv(uploaded_file)
            url_col = next((c for c in up_df.columns if c.lower() in ["website", "url", "domain", "site"]), None)
            name_col = next((c for c in up_df.columns if c.lower() in ["name", "business name", "company"]), None)
            if url_col:
                st.write(f"Detected URL column: **{url_col}** ({len(up_df)} rows)")
                if st.button("Audit CSV Leads", type="primary"):
                    st.session_state["raw_candidates"] = [
                        {
                            "website": str(row[url_col]),
                            "business_name": str(row[name_col]) if name_col else "",
                            "domain": clean_domain_name(str(row[url_col])),
                            "trade": "Contractor",
                            "city": ""
                        }
                        for _, row in up_df.iterrows() if pd.notna(row[url_col])
                    ][:30]
            else:
                st.error("Could not find a 'website' or 'url' column in this CSV.")
        except Exception as e:
            st.error(f"Error reading CSV: {e}")

# If we have candidates to audit from directory/paste/csv, process them
if "raw_candidates" in st.session_state and st.session_state["raw_candidates"]:
    candidates = st.session_state["raw_candidates"]
    progress_bar = st.progress(0.0)
    status_text = st.empty()

    def update_progress(curr, total, name):
        progress_bar.progress(curr / total)
        status_text.markdown(f"Auditing **{curr}/{total}:** `{name}`...")

    results_df = batch_audit_candidates(candidates, progress_callback=update_progress)
    status_text.empty()
    progress_bar.empty()
    st.session_state["audited_df"] = results_df
    st.session_state["raw_candidates"] = []

st.divider()

# Display Current Database Leads / Scraped Leads
render_icon_heading("database", "Live Leads Database", "All scraped leads are automatically stored in SQLite leads.db", badge_color="teal")

pipe_df = get_pipeline_df()

if not pipe_df.empty:
    col_f1, col_f2 = st.columns([2, 1])
    with col_f1:
        type_filter = st.multiselect(
            "Filter by Lead Type",
            options=list(pipe_df["Lead Type"].unique()),
            default=list(pipe_df["Lead Type"].unique())
        )
    with col_f2:
        min_score = st.slider("Minimum Rescue Score", 0, 100, 30)

    filtered_df = pipe_df[
        (pipe_df["Lead Type"].isin(type_filter)) &
        (pipe_df["Rescue Score"] >= min_score)
    ]

    display_cols = ["Rescue Score", "Business Name", "Notes", "Lead Type", "Phone", "Email", "Domain", "Status", "Date Found"]
    
    # Store selection in session state or derive from table event
    table_event = st.dataframe(
        filtered_df[[c for c in display_cols if c in filtered_df.columns]],
        use_container_width=True,
        hide_index=True,
        selection_mode="single-row",
        on_select="rerun",
        key="lead_table_event",
        column_config={
            "Rescue Score": st.column_config.ProgressColumn(
                "Rescue Score",
                format="%d/100",
                min_value=0,
                max_value=100,
                width="small"
            ),
            "Business Name": st.column_config.TextColumn("Business Name", width="medium"),
            "Notes": st.column_config.TextColumn(
                "Notes & Audit Flaws",
                width="large",
                help="Audit findings, PageSpeed scores, and rescue opportunities"
            ),
            "Lead Type": st.column_config.TextColumn("Lead Type", width="medium"),
            "Phone": st.column_config.TextColumn("Phone", width="small"),
            "Email": st.column_config.TextColumn("Email", width="small"),
            "Domain": st.column_config.TextColumn("Domain", width="small"),
            "Status": st.column_config.TextColumn("Status", width="small"),
            "Date Found": st.column_config.TextColumn("Date Found", width="small"),
        }
    )

    st.caption("💡 **Tip:** Click any row in the table above to view its full notes and audit findings below.")

    # Determine selected lead from table click or default to index 0
    selected_table_idx = 0
    if table_event and hasattr(table_event, "selection") and table_event.selection and table_event.selection.rows:
        selected_table_idx = table_event.selection.rows[0]
        if selected_table_idx >= len(filtered_df):
            selected_table_idx = 0

    lead_options = [f"{row['Business Name']} ({row['Domain']})" for _, row in filtered_df.iterrows()]
    
    # Lead Dossier & Full Notes Viewer
    st.markdown("---")
    render_icon_heading("notepad", "Contractor Dossier & Full Audit Notes", "Inspect full unclipped notes, speed scores, and dispatch actions", badge_color="orange")

    dossier_col_select, dossier_col_export = st.columns([2.5, 1])
    with dossier_col_select:
        selected_lead_str = st.selectbox(
            "Select Contractor:",
            lead_options,
            index=selected_table_idx if selected_table_idx < len(lead_options) else 0,
            key="lead_detail_selector"
        )
    with dossier_col_export:
        st.write("")
        st.write("")
        csv_data = filtered_df.to_csv(index=False).encode("utf-8")
        st.download_button(
            label="Export Filtered Leads (CSV)",
            data=csv_data,
            file_name="retrofit_contractor_leads.csv",
            mime="text/csv",
            use_container_width=True
        )

    if lead_options and selected_lead_str:
        current_idx = lead_options.index(selected_lead_str)
        current_row = filtered_df.iloc[current_idx].to_dict()
        lead_id = current_row.get("ID")
        notes_text = current_row.get("Notes") or ""

        # Rich Details Card
        with st.container(border=True):
            det_head_col1, det_head_col2, det_head_col3 = st.columns([2, 1, 1])
            with det_head_col1:
                st.markdown(f"### {current_row.get('Business Name', 'Contractor')}")
                st.caption(f"**Lead Type:** `{current_row.get('Lead Type', 'N/A')}` | **Domain:** `{current_row.get('Domain', 'No Website')}`")
            with det_head_col2:
                st.metric("Rescue Score", f"{current_row.get('Rescue Score', 0)}/100")
            with det_head_col3:
                st.metric("Status", current_row.get("Status", "New"))

            st.write("")
            st.markdown("##### 📝 Full Notes & Audit Findings:")
            if notes_text.strip():
                st.info(notes_text)
            else:
                st.warning("No notes recorded yet for this contractor.")

            # Quick contact row
            info_col1, info_col2, info_col3 = st.columns(3)
            with info_col1:
                st.markdown(f"📞 **Phone:** `{current_row.get('Phone', 'N/A')}`")
            with info_col2:
                st.markdown(f"✉️ **Email:** `{current_row.get('Email', 'Not Found')}`")
            with info_col3:
                st.markdown(f"📍 **Address:** `{current_row.get('Address', 'Local Area')}`")

            # Inline note update expander
            with st.expander("✏️ Edit or Add to Notes for this Lead", expanded=False):
                edit_notes_val = st.text_area("Edit Notes", value=notes_text, height=80, key=f"edit_notes_{lead_id}_{current_idx}")
                if st.button("Save Updated Notes", key=f"btn_save_notes_{lead_id}_{current_idx}"):
                    if lead_id:
                        update_lead_status(lead_id, current_row.get("Status", "New"), notes=edit_notes_val)
                        st.success("Notes updated in database!")
                        st.rerun()
                    else:
                        st.warning("Cannot save notes for an unsaved record.")

            st.divider()

            # Actions Bar
            act_col1, act_col2, act_col3 = st.columns(3)
            with act_col1:
                if st.button("Draft Cold Outreach Pitch ➔", type="primary", use_container_width=True, key=f"btn_pitch_{current_idx}"):
                    st.session_state["selected_lead_data"] = current_row
                    st.session_state["selected_url"] = current_row.get("Website") or ""
                    st.switch_page("pages/2_Pitch_Drafter.py")
            with act_col2:
                if st.button("Create Postcard Mailer ➔", use_container_width=True, key=f"btn_card_{current_idx}"):
                    st.session_state["selected_lead_data"] = current_row
                    st.switch_page("pages/5_Postcard_Mailers.py")
            with act_col3:
                web_url = current_row.get("Website")
                if web_url and web_url.startswith("http"):
                    st.link_button("Visit Contractor Site ↗", url=web_url, use_container_width=True)
                else:
                    gmap_query = f"https://www.google.com/maps/search/{current_row.get('Business Name', '')}+{current_row.get('Address', '')}".replace(" ", "+")
                    st.link_button("Search on Google Maps ↗", url=gmap_query, use_container_width=True)

