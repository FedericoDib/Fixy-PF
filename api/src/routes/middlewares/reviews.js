const { Router, request } = require("express");
const { Professional, Client } = require("../../db");

const router = Router();

router.put("/professional", async (req, res) => {
  const { rating, comment, idProfessional, nameClient, idClient } = req.body;

  const id = idProfessional + Math.floor(Math.random() * (9999 - 1000) + 1000);

  try {
    let profesional = await Professional.findOne({
      where: { googleId: idProfessional },
    });

    profesional.update({
      reviews: [
        ...profesional.reviews,
        {
          id: id,
          rating: rating,
          comment: comment,
          name: nameClient,
          idClient: idClient,
        },
      ],
    });

    res.status(200).send(profesional);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/client", async (req, res) => {
  const { id, rating, comment, idClient, nameProfessional, idProfessional } =
    req.body;

  let client = await Client.findOne({ where: { googleId: idClient } });

  await client.update({
    reviews: [
      ...client.reviews,
      {
        id: id,
        rating: rating,
        comment: comment,
        name: nameProfessional,
        idProfessional: idProfessional,
      },
    ],
  });

  res.send(client);
});

module.exports = router;
