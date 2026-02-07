import { analyzeUploadedDocument } from '../services/ocrService.js';
import { saveVerifiedDocument } from '../services/documentService.js';

export const handleDocumentUpload = async (req, res) => {
  try {
    const { user } = req;
    const { documentType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (!documentType) {
      return res.status(400).json({ error: "Document type is required." });
    }

    // 1. Send image to Gemini for analysis
    const analysis = await analyzeUploadedDocument(
      file.buffer,
      file.mimetype,
      documentType
    );

    // 2. Reject if it's not a real document
    if (!analysis.isDocument) {
      return res.status(400).json({
        error: "Invalid Upload",
        details: analysis.rejectionReason || "The uploaded image does not appear to be an official document. Please upload a valid ID.",
      });
    }

    // 3. Build the document data using Gemini's extracted fields
    const docData = {
      type: analysis.correctedType,
      name: analysis.holderName || user.fullName,
      number: analysis.documentNumber,
      expiry: analysis.expiryDate,
      issuingCountry: analysis.issuingCountry || "USA",
    };

    // 4. Save to storage and database
    const savedCard = await saveVerifiedDocument(docData, file, user.uid);

    // 5. Build response — let frontend know if we auto-corrected
    const response = {
      message: "Document verified and added to Vault",
      verified: true,
      document: savedCard,
    };

    if (!analysis.userSelectionCorrect) {
      response.typeCorrection = {
        selected: documentType,
        actual: analysis.correctedType,
        message: `You selected "${documentType}" but this appears to be a ${analysis.correctedType}. We've corrected this for you.`,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: "Processing failed", details: error.message });
  }
};
