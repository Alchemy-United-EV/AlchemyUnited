import type { Request, Response, NextFunction } from 'express';

// Simple honeypot middleware to catch bots
export const honeypotMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check for honeypot field (should be empty)
  if (req.body.website || req.body.url || req.body.homepage) {
    console.log('Honeypot triggered:', req.body);
    return res.status(400).json({ message: 'Invalid request' });
  }
  
  // Check for too many fields (potential spam)
  const fieldCount = Object.keys(req.body).length;
  if (fieldCount > 25) {
    console.log('Too many fields:', fieldCount);
    return res.status(400).json({ message: 'Invalid request' });
  }

  next();
};

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 form submissions per 15 minutes per IP

  const key = `${ip}:form-submit`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    next();
  } else if (record.count < maxRequests) {
    record.count++;
    next();
  } else {
    console.log('Rate limit exceeded:', ip);
    return res.status(429).json({ 
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    });
  }
};

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  rateLimitStore.forEach((record, key) => {
    if (now > record.resetTime) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => rateLimitStore.delete(key));
}, 5 * 60 * 1000); // Clean every 5 minutes