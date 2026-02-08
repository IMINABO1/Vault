import { analyzeUploadedDocument } from '../services/ocrService.js';
import { saveVerifiedDocument, getDocumentsByUser, getDocumentById, deleteDocument, replaceDocument } from '../services/documentService.js';

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
      keyFields: analysis.keyFields || [],
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

export const handleGetDocuments = async (req, res) => {
  try {
    const { user } = req;
    const documents = await getDocumentsByUser(user.uid);
    res.status(200).json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: "Failed to retrieve documents", details: error.message });
  }
};

export const handleGetDocumentById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const document = await getDocumentById(id, user.uid);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ document });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: "Failed to retrieve document", details: error.message });
  }
};

export const handleDeleteDocument = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const deleted = await deleteDocument(id, user.uid);

    if (!deleted) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ message: "Document deleted" });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ error: "Failed to delete document", details: error.message });
  }
};

export const handleUpdateDocument = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
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
      keyFields: analysis.keyFields || [],
    };

    // 4. Replace in database
    const updatedDoc = await replaceDocument(id, docData, file, user.uid);

    if (!updatedDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // 5. Build response
    const response = {
      message: "Document replaced and re-verified",
      verified: true,
      document: updatedDoc,
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
    console.error('Update document error:', error);
    res.status(500).json({ error: "Processing failed", details: error.message });
  }
};
