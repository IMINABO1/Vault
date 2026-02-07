import { getContactsByUser, addContact, removeContact } from '../services/emergencyContactService.js';

export const handleGetContacts = async (req, res) => {
  try {
    const contacts = await getContactsByUser(req.user.uid);
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const handleAddContact = async (req, res) => {
  try {
    const { name, phone, email, relationship } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Contact name is required.' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const newContact = await addContact(req.user.uid, {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      relationship: relationship?.trim(),
    });

    res.status(201).json({
      message: 'Emergency contact added successfully',
      contact: newContact,
    });
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const handleRemoveContact = async (req, res) => {
  try {
    const deleted = await removeContact(req.user.uid, req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact removed successfully' });
  } catch (error) {
    console.error('Remove contact error:', error);
    res.status(500).json({ error: error.message });
  }
};
