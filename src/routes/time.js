const express = require("express");
const router = express.Router();
const db = require("../db");

const SELECT_TIME = `
  SELECT
    times.id,
    times.nome,
    times.liga_id,
    ligas.nome AS liga
  FROM times
  JOIN ligas ON times.liga_id = ligas.id
`;

// lista todos os times (opcional: /time?liga_id=1)
router.get("/", async (req, res) => {
  try {
    const { liga_id } = req.query;
    const r = liga_id
      ? await db.query(`${SELECT_TIME} WHERE times.liga_id = $1 ORDER BY times.nome;`, [liga_id])
      : await db.query(`${SELECT_TIME} ORDER BY times.nome;`);
    return res.status(200).json(r.rows);
  } catch (error) {
    return res.status(500).json({ msg: "erro ao buscar times" });
  }
});

// busca um time pelo id
router.get("/:id", async (req, res) => {
  try {
    const r = await db.query(`${SELECT_TIME} WHERE times.id = $1;`, [req.params.id]);
    if (r.rowCount == 0) return res.status(404).json({ msg: "time não encontrado" });
    return res.status(200).json(r.rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "erro ao buscar time" });
  }
});

// cadastra um time
router.post("/", async (req, res) => {
  try {
    const { nome, liga_id } = req.body || {};
    if (!nome) return res.status(400).json({ msg: "nome não enviado, não cadastrado!" });
    if (!liga_id) return res.status(400).json({ msg: "id da liga não enviado, não cadastrado!" });

    const liga = await db.query("SELECT id FROM ligas WHERE id = $1", [liga_id]);
    if (liga.rowCount == 0) return res.status(404).json({ msg: "liga não encontrada, não cadastrado!" });

    const r = await db.query("INSERT INTO times (nome, liga_id) VALUES ($1, $2) RETURNING *", [nome, liga_id]);
    return res.status(201).json({ msg: "time cadastrado!", time: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "esse time já existe nessa liga!" });
    return res.status(500).json({ msg: "erro ao cadastrar time" });
  }
});

// edita um time
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, liga_id } = req.body || {};
    if (!nome) return res.status(400).json({ msg: "nome não enviado, não editado!" });
    if (!liga_id) return res.status(400).json({ msg: "id da liga não enviado, não editado!" });

    const v = await db.query("SELECT id FROM times WHERE id = $1", [id]);
    if (v.rowCount == 0) return res.status(404).json({ msg: "time não encontrado" });

    const liga = await db.query("SELECT id FROM ligas WHERE id = $1", [liga_id]);
    if (liga.rowCount == 0) return res.status(404).json({ msg: "liga não encontrada, não editado!" });

    const r = await db.query("UPDATE times SET nome = $1, liga_id = $2 WHERE id = $3 RETURNING *", [nome, liga_id, id]);
    return res.status(200).json({ msg: "time editado!", time: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "esse time já existe nessa liga!" });
    return res.status(500).json({ msg: "erro ao editar time" });
  }
});

// apaga o time (e, em cascata, as camisas dele)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const v = await db.query("SELECT id FROM times WHERE id = $1", [id]);
    if (v.rowCount == 0) return res.status(404).json({ msg: "time não encontrado, não deletado!" });

    const r = await db.query("DELETE FROM times WHERE id = $1 RETURNING *", [id]);
    return res.status(200).json({ msg: "time e camisas removidos!", time: r.rows[0] });
  } catch (error) {
    return res.status(500).json({ msg: "erro ao deletar time" });
  }
});

module.exports = router;
