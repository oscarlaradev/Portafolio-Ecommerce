import { kv } from '@vercel/kv';

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
      const projects = await kv.get('projects') || [];
      return res.status(200).json(projects);
    }
    
    if (req.method === 'POST') {
      const projects = await kv.get('projects') || [];
      const item = readBody(req);
      if (item.id) {
        const index = projects.findIndex(p => p.id === item.id);
        if (index >= 0) projects[index] = item;
        else projects.push(item);
      } else {
        item.id = Date.now();
        projects.push(item);
      }
      await kv.set('projects', projects);
      return res.status(200).json(item);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
