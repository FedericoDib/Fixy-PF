const { Router } = require("express");
const { ordenPago, notificacionOrden } = require("./controllers/utils");

const router = Router();

router.post("/orden", ordenPago);
router.post("/notificacion", notificacionOrden);

module.exports = router;
