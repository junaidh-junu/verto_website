import { z } from "zod";

// Contact form submissions schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  services: z.array(z.string()).optional().default([]),
});

// Portfolio schema
export const portfolioFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string(),
  categories: z.string(),
  image: z.string(),
  rowSpan: z.number().min(20).max(50),
});

// Contact model type
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  services: string[];
  createdAt: string;
}

// Portfolio model type
export interface Portfolio {
  id: string;
  title: string;
  category: string;
  categories: string;
  image: string;
  rowSpan: number;
  createdAt: string;
}

// Insert types
export type InsertContact = Omit<Contact, 'id' | 'createdAt'>;
export type InsertPortfolio = Omit<Portfolio, 'id' | 'createdAt'>;
