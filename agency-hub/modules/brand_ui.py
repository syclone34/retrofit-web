"""
RetroFit Growth Engine - Brand UI Helper Module
Applies RetroFit's authentic design system (colors, typography, logo, Phosphor icons)
matching retrofitwebdesign.com
"""

import os
import streamlit as st

LOGO_PATH = os.path.join(os.path.dirname(__file__), "..", "assets", "logo.png")

RETROFIT_CSS = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- Phosphor Icons: Regular, Bold, Duotone & Fill matching retrofitwebdesign.com -->
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"/>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"/>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css"/>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css"/>

<style>
/* Root Fonts & Variables */
:root {
  --navy-950: #0a0d14;
  --navy-900: #0d131f;
  --navy-850: #131c2b;
  --navy-800: #172233;
  --cream-50: #f8f5f0;
  --cream-100: #f0ebd8;
  --orange-500: #de573c;
  --orange-400: #ff684a;
  --teal-500: #308882;
  --teal-400: #3caba3;
  --gold-500: #f3b23e;
}

/* Phosphor Icons Base */
i[class*="ph-"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(222, 87, 60, 0.15);
  border: 1px solid rgba(222, 87, 60, 0.35);
  color: #ff684a;
  font-size: 1.3rem;
  margin-right: 10px;
}

.icon-badge-teal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(48, 136, 130, 0.18);
  border: 1px solid rgba(48, 136, 130, 0.4);
  color: #3caba3;
  font-size: 1.3rem;
  margin-right: 10px;
}

/* Typography Overrides */
html, body, [class*="css"], .stMarkdown, p, div, label {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

h1, h2, h3, h4, h5, h6, [data-testid="stMetricLabel"], [data-testid="stMetricValue"] {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
}

/* Header Gradient */
.brand-title-gradient {
  background: linear-gradient(135deg, #ffffff 30%, #f0ebd8 65%, #de573c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.teal-gradient-text {
  background: linear-gradient(135deg, #3caba3 0%, #308882 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Primary Button Styling */
button[kind="primary"], .stButton > button[kind="primary"] {
  background: linear-gradient(135deg, #de573c 0%, #c94b32 100%) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 104, 74, 0.4) !important;
  box-shadow: 0 4px 14px rgba(222, 87, 60, 0.35) !important;
  font-weight: 700 !important;
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
}

button[kind="primary"]:hover, .stButton > button[kind="primary"]:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(222, 87, 60, 0.5) !important;
}

/* Secondary Button Styling */
button[kind="secondary"], .stButton > button:not([kind="primary"]) {
  background: #172233 !important;
  color: #f0ebd8 !important;
  border: 1px solid rgba(240, 235, 216, 0.15) !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
}

button[kind="secondary"]:hover, .stButton > button:not([kind="primary"]):hover {
  border-color: #308882 !important;
  background: #1b283d !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
}

/* Card Styling for Metrics & Containers */
div[data-testid="stMetric"] {
  background: #131c2b !important;
  border: 1px solid rgba(240, 235, 216, 0.1) !important;
  border-radius: 14px !important;
  padding: 16px 20px !important;
  box-shadow: 0 4px 12px rgba(10, 13, 20, 0.4) !important;
}

div[data-testid="stMetricValue"] {
  color: #f8f5f0 !important;
  font-size: 1.9rem !important;
}

div[data-testid="stMetricLabel"] {
  color: #94a3b8 !important;
  font-size: 0.85rem !important;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Dataframe & Tables */
div[data-testid="stDataFrame"] {
  border: 1px solid rgba(240, 235, 216, 0.12) !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

/* Custom Status Pills */
.pill-rescue {
  background: rgba(222, 87, 60, 0.15);
  color: #ff684a;
  border: 1px solid rgba(222, 87, 60, 0.4);
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pill-teal {
  background: rgba(48, 136, 130, 0.2);
  color: #3caba3;
  border: 1px solid rgba(48, 136, 130, 0.45);
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Sidebar styling */
section[data-testid="stSidebar"] {
  background-color: #0d131f !important;
  border-right: 1px solid rgba(240, 235, 216, 0.08) !important;
}
</style>
"""

def apply_retrofit_theme():
    """Inject RetroFit CSS and render the sidebar brand logo."""
    st.markdown(RETROFIT_CSS, unsafe_allow_html=True)
    
    # Sidebar Brand Branding
    with st.sidebar:
        if os.path.exists(LOGO_PATH):
            st.image(LOGO_PATH, width=170)
        else:
            st.markdown("### **RetroFit**")
        st.caption("Contractor Website Rescues & Growth")
        st.markdown(
            '<div style="margin-bottom:12px;"><span class="pill-rescue">48-72h Rescue Sprint</span> <span class="pill-teal">$299 Flat</span></div>',
            unsafe_allow_html=True
        )
        st.divider()

def ph_icon(name: str, style: str = "duotone", size: str = "1.2rem", color: str = None) -> str:
    """Generates an HTML snippet for a Phosphor icon matching retrofitwebdesign.com."""
    color_style = f"color: {color};" if color else ""
    return f'<i class="ph-{style} ph-{name}" style="font-size: {size}; {color_style} vertical-align: middle;"></i>'

def render_icon_heading(icon_name: str, title: str, subtitle: str = None, style: str = "duotone", badge_color: str = "orange"):
    """Renders a section heading with a Phosphor icon badge."""
    badge_cls = "icon-badge" if badge_color == "orange" else "icon-badge-teal"
    html = f"""
    <div style="display: flex; align-items: center; margin-top: 1rem; margin-bottom: 0.5rem;">
        <span class="{badge_cls}"><i class="ph-{style} ph-{icon_name}"></i></span>
        <div>
            <h3 style="margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.35rem; color: #f8f5f0;">{title}</h3>
            {f'<p style="margin: 0; font-size: 0.85rem; color: #94a3b8;">{subtitle}</p>' if subtitle else ''}
        </div>
    </div>
    """
    st.markdown(html, unsafe_allow_html=True)

def render_brand_header(title: str, subtitle: str, badge_text: str = "RetroFit Agency Command"):
    """Render a consistent, high-impact page header with logo & authentic typography."""
    col_logo, col_text = st.columns([1, 6])
    with col_logo:
        if os.path.exists(LOGO_PATH):
            st.image(LOGO_PATH, use_container_width=True)
    with col_text:
        st.markdown(f'<span class="pill-teal">{badge_text}</span>', unsafe_allow_html=True)
        st.markdown(f'<h1 class="brand-title-gradient" style="margin-top:4px; margin-bottom:4px;">{title}</h1>', unsafe_allow_html=True)
        st.markdown(f'<p style="color:#94a3b8; font-size:1.05rem; margin-top:0;">{subtitle}</p>', unsafe_allow_html=True)
    st.divider()
