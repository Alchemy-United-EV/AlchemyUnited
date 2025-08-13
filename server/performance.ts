import express, { type Express, type Request, type Response, type NextFunction } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// Cache headers configuration
const CACHE_DURATIONS = {
  images: 31536000, // 1 year (365 days)
  fonts: 31536000,  // 1 year
  css: 604800,      // 1 week 
  js: 604800,       // 1 week
  html: 0,          // No cache for HTML
  json: 3600,       // 1 hour for JSON/API responses
  default: 86400    // 1 day default
};

// Get cache duration based on file extension
function getCacheDuration(filePath: string): number {
  const ext = path.extname(filePath).toLowerCase();
  
  switch (ext) {
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.webp':
    case '.avif':
    case '.gif':
    case '.svg':
      return CACHE_DURATIONS.images;
    case '.woff':
    case '.woff2':
    case '.ttf':
    case '.eot':
      return CACHE_DURATIONS.fonts;
    case '.css':
      return CACHE_DURATIONS.css;
    case '.js':
    case '.mjs':
      return CACHE_DURATIONS.js;
    case '.html':
    case '.htm':
      return CACHE_DURATIONS.html;
    case '.json':
      return CACHE_DURATIONS.json;
    default:
      return CACHE_DURATIONS.default;
  }
}

// Middleware for setting cache headers
export function setCacheHeaders(req: Request, res: Response, next: NextFunction) {
  const filePath = req.path;
  const cacheDuration = getCacheDuration(filePath);
  
  if (cacheDuration > 0) {
    // Set cache control headers
    res.set({
      'Cache-Control': `public, max-age=${cacheDuration}, immutable`,
      'Expires': new Date(Date.now() + (cacheDuration * 1000)).toUTCString(),
    });
    
    // Add ETag for validation
    res.set('ETag', `W/"${Date.now()}"`);
  } else {
    // No cache for HTML and dynamic content
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
  }
  
  next();
}

// Compression middleware for assets
export function setupCompression(app: Express) {
  // Serve compressed assets if available
  app.use('/assets', (req: Request, res: Response, next: NextFunction) => {
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const originalPath = req.path;
    const fullPath = path.join(process.cwd(), 'public/assets', originalPath);
    
    // Check for Brotli compression first
    if (acceptEncoding.includes('br')) {
      const brPath = fullPath + '.br';
      if (fs.existsSync(brPath)) {
        res.set('Content-Encoding', 'br');
        res.set('Content-Type', getMimeType(originalPath));
        return res.sendFile(brPath);
      }
    }
    
    // Check for Gzip compression
    if (acceptEncoding.includes('gzip')) {
      const gzPath = fullPath + '.gz';
      if (fs.existsSync(gzPath)) {
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', getMimeType(originalPath));
        return res.sendFile(gzPath);
      }
    }
    
    next();
  });
}

// Get MIME type for file
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.html': 'text/html',
    '.htm': 'text/html'
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

// Preload critical resources
export function setupResourceHints(app: Express) {
  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/' || req.path === '/index.html') {
      // Add resource hints for critical assets
      res.set({
        'Link': [
          '</assets/au-logo.png>; rel=preload; as=image',
          '</assets/hero-ev-charger.png>; rel=preload; as=image',
          '<https://fonts.googleapis.com>; rel=preconnect',
          '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
        ].join(', ')
      });
    }
    next();
  });
}

// Image optimization serve middleware
export function setupImageOptimization(app: Express) {
  app.use('/assets', async (req: Request, res: Response, next: NextFunction) => {
    const acceptHeader = req.headers.accept || '';
    const userAgent = req.headers['user-agent'] || '';
    const originalPath = req.path;
    const ext = path.extname(originalPath).toLowerCase();
    
    // Only process image requests
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return next();
    }
    
    const baseName = path.basename(originalPath, ext);
    const dirName = path.dirname(originalPath);
    const assetsDir = path.join(process.cwd(), 'public/assets');
    
    try {
      // Check if browser supports AVIF
      if (acceptHeader.includes('image/avif')) {
        const avifPath = path.join(assetsDir, dirName, baseName + '.avif');
        if (fs.existsSync(avifPath)) {
          res.set('Content-Type', 'image/avif');
          return res.sendFile(avifPath);
        }
      }
      
      // Check if browser supports WebP
      if (acceptHeader.includes('image/webp')) {
        const webpPath = path.join(assetsDir, dirName, baseName + '.webp');
        if (fs.existsSync(webpPath)) {
          res.set('Content-Type', 'image/webp');
          return res.sendFile(webpPath);
        }
      }
      
      // Fallback to original image
      next();
    } catch (error) {
      console.error('Image optimization error:', error);
      next();
    }
  });
}

// Performance monitoring middleware
export function performanceMonitoring(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const size = res.get('Content-Length') || 0;
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.path} - ${duration}ms`);
    }
    
    // Log large responses
    if (Number(size) > 1024 * 1024) { // 1MB
      console.warn(`Large response: ${req.method} ${req.path} - ${size} bytes`);
    }
  });
  
  next();
}

// Security headers for performance
export function setSecurityHeaders(req: Request, res: Response, next: NextFunction) {
  // DNS prefetch control
  res.set('X-DNS-Prefetch-Control', 'on');
  
  // Referrer policy for performance
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Feature policy for performance
  res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
}