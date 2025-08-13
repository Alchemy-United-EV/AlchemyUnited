import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { Request, Response } from 'express';
import { logger } from './logger';

export class GoogleWorkspaceService {
  private oauth2Client: OAuth2Client | null = null;
  private scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  constructor() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.warn('Google Workspace credentials not configured. Google features will be disabled.');
      return;
    }

    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.REPLIT_DEV_DOMAIN || 'https://your-domain.replit.app'}/api/google/callback`
    );
  }

  // Generate authorization URL
  getAuthUrl(state?: string): string {
    if (!this.oauth2Client) {
      throw new Error('Google OAuth client not initialized');
    }
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      state,
      prompt: 'consent'
    });
  }

  // Handle OAuth callback
  async handleCallback(code: string) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      const { tokens } = await this.oauth2Client.getAccessToken(code);
      if (tokens) {
        this.oauth2Client.setCredentials(tokens);
      }
      
      // Get user info
      const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
      const userInfo = await oauth2.userinfo.get();
      
      logger.info('Google Workspace connection successful', {
        email: userInfo.data.email,
        name: userInfo.data.name
      });

      return {
        tokens,
        user: userInfo.data
      };
    } catch (error) {
      logger.error('Google Workspace callback error:', error);
      throw error;
    }
  }

  // Gmail operations
  async sendEmail(to: string, subject: string, message: string, tokens: any) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      this.oauth2Client.setCredentials(tokens);
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

      const email = [
        `To: ${to}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        message
      ].join('\n');

      const encodedMessage = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage
        }
      });

      logger.info('Email sent via Gmail', { messageId: result.data.id, to });
      return result.data;
    } catch (error) {
      logger.error('Gmail send error:', error);
      throw error;
    }
  }

  // Google Calendar operations
  async createCalendarEvent(eventDetails: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: string[];
  }, tokens: any) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      this.oauth2Client.setCredentials(tokens);
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.start,
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: eventDetails.end,
          timeZone: 'America/New_York'
        },
        attendees: eventDetails.attendees?.map(email => ({ email }))
      };

      const result = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event
      });

      logger.info('Calendar event created', { eventId: result.data.id });
      return result.data;
    } catch (error) {
      logger.error('Calendar event creation error:', error);
      throw error;
    }
  }

  // Google Sheets operations
  async createSpreadsheet(title: string, tokens: any) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      this.oauth2Client.setCredentials(tokens);
      const sheets = google.sheets({ version: 'v4', auth: this.oauth2Client });

      const result = await sheets.spreadsheets.create({
        requestBody: {
          properties: {
            title
          }
        }
      });

      logger.info('Spreadsheet created', { spreadsheetId: result.data.spreadsheetId });
      return result.data;
    } catch (error) {
      logger.error('Spreadsheet creation error:', error);
      throw error;
    }
  }

  async appendToSheet(spreadsheetId: string, range: string, values: any[][], tokens: any) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      this.oauth2Client.setCredentials(tokens);
      const sheets = google.sheets({ version: 'v4', auth: this.oauth2Client });

      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values
        }
      });

      logger.info('Data appended to sheet', { spreadsheetId, range });
      return result.data;
    } catch (error) {
      logger.error('Sheet append error:', error);
      throw error;
    }
  }

  // Google Drive operations
  async uploadFile(fileName: string, mimeType: string, fileData: Buffer, tokens: any) {
    try {
      if (!this.oauth2Client) {
        throw new Error('Google OAuth client not initialized');
      }
      this.oauth2Client.setCredentials(tokens);
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      const result = await drive.files.create({
        requestBody: {
          name: fileName
        },
        media: {
          mimeType,
          body: fileData
        }
      });

      logger.info('File uploaded to Drive', { fileId: result.data.id, fileName });
      return result.data;
    } catch (error) {
      logger.error('Drive upload error:', error);
      throw error;
    }
  }
}

export const googleWorkspaceService = new GoogleWorkspaceService();