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
      const leads = await kv.get('leads') || [];
      return res.status(200).json(leads);
    }
    
    if (req.method === 'POST') {
      const leads = await kv.get('leads') || [];
      const body = readBody(req);
      
      // If it's an array, the admin panel is saving the whole list
      if (Array.isArray(body)) {
          await kv.set('leads', body);
          return res.status(200).json(body);
      }

      // If it's a single lead from the public contact form
      const newLead = {
          id: Date.now(),
          name: body.name || 'Anónimo',
          project: body.project || 'Sin especificar',
          source: body.source || 'Formulario Web',
          budget: body.budget || 'Por definir',
          status: 'Pendiente',
          email: body.email || '',
          date: new Date().toISOString()
      };
      
      leads.push(newLead);
      await kv.set('leads', leads);
      return res.status(200).json(newLead);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
