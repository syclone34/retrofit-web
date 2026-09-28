const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../agency-hub/data/leads.db');
const db = new Database(dbPath);

console.log("Checking for leads...");
let leads = db.prepare('SELECT id FROM leads').all();

if (leads.length === 0) {
  console.log("No leads found. Inserting sample leads...");
  const insertLead = db.prepare(`
    INSERT INTO leads (business_name, phone_number, address, email, keyword, date_found, status, lead_type, website, rescue_score, notes)
    VALUES (?, ?, ?, ?, ?, datetime('now'), ?, 'plumber', ?, ?, '')
  `);
  
  insertLead.run("Apex Plumbing & Heating", "555-0101", "123 Main St, Minneapolis, MN", "contact@apex.com", "Emergency Plumber MN", "New Lead", "http://apexplumbing.test", 45);
  insertLead.run("Summit Roofing", "555-0202", "456 Oak Rd, St. Paul, MN", "info@summit.com", "Roof Repair St Paul", "Contacted", "http://summitroof.test", 62);
  insertLead.run("Miller Electric", "555-0303", "789 Pine Ln, Bloomington, MN", "hello@miller.com", "Electrician Bloomington", "Scheduled", "http://millerelectric.test", 78);
  insertLead.run("True North HVAC", "555-0404", "321 Elm St, Duluth, MN", "service@truenorth.com", "AC Repair Duluth", "New Lead", "http://truenorthhvac.test", 34);

  leads = db.prepare('SELECT id FROM leads').all();
}

console.log("Creating analytics table...");

// Create the table
db.exec(`
  CREATE TABLE IF NOT EXISTS client_analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    traffic INTEGER DEFAULT 0,
    calls INTEGER DEFAULT 0,
    quote_requests INTEGER DEFAULT 0,
    UNIQUE(lead_id, year, month),
    FOREIGN KEY(lead_id) REFERENCES leads(id)
  );
`);

console.log("Table created. Seeding with historical data...");

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO client_analytics (lead_id, year, month, traffic, calls, quote_requests)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// Wrap in a transaction for speed
const seedTransaction = db.transaction((leadsToSeed) => {
  for (const lead of leadsToSeed) {
    const seed = lead.id * 13;
    const baseTraffic = (seed % 1000) + 150;
    const baseCalls = (seed % 50) + 5;
    const baseRequests = (seed % 20) + 2;

    // Generate data for Jan - Sep 2026
    const months = [
      { m: 1, multiplier: 0.3 },
      { m: 2, multiplier: 0.4 },
      { m: 3, multiplier: 0.35 },
      { m: 4, multiplier: 0.5 },
      { m: 5, multiplier: 0.6 },
      { m: 6, multiplier: 0.8 },
      { m: 7, multiplier: 1.1 },
      { m: 8, multiplier: 1.5 },
      { m: 9, multiplier: 2.2 },
    ];

    for (const data of months) {
      insertStmt.run(
        lead.id,
        2026,
        data.m,
        Math.floor(baseTraffic * data.multiplier),
        Math.floor(baseCalls * data.multiplier),
        Math.floor(baseRequests * data.multiplier)
      );
    }
  }
});

seedTransaction(leads);

console.log(`Seeded historical analytics for ${leads.length} leads.`);
db.close();
