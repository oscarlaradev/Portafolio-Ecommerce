import { kv } from '@vercel/kv';

function readBody(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return req.body; }
  }
  return req.body;
}

export default async function handler(req, res) {
  const { key } = req.query;

  try {
    if (req.method === 'GET') {
      const data = await kv.get(key);
      return res.status(200).json(data !== null ? data : null);
    }
    
    if (req.method === 'POST') {
      const body = readBody(req);
      await kv.set(key, body);
      return res.status(200).json({ success: true, data: body });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
