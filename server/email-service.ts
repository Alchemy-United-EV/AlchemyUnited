import { readFileSync } from 'fs';
import { join } from 'path';
import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not provided, email service will be disabled");
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface BaseEmailData {
  to: string;
  from?: string;
}

interface LeadConfirmationData extends BaseEmailData {
  email: string;
  name: string;
}

interface PartnerFollowupData extends BaseEmailData {
  partnerName: string;
  email: string;
  schedulingLink: string;
  proposalLink: string;
}

interface AdminNotificationData extends BaseEmailData {
  leadType: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  leadCompany?: string;
  leadMessage?: string;
  leadSource: string;
  leadId: string;
  timestamp: string;
  isHighPriority: boolean;
  totalToday: number;
  newCount: number;
  responseTime: string;
  dashboardUrl: string;
  leadUrl: string;
  settingsUrl: string;
}

class EmailService {
  private templateCache: Map<string, string> = new Map();
  private fromEmail: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'hello@alchemyunited.com';
  }

  private loadTemplate(templateName: string): string {
    if (this.templateCache.has(templateName)) {
      return this.templateCache.get(templateName)!;
    }

    try {
      const templatePath = join(__dirname, 'email-templates', `${templateName}.html`);
      const template = readFileSync(templatePath, 'utf8');
      this.templateCache.set(templateName, template);
      return template;
    } catch (error) {
      console.error(`Failed to load email template: ${templateName}`, error);
      throw new Error(`Email template ${templateName} not found`);
    }
  }

  private replaceTemplateVars(template: string, data: Record<string, any>): string {
    let result = template;

    // Replace simple variables {{variable}}
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, String(data[key] || ''));
    });

    // Handle conditional blocks {{#if variable}}...{{/if}}
    result = result.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/g, (match, variable, content) => {
      return data[variable] ? content : '';
    });

    // Clean up any remaining template variables
    result = result.replace(/{{.*?}}/g, '');

    return result;
  }

  async sendLeadConfirmation(data: LeadConfirmationData): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('Email service disabled - would send lead confirmation to:', data.to);
        return false;
      }

      const template = this.loadTemplate('lead-confirmation');
      const html = this.replaceTemplateVars(template, {
        email: data.email,
        name: data.name
      });

      const msg = {
        to: data.to,
        from: data.from || this.fromEmail,
        subject: 'Welcome to Alchemy United - Your Inquiry Received',
        html,
        text: `Thank you for your interest in Alchemy United! We've received your inquiry and will respond within 24 hours.`
      };

      await sgMail.send(msg);
      console.log('Lead confirmation email sent successfully to:', data.to);
      return true;
    } catch (error) {
      console.error('Failed to send lead confirmation email:', error);
      return false;
    }
  }

  async sendPartnerFollowup(data: PartnerFollowupData): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('Email service disabled - would send partner followup to:', data.to);
        return false;
      }

      const template = this.loadTemplate('partner-followup');
      const html = this.replaceTemplateVars(template, {
        partnerName: data.partnerName,
        email: data.email,
        schedulingLink: data.schedulingLink,
        proposalLink: data.proposalLink
      });

      const msg = {
        to: data.to,
        from: data.from || this.fromEmail,
        subject: 'Partnership Opportunity - Alchemy United',
        html,
        text: `Hi ${data.partnerName}, we're excited about the partnership opportunity with Alchemy United. Let's schedule a call to discuss your custom solution.`
      };

      await sgMail.send(msg);
      console.log('Partner followup email sent successfully to:', data.to);
      return true;
    } catch (error) {
      console.error('Failed to send partner followup email:', error);
      return false;
    }
  }

  async sendAdminNotification(data: AdminNotificationData): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('Email service disabled - would send admin notification to:', data.to);
        return false;
      }

      const template = this.loadTemplate('admin-notification');
      const html = this.replaceTemplateVars(template, {
        leadType: data.leadType,
        leadName: data.leadName,
        leadEmail: data.leadEmail,
        leadPhone: data.leadPhone,
        leadCompany: data.leadCompany,
        leadMessage: data.leadMessage,
        leadSource: data.leadSource,
        leadId: data.leadId,
        timestamp: data.timestamp,
        isHighPriority: data.isHighPriority,
        totalToday: data.totalToday,
        newCount: data.newCount,
        responseTime: data.responseTime,
        dashboardUrl: data.dashboardUrl,
        leadUrl: data.leadUrl,
        settingsUrl: data.settingsUrl
      });

      const priorityFlag = data.isHighPriority ? ' 🚨 HIGH PRIORITY' : '';
      const msg = {
        to: data.to,
        from: data.from || this.fromEmail,
        subject: `New ${data.leadType} Lead Alert${priorityFlag} - ${data.leadName}`,
        html,
        text: `New ${data.leadType} lead received from ${data.leadName} (${data.leadEmail}). Check your admin dashboard for details.`
      };

      await sgMail.send(msg);
      console.log('Admin notification email sent successfully to:', data.to);
      return true;
    } catch (error) {
      console.error('Failed to send admin notification email:', error);
      return false;
    }
  }

  // Test email functionality
  async sendTestEmail(to: string): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.log('Email service disabled - would send test email to:', to);
        return false;
      }

      const msg = {
        to,
        from: this.fromEmail,
        subject: 'Alchemy United - Email Service Test',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #0F1419 0%, #1E293B 100%); color: white; border-radius: 12px;">
              <h2 style="color: #D4AF37; margin: 0;">Email Service Test</h2>
              <p style="margin: 10px 0 0 0;">Your Alchemy United email service is working correctly!</p>
            </div>
            <div style="padding: 20px; text-align: center;">
              <p>This is a test email to verify your email configuration.</p>
              <p style="color: #666; font-size: 14px;">Sent at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
        text: 'Alchemy United email service test - your email configuration is working correctly!'
      };

      await sgMail.send(msg);
      console.log('Test email sent successfully to:', to);
      return true;
    } catch (error) {
      console.error('Failed to send test email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export { LeadConfirmationData, PartnerFollowupData, AdminNotificationData };