/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { init, db } from './db.js';
import { hashPassword } from './utils/password.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
init();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Auto-create admin user if ADMIN_PASSWORD or ADMIN_EMAIL provided
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (ADMIN_PASSWORD) {
  db.get('SELECT * FROM users WHERE email = ?', [ADMIN_EMAIL], async (err, user) => {
    if (err) console.error(err);
    if (!user) {
      // enforce max length
      const pwd = String(ADMIN_PASSWORD).slice(0, 255);
      const hash = await hashPassword(pwd);
      db.run('INSERT INTO users (email, password) VALUES (?, ?)', [ADMIN_EMAIL, hash]);
      console.log('Created admin user', ADMIN_EMAIL);
    }
  });
}

import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';
import rateLimit from 'express-rate-limit';

// Basic rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/stats', statsRoutes);

// Serve built frontend in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => res.sendFile(path.join(staticPath, 'index.html')));
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server listening on', PORT));
