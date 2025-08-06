import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEarlyAccessApplicationSchema, insertHostApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Early Access Applications API
  app.post('/api/early-access-applications', async (req, res) => {
    try {
      const validatedData = insertEarlyAccessApplicationSchema.parse(req.body);
      const application = await storage.createEarlyAccessApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      console.error('Error creating early access application:', error);
      res.status(400).json({ error: 'Invalid application data' });
    }
  });

  app.get('/api/early-access-applications', async (req, res) => {
    try {
      const applications = await storage.getAllEarlyAccessApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching early access applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });

  app.get('/api/early-access-applications/:id', async (req, res) => {
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

  app.patch('/api/early-access-applications/:id/status', async (req, res) => {
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
  app.post('/api/host-applications', async (req, res) => {
    try {
      const validatedData = insertHostApplicationSchema.parse(req.body);
      const application = await storage.createHostApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      console.error('Error creating host application:', error);
      res.status(400).json({ error: 'Invalid application data' });
    }
  });

  app.get('/api/host-applications', async (req, res) => {
    try {
      const applications = await storage.getAllHostApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching host applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });

  app.get('/api/host-applications/:id', async (req, res) => {
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

  app.patch('/api/host-applications/:id/status', async (req, res) => {
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

      // In a real app, you'd send an email here with the verification link
      // For now, we'll return the verification info for testing
      res.json({
        message: 'Verification email sent successfully',
        verificationToken: verification.verificationToken,
        invitationCode: verification.invitationCode,
        verificationUrl: `${req.protocol}://${req.get('host')}/verify?token=${verification.verificationToken}`
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

  const httpServer = createServer(app);
  return httpServer;
}
