const { Router } = require("express");
const { Client } = require("../../db");

const router = Router();

router.post("/create", async (req, res) => {
  console.log('holaa')
  const {
    expoToken,
    googleId,
    name,
    email,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
    firstLogin
  } = req.body;

  let user = await Client.create({
    expoToken,
    phoneNumber,
    perfilPic,
    province,
    city,
    address,
    googleId,
    name,
    email,
    firstLogin
  });
  res.send(user);
});

module.exports = router;
