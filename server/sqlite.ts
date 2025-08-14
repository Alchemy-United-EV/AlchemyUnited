import Database from 'better-sqlite3';
import fs from 'fs';
const dbFile = 'server/data.sqlite';
const firstRun = !fs.existsSync(dbFile);
export const db = new Database(dbFile);
if (firstRun) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads(
      id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT,
      email TEXT UNIQUE, phone TEXT, created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS hosts(
      id INTEGER PRIMARY KEY, data_json TEXT, created_at TEXT
    );
  `);
}