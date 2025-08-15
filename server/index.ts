import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.set('trust proxy', 1);  // For correct req.ip in autoscale
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

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const PORT = Number(process.env.PORT) || 5000;
  
  // Production hardening for autoscale
  process.on('unhandledRejection', r => console.error('[DEPLOYMENT][unhandledRejection]', r));
  process.on('uncaughtException', e => console.error('[DEPLOYMENT][uncaughtException]', e));

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[DEPLOYMENT] Server started on port ${PORT}`);
    console.log(`[DEPLOYMENT] Build timestamp: ${new Date().toISOString()}`);
    console.log(`[DEPLOYMENT] Environment: ${process.env.NODE_ENV || 'development'}`);
    log(`serving on port ${PORT}`);
  });
})();
