import { MongoClient, ServerApiVersion } from 'mongodb';
import * as schema from "@shared/schema";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI must be set. Did you forget to provision a database?",
  );
}

// Create MongoDB client
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database and collections
export const mongoClient = client;
export const database = client.db("vertocraftdb");
export const contactsCollection = database.collection("contacts");
export const portfolioCollection = database.collection("portfolio");

// Connect to the database
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    // Test connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection verified successfully");
    
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
