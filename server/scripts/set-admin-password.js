/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import { db, init } from '../db.js';
import { hashPassword } from '../utils/password.js';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env');
  process.exit(1);
}

if (password.length > 255) {
  console.error('ADMIN_PASSWORD cannot exceed 255 characters');
  process.exit(1);
}

init();

const run = async () => {
  const hash = await hashPassword(password);

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }

    if (!user) {
      db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (insertErr) => {
        if (insertErr) {
          console.error(insertErr.message);
          process.exit(1);
        }
        console.log(`Admin user created: ${email}`);
        process.exit(0);
      });
      return;
    }

    db.run('UPDATE users SET password = ? WHERE id = ?', [hash, user.id], (updateErr) => {
      if (updateErr) {
        console.error(updateErr.message);
        process.exit(1);
      }
      console.log(`Admin password updated: ${email}`);
      process.exit(0);
    });
  });
};

run();
