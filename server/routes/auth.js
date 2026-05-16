/* eslint-disable no-undef */
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = '2h';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing' });
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await verifyPassword(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = createToken({ id: user.id, email: user.email });
    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' 
    });
    res.json({ ok: true });
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/session', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticated: false });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: { id: payload.id, email: payload.email } });
  } catch {
    res.json({ authenticated: false });
  }
});

router.post('/set-password', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: 'Missing' });
  if (newPassword.length > 255) return res.status(400).json({ error: 'Password too long' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hash = await hashPassword(newPassword);
    db.run('UPDATE users SET password = ? WHERE id = ?', [hash, user.id], (uErr) => {
      if (uErr) return res.status(500).json({ error: uErr.message });
      res.json({ ok: true });
    });
  });
});

export default router;
