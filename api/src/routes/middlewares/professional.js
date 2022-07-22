const { Router } = require("express");
const { Professional } = require("../../db");

const router = Router();

router.post("/create", async (req, res) => {
  const {
    googleId,
    name,
    email,
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
    expoToken,
  } = req.body;

  await Professional.create({
    perfilPic,
    enrollment,
    profession,
    province,
    city,
    address,
    availableTimes,
    googleId,
    name,
    email,
    expoToken,
  });
  res.send("profesional modified");
});

module.exports = router;
