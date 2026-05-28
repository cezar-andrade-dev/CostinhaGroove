/* =============================================
   COSTINHA API — src/routes/audio.js
   ============================================= */

const express    = require("express");
const path       = require("path");
const controller = require("../controllers/audioController");

const router = express.Router();

// GET /api/audio/:id  → retorna a URL do áudio
router.get("/:id", controller.obterUrlAudio);

module.exports = router;
