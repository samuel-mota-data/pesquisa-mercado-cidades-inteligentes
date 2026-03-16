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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const client = await pool.connect();
  try {
    await ensureTable(client);

    if (req.method === 'GET') {
      const result = await client.query("SELECT data FROM site_data WHERE id = 'main'");
      return res.status(200).json(result.rows.length ? result.rows[0].data : null);
    }

    if (req.method === 'POST') {
      await client.query(`
        INSERT INTO site_data (id, data, updated_at)
        VALUES ('main', $1, NOW())
        ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = NOW()
      `, [JSON.stringify(req.body)]);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } finally {
    client.release();
  }
};
