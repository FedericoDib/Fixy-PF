const { Router } = require("express");
const { Client, Professional, Admin, Op } = require("../../db");
const bcrypt = require("bcrypt");
const router = Router();

const { cadenaAleatoria } = require("../helpers/generateToken");

//Middleware que chequea si el token enviado efectivamente corresponde a un usuario
const { isAuth } = require("../helpers/checkToken");

//---------------------- Rutas Admin -------------------------//

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // const hash = await bcrypt.hash(password, 8);
    const newAdmin = await Admin.create({ name, email, password });
    console.log(newAdmin);
    res.status(201).send(newAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Intenta auntenticar con el token guardado en LocalStorage del front

router.get("/loggedWithToken", async (req, res) => {
  const { token } = req.query;
  try {
    const user = await Admin.findOne({ where: { accessToken: token } });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(400).send(false);
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

//Autentica User-Password y genera un token que se guarda en la DB

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({
      where: { email, password },
    });
    if (admin) {
      const token = cadenaAleatoria(4);
      const userWithToken = await Admin.update(
        { accessToken: token },
        { where: { email, password } }
      );
      const user = await Admin.findOne({
        where: { email, password },
      });
      res.status(200).send(user);
    } else {
      res.status(404).send("User not exist");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/message", async (req, res) => {
  const { idUser, idReview, message, asunto } = req.body;

  const admin = await Admin.findByPk(11);

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
    return res.status(200).send(clients);
  } catch (e) {
    return res.status(400).send(e);
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

router.get("/report", async (req, res) => {
  const { idUser, idReview } = req.query;

  try {
    //return res.send("hola");
    const profesional = await Professional.findByPk(idUser);
    const client = await Client.findByPk(idUser);
    if (profesional.reviews.find((r) => r.id === idReview)) {
      const review = profesional.reviews.find((r) => r.id === idReview);

      res.status(200).send(review);
    } else {
      const review = client.reviews.find((r) => r.id === idReview);

      res.status(200).send(review);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/reports", async (req, res) => {
  try {
    const admin = await Admin.findByPk(11);
    res.status(200).send(admin.message);
  } catch (error) {
    res.status(400).send(error);
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
