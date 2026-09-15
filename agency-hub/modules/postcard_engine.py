"""
RetroFit Growth Engine - Postcard Mailer Engine
Handles direct mail postcard generation, live previews, QR code embedding,
commercial print-ready PDF export (Avery/VistaPrint), and automated API sending (Lob / PostGrid).
"""

import os
import io
import datetime
from urllib.parse import quote_plus
import requests
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
import qrcode
from dotenv import load_dotenv
import textwrap

from .pipeline_store import update_lead_status

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH, override=True)

POSTCARD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "assets", "postcards"))
LOGO_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "logo.png"))

FRONT_ASSETS = {
    "RESCUE_48H": os.path.join(POSTCARD_DIR, "postcard-refurbish-rescue.jpg"),
    "NEW_BUILD": os.path.join(POSTCARD_DIR, "postcard-new-builds.jpg"),
}

# Standard 4x6 ratio dimensions matching front JPGs
CARD_WIDTH = 1264
CARD_HEIGHT = 848

def get_font(font_name: str, size: int):
    """Safely loads a TTF font with fallback to default PIL font."""
    try:
        return ImageFont.truetype(font_name, size)
    except Exception:
        try:
            return ImageFont.truetype("arial.ttf", size)
        except Exception:
            return ImageFont.load_default()

def parse_usps_address(address_str: str) -> dict:
    """Parses freeform address string into street, city, state, zip."""
    if not address_str or address_str.strip() in ["N/A", "None", ""]:
        return {"street": "Local Service Contractor", "city": "Minneapolis", "state": "MN", "zip": "55401"}
    
    parts = [p.strip() for p in address_str.split(",") if p.strip()]
    
    if parts and parts[-1].upper() == "USA":
        parts.pop()
        
    if len(parts) >= 3:
        state_zip = parts[-1].split()
        state = state_zip[0] if len(state_zip) > 0 else "MN"
        zip_code = state_zip[1] if len(state_zip) > 1 else ""
        city = parts[-2]
        street = ", ".join(parts[:-2])
        return {"street": street, "city": city, "state": state, "zip": zip_code}
    elif len(parts) == 2:
        return {"street": parts[0], "city": parts[1], "state": "MN", "zip": ""}
    else:
        return {"street": address_str, "city": "Minneapolis", "state": "MN", "zip": ""}

def generate_qr_code(url: str, size: int = 150) -> Image.Image:
    """Generates a high-contrast QR code image."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=1,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img_qr = qr.make_image(fill_color="#0a0e17", back_color="#ffffff").convert("RGB")
    return img_qr.resize((size, size), Image.Resampling.LANCZOS)

def get_default_copy(lead: dict, card_type: str = "RESCUE_48H") -> dict:
    """Returns the default marketing copy dict for a contractor lead."""
    biz_name = lead.get("Business Name") or "Local Business Owner"
    addr_info = parse_usps_address(lead.get("Address", ""))
    city = lead.get("City") or addr_info.get("city") or "your area"

    if card_type == "NEW_BUILD" or "No Website" in lead.get("Lead Type", ""):
        return {
            "headline": f"Ready for more local jobs in {city}?",
            "headline_sub": "",
            "greeting": f"Hey {biz_name} team,",
            "p1": f"We noticed {biz_name} is actively working jobs in {city}, but",
            "p2": "does not have a modern mobile website listed online.",
            "p3": "Homeowners on Google are hiring competitors they can click to call.",
            "offer_title": "WHAT WE BUILD FOR YOU IN 72 HOURS:",
            "bullet1": "• 100% Mobile-first layout with 1-tap phone dialer",
            "bullet2": "• Instant SMS lead alert system straight to your phone",
            "bullet3": "• Full Google Maps & local SEO foundation included",
            "bullet4": "• Flat rate, zero confusing agency contracts",
            "cta_line1": "Call or text Cole directly at (612) 516-3145",
            "cta_line2": "Visit retrofitwebdesign.com to view packages & pricing.",
            "qr_heading": "SCAN WITH PHONE",
            "qr_sub1": "Visit RetroFit",
            "qr_sub2": "webdesign.com",
            "qr_url": f"https://retrofitwebdesign.com?utm_source=postcard&biz={quote_plus(biz_name)}"
        }
    else:
        return {
            "headline": "Your website doesn't need a rebuild.",
            "headline_sub": "It needs a 48-hour rescue.",
            "greeting": f"Hey {biz_name} team,",
            "p1": f"I audited trade contractor websites in {city} and noticed most",
            "p2": "smartphone visitors struggle to tap-to-call or wait 5+ seconds",
            "p3": "for pages to load, costing you valuable residential calls.",
            "offer_title": "RETROFIT $299 RESCUE PACKAGE:",
            "bullet1": "• Sub-second mobile load speeds (Core Web Vitals 90+)",
            "bullet2": "• Fixed tap-to-call headers & instant quote lead routing",
            "bullet3": "• Modernized typography, trust badges, and review showcase",
            "bullet4": "• 48-72 Hour turnaround • Flat $299",
            "cta_line1": "Call or text Cole directly at (612) 516-3145",
            "cta_line2": "Visit retrofitwebdesign.com to view packages & pricing.",
            "qr_heading": "SCAN WITH PHONE",
            "qr_sub1": "Visit RetroFit",
            "qr_sub2": "webdesign.com",
            "qr_url": f"https://retrofitwebdesign.com?utm_source=postcard&biz={quote_plus(biz_name)}"
        }

def generate_postcard_back(lead: dict, card_type: str = "RESCUE_48H", custom_copy: dict = None) -> Image.Image:
    """
    Generates a USPS-compliant 1264x848 postcard back layout.
    All text fields can be fully customized via custom_copy dict.
    """
    card = Image.new("RGB", (CARD_WIDTH, CARD_HEIGHT), color="#ffffff")
    draw = ImageDraw.Draw(card)

    font_brand_title = get_font("segoeuib.ttf", 26)
    font_brand_sub = get_font("segoeui.ttf", 16)
    font_head = get_font("segoeuib.ttf", 24)
    font_body = get_font("segoeui.ttf", 18)
    font_bold = get_font("segoeuib.ttf", 19)
    font_indicia = get_font("arialbd.ttf", 12)
    font_recipient = get_font("segoeuib.ttf", 24)
    font_address = get_font("segoeui.ttf", 21)

    biz_name = lead.get("Business Name") or "Local Business Owner"
    addr_info = parse_usps_address(lead.get("Address", ""))

    # Load copy, overriding defaults with any user-provided edits
    copy_data = get_default_copy(lead, card_type)
    if custom_copy:
        copy_data.update(custom_copy)

    # 1. Subtle dividing vertical line separating message and address side
    divider_x = 730
    draw.line([(divider_x, 40), (divider_x, CARD_HEIGHT - 40)], fill="#e2e8f0", width=2)

    # 2. Left Panel: Brand & Return Header
    draw.text((50, 42), "RETROFIT WEB DESIGN", fill="#de573c", font=font_brand_title)
    draw.text((50, 75), "Contractor Website Rescues & Rapid Builds", fill="#308882", font=font_brand_sub)
    draw.text((50, 97), "(612) 516-3145  •  cole@retrofitwebdesign.com", fill="#64748b", font=font_brand_sub)
    
    draw.line([(50, 125), (divider_x - 40, 125)], fill="#f1f5f9", width=2)

    # 3. Personalized Headline & Body
    y_text = 145
    if copy_data.get("headline"):
        draw.text((50, y_text), copy_data["headline"], fill="#0f172a", font=font_head)
        y_text += 32
    if copy_data.get("headline_sub"):
        draw.text((50, y_text), copy_data["headline_sub"], fill="#de573c", font=font_head)
        y_text += 36
    else:
        y_text += 8

    if copy_data.get("greeting"):
        wrapped_greeting = textwrap.wrap(copy_data["greeting"], width=55)
        for line in wrapped_greeting:
            draw.text((50, y_text), line, fill="#334155", font=font_bold)
            y_text += 32

    for p_key in ["p1", "p2", "p3"]:
        if copy_data.get(p_key):
            wrapped_body = textwrap.wrap(copy_data[p_key], width=75)
            for line in wrapped_body:
                draw.text((50, y_text), line, fill="#334155", font=font_body)
                y_text += 26
    y_text += 10

    if copy_data.get("offer_title"):
        draw.text((50, y_text), copy_data["offer_title"], fill="#de573c", font=font_bold)
        y_text += 30

    for b_key in ["bullet1", "bullet2", "bullet3", "bullet4"]:
        if copy_data.get(b_key):
            draw.text((65, y_text), copy_data[b_key], fill="#334155", font=font_body)
            y_text += 26
    y_text += 10

    if copy_data.get("cta_line1"):
        draw.text((50, y_text), copy_data["cta_line1"], fill="#0f172a", font=font_bold)
        y_text += 26
    if copy_data.get("cta_line2"):
        draw.text((50, y_text), copy_data["cta_line2"], fill="#64748b", font=font_body)

    # 4. Dynamic QR Code (moved up to avoid USPS barcode safe zone at the bottom)
    qr_url = copy_data.get("qr_url") or f"https://retrofitwebdesign.com?utm_source=postcard&biz={quote_plus(biz_name)}"
    qr_img = generate_qr_code(qr_url, size=130)
    qr_box = Image.new("RGB", (140, 140), "#f8fafc")
    qr_box.paste(qr_img, (5, 5))
    
    qr_y = y_text + 30
    card.paste(qr_box, (50, qr_y))

    qr_h = copy_data.get("qr_heading", "SCAN WITH PHONE")
    qr_s1 = copy_data.get("qr_sub1", "Visit RetroFit")
    qr_s2 = copy_data.get("qr_sub2", "webdesign.com")

    draw.text((205, qr_y + 20), qr_h, fill="#0f172a", font=font_bold)
    draw.text((205, qr_y + 45), qr_s1, fill="#64748b", font=font_body)
    draw.text((205, qr_y + 67), qr_s2, fill="#64748b", font=font_body)

    # Note: The entire right side (address block, return address, and indicia) 
    # is intentionally left blank because PostGrid (and Lob) automatically inject 
    # their own perfectly-formatted and USPS-certified address blocks and barcodes.

    return card

def get_postcard_front(card_type: str = "RESCUE_48H") -> Image.Image:
    """Loads and validates the front postcard image artwork."""
    front_path = FRONT_ASSETS.get(card_type, FRONT_ASSETS["RESCUE_48H"])
    if os.path.exists(front_path):
        img = Image.open(front_path).convert("RGB")
        return img.resize((CARD_WIDTH, CARD_HEIGHT), Image.Resampling.LANCZOS)
    
    # Fallback front canvas if JPG not found
    img = Image.new("RGB", (CARD_WIDTH, CARD_HEIGHT), "#0a0e17")
    draw = ImageDraw.Draw(img)
    f = get_font("segoeuib.ttf", 48)
    draw.text((100, 380), "RetroFit Website Rescue ($299)", fill="#de573c", font=f)
    return img

def generate_single_postcard_pdf(lead: dict, card_type: str = "RESCUE_48H", custom_copy: dict = None) -> bytes:
    """
    Generates a commercial 2-page print-ready PDF for a single contractor lead:
    Page 1: High-res Front
    Page 2: Personalized USPS Back with QR Code
    """
    front = get_postcard_front(card_type)
    back = generate_postcard_back(lead, card_type=card_type, custom_copy=custom_copy)

    # PostGrid requires exactly 6.25x4.25 inches for a 6x4 postcard (including bleed).
    # At 300 DPI, this is exactly 1875 x 1275 pixels.
    front = front.resize((1875, 1275), Image.Resampling.LANCZOS)
    back = back.resize((1875, 1275), Image.Resampling.LANCZOS)

    buf = io.BytesIO()
    front.save(buf, format="PDF", resolution=300.0, save_all=True, append_images=[back])
    buf.seek(0)
    return buf.getvalue()

def generate_batch_postcards_pdf(leads: list[dict], card_type: str = "RESCUE_48H", custom_copy: dict = None) -> bytes:
    """
    Combines all selected contractor postcards into a single multi-page PDF
    for commercial printing (VistaPrint, OvernightPrints, or local print shop).
    """
    if not leads:
        return b""
    
    pages = []
    for lead in leads:
        front = get_postcard_front(card_type)
        back = generate_postcard_back(lead, card_type=card_type, custom_copy=custom_copy)
        
        # Resize to strict 1875x1275 dimensions (6.25x4.25 inches at 300 DPI)
        front = front.resize((1875, 1275), Image.Resampling.LANCZOS)
        back = back.resize((1875, 1275), Image.Resampling.LANCZOS)
        
        pages.extend([front, back])

    buf = io.BytesIO()
    first_page = pages[0]
    remaining_pages = pages[1:]
    first_page.save(buf, format="PDF", resolution=300.0, save_all=True, append_images=remaining_pages)
    buf.seek(0)
    return buf.getvalue()

def export_mailing_csv(leads: list[dict]) -> str:
    """
    Exports leads into a standard direct-mail CSV format
    compatible with Avery 5160 labels, USPS EDDM, and VistaPrint direct-mail upload.
    """
    rows = []
    for idx, l in enumerate(leads, start=1):
        addr = parse_usps_address(l.get("Address", ""))
        rows.append({
            "First Name": "Owner / Manager",
            "Last Name": "",
            "Company": l.get("Business Name", ""),
            "Address Line 1": addr.get("street", ""),
            "Address Line 2": "",
            "City": addr.get("city", ""),
            "State": addr.get("state", "MN"),
            "ZIP Code": addr.get("zip", ""),
            "Country": "US",
            "Phone": l.get("Phone", ""),
            "Website": l.get("Website", ""),
            "Lead Type": l.get("Lead Type", ""),
            "Rescue Score": l.get("Rescue Score", 0)
        })
    df = pd.DataFrame(rows)
    return df.to_csv(index=False)

def dispatch_postcard_api(lead: dict, card_type: str = "RESCUE_48H", custom_copy: dict = None, live_mode: bool = False) -> dict:
    """
    Dispatches a postcard order via Direct Mail API (Lob or PostGrid).
    If in Test Mode or LOB_API_KEY is not configured, provides simulated real-time fulfillment
    with realistic tracking, postage cost ($0.72), and updates SQLite leads.db.
    """
    postgrid_api_key = os.getenv("POSTGRID_API_KEY", "")
    lob_api_key = os.getenv("LOB_API_KEY", "")
    addr = parse_usps_address(lead.get("Address", ""))
    biz_name = lead.get("Business Name", "") or "Contractor"
    lead_id = lead.get("ID")

    if postgrid_api_key and live_mode:
        try:
            pdf_bytes = generate_single_postcard_pdf(lead, card_type=card_type, custom_copy=custom_copy)
            payload = {
                "to[companyName]": biz_name,
                "to[addressLine1]": addr.get("street"),
                "to[city]": addr.get("city"),
                "to[provinceOrState]": addr.get("state"),
                "to[postalOrZip]": addr.get("zip"),
                "to[countryCode]": "US",
                "from[companyName]": "RetroFit Web Design",
                "from[addressLine1]": "5574 Raintell Ave NE",
                "from[city]": "Otsego",
                "from[provinceOrState]": "MN",
                "from[postalOrZip]": "55374",
                "from[countryCode]": "US",
                "size": "6x4"
            }
            files = {
                "pdf": ("postcard.pdf", pdf_bytes, "application/pdf")
            }
            headers = {
                "x-api-key": postgrid_api_key
            }
            resp = requests.post("https://api.postgrid.com/print-mail/v1/postcards", headers=headers, data=payload, files=files, timeout=30)
            if resp.status_code in [200, 201]:
                res_data = resp.json()
                tracking_id = res_data.get("id")
                exp_delivery = (datetime.datetime.now() + datetime.timedelta(days=4)).strftime("%B %d, %Y")
                if lead_id:
                    update_lead_status(lead_id, "Postcard Sent", f"PostGrid Mailer ID: {tracking_id}. Est Delivery: {exp_delivery}")
                return {
                    "success": True,
                    "mode": "Live Production",
                    "tracking_id": tracking_id,
                    "cost": "$0.72",
                    "expected_delivery": exp_delivery,
                    "message": f"Successfully queued via PostGrid API to {biz_name} ({addr.get('street')})!"
                }
            else:
                return {
                    "success": False,
                    "mode": "Live Production",
                    "message": f"PostGrid API error: {resp.text}"
                }
        except Exception as e:
            return {"success": False, "mode": "Live Production", "message": str(e)}

    # If user has a real Lob API Key and live_mode is enabled
    elif lob_api_key and live_mode:
        try:
            payload = {
                "description": f"RetroFit Postcard - {biz_name}",
                "to": {
                    "name": biz_name,
                    "address_line1": addr.get("street"),
                    "address_city": addr.get("city"),
                    "address_state": addr.get("state"),
                    "address_zip": addr.get("zip"),
                    "address_country": "US"
                },
                "from": {
                    "name": "RetroFit Web Design",
                    "address_line1": "5574 Raintell Ave NE",
                    "address_city": "Otsego",
                    "address_state": "MN",
                    "address_zip": "55374",
                    "address_country": "US"
                },
                "front": "https://retrofitwebdesign.com/assets/postcards/postcard-refurbish-rescue.jpg",
                "back": "https://retrofitwebdesign.com",
                "size": "4x6",
                "use_type": "marketing"
            }
            resp = requests.post("https://api.lob.com/v1/postcards", auth=(lob_api_key, ""), json=payload, timeout=10)
            if resp.status_code in [200, 201]:
                res_data = resp.json()
                tracking_id = res_data.get("id")
                exp_delivery = res_data.get("expected_delivery_date")
                
                if lead_id:
                    update_lead_status(lead_id, "Postcard Sent", f"Lob Mailer ID: {tracking_id}. Est Delivery: {exp_delivery}")
                
                return {
                    "success": True,
                    "mode": "Live Production",
                    "tracking_id": tracking_id,
                    "cost": "$0.72",
                    "expected_delivery": exp_delivery,
                    "message": f"Successfully queued via Lob API to {biz_name} ({addr.get('street')})!"
                }
            else:
                return {
                    "success": False,
                    "mode": "Live Production",
                    "message": f"Lob API error: {resp.text}"
                }
        except Exception as e:
            return {"success": False, "mode": "Live Production", "message": str(e)}

    # Simulated Test / Sandbox Mode (instant, safe, free for verification)
    now = datetime.datetime.now()
    est_delivery = (now + datetime.timedelta(days=4)).strftime("%B %d, %Y")
    simulated_id = f"psc_test_{now.strftime('%Y%m%d%H%M%S')}"

    if lead_id:
        update_lead_status(lead_id, "Postcard Sent", f"Direct Mail Dispatched: {simulated_id}. Est delivery: {est_delivery}")

    return {
        "success": True,
        "mode": "Test / Sandbox Mode",
        "tracking_id": simulated_id,
        "cost": "$0.72",
        "expected_delivery": est_delivery,
        "message": f"[TEST MODE] Postcard queued for printing & delivery to {biz_name} at {addr.get('street', 'Local Address')}."
    }
