/* eslint-disable no-undef */
import express from 'express';
import { db } from '../db.js';
const router = express.Router();

// Simple endpoint: get aggregated stats
router.get('/', (req, res) => {
  // Return basic counts by key
  db.all('SELECT key, SUM(value) as total FROM stats GROUP BY key', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const result = {};
    rows.forEach((r) => {
      result[r.key] = r.total;
    });
    res.json(result);
  });
});

// record an event: { key, increment }
router.post('/record', (req, res) => {
  const { key, increment = 1, meta = null } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });
  db.run('INSERT INTO stats (key, value, meta) VALUES (?, ?, ?)', [key, increment, meta], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

export default router;
