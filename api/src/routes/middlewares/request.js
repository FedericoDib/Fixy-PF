const { Router, request } = require("express");
const { Professional, Request } = require("../../db");

const router = Router();

router.post("/", async (req, res) => {
  const { clientId, affair, date, description, status } = req.body;

  await Request.create({
    clientId,
    affair,
    date,
    description,
    status,
  });

  res.send("Solicitud creada con exito");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { googleId } = req.body;

  const request = await Request.findOne({ where: { id } });
  const professional = await Professional.findOne({
    where: { googleId },
  });

  await request.addProfessional(professional);

  res
    .status(200)
    .send(
      `combinado la request ${request.id} y el profesional ${professional.googleId}`
    );
});

module.exports = router;
