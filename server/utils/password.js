/* eslint-disable no-undef */
import crypto from 'crypto';

// Usamos SHA-256 nativo como solicitaste para máxima portabilidad y seguridad
export async function hashPassword(plain) {
  return crypto.createHash('sha256').update(String(plain), 'utf8').digest('hex');
}

export async function verifyPassword(plain, hashed) {
  const hash = crypto.createHash('sha256').update(String(plain), 'utf8').digest('hex');
  return hash === hashed;
}
