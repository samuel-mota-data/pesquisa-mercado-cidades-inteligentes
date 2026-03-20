const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS site_data (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

function checkAuth(req) {
  const auth = req.headers['authorization'] || '';
  const token = process.env.ADMIN_TOKEN;
  return token && auth === `Bearer ${token}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const client = await pool.connect();
  try {
    await ensureTable(client);

    if (req.method === 'GET') {
      const result = await client.query('SELECT id, data FROM site_data');
      const out = {};
      result.rows.forEach(row => { out[row.id] = row.data; });
      return res.status(200).json(out);
    }

    if (req.method === 'POST') {
      const { id, data } = req.body;
      if (!id || !data) return res.status(400).json({ error: 'id e data são obrigatórios' });
      await client.query(`
        INSERT INTO site_data (id, data, updated_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (id) DO UPDATE SET data = $2, updated_at = NOW()
      `, [id, JSON.stringify(data)]);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } finally {
    client.release();
  }
};
