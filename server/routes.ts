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

  const httpServer = createServer(app);
  return httpServer;
}
