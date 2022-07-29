const { Router, request } = require("express");
const { Professional, Client } = require("../../db");

const router = Router();

router.put("/professional", async (req, res) => {
  const { rating, comment, idProfessional, nameClient, idClient } = req.body;

  try {
    let profesional = await Professional.findOne({
      where: { googleId: idProfessional },
    });

    profesional.update({
      reviews: [
        ...profesional.reviews,
        {
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
  const { rating, comment, idClient, nameProfessional, idProfessional } =
    req.body;

  let client = await Client.findOne({ where: { googleId: idClient } });

  await client.update({
    reviews: [
      ...client.reviews,
      {
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