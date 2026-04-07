import "dotenv/config";
import Database from "better-sqlite3";

const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
const databasePath = databaseUrl.replace("file:", "");

const db = new Database(databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS personagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    obra TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descricao TEXT,
    poderPrincipal TEXT,
    idade INTEGER,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
