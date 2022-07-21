const { Router, request } = require("express");
const { Professional, Request } = require("../../db");

const router = Router();

router.post("/", async (req, res) => {
  const {
    clientId,

    affair,
    date,
    description,
    status,
  } = req.body;

  const newRequest = await Request.create({
    clientId,

    affair,
    date,
    description,
    status,
  });

  res.send(newRequest);
});

router.put("/", async (req, res) => {
  const { clientId, associatedProfessionals } = req.body;

  let requestPut = await Request.findOne({
    where: { clientId: clientId },
  });
  // let currentProfesional = requestPut.associatedProfessionals;
  // // if (!currentProfesional) {
  // //   const requestArray = [];
  // //   requestArray.push(associatedProfessionals);
  // //   let request = await requestPut.update({
  // //     associatedProfessionals: requestArray,
  // //   });
  // // } else {
  // //   currentProfesional.push(associatedProfessionals);
  // //   let request = await requestPut.update({
  // //     associatedProfessionals: currentProfesional,
  // //   });
  // // }
  // currentProfesional.push(associatedProfessionals);
  // let request = await requestPut.update({
  //   associatedProfessionals: currentProfesional,
  // });

  res.send(requestPut);
});

module.exports = router;
