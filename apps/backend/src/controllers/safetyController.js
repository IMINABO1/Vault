import { createBeacon } from '../services/safetyService.js';

export const handleTriggerSafety = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Location coordinates (latitude, longitude) are required.' });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers.' });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90.' });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180.' });
    }

    const result = await createBeacon(req.user.uid, { latitude, longitude });

    res.status(200).json({
      success: true,
      contactsNotified: result.contactCount,
    });
  } catch (error) {
    console.error('Safety trigger error:', error);
    res.status(500).json({ error: error.message });
  }
};
