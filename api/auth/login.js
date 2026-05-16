import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function readBody(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = readBody(req);
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res.status(500).json({
      error: 'Missing env vars in Vercel: ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET',
    });
  }

  // Verificación directa encriptando la entrada del usuario a SHA-256
  const hashedInput = crypto.createHash('sha256').update(String(password), 'utf8').digest('hex');
  if (String(email).trim().toLowerCase() !== String(adminEmail).trim().toLowerCase() || hashedInput !== String(adminPassword)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: adminEmail }, jwtSecret, { expiresIn: '2h' });

  const cookie = [
    `token=${token}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=7200',
  ].join('; ');

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok: true });
}
