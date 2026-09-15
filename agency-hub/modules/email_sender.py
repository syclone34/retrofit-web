"""
RetroFit Growth Engine - SMTP Email Dispatcher Module
Sends cold outreach emails and audit alerts directly through SMTP (e.g. Gmail App Password).
"""

import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(ENV_PATH)

def get_smtp_config():
    """Retrieve SMTP settings from environment variables."""
    return {
        "server": os.getenv("SMTP_SERVER", "smtp.gmail.com"),
        "port": int(os.getenv("SMTP_PORT", 587)),
        "username": os.getenv("SMTP_USERNAME", ""),
        "password": os.getenv("SMTP_PASSWORD", ""),
        "alert_recipient": os.getenv("ALERT_RECIPIENT", ""),
    }

def test_smtp_connection() -> tuple[bool, str]:
    """Test connection to the configured SMTP server."""
    cfg = get_smtp_config()
    if not cfg["username"] or not cfg["password"]:
        return False, "SMTP username or password missing in .env file."
    
    try:
        server = smtplib.SMTP(cfg["server"], cfg["port"], timeout=10)
        server.starttls()
        server.login(cfg["username"], cfg["password"])
        server.quit()
        return True, f"Connected successfully as {cfg['username']}"
    except Exception as e:
        return False, str(e)

def send_pitch_email(to_email: str, subject: str, body: str, is_html: bool = False) -> tuple[bool, str]:
    """
    Sends an outreach email to a prospect via SMTP.
    Returns (success_bool, message_str).
    """
    if not to_email or to_email == "Not Found" or "@" not in to_email:
        return False, "Invalid or missing recipient email address."

    cfg = get_smtp_config()
    if not cfg["username"] or not cfg["password"]:
        return False, "SMTP credentials missing in .env. Please configure SMTP_USERNAME and SMTP_PASSWORD."

    msg = MIMEMultipart()
    msg["From"] = cfg["username"]
    msg["To"] = to_email
    msg["Subject"] = subject

    if is_html:
        msg.attach(MIMEText(body, "html"))
    else:
        msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(cfg["server"], cfg["port"], timeout=15)
        server.starttls()
        server.login(cfg["username"], cfg["password"])
        server.send_message(msg)
        server.quit()
        return True, f"Pitch successfully sent to {to_email}!"
    except Exception as e:
        return False, f"SMTP Error: {str(e)}"
