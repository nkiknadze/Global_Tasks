const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDB() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            category TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);

    return db;
}

module.exports = initDB;