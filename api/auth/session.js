import jwt from 'jsonwebtoken';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=');
    cookies[key] = decodeURIComponent(rest.join('='));
  }
  return cookies;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return res.status(500).json({ error: 'Missing JWT_SECRET' });

  const cookies = parseCookies(req.headers.cookie || '');
  const token = cookies.token;
  if (!token) return res.status(200).json({ authenticated: false });

  try {
    const payload = jwt.verify(token, jwtSecret);
    return res.status(200).json({ authenticated: true, user: { email: payload.email } });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
}
