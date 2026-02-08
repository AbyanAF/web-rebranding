import crypto from "crypto";

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
}

export function verifyPassword(inputPassword, storedHash, storedSalt) {
  const computedHash = hashPassword(inputPassword, storedSalt);
  return computedHash === storedHash;
}