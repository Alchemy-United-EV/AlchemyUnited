import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, pgEnum, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"), // admin role for dashboard access
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
}).extend({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;

// Early Access Applications Table
export const earlyAccessApplications = pgTable("early_access_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  vehicleType: varchar("vehicle_type").notNull(),
  chargingFrequency: varchar("charging_frequency").notNull(),
  location: varchar("location").notNull(),
  referralCode: varchar("referral_code"),
  interests: text("interests"),
  status: varchar("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type EarlyAccessApplication = typeof earlyAccessApplications.$inferSelect;
export type InsertEarlyAccessApplication = typeof earlyAccessApplications.$inferInsert;

// Host Applications Table
export const hostApplications = pgTable("host_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessName: varchar("business_name").notNull(),
  contactFirstName: varchar("contact_first_name").notNull(),
  contactLastName: varchar("contact_last_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  propertyType: varchar("property_type").notNull(),
  propertyAddress: text("property_address").notNull(),
  parkingSpaces: varchar("parking_spaces").notNull(),
  electricalCapacity: varchar("electrical_capacity").notNull(),
  expectedTraffic: varchar("expected_traffic").notNull(),
  operatingHours: varchar("operating_hours").notNull(),
  currentAmenities: text("current_amenities"),
  partnershipInterest: varchar("partnership_interest").notNull(),
  timeline: varchar("timeline").notNull(),
  additionalInfo: text("additional_info"),
  agreeToTerms: boolean("agree_to_terms").notNull().default(false),
  status: varchar("status").default("pending"), // pending, approved, rejected, in-review
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type HostApplication = typeof hostApplications.$inferSelect;
export type InsertHostApplication = typeof hostApplications.$inferInsert;

// Zod schemas for validation
export const insertEarlyAccessApplicationSchema = createInsertSchema(earlyAccessApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export const insertHostApplicationSchema = createInsertSchema(hostApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export type InsertEarlyAccessApplicationForm = z.infer<typeof insertEarlyAccessApplicationSchema>;
export type InsertHostApplicationForm = z.infer<typeof insertHostApplicationSchema>;

// Verification and Invitations Table
export const verifications = pgTable("verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => earlyAccessApplications.id),
  verificationToken: varchar("verification_token").notNull().unique(),
  invitationCode: varchar("invitation_code").unique(),
  status: varchar("status").default("pending"), // pending, verified, expired
  emailVerified: timestamp("email_verified"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Verification = typeof verifications.$inferSelect;
export type InsertVerification = typeof verifications.$inferInsert;

// Member profiles for verified users
export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => earlyAccessApplications.id),
  verificationId: varchar("verification_id").notNull().references(() => verifications.id),
  membershipNumber: varchar("membership_number").notNull().unique(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone").notNull(),
  vehicleType: varchar("vehicle_type").notNull(),
  membershipStatus: varchar("membership_status").default("active"), // active, suspended, cancelled
  joinedAt: timestamp("joined_at").defaultNow(),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;

// --- Leads schema ---
export const leadTypeEnum = pgEnum("lead_type", ["contact", "partner", "waitlist"]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "converted"]);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  type: leadTypeEnum("type").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message"),
  status: leadStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const insertLeadSchema = createInsertSchema(leads, {
  email: z.string().email(),
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1).optional()
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true
});

export const updateLeadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "converted"])
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type UpdateLeadStatus = z.infer<typeof updateLeadStatusSchema>;
