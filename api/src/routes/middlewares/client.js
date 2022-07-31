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
  res.send(user);
});

router.get("/", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  if (id) {
    const client = await Client.findOne({ where: { googleId: id } });
    res.send(client);
  } else {
    const clients = await Client.findAll();
    res.send(clients);
  }
});

router.put("/profile", async (req, res) => {
  const { id, phoneNumber, province, city, address } = req.body;
  const client = await Client.findOne({ where: { googleId: id } });
  const professional = await Professional.findOne({ where: { googleId: id } });

  if (client) {
    client.update({ phoneNumber, province, city, address });
    return res.send(client);
  } else if (professional) {
    professional.update({ phoneNumber, province, city, address });
    return res.send(professional);
  }
});

router.get("/budget", async (req, res) => {
  const { id } = req.query;
  console.log(id);

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

  res.send(budgets);
});

module.exports = router;
