const { Router } = require("express");
const { Client } = require("../../db");

const router = Router();

router.post("/create", async (req, res) => {
  console.log("holaa");
  console.log("SOY EL BODY:", req.body);
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
    firstLogin,
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
    firstLogin,
  });
  console.log(user);
  res.send(user);
});

module.exports = router;
