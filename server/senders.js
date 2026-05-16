/* eslint-disable no-undef */
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM } = process.env;

export async function sendEmail({ to, subject, text, html }) {
  if (!SMTP_HOST) return Promise.reject(new Error('SMTP not configured'));
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  return transporter.sendMail({ from: SMTP_USER, to, subject, text, html });
}

export async function sendWhatsApp({ to, body }) {
  if (!TWILIO_SID) return Promise.reject(new Error('Twilio not configured'));
  const client = twilio(TWILIO_SID, TWILIO_TOKEN);
  return client.messages.create({
    from: `whatsapp:${TWILIO_FROM}`,
    to: `whatsapp:${to}`,
    body,
  });
}
