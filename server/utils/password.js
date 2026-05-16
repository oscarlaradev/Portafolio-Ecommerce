/* eslint-disable no-undef */
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(plain) {
  return bcrypt.hash(String(plain), SALT_ROUNDS);
}

export async function verifyPassword(plain, hashed) {
  return bcrypt.compare(String(plain), hashed);
}
