import { Router } from 'express';
import multer from 'multer';
import { dummyAuth } from '../middleware/auth.js';
import { handleDocumentUpload } from '../controllers/documentController.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/documents/upload — upload and verify a document
router.post('/upload', dummyAuth, upload.single('document'), handleDocumentUpload);

export default router;
