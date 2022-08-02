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

  try {
    let newRequest = await Request.create({
      clientId,
      affair,
      date,
      description,
      status,
      address,
      availableTime,
    });

    res.status(201).send(newRequest);
  } catch (error) {
    res.status(400).send("faltan datos");
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Request.update(
      { status: "active" },
      { where: { id: req.params.id } }
    );

    res.status(202).send("ok");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/", async (req, res) => {
  const { googleId, idRequest } = req.body;
  try {
    const request = await Request.findOne({ where: { id: idRequest } });
    const professional = await Professional.findOne({
      where: { googleId },
    });

    await request.addProfessional(professional);

    res.status(2002).send("Solicitud creada con exito");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    let request;
    if (id) {
      request = await Request.findOne({ where: { id } });
      if (request) {
        res.status(200).send(request);
      } else {
        res.status(400).send("no existe la request");
      }
    } else {
      request = await Request.findAll();
      res.send(request);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/professional", async (req, res) => {
  const { id } = req.query;

  try {
    const requests = await Professional.findOne({
      where: {
        googleId: id,
      },
      include: [
        {
          model: Request,
          attributes: [
            "affair",
            "description",
            "date",
            "address",
            "clientId",
            "status",
            "id",
            "availableTime",
          ],
        },
      ],
      attributes: ["name"],
    });
    if (!request) {
      res.status(400).send("no existe ese profesional");
    } else {
      res.status(200).send(requests);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// MUESTRA LOS CLIENTES ASOCIADOS A LA REQUEST

router.get("/client", async (req, res) => {
  const { id } = req.query;
  try {
    const requests = await Client.findAll({
      where: {
        googleId: id,
      },
      include: [
        {
          model: Request,
          as: "requests",
        },
      ],
      attributes: ["name"],
    });
    if (request) {
      res.status(200).send(requests);
    } else {
      res.status(400).send("no existe el cliente");
    }
  } catch (error) {}
});

module.exports = router;
