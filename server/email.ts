import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  verificationUrl: string;
  invitationCode: string;
}

// Professional email template for verification invitations
const createVerificationEmailTemplate = (data: EmailData) => {
  return {
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Alchemy United</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0b0c; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0b0b0c;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0b0b0c 0%, #1a1a1a 100%);">
                    <h1 style="margin: 0; color: #D4AF37; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                      Alchemy United
                    </h1>
                    <p style="margin: 8px 0 0; color: #888; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Premium EV Charging Network
                    </p>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 20px 40px 40px; color: #ffffff;">
                    <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 600;">
                      Welcome to the Network, ${data.firstName}
                    </h2>
                    
                    <p style="margin: 0 0 20px; color: #cccccc; font-size: 16px; line-height: 1.6;">
                      Congratulations! Your early access application has been approved. You're now invited to join our exclusive premium EV charging network.
                    </p>
                    
                    <p style="margin: 0 0 30px; color: #cccccc; font-size: 16px; line-height: 1.6;">
                      Click the button below to verify your email address and complete your membership activation:
                    </p>
                    
                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); border-radius: 8px; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);">
                          <a href="${data.verificationUrl}" style="display: inline-block; padding: 16px 32px; color: #000000; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                            Activate Your Membership
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 30px 0 20px; color: #888; font-size: 14px; line-height: 1.5;">
                      If the button doesn't work, copy and paste this link into your browser:
                      <br>
                      <a href="${data.verificationUrl}" style="color: #D4AF37; word-break: break-all;">${data.verificationUrl}</a>
                    </p>
                    
                    <!-- Invitation Code -->
                    <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <h3 style="margin: 0 0 10px; color: #D4AF37; font-size: 16px; font-weight: 600;">
                        Your Exclusive Invitation Code
                      </h3>
                      <p style="margin: 0 0 10px; color: #cccccc; font-size: 14px;">
                        Share this code with friends and family:
                      </p>
                      <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 6px; padding: 12px; text-align: center;">
                        <code style="color: #D4AF37; font-size: 18px; font-weight: 700; letter-spacing: 1px;">
                          ${data.invitationCode}
                        </code>
                      </div>
                    </div>
                    
                    <!-- Benefits -->
                    <div style="margin: 30px 0;">
                      <h3 style="margin: 0 0 15px; color: #ffffff; font-size: 18px; font-weight: 600;">
                        What's Included in Your Membership
                      </h3>
                      <ul style="margin: 0; padding: 0; list-style: none;">
                        <li style="margin: 0 0 10px; color: #cccccc; font-size: 14px; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
                          Access to premium charging stations across the network
                        </li>
                        <li style="margin: 0 0 10px; color: #cccccc; font-size: 14px; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
                          Priority booking and concierge services
                        </li>
                        <li style="margin: 0 0 10px; color: #cccccc; font-size: 14px; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
                          Exclusive member events and networking opportunities
                        </li>
                        <li style="margin: 0 0 0; color: #cccccc; font-size: 14px; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 6px; height: 6px; background: #D4AF37; border-radius: 50%; margin-right: 12px; flex-shrink: 0;"></span>
                          24/7 premium support and assistance
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; background: #0b0b0c; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin: 0 0 10px; color: #666; font-size: 12px;">
                      This verification link will expire in 7 days.
                    </p>
                    <p style="margin: 0; color: #666; font-size: 12px;">
                      © 2025 Alchemy United. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Welcome to Alchemy United, ${data.firstName}!

Your early access application has been approved. Click the link below to verify your email and activate your membership:

${data.verificationUrl}

Your exclusive invitation code: ${data.invitationCode}

What's included in your membership:
• Access to premium charging stations across the network
• Priority booking and concierge services  
• Exclusive member events and networking opportunities
• 24/7 premium support and assistance

This verification link will expire in 7 days.

© 2025 Alchemy United. All rights reserved.
    `
  };
};

export async function sendVerificationEmail(emailData: EmailData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid API key not configured - verification email not sent');
    return false;
  }

  try {
    const template = createVerificationEmailTemplate(emailData);
    
    const msg = {
      to: emailData.email,
      from: {
        email: 'no-reply@alchemyunited.com',
        name: 'Alchemy United'
      },
      subject: 'Welcome to Alchemy United - Verify Your Membership',
      html: template.html,
      text: template.text,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true },
      },
      mailSettings: {
        sandboxMode: { enable: process.env.NODE_ENV === 'development' }
      }
    };

    await sgMail.send(msg);
    console.log(`Verification email sent to ${emailData.email}`);
    return true;
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}