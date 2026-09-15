"""
RetroFit Growth Engine - Site Inspector Module
Performs lightweight, rapid audits on contractor websites to identify
mobile UX flaws, outdated tech stacks, missing click-to-call, and rescue opportunities.
"""

import re
import time
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

def normalize_url(url: str) -> str:
    """Ensure URL has https scheme and clean formatting."""
    url = url.strip()
    if not url:
        return ""
    if not re.match(r"^https?://", url, re.IGNORECASE):
        url = "https://" + url
    return url

def clean_domain_name(url: str) -> str:
    """Extract clean domain name without www or protocol."""
    try:
        parsed = urlparse(normalize_url(url))
        domain = parsed.netloc or parsed.path
        return re.sub(r"^www\.", "", domain, flags=re.IGNORECASE)
    except Exception:
        return url

def inspect_site(raw_url: str, timeout: int = 8) -> dict:
    """
    Audits a contractor's website and returns structured data,
    detected flaws, and a RetroFit Rescue Opportunity Score (0-100).
    """
    target_url = normalize_url(raw_url)
    domain = clean_domain_name(target_url)

    result = {
        "url": target_url,
        "domain": domain,
        "reachable": False,
        "status_code": None,
        "response_time_sec": None,
        "ssl_secure": False,
        "business_name": "",
        "phone": "",
        "has_click_to_call": False,
        "email": "",
        "cms_platform": "Custom / Unknown",
        "has_mobile_viewport": False,
        "copyright_year": None,
        "is_copyright_outdated": False,
        "flaws": [],
        "strengths": [],
        "rescue_score": 0,
        "lead_tier": "Low Priority",
    }

    if not target_url:
        result["flaws"].append("Invalid URL provided.")
        return result

    headers = {"User-Agent": USER_AGENT}
    start_time = time.time()

    # 1. Attempt HTTPS request
    resp = None
    try:
        resp = requests.get(target_url, headers=headers, timeout=timeout, allow_redirects=True)
        result["status_code"] = resp.status_code
        result["response_time_sec"] = round(time.time() - start_time, 2)
        result["reachable"] = resp.status_code < 400
        result["ssl_secure"] = resp.url.startswith("https://")
    except requests.exceptions.SSLError:
        result["ssl_secure"] = False
        result["flaws"].append("Broken or missing SSL certificate (shows 'Not Secure' to customers)")
        # Try HTTP fallback
        try:
            http_url = target_url.replace("https://", "http://")
            resp = requests.get(http_url, headers=headers, timeout=timeout, allow_redirects=True)
            result["status_code"] = resp.status_code
            result["reachable"] = resp.status_code < 400
            result["response_time_sec"] = round(time.time() - start_time, 2)
        except Exception:
            pass
    except Exception as e:
        result["flaws"].append(f"Connection failed: {str(e)[:60]}")
        result["rescue_score"] = 90
        result["lead_tier"] = "Offline / Broken Site"
        return result

    if not resp or not resp.text:
        result["flaws"].append("Website returned empty content or blocked request.")
        return result

    html = resp.text
    soup = BeautifulSoup(html, "html.parser")

    # 2. Extract Business Name
    # Priority: OpenGraph site_name -> Title tag -> Domain guess
    og_name = soup.find("meta", property="og:site_name")
    if og_name and og_name.get("content"):
        result["business_name"] = og_name["content"].strip()
    elif soup.title and soup.title.string:
        raw_title = soup.title.string.strip()
        # Clean title splits like "Acme Roofing | Minneapolis, MN"
        parts = re.split(r"[-|—•:]", raw_title)
        candidate = parts[0].strip()
        if re.match(r"^(home|welcome|services|about|index)\b", candidate, re.I) and len(parts) > 1:
            candidate = parts[1].strip()
        result["business_name"] = candidate
    
    if not result["business_name"] or len(result["business_name"]) < 2:
        # Fallback to domain name capitalization
        name_guess = domain.split(".")[0].replace("-", " ").title()
        result["business_name"] = name_guess

    # 3. Detect Phone Number & Click-to-Call
    # Look for tel: links first
    tel_link = soup.find("a", href=re.compile(r"^tel:", re.I))
    if tel_link:
        result["has_click_to_call"] = True
        raw_phone = re.sub(r"^tel:", "", tel_link.get("href", ""), flags=re.I).strip()
        result["phone"] = raw_phone or tel_link.get_text().strip()
    
    if not result["phone"]:
        # Search text for standard phone patterns
        phone_matches = re.findall(r"(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}", html)
        if phone_matches:
            result["phone"] = phone_matches[0].strip()
            # If found in text but no tel: link, tap-to-call is missing!
            result["has_click_to_call"] = False

    if not result["has_click_to_call"]:
        result["flaws"].append("Phone number is NOT tap-to-call on smartphones (causes mobile bounces)")
    else:
        result["strengths"].append("Has mobile tap-to-call integration")

    # 4. Extract Email
    mailto = soup.find("a", href=re.compile(r"^mailto:", re.I))
    if mailto:
        email_clean = re.sub(r"^mailto:", "", mailto.get("href", ""), flags=re.I).split("?")[0].strip()
        result["email"] = email_clean
    if not result["email"]:
        emails = re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", html)
        # Filter out png/jpg/svg/wix false positives
        valid_emails = [e for e in emails if not re.search(r"\.(png|jpg|jpeg|gif|webp|svg|css|js)$", e, re.I)]
        if valid_emails:
            result["email"] = valid_emails[0]

    # 5. Mobile Viewport Check
    viewport = soup.find("meta", attrs={"name": re.compile(r"^viewport$", re.I)})
    if viewport:
        result["has_mobile_viewport"] = True
        result["strengths"].append("Includes responsive mobile viewport meta tag")
    else:
        result["has_mobile_viewport"] = False
        result["flaws"].append("Missing mobile viewport tag (site requires pinch-and-zoom on phones)")

    # 6. CMS / Tech Stack Detection
    html_lower = html.lower()
    if "wp-content" in html_lower or "wp-includes" in html_lower:
        result["cms_platform"] = "WordPress"
    elif "wix.com" in html_lower or "_api/wix" in html_lower or "static.wixstatic.com" in html_lower:
        result["cms_platform"] = "Wix"
    elif "weebly.com" in html_lower or "editmysite.com" in html_lower:
        result["cms_platform"] = "Weebly"
    elif "squarespace.com" in html_lower or "static1.squarespace" in html_lower:
        result["cms_platform"] = "Squarespace"
    elif "godaddy" in html_lower or "secureserver.net" in html_lower:
        result["cms_platform"] = "GoDaddy Builder"
    elif "webflow" in html_lower:
        result["cms_platform"] = "Webflow"

    if result["cms_platform"] in ["WordPress", "Wix", "Weebly", "GoDaddy Builder"]:
        result["flaws"].append(f"Built on {result['cms_platform']} (typically heavy script bloat on 4G)")

    # 7. Copyright Year Detection
    cr_matches = re.findall(r"(?:copyright|©|\(c\))\s*(?:20\d\d\s*[-–]\s*)?(20\d\d)", html, re.I)
    if cr_matches:
        try:
            detected_year = int(cr_matches[-1])
            result["copyright_year"] = detected_year
            if detected_year <= 2022:
                result["is_copyright_outdated"] = True
                result["flaws"].append(f"Outdated footer copyright ({detected_year}) signals an unmaintained site")
        except Exception:
            pass

    # 8. Speed / Response Latency Check
    if result["response_time_sec"] and result["response_time_sec"] > 2.0:
        result["flaws"].append(f"Slow initial server response time ({result['response_time_sec']}s)")

    # 9. Calculate RetroFit "Rescue Opportunity Score" (0 to 100)
    # Higher score = more flaws / better candidate for a $299 rescue package
    score = 25  # baseline
    if not result["ssl_secure"]:
        score += 25
    if not result["has_click_to_call"]:
        score += 20
    if not result["has_mobile_viewport"]:
        score += 20
    if result["is_copyright_outdated"]:
        score += 15
    if result["cms_platform"] in ["WordPress", "Weebly", "GoDaddy Builder", "Wix"]:
        score += 10
    if result["response_time_sec"] and result["response_time_sec"] > 1.8:
        score += 10

    score = min(100, score)
    result["rescue_score"] = score

    # Lead Tier Categorization
    if score >= 75:
        result["lead_tier"] = "🔥 Prime Rescue Target"
    elif score >= 50:
        result["lead_tier"] = "⚡ Strong Candidate"
    else:
        result["lead_tier"] = "Modern / Low Opportunity"

    return result
