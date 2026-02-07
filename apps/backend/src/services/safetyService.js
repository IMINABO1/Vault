import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/db.json');

// Create an Ethereal test account on first use, then reuse it
let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  return transporter;
}

async function sendAlertEmails(contacts, location) {
  const transport = await getTransporter();

  for (const contact of contacts) {
    if (!contact.email) continue;
    try {
      const info = await transport.sendMail({
        from: '"Vault Safety" <safety@vault.app>',
        to: contact.email,
        subject: 'EMERGENCY: Lockdown Mode Activated',
        text: `Emergency alert — a Vault user has activated Lockdown Mode.\n\nLocation: ${location.latitude}, ${location.longitude}\n\nThis is an automated safety notification from Vault. If you are this person's emergency contact, please check on them.`,
        html: `<h2 style="color:#d97706;">Emergency Alert</h2><p>A Vault user has activated <strong>Lockdown Mode</strong>.</p><p><strong>Location:</strong> ${location.latitude}, ${location.longitude}</p><p>This is an automated safety notification from Vault. If you are this person's emergency contact, please check on them.</p>`,
      });
      console.log(`[VAULT] Email sent to ${contact.email} — Preview: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (err) {
      console.error(`[VAULT] Failed to send email to ${contact.email}:`, err.message);
    }
  }
}

export const createBeacon = async (userId, location) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));

  const userContacts = dbData.emergencyContacts[userId] || [];
  const contactIds = userContacts.map(c => c.id);

  const beacon = {
    id: Date.now().toString(),
    userId,
    latitude: location.latitude,
    longitude: location.longitude,
    triggeredAt: new Date().toISOString(),
    contactsNotified: contactIds,
  };

  dbData.beacons.push(beacon);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

  // Send dummy alert emails to all contacts with email addresses
  sendAlertEmails(userContacts, location);

  return { beacon, contactCount: contactIds.length };
};
