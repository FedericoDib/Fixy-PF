const { Router } = require("express");
const { Professional } = require("../../db");

const router = Router();

const findType = async (profession) => {
  return await Professional.findAll({
    where: {
      profession,
    },
  });
};

router.get("/all", async (req, res) => {
  const all = await Professional.findAll();
  try {
    res.status(200).send(all);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/electricista", async (req, res) => {
  const electricistas = await findType("electricista");
  try {
    res.status(200).send(electricistas);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/gasista", async (req, res) => {
  const gasistas = await findType("gasista");
  try {
    res.status(200).send(gasistas);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/electricista", async (req, res) => {
  const electricistas = await findType("electricista");
  try {
    res.status(200).send(electricistas);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
