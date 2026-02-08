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
    keyFields: ocrData.keyFields || [],
  };

  // Append to JSON database
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  dbData.documents.push(newCard);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

  return newCard;
};

export const getDocumentsByUser = async (userId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  const userDocs = dbData.documents.filter(doc => doc.userId === userId);
  // Strip imageUrl from list response — it's huge base64 data
  return userDocs.map(({ imageUrl, ...rest }) => rest);
};

export const getDocumentById = async (documentId, userId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  return dbData.documents.find(d => d.id === documentId && d.userId === userId) || null;
};

export const deleteDocument = async (documentId, userId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  const index = dbData.documents.findIndex(d => d.id === documentId && d.userId === userId);
  if (index === -1) return false;

  dbData.documents.splice(index, 1);
  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));
  return true;
};

export const replaceDocument = async (documentId, ocrData, file, userId) => {
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
  const index = dbData.documents.findIndex(d => d.id === documentId && d.userId === userId);
  if (index === -1) return null;

  const imageUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  dbData.documents[index] = {
    id: documentId,
    userId: userId,
    type: ocrData.type,
    docNumber: ocrData.number,
    holder: ocrData.name,
    expiryDate: ocrData.expiry,
    status: "Verified",
    issuingCountry: ocrData.issuingCountry || "USA",
    imageUrl: imageUrl,
    keyFields: ocrData.keyFields || [],
  };

  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));
  return dbData.documents[index];
};