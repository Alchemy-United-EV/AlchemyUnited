import type { Express, Request, Response } from 'express';
import { googleWorkspaceService } from './google-workspace';
import { logger } from './logger';
import { storage } from './storage';

// Extend Express Request to include session
declare global {
  namespace Express {
    interface Request {
      session: any;
    }
  }
}

export function registerGoogleWorkspaceRoutes(app: Express) {
  // Initiate Google Workspace authorization
  app.get('/api/google/auth', async (req: Request, res: Response) => {
    try {
      const state = req.query.state as string || 'default';
      const authUrl = googleWorkspaceService.getAuthUrl(state);
      
      logger.info('Google Workspace auth initiated', { state });
      res.redirect(authUrl);
    } catch (error) {
      logger.error('Google auth initiation error:', error);
      res.status(500).json({ 
        message: 'Failed to initiate Google Workspace authorization',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Handle OAuth callback
  app.get('/api/google/callback', async (req: Request, res: Response) => {
    try {
      const { code, state, error } = req.query;

      if (error) {
        logger.error('Google OAuth error:', { error, state });
        return res.redirect('/?error=google_auth_denied');
      }

      if (!code) {
        logger.error('No authorization code received');
        return res.redirect('/?error=google_auth_failed');
      }

      const result = await googleWorkspaceService.handleCallback(code as string);
      
      // Store tokens securely (you might want to encrypt these)
      // For demo purposes, we'll store in session
      req.session.googleTokens = result.tokens;
      req.session.googleUser = result.user;

      logger.info('Google Workspace connected successfully', { 
        email: result.user.email,
        state 
      });

      // Redirect based on state or default to dashboard
      const redirectUrl = state === 'admin' ? '/dashboard' : '/?google_connected=true';
      res.redirect(redirectUrl);
    } catch (error) {
      logger.error('Google callback error:', error);
      res.redirect('/?error=google_auth_failed');
    }
  });

  // Send email via Gmail
  app.post('/api/google/send-email', async (req: Request, res: Response) => {
    try {
      const { to, subject, message } = req.body;
      const tokens = req.session.googleTokens;

      if (!tokens) {
        return res.status(401).json({ message: 'Google Workspace not connected' });
      }

      const result = await googleWorkspaceService.sendEmail(to, subject, message, tokens);
      
      res.json({ 
        success: true, 
        messageId: result.id,
        message: 'Email sent successfully via Gmail'
      });
    } catch (error) {
      logger.error('Send email error:', error);
      res.status(500).json({ 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create calendar event
  app.post('/api/google/calendar-event', async (req: Request, res: Response) => {
    try {
      const { summary, description, start, end, attendees } = req.body;
      const tokens = req.session.googleTokens;

      if (!tokens) {
        return res.status(401).json({ message: 'Google Workspace not connected' });
      }

      const result = await googleWorkspaceService.createCalendarEvent({
        summary,
        description,
        start,
        end,
        attendees
      }, tokens);
      
      res.json({ 
        success: true, 
        eventId: result.id,
        eventUrl: result.htmlLink,
        message: 'Calendar event created successfully'
      });
    } catch (error) {
      logger.error('Create calendar event error:', error);
      res.status(500).json({ 
        message: 'Failed to create calendar event',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Export leads to Google Sheets
  app.post('/api/google/export-leads', async (req: Request, res: Response) => {
    try {
      const tokens = req.session.googleTokens;

      if (!tokens) {
        return res.status(401).json({ message: 'Google Workspace not connected' });
      }

      // Get all leads from database - use getRecentLeads for broader coverage
      const leadsData = await storage.getRecentLeads(1000);
      
      // Create new spreadsheet
      const spreadsheet = await googleWorkspaceService.createSpreadsheet(
        `Alchemy United Leads - ${new Date().toLocaleDateString()}`,
        tokens
      );

      // Prepare data for sheets
      const headers = ['Name', 'Email', 'Type', 'Status', 'Created At', 'Phone', 'Location'];
      const rows = leadsData.map((lead: any) => [
        lead.name || '',
        lead.email,
        lead.type,
        lead.status || 'new',
        lead.createdAt?.toISOString() || '',
        lead.phone || '',
        lead.location || ''
      ]);

      // Add headers and data
      await googleWorkspaceService.appendToSheet(
        spreadsheet.spreadsheetId!,
        'A1:G1',
        [headers],
        tokens
      );

      await googleWorkspaceService.appendToSheet(
        spreadsheet.spreadsheetId!,
        'A2',
        rows,
        tokens
      );

      logger.info('Leads exported to Google Sheets', { 
        spreadsheetId: spreadsheet.spreadsheetId,
        leadCount: leadsData.length 
      });

      res.json({ 
        success: true, 
        spreadsheetId: spreadsheet.spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheet.spreadsheetId}`,
        leadCount: leadsData.length,
        message: 'Leads exported to Google Sheets successfully'
      });
    } catch (error) {
      logger.error('Export leads error:', error);
      res.status(500).json({ 
        message: 'Failed to export leads to Google Sheets',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get Google connection status
  app.get('/api/google/status', async (req: Request, res: Response) => {
    try {
      const tokens = req.session.googleTokens;
      const user = req.session.googleUser;

      if (!tokens || !user) {
        return res.json({ 
          connected: false,
          message: 'Google Workspace not connected'
        });
      }

      res.json({ 
        connected: true,
        user: {
          email: user.email,
          name: user.name,
          picture: user.picture
        },
        message: 'Google Workspace connected successfully'
      });
    } catch (error) {
      logger.error('Google status check error:', error);
      res.status(500).json({ 
        message: 'Failed to check Google connection status',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Disconnect Google Workspace
  app.post('/api/google/disconnect', async (req: Request, res: Response) => {
    try {
      delete req.session.googleTokens;
      delete req.session.googleUser;

      logger.info('Google Workspace disconnected');
      res.json({ 
        success: true,
        message: 'Google Workspace disconnected successfully'
      });
    } catch (error) {
      logger.error('Google disconnect error:', error);
      res.status(500).json({ 
        message: 'Failed to disconnect Google Workspace',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
}