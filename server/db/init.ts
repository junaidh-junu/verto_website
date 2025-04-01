import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, text, serial } from "drizzle-orm/pg-core";

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with PostgreSQL
const db = drizzle(pool);

async function initializeDatabase() {
  console.log("Initializing database tables...");
  
  try {
    // Create contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        services TEXT[] NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    
    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();