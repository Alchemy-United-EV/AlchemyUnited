import { apiRequest } from "./queryClient";

// Centralized API configuration
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  endpoints: {
    contact: '/api/contact',
    partner: '/api/partner', 
    waitlist: '/api/waitlist',
  }
} as const;

// API Types
export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface PartnerSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}

export interface WaitlistSubmission {
  email: string;
}

export interface APIResponse {
  ok: boolean;
  message: string;
  leadId?: number;
}

// API Functions
export async function submitContact(data: ContactSubmission): Promise<APIResponse> {
  const response = await apiRequest('POST', API_CONFIG.endpoints.contact, {
    type: 'contact',
    ...data
  });
  return response.json();
}

export async function submitPartner(data: PartnerSubmission): Promise<APIResponse> {
  const response = await apiRequest('POST', API_CONFIG.endpoints.partner, {
    type: 'partner',
    ...data
  });
  return response.json();
}

export async function submitWaitlist(data: WaitlistSubmission): Promise<APIResponse> {
  const response = await apiRequest('POST', API_CONFIG.endpoints.waitlist, {
    type: 'waitlist',
    ...data
  });
  return response.json();
}