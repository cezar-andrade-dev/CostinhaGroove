/* =============================================
   COSTINHA API — src/server.js
   Ponto de entrada da aplicação
   ============================================= */

require("dotenv").config();

const express = require("express");
const cors    = require("cors");

const piadasRouter                        = require("./routes/piadas");
const audioRouter                         = require("./routes/audio");
const { configurarAudioEstatico }         = require("./middleware/staticAudio");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARES ──────────────────────────────
app.use(express.json());

// CORS: permite que o frontend acesse a API
const origensPermitidas = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: origensPermitidas.length ? origensPermitidas : "*",
  methods: ["GET"],
}));

// Serve os arquivos .mp3 locais (apenas em modo desenvolvimento)
configurarAudioEstatico(app);

// ── ROTAS ────────────────────────────────────
app.use("/api/piadas", piadasRouter);
app.use("/api/audio",  audioRouter);

// Rota raiz — confirma que a API está no ar
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    mensagem: "🎭 Costinha API está rodando!",
    rotas: [
      "GET /api/piadas         → lista todas as piadas",
      "GET /api/piadas/:id     → dados de uma piada",
      "GET /api/audio/:id      → URL do áudio de uma piada",
    ],
  });
});

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// ── INICIAR SERVIDOR ─────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎭 Costinha API rodando em http://localhost:${PORT}`);
  console.log(`📋 Rotas disponíveis:`);
  console.log(`   GET http://localhost:${PORT}/api/piadas`);
  console.log(`   GET http://localhost:${PORT}/api/audio/:id\n`);
});
