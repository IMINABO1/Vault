import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/db.json');

export const getContactsByUser = async (userId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  return dbData.emergencyContacts[userId] || [];
};

export const addContact = async (userId, contactData) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));

  if (!dbData.emergencyContacts[userId]) {
    dbData.emergencyContacts[userId] = [];
  }

  const newContact = {
    id: Date.now().toString(),
    name: contactData.name,
    phone: contactData.phone,
    email: contactData.email || null,
    relationship: contactData.relationship || null,
    createdAt: new Date().toISOString(),
  };

  dbData.emergencyContacts[userId].push(newContact);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

  return newContact;
};

export const removeContact = async (userId, contactId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));

  if (!dbData.emergencyContacts[userId]) return false;

  const index = dbData.emergencyContacts[userId].findIndex(c => c.id === contactId);
  if (index === -1) return false;

  dbData.emergencyContacts[userId].splice(index, 1);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

  return true;
};
