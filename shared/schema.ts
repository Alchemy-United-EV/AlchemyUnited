// EMAIL-ONLY STORAGE TYPES - No database dependencies  
// Clean types for direct email/CRM integration (removed gas gauge from electric vehicle)

export interface User {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InsertUser {
  username: string;
  password: string;
}

// Early Access Application Types
export interface EarlyAccessApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  chargingFrequency: string;
  currentChargingMethod?: string;
  location: string;
  referralCode?: string;
  interests?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InsertEarlyAccessApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  chargingFrequency: string;
  currentChargingMethod?: string;
  location: string;
  referralCode?: string;
  interests?: string;
}

// Host Application Types
export interface HostApplication {
  id: string;
  businessName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyAddress: string;
  parkingSpaces: string;
  electricalCapacity: string;
  expectedTraffic: string;
  operatingHours: string;
  currentAmenities?: string;
  partnershipInterest: string;
  timeline: string;
  additionalInfo?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InsertHostApplication {
  businessName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyAddress: string;
  parkingSpaces: string;
  electricalCapacity: string;
  expectedTraffic: string;
  operatingHours: string;
  currentAmenities?: string;
  partnershipInterest: string;
  timeline: string;
  additionalInfo?: string;
}

// Form types for validation (simplified without zod/drizzle)
export type InsertEarlyAccessApplicationForm = InsertEarlyAccessApplication;
export type InsertHostApplicationForm = InsertHostApplication;