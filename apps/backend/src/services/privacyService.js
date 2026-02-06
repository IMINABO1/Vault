import bcrypt from 'bcrypt';

export const hashLockdownPin = async (plainPin) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPin, saltRounds);
};

export const verifyLockdownPin = async (inputPin, storedHash) => {
  // Compare the user's input with the hashed PIN in the "Vault"
  return await bcrypt.compare(inputPin, storedHash);
};