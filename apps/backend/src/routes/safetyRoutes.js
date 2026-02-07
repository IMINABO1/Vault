import { Router } from 'express';
import { dummyAuth } from '../middleware/auth.js';
import { handleTriggerSafety } from '../controllers/safetyController.js';

const router = Router();

// POST /api/safety/trigger — send location beacon to emergency contacts
router.post('/trigger', dummyAuth, handleTriggerSafety);

export default router;
