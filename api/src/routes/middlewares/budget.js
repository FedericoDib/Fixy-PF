const { Router } = require("express");
const { Budget, Request, Professional, Op, Client,Notification } = require("../../db");
const { Expo } = require("expo-server-sdk");
const router = Router();

let expo = new Expo();

// CREA EL BUDGET(con noti)

router.post("/", async (req, res) => {
  const {
    description,
    price,
    estimatedBudget,
    turn,
    requestId,
    professionalId,
    clientId,
    status,
  } = req.body;

  await Budget.create({
    description,
    price,
    estimatedBudget,
    turn,
    requestId,
    professionalId,
    clientId,
    status,
  });

  const client = await Client.findOne({
    where: {
      googleId: clientId,
    },
  });

  const professional = await Professional.findOne({
    where: {
      googleId: professionalId,
    },
  });

  const reqst = await Request.findOne({
    where: {
      id: requestId,
    },
  });

  //NOTIFICACION AL CLIENTE DEL BUDGET PROPUESTO POR EL PROFESIONAL
  const expoPushToken = client.expoToken;

  let messages = [];

  messages.push({
    to: expoPushToken,
    sound: "default",
    body: `${professional.name} te ha enviado un presupuesto para el problema: ${reqst.affair}`,
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
    title:messages[0].body,
    clientId:client.googleId,
    professionalId:professional.googleId
  });
  
  res.status(201).send("budget Create");
});

// ENVIA SOLO UN BUDGET

router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { [Op.or]: [{ id: req.params.id }, { requestId: req.params.id }] },
    });

    res.status(200).send(budget);
  } catch (e) {
    console.log(e);
  }
});

// ENVIA TODOS LOS BUDGETS

router.get("/", async (req, res) => {
  const budget = await Budget.findAll({
    include: [
      {
        model: Request,
        as: "request",
        // attributes: ["affair", "description"],
      },
      {
        model: Professional,
        as: "professional",
        // attributes: ["name"],
      },
    ],
    // attributes: ["id", "price", "description"],
  });

  res.send(budget);
});

// MODIFICA UN BUDGET

router.put("/:id", async (req, res) => {
  const { description, price } = req.body;

  await Budget.update(
    { description, price },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).send("budget modified");
});

router.put("/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const budget = await Budget.findByPk(id);
    await Request.update(
      { status: "completed" },
      { where: { id: budget.requestId } }
    );
    await budget.update({ status: "completed" });
    const professional = await Professional.findByPk(budget.professionalId);
    const client = await Client.findByPk(budget.clientId);

    professional.update({
      reviewsPending: [...professional.reviewsPending, budget.id],
    });
    client.update({
      reviewsPending: [...client.reviewsPending, budget.id],
    });

    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/review/:id", async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    if (id[0] === "c") {
      user = await Client.findByPk(id);
      let review = user.reviewsPending;
      review.shift();
      //console.log(review);
      await Client.update(
        { reviewsPending: review },
        { where: { googleId: id } }
      );

      user = await Client.findByPk(id);

      res.status(200).send(user);
    } else {
      user = await Professional.findByPk(id);
      let review = user.reviewsPending;
      review.shift();
      //console.log(review);
      await Professional.update(
        { reviewsPending: review },
        { where: { googleId: id } }
      );

      user = await Professional.findByPk(id);

      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// ELIMINA UN BUDGET

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const budgetDelete = await Budget.findByPk(id);
    const budgets = await Professional.findOne({
      where: { googleId: budgetDelete.professionalId },
      include: [{ model: Budget, as: "budgets" }],
    });
    await budgetDelete.destroy();

    res.status(200).send(budgets.budgets);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/complete/review", async (req, res) => {
  const { id, user } = req.query;

  try {
    const budget = await Budget.findByPk(id);
    if (user === "client") {
      const professional = await Professional.findByPk(budget.professionalId);
      res.status(200).send(professional);
    } else {
      const client = await Client.findByPk(budget.clientId);
      res.status(200).send(client);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
