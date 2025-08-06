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

export const storage = new DatabaseStorage();
