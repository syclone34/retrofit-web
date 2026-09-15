"""
RetroFit Growth Engine - Page 5: Postcard Mailers & Direct Mail Command
Personalize, preview, batch-export, and dispatch physical postcard mailers
to local trade contractors via Lob/PostGrid API or commercial print-ready PDFs.
"""

import os
import streamlit as st
import pandas as pd
from dotenv import load_dotenv

from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.pipeline_store import get_pipeline_df, update_lead_status
from modules.postcard_engine import (
    generate_postcard_back, get_postcard_front, get_default_copy,
    generate_single_postcard_pdf, generate_batch_postcards_pdf,
    export_mailing_csv, dispatch_postcard_api, parse_usps_address
)

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH, override=True)

st.set_page_config(
    page_title="Postcard Mailers | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="Contractor Postcard Mailers",
    subtitle="Design, preview, batch-export, and dispatch physical postcard mailers directly to local trade contractors.",
    badge_text="Direct Mail Command"
)

df_leads = get_pipeline_df()

# Compute Direct Mail Stats
total_leads = len(df_leads)
has_address = len(df_leads[df_leads["Address"].notna() & (df_leads["Address"] != "")]) if total_leads > 0 else 0
sent_mailers = len(df_leads[df_leads["Status"].str.contains("Postcard", case=False, na=False)]) if total_leads > 0 else 0

m1, m2, m3, m4 = st.columns(4)
with m1:
    st.metric("Total Contractor Leads", total_leads)
with m2:
    st.metric("Leads with Valid Address", has_address)
with m3:
    st.metric("Postcards Dispatched", sent_mailers)
with m4:
    st.metric("Postage Rate (Lob / USPS)", "$0.72 / unit", "USPS First-Class")

st.write("")
is_live = st.toggle("🚨 **Enable Live Production Mode (Real API Dispatch)**", value=st.session_state.get("postcard_live_mode", False), key="postcard_live_mode")

tab_single, tab_batch, tab_settings = st.tabs([
    "Single Prospect Mailer",
    "Batch Export & Printing",
    "Direct Mail API Settings"
])

# ==========================================
# TAB 1: SINGLE PROSPECT MAILER
# ==========================================
with tab_single:
    render_icon_heading("postcard", "Personalize & Preview Single Mailer", "Select a lead to generate a live print-ready preview", badge_color="orange")

    source_col1, source_col2 = st.columns([2, 1])
    with source_col1:
        lead_mode = st.radio("Lead Source:", ["Select from Database Leads", "Custom Manual Entry"], horizontal=True)

    selected_lead = {}
    if lead_mode == "Select from Database Leads":
        if df_leads.empty:
            st.info("No leads in pipeline. Use Lead Finder to harvest prospects or choose Custom Manual Entry.")
        else:
            lead_choices = [
                f"#{row['ID']} - {row['Business Name']} | {row.get('Address') or 'No Address'} ({row.get('Lead Type', 'Contractor')})"
                for _, row in df_leads.iterrows()
            ]
            picked = st.selectbox("Choose Contractor:", lead_choices)
            picked_id = int(picked.split(" - ")[0].replace("#", ""))
            selected_lead = df_leads[df_leads["ID"] == picked_id].iloc[0].to_dict()
    else:
        selected_lead = {
            "ID": None,
            "Business Name": "Summit Heating & Air",
            "Address": "7820 Brooklyn Blvd, Minneapolis, MN 55443",
            "Phone": "(612) 555-0144",
            "Website": "summitheatingmn.com",
            "Lead Type": "Slow Website",
            "City": "Minneapolis"
        }

    # Card Type Selection & Edit Fields
    col_type, col_bname, col_addr = st.columns([1, 1, 2])
    with col_type:
        default_idx = 1 if "No Website" in selected_lead.get("Lead Type", "") else 0
        card_type_label = st.selectbox(
            "Campaign Offer:",
            ["$299 Website Rescue (Slow/Outdated Sites)", "$499 New Website Build (No Website Sites)"],
            index=default_idx
        )
        card_type = "NEW_BUILD" if "499" in card_type_label else "RESCUE_48H"
    with col_bname:
        b_name = st.text_input("Business Name:", value=selected_lead.get("Business Name", ""))
        selected_lead["Business Name"] = b_name
    with col_addr:
        b_addr = st.text_input("Mailing Address (Street, City, State ZIP):", value=selected_lead.get("Address", ""))
        selected_lead["Address"] = b_addr

    # Interactive Postcard Copy & Messaging Editor
    session_copy_key = f"postcard_copy_{selected_lead.get('ID') or 'custom'}_{card_type}"
    default_copy = get_default_copy(selected_lead, card_type=card_type)
    if session_copy_key not in st.session_state:
        st.session_state[session_copy_key] = default_copy.copy()
    cur_copy = st.session_state[session_copy_key]

    with st.expander("Edit Postcard Copy, Headlines & QR Code Messaging", expanded=False):
        st.caption("Customize any text printed on the postcard back. Changes instantly update the live preview and downloadable PDF.")
        
        c_col1, c_col2 = st.columns(2)
        with c_col1:
            cur_copy["headline"] = st.text_input("Main Headline:", value=cur_copy.get("headline", ""))
            cur_copy["headline_sub"] = st.text_input("Subheadline (optional):", value=cur_copy.get("headline_sub", ""))
            cur_copy["greeting"] = st.text_input("Greeting Line:", value=cur_copy.get("greeting", ""))
            cur_copy["p1"] = st.text_input("Body Line 1:", value=cur_copy.get("p1", ""))
            cur_copy["p2"] = st.text_input("Body Line 2:", value=cur_copy.get("p2", ""))
            cur_copy["p3"] = st.text_input("Body Line 3:", value=cur_copy.get("p3", ""))

        with c_col2:
            cur_copy["offer_title"] = st.text_input("Offer Section Title:", value=cur_copy.get("offer_title", ""))
            cur_copy["bullet1"] = st.text_input("Bullet 1:", value=cur_copy.get("bullet1", ""))
            cur_copy["bullet2"] = st.text_input("Bullet 2:", value=cur_copy.get("bullet2", ""))
            cur_copy["bullet3"] = st.text_input("Bullet 3:", value=cur_copy.get("bullet3", ""))
            cur_copy["bullet4"] = st.text_input("Bullet 4:", value=cur_copy.get("bullet4", ""))
            cur_copy["cta_line1"] = st.text_input("Call to Action Phone:", value=cur_copy.get("cta_line1", ""))
            cur_copy["cta_line2"] = st.text_input("Call to Action Web:", value=cur_copy.get("cta_line2", ""))

        qr_col1, qr_col2, qr_col3 = st.columns(3)
        with qr_col1:
            cur_copy["qr_heading"] = st.text_input("QR Code Badge Title:", value=cur_copy.get("qr_heading", "SCAN WITH PHONE"))
        with qr_col2:
            cur_copy["qr_sub1"] = st.text_input("QR Subtext Line 1:", value=cur_copy.get("qr_sub1", "Visit RetroFit"))
        with qr_col3:
            cur_copy["qr_sub2"] = st.text_input("QR Subtext Line 2:", value=cur_copy.get("qr_sub2", "webdesign.com"))
            
        cur_copy["qr_url"] = st.text_input("QR Code Target URL:", value=cur_copy.get("qr_url", "https://retrofitwebdesign.com"))

        if st.button("Reset Copy to Campaign Default", key=f"btn_reset_{session_copy_key}"):
            st.session_state[session_copy_key] = default_copy.copy()
            st.rerun()

    custom_copy = cur_copy

    st.write("")

    # Live Side-by-Side Postcard Preview
    st.markdown("#### Live Print Preview (Front & Back)")
    col_front, col_back = st.columns(2)

    with col_front:
        st.caption("FRONT (Commercial Artwork)")
        front_img = get_postcard_front(card_type)
        st.image(front_img, caption=f"Front: {card_type_label}", use_container_width=True)

    with col_back:
        st.caption("BACK (Personalized Letter, QR Code & USPS Address Block)")
        back_img = generate_postcard_back(selected_lead, card_type=card_type, custom_copy=custom_copy)
        st.image(back_img, caption=f"Back: Personalized for {b_name}", use_container_width=True)

    # Action Toolbar
    st.divider()
    act_col1, act_col2, act_col3 = st.columns([1, 1, 1])

    with act_col1:
        pdf_bytes = generate_single_postcard_pdf(selected_lead, card_type=card_type, custom_copy=custom_copy)
        safe_biz = "".join(c for c in b_name if c.isalnum() or c in (' ', '_', '-')).strip().replace(' ', '_')
        st.download_button(
            label="Download Print-Ready PDF",
            data=pdf_bytes,
            file_name=f"retrofit_postcard_{safe_biz or 'lead'}.pdf",
            mime="application/pdf",
            use_container_width=True
        )

    with act_col2:
        is_live = st.session_state.get("postcard_live_mode", False)
        has_postgrid = bool(os.getenv("POSTGRID_API_KEY", ""))
        provider = "PostGrid" if has_postgrid else "Lob"
        api_btn_label = f"Dispatch via {provider} API ($0.72)" if is_live else f"Dispatch {provider} Test Mailer"
        if st.button(api_btn_label, type="primary", use_container_width=True):
            with st.spinner("Submitting postcard order to direct mail service..."):
                res = dispatch_postcard_api(selected_lead, card_type=card_type, custom_copy=custom_copy, live_mode=is_live)
                if res["success"]:
                    st.success(f"{res['message']}")
                    st.info(f"Tracking ID: `{res['tracking_id']}` • Est Delivery: **{res['expected_delivery']}** • Cost: **{res['cost']}**")
                    st.rerun()
                else:
                    st.error(f"Failed to dispatch: {res['message']}")

    with act_col3:
        if st.button("Mark as Sent in CRM Pipeline", use_container_width=True):
            lead_id = selected_lead.get("ID")
            if lead_id:
                update_lead_status(lead_id, "Postcard Sent", f"Postcard mailer ({card_type_label}) dispatched to {b_addr}")
                st.success(f"Updated status for #{lead_id} to 'Postcard Sent'!")
                st.rerun()
            else:
                st.warning("Cannot update CRM status for manual entry without a database ID.")

# ==========================================
# TAB 2: BATCH EXPORT & PRINTING
# ==========================================
with tab_batch:
    render_icon_heading("stack", "Batch Mailer Generator & Commercial Export", "Generate print-ready PDFs and Avery/VistaPrint CSVs for bulk direct mail campaigns", badge_color="teal")

    if df_leads.empty:
        st.info("No leads available in pipeline to batch export.")
    else:
        # Filter leads & campaign offer
        b_filter_col1, b_filter_col2, b_filter_col3 = st.columns([1.5, 1.5, 1])
        with b_filter_col1:
            lead_types = ["All"] + sorted(list(df_leads["Lead Type"].dropna().unique()))
            chosen_type = st.selectbox("Filter by Lead Type:", lead_types)
        with b_filter_col2:
            batch_offer = st.selectbox(
                "Campaign Card Type:",
                ["$299 Website Rescue (Slow/Outdated Sites)", "$499 New Website Build (No Website)"]
            )
            batch_card_type = "NEW_BUILD" if "499" in batch_offer else "RESCUE_48H"
        with b_filter_col3:
            st.write("")
            only_with_addr = st.checkbox("Physical address only", value=True)

        batch_df = df_leads.copy()
        if chosen_type != "All":
            batch_df = batch_df[batch_df["Lead Type"] == chosen_type]
        if only_with_addr:
            batch_df = batch_df[batch_df["Address"].notna() & (batch_df["Address"] != "") & (batch_df["Address"] != "N/A")]

        st.caption(f"Showing **{len(batch_df)}** contractor candidates for direct mail ({batch_offer.split(' (')[0]}).")

        st.dataframe(
            batch_df[["ID", "Business Name", "Address", "Lead Type", "Phone", "Status", "Rescue Score"]],
            use_container_width=True,
            hide_index=True
        )

        st.divider()

        # Batch Download Bar
        batch_col1, batch_col2, batch_col3 = st.columns([1, 1, 1])

        batch_leads_list = [r.to_dict() for _, r in batch_df.iterrows()]

        with batch_col1:
            st.markdown("##### 1. Combined Print PDF")
            st.caption(f"Generates all {len(batch_df)} cards into one commercial printable PDF (Front + Back pairs).")
            if len(batch_leads_list) > 0:
                batch_pdf = generate_batch_postcards_pdf(batch_leads_list, card_type=batch_card_type)
                st.download_button(
                    label=f"Download {len(batch_leads_list)}-Card PDF ({batch_card_type})",
                    data=batch_pdf,
                    file_name=f"retrofit_batch_postcards_{batch_card_type.lower()}.pdf",
                    mime="application/pdf",
                    use_container_width=True
                )

        with batch_col2:
            st.markdown("##### 2. Mailing Labels CSV")
            st.caption("Standard direct-mail format for Avery 5160 labels, USPS EDDM, and VistaPrint upload.")
            if len(batch_leads_list) > 0:
                csv_labels = export_mailing_csv(batch_leads_list)
                st.download_button(
                    label="Export VistaPrint / Avery CSV",
                    data=csv_labels.encode("utf-8"),
                    file_name="retrofit_mailing_labels.csv",
                    mime="text/csv",
                    use_container_width=True
                )

        with batch_col3:
            st.markdown("##### 3. Batch API Send")
            est_cost = len(batch_leads_list) * 0.72
            st.caption(f"Estimated USPS First-Class postage: **${est_cost:.2f}** ({len(batch_leads_list)} @ $0.72)")
            if st.button("Queue All via Direct Mail API", type="primary", use_container_width=True):
                success_count = 0
                progress_box = st.progress(0.0)
                status_box = st.empty()

                for idx, l in enumerate(batch_leads_list):
                    progress_box.progress((idx + 1) / len(batch_leads_list))
                    status_box.markdown(f"Queueing: `{l.get('Business Name')}`...")
                    dispatch_postcard_api(l, card_type=batch_card_type, live_mode=is_live)
                    success_count += 1

                progress_box.empty()
                status_box.empty()
                st.success(f"Successfully dispatched and updated {success_count} postcard orders in leads.db!")
                st.rerun()

# ==========================================
# TAB 3: DIRECT MAIL API SETTINGS & LOG
# ==========================================
with tab_settings:
    render_icon_heading("gear", "Direct Mail Provider Configuration", "Connect Lob, PostGrid, or Click2Mail for automated fulfillment", badge_color="orange")

    cur_lob_key = os.getenv("LOB_API_KEY", "")
    cur_postgrid_key = os.getenv("POSTGRID_API_KEY", "")
    
    col_k1, col_k2 = st.columns([2, 1])
    with col_k1:
        new_postgrid_key = st.text_input(
            "PostGrid API Key (test_... or live_...):",
            value=cur_postgrid_key,
            type="password",
            placeholder="live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        )
        if new_postgrid_key:
            os.environ["POSTGRID_API_KEY"] = new_postgrid_key
        st.caption("Get your API key at [postgrid.com](https://postgrid.com). (Primary provider)")
        
        new_lob_key = st.text_input(
            "Lob API Secret Key (test_... or live_...):",
            value=cur_lob_key,
            type="password",
            placeholder="live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        )
        if new_lob_key:
            os.environ["LOB_API_KEY"] = new_lob_key
        st.caption("Get your API key at [lob.com](https://lob.com). (Fallback provider)")
    
    with col_k2:
        if is_live:
            st.warning("LIVE MODE ACTIVE: Real credit card charges and real physical mail printing enabled.")
        else:
            st.info("TEST / SANDBOX MODE: Safe sandbox simulations with zero credit card charges.")

    st.divider()

    # Recent Mailer Activity Log
    render_icon_heading("clock-counter-clockwise", "Recent Postcard Dispatch History", "Contractor leads with active postcard orders in leads.db", badge_color="teal")

    sent_df = df_leads[df_leads["Status"].str.contains("Postcard", case=False, na=False)]
    if sent_df.empty:
        st.info("No postcards dispatched yet. Use the Single Prospect Mailer or Batch Export tabs to queue orders.")
    else:
        st.dataframe(
            sent_df[["ID", "Business Name", "Address", "Phone", "Status", "Notes"]],
            use_container_width=True,
            hide_index=True
        )
