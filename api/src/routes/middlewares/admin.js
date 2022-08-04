const { Router } = require("express");
const { Client, Professional, Admin } = require("../../db");
const bcrypt = require("bcrypt");
const router = Router();

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 8);
    const newAdmin = await Admin.create({ name, email, password: hash });
    res.status(201).send(newAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).send(clients);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/professionals", async (req, res) => {
  try {
    const professionals = await Professional.findAll();
    res.status(200).send(professionals);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByPk(id);
    const professional = await Professional.findByPk(id);
    if (client) {
      res.status(200).send(client);
    } else if (professional) {
      res.status(200).send(professional);
    } else {
      res.status(404).send("no existe");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const client = await Client.findByPk(id);
  const professional = await Professional.findByPk(id);
  try {
    if (client) {
      await client.update({ status: "disabled" });
      res.status(200).send("listo");
    } else if (professional) {
      await professional.update({ status: "disabled" });
      res.status(200).send("listo");
    } else {
      res.status(400).send("no existe");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
