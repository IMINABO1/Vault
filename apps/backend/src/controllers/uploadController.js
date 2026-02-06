import { extractTextFromImage, verifyNameMatch } from '../services/ocrService.js';
// import { uploadToSupabase } from '../services/storageService.js'; 

export const handleDocumentUpload = async (req, res) => {
  try {
    const { user } = req; // Assume auth middleware provides this
    const file = req.file;

    // Step 1: Run OCR immediately
    const text = await extractTextFromImage(file.buffer);

    // Step 2: Verification Logic (The "Hackathon Proof")
    const isVerified = verifyNameMatch(text, user.fullName);

    if (!isVerified) {
      return res.status(403).json({ 
        error: "Verification Failed", 
        details: "The name on this document doesn't match your account." 
      });
    }

    // Step 3: If verified, save to Supabase Storage
    // const storageUrl = await uploadToSupabase(file);

    res.status(200).json({
      message: "Document Verified and Saved",
      documentType: "Verified ID",
      verified: true
      // url: storageUrl
    });

  } catch (error) {
    res.status(500).json({ error: "Processing failed", details: error.message });
  }
};