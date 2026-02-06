import Tesseract from 'tesseract.js';

export const performOCR = async (imagePath) => {
  try {
    // Recognize text from the uploaded image
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng' // Language: English
    );

    return text;
  } catch (error) {
    throw new Error('OCR Processing failed: ' + error.message);
  }
};

/**
 * Logic to verify if the document belongs to the user
 * Based on Project Context: Match name off ID to prove it's 'real'
 */
export const verifyIdentityMatch = (extractedText, userName) => {
  const normalizedText = extractedText.toLowerCase();
  const normalizedName = userName.toLowerCase();

  // Simple check: does the user's name appear in the OCR text?
  return normalizedText.includes(normalizedName);
};

// Aliases to match controller imports
export const extractTextFromImage = performOCR;
export const verifyNameMatch = verifyIdentityMatch;

export const validateDocumentType = (text, selectedType) => {
  const lowerText = text.toLowerCase();
  
  // Configuration: Map the frontend "value" to keywords found in the document
  const typeKeywords = {
    'passport': ['passport'],
    'i-20': ['i-20', 'form i-20', 'department of homeland security'],
    'drivers_license': ['license', 'driver', 'driving', 'dl'],
  };

  // Get keywords for the selected type (default to empty array if type not found)
  const keywords = typeKeywords[selectedType?.toLowerCase()] || [];

  // Return true if ANY of the keywords are found in the text
  return keywords.some(keyword => lowerText.includes(keyword));
};