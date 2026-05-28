/* =============================================
   COSTINHA API — src/controllers/piadasController.js
   Lógica de negócio para as piadas
   ============================================= */

const db = require("../db/database");

/**
 * GET /api/piadas
 * Retorna a lista completa de piadas (sem a URL do áudio,
 * que é obtida separadamente em /api/audio/:id)
 */
function listarPiadas(req, res) {
  try {
    const piadas = db
      .prepare("SELECT id, titulo, emoji FROM piadas ORDER BY id ASC")
      .all();

    res.json(piadas);

  } catch (err) {
    console.error("Erro ao listar piadas:", err);
    res.status(500).json({ erro: "Falha ao buscar piadas" });
  }
}

/**
 * GET /api/piadas/:id
 * Retorna os dados de uma piada específica
 */
function buscarPiada(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const piada = db
      .prepare("SELECT id, titulo, emoji FROM piadas WHERE id = ?")
      .get(id);

    if (!piada) {
      return res.status(404).json({ erro: "Piada não encontrada" });
    }

    res.json(piada);

  } catch (err) {
    console.error("Erro ao buscar piada:", err);
    res.status(500).json({ erro: "Falha ao buscar piada" });
  }
}

module.exports = { listarPiadas, buscarPiada };
