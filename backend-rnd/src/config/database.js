import mysql from 'mysql2/promise'; 
import 'dotenv/config'; 
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

let db = null;

const CREATE_FEEDBACK_TABLE = `
    CREATE TABLE IF NOT EXISTS feedback (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        eventName VARCHAR(100) NOT NULL,
        division TEXT CHECK(division IN ('LnT', 'EEO', 'PR', 'HRD', 'RnD')) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        suggestion TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT CHECK(status IN ('open', 'in-review', 'resolved')) DEFAULT 'open' NOT NULL
    );
`;

async function initDatabase() {
    const dbPath = path.join(process.cwd(), 'backend-rnd', 'feedback.sqlite');

    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(CREATE_FEEDBACK_TABLE);
        console.log(`Koneksi ke database SQLite berhasil.`);
        
    } catch (error) {
        console.error("Koneksi ke database GAGAL:", error.message);
        process.exit(1); 
    }
}

testConnection();

export default pool; 