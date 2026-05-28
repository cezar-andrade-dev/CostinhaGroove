/* =============================================
   COSTINHA API — src/db/database.js
   Configuração e conexão com o SQLite
   ============================================= */

const Database = require("better-sqlite3");
const path     = require("path");
const fs       = require("fs");

const DB_PATH = process.env.DB_PATH || "./data/costinha.db";

// Garante que a pasta existe antes de criar o banco
const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Abre (ou cria) o banco de dados
const db = new Database(DB_PATH);

// Ativa WAL mode para melhor performance
db.pragma("journal_mode = WAL");

// ── CRIAR TABELAS ────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS piadas (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo     TEXT    NOT NULL,
    emoji      TEXT    NOT NULL DEFAULT '😂',
    arquivo    TEXT    NOT NULL,
    criado_em  TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;
