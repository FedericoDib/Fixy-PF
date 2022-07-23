const { Router } = require("express");
const { Professional } = require("../../db");

const db = require("../../db.hardcode.json");

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

router.get("/", (req, res) => {
  const { profession } = req.query;

  if (profession) {
    res.send(db.professional.filter((p) => p.profession === profession));
  } else {
    res.send(db.professional);
  }
});

module.exports = router;
