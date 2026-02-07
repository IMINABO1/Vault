import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/db.json');

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

  // MVP: no real SMS/email — just return the record
  return { beacon, contactCount: contactIds.length };
};
