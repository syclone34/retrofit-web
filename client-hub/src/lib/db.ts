import Database from 'better-sqlite3';
import path from 'path';

// Point to the existing agency-hub leads.db so data is shared perfectly
const dbPath = path.resolve(process.cwd(), '../agency-hub/data/leads.db');

export interface Lead {
  id: number;
  business_name: string;
  phone_number: string;
  address: string;
  email: string;
  keyword: string;
  date_found: string;
  status: string;
  lead_type: string;
  website: string;
  rescue_score: number;
  notes: string;
}

export interface AnalyticsRecord {
  id: number;
  lead_id: number;
  year: number;
  month: number;
  traffic: number;
  calls: number;
  quote_requests: number;
}

export function getDb() {
  const db = new Database(dbPath);
  return db;
}

export function getLeads(): Lead[] {
  const db = getDb();
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY date_found DESC').all() as Lead[];
    return leads;
  } finally {
    db.close();
  }
}

export function getAnalytics(): AnalyticsRecord[] {
  const db = getDb();
  try {
    // Only return data if the table exists
    const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='client_analytics'").get();
    if (!tableExists) return [];
    
    return db.prepare('SELECT * FROM client_analytics ORDER BY year, month').all() as AnalyticsRecord[];
  } finally {
    db.close();
  }
}
