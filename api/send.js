import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { full_name, email_address, subject, message } = req.body;

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['mizham003@gmail.com'], // Your email
      subject: subject || 'New Portfolio Message',
      html: `
        <h3>New Message from ${full_name}</h3>
        <p><strong>Email:</strong> ${email_address}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}