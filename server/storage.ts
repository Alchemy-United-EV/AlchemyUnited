import {
  users,
  earlyAccessApplications,
  hostApplications,
  verifications,
  members,
  leads,
  type User,
  type InsertUser,
  type EarlyAccessApplication,
  type InsertEarlyAccessApplication,
  type HostApplication,
  type InsertHostApplication,
  type Verification,
  type InsertVerification,
  type Member,
  type InsertMember,
  type Lead,
  type InsertLead,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { randomBytes } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
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
  
  // Verification operations
  createVerification(applicationId: string): Promise<Verification>;
  getVerificationByToken(token: string): Promise<Verification | undefined>;
  getVerificationByApplicationId(applicationId: string): Promise<Verification | undefined>;
  verifyEmail(token: string): Promise<{ verification: Verification; member: Member } | null>;
  
  // Member operations
  createMember(memberData: InsertMember): Promise<Member>;
  getMemberByEmail(email: string): Promise<Member | undefined>;
  getMemberByMembershipNumber(membershipNumber: string): Promise<Member | undefined>;
  
  // Leads operations
  createLead(data: InsertLead): Promise<Lead>;
  getRecentLeads(limit?: number): Promise<Lead[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
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

  // Verification operations
  async createVerification(applicationId: string): Promise<Verification> {
    const verificationToken = randomBytes(32).toString('hex');
    const invitationCode = `ALCHEMY-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString('hex').toUpperCase()}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    const [verification] = await db
      .insert(verifications)
      .values({
        applicationId,
        verificationToken,
        invitationCode,
        expiresAt,
      })
      .returning();
    return verification;
  }

  async getVerificationByToken(token: string): Promise<Verification | undefined> {
    const [verification] = await db
      .select()
      .from(verifications)
      .where(eq(verifications.verificationToken, token));
    return verification || undefined;
  }

  async getVerificationByApplicationId(applicationId: string): Promise<Verification | undefined> {
    const [verification] = await db
      .select()
      .from(verifications)
      .where(eq(verifications.applicationId, applicationId));
    return verification || undefined;
  }

  async verifyEmail(token: string): Promise<{ verification: Verification; member: Member } | null> {
    const verification = await this.getVerificationByToken(token);
    if (!verification || new Date() > verification.expiresAt) {
      return null;
    }

    // Get the application data
    const application = await this.getEarlyAccessApplicationById(verification.applicationId);
    if (!application) {
      return null;
    }

    // Generate membership number
    const membershipNumber = `AU-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString('hex').toUpperCase()}`;

    // Create member profile
    const [member] = await db
      .insert(members)
      .values({
        applicationId: verification.applicationId,
        verificationId: verification.id,
        membershipNumber,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        phone: application.phone,
        vehicleType: application.vehicleType,
      })
      .returning();

    // Update verification status
    const [updatedVerification] = await db
      .update(verifications)
      .set({
        status: 'verified',
        emailVerified: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(verifications.id, verification.id))
      .returning();

    return { verification: updatedVerification, member };
  }

  // Member operations
  async createMember(memberData: InsertMember): Promise<Member> {
    const [member] = await db
      .insert(members)
      .values(memberData)
      .returning();
    return member;
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));
    return member || undefined;
  }

  async getMemberByMembershipNumber(membershipNumber: string): Promise<Member | undefined> {
    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.membershipNumber, membershipNumber));
    return member || undefined;
  }

  // Leads operations
  async createLead(data: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(data)
      .returning();
    return lead;
  }

  async getRecentLeads(limit = 200): Promise<Lead[]> {
    const recentLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(limit);
    return recentLeads;
  }
}

export const storage = new DatabaseStorage();
