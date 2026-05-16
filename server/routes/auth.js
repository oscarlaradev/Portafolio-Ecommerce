/* eslint-disable no-undef */
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { sendEmail, sendWhatsApp } from '../senders.js';
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
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
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

router.post('/request-reset', (req, res) => {
  const { email, phone, via } = req.body; // via: 'email'|'whatsapp'
  if (!email && !phone) return res.status(400).json({ error: 'Provide email or phone' });
  const lookupField = email ? 'email' : 'phone';
  const lookupVal = email || phone;
  db.get(`SELECT * FROM users WHERE ${lookupField} = ?`, [lookupVal], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.json({ ok: true });
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    const expires = Date.now() + 1000 * 60 * 30; // 30 minutes
    db.run('INSERT INTO resets (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, new Date(expires).toISOString()], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      const message = `Tu código de recuperación es: ${token}`;
      if (via === 'whatsapp' && user.phone) {
        sendWhatsApp({ to: user.phone, body: message }).then(() => res.json({ ok: true })).catch(() => res.status(500).json({ error: 'failed to send' }));
      } else {
        sendEmail({ to: user.email, subject: 'Recuperación de contraseña', text: message }).then(() => res.json({ ok: true })).catch(() => res.status(500).json({ error: 'failed to send' }));
      }
    });
  });
});

router.post('/reset', (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) return res.status(400).json({ error: 'Missing' });
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid' });
    db.get('SELECT * FROM resets WHERE user_id = ? AND token = ? AND used = 0', [user.id, token], async (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!row) return res.status(400).json({ error: 'Invalid or used token' });
      if (new Date(row.expires_at) < new Date()) return res.status(400).json({ error: 'Expired' });
      if (newPassword.length > 255) return res.status(400).json({ error: 'Password too long' });
      const hash = await hashPassword(newPassword);
      db.run('UPDATE users SET password = ? WHERE id = ?', [hash, user.id], (uErr) => {
        if (uErr) return res.status(500).json({ error: uErr.message });
        db.run('UPDATE resets SET used = 1 WHERE id = ?', [row.id]);
        res.json({ ok: true });
      });
    });
  });
});

export default router;
