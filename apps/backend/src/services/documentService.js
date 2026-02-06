// src/services/documentService.js
import fs from 'fs/promises';
import { uploadToVault } from './storageService.js'; // The one we wrote earlier

export const saveVerifiedDocument = async (ocrData, file, userId) => {
  // 1. Upload to Supabase to get the permanent URL
  const imageUrl = await uploadToVault(file, userId);

  // 2. Prepare the "Card" data for the frontend
  const newCard = {
    id: Date.now().toString(),
    userId: userId,
    type: ocrData.type,           // e.g., "I-20"
    docNumber: ocrData.number,    // Extracted via OCR
    holder: ocrData.name,         // Extracted via OCR
    expiryDate: ocrData.expiry,   // Extracted via OCR
    status: "Verified ✅",
    issuingCountry: "USA",
    imageUrl: imageUrl            // <--- This is where it's stored!
  };

  // 3. Append to your simulated JSON database
  const dbData = JSON.parse(await fs.readFile('src/data/db.json', 'utf8'));
  dbData.documents.push(newCard);
  await fs.writeFile('src/data/db.json', JSON.stringify(dbData, null, 2));

  return newCard;
};