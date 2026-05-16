import express from 'express';
import { db } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Middleware de Seguridad: Solo usuarios logueados pueden hacer cambios
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

// GET all projects
router.get('/projects', (req, res) => {
    db.all('SELECT id, title, desc, stack FROM projects ORDER BY id', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const projects = rows.map(p => ({
            id: p.id,
            title: p.title,
            desc: p.desc,
            stack: p.stack ? p.stack.split(',').map(s => s.trim()) : []
        }));
        res.json(projects);
    });
});

// POST/PUT a project
router.post('/projects', requireAuth, (req, res) => {
    // Si recibimos un array completo, vaciamos e insertamos (Reemplazo Masivo de useAdminStorage)
    if (Array.isArray(req.body)) {
        db.run('DELETE FROM projects', [], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            if (req.body.length === 0) return res.json([]);
            
            let completed = 0;
            req.body.forEach(p => {
                const stackStr = Array.isArray(p.stack) ? p.stack.join(',') : p.stack;
                db.run(
                    'INSERT INTO projects (id, title, desc, stack) VALUES (?, ?, ?, ?)',
                    [p.id, p.title, p.desc, stackStr],
                    () => {
                        completed++;
                        if (completed === req.body.length) {
                            res.json(req.body);
                        }
                    }
                );
            });
        });
        return;
    }

    const { id, title, desc, stack } = req.body;
    const stackStr = Array.isArray(stack) ? stack.join(',') : stack;

    if (id) {
        // Update
        db.run(
            'UPDATE projects SET title = ?, desc = ?, stack = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, desc, stackStr, id],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id, title, desc, stack });
            }
        );
    } else {
        // Insert
        db.run(
            'INSERT INTO projects (title, desc, stack) VALUES (?, ?, ?)',
            [title, desc, stackStr],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, title, desc, stack });
            }
        );
    }
});

// DELETE a project
router.delete('/projects/:id', requireAuth, (req, res) => {
    db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

// GET all stack
router.get('/stack', (req, res) => {
    db.all('SELECT id, name FROM stack ORDER BY id', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST/PUT stack item
router.post('/stack', requireAuth, (req, res) => {
    // Reemplazo masivo de stack
    if (Array.isArray(req.body)) {
        db.run('DELETE FROM stack', [], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            if (req.body.length === 0) return res.json([]);
            
            let completed = 0;
            req.body.forEach(s => {
                db.run(
                    'INSERT INTO stack (id, name) VALUES (?, ?)',
                    [s.id, s.name],
                    () => {
                        completed++;
                        if (completed === req.body.length) {
                            res.json(req.body);
                        }
                    }
                );
            });
        });
        return;
    }

    const { id, name } = req.body;

    if (id) {
        db.run(
            'UPDATE stack SET name = ? WHERE id = ?',
            [name, id],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id, name });
            }
        );
    } else {
        db.run(
            'INSERT INTO stack (name) VALUES (?)',
            [name],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, name });
            }
        );
    }
});

// DELETE stack item
router.delete('/stack/:id', requireAuth, (req, res) => {
    db.run('DELETE FROM stack WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: true });
    });
});

// GET content meta
router.get('/content-meta', (req, res) => {
    db.all('SELECT key, value FROM content_meta', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const meta = {};
        rows.forEach(r => meta[r.key] = r.value);
        res.json(meta);
    });
});

// UPDATE content meta
router.post('/content-meta', requireAuth, (req, res) => {
    const updates = req.body;
    let completed = 0;
    const total = Object.keys(updates).length;

    Object.entries(updates).forEach(([key, value]) => {
        db.run(
            'INSERT OR REPLACE INTO content_meta (key, value) VALUES (?, ?)',
            [key, value],
            function(err) {
                if (err) console.error(err);
                completed++;
                if (completed === total) {
                    res.json({ updated: true });
                }
            }
        );
    });

    if (total === 0) res.json({ updated: true });
});

export default router;
