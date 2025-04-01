import pg from "pg";
const { Pool } = pg;
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with PostgreSQL
const db = drizzle(pool);

// Run migrations
async function runMigrations() {
  console.log("Running database migrations...");
  
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();