import { Resend } from 'resend';

export default async function handler(req, res) {
  // Set CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    console.error('RESEND_API_KEY is missing or not configured');
    return res.status(500).json({ 
      error: 'RESEND_API_KEY is not configured in environment variables.' 
    });
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.NOTIFICATION_EMAIL;

  if (!toEmail || toEmail === 'your_email@example.com') {
    console.error('NOTIFICATION_EMAIL is missing or not configured');
    return res.status(500).json({ 
      error: 'NOTIFICATION_EMAIL is not configured in environment variables.' 
    });
  }

  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi', // Local region or standard date string
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const data = await resend.emails.send({
      from: 'HCI Apology Portal <onboarding@resend.dev>',
      to: [toEmail],
      subject: "🎉 Great News! Ma'am Accepted Our Apology! 💛",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #9B8275; margin: 0; padding: 24px;">
            <div style="max-width: 520px; margin: 0 auto; background-color: #F1E3D9; border-radius: 24px; border: 4px solid #29211F; box-shadow: 0 8px 0 0 #29211F; padding: 32px; text-align: center;">
              
              <div style="display: inline-block; background-color: #FFD95A; border: 2px solid #29211F; border-radius: 9999px; padding: 6px 16px; font-weight: bold; font-size: 13px; color: #29211F; margin-bottom: 16px;">
                🎉 FORGIVENESS STATUS: 200 OK
              </div>

              <h1 style="color: #29211F; font-size: 28px; margin: 0 0 12px 0;">
                YAYYYYY! WE'RE FORGIVEN! 💛
              </h1>

              <p style="font-size: 16px; color: #80685D; line-height: 1.5; margin: 0 0 24px 0;">
                Ma'am just clicked the <strong>"YES! OF COURSE 💛"</strong> button on your apology website!
              </p>

              <div style="background-color: #FFE59A; border: 2px solid #29211F; border-radius: 16px; padding: 18px; margin-bottom: 24px; text-align: left;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #29211F;">
                  <strong>📅 Time:</strong> ${timestamp}
                </p>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #29211F;">
                  <strong>🦕 Status:</strong> Internal Clock Synced!
                </p>
                <p style="margin: 0; font-size: 14px; color: #29211F;">
                  <strong>📜 Promise:</strong> 5-minute pre-arrival buffer active for next class.
                </p>
              </div>

              <p style="font-size: 13px; color: #80685D; margin: 0;">
                Made with apologies, good intentions, and a very happy dinosaur!
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email through Resend:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
