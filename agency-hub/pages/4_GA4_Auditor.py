"""
RetroFit Growth Engine - Page 4: GA4 Page Performance Auditor
Ported from python-tools/ga4_page_analyzer.py. Connects to Google Analytics 4
to identify the worst-performing client pages (low engagement, drop-offs) and dispatch HTML alerts.
"""

import os
import streamlit as st
import pandas as pd
from dotenv import load_dotenv

from modules.brand_ui import apply_retrofit_theme, render_brand_header, render_icon_heading, ph_icon, LOGO_PATH
from modules.email_sender import send_pitch_email, get_smtp_config

st.set_page_config(
    page_title="GA4 Performance Auditor | RetroFit",
    page_icon=LOGO_PATH if os.path.exists(LOGO_PATH) else None,
    layout="wide"
)

apply_retrofit_theme()

render_brand_header(
    title="GA4 Client Performance Auditor",
    subtitle="Audit Google Analytics 4 traffic data to identify worst-performing pages, low engagement bottlenecks, and upsell optimization services.",
    badge_text="Analytics Engine"
)

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH)

# Config Inputs
col_conf1, col_conf2 = st.columns(2)
with col_conf1:
    default_prop = os.getenv("GA4_PROPERTY_ID", "")
    property_id = st.text_input("GA4 Property ID", value=default_prop, placeholder="e.g. 123456789")
with col_conf2:
    default_creds = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "")
    # Check for local json creds in data directory
    local_creds = os.path.join(os.path.dirname(__file__), "..", "data", "ga4-page-analyzer-9c195a13c8ae.json")
    if os.path.exists(local_creds) and not default_creds:
        default_creds = local_creds

    creds_path = st.text_input("Service Account JSON Path", value=default_creds)

run_ga4_btn = st.button("Fetch GA4 Engagement Report", type="primary", use_container_width=True)

if run_ga4_btn:
    if not property_id:
        st.warning("Please provide a GA4 Property ID.")
    else:
        if creds_path and os.path.exists(creds_path):
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = creds_path

        with st.spinner("Connecting to Google Analytics 4 Data API..."):
            try:
                from google.analytics.data_v1beta import BetaAnalyticsDataClient
                from google.analytics.data_v1beta.types import (
                    DateRange, Dimension, Metric, RunReportRequest,
                    FilterExpression, Filter, NumericValue
                )

                client = BetaAnalyticsDataClient()
                request = RunReportRequest(
                    property=f"properties/{property_id}",
                    dimensions=[Dimension(name="pagePath")],
                    metrics=[
                        Metric(name="screenPageViews"),
                        Metric(name="engagementRate"),
                        Metric(name="averageSessionDuration")
                    ],
                    date_ranges=[DateRange(start_date="30daysAgo", end_date="today")],
                    metric_filter=FilterExpression(
                        filter=Filter(
                            field_name="screenPageViews",
                            numeric_filter=Filter.NumericFilter(
                                operation=Filter.NumericFilter.Operation.GREATER_THAN,
                                value=NumericValue(int64_value=10)
                            )
                        )
                    )
                )

                response = client.run_report(request)

                data = []
                for row in response.rows:
                    data.append({
                        "Page Path": row.dimension_values[0].value,
                        "Views": int(row.metric_values[0].value),
                        "Engagement Rate": float(row.metric_values[1].value),
                        "Avg Session Duration": float(row.metric_values[2].value)
                    })

                df = pd.DataFrame(data)
                if not df.empty:
                    worst_pages = df.sort_values(by="Engagement Rate", ascending=True).head(10).reset_index(drop=True)
                    st.session_state["ga4_df"] = worst_pages
                    st.success(f"Loaded GA4 performance metrics for {len(df)} pages!")
                else:
                    st.info("No pages found with more than 10 views in the last 30 days.")
            except Exception as e:
                st.error(f"Failed to query GA4 Data API: {e}")

# Display GA4 Report Table
if "ga4_df" in st.session_state:
    df_worst = st.session_state["ga4_df"]
    render_icon_heading("chart-line-down", "Top 10 Worst-Performing Pages", "Pages experiencing lowest user engagement in the last 30 days", badge_color="orange")

    formatted_df = df_worst.copy()
    formatted_df["Engagement Rate"] = formatted_df["Engagement Rate"].map(lambda x: f"{x*100:.1f}%")
    formatted_df["Avg Session Duration"] = formatted_df["Avg Session Duration"].map(lambda x: f"{x:.1f}s")

    st.dataframe(formatted_df, use_container_width=True, hide_index=True)

    st.divider()

    # Send Alert Email via SMTP
    render_icon_heading("envelope-simple", "Dispatch GA4 Alert Email via SMTP", "Send formatted HTML performance report to client or team", badge_color="teal")
    smtp_cfg = get_smtp_config()
    default_recip = smtp_cfg["alert_recipient"] or smtp_cfg["username"]
    recipient = st.text_input("Alert Recipient Email", value=default_recip)

    if st.button("Send GA4 HTML Report Email", type="primary"):
        if not recipient:
            st.warning("Please provide a recipient email address.")
        else:
            table_html = formatted_df.to_html(index=False, border=1)
            html_content = f"""
            <html>
              <body style="font-family: Arial, sans-serif; background:#0d131f; color:#f8f5f0; padding:20px;">
                <h2 style="color: #de573c;">RetroFit GA4 Alert: Top 10 Lowest Engagement Pages</h2>
                <p>These pages are experiencing high bounce rates or low engagement over the past 30 days:</p>
                {table_html}
                <p style="margin-top:20px; color:#94a3b8;">Generated by RetroFit Growth Engine</p>
              </body>
            </html>
            """
            success, msg = send_pitch_email(recipient, "RetroFit Alert: Top 10 Worst-Performing GA4 Pages", html_content, is_html=True)
            if success:
                st.success(msg)
            else:
                st.error(msg)
