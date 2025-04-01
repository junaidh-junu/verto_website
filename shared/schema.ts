import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  services: text("services").array().notNull(),
  createdAt: text("created_at").notNull(),
});

// Create Zod schema for form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  services: z.array(z.string()).optional().default([]),
});

// Portfolio schema
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  categories: text("categories").notNull(),
  image: text("image").notNull(),
  rowSpan: integer("row_span").notNull(),
  createdAt: text("created_at").notNull(),
});

export const portfolioFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string(),
  categories: z.string(),
  image: z.string(),
  rowSpan: z.number().min(20).max(50),
});

// Create Drizzle insert schemas
export const insertContactSchema = createInsertSchema(contacts);
export const insertPortfolioSchema = createInsertSchema(portfolioItems);

// Export types
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolioItems.$inferSelect;
