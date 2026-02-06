import bcrypt from 'bcrypt';

// In a real app, this would save to Supabase. 
// For a hackathon without a DB, we'll simulate the "Vault" storage.
export const hashLockdownPin = async (plainPin) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPin, saltRounds);
};

export const verifyLockdownPin = async (inputPin, storedHash) => {
  // Compare the user's input with the hashed PIN in the "Vault"
  return await bcrypt.compare(inputPin, storedHash);
};