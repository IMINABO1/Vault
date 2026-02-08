import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = 'gemini-2.5-flash-lite';

export async function analyzeDocument(imageBuffer, mimeType, selectedType) {
  const base64Image = imageBuffer.toString('base64');

  const prompt = `You are a document verification system for a digital ID wallet app called Vault.

Analyze this uploaded image and respond ONLY with valid JSON (no markdown, no code fences).

Determine:
1. Is this image an official identity/legal document? (e.g., passport, driver's license, national ID, visa, immigration papers, vehicle registration, birth certificate)
2. If it IS a document, what type is it actually?
3. Extract key details from the document.

The user selected: "${selectedType}"

Respond with this exact JSON structure:
{
  "isDocument": true/false,
  "detectedType": "passport" | "drivers_license" | "national_id" | "immigration_papers" | "vehicle_registration" | "visa" | "birth_certificate" | "i-20" | "other_official_document" | "not_a_document",
  "correctedType": "the actual document type if user selected wrong, or same as detectedType if correct",
  "userSelectionCorrect": true/false,
  "holderName": "full name on document or null",
  "documentNumber": "ID/document number or null",
  "expiryDate": "YYYY-MM-DD or null",
  "issuingCountry": "country name or null",
  "rejectionReason": "why this was rejected, or null",
  "keyFields": [{"label": "Field Name", "value": "extracted value"}]
}

For "keyFields", extract 5-8 fields most important for law enforcement verification. Choose fields based on document type:
- Driver's License: Full Name, Date of Birth, Address, License Number, Class, Expiration, State, Sex
- Passport: Full Name, Nationality, Date of Birth, Passport Number, Expiration, Place of Birth, Sex
- I-20 / Immigration Papers: SEVIS ID, Full Name, Country of Citizenship, Date of Birth, School Name, Class of Admission (e.g. F-1), Program Start Date, Program End Date
- Vehicle Registration: Owner Name, VIN, Make/Model/Year, License Plate, Registration Expiration, State
- Visa: Full Name, Visa Type, Visa Number, Nationality, Expiration, Entries Allowed
- For any other document type, extract the most relevant identifying fields.
Always include Full Name and Date of Birth if visible on the document. Extract real values only.

Rules:
- If the image is NOT an official document (e.g., a photo of a car, a selfie, a meme, a screenshot of a chat), set isDocument to false and provide a clear rejectionReason.
- If it IS a valid document but the user selected the wrong type, set userSelectionCorrect to false and correctedType to what it actually is. Still extract all details.
- Extract real data from the document, not placeholders.`;

  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      { text: prompt },
    ],
  });

  const text = result.text.trim();

  // Parse JSON (handle potential markdown fences just in case)
  const cleaned = text.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
  return JSON.parse(cleaned);
}

export async function generateContent(prompt) {
  const result = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  return result.text;
}

export default ai;
