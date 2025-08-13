import {
  users,
  earlyAccessApplications,
  hostApplications,
  type User,
  type InsertUser,
  type EarlyAccessApplication,
  type InsertEarlyAccessApplication,
  type HostApplication,
  type InsertHostApplication,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Early access application operations
  createEarlyAccessApplication(application: InsertEarlyAccessApplication): Promise<EarlyAccessApplication>;
  getAllEarlyAccessApplications(): Promise<EarlyAccessApplication[]>;
  getEarlyAccessApplicationById(id: string): Promise<EarlyAccessApplication | undefined>;
  updateEarlyAccessApplicationStatus(id: string, status: string): Promise<EarlyAccessApplication>;
  
  // Host application operations
  createHostApplication(application: InsertHostApplication): Promise<HostApplication>;
  getAllHostApplications(): Promise<HostApplication[]>;
  getHostApplicationById(id: string): Promise<HostApplication | undefined>;
  updateHostApplicationStatus(id: string, status: string): Promise<HostApplication>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Early access application operations
  async createEarlyAccessApplication(application: InsertEarlyAccessApplication): Promise<EarlyAccessApplication> {
    const [newApplication] = await db
      .insert(earlyAccessApplications)
      .values(application)
      .returning();
    return newApplication;
  }

  async getAllEarlyAccessApplications(): Promise<EarlyAccessApplication[]> {
    return await db
      .select()
      .from(earlyAccessApplications)
      .orderBy(desc(earlyAccessApplications.createdAt));
  }

  async getEarlyAccessApplicationById(id: string): Promise<EarlyAccessApplication | undefined> {
    const [application] = await db
      .select()
      .from(earlyAccessApplications)
      .where(eq(earlyAccessApplications.id, id));
    return application || undefined;
  }

  async updateEarlyAccessApplicationStatus(id: string, status: string): Promise<EarlyAccessApplication> {
    const [updated] = await db
      .update(earlyAccessApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(earlyAccessApplications.id, id))
      .returning();
    return updated;
  }

  // Host application operations
  async createHostApplication(application: InsertHostApplication): Promise<HostApplication> {
    const [newApplication] = await db
      .insert(hostApplications)
      .values(application)
      .returning();
    return newApplication;
  }

  async getAllHostApplications(): Promise<HostApplication[]> {
    return await db
      .select()
      .from(hostApplications)
      .orderBy(desc(hostApplications.createdAt));
  }

  async getHostApplicationById(id: string): Promise<HostApplication | undefined> {
    const [application] = await db
      .select()
      .from(hostApplications)
      .where(eq(hostApplications.id, id));
    return application || undefined;
  }

  async updateHostApplicationStatus(id: string, status: string): Promise<HostApplication> {
    const [updated] = await db
      .update(hostApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(hostApplications.id, id))
      .returning();
    return updated;
  }
}

// Temporarily using in-memory storage due to database connection issues
// Switch back to DatabaseStorage once database endpoint is re-enabled

export class MemStorage implements IStorage {
  private earlyAccessApps: Map<string, EarlyAccessApplication> = new Map();
  private hostApps: Map<string, HostApplication> = new Map();
  private users: Map<string, User> = new Map();

  constructor() {
    // Populate with test data
    this.seedTestData();
  }

  private seedTestData() {
    // Early Access test data
    const earlyAccessTestData: EarlyAccessApplication[] = [
      {
        id: "1",
        firstName: "Michael",
        lastName: "Thompson", 
        email: "michael.thompson@email.com",
        phone: "+1-555-0123",
        vehicleType: "Tesla Model S",
        chargingFrequency: "Daily",
        location: "San Francisco, CA",
        referralCode: "FRIEND2024",
        interests: "Interested in premium charging experiences and exclusive network access. Looking for fast, reliable charging for daily commute.",
        status: "pending",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15")
      },
      {
        id: "2",
        firstName: "Sarah",
        lastName: "Chen",
        email: "sarah.chen@email.com", 
        phone: "+1-555-0456",
        vehicleType: "BMW iX",
        chargingFrequency: "2-3 times per week",
        location: "Los Angeles, CA",
        referralCode: null,
        interests: "Executive who travels frequently for work. Needs reliable charging infrastructure for business trips.",
        status: "approved",
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-12")
      },
      {
        id: "3", 
        firstName: "David",
        lastName: "Rodriguez",
        email: "david.rodriguez@email.com",
        phone: "+1-555-0789",
        vehicleType: "Audi e-tron GT",
        chargingFrequency: "Weekly",
        location: "Miami, FL",
        referralCode: "VIP2024",
        interests: "Luxury vehicle owner interested in premium charging amenities and concierge services.",
        status: "pending",
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12")
      },
      {
        id: "4",
        firstName: "Emily", 
        lastName: "Johnson",
        email: "emily.johnson@email.com",
        phone: "+1-555-0321",
        vehicleType: "Mercedes EQS",
        chargingFrequency: "Daily", 
        location: "New York, NY",
        referralCode: null,
        interests: "Urban professional seeking consistent fast-charging options near office and residential areas.",
        status: "approved",
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-10")
      },
      {
        id: "5",
        firstName: "James",
        lastName: "Wilson", 
        email: "james.wilson@email.com",
        phone: "+1-555-0654",
        vehicleType: "Porsche Taycan",
        chargingFrequency: "4-5 times per week",
        location: "Seattle, WA",
        referralCode: null,
        interests: "Performance car enthusiast looking for ultra-fast charging and premium service experience.",
        status: "rejected",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-07")
      }
    ];

    // Host Applications test data
    const hostTestData: HostApplication[] = [
      {
        id: "1",
        businessName: "Grand Metropolitan Hotel",
        contactFirstName: "Robert",
        contactLastName: "Chen",
        email: "robert.chen@grandmet.com",
        phone: "+1-555-1111",
        propertyType: "Luxury Hotel",
        propertyAddress: "450 Park Avenue, New York, NY 10022",
        parkingSpaces: "50-100 spaces",
        electricalCapacity: "200+ kW available",
        expectedTraffic: "High (100+ vehicles/day)",
        operatingHours: "24/7",
        currentAmenities: "Valet parking, concierge service, restaurant, spa, business center",
        partnershipInterest: "Revenue sharing partnership",
        timeline: "3-6 months",
        additionalInfo: "Five-star hotel in Manhattan seeking to offer premium EV charging to guests. Existing valet service can integrate charging management. High-end clientele matches Alchemy target market.",
        status: "in-review",
        createdAt: new Date("2024-01-14"),
        updatedAt: new Date("2024-01-16")
      },
      {
        id: "2",
        businessName: "Silicon Valley Business Center",
        contactFirstName: "Lisa",
        contactLastName: "Park",
        email: "lisa.park@svbc.com",
        phone: "+1-555-2222",
        propertyType: "Office Complex",
        propertyAddress: "1600 Technology Drive, San Jose, CA 95110",
        parkingSpaces: "200+ spaces",
        electricalCapacity: "500+ kW available",
        expectedTraffic: "Very High (200+ vehicles/day)",
        operatingHours: "Monday-Friday 6AM-10PM",
        currentAmenities: "Security, food court, conference facilities, EV-ready infrastructure",
        partnershipInterest: "Installation partnership",
        timeline: "6-12 months",
        additionalInfo: "Premium office complex housing tech companies. Many employees drive luxury EVs. Existing electrical infrastructure can support high-capacity charging network.",
        status: "pending",
        createdAt: new Date("2024-01-11"),
        updatedAt: new Date("2024-01-11")
      },
      {
        id: "3",
        businessName: "Oceanview Shopping Plaza",
        contactFirstName: "Mark",
        contactLastName: "Davis",
        email: "mark.davis@oceanview.com", 
        phone: "+1-555-3333",
        propertyType: "Shopping Center",
        propertyAddress: "2500 Coastal Highway, Newport Beach, CA 92660",
        parkingSpaces: "100-200 spaces",
        electricalCapacity: "300+ kW available",
        expectedTraffic: "High (150+ vehicles/day)",
        operatingHours: "10AM-10PM daily",
        currentAmenities: "Premium retail stores, fine dining, valet service, security",
        partnershipInterest: "Revenue sharing partnership",
        timeline: "6-12 months",
        additionalInfo: "Upscale shopping destination attracting affluent customers. Perfect location for destination charging while shopping. High dwell time ideal for charging sessions.",
        status: "approved",
        createdAt: new Date("2024-01-09"),
        updatedAt: new Date("2024-01-13")
      }
    ];

    // Populate the maps
    earlyAccessTestData.forEach(app => this.earlyAccessApps.set(app.id, app));
    hostTestData.forEach(app => this.hostApps.set(app.id, app));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = Math.random().toString(36).substr(2, 9);
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Early access application operations
  async createEarlyAccessApplication(application: InsertEarlyAccessApplication): Promise<EarlyAccessApplication> {
    const id = Math.random().toString(36).substr(2, 9);
    const newApplication: EarlyAccessApplication = {
      ...application,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.earlyAccessApps.set(id, newApplication);
    return newApplication;
  }

  async getAllEarlyAccessApplications(): Promise<EarlyAccessApplication[]> {
    return Array.from(this.earlyAccessApps.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getEarlyAccessApplicationById(id: string): Promise<EarlyAccessApplication | undefined> {
    return this.earlyAccessApps.get(id);
  }

  async updateEarlyAccessApplicationStatus(id: string, status: string): Promise<EarlyAccessApplication> {
    const app = this.earlyAccessApps.get(id);
    if (!app) {
      throw new Error('Application not found');
    }
    const updated = { ...app, status, updatedAt: new Date() };
    this.earlyAccessApps.set(id, updated);
    return updated;
  }

  // Host application operations
  async createHostApplication(application: InsertHostApplication): Promise<HostApplication> {
    const id = Math.random().toString(36).substr(2, 9);
    const newApplication: HostApplication = {
      ...application,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.hostApps.set(id, newApplication);
    return newApplication;
  }

  async getAllHostApplications(): Promise<HostApplication[]> {
    return Array.from(this.hostApps.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getHostApplicationById(id: string): Promise<HostApplication | undefined> {
    return this.hostApps.get(id);
  }

  async updateHostApplicationStatus(id: string, status: string): Promise<HostApplication> {
    const app = this.hostApps.get(id);
    if (!app) {
      throw new Error('Application not found');
    }
    const updated = { ...app, status, updatedAt: new Date() };
    this.hostApps.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
