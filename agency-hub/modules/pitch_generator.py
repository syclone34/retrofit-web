"""
RetroFit Growth Engine - Pitch Generator Module
Generates high-converting cold emails, SMS, social DMs, and phone scripts
tailored for both NO-WEBSITE leads (new build opportunity) and OUTDATED/SLOW sites ($299 rescue offer).
"""

def generate_pitches(audit_data: dict, trade: str = "Contractor", city: str = "") -> dict:
    """
    Generates multi-channel outreach pitches based on the inspected website data.
    """
    biz_name = audit_data.get("business_name") or audit_data.get("Business Name") or "there"
    domain = audit_data.get("domain") or audit_data.get("Domain") or ""
    lead_type = audit_data.get("lead_type") or audit_data.get("Lead Type") or ""
    flaws = audit_data.get("flaws", [])
    cms = audit_data.get("cms_platform", audit_data.get("CMS", "current platform"))
    has_tap_to_call = audit_data.get("has_click_to_call", True)
    has_ssl = audit_data.get("ssl_secure", True)
    cr_outdated = audit_data.get("is_copyright_outdated", False)
    cr_year = audit_data.get("copyright_year")

    is_no_website = "No Website" in lead_type or not domain or domain == "No Website"

    location_str = f" in {city}" if city else ""
    trade_clean = trade.title() if trade else "contractor"

    # =========================================================================
    # Branch A: Pitch for NO-WEBSITE Leads (From python-tools)
    # =========================================================================
    if is_no_website:
        subject_lines = [
            f"Quick question about {biz_name}'s website",
            f"Web presence for {biz_name}{location_str}",
            f"Question from a local neighbor re: {biz_name}",
        ]

        email_body = f"""Hi there,

I was trying to look up {biz_name} online but couldn't find a website for you.

I run Retrofit Web Design, a local agency that helps businesses like yours get set up with professional, modern websites to drive more local traffic. We offer very competitive pricing and I would love to chat if you're ever interested in establishing a web presence.

Let me know!

Thanks,
Cole
Retrofit Web Design
Call or Text: (612) 516-3145
cole@retrofitwebdesign.com | retrofitwebdesign.com"""

        sms_body = f"Hi {biz_name}, Cole here from Retrofit Web Design. Tried looking you up online today but couldn't find a website. We build fast, high-converting sites for local trades so customers can book directly. Open to seeing a quick preview mock?"

        social_dm = f"Hey {biz_name}! Love your work{location_str}. Tried checking out your website today but couldn't find one linked. I build clean, modern mobile sites for local contractors. Would you be open to a quick 1-minute mockup of what a site could look like for you?"

        phone_script = f"""[OPENER FOR NO-WEBSITE LEADS]
"Hey, is this the owner at {biz_name}?
My name is Cole with RetroFit Web Design. I was looking for a local {trade_clean} earlier today and found your Google listing, but noticed you don't have a website attached.

We help local trade businesses get set up with clean, modern websites that show up on Google Maps and make it effortless for homeowners to tap and call your cell.

Can I text or email you a quick 60-second mockup of what a custom site could look like for {biz_name}?"
"""
        return {
            "is_no_website": True,
            "subject_lines": subject_lines,
            "email_body": email_body.strip(),
            "sms_body": sms_body.strip(),
            "social_dm": social_dm.strip(),
            "phone_script": phone_script.strip(),
            "focal_flaw": "No online website presence",
        }

    # =========================================================================
    # Branch B: Pitch for SLOW / OUTDATED Sites ($299 Website Rescue Offer)
    # =========================================================================
    focal_flaw = "mobile visitors have trouble quickly booking or tapping your phone number"
    if not has_tap_to_call:
        focal_flaw = "your phone number isn't clickable/tap-to-call on smartphones, meaning mobile visitors on job sites can't immediately call you"
    elif not has_ssl:
        focal_flaw = "your site shows an insecure warning ('Not Secure') in browsers, which scares away homeowners before they call"
    elif cr_outdated and cr_year:
        focal_flaw = f"your site is still showing a {cr_year} copyright and an outdated mobile layout, making customers question if you're actively booking"
    elif "WordPress" in cms or "Slow Website" in lead_type:
        focal_flaw = "sluggish mobile loading speeds from heavy plugins are causing homeowners on 4G to bounce to competitors"
    elif len(flaws) > 0:
        focal_flaw = flaws[0].lower()

    subject_lines = [
        f"Quick question re: {biz_name}'s website",
        f"Mobile call issue on {domain}",
        f"{trade_clean} leads bouncing on {domain}?",
    ]

    email_body = f"""Hey {biz_name} team,

Saw your great reputation as a local {trade_clean}{location_str}.

I was browsing {domain} on my phone and noticed that {focal_flaw}. Right now, homeowners looking for quick service are likely bouncing before they can reach you.

I run RetroFit Web Design. We rescue and modernize contractor sites in 48 hours for a flat $299 (no long agency redesigns, no hidden fees). We make your site load in under 1 second, guarantee 100% mobile tap-to-call, and route leads directly to your cell.

Would you be open to a 60-second video walkthrough showing exactly how to fix it?

Best,
Cole
RetroFit Web Design
(612) 516-3145 | retrofitwebdesign.com"""

    sms_body = f"Hey {biz_name}, quick heads up from Cole @ RetroFit. Noticed on {domain} that your phone number isn't tap-to-call on smartphones—losing mobile leads. We rescue contractor sites in 48h for flat $299. Want me to text you a quick preview mock?"

    social_dm = f"""Hey {biz_name}! Love your recent job photos{location_str}. 

Quick heads up: I pulled up your site ({domain}) on mobile and noticed {focal_flaw}. 

I do 48-hour website rescues for local trades (flat $299, no expensive rebuilds). If you'd like, I can put together a free 1-minute mockup showing what a modern, high-speed mobile version looks like for your business. Let me know! 🔨"""

    phone_script = f"""[30-SECOND OPENER]
"Hey, is this the owner at {biz_name}? 
My name is Cole with RetroFit Web Design. I know you're busy on jobs, so I'll be brief—I was looking at your website ({domain}) on my smartphone earlier today and noticed {focal_flaw}. 

We specialize exclusively in 48-hour website rescues for local {trade_clean}s for a flat $299. We don't sell $3,000 redesigns; we just fix what's broken and make sure every homeowner who visits can tap to call your phone immediately.

Can I email or text you a quick 60-second preview of what your site looks like modernized?"

[COMMON OBJECTION 1: "We already have a web guy / company"]
"Totally respect that! Most contractors do. But when's the last time they checked your mobile tap-to-call or page speed on 4G? If you take a look at the free preview I send over and still prefer your current setup, no hard feelings at all."

[COMMON OBJECTION 2: "How much does this cost? What's the catch?"]
"No catch at all. It's a flat $299 one-time rescue fee. We modernize your mobile layout, speed up loading to under 1 second, and turn it around in 48 hours. Optional $49/month hosting and maintenance if you want us to keep it running fast."
"""

    return {
        "is_no_website": False,
        "subject_lines": subject_lines,
        "email_body": email_body.strip(),
        "sms_body": sms_body.strip(),
        "social_dm": social_dm.strip(),
        "phone_script": phone_script.strip(),
        "focal_flaw": focal_flaw,
    }
