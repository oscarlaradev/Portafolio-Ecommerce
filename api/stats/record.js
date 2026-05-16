import { kv } from '@vercel/kv';

function readBody(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const body = readBody(req);
    const key = body.key;
    const increment = body.increment || 1;
    
    if (!key) return res.status(400).json({ error: 'Missing key' });
    
    const newValue = await kv.hincrby('stats', key, increment);
    return res.status(200).json({ success: true, newValue });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
