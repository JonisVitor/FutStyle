const express = require("express");
const router = express.Router();
const db = require("../db");

// consulta base: junta camisa -> time -> liga e já devolve o preço em reais
const SELECT_CAMISA = `
  SELECT
    camisas.id,
    camisas.nome,
    camisas.cor,
    camisas.temporada AS ano,
    camisas.preco_centavos,
    (camisas.preco_centavos / 100.0)::FLOAT AS preco,
    camisas.estoque,
    camisas.destaque,
    camisas.time_id,
    times.nome AS time,
    ligas.id   AS liga_id,
    ligas.nome AS liga
  FROM camisas
  JOIN times ON camisas.time_id = times.id
  JOIN ligas ON times.liga_id = ligas.id
`;

/*
  Lista as camisas. Aceita filtros opcionais na query string:
  /camisa?liga=La Liga&time=Barcelona&cor=Azul&ano=2026/27&preco_max=150&busca=real
*/
router.get("/", async (req, res) => {
  try {
    const { liga, time, cor, ano, preco_max, busca, destaque } = req.query;

    const condicoes = [];
    const valores = [];

    if (liga)  { valores.push(liga);  condicoes.push(`ligas.nome = $${valores.length}`); }
    if (time)  { valores.push(time);  condicoes.push(`times.nome = $${valores.length}`); }
    if (cor)   { valores.push(cor);   condicoes.push(`camisas.cor = $${valores.length}`); }
    if (ano)   { valores.push(ano);   condicoes.push(`camisas.temporada = $${valores.length}`); }
    if (preco_max) {
      valores.push(Math.round(Number(preco_max) * 100));
      condicoes.push(`camisas.preco_centavos <= $${valores.length}`);
    }
    if (destaque === "true") condicoes.push("camisas.destaque = TRUE");
    if (busca) {
      valores.push(`%${busca}%`);
      condicoes.push(`(camisas.nome ILIKE $${valores.length} OR times.nome ILIKE $${valores.length} OR ligas.nome ILIKE $${valores.length})`);
    }

    const where = condicoes.length ? ` WHERE ${condicoes.join(" AND ")}` : "";
    const r = await db.query(`${SELECT_CAMISA}${where} ORDER BY camisas.destaque DESC, camisas.nome;`, valores);

    return res.status(200).json(r.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "erro ao buscar camisas" });
  }
});

// busca uma camisa pelo id
router.get("/:id", async (req, res) => {
  try {
    const r = await db.query(`${SELECT_CAMISA} WHERE camisas.id = $1;`, [req.params.id]);
    if (r.rowCount == 0) return res.status(404).json({ msg: "camisa não encontrada" });
    return res.status(200).json(r.rows[0]);
  } catch (error) {
    return res.status(500).json({ msg: "erro ao buscar camisa" });
  }
});

// cadastra uma camisa
router.post("/", async (req, res) => {
  try {
    const { nome, cor, temporada, preco, estoque, destaque, time_id } = req.body || {};

    if (!nome)      return res.status(400).json({ msg: "nome não enviado, não cadastrado!" });
    if (!cor)       return res.status(400).json({ msg: "cor não enviada, não cadastrado!" });
    if (!temporada) return res.status(400).json({ msg: "temporada não enviada, não cadastrado!" });
    if (!preco)     return res.status(400).json({ msg: "preço não enviado, não cadastrado!" });
    if (!time_id)   return res.status(400).json({ msg: "id do time não enviado, não cadastrado!" });

    if (Number(preco) <= 0) return res.status(400).json({ msg: "preço inválido" });
    if (estoque != null && Number(estoque) < 0) return res.status(400).json({ msg: "estoque inválido" });

    const time = await db.query("SELECT id FROM times WHERE id = $1", [time_id]);
    if (time.rowCount == 0) return res.status(404).json({ msg: "time não encontrado, não cadastrado!" });

    const r = await db.query(
      `INSERT INTO camisas (nome, cor, temporada, preco_centavos, estoque, destaque, time_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome, cor, temporada, Math.round(Number(preco) * 100), Number(estoque) || 0, destaque === true, time_id]
    );

    return res.status(201).json({ msg: "camisa cadastrada!", camisa: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "já existe uma camisa com esse nome!" });
    console.log(error);
    return res.status(500).json({ msg: "erro ao cadastrar camisa" });
  }
});

// edita uma camisa
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const atual = await db.query("SELECT * FROM camisas WHERE id = $1", [id]);
    if (atual.rowCount == 0) return res.status(404).json({ msg: "camisa não encontrada" });

    const antiga = atual.rows[0];
    const { nome, cor, temporada, preco, estoque, destaque, time_id } = req.body || {};

    if (time_id) {
      const time = await db.query("SELECT id FROM times WHERE id = $1", [time_id]);
      if (time.rowCount == 0) return res.status(404).json({ msg: "time não encontrado, não editado!" });
    }
    if (preco != null && Number(preco) <= 0) return res.status(400).json({ msg: "preço inválido" });
    if (estoque != null && Number(estoque) < 0) return res.status(400).json({ msg: "estoque inválido" });

    const r = await db.query(
      `UPDATE camisas
       SET nome = $1, cor = $2, temporada = $3, preco_centavos = $4, estoque = $5, destaque = $6, time_id = $7
       WHERE id = $8 RETURNING *`,
      [
        nome ?? antiga.nome,
        cor ?? antiga.cor,
        temporada ?? antiga.temporada,
        preco != null ? Math.round(Number(preco) * 100) : antiga.preco_centavos,
        estoque != null ? Number(estoque) : antiga.estoque,
        destaque != null ? destaque === true : antiga.destaque,
        time_id ?? antiga.time_id,
        id
      ]
    );

    return res.status(200).json({ msg: "camisa editada!", camisa: r.rows[0] });
  } catch (error) {
    if (error.code == "23505") return res.status(400).json({ msg: "já existe uma camisa com esse nome!" });
    return res.status(500).json({ msg: "erro ao editar camisa" });
  }
});

// apaga uma camisa
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const v = await db.query("SELECT id FROM camisas WHERE id = $1", [id]);
    if (v.rowCount == 0) return res.status(404).json({ msg: "camisa não encontrada, não deletada!" });

    const r = await db.query("DELETE FROM camisas WHERE id = $1 RETURNING *", [id]);
    return res.status(200).json({ msg: "camisa deletada!", camisa: r.rows[0] });
  } catch (error) {
    return res.status(500).json({ msg: "erro ao deletar camisa" });
  }
});

module.exports = router;
