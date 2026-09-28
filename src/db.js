const pg = require('pg');
const { Pool } = pg;

// devolve DATE como string pura ("2026-01-01"), sem fuso horário
pg.types.setTypeParser(1082, val => val);

const pool = new Pool({
  host: process.env.DB_HOST || "database",
  user: process.env.DB_USER || "usuario",
  password: process.env.DB_PASS || "senha",
  database: process.env.DB_NAME || "futstyle",
  port: process.env.DB_PORT || 5432,
});

// consultas simples
const query = (text, params) => pool.query(text, params);

// operações que precisam de transação (BEGIN/COMMIT/ROLLBACK)
async function transaction(operar) {
  const conexao = await pool.connect();
  try {
    await conexao.query('BEGIN');
    const result = await operar(conexao);
    await conexao.query('COMMIT');
    return result;
  } catch (err) {
    await conexao.query('ROLLBACK');
    throw err;
  } finally {
    conexao.release();
  }
}

module.exports = { query, transaction };
