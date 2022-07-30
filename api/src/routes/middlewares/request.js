const { Router, request } = require("express");
const { Professional, Request, Client } = require("../../db");

const router = Router();

const db = require("../../db.hardcode.json");

router.post("/", async (req, res) => {
  const {
    clientId,
    affair,
    date,
    description,
    address,
    status,
    availableTime,
  } = req.body;

  let newRequest = await Request.create({
    clientId,
    affair,
    date,
    description,
    status,
    address,
    availableTime,
  });

  res.send(newRequest);
});

router.put("/", async (req, res) => {
  const { googleId, idRequest } = req.body;

  const request = await Request.findOne({ where: { id: idRequest } });
  const professional = await Professional.findOne({
    where: { googleId },
  });

  await request.addProfessional(professional);

  res.send("Solicitud creada con exito");
});

router.get("/", async (req, res) => {
  const { id } = req.query;
  let request;
  if (id) {
    request = await Request.findOne({ where: { id } });
    res.send(request);
  } else {
    request = await Request.findAll();
    res.send(request);
  }
});

// router.put('/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const { googleId } = req.body;

// 	const request = await Request.findOne({ where: { id } });
// 	const professional = await Professional.findOne({
// 		where: { googleId },
// 	});

// 	await request.addProfessional(professional);

// 	res
// 		.status(200)
// 		.send(
// 			`combinado la request ${request.id} y el profesional ${professional.googleId}`
// 		);
// });

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
