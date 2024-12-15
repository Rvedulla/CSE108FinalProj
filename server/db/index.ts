import Database from '@better-sqlite3/better-sqlite3';
import { config } from '../config';

export const db = new Database(config.dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
`);