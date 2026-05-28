/* =============================================
   COSTINHA API — src/middleware/staticAudio.js
   Serve os arquivos .mp3 locais como estáticos.
   Só ativo quando AUDIO_STORAGE=local (dev).
   ============================================= */

const express = require("express");
const path    = require("path");

function configurarAudioEstatico(app) {
  if ((process.env.AUDIO_STORAGE || "local") !== "local") return;

  const audioDir = path.resolve(process.env.AUDIO_LOCAL_PATH || "./audio");

  // Disponibiliza os arquivos em GET /audio/piada01.mp3 etc.
  app.use("/audio", express.static(audioDir, {
    // Cabeçalhos para suporte a streaming parcial (seek no player)
    setHeaders(res, filePath) {
      if (filePath.endsWith(".mp3")) {
        res.set("Content-Type", "audio/mpeg");
        res.set("Accept-Ranges", "bytes");
      }
    },
  }));

  console.log(`📂 Áudios locais servidos de: ${audioDir}`);
}

module.exports = { configurarAudioEstatico };
