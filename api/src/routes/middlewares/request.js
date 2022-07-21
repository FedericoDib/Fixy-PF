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

  res.send("Solicitud creada con exito");
});

router.put("/", async (req, res) => {
  const { clientId, associatedProfessionals } = req.body;

  const requestPut = await Request.findOne({
    where: { clientId: clientId },
  });
  
  let currentProfessionals = requestPut.associatedProfessionals;

  if (!currentProfessionals){
    let newProfessionals = [];
    newProfessionals.push(associatedProfessionals);
    const request = await Request.update({
        associatedProfessionals: newProfessionals
      }, {where:{
        clientId: clientId
      }});
  } else {
    if (currentProfessionals.includes(associatedProfessionals)){
      res.send("Profesional ya asociado")
    } else {
      currentProfessionals.push(associatedProfessionals);
      const request = await Request.update({
        associatedProfessionals: currentProfessionals
      }, {where:{
        clientId: clientId
      }});
      res.send("Profesional asociado");
    }
  };
});

module.exports = router;
