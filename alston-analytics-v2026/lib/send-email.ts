/**
 * Email sending utility
 * Supports multiple email providers (Resend, SendGrid, or native SMTP)
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, from = 'info@alstonanalytics.com' } = options;

  // Option 1: Use Resend (recommended - easy setup, free tier)
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to,
          subject,
          html,
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const error = await response.text();
        console.error('Resend email error:', error);
      }
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
    }
  }

  // Option 2: Use SendGrid
  if (process.env.SENDGRID_API_KEY) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: from },
          subject,
          content: [{ type: 'text/html', value: html }],
        }),
      });

      if (response.ok) {
        return true;
      } else {
        const error = await response.text();
        console.error('SendGrid email error:', error);
      }
    } catch (error) {
      console.error('Failed to send email via SendGrid:', error);
    }
  }

  // Fallback: No email provider configured
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ No email provider configured. Add RESEND_API_KEY or SENDGRID_API_KEY to send emails.');
  }

  return false;
}

/**
 * Send notification email to business owner when a purchase is made
 */
export async function sendPurchaseNotification(
  customerEmail: string,
  productName: string,
  amount: number,
  sessionId: string
): Promise<boolean> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@alstonanalytics.com';
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #050A0E; color: #E0F2FE; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background: #E0F2FE; padding: 15px; border-radius: 4px; margin: 20px 0; }
          .button { display: inline-block; background: #050A0E; color: #E0F2FE; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Purchase Alert</h1>
          </div>
          <div class="content">
            <p>A new purchase has been completed:</p>
            <div class="highlight">
              <p><strong>Product:</strong> ${productName}</p>
              <p><strong>Customer Email:</strong> ${customerEmail}</p>
              <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
              <p><strong>Session ID:</strong> ${sessionId}</p>
            </div>
            <p>Please follow up with the customer to schedule their assessment.</p>
            <a href="https://dashboard.stripe.com/payments/${sessionId}" class="button">View in Stripe Dashboard</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: notificationEmail,
    subject: `New Purchase: ${productName} - $${(amount / 100).toFixed(2)}`,
    html,
  });
}

/**
 * Send confirmation email to customer after purchase
 */
export async function sendCustomerConfirmation(
  customerEmail: string,
  productName: string,
  amount: number
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #050A0E; color: #E0F2FE; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background: #E0F2FE; padding: 15px; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Purchase</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for purchasing <strong>${productName}</strong>!</p>
            <div class="highlight">
              <p><strong>Amount Paid:</strong> $${(amount / 100).toFixed(2)}</p>
            </div>
            <h3>What Happens Next?</h3>
            <ol>
              <li><strong>Confirmation Email</strong> - You'll receive a confirmation email within 24 hours with your assessment details.</li>
              <li><strong>Assessment Scheduled</strong> - We'll coordinate a 2-hour assessment window that works with your schedule.</li>
              <li><strong>Deliverable Report</strong> - Receive your comprehensive assessment report with actionable recommendations within 7 business days.</li>
            </ol>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:info@alstonanalytics.com">info@alstonanalytics.com</a>.</p>
            <p>Best regards,<br>The Alston Analytics Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return await sendEmail({
    to: customerEmail,
    subject: `Purchase Confirmation: ${productName}`,
    html,
  });
}

