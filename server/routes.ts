import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, portfolioFormSchema } from "@shared/schema";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});
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

  // Portfolio routes
  app.get("/api/portfolio", async (_req: Request, res: Response) => {
    try {
      const items = await storage.getPortfolioItems();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve portfolio items",
      });
    }
  });

  app.post("/api/portfolio", upload.single('image'), async (req: Request, res: Response) => {
    try {
      const imageUrl = `/uploads/${req.file?.filename}`;
      const data = { ...req.body, image: imageUrl };
      const validatedData = portfolioFormSchema.parse(data);
      const item = await storage.createPortfolioItem(validatedData);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create portfolio item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.delete("/api/portfolio/:id", async (req: Request, res: Response) => {
    try {
      await storage.deletePortfolioItem(Number(req.params.id));
      return res.status(200).json({ message: "Portfolio item deleted" });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete portfolio item",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
