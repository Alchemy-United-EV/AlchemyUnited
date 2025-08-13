import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { generalRateLimit, corsOptions, sanitizeInputs } from "./security";
import { initSentry, sentryRequestHandler, sentryErrorHandler } from "./sentry";
import { logger, requestLogger, errorLogger } from "./logger";

// Initialize Sentry before creating Express app
initSentry();

const app = express();

// Sentry request handler must be first middleware (only if Sentry is configured)
if (process.env.SENTRY_DSN) {
  app.use(sentryRequestHandler());
}

// Trust proxy for accurate IP detection (required for rate limiting)
app.set('trust proxy', 1);

// Request logging
app.use(requestLogger);

// Security middleware - relaxed for development
if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  }));
} else {
  // Development mode - more permissive for Vite
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP in development for Vite compatibility
    crossOriginEmbedderPolicy: false,
  }));
}

app.use(cors(corsOptions));
app.use(generalRateLimit);

// Body parsing middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Input sanitization
app.use(sanitizeInputs);

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

// Serve static files from public directory
app.use(express.static("public"));

(async () => {
  const server = await registerRoutes(app);

  // Sentry error handler must be before other error handlers (only if Sentry is configured)
  if (process.env.SENTRY_DSN) {
    app.use(sentryErrorHandler());
  }
  
  // Error logging middleware
  app.use(errorLogger);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'This origin is not allowed by CORS policy'
      });
    }

    // Handle rate limiting errors
    if (err.statusCode === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: err.message
      });
    }

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        status,
        message,
        stack: err.stack,
        url: req.url,
        method: req.method,
      });
    }

    res.status(status).json({ 
      error: status >= 500 ? 'Internal Server Error' : 'Request Error',
      message: status >= 500 ? 'Something went wrong on our end' : message
    });
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
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
