const { Router } = require("express");
const { Client, Professional, Admin } = require("../../db");
const bcrypt = require("bcrypt");
const router = Router();

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 8);
    const newAdmin = await Admin.create({ name, email, password: hash });
    console.log(newAdmin);
    res.status(201).send(newAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/message", async (req, res) => {
  const { idUser, idReview, message, asunto } = req.body;

  const admin = await Admin.findByPk(1);

  try {
    if (idReview) {
      const newMessage = await admin.update({
        message: [...admin.message, { idUser, idReview, message, asunto }],
      });

      res.status(201).send(newMessage);
    } else {
      const newMessage = await admin.update({
        message: [...admin.message, { idUser, message, asunto }],
      });
      res.status(201).send(newMessage);
    }
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
      if (client.active) {
        await client.update({ active: false });
      } else {
        await client.update({ active: true });
      }
      res.status(200).send(client);
    } else if (professional) {
      if (professional.active) {
        await professional.update({ active: false });
      } else {
        await professional.update({ active: true });
      }
      res.status(200).send(professional);
    } else {
      res.status(400).send("no existe");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const professional = await Professional.findByPk(id);
    const client = await Client.findByPk(id);
    if (professional) {
      await professional.destroy();
      res.status(200).send(await Professional.findAll());
    } else {
      await client.destroy();
      res.status(200).send(await Client.findAll());
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/delete/review", async (req, res) => {
  const { id, idProfessional, idClient } = req.body;

  try {
    const profesional = await Professional.findByPk(idProfessional);
    const client = await Client.findByPk(idClient);
    if (profesional.reviews.find((r) => r.id === id)) {
      const reviews = profesional.reviews.filter((r) => r.id !== id);
      await profesional.update({ reviews: reviews });
      res.status(200).send(await Professional.findByPk(idProfessional));
    } else {
      const reviews = client.reviews.filter((r) => r.id !== id);
      await client.update({ reviews: reviews });
      res.status(200).send(await Client.findByPk(idClient));
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
