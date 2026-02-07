import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashLockdownPin, verifyLockdownPin } from '../services/privacyService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../data/db.json');

export const setPin = async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin || pin.length !== 4) {
      return res.status(400).json({ error: "PIN must be 4 digits." });
    }

    const hashedPin = await hashLockdownPin(pin);

    // Store hashed PIN in JSON db keyed by userId
    const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    dbData.pins[req.user.uid] = hashedPin;
    await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: "Privacy Shield PIN set successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exitLockdown = async (req, res) => {
  try {
    const { inputPin } = req.body;

    if (!inputPin) {
      return res.status(400).json({ error: "PIN is required." });
    }

    // Look up stored hash from JSON db
    const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const storedHash = dbData.pins[req.user.uid];

    if (!storedHash) {
      return res.status(400).json({ error: "No PIN has been set. Set a PIN first." });
    }

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
