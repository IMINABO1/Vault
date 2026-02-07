import { Router } from 'express';
import { dummyAuth } from '../middleware/auth.js';
import { setPin, exitLockdown } from '../controllers/privacyController.js';

const router = Router();

// POST /api/privacy/set-pin — set a lockdown PIN
router.post('/set-pin', dummyAuth, setPin);

// POST /api/privacy/exit-lockdown — verify PIN to exit lockdown
router.post('/exit-lockdown', dummyAuth, exitLockdown);

export default router;
