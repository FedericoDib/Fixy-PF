const { Router, request } = require("express");
const {
  Professional,
  Request,
  Client,
  Budget,
  Notification,
} = require("../../db");
const { Expo } = require("expo-server-sdk");

const router = Router();

const db = require("../../db.hardcode.json");

let expo = new Expo();
//
router.post("/", async (req, res) => {
  const {
    clientId,
    affair,
    date,
    description,
    address,
    status,
    availableTime,
    category,
    requestPic,
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
      category,
      requestPic,
    });

    res.status(201).send(newRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

// SE NOTIFICA AL PROF Q SE ACEPTO UN PRESUPUESTO
router.put("/:id", async (req, res) => {
  console.log("idss");
  let code = Math.floor(Math.random() * (9999 - 1000) + 1000);
  try {
    const budget = await Budget.findOne({ where: { id: req.params.id } });
    await budget.update({ status: "active", validationCode: code });
    const professional = await Professional.findOne({
      where: { googleId: budget.professionalId },
    });
    console.log("dshajk", professional);
    const client = await Client.findOne({
      where: { googleId: budget.clientId },
    });
    const reqst = await Request.findOne({
      where: { id: budget.requestId },
    });
    await Request.update(
      { status: "active" },
      { where: { id: budget.requestId } }
    );

    const requests = await reqst.update({ budget: [...reqst.budget, budget] });

    //NOTIFICACION AL PROFESIONAL DEL BUDGET ACEPTADO
    const expoPushToken = professional.expoToken;

    let messages = [];

    messages.push({
      to: expoPushToken,
      sound: "default",
      body: `${client.name} ha aceptado tu presupuesto para el problema: ${reqst.affair}`,
      data: { withSome: "data" },
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          // console.log('tickettttt',ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
    })();

    //GUARDADO EN DB DE LA NOTIF ENVIADA

    const newNotifDb = await Notification.create({
      title: messages[0].body,
      clientId: client.googleId,
      professionalId: professional.googleId,
      user:"professional"
    });

    res.status(202).send(requests);
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
    const client = await Client.findOne({
      where: { googleId: request.clientId },
    });

    await request.addProfessional(professional);

    // NOTIFICATIONS
    const expoPushToken = professional.expoToken;

    let messages = [];

    messages.push({
      to: expoPushToken,
      sound: "default",
      body: "Tenes una nueva solicitud de presupuesto",
      data: { withSome: "data" },
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          // console.log('tickettttt',ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
    })();

    const newNotifDb = await Notification.create({
      title: messages[0].body,
      clientId: client.googleId,
      professionalId: professional.googleId,
      user:"professional"
    });

    if (newNotifDb) console.log("OK NOTIF DB");

    //----------------------//
    res.status(200).send("Solicitud creada con exito");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    let request;
    if (id) {
      request = await Request.findOne({
        where: { id },
        include: [{ model: Professional }],
      });
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
          as: "requests",
        },
      ],
      attributes: ["name"],
    });
    if (!request) {
      res.status(400).send("no existe ese profesional");
    } else {
      res.status(200).send(requests.requests);
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
      res.status(200).send(requests[0].requests);
    } else {
      res.status(400).send("no existe el cliente");
    }
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const requestDelete = await Request.findByPk(id);
    const client = await Client.findByPk(requestDelete.clientId);
    await requestDelete.destroy();
    const requests = await Client.findOne({
      where: {
        googleId: client.googleId,
      },
      include: [{ model: Request, as: "requests" }],
    });
    res.status(200).send(requests.requests);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
