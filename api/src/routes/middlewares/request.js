const { Router, request } = require("express");
const { Professional, Request, Client } = require("../../db");

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

// MUESTRA LOS CLIENTES ASOCIADOS A LA REQUEST

router.get("/client", async (req, res) => {
  const requests = await Request.findAll({
    include: [
      {
        model: Client,
        as: "client",
        attributes: ["name", "province", "city"],
      },
    ],
    attributes: ["affair", "description"],
  });

  console.log(requests);

  res.send(requests);
});

// MUESTRA LOS  PROFESIONALES ASOCIADOS A LA REQUEST

router.get("/professional", async (req, res) => {
  const request = await Request.findAll({
    include: [
      {
        model: Professional,
        attributes: ["name", "province", "city"],
      },
    ],
    attributes: ["affair", "description"],
  });

  res.send(request);
});

module.exports = router;
