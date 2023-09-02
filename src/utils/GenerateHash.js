import { AES, enc, HmacSHA256 } from "crypto-js";

export function encryptMessage(message, secretKey) {
  const ciphertext = AES.encrypt(message, secretKey).toString();
  return ciphertext;
}

// Decrypt a message
export function decryptMessage(ciphertext, secretKey) {
  const bytes = AES.decrypt(ciphertext, secretKey);
  const decryptedMessage = bytes.toString(enc.Utf8);
  return decryptedMessage;
}

// Generate a SHA-256 hash
export function generateSHA256Hash(data,secretKey) {
    const jsonString = JSON.stringify(data);
    const hash = HmacSHA256(jsonString, secretKey);
    return hash.toString();
}
