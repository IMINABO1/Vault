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