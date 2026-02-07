import { analyzeDocument } from '../config/gemini.js';

/**
 * Analyzes a document image using Gemini AI.
 * - Detects if the image is actually a valid document
 * - Auto-corrects wrong document type selections
 * - Extracts holder name, doc number, expiry, country
 *
 * @param {Buffer} imageBuffer - The uploaded file buffer
 * @param {string} mimeType - e.g. "image/jpeg", "image/png"
 * @param {string} selectedType - What the user selected in the dropdown
 * @returns {Object} Analysis result from Gemini
 */
export async function analyzeUploadedDocument(imageBuffer, mimeType, selectedType) {
  try {
    const result = await analyzeDocument(imageBuffer, mimeType, selectedType);
    return result;
  } catch (error) {
    throw new Error('Document analysis failed: ' + error.message);
  }
}
