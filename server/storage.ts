import { contacts, portfolioItems, type Contact, type InsertContact, type Portfolio, type InsertPortfolio } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pg from "pg";
const { Pool } = pg;

// Storage interface
export interface IStorage {
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  getPortfolioItems(): Promise<Portfolio[]>;
  createPortfolioItem(item: InsertPortfolio): Promise<Portfolio>;
  deletePortfolioItem(id: number): Promise<void>;
}

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with PostgreSQL
const db = drizzle(pool);

// PostgreSQL storage implementation
export class PostgresStorage implements IStorage {
  async getPortfolioItems(): Promise<Portfolio[]> {
    try {
      return await db.select().from(portfolioItems);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      return [];
    }
  }

  async createPortfolioItem(item: InsertPortfolio): Promise<Portfolio> {
    try {
      const now = new Date().toISOString();
      const portfolioData = { ...item, createdAt: now };
      const result = await db.insert(portfolioItems).values(portfolioData).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      throw error;
    }
  }

  async deletePortfolioItem(id: number): Promise<void> {
    try {
      await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      throw error;
    }
  }
  async getContacts(): Promise<Contact[]> {
    try {
      return await db.select().from(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  }

  async getContact(id: number): Promise<Contact | undefined> {
    try {
      const results = await db.select().from(contacts).where(eq(contacts.id, id));
      return results[0];
    } catch (error) {
      console.error(`Error fetching contact with id ${id}:`, error);
      return undefined;
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const now = new Date().toISOString();
      const contactData = { ...insertContact, createdAt: now };
      
      const result = await db.insert(contacts).values(contactData).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }
}

// In-memory storage implementation (kept as fallback)
export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  currentId: number;

  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const now = new Date().toISOString();
    const contact: Contact = { ...insertContact, id, createdAt: now };
    this.contacts.set(id, contact);
    return contact;
  }
}

// Use PostgreSQL storage
export const storage = new PostgresStorage();
