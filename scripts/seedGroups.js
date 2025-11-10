/* eslint-disable no-console */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/vki-web.db');
const groups = [
  { name: '2207А1', contacts: 'Контакты не указаны' },
  { name: '2207А2', contacts: 'Контакты не указаны' },
];

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS "group" (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, contacts TEXT NOT NULL)');

  const selectStmt = db.prepare('SELECT id FROM "group" WHERE name = ?');
  const insertStmt = db.prepare('INSERT INTO "group" (name, contacts) VALUES (?, ?)');

  groups.forEach((group) => {
    selectStmt.get(group.name, (selectErr, row) => {
      if (selectErr) {
        throw selectErr;
      }

      if (!row) {
        insertStmt.run(group.name, group.contacts);
      }
    });
  });

  db.all('SELECT id, name, contacts FROM "group" ORDER BY id', (allErr, rows) => {
    if (allErr) {
      throw allErr;
    }

    console.log(rows);

    selectStmt.finalize();
    insertStmt.finalize();
    db.close();
  });
});


