/* eslint-disable no-undef */
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function hashPassword(plain) {
  // Pre-hash with SHA-256 to allow passwords longer than bcrypt's 72-byte limit
  const pre = crypto.createHash('sha256').update(String(plain), 'utf8').digest('hex');
  return bcrypt.hash(pre, 10);
}

export async function verifyPassword(plain, hashed) {
  const pre = crypto.createHash('sha256').update(String(plain), 'utf8').digest('hex');
  return bcrypt.compare(pre, hashed);
}
