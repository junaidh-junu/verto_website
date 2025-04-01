import { type Contact, type InsertContact, type Portfolio, type InsertPortfolio } from "@shared/schema";
import { mongoClient, database, contactsCollection, portfolioCollection } from './db';
import { ObjectId } from 'mongodb';

// Storage interface
export interface IStorage {
  getContacts(): Promise<Contact[]>;
  getContact(id: number | string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Portfolio methods
  getPortfolioItems(): Promise<Portfolio[]>;
  getPortfolioItem(id: number | string): Promise<Portfolio | undefined>;
  createPortfolioItem(portfolio: InsertPortfolio): Promise<Portfolio>;
  deletePortfolioItem(id: number | string): Promise<boolean>;
  
  // Admin authentication
  validateAdmin(username: string, password: string): Promise<boolean>;
}

// Admin credentials - in a real app, these would be stored in the database with proper hashing
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// MongoDB storage implementation
export class MongoStorage implements IStorage {
  async getContacts(): Promise<Contact[]> {
    try {
      const contacts = await contactsCollection.find({}).toArray();
      return contacts.map(doc => ({
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        subject: doc.subject,
        message: doc.message,
        services: doc.services,
        createdAt: doc.createdAt
      }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  }

  async getContact(id: number | string): Promise<Contact | undefined> {
    try {
      const objectId = typeof id === 'string' ? new ObjectId(id) : new ObjectId(id.toString());
      const doc = await contactsCollection.findOne({ _id: objectId });
      if (!doc) return undefined;
      
      return {
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        subject: doc.subject,
        message: doc.message,
        services: doc.services,
        createdAt: doc.createdAt
      };
    } catch (error) {
      console.error(`Error fetching contact with id ${id}:`, error);
      return undefined;
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const now = new Date().toISOString();
      const contactData = { ...insertContact, createdAt: now };
      
      const result = await contactsCollection.insertOne(contactData);
      return {
        ...contactData,
        id: result.insertedId.toString()
      } as Contact;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }
  
  // Portfolio methods implementation
  async getPortfolioItems(): Promise<Portfolio[]> {
    try {
      const items = await portfolioCollection.find({}).toArray();
      return items.map(doc => ({
        id: doc._id.toString(),
        title: doc.title,
        category: doc.category,
        categories: doc.categories,
        image: doc.image,
        rowSpan: doc.rowSpan,
        createdAt: doc.createdAt
      }));
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      return [];
    }
  }
  
  async getPortfolioItem(id: number | string): Promise<Portfolio | undefined> {
    try {
      const objectId = typeof id === 'string' ? new ObjectId(id) : new ObjectId(id.toString());
      const doc = await portfolioCollection.findOne({ _id: objectId });
      if (!doc) return undefined;
      
      return {
        id: doc._id.toString(),
        title: doc.title,
        category: doc.category,
        categories: doc.categories,
        image: doc.image,
        rowSpan: doc.rowSpan,
        createdAt: doc.createdAt
      };
    } catch (error) {
      console.error(`Error fetching portfolio item with id ${id}:`, error);
      return undefined;
    }
  }
  
  async createPortfolioItem(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    try {
      const now = new Date().toISOString();
      const portfolioData = { ...insertPortfolio, createdAt: now };
      
      const result = await portfolioCollection.insertOne(portfolioData);
      return {
        ...portfolioData,
        id: result.insertedId.toString()
      } as Portfolio;
    } catch (error) {
      console.error("Error creating portfolio item:", error);
      throw error;
    }
  }
  
  async deletePortfolioItem(id: number | string): Promise<boolean> {
    try {
      const objectId = typeof id === 'string' ? new ObjectId(id) : new ObjectId(id.toString());
      const result = await portfolioCollection.deleteOne({ _id: objectId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting portfolio item with id ${id}:`, error);
      return false;
    }
  }
  
  async validateAdmin(username: string, password: string): Promise<boolean> {
    // In a real application, this would check against hashed passwords in the database
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  }
}

// In-memory storage implementation (kept as fallback)
export class MemStorage implements IStorage {
  private contacts: Map<string, Contact>;
  private portfolioItems: Map<string, Portfolio>;
  contactId: number;
  portfolioId: number;

  constructor() {
    this.contacts = new Map();
    this.portfolioItems = new Map();
    this.contactId = 1;
    this.portfolioId = 1;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number | string): Promise<Contact | undefined> {
    const stringId = id.toString();
    return this.contacts.get(stringId);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const idNum = this.contactId++;
    const id = idNum.toString();
    const now = new Date().toISOString();
    const contact: Contact = { ...insertContact, id, createdAt: now };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getPortfolioItems(): Promise<Portfolio[]> {
    return Array.from(this.portfolioItems.values());
  }
  
  async getPortfolioItem(id: number | string): Promise<Portfolio | undefined> {
    const stringId = id.toString();
    return this.portfolioItems.get(stringId);
  }
  
  async createPortfolioItem(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const idNum = this.portfolioId++;
    const id = idNum.toString();
    const now = new Date().toISOString();
    const portfolio: Portfolio = { ...insertPortfolio, id, createdAt: now };
    this.portfolioItems.set(id, portfolio);
    return portfolio;
  }
  
  async deletePortfolioItem(id: number | string): Promise<boolean> {
    const stringId = id.toString();
    return this.portfolioItems.delete(stringId);
  }
  
  async validateAdmin(username: string, password: string): Promise<boolean> {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  }
}

// Use MongoDB storage if available, otherwise use in-memory storage
export let storage: IStorage = mongoClient ? new MongoStorage() : new MemStorage();
