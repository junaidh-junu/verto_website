import express, { type Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage, MemStorage } from "./storage";
import { connectToDatabase } from './db';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Middleware for API logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Create HTTP server
    const server = await registerRoutes(app);
    
    // Start listening on port
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    server.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    }).on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${PORT} is in use, attempting to use a random available port...`);
        server.close(() => {
          server.listen(0, () => {
            const address = server.address();
            if (address && typeof address === 'object') {
              console.log(`Server started on http://localhost:${address.port}`);
            } else {
              console.log('Server started on an auto-assigned port');
            }
          });
        });
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
    
    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
  
      res.status(status).json({ message });
      throw err;
    });
  
    // Setup for development or production environment
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
