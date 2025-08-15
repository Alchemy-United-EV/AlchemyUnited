// ELECTRIC VEHICLE MODE: Disable all database environment variables
process.env.DATABASE_URL = "";
process.env.PGDATABASE = "";
process.env.PGUSER = "";
process.env.PGPASSWORD = "";
process.env.PGHOST = "";
process.env.PGPORT = "";

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

console.log('[HANDOFF] Database environment disabled - electric vehicle mode active');

const app = express();
app.set('trust proxy', 1);  // For correct req.ip in autoscale

// A) Health endpoint FIRST so Vite dev middleware can't intercept it
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
      let logLine = `[DEPLOYMENT] ${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse && path !== "/api/health") {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

// Serve static files from public directory
app.use(express.static("public"));

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // B) Disable Vite dev middleware in production
  const isProd = process.env.NODE_ENV === 'production';
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (!isProd) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // C) Production deployment configuration with port management
  const PORT = Number(process.env.PORT) || 5000;
  
  // Production hardening for autoscale
  process.on('unhandledRejection', r => console.error('[DEPLOYMENT][unhandledRejection]', r));
  process.on('uncaughtException', e => {
    console.error('[DEPLOYMENT][uncaughtException]', e);
    if (e.code === 'EADDRINUSE') {
      console.log('[DEPLOYMENT] Port conflict detected - attempting restart...');
      process.exit(1);
    }
  });

  // Graceful port handling
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[DEPLOYMENT] Port ${PORT} busy - attempting alternate port...`);
      const altPort = PORT + Math.floor(Math.random() * 100);
      server.listen(altPort, '0.0.0.0', () => {
        console.log(`[DEPLOYMENT] Server listening on ${altPort} (alternate)`);
        console.log(`[DEPLOYMENT] Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } else {
      throw err;
    }
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[DEPLOYMENT] Server listening on ${PORT}`);
    console.log(`[DEPLOYMENT] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[DEPLOYMENT] Build timestamp: ${new Date().toISOString()}`);
  });
})();
