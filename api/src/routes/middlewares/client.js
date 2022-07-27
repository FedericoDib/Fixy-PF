const { Router } = require("express");
const { Client } = require("../../db");

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

router.get("/profile", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const client = await Client.findOne({ where: { googleId: id } });
  res.send(client);
});

router.put("/", async (req, res) => {
  const id = req.query.id;
  await Client.update(req.body, {
    where: { googleId: id },
  });
  res.json({ succes: "se ha modificado" });
});

module.exports = router;
