import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vertocraftdb';

async function initializeDatabase() {
  console.log("Initializing MongoDB...");
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("vertocraftdb");
    
    // Check if collections exist, create them if they don't
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('contacts')) {
      await db.createCollection('contacts');
      console.log("Created contacts collection");
    }
    
    if (!collectionNames.includes('portfolio')) {
      await db.createCollection('portfolio');
      console.log("Created portfolio collection");
    }
    
    // Create indexes if needed
    await db.collection('contacts').createIndex({ email: 1 });
    await db.collection('portfolio').createIndex({ category: 1 });
    
    console.log("MongoDB initialization completed successfully");
  } catch (error) {
    console.error("Error initializing MongoDB:", error);
  } finally {
    await client.close();
  }
}

initializeDatabase();