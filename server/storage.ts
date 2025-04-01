import { contacts, type Contact, type InsertContact } from "@shared/schema";

// Storage interface
export interface IStorage {
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

// In-memory storage implementation
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

export const storage = new MemStorage();
