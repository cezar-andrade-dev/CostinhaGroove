/* =============================================
   COSTINHA API — src/controllers/audioController.js
   Retorna a URL do áudio (local ou cloud storage)
   ============================================= */

const path = require("path");
const fs   = require("fs");
const db   = require("../db/database");

const STORAGE = process.env.AUDIO_STORAGE || "local";

/**
 * GET /api/audio/:id
 * Retorna a URL para reprodução do áudio.
 *
 * Em modo "local"  → serve o arquivo direto do servidor
 * Em modo "s3"     → devolve a URL pública do bucket
 */
function obterUrlAudio(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    // Busca o nome do arquivo no banco
    const piada = db
      .prepare("SELECT id, titulo, arquivo FROM piadas WHERE id = ?")
      .get(id);

    if (!piada) {
      return res.status(404).json({ erro: "Piada não encontrada" });
    }

    let url;

    if (STORAGE === "s3") {
      // ── MODO CLOUD (S3 / Cloudflare R2) ────────────────
      // A URL pública é montada diretamente — sem SDK necessário
      // para arquivos públicos. Para arquivos privados, use URLs assinadas.
      const baseUrl = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");

      if (!baseUrl) {
        return res.status(500).json({
          erro: "S3_PUBLIC_URL não configurado no .env",
        });
      }

      url = `${baseUrl}/${piada.arquivo}`;

    } else {
      // ── MODO LOCAL (desenvolvimento) ────────────────────
      // Verifica se o arquivo existe antes de responder
      const audioDir  = path.resolve(process.env.AUDIO_LOCAL_PATH || "./audio");
      const filePath  = path.join(audioDir, piada.arquivo);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          erro: `Arquivo "${piada.arquivo}" não encontrado em ${audioDir}`,
          dica: "Coloque os arquivos .mp3 na pasta /backend/audio/",
        });
      }

      // Monta a URL para o endpoint de streaming
      const host = `${req.protocol}://${req.get("host")}`;
      url = `${host}/audio/${piada.arquivo}`;
    }

    res.json({
      id:     piada.id,
      titulo: piada.titulo,
      url,
    });

  } catch (err) {
    console.error("Erro ao obter URL do áudio:", err);
    res.status(500).json({ erro: "Falha ao obter áudio" });
  }
}

module.exports = { obterUrlAudio };
