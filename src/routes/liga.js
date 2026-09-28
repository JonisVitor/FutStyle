const express = require("express");
const router = express.Router();
const db = require("../db");

// lista todas as ligas
router.get("/", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM ligas ORDER BY nome;");
    return res.status(200).json(r.rows);
  } catch (error) {
    return res.status(500).json({ msg: "erro ao buscar ligas" });
  }
});

// busca uma liga pelo id
router.get("/:id", async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM ligas WHERE id = $1;", [req.params.id]);
    if (r.rowCount == 0) return res.status(404).json({ msg: "liga não encontrada" });
    return res.status(200).json(r.rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "erro ao buscar liga" });
  }
});

// cadastra uma liga
router.post("/", async (req, res) => {
  try {
    const { nome } = req.body || {};
    if (!nome) return res.status(400).json({ msg: "nome não enviado, não cadastrado!" });

    const r = await db.query("INSERT INTO ligas (nome) VALUES ($1) RETURNING *", [nome]);
    return res.status(201).json({ msg: "liga cadastrada!", liga: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "já existe uma liga com esse nome!" });
    return res.status(500).json({ msg: "erro ao cadastrar liga" });
  }
});

// edita uma liga
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome } = req.body || {};
    if (!nome) return res.status(400).json({ msg: "nome não enviado, não editado!" });

    const v = await db.query("SELECT id FROM ligas WHERE id = $1", [id]);
    if (v.rowCount == 0) return res.status(404).json({ msg: "liga não encontrada" });

    const r = await db.query("UPDATE ligas SET nome = $1 WHERE id = $2 RETURNING *", [nome, id]);
    return res.status(200).json({ msg: "liga editada!", liga: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "já existe uma liga com esse nome!" });
    return res.status(500).json({ msg: "erro ao editar liga" });
  }
});

// apaga a liga (e, em cascata, times e camisas dela)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const v = await db.query("SELECT id FROM ligas WHERE id = $1", [id]);
    if (v.rowCount == 0) return res.status(404).json({ msg: "liga não encontrada, não deletada!" });

    const r = await db.query("DELETE FROM ligas WHERE id = $1 RETURNING *", [id]);
    return res.status(200).json({ msg: "liga, times e camisas removidos!", liga: r.rows[0] });
  } catch (error) {
    return res.status(500).json({ msg: "erro ao deletar liga" });
  }
});

module.exports = router;
