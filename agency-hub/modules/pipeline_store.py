"""
RetroFit Growth Engine - Pipeline Storage Module (SQLite Unified Engine)
Directly connects to leads.db from python-tools while preserving all 21+ existing leads
and supporting rich status updates, notes, and CSV export.
"""

import os
import sqlite3
import datetime
import pandas as pd

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
DB_FILE = os.path.join(DATA_DIR, "leads.db")

def _init_db():
    """Ensure database and tables are properly initialized with all required columns."""
    os.makedirs(DATA_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_name TEXT,
            phone_number TEXT,
            address TEXT,
            email TEXT,
            keyword TEXT,
            date_found TEXT,
            status TEXT DEFAULT 'New',
            lead_type TEXT DEFAULT 'No Website',
            website TEXT,
            rescue_score INTEGER DEFAULT 50,
            notes TEXT DEFAULT '',
            UNIQUE(business_name, phone_number)
        )
    ''')
    conn.commit()

    # Migrate any missing columns if opened from older python-tools leads.db
    cursor.execute("PRAGMA table_info(leads)")
    existing_cols = [row[1] for row in cursor.fetchall()]
    
    if "lead_type" not in existing_cols:
        cursor.execute("ALTER TABLE leads ADD COLUMN lead_type TEXT DEFAULT 'No Website'")
    if "website" not in existing_cols:
        cursor.execute("ALTER TABLE leads ADD COLUMN website TEXT")
    if "rescue_score" not in existing_cols:
        cursor.execute("ALTER TABLE leads ADD COLUMN rescue_score INTEGER DEFAULT 50")
    if "notes" not in existing_cols:
        cursor.execute("ALTER TABLE leads ADD COLUMN notes TEXT DEFAULT ''")
    conn.commit()
    conn.close()

def get_db_connection():
    """Returns a SQLite connection with Row factory."""
    _init_db()
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def get_all_leads() -> list[dict]:
    """Retrieve all leads from SQLite as a list of dicts."""
    _init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM leads ORDER BY date_found DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_pipeline_df() -> pd.DataFrame:
    """Retrieve all leads formatted as a clean Pandas DataFrame for Streamlit."""
    leads = get_all_leads()
    if not leads:
        return pd.DataFrame(columns=[
            "ID", "Business Name", "Phone", "Email", "Address", "Lead Type",
            "Website", "Status", "Rescue Score", "Keyword", "Date Found", "Notes"
        ])
    
    records = []
    for l in leads:
        # If rescue_score is not set, derive from lead_type
        score = l.get("rescue_score") or 50
        lead_type = l.get("lead_type") or "No Website"
        if "Score: " in str(lead_type):
            try:
                score = int(lead_type.split("Score: ")[1].replace(")", "").strip())
            except Exception:
                pass
        elif lead_type == "No Website":
            score = 95  # Prime target for new build!

        records.append({
            "ID": l["id"],
            "Business Name": l.get("business_name") or "Unknown",
            "Phone": l.get("phone_number") or "N/A",
            "Email": l.get("email") or "Not Found",
            "Address": l.get("address") or "",
            "Lead Type": lead_type,
            "Website": l.get("website") or "",
            "Domain": (l.get("website") or "").replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0] or "No Website",
            "Status": l.get("status") or "New",
            "Rescue Score": score,
            "Keyword": l.get("keyword") or "",
            "Date Found": l.get("date_found") or "",
            "Notes": l.get("notes") or "",
        })
    return pd.DataFrame(records)

def save_lead(lead_dict: dict) -> bool:
    """Inserts or updates a lead in the database."""
    _init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    b_name = lead_dict.get("Business Name") or lead_dict.get("business_name", "Unknown")
    phone = lead_dict.get("Phone") or lead_dict.get("phone_number", "No phone")
    address = lead_dict.get("Address") or lead_dict.get("address", "")
    email = lead_dict.get("Email") or lead_dict.get("email", "Not Found")
    keyword = lead_dict.get("Keyword") or lead_dict.get("keyword", lead_dict.get("Trade", "Contractor"))
    lead_type = lead_dict.get("Lead Type") or lead_dict.get("lead_type", "No Website")
    website = lead_dict.get("Website") or lead_dict.get("website") or lead_dict.get("Full URL", None)
    status = lead_dict.get("Status") or lead_dict.get("status", "New")
    score = lead_dict.get("Rescue Score") or lead_dict.get("rescue_score", 50)
    notes = lead_dict.get("Notes") or lead_dict.get("notes", "")
    date_found = lead_dict.get("Date Found") or datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        cursor.execute('''
            INSERT INTO leads (business_name, phone_number, address, email, keyword, date_found, status, lead_type, website, rescue_score, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (b_name, phone, address, email, keyword, date_found, status, lead_type, website, score, notes))
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
        # Update existing lead
        cursor.execute('''
            UPDATE leads SET email = COALESCE(NULLIF(?, 'Not Found'), email),
                             status = ?,
                             notes = CASE WHEN ? != '' THEN ? ELSE notes END,
                             rescue_score = ?
            WHERE business_name = ? AND phone_number = ?
        ''', (email, status, notes, notes, score, b_name, phone))
        conn.commit()
        success = True
    except Exception as e:
        print(f"Error saving lead: {e}")
        success = False
    finally:
        conn.close()
    return success

def update_lead_status(lead_id: int, new_status: str, notes: str = None, email: str = None) -> bool:
    """Updates status, notes, and optional email for a specific lead ID."""
    _init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        if notes is not None and email is not None:
            cursor.execute("UPDATE leads SET status = ?, notes = ?, email = ? WHERE id = ?", (new_status, notes, email, lead_id))
        elif notes is not None:
            cursor.execute("UPDATE leads SET status = ?, notes = ? WHERE id = ?", (new_status, notes, lead_id))
        else:
            cursor.execute("UPDATE leads SET status = ? WHERE id = ?", (new_status, lead_id))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error updating status: {e}")
        return False
    finally:
        conn.close()

def delete_lead_by_id(lead_id: int) -> bool:
    """Delete a lead by its database ID."""
    _init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error deleting lead: {e}")
        return False
    finally:
        conn.close()
