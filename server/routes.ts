import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEarlyAccessApplicationSchema, insertHostApplicationSchema, insertLeadSchema } from "@shared/schema";
import { sendVerificationEmail, sendLeadNotification } from "./email";
import { authenticateToken, loginHandler, getCurrentUserHandler, type AuthenticatedRequest } from "./auth";
import { 
  formSubmissionRateLimit, 
  authRateLimit,
  validateContactForm,
  validatePartnerForm,
  validateWaitlistForm,
  validateEarlyAccessForm,
  validateHostForm,
  handleValidationErrors
} from "./security";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes with rate limiting
  app.post('/api/auth/login', authRateLimit, loginHandler);
  app.get('/api/auth/me', authenticateToken, getCurrentUserHandler);

  // Protected dashboard routes (require authentication)
  // Early Access Applications API
  app.post('/api/early-access-applications', 
    formSubmissionRateLimit,
    validateEarlyAccessForm,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      try {
        const validatedData = insertEarlyAccessApplicationSchema.parse(req.body);
        const application = await storage.createEarlyAccessApplication(validatedData);
        res.status(201).json(application);
      } catch (error) {
        console.error('Error creating early access application:', error);
        res.status(400).json({ error: 'Invalid application data' });
      }
    });

  app.get('/api/early-access-applications', authenticateToken, async (req, res) => {
    try {
      const applications = await storage.getAllEarlyAccessApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching early access applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });

  app.get('/api/early-access-applications/:id', authenticateToken, async (req, res) => {
    try {
      const application = await storage.getEarlyAccessApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error fetching early access application:', error);
      res.status(500).json({ error: 'Failed to fetch application' });
    }
  });

  app.patch('/api/early-access-applications/:id/status', authenticateToken, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      const application = await storage.updateEarlyAccessApplicationStatus(req.params.id, status);
      res.json(application);
    } catch (error) {
      console.error('Error updating early access application status:', error);
      res.status(500).json({ error: 'Failed to update application' });
    }
  });

  // Host Applications API
  app.post('/api/host-applications', 
    formSubmissionRateLimit,
    validateHostForm,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      try {
        const validatedData = insertHostApplicationSchema.parse(req.body);
        const application = await storage.createHostApplication(validatedData);
        res.status(201).json(application);
      } catch (error) {
        console.error('Error creating host application:', error);
        res.status(400).json({ error: 'Invalid application data' });
      }
    });

  app.get('/api/host-applications', authenticateToken, async (req, res) => {
    try {
      const applications = await storage.getAllHostApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching host applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });

  app.get('/api/host-applications/:id', authenticateToken, async (req, res) => {
    try {
      const application = await storage.getHostApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error fetching host application:', error);
      res.status(500).json({ error: 'Failed to fetch application' });
    }
  });

  app.patch('/api/host-applications/:id/status', authenticateToken, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !['pending', 'approved', 'rejected', 'in-review'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      const application = await storage.updateHostApplicationStatus(req.params.id, status);
      res.json(application);
    } catch (error) {
      console.error('Error updating host application status:', error);
      res.status(500).json({ error: 'Failed to update application' });
    }
  });

  // Verification and Member Management API
  app.post('/api/send-verification/:applicationId', async (req, res) => {
    try {
      const { applicationId } = req.params;
      
      // Check if application exists and is approved
      const application = await storage.getEarlyAccessApplicationById(applicationId);
      if (!application || application.status !== 'approved') {
        return res.status(400).json({ error: 'Application not found or not approved' });
      }

      // Check if verification already exists
      let verification = await storage.getVerificationByApplicationId(applicationId);
      if (!verification) {
        verification = await storage.createVerification(applicationId);
      }

      // Send professional verification email
      const verificationUrl = `${req.protocol}://${req.get('host')}/verify?token=${verification.verificationToken}`;
      
      const emailSent = await sendVerificationEmail({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        verificationUrl,
        invitationCode: verification.invitationCode || ''
      });

      res.json({
        message: emailSent ? 'Verification email sent successfully' : 'Verification created (email not configured)',
        verificationToken: verification.verificationToken,
        invitationCode: verification.invitationCode,
        verificationUrl,
        emailSent
      });
    } catch (error) {
      console.error('Error sending verification:', error);
      res.status(500).json({ error: 'Failed to send verification' });
    }
  });

  app.post('/api/verify-email', async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ error: 'Verification token required' });
      }

      const result = await storage.verifyEmail(token);
      if (!result) {
        return res.status(400).json({ error: 'Invalid or expired verification token' });
      }

      res.json({
        message: 'Email verified successfully',
        member: result.member,
        verification: result.verification
      });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Failed to verify email' });
    }
  });

  app.get('/api/member/:membershipNumber', async (req, res) => {
    try {
      const { membershipNumber } = req.params;
      const member = await storage.getMemberByMembershipNumber(membershipNumber);
      
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      res.json(member);
    } catch (error) {
      console.error('Error fetching member:', error);
      res.status(500).json({ error: 'Failed to fetch member' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  // Leads: Contact / Partner / Waitlist
  const contactSchema = insertLeadSchema.extend({
    type: z.literal("contact"),
    name: z.string().min(2),
    message: z.string().min(3)
  });

  const partnerSchema = insertLeadSchema.extend({
    type: z.literal("partner"),
    name: z.string().min(2),
  });

  const waitlistSchema = insertLeadSchema.extend({
    type: z.literal("waitlist"),
  }).pick({ type: true, email: true });

  app.post('/api/contact', 
    formSubmissionRateLimit,
    validateContactForm,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      try {
        const data = contactSchema.parse({ ...req.body, type: "contact" });
        const lead = await storage.createLead(data);
        await sendLeadNotification(
          "[Alchemy United] New Contact Lead",
          `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || ""}\n\nMessage:\n${data.message || ""}`
        );
        res.status(201).json({ ok: true, message: "Thanks — we'll be in touch shortly.", leadId: lead.id });
      } catch (err) {
        console.error("contact error:", err);
        res.status(400).json({ error: "Invalid contact data" });
      }
    });

  app.post('/api/partner', 
    formSubmissionRateLimit,
    validatePartnerForm,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      try {
        const data = partnerSchema.parse({ ...req.body, type: "partner" });
        const lead = await storage.createLead(data);
        await sendLeadNotification(
          "[Alchemy United] New Partner/Advertiser Inquiry",
          `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || ""}\nCompany: ${data.company || ""}\n\nNotes:\n${data.message || ""}`
        );
        res.status(201).json({ ok: true, message: "Thanks — our team will reach out about partnership options.", leadId: lead.id });
      } catch (err) {
        console.error("partner error:", err);
        res.status(400).json({ error: "Invalid partner data" });
      }
    });

  app.post('/api/waitlist', 
    formSubmissionRateLimit,
    validateWaitlistForm,
    handleValidationErrors,
    async (req: Request, res: Response) => {
      try {
        const data = waitlistSchema.parse({ ...req.body, type: "waitlist" });
        const lead = await storage.createLead(data);
        await sendLeadNotification(
          "[Alchemy United] New Waitlist Signup",
          `Email: ${data.email}`
        );
        res.status(201).json({ ok: true, message: "You're on the list — we'll notify you soon.", leadId: lead.id });
      } catch (err) {
        console.error("waitlist error:", err);
        res.status(400).json({ error: "Invalid waitlist data" });
      }
    });

  // Admin fetch of recent leads with search and filtering (protected)
  app.get('/api/leads', authenticateToken, async (req, res) => {
    try {
      const { search, status, sortBy, sortOrder, limit } = req.query;
      
      if (search || status || sortBy || sortOrder) {
        // Use enhanced search with filters
        const leads = await storage.searchLeads(
          search as string,
          status as string,
          sortBy as string,
          sortOrder as string
        );
        res.json(leads);
      } else {
        // Default to recent leads
        const limitNum = Math.min(Number(limit) || 200, 1000);
        const rows = await storage.getRecentLeads(limitNum);
        res.json(rows);
      }
    } catch (err) {
      console.error("get leads error:", err);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Update lead status (protected)
  app.patch('/api/leads/:id/status', authenticateToken, async (req, res) => {
    try {
      const leadId = parseInt(req.params.id);
      const { status } = req.body;

      // Validate lead ID
      if (isNaN(leadId)) {
        return res.status(400).json({ error: 'Invalid lead ID' });
      }

      // Validate status
      if (!status || !['new', 'contacted', 'converted'].includes(status)) {
        return res.status(400).json({ 
          error: 'Invalid status. Must be one of: new, contacted, converted' 
        });
      }

      const updatedLead = await storage.updateLeadStatus(leadId, status);
      res.json({ 
        ok: true, 
        message: 'Lead status updated successfully',
        lead: updatedLead 
      });
    } catch (err) {
      console.error("update lead status error:", err);
      res.status(500).json({ error: "Failed to update lead status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
