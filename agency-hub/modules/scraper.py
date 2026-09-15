"""
RetroFit Growth Engine - Unified Multi-Source Scraper Module
Integrates:
1. No-Website Leads Scraper (from python-tools/no_website_leads.py)
2. Slow-Website Leads Scraper with PageSpeed testing (from python-tools/scraper.py)
3. Zero-API Web Directory Harvester with mobile flaw scoring
"""

import os
import re
import datetime
from urllib.parse import quote_plus, urlparse
import requests
from bs4 import BeautifulSoup
import pandas as pd
from dotenv import load_dotenv

from .site_inspector import inspect_site, clean_domain_name
from .pipeline_store import save_lead

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH)

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

IGNORE_DOMAINS = [
    'yelp.com', 'angi.com', 'facebook.com', 'bbb.org', 'thumbtack.com',
    'yellowpages.com', 'homeadvisor.com', 'houzz.com', 'instagram.com',
    'linkedin.com', 'twitter.com', 'x.com', 'youtube.com', 'mapquest.com',
    'superpages.com', 'expertise.com', 'porch.com', 'chamberofcommerce.com'
]

def find_email_via_web(business_name: str, address: str) -> str:
    """Attempts to find a public email for the business using DuckDuckGo search."""
    query = f'"{business_name}" "{address}" email'
    email_regex = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    try:
        search_url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
        resp = requests.post(search_url, data={"q": query}, headers={"User-Agent": USER_AGENT}, timeout=6)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, "html.parser")
            snippets = soup.find_all("a", class_="result__snippet")
            for s in snippets:
                text = s.get_text()
                emails = re.findall(email_regex, text)
                valid = [e for e in emails if not re.search(r"\.(png|jpg|jpeg|gif|webp|svg|css|js)$", e, re.I)]
                if valid:
                    return valid[0]
    except Exception:
        pass
    return "Not Found"

def test_pagespeed_api(url: str, api_key: str = None) -> int | None:
    """Tests mobile PageSpeed score using Google PageSpeed API (or fallback)."""
    key_param = f"&key={api_key}" if api_key else ""
    api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={quote_plus(url)}&strategy=mobile{key_param}"
    try:
        resp = requests.get(api_url, timeout=12)
        if resp.status_code == 200:
            data = resp.json()
            score = data.get('lighthouseResult', {}).get('categories', {}).get('performance', {}).get('score')
            if score is not None:
                return int(score * 100)
    except Exception:
        pass
    
    # Fallback to local latency inspection
    try:
        audit = inspect_site(url, timeout=5)
        # Invert rescue score to approximate performance
        return max(15, 100 - audit.get("rescue_score", 50))
    except Exception:
        return None

def run_no_website_scraper(keyword: str, places_api_key: str = None, target_state: str = None, max_pages: int = 3, progress_callback=None) -> list[dict]:
    """
    Searches Google Places API (New) for businesses without a website.
    Saves found leads directly into leads.db.
    """
    api_key = places_api_key or os.getenv("PLACES_API_KEY", "")
    if not api_key:
        return []

    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "places.displayName,places.nationalPhoneNumber,places.formattedAddress,places.websiteUri,nextPageToken"
    }

    state = target_state or os.getenv("TARGET_STATE", "")
    keywords_list = [k.strip() for k in keyword.split(",") if k.strip()]
    leads_found = []

    for kw in keywords_list:
        page_token = ""
        pages_fetched = 0

        while pages_fetched < max_pages:
            payload = {"textQuery": kw, "languageCode": "en"}
            if page_token:
                payload["pageToken"] = page_token

            try:
                resp = requests.post(url, json=payload, headers=headers, timeout=12)
                resp.raise_for_status()
                data = resp.json()
            except Exception as e:
                print(f"Places API error: {e}")
                break

            places = data.get("places", [])
            for place in places:
                # Check if business has NO website or uses a social media/directory link
                site_url = place.get("websiteUri", "").lower()
                has_real_website = True
                
                if not site_url:
                    has_real_website = False
                else:
                    domain = clean_domain_name(site_url)
                    if any(ignored in domain for ignored in IGNORE_DOMAINS) or "business.site" in domain:
                        has_real_website = False

                if not has_real_website:
                    address = place.get("formattedAddress", "Unknown")
                    if state and (f" {state} " not in address and f", {state}" not in address):
                        continue

                    b_name = place.get("displayName", {}).get("text", "Unknown")
                    phone = place.get("nationalPhoneNumber", "No phone listed")

                    if progress_callback:
                        progress_callback(f"Found No-Website Lead ({kw}): {b_name}")

                    email = find_email_via_web(b_name, address)

                    lead_data = {
                        "Business Name": b_name,
                        "Phone": phone,
                        "Address": address,
                        "Email": email,
                        "Keyword": kw,
                        "Lead Type": "No Website",
                        "Rescue Score": 95,
                        "Status": "New",
                        "Full URL": "",
                        "Date Found": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "Notes": "Contractor has no website listed on Google Maps. Prime candidate for a $499 new build!",
                    }
                    save_lead(lead_data)
                    leads_found.append(lead_data)

            page_token = data.get("nextPageToken")
            if not page_token:
                break
            pages_fetched += 1

    return leads_found

def run_slow_website_scraper(keyword: str, places_api_key: str = None, pagespeed_api_key: str = None, target_state: str = None, threshold: int = 50, max_pages: int = 3, progress_callback=None) -> list[dict]:
    """
    Searches Google Places for businesses, tests PageSpeed, and flags slow websites (< threshold).
    Saves found leads directly into leads.db.
    """
    pl_key = places_api_key or os.getenv("PLACES_API_KEY", "")
    ps_key = pagespeed_api_key or os.getenv("PAGESPEED_API_KEY", "")

    if not pl_key:
        return []

    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": pl_key,
        "X-Goog-FieldMask": "places.displayName,places.nationalPhoneNumber,places.formattedAddress,places.websiteUri,nextPageToken"
    }

    state = target_state or os.getenv("TARGET_STATE", "")
    keywords_list = [k.strip() for k in keyword.split(",") if k.strip()]
    leads_found = []

    for kw in keywords_list:
        page_token = ""
        pages_fetched = 0

        while pages_fetched < max_pages:
            payload = {"textQuery": kw, "languageCode": "en"}
            if page_token:
                payload["pageToken"] = page_token

            try:
                resp = requests.post(url, json=payload, headers=headers, timeout=12)
                resp.raise_for_status()
                data = resp.json()
            except Exception as e:
                print(f"Places API error: {e}")
                break

            places = data.get("places", [])
            for place in places:
                if "websiteUri" in place:
                    address = place.get("formattedAddress", "Unknown")
                    if state and (f" {state} " not in address and f", {state}" not in address):
                        continue

                    site_url = place["websiteUri"]
                    domain = clean_domain_name(site_url).lower()
                    if any(ignored in domain for ignored in IGNORE_DOMAINS):
                        continue

                    b_name = place.get("displayName", {}).get("text", "Unknown")
                    phone = place.get("nationalPhoneNumber", "No phone listed")

                    if progress_callback:
                        progress_callback(f"Testing speed for: {b_name} ({domain})")

                    score = test_pagespeed_api(site_url, ps_key)
                    if score is not None and score < threshold:
                        email = find_email_via_web(b_name, address)
                        rescue_score = max(50, 100 - score)
                        lead_data = {
                            "Business Name": b_name,
                            "Phone": phone,
                            "Address": address,
                            "Email": email,
                            "Keyword": kw,
                            "Lead Type": f"Slow Website (Score: {score})",
                            "Rescue Score": rescue_score,
                            "Status": "New",
                            "Full URL": site_url,
                            "Date Found": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            "Notes": f"Mobile PageSpeed score is {score}/100. Sluggish load speed on 4G. $299 Rescue candidate.",
                        }
                        save_lead(lead_data)
                        leads_found.append(lead_data)

            page_token = data.get("nextPageToken")
            if not page_token:
                break
            pages_fetched += 1

    return leads_found

def search_contractors_web(trade: str, city: str, limit: int = 15) -> list[dict]:
    """Free DuckDuckGo & YellowPages directory search."""
    candidates = []
    seen_domains = set()
    query = f"{trade} contractor in {city}"
    headers = {"User-Agent": USER_AGENT}

    try:
        search_url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
        resp = requests.post(search_url, data={"q": query}, headers=headers, timeout=10)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, "html.parser")
            results = soup.find_all("div", class_=re.compile(r"result\b"))

            for res in results:
                title_el = res.find("a", class_="result__a")
                if not title_el:
                    continue
                raw_href = title_el.get("href", "")
                actual_url = raw_href
                if "uddg=" in raw_href:
                    match = re.search(r"uddg=([^&]+)", raw_href)
                    if match:
                        import urllib.parse
                        actual_url = urllib.parse.unquote(match.group(1))

                domain = clean_domain_name(actual_url).lower()
                root_domain = ".".join(domain.split(".")[-2:]) if len(domain.split(".")) >= 2 else domain

                if not domain or any(ignored in root_domain for ignored in IGNORE_DOMAINS) or domain in seen_domains:
                    continue

                title = title_el.get_text().strip()
                clean_title = re.split(r"[-|—•:]", title)[0].strip()

                candidates.append({
                    "business_name": clean_title,
                    "website": actual_url,
                    "domain": domain,
                    "city": city,
                    "trade": trade,
                    "source": "Web Search",
                })
                seen_domains.add(domain)
                if len(candidates) >= limit:
                    break
    except Exception as e:
        print(f"Web search error: {e}")

    # Fallback to YellowPages
    if len(candidates) < limit:
        try:
            city_slug = city.strip().replace(" ", "-").replace(",", "")
            trade_slug = trade.strip().replace(" ", "-")
            yp_url = f"https://www.yellowpages.com/{quote_plus(city_slug)}/{quote_plus(trade_slug)}"
            yp_resp = requests.get(yp_url, headers=headers, timeout=8)
            if yp_resp.status_code == 200:
                yp_soup = BeautifulSoup(yp_resp.text, "html.parser")
                listings = yp_soup.find_all("div", class_="info")
                for item in listings:
                    biz_tag = item.find("a", class_="business-name")
                    phone_tag = item.find("div", class_="phones")
                    site_tag = item.find("a", class_="track-visit-website")
                    if not biz_tag or not site_tag:
                        continue
                    site_url = site_tag.get("href", "")
                    if not site_url:
                        continue
                    domain = clean_domain_name(site_url).lower()
                    if domain in seen_domains or any(ignored in domain for ignored in IGNORE_DOMAINS):
                        continue
                    phone = phone_tag.get_text().strip() if phone_tag else ""
                    biz_name = biz_tag.get_text().strip()

                    candidates.append({
                        "business_name": biz_name,
                        "website": site_url,
                        "domain": domain,
                        "phone": phone,
                        "city": city,
                        "trade": trade,
                        "source": "YellowPages",
                    })
                    seen_domains.add(domain)
                    if len(candidates) >= limit:
                        break
        except Exception as e:
            print(f"YellowPages error: {e}")

    return candidates[:limit]

def batch_audit_candidates(candidates: list[dict], progress_callback=None) -> pd.DataFrame:
    """Audits a list of candidates and auto-saves them into leads.db."""
    records = []
    total = len(candidates)

    for i, item in enumerate(candidates):
        url = item.get("website") or item.get("url") or ""
        if not url:
            continue

        if progress_callback:
            progress_callback(i + 1, total, item.get("business_name") or url)

        audit = inspect_site(url, timeout=6)
        biz_name = item.get("business_name") or audit.get("business_name")
        phone = item.get("phone") or audit.get("phone")
        email = audit.get("email", "Not Found")

        record = {
            "Business Name": biz_name,
            "Phone": phone,
            "Email": email,
            "Address": item.get("city", ""),
            "Website": audit["url"],
            "Domain": audit["domain"],
            "Lead Type": f"Audited Site ({audit['cms_platform']})",
            "Rescue Score": audit["rescue_score"],
            "Status": "New",
            "Keyword": item.get("trade", "Contractor"),
            "Date Found": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Notes": f"Flaws: {' | '.join(audit['flaws'][:2]) if audit['flaws'] else 'None'}",
            "Tap-To-Call": "✅ Yes" if audit["has_click_to_call"] else "❌ Missing",
            "SSL Secure": "✅ Secure" if audit["ssl_secure"] else "⚠️ Insecure",
            "CMS": audit["cms_platform"],
            "Copyright": audit["copyright_year"] or "N/A",
        }
        save_lead(record)
        records.append(record)

    df = pd.DataFrame(records)
    if not df.empty and "Rescue Score" in df.columns:
        df = df.sort_values(by="Rescue Score", ascending=False).reset_index(drop=True)
    return df
