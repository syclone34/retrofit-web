"""
RetroFit Growth Engine - Command Center
Automated Lead Finder, Site Inspector & Cold Outreach Pitch Drafter for RetroFit Web Design
"""

import os
import streamlit as st
import pandas as pd
from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.pipeline_store import get_pipeline_df
from modules.site_inspector import inspect_site

st.set_page_config(
    page_title="RetroFit Growth Engine | Command Center",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide",
    initial_sidebar_state="expanded",
)

# Apply Authentic RetroFit Design System & Logo
apply_retrofit_theme()

# Brand Header Banner
render_brand_header(
    title="RetroFit Growth Engine",
    subtitle="Your website doesn't need a rebuild — it needs a rescue. Internal agency toolkit for contractor lead harvesting, mobile flaw auditing, and $299 rescue outreach.",
    badge_text="RetroFit Command Center"
)

# Top Pipeline Metric Scorecards
df_pipeline = get_pipeline_df()
total_leads = len(df_pipeline)
pitched_leads = len(df_pipeline[df_pipeline["Status"].str.contains("Pitched", case=False, na=False)]) if total_leads > 0 else 0
high_opportunity = len(df_pipeline[df_pipeline["Rescue Score"] >= 70]) if total_leads > 0 and "Rescue Score" in df_pipeline.columns else 0

col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Total Tracked Leads", total_leads)
with col2:
    st.metric("Pitched Outreaches", pitched_leads)
with col3:
    st.metric("Prime Rescue Targets (≥70)", high_opportunity)
with col4:
    st.metric("Rescue Package Offer", "$299 Flat", "48–72h Turnaround")

st.write("")

# Quick-Start Navigation Cards
render_icon_heading("squares-four", "Agency Growth Modules", "Five integrated modules for pipeline expansion and outreach")

tool_col1, tool_col2, tool_col3, tool_col4, tool_col5 = st.columns(5)

with tool_col1:
    st.markdown("""
    <div style="background:#131c2b; border:1px solid rgba(240,235,216,0.1); border-radius:12px; padding:18px; margin-bottom:8px; min-height:165px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="icon-badge"><i class="ph-duotone ph-crosshair"></i></span>
            <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#f8f5f0;">Lead Finder</h4>
        </div>
        <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 10px 0;">Harvest trade contractors without websites or with slow sites across US metros.</p>
    </div>
    """, unsafe_allow_html=True)
    st.page_link("pages/1_Lead_Finder.py", label="Open Lead Finder", icon=":material/arrow_forward:")

with tool_col2:
    st.markdown("""
    <div style="background:#131c2b; border:1px solid rgba(240,235,216,0.1); border-radius:12px; padding:18px; margin-bottom:8px; min-height:165px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="icon-badge-teal"><i class="ph-duotone ph-paper-plane-tilt"></i></span>
            <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#f8f5f0;">Pitch Drafter</h4>
        </div>
        <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 10px 0;">Generate punchy 3-sentence pitches, SMS, and call scripts with direct SMTP sending.</p>
    </div>
    """, unsafe_allow_html=True)
    st.page_link("pages/2_Pitch_Drafter.py", label="Open Pitch Drafter", icon=":material/arrow_forward:")

with tool_col3:
    st.markdown("""
    <div style="background:#131c2b; border:1px solid rgba(240,235,216,0.1); border-radius:12px; padding:18px; margin-bottom:8px; min-height:165px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="icon-badge"><i class="ph-duotone ph-kanban"></i></span>
            <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#f8f5f0;">Pipeline CRM</h4>
        </div>
        <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 10px 0;">Track outreach stages, manage contact records in SQLite leads.db, and export CSV.</p>
    </div>
    """, unsafe_allow_html=True)
    st.page_link("pages/3_Pipeline.py", label="Open Pipeline CRM", icon=":material/arrow_forward:")

with tool_col4:
    st.markdown("""
    <div style="background:#131c2b; border:1px solid rgba(240,235,216,0.1); border-radius:12px; padding:18px; margin-bottom:8px; min-height:165px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="icon-badge-teal"><i class="ph-duotone ph-chart-line-up"></i></span>
            <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#f8f5f0;">GA4 Auditor</h4>
        </div>
        <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 10px 0;">Identify worst-performing client pages from Google Analytics 4 and dispatch alerts.</p>
    </div>
    """, unsafe_allow_html=True)
    st.page_link("pages/4_GA4_Auditor.py", label="Open GA4 Auditor", icon=":material/arrow_forward:")

with tool_col5:
    st.markdown("""
    <div style="background:#131c2b; border:1px solid rgba(240,235,216,0.1); border-radius:12px; padding:18px; margin-bottom:8px; min-height:165px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="icon-badge"><i class="ph-duotone ph-postcard"></i></span>
            <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#f8f5f0;">Postcards</h4>
        </div>
        <p style="color:#94a3b8; font-size:0.85rem; margin:0 0 10px 0;">Preview and send physical postcards via Lob API or export batch print PDFs.</p>
    </div>
    """, unsafe_allow_html=True)
    st.page_link("pages/5_Postcard_Mailers.py", label="Open Postcards", icon=":material/arrow_forward:")

st.divider()

# Quick Mini-Audit on Homepage
render_icon_heading("lightning", "Instant Single Site Check", "Audit any contractor domain on the fly")

test_col1, test_col2 = st.columns([3, 1])
with test_col1:
    quick_url = st.text_input("Enter contractor website URL", placeholder="e.g. acmeheatingmn.com", label_visibility="collapsed")
with test_col2:
    run_quick = st.button("Run Instant Audit", type="primary", width='stretch')

if run_quick and quick_url:
    with st.spinner("Auditing site for mobile UX, CMS, and tap-to-call..."):
        audit = inspect_site(quick_url)

    res_col1, res_col2, res_col3, res_col4 = st.columns(4)
    with res_col1:
        st.metric("Rescue Score", f"{audit['rescue_score']}/100", audit["lead_tier"])
    with res_col2:
        st.metric("Mobile Tap-to-Call", "Detected" if audit["has_click_to_call"] else "Missing")
    with res_col3:
        st.metric("SSL Security", "Secure (HTTPS)" if audit["ssl_secure"] else "Insecure (HTTP)")
    with res_col4:
        st.metric("CMS / Tech", audit["cms_platform"])

    if audit["flaws"]:
        st.warning("**Detected Conversion Flaws:**\n- " + "\n- ".join(audit["flaws"]))
    else:
        st.success("Clean: No critical mobile friction detected on this domain.")

    if st.button("Draft Outreach Pitch for this Site ➔"):
        st.session_state["selected_audit"] = audit
        st.session_state["selected_url"] = audit["url"]
        st.switch_page("pages/2_Pitch_Drafter.py")

st.markdown("---")
st.caption("RetroFit Web Design Internal System • Confidential Agency Tool • Created for Cole")
