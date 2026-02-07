import { Router } from 'express';
import { dummyAuth } from '../middleware/auth.js';
import { handleGetContacts, handleAddContact, handleRemoveContact } from '../controllers/emergencyContactController.js';

const router = Router();

// GET /api/emergency-contacts — list user's emergency contacts
router.get('/', dummyAuth, handleGetContacts);

// POST /api/emergency-contacts — add a new emergency contact
router.post('/', dummyAuth, handleAddContact);

// DELETE /api/emergency-contacts/:id — remove a contact
router.delete('/:id', dummyAuth, handleRemoveContact);

export default router;
