const db = require('better-sqlite3')('../agency-hub/data/leads.db');
console.log("TABLES:");
console.log(db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
