import { Redis } from '@upstash/redis';
const kv = Redis.fromEnv();

function readBody(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const stack = await kv.get('stack') || [];
      return res.status(200).json(stack);
    }
    
    if (req.method === 'POST') {
      const stack = await kv.get('stack') || [];
      const item = readBody(req);
      if (item.id) {
        const index = stack.findIndex(p => p.id === item.id);
        if (index >= 0) stack[index] = item;
        else stack.push(item);
      } else {
        item.id = Date.now();
        stack.push(item);
      }
      await kv.set('stack', stack);
      return res.status(200).json(item);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
