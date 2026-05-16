import express from 'express';
import { db } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Middleware de Seguridad
const requireAuth = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'No autorizado' });
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// POST /api/leads (Pública: Para que el usuario envíe su Lead)
router.post('/', (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Nombre y correo son obligatorios' });

    db.run(
        'INSERT INTO leads (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone || '', message || ''],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID });
        }
    );
});

// GET /api/leads (Privada: Para el Panel Admin)
router.get('/', requireAuth, (req, res) => {
    db.all('SELECT * FROM leads ORDER BY created_at DESC', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// PATCH /api/leads/:id/status (Privada: Para que marques leads como resueltos)
router.patch('/:id/status', requireAuth, (req, res) => {
    const { status } = req.body;
    db.run('UPDATE leads SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

export default router;