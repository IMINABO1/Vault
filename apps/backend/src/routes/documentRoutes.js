import { Router } from 'express';
import multer from 'multer';
import { dummyAuth } from '../middleware/auth.js';
import { handleDocumentUpload, handleGetDocuments, handleGetDocumentById, handleDeleteDocument, handleUpdateDocument } from '../controllers/documentController.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/documents/upload — upload and verify a document
router.post('/upload', dummyAuth, upload.single('document'), handleDocumentUpload);

// GET /api/documents — list all documents for the authenticated user
router.get('/', dummyAuth, handleGetDocuments);

// GET /api/documents/:id — get a single document (with image) by ID
router.get('/:id', dummyAuth, handleGetDocumentById);

// DELETE /api/documents/:id — remove a document from the vault
router.delete('/:id', dummyAuth, handleDeleteDocument);

// PUT /api/documents/:id — replace a document with a new image (re-runs OCR)
router.put('/:id', dummyAuth, upload.single('document'), handleUpdateDocument);

export default router;
