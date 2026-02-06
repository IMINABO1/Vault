import { hashLockdownPin, verifyLockdownPin } from '../services/privacyService.js';

export const setPin = async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin || pin.length !== 4) {
      return res.status(400).json({ error: "PIN must be 4 digits." });
    }

    const hashedPin = await hashLockdownPin(pin);
    
    // For the hackathon: We'd save 'hashedPin' to the user's profile in Supabase
    res.status(200).json({ message: "Privacy Shield PIN set successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exitLockdown = async (req, res) => {
  try {
    const { inputPin, storedHash } = req.body; // In a real app, fetch storedHash from DB

    const isValid = await verifyLockdownPin(inputPin, storedHash);

    if (isValid) {
      res.status(200).json({ 
        authenticated: true, 
        message: "Lockdown lifted. Returning to Dashboard." 
      });
    } else {
      res.status(401).json({ 
        authenticated: false, 
        error: "Incorrect PIN. Device remains in Lockdown." 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};