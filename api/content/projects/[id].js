import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const projects = await kv.get('projects') || [];
      const filtered = projects.filter(p => String(p.id) !== String(id));
      await kv.set('projects', filtered);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
