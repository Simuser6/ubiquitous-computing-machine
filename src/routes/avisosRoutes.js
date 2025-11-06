const express = require("express");
const router = express.Router();
const controller = require("../controllers/avisosController");

// Teste de injeção
router.get("/teste-pool", (req, res) => {
  res.send(`Pool existe? ${!!req.pool}`);
});

router.get("/", controller.listar);
router.get("/:id", controller.obter);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

module.exports = router;