import { extractTextFromImage, verifyNameMatch, validateDocumentType } from '../services/ocrService.js';
import { uploadToVault } from '../services/storageService.js'; 
import { saveVerifiedDocument } from '../services/documentService.js';

export const handleDocumentUpload = async (req, res) => {
  try {
    const { user } = req; // Assume auth middleware provides user.fullName and user.id
    const { documentType } = req.body; // e.g., "passport", "i-20"
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    
    if (!documentType) {
      return res.status(400).json({ error: "Document type is required." });
    }

    // 1. Run OCR to extract all text
    const extractedText = await extractTextFromImage(file.buffer);

    // 2. Validate Document Type (Check if uploaded doc matches selected type)
    const isValidType = validateDocumentType(extractedText, documentType);

    if (!isValidType) {
      return res.status(400).json({ 
        error: "Document Mismatch", 
        details: `The uploaded image does not appear to be a ${documentType}. Please check the file and try again.` 
      });
    }

    // 3. Verification Logic: Match name on ID to Account Name
    const isVerified = verifyNameMatch(extractedText, user.fullName);

    if (!isVerified) {
      return res.status(403).json({ 
        error: "Verification Failed", 
        details: "The name on this document doesn't match your account name." 
      });
    }

    // 4. Mock Data Extraction (For the Hackathon Card)
    // In a real app, you'd use Regex to pull the specific ID number/expiry
    const mockOcrData = {
      type: documentType,
      name: user.fullName,
      number: "VAULT-" + Math.floor(Math.random() * 1000000), // Simulated ID number
      expiry: "2028-12-31" 
    };

    // 5. Save to Supabase Storage AND update db.json
    const savedCard = await saveVerifiedDocument(mockOcrData, file, user.id);

    // 6. Final Response for the Frontend
    res.status(200).json({
      message: "Document Verified and added to Vault ✅",
      verified: true,
      document: savedCard // This contains the imageUrl and card details
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Processing failed", details: error.message });
  }
};