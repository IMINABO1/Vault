// src/services/documentService.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/db.json');

export const saveVerifiedDocument = async (ocrData, file, userId) => {
  // MVP: skip Supabase upload, store image as base64 data URL
  const imageUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  const newCard = {
    id: Date.now().toString(),
    userId: userId,
    type: ocrData.type,
    docNumber: ocrData.number,
    holder: ocrData.name,
    expiryDate: ocrData.expiry,
    status: "Verified",
    issuingCountry: ocrData.issuingCountry || "USA",
    imageUrl: imageUrl,
  };

  // Append to JSON database
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  dbData.documents.push(newCard);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

  return newCard;
};