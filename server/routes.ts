import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, portfolioFormSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

// Middleware to check admin authentication
const requireAuth = async (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  // Extract and decode credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (!username || !password) {
    return res.status(401).json({ message: 'Invalid credentials format' });
  }
  
  // Validate admin credentials
  const isValid = await storage.validateAdmin(username, password);
  
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const isValid = await storage.validateAdmin(username, password);
      
      if (isValid) {
        return res.status(200).json({ 
          message: 'Authentication successful',
          // In a real app, we would generate a JWT token here
          token: Buffer.from(`${username}:${password}`).toString('base64')
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Authentication error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Contact form submission (public endpoint)
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
      // Generic error response
      return res.status(500).json({
        message: "An unexpected error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", requireAuth, async (_req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve contacts",
      });
    }
  });

  // Portfolio endpoints
  // Get all portfolio items (public endpoint)
  app.get("/api/portfolio", async (_req: Request, res: Response) => {
    try {
      const portfolioItems = await storage.getPortfolioItems();
      return res.status(200).json(portfolioItems);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve portfolio items",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
  
  // Get a single portfolio item (public endpoint)
  app.get("/api/portfolio/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const portfolioItem = await storage.getPortfolioItem(id);
      if (!portfolioItem) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      return res.status(200).json(portfolioItem);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to retrieve portfolio item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
  
  // Create a portfolio item (admin endpoint)
  app.post("/api/portfolio", requireAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }
      
      const { title, category, categories, rowSpan } = req.body;
      
      // Validate the data
      const validatedData = portfolioFormSchema.parse({
        title,
        category,
        categories,
        rowSpan: parseInt(rowSpan),
        image: `/uploads/${req.file.filename}` // Path to the uploaded image
      });
      
      // Create portfolio item
      const portfolioItem = await storage.createPortfolioItem({
        ...validatedData,
        createdAt: new Date().toISOString()
      });
      
      return res.status(201).json({
        message: "Portfolio item created successfully",
        portfolioItem
      });
    } catch (error) {
      // Delete uploaded file if there's an error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      
      return res.status(500).json({
        message: "Failed to create portfolio item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
  
  // Delete a portfolio item (admin endpoint)
  app.delete("/api/portfolio/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      // Get the portfolio item to find the image path
      const portfolioItem = await storage.getPortfolioItem(id);
      if (!portfolioItem) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      // Delete the portfolio item from database
      const success = await storage.deletePortfolioItem(id);
      
      if (success) {
        // Delete the image file
        if (portfolioItem.image && portfolioItem.image.startsWith('/uploads/')) {
          const imagePath = path.join(process.cwd(), portfolioItem.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        
        return res.status(200).json({ message: "Portfolio item deleted successfully" });
      } else {
        return res.status(500).json({ message: "Failed to delete portfolio item" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete portfolio item",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
