const { Router } = require("express");
const { Professional, Request, Client, Budget } = require("../../db");

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
    phoneNumber,
    city,
    address,
    availableTimes,
    expoToken,
    isRegistered,
  } = req.body;

  let newProfessional = await Professional.create({
    googleId,
    name,
    email,
    perfilPic,
    enrollment,
    profession,
    province,
    phoneNumber,
    city,
    address,
    availableTimes,
    expoToken,
    isRegistered,
  });
  res.send(newProfessional);
});

router.get("/", async (req, res) => {
  const { profession } = req.query;
  let professionals;
  if (profession) {
    if (profession === "Unknown") {
      professionals = await Professional.findAll();
      res.send(professionals);
    } else {
      professionals = await Professional.findAll({
        where: { profession },
      });
      res.send(professionals);
    }
  } else {
    professionals = await Professional.findAll();

    res.send(professionals);
  }
});

// router.get("/request", async (req, res) => {
//   const { id } = req.body;

//   const requests = await Request.findOne({
//     where: {
//       id: id,
//     },
//     include: [
//       {
//         model: Professional,
//         attributes: ["name"],
//       },
//       {
//         model: Client,
//         as: "client",
//         attributes: ["name", "city"],
//       },
//     ],
//     attributes: ["affair", "description", "date"],
//   });

//   res.send(requests);
// });

router.get("/request", async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const requests = await Professional.findOne({
    where: {
      googleId: id,
    },
    include: [
      {
        model: Request,
        attributes: [
          "affair",
          "description",
          "date",
          "address",
          "clientId",
          "status",
          "id",
          "availableTime",
        ],
      },
    ],
    attributes: ["name"],
  });

  res.send(requests);
});
// router.get('/', (req, res) => {
// 	const { profession } = req.query;

// 	if (profession === 'Unknown') {
// 		res.send(db.professional);
// 	} else {
// 		res.send(db.professional.filter((p) => p.profession === profession));
// 	}
// });

router.get("/profil", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const profesional = await Professional.findOne({ where: { googleId: id } });
  res.send(profesional);
});

router.put("/", async (req, res) => {
  const id = req.query.id;
  await Professional.update(req.body, {
    where: { googleId: id },
  });
  res.json({ succes: "se ha modificado" });
});

router.get("/budget", async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const requests = await Professional.findOne({
    where: {
      googleId: id,
    },
    include: [
      {
        model: Budget,
        as: "budgets",
      },
    ],
    attributes: ["name"],
  });

  res.send(requests);
});

module.exports = router;
