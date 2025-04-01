import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vertocraftdb';

async function runMigration() {
  console.log("Running MongoDB migrations...");
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("vertocraftdb");
    
    // Add any migration logic here if needed
    // For example, updating document schemas, adding fields, etc.
    
    console.log("MongoDB migrations completed successfully");
  } catch (error) {
    console.error("Error running MongoDB migrations:", error);
  } finally {
    await client.close();
  }
}

runMigration();