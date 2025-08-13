import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import DOMPurify from 'isomorphic-dompurify';

// Rate limiting configurations
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const formSubmissionRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 form submissions per hour
  message: {
    error: 'Too many form submissions from this IP, please try again later.',
    code: 'FORM_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per 15 minutes
  message: {
    error: 'Too many login attempts from this IP, please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation middleware
export const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message must not exceed 2000 characters'),
];

export const validatePartnerForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name must not exceed 200 characters'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message must not exceed 2000 characters'),
];

export const validateWaitlistForm = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
];

export const validateEarlyAccessForm = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('vehicleType')
    .trim()
    .isIn(['Tesla Model S', 'Tesla Model 3', 'Tesla Model X', 'Tesla Model Y', 'BMW i4', 'BMW iX', 'Mercedes EQS', 'Mercedes EQE', 'Audi e-tron', 'Lucid Air', 'Rivian R1T', 'Rivian R1S', 'Other'])
    .withMessage('Please select a valid vehicle type'),
  
  body('chargingFrequency')
    .trim()
    .isIn(['Daily', 'Weekly', 'Monthly', 'Occasionally'])
    .withMessage('Please select a valid charging frequency'),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Location must be between 2 and 200 characters'),
  
  body('referralCode')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Referral code must not exceed 50 characters'),
  
  body('interests')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Interests must not exceed 1000 characters'),
];

export const validateHostForm = [
  body('businessName')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Business name must be between 2 and 200 characters'),
  
  body('contactFirstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('contactLastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('contactEmail')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email address is too long'),
  
  body('contactPhone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('businessType')
    .trim()
    .isIn(['Restaurant', 'Hotel', 'Shopping Center', 'Office Building', 'Parking Garage', 'Gas Station', 'Other'])
    .withMessage('Please select a valid business type'),
  
  body('propertyAddress')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Property address must be between 10 and 500 characters'),
  
  body('parkingSpaces')
    .trim()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Number of parking spaces must be between 1 and 10,000'),
  
  body('electricalCapacity')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Electrical capacity must be between 2 and 100 characters'),
  
  body('timeline')
    .trim()
    .isIn(['Immediate', '1-3 months', '3-6 months', '6-12 months', '1+ years'])
    .withMessage('Please select a valid timeline'),
  
  body('partnershipInterest')
    .trim()
    .isIn(['Revenue Sharing', 'Flat Fee', 'Amenity for Customers', 'Other'])
    .withMessage('Please select a valid partnership interest'),
  
  body('additionalInfo')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Additional information must not exceed 2000 characters'),
];

// Input sanitization middleware
export const sanitizeInputs = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeValue = (value: any): any => {
    if (typeof value === 'string') {
      return DOMPurify.sanitize(value.trim());
    }
    if (typeof value === 'object' && value !== null) {
      const sanitized: any = {};
      for (const [key, val] of Object.entries(value)) {
        sanitized[key] = sanitizeValue(val);
      }
      return sanitized;
    }
    return value;
  };

  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  
  next();
};

// Validation error handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg
      }))
    });
  }
  next();
};

// CORS configuration
export const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    // In development, allow all origins for easier development
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // List of allowed origins for production
    const allowedOrigins = [
      'https://alchemyunited.org',
      'https://www.alchemyunited.org',
      ...(process.env.REPLIT_DOMAINS ? process.env.REPLIT_DOMAINS.split(',').map(domain => `https://${domain}`) : [])
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};