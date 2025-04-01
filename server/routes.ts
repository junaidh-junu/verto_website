import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = contactFormSchema.parse(req.body);
      
      // Create contact in storage
      const contact = await storage.createContact({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      // Return success response
      return res.status(201).json({
        message: "Contact form submitted successfully",
        contact,
      });
    } catch (error) {
      // If validation error, return formatted error message
      if (error instanceof Error) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message,
        });
      }
      
      // Generic error response
      return res.status(500).json({
        message: "An unexpected error occurred",
      });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve contacts",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
