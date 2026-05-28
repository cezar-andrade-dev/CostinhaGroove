/* =============================================
   COSTINHA API — src/routes/piadas.js
   ============================================= */

const express    = require("express");
const controller = require("../controllers/piadasController");

const router = express.Router();

// GET /api/piadas
router.get("/", controller.listarPiadas);

// GET /api/piadas/:id
router.get("/:id", controller.buscarPiada);

module.exports = router;
