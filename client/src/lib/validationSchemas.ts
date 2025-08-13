import { z } from "zod";

// Enhanced validation schemas with better error messages
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  phone: z.string()
    .optional()
    .refine((val) => !val || val.length === 0 || /^[\+]?[1-9][\d]{9,15}$/.test(val), "Please enter a valid phone number"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export const partnerFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  phone: z.string()
    .optional()
    .refine((val) => !val || val.length === 0 || /^[\+]?[1-9][\d]{9,15}$/.test(val), "Please enter a valid phone number"),
  company: z.string()
    .optional()
    .refine((val) => !val || val.length <= 200, "Company name cannot exceed 200 characters"),
  message: z.string()
    .optional()
    .refine((val) => !val || val.length <= 2000, "Message cannot exceed 2000 characters"),
});

export const waitlistFormSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
});

export const earlyAccessFormSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{9,15}$/, "Please enter a valid phone number"),
  vehicleType: z.string()
    .min(1, "Please select your vehicle type"),
  chargingFrequency: z.string()
    .min(1, "Please select how often you charge"),
  location: z.string()
    .min(5, "Please enter your city and state")
    .max(200, "Location cannot exceed 200 characters"),
  referralCode: z.string()
    .optional()
    .refine((val) => !val || val.length <= 50, "Referral code cannot exceed 50 characters"),
  interests: z.string()
    .optional()
    .refine((val) => !val || val.length <= 1000, "Interests cannot exceed 1000 characters"),
});

export const hostApplicationFormSchema = z.object({
  businessName: z.string()
    .min(2, "Business name must be at least 2 characters")
    .max(200, "Business name cannot exceed 200 characters"),
  contactFirstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  contactLastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{9,15}$/, "Please enter a valid phone number"),
  propertyType: z.string()
    .min(1, "Please select your property type"),
  propertyAddress: z.string()
    .min(10, "Please enter complete property address")
    .max(500, "Address cannot exceed 500 characters"),
  parkingSpaces: z.string()
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 1 && num <= 10000;
    }, "Please enter a valid number of parking spaces (1-10,000)"),
  electricalCapacity: z.string()
    .min(1, "Please enter electrical capacity information")
    .max(100, "Electrical capacity cannot exceed 100 characters"),
  expectedTraffic: z.string()
    .min(1, "Please estimate expected daily traffic"),
  operatingHours: z.string()
    .min(1, "Please specify operating hours"),
  currentAmenities: z.string()
    .optional()
    .refine((val) => !val || val.length <= 1000, "Current amenities cannot exceed 1000 characters"),
  partnershipInterest: z.string()
    .min(1, "Please select your partnership interest"),
  timeline: z.string()
    .min(1, "Please select your preferred timeline"),
  additionalInfo: z.string()
    .optional()
    .refine((val) => !val || val.length <= 2000, "Additional information cannot exceed 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PartnerFormData = z.infer<typeof partnerFormSchema>;
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;
export type EarlyAccessFormData = z.infer<typeof earlyAccessFormSchema>;
export type HostApplicationFormData = z.infer<typeof hostApplicationFormSchema>;