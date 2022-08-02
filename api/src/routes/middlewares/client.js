const { Router } = require("express");
const { Client, Professional, Budget } = require("../../db");

const router = Router();

router.post("/create", async (req, res) => {
  const {
    isRegistered,
    expoToken,
    googleId,
    name,
    email,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
    firstLogin,
  } = req.body;

  try {
    let user = await Client.create({
      isRegistered,
      expoToken,
      phoneNumber,
      perfilPic,
      province,
      city,
      address,
      googleId,
      name,
      email,
      firstLogin,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const id = req.query.id;
  try {
    if (id) {
      const client = await Client.findOne({ where: { googleId: id } });
      if (client) {
        res.status(200).send(client);
      } else {
        res.status(400).send("no existe ese cliente");
      }
    } else {
      const clients = await Client.findAll();
      res.status(200).send(clients);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/profile", async (req, res) => {
  const { id, phoneNumber, province, city, address } = req.body;
  const client = await Client.findOne({ where: { googleId: id } });
  const professional = await Professional.findOne({ where: { googleId: id } });

  try {
    if (client) {
      client.update({ phoneNumber, province, city, address });
      return res.status(202).send(client);
    } else if (professional) {
      professional.update({ phoneNumber, province, city, address });
      return res.status(202).send(professional);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/budget", async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      res.status(400).send("no hay id");
    }
    const budgets = await Client.findOne({
      where: {
        googleId: id,
      },
      include: [
        {
          model: Budget,
          as: "budgets",
        },
      ],
      attributes: ["name"],
    });
    //console.log(budgets.__proto__);
    if (!budgets) {
      res.status(400).send("no existe este cliente");
    } else {
      if (budgets.budgets.length) {
        res.status(202).send(budgets);
      } else {
        res.status(400).send("no tiene presuspuestos");
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/budget", async (req, res) => {
  const { clientId, budgetId } = req.body;
  let budget = await Budget.findByPk(budgetId);
  let client = await Client.findOne({ where: { googleId: clientId } });
  try {
    client.removeBudget(budget);
    res.send("exito");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findOne({ where: { googleId: req.params.id } });
    if (client) {
      res.status(200).send(client);
    } else {
      req.status(400).send("no existe el cliente");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
